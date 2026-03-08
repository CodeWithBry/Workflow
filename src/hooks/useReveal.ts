import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, the class "visible"
 * is added (works with the global .reveal / .reveal.visible CSS).
 */
export function useReveal<T extends Element = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    );

    // Observe the element itself and all .reveal descendants
    const revealEls = el.querySelectorAll<Element>(".reveal");
    revealEls.forEach((r) => io.observe(r));
    if (el.classList.contains("reveal")) io.observe(el);

    return () => io.disconnect();
  }, []);

  return ref;
}
