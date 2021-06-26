import { Injectable } from '@angular/core';
import { Highlighter } from './highlighter';
import { Options } from './options';

@Injectable({
  providedIn: 'root'
})
export class HighlighterService {

  constructor() { }

  createHighlighter(options?: Options) {
    return new Highlighter(options);
  }

  destroyHighlighter(h: Highlighter) {
    h.destroy();
  }
}
