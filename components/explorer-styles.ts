/** Shared split panel and notes column for Wissen and Falknerei. */
export const explorerStyles = {
  panel:
    'explorer-layout [--explorer-aside:350px] [--explorer-aside-compact:310px] grid grid-cols-[minmax(0,1fr)_var(--explorer-aside)] border-(length:--border-structure) rounded-(--radius-surface) overflow-hidden [&[hidden]]:hidden to-compact:grid-cols-[minmax(0,1fr)_var(--explorer-aside-compact)] to-tablet:grid-cols-[minmax(0,1fr)]',
  notes:
    'explorer-notes border-l-(length:--border-structure) to-tablet:border-l-0 to-tablet:border-t-(length:--border-structure)',
} as const;
