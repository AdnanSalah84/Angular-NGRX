import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];
  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  //sub: Subscription;
  componentActive = true;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    // TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    // this.store.pipe(select(fromProduct.getProducts),
    // takeWhile(() => this.componentActive))
    //   .subscribe((products:Product[]) => this.products = products);

    // TODO: Unsubscribe
    // this.store.pipe(select('products')).subscribe(
    //   products => this.displayCode = products.showProductCode
    // );

    // TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    )
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    /*this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });*/
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    //this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    //this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
