import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../common/services/firestore/firestore.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];

  constructor(private firestoreService: FirestoreService,  private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.firestoreService.getDocs('productos').subscribe((data) => {
      this.productos = data;
    });
  }

  delProduct(product: any) {
    this.firestoreService.delDoc('productos', product.id).then(() => {
      console.log(`Producto ${product.nombre} eliminado`);
      this.loadProducts();
    }).catch((error) => {
      console.error('Error al eliminar producto:', error);
    });
  }

  delSelectedProducts() {
    const selecteds = this.productos.filter((p) => p.seleccionado);
    selecteds.forEach((producto) => {
      this.delProduct(producto);
    });
  }

  viewProductDetail(id: string) {
    this.router.navigate([`/product/${id}`]);
  }

  // Evita la propagación del clic hacia el elemento padre
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
