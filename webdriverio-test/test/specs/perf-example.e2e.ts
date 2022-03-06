let assert = require('assert');
const lighthouse = require('lighthouse');
const fs = require('fs');

describe('performance testing with devtools', async () => {

    before(async () => {
        // @ts-ignore
        await browser.enablePerformanceAudits();
    });

    after(async () => {
        // @ts-ignore
        await browser.disablePerformanceAudits();
    });

    // Source: https://webdriver.io/docs/devtools-service
    it('test json.org perf', async () => {
        await browser.url('http://json.org');

        // @ts-ignore
        console.log(await browser.getMetrics());

        // @ts-ignore
        let score = await browser.getPerformanceScore(); // get Lighthouse Performance score
        assert.ok(score >= .8, `The current perf score is ${score}`); // Lighthouse Performance score is at 99% or higher

        // @ts-ignore
        let metrics = await browser.getMetrics();
        assert.ok(metrics.speedIndex < 5000, `The current speed is ${metrics.speedIndex}`); // check that speedIndex is below 1.5ms

        await $('[align="center"] a[href="http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf"]').click();

        // @ts-ignore
        metrics = await browser.getMetrics();
        assert.ok(metrics.speedIndex < 5000, `The current speed is ${metrics.speedIndex}`);

        // @ts-ignore
        score = await browser.getPerformanceScore();
        assert.ok(score >= .8, `The current perf score is ${score}`);
    });

    it('test perf with lighthouse.js', async () => {
        // @ts-ignore
        const port = browser.capabilities["goog:chromeOptions"].debuggerAddress.split(":")[1];
        // Examples: https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md
        //           Audits: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/default-config.js#L184
        const options = {
            logLevel: 'info',
            output: 'html',
            onlyCategories: ['accessibility'],
            port: port
        };
        const runnerResult = await lighthouse('http://localhost:6006/iframe.html?id=inboxscreen--default&viewMode=story', options);

        console.log('Report is done for', runnerResult.lhr.finalUrl);
        console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

        // `.report` is the HTML report as a string
        const reportHtml = runnerResult.report;
        fs.writeFileSync('perf-report.html', reportHtml);
    });
});
