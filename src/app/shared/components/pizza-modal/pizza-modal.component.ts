import {Component, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pizza-store-modal',
  templateUrl: './pizza-modal.component.html',
  styleUrls: ['./pizza-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PizzaModalComponent implements OnInit {

  dropDownData: {};
  title: string;
  template: any;
  buttons: any[];

  @Output() passEntry: EventEmitter<boolean> = new EventEmitter();

  constructor(public modal: NgbModal) {}

  ngOnInit() {
  }

  /* Return User Choice */
  confirm(value) {
    this.passEntry.emit(value);
    this.modal.dismissAll();
  }

}
