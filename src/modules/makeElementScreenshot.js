import debug from 'debug';

import makeAreaScreenshot from './makeAreaScreenshot';
import beforeScreenshot from './beforeScreenshot';
import afterScreenshot from './afterScreenshot';

import groupBoundingRect from '../utils/groupBoundingRect';
import getBoundingRects from '../scripts/getBoundingRects';

const log = debug('wdio-screenshot:makeElementScreenshot');


export default async function makeElementScreenshot(browser, elementSelector, options = {}) {
  log('start element screenshot');

  // hide scrollbars, scroll to start, hide & remove elements, wait for render
  await beforeScreenshot(browser, options);
  log('1');
  // get bounding rect of elements
  const boundingRects = await browser.execute(getBoundingRect, selementSelector);
  log('2');
  const boundingRect = groupBoundingRect(boundingRects);
  log('3');
  // make screenshot of area
  const base64Image = await makeAreaScreenshot(browser, boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom);
  log('4');
  // show scrollbars, show & add elements
  await afterScreenshot(browser, options);
  log('end element screenshot');

  return base64Image;
}
