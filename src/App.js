/**
 * Audrey Victor
 */

import logo from './inv_weapon_knife_vector.svg';
import { ReactComponent as MonetarySymbol } from './money_symbol.svg';
import './App.css';
import { useEffect, useState } from "react";

const dbUrl = `/chat_app/fetch_weapons.php`;

const title = `Armory`;

/**
 * An example item manager which handles the fetching of items.
 */
class ItemManager {
  /**
   * Fetching protocol, currently specific to the Weapon subclass.
   * @param {*} url the url to fetch weapons from
   * @returns an array
   */
  static fetchWeapons = async (url) => {
    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Nooo! Failed to fetch weapons! :(");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error("Error reading data: " + data.error);
      }

      const weapons = Array.isArray(data.weapons)
        ? data.weapons.map(weapon =>
          new Weapon(weapon.id, weapon.name, weapon.icon_file_path, weapon.description, weapon.quality,
            weapon.sl, weapon.price, weapon.stamina, weapon.nerve, weapon.speed, weapon.charge,
            weapon.melee_damage, weapon.ranged_damage, weapon.spell_damage, weapon.healing, weapon.gouge,
            weapon.resilience, weapon.guard, weapon.dominance, weapon.use_text
          ))
        : [];

      return weapons;
    }
    catch (error) {
      // console.log("Error fetching weapons: "+error);

      //Generate placeholder weapons; remove this line to suppress this behavior.
      return createPlaceholderWeapons() || [];

      // Uncomment this to return an empty array
      // return [];
    }
  };

}

/**
 * Template for an item.
 */
class Item {
  /**
 * @param {*} id the object id
 * @param {*} name the name of the item
 * @param {*} icon_file_path the name of the image file
 * @param {*} description
 * @param {*} quality enum
 * @param {*} sl "security level" - the level of the item
 * @param {*} price
 * @param {*} stamina 
 * @param {*} nerve 
 * @param {*} healing 
 * @param {*} resilience 
 * @param {*} guard 
 * @param {*} dominance 
 * @param {*} use_text 
 */
  constructor(id, name, icon_file_path, description, quality, sl, price, stamina,
    nerve, healing, resilience, guard, dominance, use_text
  ) {
    this.id = id
    this.name = name;
    this.icon_file_path = icon_file_path;
    this.description = description;
    this.quality = quality;
    this.sl = sl;
    this.price = price;
    this.stamina = stamina;

    this.nerve = nerve;

    this.healing = healing;
    this.resilience = resilience;
    this.guard = guard;
    this.dominance = dominance;

    this.use_text = use_text;
  };

  /**
   * @returns the name of the image associated with this item
   */
  getIconPath() {
    return `/assets/icons/${(this.icon_file_path !== "" && this.icon_file_path != null)
      ?
      this.icon_file_path
      :
      "question_mark_v4.jpg"}`
  }

