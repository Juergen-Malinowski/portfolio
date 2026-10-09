import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Skill {
  labelKey: string;
  icon: string;
  accent?: boolean;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit, OnDestroy {
  @ViewChildren('skillIcon') private skillIcons!: QueryList<ElementRef<HTMLImageElement>>;

  private observer?: IntersectionObserver;
  private readonly visibleIcons = new WeakSet<HTMLImageElement>();

  readonly skills: Skill[] = [
    // Frontend
    { labelKey: 'skills.items.html', icon: 'img/skills/HTML.svg' },
    { labelKey: 'skills.items.css', icon: 'img/skills/CSS.svg' },
    { labelKey: 'skills.items.javascript', icon: 'img/skills/JavaScript.svg' },
    { labelKey: 'skills.items.typescript', icon: 'img/skills/TypeScript.svg' },
    { labelKey: 'skills.items.angular', icon: 'img/skills/Angular.svg' },

    // Backend and data
    { labelKey: 'skills.items.python', icon: 'img/skills/Python.svg' },
    { labelKey: 'skills.items.django', icon: 'img/skills/Django.svg' },
    {
      labelKey: 'skills.items.djangoRestFramework',
      icon: 'img/skills/Django-REST-Framework.svg',
    },
    { labelKey: 'skills.items.restApi', icon: 'img/skills/REST-API.svg' },
    { labelKey: 'skills.items.postgresql', icon: 'img/skills/PostgreSQL.svg' },
    { labelKey: 'skills.items.redis', icon: 'img/skills/Redis.svg' },
    { labelKey: 'skills.items.firebase', icon: 'img/skills/Firebase.svg' },

    // Development and infrastructure
    { labelKey: 'skills.items.git', icon: 'img/skills/Git.svg' },
    { labelKey: 'skills.items.github', icon: 'img/skills/GitHub.svg' },
    { labelKey: 'skills.items.docker', icon: 'img/skills/Docker.svg' },
    { labelKey: 'skills.items.linux', icon: 'img/skills/Linux.svg' },
    { labelKey: 'skills.items.nginx', icon: 'img/skills/Nginx.svg' },
    { labelKey: 'skills.items.gunicorn', icon: 'img/skills/Gunicorn.svg' },
    { labelKey: 'skills.items.pytest', icon: 'img/skills/Pytest.svg' },

    // Methodology and continuous learning
    { labelKey: 'skills.items.scrum', icon: 'img/skills/Scrum.svg' },
    { labelKey: 'skills.items.materialDesign', icon: 'img/skills/Material-Design.svg' },
    {
      labelKey: 'skills.items.continuousLearning',
      icon: 'img/skills/Continually-Learning.svg',
      accent: true,
    },
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
      threshold: [0, 0.8],
    });

    for (const icon of this.skillIcons) {
      this.observer.observe(icon.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('document:skills-navigation')
  onSkillsNavigation(): void {
    for (const element of this.skillIcons) {
      const icon = element.nativeElement;
      const wasVisible = this.visibleIcons.has(icon);
      this.visibleIcons.delete(icon);

      if (wasVisible) {
        this.visibleIcons.add(icon);
        this.spinIcon(icon);
      }
    }
  }

  private onIntersection(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      this.updateVisibility(entry);
    }
  }

  private updateVisibility(entry: IntersectionObserverEntry): void {
    const icon = entry.target as HTMLImageElement;

    if (!entry.isIntersecting) {
      this.visibleIcons.delete(icon);
      return;
    }

    if (entry.intersectionRatio >= 0.8 && !this.visibleIcons.has(icon)) {
      this.visibleIcons.add(icon);
      this.spinIcon(icon);
    }
  }

  spinIcon(icon: HTMLImageElement): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (icon.classList.contains('is-spinning')) return;

    icon.classList.add('is-spinning');
  }

  finishSpin(icon: HTMLImageElement, event: AnimationEvent): void {
    if (event.target === icon) {
      icon.classList.remove('is-spinning');
    }
  }

  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    const contactName = document.getElementById('contact-name');

    contactName?.focus({
      preventScroll: true,
    });

    contactSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
