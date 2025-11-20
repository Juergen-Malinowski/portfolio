import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.initSkillIconAnimation();
  }

  private initSkillIconAnimation(): void {
    var icons = this.elementRef.nativeElement.querySelectorAll('.skill-icon');

    for (var i = 0; i < icons.length; i++) {
      var icon = icons[i] as HTMLElement;

      icon.addEventListener('mousemove', function (this: HTMLElement) {

        /* Animationsklasse entfernen */
        this.classList.remove('skill-icon-anim');

        /* Reflow erzwingen → Browser „vergisst“ alte Animation */
        void this.offsetWidth;

        /* Animationsklasse erneut hinzufügen → Animation läuft NEU */
        this.classList.add('skill-icon-anim');
      });
    }
  }
}
