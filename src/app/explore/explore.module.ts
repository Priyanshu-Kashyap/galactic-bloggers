import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { BlogComponent } from './blog/blog.component';
import { ExploreComponent } from './explore.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ExploreComponent, BlogComponent],
  imports: [CommonModule, ExploreRoutingModule, SharedModule],
})
export class ExploreModule {}
