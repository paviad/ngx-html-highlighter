# NgxHtmlHighlighter

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Usage

* Install the library in your `package.json` for example using `npm i --save ngx-html-highlighter`.
* Add the `NgxHtmlHighlighterModule.forRoot()` to your module's imports section. The `forRoot` is necessary for the service to be available (see next item).
* Inject the `HighlighterService` in your module or component.
* Call `createHighlighter` with an optional options argument to create a highlighter object. The highlighter begins its work immediately.
* **Important:** When no longer needed call `destroy` on the highlighter object or alteratively pass the highlighter to the service's `destroyHighlighter` method.
