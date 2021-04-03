export interface Payment {
  owner: string;
  number: number;
  cvv: number;
  expiryYear: number;
  expiryMonth: number;
}
