import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";

export const UpdateItem = (props) => {
    const [item, setItem] = useState(props.item);

    const handleInput = (e) => {
        let { name, value } = e.target;
        setItem({...item, [name]: value });
    }

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const updateItem = () =>{

        if(item.name === '' || item.description === '' || item.itemPrice === '' || item.quantity === null ){
            setError(true);
            return;
        }
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "name": item.name,
            "quantity": item.quantity,
            "description": item.description,
            "itemPrice": item.itemPrice
        });

        let requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/inventory/"+item._id, requestOptions)
        .then(response => response.text())
        .then(result => {
            props.getInventory();
            console.log(result);
        })
        .catch(error => console.log('error', error));
        
        navigate('/');


    }

    return (
        <>
            <h1>Update</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label>
                    Item Name:
                    <input type="text" name="name" placeholder={item.name} onChange={handleInput} />
                </label>
                <br/>
                <label>
                    Item Quantity:
                    <input type="number" name="quantity" value={item.quantity} onChange={handleInput} />
                </label>
                <br/>
                <label>
                    Item Description:
                </label>
                <textarea name="description" cols="50" rows="10" placeholder={item.description} onChange={handleInput}></textarea>
                <br/>
                <label>
                    Item Price:
                    <input type="number" step="any" min="0" name="itemPrice" placeholder={item.itemPrice} onChange={handleInput}/>
                </label>
                <br/>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                    <Link to="/">
                        <button style={{ backgroundColor: "#ff1a1a", color: "white", border: "none", fontSize: 25, fontWeight: "bold", borderRadius: 10, cursor: "pointer" }}>
                            Cancel
                        </button>
                    </Link>
                    <button onClick={updateItem} value="Submit" style={{ backgroundColor: "#66a3ff", color: "white", border: "none", fontSize: 25, fontWeight: "bold", borderRadius: 10, cursor: "pointer" }}>
                        Submit
                    </button>
                </div>
                {error && <div style={{ color: "#ff1a1a", fontSize: 24, fontWeight: "bold" }}>
                    Please fill out all values before submitting
                </div>}
            </div>    
        </>
    );
}
