import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductsComponent } from './modules/products/products.component';
import { LoginComponent } from './modules/login/login.component';
import { ShareMyDespenseComponent } from './modules/share-my-despense/share-my-despense.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { ProductDetailComponent } from './modules/product-detail/product-detail.component';
import { RegisterComponent } from './modules/register/register.component';
import { WishlistComponent } from './modules/wishlist/wishlist.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ScanProductComponent } from './modules/scan-product/scan-product.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent},
  { path: 'share-my-despense', component: ShareMyDespenseComponent},
  { path: 'add-product', component: AddProductComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'wishlist', component: WishlistComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'scan-product', component: ScanProductComponent},
];

export const appRoutingProviders = [provideRouter(routes)];
