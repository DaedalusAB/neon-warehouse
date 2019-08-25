import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { mockProducts, mockFloors, mockSections } from 'src/app/mocking/mocks';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor() { }

  public getAllFloors(): Observable<number[]> {
    return of(mockFloors);
  }

  public getAllSections(): Observable<number[]> {
    return of(mockSections);
  }

  public getAllProducts(): Observable<Product[]> {
    return of(mockProducts);
  }

  public productAtLocation(floor: number, section: number): Observable<Product> {
    return of(mockProducts.find(p => p.floor === floor && p.section === section));
  }

  public getProduct(id: string): Observable<Product> {
    return of(mockProducts.find(p => p.id === id));
  }

  public updateProduct(product: Product): Observable<Product> {
    mockProducts[mockProducts.findIndex(p => p.id === product.id)] = product;
    return of(product);
  }

  public createProduct(product: Product): Observable<Product> {
    mockProducts.push(product);
    return of(product);
  }
}
