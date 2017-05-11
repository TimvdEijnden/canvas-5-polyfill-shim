/* eslint-env node */
module.exports = {
 afterInstall: function () {
    return this.addAddonToProject(
      { name: 'canvas-5-polyfill', target: '0.1.3' }
    )
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
};
