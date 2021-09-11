/*!
 * VERSION: 3.0.1
 * DATE: 30-03-2020
 * 
   MultiChat 3D Button Effect for :
   WhatsApp, SMS, Line, Telegram, Telegram Share, Twitter DM
   Twitter Share, Facebook Messanger, Facebook Share,WeChat, Instagram, TikTok
   Tumblr Share, Snapchat
 *
 * Website : https://codeflare.blogspot.com
 **/
var chkBrowserCM,chkBrowserCMVer,elmBtnForBrowser;
var useEncrypted=true;
var side6ImgCube,side5ImgCube,side4ImgCube,side3ImgCube,side2ImgCube,side1ImgCube;

function detectBrowser(){
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;
/* In Opera, the true version is after "Opera" or after "Version" */
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
browserName = "Opera";
fullVersion = nAgt.substring(verOffset+6);
if ((verOffset=nAgt.indexOf("Version"))!=-1) 
fullVersion = nAgt.substring(verOffset+8);
}
/* In MSIE, the true version is after "MSIE" in userAgent */
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
browserName = "Microsoft Internet Explorer";
fullVersion = nAgt.substring(verOffset+5);
}
/* In Chrome, the true version is after "Chrome" */
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
browserName = "Chrome";
fullVersion = nAgt.substring(verOffset+7);
}
/* In Safari, the true version is after "Safari" or after "Version" */
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
browserName = "Safari";
fullVersion = nAgt.substring(verOffset+7);
if ((verOffset=nAgt.indexOf("Version"))!=-1) 
fullVersion = nAgt.substring(verOffset+8);
}
/* In Firefox, the true version is after "Firefox" */
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
browserName = "Firefox";
fullVersion = nAgt.substring(verOffset+8);
}
/* In most other browsers, "name/version" is at the end of userAgent */
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) )
{
browserName = nAgt.substring(nameOffset,verOffset);
fullVersion = nAgt.substring(verOffset+1);
if (browserName.toLowerCase()==browserName.toUpperCase()) {
browserName = navigator.appName;
}
}
/* trim the fullVersion string at semicolon/space if present */
if ((ix=fullVersion.indexOf(";"))!=-1)
fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(" "))!=-1)
fullVersion=fullVersion.substring(0,ix);
majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
fullVersion  = ''+parseFloat(navigator.appVersion); 
majorVersion = parseInt(navigator.appVersion,10);
}
chkBrowserCM=browserName;
chkBrowserCMVer=fullVersion;
}
detectBrowser();
function animTopLeft(){
elmBtnForBrowser.show().animate({
top:multiChatPosValV+"px", 
left:multiChatPosValH+"px",	  
opacity:"0.5"				  
},500,function() {elmBtnForBrowser.animate({
top:endBtnMtcVal+"px",     
opacity:"1"},				  
1000);});
}
function animTopRight(){
elmBtnForBrowser.show().animate({
top:multiChatPosValV+"px", 
right:multiChatPosValH+"px",	  
opacity:"0.5"				  
},500,function() {elmBtnForBrowser.animate({
top:endBtnMtcVal+"px",     
opacity:"1"},				  
1000);});
}
function animBottomLeft(){
elmBtnForBrowser.show().animate({
bottom:multiChatPosValV+"px", 
left:multiChatPosValH+"px",	  
opacity:"0.5"				  
},500,function() {elmBtnForBrowser.animate({
bottom:endBtnMtcVal+"px",     
opacity:"1"},				  
1000);});
}
function animBottomRight(){
elmBtnForBrowser.show().animate({
bottom:multiChatPosValV+"px", 
right:multiChatPosValH+"px",	  
opacity:"0.5"				  
},500,function() {elmBtnForBrowser.animate({
bottom:endBtnMtcVal+"px",     
opacity:"1"},				  
1000);});
}

var dualScreenLeft3DBtnLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
var dualScreenTop3DBtnLeft = window.screenTop != undefined ? window.screenTop : window.screenY;

