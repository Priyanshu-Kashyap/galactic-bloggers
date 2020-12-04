import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'signup', component: SignUpComponent },
      { path: 'login', component: LoginComponent },
      { path: 'write', component: WriteBlogComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
