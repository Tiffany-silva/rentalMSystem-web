import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AdminHomeComponent} from './adminComponents/admin-home/admin-home.component';
import {LesseeHomeComponent} from './lesseeComponents/lessee-home/lessee-home.component';
import {LessorHomeComponent} from './lessorComponents/lessor-home/lessor-home.component';
import {MyRentalsComponent} from './lesseeComponents/my-rentals/my-rentals.component';
import {MyOrdersComponent} from './lessorComponents/my-orders/my-orders.component';
import {ItemDetailedComponent} from './lesseeComponents/item-detailed/item-detailed.component';
import {AuthGaurdService} from './services/auth-gaurd.service';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [ {
  path: '',
  component: LesseeHomeComponent,
},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  }, {
    path: 'admin-home',
    component: AdminHomeComponent,  canActivate: [AuthGaurdService],
    data: {
      role: 'ROLE_ADMIN'
    }
  }, {
    path: 'home',
    component: LesseeHomeComponent,
  }, {
    path: 'lessor-home',
    component: LessorHomeComponent, canActivate: [AuthGaurdService],
    data: {
      role: 'ROLE_LESSOR'
    }
  },
  {
    path: 'lessee-rentals',
    component: MyRentalsComponent, canActivate: [AuthGaurdService],
    data: {
      role: 'ROLE_LESSEE'
    }
  },
  {
    path: 'lessor-orders',
    component: MyOrdersComponent, canActivate: [AuthGaurdService],
    data: {
      role: 'ROLE_LESSOR'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [AuthGaurdService]
  },
  {
    path: 'item-detail/:id',
    component: ItemDetailedComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
