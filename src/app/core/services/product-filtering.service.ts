import { Injectable } from '@angular/core';
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { Product } from 'src/app/core/models/product.model';

@Injectable()
export class ProductFilteringService {
  private _products: Product[];
  private _idFilter: string;
  private _selectedFloor: number;
  private _selectedSection: number;

  public filteredProducts: Product[];

  constructor(
    private warehouseService: WarehouseService
  ) {
    this.refresh();
  }

  public refresh(): void {
    this.warehouseService.getAllProducts().subscribe(
      (products: Product[]) => {
        this._products = products;
        this.applyFilters();
      });
  }

  public get idFilter(): string {
    return this._idFilter;
  }
  public set idFilter(filter: string) {
    this._idFilter = filter;
    this.applyFilters();
  }

  public get selectedFloor(): number {
    return this._selectedFloor;
  }
  public set selectedFloor(filter: number) {
    this._selectedFloor = this.selectedFloor === filter
      ? undefined
      : filter;
    this.applyFilters();
  }

  public get selectedSection(): number {
    return this._selectedSection;
  }
  public set selectedSection(filter: number) {
    this._selectedSection = this.selectedSection === filter
      ? undefined
      : filter;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredProducts = this._products;
    if (this.idFilter) {
      this.filteredProducts = this.filteredProducts.filter(p => {
        return p.id.toLowerCase().includes(this.idFilter.toLowerCase());
      });
    }
    if (this.selectedFloor) {
      this.filteredProducts = this.filteredProducts.filter(p => p.floor === this.selectedFloor);
    }
    if (this.selectedSection) {
      this.filteredProducts = this.filteredProducts.filter(p => p.section === this.selectedSection);
    }
  }
}
