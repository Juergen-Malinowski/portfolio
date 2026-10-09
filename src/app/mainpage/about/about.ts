import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChild('aboutPortrait') private portrait?: ElementRef<HTMLImageElement>;

  private observer?: IntersectionObserver;
  private portraitVisible = false;

  ngAfterViewInit(): void {
    const image = this.portrait?.nativeElement;
    if (!image) return;

    this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
      threshold: [0, 0.8],
    });
    this.observer.observe(image);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('document:about-navigation')
  onAboutNavigation(): void {
    if (this.portraitVisible) this.rotatePortrait();
  }

  private onIntersection(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      this.updateVisibility(entry);
    }
  }

  private updateVisibility(entry: IntersectionObserverEntry): void {
    if (!entry.isIntersecting) {
      this.portraitVisible = false;
      return;
    }

    if (entry.intersectionRatio >= 0.8 && !this.portraitVisible) {
      this.portraitVisible = true;
      this.rotatePortrait();
    }
  }

  rotatePortrait(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const image = this.portrait?.nativeElement;
    if (!image || image.classList.contains('is-rotating')) return;

    image.classList.add('is-rotating');
  }

  finishRotation(event: AnimationEvent): void {
    const image = this.portrait?.nativeElement;
    if (image && event.target === image) {
      image.classList.remove('is-rotating');
    }
  }
}
