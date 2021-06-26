import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxHtmlHighlighterModule } from 'projects/ngx-html-highlighter/src/public-api';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxHtmlHighlighterModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HelloComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