  /**
  * @returns a string for the color of this item, assuming it has an enum called 'quality'.
  * If not, return the primary color of the app.
  */
  static getItemColor = (quality) => {
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

  /**
   * @returns a string for the color of this item, assuming it has an enum called 'quality'.
   * If not, return the primary color of the app.
   */
  getItemColor = () => {
    switch (this.quality) {
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
}

/**
 * A template for a weapon object.
 * This example adds a few more stats.
 */
class Weapon extends Item {
  /**
   * @param {*} id the object id
   * @param {*} name the name of the weapon
   * @param {*} icon_file_path the name of the image file
   * @param {*} description
   * @param {*} quality enum
   * @param {*} sl "security level" - the level of the weapon
   * @param {*} price
   * @param {*} stamina 
   * @param {*} nerve 
   * @param {*} speed weapon-specific stat
   * @param {*} charge weapon-specific stat
   * @param {*} melee_damage weapon-specific stat
   * @param {*} ranged_damage weapon-specific stat
   * @param {*} spell_damage weapon-specific stat
   * @param {*} healing 
   * @param {*} gouge weapon-specific stat
   * @param {*} resilience 
   * @param {*} guard 
   * @param {*} dominance 
   * @param {*} use_text 
   */
  constructor(id, name, icon_file_path, description, quality, sl, price, stamina,
    nerve, speed, charge, melee_damage, ranged_damage, spell_damage,
    healing, gouge, resilience, guard, dominance, use_text
  ) {
    super(id, name, icon_file_path, description, quality, sl, price, stamina,
      nerve, healing, resilience, guard, dominance, use_text);

    this.melee_damage = melee_damage;
    this.ranged_damage = ranged_damage
    this.spell_damage = spell_damage;
    this.speed = speed;
    this.charge = charge;
    this.gouge = gouge;
  }

  /**
   * @returns an array of objects representing stats, 
   * their labels, and whether they should be hidden if 0.
   */
  getStatsColumn1() {
    return [
      { value: this.stamina, label: 'stamina', shouldHideZero: true },
      { value: this.speed, label: 'speed', shouldHideZero: true },
      { value: this.melee_damage, label: 'melee dmg', shouldHideZero: true },
      { value: this.spell_damage, label: 'spell dmg', shouldHideZero: true },
      { value: this.gouge, label: 'gouge', shouldHideZero: true },
      { value: this.guard, label: 'guard', shouldHideZero: true },
    ];
  }

  /**
   * @returns an array of objects representing stats, 
   * their labels, and whether they should be hidden if 0.
   */
  getStatsColumn2() {
    return [
      { value: this.nerve, label: 'nerve', shouldHideZero: true },
      { value: this.charge, label: 'charge', shouldHideZero: true },
      { value: this.ranged_damage, label: 'ranged dmg', shouldHideZero: true },
      { value: this.healing, label: 'healing', shouldHideZero: true },
      { value: this.resilience, label: 'resilience', shouldHideZero: true },
      { value: this.dominance, label: 'dominance', shouldHideZero: true },
    ];
  }

}

/**
 * @returns enough placeholder weapons to allow for scrolling in the UI, for demonstration purposes.
 */
const createPlaceholderWeapons = () => {
  const arr = [];

  for (let i = 0; i < 15; i++) {
    arr.push(new Weapon(i, `Placeholder Weapon ${i}`, ``, `This is a placeholder weapon for demonstration purposes.`))
  }

  return arr;
}

/**
 * Fetches weapons from a database.
 * @param {*} url 
 * @returns an array of Weapons
 */

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
 * @param {*} shouldHideZero If true, will not render this stat if it is 0.
 * @returns null if the stat is invalid or if the stat is 0 and hideIfZero is true.
 */
const createStatRow = (stat, label, shouldHideZero, index) => {
  if (isNaN(stat)) return null;

  return !(shouldHideZero && parseInt(stat) === 0) ? (
    <div
      /**key to prevent React errors*/
      key={`${label}-${index}`}
      className="stat-row"
      style={{ color: getActiveColor(stat) }}
    >
      <p className="stat-label">{label}</p>
      <p className="stat">{stat}</p>
    </div>
  ) : null;
};

/**
 * @param {*} stats Expects an array of objects with label, value, and hideIfZero properties.
 * @returns an array of stat rows (stat labels + values)
 */
const createStatRows = (stats) => {
  return stats.map((stat, index) => {
    if (typeof (stat.label) !== "string" || stat.shouldHideZero === undefined) return null;
    if (stat.value === 0 && stat.shouldHideZero) return null;
    return createStatRow(stat.value, stat.label, stat.shouldHideZero, index);
  });
};




function App() {

  const [filteredItems, setFilteredItems] = useState([]);

  const [items, setItems] = useState([]);

  const [currentWeapon, setCurrentWeapon] = useState(null);


  //Fetch items; set items and filtered items
  useEffect(() => {
    try {
      const getItems = async () => {

        const fetchedItems = await ItemManager.fetchWeapons(dbUrl);
        setItems(Array.isArray(fetchedItems) ? fetchedItems : []);
        setFilteredItems(Array.isArray(fetchedItems) ? fetchedItems : []);
      }

      getItems();
    }
    catch (error) {
      console.log("Failed to load items. Please try again later.");
    }
  }, []);

  /**
   * filters results and updates the array of filtered items based on text in the search box.
   * @param {*} text search term(s) - string
   */
  const filterResults = (text) => {

    if (typeof (text) !== "string" || text.trim() === ``) {
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



  return (
    <div className="App">
      <header className="App-header">

        <div className="main">

          <b><h1>{title}</h1></b>
          <div id="mainRow">
            <div className="weapon-selector">
              <input className='search-bar' id="filled-basic" label="Outlined" variant="outlined" placeholder="Search the armory..."
                onChange={(text) => filterResults(text.target.value)}

                //automatically select the first item in the search results when enter is pressed
                onKeyDown={(e) => { if (filteredItems.length > 0 && (e.key === `Enter` || e.keyCode === 13)) setCurrentWeapon(filteredItems[0]) }}></input>
              {
                items && items.length > 0
                  ?

                  <ul className="weapons-list">
                    {
                      /*Generate a list of weapons.*/
                      filteredItems.map((item) => (
                        <li className="" key={item.id}><button className="border-window-subtle"
                          style={{ color: item.getItemColor() /*Assuming items have a "quality" enum, gets a color of the item name */ }}
                          onClick={() => setCurrentWeapon(item)/* */}>
                          <div className="list-item" >
                            <img className="list-item-icon border-window-subtle" src={item.getIconPath()} alt="Weapon icon" onError={(e) => e.target.src = '/assets/icons/question_mark_v4.jpg'}></img>
                            <p className="list-item-name" >{item.name}</p>
                          </div>

                        </button>
                        </li>
                      ))}
                  </ul>
                  :
                  <div className='error_message'>
                    <p>No results found.</p>
                    <p>Start the server, then try refreshing.</p>
                    <p>Ensure the database has at least one entry.</p>
                  </div>
              }
            </div>
            <div id="content">

              <div className="weapon-info-window">
                {
                  currentWeapon ?
                    <div className="weapon-info-grid">

                      <div className="item-header">
                        <img className="border-window item-image" src={currentWeapon.getIconPath()} alt="Weapon icon" onError={(e) => e.target.src = '/assets/icons/question_mark_v4.jpg'} />
                        <h2 className="item-title" style={{ color: Item.getItemColor(currentWeapon.quality) }}>
                          {currentWeapon.name}
                        </h2>
                      </div>

                      <div className="stat-column-container">
                        <div className="stat-column">

                          {/*Below, generate two stat columns of weapon details. Could ideally be done in a loop.*/}

                          {createStatRow(currentWeapon.id, `id`)}

                          <hr />

                          {createStatRows(currentWeapon.getStatsColumn1())}

                        </div>

                        <div className="stat-column">

                          <div className="stat-row" >
                            <p className="stat-label">price</p>
                            <MonetarySymbol className="money-symbol" />
                            <p className="stat">{currentWeapon.price}</p>
                          </div>

                          <hr />

                          {createStatRows(currentWeapon.getStatsColumn2())}

                        </div>
                      </div>

                      {currentWeapon.description && <i><p className="item-description">"{currentWeapon.description}"</p></i>}

                      {(currentWeapon.use_text !== "" && currentWeapon.use_text !== null) && (
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
