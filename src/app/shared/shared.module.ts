import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPasswordComponent } from './components/show-password/show-password.component';
import { ShrinkNavDirective } from './directives/shrink-nav.directive';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShowPasswordComponent, ShrinkNavDirective, BlogListComponent],
  imports: [CommonModule, RouterModule],
  exports: [ShowPasswordComponent, ShrinkNavDirective, BlogListComponent],
})
export class SharedModule {}
