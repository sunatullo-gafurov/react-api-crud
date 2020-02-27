import React, { useContext, useEffect} from 'react'
import { PurchasesContext } from '../../contexts/PurchasesContext'
import Purchase from '../Purchase/Purchase';
import Loader from '../Loader/Loader'
import { changeEditAmount, changeEditCategory, changeEditDescription, resetPurchase, fetchPurchases, addPurchase, editPurchaseSubmit } from '../../actions/actionCreators';


export default function PurchasesList() {
    const { state: { purchases: { items, loading, error }, editMode,  editedPurchase: {purchase} }, dispatch } =  useContext(PurchasesContext);
    const {id, amount, category, description} = purchase;
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        addPurchase(dispatch, purchase);
        dispatch(resetPurchase());
    };
    const handleReset = (e) => {
        e.preventDefault();
        dispatch(resetPurchase());
    };
    const handleEdit = async () => {
        editPurchaseSubmit(dispatch, purchase, id);
    };
    
    useEffect(() => {
        fetchPurchases(dispatch);
    }, [dispatch]);
    return (
        <div>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <label>Price</label>
                <input type="text" onChange={e => dispatch(changeEditAmount(e.target.value))} value={amount} />
                <label>Category</label>
                <select onChange={e => dispatch(changeEditCategory(e.target.value))} value={category} >
                    <option value="Select" disabled>--Select--</option>
                    <option value="Auto">Auto</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
                {editMode ? <button onClick={handleEdit}>Edit Post</button> : <button type="submit" >Add Post</button> }
                <button type="reset">Cancel</button>
                <div>
                    <textarea onChange={e => dispatch(changeEditDescription(e.target.value))} value={description} cols="30" rows="10" placeholder="Description..."></textarea>
                </div>
                
                
            </form>
            <ul>
                {items.map(i => <Purchase key={i.id} {...i} />)}
            </ul>

            <div>Total: {items.map(o => o.amount).reduce((acc, curr) => acc + curr, 0)}</div>

            {error && 
                <>
                    <p>Opps... Something went wrong</p>
                    <button onClick={() => fetchPurchases(dispatch)}>Retry</button>    
                </>
            }
            {loading && <Loader />}
        </div>
    )
}
