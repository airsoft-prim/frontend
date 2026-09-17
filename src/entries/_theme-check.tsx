import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { SiteHeader } from '../components/SiteHeader';

/**
 * Временная страница-лаборатория: снимает вычисленные стили надписи логотипа
 * во время смены схемы. Пишет прямо в DOM, минуя состояние React.
 * Удаляется после проверки.
 */
function findTitle(): HTMLElement | null {
  const candidates = document.querySelectorAll<HTMLElement>('p, span, div');
  for (const element of Array.from(candidates)) {
    if (element.textContent?.trim() === 'AIRSOFT PRIM') {
      return element;
    }
  }
  return null;
}

function Probe() {
  useEffect(() => {
    const out = document.getElementById('probe-result') as HTMLElement;
    const lines: string[] = [];
    const timers: number[] = [];

    const write = (line: string) => {
      lines.push(line);
      out.textContent = lines.join('\n');
    };

    const press = (element: HTMLElement, type: string) => {
      const Ctor = type.startsWith('pointer') ? PointerEvent : MouseEvent;
      element.dispatchEvent(
        new Ctor(type, {
          bubbles: type !== 'mouseenter',
          cancelable: true,
          button: 0,
          buttons: type === 'pointerdown' || type === 'mousedown' ? 1 : 0,
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
        })
      );
    };

    const sample = (tag: string) => {
      const title = findTitle();
      if (!title) {
        write(`${tag} title not found`);
        return;
      }

      const root = document.documentElement;
      const style = getComputedStyle(title);
      const rect = title.getBoundingClientRect();
      const header = document.querySelector('header');
      const animated = title
        .getAnimations()
        .map(
          (animation) =>
            `${(animation as CSSTransition).transitionProperty ?? 'animation'}:${Math.round(
              animation.effect?.getTiming().duration as number
            )}`
        )
        .join(' ');

      write(
        `${tag} attr=${root.getAttribute('data-mantine-color-scheme')} class="${root.className}" bodyBg=${getComputedStyle(document.body).backgroundColor} headerBg=${header ? getComputedStyle(header).backgroundColor : 'n/a'} color=${style.color} fill=${style.webkitTextFillColor} opacity=${style.opacity} visibility=${style.visibility} filter=${style.filter} shadow=${style.textShadow} blend=${style.mixBlendMode} smoothing=${style.webkitFontSmoothing} size=${Math.round(rect.width)}x${Math.round(rect.height)} anim=[${animated}]`
      );
    };

    timers.push(
      window.setTimeout(() => {
        sample('before');
      }, 300)
    );

    timers.push(
      window.setTimeout(() => {
        const button = document.querySelector<HTMLElement>(
          '[aria-label="Переключить цветовую схему"]'
        );
        write(`button found: ${Boolean(button)}`);
        if (!button) {
          return;
        }

        press(button, 'pointerover');
        press(button, 'mouseover');
        press(button, 'mouseenter');
        button.focus();
        press(button, 'pointerdown');
        press(button, 'mousedown');
        button.click();
        press(button, 'pointerup');
        press(button, 'mouseup');

        sample('click');
      }, 600)
    );

    for (let step = 1; step <= 8; step += 1) {
      timers.push(
        window.setTimeout(() => sample(`+${step * 40}ms`), 600 + step * 40)
      );
    }

    timers.push(window.setTimeout(() => sample('+500ms'), 1100));

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <div>
      <SiteHeader />
      <pre id="probe-result" />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Probe />
    </AppProviders>
  </StrictMode>
);
