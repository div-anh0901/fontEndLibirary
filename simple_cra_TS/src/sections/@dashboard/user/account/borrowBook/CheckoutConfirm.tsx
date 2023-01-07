

import React, { useMemo } from 'react'
import { useState } from 'react';
// @mui
import { Grid, Card, Button, Typography, Stack, Box } from '@mui/material';
import { _addressBooks } from 'src/_mock/arrays';
import Iconify from 'src/components/iconify/Iconify';
import CheckoutSummary from './CheckoutSummary';
import { ICheckoutBillingAddress } from 'src/@types/product';
import Label from 'src/components/label/Label';
import { FetchOrderItem, OrderBook } from 'src/utils/types';

import { fDate, fDateTime } from 'src/utils/formatTime';
export type TypeTotal ={
    deposit : number;
    rent: number;
    sum:  number
  }
  type Props ={
    order: OrderBook;
  }
  
export default function CheckoutConfirm({order}:Props) {
   
    const [open, setOpen] = useState(false);
    const [orderItemArr,setOrderItemArr] = useState<FetchOrderItem[]>([]);
    const [objectTotalOrder ,setObjectTotalOrder] = useState<TypeTotal>({"deposit": order.totalDeposit,"rent": order.totalRent ,"sum":0});

   
 

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            
             {orderItemArr.filter(o=>o.order.orderId === order.orderId).map((data, index) => (
              <AddressItem
                key={index}
                data={data}
              
              />
            ))} 
          </Grid>
  
          <Grid item xs={12} md={4}>
            <CheckoutSummary subtotal={0} objectTotalOrder={objectTotalOrder} total={order.totalRent+ order.totalDeposit} discount={0} />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              >
                Checkout
            </Button>
          </Grid>
        </Grid>
  
        {/* <CheckoutBillingNewAddressForm
          open={open}
          onClose={handleClose}
          onCreateBilling={onCreateBilling}
        /> */}
      </>
    );
}



type AddressItemProps = {
    data: FetchOrderItem;
  //  onCreateBilling: VoidFunction;
  };
  
  function AddressItem({ data }: AddressItemProps) {
    const { borrowedAt, returnedAt, quantity, order,book } = data;
  
    return (
      <Card
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Stack
          spacing={2}
          alignItems={{
            md: 'flex-end',
          }}
          direction={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Stack flexGrow={1} spacing={1}>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle1">
                {order.user.name}
                <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                  ({order.user.email})
                </Box>
              </Typography>
  
             
            </Stack>
            <Typography variant="body2">Address: {order.user.address}</Typography>
            <Typography variant="body2">Title Book: {book.title}</Typography>
            <Typography variant="body2">Price: {book.price}</Typography>
            <Typography variant="body2">Borray Price: {book.borrowPrice}</Typography>
            <Typography variant="body2">Day number: {(new  Date(returnedAt).getTime() - new  Date(borrowedAt).getTime())/(1000*3600*24)}</Typography>
            <Typography variant="body2">Quantity: {quantity}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               Borrowed  Day  : {new  Date(borrowedAt).toString()}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               Return  Day  : {new  Date(returnedAt).toString()}
            </Typography>
          </Stack>
  
          <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
              <Button variant="outlined" size="small" color="inherit" sx={{ mr: 1 }}>
                Delete
              </Button>
            {/* <Button variant="outlined" size="small" onClick={onCreateBilling}>
              Deliver to this Address
            </Button> */}
          </Stack>
        </Stack>
      </Card>
    );
  }