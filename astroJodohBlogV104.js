//<![CDATA[
/* CodeFlare Kalkulasi Jodoh v2.0.0 - Optimized */
var setVersionJodoh=(typeof getHostName==="function"?getHostName(window.location.href):window.location.hostname.replace(/^www\./,""))+" v2.0.0";
$(".footerJodohAttr").html(setVersionJodoh);

/* Initial Date */
$("#fAstDateFemale,#fAstDateMale").datepicker({
changeMonth:true,changeYear:true,showAnim:"slideDown",dateFormat:"dd-mm-yy",yearRange:"1900:+0",
beforeShow:function(){$(".ui-datepicker").css({"font-size":10,"z-index":99});}
});
var currentDate=new Date();
$("#fAstDateFemale,#fAstDateMale").datepicker("setDate",currentDate);

/* Helper */
function cfJdhMod(n,m){return((n%m)+m)%m;}
function cfJdhClamp(n,min,max){return Math.max(min,Math.min(max,n));}
function cfJdhUtcDay(d){return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000);}
function cfJdhEscape(str){return $("<div>").text(str==null?"":String(str)).html();}
function cfJdhB64Encode(str){try{return btoa(unescape(encodeURIComponent(str)));}catch(e){return btoa(str);}}
function cfJdhB64Decode(str){try{return decodeURIComponent(escape(atob(str)));}catch(e){try{return atob(str);}catch(x){return"";}}}
function cfJdhLabel(score){
if(score>=.90)return"Sangat Selaras";
if(score>=.78)return"Selaras";
if(score>=.65)return"Cukup Selaras";
if(score>=.52)return"Perlu Penyesuaian";
return"Kontras";
}
function cfJdhPairKey(a,b){return[a,b].sort(function(x,y){return x-y;}).join("-");}
function cfJdhNameKey(a,b){return[String(a||"").trim().toLowerCase(),String(b||"").trim().toLowerCase()].sort().join("|");}

/* Cookie - dipertahankan untuk kompatibilitas */
function setCookieJodoh(cname,cvalue,exdays){
var d=new Date();d.setTime(d.getTime()+(exdays*86400000));
document.cookie=cname+"="+encodeURIComponent(cvalue)+";expires="+d.toUTCString()+";path=/;SameSite=Lax";
}
function getCookieJodoh(cname){
var name=cname+"=",ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){var c=ca[i].trim();if(c.indexOf(name)===0)return decodeURIComponent(c.substring(name.length));}
return"";
}
function checkCookieJodoh(){
var f=$("#fAstNameFemale").val(),m=$("#fAstNameMale").val(),fd=$("#fAstDateFemale").val(),md=$("#fAstDateMale").val();
if(!f||!m){alert("Silakan isi nama Anda dan pasangan terlebih dahulu.");return;}
setCookieJodoh("datajdh",JSON.stringify({f:f,fd:fd,m:m,md:md}),30);
alert("Data pasangan tersimpan di browser ini.");
}
function deleteCookieJodoh(){
document.cookie="datajdh=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax";
alert("Data pasangan sudah dihapus dari browser.");
}

/* Shared Link */
function initialSetDateJodoh(){
var hash=window.location.hash||"",prefix="#datajdh=";
if(hash.indexOf(prefix)!==0)return;
var raw=hash.substring(prefix.length).split(";");
if(raw.length<4)return;
var f=cfJdhB64Decode(raw[0]),fd=cfJdhB64Decode(raw[1]),m=cfJdhB64Decode(raw[2]),md=cfJdhB64Decode(raw[3]);
if(f)$("#fAstNameFemale").val(f);
if(fd)$("#fAstDateFemale").datepicker("setDate",fd);
if(m)$("#fAstNameMale").val(m);
if(md)$("#fAstDateMale").datepicker("setDate",md);
if(raw[4]!==undefined)contentAPN1Jodoh=parseInt(raw[4],10)||0;
if(f&&m&&fd&&md){
runKalkulasiJodoh();
if(typeof runAstrologi==="function"&&$("#fAstName").length&&$("#fAstDate").length){
$("#fAstName").val(f);$("#fAstDate").datepicker("setDate",$("#fAstDateFemale").datepicker("getDate"));runAstrologi();
}
$("html,body").animate({scrollTop:$(".astroBlogMainUIJodoh").offset().top},500);
}
}

