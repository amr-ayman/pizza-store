import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Lang} from '../../enums/user-language/language.enum';
import {AppConfig} from '../../../../assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLang: string;
  private renderer: Renderer2;
  private isArabic = new BehaviorSubject<boolean>(false);
  isArabic$ = this.isArabic.asObservable();

  constructor(private translate: TranslateService,
              private rendererFactory: RendererFactory2,
              private localStorage: LocalStorageService) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.init();
  }

  /* Initialize App Language */
  init(): void {
    const currentLang = this.localStorage.getLocal('userLang');
    if (!currentLang) {
      this.currentLang = AppConfig.lang;
      this.localStorage.setLocal('userLang', this.currentLang);
    } else {
      this.currentLang = this.localStorage.getLocal('userLang');
    }
    this.adjustApp();
  }

  /* Toggle App Language */
  changeLang(): void {
    this.currentLang = this.currentLang === Lang.Arabic ? Lang.English : Lang.Arabic;
    this.localStorage.setLocal('userLang', this.currentLang);
    this.adjustApp();
  }

  /* Handle Change App Language */
  adjustApp(): void {
    this.translate.use(this.currentLang);
    if (this.currentLang === Lang.Arabic) {
      this.renderer.addClass(document.body, 'rtl');
      this.isArabic.next(true);
    } else {
      this.renderer.removeClass(document.body, 'rtl');
      this.isArabic.next(false);
    }
  }
}
