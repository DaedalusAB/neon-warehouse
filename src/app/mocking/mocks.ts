import { Product } from '../core/models/product.model';

export let mockProducts: Product[] = [
  new Product('MYTZ 123456', 100, 1, 1),
  new Product('UK 13462', 12, 1, 2),
  new Product('KOB 8472', 1, 1, 3),

  new Product('YOLO 7777', 100, 3, 1)
];
export const mockFloors: number[] = [1, 2, 3];
export const mockSections: number[] = [1, 2, 3];
