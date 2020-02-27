import { FETCH_PURCHASES_REQUEST, FETCH_PURCHASES_SUCCESS, FETCH_PURCHASES_FAILURE, TOGGLE_OPEN, EDIT_PURCHASE, CHANGE_EDIT_AMOUNT, CHANGE_EDIT_CATEGORY, CHANGE_EDIT_DESCRIPTION, RESET_PURCHASE, FETCH_PURCHASE_DESCRIPTION_REQUEST, FETCH_PURCHASE_DESCRIPTION_SUCCESS } from "./actionTypes";

export async function fetchPurchases(dispatch) {
    dispatch(fetchPurchasesRequest());
        try {
            const response = await fetch('http://localhost:8000/api/purchases');
            if (!response.ok) {
                throw new Error();
            }
            const purchases = await response.json();
            dispatch(fetchPurchasesSuccess(purchases));
        } catch (e) {
            dispatch(fetchPurchasesFailure(e));
        }
}

export async function addPurchase(dispatch, purchase) {
    dispatch(fetchPurchasesRequest());
    try {
        const response = await fetch('http://localhost:8000/api/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchase)
        });
        if (!response.ok) {
            throw new Error();
        }
        const purchases = await response.json();
        dispatch(fetchPurchasesSuccess(purchases));
    } catch (e) {
        dispatch(fetchPurchasesFailure(e));
    }
}

export async function editPurchaseSubmit(dispatch, purchase, id) {
    dispatch(fetchPurchasesRequest());
    try {
        const response = await fetch(`http://localhost:8000/api/purchases/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchase)
        });
        if (!response.ok) {
            throw new Error();
        }

        const purchases = await response.json();
        dispatch(fetchPurchasesSuccess(purchases));
    } catch (e) {
        dispatch(fetchPurchasesFailure(e));
    }
}

export function fetchPurchasesRequest() {
    return {
        type: FETCH_PURCHASES_REQUEST
    };
}
export function fetchPurchasesSuccess(items) {
    return {
        type: FETCH_PURCHASES_SUCCESS,
        payload: {
            items
        }
    };
}
export function fetchPurchasesFailure(error) {
    return {
        type: FETCH_PURCHASES_FAILURE,
        payload: {
            error
        }
    };
}

export function toggleOpen(id) {
    return {
        type: TOGGLE_OPEN,
        payload: {
            id
        }
    };
}

export function editPurchase(id, amount, category, description) {
    return {
        type: EDIT_PURCHASE,
        payload: {
            id,
            amount,
            category,
            description
        }
    }
}

export function changeEditAmount(amount) {
    return {
        type: CHANGE_EDIT_AMOUNT,
        payload: {
            amount
        }
    };
}
export function changeEditCategory(category) {
    return {
        type: CHANGE_EDIT_CATEGORY,
        payload: {
            category
        }
    };
}
export function changeEditDescription(description) {
    return {
        type: CHANGE_EDIT_DESCRIPTION,
        payload: {
            description
        }
    };
}

export function resetPurchase() {
    return {
        type: RESET_PURCHASE,
        payload: {}
    };
}

export function fetchPurchaseDescriptionRequest() {
    return {
        type: FETCH_PURCHASE_DESCRIPTION_REQUEST,
        payload: {
            
        }
    };
}

export function fetchPurchaseDescriptionSuccess(description) {
    return {
        type: FETCH_PURCHASE_DESCRIPTION_SUCCESS,
        payload: {
            description
        }
    };
}