/* Navigation */
$("#rightMenuJodoh").on("click",function(){navPageRightJodoh();});
$("#leftMenuJodoh").on("click",function(){navPageLeftJodoh();});
$("#btnKecocokan").on("click",function(){runKalkulasiJodoh();});

var contentAPN1Jodoh=0,contentAPN2Jodoh=1,rotation=0;
var contentAPTJodoh=["KALKULASI JODOH","HASIL PERHITUNGAN"];
var contentAPFJodoh=[
'<i class="fa-solid fa-heart-pulse" aria-hidden="true"></i>',
'<i class="fa-solid fa-chart-line" aria-hidden="true"></i>'
];
function cfJdhFlip(target,direction){
contentAPN2Jodoh=target;
$("#titleHeaderJodoh").hide("slide",{direction:direction},200,function(){
$("#titleHeaderJodoh").html(contentAPFJodoh[target]+" "+contentAPTJodoh[target]);
}).show("slide",{direction:direction==="left"?"right":"left"},200);
contentAPN1Jodoh=target;
$(".flip-card-inner").css("transform","rotateY("+rotation+"deg)");
}
function navPageLeftJodoh(){rotation-=180;cfJdhFlip(contentAPN1Jodoh===0?1:0,"left");}
function navPageRightJodoh(){rotation+=180;cfJdhFlip(contentAPN1Jodoh===0?1:0,"right");}

/* Share */
$("#fBtnJodohShare").on("click",function(){
var f=$.trim($("#fAstNameFemale").val()),m=$.trim($("#fAstNameMale").val());
if(!f||f==="Nama Lengkap Wanita"){alert("Silakan isi nama Anda terlebih dahulu.");$("#fAstNameFemale").trigger("focus");return;}
if(!m||m==="Nama Lengkap Pria"){alert("Silakan isi nama pasangan terlebih dahulu.");$("#fAstNameMale").trigger("focus");return;}
shareJodoh();
});
function shareJodoh(){
var f=$("#fAstNameFemale").val(),fd=$("#fAstDateFemale").val(),m=$("#fAstNameMale").val(),md=$("#fAstDateMale").val();
var url=window.location.origin+window.location.pathname+"#datajdh="+cfJdhB64Encode(f)+";"+cfJdhB64Encode(fd)+";"+cfJdhB64Encode(m)+";"+cfJdhB64Encode(md)+";"+contentAPN1Jodoh;
var text="Kalkulasi Jodoh Online\n"+f+" + "+m+"\n\nLihat hasilnya di:\n"+url;
if(navigator.share){
navigator.share({title:"Kalkulasi Jodoh Online",text:text}).catch(function(){});
}else{
var wa="https://api.whatsapp.com/send?text="+encodeURIComponent(text);
window.open(wa,"_blank");
}
}

/* Data Dasar */
var weekdayJodohBlog=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
var namaPasaranJawa=["Legi","Pahing","Pon","Wage","Kliwon"];
var neptuPasaranJawa=[5,9,7,4,8];
var neptuHariJawa=[5,4,3,7,8,6,9];
var shioJodoh=["Tikus","Lembu","Macan","Kelinci","Naga","Ular","Kuda","Kambing","Monyet","Ayam","Anjing","Babi"];
var zodiacNames=["Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"];
var zodiacElements=["Bumi","Udara","Air","Api","Bumi","Udara","Air","Api","Bumi","Udara","Air","Api"];

var strNeptuFemale,strHariJawaFemale,strNamaHariFemale,strIndexHariF,strBioReadingF,strNameIdxF,strLifePathF;
var strNeptuMale,strHariJawaMale,strNamaHariMale,strIndexHariM,strBioReadingM,strNameIdxM,strLifePathM;
var strZodiakFemale,strShioFemale,strZodiakMale,strShioMale;

/* Kalender Jawa: anchor 17-08-1945 = Jumat Legi */
function getHariJawa(data){
var anchor=Math.floor(Date.UTC(1945,7,17)/86400000);
return cfJdhMod(cfJdhUtcDay(data)-anchor,5);
}
function getWetonNumber(dayName,pasaranName){
var d=weekdayJodohBlog.indexOf(dayName),p=namaPasaranJawa.indexOf(pasaranName);
if(d<0||p<0)return 0;
return neptuHariJawa[d]+neptuPasaranJawa[p];
}
function getPrimbonNeptu(data){
return neptuHariJawa[data.getDay()]+neptuPasaranJawa[getHariJawa(data)];
}

