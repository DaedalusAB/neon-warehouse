import { Component } from '@angular/core';
import { ProductFilteringService } from '../../core/services/product-filtering.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ProductFilteringService]
})
export class DashboardComponent {
  constructor() { }
}
