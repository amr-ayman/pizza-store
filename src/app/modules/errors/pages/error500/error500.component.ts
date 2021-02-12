import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pizza-store-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.scss']
})
export class Error500Component implements OnInit {

  errorNumber = 500;
  errorTitle = 'Internal Server Error';
  errorMessage = 'Please try again in a few minutes.';

  constructor() {
  }

  ngOnInit(): void {
  }
}