/* Zodiac - rentang tropikal umum */
function getZodiac(data){
var m=data.getMonth()+1,d=data.getDate(),md=m*100+d;
if(md>=1222||md<=119)return 0;
if(md<=218)return 1;if(md<=320)return 2;if(md<=419)return 3;if(md<=520)return 4;if(md<=620)return 5;
if(md<=722)return 6;if(md<=822)return 7;if(md<=922)return 8;if(md<=1022)return 9;if(md<=1121)return 10;
return 11;
}

/* Shio - mengikuti tahun kalender Tionghoa via Intl bila tersedia */
function getShioJodoh(data){
var relatedYear=data.getFullYear();
try{
var parts=new Intl.DateTimeFormat("en-u-ca-chinese",{year:"numeric"}).formatToParts(data);
for(var i=0;i<parts.length;i++){if(parts[i].type==="relatedYear"){relatedYear=parseInt(parts[i].value,10);break;}}
}catch(e){}
return cfJdhMod(relatedYear-4,12);
}

/* Numerologi nama - tetap sebagai elemen hiburan/refleksi */
function letterValue(str){
str=(str||"").toLowerCase();
return/^[a-z]$/.test(str)?str.charCodeAt(0)-96:0;
}
function getArtiNamaCalc(data){
var str=(data||"").toLowerCase();
if(str.normalize)str=str.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
str=str.replace(/[^a-z]/g,"");
var total=0;
for(var i=0;i<str.length;i++)total+=letterValue(str[i]);
while(total>9&&total!==11&&total!==22){
var n=0,digits=String(total);for(var j=0;j<digits.length;j++)n+=parseInt(digits[j],10)||0;total=n;
}
return total||1;
}
function getLifePath(data){
var s=("0"+data.getDate()).slice(-2)+("0"+(data.getMonth()+1)).slice(-2)+data.getFullYear(),n=0;
for(var i=0;i<s.length;i++)n+=parseInt(s[i],10)||0;
while(n>9&&n!==11&&n!==22){var t=0,x=String(n);for(var j=0;j<x.length;j++)t+=parseInt(x[j],10)||0;n=t;}
return n;
}

/* Bioritmik - hanya faktor kecil dan berubah mengikuti hari */
function getBioCalculation(data){
var cycles=[23,28,33],today=new Date(),days=cfJdhUtcDay(today)-cfJdhUtcDay(data),sum=0;
for(var i=0;i<cycles.length;i++)sum+=(Math.sin(days*(2*Math.PI/cycles[i]))+1)*50;
return Math.round(sum/cycles.length);
}

