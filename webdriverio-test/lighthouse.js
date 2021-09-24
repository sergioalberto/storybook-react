const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const request = require('request');
const util = require('util');

const URL = 'https://www.chromestatus.com/features';

// Source: https://github.com/GoogleChrome/lighthouse/blob/master/docs/puppeteer.md
(async () => {
  const chrome = await chromeLauncher.launch();
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port, disableStorageReset: true};
  console.log('Port: ', chrome.port);

  // Connect to it using puppeteer.connect()
  const resp = await util.promisify(request)(`http://localhost:${options.port}/json/version`);
  const {webSocketDebuggerUrl} = JSON.parse(resp.body);
  const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});

  const page = await browser.newPage();
  await page.goto(URL);

  const searchInput = await page.$('input[type="search"]');
  await searchInput.type('test');

  // Run Lighthouse
  const runnerResult = await lighthouse(URL, options, null);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lhreport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  console.log(`Lighthouse scores: ${Object.values(runnerResult.lhr.categories).map(c => c.score).join(', ')}`);

  await browser.disconnect();
  await chrome.kill();
})();
