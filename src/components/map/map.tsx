import { memo, useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offers';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { MapSettings, ResourcePath } from '../../const';
import classNames from 'classnames';
import { City } from '../../types/city';
import { getOfferSelected } from '../../store/cities-process/selectors';
import { useAppSelector } from '../../hooks';

type MapProps = {
  className: string;
  offers: Offer[];
  city: City;
}

const getDefaultCustomIcon = (): Icon => new Icon({
  iconUrl: ResourcePath.Pin,
  iconSize: [MapSettings.PinIconSizeX, MapSettings.PinIconSizeY],
  iconAnchor: [MapSettings.PinIconAnchorX, MapSettings.PinIconAnchorY]
});

const getCurrentCustomIcon = (): Icon => new Icon({
  iconUrl: ResourcePath.PinActive,
  iconSize: [MapSettings.PinActiveIconSizeX, MapSettings.PinActiveIconSizeY],
  iconAnchor: [MapSettings.PinActiveIconAnchorX, MapSettings.PinActiveIconAnchorY]
});

function Map({ className, city, offers }: MapProps): JSX.Element {
  const refMap = useRef<HTMLElement | null>(null);
  const map = useMap(refMap, city);
  const offerSelected = useAppSelector(getOfferSelected);

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
            !!offerSelected && id === offerSelected.id
              ? getCurrentCustomIcon()
              : getDefaultCustomIcon()
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, offerSelected]);

  return (
    <section ref={refMap} className={classNames(className, 'map')}></section>
  );
}

const MapMemo = memo(Map);
export default MapMemo;
