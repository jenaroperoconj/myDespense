import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../common/services/firestore/firestore.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  productForm: FormGroup;
  mostrarCalendario = false;
  minDate: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService,
    private fb: FormBuilder,
    private location: Location,
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: [''],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      fechaVencimiento: ['', Validators.required],
      categoria: [''],
      sku: [''],
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.cargarProducto(this.productId);
    }
  }

  cargarProducto(id: string) {
    this.firestoreService.getDoc('productos', id).subscribe((producto) => {
      this.productForm.patchValue(producto);
    });
  }

  guardarCambios() {
    if (this.productForm.valid && this.productId) {
      this.firestoreService.updateDoc('productos', this.productId, this.productForm.value).then(() => {
        console.log('Producto actualizado');
        this.router.navigate(['/products']);
      });
    }
  }

  eliminarProducto() {
    if (this.productId) {
      this.firestoreService.delDoc('productos', this.productId).then(() => {
        console.log('Producto eliminado');
        this.router.navigate(['/products']);
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
