// import { AppRoute } from 'const';


type Props = {
  className: string;
}

export default function PremiumMark ({className}: Props) {
  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}
