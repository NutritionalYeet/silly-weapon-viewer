import logo from './inv_weapon_knife_vector.svg';
import './App.css';
import { useEffect, useState } from "react";
import { color } from 'three/tsl';

const dbUrl = `/chat_app/fetch_weapons.php`; 




class Weapon
{
  constructor(id,name,icon_file_path,description, quality, sl, price, stamina,
    nerve, speed, charge, melee_damage, ranged_damage, spell_damage,
    healing, gouge, resilience, guard, dominance, use_text
  )
  {
    this.id = id
    this.name = name;
    this.icon_file_path = icon_file_path;
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

    this.use_text = use_text;
  }

  getIconPath()
    {
      return `/assets/icons/${(this.icon_file_path !== "" && this.icon_file_path != null) ? this.icon_file_path : "question_mark_v4.jpg"}`
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
        new Weapon(weapon.id, weapon.name, weapon.icon_file_path, weapon.description, weapon.quality,
          weapon.sl, weapon.price, weapon.stamina, weapon.nerve, weapon.speed, weapon.charge,
          weapon.melee_damage, weapon.ranged_damage, weapon.spell_damage, weapon.healing, weapon.gouge,
          weapon.resilience, weapon.guard,weapon.dominance, weapon.use_text
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

  const getWeaponColor = (quality) => 
    {
      switch (quality) {
        case "debug":
          return "var(--quality-debug)";
        case "cheap":
          return "var(--quality-cheap)";
        case "ok":
          return "var(--quality-ok)";
        case "decent":
            return "var(--quality-decent)";
        case "good":
          return "var(--quality-good)";
        case "superior":
          return "var(--quality-superior)";
        case "rare":
          return "var(--quality-rare)";
        case "special":
          return "var(--quality-special)";
        case "extreme":
          return "var(--quality-extreme)";
        default:
          return "var(--primary-color)";
    }
  };

  const getActiveColor = (stat) => {

    if (isNaN(stat)) return "var(--text-color)";

    const num = parseInt(stat);

    const color = (num === 0) ? "var(--stat-zero)" : 
                  (num < 0) ? "var(--stat-negative)" : 
                  "var(--text-color)";
    console.log(color); // Check what color is returned
    return color;
  };

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

      <div className="main">

        <h1>Weapon Viewer</h1>
          <div id="mainRow">
            <div className = "weapon-selector">
              
                  {
                    items && items.length > 0 ?
                    <ul className = "weapons-list">
                      {items.map((item) =>(
                        <li className = "" key = {item.id}><button className = "border-window" style={{ color: getWeaponColor(item.quality) }} onClick={() => assignCurrentWeapon(item)}>
                          <div className = "list-item" >
                            <img className = "list-item-icon border-window"  src={item.getIconPath()} alt="Weapon icon" ></img>
                            <p className = "list-item-name" >{item.name}</p>
                          </div>
                          
                          </button>
                        </li>
                      ))}
                    </ul>
                    : 
                    <div className='error_message'>
                      <p>No data from the server.</p>
                      <p>Start the server, then try refreshing.</p>
                      <p>Ensure the database has at least one entry.</p>
                    </div>
                  }
            </div>
            <div id="content">


              <div className = "weapon-info-window">
                {
                  currentWeapon ?
                  <div className ="weapon-info-grid">

                    

                    <div className="item-header">
                    <img className="border-window item-image" src={currentWeapon.getIconPath()} alt="Weapon icon" />
                        <h2 className="item-title" style={{ color: getWeaponColor(currentWeapon.quality) }}>
                          {currentWeapon.name}
                        </h2>
                    </div>

                    <div className = "stat-column-container">
                      <div className = "stat-column">
                        <div className = "stat-row">
                          <p className = "stat-label">id</p><p className ="stat">{currentWeapon.id}</p>
                        </div>
                        <hr/>
                        <div className = "stat-row">
                          <p className = "stat-label">level</p><p className ="stat">{currentWeapon.sl}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.stamina) }}>
                          <p className = "stat-label">stamina</p><p className ="stat">{currentWeapon.stamina}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.speed) }}>
                          <p className = "stat-label">speed</p><p className ="stat">{currentWeapon.speed}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.melee_damage) }}>
                          <p className = "stat-label">melee dmg</p><p className ="stat">{currentWeapon.melee_damage}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.spell_damage) }}>
                          <p className = "stat-label">spell dmg</p><p className ="stat">{currentWeapon.spell_damage}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.gouge) }}>
                          <p className = "stat-label">gouge</p><p className ="stat">{currentWeapon.gouge}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.guard) }}>
                          <p className = "stat-label">guard</p><p className ="stat">{currentWeapon.guard}</p>
                        </div>
                      </div>

                      <div className = "stat-column">

                        <div className = "stat-row" >
                          <p className = "stat-label">price</p><p className ="stat">$ {currentWeapon.price}</p>
                        </div>

                        <hr/>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.nerve) }}>
                          <p className = "stat-label">nerve</p><p className ="stat">{currentWeapon.nerve}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.charge) }}>
                          <p className = "stat-label">charge</p><p className ="stat">{currentWeapon.charge}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.ranged_damage) }}>
                          <p className = "stat-label">ranged dmg</p><p className ="stat">{currentWeapon.ranged_damage}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.healing) }}>
                          <p className = "stat-label">healing</p><p className ="stat">{currentWeapon.healing}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.resilience) }}>
                          <p className = "stat-label">resilience</p><p className ="stat">{currentWeapon.resilience}</p>
                        </div>

                        <div className = "stat-row" style={{ color: getActiveColor(currentWeapon.dominance) }}>
                          <p className = "stat-label">dominance</p><p className ="stat">{currentWeapon.dominance}</p>
                        </div>
                      </div>
                    </div>

                    {(currentWeapon.description !== "" && currentWeapon.description !== null) &&(
                          <i><p className="item-description">"{currentWeapon.description}"</p></i>
                    )}

                    

                    {(currentWeapon.use_text !== "" && currentWeapon.use_text !== null) &&(
                          <p className="item-use-text">Use: {currentWeapon.use_text}</p>
                    )}
                  
                    
                  </div>
                    : <img src={logo} className="App-logo" alt="logo" />
                }
              </div>
              

          </div>
        </div>
      </div>



      </header>
    </div>
  );
}

export default App;
