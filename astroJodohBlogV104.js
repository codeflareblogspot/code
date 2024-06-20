//<![CDATA[
/* Start Version */
var setVersionJodoh=getHostName(window.location.href)+" v"+"1.4.0";
$(".footerJodohAttr").html(setVersionJodoh);
/* End Version */
/* Start Initial Date Value */
$("#fAstDateFemale,#fAstDateMale").datepicker({
changeMonth: true,
changeYear: true,
"showAnim":"slideDown",
dateFormat: 'dd-mm-yy',
yearRange: "1900:+0",
beforeShow: function(){$(".ui-datepicker").css({'font-size':10,'z-index':99})},
//onSelect: function() {runAstrologi();}
});
var currentDate = new Date();
$("#fAstDateFemale,#fAstDateMale").datepicker("setDate",currentDate);
/* Assign Default Value */
/* End Initial Date Value */
/* Start Cookie Time */
function setCookieJodoh(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Secure";
}
function getCookieJodoh(cname) {
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
function checkCookieJodoh() {
  var username = getCookieJodoh("data");
  if (username != "") {
  var ausername=username.substring(0, username.indexOf(":"))
   alert("Data anda untuk nama " + ausername+" sudah tersimpan");
  } else {
    var userID = $('#fAstName').val();
	var userDate = $('#fAstDate').val();
    if (userID != "" && userID != null && userID !="Nama Lengkap") {
      setCookieJodoh("data", userID+":"+userDate+":"+contentAPN1, 30);
	  alert("Data setting "+username+" tersimpan menggunakan browser kuki");
    }else{alert("Silakan isi nama lengkap anda !\n\nData anda aman karena disimpan pada kuki browser anda.");$("#fAstName").trigger( "focus" );}
  }
}
function deleteCookieJodoh(){
var username = getCookie("data");
if (username != "" && username != null && username !="Nama Lengkap") {
document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  
alert("Data anda sudah dihapus dari browser kuki");
}}
function initialSetDateJodoh(){
var name = "datajdh=";
var str = decodeURIComponent(document.location.href);
var res="";var initialDate=new Array;
if(str.match(name)){
res = str.substring(str.lastIndexOf(str.match(name)) + name.length,str.length);
initialDate=res.split(";");
initialDate[0]=window.atob(initialDate[0]);
initialDate[1]=window.atob(initialDate[1]);
initialDate[2]=window.atob(initialDate[2]);
initialDate[3]=window.atob(initialDate[3]);
}
if(initialDate[0]!=""&&initialDate[0]!=null){$("#fAstNameFemale").val(initialDate[0]);}
if(initialDate[1]!=""&&initialDate[1]!=null){$("#fAstDateFemale").datepicker("setDate",initialDate[1]);}
if(initialDate[2]!=""&&initialDate[2]!=null){$("#fAstNameMale").val(initialDate[2]);}
if(initialDate[3]!=""&&initialDate[3]!=null){
$("#fAstDateMale").datepicker("setDate",initialDate[3]);
runKalkulasiJodoh();
$("#fAstName").val($("#fAstNameFemale").val());
$("#fAstDate").datepicker("setDate",$("#fAstDateFemale").datepicker('getDate'));
runAstrologi();
}
if(initialDate[4]!=""&&initialDate[4]!=null&&contentAPN1Jodoh!=initialDate[4]){
contentAPN2Jodoh=initialDate[4];
$("#titleHeaderJodoh").hide("slide",{direction : 'right'}, 500,
function (){$("#titleHeaderJodoh").html(contentAPFJodoh[initialDate[4]]+' '+contentAPTJodoh[initialDate[4]]);});
$("#titleHeaderJodoh").delay(300).show("slide", 500);
contentAPN1Jodoh=contentAPN2Jodoh;
alert("Kalkulasi Jodoh Online\n\n"+initialDate[0]+" <> "+initialDate[2]);
$('html, body').animate({ scrollTop: $(".astroBlogMainUIJodoh").offset().top }, 500);
}
}
/* End Cookie Time */
/* Start Navigation */
$("#rightMenuJodoh").on("click", function(){navPageRightJodoh();});
$("#leftMenuJodoh").on("click", function(){navPageLeftJodoh();});
$("#btnKecocokan").on("click", function(){runKalkulasiJodoh();});

var contentAPN1Jodoh=0;var contentAPN2Jodoh=1;
var contentAPTJodoh=new Array;
contentAPTJodoh[0]="KALKULASI JODOH";
contentAPTJodoh[1]="HASIL PERHITUNGAN";
var contentAPFJodoh=new Array;
contentAPFJodoh[0]='<i class="fa fa-cube" aria-hidden="true"></i>';
contentAPFJodoh[1]='<i class="fa fa-line-chart" aria-hidden="true"></i>';
var rotation=0;
function navPageLeftJodoh(){
rotation -= 180;
if(contentAPN1Jodoh==0){contentAPN2Jodoh=1;}
if(contentAPN1Jodoh==1){contentAPN2Jodoh=0;}
$("#titleHeaderJodoh").hide("slide",{direction : 'left'}, 200,
function (){$("#titleHeaderJodoh").html(contentAPFJodoh[contentAPN2Jodoh]+' '+contentAPTJodoh[contentAPN2Jodoh]);});
$("#titleHeaderJodoh").show("slide",{direction : 'right'}, 200);
contentAPN1Jodoh=contentAPN2Jodoh;
$(".flip-card-inner").css("transform", "rotateY("+rotation+"deg)");
}
function navPageRightJodoh(){
rotation += 180;
if(contentAPN1Jodoh==0){contentAPN2Jodoh=1;}
if(contentAPN1Jodoh==1){contentAPN2Jodoh=0;}
$("#titleHeaderJodoh").hide("slide",{direction : 'right'}, 200,
function (){$("#titleHeaderJodoh").html(contentAPFJodoh[contentAPN2Jodoh]+' '+contentAPTJodoh[contentAPN2Jodoh]);});
$("#titleHeaderJodoh").show("slide", 200);
contentAPN1Jodoh=contentAPN2Jodoh;
$(".flip-card-inner").css("transform", "rotateY("+rotation+"deg)");
}
$("#fBtnJodohShare").on("click", function(){
var strNameF=$('#fAstNameFemale').val();
if(strNameF==""||strNameF==null||strNameF=="Nama Lengkap Wanita"){
alert("Silakan ketikan nama lengkap anda dan pasangan !");
$("#fAstNameFemale").trigger( "focus" );
return;
}
var strNameM=$('#fAstNameMale').val();
if(strNameM==""||strNameM==null||strNameM=="Nama Lengkap Pria"){
alert("Silakan ketikan nama lengkap anda dan pasangan !");
$("#fAstNameMale").trigger( "focus" );
return;
}
shareJodoh();
});
/* End Navigation */

function shareJodoh(){
var usernameF = $('#fAstNameFemale').val();
var tglLahirF = $('#fAstDateFemale').val();
var usernameM = $('#fAstNameMale').val();
var tglLahirM = $('#fAstDateMale').val();
var dataAstrologi=(window.location.hostname)+"#datajdh="+(window.btoa(usernameF))+";"+(window.btoa(tglLahirF))+";"+(window.btoa(usernameM))+";"+(window.btoa(tglLahirM))+";"+contentAPN1Jodoh;
var a = 'Kalkulasi Jodoh Online%0A%0AHasil kalkulasi bisa dilihat pada link :%0A'+escape(dataAstrologi)+'%0A%0ADikirim via :%0A'+escape(window.location.hostname);
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
var addQuotes = 'whatsapp://send?phone=&text='+a;
}else{
var addQuotes = 'https://web.whatsapp.com/send?phone=&text='+a;
}
chkBrowserAst(addQuotes,800,600);
}

