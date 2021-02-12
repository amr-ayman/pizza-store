import {Component, Input, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'pizza-store-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PizzaListComponent implements OnInit {

  @Input() listType;
  @Input() rows;
  @Input() columns;
  @Input() smallColumns;
  @Output() itemAction = new EventEmitter();
  currentRow: any = {};
  prefix = 'ADMIN.LIST.';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  /* Get Row Id */
  rowDetails(event) {
    this.currentRow = event.row;
    if (event.type === 'click') {
      event.cellElement.blur();
    }
  }

  /* Handle User Action */
  doAction(action: string) {
    switch (action) {
      case 'view': {
        this.router.navigate([`admin/products/${this.currentRow.id}`]);
        break;
      }
      case 'delete': {
        setTimeout(() => {
          this.itemAction.emit(this.currentRow.id);
        }, 10);
        break;
      }
    }
  }
}
