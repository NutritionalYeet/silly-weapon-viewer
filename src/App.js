import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

const dbUrl = `/chat_app/fetch_weapons.php`; 

const fetchWeapons = async (url) => {
  try
  {
    const response = await fetch(url);

    if (!response.ok)
      {
        throw new Error("Nooo! Failed to fetch weapons! :(");
      }

    const data = await response.json();
    return Array.isArray(data.weapons) ? data.weapons : [];
  }
  catch(error)
  {
    console.error("Error fetching weapons: "+error);
    return[];
  }
};

function App() {

  const [items,setItems] = useState([]);


  useEffect(()=>{
    const getItems = async () =>
    {
      const fetchedItems = await fetchWeapons(dbUrl);
      setItems(Array.isArray(fetchedItems) ? fetchedItems : []);
    };

    getItems();

  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <h1>Weapons List</h1>
          <ul>
            {items.map((item) =>(
              <li key = {item.id}>{item.name}</li>
            ))}
          </ul>
        </div>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
