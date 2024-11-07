import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example-modal',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ModalsComponent {
  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss(); // Cierra el modal
  }
}



