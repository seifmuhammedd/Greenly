import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ShopService } from '../../core/services/shop.service';
import { IProduct } from '../../core/interfeces/i-product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor ( private _ActivatedRoute: ActivatedRoute, private _ShopService: ShopService ) {}

  productId !: string | null
  productDetails !: IProduct
  productSub !: Subscription
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (productInfo) => {
        this.productId = productInfo.get("p_ID")
        this.productSub = this._ShopService.getSpecificProduct(this.productId).subscribe({
          next: (res) =>{
             this.productDetails = res
          },
          error: (err)=>{
            console.log(err)
          }
        })
      }
    })
  }
  
  
  
  
  productSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

}
