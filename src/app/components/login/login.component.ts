import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(private _userService: UserService) {
    this.page_title = 'Identifícate';
    this.user = new User(0, '', '', '', '', '');
    this.status = '';
  }

  ngOnInit(): void {}

  onSubmit(form:any): void {
    this._userService.login(this.user.email, this.user.password).subscribe(
      (response) => {
        this.status = 'success';
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        alert('¡Login exitoso!');
      },
      (error) => {
        console.error(error);
        this.status = 'error';
        alert(error);
      }
    );
  }
}


//Correcto, con las configuraciones modernas de Angular, ya no es necesario importar manualmente los servicios en el providers de cada componente si los has decorado con @Injectable({ providedIn: 'root' }).
//Cuando usas el decorador providedIn: 'root' en el servicio, Angular automáticamente lo registra en el inyector de nivel raíz, por lo que estará disponible en toda la aplicación sin necesidad de incluirlo en los providers de los componentes o módulos.