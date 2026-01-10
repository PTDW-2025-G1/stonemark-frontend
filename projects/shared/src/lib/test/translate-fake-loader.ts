import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export class TranslateFakeLoader implements TranslateLoader {
  getTranslation(_lang: string): Observable<any> {
    return of({});
  }
}
