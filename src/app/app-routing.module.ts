import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoiceListComponent } from "./invoices/invoice-list/invoice-list.component";
import { InvoiceCreateComponent } from "./invoices/invoice-create/invoice-create.component";

const routes: Routes = [
  { path: "invoices", component: InvoiceListComponent },
  { path: "create-invoice", component: InvoiceCreateComponent },
  { path: "", redirectTo: "/invoices", pathMatch: "full" }, //Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
