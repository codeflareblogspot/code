/*Main Code CodeFlare SafeLink*/
/*Write HTML Code Element*/
var tmpCountDownSafelink='';
/*Countdown Element*/
tmpCountDownSafelink+='<div id="countdown" style="display:none;">';
tmpCountDownSafelink+='<div class="countdown">';
tmpCountDownSafelink+='<div class="countdown__colored-blocks">';
tmpCountDownSafelink+='<div class="countdown__colored-blocks-rotater">';
tmpCountDownSafelink+='<div class="countdown__colored-block"></div>';
tmpCountDownSafelink+='<div class="countdown__colored-block"></div>';
tmpCountDownSafelink+='<div class="countdown__colored-block"></div></div>';
tmpCountDownSafelink+='<div class="countdown__colored-blocks-inner"></div>';
tmpCountDownSafelink+='<div class="countdown__text">20</div></div>';
tmpCountDownSafelink+='<div class="countdown__inner">';
tmpCountDownSafelink+='<div id="countdown__progressBar"><div id="progressBar"></div></div>';
tmpCountDownSafelink+='</div></div></div>';
/*Initialize reCaptcha and Download Button Element*/
tmpCountDownSafelink+='<div id="activeCFSafeLink" style="display:none;">';
tmpCountDownSafelink+='<div class="cfsafelinktext"><i class="fa fa-wifi" aria-hidden="true" style="color: #0061a7;"></i> Please wait ! preparing safe connection</div>';
/*reCaptcha Element*/
tmpCountDownSafelink+='<div class="g-recaptcha" data-sitekey='+sflCaptchaKey+' data-callback="recaptcha_callback" data-expired-callback="recaptcha_expired" data-error-callback="recaptcha_expired"></div>';
/*Download Button Element*/
tmpCountDownSafelink+='<div><button id="cfsafelinkicon" class="cfsafelink cfsafelinkicon"><i class="fa fa-download" aria-hidden="true"></i></button><button id="cfsafelinkbtn" class="cfsafelink cfsdisable" disabled>Download</button></div></div>';
$('body').append(tmpCountDownSafelink);
/*Initialize Variabel*/
var sflSetConnection=new Array();
var sflrandarray=new Array();
var sfllength=0;
var sflflag;
var downloadStartTimer;
var urlTargetSafeLink;
function safelinkBoxGetFocus(elm,timer,delay){
var $elm=$(elm);
$('html, body').stop().delay(delay).animate({'scrollTop':$elm.offset().top},timer,'swing',function(){window.location.hash = elm;});
return false;}
/*Defined Function reCaptcha Expired Code*/
function recaptcha_expired(){
safelinkBoxGetFocus('#activeCFSafeLink',900,0);
$(".cfsafelinktext").html('<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color: #efff00;"></i> Your re-captcha has expired, please verify again !');
$('#cfsafelinkicon,#cfsafelinkbtn').prop({'title':'Please use re-captcha first !','disabled':true});
$('#cfsafelinkicon,#cfsafelinkbtn').attr({'onclick':'alert("Please use re-captcha first !")'});
$('.cfsafelink').removeClass("cfsenable");
$('.cfsafelink').addClass("cfsdisable");}
/*Defined Function reCaptcha Callback Code*/
function recaptcha_callback(){
$(".cfsafelinktext").html('<i class="fa fa-check-square" aria-hidden="true" style="color: #1bff00;"></i> Your Download Link is Ready !');
$('#cfsafelinkicon,#cfsafelinkbtn').prop({'disabled':false,'title':''});
if(urlTargetSafeLink.match("http://")||urlTargetSafeLink.match("https://")||urlTargetSafeLink.match("www.")){
$('#cfsafelinkicon,#cfsafelinkbtn').attr({'onclick':"window.open('"+urlTargetSafeLink+"','_blank');clearAllSafelink();"});
tmpUrlDownloadLinkError=urlTargetSafeLink;
}else{
$('#cfsafelinkicon,#cfsafelinkbtn').attr({'onclick':"window.open('"+window.atob(urlTargetSafeLink)+"','_blank');clearAllSafelink();"});
tmpUrlDownloadLinkError=window.atob(urlTargetSafeLink);
}
$('.cfsafelink').removeClass("cfsdisable");
$('.cfsafelink').addClass("cfsenable");}
var tmpUrlDownloadLinkError="";
function clearAllSafelink(){
$('#activeCFSafeLink').remove();
var b = Math.floor(Math.random()*sflnumofpost);
var a = isFacebookApp();
if(!a){window.location.replace(sflSetConnection[b]);}
else{
if($(window).width()<500){
var tmp='<div class="alertUrlDownloadLinkError"  style="width:100%;box-sizing:border-box;background:#0083da;color:#fff;padding:5px;text-align:center;position:fixed;top:10%;left:0;">Please use chrome browser to download !<br><br>Click copy link button<br>to try copy download link<br><br><input id="tmpUrlDownloadLinkError" type="text" value="'+sflSetConnection[b]+'#sfl='+window.btoa(tmpUrlDownloadLinkError)+'" style="width:99%;box-sizing:border-box;padding:5px;color:#000;background:#fff;"/><br><br><button onclick="btnCopyUrlDLink()">Copy Link</button></div>';
}else{
var tmp='<div class="alertUrlDownloadLinkError"  style="width:400px;box-sizing:border-box;background:#0083da;color:#fff;border-radius:5px;padding:5px;text-align:center;position:fixed;top:30%;left:calc(50% - 200px);">Please use chrome browser to download !<br><br>Click copy link button<br>to try copy download link<br><br><input id="tmpUrlDownloadLinkError" type="text" value="'+sflSetConnection[b]+'#sfl='+window.btoa(tmpUrlDownloadLinkError)+'" style="width:99%;box-sizing:border-box;padding:5px;color:#000;background:#fff;"/><br><br><button onclick="btnCopyUrlDLink()">Copy Link</button></div>';
}
$('body').append(tmp);
}}
function btnCopyUrlDLink(){
$('#tmpUrlDownloadLinkError').focus();
$('#tmpUrlDownloadLinkError').select();
$('#tmpUrlDownloadLinkError').setSelectionRange(0, 99999);
try { 
var successful = document.execCommand('copy');  
var msg = successful ? 'successful' : 'unsuccessful';  
alert('Copy download link was ' + msg);  
}catch(err){  
alert('Oops, unable to copy');  
}}
function isFacebookApp() {
var ua = navigator.userAgent || navigator.vendor || window.opera;
return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1) || (ua.indexOf('Instagram') > -1);
}
/*Defined Function Countdown*/
function downloadTimer(){
if(timeleft <= 0){
clearInterval(downloadStartTimer);
$("#activeCFSafeLink").insertBefore($(sflElmReady));
$("#countdown").hide("blind",{},1000,function(){$(this).remove();});
$(".cfsafelinktext").html('<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color: #efff00;"></i> Please use re-captcha first !');
$('#cfsafelinkicon,#cfsafelinkbtn').prop('title', 'Please use re-captcha first !');
$(".g-recaptcha").show("blind");
safelinkBoxGetFocus('#activeCFSafeLink',5000,1000);}
$("#progressBar").css({"width":200-((timeleft/20)*200)+"px"});
$(".countdown__text").html(timeleft);
timeleft -= 1;}
$(window).blur(function(){if(timeleft<=0){return;}else{clearInterval(downloadStartTimer);downloadStartTimer="";}});
$(window).focus(function(){if(timeleft>0){downloadStartTimer=setInterval(downloadTimer,1000);}});
function setElmSafeLink(){
$(".g-recaptcha").hide();
$('#cfsafelinkicon,#cfsafelinkbtn').prop('title', 'Please wait... !');
if($(sflElmBefore).length>0){
$("#countdown").insertBefore($(sflElmBefore));
$("#activeCFSafeLink").insertAfter($(sflElmAfter));
}else{
$("#countdown").insertBefore($(sflElmBeforeAlt));
$("#activeCFSafeLink").insertAfter($(sflElmAfterAlt));}
downloadStartTimer=setInterval(downloadTimer,1000);
safelinkBoxGetFocus('#countdown',900,0);
$("#btnLoadSafelinkElm").hide();
}
/*Defined Function SafeLink Button*/
function setBtnSafeLink(){
var a = $(".btn-safelink");
if(!a){return;}
var dlink = new Array();
var slink = new Array();
for(var i=0;i<a.length;i++){
dlink[i] = a[i].getAttribute("href");
if($(".btn-safelink").eq(i).is("[data-sfl]")&&a[i].getAttribute("data-sfl").length>0){slink[i] = a[i].getAttribute("data-sfl");}else{slink[i]="";}}
for(var i=0;i<a.length;i++){
var b = Math.floor(Math.random()*sflnumofpost);
if(sflSetConnection[b]!=''){
if(slink[i].length>0&&slink[i].match(sflIdentifier)){
a[i].setAttribute('onclick',"window.open('"+sflSetConnection[b]+slink[i]+"')");
}else{
if(slink[i].length>0){
a[i].setAttribute('onclick',"window.open('"+sflSetConnection[b]+sflIdentifier+slink[i]+"')");
}else{
if(dlink[i].match(sflIdentifier)){
a[i].setAttribute('onclick',"window.open('"+dlink[i]+"')");
}else{
a[i].setAttribute('onclick',"window.open('"+sflSetConnection[b]+sflIdentifier+dlink[i]+"')");
}}}}else{
if(dlink[i].match(sflIdentifier)){
a[i].setAttribute('onclick',"window.open('"+dlink[i]+slink[i]+"')");
}else{
a[i].setAttribute('onclick',"window.open('"+document.location.href+sflIdentifier+dlink[i]+slink[i]+"')");
}}
a[i].setAttribute('href','javascript:{}');
a[i].removeAttribute('data-sfl');
}}
/*Defined Function Random SafeLink if Domain use Blogspot*/
function sflrandomposts(json){
var total = parseInt(json.feed.openSearch$totalResults.$t,10);
for(var i=0;i < sflnumofpost;){
sflflag=0;sflrandarray.length=sflnumofpost;sfllength=Math.floor(Math.random()*total);
for(j in sflrandarray){if(sfllength==sflrandarray[j]){sflflag=1;}}
if(sflflag==0&&sfllength!=0){sflrandarray[i++]=sfllength;}}
for(n in sflrandarray){
var p=sflrandarray[n];
var entry=json.feed.entry[p-1];
for(k=0; k < entry.link.length; k++){
if(entry.link[k].rel=='alternate'){sflSetConnection[n]=entry.link[k].href;}}}
setBtnSafeLink();
}
/*Defined Function for Initialize*/
function initSafelinkCode(){
var str=decodeURIComponent(document.location.href);
/*Check if Domain use Blogspot Platform if true then call rss JSON Script*/
if($(".btn-safelink").length>0||typeof getRandomUrlLink !== "undefined"||str.match(sflIdentifier)){
if(sflJsonUrl == ""){
$.ajax({url: "feeds/posts/default?alt=json-in-script&start-index=1&max-results=1000&callback=sflrandomposts",dataType: "script",error: function (){console.log("Error JSON | "+this.url);}});
}else{
$.ajax({url: sflJsonUrl+"&callback=sflrandomposts",dataType: "script",error: function (){console.log("Error JSON | "+this.url);}});
}}
if(str.match(sflIdentifier)){
$("#countdown,#activeCFSafeLink").show();
/*reCaptcha Script*/
$.ajax({url: "https://www.google.com/recaptcha/api.js",dataType: "script"});
urlTargetSafeLink=str.substring(str.lastIndexOf(str.match(sflIdentifier))+sflIdentifier.length,str.length);
setElmSafeLink();
}else{$("#countdown,#activeCFSafeLink").remove();}}
initSafelinkCode();
