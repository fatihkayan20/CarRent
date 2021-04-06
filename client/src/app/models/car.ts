import { CarImage } from './carImage';
export interface Car {
  id: number;
  modelYear: number;
  brandName: string;
  colorName: string;
  dailyPrice: number;
  findexPuan: number;
  description: string;
  brandId: number;
  images: CarImage[];
  colorId: number;
  isRentable: boolean;
}
