import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvoiceDataService } from "../../services/invoice-data.service";
import { Client } from "../../models/invoice.model";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrl: "./add-client.component.css",
})
export class AddClientComponent {
  addClientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private invoiceDataService: InvoiceDataService,
  ) {
    this.addClientForm = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      country: ["", Validators.required],
      companyCode: ["", Validators.required],
      vatCode: ["LT", Validators.required],
      phoneNumber: ["+370", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.addClientForm.valid) {
      this.invoiceDataService.addClient(this.addClientForm.value).subscribe((response: Client) => {
        alert("Invoice added successfully. " + JSON.stringify(response, null, 2));
        // Reset the form fields
        this.addClientForm.reset({
          name: "",
          address: "",
          country: "",
          companyCode: "",
          vatCode: "LT",
          phoneNumber: "+370",
          email: "",
        });
      });
    }
  }
}
