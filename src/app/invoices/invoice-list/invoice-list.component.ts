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

  constructor(private invoiceDataService: InvoiceDataService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceDataService.getInvoices().subscribe((data: Invoice[]) => {
      this.invoices = data;
    });
  }
}
