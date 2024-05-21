import { TestBed } from "@angular/core/testing";

import { InvoiceDataService } from "./invoice-data.service";

describe("BuyerService", () => {
  let service: InvoiceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceDataService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
