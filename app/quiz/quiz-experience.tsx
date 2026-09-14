'use client';
import { QuizAnswerBar } from '@/components/quiz/answer-bar';
import { QuizSplit, QuizSpecimen } from '@/components/quiz/question-layout';
import { cn } from '@/lib/utils';
import { QuizActionButton } from '@/components/quiz/action-button';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  AppSelectTrigger as SelectTrigger,
  AppSelectContent as SelectContent,
} from '@/components/app-select';
import { ArrowLeft, ArrowRight, QuestionMark } from '@/components/icons';
import { SiteHeader } from '@/components/site-header';
import { BirdArt } from '@/components/quiz/bird-art';
import { EstimateQuestion } from '@/components/quiz/estimate-question';
import { MultipleChoiceQuestion } from '@/components/quiz/multiple-choice-question';
import { WeightQuestion } from '@/components/quiz/weight-question';
import { HabitatQuestion } from '@/components/quiz/habitat-question';
import { QuizResults } from '@/components/quiz/results';
import { modes } from '@/components/quiz/modes';
import { PreyQuestion } from '@/components/quiz/prey-question';
import { WingComparison } from '@/components/quiz/wing-comparison';
import { QuizFeedback } from '@/components/quiz/answer-feedback';
import { RangeQuestion } from '@/components/quiz/range-question';
import { SexQuestion } from '@/components/quiz/sex-question';
import { Button } from '@/components/ui/button';
import { Select, SelectValue, SelectItem } from '@/components/ui/select';
import { quizFeedbackText } from '@/lib/quiz-feedback';
import { quizEnterAction } from '@/lib/quiz-keyboard';
import {
  initialDraft,
  canSubmitAnswer,
  scoreAnswer,
  quizArtBirds,
  type BirdMap,
  type HuntingTypes,
  type QuizDraft as Draft,
  type QuizAnswer as Answer,
} from '@/lib/quiz-answer';
import {
  createQuizRound,
  quizHistory,
  type QuizHistory,
  type QuizHabitat,
  type QuizQuestion,
} from '@/lib/quiz-engine';

const questionCounts = [5, 8, 12, 16].map((count) => ({
  value: String(count),
  label: `${count} Fragen`,
}));

function focusScreen(id: string) {
  window.scrollTo({ top: 0, behavior: 'instant' });
  window.requestAnimationFrame(() =>
    document.getElementById(id)?.focus({ preventScroll: true }),
  );
}

function QuestionFeedback({
  question,
  answer,
  birds,
  huntingTypes,
}: {
  question: QuizQuestion;
  answer: Answer;
  birds: BirdMap;
  huntingTypes: HuntingTypes;
}) {
  return (
    <QuizFeedback
      points={answer.points}
      text={quizFeedbackText(question, answer, birds, huntingTypes)}
    />
  );
}

