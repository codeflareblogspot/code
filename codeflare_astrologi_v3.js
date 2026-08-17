// ============================================================
// CODEFLARE ASTROLOGI v3.0
// WETON + ZODIAK TROPICAL + SHIO + BIORITMIK
// LEGACY COMPATIBLE / STANDALONE
//
// Function lama tetap tersedia:
// getBioImage()
// enterBio(event)
// chgBgTeller()
// closeBox()
//
// Tidak memakai fetch(), AJAX atau API astrologi eksternal.
// ============================================================

(function () {
"use strict";

var DAY_MS = 86400000;


/* ============================================================
   CONFIG
============================================================ */

var CF_ASTRO = {

version:"3.0.0",
updated:"2026-08-17",


/* ============================================================
   HARI JAWA / SAPTAWARA
============================================================ */

weekdays:[

{
name:"Minggu",
neptu:5,
traditional:
"Dalam tafsir tradisional weton, Minggu sering dikaitkan dengan sikap terbuka, aktif dan mudah mengekspresikan diri."
},

{
name:"Senin",
neptu:4,
traditional:
"Dalam tafsir tradisional weton, Senin sering dikaitkan dengan sifat tenang, adaptif dan memiliki kepekaan terhadap lingkungan."
},

{
name:"Selasa",
neptu:3,
traditional:
"Dalam tafsir tradisional weton, Selasa sering dikaitkan dengan keberanian, ketegasan dan semangat untuk bertindak."
},

{
name:"Rabu",
neptu:7,
traditional:
"Dalam tafsir tradisional weton, Rabu sering dikaitkan dengan kemampuan berkomunikasi, berpikir dan menyesuaikan diri."
},

{
name:"Kamis",
neptu:8,
traditional:
"Dalam tafsir tradisional weton, Kamis sering dikaitkan dengan optimisme, cita-cita dan kemampuan membangun hubungan sosial."
},

{
name:"Jumat",
neptu:6,
traditional:
"Dalam tafsir tradisional weton, Jumat sering dikaitkan dengan sifat hangat, mudah bergaul dan mempertimbangkan perasaan orang lain."
},

{
name:"Sabtu",
neptu:9,
traditional:
"Dalam tafsir tradisional weton, Sabtu sering dikaitkan dengan ketekunan, kemandirian dan kemauan yang relatif kuat."
}

],


/* ============================================================
   PANCAWARA / PASARAN
============================================================ */

pasaran:[

{
name:"Legi",
neptu:5,
traditional:
"Legi dalam tradisi Jawa kerap diasosiasikan dengan keramahan, kemampuan bergaul dan kecenderungan mencari keharmonisan."
},

{
name:"Pahing",
neptu:9,
traditional:
"Pahing dalam tafsir tradisional sering dikaitkan dengan kemauan yang kuat, prinsip yang tegas dan semangat tinggi."
},

{
name:"Pon",
neptu:7,
traditional:
"Pon dalam tafsir tradisional sering dikaitkan dengan sikap berhati-hati, pertimbangan yang matang dan kecenderungan menjaga kestabilan."
},

{
name:"Wage",
neptu:4,
traditional:
"Wage dalam tafsir tradisional sering dikaitkan dengan kesederhanaan, ketelitian dan kecenderungan bekerja secara praktis."
},

{
name:"Kliwon",
neptu:8,
traditional:
"Kliwon dalam tafsir tradisional sering dikaitkan dengan intuisi, pemikiran mendalam dan karakter yang relatif kuat."
}

],


/* ============================================================
   ZODIAK TROPICAL

   Urutan berdasarkan longitude:
   0° Aries
   30° Taurus
   dst.
============================================================ */

zodiac:[

{
name:"Aries",
symbol:"♈",
element:"Api",
modality:"Kardinal",
traditionalRuler:"Mars",
modernRuler:"Mars",
traditional:
"Dalam astrologi Barat, Aries diasosiasikan dengan inisiatif, keberanian, spontanitas dan dorongan untuk memulai sesuatu."
},

{
name:"Taurus",
symbol:"♉",
element:"Tanah",
modality:"Tetap",
traditionalRuler:"Venus",
modernRuler:"Venus",
traditional:
"Dalam astrologi Barat, Taurus diasosiasikan dengan stabilitas, kesabaran, konsistensi dan kecenderungan menghargai kenyamanan."
},

{
name:"Gemini",
symbol:"♊",
element:"Udara",
modality:"Berubah",
traditionalRuler:"Merkurius",
modernRuler:"Merkurius",
traditional:
"Dalam astrologi Barat, Gemini diasosiasikan dengan komunikasi, rasa ingin tahu, fleksibilitas dan kemampuan mempelajari berbagai hal."
},

{
name:"Cancer",
symbol:"♋",
element:"Air",
modality:"Kardinal",
traditionalRuler:"Bulan",
modernRuler:"Bulan",
traditional:
"Dalam astrologi Barat, Cancer diasosiasikan dengan kepekaan, perlindungan, keluarga dan keterikatan emosional."
},

{
name:"Leo",
symbol:"♌",
element:"Api",
modality:"Tetap",
traditionalRuler:"Matahari",
modernRuler:"Matahari",
traditional:
"Dalam astrologi Barat, Leo diasosiasikan dengan ekspresi diri, kreativitas, kepercayaan diri dan kecenderungan tampil menonjol."
},

{
name:"Virgo",
symbol:"♍",
element:"Tanah",
modality:"Berubah",
traditionalRuler:"Merkurius",
modernRuler:"Merkurius",
traditional:
"Dalam astrologi Barat, Virgo diasosiasikan dengan ketelitian, analisis, keteraturan dan perhatian terhadap detail."
},

{
name:"Libra",
symbol:"♎",
element:"Udara",
modality:"Kardinal",
traditionalRuler:"Venus",
modernRuler:"Venus",
traditional:
"Dalam astrologi Barat, Libra diasosiasikan dengan keseimbangan, diplomasi, kerja sama dan estetika."
},

{
name:"Scorpio",
symbol:"♏",
element:"Air",
modality:"Tetap",
traditionalRuler:"Mars",
modernRuler:"Pluto",
traditional:
"Dalam astrologi Barat, Scorpio diasosiasikan dengan intensitas, fokus, ketekunan dan kecenderungan memahami sesuatu secara mendalam."
},

{
name:"Sagitarius",
symbol:"♐",
element:"Api",
modality:"Berubah",
traditionalRuler:"Jupiter",
modernRuler:"Jupiter",
traditional:
"Dalam astrologi Barat, Sagitarius diasosiasikan dengan eksplorasi, optimisme, keterusterangan dan pencarian wawasan baru."
},

{
name:"Capricorn",
symbol:"♑",
element:"Tanah",
modality:"Kardinal",
traditionalRuler:"Saturnus",
modernRuler:"Saturnus",
traditional:
"Dalam astrologi Barat, Capricorn diasosiasikan dengan struktur, disiplin, tanggung jawab dan orientasi jangka panjang."
},

{
name:"Aquarius",
symbol:"♒",
element:"Udara",
modality:"Tetap",
traditionalRuler:"Saturnus",
modernRuler:"Uranus",
traditional:
"Dalam astrologi Barat, Aquarius diasosiasikan dengan independensi, gagasan baru, pemikiran konseptual dan perhatian terhadap kelompok."
},

{
name:"Pisces",
symbol:"♓",
element:"Air",
modality:"Berubah",
traditionalRuler:"Jupiter",
modernRuler:"Neptunus",
traditional:
"Dalam astrologi Barat, Pisces diasosiasikan dengan imajinasi, empati, intuisi dan kepekaan terhadap lingkungan."
}

],


/* ============================================================
   SHIO
============================================================ */

shio:[

{
name:"Tikus",
emoji:"🐀",
traditional:
"Dalam tradisi zodiak Tionghoa, Tikus sering diasosiasikan dengan kecerdikan, kemampuan beradaptasi dan kepekaan membaca peluang."
},

{
name:"Kerbau",
emoji:"🐂",
traditional:
"Kerbau sering diasosiasikan dengan ketekunan, kesabaran, stabilitas dan kemauan bekerja secara konsisten."
},

{
name:"Macan",
emoji:"🐅",
traditional:
"Macan sering diasosiasikan dengan keberanian, semangat, daya saing dan kecenderungan bertindak independen."
},

{
name:"Kelinci",
emoji:"🐇",
traditional:
"Kelinci sering diasosiasikan dengan diplomasi, kehati-hatian, kelembutan dan perhatian terhadap keharmonisan."
},

{
name:"Naga",
emoji:"🐉",
traditional:
"Naga sering diasosiasikan dengan karisma, energi, ambisi dan kecenderungan mengambil peran yang menonjol."
},

{
name:"Ular",
emoji:"🐍",
traditional:
"Ular sering diasosiasikan dengan observasi, strategi, ketenangan dan kemampuan mempertimbangkan sesuatu secara mendalam."
},

{
name:"Kuda",
emoji:"🐎",
traditional:
"Kuda sering diasosiasikan dengan energi, kebebasan, aktivitas dan keinginan untuk bergerak secara independen."
},

{
name:"Kambing",
emoji:"🐐",
traditional:
"Kambing sering diasosiasikan dengan kreativitas, empati, kelembutan dan perhatian terhadap kenyamanan lingkungan."
},

{
name:"Monyet",
emoji:"🐒",
traditional:
"Monyet sering diasosiasikan dengan kecerdasan, kreativitas, fleksibilitas dan kemampuan menemukan cara alternatif."
},

{
name:"Ayam",
emoji:"🐓",
traditional:
"Ayam sering diasosiasikan dengan ketelitian, organisasi, keterusterangan dan perhatian terhadap detail."
},

{
name:"Anjing",
emoji:"🐕",
traditional:
"Anjing sering diasosiasikan dengan loyalitas, tanggung jawab, kewaspadaan dan keinginan menjaga orang yang dianggap penting."
},

{
name:"Babi",
emoji:"🐖",
traditional:
"Babi sering diasosiasikan dengan ketulusan, kemurahan hati, keramahan dan penghargaan terhadap kenyamanan."
}

],


/* ============================================================
   10 HEAVENLY STEMS

   Tahun dengan stem yang sama bergeser setiap 10 tahun.
============================================================ */

stems:[

{name:"Jia",element:"Kayu",polarity:"Yang"},
{name:"Yi",element:"Kayu",polarity:"Yin"},

{name:"Bing",element:"Api",polarity:"Yang"},
{name:"Ding",element:"Api",polarity:"Yin"},

{name:"Wu",element:"Tanah",polarity:"Yang"},
{name:"Ji",element:"Tanah",polarity:"Yin"},

{name:"Geng",element:"Logam",polarity:"Yang"},
{name:"Xin",element:"Logam",polarity:"Yin"},

{name:"Ren",element:"Air",polarity:"Yang"},
{name:"Gui",element:"Air",polarity:"Yin"}

]

};


/* ============================================================
   UTILITIES
============================================================ */

function el(id){

return document.getElementById(id);

}


function mod(n,m){

return ((n%m)+m)%m;

}


function degToRad(deg){

return deg*Math.PI/180;

}


function norm360(deg){

return mod(deg,360);

}


function utcDate(y,m,d){

return new Date(
Date.UTC(y,m-1,d,12,0,0)
);

}


function daysBetween(a,b){

var aa=Date.UTC(
a.getUTCFullYear(),
a.getUTCMonth(),
a.getUTCDate()
);

var bb=Date.UTC(
b.getUTCFullYear(),
b.getUTCMonth(),
b.getUTCDate()
);

return Math.round(
(bb-aa)/DAY_MS
);

}


function isValidDateParts(y,m,d){

if(
!Number.isInteger(y) ||
!Number.isInteger(m) ||
!Number.isInteger(d)
){

return false;

}

if(
y<1901 ||
y>2100 ||
m<1 ||
m>12 ||
d<1 ||
d>31
){

return false;

}

var dt=utcDate(y,m,d);

return(
dt.getUTCFullYear()===y &&
dt.getUTCMonth()===m-1 &&
dt.getUTCDate()===d
);

}


function readDate(
dayId,
monthId,
yearId
){

var de=el(dayId);
var me=el(monthId);
var ye=el(yearId);

if(!de || !me || !ye){

return null;

}

var d=parseInt(de.value,10);
var m=parseInt(me.value,10);
var y=parseInt(ye.value,10);

if(
!isValidDateParts(y,m,d)
){

return null;

}

return utcDate(y,m,d);

}


function formatID(dt){

try{

return new Intl.DateTimeFormat(
"id-ID",
{
day:"numeric",
month:"long",
year:"numeric",
timeZone:"UTC"
}
).format(dt);

}catch(e){

return(
dt.getUTCDate()+
"-"+
(dt.getUTCMonth()+1)+
"-"+
dt.getUTCFullYear()
);

}

}


function escapeHtml(str){

return String(
str==null ? "" : str
).replace(
/[&<>"']/g,
function(s){

return{
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#039;"
}[s];

}
);

}


/* ============================================================
   JULIAN DATE

   Dipakai untuk menentukan longitude Matahari.
============================================================ */

function julianDate(date){

return(
date.getTime()/DAY_MS
)+2440587.5;

}


/* ============================================================
   APPARENT SOLAR ECLIPTIC LONGITUDE

   Pendekatan US Naval Observatory:

   D = JD - 2451545.0

   g = 357.529 + 0.98560028 D
   q = 280.459 + 0.98564736 D

   L = q +
       1.915 sin(g) +
       0.020 sin(2g)

============================================================ */

function solarLongitude(date){

var jd=
julianDate(date);

var D=
jd-2451545.0;


var g=
norm360(
357.529+
0.98560028*D
);


var q=
norm360(
280.459+
0.98564736*D
);


var L=

q +

1.915*
Math.sin(
degToRad(g)
)

+

0.020*
Math.sin(
degToRad(
2*g
)
);


return norm360(L);

}


/* ============================================================
   LOCAL SVG GENERATOR
============================================================ */

function svgData(
symbol,
title,
c1,
c2
){

var svg=

'<svg xmlns="http://www.w3.org/2000/svg" '+
'width="220" height="220" viewBox="0 0 220 220">'+

'<defs>'+

'<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'+

'<stop stop-color="'+
c1+
'"/>'+

'<stop offset="1" stop-color="'+
c2+
'"/>'+

'</linearGradient>'+

'</defs>'+

'<rect width="220" height="220" rx="28" fill="url(#g)"/>'+

'<circle cx="110" cy="92" r="62" '+
'fill="rgba(255,255,255,.10)" '+
'stroke="rgba(255,255,255,.25)" '+
'stroke-width="2"/>'+

'<text x="110" y="119" '+
'text-anchor="middle" '+
'font-size="72" '+
'font-family="Arial,Segoe UI Symbol,sans-serif" '+
'fill="#fff">'+

escapeHtml(symbol)+

'</text>'+

'<text x="110" y="185" '+
'text-anchor="middle" '+
'font-size="19" '+
'font-weight="700" '+
'font-family="Arial,sans-serif" '+
'fill="#fff">'+

escapeHtml(title)+

'</text>'+

'</svg>';


return(
"data:image/svg+xml;charset=UTF-8,"+
encodeURIComponent(svg)
);

}


function setImg(
id,
symbol,
title,
c1,
c2
){

var img=el(id);

if(!img){

return;

}

img.src=
svgData(
symbol,
title,
c1,
c2
);

img.alt=title;

}


/* ============================================================
   WETON ENGINE

   Reference:
   17-08-1945 = Jumat Legi
============================================================ */

function calcWeton(dt){

var anchor=
utcDate(
1945,
8,
17
);

var diff=
daysBetween(
anchor,
dt
);


/*
Pasaran anchor = Legi index 0.

Urutan:
Legi
Pahing
Pon
Wage
Kliwon
*/

var pasaranIndex=
mod(diff,5);

var weekdayIndex=
dt.getUTCDay();


var day=
CF_ASTRO.weekdays[
weekdayIndex
];


var pasar=
CF_ASTRO.pasaran[
pasaranIndex
];


var total=
day.neptu+
pasar.neptu;


return{

date:
formatID(dt),

day:
day,

pasaran:
pasar,

neptu:
total,

name:
day.name+
" "+
pasar.name

};

}


/* ============================================================
   WETON RENDER
============================================================ */

function renderWeton(dt){

var w=
calcWeton(dt);

var area=
el("wetonArea");


if(area){

area.innerHTML=

'<div class="cfAstroData">'+

'<div style="font-size:17px;font-weight:bold;margin-bottom:8px;">'+

escapeHtml(w.name)+

'</div>'+


'<div>'+

'<strong>Tanggal:</strong> '+
escapeHtml(w.date)+

'</div>'+


'<div>'+

'<strong>Hari:</strong> '+
escapeHtml(w.day.name)+

' &nbsp;•&nbsp; '+

'<strong>Neptu:</strong> '+
w.day.neptu+

'</div>'+


'<div>'+

'<strong>Pasaran:</strong> '+
escapeHtml(
w.pasaran.name
)+

' &nbsp;•&nbsp; '+

'<strong>Neptu:</strong> '+
w.pasaran.neptu+

'</div>'+


'<div style="margin-top:5px;">'+

'<strong>Total Neptu:</strong> '+
w.neptu+

'</div>'+


'<hr/>'+


'<div>'+

'<strong>Tafsiran Hari '+

escapeHtml(
w.day.name
)+

'</strong>'+

'<p>'+

escapeHtml(
w.day.traditional
)+

'</p>'+

'</div>'+


'<div>'+

'<strong>Tafsiran Pasaran '+

escapeHtml(
w.pasaran.name
)+

'</strong>'+

'<p>'+

escapeHtml(
w.pasaran.traditional
)+

'</p>'+

'</div>'+


'<small>'+

'Informasi karakter di atas merupakan tafsir tradisional dalam budaya weton Jawa dan tidak dimaksudkan sebagai pengukuran ilmiah kepribadian atau kepastian nasib.'+

'</small>'+


'</div>';

}


setImg(
"wetonSign",
"✦",
w.name,
"#563117",
"#b06a2b"
);


return w;

}


/* ============================================================
   ZODIAK TROPICAL ENGINE

   0°   Aries
   30°  Taurus
   60°  Gemini
   ...
============================================================ */

function calcZodiac(dt){

var longitude=
solarLongitude(dt);


var index=
Math.floor(
longitude/30
);


if(index<0){

index=0;

}

if(index>11){

index=11;

}


var zodiac=
CF_ASTRO.zodiac[index];


return{

name:
zodiac.name,

symbol:
zodiac.symbol,

element:
zodiac.element,

modality:
zodiac.modality,

traditionalRuler:
zodiac.traditionalRuler,

modernRuler:
zodiac.modernRuler,

traditional:
zodiac.traditional,

longitude:
longitude,

degree:
longitude-(index*30),

index:
index

};

}


/* ============================================================
   ZODIAK RENDER
============================================================ */

function renderZodiac(dt){

var z=
calcZodiac(dt);

var area=
el("lunarArea");


if(area){

var ruler=
z.traditionalRuler;


if(
z.modernRuler &&
z.modernRuler!==z.traditionalRuler
){

ruler+=
" / "+
z.modernRuler;

}


area.innerHTML=

'<div class="cfAstroData">'+


'<div style="font-size:18px;font-weight:bold;margin-bottom:8px;">'+

z.symbol+
" "+
escapeHtml(z.name)+

'</div>'+


'<div>'+

'<strong>Posisi Matahari:</strong> '+

z.degree.toFixed(2)+
'° '+

escapeHtml(
z.name
)+

'</div>'+


'<div>'+

'<strong>Bujur ekliptika:</strong> '+

z.longitude.toFixed(2)+
'°'+

'</div>'+


'<div>'+

'<strong>Elemen:</strong> '+

escapeHtml(
z.element
)+

'</div>'+


'<div>'+

'<strong>Modalitas:</strong> '+

escapeHtml(
z.modality
)+

'</div>'+


'<div>'+

'<strong>Planet penguasa dalam tradisi astrologi:</strong> '+

escapeHtml(ruler)+

'</div>'+


'<hr/>'+


'<p>'+

escapeHtml(
z.traditional
)+

'</p>'+


'<small>'+

'Tanda Matahari dihitung dari perkiraan bujur ekliptika tampak Matahari pada tengah hari UTC. Pada tanggal ketika Matahari berpindah tanda, jam dan lokasi kelahiran dapat memengaruhi hasil yang digunakan dalam chart astrologi yang lebih rinci. Interpretasi karakter merupakan bagian dari tradisi astrologi, bukan pengukuran ilmiah.'+

'</small>'+


'</div>';

}


setImg(
"lunarSign",
z.symbol,
z.name,
"#103765",
"#1987c5"
);


return z;

}


/* ============================================================
   CHINESE CALENDAR YEAR

   Browser modern:
   Intl.DateTimeFormat
   calendar = chinese

   Ini tidak melakukan request internet.
============================================================ */

function chineseRelatedYear(dt){

try{

var formatter=
new Intl.DateTimeFormat(
"en-u-ca-chinese",
{

year:"numeric",

month:"numeric",

day:"numeric",

timeZone:"UTC"

}
);


var parts=
formatter.formatToParts(dt);


for(
var i=0;
i<parts.length;
i++
){

if(
parts[i].type===
"relatedYear"
){

var year=
parseInt(
parts[i].value,
10
);

if(
Number.isFinite(year)
){

return{

year:
year,

exact:
true,

source:
"Intl Chinese Calendar"

};

}

}

}

}catch(e){}


/*
Fallback.

Tidak ideal untuk tanggal sebelum Lunar New Year,
namun dipakai bila browser sangat lama.
*/

return{

year:
dt.getUTCFullYear(),

exact:
false,

source:
"Gregorian fallback"

};

}


/* ============================================================
   SHIO ENGINE
============================================================ */

function calcShio(dt){

var chinese=
chineseRelatedYear(dt);


/*
Contoh jangkar:
2020 = Tikus
2024 = Naga

Rumus animal:
(year - 4) mod 12
*/

var animalIndex=
mod(
chinese.year-4,
12
);


/*
Heavenly Stem:
(year - 4) mod 10
*/

var stemIndex=
mod(
chinese.year-4,
10
);


var animal=
CF_ASTRO.shio[
animalIndex
];


var stem=
CF_ASTRO.stems[
stemIndex
];


return{

year:
chinese.year,

exact:
chinese.exact,

source:
chinese.source,

animal:
animal,

element:
stem.element,

polarity:
stem.polarity,

stem:
stem.name

};

}


/* ============================================================
   SHIO RENDER
============================================================ */

function renderShio(dt){

var s=
calcShio(dt);

var area=
el("descArea");


if(area){

area.innerHTML=

'<div class="cfAstroData">'+


'<div style="font-size:18px;font-weight:bold;margin-bottom:8px;">'+

s.animal.emoji+
" "+
escapeHtml(
s.animal.name
)+

'</div>'+


'<div>'+

'<strong>Tahun kalender Tionghoa:</strong> '+

s.year+

'</div>'+


'<div>'+

'<strong>Shio:</strong> '+

escapeHtml(
s.animal.name
)+

'</div>'+


'<div>'+

'<strong>Unsur tahun:</strong> '+

escapeHtml(
s.element
)+

'</div>'+


'<div>'+

'<strong>Yin / Yang:</strong> '+

escapeHtml(
s.polarity
)+

'</div>'+


'<div>'+

'<strong>Heavenly Stem:</strong> '+

escapeHtml(
s.stem
)+

'</div>'+


'<hr/>'+


'<p>'+

escapeHtml(
s.animal.traditional
)+

'</p>'+


(
s.exact

?

'<small>'+

'Penentuan tahun shio mengikuti kalender Tionghoa bawaan browser sehingga kelahiran Januari atau Februari tidak otomatis dianggap masuk shio berdasarkan tahun Masehi.'+

'</small>'

:

'<small style="color:#a33;">'+

'Browser ini tidak menyediakan kalender Tionghoa. Fallback menggunakan tahun Masehi sehingga kelahiran sebelum Tahun Baru Imlek dapat menghasilkan shio yang berbeda.'+

'</small>'

)+


'<br/>'+


'<small>'+

'Tafsiran karakter Shio merupakan bagian dari tradisi budaya dan tidak dimaksudkan sebagai prediksi ilmiah kepribadian atau masa depan.'+

'</small>'+


'</div>';

}


setImg(
"zodSign",
s.animal.emoji,
s.animal.name,
"#6a2033",
"#c64c67"
);


return s;

}


/* ============================================================
   BIORHYTHM
============================================================ */

function cycleValue(
daysAlive,
period
){

return Math.sin(
(
2*
Math.PI*
daysAlive
)/
period
);

}


/* ============================================================
   GRAPH GENERATOR
============================================================ */

function makeGraph(
birth,
target,
range,
secondary
){

var canvas=
document.createElement(
"canvas"
);


var W=1000;
var H=360;


canvas.width=W;
canvas.height=H;


var ctx=
canvas.getContext(
"2d"
);


/* BACKGROUND */

var bg=
ctx.createLinearGradient(
0,
0,
W,
H
);


bg.addColorStop(
0,
"#07141f"
);


bg.addColorStop(
1,
"#0d2436"
);


ctx.fillStyle=bg;


ctx.fillRect(
0,
0,
W,
H
);


var padL=58;
var padR=26;
var padT=48;
var padB=55;


var plotW=
W-padL-padR;


var plotH=
H-padT-padB;


var midY=
padT+
plotH/2;


/* TITLE */

ctx.font=
"bold 22px Arial";


ctx.fillStyle=
"#eaf8ff";


ctx.fillText(
secondary
?
"BIORITMIK SEKUNDER"
:
"BIORITMIK UTAMA",
padL,
28
);


ctx.font=
"13px Arial";


ctx.fillStyle=
"#8eb8cc";


ctx.fillText(
secondary
?
"Penguasaan • Gairah • Kebijaksanaan"
:
"Fisik (23) • Emosional (28) • Intelektual (33)",
padL+250,
27
);


/* GRID */

for(
var p=-100;
p<=100;
p+=50
){

var gy=
midY-
(p/100)*
(plotH/2);


ctx.strokeStyle=
p===0
?
"#587789"
:
"rgba(127,188,220,.15)";


ctx.lineWidth=1;


ctx.beginPath();


ctx.moveTo(
padL,
gy
);


ctx.lineTo(
W-padR,
gy
);


ctx.stroke();


ctx.fillStyle=
"#789fb4";


ctx.font=
"12px Arial";


ctx.fillText(
(p>0?"+":"")+
p+
"%",
8,
gy+4
);

}


var total=
range*2+1;


function xFor(i){

return(
padL+
(
i/
(total-1)
)*
plotW
);

}


/* DATE GRID */

for(
var i=0;
i<total;
i++
){

if(
i%
Math.max(
1,
Math.round(total/8)
)!==0
&&
i!==range
){

continue;

}


var x=
xFor(i);


ctx.strokeStyle=
i===range
?
"#f4c64b"
:
"rgba(127,188,220,.10)";


ctx.lineWidth=
i===range
?
2
:
1;


ctx.beginPath();


ctx.moveTo(
x,
padT
);


ctx.lineTo(
x,
H-padB
);


ctx.stroke();


var offset=
i-range;


var dt=
new Date(
target.getTime()+
offset*
DAY_MS
);


var dd=
dt.getUTCDate();


var mm=
dt.getUTCMonth()+1;


var label=
(dd<10?"0":"")+
dd+
"/"+
(mm<10?"0":"")+
mm;


ctx.fillStyle=
i===range
?
"#f4c64b"
:
"#789fb4";


ctx.font=
i===range
?
"bold 12px Arial"
:
"11px Arial";


ctx.fillText(
label,
x-16,
H-25
);

}


/* MAIN */

var main=[

{
name:"Fisik",
period:23,
color:"#31d17c"
},

{
name:"Emosional",
period:28,
color:"#ff5e77"
},

{
name:"Intelektual",
period:33,
color:"#45b9ff"
}

];


/* SECONDARY */

var sec=[

{
name:"Penguasaan",
color:"#f4c84a",

fn:function(d){

return(
cycleValue(d,23)+
cycleValue(d,33)
)/2;

}

},

{
name:"Gairah",
color:"#d87cff",

fn:function(d){

return(
cycleValue(d,23)+
cycleValue(d,28)
)/2;

}

},

{
name:"Kebijaksanaan",
color:"#5be0d0",

fn:function(d){

return(
cycleValue(d,28)+
cycleValue(d,33)
)/2;

}

}

];


var defs=
secondary
?
sec
:
main;


var birthUTC=
Date.UTC(
birth.getUTCFullYear(),
birth.getUTCMonth(),
birth.getUTCDate()
);


defs.forEach(
function(def,index)
{

ctx.strokeStyle=
def.color;


ctx.lineWidth=3;


ctx.beginPath();


for(
var i=0;
i<total;
i++
){

var offset=
i-range;


var dayTime=
Date.UTC(
target.getUTCFullYear(),
target.getUTCMonth(),
target.getUTCDate()+
offset
);


var alive=
Math.floor(
(
dayTime-
birthUTC
)/
DAY_MS
);


var value=
secondary
?
def.fn(alive)
:
cycleValue(
alive,
def.period
);


var x=
xFor(i);


var y=
midY-
value*
(plotH/2)*
0.92;


if(i===0){

ctx.moveTo(
x,
y
);

}else{

ctx.lineTo(
x,
y
);

}

}


ctx.stroke();


var lx=
padL+
index*
220;


ctx.fillStyle=
def.color;


ctx.fillRect(
lx,
H-45,
18,
4
);


ctx.fillStyle=
"#d9edf6";


ctx.font=
"12px Arial";


ctx.fillText(
def.name,
lx+27,
H-39
);

}
);


/* TARGET */

var targetUTC=
Date.UTC(
target.getUTCFullYear(),
target.getUTCMonth(),
target.getUTCDate()
);


var targetDays=
Math.floor(
(
targetUTC-
birthUTC
)/
DAY_MS
);


ctx.fillStyle=
"#f4c64b";


ctx.font=
"bold 12px Arial";


ctx.fillText(
"TARGET",
padL+
plotW/2-
22,
padT-10
);


if(!secondary){

var physical=
Math.round(
cycleValue(
targetDays,
23
)*100
);


var emotional=
Math.round(
cycleValue(
targetDays,
28
)*100
);


var intellectual=
Math.round(
cycleValue(
targetDays,
33
)*100
);


ctx.fillStyle=
"#cfe8f3";


ctx.font=
"13px Arial";


ctx.fillText(
"Fisik "+
physical+
"% • Emosional "+
emotional+
"% • Intelektual "+
intellectual+
"%",
padL,
H-5
);

}else{

ctx.fillStyle=
"#9cbaca";


ctx.font=
"12px Arial";


ctx.fillText(
"Grafik sekunder merupakan kombinasi matematis tiga siklus utama.",
padL,
H-5
);

}


return canvas.toDataURL(
"image/png"
);

}


/* ============================================================
   BIORHYTHM RENDER
============================================================ */

function renderBiorhythm(
birth,
target,
range
){

var graph1=
el("Biorhythm1");


var graph2=
el("Biorhythm2");


if(graph1){

graph1.src=
makeGraph(
birth,
target,
range,
false
);


graph1.alt=
"Grafik Bioritmik Utama";


graph1.style.width=
"100%";


graph1.style.height=
"auto";

}


if(graph2){

graph2.src=
makeGraph(
birth,
target,
range,
true
);


graph2.alt=
"Grafik Bioritmik Sekunder";


graph2.style.width=
"100%";


graph2.style.height=
"auto";

}

}


/* ============================================================
   ERROR
============================================================ */

function showError(msg){

var area=
el("wetonArea")||
el("descArea")||
el("lunarArea");


if(area){

area.innerHTML=

'<div style="'+

'padding:10px;'+

'border:1px solid #e6b9b9;'+

'background:#fff1f1;'+

'color:#6d2020;'+

'border-radius:6px;'+

'">'+

escapeHtml(msg)+

'</div>';

}else{

alert(msg);

}

}


/* ============================================================
   RESULT BOX
============================================================ */

function legacyFitResultBox(){

var result=
el("zoomBio");


if(!result){

return;

}


var vw=
Math.max(
document.documentElement.clientWidth||0,
window.innerWidth||0
);


var vh=
Math.max(
document.documentElement.clientHeight||0,
window.innerHeight||0
);


var width=
Math.min(
760,
Math.max(
280,
vw-24
)
);


result.style.position=
"fixed";


result.style.zIndex=
"99999999";


result.style.width=
width+"px";


result.style.maxWidth=
"calc(100vw - 24px)";


result.style.maxHeight=
"calc(100vh - 24px)";


result.style.left=
"50%";


result.style.top=
"50%";


result.style.transform=
"translate(-50%,-50%)";


result.style.overflow=
"hidden";


var menu=
el("showBioBG");


if(menu){

menu.style.height=
"auto";


menu.style.maxHeight=
Math.max(
240,
vh-110
)+
"px";


menu.style.overflowY=
"auto";


menu.style.overflowX=
"hidden";

}

}


/* ============================================================
   LEGACY FUNCTION
   getBioImage()
============================================================ */

function getBioImage(){

var birth=
readDate(
"b1day",
"b1month",
"b1year"
);


var target=
readDate(
"b2day",
"b2month",
"b2year"
);


if(!birth){

showError(
"Tanggal lahir tidak valid. Gunakan tanggal antara tahun 1901 sampai 2100."
);

return;

}


if(!target){

showError(
"Tanggal target tidak valid."
);

return;

}


if(
target.getTime()<
birth.getTime()
){

showError(
"Tanggal target tidak boleh lebih awal dari tanggal lahir."
);

return;

}


var range=
parseInt(
el("selRange") &&
el("selRange").value,
10
);


if(
[7,14,28]
.indexOf(range)===-1
){

range=14;

}


var input=
el("bioName");


var name=
input
?
input.value.trim()
:
"";


if(
!name ||
name==="Your Name" ||
name==="Nama Anda"
){

name="Pengguna";

}


var myname=
el("myname");


if(myname){

myname.textContent=
name+
" • "+
formatID(birth);

}


/* ====================================
   LOCAL CALCULATIONS
==================================== */

renderWeton(
birth
);


renderZodiac(
birth
);


renderShio(
birth
);


renderBiorhythm(
birth,
target,
range
);


/* ====================================
   OPEN RESULT
==================================== */

var result=
el("zoomBio");


if(result){

legacyFitResultBox();


result.style.display=
"block";


result.setAttribute(
"aria-hidden",
"false"
);

}

}


/* ============================================================
   LEGACY CLOSE
============================================================ */

function closeBox(){

var result=
el("zoomBio");


if(result){

result.style.display=
"none";


result.setAttribute(
"aria-hidden",
"true"
);

}

}


/* ============================================================
   LEGACY ENTER
============================================================ */

function enterBio(event){

event=
event||
window.event;


var key=
event.key||
event.keyCode;


if(
key==="Enter" ||
key===13
){

if(
event.preventDefault
){

event.preventDefault();

}


getBioImage();


return false;

}


return true;

}


/* ============================================================
   LEGACY TELLER
============================================================ */

function chgBgTeller(){

var img=
el("imgBGTeller");


if(!img){

return;

}


var step=
parseInt(
img.getAttribute(
"data-cf-theme"
)||
"0",
10
);


step=
(step+1)%3;


img.setAttribute(
"data-cf-theme",
String(step)
);


var themes=[

[
"✦",
"ASTRO",
"#0c3859",
"#168fc9"
],

[
"☾",
"LUNAR",
"#31255f",
"#754dcc"
],

[
"☀",
"SOLAR",
"#8b4b12",
"#e6a22e"
]

];


img.src=
svgData(
themes[step][0],
themes[step][1],
themes[step][2],
themes[step][3]
);


img.alt=
themes[step][1]+
" Astrology";

}


/* ============================================================
   TODAY
============================================================ */

function setTargetToday(){

var now=
new Date();


var d=
el("b2day");


var m=
el("b2month");


var y=
el("b2year");


if(d){

d.value=
now.getDate();

}


if(m){

m.value=
now.getMonth()+1;

}


if(y){

y.value=
now.getFullYear();

}

}


/* ============================================================
   INIT
============================================================ */

function init(){

setTargetToday();


var teller=
el("imgBGTeller");


if(teller){

teller.src=
svgData(
"✦",
"ASTRO",
"#0c3859",
"#168fc9"
);


teller.alt=
"CodeFlare Astrology";


teller.setAttribute(
"data-cf-theme",
"0"
);

}


/* DEFAULT LOCAL IMAGES */

setImg(
"wetonSign",
"✦",
"WETON",
"#563117",
"#b06a2b"
);


setImg(
"lunarSign",
"♈",
"ZODIAK",
"#103765",
"#1987c5"
);


setImg(
"zodSign",
"🐉",
"SHIO",
"#6a2033",
"#c64c67"
);


window.addEventListener(
"resize",
function(){

var result=
el("zoomBio");


if(
result &&
result.style.display!=="none"
){

legacyFitResultBox();

}

}
);

}


/* ============================================================
   LEGACY GLOBAL API

   JANGAN GANTI NAMA.
============================================================ */

window.getBioImage=
getBioImage;


window.closeBox=
closeBox;


window.enterBio=
enterBio;


window.chgBgTeller=
chgBgTeller;


/* ============================================================
   CODEFLARE PUBLIC API
============================================================ */

window.CodeFlareAstrologi={

version:
CF_ASTRO.version,

calcWeton:
calcWeton,

calcZodiac:
calcZodiac,

calcShio:
calcShio,

solarLongitude:
solarLongitude,

cycleValue:
cycleValue,

renderBiorhythm:
renderBiorhythm,

getBioImage:
getBioImage,

closeBox:
closeBox

};


/* ============================================================
   START
============================================================ */

if(
document.readyState===
"loading"
){

document.addEventListener(
"DOMContentLoaded",
init
);

}else{

init();

}

})();