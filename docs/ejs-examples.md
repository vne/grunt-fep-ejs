# Usage Examples

```js
ejs: {
  compile: {
    files: {
      'tmp/function.html': ['test/function.ejs'],
      'tmp/list.html': ['test/list.ejs']
    },
    options: {
      open : "<%",
      close: "%>",
      data: {
        test: true,
        year: '<%= grunt.template.today("yyyy") %>',
        names : ["Tobi","Loki","Sean","bei"],
        users : [{ name: 'Tobi', age: 2, species: 'ferret' },{ name: 'Loki', age: 2, species: 'ferret' },{ name: 'Jane', age: 6, species: 'ferret' }],
        navs : [{ name: 'index', href: 'index.html'},{ name: 'demo', href: 'demo.html'},{ name: 'about', href: 'about.html'},{ name: 'download', href: 'download.html'}]
      }
    }
  }
}
```

```js
compile2: {
  files: [{
    expand: true,
    cwd: 'test/',
    src: [ '**/*','!in/**'],
    dest: 'tmp',
    ext: '.html'
  }],
  options: {
    data: {
      test: true,
      year: '<%= grunt.template.today("yyyy") %>',
      names : ["Tobi","Loki","Sean","bei"],
      users : [{ name: 'Tobi', age: 2, species: 'ferret' },{ name: 'Loki', age: 2, species: 'ferret' },{ name: 'Jane', age: 6, species: 'ferret' }],
      navs : [{ name: 'index', href: 'index.html'},{ name: 'demo', href: 'demo.html'},{ name: 'about', href: 'about.html'},{ name: 'download', href: 'download.html'}]
    }
  }
}
```
