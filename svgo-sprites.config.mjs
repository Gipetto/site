// We want to keep SVGO from stripping "unused" defs
// so we need a separate config file to manage the 
// extra overrides
import config from "./svgo.config.mjs"

export default {
  ...config,
  plugins: [
    ...config.plugins.map((plugin) => {
      // I could look up the implication of having more than
      // one plugin config, or I can just add to the
      // previously defined default, so do the lazy thing...
      if (plugin.name === "preset-default") {
        plugin.params.overrides = {
          ...plugin.params.overrides,
          removeHiddenElems: false,
          cleanupIds: false
        }
      }
      return plugin
    })
  ],
};
