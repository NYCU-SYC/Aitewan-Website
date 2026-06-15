import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "shield"
  | "badge"
  | "brain"
  | "hospital"
  | "workflow"
  | "award"
  | "compliance"
  | "chart"
  | "research"
  | "contour"
  | "layers"
  | "stethoscope"
  | "mri"
  | "cpu"
  | "file"
  | "review"
  | "target"
  | "lock"
  | "patent"
  | "factory"
  | "quality"
  | "arrowRight"
  | "chevronDown"
  | "menu"
  | "close"
  | "check"
  | "play"
  | "mail"
  | "phone"
  | "mapPin"
  | "external"
  | "sparkles";

const paths: Record<IconName, ReactNode> = {
  shield: <path d="M12 3l7 3v5.5c0 4.4-3 7.6-7 8.5-4-.9-7-4.1-7-8.5V6l7-3z M9.5 12l1.8 1.8L15 10" />,
  badge: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M8.7 12l2.2 2.2L15.4 9.8" />
    </>
  ),
  brain: (
    <path d="M9.2 4.5A2.6 2.6 0 006.6 7 2.4 2.4 0 005 9.4a2.5 2.5 0 00.4 4.2 2.6 2.6 0 003.8 3V4.5zM14.8 4.5A2.6 2.6 0 0117.4 7 2.4 2.4 0 0119 9.4a2.5 2.5 0 01-.4 4.2 2.6 2.6 0 01-3.8 3V4.5zM12 4v15" />
  ),
  hospital: (
    <>
      <path d="M4 21V6a1 1 0 011-1h14a1 1 0 011 1v15 M3 21h18" />
      <path d="M12 8v5 M9.5 10.5h5" />
      <path d="M8 21v-3.5h3.9V21 M12.1 21v-3.5H16V21" />
    </>
  ),
  workflow: (
    <>
      <circle cx="5.5" cy="6" r="2.4" />
      <circle cx="18.5" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M5.5 8.4v3.1a2 2 0 002 2h2.5 M18.5 8.4v3.1a2 2 0 01-2 2H14" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M8.5 13.5L7 21l5-2.6L17 21l-1.5-7.5" />
    </>
  ),
  compliance: (
    <>
      <path d="M8 4h8a1 1 0 011 1v15a1 1 0 01-1 1H8a1 1 0 01-1-1V5a1 1 0 011-1z" />
      <path d="M9.5 3.5h5V6h-5z" />
      <path d="M9.3 13l1.6 1.6 3-3.2" />
    </>
  ),
  chart: <path d="M4 20V4 M4 20h16 M8 20v-6 M12.5 20V9 M17 20v-9" />,
  research: (
    <path d="M12 6c-2-1.5-4.5-1.8-7-1.2v12c2.5-.6 5-.3 7 1.2 2-1.5 4.5-1.8 7-1.2v-12c-2.5-.6-5-.3-7 1.2zm0 0v12" />
  ),
  contour: (
    <>
      <path d="M12 4c4.5-.4 7.6 3 7 7 .3 3.4-1.7 5.3-4 6.6-3.2 1.8-7 .5-8.4-2.8C5 12 6.6 5 12 4z" />
      <circle cx="12.2" cy="11.5" r="2.3" />
    </>
  ),
  layers: (
    <path d="M12 3l8.5 4.5L12 12 3.5 7.5 12 3zM4 12l8 4.3 8-4.3M4 16.5l8 4.3 8-4.3" />
  ),
  stethoscope: (
    <>
      <path d="M5 4H4v4a4 4 0 008 0V4H8" />
      <path d="M8 14v1.5a4.5 4.5 0 009 0V14" />
      <circle cx="18" cy="12" r="2.2" />
    </>
  ),
  mri: (
    <>
      <path d="M4 8V6a2 2 0 012-2h2 M16 4h2a2 2 0 012 2v2 M20 16v2a2 2 0 01-2 2h-2 M8 20H6a2 2 0 01-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.6" />
      <path d="M9.5 3v3 M14.5 3v3 M9.5 18v3 M14.5 18v3 M3 9.5h3 M3 14.5h3 M18 9.5h3 M18 14.5h3" />
    </>
  ),
  file: (
    <>
      <path d="M7 3h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M13.5 3v4.5H18 M9 12h6 M9 15.5h6" />
    </>
  ),
  review: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M8.6 12.2l2.2 2.2 4.6-4.8" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 018 0v2.5" />
      <circle cx="12" cy="15" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  patent: (
    <>
      <path d="M12 3a6 6 0 00-3.5 10.9c.6.4.9 1 .9 1.7V16h5.2v-.4c0-.7.3-1.3.9-1.7A6 6 0 0012 3z" />
      <path d="M9.4 19h5.2 M10 21.5h4" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l5 3.5V10l5 3.5V8l5-3v16z" />
      <path d="M3 21h18 M7 21v-3 M12 21v-3 M17 21v-3" />
    </>
  ),
  quality: (
    <>
      <path d="M12 3l2 1.4 2.4-.3 1 2.2 2.2 1-.3 2.4L21 15l-1.4 2 .3 2.4-2.2 1-1 2.2-2.4-.3L12 23.6 10 22.2l-2.4.3-1-2.2-2.2-1 .3-2.4L3.4 15l1.4-2-.3-2.4 2.2-1 1-2.2L10 4.4z" transform="scale(0.78) translate(3.4 1.5)" />
      <path d="M9.2 12l2 2 3.6-3.8" />
    </>
  ),
  arrowRight: <path d="M5 12h13 M12.5 5.5L19 12l-6.5 6.5" />,
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  menu: <path d="M4 7h16 M4 12h16 M4 17h16" />,
  close: <path d="M6 6l12 12 M18 6L6 18" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5l2.5.4 1 3.2-1.6 1.3a12 12 0 005.2 5.2l1.3-1.6 3.2 1 .4 2.5a1.7 1.7 0 01-1.8 1.9A15 15 0 014.6 5.3 1.7 1.7 0 016.5 3.5z" />
  ),
  mapPin: (
    <>
      <path d="M12 21c4-4.2 6-7.4 6-10a6 6 0 10-12 0c0 2.6 2 5.8 6 10z" />
      <circle cx="12" cy="11" r="2.3" />
    </>
  ),
  external: <path d="M14 4h6v6 M20 4l-8 8 M18 13v5a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h5" />,
  sparkles: (
    <path d="M12 3l1.6 4.8L18.5 9l-4.9 1.2L12 15l-1.6-4.8L5.5 9l4.9-1.2L12 3zM18.5 14l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8z" />
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
