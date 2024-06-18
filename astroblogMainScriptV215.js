//<![CDATA[
/* Start Security Function */
var MD5 = function (string){function RotateLeft(lValue,iShiftBits){return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8 = (lX & 0x80000000);lY8 = (lY & 0x80000000);lX4 = (lX & 0x40000000);lY4 = (lY & 0x40000000);lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);if (lX4 & lY4){return (lResult ^ 0x80000000 ^ lX8 ^ lY8);}if (lX4 | lY4){if (lResult & 0x40000000){return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);}else{return (lResult ^ 0x40000000 ^ lX8 ^ lY8);}}else{return (lResult ^ lX8 ^ lY8);}}function F(x,y,z){return (x & y) | ((~x) & z);}function G(x,y,z){return (x & z) | (y & (~z));}function H(x,y,z){return (x ^ y ^ z);}function I(x,y,z){return (y ^ (x | (~z)));}function FF(a,b,c,d,x,s,ac){a = AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};function GG(a,b,c,d,x,s,ac){a = AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};function HH(a,b,c,d,x,s,ac){a = AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};function II(a,b,c,d,x,s,ac){a = AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};function ConvertToWordArray(string){var lWordCount;var lMessageLength = string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;var lNumberOfWords = (lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition = 0;var lByteCount = 0;while ( lByteCount < lMessageLength ){lWordCount = (lByteCount-(lByteCount % 4))/4;lBytePosition = (lByteCount % 4)*8;lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}lWordCount = (lByteCount-(lByteCount % 4))/4;lBytePosition = (lByteCount % 4)*8;lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);lWordArray[lNumberOfWords-2] = lMessageLength<<3;lWordArray[lNumberOfWords-1] = lMessageLength>>>29;return lWordArray;};function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for (lCount = 0;lCount<=3;lCount++){lByte = (lValue>>>(lCount*8)) & 255;WordToHexValue_temp = "0"+lByte.toString(16);WordToHexValue = WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);}return WordToHexValue;};function Utf8Encode(string){string = string.replace(/\r\n/g,"\n");var utftext = "";for (var n = 0;n < string.length;n++){var c = string.charCodeAt(n);if (c < 128){utftext+= String.fromCharCode(c);}else if((c>127) && (c < 2048)){utftext+= String.fromCharCode((c>>6) | 192);utftext+= String.fromCharCode((c & 63) | 128);}else{utftext+= String.fromCharCode((c>>12) | 224);utftext+= String.fromCharCode(((c>>6) & 63) | 128);utftext+= String.fromCharCode((c & 63) | 128);}}return utftext;};var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string = Utf8Encode(string);x = ConvertToWordArray(string);a = 0x67452301;b = 0xEFCDAB89;c = 0x98BADCFE;d = 0x10325476;for (k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD);}var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase();}
/* End Security Function */
</script>

<script>
console.log("codeflare | " + MD5("codeflare"));
console.log("sxript | " + MD5("sxript"));
console.log("sublyric | " + MD5("sublyric"));

console.log("Auth : " + MD5("/E"));
console.log(window.location.host);
</script>

