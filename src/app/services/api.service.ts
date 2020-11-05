import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private useSQLAPI = false;

  public readonly apiBaseUrl = '/api/v1';
  public readonly sqlURLPath = this.useSQLAPI ? '/sql' : '';
}
