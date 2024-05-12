import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Buyer {
  name: string;
  address: string;
  companyCode: string;
  VATCode: string;
  phoneNumber: string;
  email: string;
}

@Injectable({
  providedIn: "root",
})
export class BuyerService {
  private readonly jsonUrl: string = "assets/buyer-list.json";
  constructor(private http: HttpClient) {}

  getBuyers(): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(this.jsonUrl);
  }
}
