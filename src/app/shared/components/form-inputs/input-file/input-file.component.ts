import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TranslationService} from '../../../../core/services/translation/translation.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pizza-store-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true,
    },
  ],
})
export class InputFileComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() formControl: AbstractControl;
  @Input() acceptedFiles: string;
  @Input() acceptedSize: number;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() errorMessages: {};
  formControlName: string;
  langSubscription: Subscription;
  isArabic = false;
  value: string | boolean;
  onChange: (event) => void;
  onTouched: (event) => void;
  disabled: boolean;
  filesName: string;
  isUploading = false;

  constructor(private translationService: TranslationService) {
  }

  /* Subscribe To Language Change */
  ngOnInit(): void {
    this.formControlName = this.getFormControlName(this.formControl);
    this.langSubscription = this.translationService.isArabic$.subscribe(
      (value) => {
        this.isArabic = value;
      }
    );
  }

  /* Cancel Language Subscription */
  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }

  writeValue(value): void {
    this.filesName = '';
    if (value) {
      if (value[0].fileName) {
        if (!this.filesName) {
          this.filesName = value[0].fileName;
        }
        this.value = '';
      } else {
        this.filesName = '';
        this.value = value ? value : '';
      }
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getFormControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find((name) => c === formGroup[name]) || null;
  }

  /* On Upload File/Files */
  upload(event): void {
    this.filesName = '';
    const file = event.target.files[0];
    this.handleUploadedFile(file);
  }

  // Handle Uploaded File
  handleUploadedFile(file): void {
    if (file) {
      if (file.size > 1048576 * this.acceptedSize) {
        this.formControl.setErrors({invalidFile: true});
      } else {
        let fileType = '';
        let header = '';
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
          // @ts-ignore
          const arr = new Uint8Array(e.target.result).subarray(0, 4);
          arr.forEach((x, i) => {
            header += arr[i].toString(16);
          });
          switch (header) {
            case '89504e47':
              fileType = 'image/png';
              break;
            case 'ffd8ffe0':
            case 'ffd8ffe2':
            case 'ffd8ffe3':
            case 'ffd8ffe1':
            case 'ffd8ffe8':
              fileType = 'image/jpeg';
              break;
            case '25504446':
              fileType = 'application/pdf';
              break;
          }
          if (['image/png', 'image/jpeg', 'image/bmp', 'application/pdf'].indexOf(fileType) === -1) {
            this.formControl.setErrors({invalidFile: true});
          } else {
            const body = {
              base64: '',
              fileName: ''
            };
            this.filesName = file.name;
            fileReader.onloadend = () => {
              const fileData = fileReader.result as string;
              const final = fileData.concat(',fileName=', file.name);
              body.base64 = fileData;
              body.fileName = file.name;
              this.uploadSingleFile(body);
            };
            fileReader.readAsDataURL(file);
          }
        };
        fileReader.readAsArrayBuffer(file);
      }
    } else {
      this.onChange('');
    }
  }

  /* Upload Single File */
  uploadSingleFile(body): void {
    this.disabled = true;
    this.isUploading = true;
    this.onChange(body);
    setTimeout(() => {
      this.isUploading = false;
    }, 500);
  }

}
