import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Client, Invoice, PredefinedService, Signer } from "../models/invoice.model";

@Injectable({
  providedIn: "root",
})
export class InvoiceDataService {
  private readonly clientsJsonUrl: string = "assets/clients.json";
  private readonly predefinedServicesJsonUrl: string = "assets/predefined_services.json";
  private readonly signersJsonUrl: string = "assets/signers.json";
  private readonly invoicesJsonUrl: string = "assets/invoices.json";
  private readonly apiUrl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  getPredefinedServices(): Observable<PredefinedService[]> {
    return this.http.get<PredefinedService[]>(`${this.apiUrl}/predefined-services`);
  }

  getSigners(): Observable<Signer[]> {
    return this.http.get<Signer[]>(`${this.apiUrl}/signers`);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/invoices`);
  }
}
