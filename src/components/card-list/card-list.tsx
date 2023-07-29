import { Offer } from '../../types/offers';
import Card from '../card/card';

type CardListProps = {
  offers: Offer[];
  classNameWrapper?: string;
  classNameCardPrefix?: string;
}

export default function CardList({ offers, classNameWrapper, classNameCardPrefix }: CardListProps): JSX.Element {
  return (
    <div className={classNameWrapper}>
      {
        offers.map((offer) => <Card className={classNameCardPrefix} key={offer.id} offer={offer} />)
      }
    </div >
  );
}
