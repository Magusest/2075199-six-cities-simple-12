import { Marker, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { useMap } from 'hooks';
import { useAppSlector } from 'hooks/state';
import { AppRoute } from 'const';
import { useLocation } from 'react-router-dom';

// const {log} = console;

const defaultMarker = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const hoveredMarker = new Icon({
  iconUrl: './img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


export default function Map() {

  const currentOffers = useAppSlector(({rooms}) => rooms);
  const currentCity = useAppSlector(({city}) => city);
  const hovereCard = useAppSlector(({hoveredCard}) => hoveredCard);


  const {pathname} = useLocation();
  const ref = useRef(null);
  const map = useMap(ref, currentCity);

  useEffect(() => {
    if (map) {
      currentOffers.forEach((offer) => {
        const marker = new Marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === hovereCard)
              ? hoveredMarker
              : defaultMarker
          }
        );

        // marker.setIcon(defaultMarker)
        marker.addTo(map);

      });
    }
  }, [map, ref, currentOffers]);

  return (
    <section className={AppRoute.Main === pathname ? 'cities__map map' : 'property__map map'} ref={ref}></section>
  );
}
