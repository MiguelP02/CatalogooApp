import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: false,
  
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  public status: string = '';
  public isEditMode: boolean = false;
  public producto: Producto;

  constructor(
    private productoService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.producto = new Producto(0, '', '', 0, 0);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProducto(id);
    }
  }

  // Cargar producto en modo edición
  loadProducto(id: string): void {
    this.productoService.getProducto(Number(id)).subscribe((producto) => {
      this.producto = producto;
    });
  }

  saveProducto(): void {
    if (this.isEditMode){
      this.productoService.updateProducto(this.producto.id, this.producto).subscribe(() => {
        this.status = 'success';
        setTimeout(() => {
          this.router.navigate(['/lista-productos']);
        }, 2000); 
      },
      (error) => {
        this.status = 'error';
        console.error('Error al actualizar el producto', error);
      }
      );
    }else {
      this.productoService.createProducto(this.producto).subscribe(
        () => {
          this.status = 'success';
          setTimeout(() => {
            this.router.navigate(['/lista-productos']);
          }, 2000); 
        },
        (error) => {
          this.status = 'error';
          console.error('Error al crear el producto', error);
        }
      );
    }
  }
}
