import './loading-screen.css';

export default function LoadingScreen() {
  return (
    <div className='loader-container'>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  );
}
