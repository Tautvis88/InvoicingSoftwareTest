import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Buyer, Service } from "../models/invoice.model";

@Injectable({
  providedIn: "root",
})
export class InvoiceDataService {
  private readonly buyersJsonUrl: string = "assets/buyers.json";
  private readonly servicesJsonUrl: string = "assets/services.json";

  constructor(private http: HttpClient) {}

  getBuyers(): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(this.buyersJsonUrl);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.servicesJsonUrl);
  }
}
