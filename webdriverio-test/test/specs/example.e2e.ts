let assert = require('assert');
const AxeBuilder = require('@axe-core/webdriverio').default;
import { assertAccessible } from '@sa11y/wdio';

describe('my awesome website', () => {

    it('should do some assertions', async () => {

        await browser.url('https://webdriver.io');
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
        const title = await browser.getTitle();
        assert.equal(title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');

        // Source: https://www.npmjs.com/package/@axe-core/webdriverio
        // Example: https://github.com/dequelabs/axe-core-npm/blob/develop/packages/webdriverio/src/test.ts
        const axe = new AxeBuilder({ client: browser }).withTags(['wcag2a', 'wcag2aa']);
        const results = await axe.analyze();

        // assert there are no violations
        // console.log(results, 'values')
        console.log(results.violations, 'vol')
        console.log(results.violations.length, 'len')
        assert.equal(results.violations.length, 0, 'Expected no a11y violations');

        // Source: https://www.npmjs.com/package/@sa11y/wdio
        // Exception list is a map of rule to corresponding css targets that needs to be filtered from a11y results
        const exceptions = {
            'color-contrast': ['.button.button--outline[href$="gettingstarted"]'],
        };
        // Check accessibility of a particular element and filtering out results from given exception list
        await assertAccessible({ scope: browser.$('.main-wrapper'), exceptionList: exceptions });
    });
});
