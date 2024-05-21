import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Buyer } from "../models/invoice.model";

@Injectable({
  providedIn: "root",
})
export class InvoiceDataService {
  private readonly buyersJsonUrl: string = "assets/buyers.json";
  constructor(private http: HttpClient) {}

  getBuyers(): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(this.buyersJsonUrl);
  }
}
