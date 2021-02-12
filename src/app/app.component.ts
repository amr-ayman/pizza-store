import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from '../assets/config/config';
import {LocalStorageService} from './core/services/local-storage/local-storage.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly currentLang: string;

  constructor(private translateService: TranslateService,
              private localStorage: LocalStorageService,
              private router: Router) {
    this.currentLang = this.localStorage.getLocal('userLang') ? this.localStorage.getLocal('userLang') : AppConfig.lang;
    translateService.setDefaultLang(this.currentLang);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        if (['/error/403', '/error/404', '/error/500'].indexOf(this.router.url) === -1) {
          this.localStorage.setLocal('previousUrl', this.router.url);
        }
      }
    });
  }
}