var shioJodoh = ['Tikus','Lembu','Macan','Kelinci','Naga','Ular','Kuda','Domba','Monyet','Ayam Jantan','Anjing','Babi'];
var weekdayJodohBlog=new Array("Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu");
var namaPasaranJawa = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
var neptuPasaranJawa=[0,5,9,7,4,8];
var neptuPasaranMasehi=[5,4,3,7,8,6,9];
var primaJodoh=[2,3,5,7,11,13,17,19,23,29,31];
var hurufDepan1=['h','a','i','e','o','u','n','c','r','k','q'];
var hurufDepan2=['d','t','s','z','w','l'];
var hurufDepan3=['p','f','v','d','j','y'];
var hurufDepan4=['m','g','b','t','n'];
var warnaAura1=[1,3,5,7];
var warnaAura2=[2,4,6,8];
var warnaAura3=[0,9,11,22];
var strNeptuFemale,strHariJawaFemale,strNamaHariFemale,strIndexHariF,strBioReadingF,strNameIdxF;
var strNeptuMale,strHariJawaMale,strNamaHariMale,strIndexHariM,strBioReadingM,strNameIdxM;
var strZodiakFemale,strShioFemale;
var strZodiakMale,strShioMale;
var cocokNeptu,cocokZodiak,cocokHari,cocokBio,cocokPrima,cocokNama,cocokNamaSpesial,cocokNamaDepan,cocokRandom,cocokShio;
var cocokHariJawa,cocokHariBiasa,cocokWarnaAura;

