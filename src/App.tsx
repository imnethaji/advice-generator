import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
const baseURL = "https://api.adviceslip.com/advice";

function App() {
  const [advice, setAdvice] = useState(null);
  const [id, setID] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdvice = () => {
    setLoading(true); // Set loading to true when the button is clicked
    // Simulate a 2-second delay using setTimeout
    setTimeout(() => {
      axios
        .get(baseURL)
        .then((response) => {
          setAdvice(response.data.slip.advice);
          setID(response.data.slip.id);
          setLoading(false); // Set loading to false after fetching advice
        })
        .catch((error) => {
          console.error("Error fetching advice:", error);
          setLoading(false); // Set loading to false in case of an error
        });
    }, 2000); // Delay for 2 seconds
  };
  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <>
      <div className="advice_container">
        {loading ? (
          <p>Loading advice...</p>
        ) : (
          <>
            <p className="advice_id">ADVICE # {id}</p>
            <h2>"{advice}"</h2>
            <hr />
          </>
        )}
        <div className="button_container" onClick={fetchAdvice}>
          <img src="../src/assets/icon-dice.svg" alt="Dice Image" />
        </div>
      </div>
    </>
  );
}

export default App;
