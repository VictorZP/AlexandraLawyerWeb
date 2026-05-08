import { useEffect } from "react";

/**
 * Глобальный сдвиг изображений при скролле: вниз страницы — картинка чуть «уезжает» вверх (и наоборот).
 * Значение подставляется в CSS как `translateY(calc(-1 * var(--scroll-parallax)))`.
 */
export function useGlobalScrollParallax() {
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mq.matches) {
        root.style.setProperty("--scroll-parallax", "0px");
        return;
      }
      const y = window.scrollY;
      const px = Math.min(140, y * 0.052);
      root.style.setProperty("--scroll-parallax", `${px}px`);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", apply);
    };
  }, []);
}
