import { Unit } from "./units.enum";

export interface InvoiceRow {
  serviceName: string;
  unit: Unit;
  quantity: number;
  price: string;
  sum: number;
}
