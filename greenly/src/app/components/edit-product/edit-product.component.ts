import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import { IProduct } from '../../core/interfeces/i-product';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit , OnDestroy {

  constructor(private _ShopService: ShopService) { }

  productsData !: IProduct[]
  
  productsSub!: Subscription;
  deleteProductSub!: Subscription;

  ngOnInit(): void {
    this.productsSub = this._ShopService.getAllProducts().subscribe({
      next: (res) => {
        this.productsData = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteProduct(p_ID: string | null) {
    this.deleteProductSub = this._ShopService.deleteProduct(p_ID).subscribe({
      next: (res) => {
        this.productsData = res
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnDestroy(): void {
      this.productsSub?.unsubscribe();
      this.deleteProductSub?.unsubscribe();
  }

}
