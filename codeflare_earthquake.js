var dataShow=3;  //Show Data Number
var dataTime=10;  //Timer to Replace Data in Second

$.getJSON( "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json", function(data) {
var tmpDataList='';
for(var i=0;i<data.Infogempa.gempa.length;i++){
tmpDataList += '<li class="dataInfoGempaHeadTick" onmouseover="openDataHeadTick(\''+i+'\')" onmouseout="closeDataHeadTick(\''+i+'\')">';
tmpDataList += '<span style="padding:0 5px;background:#0083da;color:#fff;">'+data.Infogempa.gempa[i].Magnitude+' S-R</span>';
if(i % 2 == 0){
tmpDataList += '<span style="padding:5px;background:#c2ed45;color:#000;border-radius:5px;">'+data.Infogempa.gempa[i].Wilayah+'</span>';}
else{tmpDataList += '<span style="padding:5px;background:#0a333a;color:#fff;border-radius:5px;">'+data.Infogempa.gempa[i].Wilayah+'</span>';}
let pot = data.Infogempa.gempa[i].Potensi.match("tidak");
if(pot=="tidak"){tmpDataList += '<span style="padding:0 5px;background:red;color:#fff;">⚠️BAHAYA</span>';}
else{tmpDataList += '<span style="padding:0 5px;background:green;color:#fff;">✅AMAN</span>';}
tmpDataList += '<div id="detailGempaHeadTick'+i+'" style="display:none;padding:5px;background:#35605d;border-radius:5px;margin-top:5px;text-align:left;">';
const mapData = data.Infogempa.gempa[i].Coordinates.split(",");
tmpDataList +='<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q='+mapData[0]+','+mapData[1]+'&hl=id&z=10&output=embed" style="width:100%;border-radius:5px;"></iframe>';
tmpDataList += '<div style="padding:5px;background:#333;color:#fff;border-radius:4px;">��'+data.Infogempa.gempa[i].Tanggal+', '+data.Infogempa.gempa[i].Jam+'<br>';
tmpDataList += '��Kedalaman Gempa: '+data.Infogempa.gempa[i].Kedalaman+'<br>';
tmpDataList += '��Potensi Tsunami: '+data.Infogempa.gempa[i].Potensi;
tmpDataList += '</div></div>';
tmpDataList += '</li>';}
$('#codeflareInfoGempaHeadlineTicker').html(tmpDataList);});

function openDataHeadTick(x){$('.dataInfoGempaHeadTick').eq(x).find('#detailGempaHeadTick'+x).show();}
function closeDataHeadTick(x){$('.dataInfoGempaHeadTick').eq(x).find('#detailGempaHeadTick'+x).hide();}
function openGMap(x,y){
PopupCenter('https://maps.google.com/maps?q='+x+','+y+'&hl=id&z=0','CodeFlare | Gempa Bumi Terkini',800,600);}
var tickDataLength='';
var tickDataTime=dataTime*10000;
function startTickData(){
var b=$('.daftarInfoGempa');
b.eq(0).hide( "slow", function () {
$(this).appendTo($('#codeflareDaftarInfoGempa'));
b.eq(dataShow).show("slow");});}
setInterval(function(){startTickData()}, tickDataTime);
function tickerData(){
tickDataLength=$('.daftarInfoGempa').length;
if(tickDataLength>dataShow){
for(var i=dataShow;i<tickDataLength;i++){$('.daftarInfoGempa').eq(i).css('display','none');}
}startTickData();}
$(document).ready(function(){tickerData();});

const scrollers = document.querySelectorAll(".scroller");
// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
addAnimation();
}
function addAnimation(){
scrollers.forEach((scroller) => {
// add data-animated="true" to every `.scroller` on the page
scroller.setAttribute("data-animated", true);
// Make an array from the elements within `.scroller-inner`
const scrollerInner = scroller.querySelector(".scroller__inner");
const scrollerContent = Array.from(scrollerInner.children);
// For each item in the array, clone it
// add aria-hidden to it
// add it into the `.scroller-inner`
scrollerContent.forEach((item) => {
const duplicatedItem = item.cloneNode(true);
duplicatedItem.setAttribute("aria-hidden", true);
scrollerInner.appendChild(duplicatedItem);
});});}
