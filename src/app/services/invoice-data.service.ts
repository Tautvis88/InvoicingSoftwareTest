import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Buyer, Service, Signer } from "../models/invoice.model";

@Injectable({
  providedIn: "root",
})
export class InvoiceDataService {
  private readonly buyersJsonUrl: string = "assets/buyers.json";
  private readonly servicesJsonUrl: string = "assets/services.json";
  private readonly signersJsonUrl: string = "assets/signers.json";

  constructor(private http: HttpClient) {}

  getBuyers(): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(this.buyersJsonUrl);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.servicesJsonUrl);
  }

  getSigners(): Observable<Signer[]> {
    return this.http.get<Service[]>(this.signersJsonUrl);
  }
}
