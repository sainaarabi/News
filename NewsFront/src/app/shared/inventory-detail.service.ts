import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventoryDetail } from './inventory-detail.interface';
import { InventoryDetail } from './inventory-detail.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryDetailService {



  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.httpHeaders = this.httpHeaders.set('Content-type', 'application/json; charset=UTF-8');
  }
  readonly baseURL = 'http://localhost:5000/api/InventoryDetail';
  formData: InventoryDetail = new InventoryDetail();
  list: InventoryDetail[] = [];


  getPost(id: number): Observable<IInventoryDetail> {
    return this.http.get<IInventoryDetail>(this.baseURL + `/${id}`);
  }

  GetInventoryDetail(id: number) {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  postInventoryDetail() {
    return this.http.post(`${this.baseURL}/PostInventoryDetail`, this.formData);
  }

  putInventoryDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.inventoryDetailId}`, this.formData);
  }

  deleteInventoryDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(`${this.baseURL}/GetInventoryDetails`)
      .toPromise()
      .then(res => {
        this.list = res as InventoryDetail[]
      });
  }

}
