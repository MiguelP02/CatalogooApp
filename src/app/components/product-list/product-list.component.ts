import { Component, OnInit } from '@angular/core';
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

  constructor(private productoService: ProductService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
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
  }

  deleteProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe(
      (response) => {
        this.getProductos(); // Volver a cargar los productos después de eliminar
      },
      (error) => {
        this.status = 'error';
        console.error('Error al eliminar producto', error);
      }
    );
  }
}