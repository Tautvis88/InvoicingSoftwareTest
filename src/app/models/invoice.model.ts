import { Unit } from "./unit.enum";

export interface Buyer {
  name: string;
  address: string;
  companyCode: string;
  VATCode: string;
  phoneNumber: string;
  email: string;
}

export interface InvoiceRow {
  isHighlighted?: boolean;
  serviceName: string;
  unit: Unit;
  quantity: number;
  price: string;
  sum: number;
}

export interface Service {
  name: string;
}

export interface Signer {
  name: string;
}

export interface Invoice {
  date: string;
  number: string;
  buyerName: string;
  totalWithoutVat: string;
  vatAmount: string;
  totalWithVat: string;
}
