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
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuard } from './core/guards/auth-gard.guard';
import { adminGuard } from './core/guards/admin-guard.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ManageLicencesComponent } from './components/manage-licences/manage-licences.component';
import { ManageLoansComponent } from './components/manage-loans/manage-loans.component';
import { EditSpecificProductComponent } from './components/edit-specific-product/edit-specific-product.component';
import { ManageSpecificLicenceComponent } from './components/manage-specific-licence/manage-specific-licence.component';


export const routes: Routes = [
    {path: "", component: AppComponent, title: "App", children: [
        {path: "", redirectTo: "app", pathMatch: "full"},
        {path: "app", component: LayoutAppComponent, children: [
            {path: "", redirectTo: "system", pathMatch: "full"},
            {path: "system", component: GuestComponent, children: [
                {path: "", redirectTo: "home", pathMatch: "full"},
                {path: "home", component: HomeComponent, title: "Home"},
                {path: "login", component: LoginComponent, title: "LogIn"},
                {path: "register", component: RegisterComponent, title: "Sign Up"},
                {path: "confirm-email", component: ConfirmEmailComponent, title: "Confirm Email"},
                {path: "forgot-password", component: ForgotPasswordComponent, title: "Password Recovery"},
                {path: "confirm-code", component: ConfirmOtpComponent, title: "Password Recovery"},
                {path: "reset-password", component: ResetPasswordComponent, title: "Password Recovery"},
                {path: "shop", component: ShopComponent, title: "Shop"},
                {path: "cart", component: CartComponent, title: "Cart"},
                {path: "favorites", component: FavoritesComponent, title: "Favorites"},
                {path: "product-details/:p_ID", component: ProductDetailsComponent, title: "Product Details"},
                {path: "services", component: ServicesComponent, title: "Services"},
                {path: "blog", component: BlogComponent, title: "Blog"},
                {path: "loan", component: LoanComponent, title: "Loan Application"},
                {path: "apiary-licence", component: ApiaryLicenceComponent, title: "Apiary Licence Application"},
            ]},
            {path: "user", component: UserComponent, children: [
                {path: "user-profile", component: UserProfileComponent, title: "Profile"},
                {path: "payment", component: PaymentComponent, title: "Payment"},
            ], canActivate : [authGuard]},
        ]},
        {path: "admin", component: AdminComponent, children: [
            {path: "home", component: HomeAdminComponent, title: "Home"},
            {path: "add-product", component: AddProductComponent, title: "Add Product"},
            {path: "edit-product", component: EditProductComponent, title: "Edit Product"},
            {path: "edit-specific-product/:p_ID", component: EditSpecificProductComponent, title: "Edit Product"},
            {path: "manage-specific-licence/:p_ID", component: ManageSpecificLicenceComponent, title: "Manage Licence"},
            {path: "manage-licences", component: ManageLicencesComponent, title: "Manage Apiary"},
            {path: "manage-loans", component: ManageLoansComponent, title: "Manage Loans"},
            {path: "users", component: ManageUsersComponent, title: "Manage Users"},
        ], canActivate : [adminGuard]},
        {path: "**", component: NotFoundComponent, title: "Not Found"},
    ]},
    
];
