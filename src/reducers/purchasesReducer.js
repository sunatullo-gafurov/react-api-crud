import { FETCH_PURCHASES_REQUEST, FETCH_PURCHASES_SUCCESS, FETCH_PURCHASES_FAILURE, TOGGLE_OPEN, EDIT_PURCHASE, CHANGE_EDIT_AMOUNT, CHANGE_EDIT_CATEGORY, CHANGE_EDIT_DESCRIPTION, RESET_PURCHASE, FETCH_PURCHASE_DESCRIPTION_REQUEST, FETCH_PURCHASE_DESCRIPTION_SUCCESS } from "../actions/actionTypes";

export function reducer(state, action) {
    switch(action.type) {
        case FETCH_PURCHASES_REQUEST:
            return {...state, purchases: {items: state.purchases.items.map(o => ({...o, open: false})), loading: true, error: null}};
        case FETCH_PURCHASES_SUCCESS:
            return {...state, purchases: {items: action.payload.items, loading: false, error: null}};
        case FETCH_PURCHASES_FAILURE:
            return {...state, purchases: {...state.purchases, loading: false, error: action.payload.error}};
        case EDIT_PURCHASE:
            return {...state, editMode: true, editedPurchase: {...state.editedPurchase, purchase: action.payload}};
        case CHANGE_EDIT_AMOUNT:
            return {...state, editedPurchase: {...state.editedPurchase, purchase: {...state.editedPurchase.purchase, amount: action.payload.amount }}};
        case CHANGE_EDIT_CATEGORY:
            return {...state, editedPurchase: {...state.editedPurchase, purchase: {...state.editedPurchase.purchase, category: action.payload.category }} };
        case CHANGE_EDIT_DESCRIPTION:
            return {...state, editedPurchase: {...state.editedPurchase, purchase: {...state.editedPurchase.purchase, description: action.payload.description }}};
        case RESET_PURCHASE:
            return {...state, editMode: false, editedPurchase: {...state.editedPurchase, purchase: {id: '', amount: '', category: '', description: ''}}};
        case FETCH_PURCHASE_DESCRIPTION_REQUEST:
            return {...state, purchases: {...state.purchases, loading: true, error: null}};
        case FETCH_PURCHASE_DESCRIPTION_SUCCESS:
            const { description} = action.payload;
            return {...state, purchases: {...state.purchases, loading: false, error: null}, detailedPurchase: {...state.detailedPurchase, purchase: {description}}};
        case TOGGLE_OPEN:
            return {...state, purchases: {...state.purchases, items: state.purchases.items.map(o => o.id === action.payload.id ? {...o, open: !o.open} : {...o, open: false})}}
        default:
            return state;
    }
}