import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductsFilterPipe } from '../../shared/pipes/products-filter.pipe';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

type Direction = 'asc' | 'desc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, ProductsFilterPipe,AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  products$ =this.productsService.products$;
  priceSort: Direction = 'asc';

  ngOnInit(): void {
    this.productsService.getProducts({page_size:40, page_index:1});
  }

  onAddToCart(id: string) {
    this.productsService.addToCart(id);
  }
  onPriceSortChange() {
    this.router.navigate([''], {
      queryParams: {
        priceSort: this.priceSort,
      },
    });
  }
}
