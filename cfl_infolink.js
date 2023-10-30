var infoLinkImg=[];
var infoLinkTitle=[];
var infoLinkDesc=[];
function getInfoLink(data){
$('#dataInfoLink').hide();
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
var countJsonInfoLink=0;
function jsonLink(json){console.log(json);
var tmp1;var tmp2;
var n;var entry=json.feed.entry;
var key=$(elmCflInfoLink).eq(countJsonInfoLink).attr('href').toLowerCase();
tmp1=key;
for(var i=0;i < entry.length;i++){
var se=entry[i].link[4].href;se=se.toLowerCase();
tmp2=se;n=i;
if(key.match(se)){n=i;console.log(key +' | '+se +' | '+n);break;}
}
var ti=entry[n].media$thumbnail.url;
ti=ti.replace("1.bp", "4.bp").replace("s72-c", "s300");
if(tmp1==tmp2){infoLinkImg.push(ti);}else{infoLinkImg.push('error');}
var tx=entry[n].summary.$t;
if(tx.length > 100){tx=tx.slice(0, 100) + '...';}
if(tmp1==tmp2){infoLinkDesc.push(tx);}else{infoLinkDesc.push('error');}
var tz=entry[n].title.$t;
if(tmp1==tmp2){infoLinkTitle.push(tz);}else{infoLinkTitle.push('error');}
countJsonInfoLink=countJsonInfoLink+1;
}
function cflInfoLink(){
$(elmCflInfoLink).mouseleave(function(){$('#dataInfoLink').hide();});
var tmpElm='<div id="dataInfoLink" style="top:-500px;left:-500px;"><div class="imgInfo"><img/></div><div class="titleInfo"></div><div class="descInfo"></div></div>';
$('body').append(tmpElm);
for(var i=0;i<$(elmCflInfoLink).length;i++){
var t=$(elmCflInfoLink).eq(i).attr('href').toLowerCase();
var parser = document.createElement('a');
parser.href = t;
var s=parser.pathname;
var m=s.substring(0,s.lastIndexOf('/'));m=m.substring(1,m.lastIndexOf('/'));
var d=s.substring(0,s.lastIndexOf('/'));d=d.substring(d.lastIndexOf('/')+1,d.length);
$.ajax({url: 'https://'+window.location.hostname+'/feeds/posts/summary?published-min='+m+'-'+d+'-01T00:00:00&published-max='+m+'-'+d+'-30T23:59:59&alt=json-in-script&callback=jsonLink',dataType: 'script',error: function (){console.log("Error JSON Codeflare InfoLink");}});
$(elmCflInfoLink).eq(i).attr({'onmouseover':'getInfoLink('+i+')','onmousemove':'moveInfoLink(event)'});
}}cflInfoLink();
