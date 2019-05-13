module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      configFile: "path/to/config.js",
    },
  },
  rules: {
    "no-console": ["error", { "allow": ["warn", "error"] }],
    semi: ["error", "always", { "omitLastInOneLineBlock": true }]
  }
};
