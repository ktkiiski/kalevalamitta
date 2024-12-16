import warningSvgUrl from './images/warning.svg';

interface WarningIconProps {
  className?: string;
}

function WarningIcon({ className }: WarningIconProps) {
  return <img src={warningSvgUrl} className={className} alt="OK" />;
}

export default WarningIcon;
