import { Component, OnDestroy, OnInit } from '@angular/core';
import { Highlighter, HighlighterService } from 'projects/ngx-html-highlighter/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _highlightText = '';

  name = 'test';
  private hl: Highlighter;

  get highlightText() {
    return this._highlightText;
  }
  set highlightText(value) {
    this._highlightText = value;
    this.hl.highlightText = value;
  }

  constructor(svc: HighlighterService) {
    this.hl = svc.createHighlighter();
  }

  ngOnInit(): void {
    this.randomizeText();
    this.hl.highlightText = this.highlightText;
  }

  ngOnDestroy(): void {
    this.hl.destroy();
  }

  makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKL';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  randomizeText() {
    this.name = this.makeid(1000);

    console.log('rand', this.name);
  }
}
