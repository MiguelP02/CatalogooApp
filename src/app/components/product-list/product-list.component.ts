import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-product-list',
  standalone: false,
  
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public productos: Producto[] = [];
  public status: string = '';

  constructor(
    private productoService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    //this.getProductos();
  }

  loadProductos(){
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }


  /*getProductos(): void {
    this.productoService.getProductos().subscribe(
      (response) => {
        this.productos = response;
        console.log(this.productos);
      },
      (error) => {
        this.status = 'error';
        console.error('Error al obtener productos', error);
      }
    );
  }*/

  
  editProducto(id: number){
    this.router.navigate(['/formulario-producto', id]);
  }

  deleteProducto(id: number){
    this.productoService.deleteProducto(id).subscribe(() => {
      this.loadProductos();
    });
  }


  /*deleteProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe(
      (response) => {
        this.getProductos(); // Volver a cargar los productos después de eliminar
      },
      (error) => {
        this.status = 'error';
        console.error('Error al eliminar producto', error);
      }
    );
  }*/
}