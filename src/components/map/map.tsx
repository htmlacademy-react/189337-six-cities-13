import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { GroupOfferByCity, Offer } from '../../types/offers';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { MapSettings, ResourcePath } from '../../const';
import classNames from 'classnames';

type MapProps = {
  className: string;
  groupOffer: GroupOfferByCity;
  selectedOffer?: Offer | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: ResourcePath.Pin,
  iconSize: [MapSettings.PinIconSizeX, MapSettings.PinIconSizeY],
  iconAnchor: [MapSettings.PinIconAnchorX, MapSettings.PinIconAnchorY]
});

const currentCustomIcon = new Icon({
  iconUrl: ResourcePath.PinActive,
  iconSize: [MapSettings.PinActiveIconSizeX, MapSettings.PinActiveIconSizeY],
  iconAnchor: [MapSettings.PinActiveIconAnchorX, MapSettings.PinActiveIconAnchorY]
});

export default function Map({ className, groupOffer: { city, offers }, selectedOffer }: MapProps): JSX.Element {
  const refMap = useRef<HTMLElement | null>(null);
  const map = useMap(refMap, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const { id, location: { latitude, longitude }} = offer;
        const marker = new Marker({
          lat: latitude,
          lng: longitude
        });

        marker
          .setIcon(
            !!selectedOffer && id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <section ref={refMap} className={classNames(className, 'map')}></section>
  );
}
