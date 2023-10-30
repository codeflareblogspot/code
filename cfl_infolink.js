var infoLinkImg=[];
var infoLinkTitle=[];
var infoLinkDesc=[];
function getInfoLink(data){
$('.imgInfo img').attr('src',infoLinkImg[data]);
$('.titleInfo').html(infoLinkTitle[data]);
$('.descInfo').html(infoLinkDesc[data]);
if(infoLinkImg[data]!='error'){$('#dataInfoLink').slideDown();}
}
function moveInfoLink(event){
var w = document.querySelector(elmCflBoundary).offsetWidth;
var el = document.querySelector('#dataInfoLink');var elw=el.offsetWidth;
var l=event.clientX + 10;
var t=event.clientY + 30;
if(l > ((w/2)-(elw/2)) && l < ((w/2)+(elw/2))){l=l-((elw+20)/2);}
else if(l+elw > w){l=l-(elw+20);}
$('#dataInfoLink').css({'top':t+'px','left':l+'px'});
}
function jsonLink(json){
var entry=json.feed.entry[0];
var ti=entry.media$thumbnail.url;
ti=ti.replace("1.bp", "4.bp").replace("s72-c", "s300");
infoLinkImg.push(ti);
var tx=entry.summary.$t;
if(tx.length > 100){tx=tx.slice(0, 100) + '...';}
infoLinkDesc.push(tx);
var tz=entry.title.$t;
infoLinkTitle.push(tz);
}
function cflInfoLink(){
$(elmCflInfoLink).mouseleave(function(){$('#dataInfoLink').hide();});
var tmpElm='<div id="dataInfoLink" style="top:-500px;left:-500px;"><div class="imgInfo"><img/></div><div class="titleInfo"></div><div class="descInfo"></div></div>';
$('body').append(tmpElm);
for(var i=0;i<$(elmCflInfoLink).length;i++){
var t=$(elmCflInfoLink).eq(i).attr('href').toLowerCase();
var s=t.substring(t.lastIndexOf('/')+1,t.lastIndexOf('.'));
$.ajax({url: 'https://'+window.location.hostname+'/feeds/posts/summary?q='+s+'&max-results=1&alt=json-in-script&callback=jsonLink',dataType: 'script',error: function (){console.log("Error JSON Codeflare InfoLink");}});
$(elmCflInfoLink).eq(i).attr({'onmouseover':'getInfoLink('+i+')','onmousemove':'moveInfoLink(event)'});
}}cflInfoLink();
