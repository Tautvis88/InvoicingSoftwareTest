import { Component, OnInit } from "@angular/core";
import { Buyer, BuyerService } from "../../services/buyer.service";

@Component({
  selector: "app-invoice-create",
  templateUrl: "./invoice-create.component.html",
  styleUrl: "./invoice-create.component.css",
})
export class InvoiceCreateComponent implements OnInit {
  buyers: Buyer[] = [];
  selectedBuyer: Buyer | null = null;

  constructor(private buyerService: BuyerService) {}

  ngOnInit(): void {
    this.loadBuyers();
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
}
