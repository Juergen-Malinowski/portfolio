/* Animates section content independently of scroll positioning and decorative shadows. */
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

function targetScrollPosition(target: HTMLElement): number {
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const absoluteTop = target.getBoundingClientRect().top + window.scrollY - margin;
  return Math.max(0, Math.min(maximum, absoluteTop));
}

export function isSectionAligned(target: HTMLElement): boolean {
  return Math.abs(window.scrollY - targetScrollPosition(target)) <= 3;
}

export function waitForSectionScroll(target: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    if (isSectionAligned(target)) {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      return;
    }

    let frameId = 0;
    let timeoutId = 0;
    const finish = () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
      document.removeEventListener('scrollend', finish);
      resolve();
    };
    const checkPosition = () => {
      if (isSectionAligned(target)) finish();
      else frameId = requestAnimationFrame(checkPosition);
    };

    if ('onscrollend' in document) {
      document.addEventListener('scrollend', finish, { once: true });
    } else {
      frameId = requestAnimationFrame(checkPosition);
    }
    timeoutId = window.setTimeout(finish, 2500);
  });
}

export function cancelSectionEntry(): void {
  for (const animation of activeAnimations) animation.cancel();
  activeAnimations.clear();
}

function animateTarget(element: HTMLElement): void {
  const animation = element.animate(
    [{ translate: '0 100px' }, { translate: '0 0' }],
    { duration: 600, easing: 'ease-out' }
  );
  activeAnimations.add(animation);
  animation.addEventListener('finish', () => activeAnimations.delete(animation), { once: true });
  animation.addEventListener('cancel', () => activeAnimations.delete(animation), { once: true });
}

export function animateSectionEntry(sectionId: string): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  cancelSectionEntry();

  for (const selector of entryTargets[sectionId] ?? []) {
    for (const element of document.querySelectorAll<HTMLElement>(selector)) {
      animateTarget(element);
    }
  }
}
