/*
 * grunt-fep-ejs
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {
  var chalk = require('chalk'),
    parseContent = function(content) {
      return content;
    };

  grunt.registerMultiTask('ejs', 'Compile ejs templates.', function() {

    var options = this.options({
      namespace: 'JST'
    });
    var data = options.data,
      n = 0;
    delete options.data;

    var processContent = options.content || parseContent;

    this.files.forEach(function(fileitem) {

      var templates = [];
      if (options.prefix) { templates.push(options.prefix); }

      if (fileitem.src.length < 1) {
        grunt.log.warn('File "' + chalk.red(fileitem.orig.src) + '" not found.');
        return false
      }

      fileitem.src.forEach(function(filepath) {

        var fileContent = processContent(grunt.file.read(filepath)),
          compiled,
          nsCompiled,
          tplName,
          compileFn;

        options.filename = filepath;

        try {

          var ejs = fileitem.orig.ejs = require('ejs');

          fileitem.orig.data = typeof data === 'function' ? data.call(fileitem.orig, fileitem.dest, fileitem.src, options) : data;

          compileFn = ejs.compile(fileContent, options);
          compiled = options.client ? compileFn : compileFn(fileitem.orig.data);
          tplName = path.basename(options.filename, path.extname(options.filename));
          nsCompiled = options.namespace + '["' + tplName + '"] = ' + compiled + ';\n';

        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('ejs failed to compile "' + filepath + '".');
          return false;
        }

        templates.push(options.namespace ? nsCompiled: compiled);
      });

      if (options.postfix) { templates.push(options.postfix); }

      if (templates.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        grunt.file.write(fileitem.dest, templates.join(''));
        n++;
        grunt.log.ok('File ' + chalk.cyan.bold(fileitem.dest) + ' created.');
      }

    });

    grunt.log.ok(n + ' ' + grunt.util.pluralize(this.files.length, 'file/files') + ' created.');

  });

};