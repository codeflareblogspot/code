//<![CDATA[
/* Start Version */
var appCFAstVer='3.0.0';
/* End Version */
/* Start Initial Date Value */
if (navigator.canShare) {
$('#fBtnAstShare > i').removeClass('fa-brands fa-whatsapp').addClass('fa-solid fa-share-nodes');
}
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
contentAPT[3]="REFLEKSI ISLAMI";
contentAPT[4]="WARNA AURA";
contentAPT[5]="ANGKA AJAIB";
var contentAPF=new Array();
contentAPF[0]='<i class="fa-solid fa-cube" aria-hidden="true"></i>';
contentAPF[1]='<i class="fa-solid fa-chart-line" aria-hidden="true"></i>';
contentAPF[2]='<i class="fa-solid fa-circle-user" aria-hidden="true"></i>';
contentAPF[3]='<i class="fa-solid fa-moon" aria-hidden="true"></i>';
contentAPF[4]='<i class="fa-solid fa-tower-broadcast" aria-hidden="true"></i>';
contentAPF[5]='<i class="fa-solid fa-sun" aria-hidden="true"></i>';
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
function (){$("#titleHeaderAst").html('<i class="fa-solid fa-chart-line" aria-hidden="true"></i> BIORITMIK');});
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
res = str.substring(str.lastIndexOf(str.match(name)) + name.length,str.length);
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
if(str.match(name)){getBioImage();}
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
const shareButton = document.querySelector('#fBtnAstShare');
shareButton.addEventListener('click', event => {
var username = $('#fAstName').val();
if (username == "" || username == null || username.toLowerCase() =="nama lengkap"){
alert("Silakan ketik nama anda terlebih dahulu dan pilih tanggal lahir anda !");
$("#fAstName").trigger( "focus" );return;}
if (username.length < 3){alert("Silakan ketik nama anda dengan benar!");return;}
var dataAstrologi=(window.location.hostname)+"#data="+(window.btoa($('#fAstName').val()))+";"+(window.btoa($('#fAstDate').val()))+";"+contentAPN1;
var a = 'ASTROLOGI reading for '+escape($('#fAstName').val())+'%0A%0ADetail Source :%0A'+escape(dataAstrologi)+'%0A%0ASend from :%0A'+escape(window.location.hostname);
var shareText = 'ASTROLOGI reading for ' + $('#fAstName').val() + '\n\nDetail Source : \n' + dataAstrologi;
if (navigator.share) {
    navigator.share({
      title: 'codeflare.net',
      text: shareText
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){var addQuotes = 'whatsapp://send?phone=&text='+a;}
else{var addQuotes = 'https://web.whatsapp.com/send?phone=&text='+a;}
chkBrowserAst(addQuotes,800,600);
  }
});

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
/* Primbon engine moved to v3 block */
/* Zodiac engine moved to v3 block */
/* Shio engine moved to v3 block */
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
$("#dateIslamicMasehi").html("<center>"+$('#fAstDate').datepicker('getDate').getDate()+'-'+($('#fAstDate').datepicker('getDate').getMonth()+1)+'-'+$('#fAstDate').datepicker('getDate').getFullYear()+' <i class="fa-solid fa-left-right" aria-hidden="true"></i> '+dateHijri+'</center>');
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
if ($("#fBtnAstSubmit").html()=='<i class="fa-solid fa-display" aria-hidden="true"></i> Lihat Data'){
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
$("#fBtnAstSubmit").html('<i class="fa-solid fa-display" aria-hidden="true"></i> Lihat Data');
if($("#lihatAstroBlog").data('draggable')){$("#lihatAstroBlog").draggable('destroy');}
$('html,body').animate({scrollTop: $('.astroBlogMainUI').offset().top},'slow');
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
/* Name numerology engine moved to v3 block */
/* Islamic reflection engine moved to v3 block */
/* Lucky-number engine moved to v3 block */
function getArtiHari(){
var dayIndex=new Array();
dayIndex[0]='MEGA <i class="fa-solid fa-right-left" aria-hidden="true"></i> SI OPTIMIS';
dayIndex[1]='BUNGA <i class="fa-solid fa-right-left" aria-hidden="true"></i> SI RUPAWAN';
dayIndex[2]='API <i class="fa-solid fa-right-left" aria-hidden="true"></i> SI KHARISMA';
dayIndex[3]='DAUN <i class="fa-solid fa-right-left" aria-hidden="true"></i> SI DERMAWAN';
dayIndex[4]='ANGIN <i class="fa-solid fa-right-left" aria-hidden="true"></i> SI PEKERJA';
dayIndex[5]='AIR <i class="fa-solid fa-right-left" aria-hidden="true"></i> SI PEMURUNG';
dayIndex[6]='BUMI <i class="fa-solid fa-right-left" aria-hidden="true"></i> SI PELANCONG';
$("#fAstArtiHari").html(dayIndex[$('#fAstDate').datepicker('getDate').getDay()]);
}

/* Aura engine moved to v3 block */
/* ==========================================================
   CodeFlare Astrology Engine v3.0.0 Override
   Updated reading copy + safer calculations + FA7 ready
   ========================================================== */
function cfAstReduce(n){n=Math.abs(parseInt(n,10)||0);while(n>9&&n!==11&&n!==22){n=String(n).split('').reduce(function(a,b){return a+(parseInt(b,10)||0);},0);}return n;}
function getArtiNamaCalc(str){var x=(str||'').toLowerCase();if(x.normalize)x=x.normalize('NFD').replace(/[\u0300-\u036f]/g,'');x=x.replace(/[^a-z]/g,'');var n=0;for(var i=0;i<x.length;i++)n+=x.charCodeAt(i)-96;return cfAstReduce(n);}
function getZodiacIndex(m,d){var x=m*100+d;if(x>=1222||x<=119)return 0;if(x<=218)return 1;if(x<=320)return 2;if(x<=419)return 3;if(x<=520)return 4;if(x<=620)return 5;if(x<=722)return 6;if(x<=822)return 7;if(x<=922)return 8;if(x<=1022)return 9;if(x<=1121)return 10;return 11;}
function getLunar(){
var dt=$('#fAstDate').datepicker('getDate'),i=getZodiacIndex(dt.getMonth()+1,dt.getDate());lunarTypeNum=i;
var z=[
['Capricorn','&#x2651;','Bumi','Coklat','Cancer','Disiplin, realistis, bertanggung jawab, konsisten.','Terlalu serius, sulit melepas kontrol, cenderung memendam beban.','Capricorn biasanya berkembang lewat proses bertahap. Kekuatan utamanya adalah konsistensi dan kemampuan menjaga arah ketika hasil belum terlihat. Tantangannya adalah memberi ruang untuk istirahat, spontanitas, dan bantuan dari orang lain.','https://2.bp.blogspot.com/-cYB97SQYq6M/Vka6S-HDbQI/AAAAAAAAAWk/7Fkw8swx3Ys/s1600/Doll%2BZodiac%2BCapricorn.gif'],
['Aquarius','&#x2652;','Udara','Pirus','Leo','Orisinal, independen, terbuka pada ide baru, objektif.','Terlihat berjarak, sulit ditebak, keras mempertahankan prinsip.','Aquarius sering melihat kemungkinan yang belum diperhatikan orang lain. Mereka nyaman dengan kebebasan berpikir. Tantangannya adalah tetap terhubung secara emosional, bukan hanya memahami sesuatu lewat logika.','https://4.bp.blogspot.com/-7k1AuyH1Jdc/Vka6SKNqqpI/AAAAAAAAAWg/wEdg8VKXrXM/s1600/Doll%2BZodiac%2B%2BAquarius.gif'],
['Pisces','&#x2653;','Air','Hijau Laut','Virgo','Empatik, intuitif, imajinatif, peka suasana.','Batas pribadi mudah kabur, terlalu terbawa perasaan.','Pisces sering digambarkan peka dan imajinatif. Empati menjadi kekuatan besar, tetapi akan lebih sehat bila dibarengi batas pribadi dan kemampuan membedakan intuisi dari kekhawatiran.','https://2.bp.blogspot.com/-eK7u8sM2iyM/Vka6TyfRyzI/AAAAAAAAAXU/BxC8z7Hc3ic/s1600/Doll%2BZodiac%2BPisces.gif'],
['Aries','&#x2648;','Api','Merah','Libra','Berani, cepat bertindak, antusias, kompetitif.','Tidak sabar, reaktif, kurang menikmati proses lambat.','Aries identik dengan dorongan untuk memulai. Energinya efektif ketika diarahkan pada target konkret. Tantangannya adalah tidak menganggap kecepatan selalu lebih penting daripada ketepatan.','https://4.bp.blogspot.com/-gf9RqE9bUuQ/Vka6SVa3bRI/AAAAAAAAAWc/sgCpRY_C4-8/s1600/Doll%2BZodiac%2BAries.gif'],
['Taurus','&#x2649;','Bumi','Merah Jambu','Scorpio','Sabar, stabil, setia, praktis, konsisten.','Sulit berubah, terlalu nyaman dengan pola lama.','Taurus dikaitkan dengan kestabilan dan kemampuan mempertahankan ritme. Ketekunan menjadi kekuatan, sedangkan tantangannya adalah mengetahui kapan bertahan dan kapan perubahan justru diperlukan.','https://4.bp.blogspot.com/-WlQIsamt1cE/Vka6Uq7ek0I/AAAAAAAAAXY/0-tYQMwyShw/s1600/Doll%2BZodiac%2BTaurus.gif'],
['Gemini','&#x264A;','Udara','Hijau','Sagittarius','Komunikatif, cepat belajar, adaptif, penuh rasa ingin tahu.','Mudah terdistraksi, cepat bosan, membuka terlalu banyak hal.','Gemini kuat dalam menghubungkan informasi dan orang. Pikiran yang cepat membuat mereka mudah beradaptasi. Tantangannya adalah memilih mana yang layak didalami agar energi tidak habis hanya untuk berpindah fokus.','https://4.bp.blogspot.com/-FKC1LSWo7iI/Vka6S-Jn6-I/AAAAAAAAAWo/zj8ixp9wQ6Y/s1600/Doll%2BZodiac%2BGemini.gif'],
['Cancer','&#x264B;','Air','Putih, Perak','Capricorn','Peduli, protektif, intuitif, setia.','Mudah tersinggung, defensif, sulit melepas masa lalu.','Cancer dikaitkan dengan kebutuhan akan rasa aman dan hubungan yang tulus. Mereka kuat dalam merawat. Tantangannya adalah tidak mengubah kehati-hatian menjadi benteng yang menyulitkan komunikasi.','https://3.bp.blogspot.com/-KrO0y0rc0Ng/Vka6SCk-eiI/AAAAAAAAAWY/IPsns0yISVw/s1600/Doll%2BZodiac%2BCancer.gif'],
['Leo','&#x264C;','Api','Emas, Oranye','Aquarius','Hangat, percaya diri, kreatif, murah hati.','Mudah tersentuh saat tidak dihargai, keras kepala.','Leo sering diasosiasikan dengan ekspresi diri dan keberanian tampil. Energi mereka besar ketika merasa dihargai. Tantangannya adalah membangun kepercayaan diri yang tidak sepenuhnya bergantung pada pengakuan orang lain.','https://4.bp.blogspot.com/-EEc1BgqgWhY/Vka6TNfIASI/AAAAAAAAAWs/csFvMUciHxc/s1600/Doll%2BZodiac%2BLeo.gif'],
['Virgo','&#x264D;','Bumi','Hijau, Coklat','Pisces','Teliti, analitis, praktis, suka memperbaiki detail.','Terlalu kritis, mudah khawatir, perfeksionis.','Virgo kuat dalam menganalisis dan memperbaiki proses. Tantangannya adalah membedakan standar yang sehat dari perfeksionisme yang justru memperlambat langkah.','https://3.bp.blogspot.com/-lS-UAuattUA/Vka6U8zystI/AAAAAAAAAXg/Nx-LDiJN-GE/s1600/Doll%2BZodiac%2BVirgo.gif'],
['Libra','&#x264E;','Udara','Biru','Aries','Diplomatis, kooperatif, sosial, peka keseimbangan.','Terlalu lama menimbang, sulit berkata tidak.','Libra pandai melihat lebih dari satu sudut pandang. Tantangannya adalah tetap mampu membuat keputusan walau tidak semua pihak dapat dibuat puas.','https://2.bp.blogspot.com/--5tEDVTC0os/Vka6TZpYK2I/AAAAAAAAAW4/E3Wg36pDTtY/s1600/Doll%2BZodiac%2BLibra.gif'],
['Scorpio','&#x264F;','Air','Merah Gelap, Hitam','Taurus','Fokus, intuitif, berani menghadapi masalah, loyal.','Sulit percaya, intens, menyimpan kekecewaan terlalu lama.','Scorpio kuat ketika harus menghadapi situasi rumit dan mencari jawaban yang lebih dalam. Tantangannya adalah mengelola kecurigaan dan belajar membuka diri secara bertahap.','https://4.bp.blogspot.com/-GnBHufemxOk/Vka6UJFEE_I/AAAAAAAAAXM/UMEgQLLmiO0/s1600/Doll%2BZodiac%2BScorpio.gif'],
['Sagittarius','&#x2650;','Api','Ungu','Gemini','Optimis, terbuka, suka belajar dan mencoba hal baru.','Kurang sabar pada detail, terlalu terus terang.','Sagittarius dikaitkan dengan eksplorasi dan pencarian wawasan baru. Tantangannya adalah tetap memperhatikan detail dan komitmen setelah rasa penasaran awal mulai berkurang.','https://4.bp.blogspot.com/-fLLE-UiX9iU/Vka6T2sQg-I/AAAAAAAAAXI/Eips-CmM1x8/s1600/Doll%2BZodiac%2BSagittarius.gif']];
var a=z[i];lunarType=a[0];$('#fAstZodiak').html(a[0]);$('#imgZodiak').html(a[1]);$('#lunarSign').attr('src',a[8]);$('#fAstElemen').html(a[2]);$('#fAstColor').html(a[3]);
var ic={Bumi:'fa-square',Udara:'fa-wind',Air:'fa-droplet',Api:'fa-fire'};$('#imgElemen').html('<i class="fa-solid '+ic[a[2]]+'" aria-hidden="true"></i>');
var h='<div style="text-align:justify;font-family:Verdana;font-size:16px;"><u>'+a[0]+'</u><br>Kepribadian:</div><div>'+a[7]+'</div><br><div style="font-family:Verdana;font-size:16px;">Ringkasan:</div><table border="0" width="100%"><tr><td width="140">Kekuatan</td><td>:</td><td>'+a[5]+'</td></tr><tr><td>Tantangan</td><td>:</td><td>'+a[6]+'</td></tr><tr><td>Elemen</td><td>:</td><td>'+a[2]+'</td></tr><tr><td>Warna</td><td>:</td><td>'+a[3]+'</td></tr><tr><td>Zodiak berlawanan</td><td>:</td><td>'+a[4]+'</td></tr></table><br><small>Deskripsi zodiak bersifat hiburan/refleksi dan bukan pengukuran ilmiah kepribadian.</small>';document.getElementById('lunarArea').innerHTML=h;
}
function cfChineseYear(dt){try{var p=new Intl.DateTimeFormat('en-u-ca-chinese',{year:'numeric'}).formatToParts(dt);for(var i=0;i<p.length;i++)if(p[i].type==='relatedYear')return parseInt(p[i].value,10);}catch(e){}return dt.getFullYear();}
function showShio(){var dt=$('#fAstDate').datepicker('getDate'),yr=cfChineseYear(dt),i=((yr-4)%12+12)%12;
var a=[
['Tikus','Cepat membaca situasi, adaptif, dan pandai menemukan jalan alternatif. Tantangannya adalah mengurangi kecemasan dan tidak terlalu memikirkan kemungkinan buruk. Secara tradisional sering dianggap selaras dengan Naga dan Monyet.','https://4.bp.blogspot.com/-qKfCGYPvQNM/XVzFpHvu5WI/AAAAAAAABUg/Enlovy495IgchE2kZKktzL7M0URlsK8LwCLcBGAs/s80/tikus.gif'],
['Lembu','Konsisten, tahan menghadapi proses panjang, dan dapat diandalkan. Tantangannya adalah tidak memaksakan cara sendiri ketika situasi berubah. Secara tradisional sering dianggap selaras dengan Ular dan Ayam.','https://3.bp.blogspot.com/-T_VCcbuV7ek/XVzFoHrKecI/AAAAAAAABUQ/7kTNs6eOgwk7GO38fcv3lZNAIhAODdUeACLcBGAs/s80/lembu.gif'],
['Macan','Berani, spontan, dan kuat ketika harus mengambil keputusan cepat. Tantangannya adalah membedakan keberanian dari keputusan impulsif. Secara tradisional sering dianggap selaras dengan Kuda dan Anjing.','https://3.bp.blogspot.com/-zrC_VogD47g/XVzFoYjIGAI/AAAAAAAABUU/FiVRp_YBQmsSlFctmGBFg1H7LJ05hwDLgCLcBGAs/s80/macan.gif'],
['Kelinci','Diplomatis, peka, dan menghargai lingkungan tenang. Tantangannya adalah tidak menunda pembicaraan penting hanya demi menghindari konflik. Secara tradisional sering dianggap selaras dengan Kambing dan Babi.','https://4.bp.blogspot.com/-EUFGYr-btdo/XVzFnc0TcbI/AAAAAAAABUM/YI0C-H_2IiQPNgcPCXj-2D5hy4gVCj8wQCLcBGAs/s80/kelinci.gif'],
['Naga','Penuh dorongan, percaya diri, dan nyaman membawa ide besar. Tantangannya adalah menjaga ekspektasi realistis dan memberi ruang bagi orang lain. Secara tradisional sering dianggap selaras dengan Tikus dan Monyet.','https://4.bp.blogspot.com/-CcIsmS5TvU0/XVzFozcZTYI/AAAAAAAABUc/vHwSkr69uvIvbNufvuAJ_3m5gxpYEdRbwCLcBGAs/s80/naga.gif'],
['Ular','Observatif, strategis, dan tidak terburu-buru membuka rencana. Tantangannya adalah tidak membiarkan kecurigaan menghambat hubungan. Secara tradisional sering dianggap selaras dengan Lembu dan Ayam.','https://4.bp.blogspot.com/-8YzKMLMPe9w/XVzFpuaxuwI/AAAAAAAABUk/a455iNnNTjYz0kAeXDxUFeGmTi5s1c1pQCLcBGAs/s80/ular.gif'],
['Kuda','Aktif, mandiri, dan mudah hidup ketika ruang gerak cukup luas. Tantangannya adalah mempertahankan konsistensi setelah antusiasme awal menurun. Secara tradisional sering dianggap selaras dengan Macan dan Anjing.','https://2.bp.blogspot.com/-QFOdlzEA_Xs/XVzFncviv6I/AAAAAAAABUI/btH6Rd2-bdI9F1DmgdsKSUXOPfv73tvOwCLcBGAs/s80/kuda.gif'],
['Kambing','Kreatif, hangat, dan peka terhadap suasana. Tantangannya adalah tidak terlalu keras menilai diri ketika hasil belum sesuai harapan. Secara tradisional sering dianggap selaras dengan Kelinci dan Babi.','https://4.bp.blogspot.com/-sZvfmZWuMoU/XVzFnWVTqYI/AAAAAAAABUE/Hy-G5lQiU_Qo2QTeFn-P0j4uWz8T19IiwCLcBGAs/s80/domba.gif'],
['Monyet','Cerdas, lincah, dan cepat menemukan solusi yang tidak biasa. Tantangannya adalah menghindari terlalu banyak eksperimen sekaligus. Secara tradisional sering dianggap selaras dengan Tikus dan Naga.','https://4.bp.blogspot.com/-e_sExACzkLE/XVzFonuw5DI/AAAAAAAABUY/TMn2tuWEuCYD5D2kO39sQiLBBMI-btQ6wCLcBGAs/s80/monyet.gif'],
['Ayam','Teliti, terus terang, dan memiliki standar jelas. Tantangannya adalah menyampaikan koreksi tanpa terdengar terlalu tajam. Secara tradisional sering dianggap selaras dengan Lembu dan Ular.','https://4.bp.blogspot.com/-MHfK0H-LkWY/XVzFmuYtvQI/AAAAAAAABUA/BtImP2f3vxg36ES8IgxtnfaMwxMypq5QwCLcBGAs/s80/ayam.gif'],
['Anjing','Setia, jujur, dan serius menjaga orang yang dianggap penting. Tantangannya adalah tidak membiarkan kewaspadaan berubah menjadi kekhawatiran terus-menerus. Secara tradisional sering dianggap selaras dengan Macan dan Kuda.','https://4.bp.blogspot.com/-XjTnynx5NPs/XVzFmV5r1PI/AAAAAAAABT4/PyM4857OP8kM1z16f7NG1AyIWfGSyfX4QCLcBGAs/s80/anjing.gif'],
['Babi','Terbuka, tulus, dan mudah menunjukkan kepedulian. Tantangannya adalah tidak terlalu mudah percaya atau mengorbankan kebutuhan pribadi. Secara tradisional sering dianggap selaras dengan Kelinci dan Kambing.','https://2.bp.blogspot.com/-zrPvmpJjEZA/XVzFms-Uj-I/AAAAAAAABT8/E844SoECOP0gQI1qYi_uGPM30D3z8fiYACLcBGAs/s80/babi.gif']];
var x=a[i];$('#fAstShio').html(x[0]);$('#imgShio').attr('src',x[2]);if(document.getElementById('descArea'))document.getElementById('descArea').innerHTML='<b><u>'+x[0]+'</u></b><br>'+x[1]+'<br><small>Shio bersifat tradisional/hiburan, bukan kepastian karakter atau masa depan.</small>';if(document.getElementById('zodSign'))document.getElementById('zodSign').src=x[2];}
function getArtiNama(){if(astroBlogUserID!=MD5(getHostName(window.location.href))||astroBlogVer!=astroBlogUserID)return;var n=$('#fAstName').val();if(!n||n==='Nama Lengkap'||n.replace(/\s/g,'').length<2){alert('Silakan ketik nama lengkap Anda terlebih dahulu.');$('#fAstName').trigger('focus');return;}var k=getArtiNamaCalc(n),d={1:['Inisiatif, mandiri, berani memulai.','Anda nyaman ketika memiliki ruang mengambil keputusan sendiri. Potensi kepemimpinan akan lebih kuat jika dibarengi kesabaran dan kemampuan mendengar.'],2:['Kooperatif, peka, diplomatis.','Anda mudah menangkap suasana dan sering menjadi penghubung ketika ada perbedaan. Jaga batas pribadi agar keinginan menjaga harmoni tidak membuat kebutuhan sendiri selalu ditunda.'],3:['Ekspresif, komunikatif, kreatif.','Ide dan cara menyampaikan sesuatu menjadi modal utama. Tantangannya adalah menjaga fokus agar kreativitas tidak berhenti sebagai banyak rencana.'],4:['Terstruktur, konsisten, realistis.','Anda percaya pada proses jelas dan hasil terukur. Ketekunan adalah kelebihan besar; tetap sisakan ruang untuk perubahan.'],5:['Adaptif, suka eksplorasi, cepat belajar.','Perubahan sering menyalakan energi Anda. Agar hasil lebih terasa, tentukan prioritas sebelum membuka terlalu banyak arah.'],6:['Peduli, bertanggung jawab, protektif.','Anda mudah menjadi orang yang dipercaya. Kekuatan merawat orang lain perlu diseimbangkan dengan kemampuan berkata tidak.'],7:['Analitis, reflektif, suka memahami sampai ke akar.','Anda nyaman mengamati sebelum memutuskan. Tantangannya adalah tidak mengubah kehati-hatian menjadi jarak yang terlalu jauh dari orang lain.'],8:['Ambisius, strategis, berorientasi hasil.','Kemampuan mengatur target dapat menjadi kekuatan. Jaga agar ukuran keberhasilan tidak hanya berupa status atau materi.'],9:['Empatik, idealis, kreatif.','Anda tertarik pada sesuatu yang terasa bermakna. Empati menjadi kekuatan, tetapi pilih kontribusi yang realistis dan konsisten.'],11:['Intuitif, visioner, sensitif terhadap ide.','Dalam numerologi, 11 disebut angka master. Potensinya lebih terasa ketika ide besar diberi struktur dan sensitivitas dikelola dengan sehat.'],22:['Pembangun, sistematis, mampu mengubah visi menjadi rencana.','Dalam numerologi, 22 sering disebut master builder. Tantangannya adalah tidak menuntut kesempurnaan; proyek besar tumbuh melalui langkah kecil.']};var x=d[k]||d[9];$('#artiNamaJudul').html('Karakter :<br />'+x[0]);$('#artiNamaDesc').html('Pada Umumnya :<br />'+x[1]+'<br><small>Numerologi nama digunakan sebagai hiburan/refleksi, bukan pengukuran ilmiah.</small>');}
function hijriDate(){var dt=$('#fAstDate').datepicker('getDate'),h='';try{h=new Intl.DateTimeFormat('id-ID-u-ca-islamic',{day:'numeric',month:'long',year:'numeric'}).format(dt);}catch(e){h=String(fixedToHijri(gregToFixed(dt.getFullYear(),dt.getMonth()+1,dt.getDate())))+' H';}$('#fAstHijriah').html(h);$('#dateIslamicMasehi').html('<center>'+dt.getDate()+'-'+(dt.getMonth()+1)+'-'+dt.getFullYear()+' <i class="fa-solid fa-left-right" aria-hidden="true"></i> '+h+'</center>');}
function getPandanganIslam(){var dt=$('#fAstDate').datepicker('getDate'),n=dt.getDate();var tema=['','Mulai dengan niat dan arah yang baik.','Bangun ketekunan melalui kebiasaan kecil.','Tetap teguh sambil terbuka pada nasihat.','Jaga keadilan dan tanggung jawab kepada orang terdekat.','Pegang komitmen dan jangan meremehkan janji.','Syukuri yang ada dan bedakan kebutuhan dari keinginan.','Jangan biarkan gengsi menutup kesempatan belajar.','Saat memperoleh sesuatu, ingat tanggung jawab penggunaannya.','Akui kesalahan lalu lanjutkan dengan perbaikan nyata.','Cari jalan keluar tanpa meninggalkan prinsip.','Konsistensi diuji ketika hasil belum terlihat.','Kesabaran dan integritas lebih kuat daripada membalas keadaan.','Perubahan besar dimulai dari perubahan diri.','Pertahankan nilai penting dengan hikmah dan keteladanan.','Evaluasi apa yang benar-benar perlu dipertahankan.','Kerja teratur dan manfaat kecil dapat memberi dampak besar.','Pengalaman baru bisa memperluas sudut pandang.','Saat terlalu bising, mengambil jarak sejenak bisa membantu menjaga kejernihan.','Kelembutan dan keteguhan dapat berjalan bersama.','Hadapi tanggung jawab secara bertahap.','Teladan lebih kuat daripada nasihat yang tidak dipraktikkan.','Perjalanan besar membutuhkan persiapan dan kesabaran.','Jaga amanah, ucapan, dan disiplin dalam hal kecil.','Pisahkan fakta, prasangka, dan asumsi.','Bedakan yang penting dari yang hanya terasa mendesak.','Gunakan kata-kata untuk sesuatu yang bermanfaat.','Perencanaan dan perhatian pada hal kecil dapat menghasilkan dampak besar.','Jadikan pengalaman sebagai pelajaran, bukan sekadar cerita.','Jangan membangun keputusan besar di atas asumsi rapuh.','Keadaan dapat berbalik; jangan cepat putus asa atau lengah.','Kebijaksanaan terlihat dari cara memberi nasihat dan menyadari batas diri.'];var hari=['Gunakan waktu untuk mengevaluasi arah dan menata niat.','Mulai dengan langkah kecil yang realistis.','Salurkan energi ke pekerjaan yang jelas dan kendalikan reaksi.','Perbanyak belajar dan dengarkan sebelum menyimpulkan.','Periksa tanggung jawab dan selesaikan urusan yang menggantung.','Perbanyak refleksi, syukur, doa, dan perhatian kepada orang lain.','Rapikan urusan pribadi, istirahat, dan siapkan pekan berikutnya.'];var note='<small><b>Catatan:</b> bagian ini bukan ramalan atau penentuan nasib dalam Islam. Tanggal hanya digunakan untuk memilih tema refleksi.</small><br><br>';$('#dateIslamicHijriah').html('<i class="fa-solid fa-bookmark" aria-hidden="true"></i> '+note+tema[n]);$('#dateIslamicView').html('<i class="fa-solid fa-compass" aria-hidden="true"></i> '+hari[dt.getDay()]);}
function cfAstSeed(str){var h=2166136261;for(var i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function cfAstNext(seed){seed=(seed+0x6D2B79F5)|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return [((t^t>>>14)>>>0)/4294967296,seed];}
function getOrbital(){var b=$('#fAstDate').datepicker('getDate'),t=$('#nowDateAst').datepicker('getDate')||new Date(),dd=('0'+b.getDate()).slice(-2),mm=('0'+(b.getMonth()+1)).slice(-2),yy=b.getFullYear();$('#angkaAstUntungTglLahir').html(dd+'-'+mm+'-'+yy);var seed=cfAstSeed(yy+'-'+mm+'-'+dd+'|'+t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()),u={};for(var i=0;i<5;i++){var r,x;do{x=cfAstNext(seed);seed=x[1];r=1+Math.floor(x[0]*99);}while(u[r]);u[r]=1;$('#angkaAstUntung'+(i+1)).html(('0'+r).slice(-2));}}
function getAuraAst(){var b=$('#fAstDate').datepicker('getDate'),t=$('#nowDateAst').datepicker('getDate')||new Date(),c=['transparent','#e53935','#fdd835','#fb8c00','#43a047','#1e88e5','#3949ab','#8e24aa','#ec407a','#cd7f32','#aaa9ad','#d4af37'],w=['netral','merah','kuning','oranye','hijau','biru','indigo','ungu','merah muda','perunggu','perak','emas'];function q(n){return Math.abs(parseInt(n,10)||0)%w.length;}var a=q(getNeptuAst(t)),d=q(getNeptuAst(b));$('#warnaAuraTglHariIni').html(t.getDate()+'-'+(t.getMonth()+1)+'-'+t.getFullYear());$('#warnaAuraHariIni').html(w[a]+' <span class="imgAst" style="background:'+c[a]+';vertical-align:middle;float:right;"></span>');var r=q(Math.abs(a-d));if(!r)r=d;var nm=$('#fAstName').val();if(nm&&nm!=='Nama Lengkap'){var z=q(getArtiNamaCalc(nm)),av=q(Math.round((a+d+z)/3)-r);if(!av)av=r;$('#warnaAuraPersonal').html(w[z]+' <span class="imgAst" style="background:'+c[z]+';vertical-align:middle;float:right;"></span>');$('#warnaAuraTglLahir').html(b.getDate()+'-'+(b.getMonth()+1)+'-'+b.getFullYear());$('#warnaAuraDomain').html(w[d]+' <span class="imgAst" style="background:'+c[d]+';vertical-align:middle;float:right;"></span>');$('#warnaAuraRasio').html(w[r]+' <span class="imgAst" style="background:'+c[r]+';vertical-align:middle;float:right;"></span>');$('#warnaAuraAve').html(w[av]+' <span class="imgAst" style="background:'+c[av]+';vertical-align:middle;float:right;"></span>');}}

function getNeptuAst(data){var x=String(data.getDate())+String(data.getMonth()+1)+String(data.getFullYear()),n=0;for(var i=0;i<x.length;i++)n+=parseInt(x[i],10)||0;while(n>9)n=String(n).split('').reduce(function(a,b){return a+(parseInt(b,10)||0);},0);return n;}
function readDataPrimbon(){var b=$('#fAstDate').datepicker('getDate'),n=getNeptuAst(b),day=weekdayAstroBlog[b.getDay()];var luck=['','Energi angka 1 menekankan keberanian memulai. Peluang terasa lebih terbuka ketika keputusan cepat tetap diberi dasar yang jelas.','Energi angka 2 menonjolkan kerja sama dan kepekaan. Dukungan orang lain dapat membantu, tetapi keputusan akhir tetap perlu berasal dari pertimbangan sendiri.','Energi angka 3 berkaitan dengan komunikasi dan kreativitas. Ide akan lebih bernilai ketika dipilih, dirapikan, lalu benar-benar diselesaikan.','Energi angka 4 menekankan kestabilan. Kemajuan mungkin terasa lambat, tetapi langkah yang konsisten cenderung lebih kuat daripada perubahan mendadak.','Energi angka 5 membawa tema perubahan dan eksplorasi. Peluang baru menarik, namun jangan membuka terlalu banyak arah dalam waktu yang sama.','Energi angka 6 berkaitan dengan tanggung jawab dan hubungan. Menolong orang lain baik, tetapi tetap jaga batas agar energi pribadi tidak habis.','Energi angka 7 menekankan analisis dan refleksi. Gunakan waktu untuk memeriksa fakta sebelum mengambil kesimpulan atau keputusan besar.','Energi angka 8 menonjolkan target, pengelolaan, dan hasil nyata. Ambisi akan lebih sehat jika tidak mengorbankan hubungan dan waktu istirahat.','Energi angka 9 berkaitan dengan empati dan gambaran besar. Pilih satu bentuk kontribusi yang realistis agar niat baik dapat berubah menjadi dampak nyata.'];var wet=['Pembawaan cenderung hangat dan mudah diterima. Tantangannya adalah belajar menunda keinginan dan memberi waktu untuk mempertimbangkan pilihan.','Pendirian cukup mandiri dan tidak mudah ikut arus. Komunikasi terbuka membantu agar sikap tenang tidak terbaca sebagai jarak.','Kecermatan melihat peluang cukup baik. Ketegasan akan terasa lebih positif bila cara menyampaikannya tetap menghargai orang lain.','Pendirian kuat membantu bertahan dalam tekanan. Saat situasi buntu, sudut pandang baru justru dapat mempercepat penyelesaian.','Kemampuan bicara dan beradaptasi menjadi modal menarik. Pengelolaan emosi dan keuangan yang lebih teratur akan membantu menjaga kestabilan.'];var pas=['Legi','Pahing','Pon','Wage','Kliwon'];var raw=Math.round((((new Date(b.getFullYear(),b.getMonth(),b.getDate()).getTime()-new Date(100,0,1).getTime())/86400000)%5));if(raw<0)raw+=5;var pn=pas[raw];$('#fAstWeton').html(day+' ['+pn+'] | Neptu ['+n+']');$('#wetonArea').html('Nama : '+capital_letter($('#fAstName').val())+'<br>Tanggal Lahir : '+b.getDate()+' - '+(b.getMonth()+1)+' - '+b.getFullYear()+'<br>Neptu : '+n+'<br><br><small>Pembacaan primbon berikut disajikan sebagai tradisi/hiburan, bukan kepastian nasib.</small><br>'+luck[n]+'<br><br>Pasaran : '+day+' ('+pn+')<br>'+wet[raw]);}

/* End v3 Override */

//]]>
