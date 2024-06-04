import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/types/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  product: Product | null = null;
  
}
