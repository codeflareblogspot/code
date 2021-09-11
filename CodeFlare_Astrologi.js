/*Initial Value*/
var bioDay = new Date();
document.getElementById("b1day").value = bioDay.getDate();
document.getElementById("b1month").value = bioDay.getMonth()+1;
document.getElementById("b1year").value = bioDay.getFullYear()-30;
document.getElementById("b2day").value = bioDay.getDate();
document.getElementById("b2month").value = bioDay.getMonth()+1;
document.getElementById("b2year").value = bioDay.getFullYear();
var lunarType,lunarTypeNum;
var strKabisat="";
var strKabisat2="";
enableBoxBio();
if($(window).innerWidth() < 400){document.getElementById("Biorhythm").style.width = "100%";}

function enterBio(e){
if (typeof e == 'undefined' && window.event) { e = window.event;}
if (e.keyCode == 13){document.getElementById('showBio').click();}
}

/*Document Width*/
function getDocHeight(){
var D = document;
return Math.max(
D.body.scrollHeight, D.documentElement.scrollHeight,
D.body.offsetHeight, D.documentElement.offsetHeight,
D.body.clientHeight, D.documentElement.clientHeight
);
}
/*Document Height*/
function getDocWidth(){
var D = document;
return Math.max(
D.body.scrollWidth, D.documentElement.scrollWidth,
D.body.offsetWidth, D.documentElement.offsetWidth,
D.body.clientWidth, D.documentElement.clientWidth
);
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
/*Lunar Result*/
function getLunar(){
if(document.getElementById("b1day").value>21 && document.getElementById("b1day").value<32){
if(document.getElementById("b1month").value==12){lunarType="Capricorn";}
if(document.getElementById("b1month").value==1){lunarType="Aquarius";}
if(document.getElementById("b1month").value==2){lunarType="Pisces";}
if(document.getElementById("b1month").value==3){lunarType="Aries";}
if(document.getElementById("b1month").value==4){lunarType="Taurus";}
if(document.getElementById("b1month").value==5){lunarType="Gemini";}
if(document.getElementById("b1month").value==6){lunarType="Cancer";}
if(document.getElementById("b1month").value==7){lunarType="Leo";}
if(document.getElementById("b1month").value==8){lunarType="Virgo";}
if(document.getElementById("b1month").value==9){lunarType="Libra";}
if(document.getElementById("b1month").value==10){lunarType="Scorpio";}
if(document.getElementById("b1month").value==11){lunarType="Sagittarius";}
}
if(document.getElementById("b1day").value>0 && document.getElementById("b1day").value<22){
if(document.getElementById("b1month").value==1){lunarType="Capricorn";}
if(document.getElementById("b1month").value==2){lunarType="Aquarius";}
if(document.getElementById("b1month").value==3){lunarType="Pisces";}
if(document.getElementById("b1month").value==4){lunarType="Aries";}
if(document.getElementById("b1month").value==5){lunarType="Taurus";}
if(document.getElementById("b1month").value==6){lunarType="Gemini";}
if(document.getElementById("b1month").value==7){lunarType="Cancer";}
if(document.getElementById("b1month").value==8){lunarType="Leo";}
if(document.getElementById("b1month").value==9){lunarType="Virgo";}
if(document.getElementById("b1month").value==10){lunarType="Libra";}
if(document.getElementById("b1month").value==11){lunarType="Scorpio";}
if(document.getElementById("b1month").value==12){lunarType="Sagittarius";}
}
/*Get Lunar Image Type URL*/
var lunarImg="";
if(lunarType=="Capricorn"){lunarTypeNum=0;lunarImg="https://2.bp.blogspot.com/-cYB97SQYq6M/Vka6S-HDbQI/AAAAAAAAAWk/7Fkw8swx3Ys/s1600/Doll%2BZodiac%2BCapricorn.gif"}
if(lunarType=="Aquarius"){lunarTypeNum=1;lunarImg="https://4.bp.blogspot.com/-7k1AuyH1Jdc/Vka6SKNqqpI/AAAAAAAAAWg/wEdg8VKXrXM/s1600/Doll%2BZodiac%2B%2BAquarius.gif"}
if(lunarType=="Pisces"){lunarTypeNum=2;lunarImg="https://2.bp.blogspot.com/-eK7u8sM2iyM/Vka6TyfRyzI/AAAAAAAAAXU/BxC8z7Hc3ic/s1600/Doll%2BZodiac%2BPisces.gif"}
if(lunarType=="Aries"){lunarTypeNum=3;lunarImg="https://1.bp.blogspot.com/-gf9RqE9bUuQ/Vka6SVa3bRI/AAAAAAAAAWc/sgCpRY_C4-8/s1600/Doll%2BZodiac%2BAries.gif"}
if(lunarType=="Taurus"){lunarTypeNum=4;lunarImg="https://4.bp.blogspot.com/-WlQIsamt1cE/Vka6Uq7ek0I/AAAAAAAAAXY/0-tYQMwyShw/s1600/Doll%2BZodiac%2BTaurus.gif"}
if(lunarType=="Gemini"){lunarTypeNum=5;lunarImg="https://1.bp.blogspot.com/-FKC1LSWo7iI/Vka6S-Jn6-I/AAAAAAAAAWo/zj8ixp9wQ6Y/s1600/Doll%2BZodiac%2BGemini.gif"}
if(lunarType=="Cancer"){lunarTypeNum=6;lunarImg="https://3.bp.blogspot.com/-KrO0y0rc0Ng/Vka6SCk-eiI/AAAAAAAAAWY/IPsns0yISVw/s1600/Doll%2BZodiac%2BCancer.gif"}
if(lunarType=="Leo"){lunarTypeNum=7;lunarImg="https://4.bp.blogspot.com/-EEc1BgqgWhY/Vka6TNfIASI/AAAAAAAAAWs/csFvMUciHxc/s1600/Doll%2BZodiac%2BLeo.gif"}
if(lunarType=="Virgo"){lunarTypeNum=8;lunarImg="https://3.bp.blogspot.com/-lS-UAuattUA/Vka6U8zystI/AAAAAAAAAXg/Nx-LDiJN-GE/s1600/Doll%2BZodiac%2BVirgo.gif"}
if(lunarType=="Libra"){lunarTypeNum=9;lunarImg="https://2.bp.blogspot.com/--5tEDVTC0os/Vka6TZpYK2I/AAAAAAAAAW4/E3Wg36pDTtY/s1600/Doll%2BZodiac%2BLibra.gif"}
if(lunarType=="Scorpio"){lunarTypeNum=10;lunarImg="https://1.bp.blogspot.com/-GnBHufemxOk/Vka6UJFEE_I/AAAAAAAAAXM/UMEgQLLmiO0/s1600/Doll%2BZodiac%2BScorpio.gif"}
if(lunarType=="Sagittarius"){lunarTypeNum=11;lunarImg="https://1.bp.blogspot.com/-fLLE-UiX9iU/Vka6T2sQg-I/AAAAAAAAAXI/Eips-CmM1x8/s1600/Doll%2BZodiac%2BSagittarius.gif"}
document.getElementById("lunarSign").src=lunarImg;
/*Lunar Reading*/

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
/*Bioritmik Reading*/
function capital_letter(str){
str = str.split(" ");
for (var i = 0, x = str.length; i < x; i++) {
str[i] = str[i][0].toUpperCase() + str[i].substr(1);
}
return str.join(" ");
}

function getBioImage(){
strName=capital_letter(document.getElementById("bioName").value);
strDate=document.getElementById("b1day").value;
strMonth=document.getElementById("b1month").value;
strYear=document.getElementById("b1year").value;
strDate2=document.getElementById("b2day").value;
strMonth2=document.getElementById("b2month").value;
strYear2=document.getElementById("b2year").value;

if (strDate == "" || strDate == 0 || strDate > 31 || strDate < 0){
alert("Input tanggal salah !");
document.getElementById("b1day").focus();
document.getElementById("b1day").select();
return;}
if (strDate2 == "" || strDate2 == 0 || strDate2 > 31 || strDate2 < 0){
alert("Input biorhythm tanggal salah !");
document.getElementById("b2day").focus();
document.getElementById("b2day").select();
return;}

if (strYear == "" || strYear < 1000 || strYear > 9999){
alert("Input tahun salah !");
document.getElementById("b1year").focus();
document.getElementById("b1year").select();
return;}
if (strYear2 == "" || strYear2 < 1000 || strYear2 > 9999){
alert("Input biorhythm tahun salah !");
document.getElementById("b2year").focus();
document.getElementById("b2year").select();
return;}

if(strDate == 31){
if(strMonth==2||strMonth==4||strMonth==6||strMonth==9||strMonth==11){
alert("Input tanggal salah !");
document.getElementById("b1day").focus();
document.getElementById("b1day").select();
return;}
}
if(strDate2 == 31){
if(strMonth2==2||strMonth2==4||strMonth2==6||strMonth2==9||strMonth2==11){
alert("Input biorhythm tanggal salah !");
document.getElementById("b2day").focus();
document.getElementById("b2day").select();
return;}
}

var tahun1 = strYear;
if(tahun1 % 4 == 0){
if(tahun1 % 100 == 0){
if(tahun1 % 400 == 0){strKabisat = " [Leap Year]";}else{strKabisat = "";}
}else{strKabisat = " [Leap Year]";}}else{strKabisat = "";}

if(strMonth==2 && strDate>28){
if(strDate==29){
var tahun = strYear;
if(tahun % 4 == 0){
if(tahun % 100 == 0){
if(tahun % 400 == 0)
{strKabisat = " [Leap Year]";}
else{
alert("Input tanggal salah ! bukan tahun kabisat");
document.getElementById("b1day").focus();
document.getElementById("b1day").select();
return;
}}else{strKabisat = " [Leap Year]";}
}else{
alert("Input tanggal salah ! bukan tahun kabisat");
document.getElementById("b1day").focus();
document.getElementById("b1day").select();
return;}}
if(strDate>29){
alert("Input tanggal salah !");
document.getElementById("b1day").focus();
document.getElementById("b1day").select();
return;}}

if(strMonth2==2 && strDate2>28){
if(strDate2==29){
var tahun2 = strYear2;
if(tahun2 % 4 == 0){
if(tahun2 % 100 == 0){
if(tahun2 % 400 == 0)
{strKabisat2 = " [Leap Year]";}
else{
alert("Input biorhythm tanggal salah ! bukan tahun kabisat");
document.getElementById("b2day").focus();
document.getElementById("b2day").select();
return;
}}else{strKabisat2 = " [Leap Year]";}
}else{
alert("Input biorhythm tanggal salah ! bukan tahun kabisat");
document.getElementById("b2day").focus();
document.getElementById("b2day").select();
return;}}
if(strDate2>29){
alert("Input biorhythm tanggal salah !");
document.getElementById("b2day").focus();
document.getElementById("b2day").select();
return;}}

if (document.getElementById("bioName").value=="Your Name" || document.getElementById("bioName").value==""){
alert("Please input your name...");
document.getElementById("bioName").focus();
document.getElementById("bioName").select();
return;}
else{

if (document.getElementById("showBio").value=="Show Biorhythm"){
document.getElementById("showBio").value="Close";
if($(window).innerWidth() < 900 || $(window).innerHeight() < 500){
if (document.all && document.querySelector && !document.addEventListener){
document.getElementById("zoomBio").style.width = $(window).innerWidth()-(getScrollbarWidth());
document.getElementById("showBioBG").style.height = $(window).innerHeight()-getScrollbarWidth()-30;}
else{
document.getElementById("zoomBio").style.width = $(window).innerWidth()-17+"px";
document.getElementById("showBioBG").style.height = $(window).innerHeight()-50+"px";
}
document.getElementById("zoomBio").style.left = "2px";
document.getElementById("zoomBio").style.top = "2px";
}else{
document.getElementById("zoomBio").style.width = "800px";
document.getElementById("showBioBG").style.height = "500px";
var bWidth1=$(window).innerWidth()-getScrollbarWidth();
var bWidth2=$("#zoomBio").innerWidth()-getScrollbarWidth();
var bHeight1=$(window).innerHeight()-getScrollbarWidth();
var bHeight2=$("#zoomBio").innerHeight()-getScrollbarWidth();
document.getElementById("zoomBio").style.left = ((bWidth1-bWidth2)/2)+"px";
document.getElementById("zoomBio").style.top = ((bHeight1-bHeight2)/2)+"px";
}
/*document.getElementById("zoomBio").style.display="block";*/
var dobday=document.getElementById("b1day").value;
var dobmon=document.getElementById("b1month").value;
var dobyear=document.getElementById("b1year").value;
var tarday=document.getElementById("b2day").value;
var tarmon=document.getElementById("b2month").value;
var taryear=document.getElementById("b2year").value;
var rangeBio=document.getElementById("selRange").value;
var bname=document.getElementById("bioName").value;
document.getElementById("myname").innerHTML="<b>ASTROLOGY reading for "+bname.replace(/^[a-z]/, function(m){ return m.toUpperCase() })+"</b>";
document.getElementById("Biorhythm1").src="https://www.facade.com/biorhythm/biogif.fac?2+"+rangeBio+"+"+tarday+"+"+tarmon+"+"+taryear+"+"+dobday+"+"+dobmon+"+"+dobyear+"+0+0+0";
document.getElementById("Biorhythm2").src="https://www.facade.com/biorhythm/biogif.fac?4+"+rangeBio+"+"+tarday+"+"+tarmon+"+"+taryear+"+"+dobday+"+"+dobmon+"+"+dobyear+"+0+0+0";
if(document.getElementById("b1year").value<1900){
alert('Maaf, tidak ada info untuk tanggal ini, karena sebelum 1900, menurut kalender Cina. Tahun baru Cina dimulai pada 31 Januari di Tahun 1900.');
document.getElementById("b1year").focus();
document.getElementById("showBio").value="Show Biorhythm";
document.getElementById("b1year").select();
return;
}
if(document.getElementById("b2year").value<1900){
alert('Maaf, tidak ada info untuk tanggal ini, karena sebelum 1900, menurut kalender Cina. Tahun baru Cina dimulai pada 31 Januari di Tahun 1900.');
document.getElementById("b2year").focus();
document.getElementById("showBio").value="Show Biorhythm";
document.getElementById("b2year").select();
return;
}
readDataPrimbon();
getLunar();
showZodiac();
getBioCalendar();
disableBoxBio();
$("#zoomBio").slideDown("slow");
}else{closeBox();}
}
}
function closeBox(){
$("#zoomBio").slideUp("slow");
document.getElementById("showBio").value="Show Biorhythm";
/*document.getElementById("zoomBio").style.display="none";*/
enableBoxBio();
}
function disableBoxBio(){
document.getElementById("bioName").disabled = true;
document.getElementById("b1day").disabled = true;
document.getElementById("b1month").disabled = true;
document.getElementById("b1year").disabled = true;
document.getElementById("b2day").disabled = true;
document.getElementById("b2month").disabled = true;
document.getElementById("b2year").disabled = true;
document.getElementById("selRange").disabled = true;
}
function enableBoxBio(){
document.getElementById("bioName").disabled = false;
document.getElementById("b1day").disabled = false;
document.getElementById("b1month").disabled = false;
document.getElementById("b1year").disabled = false;
document.getElementById("b2day").disabled = false;
document.getElementById("b2month").disabled = false;
document.getElementById("b2year").disabled = false;
document.getElementById("selRange").disabled = false;
}

function resizeZoomBio(){
if($(window).innerWidth() < 900 || $(window).innerHeight() < 500){
if (document.all && document.querySelector && !document.addEventListener){
document.getElementById("zoomBio").style.width = $(window).innerWidth()-(getScrollbarWidth());
document.getElementById("showBioBG").style.height = $(window).innerHeight()-getScrollbarWidth()-30;}
else{
document.getElementById("zoomBio").style.width = $(window).innerWidth()-17+"px";
document.getElementById("showBioBG").style.height = $(window).innerHeight()-50+"px";
}
document.getElementById("zoomBio").style.left = "2px";
document.getElementById("zoomBio").style.top = "2px";
}else{
document.getElementById("zoomBio").style.width = "800px";
document.getElementById("showBioBG").style.height = "500px";
var bWidth1=$(window).innerWidth()-getScrollbarWidth();
var bWidth2=$("#zoomBio").innerWidth()-getScrollbarWidth();
var bHeight1=$(window).innerHeight()-getScrollbarWidth();
var bHeight2=$("#zoomBio").innerHeight()-getScrollbarWidth();
document.getElementById("zoomBio").style.left = ((bWidth1-bWidth2)/2)+"px";
document.getElementById("zoomBio").style.top = ((bHeight1-bHeight2)/2)+"px";
}
}

if (document.all && document.querySelector && !document.addEventListener){
document.body.onresize = function () {
resizeZoomBio();
}
}
else{
window.addEventListener("resize", function(event){
resizeZoomBio();
});
}
/*Zodiac Reading*/
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
"2.05","1.24","2.12","2.01","1.22","2.09","1.29","2.18","2.07","1.26", /*2000->**** */
"2.14","2.03","1.23","2.10","1.31","2.19","2.08","1.28","2.16","2.05", /* 10-19 */
"1.25","2.12","2.01","1.22","2.10","1.29","2.17","2.06","1.26","2.13"  /* 20-29 */
);

var zodiac = new Array(
new Array("Tikus", "Tikus adalah hewan pertama dalam siklus zodiak Cina. Biasanya dianggap agresif, ambisius, mencurigakan, haus kekuasaan, jujur, murah hati, cepat marah dan cenderung menghabiskan waktu dengan bebas. Mereka yang lahir di bawah tanda Tikus imajinatif, menawan, dan benar-benar murah hati kepada orang yang mereka cintai. Namun, mereka memiliki kecenderungan untuk menjadi pemarah dan terlalu kritis. Mereka biasanya cocok untuk pekerjaan penjualan atau pekerjaan sebagai penulis, kritikus, atau humas. Tikus akan rukun dengan Naga dan Monyet, namun harus menghindari Kuda.", "https://4.bp.blogspot.com/-qKfCGYPvQNM/XVzFpHvu5WI/AAAAAAAABUg/Enlovy495IgchE2kZKktzL7M0URlsK8LwCLcBGAs/s80/tikus.gif"),
new Array("Lembu", "Lembu adalah simbol individu yang kuat dengan kepribadian keras kepala dan keras kepala. Mereka yang lahir di bawah tanda adalah pemimpin alami yang biasanya berhasil ketika diberi kesempatan dan juga akan membuat orang tua yang luar biasa. Mereka jujur, menginspirasi, santai dan konservatif. Lembu akan berhasil sebagai ahli bedah, umum, atau penata rambut yang terampil. Sapi bergaul dengan Ular dan Ayam Jantan tetapi tidak dengan domba.", "https://3.bp.blogspot.com/-T_VCcbuV7ek/XVzFoHrKecI/AAAAAAAABUQ/7kTNs6eOgwk7GO38fcv3lZNAIhAODdUeACLcBGAs/s80/lembu.gif"),
new Array("Macan", "Sebagai hewan yang bertarung, mereka yang lahir di bawah tanda harimau sensitif, agresif, tidak dapat diprediksi, menawan, emosional, berani, dan mampu mencintai dengan hebat. Seringkali mempertaruhkan diri mereka sendiri, mereka memiliki kehidupan yang riang. Harimau biasanya akan menonjol sebagai bos, penjelajah, pengemudi mobil balap, atau matador. Pernikahan yang bahagia bisa terjadi dengan Kuda atau Anjing tetapi tidak pernah dengan Monyet.", "https://3.bp.blogspot.com/-zrC_VogD47g/XVzFoYjIGAI/AAAAAAAABUU/FiVRp_YBQmsSlFctmGBFg1H7LJ05hwDLgCLcBGAs/s80/macan.gif"),
new Array("Kelinci", "Mereka yang lahir di bawah tanda ini penuh kasih sayang, berbakat, wajib, selalu menyenangkan, menghargai keamanan dan ketenangan. Mereka memiliki kecenderungan untuk menjadi terlalu sentimental dan dangkal dan untuk menghindari konflik dan keterlibatan emosional. Berhati-hati dan konservatif, mereka biasanya tidak mengambil risiko dan sukses dalam bisnis. Mereka juga akan menjadi pengacara, diplomat, atau aktor yang baik. Mitra hidup terbaik mereka adalah Domba atau Babi, bukan Ayam Jantan.", "https://1.bp.blogspot.com/-EUFGYr-btdo/XVzFnc0TcbI/AAAAAAAABUM/YI0C-H_2IiQPNgcPCXj-2D5hy4gVCj8wQCLcBGAs/s80/kelinci.gif"),
new Array("Naga", "Mereka yang lahir di bawah tanda dianggap cerdas, berbakat, suka memerintah, keras, norak, dan tidak setia, tetapi juga populer dan sukses, penuh vitalitas dan antusiasme. Mereka biasanya terlihat keras kepala di luar, tetapi lembut di dalam. Mereka dilahirkan untuk menjadi seniman, pendeta, politisi, atau pemimpin. Seekor naga akan kompatibel dengan monyet atau tikus. Namun, seekor anjing tidak akan menjadi pilihan yang baik.", "https://1.bp.blogspot.com/-CcIsmS5TvU0/XVzFozcZTYI/AAAAAAAABUc/vHwSkr69uvIvbNufvuAJ_3m5gxpYEdRbwCLcBGAs/s80/naga.gif"),
new Array("Ular", "Mereka yang lahir di bawah tanda ini biasanya dianggap pintar, bersemangat, tekun, romantis, intens, kaya akan kebijaksanaan dan pesona, tetapi sia-sia. Wanita yang lahir di bawah Ular seringkali cantik. Ular akan sangat dibimbing oleh intuisi mereka. Mereka tentu saja akan memenangkan banyak uang, tetapi harus menghindari penundaan dan sikap pelit terhadap uang. Ular akan paling puas sebagai guru, filsuf, penulis, psikiater, atau peramal. Pernikahan dengan Ayam jantan atau Lembu bukan Babi akan menjadi yang terbaik.", "https://4.bp.blogspot.com/-8YzKMLMPe9w/XVzFpuaxuwI/AAAAAAAABUk/a455iNnNTjYz0kAeXDxUFeGmTi5s1c1pQCLcBGAs/s80/ular.gif"),
new Array("Kuda", "Mereka pekerja keras, cerdas dan ramah, ceria dan populer, tetapi tidak sabar. Biasanya mereka menganggap diri mereka lebih unggul dari orang lain. Mereka memiliki sifat mementingkan diri yang kuat dan kecerdikan yang tajam dan harus menjaga agar tidak egois. Petualang, ilmuwan, penyair, atau politisi akan menjadi pekerjaan yang cocok untuk mereka. Kuda rukun dengan Macan dan Anjing, bukan Tikus.", "https://2.bp.blogspot.com/-QFOdlzEA_Xs/XVzFncviv6I/AAAAAAAABUI/btH6Rd2-bdI9F1DmgdsKSUXOPfv73tvOwCLcBGAs/s80/kuda.gif"),
new Array("Domba", "Tanda itu menunjukkan seseorang yang kreatif, artistik, bersemangat, elegan, ramah, jujur, menawan tetapi pesimistis, pemalu, tidak teratur, dan rentan. Terlalu tergantung pada kenyamanan material, mereka mudah mengeluh dan tidak merespon dengan baik terhadap tekanan, tetapi akan menemukan solusi alami mereka sendiri untuk masalah ketika diberi ruang. Pekerjaan terbaik untuk seorang Domba adalah seorang aktor atau tukang kebun. Mereka kompatibel dengan Kelinci atau Babi dalam pernikahan, tetapi tidak dengan lembu.", "https://1.bp.blogspot.com/-sZvfmZWuMoU/XVzFnWVTqYI/AAAAAAAABUE/Hy-G5lQiU_Qo2QTeFn-P0j4uWz8T19IiwCLcBGAs/s80/domba.gif"),
new Array("Monyet", "Monyet cerdas, inventif, pintar, menghibur tetapi juga berbahaya dan mudah putus asa. Karena sifat dan kepribadian magnetis mereka yang luar biasa, mereka selalu disukai dan berteman dekat. Namun, mereka tidak bisa dipercaya. Mereka harus menjaga agar tidak menjadi oportunis dan tidak mempercayai orang lain. Tanda menunjukkan keberhasilan dalam bidang apa pun yang mereka coba. Pertandingan terbaik adalah Naga atau Tikus sedangkan yang terburuk adalah Harimau.", "https://4.bp.blogspot.com/-e_sExACzkLE/XVzFonuw5DI/AAAAAAAABUY/TMn2tuWEuCYD5D2kO39sQiLBBMI-btQ6wCLcBGAs/s80/monyet.gif"),
new Array("Ayam Jantan", "Ayam jantan berani, pekerja keras, cerdik, sombong, ceroboh, egois, dan eksentrik. Mereka haus akan pengetahuan, mengabdikan diri untuk bekerja dan pasti terlibat dalam pengambilan keputusan. Mereka terampil dalam apa yang mereka lakukan dan memperhatikan detail. Namun, mereka cenderung terlihat sombong kepada orang lain. Ayam jantan akan senang sebagai pemilik restoran, humas, tentara atau pelancong dunia. Tanda itu menjanjikan harmoni dengan Ular dan Sapi dan masalah dengan Kelinci.", "https://4.bp.blogspot.com/-MHfK0H-LkWY/XVzFmuYtvQI/AAAAAAAABUA/BtImP2f3vxg36ES8IgxtnfaMwxMypq5QwCLcBGAs/s80/ayam.gif"),
new Array("Anjing", "Mereka yang lahir di bawah tanda ini jujur, pendiam, cerdas, murah hati, keras kepala, setia dan setia kepada mereka yang mereka cintai. Mereka adalah pendengar introvert, berdedikasi tetapi juga sinis dan cenderung membiarkan kecemasan eksternal mereka mendapatkan yang terbaik dari mereka. Kekhawatiran terus-menerus, lidah yang tajam, dan kecenderungan untuk menjadi pencari kesalahan akan selalu mengganggu mereka. Namun, mereka dilahirkan untuk menjadi sukses. Anjing akan menjadi pebisnis, aktivis, guru, atau agen rahasia yang luar biasa. Harimau dan Kuda dianggap sebagai pertandingan terbaik, dan Naga harus ditangani dengan hati-hati.", "https://1.bp.blogspot.com/-XjTnynx5NPs/XVzFmV5r1PI/AAAAAAAABT4/PyM4857OP8kM1z16f7NG1AyIWfGSyfX4QCLcBGAs/s80/anjing.gif"),
new Array("Babi", "Babi itu jujur, dapat diandalkan, tulus, toleran, pemalu, penuh kasih sayang, baik hati, impulsif, dan pemarah. Mereka adalah sahabat yang hebat, intelektual dengan kebutuhan yang sangat kuat untuk menetapkan tujuan yang sulit dan melaksanakannya. Selain itu mereka sangat naif. Rasa haus mereka yang tak terpadamkan akan pengetahuan akan memudahkan kesuksesan mereka sedangkan pencarian mereka akan kenyamanan materi akan menggagalkannya. Babi juga akan mengorbankan hidup mereka untuk tujuan yang baik. Babi akan berhasil dalam urusan keuangan, atau sebagai penghibur, atau mungkin seorang pengacara. Babi harus mengetahui Babi lain dan kompatibel dengan Domba dan Kelinci.", "https://2.bp.blogspot.com/-zrPvmpJjEZA/XVzFms-Uj-I/AAAAAAAABT8/E844SoECOP0gQI1qYi_uGPM30D3z8fiYACLcBGAs/s80/babi.gif")
);

function showZodiac(){
var y_select = document.getElementById("b1year");
var m_select = document.getElementById("b1month");
var d_select = document.getElementById("b1day");
var descArea = document.getElementById("descArea");
var cYear;/* the same year as gregorian, except that if date<chinesenewyear than tis the previous */
var anYear;/* the assigned year number (1-12) */
var edgeMonth,edgeDay;

if( (y_select.value!="")&&(m_select.value!="")&&(d_select.value!="") )
{
edgeMonth=parseInt(cNYstartDate[y_select.value-1900].substring(0,cNYstartDate[y_select.value-1900].indexOf(".")));
if( parseInt(m_select.value) < edgeMonth )
{
cYear=y_select.value-1;
} else
{
if(parseInt(m_select.value) == edgeMonth )
{
edgeDay=parseFloat(cNYstartDate[y_select.value-1900].substring(
parseInt(cNYstartDate[y_select.value-1900].indexOf("."))+1,cNYstartDate[y_select.value-1900].length));
if( parseInt(d_select.value)<edgeDay )
{
cYear=y_select.value-1;
} else { cYear=y_select.value; }
} else
{ cYear=y_select.value; }
}
if(y_select.value<1900)
{
descArea.innerHTML="Maaf, tidak ada info untuk tanggal ini, karena sebelum 1900, menurut kalender Cina. Tahun baru Cina dimulai pada 31 Januari di Tahun 1900.";
} else
{
anYear=(cYear-4)%12;
descArea.innerHTML="<b><u>"+zodiac[anYear][0]+"</u></b><br>"+zodiac[anYear][1];
document.getElementById('zodSign').src = zodiac[anYear][2];
}
}
}
/*Primbon Javanese Reading*/
function readDataPrimbon(){
var pDateAry=new Array();
var pMonthAry=new Array();
var pYearAry=new Array();
var neptuAry=new Array();
var pDate1,pDate2,pDate3,pMonth1,pMonth2,pMonth3,pYear1,pYear2,pYear3,pYear4,pYear5;
var neptu1,neptu2,neptu3,neptu4,neptu5;

for (i = 0; i < strDate.length; i++)
{
pDateAry[i]=strDate[i];
}
pDate1 = pDateAry[0];
if (strDate.length > 1){pDate2=pDateAry[1];}
else{pDate2=0}
pDate3=parseInt(pDate1)+parseInt(pDate2);

for (i = 0; i < strMonth.length; i++)
{
pMonthAry[i]=strMonth[i];
}
pMonth1 = pMonthAry[0];
if (strMonth.length > 1){pMonth2=pMonthAry[1];}
else{pMonth2=0}
pMonth3=parseInt(pMonth1)+parseInt(pMonth2);

for (i = 0; i < strYear.length; i++)
{
pYearAry[i]=strYear[i];
}
pYear1 = pYearAry[0];
pYear2 = pYearAry[1];
pYear3 = pYearAry[2];
pYear4 = pYearAry[3];
pYear5=parseInt(pYear1)+parseInt(pYear2)+parseInt(pYear3)+parseInt(pYear4);

neptu1=parseInt(pDate3)+parseInt(pMonth3)+parseInt(pYear5);
neptu1=neptu1.toString();

for (i = 0; i < neptu1.length; i++)
{
neptuAry[i]=neptu1[i];
}

neptu2 = neptuAry[0];
if (neptuAry.length > 1){neptu3=neptuAry[1];}
else{neptu3=0;}

neptu4=parseInt(neptu2)+parseInt(neptu3);

if (neptu4 > 9) {
neptu4=neptu4.toString();

for (i = 0; i < neptu4.length; i++)
{
neptuAry[i]=neptu4[i];
}

neptu2 = neptuAry[0];
if (neptuAry.length > 1){neptu3=neptuAry[1];}
else{neptu3=0;}

neptu5=parseInt(neptu2)+parseInt(neptu3);

neptu4=neptu5;
}

var strNeptu = new Array();
strNeptu[0]="Inilah potensi keberuntungan Anda, yang dihitung berdasarkan numerologi Jawa sejak tanggal lahir:";
strNeptu[1]="Keberuntungan selalu menyinari hari-hari Anda ketika Anda tidak berharap atau berharap. Biasanya tepat saat Anda membutuhkannya. Namun, Anda tidak pernah terlalu bergantung padanya. Inilah sebabnya mengapa keberuntungan selalu bersamamu ...";
strNeptu[2]="Anda cenderung berpikir semua orang lebih beruntung daripada Anda, tetapi ... jika Anda mendapatkan berkah dan dukungan dari orang lain, hampir tidak ada yang tidak dapat Anda lakukan.";
strNeptu[3]="Anda mungkin makmur di semua bidang kehidupan Anda, jika Anda ingin bertahan cukup lama di satu bidang dan mencoba menyelesaikannya. Ini adalah satu-satunya cara untuk mendapatkan peluang paling menguntungkan Anda.";
strNeptu[4]="Anda percaya, setiap orang memiliki kekayaannya sendiri, tetapi Anda adalah orang pertama yang menyadari bahwa keberuntungan akan datang kepada Anda. Keberuntungan juga bisa terjadi dalam bentuk hubungan cinta, terutama dalam hubungan cinta yang begitu.";
strNeptu[5]="Keberuntungan pintu untuk cinta sejati dan karier yang baik akan terbuka untuk Anda jika Anda mengurangi dan berhenti berusaha terlalu keras untuk menyenangkan semua teman Anda.";
strNeptu[6]="Anda mungkin tidak merasa beruntung dalam hubungan cinta, tetapi Anda cukup beruntung dikelilingi oleh orang-orang yang mencintai Anda.";
strNeptu[7]="Keberuntungan memainkan peran dalam keajaiban kecil yang Anda alami. Terutama dalam hal cinta dan keuangan. Anda akan menemukan waktu untuk menindaklanjuti rapat.";
strNeptu[8]="Hanya jika Anda membuat keputusan dengan hati dan otak, keberuntungan akan datang kepada Anda dalam bentuk karier dan uang.";
strNeptu[9]="Lady Luck selalu ramah kepada Anda, memberi Anda kekuatan untuk menarik hampir semua orang yang Anda inginkan dalam hidup. Anda beruntung untuk seorang teman yang dekat dengan Anda.";
var pN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
var pScL = (((new Date(strYear+','+strMonth+','+strDate).getTime() - new Date(100, 0, 1).getTime()) / (24 * 60 * 60 * 1000)) % 5);
var nameOfDay = new Date(strYear+','+strMonth+','+strDate);
var weekday = new Array(7);
weekday[0]=  "Minggu";
weekday[1] = "Senin";
weekday[2] = "Selasa";
weekday[3] = "Rabu";
weekday[4] = "Kamis";
weekday[5] = "Jumat";
weekday[6] = "Sabtu";
var nameForDay = weekday[nameOfDay.getDay()];
if(strKabisat == " [Leap Year]"){
document.getElementById("wetonArea").innerHTML="Name : "+strName+"<br>"+"Date of Birth : "+nameForDay+" ("+pN[Math.round(pScL)]+"), "+strDate+" - "+strMonth+" - "+strYear + strKabisat +"<br>"+"Neptu : "+neptu4+"<br><br>"+strNeptu[0]+"<br><br>"+strNeptu[neptu4];
}else{
document.getElementById("wetonArea").innerHTML="Name : "+strName+"<br>"+"Date of Birth : "+nameForDay+" ("+pN[Math.round(pScL)]+"), "+strDate+" - "+strMonth+" - "+strYear+"<br>"+"Neptu : "+neptu4+"<br><br>"+strNeptu[0]+"<br><br>"+strNeptu[neptu4];
}
}
/*Bio Calendar from Calenderlabs*/
function getBioCalendar(){
document.getElementById("BioCalendar").src="https://www.calendarlabs.com/print-astrology-calendar.php?y="+strYear2+"&m="+strMonth2+"&sign="+lunarType.toLowerCase();
}
/*Other Function*/
var img1_on = "https://1.bp.blogspot.com/-aic4BPy0Y1A/XVvo1WgmsII/AAAAAAAABTQ/W_5Py-QYG7o4u7x9ammh7RTv9xTlecyrwCLcBGAs/s1600/fortune%2Bteller.gif";
var img2_on = "https://3.bp.blogspot.com/-OTw3HU07Zvo/XVpP3PLOn5I/AAAAAAAABP8/FRBtK05u0kclCWWoqR8A0fp3HUZtQcC3wCLcBGAs/s1600/sexy_fortune_teller_crystal_ball_image.jpg";
$('#imgBGTeller').on({'click': function() {
var src = ($(this).attr('src') === img1_on)
? img2_on
: img1_on;
$("#imgBGTeller").fadeOut( "slow", function() {
$(this).attr('src', '');
$(this).attr('src', src);
});
$("#imgBGTeller").slideDown( "slow", function() {
if($(this).attr('src')==img2_on){
$('#bgImageTeller').removeClass("bgImageTeller1");
$('#bgImageTeller').addClass("bgImageTeller2");
$('#imgBGTeller').css({"width":"100%","height":"auto","border-radius":"4px"});
}
else{
$('#bgImageTeller').removeClass("bgImageTeller2");
$('#bgImageTeller').addClass("bgImageTeller1");
$('#imgBGTeller').css({"width":"auto","height":"100px","border-radius":"0"});
}
});
}
});