function animTopCenter(){
var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
var leftW = ((width / 2) - (multiChatBtnWidth / 2)) + dualScreenLeft3DBtnLeft;
var topH = ((height / 2) - (multiChatBtnHeight / 2)) + dualScreenTop3DBtnLeft;
elmBtnForBrowser.show().animate({
top:multiChatPosValV+"px",
left:leftW+"px",
opacity:"0.5"
},500,function() {elmBtnForBrowser.animate({
top:endBtnMtcVal+"px",
opacity:"1"},
1000);});
}
function animBottomCenter(){
var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
var leftW = ((width / 2) - (multiChatBtnWidth / 2)) + dualScreenLeft3DBtnLeft;
var topH = ((height / 2) - (multiChatBtnHeight / 2)) + dualScreenTop3DBtnLeft;
elmBtnForBrowser.show().animate({
bottom:multiChatPosValV+"px",
left:leftW+"px",
opacity:"0.5"
},500,function() {elmBtnForBrowser.animate({
bottom:endBtnMtcVal+"px",     
opacity:"1"},				  
1000);});
}

function cubeBoxHover(){
$(".multichat-btn .cf-front").css({
"-webkit-transform":"translateZ(50px)",
"-moz-transform":"translateZ(50px)",
"-o-transform":"translateZ(50px)",
"-ms-transform":"translateZ(50px)",
"transform":"translateZ(50px)"
});
$(".multichat-btn .cf-back").css({
"-webkit-transform":"translateZ(-50px) rotateY(180deg)",
"-moz-transform":"translateZ(-50px) rotateY(180deg)",
"-o-transform":"translateZ(-50px) rotateY(180deg)",
"-ms-transform":"translateZ(-50px) rotateY(180deg)",
"transform":"translateZ(-50px) rotateY(180deg)"
});
$(".multichat-btn .cf-right").css({
"-webkit-transform":"rotateY(-270deg) translateZ(25px) translateX(25px)",
"-moz-transform":"rotateY(-270deg) translateZ(25px) translateX(25px)",
"-o-transform":"rotateY(-270deg) translateZ(25px) translateX(25px)",
"-ms-transform":"rotateY(-270deg) translateZ(25px) translateX(25px)",
"transform":"rotateY(-270deg) translateZ(25px) translateX(25px)"
});
$(".multichat-btn .cf-left").css({
"-webkit-transform":"rotateY(270deg) translateZ(25px) translateX(-25px)",
"-moz-transform":"rotateY(270deg) translateZ(25px) translateX(-25px)",
"-o-transform":"rotateY(270deg) translateZ(25px) translateX(-25px)",
"-ms-transform":"rotateY(270deg) translateZ(25px) translateX(-25px)",
"transform":"rotateY(270deg) translateZ(25px) translateX(-25px)"
});
$(".multichat-btn .cf-top").css({
"-webkit-transform":"rotateX(-270deg) translateZ(25px) translateY(-25px)",
"-moz-transform":"rotateX(-270deg) translateZ(25px) translateY(-25px)",
"-o-transform":"rotateX(-270deg) translateZ(25px) translateY(-25px)",
"-ms-transform":"rotateX(-270deg) translateZ(25px) translateY(-25px)",
"transform":"rotateX(-270deg) translateZ(25px) translateY(-25px)"
});
$(".multichat-btn .cf-bottom").css({
"-webkit-transform":"rotateX(270deg) translateZ(25px) translateY(25px)",
"-moz-transform":"rotateX(270deg) translateZ(25px) translateY(25px)",
"-o-transform":"rotateX(270deg) translateZ(25px) translateY(25px)",
"-ms-transform":"rotateX(270deg) translateZ(25px) translateY(25px)",
"transform":"rotateX(270deg) translateZ(25px) translateY(25px)"
});
}
function cubeBoxOut(){
$(".multichat-btn .cf-front").css({
"-webkit-transform":"translateZ(25px)",
"-moz-transform":"translateZ(25px)",
"-o-transform":"translateZ(25px)",
"-ms-transform":"translateZ(25px)",
"transform":"translateZ(25px)"
});
$(".multichat-btn .cf-back").css({
"-webkit-transform":"translateZ(-25px) rotateY(180deg)",
"-moz-transform":"translateZ(-25px) rotateY(180deg)",
"-o-transform":"translateZ(-25px) rotateY(180deg)",
"-ms-transform":"translateZ(-25px) rotateY(180deg)",
"transform":"translateZ(-25px) rotateY(180deg)"
});
$(".multichat-btn .cf-right").css({
"-webkit-transform": "rotateY(-270deg) translateX(25px)",
"-webkit-transform-origin": "top right",
"-moz-transform": "rotateY(-270deg) translateX(25px)",
"-moz-transform-origin": "top right",
"-o-transform": "rotateY(-270deg) translateX(25px)",
"-o-transform-origin": "top right",
"-ms-transform": "rotateY(-270deg) translateX(25px)",
"-ms-transform-origin": "top right",
"transform": "rotateY(-270deg) translateX(25px)",
"transform-origin": "top right"
});
$(".multichat-btn .cf-left").css({
"-webkit-transform": "rotateY(270deg) translateX(-25px)",
"-webkit-transform-origin": "center left",
"-moz-transform": "rotateY(270deg) translateX(-25px)",
"-moz-transform-origin": "center left",
"-o-transform": "rotateY(270deg) translateX(-25px)",
"-o-transform-origin": "center left",
"-ms-transform": "rotateY(270deg) translateX(-25px)",
"-ms-transform-origin": "center left",
"transform": "rotateY(270deg) translateX(-25px)",
"transform-origin": "center left"
});
$(".multichat-btn .cf-top").css({
"-webkit-transform": "rotateX(-270deg) translateY(-25px)",
"-webkit-transform-origin": "top center",
"-moz-transform": "rotateX(-270deg) translateY(-25px)",
"-moz-transform-origin": "top center",
"-o-transform": "rotateX(-270deg) translateY(-25px)",
"-o-transform-origin": "top center",
"-ms-transform": "rotateX(-270deg) translateY(-25px)",
"-ms-transform-origin": "top center",
"transform": "rotateX(-270deg) translateY(-25px)",
"transform-origin": "top center"
});
$(".multichat-btn .cf-bottom").css({
"-webkit-transform": "rotateX(270deg) translateY(25px)",
"-webkit-transform-origin": "bottom center",
"-moz-transform": "rotateX(270deg) translateY(25px)",
"-moz-transform-origin": "bottom center",
"-o-transform": "rotateX(270deg) translateY(25px)",
"-o-transform-origin": "bottom center",
"-ms-transform": "rotateX(270deg) translateY(25px)",
"-ms-transform-origin": "bottom center",
"transform": "rotateX(270deg) translateY(25px)",
"transform-origin": "bottom center"
});
}
function chgBG(){
var a=appsChat.options[appsChat.selectedIndex].value;var b;
if(a=="wa"){b="#25d366";}if(a=="bbm"){b="#000";}if(a=="sms"){b="orange";}if(a=="line"){b="#25d366";}
if(a=="tele"){b="#32afed";}if(a=="twdm"){b="#1da1f2";}if(a=="twshare"){b="#1da1f2";}if(a=="twitch"){b="#333";}
if(a=="fb"){b="#4267b2";}if(a=="wechat"){b="#10d11e";}if(a=="ingram"){b="#d33395";}
if(a=="tiktok"){b="#2c5558";}if(a=="skype"){b="#009fee";}
$("#appsChat,#btnSubmitChat").css("background-color",b);
}
function setAnimationCubeButtonPosition(){
if(multiChatBtnPosV.toLowerCase()=="top" && multiChatBtnPosH.toLowerCase()=="left"){animTopLeft();}
if(multiChatBtnPosV.toLowerCase()=="top" && multiChatBtnPosH.toLowerCase()=="right"){animTopRight();}
if(multiChatBtnPosV.toLowerCase()=="bottom" && multiChatBtnPosH.toLowerCase()=="left"){animBottomLeft();}
if(multiChatBtnPosV.toLowerCase()=="bottom" && multiChatBtnPosH.toLowerCase()=="right"){animBottomRight();}
if(multiChatBtnPosV.toLowerCase()=="top" && multiChatBtnPosH.toLowerCase()=="center"){animTopCenter();}
if(multiChatBtnPosV.toLowerCase()=="bottom" && multiChatBtnPosH.toLowerCase()=="center"){animBottomCenter();}
}
function initBtnChatOlder(){
$('.whatsapp-btn').css({"width" : multiChatBtnWidth+"px","height" : multiChatBtnHeight+"px"});
$('.whatsapp-btn').click(function(){ $('#whatsapp').toggleClass('toggle');});
$(".whatsapp-btn,.cf-cube").attr("title",btnTitleChat);
setAnimationCubeButtonPosition();
}
function initBtnChat(){
//$('.multichat-btn').css({"width" : multiChatBtnWidth+"px","height" : multiChatBtnHeight+"px"});
//$('.multichat-btn').attr("onmouseover","cubeBoxHover()");
$('#closeAppsChat').attr("onclick","$('#whatsapp').removeClass('toggle');cubeBoxOut();");
$('.cf-cube').click(function(){
$('#whatsapp').toggleClass('toggle');
if($('#whatsapp').hasClass('toggle')==true){cubeBoxHover();}else{cubeBoxOut();}
});
$(".cf-cube").attr("title",btnTitleChat);
setAnimationCubeButtonPosition();
}
function initCallMltChat(){
$('#whatsapp .submit').click(WhatsApp);
$("#whatsapp input, #whatsapp textarea").keypress(function() {if(event.which == 13) WhatsApp();});
if(chkBrowserCM.toLowerCase()=="microsoft internet explorer" && Math.round(parseInt(chkBrowserCMVer))==10){
elmBtnForBrowser=$("#box");
if(typeof jQuery == "undefined"){window.onload=chgBG();setTimeout(initIE10,3000);}
else{$(document).ready(function(){chgBG();setTimeout(initIE10,3000);});}
}
else if(chkBrowserCM.toLowerCase()=="firefox" && parseInt(chkBrowserCMVer) >= 50){
elmBtnForBrowser=$(".multichat-btn");
if(typeof jQuery == "undefined"){window.onload=chgBG();setTimeout(initBtnChat,3000);}
else{$(document).ready(function(){chgBG();setTimeout(initBtnChat,3000);});}
}
else if(chkBrowserCM.toLowerCase()=="chrome" && parseInt(chkBrowserCMVer) >= 50){
elmBtnForBrowser=$(".multichat-btn");
if(typeof jQuery == "undefined"){window.onload=chgBG();setTimeout(initBtnChat,3000);}
else{$(document).ready(function(){chgBG();setTimeout(initBtnChat,3000);});}
}
else if(chkBrowserCM.toLowerCase()=="opera" && parseInt(chkBrowserCMVer) >= 50){
elmBtnForBrowser=$(".multichat-btn");
if(typeof jQuery == "undefined"){window.onload=chgBG();setTimeout(initBtnChat,3000);}
else{$(document).ready(function(){chgBG();setTimeout(initBtnChat,3000);});}
}
else if(chkBrowserCM.toLowerCase()=="safari" && parseInt(chkBrowserCMVer) >= 10){
elmBtnForBrowser=$(".multichat-btn");
if(typeof jQuery == "undefined"){window.onload=chgBG();setTimeout(initBtnChat,3000);}
else{$(document).ready(function(){chgBG();setTimeout(initBtnChat,3000);});}
}
else{
elmBtnForBrowser=$(".whatsapp-btn");
if(typeof jQuery == "undefined"){window.onload=chgBG();setTimeout(initBtnChatOlder,3000);}
else{$(document).ready(function(){chgBG();setTimeout(initBtnChatOlder,3000);});}
}
}
function WhatsApp() {
var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var ph = '';
if ($('#whatsapp .nama').val() == '') { /* Cek Nama */
ph = $('#whatsapp .nama').attr('placeholder');
alert('Please write ' + ph);
$('#whatsapp .nama').focus();
return false;
} else if ($('#whatsapp .email').val() == '') { /* Cek Email */
ph = $('#whatsapp .email').attr('placeholder');
alert('Please write ' + ph);
$('#whatsapp .email').focus();
return false;
} else if (reg.test($('#whatsapp .email').val()) == false) { /* Cek Validasi Email */
alert('Email address is not valid');
$('#whatsapp .email').focus();
return false;
} else if ($('#whatsapp .pesan').val() == '') { /* Cek Pesan */
ph = $('#whatsapp .pesan').attr('placeholder');
alert('Please write ' + ph);
$('#whatsapp .pesan').focus();
return false;
} else {doesConnectionExist();}
}
var navUserAgentBrowser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var urlRefererCube = window.location.href;
function chatTelegram(e){
if(navUserAgentBrowser){
var a = 'tg://resolve?domain='+ Base64.decode(dGVsZWdyYW1Vc2Vy);
}else{
var a = 'https://telegram.me/'+ Base64.decode(dGVsZWdyYW1Vc2Vy);
}
checkChatBrowser(a,800,600);
}
function sendSMSChat(e){
var a = "sms:+" + Base64.decode(c21zVXNlck51bWJlcg) + "?body=" + e + urlRefererCube;
checkChatBrowser(a,500,500);
}
function chatWithLine(e){
var a = "http://line.me/ti/p/~"+ Base64.decode(bGluZVVzZXI) + "&share?url=" + escape(urlRefererCube) + "&" + e;
checkChatBrowser(a,500,500);
}
function chatWithTwitch(e){
var a = 'https://www.twitch.tv/'+Base64.decode(dHdpdGNoVXNlcg)+'?'+e+ escape(urlRefererCube);
checkChatBrowser(a,800,600);
}
function chatWithFB(e){
var a = 'https://m.me/'+Base64.decode(ZmJtZXNzYW5nZXI);
checkChatBrowser(a,800,600);
}
function chatWithWC(e){
if(navUserAgentBrowser){
var a = 'weixin://contacts/profile/'+Base64.decode(d2VjaGF0VXNlcg)+'&text='+e+escape(urlRefererCube);
}else{
var a = 'https://web.wechat.com/profile/'+Base64.decode(d2VjaGF0VXNlcg)+'&text='+e+escape(urlRefererCube);
}
checkChatBrowser(a,800,600);
}
function chatWithWA(e){
var addText2 = window.location.href;
if(navUserAgentBrowser){
var a = 'whatsapp://send?phone='+Base64.decode(d2FVc2VyTnVtYmVy)+'&text='+e+escape(urlRefererCube);
}else{
var a = 'https://web.whatsapp.com/send?phone='+Base64.decode(d2FVc2VyTnVtYmVy)+'&text='+e+escape(urlRefererCube);
}
checkChatBrowser(a,800,600);
}
function chatWithIngram(e){
var a = 'https://www.instagram.com/'+Base64.decode(SW5zdGFncmFt);
checkChatBrowser(a,800,600);
}
function chatWithTiktok(e){
if(navUserAgentBrowser){
var a = 'tiktok://@'+Base64.decode(d2FVc2VyTnVtYmVy)+'&text='+e+escape(urlRefererCube);
}else{
var a = 'https://www.tiktok.com/@'+Base64.decode(d2FVc2VyTnVtYmVy)+'&text='+e+escape(urlRefererCube);
}
checkChatBrowser(a,800,600);
}
function chatWithTwitter(e){
var a = "https://twitter.com/messages/compose?recipient_id="+Base64.decode(dHdpdHRlclVzZXI)+'&text='+e+"%0A"+escape(urlRefererCube);
checkChatBrowser(a,600,400);
}
function shareToTwitter(e){
var a = "https://twitter.com/intent/tweet?text="+e+"%0A@"+Base64.decode(VHdpdHRlciBTaGFyZQ)+"%0A"+escape(urlRefererCube);
checkChatBrowser(a,600,400);
}
function chatWithSkype(e){
var a = "skype:"+Base64.decode(dXNlclNreXBl)+'?chat='+e+"%0A"+escape(urlRefererCube);
checkChatBrowser(a,600,400);
}

