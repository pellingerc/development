import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cafeData from "./assets/cafe.json"
import DrinkItem from './components/DrinkItem';
import {Button, Dropdown} from 'react-bootstrap';
import { useDebugValue, useState } from 'react';
import { CheckBox, Text, StyleSheet, View } from "react";
import AccordionItem from 'react-bootstrap/esm/AccordionItem';


function App() {
  const intialList = []
  const [drinkType, setDrinkType] = useState("All");
  const [dietType, setDietType] = useState("All");
  const [sortType, setSortType] = useState("None");
  const [viewFav, setViewFav] = useState("All");
  const [favorites, setFavorites] = useState(intialList);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectDrinkFilterType = eventKey => {
    setDrinkType(eventKey);
  }

  const matchesDrinkFilterType = item => {
    if (drinkType === "All"){
      return true
    }
    else if (drinkType === item.drink){
      return true
    }
    else{
      return false
    }
  }

  const selectDietFilterType = eventKey => {
    setDietType(eventKey);
  }

  const matchesDietFilterType = item => {
    if (dietType === "All"){
      return true
    }
    else if (dietType === item.diet){
      return false
    }
    else{
      return true
    }
  }

  const selectViewFav = eventKey => {
    setViewFav(eventKey);
  }

  const matchesFavFilter = item => {
    if (viewFav === "All"){
      return true
    }
    else{
      return favorites.includes(item)
    }
  }

  const filteredData = cafeData.filter(matchesDrinkFilterType).filter(matchesDietFilterType).filter(matchesFavFilter);

  const selectSortType = eventKey => {
    setSortType(eventKey);
  }

  var sortedItems

  function sorting(items){ 
    if (sortType != "None"){
      if (sortType === "price"){
        sortedItems = items.sort((a, b) => {
          return a.price - b.price
        })
      }
      else if (sortType === "calories"){
        sortedItems = items.sort((a, b) => {
          return a.calories - b.calories
        })
      }
      console.log(sortedItems)
      return sortedItems
    }
    return items
  }

  const sortedDrinks = sorting(filteredData);

  function addToFav(item){
    const tempList = favorites.concat([item]);
    setFavorites(tempList);
    setTotalPrice(totalPrice + item.price)
    console.log(item);
    console.log(favorites);
  }

  function removeFromFav(item){
    const tempList = favorites.filter(a => a !== item)
    setFavorites(tempList);
    setTotalPrice(totalPrice - item.price)
  }

  function favButton(item){
    if (favorites.includes(item)){
      return (<button id="addFav" onClick={() => removeFromFav(item)}>Remove From Favorites</button>)
    }
    else{
      return (<button id="addFav" onClick={() => addToFav(item)}>Add To Favorites</button>)
    }
  }

  function resetFilters(){
    setDietType("All");
    setDrinkType("All");
    setSortType("None");
    setViewFav("All");
  }

  return (
    <div className="App">
      <h1>Cafe</h1>
      <div className='page'>
      <div className='menu'>
         Filters
         
         <Dropdown onSelect={selectSortType} className='selector'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort By
          </Dropdown.Toggle>
          <Dropdown.Menu >
            <Dropdown.Item eventKey="price">Price</Dropdown.Item>
            <Dropdown.Item eventKey="calories">Calories</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={selectDrinkFilterType} className='selector'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Drink Type
          </Dropdown.Toggle>
          <Dropdown.Menu >
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="coffee">Coffee</Dropdown.Item>
            <Dropdown.Item eventKey="tea">Tea</Dropdown.Item>
            <Dropdown.Item eventKey="mocha">Mocha</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={selectDietFilterType} className='selector'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Allergy Restrictions
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item eventKey="All">None</Dropdown.Item>
            <Dropdown.Item eventKey="Nuts">Nut Free</Dropdown.Item>
            <Dropdown.Item eventKey="Dairy">Dairy Free</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={selectViewFav} className='selector'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            View Favorites
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="favs">Favorites</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br></br>
      
      Total Price: ${Math.abs(totalPrice.toFixed(2))}

      <br></br>
      <button onClick={resetFilters}>Reset Sort and Filters</button>
      </div>
      
      
      
      <div className="display">
      
        {sortedDrinks.map((item) => (
          <div className="drink">
            <DrinkItem name={item.name} price={item.price} calories={item.calories} image={item.image} allergy={item.diet}/>
            {favButton(item)}
          </div>

        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
