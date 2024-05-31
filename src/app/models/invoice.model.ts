import { Unit } from "./unit.enum";

export interface Client {
  name: string;
  address: string;
  companyCode: string;
  vatCode: string;
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
  id: number;
  date: string;
  number: string;
  clientName: string;
  totalWithoutVat: string;
  vatAmount: string;
  totalWithVat: string;
}
