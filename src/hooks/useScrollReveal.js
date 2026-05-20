import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-active');
        } else {
          entry.target.classList.remove('scroll-active');
        }
      });
    }, { threshold: 0.05 });

    const hiddenElements = document.querySelectorAll('.scroll-reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
