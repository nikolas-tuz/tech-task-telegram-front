export class StringManipulation {
  constructor(private readonly string: string) {
  }

  trimText(ifLength: number) {
    return this.string.length > ifLength ? this.string.slice(0, ifLength) + `..` : this.string;
  }


}