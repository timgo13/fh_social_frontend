import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // TODO get url from build parameter
  public readonly BaseUrl = 'localhost:8000';
  public readonly apiBaseUrl = this.BaseUrl + '/api/v1';
}
