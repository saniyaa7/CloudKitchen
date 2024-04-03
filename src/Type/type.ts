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
  name?: string;
  description?: string;
  is_active?: number;
}
export interface usePostCategoryRequest{
  name: string;
  description: string;
  is_active: number;
}

export interface GetFoodItemRequest{

    id: number;
    category_id:number,
    price:number ,
    name:string,
    is_veg:number,
    is_avail:number,
     description:string,
    img_url:string,
    quantity?: number;
}
export interface PostFoodItemRequest{
  category_id:number,
  price:number ,
  name:string,
  is_veg:number,
  is_avail:number,
   description:string,
  img_url:string,

}
export interface PatchFoodItemRequest{

  id:number,
  category_id:number,
  price:number ,
  name:string,
  is_veg:number,
  is_avail:number,
   description:string,
  img_url:string,
  
}

export interface IOrderItem{
  id:number,
  quantity:number,
  foodname?:string,
  price?:number
}

export interface ICheckout{
  payment_method:string,
  location:string
}

export interface IOrder{
  
      id:number,
        created_at: string,
        total_amount: number,
        location: string
}
export interface IOrderItemByUserId{
  id: number,
        quantity: number,
        foodname: string,
        price: number
}

export interface IInvoiceOrder{
  id:number,
  order_id:number,
  payment_method:string,
  created_at:string
}