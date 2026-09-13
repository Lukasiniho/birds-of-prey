import { test } from 'node:test';
import assert from 'node:assert/strict';
import { quizEnterAction } from '../lib/quiz-keyboard.ts';

const ready = {
  active: true,
  answered: false,
  canSubmit: true,
  nativeControl: false,
};

void test('Enter checks an answer, then a separate press advances', () => {
  assert.equal(quizEnterAction({ key: 'Enter' }, ready), 'submit');
  assert.equal(
    quizEnterAction({ key: 'Enter' }, { ...ready, answered: true }),
    'next',
  );
  assert.equal(
    quizEnterAction({ key: 'Enter' }, { ...ready, canSubmit: false }),
    null,
  );
});

void test('holding Enter cannot check and skip the answer feedback', () => {
  assert.equal(
    quizEnterAction({ key: 'Enter', repeat: true }, ready),
    'ignore',
  );
  assert.equal(
    quizEnterAction(
      { key: 'Enter', repeat: true },
      { ...ready, answered: true },
    ),
    'ignore',
  );
});

void test('native controls and inactive screens keep their Enter behavior', () => {
  for (const answered of [false, true]) {
    assert.equal(
      quizEnterAction(
        { key: 'Enter' },
        { ...ready, answered, nativeControl: true },
      ),
      null,
    );
    assert.equal(
      quizEnterAction({ key: 'Enter' }, { ...ready, answered, active: false }),
      null,
    );
  }
});

void test('editing, modified keys and selection with Space do not submit', () => {
  for (const flag of [
    'metaKey',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'isComposing',
    'defaultPrevented',
  ]) {
    assert.equal(quizEnterAction({ key: 'Enter', [flag]: true }, ready), null);
  }
  for (const key of [' ', 'ArrowRight', 'Escape']) {
    assert.equal(quizEnterAction({ key }, ready), null);
  }
});
