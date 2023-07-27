import { Offer } from '../../types/offers';
import Card from '../card/card';

type CardListProps = {
  offers: Offer[];
  classNameWrapper?: string;
  classNameCardPrefix?: string;
  handleChangeSelectedOffer?: (offer: Offer | null) => void;
}

export default function CardList({ offers, classNameWrapper, classNameCardPrefix, handleChangeSelectedOffer }: CardListProps): JSX.Element {
  return (
    <div className={classNameWrapper}>
      {
        offers.map((offer) => <Card className={classNameCardPrefix} key={offer.id} offer={offer} handleChangeSelectedOffer={handleChangeSelectedOffer} />)
      }
    </div >
  );
}
