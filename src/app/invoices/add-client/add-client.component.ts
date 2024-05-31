import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvoiceDataService } from "../../services/invoice-data.service";

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
      companyCode: ["", Validators.required],
      vatCode: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.addClientForm.valid) {
      // this.invoiceDataService.addClient(this.addClientForm.value).subscribe((response) => {
      //   // Handle response and navigate back to the client list or show a success message
      // });
    }
  }
}
