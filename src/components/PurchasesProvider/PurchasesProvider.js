import React, { useReducer } from 'react'
import { PurchasesContext } from '../../contexts/PurchasesContext'
import { reducer } from '../../reducers/purchasesReducer';

const initialState = {
    purchases: {
        items: [],
        loading: false,
        error: null
    },
    editMode: false,
    editedPurchase: {
        purchase: {
            id: 0,
            amount: '',
            category: '',
            description: ''
        },
        loading: false,
        error: null
    },
    detailedPurchase: {
        purchase: {
            description: ''
        },
        loading: false,
        error: null
    }
};

export default function PurchasesProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <PurchasesContext.Provider value={{state, dispatch}}>
                {props.children}
            </PurchasesContext.Provider>
        </div>
    )
}
