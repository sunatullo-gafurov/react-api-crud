import React, { useContext } from 'react'
import { PurchasesContext } from '../../contexts/PurchasesContext';
import { toggleOpen, fetchPurchasesSuccess, editPurchase, fetchPurchaseDescriptionRequest, fetchPurchaseDescriptionSuccess } from '../../actions/actionCreators';

export default function Purchase({ id, amount, category, description, open }) {
    const { state: { detailedPurchase: {purchase} }, dispatch } = useContext(PurchasesContext);
    
    const handleDelete = async (id) => {
        const response = await fetch(`https://context-api-crud.herokuapp.com/api/purchases/${id}`, {
            method: 'DELETE'
        });
        const purchases = await response.json();
        dispatch(fetchPurchasesSuccess(purchases));
    };
    const handleEdit = () => {
        console.log(description);
        
        dispatch(editPurchase(id, amount, category, description));
    };
    const handleDescription = async () => {
        dispatch(fetchPurchaseDescriptionRequest());
        const response = await fetch(`https://context-api-crud.herokuapp.com/api/purchases/${id}`);
        const purchase = await response.json();
        dispatch(fetchPurchaseDescriptionSuccess(purchase.description));
        dispatch(toggleOpen(id));
    };
    return (
        <div>
            <li onClick={handleDescription} >Price: {amount}, Category: {category}  </li>
            <button onClick={() => handleDelete(id)} >Delete</button> <button onClick={handleEdit}>Edit</button>
            {open && <p>{purchase.description}</p>}
        </div>
    )
}
