
export type User ={
    _id: String;
    name: String;
    username:String;
    password: string;
    email:String;
    avatar: String;
    address: String;
    status:  String;
    roles:Role;
}

export type Role = [
    {id: number,name: String}
]

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
  
  