import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API_KEY } from '../config';
import { Category, CreateBook, FetchBooks, FetchCategory, PutBook } from './types';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });
const accessToken = localStorage.getItem('accessToken');
const config: AxiosRequestConfig = { withCredentials: true,headers: {Authorization: 'Bearer ' + accessToken}}
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
//Category
export const createCategory  = (data:Category) => axiosInstance.post('/api/categories/add',data,config);
export const getCategorys  = () => axiosInstance.get<FetchCategory[]>('/api/categories',config);
export const updateCategorys = (data:FetchCategory) => axiosInstance.put('/api/categories/save/' + data.categoryId, data,config);


//Book 
export const createBook = (data: CreateBook)=> axiosInstance.post('/api/books/add?categoryId='+data.categoryId,data);
export const  listBooks = ()=> axiosInstance.get<FetchBooks[]>('/api/books',config);
export const getBookById = (id: number)=> axiosInstance.get<FetchBooks>('/api/book/' + id,config);
export const putBook = (data: PutBook)=> axiosInstance.put('/api/books/save/' + data.id + '?categoryId='+data.categoryId,data,config);
export default axiosInstance;
