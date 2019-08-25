import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { ProductFilteringService } from 'src/app/core/services/product-filtering.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;
  public isShownProductUpdate = false;

  constructor(
    private warehouseService: WarehouseService,
    private productFilteringService: ProductFilteringService
  ) { }

  public updateProduct(product: Product): void {
    this.warehouseService.updateProduct(product).subscribe(
      () => this.productFilteringService.refresh()
    );
  }
}
