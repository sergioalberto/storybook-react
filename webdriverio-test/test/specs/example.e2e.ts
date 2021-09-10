let assert = require('assert');
const AxeBuilder = require('@axe-core/webdriverio').default;

describe('my awesome website', () => {

    it('should do some assertions', async () => {

        await browser.url('https://webdriver.io');
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
        const title = await browser.getTitle();
        assert.equal(title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');

        // Source: https://www.npmjs.com/package/@axe-core/webdriverio
        const axe = new AxeBuilder({ client: browser }).withTags(['wcag2a', 'wcag2aa']);
        const results = await axe.analyze();

        // assert there are no violations
        // console.log(results, 'values')
        console.log(results.violations, 'vol')
        console.log(results.violations.length, 'len')
        assert.equal(results.violations.length, 0, 'Expected no a11y violations');
    });
});
