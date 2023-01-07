import React from 'react'
import * as Yup from 'yup';
import { useCallback } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import {Role}  from 'src/utils/types';
import { useSnackbar } from '../../../../components/snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form/FormProvider';
import { countries } from '../../../../assets/data';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { fData } from 'src/utils/formatNumber';
import axios from 'axios';
import { useDispatch, useSelector } from 'src/redux/store';
import { createUserThunk } from 'src/redux/slices/user';
import { useNavigate, useParams } from 'react-router';
type FormValuesProps = {
    name: string;
    username:string;
    email:string;
    password: string;
    avatar: string;
    address: string;
    status:  number;
    virtualWallet: number;
  };
  

export default function AccountGeneral() {
    const {email} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const UpdateUserSchema = Yup.object().shape({
      username: Yup.string().required('Name is required'),
    });
    var defaultValues = {
      name:  '',
      email:  '',
      username:  '',
      avatar:'',
      password: '12345678',
      address: '',
      status:0,
      virtualWallet:50000
    };

    var user = useSelector((state)=>state.users.users.find((u)=> u.email === email));
    if(user){
       defaultValues = {
        name:  user.name,
        email:  user.email,
        username:  user.username,
        password: '12345678',
        avatar: user.avatar,
        address: user.address,
        status:0,
        virtualWallet:user.virtualWallet
      };
    }
  
    const methods = useForm<FormValuesProps>({
      resolver: yupResolver(UpdateUserSchema),
      defaultValues,
    });

      const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
      } = methods;
    
      const onSubmit = async (data: FormValuesProps) => {
        try {
          if(user){

          }else{
            dispatch(createUserThunk(data));  
            navigate("/dashboard/user/list")
          }
         

        } catch (error) {
          console.error(error);
        }
      };
    
      const handleDrop = useCallback(
      async  (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
          const  formData = new FormData();

          formData.append('file',file);
          formData.append('upload_preset',"weokfkxo");

          const res =  await axios.post('https://api.cloudinary.com/v1_1/hoanganhauth0901/image/upload',formData);
          
          if (file) {
            setValue('avatar', res.data.url);
          }
        },
        [setValue]
      );
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
                name="avatar"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                <Typography
                    variant="caption"
                    sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',  
                    color: 'text.secondary',
                    }}
                >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                </Typography>
                }
            />
            </Card>
        </Grid>

        <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
            <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                }}
            >
              <RHFTextField name="name" label="Name" />
                <RHFTextField name="username" label="Username" />

                <RHFTextField name="email" label="Email Address" />

                <RHFTextField name="address" label="Address" />
                <RHFTextField type="number" name="status" label="Status" />
                <RHFTextField  name="virtualWallet" disabled={true} label="Virtual Wallet" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
                </LoadingButton>
            </Stack>
            </Card>
        </Grid>
        </Grid>
  </FormProvider>
  )
}
