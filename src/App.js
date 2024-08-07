import { useState } from "react";

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({}); 
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

export default function App() {
  const [countClicks, setCountClicks] = useState(0);

  const { isLoading, position, error, getPosition } = useGeolocation();

  const handleClick = () => {
    setCountClicks((count) => count + 1);
    getPosition(); // Fetch new position when button is clicked again
  };

  return (
    <div className="App">
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && position && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${position.lat}/${position.lng}`}
          >
            {position.lat}, {position.lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
