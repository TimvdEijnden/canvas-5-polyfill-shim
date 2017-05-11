/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

module.exports = {
  name: 'canvas-5-polyfill',
  treeForAddon (tree) {
    const polyfillPath = path.dirname(require.resolve('canvas-5-polyfill/canvas.js'))
    let polyfillTree = this.treeGenerator(polyfillPath)

    if (!tree) {
      return this._super.treeForAddon.call(this, polyfillTree)
    }

    const trees = mergeTrees([polyfillTree, tree], {
      overwrite: true
    })

    return this._super.treeForAddon.call(this, trees)
  }
}
