import { Marker, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { useMap } from 'hooks';
import { Offers, Offer } from 'types/offers';
import { AppRoute } from 'const';
import { useLocation } from 'react-router-dom';

// const {log} = console;

type Props = {
  offers: Offers;
  city: Offer['city'];
}

const defaultMarker = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map({offers, city}: Props) {

  const {pathname} = useLocation();
  const ref = useRef(null);
  const map = useMap(ref, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }
        );

        marker.setIcon(defaultMarker)
          .addTo(map);
      });
    }
  }, [map, offers]);


  return (
    <section className={AppRoute.Main === pathname ? 'cities__map map' : 'property__map map'} ref={ref}></section>
  );
}
