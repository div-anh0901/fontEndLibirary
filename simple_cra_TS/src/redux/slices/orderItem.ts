import { createSlice } from "@reduxjs/toolkit";
import { addOrderItem, OrderBook } from "src/utils/types";

export interface addOrdersState {
    addOrder?: addOrderItem;
}


const initialState: addOrdersState = {
   
}

