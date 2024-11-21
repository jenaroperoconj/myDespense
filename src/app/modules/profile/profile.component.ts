import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../common/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ProfileComponent implements OnInit {
  email: string | null = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Recupera el correo del usuario
    this.email = this.userService.getEmail();
  }
}