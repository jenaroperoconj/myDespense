import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../../common/services/firestore/firestore.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule],
})
export class AddProductComponent {
  productForm: FormGroup;
  minDate: string;
  
  constructor(private fb: FormBuilder, private firestore: FirestoreService, private router: Router, private location: Location) {
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

  agregarProducto() {
    if (this.productForm.valid) {
      this.firestore.addDoc('productos', this.productForm.value)
        .then(() => {
          console.log('Producto agregado con éxito');
          this.productForm.reset({ cantidad: 1 });
        })
        .catch((error) => {
          console.error('Error al agregar producto:', error);
        });
    } else {
      console.error('Formulario no válido');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
