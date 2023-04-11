/* -- Ajax Related Post or Recent Post || codeflare blogspot -- */
function relatedPostsWidget(a){
(function(e) {
var f = {
blogURL: "",
maxPosts: 7,maxTags: 7,maxPostsPerTag: 7,
listWidth: 175,
containerIds: "#comments",
containerSelector:"#related_posts",
tags: null,
loadingText: "Loading...",
loadingClass: "",
relevantTip: "",
MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
rlt_summary: 100,
ShowDate: true,
relatedTitle: '<i class="fa fa-fire" aria-hidden="true"></i> Related Posts',
readMoretext: " [...]",
rlpBlank: "",
rlt_thumb: 200,
recentTitle: '<i class="fa fa-fire" aria-hidden="true"></i> Recent Posts',
postScoreClass: "",
autoWidth:true,
onLoad: false
};
f = e.extend({}, f, a);
var k = 0,
b = null,
g = null;
if(!$(f.containerSelector).length){
$(f.containerIds).before('<div id="'+(f.containerSelector).substring(1)+'"></div>');
}
/* -- Auto Post Number
var x1=Math.floor(($(f.containerSelector).width())/f.listWidth);
if(x1<=1){x1=2;}
if(f.autoWidth==true){f.maxPosts=x1;f.maxTags=x1;f.maxPostsPerTag=x1;}
Auto Post Number -- */
var c = function(x, r) {
k++;
if(x.feed.entry) {
for(var w = 0; w < x.feed.entry.length; w++) {
var m = x.feed.entry[w];
var o, p, C, q, B, n, t, A, v, y, z = "";
for(var u = 0, s = m.link.length; u < s; u++) {
if(m.link[u].rel == "alternate") {
z = m.link[u].href;
break
}
}
o = ("content" in m) ? m.content.$t : ("summary" in m) ? m.summary.$t : "";
var l = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
q = e("<div></div>").append(o.replace(l, ""));
B = q.find("img");
if("media$thumbnail" in m) {
p = m.media$thumbnail.url.replace(/=s[0-9]+\-c/g, "=s" + f.rlt_thumb);
p = p.replace(/\/s[0-9]+\-c/g, "/s" + f.rlt_thumb);
} else {
if(B.length != 0) {
p = B[0].src
} else {
p = f.rlpBlank
}
}
o = o.replace(/<\S[^>]*>/g, "");
if(o.length > f.rlt_summary) {
o = o.substring(0, f.rlt_summary)
}
C = m.title.$t;
y = m.published.$t.substring(0, 10);
n = y.substring(0, 4);
t = y.substring(5, 7);
A = y.substring(8, 10);
v = f.MonthNames[parseInt(t, 10) - 1];
if(location.href.toLowerCase() != z.toLowerCase()) {
i(z, C, p, o, n, A, v)
}
}
}
if(k >= f.tags.length) {
g.attr("class", "");
e("#related-posts-loadingtext", b).remove();
if(f.maxPosts > 0) {
e("li:gt(" + (f.maxPosts - 1) + ")", g).remove()
}
}
};
var i = function(q, u, w, m, y, v, x) {
var r = e("li", g);
for(var p = 0, l = r.length; p < l; p++) {
var t = e("a", r.eq(p));
var s = j(t);
if(t.attr("href") == q) {
h(t, ++s);
for(var o = p - 1; o >= 0; o--) {
var n = e("a", r.eq(o));
if(j(n) > s) {
if(p - o > 1) {
r.eq(o).after(r.eq(p))
}
return
}
}
if(p > 0) {
r.eq(0).before(r.eq(p))
}
return
}
}
g.append('<li><div class="inner"><a class="titleRelatedPost" href="' + q + '" title="' + (f.relevantTip ? f.relevantTip.replace("\d", 1) : "") + '"><span class="imageRP"><img alt="' + u + '" src="' + w + '"/></span><strong>' + u + "</strong></a><p>" + m + '<a title="' + u + '" href="' + q + '">' + f.readMoretext + "</a>" + (f.ShowDate === true ? '<span class="date"><strong>' + v + "</strong><span>" + x + "</span><span>" + y + "</span></span>" : "") + "</p></div></li>")
};
var j = function(l) {
var m = parseInt(l.attr("score"));
return m > 0 ? m : 1
};
var h = function(l, m) {
l.attr("score", m);
if(f.relevantTip) {
l.attr("title", f.relevantTip.replace("\d", m))
}
if(f.postScoreClass) {
l.attr("class", f.postScoreClass + m)
}
};
var d = function() {
if(f.containerSelector != "#related_posts") {
var l = e(f.containerSelector);
if(l.length != 1) {
return
}
b = e('<div id="related_posts"></div>').appendTo(l)
} else {
b = e(f.containerSelector)
}
if(!f.tags) {
f.tags = [];
e('a[rel="tag"]:lt(' + f.maxTags + ")").each(function() {
var o = e.trim(e(this).text().replace(/\n/g, ""));
if(e.inArray(o, f.tags) == -1) {
f.tags[f.tags.length] = o
}
})
}
if(f.tags.length == 0 && !f.recentTitle) {
return
}
if(f.tags.length == 0) {
e("<div class='rpTitleH2'>" + f.recentTitle + "</div>").appendTo(b)
} else {
if(f.relatedTitle) {
e("<div class='rpTitleH2'>" + f.relatedTitle + "</div>").appendTo(b)
}
}
if(f.loadingText) {
e('<div id="related-posts-loadingtext">' + f.loadingText + "</div>").appendTo(b)
}
g = e("<ul " + (f.loadingClass ? 'class="' + f.loadingClass + '"' : "") + "></ul>").appendTo(b);
if(f.tags.length == 0) {
e.get((f.blogURL === "" ? window.location.protocol + "//" + window.location.host : f.blogURL) + "/feeds/posts/default?max-results=" + f.maxPostsPerTag + "&orderby=published&alt=json-in-script", c, "jsonp")
} else {
for(var n = 0, m = f.tags.length; n < m; n++) {
e.get((f.blogURL === "" ? window.location.protocol + "//" + window.location.host : f.blogURL) + "/feeds/posts/default/-/" + f.tags[n] + "?max-results=" + f.maxPostsPerTag + "&orderby=published&alt=json-in-script", c, "jsonp")
}
}
};
d();
})(jQuery);
}
$(document).ready(function(){relatedPostsWidget();});