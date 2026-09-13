type EnterKey = {
  key: string;
  repeat?: boolean;
  defaultPrevented?: boolean;
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  isComposing?: boolean;
};

/** One press checks the answer; a separate press advances past the feedback. */
export function quizEnterAction(
  event: EnterKey,
  state: {
    active: boolean;
    answered: boolean;
    canSubmit: boolean;
    nativeControl: boolean;
  },
): 'submit' | 'next' | 'ignore' | null {
  if (
    event.key !== 'Enter' ||
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey ||
    event.isComposing ||
    !state.active ||
    state.nativeControl ||
    (!state.answered && !state.canSubmit)
  )
    return null;
  if (event.repeat) return 'ignore';
  return state.answered ? 'next' : 'submit';
}
