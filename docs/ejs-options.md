# Options

## data
Type: `Object`

Sets the data passed to Jade during template compilation. Any data can be passed to the template (including grunt templates).

This value also might be a function taking source and destination path as arguments and returning a data object. Within the function, `this` is bound to the file configuration object.

```js
options: {
  data: function(dest, src) {
    return {
      from: src,
      to: dest
    };
  }
}
```

or you can have options from a required JSON file:

```js
options: {
  data: function(dest, src) {
    // Return an object of data to pass to templates
    return require('./locals.json');
  }
}
```

## compileDebug
Type: `Boolean`
Default: **true**

Add Jade debug instructions to generated JS templates.

## client
Type: `Boolean`
Default: **false**

Compile to JS template functions for client-side use rather than directly to HTML.


## namespace
Type: `String`, `Boolean`
Default: **JST**

The namespace in which the precompiled templates will be assigned. Use dot notation (*e.g.* `App.Templates`) for nested namespaces or `false` for no namespace wrapping.

## parseContent
Type: `Function`
Default: `function(content) { return content; };`

```js
options: {
  parseContent: function(content) {
    return content;
  }
}
```

This option accepts a function that lets you perform additional content processing.