/* Skor Relasi */
function cfJdhWetonRelation(){
var total=strNeptuFemale+strNeptuMale,rem=total%8;if(rem===0)rem=8;
var data={
1:{name:"Pegat",score:.45,text:"Dalam salah satu pakem Primbon Jawa, kombinasi ini disebut Pegat. Secara tradisional dianggap membutuhkan perhatian lebih pada komunikasi, kepercayaan, dan cara menyelesaikan konflik."},
2:{name:"Ratu",score:.95,text:"Disebut Ratu. Secara tradisional dilihat sebagai kombinasi yang mudah mendapat penghargaan dan dukungan dari lingkungan. Tetap jaga hubungan agar tidak hanya terlihat harmonis dari luar."},
3:{name:"Jodoh",score:1,text:"Disebut Jodoh. Dalam tradisi, kombinasi ini diasosiasikan dengan kemudahan memahami ritme pasangan. Kecocokan tetap perlu dipelihara melalui komunikasi dan komitmen nyata."},
4:{name:"Topo",score:.65,text:"Disebut Topo. Tafsir tradisional menggambarkannya sebagai hubungan yang mungkin membutuhkan proses dan penyesuaian lebih di awal, tetapi dapat berkembang ketika keduanya konsisten."},
5:{name:"Tinari",score:.90,text:"Disebut Tinari. Secara tradisional diasosiasikan dengan kemudahan dalam membangun kehidupan bersama dan saling mendukung dalam urusan praktis."},
6:{name:"Padu",score:.55,text:"Disebut Padu. Tradisi menggambarkannya sebagai pasangan yang mudah berbeda pendapat. Kuncinya bukan menghindari perbedaan, melainkan membangun cara berdebat yang sehat."},
7:{name:"Sujanan",score:.45,text:"Disebut Sujanan. Dalam tafsir tradisional, tema utamanya adalah kepercayaan dan kecemburuan. Hasil ini sebaiknya dibaca sebagai pengingat untuk menjaga keterbukaan, bukan tuduhan terhadap pasangan."},
8:{name:"Pesthi",score:.95,text:"Disebut Pesthi. Dalam tradisi, kombinasi ini diasosiasikan dengan kestabilan dan ketenteraman. Stabilitas tetap membutuhkan perhatian, kejujuran, dan kerja sama dari kedua pihak."}
};
return{total:total,remainder:rem,name:data[rem].name,score:data[rem].score,text:data[rem].text};
}
function cfJdhZodiacRelation(a,b){
var ea=zodiacElements[a],eb=zodiacElements[b],diff=Math.min(cfJdhMod(a-b,12),cfJdhMod(b-a,12)),score=.68;
if(a===b)score=.84;
else if(diff===6)score=.92;
else if(ea===eb)score=.86;
else if((ea==="Api"&&eb==="Udara")||(ea==="Udara"&&eb==="Api")||(ea==="Bumi"&&eb==="Air")||(ea==="Air"&&eb==="Bumi"))score=.95;
else if(diff===3)score=.58;
return{score:score,label:cfJdhLabel(score),detail:zodiacNames[a]+" × "+zodiacNames[b]};
}
function cfJdhShioRelation(a,b){
var key=cfJdhPairKey(a,b),score=.70;
var harmonis=["0-1","2-11","3-10","4-9","5-8","6-7"];
var bentrok=["0-6","1-7","2-8","3-9","4-10","5-11"];
var trine=["0-4","0-8","4-8","1-5","1-9","5-9","2-6","2-10","6-10","3-7","3-11","7-11"];
if(a===b)score=.80;
if(harmonis.indexOf(key)>-1)score=.95;
if(trine.indexOf(key)>-1)score=1;
if(bentrok.indexOf(key)>-1)score=.50;
return{score:score,label:cfJdhLabel(score),detail:shioJodoh[a]+" × "+shioJodoh[b]};
}
function cfJdhNumberRelation(a,b){
var ra=a===11?2:a===22?4:a,rb=b===11?2:b===22?4:b,d=Math.abs(ra-rb),score;
if(a===b)score=1;else{d=Math.min(d,9-d);score=cfJdhClamp(1-(d*.10),.60,.95);}
return score;
}
function cfJdhDayRelation(a,b){
var diff=Math.abs(neptuHariJawa[a]-neptuHariJawa[b]),score=diff===0?.90:diff<=1?.86:diff<=2?.75:.62;
return score;
}
function cfJdhPasaranRelation(a,b){
var diff=Math.abs(neptuPasaranJawa[a]-neptuPasaranJawa[b]),score=diff===0?.88:diff<=2?.82:diff<=4?.70:.60;
return score;
}
function cfJdhBioRelation(a,b){return cfJdhClamp(1-(Math.abs(a-b)/100),.45,1);}

