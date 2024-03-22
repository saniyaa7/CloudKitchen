export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  password: string;
  role: string;
}

export interface ICategory {
  name: string;
  description: string;
  is_active: number;
}