function checkChatBrowser(e,w,h){
var chkAgent=navigator.userAgent.toLowerCase();
var isChkMobile = window.innerWidth < 500 || chkAgent.indexOf('android')!=-1 || chkAgent.indexOf('mobile')!=-1 ||
chkAgent.indexOf('iphone')!=-1 || chkAgent.indexOf('ipod')!=-1 || chkAgent.indexOf('blackberry')!=-1 ||
chkAgent.indexOf('windows phone')!=-1 || chkAgent.indexOf('zunewp7')!=-1 && chkAgent.indexOf('tablet')==-1 &&
chkAgent.indexOf('playbook')==-1 && chkAgent.indexOf('webos')==-1 && chkAgent.indexOf('ipad')==-1;
if(isChkMobile==true){
var a = appsChat.options[appsChat.selectedIndex].value;
if(a=="sms"){location.replace(e);}else{window.open(e,'_blank');}
} else {
if(appsChat.options[appsChat.selectedIndex].value=="sms"){alert('Only for mobile device !');return;}
else{openChatWindow(e, "CodeFlare MultiChat", w, h);} 
}}
function openChatWindow(url, title, w, h) {
var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
var left = ((width / 2) - (w / 2)) + dualScreenLeft3DBtnLeft;
var top = ((height / 2) - (h / 2)) + dualScreenTop3DBtnLeft;
var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ',resizable=no,scrollbars=no,menubar=no,toolbar=no,status=no,location=no');
/* Fokus pada jendela popup */
if (window.focus) {newWindow.focus();}}
var _0x6471=["\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F\x3D","","\x6C\x65\x6E\x67\x74\x68","\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74","\x63\x68\x61\x72\x41\x74","\x5F\x6B\x65\x79\x53\x74\x72","\x72\x65\x70\x6C\x61\x63\x65","\x69\x6E\x64\x65\x78\x4F\x66","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x0A"];var Base64={_keyStr:_0x6471[0],encode:function(_0x2116x2){var _0x2116x3,_0x2116x4,_0x2116x5,_0x2116x6,_0x2116x7,_0x2116x8,_0x2116x9,_0x2116xa=_0x6471[1],_0x2116xb=0;for(_0x2116x2= Base64._utf8_encode(_0x2116x2);_0x2116xb< _0x2116x2[_0x6471[2]];){_0x2116x6= (_0x2116x3= _0x2116x2[_0x6471[3]](_0x2116xb++))>> 2,_0x2116x7= (3& _0x2116x3)<< 4| (_0x2116x4= _0x2116x2[_0x6471[3]](_0x2116xb++))>> 4,_0x2116x8= (15& _0x2116x4)<< 2| (_0x2116x5= _0x2116x2[_0x6471[3]](_0x2116xb++))>> 6,_0x2116x9= 63& _0x2116x5,isNaN(_0x2116x4)?_0x2116x8= _0x2116x9= 64:isNaN(_0x2116x5)&& (_0x2116x9= 64),_0x2116xa= _0x2116xa+ this[_0x6471[5]][_0x6471[4]](_0x2116x6)+ this[_0x6471[5]][_0x6471[4]](_0x2116x7)+ this[_0x6471[5]][_0x6471[4]](_0x2116x8)+ this[_0x6471[5]][_0x6471[4]](_0x2116x9)};return _0x2116xa},decode:function(_0x2116x2){var _0x2116x3,_0x2116x4,_0x2116x5,_0x2116x6,_0x2116x7,_0x2116x8,_0x2116x9=_0x6471[1],_0x2116xa=0;for(_0x2116x2= _0x2116x2[_0x6471[6]](/[^A-Za-z0-9\+\/\=]/g,_0x6471[1]);_0x2116xa< _0x2116x2[_0x6471[2]];){_0x2116x3= this[_0x6471[5]][_0x6471[7]](_0x2116x2[_0x6471[4]](_0x2116xa++))<< 2| (_0x2116x6= this[_0x6471[5]][_0x6471[7]](_0x2116x2[_0x6471[4]](_0x2116xa++)))>> 4,_0x2116x4= (15& _0x2116x6)<< 4| (_0x2116x7= this[_0x6471[5]][_0x6471[7]](_0x2116x2[_0x6471[4]](_0x2116xa++)))>> 2,_0x2116x5= (3& _0x2116x7)<< 6| (_0x2116x8= this[_0x6471[5]][_0x6471[7]](_0x2116x2[_0x6471[4]](_0x2116xa++))),_0x2116x9+= String[_0x6471[8]](_0x2116x3),64!= _0x2116x7&& (_0x2116x9+= String[_0x6471[8]](_0x2116x4)),64!= _0x2116x8&& (_0x2116x9+= String[_0x6471[8]](_0x2116x5))};return _0x2116x9= Base64._utf8_decode(_0x2116x9)},_utf8_encode:function(_0x2116x2){_0x2116x2= _0x2116x2[_0x6471[6]](/\r\n/g,_0x6471[9]);for(var _0x2116x3=_0x6471[1],_0x2116x4=0;_0x2116x4< _0x2116x2[_0x6471[2]];_0x2116x4++){var _0x2116x5=_0x2116x2[_0x6471[3]](_0x2116x4);_0x2116x5< 128?_0x2116x3+= String[_0x6471[8]](_0x2116x5):(127< _0x2116x5&& _0x2116x5< 2048?_0x2116x3+= String[_0x6471[8]](_0x2116x5>> 6| 192):(_0x2116x3+= String[_0x6471[8]](_0x2116x5>> 12| 224),_0x2116x3+= String[_0x6471[8]](_0x2116x5>> 6& 63| 128)),_0x2116x3+= String[_0x6471[8]](63& _0x2116x5| 128))};return _0x2116x3},_utf8_decode:function(_0x2116x2){for(var _0x2116x3=_0x6471[1],_0x2116x4=0,_0x2116x5=c1= c2= 0;_0x2116x4< _0x2116x2[_0x6471[2]];){(_0x2116x5= _0x2116x2[_0x6471[3]](_0x2116x4))< 128?(_0x2116x3+= String[_0x6471[8]](_0x2116x5),_0x2116x4++):191< _0x2116x5&& _0x2116x5< 224?(c2= _0x2116x2[_0x6471[3]](_0x2116x4+ 1),_0x2116x3+= String[_0x6471[8]]((31& _0x2116x5)<< 6| 63& c2),_0x2116x4+= 2):(c2= _0x2116x2[_0x6471[3]](_0x2116x4+ 1),c3= _0x2116x2[_0x6471[3]](_0x2116x4+ 2),_0x2116x3+= String[_0x6471[8]]((15& _0x2116x5)<< 12| (63& c2)<< 6| 63& c3),_0x2116x4+= 3)};return _0x2116x3}}
function doesConnectionExist() {
var xhr = new XMLHttpRequest();
var file = "https://2.bp.blogspot.com/-xtmdljRsytk/XEWAyK9TpJI/AAAAAAAAA2g/PCiqI6zbWJIKo0BOZulDJimJe5EtsupmACLcBGAs/s1600/Chat-icon.png";
var randomNum = Math.round(Math.random() * 10000);
xhr.open('HEAD', file + "?rand=" + randomNum, true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);
function processRequest(e) {
if (xhr.readyState == 4) {
if (xhr.status >= 200 && xhr.status < 304) {
var tujuan;
if(useEncrypted==true){
var e=d2FVc2VyTnVtYmVy;
tujuan = Base64.decode(e).substring(1);
}else{tujuan = d2FVc2VyTnVtYmVy.substring(1);}
var nama = $('#whatsapp .nama').val();
var email = $('#whatsapp .email').val();
var pesan = $('#whatsapp .pesan').val();
var telp = $('#whatsapp .telp').val();
var tmpMessageChat = 'Hallo, saya ' + nama + '%0AEmail%3A ' + email + '%0ATelp%3A ' + telp + '%0APesan%3A ' + pesan + '%0Avia%3A ';
switch (appsChat.options[appsChat.selectedIndex].value) {
case "wa": chatWithWA(tmpMessageChat);break;
case "bbm": chatWithBBM(tmpMessageChat);break;
case "sms": sendSMSChat(tmpMessageChat);break;
case "line": chatWithLine('Hallo, saya ' + nama + '%0AEmail%3A ' + email + '%0ATelp%3A ' + telp + '%0APesan%3A ' + pesan);break;
case "tele": chatTelegram(tmpMessageChat);break;
case "twdm": chatWithTwitter('Hallo, saya ' + nama + '%0AEmail%3A ' + email + '%0ATelp%3A ' + telp + '%0APesan%3A ' + pesan);break;
case "twshare": shareToTwitter('Hallo, saya ' + nama + '%0AEmail%3A ' + email + '%0ATelp%3A ' + telp + '%0APesan%3A ' + pesan);break;
case "fb": chatWithFB(tmpMessageChat);break;
case "wechat": chatWithWC(tmpMessageChat);break;
case "twitch": chatWithTwitch(tmpMessageChat);break;
case "ingram": chatWithIngram(tmpMessageChat);break;
case "tiktok": chatWithTiktok(tmpMessageChat);break;
case "skype": chatWithSkype(tmpMessageChat);break;
}}else {alert("No internet connection !");}
}}}
/* CodeFlare.Blogspot.com 2020 */
var durationAnimIE = 6;
var tlMaster = new TimelineMax({paused:true});
function boxHover(){
TweenMax.set(".box > div", {
transformStyle: "preserve-3d",
transformOrigin: "50% 50% -50px",
transformPerspective: 1000
});
}
function boxOut(){
TweenMax.set(".box > div", {
transformStyle: "preserve-3d",
transformOrigin: "50% 50% -25px",
transformPerspective: 1000
});
}
function initIE10(){
$('.box').click(function(){ $('#whatsapp').toggleClass('toggle');});
$('#box,.box').attr("onmouseover","boxHover()");
$('#box').attr("onmouseleave","boxOut()");
$("#box,.box").attr("title",btnTitleChat);
$('#box').css({"width" : multiChatBtnWidth+"px","height" : multiChatBtnHeight+"px"});
$('#box,.box').click(function(){ $('#whatsapp').toggleClass('toggle');});
$("#box,.box").attr("title",btnTitleChat);
if(multiChatBtnPosV.toLowerCase()=="top" && multiChatBtnPosH.toLowerCase()=="left"){animTopLeft();}
if(multiChatBtnPosV.toLowerCase()=="top" && multiChatBtnPosH.toLowerCase()=="right"){animTopRight();}
if(multiChatBtnPosV.toLowerCase()=="bottom" && multiChatBtnPosH.toLowerCase()=="left"){animBottomLeft();}
if(multiChatBtnPosV.toLowerCase()=="bottom" && multiChatBtnPosH.toLowerCase()=="right"){animBottomRight();}
if(multiChatBtnPosV.toLowerCase()=="top" && multiChatBtnPosH.toLowerCase()=="center"){animTopCenter();}
if(multiChatBtnPosV.toLowerCase()=="bottom" && multiChatBtnPosH.toLowerCase()=="center"){animBottomCenter();}
TweenMax.set(".box", {transformStyle: "preserve-3d"});
TweenMax.set(".box > div", {
transformStyle: "preserve-3d",
transformOrigin: "50% 50% -25px",
transformPerspective: 1000
});
TweenMax.set(".back", {rotationY: 180});
TweenMax.set(".right", {rotationY: 270});
TweenMax.set(".left", {rotationY: 90});
TweenMax.set(".top", {rotationX: 90});
TweenMax.set(".bottom", {rotationX: 270});
window.requestAnimationFrame(function(){
tlMaster
.add(facesInner(), 0)
.add(faces(), 0)
.progress(1).progress(0)
.play();
});
}
function facesInner(){
var tlFacesInner = new TimelineMax({repeat: -1});
tlFacesInner
.to(".front", durationAnimIE, {
rotationX: '+=360',
ease: Linear.easeNone
}, 0)
.to(".back", durationAnimIE, {
rotationX: '-=360',
ease: Linear.easeNone
}, 0)
.to(".top", durationAnimIE, {
rotationX: '+=360',
ease: Linear.easeNone
}, 0)
.to(".bottom", durationAnimIE, {
rotationX: '+=360',
ease: Linear.easeNone
}, 0)
.to(".left > div", durationAnimIE, {
rotation: '+=360',
ease: Linear.easeNone
}, 0)
.to(".right > div", durationAnimIE, {
rotation: '-=360',
ease: Linear.easeNone
}, 0);
return tlFacesInner;
}
function faces(){
var tlFaces = new TimelineMax({
repeat: -1
});
tlFaces
.to(".box > div", durationAnimIE, {
rotationY: '-=360',
ease: Linear.easeNone
})
.to(".box > div", durationAnimIE, {
rotation: '-=360',
ease: Linear.easeNone
}, '-='+durationAnimIE)
return tlFaces;
}

window.addEventListener("resize", center3DBtn);
function center3DBtn() {
if(multiChatBtnPosH=="center"){
var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
var leftW = ((width / 2) - (multiChatBtnWidth / 2)) + dualScreenLeft3DBtnLeft;
var topH = ((height / 2) - (multiChatBtnHeight / 2)) + dualScreenTop3DBtnLeft;
$(".multichat-btn").css({left: leftW});
}}
/* CodeFlare.Blogspot.com 2020 */