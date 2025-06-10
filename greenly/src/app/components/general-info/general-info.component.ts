import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent {

  private readonly _PLATFORM_ID = inject(PLATFORM_ID);


  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    pullDrag: false,
    dots: false,
    navSpeed: 5000,
    navText: ['', ''],
    items: 1,
    nav: false
  }

}