/* Kalkulasi */
function getDataKalkulasiJodoh(gender){
var isF=gender==="f",date=$(isF?"#fAstDateFemale":"#fAstDateMale").datepicker("getDate");
var day=date.getDay(),pasaran=getHariJawa(date),dayName=weekdayJodohBlog[day],neptu=getWetonNumber(dayName,namaPasaranJawa[pasaran]);
if(isF){
strZodiakFemale=getZodiac(date);strShioFemale=getShioJodoh(date);strNameIdxF=getArtiNamaCalc($("#fAstNameFemale").val());
strLifePathF=getLifePath(date);strBioReadingF=getBioCalculation(date);strIndexHariF=day;strHariJawaFemale=pasaran;strNamaHariFemale=dayName;strNeptuFemale=neptu;
}else{
strZodiakMale=getZodiac(date);strShioMale=getShioJodoh(date);strNameIdxM=getArtiNamaCalc($("#fAstNameMale").val());
strLifePathM=getLifePath(date);strBioReadingM=getBioCalculation(date);strIndexHariM=day;strHariJawaMale=pasaran;strNamaHariMale=dayName;strNeptuMale=neptu;
}
}
function runKalkulasiJodoh(){
var f=$.trim($("#fAstNameFemale").val()),m=$.trim($("#fAstNameMale").val());
if(!f||f==="Nama Lengkap Wanita"){alert("Silakan isi nama Anda terlebih dahulu.");$("#fAstNameFemale").trigger("focus");return;}
if(!m||m==="Nama Lengkap Pria"){alert("Silakan isi nama pasangan terlebih dahulu.");$("#fAstNameMale").trigger("focus");return;}
var fd=$("#fAstDateFemale").datepicker("getDate"),md=$("#fAstDateMale").datepicker("getDate");
if(!fd||!md){alert("Silakan pilih tanggal lahir kedua pasangan.");return;}
getDataKalkulasiJodoh("f");getDataKalkulasiJodoh("m");getMatchLove();
}
function getMatchLove(){
var weton=cfJdhWetonRelation();
var zodiac=cfJdhZodiacRelation(strZodiakFemale,strZodiakMale);
var shio=cfJdhShioRelation(strShioFemale,strShioMale);
var nameScore=cfJdhNumberRelation(strNameIdxF,strNameIdxM);
var lifeScore=cfJdhNumberRelation(strLifePathF,strLifePathM);
var dayScore=cfJdhDayRelation(strIndexHariF,strIndexHariM);
var pasaranScore=cfJdhPasaranRelation(strHariJawaFemale,strHariJawaMale);
var bioScore=cfJdhBioRelation(strBioReadingF,strBioReadingM);

var factors=[
{name:"Weton Jawa",score:weton.score,weight:25,label:weton.name},
{name:"Zodiak",score:zodiac.score,weight:15,label:zodiac.label},
{name:"Shio",score:shio.score,weight:15,label:shio.label},
{name:"Numerologi Nama",score:nameScore,weight:12,label:cfJdhLabel(nameScore)},
{name:"Jalur Hidup",score:lifeScore,weight:12,label:cfJdhLabel(lifeScore)},
{name:"Hari Lahir",score:dayScore,weight:8,label:cfJdhLabel(dayScore)},
{name:"Pasaran Jawa",score:pasaranScore,weight:8,label:cfJdhLabel(pasaranScore)},
{name:"Bioritmik Hari Ini",score:bioScore,weight:5,label:cfJdhLabel(bioScore)}
];

var sum=0;
for(var i=0;i<factors.length;i++)sum+=factors[i].score*factors[i].weight;
var sumCocok=Math.round(cfJdhClamp(sum,0,100));
var title=sumCocok>=85?"Sangat Selaras":sumCocok>=75?"Selaras & Potensial":sumCocok>=65?"Cukup Seimbang":sumCocok>=55?"Perlu Banyak Penyesuaian":"Banyak Perbedaan";
$("#fAstMatch").html(title);
$("#gAverageMatch").css("width",sumCocok+"%");
$("#btnKecocokan").html(sumCocok+"%");

var sorted=factors.slice().sort(function(a,b){return b.score-a.score;});
var strongest=sorted[0],weakest=sorted[sorted.length-1];
var strDateF=$("#fAstDateFemale").datepicker("getDate"),strDateM=$("#fAstDateMale").datepicker("getDate");

var female="<b>Nama Wanita :</b> "+cfJdhEscape($("#fAstNameFemale").val())+"<br>";
female+="<b>Tgl Lahir :</b> "+strDateF.getDate()+" - "+(strDateF.getMonth()+1)+" - "+strDateF.getFullYear()+"<br>";
female+="<b>Hari Lahir :</b> "+strNamaHariFemale+" ["+namaPasaranJawa[strHariJawaFemale]+"] · Neptu "+strNeptuFemale+"<br>";
female+="<b>Zodiak / Shio :</b> "+zodiacNames[strZodiakFemale]+" / "+shioJodoh[strShioFemale]+"<br>";
female+="<center><div class='leftfooterFrmJodoh hov-slider' style='background:#ff0b75;margin:5px 0;color:#fff;padding:5px 10px;' onclick='getAstJdhDetail(\"f\")'>Lihat Detail</div></center>";
$("#dataFemale").html(female);

var male="<b>Nama Pria :</b> "+cfJdhEscape($("#fAstNameMale").val())+"<br>";
male+="<b>Tgl Lahir :</b> "+strDateM.getDate()+" - "+(strDateM.getMonth()+1)+" - "+strDateM.getFullYear()+"<br>";
male+="<b>Hari Lahir :</b> "+strNamaHariMale+" ["+namaPasaranJawa[strHariJawaMale]+"] · Neptu "+strNeptuMale+"<br>";
male+="<b>Zodiak / Shio :</b> "+zodiacNames[strZodiakMale]+" / "+shioJodoh[strShioMale]+"<br>";
male+="<center><div class='leftfooterFrmJodoh hov-slider' style='background:#0083da;margin:5px 0;color:#fff;padding:5px 10px;' onclick='getAstJdhDetail(\"m\")'>Lihat Detail</div></center>";
$("#dataMale").html(male);

$("#dataPrimbon").html(getWetonJdhReading());

var html='<div style="padding:7px 10px;margin-bottom:7px;background:#ff00a7;width:100%;text-align:center;font-size:16px;color:#fff;">FAKTOR KECOCOKAN</div>';
html+='<div style="margin:0 0 10px;text-align:justify;"><b>Ringkasan:</b> faktor simbolik terkuat ada pada <b>'+strongest.name+'</b>, sedangkan bagian yang paling membutuhkan penyesuaian adalah <b>'+weakest.name+'</b>. Persentase ini bukan ukuran ilmiah dan tidak menentukan masa depan hubungan.</div>';
html+='<table border="0" width="100%">';
for(var j=0;j<factors.length;j++){
html+='<tr><td width="145px">'+factors[j].name+'</td><td>:</td><td>'+factors[j].label+' <small>('+(Math.round(factors[j].score*100))+'%)</small></td></tr>';
}
html+='<tr><td>Weton Pasangan</td><td>:</td><td>'+weton.name+' · total neptu '+weton.total+'</td></tr>';
html+='</table><br><small><b>Catatan:</b> kalkulator ini menggabungkan beberapa sistem tradisional/populer untuk hiburan dan refleksi. Kualitas hubungan nyata lebih dipengaruhi komunikasi, rasa aman, nilai bersama, tanggung jawab, dan cara menyelesaikan konflik.</small>';
$("#dataKecocokan").html(html);

rotation=0;
if(contentAPN1Jodoh===0)setTimeout(navPageRightJodoh,500);
}

