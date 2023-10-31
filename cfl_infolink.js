var infoLinkImg=[];
var infoLinkTitle=[];
var infoLinkDesc=[];
var infoLinkUrl=[];
var countJsonInfoLink=0;
function getInfoLink(data){
$('#dataInfoLink').hide();
$('.imgInfo img').attr('src',infoLinkImg[data]);
$('.titleInfo').html(infoLinkTitle[data]);
$('.descInfo').html(infoLinkDesc[data]);
if(infoLinkImg[data]!=''){moveInfoLink(event);$('#dataInfoLink').show();}
}
function moveInfoLink(event){
var w = document.querySelector(elmCflBoundary).offsetWidth;
var h = window.innerHeight || html.clientHeight  || body.clientHeight  || screen.availHeight;
var elw = document.querySelector('#dataInfoLink').offsetWidth;
var elh = document.querySelector('#dataInfoLink').offsetHeight;
var l=event.clientX + 10;
var t=event.clientY + 30;
if((t + elh + 30) > h){t=t - elh - 40;}
if(l > ((w/2)-(elw/2)) && l < ((w/2)+(elw/2))){l=l-((elw+20)/2);}
else if(l+elw > w){l=l-(elw+20);}
$('#dataInfoLink').css({'top':t+'px','left':l+'px'});
}

function callJsonFeed(x){
if((infoLinkImg[x]==''||infoLinkImg[x]==undefined||infoLinkImg[x]==null||infoLinkImg[x].length < 0)&& infoLinkUrl[x]!=null){
var path='https://'+window.location.hostname+infoLinkUrl[x];
$.ajax({url: path,dataType: 'script',error: function (){console.log("Error JSON Codeflare InfoLink");}});
countJsonInfoLink=countJsonInfoLink+1;
}else{
countJsonInfoLink=countJsonInfoLink+1;
if(countJsonInfoLink != parseInt($(elmCflInfoLink).length)){callJsonFeed(countJsonInfoLink);}
}}

function jsonLink(json){
var ti='';var tx='';var tz='';var key='no';
var entry=json.feed.entry;
var co=0;
$(elmCflInfoLink).each(function() {
if(infoLinkImg[co]==''||infoLinkImg[co]==undefined||infoLinkImg[co]==null||infoLinkImg[co].length < 0){key=this.href.toLowerCase();}
for(var i=0;i < entry.length;i++){
var se=entry[i].link[4].href.toLowerCase();
if(key==se){
ti=entry[i].media$thumbnail.url;
ti=ti.replace("1.bp", "4.bp").replace("s72-c", "s300");
tx=entry[i].summary.$t;
if(tx.length > 100){tx=tx.slice(0, 100) + '...';}
tz=entry[i].title.$t;
infoLinkImg[co]=(ti);
infoLinkDesc[co]=(tx);
infoLinkTitle[co]=(tz);
}}
co++;
});
if(countJsonInfoLink != parseInt($(elmCflInfoLink).length)){
callJsonFeed(countJsonInfoLink);
}}

function cflInfoLink(){
$(elmCflInfoLink).mouseleave(function(){$('#dataInfoLink').hide();});
var tmpElm='<div id="dataInfoLink" style="top:-500px;left:-500px;"><div class="imgInfo"><img/></div><div class="titleInfo"></div><div class="descInfo"></div></div>';
$('body').append(tmpElm);
var co=0;
$(elmCflInfoLink).each(function() {
var t1=this.href.toLowerCase();
var t2=t1.split( '/' );var m=parseInt(t2[3]);var d=t2[4];
var mt = /^\d{4}$/.test(m);
let ms = /.html#/.test(t1);
if(typeof m === 'number' && mt == true && ms == false){
infoLinkUrl[i]='/feeds/posts/summary?published-min='+m+'-'+d+'-01T00:00:00&published-max='+m+'-'+d+'-31T23:59:59&max-result=150&alt=json-in-script&callback=jsonLink';
this.setAttribute('onmouseover','getInfoLink('+co+')');
this.setAttribute('onmousemove','moveInfoLink(event)');
}else{infoLinkUrl[i]=null;}
co++;
});
callJsonFeed(countJsonInfoLink);
}cflInfoLink();
