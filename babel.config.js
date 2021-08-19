module.exports = function (api) {
    api.cache(true);
  
    const presets = [
        ["@babel/preset-env"],
        ["@babel/preset-react"]
      ];

    const plugins = [ 
      ["@babel/plugin-syntax-jsx"],
      ["@babel/transform-runtime", {
          "regenerator": true
        }]
     ];
  
    return {
      presets,
      plugins
    };
  }