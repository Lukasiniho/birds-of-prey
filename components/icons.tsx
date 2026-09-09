import type { Icon, IconProps } from '@phosphor-icons/react';
import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowCounterClockwise';
import { ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { ArrowsLeftRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowsLeftRight';
import { BoneIcon } from '@phosphor-icons/react/dist/ssr/Bone';
import { BugIcon } from '@phosphor-icons/react/dist/ssr/Bug';
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { CaretUpIcon } from '@phosphor-icons/react/dist/ssr/CaretUp';
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
import { ScalesIcon } from '@phosphor-icons/react/dist/ssr/Scales';
import { SidebarSimpleIcon } from '@phosphor-icons/react/dist/ssr/SidebarSimple';
import { SpinnerGapIcon } from '@phosphor-icons/react/dist/ssr/SpinnerGap';
import { SunIcon } from '@phosphor-icons/react/dist/ssr/Sun';
import { SunHorizonIcon } from '@phosphor-icons/react/dist/ssr/SunHorizon';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';
import { WarningCircleIcon } from '@phosphor-icons/react/dist/ssr/WarningCircle';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

/** Shared Phosphor Duotone icons, usable in client and server components. */
export type AppIconProps = Omit<IconProps, 'weight'>;

function duotone(IconComponent: Icon) {
  return function DuotoneIcon({ size = 24, ...props }: AppIconProps) {
    return (
      <IconComponent
        size={size}
        aria-hidden="true"
        focusable="false"
        {...props}
        weight="duotone"
        data-icon-weight="duotone"
      />
    );
  };
}

export const ArrowCounterClockwise = /*#__PURE__*/ duotone(
  ArrowCounterClockwiseIcon,
);
export const ArrowDown = /*#__PURE__*/ duotone(ArrowDownIcon);
export const ArrowLeft = /*#__PURE__*/ duotone(ArrowLeftIcon);
export const ArrowRight = /*#__PURE__*/ duotone(ArrowRightIcon);
export const ArrowUpRight = /*#__PURE__*/ duotone(ArrowUpRightIcon);
export const ArrowsLeftRight = /*#__PURE__*/ duotone(ArrowsLeftRightIcon);
export const Bone = /*#__PURE__*/ duotone(BoneIcon);
export const Bug = /*#__PURE__*/ duotone(BugIcon);
export const CaretDown = /*#__PURE__*/ duotone(CaretDownIcon);
export const CaretLeft = /*#__PURE__*/ duotone(CaretLeftIcon);
export const CaretRight = /*#__PURE__*/ duotone(CaretRightIcon);
export const CaretUp = /*#__PURE__*/ duotone(CaretUpIcon);
export const Check = /*#__PURE__*/ duotone(CheckIcon);
export const CheckCircle = /*#__PURE__*/ duotone(CheckCircleIcon);
export const Compass = /*#__PURE__*/ duotone(CompassIcon);
export const CornersOut = /*#__PURE__*/ duotone(CornersOutIcon);
export const Crosshair = /*#__PURE__*/ duotone(CrosshairIcon);
export const DotsSix = /*#__PURE__*/ duotone(DotsSixIcon);
export const DotsThree = /*#__PURE__*/ duotone(DotsThreeIcon);
export const Ear = /*#__PURE__*/ duotone(EarIcon);
export const Egg = /*#__PURE__*/ duotone(EggIcon);
export const Eye = /*#__PURE__*/ duotone(EyeIcon);
export const Feather = /*#__PURE__*/ duotone(FeatherIcon);
export const ForkKnife = /*#__PURE__*/ duotone(ForkKnifeIcon);
export const HourglassMedium = /*#__PURE__*/ duotone(HourglassMediumIcon);
export const Info = /*#__PURE__*/ duotone(InfoIcon);
export const List = /*#__PURE__*/ duotone(ListIcon);
export const MagnifyingGlass = /*#__PURE__*/ duotone(MagnifyingGlassIcon);
export const MapPin = /*#__PURE__*/ duotone(MapPinIcon);
export const Minus = /*#__PURE__*/ duotone(MinusIcon);
export const Moon = /*#__PURE__*/ duotone(MoonIcon);
export const Pause = /*#__PURE__*/ duotone(PauseIcon);
export const Play = /*#__PURE__*/ duotone(PlayIcon);
export const Plus = /*#__PURE__*/ duotone(PlusIcon);
export const Ruler = /*#__PURE__*/ duotone(RulerIcon);
export const Scales = /*#__PURE__*/ duotone(ScalesIcon);
export const SidebarSimple = /*#__PURE__*/ duotone(SidebarSimpleIcon);
export const SpinnerGap = /*#__PURE__*/ duotone(SpinnerGapIcon);
export const Sun = /*#__PURE__*/ duotone(SunIcon);
export const SunHorizon = /*#__PURE__*/ duotone(SunHorizonIcon);
export const Warning = /*#__PURE__*/ duotone(WarningIcon);
export const WarningCircle = /*#__PURE__*/ duotone(WarningCircleIcon);
export const X = /*#__PURE__*/ duotone(XIcon);
export const XCircle = /*#__PURE__*/ duotone(XCircleIcon);
