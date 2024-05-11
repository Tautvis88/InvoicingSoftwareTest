import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceCreateComponent } from './invoices/invoice-create/invoice-create.component';
import { FlatpickrDirective } from './invoices/invoice-create/flatpickr.directive';

@NgModule({
  declarations: [AppComponent, InvoiceCreateComponent, FlatpickrDirective],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
