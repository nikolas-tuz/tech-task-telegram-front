export class DocumentManipulation {
  scrollToElement(identifier: string) {
    const element = document.querySelector(identifier);
    if (element) {
      element.scrollIntoView({ behavior: `smooth`, block: `start` });
    }
  }
}