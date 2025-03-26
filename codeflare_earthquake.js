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
$('<div id="detailGempaHeadTick"></div>').appendTo('body');
