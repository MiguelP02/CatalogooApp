import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public identity: any;
  public token: any;
  private apiUrl: string;
  private readonly storage!: Storage;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.apiUrl = global.urlLogin;
  }

  login(id:number, email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any>(`${this.apiUrl}/${id}`).subscribe(
        (user) => {
          // Verifica las credenciales en la respuesta del servidor
          if (user && user.password === password) {
            observer.next(user); // Usuario encontrado
            observer.complete();
          } else {
            observer.error('Usuario o contraseña incorrectos'); // Error de autenticación
          }
        },
        (error) => {
          observer.error('Error al conectar con el servidor'); // Error en la conexión
        }
      );
    });
  }  

  getIdentity(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      const storedUser = localStorage.getItem('user');
      this.identity = storedUser ? JSON.parse(storedUser) : null;
      console.log(this.identity)
    } else {
      this.identity = null;
    }
    return this.identity;
  }
  
  getToken(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      this.token = token ? token : null;
    } else {
      this.token = null;
    }
    return this.token;
  }

}