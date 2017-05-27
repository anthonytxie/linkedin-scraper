const orgs = require('./orgs');

pages = []
for (var i=0; i<orgs.length; i++) {
  for (var x=1;x<=10;x++) {
    var url = 'https://www.linkedin.com/search/results/people/?facetCurrentCompany=%5B\"' + orgs[i] +'\"%5D&origin=FACETED_SEARCH&page=' + x + '&title=sales"'
    pages.push(url)
  }
}

module.exports = pages;

for (let page of pages) {
  console.log(page)
}