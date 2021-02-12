import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PizzaModalComponent} from '../../components/pizza-modal/pizza-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  btnId = new Subject<number>();

  constructor(private modal: NgbModal) {}

  showTemplate(templateName, modalTitle, modalSize, buttons?, dropDownData?: {}) {
    const modalRef = this.modal.open(PizzaModalComponent, {
      size: modalSize,
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.title = modalTitle;
    modalRef.componentInstance.template = templateName;
    modalRef.componentInstance.buttons = buttons;
    modalRef.componentInstance.dropDownData = dropDownData;

    modalRef.componentInstance.passEntry.subscribe((value) => {
      this.btnId.next(value);
    });
  }

  /* Close Opened Modal */
  dismissModal() {
    this.modal.dismissAll();
  }
}
