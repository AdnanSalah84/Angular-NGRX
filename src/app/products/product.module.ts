import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './containers/product-shell/product-shell.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEffect } from './state/product.effects';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/product.reducer';
import { EffectsModule } from '@ngrx/effects';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    EffectsModule.forFeature([ProductEffect]),
    StoreModule.forFeature('products', reducer)
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
