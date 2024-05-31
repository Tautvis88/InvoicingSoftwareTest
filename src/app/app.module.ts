import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InvoiceCreateComponent } from "./invoices/invoice-create/invoice-create.component";
import { FlatpickrDirective } from "./directives/flatpickr.directive";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { InvoiceListComponent } from "./invoices/invoice-list/invoice-list.component";
import { AddClientComponent } from "./invoices/add-client/add-client.component";

@NgModule({
  declarations: [
    AppComponent,
    InvoiceCreateComponent,
    FlatpickrDirective,
    SidebarComponent,
    InvoiceListComponent,
    AddClientComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, DropdownModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
