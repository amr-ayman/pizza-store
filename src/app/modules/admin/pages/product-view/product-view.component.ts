import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin-service/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TranslationService} from '../../../../core/services/translation/translation.service';
import {Product} from '../../../../shared/interfaces/product/product.interface';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {CustomValidators} from '../../../../shared/services/custom-validators/custom-validators.service';

@Component({
  selector: 'pizza-store-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy {

  viewMode = false;
  productId: string;
  languageSubscription: Subscription;
  isArabic = false;
  productForm: FormGroup;
  errorMessages = {
    nameEn: {
      required: 'VALIDATION_MESSAGES.PRODUCT.NAME_EN',
      notEnglish: 'VALIDATION_MESSAGES.PRODUCT.ENGLISH_ONLY'
    },
    nameAr: {
      required: 'VALIDATION_MESSAGES.PRODUCT.NAME_AR',
      notArabic: 'VALIDATION_MESSAGES.PRODUCT.ARABIC_ONLY'
    },
    descriptionEn: {
      required: 'VALIDATION_MESSAGES.PRODUCT.DESCRIPTION_EN',
      notEnglish: 'VALIDATION_MESSAGES.PRODUCT.ENGLISH_ONLY'
    },
    descriptionAr: {
      required: 'VALIDATION_MESSAGES.PRODUCT.DESCRIPTION_AR',
      notArabic: 'VALIDATION_MESSAGES.PRODUCT.ARABIC_ONLY'
    },
    code: {
      required: 'VALIDATION_MESSAGES.PRODUCT.CODE',
      min: 'VALIDATION_MESSAGES.PRODUCT.CODE_INVALID',
      max: 'VALIDATION_MESSAGES.PRODUCT.CODE_INVALID'
    },
    price: {
      required: 'VALIDATION_MESSAGES.PRODUCT.PRICE',
      min: 'VALIDATION_MESSAGES.PRODUCT.PRICE_INVALID',
      max: 'VALIDATION_MESSAGES.PRODUCT.PRICE_INVALID'
    },
    quantity: {
      required: 'VALIDATION_MESSAGES.PRODUCT.QUANTITY',
      min: 'VALIDATION_MESSAGES.PRODUCT.QUANTITY_INVALID',
      max: 'VALIDATION_MESSAGES.PRODUCT.QUANTITY_INVALID'
    },
    image: {
      required: 'VALIDATION_MESSAGES.PRODUCT.IMAGE'
    }
  };
  productDetails: Product;

  constructor(private activeRoute: ActivatedRoute,
              private translateService: TranslationService,
              private formBuilder: FormBuilder,
              private adminService: AdminService,
              private translate: TranslateService,
              private toastr: ToastrService,
              private router: Router) {
  }

  /* Subscribe To Language Change & Get Product Id In View Mode */
  ngOnInit(): void {
    if (this.activeRoute.snapshot.data.isEdit) {
      this.viewMode = true;
      this.productId = this.activeRoute.snapshot.paramMap.get('id');
    }
    this.languageSubscription = this.translateService.isArabic$.subscribe(value => {
      this.isArabic = value;
      if (this.viewMode) {
        this.getProductDetails();
      } else {
        this.initForm();
      }
    });
  }

  /* Cancel Language Subscription */
  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  /* Initialize Product Form */
  initForm(): void {
    this.productForm = this.formBuilder.group({
      nameEn: ['', [Validators.required, Validators.maxLength(30), CustomValidators.isEnglish]],
      nameAr: ['', [Validators.required, Validators.maxLength(30), CustomValidators.isArabic]],
      descriptionEn: ['', [Validators.required, Validators.maxLength(200), CustomValidators.isEnglish]],
      descriptionAr: ['', [Validators.required, Validators.maxLength(200), CustomValidators.isArabic]],
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      price: ['', [Validators.required, Validators.min(50), Validators.max(300)]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      image: ['', [Validators.required]]
    });
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl): AbstractControl | FormControl {
    return this.productForm.get(formControl);
  }

  /* Get Product Details */
  getProductDetails(): void {
    const productId = parseInt(this.productId, 10);
    this.adminService.getProduct(productId).subscribe(response => {
      this.productDetails = response;
    });
  }

  /* Create New Product */
  createNewProduct(): void {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const body = {
      nameEn: this.productForm.get('nameEn').value,
      nameAr: this.productForm.get('nameAr').value,
      descriptionEn: this.productForm.get('descriptionEn').value,
      descriptionAr: this.productForm.get('descriptionAr').value,
      code: this.productForm.get('code').value,
      price: this.productForm.get('price').value,
      quantity: this.productForm.get('quantity').value,
      image: this.productForm.get('image').value
    };
    console.log(body);
    this.translate.get(['TOASTER.ADMIN.ADD_SUCCESS', 'TOASTER.SUCCESS']).subscribe(translateValue => {
      this.toastr.success(translateValue['TOASTER.ADMIN.ADD_SUCCESS'], translateValue['TOASTER.SUCCESS']);
    });
    this.router.navigate(['/admin/products']);
  }

}
