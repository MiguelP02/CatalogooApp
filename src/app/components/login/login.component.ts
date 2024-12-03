import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';

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
  public errorMessage: string;
  public identity: any;
  public token: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User(0, '', '', '', '', '');
    this.status = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.logOut();
  }

  onSubmit(form: any): void {
    if (!this.user.email || !this.user.password) {
      this.status = 'error';
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    if(this.user.email.includes('admin')){
      this._userService.login(1,this.user.email, this.user.password).subscribe(
        (user) => {
          this.status = 'success';
          this.errorMessage = '';
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          //console.log('Usuario autenticado:', user);
          this._router.navigate(['lista-productos']);
        },
        (error) => {
          this.status = 'error';
          this.errorMessage = error;
        }
      );
    }else{
      this._userService.login(2,this.user.email, this.user.password).subscribe(
        (user) => {
          this.status = 'success';
          this.errorMessage = '';
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          //console.log('Usuario autenticado:', user);
          this._router.navigate(['lista-productos']);
        },
        (error) => {
          this.status = 'error';
          this.errorMessage = error;
        }
      );
    }
  }

  logOut(){
    this._route.params.subscribe(params => {
      const logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['inicio']);
      }

    })
  }

}


//Correcto, con las configuraciones modernas de Angular, ya no es necesario importar manualmente los servicios en el providers de cada componente si los has decorado con @Injectable({ providedIn: 'root' }).
//Cuando usas el decorador providedIn: 'root' en el servicio, Angular automáticamente lo registra en el inyector de nivel raíz, por lo que estará disponible en toda la aplicación sin necesidad de incluirlo en los providers de los componentes o módulos.