/* Detail ke mesin Astrologi utama */
function getAstJdhDetail(gender){
if(gender==="f"){
$("#fAstName").val($("#fAstNameFemale").val());
$("#fAstDate").datepicker("setDate",$("#fAstDateFemale").datepicker("getDate"));
}else{
$("#fAstName").val($("#fAstNameMale").val());
$("#fAstDate").datepicker("setDate",$("#fAstDateMale").datepicker("getDate"));
}
if(typeof contentAPN2!=="undefined")contentAPN2=0;
if(typeof contentAPId!=="undefined"&&typeof contentAPN1!=="undefined"){
$("#"+contentAPId[contentAPN1]).hide("slide",{direction:"right"},500);
$("#titleHeaderAst").hide("slide",{direction:"right"},500,function(){
if(typeof contentAPF!=="undefined"&&typeof contentAPT!=="undefined")$("#titleHeaderAst").html(contentAPF[0]+" "+contentAPT[0]);
});
$("#"+contentAPId[0]).delay(800).show("slide",500);$("#titleHeaderAst").delay(300).show("slide",500);contentAPN1=0;
}
if(typeof runAstrologi==="function")runAstrologi();
if(typeof getBioImage==="function")getBioImage();
}

/* Weton Reading */
function getWetonJdhReading(){
var r=cfJdhWetonRelation();
return '<div style="text-align:justify;"><b>Petungan Weton: '+r.name+'</b><br>'+r.text+
'<br><br><small><b>Dasar hitung:</b> '+strNamaHariFemale+' '+namaPasaranJawa[strHariJawaFemale]+' ('+strNeptuFemale+') + '+
strNamaHariMale+' '+namaPasaranJawa[strHariJawaMale]+' ('+strNeptuMale+') = '+r.total+
'. Total dibaca dengan metode sisa bagi 8 yang umum dipakai pada salah satu versi petungan jodoh Jawa. Tafsir weton merupakan tradisi budaya, bukan prediksi ilmiah.</small></div>';
}

$(document).ready(function(){initialSetDateJodoh();});
//]]>
