interface LogoMarkProps {
  size?: number;
}

/**
 * Эмблема проекта: прицельная марка — кольцо с засечками и точкой в центре.
 * Рисуется одним цветом (`--sf-field`), поэтому сама перекрашивается при смене
 * схемы. Декоративна: название рядом проговаривает текстовая часть логотипа.
 */
export function LogoMark({ size = 32 }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      style={{ color: 'var(--sf-field)', flexShrink: 0 }}
    >
      <circle
        cx="16"
        cy="16"
        r="12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M16 1.5V6M16 26v4.5M1.5 16H6M26 16h4.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  );
}
