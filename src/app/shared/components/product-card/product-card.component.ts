import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe,DatePipe, RouterLink],
  template: ` <div class="card">
  <img [src]="product.thumbnail" class="card-img-top" [alt]="product.title" />
  <div class="card-body">
    <h5 class="card-title">
      {{ product.title }}
    </h5>
    <h6 class="text-secondary">
      {{ product.price.current | currency : "GEL" }}
    </h6>
    <p class="card-text">
      {{ product.description }}
    </p>
    <p class="card-text text-secondary">
      Issue Date: {{ product.issueDate | date : "yyyy" }}
    </p>
    @if(deleteBtnVisible) {
    <button class="btn btn-danger" (click)="deleteProduct.emit(product._id)">
      Delete
    </button>
    } @else {
    <button class="btn btn-primary" (click)="addToCart.emit(product._id)">
      Add To Cart
    </button>
    }
    <a routerLink="/product/{{product._id}}" class="btn btn-secondary ms-2">details</a>
  </div>
</div>`,
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() deleteBtnVisible = false;
  @Output() addToCart = new EventEmitter<string>();
  @Output() deleteProduct = new EventEmitter<string>();
}