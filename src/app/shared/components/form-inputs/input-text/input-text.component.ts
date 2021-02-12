import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'pizza-store-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {

  @Input() formControl: AbstractControl;
  @Input() label: string;
  @Input() type: string;
  @Input() placeholder = '';
  @Input() errorMessages: {};
  @Input() fieldIcon = '';
  showPassword = false;
  formControlName: string;
  value: string | boolean;
  onChange: (event) => void;
  onTouched: (event) => void;
  disabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.formControlName = this.getFormControlName(this.formControl);
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

  /* Do FieldInterface Action */
  fieldAction(): void {
    if (this.formControlName === 'password') {
      this.showPassword = !this.showPassword;
      this.type = this.showPassword ? 'text' : 'password';
    }
  }

}
