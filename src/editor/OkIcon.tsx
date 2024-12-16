import okSvgUrl from './images/ok.svg';

interface OkIconProps {
  className?: string;
}

function OkIcon({ className }: OkIconProps) {
  return <img src={okSvgUrl} className={className} alt="OK" />;
}

export default OkIcon;
