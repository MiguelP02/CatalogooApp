import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = global.urlCatalogo;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  createProducto(producto: Producto): Observable<Producto> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Producto>(this.apiUrl, producto, { headers });
  }

  updateProducto(id: number, producto: Producto): Observable<Producto> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto, { headers });
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
