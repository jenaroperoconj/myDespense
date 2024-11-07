import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class WishlistComponent  implements OnInit {

  constructor(
    private location: Location,
  ) { 
    
  }

  ngOnInit() {}



  goBack(): void {
    this.location.back();
  }
}
