import debug from 'debug';

import makeAreaScreenshot from './makeAreaScreenshot';
import beforeScreenshot from './beforeScreenshot';
import afterScreenshot from './afterScreenshot';

import getScreenDimensions from '../scripts/getScreenDimensions';
import ScreenDimension from '../utils/ScreenDimension';

const log = debug('wdio-visual-regression-service');


export default async function makeDocumentScreenshot(browser, options = {}) {
  log('start document screenshot');

  // hide scrollbars, scroll to start, hide & remove elements, wait for render
  await beforeScreenshot(browser, options);
  log('22');
  // get screen dimisions to determine document height & width
  const screenDimensions = (await browser.execute(getScreenDimensions));
  log('23');
  const screenDimension = new ScreenDimension(screenDimensions, browser);
  log('24');
  // make screenshot of area
  const base64Image = await makeAreaScreenshot(browser, 0, 0, screenDimension.getDocumentWidth(), screenDimension.getDocumentHeight());
  log('25');
  // show scrollbars, show & add elements
  await afterScreenshot(browser, options);
  log('26');
  log('end document screenshot');

  return base64Image;
}
