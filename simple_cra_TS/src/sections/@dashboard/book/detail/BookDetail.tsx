import {
    Box,
    Card,
    Grid,
    Table,
    Divider,
    TableRow,
    TableBody,
    TableHead,
    TableCell,
    Typography,
    TableContainer,
  } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router';
import Label from 'src/components/label/Label';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { useSelector } from 'src/redux/store';
import Image from '../../../../components/image';
import Markdown from 'src/components/markdown';

export default function BookDetail() {
    const {id} = useParams();
    const books = useSelector(state=>state.books.books);
    const bookDetail =  books.find((book)=> parseInt(book.id) === parseInt(id!));
    console.log()
  return (
    <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            
            <Image disabledEffect alt="logo" src={bookDetail?.thumbnail === null ? '/logo/logo_full.svg' : bookDetail?.thumbnail} sx={{ maxWidth: 300 }} />
          </Grid>

          {/* <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant="soft"
                color={
                  (status === 'paid' && 'success') ||
                  (status === 'unpaid' && 'warning') ||
                  (status === 'overdue' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {status}
              </Label>

              <Typography variant="h6">{`INV-${bookDetail?.amount}`}</Typography>
            </Box>
          </Grid> */}

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>

            <Typography variant="body2">Title: {bookDetail?.title}</Typography>
            <Typography variant="body2">Price: {bookDetail?.borrowPrice}VND</Typography>
            <Typography variant="body2">Borrow Price: {bookDetail?.price}VND</Typography>

            <Typography variant="body2">Author : {bookDetail?.author}</Typography>
            <Typography variant="body2">Detail : {bookDetail?.detail}</Typography>
            <Typography variant="body2">Publisher : {bookDetail?.publisher}</Typography>
            <Typography variant="body2">Category : {bookDetail?.category.name}</Typography>
             <Markdown children={bookDetail?.subject!} /> 
           
          </Grid>
        </Grid>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>

                  <TableCell align="left">Description</TableCell>

                  <TableCell align="left">Qty</TableCell>

                  <TableCell align="right">Unit price</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ mt: 5 }} />
      </Card>
  )
}
