import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TranslationService} from '../../../../core/services/translation/translation.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pizza-store-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})
export class InputNumberComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() formControl: AbstractControl;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() min: number;
  @Input() max: number;
  @Input() errorMessages: {};
  formControlName: string;
  langSubscription: Subscription;
  isArabic = false;
  value: number | string;
  onChange: (event) => void;
  onTouched: (event) => void;
  disabled: boolean;

  constructor(private translationService: TranslationService) {
  }

  ngOnInit(): void {
    this.formControlName = this.getFormControlName(this.formControl);
    this.langSubscription = this.translationService.isArabic$.subscribe(value => {
      this.isArabic = value;
    });
  }

  /* Cancel Language Subscription */
  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }

  writeValue(value): void {
    this.value = value ? value : '';
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
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

  /* Handle Select Number & Prevent Typing Characters */
  setSelectedNumber(selectedNumber): void {
    document.querySelector('.inputNumber').addEventListener('keypress', (evt) => {
      // @ts-ignore
      if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
      }
    });
    if (selectedNumber) {
      this.onChange(parseInt(selectedNumber, 10));
    } else {
      this.onChange('');
    }
  }

}
