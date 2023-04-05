import { Location } from 'components';

type Props = {
  locations: string[];
}

{/* <h1 className="visually-hidden">Cities</h1>
<div className="tabs">
  <section className="locations container">
    <LocationList locations={offerLocations}/>
  </section>
</div> */}


export default function LocationList ({locations}: Props) {
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {locations.map((location) => (
              <li className="locations__item" key={location}>
                <Location location={location}/>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
