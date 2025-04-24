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
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoanComponent } from './components/loan/loan.component';
import { ApiaryLicenceComponent } from './components/apiary-licence/apiary-licence.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { LayoutAppComponent } from './core/layouts/layout-app/layout-app.component';


export const routes: Routes = [
    {path: "", component: AppComponent, title: "App", children: [
        {path: "", redirectTo: "app", pathMatch: "full"},
        {path: "app", component: LayoutAppComponent, children: [
            {path: "", redirectTo: "guest", pathMatch: "full"},
            {path: "guest", component: GuestComponent, children: [
                {path: "", redirectTo: "home", pathMatch: "full"},
                {path: "home", component: HomeComponent, title: "Home"},
                {path: "login", component: LoginComponent, title: "LogIn"},
                {path: "register", component: RegisterComponent, title: "Sign Up"},
                {path: "shop", component: ShopComponent, title: "Shop"},
                {path: "product-details", component: ProductDetailsComponent, title: "Product Details"},
                {path: "services", component: ServicesComponent, title: "Services"},
                {path: "blog", component: BlogComponent, title: "Blog"},
                {path: "loan", component: LoanComponent, title: "Loan Application"},
                {path: "apiary-licence", component: ApiaryLicenceComponent, title: "Apiary Licence Application"},
            ]},
            {path: "user", component: UserComponent, children: [
                {path: "cart", component: CartComponent, title: "Cart"},
                {path: "favorites", component: FavoritesComponent, title: "Favorites"},
                {path: "user-profile", component: UserProfileComponent, title: "Profile"},
                {path: "payment", component: PaymentComponent, title: "Payment"},
            ]},
        ]},
        {path: "admin", component: AdminComponent, children: [
            {path: "home", component: HomeAdminComponent, title: "Home"},
            {path: "produts", component: ManageProductsComponent, title: "Manage Products"},
            {path: "users", component: ManageUsersComponent, title: "Manage Users"},
        ]},
        {path: "**", component: NotFoundComponent, title: "Not Found"},
    ]},
    
];
