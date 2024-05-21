import { Component, OnInit } from "@angular/core";
import { InvoiceDataService } from "../../services/invoice-data.service";
import { Buyer, InvoiceRow } from "../../models/invoice.model";
import { Unit } from "../../models/unit.enum";

@Component({
  selector: "app-invoice-create",
  templateUrl: "./invoice-create.component.html",
  styleUrl: "./invoice-create.component.css",
})
export class InvoiceCreateComponent implements OnInit {
  buyers: Buyer[] = [];
  selectedBuyer: Buyer | null = null;
  rows: InvoiceRow[] = [];
  totalWithoutVAT: number = 0;
  VATAmount: number = 0;
  totalWithVAT: number = 0;
  units = Object.values(Unit);

  constructor(private invoiceDataService: InvoiceDataService) {}

  ngOnInit(): void {
    this.loadBuyers();
    this.addRow();
  }

  loadBuyers(): void {
    this.invoiceDataService.getBuyers().subscribe((data: Buyer[]) => {
      this.buyers = data;
    });
  }

  onBuyerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedName = selectElement.value;
    this.selectedBuyer = this.buyers.find((buyer) => buyer.name === selectedName) || null;
  }

  addRow() {
    this.rows.push({ serviceName: "", unit: Unit.Vnt, quantity: 0, price: "0.00", sum: 0.0 });
  }

  updateRowSum(row: InvoiceRow): void {
    row.sum = parseFloat((row.quantity * parseFloat(row.price)).toFixed(2));
    this.updateTotals();
  }

  private updateTotals(): void {
    // IJ sukūrė automatiškai su žodeliu private, pagooglinti ar reikia visur jo?
    this.totalWithoutVAT = parseFloat(this.rows.reduce((total, row) => total + row.sum, 0).toFixed(2)); // prisiminti ką reiškia 0
    this.VATAmount = parseFloat((this.totalWithoutVAT * 0.21).toFixed(2));
    this.totalWithVAT = parseFloat((this.totalWithoutVAT + this.VATAmount).toFixed(2));
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
    const value = inputElement.value.replace(/,/g, ".");
    const regex = /^\d+(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      inputElement.value = value.slice(0, value.length - 1);
    }
    row.price = inputElement.value;
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
}
