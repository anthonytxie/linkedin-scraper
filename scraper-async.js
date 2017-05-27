const Nightmare = require('nightmare');
const vo = require('vo');
const nightmare = Nightmare({ show: true });
const password = require('./password');
const urls = require('./urls');
const fs = require('fs')

var run = function * () {
  yield nightmare.goto('https://www.linkedin.com/')
  .type('input#login-email', 'email@gmail.com')
  .type('input#login-password', password)
  .click('input#login-submit')
  .wait(2000)
  var titles = []
  for (var i = 0; i < urls.length; i++) {
   yield nightmare.goto(urls[i])
      .wait(2000)
      .scrollTo(5000,0)
      .wait(2000)
      var title = yield nightmare.evaluate(() => {
        var elements = Array.from(document.getElementsByClassName('search-result__info'));
        return elements.map(function(element) {
          return {
            name: element.children[0].querySelector('.actor-name').innerText,
            href: element.children[0].href,
            title: element.children[1].innerText
          }
        });
      });
      titles.push(title);
  }
  return titles;
}

data = []

vo(run)(function(err, titles) {
  console.dir(titles);
  var json = JSON.stringify(titles);
  fs.writeFile('myjsonfile.json', json, 'utf8');
});


