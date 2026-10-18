import { Injectable } from '@angular/core';

interface AnimationConfig {
  useFigmaAnimations: boolean;
}

@Injectable({ providedIn: 'root' })
export class AnimationConfigService {
  // Keep Figma mode enabled if the external configuration is unavailable.
  useFigmaAnimations = true;

  async load(): Promise<void> {
    try {
      const response = await fetch('/animation-config.json', { cache: 'no-store' });
      if (!response.ok) return;

      const config: unknown = await response.json();
      if (this.isAnimationConfig(config)) {
        this.useFigmaAnimations = config.useFigmaAnimations;
      }
    } catch {
      this.useFigmaAnimations = true;
    }
  }

  private isAnimationConfig(config: unknown): config is AnimationConfig {
    return typeof config === 'object' && config !== null &&
      'useFigmaAnimations' in config && typeof config.useFigmaAnimations === 'boolean';
  }
}
