import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/models/product.model';
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translate(-50%, -100%)'}),
        animate('200ms ease-in', style({transform: 'translate(-50%, 0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translate(-50%, -100%)'}))
      ])
    ])
  ]
})
export class ProductFormComponent implements OnInit {
  @Input() isShown: boolean;
  @Output() isShownChange = new EventEmitter<boolean>();
  @Input() product: Product;
  @Output() productUpdate = new EventEmitter<Product>();

  public productForm: FormGroup;
  public floors: number[];
  public sections: number[];
  public showValidation = false;

  public get isUpdate(): boolean {
    return !!this.product.id;
  }

  public idTaken = false;
  public locationTaken = false;

  constructor(
    private warehouseService: WarehouseService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.warehouseService.getAllFloors().subscribe((allFloors: number[]) => this.floors = allFloors);
    this.warehouseService.getAllSections().subscribe((allSections: number[]) => this.sections = allSections);
    this.productForm = this.createProductForm();
    if (this.isUpdate) {
      this.productForm.controls.id.disable();
    }
  }

  public save(): void {
    this.locationTaken = false;
    this.idTaken = false;

    if (this.productForm.invalid) {
      this.showValidation = true;
      return;
    }

    const product = this.mapFormToProduct();

    forkJoin(
      this.isProductIdTaken(product),
      this.isLocationTaken(product)
    ).subscribe(([idTaken, locationTaken]) => {
      this.idTaken = idTaken;
      this.locationTaken = locationTaken;
      if (!idTaken && !locationTaken) {
        this.emitValidProduct(product);
      }
    });
  }

  private isLocationTaken(product: Product): Observable<boolean> {
    return this.warehouseService.productAtLocation(product.floor, product.section).pipe(
      switchMap((productAtLocation: Product) => {
        return of(productAtLocation && productAtLocation.id !== product.id);
      })
    );
  }

  private isProductIdTaken(product: Product): Observable<boolean> {
    return this.isUpdate
      ? of(false)
      : this.warehouseService.getProduct(product.id).pipe(
        switchMap((existingProduct: Product) => {
          return of(!!existingProduct);
        })
      );
  }

  private emitValidProduct(product: Product): void {
    this.productUpdate.emit(product);
    const msg = this.isUpdate ? 'Product updated' : 'Product created';
    this.toastrService.info(msg, 'Success!', { positionClass: 'toast-top-center' });
    this.close();
  }

  public close(): void {
    this.isShownChange.emit(false);
  }

  public showErrorForControl(controlName: string): boolean {
    const control = this.productForm.controls[controlName];
    return this.showValidation && control.invalid || control.dirty && control.invalid;
  }

  private createProductForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.product.id, Validators.compose(
        [Validators.required, Validators.pattern('^[A-Z]{2,4}[ ][0-9]{4,6}$')]
      )),
      quantity: new FormControl(this.product.quantity, Validators.compose(
        [Validators.required, Validators.pattern(`^[0-9]+$`)]
      )),
      floor: new FormControl(this.product.floor, Validators.required),
      section: new FormControl(this.product.section, Validators.required)
    });
  }

  private mapFormToProduct(): Product {
    return new Product(
      this.product.id || this.productForm.value.id,
      +this.productForm.value.quantity,
      +this.productForm.value.floor,
      +this.productForm.value.section
    );
  }
}
