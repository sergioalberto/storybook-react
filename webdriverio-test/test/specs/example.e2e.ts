let assert = require('assert');

describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io');
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
        const title = await browser.getTitle();
        assert.equal(title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
    });
});
