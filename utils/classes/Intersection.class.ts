import { Dispatch, SetStateAction } from 'react';

export class IntersectionClass {
  triggerWhenIntersected(
    identifier: string,
    func: () => void,
    triggerActionAvailability: { state: boolean; setState: Dispatch<SetStateAction<boolean>> },
  ) {
    const target = document.querySelector(identifier);
    if (!target) {
      console.error('Target element not found');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerActionAvailability.state) func();
            triggerActionAvailability.setState(false);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0 // Trigger as soon as any part is visible
      }
    );

    observer.observe(target);

    // Return a cleanup function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }
}