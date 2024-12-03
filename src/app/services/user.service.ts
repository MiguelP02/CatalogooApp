import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from './global';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Usar la URL desde el archivo global
    this.apiUrl = global.urlLogin;
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any[]>(this.apiUrl).subscribe(
        (users) => {
          const foundUser = users.find(
            (item) => item.user.email === email && item.user.password === password
          );

          if (foundUser) {
            observer.next(foundUser); // Usuario encontrado
            observer.complete();
          } else {
            observer.error('Usuario o contraseña incorrectos'); // Error de autenticación
          }
        },
        (error) => {
          observer.error('Error al conectar con el servidor');
        }
      );
    });
  }
}

//Tu servicio UserService está bien planteado, pero dado que estás trabajando con MockAPI.io y las operaciones de autenticación implican validar los datos del usuario frente a un conjunto existente, la lógica debería ajustarse ligeramente. No necesitas enviar datos para autenticación (como en un POST), sino más bien validar los datos ingresados contra los existentes usando un GET.