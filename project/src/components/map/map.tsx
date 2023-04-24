import { Marker, Icon, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { useMap } from 'hooks';
import { useAppSlector } from 'hooks/state';
import { AppRoute } from 'const';
import { useLocation } from 'react-router-dom';
import { getCurrentCity, getHoverCard } from 'store/offers/selectors';
import { Offers } from 'types/offers';

// const {log} = console;

type Props = {
  offers: Offers;
}

const defaultMarker = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const hoveredMarker = new Icon({
  iconUrl: './img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});


export default function Map({offers}: Props) {

  const currentCity = useAppSlector(getCurrentCity);
  const hoverCard = useAppSlector(getHoverCard);


  const {pathname} = useLocation();
  const ref = useRef(null);
  const map = useMap(ref, currentCity);

  const [cityLocation, setCityLocation] = useState(currentCity.name);


  useEffect(() => {
    if (map) {
      if (currentCity.name !== cityLocation) {
        map.flyTo(
          [
            currentCity.location.latitude,
            currentCity.location.longitude
          ],
          currentCity.location.zoom,
          {
            animate: true,
            duration: 1,
          }
        );

        setCityLocation(currentCity.name);
      }

      const markers = offers.map(
        (offer) =>
          new Marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            }, {
              icon: offer.id === hoverCard ? hoveredMarker : defaultMarker,
            }
          )
      );

      const markerLayer = new LayerGroup(markers);
      markerLayer.addTo(map);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [currentCity, cityLocation, map, offers, hoverCard]);

  return (
    <section className={AppRoute.Main === pathname ? 'cities__map map' : 'property__map map'} style={{maxHeight: '100vh'}} ref={ref}></section>
  );
}
