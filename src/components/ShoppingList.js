import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  // selectedCategory state gets data from Filter component, 
  // uses it to update state/display items in this component 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Update state by passing the fetched array of items to setItems 
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then(r => r.json())
      .then(items => setItems(items));
  }, []);

  // callback passed as prop to ItemForm so that component can send server response from POST fetch 
  // back to this component in order to update items state
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }
  // callback passed to Item so that component can send server response's updated item from PATCH request
  // to this component in order to update isInCart part of items state
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter(item => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  // this event callback changes the selectedCategory state via changes captured in event handler
  // within Filter component
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // if selected category hasn't been changed / on initial render, display all items
  // if, on re-render, selectedCategory has changed from initial value of "All", 
  // this filter will return only the items for which the category property matches the
  // current, updated value of selectedCategory state
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        // value of selectedCategory state sent to Filter to display user-selected category
        // in filter select dropdown in that component
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            onUpdateItem={handleUpdateItem} 
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
