export class StringManipulation {
  constructor(private readonly string: string) {
  }

  trimText(ifLength: number) {
    return this.string.length > ifLength ? this.string.slice(0, ifLength) + `..` : this.string;
  }

  formatDate() {
    const date = new Date(this.string);
    return date.toLocaleDateString(`en-US`, {
      year: `numeric`,
      month: `2-digit`,
      day: `2-digit`,
      hour: `2-digit`,
      minute: `2-digit`
    });

  }


}