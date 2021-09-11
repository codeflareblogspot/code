/* Undo and Redo Function */
(function() {
'use strict';
var SimpleUndo = function(options) {
var settings = options ? options : {};
var defaultOptions = {
provider: function() {
throw new Error("No provider!");
},
maxLength: 30,
onUpdate: function() {}
};
this.provider = (typeof settings.provider != 'undefined') ? settings.provider : defaultOptions.provider;
this.maxLength = (typeof settings.maxLength != 'undefined') ? settings.maxLength : defaultOptions.maxLength;
this.onUpdate = (typeof settings.onUpdate != 'undefined') ? settings.onUpdate : defaultOptions.onUpdate;
this.initialItem = null;
this.clear();
};

function truncate(stack, limit) {
while (stack.length > limit) {
stack.shift();
}}
SimpleUndo.prototype.initialize = function(initialItem) {
this.stack[0] = initialItem;
this.initialItem = initialItem;
};
SimpleUndo.prototype.clear = function() {
this.stack = [this.initialItem];
this.position = 0;
this.onUpdate();
};
SimpleUndo.prototype.save = function() {
this.provider(function(current) {
truncate(this.stack, this.maxLength);
this.position = Math.min(this.position, this.stack.length - 1);
this.stack = this.stack.slice(0, this.position + 1);
this.stack.push(current);
this.position++;
this.onUpdate();
}.bind(this));
};
SimpleUndo.prototype.undo = function(callback) {
if (this.canUndo()) {
var item = this.stack[--this.position];
this.onUpdate();
if (callback) {
callback(item);
}}
};
SimpleUndo.prototype.redo = function(callback) {
if (this.canRedo()) {
var item = this.stack[++this.position];
this.onUpdate();
if (callback) {
callback(item);
}}
};
SimpleUndo.prototype.canUndo = function() {
return this.position > 0;
};
SimpleUndo.prototype.canRedo = function() {
return this.position < this.count();
};
SimpleUndo.prototype.count = function() {
return this.stack.length - 1;
};
if (typeof module != 'undefined') {
module.exports = SimpleUndo;
}
if (typeof window != 'undefined') {
window.SimpleUndo = SimpleUndo;
}
})();

function updateButtons(history) {
$('#undo').attr('disabled', !history.canUndo());
$('#redo').attr('disabled', !history.canRedo());
if (!history.canUndo()) {$('#undo1').css({"color": "#ccc"});
} else {$('#undo1').css({"color": "#000"})}
if (!history.canRedo()) {
$('#redo1').css({"color": "#ccc"});} else {$('#redo1').css({"color": "#000"})}
}

function setEditorContents(contents) {$('#txtInput').val(contents);}

$(function() {
var history = new SimpleUndo({
maxLength: 200,
provider: function(done) {
done($('#txtInput').val());
},
onUpdate: function() {if (!history) return;updateButtons(history);}
});
$('#undo, #undo1').click(function() {history.undo(setEditorContents);});
$('#redo, #redo1').click(function() {history.redo(setEditorContents);});
$('#txtInput').on('input change paste', function() {history.save();});
updateButtons(history);
});

/* Numbered Text Area */
(function($) {
$.fn.numberedtextarea = function(options) {
var settings = $.extend({
color: null,
borderColor: null,
class: null,
allowTabChar: false,
}, options);
this.each(function() {
if (this.nodeName.toLowerCase() !== "textarea") {
console.log('This is not a <textarea>, so no way Jose...');
return false;
}
addWrapper(this, settings);
addLineNumbers(this, settings);
if (settings.allowTabChar) {
$(this).allowTabChar();
}
});
return this;
};
$.fn.allowTabChar = function() {
if (this.jquery) {
this.each(function() {
if (this.nodeType == 1) {
var nodeName = this.nodeName.toLowerCase();
if (nodeName == "textarea" || (nodeName == "input" && this.type == "text")) {
allowTabChar(this);
}}})}
return this;
}

function addWrapper(element, settings) {
var wrapper = $('<div class="numberedtextarea-wrapper"></div>').insertAfter(element);
$(element).detach().appendTo(wrapper);
}

function addLineNumbers(element, settings) {
element = $(element);
var wrapper = element.parents('.numberedtextarea-wrapper');
var paddingLeft = parseFloat(element.css('padding-left'));
var paddingTop = parseFloat(element.css('padding-top')) + 1;
var paddingBottom = parseFloat(element.css('padding-bottom'));
var lineNumbers = $('<div class="numberedtextarea-line-numbers"></div>').insertAfter(element);
element.css({
paddingLeft: paddingLeft + lineNumbers.width() + 'px'
}).on('change paste', function() {
renderLineNumbers(element, settings);
}).on('scroll', function() {
scrollLineNumbers(element, settings);
});
lineNumbers.css({
paddingLeft: paddingLeft + 'px',
paddingTop: paddingTop + 'px',
lineHeight: element.css('line-height'),
fontFamily: element.css('font-family'),
fontSize: element.css('font-size'),
width: lineNumbers.width() - paddingLeft + 'px',
});
element.trigger('change');
}

function renderLineNumbers(element, settings) {
element = $(element);
var linesDiv = element.parent().find('.numberedtextarea-line-numbers');
var count = element.val().split("\n").length;
var paddingBottom = parseFloat(element.css('padding-bottom'));
linesDiv.find('.numberedtextarea-number').remove();
for (i = 1; i <= count; i++) {
var line = $('<div class="numberedtextarea-number numberedtextarea-number-' + i + '">' + i + '</div>').appendTo(linesDiv);
if (i === count) {
line.css('margin-bottom', paddingBottom + 'px');
}
}
}

function scrollLineNumbers(element, settings) {
element = $(element);
var linesDiv = element.parent().find('.numberedtextarea-line-numbers');
linesDiv.scrollTop(element.scrollTop());
}

function pasteIntoInput(el, text) {
el.focus();
if (typeof el.selectionStart == "number") {
var val = el.value;
var selStart = el.selectionStart;
el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
el.selectionEnd = el.selectionStart = selStart + text.length;
} else if (typeof document.selection != "undefined") {
var textRange = document.selection.createRange();
textRange.text = text;
textRange.collapse(false);
textRange.select();
}
}
function allowTabChar(el) {
$(el).keydown(function(e) {
if (e.which == 9) {
pasteIntoInput(this, "\t");
return false;
}
});
$(el).keypress(function(e) {
if (e.which == 9) {
return false;
}
});
}
}(jQuery));
$('#txtInput').numberedtextarea();

