import logo from './inv_weapon_knife_vector.svg';
import { ReactComponent as MonetarySymbol } from './money_symbol.svg';
import './App.css';
import { useEffect, useState } from "react";

const dbUrl = `/chat_app/fetch_weapons.php`; 

const title = `Armory`;

/**
 * A template for a weapon object.
 */
class Weapon
{
  /**
   * 
   * @param {*} id the object id
   * @param {*} name the name of the weapon
   * @param {*} icon_file_path the name of the image file
   * @param {*} description
   * @param {*} quality enum
   * @param {*} sl "security level" - the level of the item
   * @param {*} price
   * @param {*} stamina 
   * @param {*} nerve 
   * @param {*} speed 
   * @param {*} charge 
   * @param {*} melee_damage 
   * @param {*} ranged_damage 
   * @param {*} spell_damage 
   * @param {*} healing 
   * @param {*} gouge 
   * @param {*} resilience 
   * @param {*} guard 
   * @param {*} dominance 
   * @param {*} use_text 
   */
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

  /**
   * @returns the name of the image associated with this item
   */
  getIconPath()
    {
      return `/assets/icons/${(this.icon_file_path !== "" && this.icon_file_path != null) 
        ? 
          this.icon_file_path 
        : 
          "question_mark_v4.jpg"}`
    }
}

/**
 * Returns enough placeholder weapons to allow for scrolling in the UI, for demonstration purposes.
 */
const createPlaceholderWeapons = () =>
  {
    const arr = [];

    for (let i = 0; i < 15; i++)
      {
        arr.push(new Weapon(0, `PlaceholderWeapon ${i}`))
      }

    return arr;
  }

  /**
   * Fetches weapons from a database.
   * @param {*} url 
   * @returns an array of Weapons
   */
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

    return weapons;
  }
  catch(error)
  {
    console.error("Error fetching weapons: "+error);

    //Generate placeholder weapons; remove this line to suppress this behavior.
    return createPlaceholderWeapons() || []; 

    // Uncomment this to return an empty array
    // return [];
  }
};

/**
 * Gets the color a stat should be based on it is positive, zero, or negative.
 * @note By default, the app currently hides stats that are unused.
 * If you suppress the hiding behavior, stats that are zero will display with
 * the stat-zero color (i.e. gray).
 * @param {*} stat a number
 * @returns a color
 */
const getActiveColor = (stat) => {

  if (isNaN(stat)) return "var(--text-color)";

  const num = parseInt(stat);

  const color = (num === 0) ? "var(--stat-zero)" : 
                (num < 0) ? "var(--stat-negative)" : 
                "var(--text-color)";
  return color;
};

/**
 * Generates an HTML row featuring the label and value of an item stat.
 * @param {*} stat The stat to display
 * @param {*} label The name of the stat
 * @param {*} hideIfZero If true, will not render this stat if it is 0.
 * @returns 
 */
const createStatRow = (stat,label, hideIfZero) =>
{
  return (!(hideIfZero && stat == 0)) 
    ? <div className = "stat-row" style={{ color: getActiveColor(stat) }}>
        <p className = "stat-label">{label}</p><p className ="stat">{stat}</p>
      </div>
    : 
      null
    ;
}




function App() {

  const [filteredItems, setFilteredItems] = useState([]);

  const [items,setItems] = useState([]);

  const [currentWeapon, setCurrentWeapon] = useState(null);

  useEffect(()=>{
    const getItems = async () =>
    {
      const fetchedItems = await fetchWeapons(dbUrl);
      setItems(Array.isArray(fetchedItems) ? fetchedItems : []);
      setFilteredItems(Array.isArray(fetchedItems) ? fetchedItems : []);
    };
    getItems();
  },[dbUrl]);

  /**
   * filters results and updates the array of filtered items
   * @param {*} text search term(s) - string
   */
  const filterResults = (text) => {

    if (typeof(text) !== "string" || text.trim() === ``) 
      {
        //show all results
        setFilteredItems(items);
        return;
      }

    const keyWords = text.toLowerCase().trim().split(` `);
  
    const filtered = items.filter(item => 
      keyWords.some(keyword => item.name.toLowerCase().includes(keyword))
    );
  
    setFilteredItems(filtered);  // Ensure this updates the state with filtered results
  };

  /**
   * @param {*} quality the enum quality of the weapon
   * @returns a string
   */
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

  return (
    <div className="App">
      <header className="App-header">

      <div className="main">

       <b><h1>{title}</h1></b>
          <div id="mainRow">
            <div className = "weapon-selector">
              <input className = 'search-bar' id="filled-basic" label="Outlined" variant="outlined" placeholder="Search the armory..." onChange={(text) => filterResults(text.target.value)}></input>
                  {
                    items && items.length > 0 
                    ?
                    
                      
                      <ul className = "weapons-list">
                        {filteredItems.map((item) =>(
                          <li className = "" key = {item.id}><button className = "border-window-subtle" style={{ color: getWeaponColor(item.quality) }} onClick={() => setCurrentWeapon(item)}>
                            <div className = "list-item" >
                              <img className = "list-item-icon border-window-subtle"  src={item.getIconPath()} alt="Weapon icon" ></img>
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

                        
                        {createStatRow(currentWeapon.id,`id`/*Don't hide id if === 0*/)}

                        <hr/>

                        {createStatRow(currentWeapon.sl,`level`) /*Don't hide level if === 0*/}
                        {createStatRow(currentWeapon.stamina,`stamina`,true)}
                        {createStatRow(currentWeapon.speed,`speed`,true)}
                        {createStatRow(currentWeapon.melee_damage,`melee dmg`,true)}
                        {createStatRow(currentWeapon.spell_damage,`spell dmg`,true)}
                        {createStatRow(currentWeapon.gouge,`gouge`,true)}
                        {createStatRow(currentWeapon.guard,`guard`,true)}
                        
                      </div>

                      <div className = "stat-column">

                        <div className = "stat-row" >
                          <p className = "stat-label">price</p>
                          <MonetarySymbol className="money-symbol" />
                          <p className ="stat">{currentWeapon.price}</p>
                        </div>

                        <hr/>

                        {createStatRow(currentWeapon.nerve,`nerve`,true)}
                        {createStatRow(currentWeapon.charge,`charge`,true)}
                        {createStatRow(currentWeapon.ranged_damage,`ranged dmg`,true)}
                        {createStatRow(currentWeapon.healing,`healing`,true)}
                        {createStatRow(currentWeapon.resilience,`resilience`,true)}
                        {createStatRow(currentWeapon.dominance,`dominance`,true)}

                      </div>
                    </div>


                    {currentWeapon.description && <i><p className="item-description">"{currentWeapon.description}"</p></i>}

                    

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
