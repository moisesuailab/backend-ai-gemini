import { join } from 'path';
import { Configuration } from 'puppeteer';

const puppeteerConfig: Configuration = {
  cacheDirectory: join(__dirname, 'build', '.cache', 'puppeteer'),
};

export default puppeteerConfig;