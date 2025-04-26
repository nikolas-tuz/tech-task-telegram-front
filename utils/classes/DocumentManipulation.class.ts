export class DocumentManipulation {
  scrollToElement(identifier: string, smooth = true) {
    const element = document.querySelector(identifier);
    if (element) {
      element.scrollIntoView({ behavior: smooth ? `smooth` : `instant`, block: `start` });
    }
  }
}