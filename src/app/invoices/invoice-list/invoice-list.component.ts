import { Component, OnInit } from "@angular/core";
import { Invoice } from "../../models/invoice.model";
import { InvoiceDataService } from "../../services/invoice-data.service";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrl: "./invoice-list.component.css",
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  totalWithoutVat: number = 0;
  vatAmount: number = 0;
  totalWithVat: number = 0;

  constructor(private invoiceDataService: InvoiceDataService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceDataService.getInvoices().subscribe((data: Invoice[]) => {
      this.invoices = data;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalWithoutVat = this.invoices.reduce((sum, invoice) => sum + parseFloat(invoice.totalWithoutVat), 0);
    this.vatAmount = this.invoices.reduce((sum, invoice) => sum + parseFloat(invoice.vatAmount), 0);
    this.totalWithVat = this.invoices.reduce((sum, invoice) => sum + parseFloat(invoice.totalWithVat), 0);
  }
}
