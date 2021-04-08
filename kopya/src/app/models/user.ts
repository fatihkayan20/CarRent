export interface User {
  Id: number;
  CustomerId: number;
  CompanyName: string;
  Email: string;
  Name: string;
  Claims: string[];
  IsAdmin: boolean;
}
