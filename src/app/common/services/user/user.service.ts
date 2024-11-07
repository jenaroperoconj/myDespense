import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private email: string | null = null;

  setEmail(email: string | null) {
    this.email = email;
  }

  getEmail(): string | null {
    return this.email;
  }
}