import { Component } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductFilteringService } from '../../core/services/product-filtering.service';
import { WarehouseService } from 'src/app/core/services/warehouse.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  public isShownProductCreate = false;
  public get products(): Product[] {
    return this.productFilteringService.filteredProducts;
  }
  public get aNewProduct(): Product {
    const product = new Product();
    return product;
  }

  constructor(
    private productFilteringService: ProductFilteringService,
    private warehouseService: WarehouseService
  ) { }

  public saveNewProduct(product: Product): void {
    this.warehouseService.createProduct(product).subscribe(
      () => this.productFilteringService.refresh()
    );
  }
}
