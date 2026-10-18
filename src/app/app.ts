import { Component, inject } from '@angular/core';
import { AnimationConfigService } from './animation-config.service';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './app.html',
  host: {
    '[class.figma-animations]': 'animationConfig.useFigmaAnimations',
    '[class.enhanced-animations]': '!animationConfig.useFigmaAnimations',
  },
})
export class App {
  protected readonly animationConfig = inject(AnimationConfigService);
}
