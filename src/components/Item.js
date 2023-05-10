import React from "react";

// this component renders each item and the relevant information using the keys on each item object
// passsed in via { item } prop
function Item({ item, onUpdateItem, onDeleteItem }) {

  // callback fn for sending PATCH fetch request to update server data 
  // when user clicks the "Add to Cart" button
  // this fn also calls onUpdateItem prop to send updated item to ShoppingList in order to update item state
  // no need to pass the specific id of the item to be updated to this fn to be used in the fetch URL, 
  // since this component renders for each individual item, and you have access to the relevant item 
  // via the passed in { item } prop
  function handleAddToCartClick() {
    // add PATCH fetch request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // This is telling server "find the isInCart property on the object with the id in the URL,
        // and set it to the opposite of the isInCart status of the { item } prop passed in to this component"
        isInCart: !item.isInCart,
      }),
    })
      .then(r => r.json())
      .then(updatedItem => onUpdateItem(updatedItem));
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(r => r.json())
      // remember no server resposne here b/c deleting a resource - 
      // in onDeleteItem, pass the item passed to this component as a prop
      .then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
      className={item.isInCart ? "remove" : "add"} 
      onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
