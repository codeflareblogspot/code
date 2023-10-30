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
var tmp1;var tmp2;
var n=0;var entry=json.feed.entry;
for(var j=0;j < $(elmCflInfoLink).length;j++){
var key=$(elmCflInfoLink).eq(j).attr('href').toLowerCase();console.log('key : '+key);
tmp1=key;
for(var i=0;i < entry.length;i++){
var se=entry[i].link[4].href;se=se.toLowerCase();console.log('se : '+se);
tmp2=se;
if(key.match(se)){n=i;console.log('n : '+n);break;}else{n=i};
}
}
entry=json.feed.entry[n];
var ti=entry.media$thumbnail.url;
ti=ti.replace("1.bp", "4.bp").replace("s72-c", "s300");
if(tmp1==tmp2){infoLinkImg.push(ti);}else{infoLinkImg.push('error');}
var tx=entry.summary.$t;
if(tx.length > 100){tx=tx.slice(0, 100) + '...';}
if(tmp1==tmp2){infoLinkDesc.push(tx);}else{infoLinkDesc.push('error');}
var tz=entry.title.$t;
if(tmp1==tmp2){infoLinkTitle.push(tz);}else{infoLinkTitle.push('error');}
}
function cflInfoLink(){
$(elmCflInfoLink).mouseleave(function(){$('#dataInfoLink').hide();});
var tmpElm='<div id="dataInfoLink" style="top:-500px;left:-500px;"><div class="imgInfo"><img/></div><div class="titleInfo"></div><div class="descInfo"></div></div>';
$('body').append(tmpElm);
for(var i=0;i<$(elmCflInfoLink).length;i++){
var t=$(elmCflInfoLink).eq(i).attr('href').toLowerCase();
var s=t.substring(t.lastIndexOf('/')+1,t.lastIndexOf('.'));
$.ajax({url: 'https://'+window.location.hostname+'/feeds/posts/summary?q='+s+'&alt=json-in-script&callback=jsonLink',dataType: 'script',error: function (){console.log("Error JSON Codeflare InfoLink");}});
$(elmCflInfoLink).eq(i).attr({'onmouseover':'getInfoLink('+i+')','onmousemove':'moveInfoLink(event)'});
}}cflInfoLink();
