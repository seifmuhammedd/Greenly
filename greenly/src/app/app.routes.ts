import { Routes } from '@angular/router';
import { GuestComponent } from './core/layouts/guest/guest.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './core/layouts/user/user.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminComponent } from './core/layouts/admin/admin.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ShopComponent } from './components/shop/shop.component';
import { ServicesComponent } from './components/services/services.component';
import { BlogComponent } from './components/blog/blog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


export const routes: Routes = [
    {path: "", component: GuestComponent, children: [
        {path: "", redirectTo: "home", pathMatch: "full"},
        {path: "home", component: HomeComponent, title: "Home"},
        {path: "login", component: LoginComponent, title: "LogIn"},
        {path: "register", component: RegisterComponent, title: "Sign Up"},
        {path: "shop", component: ShopComponent, title: "Shop"},
        {path: "services", component: ServicesComponent, title: "Services"},
        {path: "blog", component: BlogComponent, title: "Blog"},
    ]},
    {path: "", component: UserComponent, children: [
        {path: "cart", component: CartComponent, title: "Cart"},
        {path: "favorites", component: FavoritesComponent, title: "Favorites"},
        {path: "user-profile", component: UserProfileComponent, title: "Profile"},
        {path: "payment", component: PaymentComponent, title: "Payment"},
    ]},
    {path: "admin", component: AdminComponent, children: [
        {path: "home", component: HomeAdminComponent, title: "Home"},
        {path: "produts", component: ManageProductsComponent, title: "Manage Products"},
        {path: "users", component: ManageUsersComponent, title: "Manage Users"},
    ]}
];
