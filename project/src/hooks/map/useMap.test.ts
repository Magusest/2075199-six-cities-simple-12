import { MutableRefObject } from 'react';
import { renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import useMap from './useMap';
import { makeFakeCity } from 'utils/mocks';

const mapRef: MutableRefObject<HTMLElement | null> = {
  current: document.createElement('div'),
};

describe('Hook: useMap', () => {
  const city = makeFakeCity();

  it('should return instance of Map', () => {
    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).toBeInstanceOf(Map);
  });
});
