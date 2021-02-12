import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'pizza-store-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  @Input() errorNumber;
  @Input() errorTitle;
  @Input() errorMessage;

  constructor(private location: Location, private router: Router) {
  }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['/store']);
  }

  goBack(): void {
    this.location.back();
  }

}
