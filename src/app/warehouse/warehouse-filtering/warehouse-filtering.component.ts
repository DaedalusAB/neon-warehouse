import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { ProductFilteringService } from 'src/app/core/services/product-filtering.service';

@Component({
  selector: 'app-warehouse-filtering',
  templateUrl: './warehouse-filtering.component.html',
  styleUrls: ['./warehouse-filtering.component.scss']
})
export class WarehouseFilteringComponent implements OnInit {
  public floors: number[];
  public sections: number[];

  public idFilter: string;
  public get selectedFloor(): number {
    return this.productFilteringService.selectedFloor;
  }
  public get selectedSection(): number {
    return this.productFilteringService.selectedSection;
  }

  constructor(
    private productFilteringService: ProductFilteringService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.warehouseService.getAllFloors().subscribe((floors: number[]) => this.floors = floors);
    this.warehouseService.getAllSections().subscribe((sections: number[]) => this.sections = sections);
  }

  public filterById(): void {
    this.productFilteringService.idFilter = this.idFilter;
  }

  public setFloorFilter(floor: number): void {
    this.productFilteringService.selectedFloor = floor;
  }

  public setSectionFilter(section: number): void {
    this.productFilteringService.selectedSection = section;
  }
}
