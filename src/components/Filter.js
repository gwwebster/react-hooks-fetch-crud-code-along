import React from "react";

// this component captures changes to <select> dropdown using onChange handler and value attributes on each <option> element,
// sends up to parent ShoppingList to update state there
// parent ShoppingList sends current value of selectedCategory state to this component, 
// which is displayed via value attribute on <select> element

function Filter({ category, onCategoryChange }) {
  return (
    <div className="Filter">
      <select
        name="filter"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">Filter by category</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}

export default Filter;
