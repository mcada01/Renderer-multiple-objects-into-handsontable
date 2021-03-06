// Import stylesheets
import './style.css';

var
    data = [
      {
        title: "<a href='http://www.amazon.com/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691'>Professional JavaScript for Web Developers</a>",
        description: "This <a href='http://bit.ly/sM1bDf'>book</a> provides a developer-level introduction along with more advanced and useful features of <b>JavaScript</b>.",
        comments: "I would rate it &#x2605;&#x2605;&#x2605;&#x2605;&#x2606;",
        cover: "https://handsontable.com/docs/images/examples/professional-javascript-developers-nicholas-zakas.jpg",
        valor: 123
      },
      {
        title: "<a href='http://shop.oreilly.com/product/9780596517748.do'>JavaScript: The Good Parts</a>",
        description: "This book provides a developer-level introduction along with <b>more advanced</b> and useful features of JavaScript.",
        comments: "This is the book about JavaScript",
        cover: "https://handsontable.com/docs/images/examples/javascript-the-good-parts.jpg",
        valor: 876
      },
      {
        title: "<a href='http://shop.oreilly.com/product/9780596805531.do'>JavaScript: The Definitive Guide</a>",
        description: "<em>JavaScript: The Definitive Guide</em> provides a thorough description of the core <b>JavaScript</b> language and both the legacy and standard DOMs implemented in web browsers.",
        comments: "I've never actually read it, but the <a href='http://shop.oreilly.com/product/9780596805531.do'>comments</a> are highly <strong>positive</strong>.",
        cover: "https://handsontable.com/docs/images/examples/javascript-the-definitive-guide.jpg",
        valor: 394
      }
    ],
    container1,
    hot1;
  
  container1 = document.getElementById('example1');
  hot1 = new Handsontable(container1, {
    data: data,
    colWidths: [200, 200, 200, 80, 100],
    colHeaders: ["Title", "Description", "Comments", "Cover", "Valor"],
    columns: [
      {data: "title", renderer: "html"},
      {data: "description", renderer: "html"},
      {data: "comments", renderer: safeHtmlRenderer},
      {data: "cover", renderer: coverRenderer},
      {data: "valor", renderer: printRenderer}
    ]
  });
  
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  function strip_tags(input, allowed) {
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  
    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
  
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
  }
  
  function safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
    var escaped = Handsontable.helper.stringify(value);
    escaped = strip_tags(escaped, '<em><b><strong><a><big>'); //be sure you only allow certain HTML tags to avoid XSS threats (you should also remove unwanted HTML attributes)
    td.innerHTML = escaped;
  
    return td;
  }
  
  function printRenderer(instance, td, row, col, prop, value, cellProperties) {
  	var btn, x, escaped = Handsontable.helper.stringify(value);
    btn = document.createElement('button');
    btn.setAttribute('content', value);
    btn.setAttribute('class', 'btn');
    btn.setAttribute('disabled', true);
    btn.innerHTML = 'holaaa';
    
    x = document.createTextNode(value);

    //var wrapper = document.getElementById(divWrapper);
    //wrapper.appendChild(b);
    Handsontable.dom.empty(td);
    td.appendChild(btn);
    td.appendChild(x);
    //Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    return td;
  }
  
  function coverRenderer (instance, td, row, col, prop, value, cellProperties) {
    var escaped = Handsontable.helper.stringify(value),
      img;
  
    if (escaped.indexOf('http') === 0) {
      img = document.createElement('IMG');
      img.src = value;
  
      Handsontable.dom.addEvent(img, 'mousedown', function (e){
        e.preventDefault(); // prevent selection quirk
      });
  
      Handsontable.dom.empty(td);
      td.appendChild(img);
    }
    else {
      // render as text
      Handsontable.renderers.TextRenderer.apply(this, arguments);
    }
  
    return td;
  }