function getMatchLove(){
var tmpStrC0,tmpStrC1,tmpStrC2,tmpStrC3,tmpStrC4,tmpStrC5,tmpStrC6,tmpStrC7,tmpStrC8,tmpStrC9,tmpStrC10,tmpStrC11,tmpStrC12;
var tmpHariMasehiF=0;var tmpHariMasehiM=0;
for(var i=0;i < weekdayJodohBlog.length;i++){
if(weekdayJodohBlog[i]==strNamaHariFemale){tmpHariMasehiF=neptuPasaranMasehi[i];}
if(weekdayJodohBlog[i]==strNamaHariFemale){tmpHariMasehiM=neptuPasaranMasehi[i];}
}

var tmpJP=(neptuPasaranJawa[strHariJawaFemale]+neptuPasaranJawa[strHariJawaMale]+tmpHariMasehiF+tmpHariMasehiM);
if(tmpJP==1||tmpJP==10||tmpJP==19||tmpJP==28){cocokNeptu=0;tmpStrC0="Tidak Baik";}
if(tmpJP==2||tmpJP==11||tmpJP==20||tmpJP==29){cocokNeptu=1;tmpStrC0="Bagus";}
if(tmpJP==3||tmpJP==12||tmpJP==21||tmpJP==30){cocokNeptu=1;tmpStrC0="Bagus";}
if(tmpJP==4||tmpJP==13||tmpJP==22||tmpJP==31){cocokNeptu=0.5;tmpStrC0="Lumayan";}
if(tmpJP==5||tmpJP==14||tmpJP==23||tmpJP==32){cocokNeptu=1;tmpStrC0="Bagus";}
if(tmpJP==6||tmpJP==15||tmpJP==24||tmpJP==33){cocokNeptu=0;tmpStrC0="Tidak Baik";}
if(tmpJP==7||tmpJP==16||tmpJP==25||tmpJP==34){cocokNeptu=0;tmpStrC0="Tidak Baik";}
if(tmpJP==8||tmpJP==17||tmpJP==26||tmpJP==35){cocokNeptu=1;tmpStrC0="Bagus";}
if(tmpJP==9||tmpJP==18||tmpJP==27||tmpJP==36){cocokNeptu=0;tmpStrC0="Tidak Baik";}

if(strZodiakFemale==0){if(strZodiakMale==4||strZodiakMale==8||strZodiakMale==2){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==1){if(strZodiakMale==5||strZodiakMale==9||strZodiakMale==3){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==2){if(strZodiakMale==6||strZodiakMale==10||strZodiakMale==4){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==3){if(strZodiakMale==3||strZodiakMale==11||strZodiakMale==5){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==4){if(strZodiakMale==8||strZodiakMale==0||strZodiakMale==6){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==5){if(strZodiakMale==9||strZodiakMale==1||strZodiakMale==7){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==6){if(strZodiakMale==10||strZodiakMale==2||strZodiakMale==8){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==7){if(strZodiakMale==3||strZodiakMale==11||strZodiakMale==9){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==8){if(strZodiakMale==4||strZodiakMale==0||strZodiakMale==10){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==9){if(strZodiakMale==5||strZodiakMale==1||strZodiakMale==11){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==10){if(strZodiakMale==6||strZodiakMale==2||strZodiakMale==0){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}
if(strZodiakFemale==11){if(strZodiakMale==3||strZodiakMale==7||strZodiakMale==1){cocokZodiak=1;tmpStrC1="Cocok";}else{cocokZodiak=0;tmpStrC1="Belum Cocok";}}

if(strIndexHariF==0){if(strIndexHariM==2||strIndexHariM==4||strIndexHariM==6){cocokHari=1;tmpStrC2="Baik";}else{cocokHari=0;tmpStrC2="Tidak Baik";}}
if(strIndexHariF==1){if(strIndexHariM==3||strIndexHariM==5||strIndexHariM==6){cocokHari=1;tmpStrC2="Baik";}else{cocokHari=0;tmpStrC2="Tidak Baik";}}
if(strIndexHariF==2){if(strIndexHariM==0||strIndexHariM==5){cocokHari=1;tmpStrC2="Baik";}else{cocokHari=0;tmpStrC2="Tidak Baik";}}
if(strIndexHariF==3){if(strIndexHariM==1||strIndexHariM==4||strIndexHariM==5){cocokHari=1;tmpStrC2="Baik";}else{cocokHari=0;tmpStrC2="Tidak Baik";}}
if(strIndexHariF==4){if(strIndexHariM==0||strIndexHariM==1||strIndexHariM==3){cocokHari=1;tmpStrC2="Baik";}else{cocokHari=0;tmpStrC2="Tidak Baik";}}
if(strIndexHariF==5){if(strIndexHariM==2||strIndexHariM==1||strIndexHariM==6){cocokHari=1;tmpStrC2="Baik";}else{cocokHari=0;tmpStrC2="Tidak Baik";}}
if(strIndexHariF==6){if(strIndexHariM==0||strIndexHariM==1||strIndexHariM==5){cocokHari=1;tmpStrC2="Baik";}else{cocokHari=0;tmpStrC2="Tidak Baik";}}

if(Math.round(Math.abs(strBioReadingF-strBioReadingM))<=101){cocokBio=0;tmpStrC3="Tidak Cocok";}
if(Math.round(Math.abs(strBioReadingF-strBioReadingM))<=80){cocokBio=0.4;tmpStrC3="Kurang Bagus";}
if(Math.round(Math.abs(strBioReadingF-strBioReadingM))<=40){cocokBio=0.8;tmpStrC3="Cukup Bagus";}
if(Math.round(Math.abs(strBioReadingF-strBioReadingM))<=10){cocokBio=1;tmpStrC3="Bagus";}

var tmpPrimaF=0;var tmpPrimaM=0;
for(var i=0;i < primaJodoh.length;i++){
if(strIndexHariF==primaJodoh[i]){tmpPrimaF=1;}
if(strIndexHariM==primaJodoh[i]){tmpPrimaM=1;}
}
if(tmpPrimaF==tmpPrimaM){cocokPrima=0.5;tmpStrC4="Ya";}else{cocokPrima=0;tmpStrC4="Tidak";}

var tmpNamaDepanF=$("#fAstNameFemale").val().charAt(0).toLowerCase();
var tmpNamaDepanM=$("#fAstNameMale").val().charAt(0).toLowerCase();
var tmpNDF='b0';var tmpNDM='b0';
for(var i=0;i < hurufDepan1.length;i++){
if(tmpNamaDepanF==hurufDepan1[i]){tmpNDF='b1';}
if(tmpNamaDepanM==hurufDepan1[i]){tmpNDM='b1';}
}
for(var i=0;i < hurufDepan2.length;i++){
if(tmpNamaDepanF==hurufDepan2[i]){tmpNDF='b2';}
if(tmpNamaDepanM==hurufDepan2[i]){tmpNDM='b2';}
}
for(var i=0;i < hurufDepan3.length;i++){
if(tmpNamaDepanF==hurufDepan3[i]){tmpNDF='b3';}
if(tmpNamaDepanM==hurufDepan3[i]){tmpNDM='b3';}
}
for(var i=0;i < hurufDepan4.length;i++){
if(tmpNamaDepanF==hurufDepan4[i]){tmpNDF='b4';}
if(tmpNamaDepanM==hurufDepan4[i]){tmpNDM='b4';}
}

if((tmpNDF=='b1' && tmpNDM=='b1')||(tmpNDF=='b0' && tmpNDM=='b0')||(tmpNDF=='b2' && tmpNDM=='b2')||(tmpNDF=='b3' && tmpNDM=='b3')||(tmpNDF=='b4' && tmpNDM=='b4')){cocokNamaDepan=1;tmpStrC5="Sama";}
else if((tmpNDF=='b0' && tmpNDM=='b1') || (tmpNDM=='b0' && tmpNDF=='b1')){cocokNamaDepan=0.5;tmpStrC5="Satu Baris";}
else if((tmpNDF=='b1' && tmpNDM=='b2') || (tmpNDM=='b1' && tmpNDF=='b2')){cocokNamaDepan=0.5;tmpStrC5="Satu Baris";}
else if((tmpNDF=='b2' && tmpNDM=='b3') || (tmpNDM=='b2' && tmpNDF=='b3')){cocokNamaDepan=0.5;tmpStrC5="Satu Baris";}
else if((tmpNDF=='b3' && tmpNDM=='b4') || (tmpNDM=='b3' && tmpNDF=='b4')){cocokNamaDepan=0.5;tmpStrC5="Satu Baris";}
else if((tmpNDF=='b4' && tmpNDM=='b0') || (tmpNDM=='b4' && tmpNDF=='b0')){cocokNamaDepan=0.5;tmpStrC5="Satu Baris";}
else{cocokNamaDepan=0;tmpStrC5="Tidak Cocok";}

if(strNameIdxF==strNameIdxM){cocokNama=1;tmpStrC6="Ya";}else{cocokNama=0;tmpStrC6="Tidak";}
if(strNameIdxF==11||strNameIdxF==22||strNameIdxM==11||strNameIdxM==22){cocokNamaSpesial=2;tmpStrC7="Ya";}else{cocokNamaSpesial=0;tmpStrC7="Tidak";}

var strRandom=new Array();var tmpRandom=0;
for(var i=0;i < 3;i++){
strRandom[i]=Math.floor(Math.random() * 10);
tmpRandom +=strRandom[i];
}
tmpRandom=Math.floor((tmpRandom/27)*100);
if(tmpRandom < 101){cocokRandom=1;tmpStrC8="Atas";}
if(tmpRandom < 70){cocokRandom=0.5;tmpStrC8="Tengah";}
if(tmpRandom < 50){cocokRandom=0;tmpStrC8="Bawah";}

if(strShioFemale==0){
if(strShioMale==1||strShioMale==4||strShioMale==8){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==0||strShioMale==2||strShioMale==5||strShioMale==10||strShioMale==11){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==1){
if(strShioMale==0||strShioMale==5||strShioMale==9){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==1||strShioMale==2||strShioMale==8||strShioMale==11){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==2){
if(strShioMale==6||strShioMale==10||strShioMale==11){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==0||strShioMale==1||strShioMale==2||strShioMale==3||strShioMale==4||strShioMale==7||strShioMale==9){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==3){
if(strShioMale==7||strShioMale==10||strShioMale==11){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==2||strShioMale==3||strShioMale==5||strShioMale==8){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==4){
if(strShioMale==0||strShioMale==8||strShioMale==9){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==2||strShioMale==5||strShioMale==6||strShioMale==11){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==5){
if(strShioMale==1||strShioMale==8||strShioMale==9){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==0||strShioMale==3||strShioMale==4||strShioMale==5||strShioMale==6||strShioMale==7||strShioMale==10){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==6){
if(strShioMale==2||strShioMale==7||strShioMale==10){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==4||strShioMale==5||strShioMale==8||strShioMale==9||strShioMale==11){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==7){
if(strShioMale==3||strShioMale==6||strShioMale==11){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==2||strShioMale==5||strShioMale==7||strShioMale==8||strShioMale==9||strShioMale==10){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==8){
if(strShioMale==0||strShioMale==4||strShioMale==5){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==1||strShioMale==3||strShioMale==6||strShioMale==7||strShioMale==8||strShioMale==9||strShioMale==10){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==9){
if(strShioMale==1||strShioMale==4||strShioMale==5){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==2||strShioMale==6||strShioMale==7||strShioMale==8||strShioMale==11){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==10){
if(strShioMale==2||strShioMale==3||strShioMale==6){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==0||strShioMale==5||strShioMale==8||strShioMale==10||strShioMale==11){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}
if(strShioFemale==11){
if(strShioMale==2||strShioMale==3||strShioMale==7){cocokShio=2;tmpStrC9="Cocok Sebagai Pasangan";}
else if(strShioMale==0||strShioMale==1||strShioMale==4||strShioMale==6||strShioMale==9||strShioMale==10){cocokShio=1;tmpStrC9="Teman / Pasangan";}
else{cocokShio=0;tmpStrC9="Belum Cocok";}
}

if(strHariJawaFemale==strHariJawaMale){cocokHariJawa=1;tmpStrC10="Ya";}else{cocokHariJawa=0;tmpStrC10="Tidak";}
if(strNamaHariFemale==strNamaHariMale){cocokHariBiasa=1;tmpStrC11="Ya";}else{cocokHariBiasa=0;tmpStrC11="Tidak";}

var tmpAuraF='a0';var tmpAuraM='a0';
for(var i=0;i < warnaAura1.length;i++){
if(strNeptuFemale==warnaAura1[i]){tmpAuraF='a1';}
if(strNeptuMale==warnaAura1[i]){tmpAuraM='a1';}
}
for(var i=0;i < warnaAura2.length;i++){
if(strNeptuFemale==warnaAura2[i]){tmpAuraF='a2';}
if(strNeptuMale==warnaAura2[i]){tmpAuraM='a2';}
}
for(var i=0;i < warnaAura3.length;i++){
if(strNeptuFemale==warnaAura3[i]){tmpAuraF='a3';}
if(strNeptuMale==warnaAura3[i]){tmpAuraM='a3';}
}
if(tmpAuraF==tmpAuraM){cocokWarnaAura=0.5;tmpStrC12='Menyatu'}else{cocokWarnaAura=0;tmpStrC12='Terpisah';}

var sumCocok=Math.ceil(((cocokNeptu+cocokZodiak+cocokHari+cocokBio+cocokPrima+cocokNamaDepan+cocokNama+cocokNamaSpesial+cocokRandom+cocokShio+cocokHariJawa+cocokHariBiasa+cocokWarnaAura)/10)*100);

if(sumCocok > 100){sumCocok=100;}
if(Math.round(sumCocok)<=101){$("#fAstMatch").html("Cinta Abadi & Bahagia");}
if(Math.round(sumCocok)<=90){$("#fAstMatch").html("Saling Memahami & Penuh Cinta");}
if(Math.round(sumCocok)<=80){$("#fAstMatch").html("Cocok & Hangat");}
if(Math.round(sumCocok)<=70){$("#fAstMatch").html("Baik Apa Adanya");}
if(Math.round(sumCocok)<=50){$("#fAstMatch").html("Butuh Kesabaran");}
if(Math.round(sumCocok)<=40){$("#fAstMatch").html("Perjuangan Keras");}
if(Math.round(sumCocok)<=30){$("#fAstMatch").html("Pilihan Ada Pada Anda");}

if(Math.round(sumCocok)<=101){$('#gAverageMatch').css("background","pink");}
if(Math.round(sumCocok)<=80){$('#gAverageMatch').css("background","green");}
if(Math.round(sumCocok)<=50){$('#gAverageMatch').css("background","orange");}
if(Math.round(sumCocok)<=30){$('#gAverageMatch').css("background","red");}

$("#gAverageMatch").css("width",sumCocok+"%");
$("#btnKecocokan").html(sumCocok+"%");

var strDateF=$("#fAstDateFemale").datepicker('getDate');
var strDateM=$("#fAstDateMale").datepicker('getDate');

var strHtml="Nama Wanita : "+$("#fAstNameFemale").val()+"<br />";
strHtml +="Tgl Lahir : "+strDateF.getDate()+" - "+(strDateF.getMonth()+1)+" - "+strDateF.getFullYear()+"<br />";
strHtml +="Hari Lahir : "+strNamaHariFemale+" ["+namaPasaranJawa[strHariJawaFemale]+"] Neptu ["+strNeptuFemale+"]<br />";
strHtml +="<center><div class='leftfooterFrmJodoh hov-slider' style='background:#ff0b75;margin:5px 0;color:#fff;padding:5px 10px;' onclick='getAstJdhDetail(\"f\")'>Lihat Detail</div></center>";
$("#dataFemale").html(strHtml);
strHtml ="Nama Pria : "+$("#fAstNameMale").val()+"<br />";
strHtml +="Tgl Lahir : "+strDateM.getDate()+" - "+(strDateM.getMonth()+1)+" - "+strDateM.getFullYear()+"<br />";
strHtml +="Hari Lahir : "+strNamaHariMale+" ["+namaPasaranJawa[strHariJawaMale]+"] Neptu ["+strNeptuMale+"]<br />";
strHtml +="<center><div class='leftfooterFrmJodoh hov-slider' style='background:#0083da;margin:5px 0;color:#fff;padding:5px 10px;' onclick='getAstJdhDetail(\"m\")'>Lihat Detail</div></center>";
$("#dataMale").html(strHtml);
$("#dataPrimbon").html(getWetonJdhReading());
strHtml ='<div style="padding:5px 0;margin-bottom:5px;background:#ff00a7;width:100%;text-align:center;font-size:16px;">FAKTOR KECOCOKAN</div>';
strHtml +='<table border="0" width="100%">';
strHtml +='<tr><td width="130px">Faktor Zodiak</td><td>:</td><td>'+tmpStrC1+'</td></tr>';
strHtml +='<tr><td>Faktor SHIO</td><td>:</td><td>'+tmpStrC9+'</td></tr>';
strHtml +='<tr><td>Rasio Hari Lahir</td><td>:</td><td>'+tmpStrC2+'</td></tr>';
strHtml +='<tr><td>Rasio Bioritmik</td><td>:</td><td>'+tmpStrC3+'</td></tr>';
strHtml +='<tr><td>Sama Weton Jawa</td><td>:</td><td>'+tmpStrC10+'</td></tr>';
strHtml +='<tr><td>Sama Hari Masehi</td><td>:</td><td>'+tmpStrC11+'</td></tr>';
strHtml +='<tr><td>Kombinasi Neptu</td><td>:</td><td>'+tmpStrC0+'</td></tr>';
strHtml +='<tr><td>Pakem Nama Depan</td><td>:</td><td>'+tmpStrC5+'</td></tr>';
strHtml +='<tr><td>Neptu Nama Sama</td><td>:</td><td>'+tmpStrC6+'</td></tr>';
strHtml +='<tr><td>Neptu Nama 11/22</td><td>:</td><td>'+tmpStrC7+'</td></tr>';
strHtml +='<tr><td>Warna Aura</td><td>:</td><td>'+tmpStrC12+'</td></tr>';
strHtml +='<tr><td>Tgl Bilangan Prima</td><td>:</td><td>'+tmpStrC4+'</td></tr>';
strHtml +='<tr><td>Angka Acak Saat ini</td><td>:</td><td>'+tmpStrC8+'</td></tr>';

strHtml +='</table>';
$("#dataKecocokan").html(strHtml);
rotation=0;
setTimeout(navPageRightJodoh,1000);
}

function getAstJdhDetail(gender){
if(gender=="f"){
$("#fAstName").val($("#fAstNameFemale").val());
$("#fAstDate").datepicker("setDate",$("#fAstDateFemale").datepicker('getDate'));
}else{
$("#fAstName").val($("#fAstNameMale").val());
$("#fAstDate").datepicker("setDate",$("#fAstDateMale").datepicker('getDate'));
}
contentAPN2=0;
$("#"+contentAPId[contentAPN1]).hide("slide",{direction : 'right'}, 500);
$("#titleHeaderAst").hide("slide",{direction : 'right'}, 500,
function (){$("#titleHeaderAst").html(contentAPF[contentAPN2]+' '+contentAPT[contentAPN2]);});
$("#"+contentAPId[contentAPN2]).delay(800).show("slide", 500);
$("#titleHeaderAst").delay(300).show("slide", 500);
contentAPN1=contentAPN2;
runAstrologi();
getBioImage();
}

function runKalkulasiJodoh(){
var strNameF=$('#fAstNameFemale').val();
if(strNameF==""||strNameF==null||strNameF=="Nama Lengkap Wanita"){
alert("Silakan ketikan nama lengkap anda dan pasangan !");
$("#fAstNameFemale").trigger( "focus" );
return;
}
var strNameM=$('#fAstNameMale').val();
if(strNameM==""||strNameM==null||strNameM=="Nama Lengkap Pria"){
alert("Silakan ketikan nama lengkap anda dan pasangan !");
$("#fAstNameMale").trigger( "focus" );
return;
}
getDataKalkulasiJodoh("f");
getDataKalkulasiJodoh("m");
getMatchLove();
}
function getDataKalkulasiJodoh(gender){
if(gender=="f"){
var data=$("#fAstDateFemale").datepicker('getDate');
strZodiakFemale=getZodiac(data);
var strdate = data.getDate();
var strmonth = data.getMonth()+1;
var stryear = data.getFullYear();
strShioFemale=getShioJodoh(data);
strNameIdxF=getArtiNamaCalc($('#fAstNameFemale').val());
strBioReadingF=getBioCalculation(data);
strIndexHariF=data.getDay();
strNeptuFemale=getPrimbonNeptu(data);
strHariJawaFemale=getHariJawa(data);
strNamaHariFemale=weekdayJodohBlog[data.getDay()];
}else{
var data=$("#fAstDateMale").datepicker('getDate');
strZodiakMale=getZodiac(data);
var strdate = data.getDate();
var strmonth = data.getMonth()+1;
var stryear = data.getFullYear();
strShioMale=getShioJodoh(data);
strNameIdxM=getArtiNamaCalc($('#fAstNameMale').val());
strBioReadingM=getBioCalculation(data);
strIndexHariM=data.getDay();
strNeptuMale=getPrimbonNeptu(data);
strHariJawaMale=getHariJawa(data);
strNamaHariMale=weekdayJodohBlog[data.getDay()];
}
}
function getHariJawa(data){
var pScL = (((new Date(data.getFullYear()+','+(data.getMonth()+1)+','+data.getDate()).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5);
return Math.round(pScL);
}
/* Start Primbon Javanese Calculation */
function getPrimbonNeptu(data){
var strDate=String(data.getDate());
var strMonth=String(data.getMonth()+1);
var strYear=String(data.getFullYear());
var pDateAry=new Array();
var pMonthAry=new Array();
var pYearAry=new Array();
var neptuAry=new Array();
var pDate1,pDate2,pDate3,pMonth1,pMonth2,pMonth3,pYear1,pYear2,pYear3,pYear4,pYear5;
var neptu1,neptu2,neptu3,neptu4,neptu5;
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
return neptu4;
//if(astroBlogUserID==MD5((window.location.host).substring(0,(window.location.host).indexOf(".")))&&astroBlogVer==astroBlogUserID){dataNeptuAst=neptu4;}else{return;}
}
/* End Primbon Javanese Calculation */
/* Start Zodiac Calculation */
function getZodiac(data){
var b1day=data.getDate();
var b1month=data.getMonth();
if(b1day>21 && b1day<32){
if(b1month==11){lunarType="Capricorn";}
if(b1month==0){lunarType="Aquarius";}
if(b1month==1){lunarType="Pisces";}
if(b1month==2){lunarType="Aries";}
if(b1month==3){lunarType="Taurus";}
if(b1month==4){lunarType="Gemini";}
if(b1month==5){lunarType="Cancer";}
if(b1month==6){lunarType="Leo";}
if(b1month==7){lunarType="Virgo";}
if(b1month==8){lunarType="Libra";}
if(b1month==9){lunarType="Scorpio";}
if(b1month==10){lunarType="Sagittarius";}
}
if(b1day>0 && b1day<22){
if(b1month==0){lunarType="Capricorn";}
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
if(lunarType=="Capricorn"){lunarTypeNum=0;}
if(lunarType=="Aquarius"){lunarTypeNum=1;}
if(lunarType=="Pisces"){lunarTypeNum=2;}
if(lunarType=="Aries"){lunarTypeNum=3;}
if(lunarType=="Taurus"){lunarTypeNum=4;}
if(lunarType=="Gemini"){lunarTypeNum=5;}
if(lunarType=="Cancer"){lunarTypeNum=6;}
if(lunarType=="Leo"){lunarTypeNum=7;}
if(lunarType=="Virgo"){lunarTypeNum=8;}
if(lunarType=="Libra"){lunarTypeNum=9;}
if(lunarType=="Scorpio"){lunarTypeNum=10;}
if(lunarType=="Sagittarius"){lunarTypeNum=11;}
return lunarTypeNum;
}
/* End Zodiac Calculation */
/* Start Bioritmik Calculation */
function getBioCalculation(data){
var tmpData = new Array;
var phy=23;var emo=28;var intl=33;var inu=38;var est=43;var awa=48;var spi=53;
var bioDivider=[phy,emo,intl,inu,est,awa,spi];
var date1=(data.getMonth()+1)+','+data.getDate()+','+data.getFullYear();
var dateNow=new Date();
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
tmpData[i]=50+(Math.floor(tmpData[i]/2));
}
var sumData=0;
for(var i=0;i<tmpData.length;i++){sumData+=tmpData[i];}
return Math.round(sumData/tmpData.length);
}
/* End Bioritmik Calculation */

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

/* Start Shio Reading */
function getShioJodoh(data){
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
var shio = ['Tikus','Lembu','Macan','Kelinci','Naga','Ular','Kuda','Domba','Monyet','Ayam Jantan','Anjing','Babi'];
var shioArray = ['0','1','2','3','4','5','6','7','8','9','10','11'];
var y_select = data.getFullYear();
var m_select = data.getMonth()+1;
var d_select = data.getDate();
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
return shioArray[anYear];
}}}
/* End Shio Reading */
/* Start Weton Reading */
function getWetonNumber(m,n) {
return "Minggu" == m ? idH = 5 : "Senin" == m ? idH = 4 : "Selasa" == m ? idH = 3 : "Rabu" == m ? idH = 7 : "Kamis" == m ? idH = 8 : "Jumat" == m ? idH = 6 : "Sabtu" == m && (idH = 9), "Pahing" == n ? idP = 9 : "Pon" == n ? idP = 7 : "Wage" == n ? idP = 4 : "Kliwon" == n ? idP = 8 : "Legi" == n && (idP = 5), idH + idP;
}
function getWetonJdhReading(){
var w1=getWetonNumber(strNamaHariFemale,namaPasaranJawa[strHariJawaFemale]);
var w2=getWetonNumber(strNamaHariMale,namaPasaranJawa[strHariJawaMale]);
var indexTotal = parseInt(w1)+parseInt(w2);
var hsb = indexTotal / 7;
var weton = Math.round(7 * (hsb - Math.floor(hsb)));
var read = new Array();
read[0]="Keluarga anda sebenarnya pandai mencari penghasilan, bisa kaya tapi sering ditipu atau dikecewakan orang. Bisa langgeng asal selalu bersyukur, sabar dan memaafkan. Sebutan untuk pasangan ini: <u>Garangan Macan.</u>";
read[1]="Keluarga anda besar wibawanya dan luas pengalamannya, tetapi rejeki agak sulit. Jika punya anak satu, kalau laki-laki, ayahnya yang kalah. Kalo perempuan, ibunya yang kalah. Jika tidak sabar bisa bercerai. Sebutan untuk pasangan ini: <u>Pisang Pinugel</u>";
read[2]="Keluarga anda akan tenang, tentram, dan selamat serta bahagia rumah tangganya, serta mendapat rejeki yang langsung dan lumintu. Bisa jadi pengayoman sanak saudara. Sebutan untuk pasangan ini: <u>Sanggar Waringin</u>";
read[3]="Keluarga anda akan selalu mendapat kemuliaan dan mendapat kehormatan. Kehidupan terang, tapi banyak berandai-andai (menghayal). Cepat kaya tapi sering kemalingan. Sebutan untuk pasangan ini: <u>Gedong Rembulan</u>";
read[4]="Keluarga anda bisa menjadi pemimpin dan memberi teladan pada tetangga disekitarnya, tetapi panas di tempat tidur, artinya sering sakit-sakitan, selalu gelisah, dan sering beda pendapat dengan pasangan. Sebutan untuk pasangan ini: <u>Bale Kedhawang</u>";
read[5]="Keluarga anda akan selamat, tapi tidak kuat kaya, jika ada uang lebih akan cenderung untuk membelanjakannya. Kalo punya anak, sesudah dewasa akan timbul masalah yang cukup berat. Seringkali mengalami kesulitan dan mendapat malu. Sebutan untuk pasangan ini: <u>Gajah Plasungan</u>";
read[6]="Keluarga anda bisa cari penghasilan, tapi tidak bisa menyimpan uang, jika ada uang lebih akan cenderung untuk membelanjakannya. Banyak pertentangan pendapat, agak gelap hati tapi tabah dalam menghadapi segala penderitaan. Sebutan untuk pasangan ini: <u>Warak Pangrungrungan</u>";
return read[weton];
}
/* End Weton Reading */
$(document).ready(function(){initialSetDateJodoh();});
//]]>
