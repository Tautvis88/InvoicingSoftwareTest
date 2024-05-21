import { Unit } from "./units.enum";

export interface InvoiceRow {
  isHighlighted?: boolean;
  serviceName: string;
  unit: Unit;
  quantity: number;
  price: string;
  sum: number;
}
