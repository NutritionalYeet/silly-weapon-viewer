import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

//
const dbUrl = `/chat_app/fetch_weapons.php`; 


class Weapon
{
  constructor(id,name,description, quality, sl, price, stamina,
    nerve, speed, charge, melee_damage, ranged_damage, spell_damage,
    healing, gouge, resilience, guard, dominance
  )
  {
    this.id = id
    this.name = name;
    this.description = description;
    this.quality = quality;
    this.sl = sl;
    this.price = price;
    this.stamina = stamina;

    this.nerve = nerve;
    this.speed = speed;
    this.charge = charge;
    this.melee_damage = melee_damage;
    this.ranged_damage = ranged_damage
    this.spell_damage = spell_damage;
    this.healing = healing;
    this.gouge = gouge;
    this.resilience = resilience;
    this.guard = guard; 
    this.dominance = dominance;
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
      ? data.weapons.map(weapon => 
        new Weapon(weapon.id, weapon.name, weapon.description, weapon.quality,
          weapon.sl, weapon.price, weapon.stamina, weapon.nerve, weapon.speed, weapon.charge,
          weapon.melee_damage, weapon.ranged_damage, weapon.spell_damage, weapon.healing, weapon.gouge,
          weapon.resilience, weapon.guard,weapon.dominance
        ))
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
          <div class="weapon-selector border-window">
            
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


            {
              currentWeapon ? 
              <div class ="weapon-info-grid border-window">
                <h1>{currentWeapon.name}</h1>
                <h2>{currentWeapon.quality}</h2>

                <div class = "stat-column-container">
                  <div class = "stat-column">
                    <div class = "stat-row">
                      <p class = "stat-label">id</p><p class ="stat">{currentWeapon.id}</p>
                      
                    </div>
                    <div class = "stat-row">
                      <p class = "stat-label">level</p><p class ="stat">{currentWeapon.sl}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">stamina</p><p class ="stat">{currentWeapon.stamina}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">speed</p><p class ="stat">{currentWeapon.speed}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">melee dmg</p><p class ="stat">{currentWeapon.melee_damage}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">spell dmg</p><p class ="stat">{currentWeapon.spell_damage}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">gouge</p><p class ="stat">{currentWeapon.gouge}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">guard</p><p class ="stat">{currentWeapon.guard}</p>
                    </div>
                  </div>

                  <div class = "stat-column">

                    <div class = "stat-row">
                      <p class = "stat-label">price</p><p class ="stat">{currentWeapon.price}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">nerve</p><p class ="stat">{currentWeapon.nerve}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">charge</p><p class ="stat">{currentWeapon.charge}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">ranged dmg</p><p class ="stat">{currentWeapon.ranged_damage}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">healing</p><p class ="stat">{currentWeapon.healing}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">resilience</p><p class ="stat">{currentWeapon.resilience}</p>
                    </div>

                    <div class = "stat-row">
                      <p class = "stat-label">dominance</p><p class ="stat">{currentWeapon.dominance}</p>
                    </div>
                  </div>
                </div>

                <p>"{currentWeapon.description}"</p> 
              </div>
                : <img src={logo} className="App-logo" alt="logo" />
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
