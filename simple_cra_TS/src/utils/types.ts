
export type User = {
    id: number;
    name: string;
    username:string;
    password: string;
    email:string;
    avatar: string;
    address: string;
    status:  string;
    virtualWallet: number;
    roles:Role[];
}

export type CreateUser ={
    name: string;
    username:string;
    password: string;
    email:string;
    avatar: string;
    address: string;
    status:  number;
    virtualWallet: number;
}

export type Role =  {id: number,name: string}

export type AddRole ={email: string, roleName: string}

export type  Category ={
    name: string;
}
export type FetchCategory = {
    categoryId: number;
    name: string;
}

export type CreateBook = {
    title: string;
    author: string;
    detail: string;
    subject: string;
    publisher: string; // nhà xuất bản
    thumbnail:  string | null;
    categoryId: number;
    language: string;
    amount: number;
    price: number;
    borrowPrice: number;
  };
export type PutBook={
    id: number,
    title: string,
    subject: string,
    publisher: string,
    language: string,
    thumbnail: string|null,
    detail: string,
    author: string,
    status: string;
    amount: number,
    price: number,
    borrowPrice: number,
    categoryId: number,
}

  
export type FetchBooks = {
        id: string,
        title: string,
        subject: string,
        publisher: string,
        language: string,
        thumbnail: string|null,
        detail: string,
        author: string,
        amount: number,
        price: number,
        borrowPrice: number,
        status: string,
        createdAt: string | null,
        updatedAt: string | null,
        publishedAt: string | null,
        category: FetchCategory
  };
  
 export type UpdateOrder =  {
    orderId: string;
    status: string;
    fullName : string | null;
    email: string |null;
    phoneNumber: string | null;
    address: string | null;
    totalDeposit: number | null;
    totalRent: number| null;
    user: User;
 } 

export type OrderBook ={
    orderId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    status: string;
    totalDeposit: number;
    totalRent: number;
    user: User;
}

export  type CreateOrder ={
    userId: number;
    fullName : string | null;
    email: string |null;
    phoneNumber: string | null;
    address: string | null;
    totalDeposit: number | null;
    totalRent: number| null;
}

export type addOrderItem ={
    order: OrderBook;
    book: FetchBooks;
    bookId: number;
    quantity: number;
    borrowedAt: string;
    returnedAt: string;
}

export type FetchOrderItem ={
    orderItemId: number;
    quantity: number;
    book: FetchBooks;
    borrowedAt: string;
    returnedAt: string;
    order:OrderBook
}


