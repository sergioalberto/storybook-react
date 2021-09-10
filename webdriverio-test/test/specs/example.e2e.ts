let assert = require('assert');
const AxeBuilder = require('@axe-core/webdriverio').default;
import { assertAccessible } from '@sa11y/wdio';
const { evaluate } = require('aatt');

describe('accessibility testing to WebdriverIO', () => {

    it('test with @axe-core/webdriverio', async () => {

        await browser.url('https://webdriver.io');
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
        const title = await browser.getTitle();
        assert.equal(title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');

        // Source: https://www.npmjs.com/package/@axe-core/webdriverio
        // Example: https://github.com/dequelabs/axe-core-npm/blob/develop/packages/webdriverio/src/test.ts
        const axe = new AxeBuilder({ client: browser }).withTags(['wcag2a', 'wcag2aa']).disableRules('color-contrast');
        const results = await axe.analyze();

        // assert there are no violations
        // console.log(results, 'values')
        console.log(results.violations, 'vol')
        console.log(results.violations.length, 'len')
        assert.equal(results.violations.length, 0, 'Expected no a11y violations');
    });

    it('test with @sa11y/wdio', async () => {
        await browser.url('https://webdriver.io');
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
        const title = await browser.getTitle();
        assert.equal(title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');

        // Source: https://www.npmjs.com/package/@sa11y/wdio
        // Exception list is a map of rule to corresponding css targets that needs to be filtered from a11y results
        const exceptions = {
            'link-name': ['.frameworkLogos_lURf[href$="reactjs\\.org\\/"]'],
        };
        const rules: any = { runOnly: { type: 'tag', values: ['wcag2a'] }};
        // Check accessibility of a particular element and filtering out results from given exception list
        await assertAccessible({ scope: browser.$('.main-wrapper'), exceptionList: exceptions, rules: rules });
    });

    it('test with aatt', async () => {
        await browser.url('https://webdriver.io');

        const currentHTML = await $('body').getHTML();

        // Source: https://github.com/paypal/AATT
        const results: any = await new Promise(resolve => {
            evaluate({
                source: currentHTML,
                output: "json",
                engine: "axe",
                level: "WCAG2A"
            }).then((result: string) => {
                console.log('Results: ', JSON.parse(result));
                resolve(JSON.parse(result));
            });
        });
        assert.equal(results.filter((result: any) => result.impact == 'serious').length, 0, 'Expected no serious violations');
    });
});
