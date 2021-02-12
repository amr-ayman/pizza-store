import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {InputTextComponent} from './components/form-inputs/input-text/input-text.component';
import {RtlDirective} from './directives/rtl/rtl.directive';
import {SecuredDirective} from './directives/secured/secured.directive';
import {PizzaListComponent} from './components/pizza-list/pizza-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {PizzaModalComponent} from './components/pizza-modal/pizza-modal.component';
import {InputNumberComponent} from './components/form-inputs/input-number/input-number.component';
import {InputFileComponent} from './components/form-inputs/input-file/input-file.component';

@NgModule({
  declarations: [
    RtlDirective,
    SecuredDirective,
    InputTextComponent,
    InputNumberComponent,
    InputFileComponent,
    PizzaListComponent,
    PizzaModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    TranslateModule,
    NgxDatatableModule
  ],
  exports: [
    RtlDirective,
    SecuredDirective,
    InputTextComponent,
    InputNumberComponent,
    InputFileComponent,
    PizzaListComponent,
    PizzaModalComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    NgxDatatableModule
  ]
})
export class SharedModule {
}
