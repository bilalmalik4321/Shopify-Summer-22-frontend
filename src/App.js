import './App.css';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { UpdateItem } from "./updateItem";
import { AddItem } from "./addItem";

function App() {

  const [inventory, setInventory] = useState([]);
  const [id, setID] = useState(-1);

  const getInventory = () => {
    fetch('http://localhost:5000/inventory')
    .then(result => {return result.json()})
    .then(data => {
      console.log(data);
      setInventory(data);
    });
  }

  const deleteItem = (id) => {
    fetch("http://localhost:5000/inventory/"+id, 
    {  method: "DELETE",  headers: {    "Content-type": "application/json"  }}) 
    .then(response => {    
      console.log(response.status);     
      return response.json();  
    })  
    .then(data => console.log(data));
    getInventory();
  }

  const updateItem = (id) => {
    console.log(id);
    fetch("http://localhost:5000/inventory/"+id, { 
    method: "PATCH",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(
        {    title: "Corrected post"  }
        )}) 
    .then(response => {    console.log(response.status);     return response.json();  })  .then(data => console.log(data));
    getInventory();
  }

  useEffect(()=>{
    getInventory();
  },[])

  console.log(inventory);

  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: 'left' }}>
        <Router>
          <Routes>
            <Route path="/" element={
              <>
              <div>
                <h1>Inventory Items</h1>
                <Link to="/add">
                <h6>Add Item</h6>
                </Link>
              </div>
              {inventory.map((inventoryItem, index) => 
                <div key={index}>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <h3>{inventoryItem["name"]}</h3>
                    <div>
                      <Link onClick={()=>setID(index)} to="/update">
                        <button style={{ 
                          border: "none", backgroundColor: "#66a3ff", color: "white", fontWeight: 'bold', borderRadius: 4, cursor: 'pointer'
                          }}>update</button>
                        </Link>
                      <button onClick={()=>deleteItem(inventoryItem["_id"])} style={{ 
                        border: "none", backgroundColor: "#ff1a1a", color: "white", fontWeight: 'bold', borderRadius: 4, cursor: 'pointer'
                        }}>delete</button>
                    </div>
                  </div>
                  <p>Quantity: {inventoryItem["quantity"]}</p>
                  <p>Description: {inventoryItem["description"]}</p>
                  <p>Price: ${inventoryItem["itemPrice"]}</p>
                  <p>Discount: ${inventoryItem["discountPrice"]}</p>
                </div>
              )}
            </>
            }>
            </Route>
            <Route path="/update" element={<UpdateItem item={inventory[id]}/>}>
            </Route>
            <Route path="/add" element={<AddItem/>}>
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
