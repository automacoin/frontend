const fs = require("fs");
const path = require("path");

const manifestPath = path.resolve(__dirname, "dist", "manifest.json");
const manifest = {
  "main.css": "/assets/css/styles.css",
  "main.js": "assets/js/bundle.js",
  "assets/favicon.png": "assets/favicon.png",
  "assets/images/bg-image.jpg": "assets/images/bg-image.jpg"
} || JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

module.exports = function (eleventyConfig) {

  eleventyConfig.addLayoutAlias("base", "base.njk");

  eleventyConfig.addShortcode("bundledCss", function () {
    return manifest["main.css"]
      ? `<link href="${manifest["main.css"]}" rel="stylesheet" />`
      : "";
  });

  eleventyConfig.addShortcode("bundledJs", function () {
    return manifest["main.js"]
      ? `<script src="${manifest["main.js"]}"></script>`
      : "";
  });

  eleventyConfig.addShortcode("bundledIco", function () {
    return manifest["main.js"]
      ? `<link rel="icon" href="${manifest["assets/favicon.png"]}" type="image/png" />`
      : "";
  });

  eleventyConfig.setBrowserSyncConfig({ files: ["src/includes/*.njk"] });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
  };
};