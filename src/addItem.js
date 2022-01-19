import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";


export const AddItem = (props) => {

    const [item, setItem] = useState({
        name:'',
        quantity: null,
        description: '',
        itemPrice: '',
        discountPrice: ''
    });

    const handleInput = (e) => {
        let { name, value } = e.target;
        setItem({...item, [name]: value });
    }

    const navigate = useNavigate();

    const addItem = () =>{
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "name": item.name,
            "quantity": item.quantity,
            "description": item.description,
            "itemPrice": item.itemPrice,
            "discountPrice": item.discountPrice
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/inventory", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        // const routeHome = useCallback(() => navigate('/sample', {replace: true}), [navigate]);
        // routeHome();
        props.getInventory();
        navigate('/');


    }
      

    return (
        <>
            <h1>add</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label>
                    Item Name:
                    <input type="text" name="name" onChange={handleInput} />
                </label>
                <br/>
                <label>
                    Item Quantity:
                    <input type="number" name="quantity" onChange={handleInput} />
                </label>
                <br/>
                <label>
                    Item Description:
                </label>
                <textarea name="description" cols="50" rows="10" onChange={handleInput}></textarea>
                <br/>
                <label>
                    Item Price:
                    <input type="text" name="itemPrice" onChange={handleInput}/>
                </label>
                <br/>
                <label>
                    Item Discount Price:
                    <input type="text" name="discountPrice" onChange={handleInput}/>
                </label>
                <br/>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                    <Link to="/">
                        <button style={{ backgroundColor: "#ff1a1a", color: "white", border: "none", fontSize: 25, fontWeight: "bold", borderRadius: 10, cursor: "pointer" }}>
                            Cancel
                        </button>
                    </Link>
                    <button onClick={addItem} value="Submit" style={{ backgroundColor: "#66a3ff", color: "white", border: "none", fontSize: 25, fontWeight: "bold", borderRadius: 10, cursor: "pointer" }}>
                        Submit
                    </button>
                </div>
            </div>    
        </>
    );
}
