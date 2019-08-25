import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { WarehouseFilteringComponent } from './warehouse-filtering/warehouse-filtering.component';
import { ProductFormComponent } from './product-form/product-form.component';

const warehouseRotues: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    WarehouseFilteringComponent,
    ProductListComponent,
    ProductComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(warehouseRotues)
  ]
})
export class WarehouseModule { }
