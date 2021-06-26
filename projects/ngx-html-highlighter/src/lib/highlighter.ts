import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Options } from './options';

interface Test {
  parentNode: HTMLElement;
  oldHTML: string;
  replace: boolean;
}

const defaultOptions: Options = {
  tagAttribute: 'data-highlighted',
  highlightClass: 'highlight'
};

export class Highlighter {
  private mutationObserver?: MutationObserver;
  private _highlightText = '';
  private options: Options = { ...defaultOptions };
  private highlightSubject = new BehaviorSubject<string>(this.highlightText);

  get tagAttribute() { return this.options.tagAttribute; }
  get highlightClass() { return this.options.highlightClass; }

  constructor(options?: Options) {
    if (options) {
      Object.assign(this.options, options);
    }
    this.highlight();
  }

  get highlightText() {
    return this._highlightText;
  }
  set highlightText(value) {
    this._highlightText = value;
    this.highlightSubject.next(value);
  }

  public destroy() {
    this.highlightText = '';
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
  }

  private notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  };

  private highlight() {
    const modifyingSubject = new Subject<MutationRecord[]>();
    const callback = (mutationRecords: MutationRecord[]) => {
      modifyingSubject.next(mutationRecords);
    };
    this.mutationObserver = new MutationObserver(callback);
    const s = combineLatest([modifyingSubject, this.highlightSubject.pipe(debounceTime(200))]);

    s.subscribe(([mutationRecords, h]) => {
      const r: Test[] = mutationRecords
        .map(record => this.processMutation(record, this.highlightText))
        .filter(this.notEmpty);
      this.mutationObserver!.disconnect();
      r.forEach(({ parentNode: existingNode, oldHTML: newHTML, replace: restore }) => {
        const oldHighlightNode = existingNode.previousSibling as HTMLElement;
        const savedDisplay = oldHighlightNode?.getAttribute(this.tagAttribute);
        const oldHighlightNodeExists = oldHighlightNode && savedDisplay;
        const p = (s: string | null) => s === 'not-specified' ? '' : s!;
        if (restore) {
          if (oldHighlightNodeExists) {
            console.log('removing old highlight node, and restoring original node');
            oldHighlightNode!.remove();
            existingNode.style.display = p(savedDisplay);
          } else {
            console.log('doing nothing');
          }
          return;
        }
        const highlightedNode = existingNode.cloneNode() as HTMLElement;
        highlightedNode.innerHTML = newHTML;
        let preserveDisplay = existingNode.style.display || 'not-specified';
        if (oldHighlightNodeExists) {
          preserveDisplay = savedDisplay!;
          console.log('removing old highlight node, and replacing with new highlight node');
          oldHighlightNode.remove();
        } else {
          console.log('inserting highlight node, and hiding original node');
        }
        highlightedNode.setAttribute(this.tagAttribute, preserveDisplay);
        highlightedNode.style.display = p(preserveDisplay);
        existingNode.parentNode!.insertBefore(highlightedNode, existingNode);
        existingNode.style.display = 'none';
      });
      this.mutationObserver!.observe(document, {
        characterData: true,
        subtree: true
      });
    });
    this.mutationObserver.observe(document, { characterData: true, subtree: true });
  }

  private processMutation(m: MutationRecord, h: string): Test | undefined {
    const escaped = h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const r = new RegExp(`(${escaped})+`, 'g');
    if (
      m.target.nodeType !== 3 ||
      !m.target.parentNode ||
      (m.target instanceof HTMLElement &&
        m.target.getAttribute(this.tagAttribute))
    ) {
      // If this is not a text node with a valid parent, skip it
      return;
    }
    const oldHTML = (m.target.parentNode as HTMLElement).innerHTML as string;
    const newHTML = !h ? oldHTML : oldHTML.replaceAll(
      r,
      `<span class="${this.highlightClass}">$&</span>`
    );
    return { parentNode: m.target.parentNode as HTMLElement, oldHTML: newHTML, replace: oldHTML === newHTML };
  }

}
