import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Project {
  id: string;
  title: string;
  image: string;
  techStack: string;
  descriptionKey: string;
  imageAltKey: string;
  githubUrl: string;
  liveUrl?: string;
}

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit, OnDestroy {
  @ViewChildren('projectImage') private projectImages!: QueryList<ElementRef<HTMLImageElement>>;

  private observer?: IntersectionObserver;
  private readonly visibleImages = new WeakSet<HTMLImageElement>();

  readonly projects: Project[] = [
    {
      id: 'coderr',
      title: 'Coderr',
      image: 'img/project/coderr.webp',
      techStack: 'Python | Django | Django REST Framework | REST API',
      descriptionKey: 'projects.items.coderr.description',
      imageAltKey: 'projects.items.coderr.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/Backend-Project-Coderr',
      liveUrl: 'https://coderr.juergen-malinowski.de',
    },
    {
      id: 'kanmind',
      title: 'KanMind',
      image: 'img/project/kanmind.webp',
      techStack: 'Python | Django | Django REST Framework | REST API',
      descriptionKey: 'projects.items.kanmind.description',
      imageAltKey: 'projects.items.kanmind.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/Project-KanMind',
      liveUrl: 'https://kanmind.juergen-malinowski.de',
    },
    {
      id: 'join',
      title: 'Join',
      image: 'img/project/join.webp',
      techStack: 'Angular | TypeScript | Firebase',
      descriptionKey: 'projects.items.join.description',
      imageAltKey: 'projects.items.join.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/Join',
      liveUrl: 'https://join.juergen-malinowski.de',
    },
    {
      id: 'el-pollo-loco',
      title: 'El Pollo Loco',
      image: 'img/project/el-pollo-loco.webp',
      techStack: 'JavaScript | HTML | CSS | Canvas 2D API',
      descriptionKey: 'projects.items.elPolloLoco.description',
      imageAltKey: 'projects.items.elPolloLoco.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/modul-12-el-pollo-loco',
      liveUrl: 'https://el-pollo-loco.juergen-malinowski.de',
    },
    {
      id: 'pokedex',
      title: 'Pokedex',
      image: 'img/project/pokedex.webp',
      techStack: 'JavaScript | HTML | CSS | REST API',
      descriptionKey: 'projects.items.pokedex.description',
      imageAltKey: 'projects.items.pokedex.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/modul-8-pokemon-api',
      liveUrl: 'https://pokedex.juergen-malinowski.de',
    },
    {
      id: 'bestell-app',
      title: 'Bestell-App',
      image: 'img/project/bestell-app.webp',
      techStack: 'JavaScript | HTML | CSS',
      descriptionKey: 'projects.items.bestellApp.description',
      imageAltKey: 'projects.items.bestellApp.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/modul-7-bestell-app',
      liveUrl: 'https://bestell-app.juergen-malinowski.de',
    },
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
      threshold: [0, 0.8],
    });

    for (const image of this.projectImages) {
      this.observer.observe(image.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('document:projects-navigation')
  onProjectsNavigation(): void {
    for (const element of this.projectImages) {
      const image = element.nativeElement;
      if (this.visibleImages.has(image)) this.rotateImage(image);
    }
  }

  private onIntersection(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      this.updateVisibility(entry);
    }
  }

  private updateVisibility(entry: IntersectionObserverEntry): void {
    const image = entry.target as HTMLImageElement;

    if (!entry.isIntersecting) {
      this.visibleImages.delete(image);
      return;
    }

    if (entry.intersectionRatio >= 0.8 && !this.visibleImages.has(image)) {
      this.visibleImages.add(image);
      this.rotateImage(image);
    }
  }

  rotateImage(image: HTMLImageElement): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (image.classList.contains('is-rotating')) return;

    image.classList.add('is-rotating');
  }

  finishRotation(image: HTMLImageElement, event: AnimationEvent): void {
    if (event.target === image) {
      image.classList.remove('is-rotating');
    }
  }
}
