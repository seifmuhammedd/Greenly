import { AfterViewInit, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  private readonly _PLATFORM_ID = inject(PLATFORM_ID);


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      AOS.init();
      window.addEventListener('load', () => {
        AOS.refresh();
      });
    }
  }

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    pullDrag: false,
    dots: false,
    navSpeed: 3000,
    navText: ['', ''],
    items: 1,
    nav: false
  }

}
