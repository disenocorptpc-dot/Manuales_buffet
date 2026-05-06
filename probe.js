const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const failed = [];
  page.on('requestfailed', req => failed.push(req.url()));

  await page.goto('https://manuales-buffet.pages.dev/?v=17#/3/en', {waitUntil: 'networkidle0'});

  const result = await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    const span = h2 ? h2.querySelector('span') : null;
    const h2Style = h2 ? window.getComputedStyle(h2) : {};
    const spanStyle = span ? window.getComputedStyle(span) : {};
    const inkVar = getComputedStyle(document.documentElement).getPropertyValue('--buffet-ink');
    const bronzeVar = getComputedStyle(document.documentElement).getPropertyValue('--buffet-bronze');
    const paperVar = getComputedStyle(document.documentElement).getPropertyValue('--buffet-paper');

    // Find the hero background-image div
    const slides = document.querySelectorAll('.menu-header-slide div');
    let heroBg = 'not found';
    slides.forEach(d => {
      if (d.style.backgroundImage && d.style.backgroundImage.includes('assets')) {
        heroBg = d.style.backgroundImage;
      }
    });

    return {
      h2Color: h2 ? h2Style.color : 'no h2',
      h2Opacity: h2 ? h2Style.opacity : 'no h2',
      spanColor: span ? spanStyle.color : 'no span',
      spanText: span ? span.textContent : 'no span',
      inkVar: inkVar,
      bronzeVar: bronzeVar,
      paperVar: paperVar,
      heroBg: heroBg,
    };
  });

  result.failedRequests = failed;
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
