import { 
  Component, 
  Input, 
  OnInit, 
  AfterViewInit, 
  OnDestroy, 
  ElementRef,
  Inject,
  PLATFORM_ID 
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() endValue: number = 0;
  @Input() duration: number = 2000; // Animation duration in ms
  @Input() label: string = '';
  
  currentValue: number = 0;
  animationFrameId!: number;
  elementRef!: ElementRef;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.elementRef = this.el;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.elementRef.nativeElement);
  }

  private startCounter() {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.duration, 1);
      
      this.currentValue = Math.floor(progress * this.endValue);
      
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.currentValue = this.endValue;
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}