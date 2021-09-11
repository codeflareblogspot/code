Encoder={EncodeType:"entity",isEmpty:function(val){if(val){return((val===null)||val.length==0||/^\s+$/.test(val));}else{return true;}},
arr1: ['&nbsp;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&shy;', '&reg;',
'&macr;', '&deg;', '&plusmn;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;',
'&frac34;', '&iquest;', '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;',
'&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;',
'&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;',
'&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;',
'&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&quot;', '&amp;', '&lt;', '&gt;', '&OElig;',
'&oelig;', '&Scaron;', '&scaron;', '&Yuml;', '&circ;', '&tilde;', '&ensp;', '&emsp;', '&thinsp;', '&zwnj;', '&zwj;', '&lrm;', '&rlm;', '&ndash;', '&mdash;',
'&lsquo;', '&rsquo;', '&sbquo;', '&ldquo;', '&rdquo;', '&bdquo;', '&dagger;', '&Dagger;', '&permil;', '&lsaquo;', '&rsaquo;', '&euro;', '&fnof;', '&Alpha;',
'&Beta;', '&Gamma;', '&Delta;', '&Epsilon;', '&Zeta;', '&Eta;', '&Theta;', '&Iota;', '&Kappa;', '&Lambda;', '&Mu;', '&Nu;', '&Xi;', '&Omicron;', '&Pi;',
'&Rho;', '&Sigma;', '&Tau;', '&Upsilon;', '&Phi;', '&Chi;', '&Psi;', '&Omega;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;',
'&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigmaf;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;',
'&psi;', '&omega;', '&thetasym;', '&upsih;', '&piv;', '&bull;', '&hellip;', '&prime;', '&Prime;', '&oline;', '&frasl;', '&weierp;', '&image;', '&real;',
'&trade;', '&alefsym;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&lArr;', '&uArr;', '&rArr;', '&dArr;', '&hArr;', '&forall;', '&part;',
'&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&prod;', '&sum;', '&minus;', '&lowast;', '&radic;', '&prop;', '&infin;', '&ang;', '&and;',
'&or;', '&cap;', '&cup;', '&int;', '&there4;', '&sim;', '&cong;', '&asymp;', '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;', '&nsub;', '&sube;', '&supe;',
'&oplus;', '&otimes;', '&perp;', '&sdot;', '&lceil;', '&rceil;', '&lfloor;', '&rfloor;', '&lang;', '&rang;', '&loz;', '&spades;', '&clubs;', '&hearts;',
'&diams;'
],
arr2: ['&#160;', '&#161;', '&#162;', '&#163;', '&#164;', '&#165;', '&#166;', '&#167;', '&#168;', '&#169;', '&#170;', '&#171;', '&#172;', '&#173;', '&#174;',
'&#175;', '&#176;', '&#177;', '&#178;', '&#179;', '&#180;', '&#181;', '&#182;', '&#183;', '&#184;', '&#185;', '&#186;', '&#187;', '&#188;', '&#189;', '&#190;',
'&#191;', '&#192;', '&#193;', '&#194;', '&#195;', '&#196;', '&#197;', '&#198;', '&#199;', '&#200;', '&#201;', '&#202;', '&#203;', '&#204;', '&#205;', '&#206;',
'&#207;', '&#208;', '&#209;', '&#210;', '&#211;', '&#212;', '&#213;', '&#214;', '&#215;', '&#216;', '&#217;', '&#218;', '&#219;', '&#220;', '&#221;', '&#222;',
'&#223;', '&#224;', '&#225;', '&#226;', '&#227;', '&#228;', '&#229;', '&#230;', '&#231;', '&#232;', '&#233;', '&#234;', '&#235;', '&#236;', '&#237;', '&#238;',
'&#239;', '&#240;', '&#241;', '&#242;', '&#243;', '&#244;', '&#245;', '&#246;', '&#247;', '&#248;', '&#249;', '&#250;', '&#251;', '&#252;', '&#253;', '&#254;',
'&#255;', '&#34;', '&#38;', '&#60;', '&#62;', '&#338;', '&#339;', '&#352;', '&#353;', '&#376;', '&#710;', '&#732;', '&#8194;', '&#8195;', '&#8201;', '&#8204;',
'&#8205;', '&#8206;', '&#8207;', '&#8211;', '&#8212;', '&#8216;', '&#8217;', '&#8218;', '&#8220;', '&#8221;', '&#8222;', '&#8224;', '&#8225;', '&#8240;',
'&#8249;', '&#8250;', '&#8364;', '&#402;', '&#913;', '&#914;', '&#915;', '&#916;', '&#917;', '&#918;', '&#919;', '&#920;', '&#921;', '&#922;', '&#923;',
'&#924;', '&#925;', '&#926;', '&#927;', '&#928;', '&#929;', '&#931;', '&#932;', '&#933;', '&#934;', '&#935;', '&#936;', '&#937;', '&#945;', '&#946;', '&#947;',
'&#948;', '&#949;', '&#950;', '&#951;', '&#952;', '&#953;', '&#954;', '&#955;', '&#956;', '&#957;', '&#958;', '&#959;', '&#960;', '&#961;', '&#962;', '&#963;',
'&#964;', '&#965;', '&#966;', '&#967;', '&#968;', '&#969;', '&#977;', '&#978;', '&#982;', '&#8226;', '&#8230;', '&#8242;', '&#8243;', '&#8254;', '&#8260;',
'&#8472;', '&#8465;', '&#8476;', '&#8482;', '&#8501;', '&#8592;', '&#8593;', '&#8594;', '&#8595;', '&#8596;', '&#8629;', '&#8656;', '&#8657;', '&#8658;',
'&#8659;', '&#8660;', '&#8704;', '&#8706;', '&#8707;', '&#8709;', '&#8711;', '&#8712;', '&#8713;', '&#8715;', '&#8719;', '&#8721;', '&#8722;', '&#8727;',
'&#8730;', '&#8733;', '&#8734;', '&#8736;', '&#8743;', '&#8744;', '&#8745;', '&#8746;', '&#8747;', '&#8756;', '&#8764;', '&#8773;', '&#8776;', '&#8800;',
'&#8801;', '&#8804;', '&#8805;', '&#8834;', '&#8835;', '&#8836;', '&#8838;', '&#8839;', '&#8853;', '&#8855;', '&#8869;', '&#8901;', '&#8968;', '&#8969;',
'&#8970;', '&#8971;', '&#9001;', '&#9002;', '&#9674;', '&#9824;', '&#9827;', '&#9829;', '&#9830;'
],
HTML2Numerical:function(s){return this.swapArrayVals(s, this.arr1, this.arr2);},
NumericalToHTML: function(s){return this.swapArrayVals(s, this.arr2, this.arr1);},
numEncode: function(s) {
if (this.isEmpty(s)) return "";
var a = [],
l = s.length;
for (var i = 0; i < l; i++) {
var c = s.charAt(i);
if (c < " " || c > "~") {
a.push("&#");
a.push(c.charCodeAt());
a.push(";");
} else {
a.push(c);
}
}
return a.join("");
},
htmlDecode: function(s) {
var c, m, d = s;
if (this.isEmpty(d)) return "";
d = this.HTML2Numerical(d);
arr = d.match(/&#[0-9]{1,5};/g);
if (d.match("<br>")){d = d.replace(/<br>/g, "");}
if (d.match("<br />")){d = d.replace(/<br \/>/g, "");}
if (arr != null) {
for (var x = 0; x < arr.length; x++) {
m = arr[x];
c = m.substring(2, m.length - 1);
if (c >= -32768 && c <= 65535) {
d = d.replace(m, String.fromCharCode(c));
} else {
d = d.replace(m, "");
}
}
}
return d;
},
htmlEncode: function(s, dbl, lf) {
if (this.isEmpty(s)) return "";
dbl = dbl || false;
lf = lf || false;
if (dbl) {
if (this.EncodeType == "numerical") {
s = s.replace(/&/g, "&#38;");
} else {
s = s.replace(/&/g, "&amp;");
}
}
s = this.XSSEncode(s, false);
if (this.EncodeType == "numerical" || !dbl) {
s = this.HTML2Numerical(s);
}
s = this.numEncode(s);
if (!dbl) {
s = s.replace(/&#/g, "##AMPHASH##");
if (this.EncodeType == "numerical") {
s = s.replace(/&/g, "&#38;");
} else {
s = s.replace(/&/g, "&amp;");
}
s = s.replace(/##AMPHASH##/g, "&#");
}
if (lf){s = s.replace(/&#10;/g, "<br />\n");}
else{s = s.replace(/&#10;/g, "\n");}
s = s.replace(/&#\d*([^\d;]|$)/g, "$1");
if (!dbl) {
s = this.correctEncoding(s);
}
if (this.EncodeType == "entity") {
s = this.NumericalToHTML(s);
}
return s;
},
XSSEncode: function(s, en){
if (!this.isEmpty(s)){en = en||true;
if (en){
s = s.replace(/\'/g, "&#39;");
s = s.replace(/\"/g, "&quot;");
s = s.replace(/</g, "&lt;");
s = s.replace(/>/g, "&gt;");
}else{
s = s.replace(/\'/g, "&#39;");
s = s.replace(/\"/g, "&#34;");
s = s.replace(/</g, "&#60;");
s = s.replace(/>/g, "&#62;");
}return s;
}else{
return "";
}},
hasEncoded: function(s) {
if (/&#[0-9]{1,5};/g.test(s)) {
return true;
} else if (/&[A-Z]{2,6};/gi.test(s)) {
return true;
} else {
return false;
}},
stripUnicode: function(s){return s.replace(/[^\x20-\x7E]/g, "");},
correctEncoding: function(s) {return s.replace(/(&amp;)(amp;)+/, "$1");},
swapArrayVals: function(s, arr1, arr2){
if (this.isEmpty(s)) return "";var re;
if (arr1 && arr2){
if (arr1.length == arr2.length) {
for (var x = 0, i = arr1.length; x < i; x++) {
re = new RegExp(arr1[x], 'g');
s = s.replace(re, arr2[x]);
}}}return s;},
inArray: function(item, arr) {
for (var i = 0, x = arr.length; i < x; i++) {
if (arr[i] === item) {return i;}}
return -1;}}