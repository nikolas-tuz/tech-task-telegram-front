import { Dispatch, SetStateAction } from 'react';

export class IntersectionClass {
  triggerWhenIntersected(
    identifier: string,
    func: () => void,
    triggerActionAvailability: { state: boolean; setState: Dispatch<SetStateAction<boolean>> },
    timeOut: number = 5_000
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
            console.log('Div is observed. Waiting for 5 seconds...');
            if (triggerActionAvailability.state) func();
            triggerActionAvailability.setState(false);

            setTimeout(() => {
              triggerActionAvailability.setState(true);
            }, timeOut);
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

    return () => {
      observer.disconnect();
    };
  }

}