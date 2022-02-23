/******************************************/
/** Kotak Download Dengan Counter        **/
/** Created : (c)2019 CodeFlare Blogspot **/
/** Last Update : 01-04-2020             **/
/** URL : https://codeflare.blogspot.com **/
/******************************************/
//<![CDATA[
function setDlBoxCounter(){
var tmpDlBoxCounter='';
var a = document.getElementsByClassName('dlcounterbox');
var dlink = new Array;
var shareURL=window.location.href;
shareURL=shareURL.substring(0,shareURL.indexOf('.html')+5);
shareURL=encodeURI(shareURL);
var DefaultWave;
if(reportLinkURL==""||reportLinkURL=="undefined"||reportLinkURL==null){reportLinkURL="/p/contact.html"}
for(var i = 0; i < a.length; i++){
dlink[i] = a[i].getAttribute("href");
if($(a[i]).attr('data-color')==""||$(a[i]).attr('data-color')=="undefined"||$(a[i]).attr('data-color')==null){
DefaultWave="rgba(242,193,78,.7)";
}else{
var colAttr=$(a[i]).attr('data-color');
colAttr = colAttr.substring(colAttr.indexOf(',#')+1,colAttr.indexOf(',#')+8);
try{colAttr=hexToRgbADlBox(colAttr);}catch(err){alert("Download Box "+(i+1)+" Error on : "+err.message);}
var regex = /rgba?(\(([\d\s]+,?){3})(,[\d\s.]+)?(?=\))/;
var replace1 = 'rgba$1,0.7';
var p1=colAttr.replace(regex,replace1);
DefaultWave=p1;
}
tmpDlBoxCounter +='<div id="boxDlWrapper'+i+'" class="boxDlWrapper">';
tmpDlBoxCounter +='<div class="boxDlButton-wrapper">';
tmpDlBoxCounter +='<button onclick="generateDlBox('+i+')" id="btnx'+i+'" data-href="'+dlink[i]+'" class="btn-boxdlcounter"><i class="fa fa-cloud-download" aria-hidden="true"></i> download</button>';
tmpDlBoxCounter +='<button id="downloadx'+i+'" onclick="download_myfile('+i+')" style="display:none;" class="btn-boxdlcounter"><i class="fa fa-cloud-download" aria-hidden="true"></i> download Ulang</button>';
tmpDlBoxCounter +='</div><div id="boxDlDescription'+i+'" class="boxDlDescription">';
tmpDlBoxCounter +='<table border="0"><tr><td data-content="tdfirst">';
tmpDlBoxCounter +='<i class="fa fa-file" aria-hidden="true"></i> File Name</td>';
tmpDlBoxCounter +='<td width="5px">:</td><td><span class="file-name">'+a[i].getAttribute("data-name")+'</span></td>';
tmpDlBoxCounter +='</tr><tr><td><i class="fa fa-folder" aria-hidden="true"></i> File Type</td><td>:</td>';
tmpDlBoxCounter +='<td><span class="file-type">'+a[i].getAttribute("data-ext")+'</span></td>';
tmpDlBoxCounter +='</tr><tr><td><i class="fa fa-download" aria-hidden="true"></i> File Size</td><td>:</td><td><span class="file-size">'+a[i].getAttribute("data-size")+'</span></td></tr>';
tmpDlBoxCounter +='<tr><td><i class="fa fa-lock" aria-hidden="true"></i> Password</td><td>:</td><td><span class="file-protection">'+a[i].getAttribute("data-protection")+'</span></td></tr>';
tmpDlBoxCounter +='</table></div><center><div id="inside-ads'+i+'" class="inside-ads">';
tmpDlBoxCounter +='Iklan 468x60 px';
tmpDlBoxCounter +='</div></center><div id="bottomReportLink'+i+'" class="bottomReportLink">';
tmpDlBoxCounter +='<div><button onclick="window.open(\''+reportLinkURL+'\',\'blank\')" target="blank"><i class="fa fa-heartbeat" aria-hidden="true"></i> Report broken link</button></div>';
tmpDlBoxCounter +='<div><button onclick="" target="blank" title="Lit a Fire by CodeFlare"><i class="fa fa-fire" aria-hidden="true"></i> Lit a fire</button></div>';
tmpDlBoxCounter +='</div><div id="bottomDlBox'+i+'" class="bottomDlBox">';
tmpDlBoxCounter +='<svg class="wave-animation" preserveAspectRatio="none" viewBox="0 24 150 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
tmpDlBoxCounter +='<defs><path d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" id="gentle-wave"></path></defs>';
tmpDlBoxCounter +='<g class="wave-bg"><use fill="'+DefaultWave+'" x="50" xlink:href="#gentle-wave" y="0"></use>';
tmpDlBoxCounter +='<use fill="'+DefaultWave+'" x="50" xlink:href="#gentle-wave" y="3"></use><use fill="#fff" x="50" xlink:href="#gentle-wave" y="6"></use>';
tmpDlBoxCounter +='</g></svg></div></div>';
$(a[i]).before(tmpDlBoxCounter);
$('.inside-ads:eq('+i+')').html($(a[i]).html());
if($(a[i]).attr('data-color')==""||$(a[i]).attr('data-color')=="undefined"||$(a[i]).attr('data-color')==null){
$('#bottomDlBox'+i).css('background','linear-gradient(-50deg,#f2c14e,#f78154)');
$('#btnx'+i).css({'background':'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)'});
$('#boxDlDescription'+i+' i,#bottomReportLink'+i+' div:nth-child(1) button').css('color','#f78154');
$('#inside-ads'+i).css('border','1px #d35400 solid');
}
else{
$('#bottomDlBox'+i).css('background',$(a[i]).attr('data-color'));
$('#btnx'+i).css({'background':$(a[i]).attr('data-color')});
colAttr=$(a[i]).attr('data-color');
colAttr = colAttr.substring(colAttr.lastIndexOf(',#')+1,colAttr.lastIndexOf(',#')+8);
$('#boxDlDescription'+i+' i,#bottomReportLink'+i+' div:nth-child(1) button').css('color',colAttr);
$('#inside-ads'+i).css('border','1px solid '+colAttr);
}
$('#bottomReportLink'+i+' div:nth-child(2) button').css('opacity','0');
$('#bottomReportLink'+i+' div:nth-child(2) button').hover(function() {
$(this).css({"opacity":"1","color":"red"});
},function(){
$(this).css("opacity", "0");
});
$('#btnx'+i).css({
'-webkit-animation': 'rainbow 18s ease infinite',
'-z-animation': 'rainbow 18s ease infinite',
'-o-animation': 'rainbow 18s ease infinite',
'animation': 'rainbow 18s ease infinite',
'background-size': '1800% 1800%',
});
$('#bottomReportLink'+i+' div:nth-child(2) button').attr('onclick','window.open("https://codeflare.blogspot.com","blank")');
$("#btnxShareFb"+i).attr({"href":"https://www.facebook.com/sharer/sharer.php?u="+shareURL+"&quote=#Download file: "+a[i].getAttribute("data-name"),"title":"Share this on"});
$("#btnxShareTw"+i).attr({"href":"http://twitter.com/intent/tweet?via=codeflare1&text=Download file: "+a[i].getAttribute("data-name")+" on "+shareURL,"title":"Tweet this on"});
$("#btnxShareLd"+i).attr({"href":"https://www.linkedin.com/sharing/share-offsite/?url="+shareURL,"title":"Link this on"});
$("#btnxShareWa"+i).attr({"href":"https://api.whatsapp.com/send?phone=&text=#Download file: "+a[i].getAttribute("data-name")+" on "+shareURL,"title":"Send this on"});
tmpDlBoxCounter='';
$(a[i]).empty().hide();}}
function hexToRgbADlBox(hex){
var c;
if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
c= hex.substring(1).split('');
if(c.length== 3){
c= [c[0], c[0], c[1], c[1], c[2], c[2]];
}
c= '0x'+c.join('');
return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
}
throw new Error('Bad Hex Color Code');
}
var chkBtnDlBox=false;
var btnTimerBtnDlBox=null;
var btnTimerBtnBoxId="";
var btnElmBtnBoxTmp=null;
function generateDlBox(x){
if(chkBtnDlBox==true){
clearInterval(btnTimerBtnDlBox);
$("#linkTimerActive").remove();
document.getElementById("btnx"+btnTimerBtnBoxId).style.display="";
}
var l=10;
var n=document.getElementById("downloadx"+x);
var a=document.getElementById("btnx"+x).getAttribute("data-href");
document.getElementById("btnx"+x).style.display="none";
btnTimerBtnBoxId=x;
d=document.createElement("div");
d.style.padding="10px 0";
d.style.background="#d35400";
d.style.borderRadius="5px 5px 0 0";
d.style.color="#fff";
d.id="linkTimerActive";
n.parentNode.appendChild(d,n);
chkBtnDlBox=true;
btnTimerBtnDlBox=setInterval(function(){--l<1?(
clearInterval(btnTimerBtnDlBox),
$('#btnLinkGoActive').css({'display':''}),
$('#txtTimerActive').css({'display':'none'})
):(d.innerHTML="<div id='txtTimerActive'><i class='fa fa-clock-o' aria-hidden='true'></i> Download link ready in "+l.toString()+" (s)...</div><button id='btnLinkGoActive' onclick='openDlCounterLinkFile(\""+a+"\")' style='display:none;'>OPEN LINK</button>")},1e3)
}
function download_myfile(x){
window.open(document.getElementById("downloadx"+x).getAttribute("data-href"),"_blank")
}
function openDlCounterLinkFile(href){
var useAds='';
if (typeof useAdsRedirect === 'undefined' || useAdsRedirect === null || useAdsRedirect === ''){useAds = 'http://adf.ly/822497/';}
else{
if(useAdsRedirect=='false'){useAds='';}else{
var slash = useAdsRedirect.substr(-1);if (slash !== '/'){useAds = useAdsRedirect+'/';}else{useAds = useAdsRedirect;}
}}
if($(window).width() < 500){var a=sflSetConnection[0]+"#sfl="+window.btoa(href);}
else{var a=useAds+href;}
window.open(a,"_blank");
}
$(document).ready(function(){if($('.dlcounterbox')){setDlBoxCounter();}});
if($('.dlcounterbox')){getRandomUrlLink=true;}
//]]>
