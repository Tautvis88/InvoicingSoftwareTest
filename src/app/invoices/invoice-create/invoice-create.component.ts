import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { InvoiceDataService } from "../../services/invoice-data.service";
import { Client, InvoiceRow, Service, Signer } from "../../models/invoice.model";
import { Unit } from "../../models/unit.enum";
import { NumberConverterService } from "../../services/number-converter.service";

@Component({
  selector: "app-invoice-create",
  templateUrl: "./invoice-create.component.html",
  styleUrl: "./invoice-create.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class InvoiceCreateComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  rows: InvoiceRow[] = [];
  services: Service[] = [];
  signers: Signer[] = [];
  selectedSigner: string = "direktorius Viktoras Statkus";
  totalWithoutVat: number = 0;
  vatAmount: number = 0;
  totalWithVat: number = 0;
  amountInWords: string = "";
  units = Object.values(Unit);

  constructor(
    private invoiceDataService: InvoiceDataService,
    private numberConverterService: NumberConverterService,
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.addRow();
    this.loadServices();
    this.loadSigners();
  }

  loadClients(): void {
    this.invoiceDataService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  loadServices(): void {
    this.invoiceDataService.getServices().subscribe((data: Service[]) => {
      this.services = data;
    });
  }

  loadSigners(): void {
    this.invoiceDataService.getSigners().subscribe((data: Signer[]) => {
      this.signers = data;
    });
  }

  onClientChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedName = selectElement.value;
    this.selectedClient = this.clients.find((client) => client.name === selectedName) || null;
  }

  addRow() {
    this.rows.push({ serviceName: "", unit: Unit.Vnt, quantity: 0, price: "0.00", sum: 0.0 });
  }

  updateRowSum(row: InvoiceRow): void {
    row.sum = parseFloat((row.quantity * parseFloat(row.price)).toFixed(2));
    this.updateTotals();
  }

  updateTotals(): void {
    this.totalWithoutVat = parseFloat(this.rows.reduce((total, row) => total + row.sum, 0).toFixed(2));
    this.vatAmount = parseFloat((this.totalWithoutVat * 0.21).toFixed(2));
    this.totalWithVat = parseFloat((this.totalWithoutVat + this.vatAmount).toFixed(2));
    this.amountInWords = this.numberConverterService.toLithuanian(this.totalWithVat);
  }

  getUnitDisplay(unit: string): string {
    switch (unit) {
      case Unit.Sqm:
        return "m&#178;";
      case Unit.Cub:
        return "m&sup3;";
      default:
        return unit;
    }
  }

  increaseQuantity(row: InvoiceRow): void {
    row.quantity += 1;
    this.updateRowSum(row);
  }

  decreaseQuantity(row: InvoiceRow): void {
    if (row.quantity > 0) {
      row.quantity -= 1;
      this.updateRowSum(row);
    }
  }

  onFocusSelect(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  validateDecimal(event: Event, row: InvoiceRow): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.replace(/,/g, ".");

    const regex = /^\d+(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      inputElement.value = value.slice(0, value.length - 1);
    }
    inputElement.value = value;
    row.price = value;
    this.updateRowSum(row);
  }

  formatPrice(event: Event, row: InvoiceRow): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(/,/g, ".");

    const regex = /^\d+(\.\d{0,2})?$/;
    regex.test(value) ? (inputElement.value = parseFloat(value).toFixed(2)) : (row.price = "0.00");

    this.updateRowSum(row);
  }

  deleteRow(index: number): void {
    if (this.rows.length != 1) {
      this.rows.splice(index, 1);
    }
    this.updateTotals();
  }

  highlightRow(row: InvoiceRow, highlight: boolean): void {
    row.isHighlighted = highlight;
  }

  preventPasteNegativeQuantity(event: Event, row: InvoiceRow): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/-/g, "");
    row.quantity = parseFloat(inputElement.value) || 0;
    inputElement.value = row.quantity.toString(); // prevents pasting letters
    this.updateRowSum(row);
  }

  preventNegativeKeyboardSymbol(event: KeyboardEvent): void {
    if (event.key === "-") {
      event.preventDefault();
    }
  }
}
