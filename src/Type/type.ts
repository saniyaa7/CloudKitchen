export interface IUser {
  id?:number,
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface ICategory {
  id:number,
  name: string;
  description: string;
  is_active: number;
}

export interface IFood{

    id:number,
    category_id:number,
    price:number ,
    name:string,
    is_veg:number,
    is_avail:number,
     description:string,
    img_url:string
}
