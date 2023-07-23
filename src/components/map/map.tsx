import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { GroupOfferByCity, Offer } from '../../types/offers';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { MapSettings, ResourcePath } from '../../const';

type MapProps = {
  groupOffer: GroupOfferByCity;
  selectedOffer?: Offer;
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

export default function Map({ groupOffer: { city, offers }, selectedOffer }: MapProps): JSX.Element {
  const refMap = useRef<HTMLElement | null>(null);
  const map = useMap(refMap, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const { id, location: { latitude: lat, longitude: lng }} = offer;
        const marker = new Marker({
          lat,
          lng
        });

        marker
          .setIcon(
            selectedOffer !== undefined && id === selectedOffer.id
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
    <section ref={refMap} className="cities__map map"></section>
  );
}
