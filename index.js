/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const removeFile = require('broccoli-file-remover');
const replace = require('broccoli-replace');

module.exports = {
  name: 'canvas-5-polyfill',
  treeForAddon (tree) {
    const polyfillPath = path.dirname(require.resolve('canvas-5-polyfill/canvas.js'));
    let polyfillTree = this.treeGenerator(polyfillPath);
    polyfillTree = removeFile(polyfillTree, {
      files: ['karma.conf.js', 'canvasv5.js', 'svgpath.js'],
    });
    polyfillTree = removeFile(polyfillTree, {
      paths: ['test'],
    });

    polyfillTree = replace(polyfillTree, {
      files: [ 'canvas.js' ],
      patterns: [{
        match: /typeof Path2D/g,
        replacement: 'typeof window.Path2D'
      },
      {
        match: /typeof new Path2D/g,
        replacement: 'typeof typeof new window.Path2D'
      },
      {
        match: /parser = /g,
        replacement: 'const parser = '
      },
      {
        match: /original_fill = /g,
        replacement: 'const original_fill = '
      },
      {
        match: /original_stroke = /g,
        replacement: 'const original_stroke = '
      },
      {
        match: /original_clip = /g,
        replacement: 'const original_clip = '
      },
      {
        match: /original_is_point_in_path = /g,
        replacement: 'const original_is_point_in_path = '
      },
      {
        match: /original_is_point_in_stroke = /g,
        replacement: 'const original_is_point_in_stroke = '
      },
      {
        match: /Path2D =/g,
        replacement: 'window.Path2D ='
      }]
    });

    if (!tree) {
      return this._super.treeForAddon.call(this, polyfillTree)
    }

    const trees = mergeTrees([polyfillTree, tree], {
      overwrite: true
    })

    return this._super.treeForAddon.call(this, trees)
  }
}
