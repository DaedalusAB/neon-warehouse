import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard.component';
import { WarehouseFilteringComponent } from '../warehouse-filtering/warehouse-filtering.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductComponent } from '../product/product.component';
import { ProductFormComponent } from '../product-form/product-form.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        WarehouseFilteringComponent,
        ProductListComponent,
        ProductComponent,
        ProductFormComponent
      ],
      imports: [
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a navigation component', () => {
    const navigationComponent = fixture.nativeElement.querySelector('app-warehouse-filtering');
    expect(navigationComponent).toBeTruthy();
  });

  it('should contain a products component', () => {
    const productsComponent = fixture.nativeElement.querySelector('app-product-list');
    expect(productsComponent).toBeTruthy();
  });
});
