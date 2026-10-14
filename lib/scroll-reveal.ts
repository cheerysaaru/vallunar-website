"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    once = true,
    delay = 0,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (once && element) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, delay]);

  return { ref: elementRef, isVisible };
}

export function useStaggeredReveal(
  count: number,
  options: ScrollRevealOptions = {}
) {
  const [visibleIndices, setVisibleIndices] = useState<boolean[]>(Array(count).fill(false));
  const elementRefs = useRef<(HTMLElement | null)[]>(Array(count).fill(null));

  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", once = true } = options;

  useEffect(() => {
    const elements = elementRefs.current.filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elements.indexOf(entry.target as HTMLElement);
          if (index === -1) return;

          if (entry.isIntersecting) {
            setVisibleIndices((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisibleIndices((prev) => {
              const next = [...prev];
              next[index] = false;
              return next;
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, count]);

  const getItemProps = (index: number) => ({
    ref: (el: HTMLElement | null) => {
      elementRefs.current[index] = el;
    },
    isVisible: visibleIndices[index],
  });

  return { getItemProps };
}