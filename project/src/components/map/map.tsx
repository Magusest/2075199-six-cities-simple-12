import { Marker, Icon, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { useMap } from 'hooks';
import { useAppSlector } from 'hooks/state';
import { AppRoute } from 'const';
import { useLocation } from 'react-router-dom';

// const {log} = console;

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


export default function Map() {

  const currentOffers = useAppSlector(({currentRooms}) => currentRooms);
  const currentCity = useAppSlector(({city}) => city);
  const hoverCard = useAppSlector(({hoveredCard}) => hoveredCard);


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

      const markers = currentOffers.map(
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
  }, [currentCity, cityLocation, map, currentOffers, hoverCard]);

  return (
    <section className={AppRoute.Main === pathname ? 'cities__map map' : 'property__map map'} ref={ref}></section>
  );
}