export default function QuizExperience({
  birds,
  huntingTypes,
  habitats,
}: {
  birds: BirdMap;
  huntingTypes: HuntingTypes;
  habitats: QuizHabitat[];
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const ready = questions.length > 0;
  const [questionCount, setQuestionCount] = useState(8);
  const historyKey = 'bird-quiz:last-round:v1';
  const freshRound = useCallback(
    (previous?: QuizHistory, count = questionCount) => {
      const nextQuestions = createQuizRound(
        birds,
        Object.keys(huntingTypes),
        habitats.map((habitat) => habitat.id),
        {
          seed: crypto.getRandomValues(new Uint32Array(1))[0],
          previous,
          count,
        },
      );
      try {
        sessionStorage.setItem(
          historyKey,
          JSON.stringify(quizHistory(nextQuestions)),
        );
      } catch {
        /* Storage may be disabled. */
      }
      return nextQuestions;
    },
    [birds, huntingTypes, habitats, questionCount],
  );
  const [current, setCurrent] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResults, setShowResults] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const answerBarRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const main = mainRef.current;
    const bar = answerBarRef.current;
    if (!main || !bar) return;
    const update = () =>
      main.style.setProperty(
        '--answer-bar-height',
        `${bar.getBoundingClientRect().height}px`,
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      main.style.removeProperty('--answer-bar-height');
    };
  }, [showResults, ready]);

  const completed = Object.keys(answers).length;
  const countSelect = (
    <Select
      value={String(questionCount)}
      items={questionCounts}
      onValueChange={(value) => {
        if (!value) return;
        const count = Number(value);
        if (count === questionCount) return;
        setQuestionCount(count);
      }}
    >
      <SelectTrigger aria-label="Fragenzahl">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {questionCounts.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
  const roundSettings = (
    <div className="q-round-settings justify-items-start text-(length:--type-ui) grid gap-2">
      <span
        className="text-(length:--type-body) font-(--weight-medium) text-(--muted-foreground)"
        aria-hidden="true"
      >
        Fragenzahl
      </span>
      {countSelect}
    </div>
  );

  // The round is created only when the user starts the quiz.
  const question: QuizQuestion | undefined = questions[current];
  const draft = question
    ? (drafts[question.id] ?? initialDraft(question, birds))
    : undefined;
  const answer = question ? answers[question.id] : undefined;

  function navigate(index: number) {
    setCurrent(index);
    setShowResults(false);
  }
  const canSubmit = Boolean(
    question && draft && canSubmitAnswer(question, draft),
  );
  function submit() {
    if (!question || !draft || answer || !canSubmit) return;
    const points = scoreAnswer(question, draft, birds);
    setAnswers((previous) =>
      previous[question.id]
        ? previous
        : { ...previous, [question.id]: { ...draft, points } },
    );
  }
  function next() {
    if (completed === questions.length) {
      setShowResults(true);
      focusScreen('q-result-title');
      return;
    }
    for (let step = 1; step <= questions.length; step++) {
      const index = (current + step) % questions.length;
      if (!answers[questions[index].id]) {
        navigate(index);
        break;
      }
    }
    focusScreen('q-question-title');
  }
  // Enter works the primary button from anywhere on the question: it checks
  // the picked answer, then moves on to the next question. The listener sits
  // on the window because clicking an option often leaves the focus on the
  // page body.
  useLayoutEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target instanceof Element ? event.target : null;
      // Preserve typing, popovers, navigation and audio controls. Answer controls
      // share Enter with the primary action, including buttons focused by a click.
      const nativeContext = target?.closest(
        'a[href], select, textarea, [contenteditable]:not([contenteditable="false"]), [role="combobox"], [role="listbox"], [role="dialog"], [role="menu"]',
      );
      const button = target?.closest('button, [role="button"]');
      const answerControl = target?.closest(
        '[data-quiz-confirm], [role="radio"], [role="checkbox"], [role="slider"]',
      );
      const nativeControl = Boolean(
        nativeContext ||
        (button && !answerControl) ||
        (target instanceof HTMLInputElement &&
          !['radio', 'checkbox', 'range'].includes(target.type)),
      );
      const action = quizEnterAction(event, {
        active: Boolean(question) && !showResults,
        answered: Boolean(answer),
        canSubmit,
        nativeControl,
      });
      if (!action) return;
      event.preventDefault();
      event.stopPropagation();
      if (action === 'next') next();
      else if (action === 'submit') submit();
    }
    // Capture, so an option that swallows the key on its own cannot hide it.
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  });

  function resetRound(previous?: QuizHistory) {
    setQuestions(freshRound(previous));
    setCurrent(0);
    setDrafts({});
    setAnswers({});
    setShowResults(false);
    focusScreen('q-question-title');
  }

  function exitRound() {
    setQuestions([]);
    setShowResults(false);
    focusScreen('q-start-title');
  }

  function startRound() {
    let previous: QuizHistory | undefined;
    try {
      const saved = JSON.parse(sessionStorage.getItem(historyKey) ?? 'null');
      if (
        Array.isArray(saved?.questionKeys) &&
        saved.questionKeys.every((key: unknown) => typeof key === 'string') &&
        Array.isArray(saved?.birdIds) &&
        saved.birdIds.every((id: unknown) => typeof id === 'string')
      )
        previous = saved;
    } catch {
      /* Ignore obsolete or unavailable browser history. */
    }
    resetRound(previous);
  }

  if (!ready || !question || !draft) {
    return (
      <div className="app-shell section-shell quiz-shell bg-background text-foreground">
        <SiteHeader activeSection="quiz" />
        <main
          className="q-main max-w-[1360px] mx-auto px-page pt-page pb-section q-start-main grid items-start justify-items-center flex-1"
          ref={mainRef}
        >
          <QuizSplit
            as="section"
            className="q-start w-full q-workspace rounded-(--radius-surface) bg-surface shadow-(--shadow-none) overflow-hidden"
            aria-labelledby="q-start-title"
          >
            <QuizSpecimen start aria-hidden="true">
              <div className="q-start-portraits to-tablet:max-w-[240px] relative isolate w-full max-w-[420px] aspect-square">
                {[
                  { id: 'habicht', width: 30, left: 5, top: 14 },
                  { id: 'turmfalke', width: 20, left: 48, top: 1 },
                  { id: 'bartgeier', width: 25, left: 70.5, top: 18.5 },
                  { id: 'weisskopfseeadler', width: 28, left: 60, top: 55 },
                  { id: 'sekretaer', width: 19, left: 31.5, top: 78.5 },
                  { id: 'fischadler', width: 19, left: 79.5, top: 81.5 },
                  { id: 'uhu', width: 24, left: 1, top: 63 },
                  { id: 'rotmilan', width: 20, left: 25, top: 52 },
                ].map(({ id, width, left, top }) => (
                  <span
                    className="q-start-portrait border-(length:--border-structure) rounded-[50%] to-tablet:p-2 bg-surface shadow-(--shadow-subtle) absolute grid place-items-center min-w-0 aspect-square p-3"
                    data-bird={id}
                    style={{
                      width: `${width}%`,
                      left: `${left}%`,
                      top: `${top}%`,
                    }}
                    key={id}
                  >
                    <BirdArt
                      className="block size-full object-contain"
                      bird={birds[id]}
                      portrait
                      alt=""
                      displayWidth={120}
                      priority
                    />
                  </span>
                ))}
                <span className="q-start-mystery absolute grid place-items-center left-[45%] top-[45%] w-[10%] aspect-square">
                  <QuestionMark
                    size={32}
                    className="size-full text-(--main-color)"
                  />
                </span>
              </div>
            </QuizSpecimen>
            <div className="q-start-content to-tablet:p-panel min-w-0 flex flex-col justify-center p-10">
              <span className="q-task-label to-tablet:mb-3 text-(length:--type-ui) font-(--weight-medium) text-(--main-color) flex items-center gap-2 mb-4">
                Wie gut kennst du sie?
              </span>
              <h1
                id="q-start-title"
                className="[-webkit-text-stroke:var(--display-emphasis-stroke)_currentColor] [paint-order:stroke_fill] page-title font-(family-name:--font-stack-display) text-(length:--type-page-title) font-(--weight-semibold) leading-(--leading-display) tracking-(--tracking-tight) font-(--weight-bold)"
                tabIndex={-1}
              >
                Das Greifvogel-Quiz
              </h1>
              <p className="text-(length:--type-lead) to-tablet:text-(length:--type-body) mt-5 max-w-[45ch] text-(--muted-foreground) leading-(--leading-normal)">
                Erkenne Greifvögel an Aussehen und Ruf, schätze ihre Spannweite
                und entdecke, wie sie leben. Jede Runde mischt neue Aufgaben.
              </p>
              <div className="q-start-actions items-end border-t-(length:--border-structure) to-tablet:items-stretch to-tablet:grid to-tablet:grid-cols-[minmax(0,_1fr)] flex flex-wrap gap-5 mt-6 pt-6">
                {roundSettings}
                <QuizActionButton onClick={startRound}>
                  Quiz starten <ArrowRight size={24} className="size-6" />
                </QuizActionButton>
              </div>
            </div>
          </QuizSplit>
        </main>
      </div>
    );
  }

  // Every illustration in a question uses the round's chosen flight art.
  const shownBirds = quizArtBirds(birds, question);
  const bird = 'birdId' in question ? shownBirds[question.birdId] : null;

  const onChange = (value: Draft) =>
    setDrafts((previous) => ({ ...previous, [question.id]: value }));

  return (
    <div className="app-shell section-shell quiz-shell bg-background text-foreground">
      {showResults && <SiteHeader activeSection="quiz" />}
      <main
        className={cn(
          'q-main mx-auto',
          showResults
            ? 'page-content max-w-[1360px]'
            : 'q-main-active max-w-none pt-2 px-section pb-[calc(var(--answer-bar-height,80px)+var(--section-gap))]',
        )}
        ref={mainRef}
      >
        {showResults ? (
          <QuizResults
            questions={questions}
            answers={answers}
            birds={birds}
            countSelect={countSelect}
            onRestart={() => resetRound(quizHistory(questions))}
            onReview={navigate}
          />
        ) : (
          <>
            <div className="q-round-navigation to-tablet:grid-cols-[var(--control-height-compact)_minmax(0,1fr)_var(--control-height-compact)] to-tablet:grid to-tablet:gap-2 to-tablet:h-(--control-height-compact) flex items-center justify-center h-6 mb-2">
              <Button
                className="q-mobile-exit hidden to-tablet:inline-flex to-tablet:size-(--control-height-compact) to-tablet:border-0 to-tablet:p-0"
                variant="ghost"
                size="icon"
                aria-label="Quiz beenden und zur Startseite zurückkehren"
                onClick={exitRound}
              >
                <ArrowLeft size={20} />
              </Button>
              <div className="q-question-progress to-tablet:justify-self-center to-tablet:min-h-0 to-tablet:max-w-full to-tablet:min-w-0 flex items-center gap-3 min-w-0">
                <p
                  className="q-progress-label tabular-nums font-(family-name:--font-stack-body) text-(length:--type-caption) leading-(--leading-normal) font-(--weight-regular) text-muted-foreground whitespace-nowrap"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="sr-only">Frage </span>
                  {current + 1} / {questions.length}
                </p>
                <nav
                  className="q-step-dots to-tablet:flex-[0_1_auto] to-tablet:min-w-0 flex gap-0 shrink-0"
                  aria-label="Quiz-Fragen"
                >
                  {questions.map((item, index) => (
                    <button
                      key={item.id}
                      className="grid place-items-center size-[24px] border-0 bg-transparent text-(--muted-foreground-faint) to-tablet:flex-[0_1_24px]"
                      aria-label={`Frage ${index + 1} von ${questions.length}: ${modes.find((mode) => mode.id === item.kind)?.label ?? 'Aufgabe'}${answers[item.id] ? ', beantwortet' : ''}`}
                      aria-current={current === index ? 'step' : undefined}
                      data-done={Boolean(answers[item.id])}
                      onClick={() => navigate(index)}
                    >
                      <span
                        className="size-[7px] rounded-[50%] bg-current"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            <div className="q-workspace rounded-(--radius-surface) bg-surface shadow-(--shadow-none) overflow-hidden">
              <div key={`question-${question.id}`} className="q-question-scene">
                {(question.kind === 'span' ||
                  question.kind === 'weight-estimate') &&
                  bird && (
                    <EstimateQuestion
                      kind={question.kind}
                      bird={bird}
                      draft={draft}
                      answered={Boolean(answer)}
                      onChange={onChange}
                    />
                  )}
                {(question.kind === 'hunt' ||
                  question.kind === 'identify' ||
                  question.kind === 'call') &&
                  bird && (
                    <MultipleChoiceQuestion
                      question={question}
                      bird={bird}
                      draft={draft}
                      answered={Boolean(answer)}
                      onChange={onChange}
                      huntingTypes={huntingTypes}
                      birds={shownBirds}
                    />
                  )}
                {question.kind === 'sex' && bird && (
                  <SexQuestion
                    question={question}
                    bird={bird}
                    choice={draft.choice}
                    answered={Boolean(answer)}
                    onChange={(choice) => onChange({ ...draft, choice })}
                  />
                )}
                {question.kind === 'range' && bird && (
                  <RangeQuestion
                    question={question}
                    bird={bird}
                    birds={shownBirds}
                    choice={draft.choice}
                    answered={Boolean(answer)}
                    onChange={(choice) => onChange({ ...draft, choice })}
                  />
                )}
                {question.kind === 'weight' && (
                  <WeightQuestion
                    birds={shownBirds}
                    draft={draft}
                    answered={Boolean(answer)}
                    onChange={onChange}
                  />
                )}
                {question.kind === 'prey' && bird && (
                  <PreyQuestion
                    question={question}
                    bird={bird}
                    selected={draft.food}
                    answered={Boolean(answer)}
                    onChange={(food) => onChange({ ...draft, food })}
                  />
                )}
                {question.kind === 'compare' && (
                  <WingComparison
                    question={question}
                    birds={shownBirds}
                    choice={draft.choice}
                    answered={Boolean(answer)}
                    onChange={(choice) => onChange({ ...draft, choice })}
                  />
                )}
                {question.kind === 'habitat' && (
                  <HabitatQuestion
                    question={question}
                    birds={shownBirds}
                    habitats={question.habitatIds.map((id) =>
                      habitats.find((habitat) => habitat.id === id)!,
                    )}
                    draft={draft}
                    answered={Boolean(answer)}
                    onChange={onChange}
                  />
                )}
              </div>
            </div>
            <QuizAnswerBar ref={answerBarRef} open={Boolean(answer)}>
              <QuizActionButton
                appearance="exit"
                className="[grid-area:exit]"
                variant="outline"
                aria-label="Quiz beenden und zur Startseite zurückkehren"
                title="Quiz beenden"
                onClick={exitRound}
              >
                <ArrowLeft size={18} /> Zurück
              </QuizActionButton>
              {answer && (
                <QuestionFeedback
                  key={`feedback-${question.id}`}
                  question={question}
                  answer={answer}
                  birds={shownBirds}
                  huntingTypes={huntingTypes}
                />
              )}
              <QuizActionButton
                className="[grid-area:action] self-center w-[224px] ml-auto to-tablet:w-full"
                disabled={!answer && !canSubmit}
                data-quiz-confirm
                onClick={answer ? next : submit}
              >
                {answer
                  ? completed === questions.length
                    ? 'Ergebnis ansehen'
                    : 'Nächste Aufgabe'
                  : question.kind === 'span' ||
                      question.kind === 'weight-estimate'
                    ? 'Schätzung prüfen'
                    : question.kind === 'weight'
                      ? 'Reihenfolge prüfen'
                      : question.kind === 'habitat' || question.kind === 'sex'
                        ? 'Zuordnung prüfen'
                        : question.kind === 'prey'
                          ? 'Auswahl prüfen'
                          : 'Antwort prüfen'}
              </QuizActionButton>
            </QuizAnswerBar>
          </>
        )}
      </main>
    </div>
  );
}
