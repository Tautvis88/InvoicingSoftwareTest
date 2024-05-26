import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NumberConverterService {
  private ZERO_TO_NINETEEN: string[] = [
    "nulis",
    "vienas",
    "du",
    "trys",
    "keturi",
    "penki",
    "šeši",
    "septyni",
    "aštuoni",
    "devyni",
    "dešimt",
    "vienuolika",
    "dvylika",
    "trylika",
    "keturiolika",
    "penkiolika",
    "šešiolika",
    "septyniolika",
    "aštuoniolika",
    "devyniolika",
  ];

  private TENS: string[] = [
    "",
    "",
    "dvidešimt",
    "trisdešimt",
    "keturiasdešimt",
    "penkiasdešimt",
    "šešiasdešimt",
    "septyniasdešimt",
    "aštuoniasdešimt",
    "devyniasdešimt",
  ];

  private SCALES = [
    { value: 1_000_000_000_000_000_000, singular: "kvintilijonas", plural: "kvintilijonai", plural2: "kvintilijonų" },
    { value: 1_000_000_000_000_000, singular: "kvadrilijonas", plural: "kvadrilijonai", plural2: "kvadrilijonų" },
    { value: 1_000_000_000_000, singular: "trilijonas", plural: "trilijonai", plural2: "trilijonų" },
    { value: 1_000_000_000, singular: "milijardas", plural: "milijardai", plural2: "milijardų" },
    { value: 1_000_000, singular: "milijonas", plural: "milijonai", plural2: "milijonų" },
    { value: 1_000, singular: "tūkstantis", plural: "tūkstančiai", plural2: "tūkstančių" },
    { value: 100, singular: "šimtas", plural: "šimtai", plural2: "šimtų" },
  ];

  public toLithuanian(number: number): string {
    const integerPart = Math.floor(number);
    const decimalPart = number % 1;

    const integerWords = this.fromNumber(integerPart);
    const decimalWords = decimalPart > 0 ? this.fromNumber(Math.round(decimalPart * 100)) : "";

    if (decimalWords) {
      return `${integerWords} EUR ir ${decimalWords} ct`;
    } else {
      return integerWords;
    }
  }

  private fromNumber(number: number): string {
    if (number === Number.MIN_SAFE_INTEGER) {
      return this.fromNumber(-9223372036854775800) + " " + this.ZERO_TO_NINETEEN[8];
    }

    if (number < 0) {
      return "minus " + this.fromNumber(-number);
    }

    if (number < 20) {
      return this.ZERO_TO_NINETEEN[number];
    }

    let remainder = number;
    const sb: string[] = [];

    for (const scale of this.SCALES) {
      remainder = this.formatScale(remainder, scale, sb);
    }

    if (remainder > 0) {
      sb.push(this.upToOneHundred(remainder));
    }

    return sb.join(" ").trim();
  }

  private formatScale(number: number, scale: any, sb: string[]): number {
    const scaleValue = scale.value;
    if (number >= scaleValue) {
      const count = Math.floor(number / scaleValue);
      sb.push(this.upToOneThousand(count));
      sb.push(this.formForCount(count, scale));
      sb.push(" "); // Ensure space is added between words
      return number - count * scaleValue;
    }
    return number;
  }

  private upToOneThousand(number: number): string {
    this.checkValueBetween(0, 999, number);
    if (number < this.ZERO_TO_NINETEEN.length) {
      return this.ZERO_TO_NINETEEN[number];
    }

    const sb: string[] = [];
    const withoutHundreds = this.formatScale(
      number,
      this.SCALES.find((scale) => scale.value === 100),
      sb,
    );

    if (withoutHundreds > 0) {
      sb.push(this.upToOneHundred(withoutHundreds));
    }

    return sb.join(" ").trim();
  }

  private upToOneHundred(number: number): string {
    this.checkValueBetween(0, 99, number);
    if (number < this.ZERO_TO_NINETEEN.length) {
      return this.ZERO_TO_NINETEEN[number];
    }

    const tens = Math.floor(number / 10);
    const units = number % 10;
    if (units > 0) {
      return `${this.TENS[tens]} ${this.ZERO_TO_NINETEEN[units]}`;
    } else {
      return this.TENS[tens];
    }
  }

  private formForCount(count: number, scale: any): string {
    this.checkNotNegative(count);
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;
    if (lastTwoDigits > 10 && lastTwoDigits < 20) {
      return scale.plural2;
    }
    if (lastDigit === 1) {
      return scale.singular;
    }
    return scale.plural;
  }

  private checkValueBetween(min: number, max: number, value: number): void {
    if (min > max) {
      throw new Error(`min (${min}) > max (${max})`);
    }
    if (value < min) {
      throw new Error(`value (${value}) < min (${min})`);
    }
    if (value > max) {
      throw new Error(`value (${value}) > max (${max})`);
    }
  }

  private checkNotNegative(value: number): void {
    if (value < 0) {
      throw new Error(`negative value (${value})`);
    }
  }
}
