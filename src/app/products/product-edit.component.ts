import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Product } from './product';
import { ProductService } from './product.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  pageTitle = 'Product Edit';
  errorMessage = '';
  productForm!: FormGroup;

  product!: Product;
  private sub!: Subscription;

  selectedImageFile: File | null = null;
  selectedCategoryName: string | null = null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private authService: AuthService,
              private http: HttpClient
              ) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.fetchCategories();

    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      releaseDate: [''],
      price: [''],
      imageFile: [],
      //imageUrl: [''],
      tags: this.fb.array([]),
      description: '',
      categoryId: [null]
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getProduct(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.productForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getProduct(id: number): void {
    console.log(id)
    this.productService.getProduct(id)
      .subscribe({
        next: (product: Product) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }

  displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;
    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }


    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      releaseDate: this.product.releaseDate,
      price: this.product.price,
      imageUrl: this.product.imageUrl,
      description: this.product.description,
        });

    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }


  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else if (this.product.id) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }
  
  onImageChange(event: any): void {
  const file = event.target.files[0];
  this.selectedImageFile = file;
  const imageControl = this.productForm.get('image');
  if (imageControl) {
    imageControl.patchValue(file);
  }
  }


  selectedCategoryId: number | null = null;
  categories: any[] = []; 


  fetchCategories(): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/category', { headers }).subscribe((data: any) => {
      this.categories = data;
    });
  }
  onCategoryChange(event: any): void {
    const selectedCategoryId = event.target.value;
    this.selectedCategoryName = this.categories.find(category => category.id === selectedCategoryId)?.name;
  }



  saveProduct(): void {
    console.log('Form Valid:', this.productForm.valid);
    console.log('Form Dirty:', this.productForm.dirty);
    if (this.productForm.valid && this.productForm.dirty) {
      const productData = { ...this.product, ...this.productForm.value };
      this.selectedCategoryId = productData.categoryId;
      this.selectedCategoryName = this.categories.find(category => category.id === this.selectedCategoryId)?.name;
      console.log('Selected Image File:', this.selectedImageFile);
      console.log('selected image name:', this.selectedImageFile?.name);
      const formData = new FormData();
      formData.append('productName', productData.productName);
      formData.append('productCode', productData.productCode);
      formData.append('starRating', productData.starRating.toString());
      formData.append('description', productData.description);
      formData.append('price', productData.price.toString());
      formData.append('releaseDate', productData.releaseDate);
      if (this.selectedCategoryName !== null) {
        formData.append('categoryName', this.selectedCategoryName);
      }      
      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile, this.selectedImageFile.name);
      }
  
      if (productData.id === 0) {
        this.productService.createProductWithImage(formData)
          .subscribe(
            (response) => {
              console.log('Create Product Response:', response);
              this.onSaveComplete();
            },
            (error) => {
              console.error('Error creating product:', error);
              this.errorMessage = 'Error creating product.';
            }
          );
      } else if (this.selectedImageFile) {
        // Update with image
        this.productService.updateProductWithImage(productData.id, formData)
          .subscribe(
            (response) => {
              console.log('Update Product with Image Response:', response);
              this.onSaveComplete();
            },
            (error) => {
              console.error('Error updating product with image:', error);
              this.errorMessage = 'Error updating product with image.';
            }
          );
      } else {
        // Update without image
        this.productService.updateProduct(productData)
          .subscribe(
            (response) => {
              console.log('Update Product Response:', response);
              this.onSaveComplete();
            },
            (error) => {
              console.error('Error updating product:', error);
              this.errorMessage = 'Error updating product.';
            }
          );
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  
  
  

  onSaveComplete(): void {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }





}
