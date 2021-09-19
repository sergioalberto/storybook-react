let assert = require('assert');
import { source } from 'axe-core';

// Advoid type checking for axe
declare const axe: any;

describe('accessibility testing to axe-core', () => {

    it('test primary button', async () => {
        await browser.url('http://localhost:6006/iframe.html?id=example-button--primary&viewMode=story');

        await browser.execute(source);

        // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md
        const options = {
            runOnly: {
                type: 'tag', values: ['wcag2a', 'wcag2aa']
            },
            rules: {
                'color-contrast': { enabled: false },
            }
        };
        // run inside browser and get results
        // @ts-ignore
        const results: any = await browser.executeAsync((options, done) => {
            axe.run(document, options, function(err: any, results: any) {
                if (err) throw err;
                done(results);
            });
        }, options);

        console.log(results.violations);
        assert.equal(results.violations.length, 0, `${await browser.getUrl()} doesn't pass Accessibility test`);
    });

    it('test inbox screen', async () => {
        await browser.url('http://localhost:6006/iframe.html?id=inboxscreen--default&viewMode=story');

        await browser.execute(source);

        // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md
        const options = {
            runOnly: {
                type: 'tag', values: ['wcag2a', 'wcag2aa']
            }
        };
        // run inside browser and get results
        // @ts-ignore
        const results: any = await browser.executeAsync((options, done) => {
            axe.run( {
                include: [['.lists-show .list-items']]
            }, options, function(err: any, results: any) {
                if (err) throw err;
                done(results);
            });
        }, options);

        console.log(JSON.stringify(results.violations));
        assert.equal(results.violations.length, 0, `${await browser.getUrl()} doesn't pass Accessibility test`);
    });
});
