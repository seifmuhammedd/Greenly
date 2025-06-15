import { AfterViewInit, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { CounterComponent } from "../counter/counter.component";
import { InsightsService } from '../../core/services/insights.service';
import { IInsights } from '../../core/interfeces/i-insights';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, CounterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {

  

  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _InsightsService = inject(InsightsService);

  insights !: IInsights
  ngOnInit(): void {
    this._InsightsService.getHomeInsights().subscribe({
      next: (res)=>{
        this.insights = res
      },error: (err)=>{
        console.log(err)
      }
    })
  }

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
    autoplayTimeout: 4000,
    pullDrag: false,
    dots: false,
    navSpeed: 4000,
    navText: ['', ''],
    items: 1,
    nav: false
  }

}