/* Image to ASCII Converter */
(function($) {
function _cpaToString(cpa, width, charSize, blocks, colors) {
var reducedPixelArray = [],
blockArray = [],
letters = [];
for (var b = 0, c = cpa.length; b < c; b += 4) {
reducedPixelArray.push(Math.max(cpa[b], cpa[b + 1], cpa[b + 2]));
}
for (var h = 0; h < blocks.y; h++) {
for (var i = 0; i < blocks.x; i++) {
var pixelsInBlock = [];
var baseOffset = h * charSize.y * width + i * charSize.x;
for (var j = 0; j < charSize.y; j++) {
for (var k = 0; k < charSize.x; k++) {
var currentOffset = baseOffset + (j * width + k);
pixelsInBlock.push(reducedPixelArray[currentOffset]);
}
}
blockArray.push(parseInt(pixelsInBlock.reduce(function(a, b) {
return a + b;
}) / (charSize.x * charSize.y), 10));
}
}
for (var l = 0, m = blockArray.length; l < m; l++) {
letters.push($.grep(colors, function(el) {
return (blockArray[0] <= el.top && blockArray[0] >= el.bottom);
})[0].letter);
blockArray.shift();
if ((l + 1) % blocks.x === 0) {
letters.push('\n');
}
}
return letters.join('');
}
var methods = {
init: function(options) {
var settings = $.extend({
letters: 'XMI/-.',
invert: false,
fps: 25
}, options || {});
return this.each(function() {
var letters = settings.invert ? settings.letters.split('').reverse() : settings.letters.split(''),
colors = [],
dimensions = {
width: $(this).width(),
height: $(this).height()
};
for (var a = 0; a < letters.length; a++) {
colors.push({
top: 255 / letters.length * (a + 1),
bottom: 255 / letters.length * a,
letter: letters[a]
});
}
var dummy = $('<span>').text('a').css({
'font-family': 'monospace',
'visibility': 'hidden'
}).appendTo($(this).parent());
var charSize = {
x: dummy.width(),
y: dummy.height()
};
dummy.remove();
var blocks = {
x: parseInt(dimensions.width / charSize.x, 10),
y: parseInt(dimensions.height / charSize.y, 10)
};
$(this).wrap($('<span>', {
'class': 'abc-wrapper',
'width': dimensions.width,
'height': dimensions.height
}).css({
'display': $(this).css('display'),
'overflow': 'hidden'
})).hide();
if (this.nodeName === 'IMG') {
var $img = $(this),
pic = $('<canvas>').attr(dimensions),
picCtx = pic[0].getContext('2d'),
pixelArray, art;
picCtx.drawImage($img[0], 0, 0, dimensions.width, dimensions.height);
pixelArray = picCtx.getImageData(0, 0, dimensions.width, dimensions.height).data;
art = ['<div style="line-height:', charSize.y, 'px;">', _cpaToString(pixelArray, dimensions.width, charSize, blocks, colors), '</div>'].join('');
$img.after(art);
} else if (this.nodeName === 'VIDEO') {
var $vid = $(this),
vid = $('<canvas>').attr(dimensions),
vidCtx = vid[0].getContext('2d'),
videoInterval;
$vid.after(['<div style="line-height:', charSize.y, 'px;"></div>'].join(''));
videoInterval = setInterval(function() {
vidCtx.clearRect(0, 0, dimensions.width, dimensions.height);
vidCtx.drawImage($vid[0], 0, 0, dimensions.width, dimensions.height);
var pixelArray = vidCtx.getImageData(0, 0, dimensions.width, dimensions.height).data;
$vid.next('pre').text(_cpaToString(pixelArray, dimensions.width, charSize, blocks, colors));
}, 1000 / settings.fps);
$vid.data('abcInterval', videoInterval);
} else {
$.error('.abc() can only be applied to image and video elements!');
}
});
},
undo: function() {
return this.each(function() {
$(this).show().next('pre').remove().end().unwrap();
if ($(this).data('abcInterval')) {
clearInterval($(this).data('abcInterval'));
}
});
}
};
$.fn.abc = function(method) {
if (methods[method]) {
return methods[method].apply(this, [].slice.call(arguments, 1));
} else if (typeof method === 'object' || !method) {
return methods.init.apply(this, arguments);
} else {
$.error('Method ' + method + ' does not exist on jQuery.abc');
}
};
})(jQuery);

