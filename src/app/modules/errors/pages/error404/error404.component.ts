import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pizza-store-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  errorNumber = 404;
  errorTitle = 'Page Not Found';
  errorMessage = 'The page that you are trying to access does not exist.';

  constructor() {
  }

  ngOnInit(): void {
  }
}
