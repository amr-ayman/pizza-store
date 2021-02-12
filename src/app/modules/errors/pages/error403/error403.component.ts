import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pizza-store-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss']
})
export class Error403Component implements OnInit {

  errorNumber = 403;
  errorTitle = 'Access Denied';
  errorMessage = 'You don’t have access to this page.';

  constructor() {
  }

  ngOnInit(): void {
  }
}
