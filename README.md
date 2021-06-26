# NgxHtmlHighlighter

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Usage

* Install the library in your `package.json` for example using `npm i --save ngx-html-highlighter`.
* Add the `NgxHtmlHighlighterModule.forRoot()` to your module's imports section. The `forRoot` is necessary for the service to be available (see next item).
* Inject the `HighlighterService` in your module or component.
* Call `createHighlighter` with an optional options argument to create a highlighter object. The highlighter begins its work immediately.
* **Important:** When no longer needed call `destroy` on the highlighter object or alteratively pass the highlighter to the service's `destroyHighlighter` method.

## Options

```typescript
export interface Options {
  tagAttribute: string;
  highlightClass: string;
}
```

* `tagAttribute` is the attribute name used to "tag" a node as having been inserted by the highlighter.
* `highlightClass` is the class added to the highlighted spans. You should add styles to this class in your global stylesheets (e.g. `src/app/styles.css` in a default angular app)
