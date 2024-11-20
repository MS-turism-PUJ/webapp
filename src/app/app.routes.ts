import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/log-in/log-in.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { RegisterComponent } from './pages/register/register.component';
import { InfoServiceComponent } from './pages/info-service/info-service.component';
import { NgModule } from '@angular/core';
import { ProviderScreenComponent } from './pages/provider-screen/provider-screen.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { Role } from './models/role';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'provider', component: ProviderScreenComponent, canActivate: [authGuard, roleGuard], data: { roles: [Role.PROVIDER] } },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard, roleGuard], data: { roles: [Role.CLIENT] } },
    { path: 'payment', component: PaymentComponent, canActivate: [authGuard, roleGuard], data: { roles: [Role.CLIENT] } },
    { path: 'info-service/:contentId', component: InfoServiceComponent, canActivate: [authGuard, roleGuard], data: { roles: [Role.CLIENT, Role.PROVIDER] } }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
