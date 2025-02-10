import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

//
const dbUrl = `/chat_app/fetch_weapons.php`; 

class Weapon
{
  constructor(id,n,d)
  {
    this.id = id
    this.name = n;
    this.description = d;
  }
}

let weapons = [];

let currentWeapon = null;

const fetchWeapons = async (url) => {
  try
  {
    const response = await fetch(url);

    if (!response.ok)
      {
        throw new Error("Nooo! Failed to fetch weapons! :(");
      }

    const data = await response.json();

    const weapons = Array.isArray(data.weapons) 
      ? data.weapons.map(weapon => new Weapon(weapon.id, weapon.name,weapon.description))
      : [];

    currentWeapon = weapons.length > 0? weapons[0] : null;

    return weapons;
  }
  catch(error)
  {
    console.error("Error fetching weapons: "+error);
    return[];
  }
};

function App() {

  const [items,setItems] = useState([]);

  //updating the current weapon
  const stateArray = useState(null);
  const currentWeapon = stateArray[0];
  const assignCurrentWeapon = stateArray[1];


  useEffect(()=>{
    const getItems = async () =>
    {
      const fetchedItems = await fetchWeapons(dbUrl);
      setItems(Array.isArray(fetchedItems) ? fetchedItems : []);
    };

    getItems();

  },[dbUrl]); // Only updates if the url changes

  return (
    <div className="App">
      <header className="App-header">
        <div id="mainRow">
          <div id="weapon-selector">
            
            <div>
                <h1>Weapons List</h1>
                <ul>
                  {items.map((item) =>(
                    <li key = {item.id}><button onClick={() => assignCurrentWeapon(item)}>{item.name}</button></li>
                  ))}
                </ul>
              </div>
          </div>
          <div id="content">

            <div>
                <h1>{currentWeapon.name}</h1>
            </div>
            {
              currentWeapon ? <p>{currentWeapon.description}</p> : <img src={logo} className="App-logo" alt="logo" />
            }
            


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

          </div>
        </div>


      </header>
    </div>
  );
}

export default App;