<script>
/* Start Version */
var appCFAstVer='2.8.8';
/* End Version */
/* Start Initial Date Value */
$("#fAstDate,#nowDateAst").datepicker({
changeMonth: true,
changeYear: true,
"showAnim":"slideDown",
dateFormat: 'dd-mm-yy',
yearRange: "1900:+0",
beforeShow: function(){$(".ui-datepicker").css('font-size', 10)},
onSelect: function() {runAstrologi();}
});
var currentDate = new Date();
$("#fAstDate,#nowDateAst").datepicker("setDate",currentDate);
/* Assign Default Value */
$("#fAstDateBio").html($('#fAstDate').datepicker('getDate').getDate()+'-'+($('#fAstDate').datepicker('getDate').getMonth()+1)+'-'+$('#fAstDate').datepicker('getDate').getFullYear());
var weekdayAstroBlog=new Array("Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu");
function getHostName(url){
var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0){
var hostname = match[2].split(".");
return hostname[0];
}else{return window.location.href}}
var astroBlogVer=MD5(getHostName(window.location.href));
/* End Initial Date Value */
/* Start Menu Navigation */
var contentAPN1=0;var contentAPN2=1;var contentAPN3=0;
var contentAPT=new Array();
contentAPT[0]="ASTROLOGI";
contentAPT[1]="BIORITMIK";
contentAPT[2]="ARTI NAMA";
contentAPT[3]="PANDANGAN ISLAM";
contentAPT[4]="WARNA AURA";
contentAPT[5]="ANGKA AJAIB";
var contentAPF=new Array();
contentAPF[0]='<i class="fa fa-cube" aria-hidden="true"></i>';
contentAPF[1]='<i class="fa fa-line-chart" aria-hidden="true"></i>';
contentAPF[2]='<i class="fa fa-user-circle" aria-hidden="true"></i>';
contentAPF[3]='<i class="fa fa-moon-o" aria-hidden="true"></i>';
contentAPF[4]='<i class="fa fa-podcast" aria-hidden="true"></i>';
contentAPF[5]='<i class="fa fa-sun-o" aria-hidden="true"></i>';
var contentAPId=new Array();
contentAPId[0]="fAstrologi";
contentAPId[1]="fBioritmik";
contentAPId[2]="fArtiNama";
contentAPId[3]="fPandanganIslam";
contentAPId[4]="fWarnaAura";
contentAPId[5]="fOrbital";
/* Menu Navigation Function */
function navPageLeft(){
if(contentAPN1 == contentAPT.length-1){contentAPN2=0;}else{contentAPN2=contentAPN1+1;}
$("#"+contentAPId[contentAPN1]).hide("slide",{direction : 'left'}, 500);
$("#titleHeaderAst").hide("slide",{direction : 'left'}, 500,
function (){$("#titleHeaderAst").html(contentAPF[contentAPN2]+' '+contentAPT[contentAPN2]);});
$("#"+contentAPId[contentAPN2]).delay(800).show("slide",{direction : 'right'}, 500,);
$("#titleHeaderAst").delay(300).show("slide",{direction : 'right'}, 500);
contentAPN1=contentAPN2;
}
function navPageRight(){
if(contentAPN1 == 0){contentAPN2=contentAPT.length-1;}else{contentAPN2=contentAPN1-1;}
$("#"+contentAPId[contentAPN1]).hide("slide",{direction : 'right'}, 500);
$("#titleHeaderAst").hide("slide",{direction : 'right'}, 500,
function (){$("#titleHeaderAst").html(contentAPF[contentAPN2]+' '+contentAPT[contentAPN2]);});
$("#"+contentAPId[contentAPN2]).delay(800).show("slide", 500);
$("#titleHeaderAst").delay(300).show("slide", 500);
contentAPN1=contentAPN2;
}
$("#menuHeaderAst").click(function(){$("#contentMenu").toggle("blind")});
$(".cMenuAstList").click(function(){
contentAPN3=((this.id).match(/\d/g))-1;
if(contentAPN1==contentAPN3){
$("#contentMenu").hide("blind");
$('.nav-iconbar').toggleClass('open');
return;
}else{
contentAPN2=contentAPN3;
$("#"+contentAPId[contentAPN1]).hide("slide",{direction : 'right'}, 500);
$("#titleHeaderAst").hide("slide",{direction : 'right'}, 500,
function (){$("#titleHeaderAst").html(contentAPF[contentAPN2]+' '+contentAPT[contentAPN2]);});
$("#"+contentAPId[contentAPN2]).delay(800).show("slide", 500);
$("#titleHeaderAst").delay(300).show("slide", 500);
contentAPN1=contentAPN2;
$("#contentMenu").hide("blind");
$('.nav-iconbar').toggleClass('open');
}});
$("#rightMenuAst").on("click", function(){navPageRight();});
$("#leftMenuAst").on("click", function(){navPageLeft();});
$("#leftDateAst").on("click", function(){
var dateAdd = $('#nowDateAst').datepicker('getDate','-1d'); 
dateAdd.setDate(dateAdd.getDate()-1);
$("#nowDateAst").datepicker("setDate",dateAdd);
calcBiorhythm();
});
$("#rightDateAst").on("click", function(){
var dateAdd = $('#nowDateAst').datepicker('getDate','+1d'); 
dateAdd.setDate(dateAdd.getDate()+1);
$("#nowDateAst").datepicker("setDate",dateAdd); 
calcBiorhythm();
});
$("#btnDetailBioAst").on("click", function(){
$("#"+contentAPId[contentAPN1]).hide("slide",{direction : 'right'}, 500);
$("#titleHeaderAst").hide("slide",{direction : 'right'}, 500,
function (){$("#titleHeaderAst").html('<i class="fa fa-line-chart" aria-hidden="true"></i> BIORITMIK');});
$("#fBioritmik").delay(800).show("slide", 500);
$("#titleHeaderAst").delay(300).show("slide", 500);
contentAPN1=1;
});
/* End Menu Navigation */
/* Start Cookie Time */
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function checkCookie() {
  var username = getCookie("data");
  if (username != "") {
  var ausername=username.substring(0, username.indexOf(":"))
   alert("Data anda untuk nama " + ausername+" sudah tersimpan");
  } else {
    var userID = $('#fAstName').val();
	var userDate = $('#fAstDate').val();
    if (userID != "" && userID != null && userID !="Nama Lengkap") {
      setCookie("data", userID+":"+userDate+":"+contentAPN1, 30);
	  alert("Data setting "+userID+" tersimpan menggunakan browser kuki");
	  $("#fBtnAstSave").css("background","#333");
    }else{alert("Silakan isi nama lengkap anda !\n\nData anda aman karena disimpan pada kuki browser anda.");$("#fAstName").trigger( "focus" );}
  }
}
function deleteCookie(){
var username = getCookie("data");
if (username != "" && username != null && username !="Nama Lengkap") {
document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
alert("Data anda sudah dihapus dari browser kuki");
$("#fBtnAstSave").css("background","#0083da");
}}
function initialSetDateAst() {
var name = "data=";
var str = decodeURIComponent(document.location.href);
var res="";var initialDate=new Array;
if(str.match(name)){
res = str.substring(str.lastIndexOf(str.match(name))+5,str.length);
initialDate=res.split(";");
initialDate[0]=window.atob(initialDate[0]);
initialDate[1]=window.atob(initialDate[1]);
}else{initialDate=getCookie("data").split(":");}
if(initialDate[0]!=""&&initialDate[0]!=null){$("#fAstName").val(initialDate[0]);getArtiNama();}
if(initialDate[1]!=""&&initialDate[1]!=null){$("#fAstDate").datepicker("setDate",initialDate[1]);$("#fBtnAstSave").css("background","#333");}
$(document).ready(function(){
runAstrologi();
if(initialDate[2]!=""&&initialDate[2]!=null&&contentAPN1!=initialDate[2]){
contentAPN2=parseInt(initialDate[2]);
$("#"+contentAPId[contentAPN1]).hide("slide",{direction : 'right'}, 500);
$("#titleHeaderAst").hide("slide",{direction : 'right'}, 500,
function (){$("#titleHeaderAst").html(contentAPF[initialDate[2]]+' '+contentAPT[initialDate[2]]);});
$("#"+contentAPId[contentAPN2]).delay(800).show("slide", 500);
$("#titleHeaderAst").delay(300).show("slide", 500);
contentAPN1=parseInt(contentAPN2);
}
});
}
/* End Cookie Time */
/* Start Button Function */
function enterInputAstName(){
if (event.keyCode === 13) {
event.preventDefault();
runAstrologi();
var username = $('#fAstName').val();
if (username != "" && username != null && username !="Nama Lengkap"){getArtiNama();}
}}
$(document).ready(function(){$('#menuHeaderAst').click(function(){$('.nav-iconbar').toggleClass('open');});});
/*$("#imgOrbital").on("click", function(){window.open('http://planetwatcher.com','_blank');});*/
$("#fBtnAstSubmit").on("click", function(){getBioImage();});
$("#fBtnAstSave").on("click", function(){checkCookie();});
$("#fBtnAstClear").on("click", function(){deleteCookie();});
$("#fBtnAstShare").on("click", function(){
var username = $('#fAstName').val();
if (username != "" && username != null && username !="Nama Lengkap" && username.length != 1) {
var dataAstrologi=(window.location.href)+"#data="+(window.btoa($('#fAstName').val()))+";"+(window.btoa($('#fAstDate').val()))+";"+contentAPN1;
var a = 'ASTROLOGI reading for '+escape($('#fAstName').val())+'%0A%0ADetail Source :%0A'+escape(dataAstrologi)+'%0A%0ASend from :%0A'+escape(window.location.href);
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
var addQuotes = 'whatsapp://send?phone=&text='+a;
}else{
var addQuotes = 'https://web.whatsapp.com/send?phone=&text='+a;
}
chkBrowserAst(addQuotes,800,600);
}else{
alert("Silakan ketik nama anda terlebih dahulu dan pilih tanggal lahir anda !");
$("#fAstName").trigger( "focus" );
}});
function chkBrowserAst(e,w,h){
var chkAgent=navigator.userAgent.toLowerCase();
var isChkMobile = 
window.innerWidth < 500 ||
chkAgent.indexOf('android')!=-1 ||
chkAgent.indexOf('mobile')!=-1 ||
chkAgent.indexOf('iphone')!=-1 ||
chkAgent.indexOf('ipod')!=-1 ||
chkAgent.indexOf('blackberry')!=-1 ||
chkAgent.indexOf('windows phone')!=-1 ||
chkAgent.indexOf('zunewp7')!=-1 && 
chkAgent.indexOf('tablet')==-1 &&
chkAgent.indexOf('playbook')==-1 &&
chkAgent.indexOf('webos')==-1 &&
chkAgent.indexOf('ipad')==-1;
/*if(isChkMobile==true){window.open(e,'_blank');}*/
/*else {openShareAst(e, "CodeFlare | Share Astrology", w, h);}*/
window.open(e,'_blank');
}
function openShareAst(url, title, w, h){ 
var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
var left = ((width / 2) - (w / 2)) + dualScreenLeft;
var top = ((height / 2) - (h / 2)) + dualScreenTop;
var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ',resizable=no,scrollbars=no,menubar=no,toolbar=no,status=no,location=no');
/* Fokus pada jendela popup */
if (window.focus) {newWindow.focus();}}
/* End Button Function */
/* Start Bioritmik Calculation */
function calcBiorhythm(){
var tmpData = new Array;
var phy=23;var emo=28;var intl=33;var inu=38;var est=43;var awa=48;var spi=53;
var bioDivider=[phy,emo,intl,inu,est,awa,spi];
var sinID=["fBioPhySin","fBioEmoSin","fBioIntSin","fBioInuSin","fBioEstSin","fBioAwaSin","fBioSpiSin","fBioMasSin","fBioPasSin","fBioWisSin","fBioPerSin","fBioPsySin","fBioSucSin"];
var parID=["fBioPhy","fBioEmo","fBioInt","fBioInu","fBioEst","fBioAwa","fBioSpi","fBioMas","fBioPas","fBioWis","fBioPer","fBioPsy","fBioSuc"];
var grpID=["gBioPhy","gBioEmo","gBioInt","gBioInu","gBioEst","gBioAwa","gBioSpi","gBioMas","gBioPas","gBioWis","gBioPer","gBioPsy","gBioSuc"];
var date1=($('#fAstDate').datepicker('getDate').getMonth()+1)+','+$('#fAstDate').datepicker('getDate').getDate()+','+$('#fAstDate').datepicker('getDate').getFullYear();
var dateNow=$('#nowDateAst').datepicker('getDate');
var date2=dateNow.getFullYear()+'-'+(dateNow.getMonth()+1)+'-'+dateNow.getDate();
var DateDiff = {
inDays: function(d1, d2) {
var t2 = d2.getTime();
var t1 = d1.getTime();
return parseInt((t2-t1)/(24*3600*1000));
},
inWeeks: function(d1, d2) {
var t2 = d2.getTime();
var t1 = d1.getTime();
return parseInt((t2-t1)/(24*3600*1000*7));
},
inMonths: function(d1, d2) {
var d1Y = d1.getFullYear();
var d2Y = d2.getFullYear();
var d1M = d1.getMonth();
var d2M = d2.getMonth();
return (d2M+12*d2Y)-(d1M+12*d1Y);
},
inYears: function(d1, d2) {
return d2.getFullYear()-d1.getFullYear();
}
}
var d1 = new Date(date1);
var d2 = new Date(date2);
$("#fAstDateBio").html($('#fAstDate').datepicker('getDate').getDate()+'-'+($('#fAstDate').datepicker('getDate').getMonth()+1)+'-'+$('#fAstDate').datepicker('getDate').getFullYear());
astroBlogVer.substring(0,astroBlogVer.indexOf("."));
if(astroBlogUserID==MD5(getHostName(window.location.href))&&astroBlogVer==astroBlogUserID){$('#fAstDays').html(DateDiff.inDays(d1, d2)+" Hari");}else{return;}
/* Bioritmik Calculation */
var timeDifferenceInDays=DateDiff.inDays(d1, d2);
for(var i=0;i<bioDivider.length;i++){
var bcalc = (Math.floor(timeDifferenceInDays/bioDivider[i]));
bcalc=bcalc*bioDivider[i];
bcalc=timeDifferenceInDays-bcalc;
bcalc=Math.sin(bcalc*(2*Math.PI/bioDivider[i]));
tmpData[i]=bcalc;
}
tmpData.push((tmpData[0]+tmpData[2])/2,(tmpData[0]+tmpData[1])/2,(tmpData[1]+tmpData[2])/2,(tmpData[0]+tmpData[3])/2,(tmpData[1]+tmpData[3])/2,(tmpData[2]+tmpData[3])/2);
for(var i=0;i<tmpData.length;i++){
tmpData[i]=Math.round(tmpData[i]*100);
$('#'+sinID[i]).html(tmpData[i]+'%');
tmpData[i]=50+Math.floor(tmpData[i]/2);
$('#'+parID[i]).html(tmpData[i]+'%');
$('#'+grpID[i]).css("width",Math.abs(tmpData[i])+'%');
if(tmpData[i]<=101){$('#'+grpID[i]).css("background","green");}
if(tmpData[i]<=60){$('#'+grpID[i]).css("background","orange");}
if(tmpData[i]<=40){$('#'+grpID[i]).css("background","red");}
}
var sumData=0;
for(var i=0;i<tmpData.length;i++){sumData+=tmpData[i];}
if(Math.round(sumData/tmpData.length)<=101){$('#gBioAverage').css("background","green");}
if(Math.round(sumData/tmpData.length)<=60){$('#gBioAverage').css("background","orange");}
if(Math.round(sumData/tmpData.length)<=40){$('#gBioAverage').css("background","red");}
$('#gBioAverage').css("width",Math.round(sumData/tmpData.length)+'%');
$('#fAstBio').html(Math.round(sumData/tmpData.length)+'%');
}
function drawCanvasBioGraph(){
var c1 = document.getElementById("Biorhythm1");
var ctx1 = c1.getContext("2d");
ctx1.canvas.width=$("#Biorhythm1").parent().width();
ctx1.canvas.height=$("#Biorhythm1").parent().height();
ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height);
var c2 = document.getElementById("Biorhythm2");
var ctx2 = c2.getContext("2d");
ctx2.canvas.width=$("#Biorhythm2").parent().width();
ctx2.canvas.height=$("#Biorhythm2").parent().height();
ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
drawInitialGraph(ctx1.canvas.width,ctx1.canvas.height/2,28);
}
function drawInitialGraph(w,h,d){
for(var j=1;j<3;j++){
var c = document.getElementById("Biorhythm"+j);
var ctx = c.getContext("2d");
var wi=(w/d);
ctx.beginPath();
ctx.strokeStyle = "#0083da";
ctx.lineWidth = 1;
ctx.moveTo(0,h);
ctx.lineTo(w,h);
ctx.moveTo(w/2,0);
ctx.lineTo(w/2,h*2);
ctx.stroke();
ctx.font = "10px Tahoma";
ctx.fillStyle = "#fff";
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
ctx.fillText("+100", w-30, 10);
ctx.fillText("-100", w-26, (h*2)-1);
ctx.fillText("- "+d/2+" day", 5, (h)-5);
ctx.fillText("+ "+d/2+" day", w-45, (h)-5);
var dx1 = new Date();
dx1.setDate(dx1.getDate() - (d/2));
ctx.fillText(dx1.getDate()+"/"+months[dx1.getMonth()]+"/"+dx1.getFullYear(), 5, (h)+15);
var dx2 = new Date();
var txt2=dx2.getDate()+"/"+months[dx2.getMonth()]+"/"+dx2.getFullYear();
ctx.fillText(txt2, (w/2)-(ctx.measureText(txt2).width/2), (h)+15);
var dx3 = new Date();
dx3.setDate(dx3.getDate() + (d/2));
var txt3=dx3.getDate()+"/"+months[dx3.getMonth()]+"/"+dx3.getFullYear();
ctx.fillText(txt3, (w-5-ctx.measureText(txt3).width), (h)+15);
ctx.beginPath();
for(var i=0;i<d;i++){
ctx.moveTo(i*(wi),h-2);
ctx.lineTo(i*(wi),h+2);
}
for(var i=0;i<h*2;i++){
i=i+(h*2/7);
ctx.moveTo((w/2)-2,i);
ctx.lineTo((w/2)+2,i);
}
ctx.stroke();
}}
function drawSine(d,d2,r,cl,id){
var c = document.getElementById(id);
var ctx = c.getContext("2d");
var w=c.width;
var h=c.height/2;
var wi=(w/d);
var q1=0;
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = cl;
for(var i=0;i<w+wi;i++){
var d3 = new Date();
if(i < (w/2)){
d3.setDate(d3.getDate() - (Math.floor(d/2) - ((i/w)*d)));}else{d3.setDate(d3.getDate() + ((i/w)*(d)) - Math.floor(d/2));}
var diffTime = Math.abs(d3 - d2);
var diff = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
var calc = Math.sin(diff * 2 * Math.PI / r) * 100;
var y = h - (calc * h * (w/100) / w);
ctx.lineTo(i,y);
if(q1==(d/2)){
ctx.fillStyle = "#0083da";
if(y<10){ctx.fillText(calc.toFixed(), (w/2)+5, 10);}
else if(y>(h*2)-5){ctx.fillText(calc.toFixed(), (w/2)+5, (h*2)-5);}
else{ctx.fillText(calc.toFixed(), (w/2)+5, y);}
if(r==28){$("#bioEmoStat").html(calc.toFixed()+"%");}
if(r==23){$("#bioPhyStat").html(calc.toFixed()+"%");}
if(r==33){$("#bioIntStat").html(calc.toFixed()+"%");}
}
i=i+Math.floor(w/(d));
q1=q1+1;
}
ctx.stroke();
}
function drawSine2(d,d2,r0,r1,cl,id){
var c = document.getElementById(id);
var ctx = c.getContext("2d");
var w=c.width;
var h=c.height/2;
var wi=(w/d);
var q1=0;
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = cl;
for(var i=0;i<w+wi;i++){
var d3 = new Date();
if(i < (w/2)){
d3.setDate(d3.getDate() - (Math.floor(d/2) - ((i/w)*d)));}else{d3.setDate(d3.getDate() + ((i/w)*(d)) - Math.floor(d/2));}
var diffTime = Math.abs(d3 - d2);
var diff = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
var calc0 = Math.sin(diff * 2 * Math.PI / r0) * 100;
var calc1 = Math.sin(diff * 2 * Math.PI / r1) * 100;
var calc = (calc0+calc1)/2;
var y = h - (calc * h * (w/100) / w);
ctx.lineTo(i,y);
if(q1==(d/2)){
ctx.fillStyle = "#0083da";
if(y<10){ctx.fillText(calc.toFixed(), (w/2)+5, 10);}
else if(y>(h*2)-5){ctx.fillText(calc.toFixed(), (w/2)+5, (h*2)-5);}
else{ctx.fillText(calc.toFixed(), (w/2)+5, y);}
if(r0==23&&r1==33){$("#bioMasStat").html(calc.toFixed()+"%");}
if(r0==23&&r1==28){$("#bioPasStat").html(calc.toFixed()+"%");}
if(r0==28&&r1==33){$("#bioWisStat").html(calc.toFixed()+"%");}
}
i=i+Math.floor(w/(d));
q1=q1+1;
}
ctx.stroke();
}
function startDrawSine(){
var dateNow=$('#fAstDate').datepicker('getDate');
if($('#bioEmoCb').is(":checked")==true){drawSine(28,dateNow,28,"red","Biorhythm1");};
if($('#bioPhyCb').is(":checked")==true){drawSine(28,dateNow,23,"green","Biorhythm1");}
if($('#bioIntCb').is(":checked")==true){drawSine(28,dateNow,33,"#37c6fd","Biorhythm1");}
if($('#bioMasCb').is(":checked")==true){drawSine2(28,dateNow,23,33,"#ff20ff","Biorhythm2");}
if($('#bioPasCb').is(":checked")==true){drawSine2(28,dateNow,23,28,"#ffff20","Biorhythm2");}
if($('#bioWisCb').is(":checked")==true){drawSine2(28,dateNow,28,33,"#20ffff","Biorhythm2");}
}
function startCbDrawSine(){
drawCanvasBioGraph();
startDrawSine();
}
/* End Bioritmik Calculation */
/* Start Primbon Javanese Reading */
function getNeptuAst(data){
var pDateAry=new Array();
var pMonthAry=new Array();
var pYearAry=new Array();
var neptuAry=new Array();
var pDate1,pDate2,pDate3,pMonth1,pMonth2,pMonth3,pYear1,pYear2,pYear3,pYear4,pYear5;
var neptu1,neptu2,neptu3,neptu4,neptu5;
strDate=String(data.getDate());
strMonth=String(data.getMonth()+1);
strYear=String(data.getFullYear());
for (i = 0; i < strDate.length; i++){pDateAry[i]=strDate[i];}
pDate1 = pDateAry[0];
if (strDate.length > 1){pDate2=pDateAry[1];}
else{pDate2=0}
pDate3=parseInt(pDate1)+parseInt(pDate2);
for (i = 0; i < strMonth.length; i++){pMonthAry[i]=strMonth[i];}
pMonth1 = pMonthAry[0];
if (strMonth.length > 1){pMonth2=pMonthAry[1];}
else{pMonth2=0}
pMonth3=parseInt(pMonth1)+parseInt(pMonth2);
for (i = 0; i < strYear.length; i++){pYearAry[i]=strYear[i];}
pYear1 = pYearAry[0];
pYear2 = pYearAry[1];
pYear3 = pYearAry[2];
pYear4 = pYearAry[3];
pYear5=parseInt(pYear1)+parseInt(pYear2)+parseInt(pYear3)+parseInt(pYear4);
neptu1=parseInt(pDate3)+parseInt(pMonth3)+parseInt(pYear5);
neptu1=neptu1.toString();
for (i = 0; i < neptu1.length; i++){neptuAry[i]=neptu1[i];}
neptu2 = neptuAry[0];
if (neptuAry.length > 1){neptu3=neptuAry[1];}
else{neptu3=0;}
neptu4=parseInt(neptu2)+parseInt(neptu3);
if (neptu4 > 9) {neptu4=neptu4.toString();
for (i = 0; i < neptu4.length; i++){neptuAry[i]=neptu4[i];}
neptu2 = neptuAry[0];
if (neptuAry.length > 1){neptu3=neptuAry[1];}
else{neptu3=0;}
neptu5=parseInt(neptu2)+parseInt(neptu3);
neptu4=neptu5;
}
if(astroBlogUserID==MD5(getHostName(window.location.href))&&astroBlogVer==astroBlogUserID){}else{alert("Maaf penggunaan widget ini tidak terdaftar !");}
return neptu4;
}
function readDataPrimbon(){
/*Primbon Reading*/
var dataNeptuAst=getNeptuAst($('#fAstDate').datepicker('getDate'));
var strNeptu = new Array();
strNeptu[0]="Inilah potensi keberuntungan Anda, yang dihitung berdasarkan numerologi Jawa sejak tanggal lahir :";
strNeptu[1]="Keberuntungan selalu menyinari hari-hari Anda ketika Anda tidak berharap atau berharap. Biasanya tepat saat Anda membutuhkannya. Namun, Anda tidak pernah terlalu bergantung padanya. Inilah sebabnya mengapa keberuntungan selalu bersamamu ...";
strNeptu[2]="Anda cenderung berpikir semua orang lebih beruntung daripada Anda, tetapi ... jika Anda mendapatkan berkah dan dukungan dari orang lain, hampir tidak ada yang tidak dapat Anda lakukan.";
strNeptu[3]="Anda mungkin makmur di semua bidang kehidupan Anda, jika Anda ingin bertahan cukup lama di satu bidang dan mencoba menyelesaikannya. Ini adalah satu-satunya cara untuk mendapatkan peluang paling menguntungkan Anda.";
strNeptu[4]="Anda percaya, setiap orang memiliki kekayaannya sendiri, tetapi Anda adalah orang pertama yang menyadari bahwa keberuntungan akan datang kepada Anda. Keberuntungan juga bisa terjadi dalam bentuk hubungan cinta, terutama dalam hubungan cinta yang begitu.";
strNeptu[5]="Keberuntungan pintu untuk cinta sejati dan karier yang baik akan terbuka untuk Anda jika Anda mengurangi dan berhenti berusaha terlalu keras untuk menyenangkan semua teman Anda.";
strNeptu[6]="Anda mungkin tidak merasa beruntung dalam hubungan cinta, tetapi Anda cukup beruntung dikelilingi oleh orang-orang yang mencintai Anda.";
strNeptu[7]="Keberuntungan memainkan peran dalam keajaiban kecil yang Anda alami. Terutama dalam hal cinta dan keuangan. Anda akan menemukan waktu untuk menindaklanjuti rapat.";
strNeptu[8]="Hanya jika Anda membuat keputusan dengan hati dan otak, keberuntungan akan datang kepada Anda dalam bentuk karier dan uang.";
strNeptu[9]="Lady Luck selalu ramah kepada Anda, memberi Anda kekuatan untuk menarik hampir semua orang yang Anda inginkan dalam hidup. Anda beruntung untuk seorang teman yang dekat dengan Anda.";
var strNeptuWeton = new Array();
strNeptuWeton[0]="Anda cukup beruntung, karena anda termasuk orang yang banyak disukai oleh orang lain. Jika ia Pria, ia akan sangat tangguh. Dan jika Wanita, ia dapat menjadi sangat anggun. Ia juga mempunyai rasa tanggung jawab yang tinggi. Disisi lain, anda punya budi pekerti yang halus dan sopan santun. Mau menerima dan suka memberi. Satu kelemahannya, jika mempunyai keinginan sulit untuk ditunda.";
strNeptuWeton[1]="Anda termasuk orang yang berotak, cerdas dan tidak mudah terpengaruh oleh orang lain, suka apa saja yang ia lihat, suka menyendiri. Kekurangannya adalah kurang bisa bergaul dan suka pamrih dalam memberikan bantuan pada orang lain.";
strNeptuWeton[2]="Anda termasuk orang yang cerdas, pandai mencari rejeki dan tidak boros. Berani berkorban, banyak bicara, suka memamerkan harta kekayaan dan yang perlu diingat adalah jika anda marah sangat menakutkan!";
strNeptuWeton[3]="Anda termasuk orang yang memiliki pendirian teguh dan tidak mudah terpengaruh oleh orang lain, tidak banyak bicara namun berhati keras. Sayangnya, dalam beberapa hal sepertinya anda sedikit lemah dalam berpikir.";
strNeptuWeton[4]="Anda termasuk orang yang cerdas, pandai bicara dan pandai dalam mencari rejeki sekalipun anda tidak pandai menyimpan uang (alias boros). Anda termasuk tipe orang yang suka menolong, namun demikian sifat anda yang mudah tersinggung perlu untuk dikendalikan.";
var pN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
var pScL = (((new Date(strYear+','+strMonth+','+strDate).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5);
var nameOfDay = new Date(strYear+','+strMonth+','+strDate);
var nameForDay = weekdayAstroBlog[nameOfDay.getDay()];
if(dataNeptuAst==0){var strNeptuText="Maaf tidak ada data, silakan periksa tanggal lahir anda !";}else{strNeptuText=strNeptu[dataNeptuAst];}
$('#fAstWeton').html(nameForDay+' ['+pN[Math.round(pScL)]+']'+' | Neptu ['+dataNeptuAst+']');
$("#wetonArea").html("Name : "+capital_letter($('#fAstName').val())+"<br>"+"Date of Birth : "+strDate+" - "+strMonth+" - "+strYear+"<br>"+"Neptu : "+dataNeptuAst+"<br><br>"+strNeptu[0]+"<br>"+strNeptuText+"<br><br>Pasaran : "+nameForDay+" ("+pN[Math.round(pScL)]+")<br>"+strNeptuWeton[Math.round(pScL)]);
}
/* End Primbon Javanese Reading */
/* Start Zodiac Reading */
var lunarType,lunarTypeNum;
function getLunar(){
var b1day=$('#fAstDate').datepicker('getDate').getDate();
var b1month=$('#fAstDate').datepicker('getDate').getMonth()+1;
if(b1day>21 && b1day<32){
if(b1month==12){lunarType="Capricorn";}
if(b1month==1){lunarType="Aquarius";}
if(b1month==2){lunarType="Pisces";}
if(b1month==3){lunarType="Aries";}
if(b1month==4){lunarType="Taurus";}
if(b1month==5){lunarType="Gemini";}
if(b1month==6){lunarType="Cancer";}
if(b1month==7){lunarType="Leo";}
if(b1month==8){lunarType="Virgo";}
if(b1month==9){lunarType="Libra";}
if(b1month==10){lunarType="Scorpio";}
if(b1month==11){lunarType="Sagittarius";}
}
if(b1day>0 && b1day<22){
if(b1month==1){lunarType="Capricorn";}
if(b1month==2){lunarType="Aquarius";}
if(b1month==3){lunarType="Pisces";}
if(b1month==4){lunarType="Aries";}
if(b1month==5){lunarType="Taurus";}
if(b1month==6){lunarType="Gemini";}
if(b1month==7){lunarType="Cancer";}
if(b1month==8){lunarType="Leo";}
if(b1month==9){lunarType="Virgo";}
if(b1month==10){lunarType="Libra";}
if(b1month==11){lunarType="Scorpio";}
if(b1month==12){lunarType="Sagittarius";}
}
$('#fAstZodiak').html(lunarType);
/*Get Zodiac Image Type URL*/
var lunarImg="";
if(lunarType=="Capricorn"){lunarTypeNum=0;lunarImg="https://2.bp.blogspot.com/-cYB97SQYq6M/Vka6S-HDbQI/AAAAAAAAAWk/7Fkw8swx3Ys/s1600/Doll%2BZodiac%2BCapricorn.gif"}
if(lunarType=="Aquarius"){lunarTypeNum=1;lunarImg="https://4.bp.blogspot.com/-7k1AuyH1Jdc/Vka6SKNqqpI/AAAAAAAAAWg/wEdg8VKXrXM/s1600/Doll%2BZodiac%2B%2BAquarius.gif"}
if(lunarType=="Pisces"){lunarTypeNum=2;lunarImg="https://2.bp.blogspot.com/-eK7u8sM2iyM/Vka6TyfRyzI/AAAAAAAAAXU/BxC8z7Hc3ic/s1600/Doll%2BZodiac%2BPisces.gif"}
if(lunarType=="Aries"){lunarTypeNum=3;lunarImg="https://4.bp.blogspot.com/-gf9RqE9bUuQ/Vka6SVa3bRI/AAAAAAAAAWc/sgCpRY_C4-8/s1600/Doll%2BZodiac%2BAries.gif"}
if(lunarType=="Taurus"){lunarTypeNum=4;lunarImg="https://4.bp.blogspot.com/-WlQIsamt1cE/Vka6Uq7ek0I/AAAAAAAAAXY/0-tYQMwyShw/s1600/Doll%2BZodiac%2BTaurus.gif"}
if(lunarType=="Gemini"){lunarTypeNum=5;lunarImg="https://4.bp.blogspot.com/-FKC1LSWo7iI/Vka6S-Jn6-I/AAAAAAAAAWo/zj8ixp9wQ6Y/s1600/Doll%2BZodiac%2BGemini.gif"}
if(lunarType=="Cancer"){lunarTypeNum=6;lunarImg="https://3.bp.blogspot.com/-KrO0y0rc0Ng/Vka6SCk-eiI/AAAAAAAAAWY/IPsns0yISVw/s1600/Doll%2BZodiac%2BCancer.gif"}
if(lunarType=="Leo"){lunarTypeNum=7;lunarImg="https://4.bp.blogspot.com/-EEc1BgqgWhY/Vka6TNfIASI/AAAAAAAAAWs/csFvMUciHxc/s1600/Doll%2BZodiac%2BLeo.gif"}
if(lunarType=="Virgo"){lunarTypeNum=8;lunarImg="https://3.bp.blogspot.com/-lS-UAuattUA/Vka6U8zystI/AAAAAAAAAXg/Nx-LDiJN-GE/s1600/Doll%2BZodiac%2BVirgo.gif"}
if(lunarType=="Libra"){lunarTypeNum=9;lunarImg="https://2.bp.blogspot.com/--5tEDVTC0os/Vka6TZpYK2I/AAAAAAAAAW4/E3Wg36pDTtY/s1600/Doll%2BZodiac%2BLibra.gif"}
if(lunarType=="Scorpio"){lunarTypeNum=10;lunarImg="https://4.bp.blogspot.com/-GnBHufemxOk/Vka6UJFEE_I/AAAAAAAAAXM/UMEgQLLmiO0/s1600/Doll%2BZodiac%2BScorpio.gif"}
if(lunarType=="Sagittarius"){lunarTypeNum=11;lunarImg="https://4.bp.blogspot.com/-fLLE-UiX9iU/Vka6T2sQg-I/AAAAAAAAAXI/Eips-CmM1x8/s1600/Doll%2BZodiac%2BSagittarius.gif"}
var lunarUnicode=new Array();
lunarUnicode[0]="&#x2651";
lunarUnicode[1]="&#x2652";
lunarUnicode[2]="&#x2653";
lunarUnicode[3]="&#x2648";
lunarUnicode[4]="&#x2649";
lunarUnicode[5]="&#x264A";
lunarUnicode[6]="&#x264B";
lunarUnicode[7]="&#x264C";
lunarUnicode[8]="&#x264D";
lunarUnicode[9]="&#x264E";
lunarUnicode[10]="&#x264F";
lunarUnicode[11]="&#x2650";

if(astroBlogUserID==MD5(getHostName(window.location.href))&&astroBlogVer==astroBlogUserID){
$('#imgZodiak').html(lunarUnicode[lunarTypeNum]);
$('#lunarSign').attr("src",lunarImg);
}else{return;}
/*Zodiac Reading*/
var nameStrengths = new Array;
nameStrengths[0]='Bertanggung jawab, teratur, disiplin, kontrol diri, selera humor rendah.';
nameStrengths[1]='Progresif, asli, kemanusiaan, mandiri.';
nameStrengths[2]='Intuitif, penyayang, artistik, lembut, bijaksana, bermusik.';
nameStrengths[3]='Keberanian, tekad, kepercayaan diri, antusiasme.';
nameStrengths[4]='Diandalkan, sabar, musikal, praktis.';
nameStrengths[5]='Keingintahuan, kemampuan berbagi ide, mudah beradaptasi, penuh kasih sayang, baik hati.';
nameStrengths[6]='Belas kasihan, kepekaan emosional, perlindungan sengit terhadap orang yang dicintai, keuletan.';
nameStrengths[7]='Kehangatan, humor, kebanggaan, kegembiraan, kreativitas, gairah, kemurahan hati.';
nameStrengths[8]='Praktis, setia, pekerja keras, analitis, baik hati.';
nameStrengths[9]='Sosial, berpikiran adil, kooperatif, diplomatis, ramah.';
nameStrengths[10]='Gairah, keras kepala, banyak akal, berani, teman sejati.';
nameStrengths[11]='Selera humor yang besar, idealistis, murah hati.';

var nameWeaknesses = new Array;
nameWeaknesses[0]='Tahu segalanya, tak kenal ampun, merendahkan, mengharapkan yang terburuk.';
nameWeaknesses[1]='Lari dari ekspresi emosional, tanpa kompromi, temperamental, menyendiri.';
nameWeaknesses[2]='Dapat menjadi korban atau martir, takut, terlalu percaya, sedih, keinginan untuk melarikan diri dari kenyataan.';
nameWeaknesses[3]='Ketidaksabaran, argumen konyol, membiarkan ketakutan membatasi pilihan.';
nameWeaknesses[4]='Keras kepala, tanpa kompromi, posesif.';
nameWeaknesses[5]='Menghamburkan energi di terlalu banyak tempat sekaligus, berubah-ubah dalam cinta, gelisah, rentang perhatian pendek.';
nameWeaknesses[6]='Manipulatif, konflik tidak langsung, berpegang teguh pada masa lalu, tidak aman, berkemas.';
nameWeaknesses[7]='Sombong, keras kepala, tidak fleksibel, egois, malas.';
nameWeaknesses[8]='Khawatir, malu, terlalu kritis terhadap diri sendiri dan orang lain, semua bekerja dan tidak bermain.';
nameWeaknesses[9]='Ragu-ragu, akan membawa dendam, menghindari konfrontasi, mengasihani diri sendiri.';
nameWeaknesses[10]='Cemburu, tidak percaya, tertutup, keras, pedas.';
nameWeaknesses[11]='Akan mengatakan apa pun, tidak peduli seberapa tidak sopan, menjanjikan lebih dari yang bisa disampaikan, bisa tidak sabar sampai pada titik kasar.';

var nameCharismatic = new Array;
nameCharismatic[0]='Membangun sedang, bisa mendapatkan bentuk dengan usaha tetapi cenderung agak lunak.';
nameCharismatic[1]='Terlihat bagus, mata indah, wajah sudut, tubuh kurus.';
nameCharismatic[2]='Lembut, terkadang rapuh hingga sedang. Wajah dengan mudah menunjukkan emosi.';
nameCharismatic[3]='Tubuh atletis, sikap muda, kebutuhan untuk memimpin.';
nameCharismatic[4]='Solid, tulang besar, kecenderungan menambah berat badan.';
nameCharismatic[5]='Expressive eyes, quick, bright, often small-boned, refined features.';
nameCharismatic[6]='Tubuh sedang, wajah bulat, payudara menonjol, kecenderungan mengambil alih.';
nameCharismatic[7]='Sikap agung, kuat, kuat, berotot.';
nameCharismatic[8]='Cara tertentu yang dilindungi undang-undang menandai Virgo klasik. Virgos pada umumnya sedang dalam sedikit membangun.';
nameCharismatic[9]='Menarik, anggun, tubuh sedang, tidak ada fitur tajam.';
nameCharismatic[10]='Pandangan intens di mata, berotot.';
nameCharismatic[11]='Terbuka dan tertarik. Umumnya tinggi, kaki kuat. Pakaian untuk kenyamanan, bukan gaya. Wanita bertindak dengan cara "tomboy".';

var nameLikes = new Array;
nameLikes[0]='Keluarga, tradisi, keahlian berkualitas, status bersahaja, musik.';
nameLikes[1]='Bersenang-senang dengan teman, berjuang demi tujuan, membantu orang lain, percakapan intelektual, pendengar yang baik.';
nameLikes[2]='Tema spiritual, waktu sendirian, media visual, waktu tidur, romansa, musik, berenang.';
nameLikes[3]='Pakaian yang nyaman, memimpin, tantangan fisik, olahraga individu.';
nameLikes[4]='Berkebun, memasak, bekerja dengan tangan, musik, romansa, pakaian berkualitas tinggi.';
nameLikes[5]='Musik, majalah, buku, musik, blog, obrolan dengan hampir semua orang, perjalanan singkat keliling kota.';
nameLikes[6]='Bersantai di dekat atau di dalam air, seni, hobi rumahan, makan enak bersama teman, membantu orang yang dicintai.';
nameLikes[7]='Teater, dikagumi, berlibur, bersenang-senang dengan teman, hal-hal mahal, warna-warna cerah.';
nameLikes[8]='Kebersihan, hewan, makanan sehat, buku, alam.';
nameLikes[9]='Harmoni, berbagi dengan orang lain, kelembutan, alam bebas.';
nameLikes[10]='Kebenaran, fakta, menjadi benar, menggoda, berteman lama, hasrat besar, musuh yang layak.';
nameLikes[11]='Bepergian, berada di luar ruangan, kebebasan, filsafat.';

var nameDislikes = new Array;
nameDislikes[0]='Hampir semuanya ada di beberapa titik.';
nameDislikes[1]='Keterbatasan, kesepian, janji yang putus, situasi yang membosankan atau membosankan, orang-orang yang tidak sependapat dengannya.';
nameDislikes[2]='Tahu segalanya, masa lalu kembali menghantui, dikritik, kekejaman dalam bentuk apa pun.';
nameDislikes[3]='Tidak aktif, keterlambatan, pekerjaan yang tidak menggunakan bakat seseorang.';
nameDislikes[4]='Perubahan mendadak, komplikasi, rasa tidak aman dari segala jenis, kain sintetis.';
nameDislikes[5]='Pengulangan dan rutinitas, sendirian, dikurung.';
nameDislikes[6]='Orang-orang asing, pengungkapan kehidupan pribadi, kritik terhadap Ibu.';
nameDislikes[7]='Diabaikan, menghadapi kenyataan sulit, bukan menjadi raja atau ratu.';
nameDislikes[8]='Mengambil tengah panggung, kekasaran, meminta bantuan.';
nameDislikes[9]='Ketidakadilan, kekerasan, kepatuhan, dan pengumpanan.';
nameDislikes[10]='Ketidakjujuran, orang pasif, mengungkapkan rahasia.';
nameDislikes[11]='Detail, dibatasi, teori di luar tembok, orang-orang yang melekat.';

var nameBestEnviro = new Array;
nameBestEnviro[0]='Situasi kerja positif, lingkungan perkotaan dengan budaya dan gaya, di mana pun menjadi penanggung jawab.';
nameBestEnviro[1]='Setiap orang berkumpul untuk bertukar ide.';
nameBestEnviro[2]='Di atau dekat air, terutama laut. Bioskop.';
nameBestEnviro[3]='Segala situasi yang membutuhkan tindakan, keberanian dalam menghadapi ketakutan, persaingan, dan kebebasan memilih. Individu Aries lebih baik di luar aktif daripada tinggal dekat dengan rumah.';
nameBestEnviro[4]='Rumah terpencil yang dekat dengan alam. Makanan yang baik juga penting. Kecantikan dan kenyamanan adalah suatu keharusan.';
nameBestEnviro[5]='Setiap lingkungan yang sibuk, tempat orang berkumpul untuk bergosip, toko buku, museum.';
nameBestEnviro[6]='Kanker akan selalu paling nyaman di rumah, dekat dengan keluarga, hal-hal yang akrab, dan teman-teman tersayang.';
nameBestEnviro[7]='Di bawah sinar matahari! Juga tempat di mana Leo memiliki kesempatan untuk menjadi kreatif atau bersinar di depan orang lain.';
nameBestEnviro[8]='Virgo paling di rumah di perusahaan hewan dan dekat dengan alam. Virgo menyukai kekuasaan dan menikmati menjadi asisten pendamping atau yang sangat diperlukan.';
nameBestEnviro[9]='Setiap tempat yang indah di mana perusahaan itu harmonis. Sangat sosial dan paling bahagia melakukan sesuatu di perusahaan orang lain.';
nameBestEnviro[10]='Tempat gelap, sensual, situasi apa pun yang menawarkan kekuatan atau membangkitkan perasaan yang kuat.';
nameBestEnviro[11]='Di luar, saat bepergian.';

var iImg=new Array;
iImg[3]='<i class="fa fa-fire" aria-hidden="true" style="color:red;"></i>';
iImg[2]='<i class="fa fa-tint" aria-hidden="true" style="color:blue;"></i>';
iImg[1]='<i class="fa fa-cloud" aria-hidden="true" style="color:skyblue;"></i>';
iImg[0]='<i class="fa fa-square" aria-hidden="true" style="color:orange;"></i>';
var imgElemenImg=[iImg[0],iImg[1],iImg[2],iImg[3],iImg[0],iImg[1],iImg[2],iImg[3],iImg[0],iImg[1],iImg[2],iImg[3]]
var elemen=['Bumi','Udara','Air','Api','Bumi','Udara','Air','Api','Bumi','Udara','Air','Api'];
var warna=['Coklat','Pirus','Hijau Laut','Merah','Merah Jambu','Hijau','Putih, Perak','Emas, Orange','Hijau, Coklat','Biru','Merah Kelam, Hitam','Ungu'];

$('#fAstElemen').html(elemen[lunarTypeNum]);
$('#imgElemen').html(imgElemenImg[lunarTypeNum]);
$('#fAstColor').html(warna[lunarTypeNum]);

var nameCharacteristics = new Array;
nameCharacteristics[0]='Symbol : Kambing<br>Elemen : Bumi<br>Group : Teori<br>Polarity : Negative<br>Favorable Colors : Coklat<br>Opposite Sign : Cancer';
nameCharacteristics[1]='Symbol: Pembawa Air<br>Elemen: Udara<br>Group: Teori<br>Polarity: Positive<br>Favorable Colors: Pirus<br>Opposite Sign: Leo';
nameCharacteristics[2]='Symbol: Ikan<br>Elemen: Air<br>Group: Teori<br>Polarity: Negative<br>Favorable Colors: Hijau Laut<br>Opposite Sign: Virgo';
nameCharacteristics[3]='Symbol: Domba Jantan<br>Elemen: Api<br>Group: Emosi<br>Polarity: Positive<br>Favorable Colors: Merah<br>Opposite Sign: Libra';
nameCharacteristics[4]='Symbol: Banteng<br>Elemen: Bumi<br>Group: Emosi<br>Polarity: Negative<br>Favorable Colors: Merah Jambu<br>Opposite Sign: Scorpio';
nameCharacteristics[5]='Symbol: Kembar<br>Elemen: Udara<br>Group: Emosi<br>Polarity: Positive<br>Favorable Colors: Hijau<br>Opposite Sign: Sagittarius';
nameCharacteristics[6]='Symbol: Kepiting<br>Elemen: Air<br>Group: Emosi<br>Polarity: Negative<br>Favorable Colors: Putih, Perak<br>Opposite Sign: Capricorn';
nameCharacteristics[7]='Symbol: Singa<br>Elemen: Api<br>Group: Intelek<br>Polarity: Positive<br>Favorable Colors: Emas, Orange<br>Opposite Sign: Aquarius';
nameCharacteristics[8]='Symbol: Perawan<br>Elemen: Bumi<br>Group: Intelek<br>Polarity: Negative<br>Favorable Colors: Hijau, Coklat<br>Opposite Sign: Pisces';
nameCharacteristics[9]='Symbol: Timbangan<br>Elemen: Udara<br>Group: Intelek<br>Polarity: Positive<br>Favorable Colors: Biru<br>Opposite Sign: Aries';
nameCharacteristics[10]='Symbol: Kalajengking<br>Elemen: Air<br>Group: Intelek<br>Polarity: Negative<br>Favorable Colors: Merah Kelam, Hitam<br>Opposite Sign: Taurus';
nameCharacteristics[11]='Symbol: Pemanah<br>Elemen: Api<br>Group: Teori<br>Polarity: Positive<br>Favorable Colors: Ungu<br>Opposite Sign: Gemini';

var lunarText = new Array;
lunarText[0]='Dalam hal profesionalisme dan nilai-nilai tradisional, Capricorn menang dengan mudah. Tanda praktis ini suka menangani kehidupan dengan cara yang paling konvensional, tanpa meninggalkan kebutuhan bisnis yang terlewat. Dianggap sebagai tanda-tanda yang paling serius, Capricorn memiliki kemandirian yang memungkinkan kemajuan besar baik secara pribadi maupun dalam pekerjaan.';
lunarText[1]='Aquarius menampilkan diri mereka dalam salah satu dari dua cara. Satu di tangan, Anda akan melihat seseorang yang pemalu, dan pendiam. Di sisi lain, seorang Aquarian bisa menjadi ramai, eksentrik, dan energik. Keduanya adalah pemikir yang mendalam dengan cinta membantu orang lain. Sangat intelektual, ini adalah tanda kemerdekaan yang sengit yang menghargai intuisi yang ditempa dengan logika. Kedua tipe kepribadian memiliki kemampuan luar biasa untuk melihat kedua sisi argumen tanpa prasangka, membuat mereka pemecah masalah yang sangat baik. Sementara sangat terbiasa dengan energi di sekitar mereka, Aquarius memiliki kebutuhan yang mendalam untuk meluangkan waktu sendirian dan pergi untuk meremajakan diri mereka sendiri. Kata kunci untuk tanda ini adalah imajinasi. Aquarian dapat melihat dunia kemungkinan bahkan ketika tampaknya tidak ada.';
lunarText[2]='"Memahami" adalah kata kunci yang paling tepat untuk tanda yang lembut dan penuh kasih sayang ini. Santai dan umumnya menerima orang lain di sekitar mereka, Pisceans sering ditemukan di perusahaan dari berbagai kepribadian yang berbeda. Kesediaan mereka untuk memberikan diri mereka secara emosional memberikan aura empati yang tenang. A Pisces nyaman berada di sekitar. Meskipun tidak mungkin menjadi pemimpin, kehadiran tanda-tanda ini kuat dan bersemangat dalam segala alasan yang mereka masukkan ke dalam hati mereka.';
lunarText[3]='Sebagai tanda pertama zodiak, kehadiran seekor Aries hampir selalu menunjukkan awal dari sesuatu yang energik dan riuh. Tidak banyak yang menahan tanda ini. Mereka bersemangat, dinamis, cepat, dan kompetitif. Ketika datang untuk mendapatkan bola bergulir, Aries adalah yang terbaik. Memelopori segala sesuatu dari proyek yang berhubungan dengan pekerjaan hingga pesta dengan teman-teman, orang-orang ini memilih untuk melakukannya.';
lunarText[4]='Taurus yang kuat dan dapat diandalkan memimpin dalam hal memetik hasil kerja keras. Pecinta segala sesuatu yang baik dan indah, Taurea mengelilingi diri mereka dengan keuntungan materi. Ini adalah tanda sensual, taktil. Sentuhan sangat penting dalam segala hal mulai dari pekerjaan hingga romansa. Stabil dan konservatif, orang-orang Taurus adalah yang paling dapat dipercaya dari zodiak. Meskipun kadang-kadang dipandang sebagai keras kepala, tanda ini akan berjalan lamban pada tugas sampai akhir, memastikan bahwa semuanya sesuai standar. Mereka sangat kreatif dan sangat menikmati membuat sesuatu dengan tangan mereka sendiri.';
lunarText[5]='Keserbagunaan adalah kata kunci yang bagus untuk tanda ganda ini. Ekspresif dan cerdas, Gemini menghadirkan dua sisi khas pada kepribadiannya, dan Anda tidak akan pernah yakin dengan yang mana Anda akan berhadapan muka. Di satu sisi, Gemini bisa ramah, genit, komunikatif, dan siap untuk bersenang-senang, bersenang-senang, bersenang-senang. Namun ketika saudara kembar yang lain hadir, Anda dapat menemukan tanda udara ini kontemplatif, serius, gelisah, dan bahkan bimbang. Kedua saudara kembar ini mampu beradaptasi dengan keadaan kehidupan dengan baik, membuat mereka menjadi orang-orang hebat yang tahu. Hal-hal tidak pernah membosankan ketika Gemini ada di tempat kejadian.';
lunarText[6]='Sangat intuitif dan sentimental, Cancer bisa menjadi salah satu tanda Zodiac paling menantang untuk diketahui. Emosi berjalan kuat untuk tanda ini, dan ketika datang ke keluarga dan rumah, tidak ada yang lebih penting. Bersimpati dan berempati, Cancerians sangat terbiasa dengan orang-orang di sekitar mereka. Pengabdian adalah kata kunci untuk tanda ini, membuat mereka menjadi orang-orang yang sangat sensitif.';
lunarText[7]='Ketika Singa yang perkasa memasuki panggung utama, semua orang memperhatikan. Tanda dramatis, kreatif, dan keluar ini memiliki daya tarik kata kunci untuk alasan yang baik. Berapi-api dan percaya diri, pesona Leo hampir mustahil untuk ditolak. Apakah itu waktu yang dihabiskan bersama keluarga dan teman-teman atau upaya di tempat kerja, seorang Leo akan membawa banyak ke meja.';
lunarText[8]='Dengan perhatian serius pada detail, Virgo adalah tanda zodiak yang paling didedikasikan untuk melayani. Perasaan manusiawi mereka yang mendalam menuntun mereka pada pengasuhan tidak seperti yang lain, sementara pendekatan metodis mereka terhadap kehidupan memastikan bahwa tidak ada yang terlewatkan. Virgo seringkali lembut dan halus, lebih memilih untuk mundur dan menganalisis sebelum bergerak maju.';
lunarText[9]='"Saya menyeimbangkan" adalah frasa kunci untuk tanda ini, dan ketika harus menjaga semuanya tetap seimbang, seorang Libran akan memimpin kelompok ini. Cinta damai dan peradilan, tanda ini membenci sendirian. Kemitraan sangat penting bagi Libran, terutama yang pada tingkat pribadi. Dengan kepribadian mereka yang menang dan gaya kerja sama, mereka tidak cenderung sendirian lama!';
lunarText[10]='Di bawah eksterior yang terkendali dan dingin, mengalahkan jantung Scorpio yang sangat intens. Bergairah, menembus, dan bertekad, tanda ini akan menyelidiki sampai mereka mencapai kebenaran. Scorpio mungkin tidak berbicara banyak atau menunjukkan emosi dengan mudah, namun yakinlah ada sejumlah besar aktivitas yang terjadi di bawah permukaan. Pemimpin yang luar biasa, Kalajengking selalu sadar. Ketika datang ke akal, tanda ini keluar di depan.';
lunarText[11]='Ingin tahu dan bersemangat, Sagitarius adalah pengelana Zodiac. Pendekatan filosofis, berpikiran luas terhadap kehidupan memotivasi mereka untuk berkeliaran di mana-mana dalam mencari makna kehidupan. Ekstrover, optimis, dan antusias, hampir tidak mungkin menurunkan Sagitarius. Mereka suka perubahan. Faktanya, perubahan sangat penting untuk tanda ini untuk merasakan yang terbaik.';

var tmpLunarText='<div style="text-align: justify;font-family:Verdana;font-size: 16px;color: #0b5394;">';
tmpLunarText +='<u>'+lunarType+'</u>';
tmpLunarText +='<br>Personality:</div><div>'+lunarText[lunarTypeNum]+'<br>';
tmpLunarText +='</div><br><div style="text-align: justify;font-family:Verdana;font-size: 16px;color: #0b5394;">';
tmpLunarText +='Keyword:</div><table border="0" width="100%"><tr>';
tmpLunarText +='<td width="140px">Strengths</td><td>:</td><td>'+nameStrengths[lunarTypeNum]+'</td></tr><tr>';
tmpLunarText +='<td>Weaknesses</td><td>:</td><td>'+nameWeaknesses[lunarTypeNum]+'</td></tr><tr>';
tmpLunarText +='<td>Charismatic marks</td><td>:</td><td>'+nameCharismatic[lunarTypeNum]+'</td></tr><tr>';
tmpLunarText +='<td>Likes</td><td>:</td><td>'+nameLikes[lunarTypeNum]+'</td></tr><tr>';
tmpLunarText +='<td>Dislikes</td><td>:</td><td>'+nameDislikes[lunarTypeNum]+'</td></tr><tr>';
tmpLunarText +='<td>Best environment</td><td>:</td><td>'+nameBestEnviro[lunarTypeNum]+'</td></tr>';
tmpLunarText +='</table><br><div style="text-align: justify;font-family:Verdana;font-size: 16px;color: #0b5394;">';
tmpLunarText +='Characteristics:</div><div>'+nameCharacteristics[lunarTypeNum]+'</div>';
document.getElementById("lunarArea").innerHTML=tmpLunarText;
}
/* End Zodiac Reading */
/* Start Shio Reading */
function showShio(){
var startYear=1900;
var cNYstartDate = new Array(
"1.31","2.19","2.08","1.29","2.16","2.04","1.25","2.13","2.02","1.22",
"2.10","1.30","2.18","2.06","1.26","2.14","2.03","1.23","2.11","2.01",
"2.20","2.08","1.28","2.16","2.05","1.25","2.13","2.02","1.23","2.10",
"1.30","2.17","2.06","1.26","2.14","2.04","1.24","2.11","1.31","2.19",
"2.08","1.27","2.15","2.05","1.25","2.13","2.02","1.22","2.10","1.29",
"2.17","2.06","1.27","2.14","2.03","1.24","2.12","1.31","2.18","2.08",
"1.28","2.15","2.05","1.25","2.13","2.02","1.21","2.09","1.30","2.17",
"2.06","1.27","2.15","2.03","1.23","2.11","1.31","2.18","2.07","1.28",
"2.16","2.05","1.25","2.13","2.02","2.20","2.09","1.29","2.17","2.06",
"1.27","2.15","2.04","1.23","2.10","1.31","2.19","2.07","1.28","2.16", /*1900->1999*/
"2.05","1.24","2.12","2.01","1.22","2.09","1.29","2.18","2.07","1.26", /* 2000-> */
"2.14","2.03","1.23","2.10","1.31","2.19","2.08","1.28","2.16","2.05", /* 10-19 */
"1.25","2.12","2.01","1.22","2.10","1.29","2.17","2.06","1.26","2.13"  /* 20-29 */
);

var shio = new Array(
new Array("Tikus", "Tikus adalah hewan pertama dalam siklus zodiak Cina. Biasanya dianggap agresif, ambisius, mencurigakan, haus kekuasaan, jujur, murah hati, cepat marah dan cenderung menghabiskan waktu dengan bebas. Mereka yang lahir di bawah tanda Tikus imajinatif, menawan, dan benar-benar murah hati kepada orang yang mereka cintai. Namun, mereka memiliki kecenderungan untuk menjadi pemarah dan terlalu kritis. Mereka biasanya cocok untuk pekerjaan penjualan atau pekerjaan sebagai penulis, kritikus, atau humas. Tikus akan rukun dengan Naga dan Monyet, namun harus menghindari Kuda.", "https://4.bp.blogspot.com/-qKfCGYPvQNM/XVzFpHvu5WI/AAAAAAAABUg/Enlovy495IgchE2kZKktzL7M0URlsK8LwCLcBGAs/s80/tikus.gif"),
new Array("Lembu", "Lembu adalah simbol individu yang kuat dengan kepribadian keras kepala dan keras kepala. Mereka yang lahir di bawah tanda adalah pemimpin alami yang biasanya berhasil ketika diberi kesempatan dan juga akan membuat orang tua yang luar biasa. Mereka jujur, menginspirasi, santai dan konservatif. Lembu akan berhasil sebagai ahli bedah, umum, atau penata rambut yang terampil. Sapi bergaul dengan Ular dan Ayam Jantan tetapi tidak dengan domba.", "https://3.bp.blogspot.com/-T_VCcbuV7ek/XVzFoHrKecI/AAAAAAAABUQ/7kTNs6eOgwk7GO38fcv3lZNAIhAODdUeACLcBGAs/s80/lembu.gif"),
new Array("Macan", "Sebagai hewan yang bertarung, mereka yang lahir di bawah tanda harimau sensitif, agresif, tidak dapat diprediksi, menawan, emosional, berani, dan mampu mencintai dengan hebat. Seringkali mempertaruhkan diri mereka sendiri, mereka memiliki kehidupan yang riang. Harimau biasanya akan menonjol sebagai bos, penjelajah, pengemudi mobil balap, atau matador. Pernikahan yang bahagia bisa terjadi dengan Kuda atau Anjing tetapi tidak pernah dengan Monyet.", "https://3.bp.blogspot.com/-zrC_VogD47g/XVzFoYjIGAI/AAAAAAAABUU/FiVRp_YBQmsSlFctmGBFg1H7LJ05hwDLgCLcBGAs/s80/macan.gif"),
new Array("Kelinci", "Mereka yang lahir di bawah tanda ini penuh kasih sayang, berbakat, wajib, selalu menyenangkan, menghargai keamanan dan ketenangan. Mereka memiliki kecenderungan untuk menjadi terlalu sentimental dan dangkal dan untuk menghindari konflik dan keterlibatan emosional. Berhati-hati dan konservatif, mereka biasanya tidak mengambil risiko dan sukses dalam bisnis. Mereka juga akan menjadi pengacara, diplomat, atau aktor yang baik. Mitra hidup terbaik mereka adalah Domba atau Babi, bukan Ayam Jantan.", "https://4.bp.blogspot.com/-EUFGYr-btdo/XVzFnc0TcbI/AAAAAAAABUM/YI0C-H_2IiQPNgcPCXj-2D5hy4gVCj8wQCLcBGAs/s80/kelinci.gif"),
new Array("Naga", "Mereka yang lahir di bawah tanda dianggap cerdas, berbakat, suka memerintah, keras, norak, dan tidak setia, tetapi juga populer dan sukses, penuh vitalitas dan antusiasme. Mereka biasanya terlihat keras kepala di luar, tetapi lembut di dalam. Mereka dilahirkan untuk menjadi seniman, pendeta, politisi, atau pemimpin. Seekor naga akan kompatibel dengan monyet atau tikus. Namun, seekor anjing tidak akan menjadi pilihan yang baik.", "https://4.bp.blogspot.com/-CcIsmS5TvU0/XVzFozcZTYI/AAAAAAAABUc/vHwSkr69uvIvbNufvuAJ_3m5gxpYEdRbwCLcBGAs/s80/naga.gif"),
new Array("Ular", "Mereka yang lahir di bawah tanda ini biasanya dianggap pintar, bersemangat, tekun, romantis, intens, kaya akan kebijaksanaan dan pesona, tetapi sia-sia. Wanita yang lahir di bawah Ular seringkali cantik. Ular akan sangat dibimbing oleh intuisi mereka. Mereka tentu saja akan memenangkan banyak uang, tetapi harus menghindari penundaan dan sikap pelit terhadap uang. Ular akan paling puas sebagai guru, filsuf, penulis, psikiater, atau peramal. Pernikahan dengan Ayam jantan atau Lembu bukan Babi akan menjadi yang terbaik.", "https://4.bp.blogspot.com/-8YzKMLMPe9w/XVzFpuaxuwI/AAAAAAAABUk/a455iNnNTjYz0kAeXDxUFeGmTi5s1c1pQCLcBGAs/s80/ular.gif"),
new Array("Kuda", "Mereka pekerja keras, cerdas dan ramah, ceria dan populer, tetapi tidak sabar. Biasanya mereka menganggap diri mereka lebih unggul dari orang lain. Mereka memiliki sifat mementingkan diri yang kuat dan kecerdikan yang tajam dan harus menjaga agar tidak egois. Petualang, ilmuwan, penyair, atau politisi akan menjadi pekerjaan yang cocok untuk mereka. Kuda rukun dengan Macan dan Anjing, bukan Tikus.", "https://2.bp.blogspot.com/-QFOdlzEA_Xs/XVzFncviv6I/AAAAAAAABUI/btH6Rd2-bdI9F1DmgdsKSUXOPfv73tvOwCLcBGAs/s80/kuda.gif"),
new Array("Domba", "Tanda itu menunjukkan seseorang yang kreatif, artistik, bersemangat, elegan, ramah, jujur, menawan tetapi pesimistis, pemalu, tidak teratur, dan rentan. Terlalu tergantung pada kenyamanan material, mereka mudah mengeluh dan tidak merespon dengan baik terhadap tekanan, tetapi akan menemukan solusi alami mereka sendiri untuk masalah ketika diberi ruang. Pekerjaan terbaik untuk seorang Domba adalah seorang aktor atau tukang kebun. Mereka kompatibel dengan Kelinci atau Babi dalam pernikahan, tetapi tidak dengan lembu.", "https://4.bp.blogspot.com/-sZvfmZWuMoU/XVzFnWVTqYI/AAAAAAAABUE/Hy-G5lQiU_Qo2QTeFn-P0j4uWz8T19IiwCLcBGAs/s80/domba.gif"),
new Array("Monyet", "Monyet cerdas, inventif, pintar, menghibur tetapi juga berbahaya dan mudah putus asa. Karena sifat dan kepribadian magnetis mereka yang luar biasa, mereka selalu disukai dan berteman dekat. Namun, mereka tidak bisa dipercaya. Mereka harus menjaga agar tidak menjadi oportunis dan tidak mempercayai orang lain. Tanda menunjukkan keberhasilan dalam bidang apa pun yang mereka coba. Pertandingan terbaik adalah Naga atau Tikus sedangkan yang terburuk adalah Harimau.", "https://4.bp.blogspot.com/-e_sExACzkLE/XVzFonuw5DI/AAAAAAAABUY/TMn2tuWEuCYD5D2kO39sQiLBBMI-btQ6wCLcBGAs/s80/monyet.gif"),
new Array("Ayam Jantan", "Ayam jantan berani, pekerja keras, cerdik, sombong, ceroboh, egois, dan eksentrik. Mereka haus akan pengetahuan, mengabdikan diri untuk bekerja dan pasti terlibat dalam pengambilan keputusan. Mereka terampil dalam apa yang mereka lakukan dan memperhatikan detail. Namun, mereka cenderung terlihat sombong kepada orang lain. Ayam jantan akan senang sebagai pemilik restoran, humas, tentara atau pelancong dunia. Tanda itu menjanjikan harmoni dengan Ular dan Sapi dan masalah dengan Kelinci.", "https://4.bp.blogspot.com/-MHfK0H-LkWY/XVzFmuYtvQI/AAAAAAAABUA/BtImP2f3vxg36ES8IgxtnfaMwxMypq5QwCLcBGAs/s80/ayam.gif"),
new Array("Anjing", "Mereka yang lahir di bawah tanda ini jujur, pendiam, cerdas, murah hati, keras kepala, setia dan setia kepada mereka yang mereka cintai. Mereka adalah pendengar introvert, berdedikasi tetapi juga sinis dan cenderung membiarkan kecemasan eksternal mereka mendapatkan yang terbaik dari mereka. Kekhawatiran terus-menerus, lidah yang tajam, dan kecenderungan untuk menjadi pencari kesalahan akan selalu mengganggu mereka. Namun, mereka dilahirkan untuk menjadi sukses. Anjing akan menjadi pebisnis, aktivis, guru, atau agen rahasia yang luar biasa. Harimau dan Kuda dianggap sebagai pertandingan terbaik, dan Naga harus ditangani dengan hati-hati.", "https://4.bp.blogspot.com/-XjTnynx5NPs/XVzFmV5r1PI/AAAAAAAABT4/PyM4857OP8kM1z16f7NG1AyIWfGSyfX4QCLcBGAs/s80/anjing.gif"),
new Array("Babi", "Babi itu jujur, dapat diandalkan, tulus, toleran, pemalu, penuh kasih sayang, baik hati, impulsif, dan pemarah. Mereka adalah sahabat yang hebat, intelektual dengan kebutuhan yang sangat kuat untuk menetapkan tujuan yang sulit dan melaksanakannya. Selain itu mereka sangat naif. Rasa haus mereka yang tak terpadamkan akan pengetahuan akan memudahkan kesuksesan mereka sedangkan pencarian mereka akan kenyamanan materi akan menggagalkannya. Babi juga akan mengorbankan hidup mereka untuk tujuan yang baik. Babi akan berhasil dalam urusan keuangan, atau sebagai penghibur, atau mungkin seorang pengacara. Babi harus mengetahui Babi lain dan kompatibel dengan Domba dan Kelinci.", "https://2.bp.blogspot.com/-zrPvmpJjEZA/XVzFms-Uj-I/AAAAAAAABT8/E844SoECOP0gQI1qYi_uGPM30D3z8fiYACLcBGAs/s80/babi.gif")
);
var y_select = String($('#fAstDate').datepicker('getDate').getFullYear());
var m_select = String($('#fAstDate').datepicker('getDate').getMonth()+1);
var d_select = String($('#fAstDate').datepicker('getDate').getDate());
var descArea = document.getElementById("descArea");
var cYear;
var anYear;
var edgeMonth,edgeDay;
if((y_select!="")&&(m_select!="")&&(d_select!="")){
edgeMonth=parseInt(cNYstartDate[y_select-1900].substring(0,cNYstartDate[y_select-1900].indexOf(".")));
if(parseInt(m_select) < edgeMonth){
cYear=y_select-1;
}else{
if(parseInt(m_select) == edgeMonth){
edgeDay=parseFloat(cNYstartDate[y_select-1900].substring(parseInt(cNYstartDate[y_select-1900].indexOf("."))+1,cNYstartDate[y_select-1900].length));
if( parseInt(d_select)<edgeDay){
cYear=y_select-1;
}else{cYear=y_select;}
}else{ cYear=y_select;}
}
if(y_select<1900){
alert("Maaf, tidak ada info untuk tanggal ini, karena sebelum 1900, menurut kalender Cina. Tahun baru Cina dimulai pada 31 Januari di Tahun 1900.");
}else{
anYear=(cYear-4)%12;
$('#fAstShio').html(shio[anYear][0]);
$('#imgShio').attr("src",shio[anYear][2]);
descArea.innerHTML="<b><u>"+shio[anYear][0]+"</u></b><br>"+shio[anYear][1];
document.getElementById('zodSign').src = shio[anYear][2];
}}}
/* End Shio Reading */
/* Start Hijriah Conversion */
function isGregLeapYear(year){
return year%4 == 0 && year%100 != 0 || year%400 == 0;
}
function gregToFixed(year, month, day) {
var a = Math.floor((year - 1) / 4);
var b = Math.floor((year - 1) / 100);
var c = Math.floor((year - 1) / 400);
var d = Math.floor((367 * month - 362) / 12);
var e = -1;
if (month <= 2){e = 0;}
else if (month > 2 && isGregLeapYear(year)){e = -1;}
return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + day;
}
function Hijri(year, month, day){
this.year = year;
this.month = month;
this.day = day;
this.toFixed = hijriToFixed;
this.toString = hijriToString;
}
function hijriToFixed() {
return this.day + Math.ceil(29.5 * (this.month - 1)) + (this.year - 1) * 354 + Math.floor((3 + 11 * this.year) / 30) + 227015 - 1;
}
function hijriToString() {
var months = new Array("Muharram","Safar","Rabiul Awal","Rabiul Tsani","Jumadil Ula","Jumadil Tsani","Rajab","Sya\'ban","Ramadhan","Syawwal","Dzul Qa\'dah","Dzul Hijjah");
return this.day + " " + months[this.month -1]+ " " + this.year;
}
function fixedToHijri(f) {
var i=new Hijri(1100, 1, 1);
i.year = Math.floor((30 * (f - 227015) + 10646) / 10631);
var i2=new Hijri(i.year, 1, 1);
var m = Math.ceil((f - 29 - i2.toFixed()) / 29.5) + 1;
i.month = Math.min(m, 12);
i2.year = i.year;
i2.month = i.month;
i2.day = 1;
i.day = f - i2.toFixed() + 1;
return i;
}
function hijriDate(){
var y = $('#fAstDate').datepicker('getDate').getFullYear();
var m = $('#fAstDate').datepicker('getDate').getMonth()+1;
var d = $('#fAstDate').datepicker('getDate').getDate();
var dateHijri = fixedToHijri(gregToFixed(y, m, d));
$('#fAstHijriah').html(dateHijri+ " H ");
/*$('#dateIslamicHijriah').html("Hijriah : "+dateHijri+ " H ");*/
$('#dateIslamicHijriah').html('<center>'+'چوديفلاريبلوعسپوت'+'</center>');
$("#dateIslamicMasehi").html("<center>"+$('#fAstDate').datepicker('getDate').getDate()+'-'+($('#fAstDate').datepicker('getDate').getMonth()+1)+'-'+$('#fAstDate').datepicker('getDate').getFullYear()+' <i class="fa fa-arrows-h" aria-hidden="true"></i> '+dateHijri+'</center>');
}
/* End Hijriah Conversion */
/* Run Astrologi */
function runAstrologi(){
if(astroBlogUserID==MD5(getHostName(window.location.href))&&astroBlogVer==astroBlogUserID){
getOrbital();
hijriDate();
calcBiorhythm();
getArtiHari();
readDataPrimbon();
getLunar();
showShio();
getPandanganIslam();
getAuraAst();
}}
/* Start Initial Call */
var secAstroBlogCheck1=window.btoa(astroBlogUserID);
var secAstroBlogCheck2=window.btoa(astroBlogVer);
$(document).ready(function(){
if(secAstroBlogCheck1==secAstroBlogCheck2){initialSetDateAst();}
});

var setVersionAstrologi="<span onclick='window.open(\"https://codeflare.blogspot.com\",\"blank\")' style='cursor:help;'>"+getHostName(window.location.href)+"</span> v"+appCFAstVer;
$(".footerAttribution").html(setVersionAstrologi);
/* End Initial Call */
function capital_letter(str){
if(str==""||str==null){return;}
str = str.split(" ");
for (var i = 0, x = str.length; i < x; i++) {
str[i] = str[i][0].toUpperCase() + str[i].substr(1);}
return str.join(" ");
}
if($(window).innerWidth() > 900){
if($("#lihatAstroBlog").data('draggable')){$("#lihatAstroBlog").draggable('destroy');}else{$("#lihatAstroBlog").draggable();}
}
function getBioImage(){
var strName=$('#fAstName').val();
if(strName==""||strName==null||strName=="Nama Lengkap"){
alert("Silakan anda ketikan nama lengkap anda terlebih dahulu !");
$("#fAstName").trigger( "focus" );
return;
}
strName=capital_letter($('#fAstName').val());
strDate=$('#fAstDate').datepicker('getDate').getDate();
strMonth=$('#fAstDate').datepicker('getDate').getMonth();
strYear=$('#fAstDate').datepicker('getDate').getFullYear();
strDate2=$('#nowDateAst').datepicker('getDate').getDate();
strMonth2=$('#nowDateAst').datepicker('getDate').getMonth();
strYear2=$('#nowDateAst').datepicker('getDate').getFullYear();
if ($('fAstName').val()=="Nama Lengkap" || $('fAstName').val()==""){
alert("Silakan ketik nama anda terlebih dahulu...");
$('fAstName').focus();
$('fAstName').select();
return;
}else{
if ($("#fBtnAstSubmit").html()=='<i class="fa fa-desktop" aria-hidden="true"></i> Lihat Data'){
$("#fBtnAstSubmit").html("Tutup");
if($(window).innerWidth() < 900 || $(window).innerHeight() < 500){
if (document.all && document.querySelector && !document.addEventListener){
document.getElementById("lihatAstroBlog").style.width = $(window).innerWidth()-(getScrollbarWidth());
document.getElementById("showBioBG").style.height = $(window).innerHeight()-getScrollbarWidth()-30;}
else{
document.getElementById("lihatAstroBlog").style.width = $(window).innerWidth()-17+"px";
document.getElementById("showBioBG").style.height = $(window).innerHeight()-50+"px";
}
document.getElementById("lihatAstroBlog").style.left = "2px";
document.getElementById("lihatAstroBlog").style.top = "2px";
}else{
document.getElementById("lihatAstroBlog").style.width = "800px";
document.getElementById("showBioBG").style.height = "500px";
var bWidth1=$(window).innerWidth()-getScrollbarWidth();
var bWidth2=$("#lihatAstroBlog").innerWidth()-getScrollbarWidth();
var bHeight1=$(window).innerHeight()-getScrollbarWidth();
var bHeight2=$("#lihatAstroBlog").innerHeight()-getScrollbarWidth();
document.getElementById("lihatAstroBlog").style.left = ((bWidth1-bWidth2)/2)+"px";
document.getElementById("lihatAstroBlog").style.top = ((bHeight1-bHeight2)/2)+"px";
}
var dobday=strDate;
var dobmon=strMonth+1;
var dobyear=strYear;
var tarday=strDate2;
var tarmon=strMonth2+1;
var taryear=strYear2;
/*var rangeBio=document.getElementById("selRange").value;*/
var rangeBio=14;
var bname=strName;
document.getElementById("myname").innerHTML="<b>ASTROLOGY reading for "+bname.replace(/^[a-z]/, function(m){ return m.toUpperCase() })+"</b>";

readDataPrimbon();
getLunar();
showShio();
$("#lihatAstroBlog").slideDown("slow");
drawCanvasBioGraph();
startDrawSine();
}else{closeBox();}
}}
function closeBox(){
$("#lihatAstroBlog").slideUp("slow");
$("#fBtnAstSubmit").html('<i class="fa fa-desktop" aria-hidden="true"></i> Lihat Data');
if($("#lihatAstroBlog").data('draggable')){$("#lihatAstroBlog").draggable('destroy');}
}

/*get ScrollBar Value*/
function getScrollbarWidth() {
var outer = document.createElement("div");
outer.style.visibility = "hidden";
outer.style.width = "100px";
document.body.appendChild(outer);
var widthNoScroll = outer.offsetWidth;
outer.style.overflow = "scroll";
var inner = document.createElement("div");
inner.style.width = "100%";
outer.appendChild(inner);
var widthWithScroll = inner.offsetWidth;
outer.parentNode.removeChild(outer);
return widthNoScroll - widthWithScroll;
}
function resizeWindowAst(){
if($(window).innerWidth() < 900 || $(window).innerHeight() < 500){
if (document.all && document.querySelector && !document.addEventListener){
document.getElementById("lihatAstroBlog").style.width = $(window).innerWidth()-(getScrollbarWidth());
document.getElementById("showBioBG").style.height = $(window).innerHeight()-getScrollbarWidth()-30;}
else{
document.getElementById("lihatAstroBlog").style.width = $(window).innerWidth()-17+"px";
document.getElementById("showBioBG").style.height = $(window).innerHeight()-50+"px";
}
document.getElementById("lihatAstroBlog").style.left = "2px";
document.getElementById("lihatAstroBlog").style.top = "2px";
}else{
document.getElementById("lihatAstroBlog").style.width = "800px";
document.getElementById("showBioBG").style.height = "500px";
var bWidth1=$(window).innerWidth()-getScrollbarWidth();
var bWidth2=$("#lihatAstroBlog").innerWidth()-getScrollbarWidth();
var bHeight1=$(window).innerHeight()-getScrollbarWidth();
var bHeight2=$("#lihatAstroBlog").innerHeight()-getScrollbarWidth();
document.getElementById("lihatAstroBlog").style.left = ((bWidth1-bWidth2)/2)+"px";
document.getElementById("lihatAstroBlog").style.top = ((bHeight1-bHeight2)/2)+"px";
}}
if (document.all && document.querySelector && !document.addEventListener){
document.body.onresize = function () {
resizeWindowAst();
drawCanvasBioGraph();
startDrawSine();
}}
else{
window.addEventListener("resize", function(event){
resizeWindowAst();
drawCanvasBioGraph();
startDrawSine();
});}
function letterValue(str){
var anum={
a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, 
l: 12, m: 13, n: 14,o: 15, p: 16, q: 17, r: 18, s: 10, t: 20, 
u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
}
if(str.length== 1) return anum[str] || ' ';
return str.split('').map(letterValue);
}
function namaSpesial(){
var strArti = new Array();
strArti[11]="Tingkat spiritual tinggi, intuitif, tercerahkan, idealis, pemimpi.";
strArti[22]="Berjiwa pembangun, pekerja keras, kuat, pemimpin.";
var strDesc = new Array();
strDesc[11]="Segala talenta adalah milik anda. Anda orang yang yakin dalam apa yang anda lakukan. Akan tetapi anda harus berusaha berjalan pada sisi positif dalam hidup karena kekuatan dari kepribadian itu bisa menjadikan anda orang yang sia-sia. Anda termasuk orang yang cerdas dan sangat pandai. Tidak memakan waktu yang lama bagi anda untuk bisa menguasai banyak hal yang menyangkut karir atau bisnis. Anda dapat meraih sukses besar dalam keuangan. Anda orang yang suka berhubungan dengan orang yang penting yang dapat menguntungkan. Anda terlahir untuk mengajarkan sesuatu hal yang baik untuk kepentingan orang lain.";
strDesc[22]="Anda orang yang berambisi meraih kesuksesan. Melalui talenta dan tantangan yang cukup ketat, anda akhirnya dapat memenangkan banyak hal dalam karir, bisnis, maupun kehidupan pribadi. Anda belajar banyak hal dari kesulitan. Berhati-hatilah dengan tindakan anda, sehingga tidak menjadikan karma bagi hidup anda dikemudian hari. Anda orang yang mempesona dan mempunyai banyak energi untuk melakukan banyak hal. Anda tidak mengenal lelah dalam bekerja. Anda disarankan untuk lebih bersabar terhadap mereka yang tidak sehebat anda, karena anda cenderung menyukai kesempurnaan dan sangat idealis.";
$("#artiNamaJudul").html("Karakter :<br />"+strArti[spesialNo]);
$("#artiNamaDesc").html("Pada Umumnya :<br />"+strDesc[spesialNo]);
}
var spesialNo=0;
function getArtiNama(){
if(astroBlogUserID==MD5(getHostName(window.location.href))&&astroBlogVer==astroBlogUserID){
var strName=$('#fAstName').val();
if (strName == "" || strName == null || strName =="Nama Lengkap"){
alert("Silakan anda ketikan nama lengkap anda terlebih dahulu !");
$("#fAstName").trigger( "focus" );
return;
}
if(strName.length == 1){
alert("Nama anda belum lengkap silakan coba lagi !");
$("#fAstName").trigger( "focus" );
return;
}
strName=strName.toLowerCase().replace(/\s/g, '').split('');
var strNameNum=0;var strNameNum1=0;var strNameNum2=0;var strNameNum3=0;var strNameNum4=0;
for(var i=0;i<strName.length;i++){
strNameNum1+=letterValue(strName[i]);
}
if(strNameNum1==11||strNameNum1==22){spesialNo=strNameNum1;namaSpesial();return;}
var digits = strNameNum1.toString().split('');
if(digits.length==4){strNameNum2=parseInt(digits[0])+parseInt(digits[1])+parseInt(digits[2])+parseInt(digits[3]);if(strNameNum2==11||strNameNum2==22){spesialNo=strNameNum2;namaSpesial();return;}}
if(digits.length==3){strNameNum2=parseInt(digits[0])+parseInt(digits[1])+parseInt(digits[2]);if(strNameNum2==11||strNameNum2==22){spesialNo=strNameNum2;namaSpesial();return;}}
if(digits.length==2){strNameNum2=parseInt(digits[0])+parseInt(digits[1]);if(strNameNum2==11||strNameNum2==22){spesialNo=strNameNum2;namaSpesial();return;}}
if(digits.length==1){strNameNum2=parseInt(digits[0]);strNameNum=strNameNum2;if(strNameNum2==11||strNameNum2==22){spesialNo=strNameNum2;namaSpesial();return;}}
if(strNameNum2 => 9){
var digits1 = strNameNum2.toString().split('');
if(digits1.length==3){strNameNum3=parseInt(digits1[0])+parseInt(digits1[1])+parseInt(digits1[2]);if(strNameNum3==11||strNameNum3==22){spesialNo=strNameNum3;namaSpesial();return;}}
if(digits1.length==2){strNameNum3=parseInt(digits1[0])+parseInt(digits1[1]);if(strNameNum3==11||strNameNum3==22){spesialNo=strNameNum3;namaSpesial();return;}}
if(digits1.length==1){strNameNum3=parseInt(digits1[0]);strNameNum=strNameNum3;if(strNameNum3==11||strNameNum3==22){spesialNo=strNameNum3;namaSpesial();return;}}
}else{strNameNum=strNameNum1;}
if(strNameNum3 => 9){
var digits2 = strNameNum3.toString().split('');
if(digits2.length==2){strNameNum4=parseInt(digits2[0])+parseInt(digits2[1]);if(strNameNum4==11||strNameNum4==22){spesialNo=strNameNum4;namaSpesial();return;}}
if(digits2.length==1){strNameNum4=parseInt(digits2[0]);strNameNum=strNameNum4;if(strNameNum4==11||strNameNum4==22){spesialNo=strNameNum4;namaSpesial();return;}}
}else{strNameNum=strNameNum3;}
var strArti = new Array();
strArti[1]="Pemrakarsa, pelopor, pemimpin, bebas, pekerja keras, individualis.";
strArti[2]="Mudah bekerja sama, beradaptasi, bermitra, memperhatikan orang lain, penengah.";
strArti[3]="Ekspresif, mudah berbicara, bersosialisasi, seni dan menikmati hidup.";
strArti[4]="Mengutamakan prinsip, keteraturan, pelayanan, sulit menerima batasan dan perkembangan yang mapan.";
strArti[5]="Ekspansif, visioner, petualang, menggunakan kebebasan dengan cara konstruktif.";
strArti[6]="Bertanggung jawab, melindungi, merawat, bermasyarakat, seimbang, simpatik.";
strArti[7]="Analitis, memahami, pengetahuan, senang belajar, bermeditasi, penuh kesadaran.";
strArti[8]="Berusaha secara praktis, berorientasi terhadap status, pencari kekuasaan, bertujuan pada materi.";
strArti[9]="Peduli sesama, dermawan, tidak mementingkan diri sendiri, patuh terhadap kewajiban, ekspresi kreatif.";
strArti[11]="Tingkat spiritual tinggi, intuitif, tercerahkan, idealis, pemimpi.";
strArti[22]="Berjiwa pembangun, pekerja keras, kuat, pemimpin.";
var strDesc = new Array();
strDesc[1]="Anda mempunyai kepercayaan diri, intelektualitas, dan daya kepemimpinan yang sangat tinggi. Anda juga termasuk orang yang mempunyai pandangan hidup yang luas. Ide-ide kreatif dapat menjadikan anda sebagai pencetus dan penentu suatu kreasi atau tindakan. Cobalah untuk tidak mudah bosan, berubah-ubah pikiran, kehilangan harapan, atau menjadi terlalu agresif dalam menindak-lanjuti hal yang sudah anda mulai atau rintis. Raihlah apa yang menjadi tujuan hidup anda. Anda penyuka petualangan dan hal-hal yang memicu adrenalin. Anda harus mempunyai hobi yang menarik dan menyenangkan. Karena anda mudah bosan, anda tidak menyukai hal-hal yang bersifat monoton dan biasa saja. Hindari emosi, keras kepala, dan mau menang sendiri karena kesuksesan anda terletak pada bagaimana cara anda dapat bersabar dan berdiplomasi dalam meraih apapun tanpa harus bertindak bosy (berlagak seperti bos) atau memaksakan kehendak karena anda sudah mempunyai daya kepemimpinan sejati yang harus diarahkan secara positif.";
strDesc[2]="Anda memerlukan ketentraman, kasih sayang, dan pasangan. Anda rasakan ketiga hal ini dapat melengkapi kehidupan anda. Pikiran anda selalu terpusat pada hal-hal yang positif dan indah. Terkadang bisnis dan hiburan harus dikombinasikan untuk membuat anda lebih bisa mengekspresikan diri dan lebih rileks karena lingkungan tanpa tekanan merupakan keadaan yang anda anggap sangat penting bagi pencapaian dan pengekspresian diri dalam bisnis sekalipun. Anda disarankan untuk tidak terlalu sensitif terhadap hal-hal sepele atau membesar-besarkan hal yang (sepertinya) tidak berguna. Janganlah selalu menaruh rasa curiga pada seseorang. Anda sangat ekspresif dan dapat dengan mudah memenangkan banyak kesempatan bisnis. Anda dapat mencapai kesuksesan hidup melalui dukungan dan bantuan dari orang-orang disekitar. Anda menjadi sangat produktif dan tekun apabila anda sudah mengambil keputusan untuk masuk dalam suatu bisnis tertentu. Anda dapat memenangkan banyak percintaan dimana salah satunya (mungkin) pernah/dapat memberikan kerumitan yang belum pernah terbayangkan.";
strDesc[3]="Anda menularkan banyak kegembiraan dan keceriaan dimanapun anda berada. Kelebihan dari karakter nama ini adalah dapat menghibur semua orang yang kesepian dan bersedih. Anda suka bercerita tentang apapun sedemikian menarik dan mempunyai rasa humor yang tinggi. Anda disarankan untuk benar-benar menentukan karir yang ingin ditekuni sejak awal. Anda tipe orang yang cenderung sangat fleksibel dengan berbagai kondisi sehingga pada akhirnya (terkadang) tidak fokus pada keinginan anda pribadi. Anda bukan orang yang menyukai pekerjaan rutinitas. Daya imajinasi anda dapat mengantar menuju gerbang sukses. Anda akan lebih cocok apabila terlibat dalam karir bidang entertainmen, fashion, travel, public relations atau desain, dimana anda dapat mengekspresikan talenta seni dan komunikasi. Berusahalah sedikit untuk lebih serius dalam memilih pasangan dan jalan hidup anda. Jangan sampai aktivitas-aktivitas yang padat dalam berbagai hal dapat membuat kebingungan dalam memilih apa yang terbaik bagi hidup anda.";
strDesc[4]="Anda mempunyai karakter yang unik dan kuat. Tanpa anda sadari, banyak orang akan merasa sopan dan tampil apa adanya. Kegigihan anda dalam meraih kesuksesan karir tidak perlu diragukan lagi. Anda orang yang sangat berambisi untuk maju. Biasanya orang yang berkarakter nama ini adalah orang-orang yang menuju sukses dengan jerih payah mereka sendiri meski tidak ada orang yang membantu dalam perjalanan karir mereka. Akan tetapi, anda tetap menyenangi pekerjaan yang sifatnya rutinitas. Anda orang yang tidak pandai dalam bersosialisasi. Anda orang yang cukup puas dengan kehidupan yang serba menyendiri karena anda ingin mendapatkan keseimbngan antara keramaian dan ketenangan.";
strDesc[5]="Anda tidak pernah mau tinggal diam dalam menjalani hidup. Selalu menemukan diri anda dalam kemajuan karir dan taraf hidup karena kerja keras sendiri. Travel, olahraga, atau petualangan adalah hal yang paling anda sukai. Dari waktu ke waktu, anda selalu merubah penampilan diri dan juga mengubah kepribadian anda kepada sesuatu yang lebih menunjang karir dan kemajuan pribadi. Anda selalu ingin mencari jawaban atas permasalahan dengan melacaknya sendiri. Anda mempunyai bakat menjadi detektif. Jagalah diri agar jangan sampai terlalu terpesona dengan cinta bahkan menjadi budak cinta. Karena anda cenderung menyukai lawan jenis (pasangan) begitu dalam sehingga terkadang tidak dapat menguasai diri anda sendiri. Anda termasuk orang yang agresif dalam menyikapi cinta. Anda juga termasuk orang yang gampang sekali cemburu.";
strDesc[6]="Anda orang cukup dipandang dikomunitas anda. Selalu menjadi bahan perhatian. Anda juga selalu menjadi tamu yang paling ditunggu karena aura anda yang memberikan kenyamanan dan keceriaan bagi semua orang. Anda sangat pandai berbicara sehingga anda dianggap sangat menarik oleh banyak orang. Selain itu, ditunjang oleh kepribadian anda yang sangat berwibawa dan praktis dalam menjalankan karir dan usaha sehingga dapat menuju gerbang sukses dengan dukungan teman-teman yang dapat menguntungkan anda. Anda tentunya bukanlah orang yang pasif. Anda bertindak cepat dalam membantu sesama dan sangat peduli terhadap kepentingan masyarakat. Hindari dari aktivitas yang berlebih dengan teman-teman sehingga anda tidak dicap egois oleh pasangan karena terlalu banyak waktu dan usaha yang anda habiskan untuk teman-teman.";
strDesc[7]="Anda orang yang memerlukan tempat dimana anda bisa merasa nyaman dengan yang lain. Anda terlalu menutup diri sehingga seringkali dengan mudah mengalami depresi. Keinginan anda untuk menemukan jawaban-jawaban tersembunyai adalah dengan bantuan supranatural atau hal-hal lain yang tidak disangka karena kepribadian anda yang memang sangat tertutup dan lebih baik tidak berbicara. Perasaan anda tidak terdeteksi oleh orang-orang disekitar karena anda tidak pernah membicarakan tentang diri secara benar. Percakapan anda hanya akan menjadi tidak bernilai. Ketahuilah bahwa anda perlu menjadi diri sendiri dan berusaha menjadi teman yang nyata bagi banyak orang.";
strDesc[8]="Anda mempunyai bakat dalam mengelola usaha dan keuangan. Anda mempunyai banyak impian akan tetapi jarang sekali orang yang dapat memahami ambisi anda. Akan tetapi anda orang yang cukup bijaksana dan selalu adil dalam bertindak. Anda banyak terlihat ditempat-tempat yang mewah karena menyukai gaya hidup yang berkualitas. Berilah diri anda waktu untuk relaksasi dan menikmati kehidupan karena disamping akan jauh lebih sehat, anda juga lebih bahagia. Janganlah dengan jabatan dan keuangan yang dimiliki, anda dapat dengan mudah menjadi sombong, mau menang sendiri, dan menyalah gunakan kekuasaan. Anda juga tidak menjadi pendengar yang baik terhadap anjuran atau cerita orang lain. Tidak dapat dipungkiri bahwa anda adalah peraih sukses dan kebanyakan dapat meraih sukses gemilang.";
strDesc[9]="Anda bukan tipe orang yang sombong. Anda menjadi bijaksana melalui berbagai macam pengalaman hidup yang sungguh-sungguh mengajarkan pelajaran untuk lebih mendekatkan diri kepada Tuhan dan berbuat baik bagi semua orang. Itu telah anda sadari betul, sehingga anda merasa tidak perlu untuk berbuat semena-mena atau menyombongkan diri. Anda orang yang sangat romantis dan dapat berkata-kata dengan indah. Anda juga menyukai bahasa dan kultur negara asing. Anda suka memberikan inspirasi kepada banyak orang. Sikap anda yang penuh dengan empati, keceriaan, dan penuh perhatian membuat anda manjadi tamu istimewa dalam setiap undangan. Anda orang yang cukup populer ditengah-tengah teman karena kebaikan yang mereka rasakan. Anda akan jauh lebih sukses apabila berkarir dalam hal-hal kemanusiaan, diplomat, translator, atau petinggi agama. Akan tetapi, apapun karir atau bisis yang anda pilih, itu semua akan berujung pada nilai-nilai kemanusiaan yang anda pegang tinggi karena sikap anda yang dermawan.";
strDesc[11]="Segala talenta adalah milik anda. Anda orang yang yakin dalam apa yang anda lakukan. Akan tetapi anda harus berusaha berjalan pada sisi positif dalam hidup karena kekuatan dari kepribadian itu bisa menjadikan anda orang yang sia-sia. Anda termasuk orang yang cerdas dan sangat pandai. Tidak memakan waktu yang lama bagi anda untuk bisa menguasai banyak hal yang menyangkut karir atau bisnis. Anda dapat meraih sukses besar dalam keuangan. Anda orang yang suka berhubungan dengan orang yang penting yang dapat menguntungkan. Anda terlahir untuk mengajarkan sesuatu hal yang baik untuk kepentingan orang lain.";
strDesc[22]="Anda orang yang berambisi meraih kesuksesan. Melalui talenta dan tantangan yang cukup ketat, anda akhirnya dapat memenangkan banyak hal dalam karir, bisnis, maupun kehidupan pribadi. Anda belajar banyak hal dari kesulitan. Berhati-hatilah dengan tindakan anda, sehingga tidak menjadikan karma bagi hidup anda dikemudian hari. Anda orang yang mempesona dan mempunyai banyak energi untuk melakukan banyak hal. Anda tidak mengenal lelah dalam bekerja. Anda disarankan untuk lebih bersabar terhadap mereka yang tidak sehebat anda, karena anda cenderung menyukai kesempurnaan dan sangat idealis.";
$("#artiNamaJudul").html("Karakter :<br />"+strArti[strNameNum]);
$("#artiNamaDesc").html("Pada Umumnya :<br />"+strDesc[strNameNum]);
}
}
function getPandanganIslam(){
var b1date=$('#fAstDate').datepicker('getDate').getDate();
var strDateView = new Array();
strDateView[1]="Surat Al Fatihah (Pembukaan)<br>Memiliki Karakter :<br>Menyukai hal baru, berbakat menjadi pemimpin, seorang pioneer (pelopor), idealis, cenderung ingin sempurna, pandai memanfaatkan kesempatan, egois, harus selalu jadi prioritas utama, sering mengulangi kesalahan yang sama, orang yang belum mengenalnya akan mengira sebagai sosok yang angkuh dan sulit ditaklukkan.";
strDateView[2]="Al Baqarah (Sapi Betina)<br>Memiliki Karakter :<br>Pekerja keras, taat akan hukum dan aturan, memiliki  jiwa sosial dan kepedulian tinggi, menyukai hal-hal yang bersifat rutinitas, jika dia mampu ada cenderungan menjadi seorang dermawan, kurang inisiatif, sering dimanfaatkan orang lain serta gampang percaya kepada orang lain.";
strDateView[3]="Al Imran (Keluarga Imran)<br>Memiliki Karakter :<br>Seorang pemimpin (walaupun dalam kelompok kecil), berhati-hati dalam bertindak, mengayomi, tegas, suka suasana perdebatan dan agak cerewet, jika wanita ia cenderung tomboy, ingin menang sendiri, seorang pemimpi dan sering berfantasi.";
strDateView[4]="An Nisa (Wanita)<br>Memiliki Karakter :<br>Sensitif dan perasa, feminim, protektif terhadap keluarga, kreatif, kompak tapi mudah dipengaruhi, agak jahil (iseng), dan penggoda.";
strDateView[5]="Al Maidah (Hidangan)<br>Memiliki Karakter :<br>Diperlukan banyak orang, menyukai perubahan, memiliki insting yang lumayan, cepat bosan, ingin dilayani, susah diatur.";
strDateView[6]="Al Anaam (Binatang Ternak)<br>Memiliki Karakter :<br>Punya insting tajam, kurang mandiri, terkadang seenaknya sendiri, emosional, pemalu dan kurang percaya diri, dan cepat berubah pikiran.";
strDateView[7]="Al A’Raaf (Tempat Tertinggi)<br>Memiliki Karakter :<br>Cermat dan teliti, mudah mengambil hati orang lain, penuh inspirasi, terlihat sombong, suka meremehkan dan cepat puas.";
strDateView[8]="Al Anfaal (Harta Rampasan Perang)<br>Memiliki Karakter :<br>Optimis, mobilitas tinggi, menyukai perubahan, emosional, gampang berubah pendirian, saat marah suka menyakiti diri sendiri.";
strDateView[9]="At Taubah (Pengampunan)<br>Memiliki Karakter :<br>Pemaaf, perfeksionis, mudah bergaul, tegas, tidak suka basa basi, tidak cepat puas, ingin selalu diperhatikan, keras kepala dan mudah goyah.";
strDateView[10]="Yunus (Nabi Yunus)<br>Memiliki Karakter :<br>Cepat menyesuaikan, banyak cara keluar dari persoalan, setiap kemauan harus terpenuhi, licin dan cerdik, tidak bisa dikekang dan susah diatur, mudah menyangkal dan banyak alasan.";
strDateView[11]="Huud (Nabi Hud)<br>Memiliki Karakter :<br>Dibutuhkan banyak orang, mudah menerima, berhati-hati dalam berbuat, tidak banyak kemauan, pasif, terkadang diremehkan, peka perasaan.";
strDateView[12]="Yusuf (Nabi Yusuf)<br>Memiliki Karakter :<br>Percaya diri, optimisme tinggi, tekun, teliti, disukai banyak orang, emosional, tidak mudah percaya, tidak bisa menahan keinginan, ambisius.";
strDateView[13]="Ar Ra’du (Guruh / Petir)<br>Memiliki Karakter :<br>Pemikir, dinamis, menyukai perbedaan, mudah menarik perhatia, logis, suka berdebat, tempramental, lambat memahami sesuatu.";
strDateView[14]="Ibrahim (Nabi Ibrahim)<br>Memiliki Karakter :<br>Pembimbing yang baik, patuh pada aturan, keras dan tegas, banyak rencana, rela berkorban.";
strDateView[15]="Al Hijr (Batu)<br>Memiliki Karakter :<br>Perfeksionis, keras kepala, telaten, gampang goyah pendiriannya, mudah dipengaruhi.";
strDateView[16]="An Nahl (Lebah)<br>Memiliki Karakter :<br>Rajin dan tekun, ramah, peka pada suasana di sekitarnya, berjiwa sosial, pandai memanfaatkan kesempatan, rapi, cerewet, sensitif dan agak cengeng, pendendam.";
strDateView[17]="Al Israa (Perjalanan Malam)<br>Memiliki Karakter :<br>Idealis, banyak ide, suka berkhayal, emosional, lebih produktif jika beraktivitas pada malam hari (kegiatan yang baik dan bermanfaat).";
strDateView[18]="Al Kahfi (Penghuni-Penghuni Gua)<br>Memiliki Karakter :<br>Suka menolong, pengamat yang baik, pandai menyimpan rahasia, tidak mudah percaya, suka memendam masalah dan mengurung diri, susah ditebak maksudnya.";
strDateView[19]="Maryam (Kisah Maryam)<br>Memiliki Karakter :<br>Pengasuh, kekanak-kanakan, menyukai anak-anak, suka mengajar, sabar, memiliki banyak cara menyelesaikan masalah, bicara berdasar bukti, sering difitnah.";
strDateView[20]="Thaha (طه, Tā-Hā, Ta Ha)<br>Memiliki Karakter :<br>Misterius, suka bepergian, memegang teguh aturan, suka lari dari masalah.";
strDateView[21]="Al Anbiyaa (Para Nabi)<br>Memiliki Karakter :<br>Bertanggung jawab, seorang pemimpin dan pemikir, pendengar yang baik, menerima apa adanya (ikhlas), tidak banyak kemauan.";
strDateView[22]="Al Hajj (الحجّ, al-Hajj, Haji)<br>Memiliki Karakter :<br>Segala sesuatu harus sempurna, mudah dipengaruhi, gampang terpengaruh, terburu-buru ingin cepat sampai tujuan, menyukai keramaian, sering berfikir muluk.";
strDateView[23]="Al mu’minuun (Orang-Orang Yang Beriman)<br>Memiliki Karakter :<br>Normatif, sensitif, feminim, fanatik terhadap sesuatu, mudah terpancing emosinya.";
strDateView[24]="An Nuur (Cahaya )<br>Memiliki Karakter :<br>Mudah memberikan jalan keluar, cermat memilah masalah, pendengar setia, mudah tersinggung, suka mengungkit-ungkit, gampang menyalahkan.";
strDateView[25]="Al Furqan (Pembeda)<br>Memiliki Karakter :<br>Punya skala prioritas, gemar membandingkan, ceplas ceplos, kurang inisiatif dan tidak banyak kemauan.";
strDateView[26]="Asy Syuara (Musyawarah)<br>Memiliki Karakter :<br>Pandai mengambil hati, suka berbelit-belit, kurang berani untuk menyampaikan keinginan, agak cerewet, tidak banyak keinginan, kurang romantis.";
strDateView[27]="An Naml (Binatang Semut)<br>Memiliki Karakter :<br>Insting kuat, memiliki perencanaan yang baik, pandai memanfaatkan peluang, susah bekerja sendiri, mudah panik, tidak bisa disalahkan, mudah tersinggung, tidak bisa ditentang.";
strDateView[28]="Al Qashash (Cerita - Cerita)<br>Memiliki Karakter :<br>Berani menyampaikan keinginan dan pendapat, memegang komitmen, mudah bergaul, tidak pernah kehabisan bahan pembicaraan, pendendam, emosional, romantis, pencemburu.";
strDateView[29]="Al Ankabuut (Laba - Laba)<br>Memiliki Karakter :<br>Banyak kenalan, sabar, dinamis, kurang menyukai keramaian, tidak berfikir panjang, kurang pandai memelihara  jaringan, bekerja kurang sistematis, mudah tersinggung.";
strDateView[30]="Ar Ruum (Bangsa Romawi)<br>Memiliki Karakter :<br>Optimis, banyak akal, anggun, tempramental, suka bertindak semaunya dan ingin menang sendiri, pencemburu berat, setiap kemauannya harus dipenuhi.";
strDateView[31]="Lukman (Kisah Tentang Luqman)<br>Memiliki Karakter :<br>Bijaksana, seorang pemimpin, melindungi komunitasnya, sabar, tekad kuat, otoriter, setiap perintahnya harus dituruti.";
var strDayView = new Array();
strDayView[0]="Orang yang terlahir pada hari minggu berarti bintangnya ialah bintang matahari, yang artinya anda adalah seseorang berkarakter sangat keras serta konsekuen dalam mengejar cita-cita, kemauan ataupun keinginan anda agar dapat menghidupi seluruh keluarga anda, hingga pertengahan usia, anda memiliki karir menanjak serta memiliki peran penting. Namun menjelang masa usianya berakhir, semangatnya makin menurun, hingga menjelang akhir hayatnya. Malaikat yang menjadi penunggu anda adalah Rofi-yail di atas dan Maimun di bawah. Yang membawa pengaruh bagi kemauan yang membara. Sedangkan perhiasan yang cocok adalah logam emas, sesuatu logam mulia yang bernilai tinggi, berguna bagi siapa saja, banyak orang ingin memilikinya.";
strDayView[1]="Jika anda terlahir pada hari senin artinya bintang yang menaungi anda ialah bintang qomar, yang memiliki arti berwatak dingin, bersifat ‘basah’, anda dapat menghidupi dan menyenangkan orang lain dalam waktu kegelapan. Sebagaimana pancaran cahaya bulan, kebaikan kebajikan anda menanjak dan cemerlang hingga usia setengah tua, kemudian makin menurun hingga akhir hayatnya. Malaikat yang menungguinya adalah Jibril di atas dan Murroh di bawah. Logamnya perak, adalah putih bersih, namun keras dan adakalanya suka dilapisi oleh hal-hal yang mengindahkan baginya hingga memperdaya orang yang memandang.";
strDayView[2]="Anda yang terlahir pada hari selasa berarti berbintang marikh yang artinya anda cendrung berwatak panas dan kering, segala kemauan anda selalu terburu-buru, keras hati dan sangat sulit untuk dicegah. Namun anda sangat mampu dan berguna, karena anda memiliki semangat untuk bekerja keras, kondisi ini pada akhirnya membawa anda pada prestasi yang gemilang di kehodupan kelak. Malaikat yang menjadi penunggunya adalah Sam’sail di atas dan Al Ahmar di bawah. Yang memberi pengaruh kerasnya kemauan dengan cita-cita yang tinggi itu. Logamnya tembaga sifatnya yang lebih meliputi segenap lapisan masyarakat, tidak mau membedakan antara sesama.";
strDayView[3]="Jika anda terlahir pada hari rabu berarti bintang anda ialah bintang utarid, yang memiliki karakter panas dan dingin. Artinya anda mampu menjadi pendorong atau penyemangat manakala ada seseorang yang lemah, tetapi anda juga bisa menjadi seseorang pengekang kehendak yang begitu agresif dan ekstrim. Simpelnya anda bisa menjadi pengayom tetapi seketika bisa menjadi penghancur bila tidak sesuai dengan apa yang dikehendaki. Malaikat yang menjadi penunggunya adalah Mikail di atas dan Burqon di bawah, sebagai pemberi pengaruh atas sifatnya yang bisa kontradiksi dalam mengejar keseimbangan hidupnya.";
strDayView[4]="Jika anda terlahir pada hari kamis berarti bintang anda ialah bintang Mustari yang artinya anda memiliki karakter panas namun basah, maksudnya ialah pekerjaan yang ditangani akan secara cepat dilakukan, jika anda memimpin anda akan memipin dengan berlaku keras namun bertanggung jawab atas segala halnya. Malaikat yang menjadi penunggunya adalah Shorfiya’il di atas dan Syamhurus di bawah, yang membawa daya atas sifatnya yang keras tetapi bertanggung jawab itu. Logamnya timah, yang membawa makna bahwa wujudnya sederhana dan berguna bagi masyarakat dan dapat sebagai perekat atau pemenuhan hal-hal yang kurang beres.";
strDayView[5]="Jika anda terlahir pada hari Jum’at maka bintang anda ialah bintang Zuhri yang berarti anda mempunyai semangat dingin dan hati kering, yang menandakan bahwa anda ialah sosok yang pendiam, tidak begitu peduli dengan persoalan yang tidak menyangkut kepada diri anda, begitupun dengan mengejar kepentingan duniawi, tidak terburu nafsu dan kelak akan dapat dengan tenang, sejahtera lahir dan batin. Malaikat yang menjadi penunggunya adalah Isyail di atas dan Zub’ah di bawah yang membuat ia kuat kemauannya. Logam besi adalah sentosa, kuat, berat tetapi berdaya guna.";
strDayView[6]="Jika anda lahir pada hari sabtu, maka bintang yang menaungi anda ialah Bintang Zuhel, yang memiliki arti bahwa anda mudah terburu-buru dalam mengejar kemajuan, tetapi anda juga bersikap sabar, menerima, rela berkorban dan baik terhadap sesama. Anda memiliki karakter ‘basah’ yang berarti selalu memberikan kedamaian pada orang lain, rezeki andapun cukup serta sehat sentosa selamanya. Malaikat yang menjadi penunggu anda adalah Kasfiyail di atas dan Almazhab di bawah, yang membawa pengaruh kebajikan dan kelestarian. Logamnya baja, yang mengandung firasat kemauan yang keras, tajam pikiran dan cerdas. ";
$("#dateIslamicHijriah").html('<i class="fa fa-bookmark" aria-hidden="true"></i> ['+b1date+'] '+strDateView[b1date]);
$("#dateIslamicView").html('<i class="fa fa-anchor" aria-hidden="true"></i> '+strDayView[$('#fAstDate').datepicker('getDate').getDay()]);
}
function getOrbital(){
var strDate=$('#fAstDate').datepicker('getDate').getDate();
var strMonth=$('#fAstDate').datepicker('getDate').getMonth();
var strYear=$('#fAstDate').datepicker('getDate').getFullYear();
var strDay=$('#fAstDate').datepicker('getDate').getDay();
var strDateUse=strDate;
var strMonthUse=strMonth+1;
if (strDateUse < 10){strDateUse = '0' + strDateUse;}
if (strMonthUse < 10){strMonthUse = '0' + strMonthUse;}
var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
$("#angkaAstUntungTglLahir").html(strDateUse+"-"+strMonthUse+"-"+strYear);
var x1=((Math.random()*100)+strDateUse)/2;
var x2=((Math.random()*100)+strMonthUse)/2;
var x3=((Math.random()*100)+strYear)/2;
var x4=x1+x2+x3;
for(var i=0;i < 5;i++){
x4=Math.random()*x4;
x4=Math.sqrt(x4);
x4=x4.toString();
x4=x4.substring(x4.length-2,x4.length);
$("#angkaAstUntung"+(i+1)).html(x4);
}
}
function getArtiHari(){
var dayIndex=new Array();
dayIndex[0]='MEGA <i class="fa fa-sort" aria-hidden="true"></i> SI OPTIMIS';
dayIndex[1]='BUNGA <i class="fa fa-sort" aria-hidden="true"></i> SI RUPAWAN';
dayIndex[2]='API <i class="fa fa-sort" aria-hidden="true"></i> SI KHARISMA';
dayIndex[3]='DAUN <i class="fa fa-sort" aria-hidden="true"></i> SI DERMAWAN';
dayIndex[4]='ANGIN <i class="fa fa-sort" aria-hidden="true"></i> SI PEKERJA';
dayIndex[5]='AIR <i class="fa fa-sort" aria-hidden="true"></i> SI PEMURUNG';
dayIndex[6]='BUMI <i class="fa fa-sort" aria-hidden="true"></i> SI PELANCONG';
$("#fAstArtiHari").html(dayIndex[$('#fAstDate').datepicker('getDate').getDay()]);
}

function getAuraAst(){
var strDate=$('#fAstDate').datepicker('getDate').getDate();
var strMonth=$('#fAstDate').datepicker('getDate').getMonth();
var strYear=$('#fAstDate').datepicker('getDate').getFullYear();
var neptu1=getNeptuAst($('#nowDateAst').datepicker('getDate'));
var neptu2=getNeptuAst($('#fAstDate').datepicker('getDate'));
strDate2=$('#nowDateAst').datepicker('getDate').getDate();
strMonth2=$('#nowDateAst').datepicker('getDate').getMonth();
strYear2=$('#nowDateAst').datepicker('getDate').getFullYear();
var color=['none','red','yellow','orange','green','blue','indigo','purple','pink','#cd7f32','#aaa9ad','#d4af37'];
var warna=['','merah','kuning','orange','hijau','biru','indigo','ungu','pink','perunggu','perak','emas'];
if(neptu1==22){neptu1=12;}
if(neptu2==22){neptu2=12;}
$('#warnaAuraTglHariIni').html(strDate2+'-'+strMonth2+'-'+strYear2);
$('#warnaAuraHariIni').html(warna[neptu1]+' <span class="imgAst" style="background:'+color[neptu1]+';vertical-align:middle;float:right;"></span>');
var rasio=Math.abs(neptu1-neptu2);
if(rasio==0){rasio=neptu2}
var auraAve=0;
var strName=$('#fAstName').val();
if(strName!=""&&strName!=null&&strName!="Nama Lengkap"){
var strNameNum=getArtiNamaCalc(strName);
if(strNameNum==22){strNameNum=12;}
auraAve=Math.round((neptu1+neptu2+strNameNum)/3);
auraAve=Math.abs(rasio-auraAve);
if(auraAve==0){auraAve=rasio;}
$('#warnaAuraPersonal').html(warna[strNameNum]+' <span class="imgAst" style="background:'+color[strNameNum]+';vertical-align:middle;float:right;"></span>');
$('#warnaAuraTglLahir').html(strDate+'-'+strMonth+'-'+strYear);
$('#warnaAuraDomain').html(warna[neptu2]+' <span class="imgAst" style="background:'+color[neptu2]+';vertical-align:middle;float:right;"></span>');
$('#warnaAuraRasio').html(warna[rasio]+' <span class="imgAst" style="background:'+color[rasio]+';vertical-align:middle;float:right;"></span>');
$('#warnaAuraAve').html(warna[auraAve]+' <span class="imgAst" style="background:'+color[auraAve]+';vertical-align:middle;float:right;"></span>');
}}
</script>

<!-- this script is applied on jodoh apps -->
<script>
function letterValue(str){
var anum={
a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, 
l: 12, m: 13, n: 14,o: 15, p: 16, q: 17, r: 18, s: 10, t: 20, 
u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
}
if(str.length== 1) return anum[str] || ' ';
return str.split('').map(letterValue);
}
function getArtiNamaCalc(data){
var strName=data;
strName=strName.toLowerCase().replace(/\s/g, '').split('');
var strNameNum=0;var strNameNum1=0;var strNameNum2=0;var strNameNum3=0;var strNameNum4=0;
for(var i=0;i<strName.length;i++){
strNameNum1+=letterValue(strName[i]);
}
if(strNameNum1==11||strNameNum1==22){return strNameNum=strNameNum1;}
var digits = strNameNum1.toString().split('');
if(digits.length==4){strNameNum2=parseInt(digits[0])+parseInt(digits[1])+parseInt(digits[2])+parseInt(digits[3]);if(strNameNum2==11||strNameNum2==22){return strNameNum=strNameNum2;}}
if(digits.length==3){strNameNum2=parseInt(digits[0])+parseInt(digits[1])+parseInt(digits[2]);if(strNameNum2==11||strNameNum2==22){return strNameNum=strNameNum2;}}
if(digits.length==2){strNameNum2=parseInt(digits[0])+parseInt(digits[1]);if(strNameNum2==11||strNameNum2==22){return strNameNum2;}}
if(digits.length==1){strNameNum2=parseInt(digits[0]);strNameNum=strNameNum2;if(strNameNum2==11||strNameNum2==22){return strNameNum2;}}
if(strNameNum2 => 9){
var digits1 = strNameNum2.toString().split('');
if(digits1.length==3){strNameNum3=parseInt(digits1[0])+parseInt(digits1[1])+parseInt(digits1[2]);if(strNameNum3==11||strNameNum3==22){return strNameNum=strNameNum3;}}
if(digits1.length==2){strNameNum3=parseInt(digits1[0])+parseInt(digits1[1]);if(strNameNum3==11||strNameNum3==22){return strNameNum=strNameNum3;}}
if(digits1.length==1){strNameNum3=parseInt(digits1[0]);strNameNum=strNameNum3;if(strNameNum3==11||strNameNum3==22){return strNameNum=strNameNum3;}}
}else{strNameNum=strNameNum1;}
if(strNameNum3 => 9){
var digits2 = strNameNum3.toString().split('');
if(digits2.length==2){strNameNum4=parseInt(digits2[0])+parseInt(digits2[1]);if(strNameNum4==11||strNameNum4==22){return strNameNum=strNameNum4;}}
if(digits2.length==1){strNameNum4=parseInt(digits2[0]);strNameNum=strNameNum4;if(strNameNum4==11||strNameNum4==22){return strNameNum=strNameNum4;}}
}else{strNameNum=strNameNum3;}
return strNameNum;
}
//]]>
