import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrder as createOrderAPI, listOrders as listOrdersAPI  } from "src/utils/axios";
import { addOrderItem, CreateOrder, OrderBook } from "src/utils/types";
import { RootState } from "../store";


export interface OrderBooksState {
    orderBooks: OrderBook[];
    addOrder : addOrderItem[];
}


const initialState: OrderBooksState = {
    orderBooks: [],
    addOrder:[],
}

export const fetchOrderBookThunk = createAsyncThunk(
    'fetch/order',
    async ()=>{
        return listOrdersAPI()
    }
)

export const createOrderThunk = createAsyncThunk(
    'create/order',
    async (data:CreateOrder)=>{
        return createOrderAPI(data);
    }
)

export const orderBookSlice = createSlice({
    name:'orders',
    initialState,
    reducers:{
        addOrderItemStore : (state, action:PayloadAction<addOrderItem[]>)=>{
                state.addOrder = action.payload;
        },
        deleteOrderItemStore : (state, action:PayloadAction<addOrderItem>)=>{
            const checkAddOrder = state.addOrder.filter(add => add.bookId !== action.payload.bookId);
            state.addOrder = checkAddOrder;
        },
        onIncreaseQty : (state,action:PayloadAction<addOrderItem>)=>{
            console.log(12)
            const  orderItem = action.payload;
            const findOrder  = state.addOrder.find(add => add.bookId === action.payload.bookId);
            var amout: number = orderItem.quantity;
            const orderItemIndex = state.addOrder.findIndex(add=> add.bookId === action.payload.bookId)
            amout += 1
         
            if(findOrder){
                orderItem.quantity =amout;
                state.addOrder[orderItemIndex] = orderItem
            }
           
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrderBookThunk.fulfilled,(state,action)=>{
                state.orderBooks = action.payload.data;
            })
            .addCase(createOrderThunk.fulfilled,(state,action)=>{
                
            })
    },
});

export const selectAddOrder =(state:RootState) => state.orderBook.addOrder;


export const {addOrderItemStore,deleteOrderItemStore,onIncreaseQty} = orderBookSlice.actions;

export default orderBookSlice.reducer;
