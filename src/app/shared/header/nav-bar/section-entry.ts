/* Coordinates menu-triggered section motion without moving decorative shadows. */
const entryTargets: Record<string, string[]> = {
  about: ['#about'],
  skills: ['#skills .skills-main-box'],
  projects: [
    '#projects',
    '.projects-top-box',
    '.projects-center-wrapper .project-image',
    '.projects-center-wrapper .project-content',
  ],
  contact: ['#contact .contact-main-box'],
};

const activeAnimations = new Set<Animation>();

export function getSectionScrollTop(target: HTMLElement): number {
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const top = target.getBoundingClientRect().top + window.scrollY - margin;
  return Math.max(0, Math.min(maximum, top));
}

export function waitForSectionScroll(top: number): Promise<void> {
  return new Promise((resolve) => {
    let frame = 0;
    let timeout = 0;
    let alignedFrames = 0;
    const aligned = () => Math.abs(window.scrollY - top) <= 3;
    const finish = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      document.removeEventListener('scrollend', onScrollEnd);
      resolve();
    };
    const onScrollEnd = () => {
      if (aligned()) finish();
    };
    const check = () => {
      alignedFrames = aligned() ? alignedFrames + 1 : 0;
      if (alignedFrames >= 2) finish();
      else frame = requestAnimationFrame(check);
    };

    document.addEventListener('scrollend', onScrollEnd);
    frame = requestAnimationFrame(check);
    timeout = window.setTimeout(finish, 2500);
  });
}

export function cancelSectionEntry(): void {
  for (const animation of activeAnimations) animation.cancel();
  activeAnimations.clear();
}

function prepareTarget(element: HTMLElement): void {
  const animation = element.animate(
    [{ translate: '0 100px' }, { translate: '0 0' }],
    { duration: 600, easing: 'ease-out', fill: 'both' }
  );
  animation.pause();
  animation.currentTime = 0;
  activeAnimations.add(animation);
  const cleanup = () => activeAnimations.delete(animation);
  animation.addEventListener('finish', () => {
    animation.cancel();
  }, { once: true });
  animation.addEventListener('cancel', cleanup, { once: true });
}

export function prepareSectionEntry(sectionId: string): void {
  cancelSectionEntry();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (const selector of entryTargets[sectionId] ?? []) {
    for (const element of document.querySelectorAll<HTMLElement>(selector)) {
      prepareTarget(element);
    }
  }
}

export function playSectionEntry(): void {
  for (const animation of activeAnimations) animation.play();
}
