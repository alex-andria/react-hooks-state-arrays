import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  //filter states
  const [filterBy, setFilterBy] = useState("All")

  //filter function
  function handleFilterChange(event){
    setFilterBy(event.target.value);
  }

  //filtered food array to display
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });
  
  //to add new food using spread operatior as React will only update state if a new obj/arr is passed to setState.
  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  //using .filter to return all elements of an array minus that id (delete)
    // function handleLiClick(id){
    //   const newFoodArray = foods.filter((food) => food.id !== id);
    //   setFoods(newFoodArray);
    // }

  //using .map to update elements in Arrays in State
  function handleLiClick(id){
    const newFoodArray = foods.map((food) => {
      if(food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else{
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  //food list generator using .map
  //foods is changed to foodsToDisplay for filter
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  //return function
  return (
    <>
    <select name="filter" onChange={handleFilterChange}>
    <option value="All">All</option>
    <option value="American">American</option>
    <option value="Sichuan">Sichuan</option>
    <option value="Thai">Thai</option>
    <option value="Mexican">Mexican</option>
    </select>

    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
    </>
  );
}

export default SpicyFoodList;
