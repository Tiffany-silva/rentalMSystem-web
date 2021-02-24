import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './helpers/auth.iterceptor';
import {AngularMaterialModule} from './angular-material.module';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {LayoutModule} from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminHomeComponent } from './adminComponents/admin-home/admin-home.component';
import { LesseeHomeComponent } from './lesseeComponents/lessee-home/lessee-home.component';
import { LessorHomeComponent } from './lessorComponents/lessor-home/lessor-home.component';
import { AddDialogComponent } from './dialogs/item/add-dialog/add-dialog.component';
import { EditDialogComponent } from './dialogs/item/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent} from './dialogs/item/delete-dialog/delete-dialog.component';
import { AddCategoryDialogComponent } from './dialogs/category/add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './dialogs/category/edit-category-dialog/edit-category-dialog.component';
import { DeleteCategoryDialogComponent } from './dialogs/category/delete-category-dialog/delete-category-dialog.component';
import { DeleteUserDialogComponent } from './dialogs/user/delete-user-dialog/delete-user-dialog.component';
import { AddUserDialogComponent } from './dialogs/user/add-user-dialog/add-user-dialog.component';
import { MyRentalsComponent } from './lesseeComponents/my-rentals/my-rentals.component';
import { UpdateStatusDialogComponent } from './dialogs/rental/update-status-dialog/update-status-dialog.component';
import { MyOrdersComponent } from './lessorComponents/my-orders/my-orders.component';
import { ItemDetailedComponent } from './lesseeComponents/item-detailed/item-detailed.component';
import { NavBarLesseeComponent } from './lesseeComponents/nav-bar-lessee/nav-bar-lessee.component';
import { NavBarLessorComponent } from './lessorComponents/nav-bar-lessor/nav-bar-lessor.component';
import { NavBarAdminComponent } from './adminComponents/nav-bar-admin/nav-bar-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminHomeComponent,
    LesseeHomeComponent,
    LessorHomeComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    DeleteCategoryDialogComponent,
    DeleteUserDialogComponent,
    AddUserDialogComponent,
    MyRentalsComponent,
    UpdateStatusDialogComponent,
    MyOrdersComponent,
    ItemDetailedComponent,
    NavBarLesseeComponent,
    NavBarLessorComponent,
    NavBarAdminComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    LayoutModule,
    FlexLayoutModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