/* Script Obfuscator */
var _w = window,
_n = navigator,
_d = document;
(function() {
version: "1.0.0";EnhanceCSSDoc: true;FlashMaxCurVersion: 10;FlashMinVersion: [6, 65];undefined,
reEmail =
/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
reWhitespace = /^\s+$/,
reInteger = /^\d+$/,
reInteger2 = /^-?\d+$/,
reReal = /^[0-9]+\.?[0-9]?[0-9]?$/,
reNumeric = /^-?\d*\.?\d+$/,
rePhone = /(?:\s|^|:)[\(\)\d\+\- ]*[^#]?\d{5}[\(\)\d\+\- ]*(?:ext|extension)?[:;]?[\(\)\d\+\- ]*(?:\s|$)/,
reGUID = /^\{?[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}\}?$/,
reALPHANUMERIC = /^[a-zA-Z0-9]+$/,
reALPHA = /^[a-zA-Z]+$/,
reStrategiesURL = /^(http|https):\/\/([a-zA-Z1-9-\.]{4,})\.ni\.(dev|strategiesuk\.net)$/,
reUKPostcode = /^[a-zA-Z]{1,2}\d{1,2}[a-zA-Z]?\s*\d[a-zA-Z]{2}$/,
reURL = /^[A-Za-z0-9\.\-]+\.[A-Za-z]{2,4}(:[0-9]+)?\/?.*$/,
reDate = /^[0-3]?[0-9]\/[0-1]?[0-9]\/[1-2]?[0-9]?[0-9][0-9]$/;
var _st = _w.setTimeout,
_si = _w.setInterval
_w.setTimeout = function(a, b) {
if (typeof a == "function") {
var c = Array.prototype.slice.call(arguments, 2),
f = (function() {
a.apply(null, c)
});
return _st(f, b)
};
return _st(a, b)
}
_w.setInterval = function(a, b) {
if (typeof a == "function") {
var c = Array.prototype.slice.call(arguments, 2),
f = (function() {
a.apply(null, c)
});
return _si(f, b)
};
return _si(a, b)
}
if (!_d.getElementsByTagName('*').length) {
if (_d.all) {
_d.getElementsByTagName = function(a) {
if (a == "*") {
return _d.all
} else {
return _d.all.tags(a.toUpper())
}
}
}
};
if (!Array.prototype.indexOf) {
Array.prototype.indexOf = function(a) {
var b = this.length,
c = Number(arguments[1]) || 0;
c = (c < 0) ? Math.ceil(c) : Math.floor(c);
if (c < 0) {
c += b
};
for (; c < b; c++) {
if (c in this && this[c] === a) {
return c
}
};
return -1
}
};
if (!Array.prototype.push) {
Array.prototype.push = function() {
for (var i = 0; i < arguments.length; i++) {
this[this.length] = arguments[i]
};
return this.length
}
};
if (!Array.prototype.unshift) {
Array.prototype.unshift = function() {
var i = unshift.arguments.length;
for (var j = this.length - 1; j >= 0; --j) {
this[j + i] = this[j]
};
for (j = 0; j < i; ++j) {
this[j] = unshift.argument[j]
}
}
};
if (!Array.prototype.shift) {
Array.prototype.shift = function(a) {
var b = this[0];
for (var i = 1; i < this.length; ++i) {
this[i - 1] = this[i]
};
this.length--;
return b
}
}
_d.getElementsByClassName = function(a, t) {
var b = new Array(),
t = t || "*",
c = _d.getElementsByTagName(t);
for (var i = 0; i < c.length; i++) {
var tmp=String(c[i].className);
if (tmp.indexOf(" ")>=0) {
var d = tmp.split(" ");
for (var j = 0; j < d.length; j++) {
if (d[j] == a) {
b.push(c[i])
}
}
} else if (tmp == a) {
b.push(c[i])
}
};
return b
}
S = Strictly = {
EncodeType: "entity",
getEl: function(el, a) {
a = a || _d;
if (typeof(el) == "string") {
el = a.getElementById(el)
};
return el
},
getObj: function(el) {
return (!el) ? _d : this.isString(el) ? S.getEl(el) : el
},
getRadioVal: function(a) {
var b = "",
c = _d.getElementsByTagName('input'),
d = c.length;
for (i = 0; i < d; i++) {
if ((c[i].type == "radio") && (c[i].name == a) && (c[i].checked)) {
b = c[i].value
}
};
return b
},
setContent: function(el, a) {
el = S.getObj(el);
if (typeof(el.value) !== "undefined") {
el.value = a
} else if (el.nodeType) {
el.innerHTML = a
};
return
},
setText: function(el, a) {
el = S.getObj(el);
if (el && a) {
if (el.innerText) {
el.innerText = a
} else if (el.textContent) {
el.textContent = a
} else if (_d.createElement) {
if (el.firstChild) {
el.firstChild.nodeValue = a
} else {
el.appendChild(_d.createTextNode(a))
}
}
};
return
},
getText: function(el) {
el = S.getObj(el);
var a = "";
if (el) {
if (el.innerText) {
a = el.innerText
} else if (el.textContent) {
a = el.textContent
} else if (el.firstChild && el.firstChild.nodeType == 3) {
a = el.firstChild.nodeValue
}
};
return a
},
getFlashMovie: function(a) {
var b;
if (S.Browser.ie) {
if (_d.getElementById) {
b = G(a);
if (b) return b
};
b = (_w[a]) ? _w[a] : _d[a];
return b
} else {
b = _d[a];
if (!b && _d.embeds && _d.embeds[a]) {
b = _d.embeds[a]
};
return b
}
},
getIframe: function(id) {
var a;
if (_d.getElementById) {
return G(id)
} else if (_w.frames && _w.frames.length) {
return _w.frames[id]
}
},
getIframeWin: function(a) {
if (a) {
if (a.contentWindow) {
return a.contentWindow
} else if (a.contentDocument && S.Browser && S.Browser.opera) {
return a.contentDocument
} else {
return a
}
}
},
getIframeDoc: function(a) {
if (a) {
if (a.contentDocument) {
return a.contentDocument
} else if (a.contentWindow.document) {
return a.contentWindow.document
} else if (a.document) {
return a.document
}
}
},
getQuerystring: function() {
var a = "";
if (location.href) {
var q = _w.location.search;
if (q && q.length > 1) {
a = q.substring(1, q.length)
}
};
return a
},
getBody: function() {
return _d.getElementsByTagName("body")[0] || _d.body
},
isArray: function(o) {
return (o instanceof Array)
},
isFunction: function(o) {
return (typeof(o) == "function")
},
isNumber: function(o) {
return (typeof(o) == "number")
},
isBoolean: function(o) {
return (typeof(o) == "boolean")
},
isString: function(o) {
return (typeof(o) == "string")
},
isObject: function(o) {
return (typeof(o) == "object")
},
isDOMobj: function(o) {
if (this.isObject(o)) {
if (o.nodeType) {
return true
}
};
return false
},
makeArray: function(a) {
var c = [];
if (a != null) {
var i = a.length;
if (i == null || this.isString(a) || Strictly.isFunction(b) || (a === _w)) {
c[0] = a
} else {
while (i) {
c[--i] = b[i]
}
}
};
return c
},
inArray: function(a, b) {
for (var i = 0, x = b.length; i < x; i++) {
if (b[i] === a) {
return i
}
};
return -1
},
enc: function(a) {
if (typeof(encodeURIComponent) == "function") {
return encodeURIComponent(a)
} else {
return escape(a)
}
},
denc: function(a) {
if (typeof(decodeURIComponent) == "function") {
return decodeURIComponent(a)
} else {
return unescape(a)
}
},
isEmpty: function(a) {
if (a) {
return ((a === null) || a.length == 0 || reWhitespace.test(a))
} else {
return true
}
},
isEmail: function(val) {
if (val && reEmail.test(val)) {
return true
} else {
return false
}
},
addClass: function(e, c) {
if (e) {
if (iE(e.className)) {
e.className = c
} else {
if (!hasClass(e, c)) e.className += ' ' + c
}
}
},
delClass: function(e, c) {
if (e && !iE(e.className)) {
if (e.className.split(' ').length > 1) {
e.className = e.className.replace(new RegExp(' ' + c + '\\b'), '')
} else {
e.className = e.className.replace(new RegExp(c + '\\b'), '')
}
}
},
hasClass: function(e, c) {
if (e && e.className != '') {
cs = e.className.split(' ');
for (i = 0; i < cs.length; i++) {
if (cs[i] == c) return true
}
};
return false
},
toggleClass: function(e, c) {
if (e) {
if (hasClass(e, c)) {
delClass(e, c)
} else {
addClass(e, c)
}
}
},
convertToBool: function(v) {
v = v.toLowerCase();
if (v == "true" || v == "on" || v == "yes" || v == "1") {
return true
} else if (v == "false" || v == "off" || v == "no" || v == "0") {
return false
};
return null
},
convertFromBool: function(b) {
if (this.isBoolean(b)) {
if (b) {
return "Yes"
} else {
return "No"
}
}
},
HTML2Numerical: function(s) {
var a = new Array('&nbsp;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&shy;',
'&reg;', '&macr;', '&deg;', '&plusmn;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;',
'&frac12;', '&frac34;', '&iquest;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;',
'&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&times;',
'&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;',
'&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;',
'&ocirc;', '&otilde;', '&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&quot;', '&amp;',
'&lt;', '&gt;', '&oelig;', '&oelig;', '&scaron;', '&scaron;', '&yuml;', '&circ;', '&tilde;', '&ensp;', '&emsp;', '&thinsp;', '&zwnj;', '&zwj;', '&lrm;',
'&rlm;', '&ndash;', '&mdash;', '&lsquo;', '&rsquo;', '&sbquo;', '&ldquo;', '&rdquo;', '&bdquo;', '&dagger;', '&dagger;', '&permil;', '&lsaquo;', '&rsaquo;',
'&euro;', '&fnof;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;',
'&xi;', '&omicron;', '&pi;', '&rho;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&alpha;', '&beta;', '&gamma;', '&delta;',
'&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigmaf;', '&sigma;',
'&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&thetasym;', '&upsih;', '&piv;', '&bull;', '&hellip;', '&prime;', '&prime;', '&oline;', '&frasl;',
'&weierp;', '&image;', '&real;', '&trade;', '&alefsym;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&larr;', '&uarr;', '&rarr;', '&darr;',
'&harr;', '&forall;', '&part;', '&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&prod;', '&sum;', '&minus;', '&lowast;', '&radic;', '&prop;',
'&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&int;', '&there4;', '&sim;', '&cong;', '&asymp;', '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;',
'&nsub;', '&sube;', '&supe;', '&oplus;', '&otimes;', '&perp;', '&sdot;', '&lceil;', '&rceil;', '&lfloor;', '&rfloor;', '&lang;', '&rang;', '&loz;', '&spades;',
'&clubs;', '&hearts;', '&diams;'),
b = new Array('&#160;', '&#161;', '&#162;', '&#163;', '&#164;', '&#165;', '&#166;', '&#167;', '&#168;', '&#169;', '&#170;', '&#171;', '&#172;', '&#173;',
'&#174;', '&#175;', '&#176;', '&#177;', '&#178;', '&#179;', '&#180;', '&#181;', '&#182;', '&#183;', '&#184;', '&#185;', '&#186;', '&#187;', '&#188;', '&#189;',
'&#190;', '&#191;', '&#192;', '&#193;', '&#194;', '&#195;', '&#196;', '&#197;', '&#198;', '&#199;', '&#200;', '&#201;', '&#202;', '&#203;', '&#204;', '&#205;',
'&#206;', '&#207;', '&#208;', '&#209;', '&#210;', '&#211;', '&#212;', '&#213;', '&#214;', '&#215;', '&#216;', '&#217;', '&#218;', '&#219;', '&#220;', '&#221;',
'&#222;', '&#223;', '&#224;', '&#225;', '&#226;', '&#227;', '&#228;', '&#229;', '&#230;', '&#231;', '&#232;', '&#233;', '&#234;', '&#235;', '&#236;', '&#237;',
'&#238;', '&#239;', '&#240;', '&#241;', '&#242;', '&#243;', '&#244;', '&#245;', '&#246;', '&#247;', '&#248;', '&#249;', '&#250;', '&#251;', '&#252;', '&#253;',
'&#254;', '&#255;', '&#34;', '&#38;', '&#60;', '&#62;', '&#338;', '&#339;', '&#352;', '&#353;', '&#376;', '&#710;', '&#732;', '&#8194;', '&#8195;', '&#8201;',
'&#8204;', '&#8205;', '&#8206;', '&#8207;', '&#8211;', '&#8212;', '&#8216;', '&#8217;', '&#8218;', '&#8220;', '&#8221;', '&#8222;', '&#8224;', '&#8225;',
'&#8240;', '&#8249;', '&#8250;', '&#8364;', '&#402;', '&#913;', '&#914;', '&#915;', '&#916;', '&#917;', '&#918;', '&#919;', '&#920;', '&#921;', '&#922;',
'&#923;', '&#924;', '&#925;', '&#926;', '&#927;', '&#928;', '&#929;', '&#931;', '&#932;', '&#933;', '&#934;', '&#935;', '&#936;', '&#937;', '&#945;', '&#946;',
'&#947;', '&#948;', '&#949;', '&#950;', '&#951;', '&#952;', '&#953;', '&#954;', '&#955;', '&#956;', '&#957;', '&#958;', '&#959;', '&#960;', '&#961;', '&#962;',
'&#963;', '&#964;', '&#965;', '&#966;', '&#967;', '&#968;', '&#969;', '&#977;', '&#978;', '&#982;', '&#8226;', '&#8230;', '&#8242;', '&#8243;', '&#8254;',
'&#8260;', '&#8472;', '&#8465;', '&#8476;', '&#8482;', '&#8501;', '&#8592;', '&#8593;', '&#8594;', '&#8595;', '&#8596;', '&#8629;', '&#8656;', '&#8657;',
'&#8658;', '&#8659;', '&#8660;', '&#8704;', '&#8706;', '&#8707;', '&#8709;', '&#8711;', '&#8712;', '&#8713;', '&#8715;', '&#8719;', '&#8721;', '&#8722;',
'&#8727;', '&#8730;', '&#8733;', '&#8734;', '&#8736;', '&#8743;', '&#8744;', '&#8745;', '&#8746;', '&#8747;', '&#8756;', '&#8764;', '&#8773;', '&#8776;',
'&#8800;', '&#8801;', '&#8804;', '&#8805;', '&#8834;', '&#8835;', '&#8836;', '&#8838;', '&#8839;', '&#8853;', '&#8855;', '&#8869;', '&#8901;', '&#8968;',
'&#8969;', '&#8970;', '&#8971;', '&#9001;', '&#9002;', '&#9674;', '&#9824;', '&#9827;', '&#9829;', '&#9830;'),
r = this.inArray('&lt;', a);
return this.swapArrayVals(s, a, b)
},
NumericalToHTML: function(s) {
var a = new Array('&#160;', '&#161;', '&#162;', '&#163;', '&#164;', '&#165;', '&#166;', '&#167;', '&#168;', '&#169;', '&#170;', '&#171;', '&#172;', '&#173;',
'&#174;', '&#175;', '&#176;', '&#177;', '&#178;', '&#179;', '&#180;', '&#181;', '&#182;', '&#183;', '&#184;', '&#185;', '&#186;', '&#187;', '&#188;', '&#189;',
'&#190;', '&#191;', '&#192;', '&#193;', '&#194;', '&#195;', '&#196;', '&#197;', '&#198;', '&#199;', '&#200;', '&#201;', '&#202;', '&#203;', '&#204;', '&#205;',
'&#206;', '&#207;', '&#208;', '&#209;', '&#210;', '&#211;', '&#212;', '&#213;', '&#214;', '&#215;', '&#216;', '&#217;', '&#218;', '&#219;', '&#220;', '&#221;',
'&#222;', '&#223;', '&#224;', '&#225;', '&#226;', '&#227;', '&#228;', '&#229;', '&#230;', '&#231;', '&#232;', '&#233;', '&#234;', '&#235;', '&#236;', '&#237;',
'&#238;', '&#239;', '&#240;', '&#241;', '&#242;', '&#243;', '&#244;', '&#245;', '&#246;', '&#247;', '&#248;', '&#249;', '&#250;', '&#251;', '&#252;', '&#253;',
'&#254;', '&#255;', '&#34;', '&#38;', '&#60;', '&#62;', '&#338;', '&#339;', '&#352;', '&#353;', '&#376;', '&#710;', '&#732;', '&#8194;', '&#8195;', '&#8201;',
'&#8204;', '&#8205;', '&#8206;', '&#8207;', '&#8211;', '&#8212;', '&#8216;', '&#8217;', '&#8218;', '&#8220;', '&#8221;', '&#8222;', '&#8224;', '&#8225;',
'&#8240;', '&#8249;', '&#8250;', '&#8364;', '&#402;', '&#913;', '&#914;', '&#915;', '&#916;', '&#917;', '&#918;', '&#919;', '&#920;', '&#921;', '&#922;',
'&#923;', '&#924;', '&#925;', '&#926;', '&#927;', '&#928;', '&#929;', '&#931;', '&#932;', '&#933;', '&#934;', '&#935;', '&#936;', '&#937;', '&#945;', '&#946;',
'&#947;', '&#948;', '&#949;', '&#950;', '&#951;', '&#952;', '&#953;', '&#954;', '&#955;', '&#956;', '&#957;', '&#958;', '&#959;', '&#960;', '&#961;', '&#962;',
'&#963;', '&#964;', '&#965;', '&#966;', '&#967;', '&#968;', '&#969;', '&#977;', '&#978;', '&#982;', '&#8226;', '&#8230;', '&#8242;', '&#8243;', '&#8254;',
'&#8260;', '&#8472;', '&#8465;', '&#8476;', '&#8482;', '&#8501;', '&#8592;', '&#8593;', '&#8594;', '&#8595;', '&#8596;', '&#8629;', '&#8656;', '&#8657;',
'&#8658;', '&#8659;', '&#8660;', '&#8704;', '&#8706;', '&#8707;', '&#8709;', '&#8711;', '&#8712;', '&#8713;', '&#8715;', '&#8719;', '&#8721;', '&#8722;',
'&#8727;', '&#8730;', '&#8733;', '&#8734;', '&#8736;', '&#8743;', '&#8744;', '&#8745;', '&#8746;', '&#8747;', '&#8756;', '&#8764;', '&#8773;', '&#8776;',
'&#8800;', '&#8801;', '&#8804;', '&#8805;', '&#8834;', '&#8835;', '&#8836;', '&#8838;', '&#8839;', '&#8853;', '&#8855;', '&#8869;', '&#8901;', '&#8968;',
'&#8969;', '&#8970;', '&#8971;', '&#9001;', '&#9002;', '&#9674;', '&#9824;', '&#9827;', '&#9829;', '&#9830;'),
b = new Array('&nbsp;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&shy;',
'&reg;', '&macr;', '&deg;', '&plusmn;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;',
'&frac12;', '&frac34;', '&iquest;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;',
'&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&times;',
'&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;',
'&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;',
'&ocirc;', '&otilde;', '&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&quot;', '&amp;',
'&lt;', '&gt;', '&oelig;', '&oelig;', '&scaron;', '&scaron;', '&yuml;', '&circ;', '&tilde;', '&ensp;', '&emsp;', '&thinsp;', '&zwnj;', '&zwj;', '&lrm;',
'&rlm;', '&ndash;', '&mdash;', '&lsquo;', '&rsquo;', '&sbquo;', '&ldquo;', '&rdquo;', '&bdquo;', '&dagger;', '&dagger;', '&permil;', '&lsaquo;', '&rsaquo;',
'&euro;', '&fnof;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;',
'&xi;', '&omicron;', '&pi;', '&rho;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&alpha;', '&beta;', '&gamma;', '&delta;',
'&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigmaf;', '&sigma;',
'&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&thetasym;', '&upsih;', '&piv;', '&bull;', '&hellip;', '&prime;', '&prime;', '&oline;', '&frasl;',
'&weierp;', '&image;', '&real;', '&trade;', '&alefsym;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&larr;', '&uarr;', '&rarr;', '&darr;',
'&harr;', '&forall;', '&part;', '&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&prod;', '&sum;', '&minus;', '&lowast;', '&radic;', '&prop;',
'&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&int;', '&there4;', '&sim;', '&cong;', '&asymp;', '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;',
'&nsub;', '&sube;', '&supe;', '&oplus;', '&otimes;', '&perp;', '&sdot;', '&lceil;', '&rceil;', '&lfloor;', '&rfloor;', '&lang;', '&rang;', '&loz;', '&spades;',
'&clubs;', '&hearts;', '&diams;');
return this.swapArrayVals(s, a, b)
},
numEncode: function(s) {
if (this.isEmpty(s)) return "";
var e = "";
for (var i = 0; i < s.length; i++) {
var c = s.charAt(i);
if (c < " " || c > "~") {
c = "&#" + c.charCodeAt() + ";"
};
e += c
};
return e
},
htmlDecode: function(s) {
var c, m, d = s;
if (this.isEmpty(d)) return "";
d = this.HTML2Numerical(d);
arr = d.match(/&#[0-9]{1,5};/g);
if (arr != null) {
for (var x = 0; x < arr.length; x++) {
m = arr[x];
c = m.substring(2, m.length - 1);
if (c >= -32768 && c <= 65535) {
d = d.replace(m, String.fromCharCode(c))
} else {
d = d.replace(m, "")
}
}
};
return d
},
htmlEncode: function(s, a) {
if (this.isEmpty(s)) return "";
a = a | false;
if (a) {
if (this.EncodeType == "numerical") {
s = s.replace(/&/g, "&#38;")
} else {
s = s.replace(/&/g, "&amp;")
}
};
s = this.XSSEncode(s, false);
if (this.EncodeType == "numerical" || !a) {
s = this.HTML2Numerical(s)
};
s = this.numEncode(s);
if (!a) {
s = s.replace(/&#/g, "##AMPHASH##");
if (this.EncodeType == "numerical") {
s = s.replace(/&/g, "&#38;")
} else {
s = s.replace(/&/g, "&amp;")
};
s = s.replace(/##AMPHASH##/g, "&#")
};
s = s.replace(/&#\d*([^\d;]|$)/g, "$1");
if (!a) {
s = this.correctEncoding(s)
};
if (this.EncodeType == "entity") {
s = this.NumericalToHTML(s)
};
return s
},
XSSEncode: function(s, en) {
if (!this.isEmpty(s)) {
en = en || true;
if (en) {
s = s.replace(/\'/g, "&#39;");
s = s.replace(/\"/g, "&quot;");
s = s.replace(/</g, "&lt;");
s = s.replace(/>/g, "&gt;")
} else {
s = s.replace(/\'/g, "&#39;");
s = s.replace(/\"/g, "&#34;");
s = s.replace(/</g, "&#60;");
s = s.replace(/>/g, "&#62;")
};
return s
} else {
return ""
}
},
hasEncoded: function(s) {
if (/&#[0-9]{1,5}/g.test(s)) {
return true
} else if (/&[A-Z]{2,6}/gi.test(s)) {
return true
} else {
return false
}
},
stripUnicode: function(s) {
return s.replace(/[^\x20-\x7E]/g, "")
},
correctEncoding: function(s) {
return s.replace(/(&amp;)(amp;)+/, "$1")
},
swapArrayVals: function(s, a, b) {
if (this.isEmpty(s)) return "";
if (a && b) {
if (a.length == b.length) {
for (var x = 0, i = a.length; x < i; x++) {
s = s.replace(a[x], b[x])
}
}
};
return s
},
getEmailAddress: function(a, b) {
return a + '@' + b
},
enumObj: function(a) {
for (var x in a) {}
},
testHTML: function(el) {
if (el && el.nodeType) {
var k, c = el.childNodes;
for (var i = 0; i < c.length; i++) {
k = c[i]
}
}
},
Trim: function(a) {
if (this.isEmpty(a)) return "";
var x;
x = LTrim(RTrim(a));
return x
},
LTrim: function(v) {
return v.replace(/[\s\xA0]+$/, "")
},
RTrim: function(v) {
return v.replace(/^[\s\xA0]+/, "")
},
kill: function(a) {
if (a) {
try {
a = null
} catch (e) {};
try {
delete a
} catch (e) {}
};
return a
},
createCookie: function(a, b, c) {
if (c) {
var d = new d();
d.setTime(d.getTime() + (c * 24 * 60 * 60 * 1000));
var e = "; expires=" + d.toGMTString()
} else var e = "";
_d.cookie = a + "=" + escape(b) + e + "; path=/"
},
readCookie: function(a) {
var b = a + "=",
ca = _d.cookie.split(';');
for (var i = 0; i < ca.length; i++) {
var c = ca[i];
while (c.charAt(0) == ' ') {
c = c.substring(1, c.length)
};
if (c.indexOf(b) == 0) {
return unescape(c.substring(b.length, c.length))
}
};
return null
}
};
D = Strictly.Debugger = {
counter: 0,
cache: [],
debug: false,
logTo: "",
cached: false,
ready: false,
debugInterval: null,
ForceCustomDebug: false,
ForceFirebugLite: false,
setupCustomLog: function() {
var b = _p.BodyLoaded;
if (!b) {
return false
};
var a = _d.createElement("div");
a.setAttribute("id", "logwindow");
a.style.visibility = "visible";
a.style.display = "block";
a.style.zIndex = "2147483647";
a.style.position = "relative";
a.style.backgroundColor = "#fff";
a.style.border = "1px solid";
a.style.overflow = "auto";
a.style.width = "100%";
a.style.left = "0";
a.style.bottom = "0";
a.style.height = "200px";
a.style.padding = "5px";
a.style.textAlign = "left";
S.getBody().appendChild(a);
var r = G('logwindow');
if (!r) {
S.Debugger.cached = true;
return false
} else {
return true
}
},
ShowDebugMessage: function(a) {
if (!S.Debugger.debug) return;
S.Debugger.counter++;
var b = S.Debugger.counter.toString() + ": " + a;
if (!S.Debugger.CheckLogger()) {
S.Debugger.cache.push(b);
S.Debugger.cached = true;
if (S.Debugger.debugInterval == null) {
S.Debugger.debugInterval = setInterval(function() {
S.Debugger.ConsoleReady()
}, 1000)
}
} else {
if (S.Debugger.cached) {
S.Debugger.ClearCache()
};
S.Debugger.Log(b)
}
},
CheckLogger: function() {
if (S.Debugger.ready) {
return true
} else {
if (S.Debugger.ForceCustomDebug) {
if (G('logwindow')) {
S.Debugger.logTo = "logwindow";
S.Debugger.ready = true
} else {
S.Debugger.ready = S.Debugger.setupCustomLog();
if (S.Debugger.ready) {
S.Debugger.logTo = "logwindow"
}
}
} else {
if (S.Browser.name != "Firefox" && this.ForceFirebugLite) {
if ((typeof(firebug) != "undefined") && firebug.env && firebug.env.init) {
S.Debugger.logTo = "firebug-lite";
S.Debugger.ready = true
} else {
S.Debugger.ready = false
}
} else {
S.Debugger.ready = (typeof(_w.console) != "undefined");
if (S.Debugger.ready) {
S.Debugger.logTo = "console"
}
}
}
};
return S.Debugger.ready
},
ConsoleReady: function() {
if (S.Debugger.CheckLogger()) {
S.Debugger.ClearCache();
clearInterval(S.Debugger.debugInterval);
S.Debugger.debugInterval = null
}
},
ClearCache: function() {
if (S.Debugger.cache.length > 0) {
for (var c = 0; c < S.Debugger.cache.length; c++) {
S.Debugger.Log(S.Debugger.cache[c])
};
S.Debugger.cache.length = 0;
S.Debugger.cached = false
}
},
Log: function(m) {
if (S.Debugger.logTo === "logwindow") {
var s = _d.createElement("span");
s.innerHTML = m + "<br />";
var el = G("logwindow");
el.appendChild(s)
} else if (S.Debugger.logTo == "console") {
console.log(m)
} else if (S.Debugger.logTo == "firebug-lite") {
firebug.d.console.cmd.log(m)
};
return true
}
}
G = getEl = function(el, a) {
return S.getEl(el, a)
}
GC = function(c, t) {
return _d.getElementsByClassName(c, t)
}
ShowDebug = function(m) {
return D.ShowDebugMessage(m)
}
B = Strictly.Browser = {
userAgent: _n.userAgent,
platform: _n.platform,
name: null,
version: 0,
gecko: false,
khtml: false,
webkit: false,
webkitversion: 0,
opera: false,
ie: false,
ieDocMode: 5,
windows: false,
mac: false,
linux: false,
xml: false,
jscript: false,
javascript: false,
flashEnabled: false,
flashVersion: "0",
cssGradeA: null,
cssEnhanced: false,
boxModel: false,
styleFloat: "cssFloat",
opacity: false,
anchorsEnabled: false,
regexpEnabled: false,
cookieEnabled: false,
imagesEnabled: false,
formsEnabled: false,
linksEnabled: false,
framesEnabled: false,
javaEnabled: false,
AJAXEnabled: undefined,
spoof: null,
bot: null,
widgeEditor: false,
dom: _d.all ? (_d.getElementById ? 2 : 1) : (_d.getElementById ? 4 : (_d.layers ? 3 : 0)),
w3cDOM: typeof _d.getElementById != "undefined" && typeof _d.getElementsByTagName != "undefined" && typeof _d.createElement != "undefined",
BrowserName: function() {
var a = this.userAgent;
if (this.name === null) {
if (/^\s*$/.test(a)) {
this.name = "Blank Agent";
this.spoof = true
} else if (/Opera/i.test(a) || _w.opera) {
this.name = "Opera";
this.opera = true;
if (!(_w.attachEvent && _w.addEventListener)) {
this.spoof = true
} else if (_w.opera && !(/Opera/i.test(a))) {
this.spoof = true
}
} else if (/WebKit/i.test(a) || /Apple/i.test(a)) {
this.webkit = true;
if (/Chrome/i.test(a)) {
this.name = "Chrome"
} else if (/Apple.*Mobile.*Safari/i.test(a)) {
this.name = "Mobile Safari"
} else {
this.name = "Safari"
}
} else if (/msie/i.test(a) && (!_w.opera)) {
this.name = "Internet Explorer";
this.ie = true;
if (!_w.attachEvent || _w.addEventListener) {
this.spoof = true
} else if (!_w.ActiveXObject || !this.jscript) {
this.spoof = true
};
if (!this.spoof) {
this.ieDocMode = (_d.documentMode) ? _d.documentMode : (_d.compatMode && _d.compatMode == "CSS1Compat") ? 7 : 5
}
} else if (/Firefox/i.test(a) || _n.vendor == "Firefox") {
this.name = "Firefox";
this.gecko = true
} else if (/Firebird/i.test(a) || _n.vendor == "Firebird") {
this.name = "Firebird";
this.gecko = true
} else if (/konqueror/i.test(a) || /KHTML/i.test(a)) {
this.name = "Konqueror";
this.khtml = true
} else {
this.name = _n.appName;
if (_n.product && _n.product.toLowerCase() == "gecko" && a.indexOf('gecko') != -1) {
this.gecko = true
}
};
this.version = (a.match(/.+(?:ox|rv|ion|ra|ie|me)[\/: ]([\d.]+)/i) || [])[1];
if (this.webkit) {
this.webkitversion = (a.match(/AppleWebKit\/(\d+)/)[1])
};
if (!this.spoof && (this.gecko || this.khtml || this.webkit)) {
if (_w.attachEvent || !_w.addEventListener) {
this.spoof = true
} else if (_w.ActiveXObject || this.jscript) {
this.spoof = true
}
};
if (!this.spoof && (this.khtml || this.webkit)) {
if (_d.all) this.spoof = true
}
};
return this.name
},
isSpoof: function() {
if (this.spoof === null) {
if (/(?:spoof|spoofer|fake|ripper)/i.test(this.userAgent)) {
this.spoof = true
} else if (/[a-z1-9]{20,}/i.test(this.userAgent)) {
if (!this.name || this.name.length == 0) {
this.name = "Fake Agent"
};
this.spoof = true
} else {
this.spoof = false
}
};
return this.spoof
},
ScriptTest: function() {
/*@cc_on;@if(@_jscript){this.jscript=true}@else*/
;
this.javascript = true; /*@end;@*/
},
OperatingSystemTest: function() {
var p = this.platform.toLowerCase(); /*@cc_on;@if(@_win32){this.windows=true}@elif(@_win16){this.windows=true}@elif(@_win64){this.windows=true}@elif(@_mac){this.mac=true}@elif(@_alpha){this.linux=true}@else*/ ;
this.windows = p ? /win/i.test(p) : /win/.test(this.userAgent), this.mac = p ? /mac/i.test(p) : /mac/.test(this.userAgent), this.linux = p ? /linux/i.test(p) :
/linux/i.test(this.userAgent); /*@end;@*/
},
SniffFlash: function() {
var a = [0, 0],
p = _n.plugins;
if (p && typeof p["Shockwave Flash"] == "object") {
var b = p["Shockwave Flash"].description;
if (typeof b != "undefined") {
b = b.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
var c = parseInt(b.replace(/^(.*)\..*$/, "$1"), 10),
d = /r/.test(b) ? parseInt(b.replace(/^.*r(.*)$/, "$1"), 10) : 0;
a = [c, d]
}
} else if (_w.ActiveXObject) {
var m = 10;
if (S.FlashMaxCurVersion && S.FlashMaxCurVersion > 9) {
m = S.FlashMaxCurVersion + 1
};
for (var ii = m; ii >= 4; ii--) {
try {
var f = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');")
} catch (e) {}
};
if (typeof(f) == "object") {
if (ii == 6) {
f.AllowScriptAccess = "always"
};
try {
var b = f.GetVariable("$version");
if (typeof(b) != "undefined") {
b = b.replace(/^\S+\s+(.*)$/, "$1").split(",");
a = [parseInt(b[0], 10), parseInt(b[2], 10)]
}
} catch (e) {
if (ii > 4) {
a = [ii, 0]
}
}
}
};
if (a[0] == 0 && a[1] == 0) {
this.flashEnabled = false
} else {
this.flashEnabled = true;
this.flashVersion = a[0].toString() + '.' + a[1].toString()
};
return
},
BrowserTest: function() {
this.anchorsEnabled = (_d.anchors) ? "true" : "false";
this.regexpEnabled = (_w.RegExp) ? "true" : "false";
_d.cookie = "cookies=true";
this.cookieEnabled = (_d.cookie) ? "true" : "false";
this.imagesEnabled = (_d.images) ? "true" : "false";
this.formsEnabled = (_d.forms) ? "true" : "false";
this.linksEnabled = (_d.links) ? "true" : "false";
this.framesEnabled = (_w.frames) ? "true" : "false";
this.javaEnabled = (_n.javaEnabled());
var m = _d.getElementsByTagName("meta");
for (var i = 0; i < m.length; i++) {
if (/content-type/i.test(m[i].getAttribute("http-equiv")) && /xml/i.test(m[i].getAttribute("content"))) {
this.xml = true;
break
}
};
return
},
CSSTest: function() {
if (this.cssGradeA === null) {
if (this.cookieEnabled) {
var ck = S.readCookie('enhanced');
if (ck === true) {
this.cssGradeA = true;
if (S.EnhanceCSSDoc) {
if (!this.cssEnhanced) {
this.enhanceDocument()
}
};
return true
} else if (ck === false) {
this.cssGradeA = false;
return true
}
}
};
var b = false;
if (this.w3cDOM) {
var c = _d.createElement('div');
c.style.display = "none";
c.innerHTML = '<a href="/a" style="color:red;float:left;opacity:.5;">a</a>';
_d.body.appendChild(c);
var a = c.getElementsByTagName("a")[0];
this.opacity = a.style.opacity === "0.5";
this.styleFloat = (!!a.style.cssFloat) ? "cssFloat" : "styleFloat";
_d.body.removeChild(c);
var c = _d.createElement('div');
_d.body.appendChild(c);
c.style.visibility = 'hidden';
c.style.padding = '10px';
c.style.width = '20px';
var e = c.offsetWidth;
if (e != 40) {
_d.body.removeChild(c);
b = true
};
if (!b) {
c.style.position = 'absolute';
c.style.left = '10px';
var f = c.offsetLeft;
if (f != 10) {
_d.body.removeChild(c);
b = true
}
};
if (!b) {
this.boxModel = true
};
var h, i, j, td, k, l, m = _d.body.style.marginTop,
c2 = _d.createElement('div');
html =
'<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
k = {
position: 'absolute',
top: 0,
left: 0,
margin: 0,
border: 0,
width: '1px',
height: '1px',
visibility: 'hidden'
};
for (l in k) {
c2.style[l] = k[l]
};
c2.innerHTML = html;
_d.body.insertBefore(c2, _d.body.firstChild);
h = c2.firstChild, i = h.firstChild, td = h.nextSibling.firstChild.firstChild;
this.doesNotAddBorder = (i.offsetTop !== 5);
this.doesAddBorderForTableAndCells = (td.offsetTop === 5);
h.style.overflow = 'hidden', h.style.position = 'relative';
this.subtractsBorderForOverflowNotVisible = (i.offsetTop === -5);
_d.body.style.marginTop = '1px';
this.doesNotIncludeMarginInBodyOffset = (_d.body.offsetTop === 0);
_d.body.style.marginTop = m;
_d.body.removeChild(c2);
if (!b) {
var o = _d.createElement('div');
o.style.width = '5px';
o.style.cssFloat = 'left';
o.style.styleFloat = 'left';
c.appendChild(o);
var p = o.cloneNode(true);
c.appendChild(p);
var q = o.offsetTop,
r = p.offsetTop;
if (q != r) {
_d.body.removeChild(c);
b = true
}
};
if (!b) {
c.innerHTML = '<ul><li style="width: 5px; float: left;">test</li><li style="width: 5px; float: left;clear: left;">test</li></ul>';
var t = c.getElementsByTagName('li')[0].offsetTop,
u = c.getElementsByTagName('li')[1].offsetTop;
if (t == u) {
b = true
}
};
if (!b) {
c.innerHTML = '<div style="height: 20px;"></div>';
c.style.padding = '0';
c.style.height = '10px';
c.style.overflow = 'auto';
S;
var v = c.offsetHeight;
if (v != 10) {
_d.body.removeChild(c);
b = true
}
};
if (!b) {
c.innerHTML = '<div style="line-height: 2; font-size: 10px;">Te<br />st</div>';
c.style.padding = '0';
c.style.height = 'auto';
c.style.overflow = '';
var v = c.offsetHeight;
if (v > 40) {
_d.body.removeChild(c);
b = true
}
};
if (!b) {
if (_w.onresize == false) {
_d.body.removeChild(c);
b = true
}
};
if (!b) {
if (!_w.print) {
_d.body.removeChild(c);
b = true
}
};
if (!b) {
if (_w.clientInformation && _w.opera) {
_d.body.removeChild(c);
b = true
}
};
if (!b) {
_d.body.removeChild(c);
if (S.EnhanceCSSDoc) {
if (!this.cssEnhanced) {
this.enhanceDocument()
}
};
S.createCookie('enhanced', 'true');
this.cssGradeA = true;
return true
}
};
createCookie('enhanced', 'false');
this.cssGradeA = false;
return false
},
enhanceDocument: function() {
if (!/\benhanced\b/.exec(_d.body.className)) {
_d.body.className += ' enhanced'
};
var a = _d.getElementsByTagName('link');
for (i = 0; i < a.length; i++) {
if (/\bbasicNoCascade\b/.exec(a[i].className)) {
a[i].disabled = true
};
if (/\benhanced\b/.exec(a[i].className)) {
a[i].disabled = true;
a[i].disabled = false
}
};
S.Browser.cssEnhanced = true
},
GUITest: function() {
this.CSSTest();
if (this.w3cDOM) {
if (typeof(S.getBody().contentEditable) != "undefined" || typeof(_d.designMode) != "undefined") {
if (S.Browser.ie || S.Browser.gecko) {
this.widgeEditor = true
}
}
}
},
Settings: function() {
var s = "UserAgent: " + this.userAgent + "<br />",
x = 0;
for (var p in this) {
if (typeof(this[p]) != "function" && p != "userAgent") {
x++;
s += p + ": " + this[p] + "<br />"
}
};
return s
}
};P = _p = {
DOMLoaded: false,
BodyLoaded: false,
WindowLoaded: false,
Body: [],
WinLoadArr: [],
DOMArr: [],
DOMTimer: null,
AddWindowLoadEvent: function(fn, a) {
if (typeof(fn) == "function") {
if (!a && S.inArray(this.WinLoadArr, fn) > -1) {
return false
};
if (this.WindowLoaded) {
fn()
} else {
this.WinLoadArr.push(fn)
}
};
return true
},
RunWindowLoaded: function() {
if (this.WindowLoaded) {
return
} else {
var da = this.DOMArr;
for (var i = 0; i < da.length; i++) {
if (da && S.isFunction(da)) {
try {
da[i]()
} catch (e) {}
}
};
this.WindowLoaded = true;
for (var i = 0; i < this.WinLoadArr.length; i++) {
if (S.isFunction(this.WinLoadArr[i])) {
this.WinLoadArr[i]()
}
}
};
return true
},
onBodyLoad: function(fn) {
if (S.isFunction(fn)) {
if (!this.Body[fn]) {
if (P.BodyLoaded || S.getBody()) {
fn.call();
P.Body[fn] = true;
P.BodyLoaded = true
}
} else {
setTimeout(function() {
P.onBodyLoad(fn)
}, 200)
}
}
},
AddDOMLoadEvent: function(fn) {
if (this.DOMLoaded) {
fn()
} else {
this.DOMArr.push(fn)
};
return true
},
RunDOMLoadFunctions: function() {
if (this.DOMLoaded) {
return
};
if (B.ie && B.windows) {
var s = _d.createElement("span");
try {
var t = S.getBody().appendChild(s);
t.parentNode.removeChild(t)
} catch (e) {
if (!this.DOMTimer) {
this.DOMTimer = setInterval(function() {
P.RunDOMLoadFunctions()
}, 10)
};
return
}
};
this.BodyLoaded = true;
this.DOMLoaded = true;
if (this.DOMTimer) {
clearInterval(this.DOMTimer);
this.DOMTimer = null
};
for (var i = 0; i < this.DOMArr.length; i++) {
this.DOMArr[i]();
this.DOMArr[i] = S.kill(this.DOMArr[i])
};
return true
},
onDOMLoad: function() {
if (B.w3cDOM && !B.spoof) {
if ((B.webkit && B.webkitversion < 525) || B.khtml || (B.opera && B.version < 9) && _d.readyState != "undefined") {
P.DOMTimer = setInterval(function() {
if (/loaded|complete/.test(_d.readyState)) {
P.RunDOMLoadFunctions()
}
}, 10)
} else if (_d.addEventListener) {
AD(_d, "DOMContentLoaded", function() {
RE(_d, "DOMContentLoaded", arguments.callee);
P.RunDOMLoadFunctions()
}, false)
} else if (_d.attachEvent) {
AD(_d, "onreadystatechange", function() {
if (_d.readyState === "complete") {
RE(_d, "onreadystatechange", arguments.callee);
_p.RunDOMLoadFunctions()
}
}, false);
if (_d.documentElement.doScroll && _w == _w.top)(function() {
if (this.DOMLoaded) return;
try {
_d.documentElement.doScroll("left")
} catch (e) {
setTimeout(arguments.callee, 0);
return
};
_p.RunDOMLoadFunctions()
})()
}
};
this.AddWindowLoadEvent(function() {
P.RunDOMLoadFunctions()
});
return true
}
};S.Browser.ScriptTest();S.Browser.BrowserName();S.Browser.isSpoof();S.Browser.OperatingSystemTest()
if (typeof jQuery == 'function') {
DOM = addDOMLoadEvent = function(f) {
if (B.w3cDOM) {
$(_d).ready(f)
} else {
W(f)
}
};
W = addWinLoadEvent = function(f) {
$(_w).load(f)
}
AD = addEvent = function(a, b, fn) {
$(a).bind(b, fn)
}
RE = removeEvent = function(a, b, fn) {
$(a).unbind(b, fn)
}
DOM(function() {
_p.BodyLoaded = true;
_p.DOMLoaded = true
});
W(function() {
_p.WindowLoaded = true
})
} else {
DOM = addDOMLoadEvent = function(f) {
P.AddDOMLoadEvent(f)
};
W = addWinLoadEvent = function(f) {
P.AddWindowLoadEvent(f)
}
AD = addEvent = function(a, b, fn) {
if (a) {
if (a.addEventListener) {
a.addEventListener(b, fn, false)
} else if (a.attachEvent) {
var ev = b + fn;
a['e' + ev] = fn;
a[ev] = function() {
a['e' + ev](_w.event)
};
a.attachEvent('on' + b, a[ev])
} else {
var ev = "on" + b,
c = a[ev];
if (typeof c != "function") {
a[ev] = fn
} else {
a[ev] = function() {
c();
fn()
}
}
}
}
}
RE = removeEvent = function(a, b, fn) {
if (a) {
if (a.removeEventListener) {
a.removeEventListener(b, fn, false)
} else if (a.detachEvent) {
try {
a.detachEvent('on' + b, a[b + fn]);
a[b + fn] = null
} catch (e) {}
} else {
var c = a["on" + b];
if (c == fn) {
a["on" + b] = null
}
}
}
}
P.onDOMLoad();
var obj, evType = (_w.attachEvent) ? "on" + evType : evType;
if (_w.addEventListener) {
obj = _w
} else if (_d.addEventListener) {
obj = _d
} else {
obj = _w
};
if (obj[evType]) {
inlineFunc = obj[evType];
obj[evType] = null;
if (P.WinLoadArr.length > 0) {
P.WinLoadArr.unshift(inlineFunc)
} else {
P.WinLoadArr[0] = inlineFunc
}
};
AD(obj, "load", function() {
_p.RunWindowLoaded()
})
};DOM(function() {
S.Browser.BrowserTest();
S.Browser.SniffFlash();
S.Browser.GUITest()
})
sm = function(m) {
console.log(m)
}
})();