import type { Icon, IconProps } from '@phosphor-icons/react';
import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowCounterClockwise';
import { ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { ArrowsLeftRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowsLeftRight';
import { BirdIcon } from '@phosphor-icons/react/dist/ssr/Bird';
import { BoneIcon } from '@phosphor-icons/react/dist/ssr/Bone';
import { BugIcon } from '@phosphor-icons/react/dist/ssr/Bug';
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { CaretUpIcon } from '@phosphor-icons/react/dist/ssr/CaretUp';
import { CircleDashedIcon } from '@phosphor-icons/react/dist/ssr/CircleDashed';
import { CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CompassIcon } from '@phosphor-icons/react/dist/ssr/Compass';
import { CornersOutIcon } from '@phosphor-icons/react/dist/ssr/CornersOut';
import { CrosshairIcon } from '@phosphor-icons/react/dist/ssr/Crosshair';
import { DotsSixIcon } from '@phosphor-icons/react/dist/ssr/DotsSix';
import { DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { EarIcon } from '@phosphor-icons/react/dist/ssr/Ear';
import { EggIcon } from '@phosphor-icons/react/dist/ssr/Egg';
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { FeatherIcon } from '@phosphor-icons/react/dist/ssr/Feather';
import { ForkKnifeIcon } from '@phosphor-icons/react/dist/ssr/ForkKnife';
import { GlobeIcon } from '@phosphor-icons/react/dist/ssr/Globe';
import { HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr/HourglassMedium';
import { InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { MapPinIcon } from '@phosphor-icons/react/dist/ssr/MapPin';
import { MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { MoonIcon } from '@phosphor-icons/react/dist/ssr/Moon';
import { PauseIcon } from '@phosphor-icons/react/dist/ssr/Pause';
import { PlayIcon } from '@phosphor-icons/react/dist/ssr/Play';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { RulerIcon } from '@phosphor-icons/react/dist/ssr/Ruler';
import { ScanIcon } from '@phosphor-icons/react/dist/ssr/Scan';
import { ScalesIcon } from '@phosphor-icons/react/dist/ssr/Scales';
import { SidebarSimpleIcon } from '@phosphor-icons/react/dist/ssr/SidebarSimple';
import { SpinnerGapIcon } from '@phosphor-icons/react/dist/ssr/SpinnerGap';
import { SunIcon } from '@phosphor-icons/react/dist/ssr/Sun';
import { SunHorizonIcon } from '@phosphor-icons/react/dist/ssr/SunHorizon';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';
import { WarningCircleIcon } from '@phosphor-icons/react/dist/ssr/WarningCircle';
import { WindIcon } from '@phosphor-icons/react/dist/ssr/Wind';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

/** Shared Phosphor icons: regular controls with deliberate duotone accents. */
export type AppIconProps = Omit<IconProps, 'weight'>;

function phosphorIcon(
  IconComponent: Icon,
  weight: 'regular' | 'duotone' = 'regular',
) {
  return function AppIcon({ size = 24, ...props }: AppIconProps) {
    return (
      <IconComponent
        size={size}
        aria-hidden="true"
        focusable="false"
        {...props}
        weight={weight}
        data-icon-weight={weight}
      />
    );
  };
}

export const ArrowCounterClockwise = /*#__PURE__*/ phosphorIcon(
  ArrowCounterClockwiseIcon,
);
export const ArrowDown = /*#__PURE__*/ phosphorIcon(ArrowDownIcon);
export const ArrowLeft = /*#__PURE__*/ phosphorIcon(ArrowLeftIcon);
export const ArrowRight = /*#__PURE__*/ phosphorIcon(ArrowRightIcon);
export const ArrowUpRight = /*#__PURE__*/ phosphorIcon(ArrowUpRightIcon);
export const ArrowsLeftRight = /*#__PURE__*/ phosphorIcon(ArrowsLeftRightIcon);
export const Bird = /*#__PURE__*/ phosphorIcon(BirdIcon, 'duotone');
export const Bone = /*#__PURE__*/ phosphorIcon(BoneIcon, 'duotone');
export const Bug = /*#__PURE__*/ phosphorIcon(BugIcon, 'duotone');
export const CaretDown = /*#__PURE__*/ phosphorIcon(CaretDownIcon);
export const CaretLeft = /*#__PURE__*/ phosphorIcon(CaretLeftIcon);
export const CaretRight = /*#__PURE__*/ phosphorIcon(CaretRightIcon);
export const CaretUp = /*#__PURE__*/ phosphorIcon(CaretUpIcon);
export const Check = /*#__PURE__*/ phosphorIcon(CheckIcon);
export const CheckCircle = /*#__PURE__*/ phosphorIcon(CheckCircleIcon);
export const CircleDashed = /*#__PURE__*/ phosphorIcon(CircleDashedIcon);
export const Compass = /*#__PURE__*/ phosphorIcon(CompassIcon, 'duotone');
export const CornersOut = /*#__PURE__*/ phosphorIcon(CornersOutIcon);
export const Crosshair = /*#__PURE__*/ phosphorIcon(CrosshairIcon, 'duotone');
export const DotsSix = /*#__PURE__*/ phosphorIcon(DotsSixIcon);
export const DotsThree = /*#__PURE__*/ phosphorIcon(DotsThreeIcon);
export const Ear = /*#__PURE__*/ phosphorIcon(EarIcon, 'duotone');
export const Egg = /*#__PURE__*/ phosphorIcon(EggIcon, 'duotone');
export const Eye = /*#__PURE__*/ phosphorIcon(EyeIcon, 'duotone');
export const Feather = /*#__PURE__*/ phosphorIcon(FeatherIcon, 'duotone');
export const ForkKnife = /*#__PURE__*/ phosphorIcon(ForkKnifeIcon, 'duotone');
export const Globe = /*#__PURE__*/ phosphorIcon(GlobeIcon, 'duotone');
export const HourglassMedium = /*#__PURE__*/ phosphorIcon(
  HourglassMediumIcon,
  'duotone',
);
export const Info = /*#__PURE__*/ phosphorIcon(InfoIcon);
export const List = /*#__PURE__*/ phosphorIcon(ListIcon);
export const MagnifyingGlass = /*#__PURE__*/ phosphorIcon(
  MagnifyingGlassIcon,
  'duotone',
);
export const MapPin = /*#__PURE__*/ phosphorIcon(MapPinIcon, 'duotone');
export const Minus = /*#__PURE__*/ phosphorIcon(MinusIcon);
export const Moon = /*#__PURE__*/ phosphorIcon(MoonIcon, 'duotone');
export const Pause = /*#__PURE__*/ phosphorIcon(PauseIcon, 'duotone');
export const Play = /*#__PURE__*/ phosphorIcon(PlayIcon, 'duotone');
export const Plus = /*#__PURE__*/ phosphorIcon(PlusIcon);
export const Ruler = /*#__PURE__*/ phosphorIcon(RulerIcon, 'duotone');
export const Scan = /*#__PURE__*/ phosphorIcon(ScanIcon, 'duotone');
export const Scales = /*#__PURE__*/ phosphorIcon(ScalesIcon, 'duotone');
export const SidebarSimple = /*#__PURE__*/ phosphorIcon(SidebarSimpleIcon);
export const SpinnerGap = /*#__PURE__*/ phosphorIcon(SpinnerGapIcon);
export const Sun = /*#__PURE__*/ phosphorIcon(SunIcon, 'duotone');
export const SunHorizon = /*#__PURE__*/ phosphorIcon(SunHorizonIcon, 'duotone');
export const Warning = /*#__PURE__*/ phosphorIcon(WarningIcon);
export const WarningCircle = /*#__PURE__*/ phosphorIcon(
  WarningCircleIcon,
  'duotone',
);
export const Wind = /*#__PURE__*/ phosphorIcon(WindIcon, 'duotone');
export const X = /*#__PURE__*/ phosphorIcon(XIcon);
export const XCircle = /*#__PURE__*/ phosphorIcon(XCircleIcon);
