import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../../core/services/local-storage/local-storage.service';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslationService} from '../../../../core/services/translation/translation.service';
import {LoginService} from '../../services/login-service/login.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../../../core/services/user/user.service';
import {UserType} from '../../../../core/enums/user-type/user-type.enum';

@Component({
  selector: 'pizza-store-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessages = {
    username: {
      required: 'VALIDATION_MESSAGES.LOGIN.USERNAME_REQUIRED',
      maxlength: 'VALIDATION_MESSAGES.LOGIN.USERNAME_NOT_VALID',
    },
    password: {
      required: 'VALIDATION_MESSAGES.LOGIN.PASSWORD_REQUIRED',
      maxlength: 'VALIDATION_MESSAGES.LOGIN.PASSWORD_NOT_VALID',
    },
  };
  showPassword = false;
  showToggle = false;
  loggingInProgress = false;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslationService,
    private loginService: LoginService,
    private userService: UserService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.localStorage.removeAllLocals();
    this.initForm();
    this.loginForm.get('password').valueChanges.subscribe((value) => {
      this.showToggle = value;
    });
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl): AbstractControl | FormControl {
    return this.loginForm.get(formControl);
  }

  /* Log User In */
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.loggingInProgress = true;
    const body = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };
    this.loginService.login(body).subscribe((response: {data: { token: string, role: string }}) => {
      if (response) {
        this.loggingInProgress = false;
        this.handleResponse(response.data);
      }
    });
  }

  /* Handle Login And Response Token */
  handleResponse(response): void {
    const {token: userToken, role: userType} = response;
    this.localStorage.setLocal('userToken', userToken);
    this.userService.userDetails.next({userType, username: userType});
    this.handleNavigation(userType);
  }

  /* Handle Navigation After Login Based On User Type */
  handleNavigation(userType): void {
    this.translate.get(['TOASTER.LOGIN.VALID', 'TOASTER.SUCCESS']).subscribe((translateValue) => {
      this.toastr.success(translateValue['TOASTER.LOGIN.VALID'], translateValue['TOASTER.SUCCESS']);
    });
    switch (userType) {
      case UserType.Admin:
        this.router.navigate(['/admin']);
        break;
      case UserType.Customer:
        this.router.navigate(['/store']);
        break;
    }
  }

  changeLang(): void {
    this.translationService.changeLang();
  }

  /* On Forget Password */
  forgetPassword(): void {
    console.log('User Forget Password');
  }

  /* On Sign Up */
  signUp(): void {
    console.log('Create New User');
  }
}
