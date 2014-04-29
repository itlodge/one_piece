// Class to manage commics

$ = require('cheerio');
var request = require('request');
var document = window.document;

var COMMIC_URL = 'http://hzw.com.cn/haizeiwang/manhua';
var use_proxy = true;
var proxy_url = 'http://localhost:8087';
var LOADING_IMAGE_URL = './loading.gif';

var manager = function() {
};

// private members
var volums = [];
var page_urls = [];
var image_urls = [];
var next_idx = 0;

function refresh_image(url) {
  var image = document.createElement('img');
  image.setAttribute('src', url);

  var view = document.getElementById('view');
  while (view.hasChildNodes()) {
    view.removeChild(view.lastChild);
  }
  view.appendChild(image);
}

function get_image_url(idx) {
  console.log(idx);
  console.log(page_urls[idx]);
  params = {'url': page_urls[idx]}
  if (use_proxy == true) {
    params['proxy'] = proxy_url;
  }
  request(params, function(err, resp, html) {
    if (err) {
      get_image_url(idx);
      return console.error(err);
    }
    var parsedHtml = $.load(html);
    var image = parsedHtml('div#photoView p img').attr('src');
    image_urls[idx] = image;
    refresh_image(image);
  });
}

function show_image(idx) {
  refresh_image(LOADING_IMAGE_URL);
  if (idx < 0 ) {
    next_idx += page_urls.length;
    idx = next_idx;
  } else if (idx >= (page_urls.length)) {
    next_idx -= page_urls.length;
    idx = next_idx;
  }
  if (image_urls[idx] === undefined) {
    get_image_url(idx);
  } else {
    refresh_image(image_urls[idx]);
  }
}

function show_commic(url) {
  params = {'url': url}
  if (use_proxy == true) {
    params['proxy'] = proxy_url;
  }
  request(params, function(err, resp, html) {
    if (err) {
      return console.error(err);
    }
    page_urls = [];
    image_urls = [];
    var parsedHtml = $.load(html);
    var image_url = parsedHtml('div#photoView p img').attr('src');
    image_urls[0] = image_url;
    next_idx = 0;
    show_image(next_idx);
    
    parsedHtml('div.fenye a').map(function(i, link) {
      var link = $(link);
      page_urls[i] = link.attr('href');
    });
  });
};

manager.prototype.next_image = function() {
  show_image(++next_idx);
};

manager.prototype.prev_image = function() {
  show_image(--next_idx);
};

manager.prototype.refresh_image = function() {
  console.log('refresh');
  show_image(next_idx);
};

manager.prototype.show_volumns = function() {
  var volums_div = document.getElementById('volums');
  while (volums_div.hasChildNodes()) {
    volums_div.removeChild(volums_div.lastChild);
  }

  params = {'url': COMMIC_URL};
  if (use_proxy == true) {
    params['proxy'] = proxy_url;
  }
  request(params, function(err, resp, html) {
    if (err) {
      return console.error(err);
    }
    
    var parsedHtml = $.load(html);
    parsedHtml('ul.articletxt3 li a').map(function(i, link) {
      var link = $(link);
      var text = document.createTextNode(link.text());
      var anchor = document.createElement('a');
      anchor.setAttribute('href', '#');
      anchor.onclick = function() {
        show_commic(link.attr('href'));
      };
      anchor.appendChild(text);
      var list = document.createElement('li');
      list.appendChild(anchor);
      volums_div.insertBefore(list, volums_div.firstChild);
    });
  });
};

module.exports.commic_manager = new manager();
