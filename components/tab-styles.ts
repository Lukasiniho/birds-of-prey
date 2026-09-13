/** Shared geometry for the two tab roles; CSS owns their palette and motion. */
const rail = 't-tabs relative items-center flex-[0_0_auto] m-0';
const trigger =
  't-tab relative flex-[0_0_auto] appearance-none m-0 whitespace-nowrap z-1';
const pill = 't-tabs-pill absolute left-0 w-0 z-0 pointer-events-none';

export const tabStyles = {
  scroll:
    't-tabs-scroll flex min-w-0 max-w-full p-1 -m-1 overflow-x-auto scroll-px-2',
  pillRail: `${rail} inline-flex gap-[3px] h-auto p-[3px]`,
  lineRail: `${rail} t-tabs-line flex justify-start w-full gap-6 p-0 to-tablet:overflow-x-auto to-tablet:overflow-y-hidden to-tablet:[scrollbar-width:none] to-tablet:[-webkit-overflow-scrolling:touch] to-tablet:scroll-px-4`,
  pillTrigger: `${trigger} h-(--control-height-compact) py-1 px-[13px]`,
  lineTrigger: `${trigger} h-(--control-height) pt-0 px-0 pb-[13px]`,
  pillIndicator: `${pill} top-[3px] h-(--control-height-compact)`,
  lineIndicator: `${pill} top-auto bottom-[-1px] h-[2px]`,
} as const;
