import { TestBed } from '@angular/core/testing';
import { ProductFilteringService } from './product-filtering.service';
import { WarehouseService } from './warehouse.service';
import { mockProducts } from 'src/app/mocking/mocks';

//  NOTE: I would use a mock set of data to test this service anyway,
//        so I will not mock warehouseService methods, since they deal with mock data already
//        (see mockProducts)
describe('WarehouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProductFilteringService
    ]
  }));

  it('should be created', () => {
    const service: ProductFilteringService = TestBed.get(ProductFilteringService);
    expect(service).toBeTruthy();
  });

  it('should contain get a list of products from WarehouseService', () => {
    const warehouseService: WarehouseService = TestBed.get(WarehouseService);
    spyOn(warehouseService, 'getAllProducts').and.callThrough();

    const service: ProductFilteringService = TestBed.get(ProductFilteringService);
    expect(service.filteredProducts).toBeTruthy();
    expect(warehouseService.getAllProducts).toHaveBeenCalled();
  });

  it('should have no filters applied after constructed', () => {
    const service: ProductFilteringService = TestBed.get(ProductFilteringService);
    expect(service.idFilter).toBeFalsy();
    expect(service.selectedFloor).toBeFalsy();
    expect(service.selectedSection).toBeFalsy();
  });

  it('should filter products by id', () => {
    const service: ProductFilteringService = TestBed.get(ProductFilteringService);

    service.idFilter = 'YOLO';
    const expectResult = mockProducts.find(p => p.id === 'YOLO 7777');

    expect(service.filteredProducts[0] === expectResult).toBeTruthy();
  });

  it('should filter products by floor', () => {
    const service: ProductFilteringService = TestBed.get(ProductFilteringService);

    service.selectedFloor = 1;
    const expectedResultCount = mockProducts.filter(p => p.floor === 1).length;

    expect(service.filteredProducts.length === expectedResultCount).toBeTruthy();
  });

  it('should filter products by section', () => {
    const service: ProductFilteringService = TestBed.get(ProductFilteringService);
    service.selectedSection = 3;
    const expectedResultCount = mockProducts.filter(p => p.section === 3).length;

    expect(service.filteredProducts.length === expectedResultCount).toBeTruthy();
  });

  it('should combine multiple filter criteria', () => {
    const service: ProductFilteringService = TestBed.get(ProductFilteringService);

    service.idFilter = 'yolo';
    service.selectedFloor = 3;
    service.selectedSection = 1;
    const expectedResultCount = mockProducts
    .filter(p => p.id.toLocaleLowerCase().includes('yolo') && p.floor === 3 && p.section === 1).length;

    expect(service.filteredProducts.length === expectedResultCount).toBeTruthy();
  });

  it('should be able to clear a filter', () => {
    const service: ProductFilteringService = TestBed.get(ProductFilteringService);

    service.idFilter = 'yolo';
    const expectResult = mockProducts.find(p => p.id === 'YOLO 7777');

    expect(service.filteredProducts[0] === expectResult).toBeTruthy();

    service.idFilter = '';

    expect(service.filteredProducts.length === mockProducts.length).toBeTruthy();
  });
});
