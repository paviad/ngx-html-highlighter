import { ModuleWithProviders, NgModule } from '@angular/core';
import { HighlighterService } from './highlighter.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class NgxHtmlHighlighterModule {
  static forRoot(): ModuleWithProviders<NgxHtmlHighlighterModule> {
    const rc: ModuleWithProviders<NgxHtmlHighlighterModule> = {
      ngModule: NgxHtmlHighlighterModule,
      providers: [HighlighterService],
    }
    return rc;
  }
}
