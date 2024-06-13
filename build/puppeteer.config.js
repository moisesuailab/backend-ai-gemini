"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const puppeteerConfig = {
    cacheDirectory: (0, path_1.join)(__dirname, 'build', '.cache', 'puppeteer'),
};
exports.default = puppeteerConfig;
