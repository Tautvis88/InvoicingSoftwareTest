import { Component, OnInit } from "@angular/core";
import { Buyer, BuyerService } from "../../services/buyer.service";
import { InvoiceRow } from "../../types/invoice-row.model";
import { Unit } from "../../types/units.enum";

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

  constructor(private buyerService: BuyerService) {}

  ngOnInit(): void {
    this.loadBuyers();
    this.addRow();
  }

  loadBuyers(): void {
    this.buyerService.getBuyers().subscribe((data: Buyer[]) => {
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
    const value = inputElement.value;
    const regex = /^\d+(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      inputElement.value = value.slice(0, value.length - 1);
    }
    row.price = inputElement.value;
    this.updateRowSum(row);
  }

  protected readonly Number = Number;
}
