import { LoadingButton } from '@mui/lab';
import { Button, Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import React, { SetStateAction, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import EmptyContent from 'src/components/empty-content/EmptyContent';
import Iconify from 'src/components/iconify/Iconify';
import { createOrderThunk, deleteOrderItemStore,onDecreaseQty,onIncreaseQty } from 'src/redux/slices/order';
import { useDispatch, useSelector } from 'src/redux/store';
import TableBookAddCart from 'src/sections/@dashboard/shop/TableBookAddCart';
import { createOrderItem } from 'src/utils/axios';
import { addOrderItem } from 'src/utils/types';
import CheckoutSummary from './CheckoutSummary';
import OrderListBook from './OrderListBook';

export default function BorrowBook() {
    const {email}= useParams();
    const user = useSelector((state)=>state.users.users.find(u=> u.email === email));
    var totalCount  = 0
    const [isSubmitting,setIsSupmmiting] = useState(false);
    const [showFormBook, setShowFormBook] = useState(false);
    const [showFormOrder, setShowFormOrder] = useState(false);
    const [totalOrder,setTotalOrder] = useState<number>(0);
    const [orderSetup,setOrderSetup] = useState<addOrderItem[] | []>([]);
    const dispatch = useDispatch();
    const order = useSelector((state)=> state.orderBook.orderBooks.find((or=> or.user.id === user?.id && or.status === "PENDING")));
    const orderStore = useSelector((state)=>state.orderBook.addOrder);

    useMemo(()=>{
      if(orderStore.length >0){
        for(var i = 0;  i <orderStore.length; ++i){
          totalCount+= (orderStore[i].quantity *(orderStore[i].book.borrowPrice + orderStore[i].book.price))
        }
        setTotalOrder(totalCount)
        setShowFormOrder(true)
      }
    },[orderStore])


    async  function handleCreateOrder (){
      try {
        if(user!= undefined){
          setIsSupmmiting(true)
          dispatch(createOrderThunk(
            {
              userId: user?.id,
              fullName:user?.username,
              email: user?.email,
              phoneNumber: null,
              address: user.address,
              totalDeposit: null,
              totalRent: null
            }))
            setIsSupmmiting(false);
            setShowFormBook(true)
        }
            
      } catch (err) {
        console.log(err);
      }
    }
    const handleApplyDiscount = (value: number) => {
      
    };

    const onDeleteCart = (orderitem: addOrderItem)=>{
      dispatch(deleteOrderItemStore(orderitem))
    }


    const onIncreaseQuantity = (orderitem: addOrderItem)=>{
      dispatch(onIncreaseQty(orderitem))
    }

    const onDecreaseQuantity =(orderitem: addOrderItem)=>{
      dispatch(onDecreaseQty(orderitem))
    }

    const handleCheckOut =async ()=>{
       try {
          if(orderStore.length>0){
            for(var i = 0 ; i <  orderStore.length ; i++){
              await createOrderItem(orderStore[i]);
            }
          }
          window.location.reload()
       } catch (err) {
          console.log(err)
       }
    }

    
  return (
    <div>
      {order ? <>
        <Grid container spacing={3}>
          <Grid item  xs={12} md={9}>
            {
              showFormBook ? 
              <>
                <TableBookAddCart 
                    orderBook={order} 
                    closeFormListBook={setShowFormBook}  
                    setTotalOrder={setTotalOrder} 
                    totalOrder = {totalOrder}    
                />
              </>:
              <Card style={{"height": "500px" }} sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <CardHeader
                      title={
                        <Typography variant="h6">
                          Cart
                          <Typography component="span" sx={{ color: 'text.secondary' }}>
                            &nbsp;({orderStore.length} item)
                          </Typography>
                        </Typography>
                      }
                      sx={{ mb: 3 }}
                    />

                    <Button
                      sx={{ m: 3 }}
                      size="small"
                      variant="soft"
                      onClick={()=>setShowFormBook(true)}
                      startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                      Add book Item
                    </Button>
                  </Stack>
                  {
                    showFormOrder  ? <OrderListBook
                      products={orderStore}  
                      onDelete={onDeleteCart}
                      onIncreaseQuantity={onIncreaseQuantity}
                      onDecreaseQuantity={onDecreaseQuantity}
                    /> : <EmptyContent
                    title="Cart is empty"
                    description="Look like you have no items in your shopping cart."
                    img="/assets/illustrations/illustration_empty_cart.svg"
                  />
                  }
                 
              </Card>
            }
            
          </Grid>
          <Grid item xs={12} md={3}>
        <CheckoutSummary
          enableDiscount
          total={totalOrder}
          discount={0}
          subtotal={0}
          onApplyDiscount={handleApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleCheckOut}
        >
          Create
        </Button>
          </Grid>
        </Grid>
      </>:
      (
        <LoadingButton
       fullWidth
       type="submit"
       variant="contained"
       size="large"
       loading={isSubmitting}
       onClick={()=>handleCreateOrder()}
      >
        Create Order

      </LoadingButton>

      )}
      
    </div>
  )
}
