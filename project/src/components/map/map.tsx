import { Marker, Icon, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useEffect, useRef, useState } from 'react';
import { useMap } from 'hooks';
import { useAppSlector } from 'hooks/state';
import { AppRoute } from 'const';
import { useLocation } from 'react-router-dom';
import { getCurrentCity } from 'store/offers/selectors';
import { Offer, Offers } from 'types/offers';

type Props = {
  offers: Offers;
  selectedOffer: Offer | null;
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


function Map({offers, selectedOffer}: Props) {

  const currentCity = useAppSlector(getCurrentCity);


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
              icon: offer.id === selectedOffer?.id ? hoveredMarker : defaultMarker,
            }
          )
      );

      const markerLayer = new LayerGroup(markers);
      markerLayer.addTo(map);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [currentCity, cityLocation, map, offers, selectedOffer]);

  return (
    <section className={AppRoute.Main === pathname ? 'cities__map map' : 'property__map map'} style={{maxHeight: '100vh'}} ref={ref}></section>
  );
}

export default memo(Map);
