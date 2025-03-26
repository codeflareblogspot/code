var dataShow=3;  //Show Data Number
var dataTime=10;  //Timer to Replace Data in Second

function posGempaHeadTick(event) {
    let x = event.clientX;
    let y = event.clientY;
    $('#detailGempaHeadTick').css({'position':'fixed','top':y+10+'px','left':x+169+'px','z-index':'+999999'});
}
function openDataHeadTick(x){
$('#detailGempaHeadTick'+x).appendTo($('#detailGempaHeadTick'));
$('#detailGempaHeadTick'+x).show();
posGempaHeadTick(e);
$('#detailGempaHeadTick').show();
}
function closeDataHeadTick(x){
$('#detailGempaHeadTick'+x).hide();
$('#detailGempaHeadTick').hide();
}
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
