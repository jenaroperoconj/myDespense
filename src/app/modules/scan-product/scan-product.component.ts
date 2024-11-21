import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scan-product',
  templateUrl: './scan-product.component.html',
  styleUrls: ['./scan-product.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ScanProductComponent  implements OnInit {

  constructor(
    private router: Router
  ) { 
    
  }

  ngOnInit() {}

  async navigateTo(route: string) {
    await this.router.navigateByUrl(route); 
}

}
