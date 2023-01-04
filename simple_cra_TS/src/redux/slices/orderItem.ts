import { createSlice } from "@reduxjs/toolkit";
import { addOrderItem, FetchBooks, OrderBook } from "src/utils/types";

export interface addOrdersState {
    order ?: OrderBook;
    book ?:FetchBooks;
    bookId ?: number;
    quantity ?: number;
    borrowedAt?: string;
    returnedAt?: string;
}


const initialState: addOrdersState = {
    
}

export const orderItemSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        addOrderItem:  (state, action: any)=>{
            
        }
    }
});

export default orderItemSlice.reducer;

