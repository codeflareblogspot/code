/******************************************/
/** Start Tombol Download Icon Spin      **/
/** Created : (c)2019 CodeFlare Blogspot**/
/** URL : https://codeflare.blogspot.com **/
/******************************************/
if($(".cf-btn").length){setElementBtnLinkType();}
function setElementBtnLinkType(){
var a = document.getElementsByClassName('cf-btn');
var h = ''; var g = '';
for (var i=0;i < a.length;i++){
var b='';var o='';var m='';
try{
var c = document.getElementsByClassName('cf-btn')[i].getAttribute('data-type');
var d = document.getElementsByClassName('cf-btn')[i].getAttribute('data-color');
var l = document.getElementsByClassName('cf-btn')[i].getAttribute('data-text');
m = document.getElementsByClassName('cf-btn')[i].getAttribute('data-effect');
var n = document.getElementsByClassName('cf-btn')[i].getAttribute('data-fcolor');
var fshow = document.getElementsByClassName('cf-btn')[i].getAttribute('data-fshow');
}
catch(err){/*alert(err);*/}
if(c==''||c=='undefined'||c==null){c='link';}else{c=c.toLowerCase();if(c.length > 10){c = c.substring(0,10);}}
if(d==''||d=='undefined'||d==null){d='#007ccd';}
if(l==''||l=='undefined'||l==null){l=c.charAt(0).toUpperCase()+c.slice(1);}else{if(l.length > 10){l = l.substring(0,10);}}
if(m==''||m=='undefined'||m==null){m='';}else{m=m.toLowerCase();}
if(n==''||n=='undefined'||n==null){n=d;}
if(fshow==''||fshow=='undefined'||fshow==null){fshow=0;}
var e = $(a[i]).html();
switch(c) {
case "preview":
b += '<svg width="700px" height="700px" viewBox="0 0 1664 1632" id="cfdownload">';
b += '<path d="M1440 320q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm224-288q0 249-75.5 430.5T1335 823q-81 80-195 176l-20 379q-2 16-16 26l-384 224q-7 4-16 4-12 0-23-9l-64-64q-13-14-8-32l85-276-281-281-276 85q-3 1-9 1-14 0-23-9l-64-64q-17-19-5-39l224-384q10-14 26-16l379-20q96-114 176-195 188-187 358-258t431-71q14 0 24 9.5t10 22.5z" fill="#ffffff"/>';
b += '</svg><span>'+l+'</span>';
break;
case "demo":
b += '<svg width="700px" height="700px" viewBox="0 0 1792 1280" id="cfdownload"><path d="M1664 704q-152-236-381-353 61 104 61 225 0 185-131.5 316.5T896 1024 579.5 892.5 448 576q0-121 61-225-229 117-381 353 133 205 333.5 326.5T896 1152t434.5-121.5T1664 704zM944 320q0-20-14-34t-34-14q-125 0-214.5 89.5T592 576q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5T896 1280t-499.5-139T20 773Q0 738 0 704t20-69q140-229 376.5-368T896 128t499.5 139T1772 635q20 35 20 69z" fill="#ffffff"/>';
b += '</svg><span>'+l+'</span>';
break;
case "download":
b += '<svg width="700px" height="700px" viewBox="0 0 1664 1536" id="cfdownload">';
b += '<path d="M1280 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19L339 621q-31-29-14-70 17-39 59-39h256V64q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z" fill="#ffffff"/><rect x="0" y="0" width="1664" height="1536" fill="rgba(0, 0, 0, 0)" />';
b += '</svg><span>'+l+'</span>';
break;
case "android":
b += '<svg width="700px" height="700px" viewBox="0 0 40 48" version="1.1" id="android">';
b += '<path d="M27.4703377,4.19382178 L29.9390848,0.715960396 C30.0856739,0.509227723 30.0491797,0.237861386 29.8575239,0.109544554 C29.666113,-0.0180594059 29.3915493,0.045029703 29.2460623,0.252 L26.6803239,3.8649505 C24.9894667,3.21873267 23.1118522,2.85861386 21.1328377,2.85861386 C19.1538232,2.85861386 17.2757188,3.21837624 15.5849841,3.8649505 L13.019613,0.251881188 C12.8725341,0.0451485149 12.5984601,-0.0181782178 12.4069268,0.109425743 C12.2153935,0.237386139 12.1790217,0.508871287 12.3256109,0.715841584 L14.7952152,4.19370297 C10.8686594,5.96590099 8.11506159,9.33350495 7.7642029,13.263802 L34.5000029,13.263802 C34.1503688,9.33350495 31.3966486,5.9660198 27.4703377,4.19382178 Z M26.7168181,9.67580198 C25.9002297,9.67580198 25.2381906,9.03338614 25.2381906,8.24067327 C25.2381906,7.44784158 25.9002297,6.80542574 26.7168181,6.80542574 C27.5342638,6.80542574 28.196058,7.44807921 28.196058,8.24067327 C28.196058,9.03326733 27.5340188,9.67580198 26.7168181,9.67580198 Z M15.5475101,9.67580198 C14.7303094,9.67580198 14.0681478,9.03338614 14.0681478,8.24067327 C14.0681478,7.44807921 14.729942,6.80542574 15.5475101,6.80542574 C16.3640986,6.80542574 17.0260152,7.44784158 17.0260152,8.24067327 C17.0261377,9.03326733 16.3640986,9.67580198 15.5475101,9.67580198 Z" id="Shape"></path>';
b += '<path d="M6.04762826,29.6552079 C6.04762826,31.2532277 4.71228333,32.5487525 3.06502319,32.5487525 L3.06502319,32.5487525 C1.41788551,32.5487525 0.0825405797,31.2532277 0.0825405797,29.6552079 L0.0825405797,17.9512871 C0.0825405797,16.3532673 1.41788551,15.0577426 3.06502319,15.0577426 L3.06502319,15.0577426 C4.71228333,15.0577426 6.04762826,16.3532673 6.04762826,17.9512871 L6.04762826,29.6552079 L6.04762826,29.6552079 Z" id="Shape"></path>';
b += '<path d="M7.76371304,15.1472079 L7.76371304,36.2856238 C7.76371304,37.5409901 8.81273768,38.5588515 10.1070572,38.5588515 L12.8787797,38.5588515 L12.8787797,45.0630891 C12.8787797,46.6612277 14.2140022,47.9566337 15.8612623,47.9566337 C17.5085225,47.9566337 18.8438674,46.6612277 18.8438674,45.0630891 L18.8438674,38.5588515 L23.4204609,38.5588515 L23.4204609,45.0630891 C23.4204609,46.6612277 24.7555609,47.9566337 26.4029435,47.9566337 C28.0503261,47.9566337 29.3854261,46.6612277 29.3854261,45.0630891 L29.3854261,38.5588515 L32.1571486,38.5588515 C33.4514681,38.5588515 34.5007377,37.5415842 34.5007377,36.2856238 L34.5007377,15.1472079 L7.76371304,15.1472079 L7.76371304,15.1472079 Z"></path>';
b += '<path d="M36.2167,29.6552079 C36.2167,31.2532277 37.5519225,32.5487525 39.1991826,32.5487525 L39.1991826,32.5487525 C40.8463203,32.5487525 42.1816652,31.2532277 42.1816652,29.6552079 L42.1816652,17.9512871 C42.1816652,16.3532673 40.8463203,15.0577426 39.1991826,15.0577426 L39.1991826,15.0577426 C37.5519225,15.0577426 36.2167,16.3532673 36.2167,17.9512871 L36.2167,29.6552079 L36.2167,29.6552079 Z"></path>';
b += '</svg><span>'+l+'</span>';
break;
case "ios":
b += '<svg width="700px" height="700px" viewBox="0 0 40 48" version="1.1" id="ios">';
b += '<path d="M33.3732057,25.4546901 C33.3112919,19.3876023 38.4333971,16.4779415 38.6622967,16.3333801 C35.7842105,12.2154854 31.3010526,11.6513684 29.7033493,11.586152 C25.8879426,11.2084211 22.2585646,13.7825497 20.3221053,13.7825497 C18.390622,13.7825497 15.4025837,11.6420117 12.2382775,11.6982456 C8.07961722,11.7586901 4.24507177,14.0625965 2.10373206,17.7043275 C-2.21712919,25.0352281 0.99722488,35.8957661 5.20851675,41.8413099 C7.26631579,44.751345 9.72009569,48.0203041 12.9418182,47.9035322 C16.0443062,47.7824561 17.217512,45.9405848 20.9685167,45.9405848 C24.7195215,45.9405848 25.7736842,47.9035322 29.0571292,47.8432749 C32.3955981,47.7826433 34.5108134,44.8772865 36.5543541,41.9580819 C38.917512,38.5818012 39.8905263,35.3130292 39.9478469,35.1451696 C39.8736842,35.1121404 33.4377033,32.7013801 33.3732057,25.4546901 L33.3732057,25.4546901 Z"></path>';
b += '<path d="M27.2041148,7.65015205 C28.9139713,5.6217076 30.068134,2.80748538 29.7533014,0 C27.2902392,0.0980584795 24.3045933,1.60421053 22.537512,3.62807018 C20.9517703,5.4234386 19.5639234,8.28893567 19.9357895,11.0402807 C22.6854545,11.250152 25.4922488,9.6740117 27.2041148,7.65015205 L27.2041148,7.65015205 Z"></path>';
b += '</svg><span>'+l+'</span>';
break;	
case "windows":
b += '<svg height="700px" width="700px" viewBox="0 0 512 499.81" version="1.1" id="windows">';
b += '<path d="M0,67.048l207.238-27.137v197.803H0V67.048z M207.238,459.904L0,432.762V262.096h207.238V459.904z M512,0v237.714H231.619  v-201L512,0z M512,499.81l-280.381-36.714v-201H512V499.81z"></path>';
b += '</svg><span>'+l+'</span>';
break;
case "linux":
b += '<svg height="700px" width="700px" viewBox="0 0 1000 1000" version="1.1" id="linux">';
b += '<path d="M369.954 229.402q-6.138 .558 -8.649 5.859t-4.743 5.301q-2.79 .558 -2.79 -2.79 0 -6.696 10.602 -8.37h5.58zm48.546 7.812q-2.232 .558 -6.417 -3.627t-9.765 -2.511q13.392 -6.138 17.856 1.116 1.674 3.348 -1.674 5.022zm-195.858 238.266q-2.232 -.558 -3.348 1.674t-2.511 6.975 -3.069 7.533 -5.58 7.254q-3.906 5.58 -.558 6.696 2.232 .558 6.975 -3.906t6.975 -10.044q.558 -1.674 1.116 -3.906t1.116 -3.348 .837 -2.511 .279 -2.232v-1.674t-.558 -1.395 -1.674 -1.116zm477.09 200.322q0 -10.044 -30.69 -23.436 2.232 -8.37 4.185 -15.345t2.79 -14.508 1.674 -11.997 .279 -12.555 -.558 -10.881 -1.953 -12.276 -2.232 -11.439 -2.79 -13.95 -3.069 -14.787q-5.58 -26.784 -26.226 -57.474t-40.176 -41.85q13.392 11.16 31.806 46.314 48.546 90.396 30.132 155.124 -6.138 22.32 -27.9 23.436 -17.298 2.232 -21.483 -10.323t-4.464 -46.593 -6.417 -59.706q-5.022 -21.762 -10.881 -38.502t-10.881 -25.389 -8.649 -13.671 -7.254 -8.37 -4.185 -3.906q-7.812 -34.596 -17.298 -57.474t-16.461 -31.248 -13.113 -18.414 -8.37 -22.32q-2.232 -11.718 3.348 -29.853t2.511 -27.621 -24.831 -13.95q-8.37 -1.674 -24.831 -10.044t-19.809 -8.928q-4.464 -.558 -6.138 -14.508t4.464 -28.458 20.088 -15.066q20.646 -1.674 28.458 16.74t2.232 32.364q-6.138 10.602 -1.116 14.787t16.74 .279q7.254 -2.232 7.254 -20.088v-20.646q-2.79 -16.74 -7.533 -27.9t-11.718 -17.019 -13.113 -8.37 -15.066 -4.185q-59.706 4.464 -49.662 74.772 0 8.37 -.558 8.37 -5.022 -5.022 -16.461 -5.859t-18.414 .279 -8.649 -2.79q.558 -31.806 -8.928 -50.22t-25.11 -18.972q-15.066 -.558 -23.157 15.345t-9.207 33.201q-.558 8.37 1.953 20.646t7.254 20.925 8.649 7.533q5.58 -1.674 8.928 -7.812 2.232 -5.022 -3.906 -4.464 -3.906 0 -8.649 -8.091t-5.301 -18.693q-.558 -12.276 5.022 -20.646t18.972 -7.812q9.486 0 15.066 11.718t5.301 21.762 -.837 12.276q-12.276 8.37 -17.298 16.182 -4.464 6.696 -15.345 13.113t-11.439 6.975q-7.254 7.812 -8.649 15.066t4.185 10.044q7.812 4.464 13.95 10.881t8.928 10.602 10.323 7.254 19.809 3.627q26.226 1.116 56.916 -8.37 1.116 -.558 12.834 -3.906t19.251 -5.859 16.461 -7.254 11.718 -9.765q5.022 -7.812 11.16 -4.464 2.79 1.674 3.627 4.743t-1.674 6.696 -9.207 5.301q-11.16 3.348 -31.527 11.997t-25.389 10.881q-24.552 10.602 -39.06 12.834 -13.95 2.79 -44.082 -1.116 -5.58 -1.116 -5.022 1.116t9.486 10.602q13.95 12.834 37.386 12.276 9.486 -.558 20.088 -3.906t20.088 -7.812 18.693 -9.765 16.74 -9.486 13.671 -6.696 9.765 -1.395 4.743 6.138q0 1.116 -.558 2.511t-2.232 2.79 -3.348 2.511 -4.743 2.79 -5.022 2.511 -5.58 2.79 -5.301 2.511q-15.624 7.812 -37.665 24.552t-37.107 23.994 -27.342 .558q-11.718 -6.138 -35.154 -40.734 -12.276 -17.298 -13.95 -12.276 -.558 1.674 -.558 5.58 0 13.95 -8.37 31.527t-16.461 30.969 -11.718 32.364 6.417 35.154q-12.834 3.348 -34.875 50.22t-26.505 78.678q-1.116 10.044 -.837 38.502t-3.069 32.922q-4.464 13.392 -16.182 1.674 -17.856 -17.298 -20.088 -52.452 -1.116 -15.624 2.232 -31.248 2.232 -10.602 -.558 -10.044l-2.232 2.79q-20.088 36.27 5.58 92.628 2.79 6.696 13.95 15.624t13.392 11.16q11.16 12.834 58.032 50.499t51.894 42.687q8.928 8.37 9.765 21.204t-7.812 23.994 -25.389 12.834q4.464 8.37 16.182 24.831t15.624 30.132 3.906 39.339q25.668 -13.392 3.906 -51.336 -2.232 -4.464 -5.859 -8.928t-5.301 -6.696 -1.116 -3.348q1.674 -2.79 7.254 -5.301t11.16 1.395q25.668 29.016 92.628 20.088 74.214 -8.37 98.766 -48.546 12.834 -21.204 18.972 -16.74 6.696 3.348 5.58 29.016 -.558 13.95 -12.834 51.336 -5.022 12.834 -3.348 20.925t13.392 8.649q1.674 -10.602 8.091 -42.966t7.533 -50.22q1.116 -11.718 -3.627 -41.013t-4.185 -54.126 12.834 -39.339q8.37 -10.044 28.458 -10.044 .558 -20.646 19.251 -29.574t40.455 -5.859 33.48 12.555zm-350.424 -461.466q1.674 -9.486 -1.395 -16.74t-6.417 -8.37q-5.022 -1.116 -5.022 3.906 1.116 2.79 2.79 3.348 5.58 0 3.906 8.37 -1.674 11.16 4.464 11.16 1.674 0 1.674 -1.674zm233.802 109.926q-1.116 -4.464 -3.627 -6.417t-7.254 -2.79 -8.091 -3.069q-2.79 -1.674 -5.301 -4.464t-3.906 -4.464 -3.069 -3.627 -2.232 -2.232 -2.232 .837q-7.812 8.928 3.906 24.273t21.762 17.577q5.022 .558 8.091 -4.464t1.953 -11.16zm-99.324 -118.854q0 -6.138 -2.79 -10.881t-6.138 -6.975 -5.022 -1.674q-7.812 .558 -3.906 3.906l2.232 1.116q7.812 2.232 10.044 17.298 0 1.674 4.464 -1.116zm30.132 -130.014q0 -1.116 -1.395 -2.79t-5.022 -3.906 -5.301 -3.348q-8.37 -8.37 -13.392 -8.37 -5.022 .558 -6.417 4.185t-.558 7.254 -.279 6.975q-.558 2.232 -3.348 5.859t-3.348 5.022 1.674 4.743q2.232 1.674 4.464 0t6.138 -5.022 8.37 -5.022q.558 -.558 5.022 -.558t8.37 -1.116 5.022 -3.906zm315.27 748.278q11.16 6.696 17.298 13.671t6.696 13.392 -1.395 12.555 -8.649 12.276 -13.113 10.881 -16.74 10.323 -17.577 9.207 -17.856 8.649 -15.066 7.254q-21.204 10.602 -47.709 31.248t-42.129 35.712q-9.486 8.928 -37.944 10.881t-49.662 -8.091q-10.044 -5.022 -16.461 -13.113t-9.207 -14.229 -12.276 -10.881 -26.226 -5.301q-24.552 -.558 -72.54 -.558 -10.602 0 -31.806 .837t-32.364 1.395q-24.552 .558 -44.361 8.37t-29.853 16.74 -24.273 15.903 -29.853 6.417q-16.182 -.558 -61.938 -17.298t-81.468 -23.994q-10.602 -2.232 -28.458 -5.301t-27.9 -5.022 -22.041 -5.301 -18.693 -8.091 -9.486 -10.881q-5.58 -12.834 3.906 -37.107t10.044 -30.411q.558 -8.928 -2.232 -22.32t-5.58 -23.715 -2.511 -20.367 5.859 -15.066q7.812 -6.696 31.806 -7.812t33.48 -6.696q16.74 -10.044 23.436 -19.53t6.696 -28.458q11.718 40.734 -17.856 59.148 -17.856 11.16 -46.314 8.37 -18.972 -1.674 -23.994 5.58 -7.254 8.37 2.79 31.806 1.116 3.348 4.464 10.044t4.743 10.044 2.511 9.486 .558 12.276q0 8.37 -9.486 27.342t-7.812 26.784q1.674 9.486 20.646 14.508 11.16 3.348 47.151 10.323t55.521 11.439q13.392 3.348 41.292 12.276t46.035 12.834 30.969 2.232q23.994 -3.348 35.991 -15.624t12.834 -26.784 -4.185 -32.643 -10.602 -29.016 -11.16 -20.367q-67.518 -106.02 -94.302 -135.036 -37.944 -41.292 -63.054 -22.32 -6.138 5.022 -8.37 -8.37 -1.674 -8.928 -1.116 -21.204 .558 -16.182 5.58 -29.016t13.392 -26.226 12.276 -23.436q4.464 -11.718 14.787 -40.176t16.461 -43.524 16.74 -34.038 21.762 -30.132q61.38 -79.794 69.192 -108.81 -6.696 -62.496 -8.928 -172.98 -1.116 -50.22 13.392 -84.537t59.148 -58.311q21.762 -11.718 58.032 -11.718 29.574 -.558 59.148 7.533t49.662 23.157q31.806 23.436 51.057 67.797t16.461 82.305q-2.79 53.01 16.74 119.412 18.972 63.054 74.214 121.644 30.69 32.922 55.521 90.954t33.201 106.578q4.464 27.342 2.79 47.151t-6.696 30.969 -11.16 12.276q-5.58 1.116 -13.113 10.602t-15.066 19.809 -22.599 18.693 -34.038 7.812q-10.044 -.558 -17.577 -2.79t-12.555 -7.533 -7.533 -8.649 -6.417 -11.439 -5.022 -10.881q-12.276 -20.646 -22.878 -16.74t-15.624 27.342 3.906 54.126q11.16 39.06 .558 108.81 -5.58 36.27 10.044 56.079t40.734 18.414 47.43 -19.809q32.922 -27.342 49.941 -37.107t57.753 -23.715q29.574 -10.044 42.966 -20.367t10.323 -19.251 -13.95 -15.903 -28.737 -13.113q-18.414 -6.138 -27.621 -26.784t-8.37 -40.455 8.649 -26.505q.558 17.298 4.464 31.527t8.091 22.599 11.439 15.903 11.718 10.602 11.997 7.254 9.207 5.301z"></path>';
b += '</svg><span>'+l+'</span>';
break;
case "setting":
b += '<svg height="700px" width="700px" viewBox="0 0 1920 1792" version="1.1" id="cfdownload">';
b += '<path d="M896 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm768 512q0-52-38-90t-90-38-90 38-38 90q0 53 37.5 90.5t90.5 37.5 90.5-37.5 37.5-90.5zm0-1024q0-52-38-90t-90-38-90 38-38 90q0 53 37.5 90.5T1536 512t90.5-37.5T1664 384zm-384 421v185q0 10-7 19.5t-16 10.5l-155 24q-11 35-32 76 34 48 90 115 7 11 7 20 0 12-7 19-23 30-82.5 89.5T999 1423q-11 0-21-7l-115-90q-37 19-77 31-11 108-23 155-7 24-30 24H547q-11 0-20-7.5t-10-17.5l-23-153q-34-10-75-31l-118 89q-7 7-20 7-11 0-21-8-144-133-144-160 0-9 7-19 10-14 41-53t47-61q-23-44-35-82l-152-24q-10-1-17-9.5T0 987V802q0-10 7-19.5T23 772l155-24q11-35 32-76-34-48-90-115-7-11-7-20 0-12 7-20 22-30 82-89t79-59q11 0 21 7l115 90q34-18 77-32 11-108 23-154 7-24 30-24h186q11 0 20 7.5t10 17.5l23 153q34 10 75 31l118-89q8-7 20-7 11 0 21 8 144 133 144 160 0 8-7 19-12 16-42 54t-45 60q23 48 34 82l152 23q10 2 17 10.5t7 19.5zm640 533v140q0 16-149 31-12 27-30 52 51 113 51 138 0 4-4 7-122 71-124 71-8 0-46-47t-52-68q-20 2-30 2t-30-2q-14 21-52 68t-46 47q-2 0-124-71-4-3-4-7 0-25 51-138-18-25-30-52-149-15-149-31v-140q0-16 149-31 13-29 30-52-51-113-51-138 0-4 4-7 4-2 35-20t59-34 30-16q8 0 46 46.5t52 67.5q20-2 30-2t30 2q51-71 92-112l6-2q4 0 124 70 4 3 4 7 0 25-51 138 17 23 30 52 149 15 149 31zm0-1024v140q0 16-149 31-12 27-30 52 51 113 51 138 0 4-4 7-122 71-124 71-8 0-46-47t-52-68q-20 2-30 2t-30-2q-14 21-52 68t-46 47q-2 0-124-71-4-3-4-7 0-25 51-138-18-25-30-52-149-15-149-31V314q0-16 149-31 13-29 30-52-51-113-51-138 0-4 4-7 4-2 35-20t59-34 30-16q8 0 46 46.5t52 67.5q20-2 30-2t30 2q51-71 92-112l6-2q4 0 124 70 4 3 4 7 0 25-51 138 17 23 30 52 149 15 149 31z" fill="#ffffff"/>';
b += '</svg><span>'+l+'</span>';
break;
default:
b += '<svg width="700px" height="700px" viewBox="0 0 1664 1664" id="cflink">';
b += '<path d="M1456 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zM753 511q0-40-28-68L519 236q-28-28-68-28-39 0-68 27L236 381q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5T543.5 680t-15-19-13-25.5T512 608q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84L100 652q-84-84-84-204t85-203L248 99q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z" fill="#ffffff"/>';
b += '</svg><span>'+l+'</span>';
break;
}
var f='cf-btn'+i;
if(document.getElementById(f)){return;}
if($(a[i]).attr(f).length==false){$(a[i]).attr('id',f);}
$('#'+f).css({'background-color':d,'border-color':d});
if(m=='pulse'){
var $newdiv1 = $('<div id="cf-pulse'+i+'" class="cf-pulse"></div>');
$(a[i]).before($newdiv1);
$(a[i]).remove().clone().appendTo('#cf-pulse'+i);
}
if(m=='glowing'){
var $glowing = $('<div id="cf-glowing'+i+'" class="glowing"></div>');
$(a[i]).before($glowing);
$(a[i]).remove().clone().appendTo('#cf-glowing'+i);
}
if(!n.includes('rgba')&&m=='pulse'){
try{n = hexToRgbA(n);}
catch(err){n = hexToRgbA(colourNameToHex(n));}
}
if(m=='pulse'){
var colRGBA = n;
var regex = /rgba?(\(([\d\s]+,?){3})(,[\d\s.]+)?(?=\))/;
var replace1 = 'rgba$1,0.5';
var replace2 = 'rgba$1,0';
var p1=colRGBA.replace(regex,replace1);
var p2=colRGBA.replace(regex,replace2);
o += '@-webkit-keyframes shadow-pulse'+i+'{';
o += '0%{-webkit-box-shadow: 0 0 0 0px '+p1+';box-shadow: 0 0 0 0px '+p1+';}';
o += '100%{-webkit-box-shadow: 0 0 0 10px '+p2+';box-shadow: 0 0 0 10px '+p2+';}}';
o += '@-moz-keyframes shadow-pulse'+i+'{';
o += '0%{box-shadow: 0 0 0 0px '+p1+';}';
o += '100%{box-shadow: 0 0 0 10px '+p2+';}}';
o += '@-o-keyframes shadow-pulse'+i+'{';
o += '0%{box-shadow: 0 0 0 0px '+p1+';}';
o += '100%{box-shadow: 0 0 0 10px '+p2+';}}';
o += '@keyframes shadow-pulse'+i+'{';
o += '0%{-webkit-box-shadow: 0 0 0 0px '+p1+';box-shadow: 0 0 0 0px '+p1+';}';
o += '100%{-webkit-box-shadow: 0 0 0 10px '+p2+';box-shadow: 0 0 0 10px '+p2+';}}';
}
if (fshow==0&&m=='pulse'){
o += '#cf-pulse'+i+'{';
o += '-webkit-animation: shadow-pulse'+i+' 1s infinite;';
o += '-moz-animation: shadow-pulse'+i+' 1s infinite;';
o += '-o-animation: shadow-pulse'+i+' 1s infinite;';
o += 'animation: shadow-pulse'+i+' 1s infinite;}';
o += '#cf-pulse'+i+':hover{';
o += '-webkit-animation: none;';
o += '-moz-animation: none;';
o += '-o-animation: none;';
o += 'animation: none;}';
}
if (fshow==1&&m=='pulse'){
o += '#cf-pulse'+i+':hover{';
o += '-webkit-animation: shadow-pulse'+i+' 1s infinite;';
o += '-moz-animation: shadow-pulse'+i+' 1s infinite;';
o += '-o-animation: shadow-pulse'+i+' 1s infinite;';
o += 'animation: shadow-pulse'+i+' 1s infinite;}';
o += '#cf-pulse'+i+'{';
o += '-webkit-animation: none;';
o += '-moz-animation: none;';
o += '-o-animation: none;';
o += 'animation: none;}';
}
if (fshow==2&&m=='pulse'){
o += '#cf-pulse'+i+'{';
o += '-webkit-animation: shadow-pulse'+i+' 1s infinite;';
o += '-moz-animation: shadow-pulse'+i+' 1s infinite;';
o += '-o-animation: shadow-pulse'+i+' 1s infinite;';
o += 'animation: shadow-pulse'+i+' 1s infinite;}';
}

if (fshow==0&&m=='glowing'){
o += '#cf-glowing'+i+'.glowing:before{opacity:0;}';
o += '#cf-glowing'+i+'.glowing:hover:before{opacity:1;}';
}
if (fshow==1&&m=='glowing'){
o += '#cf-glowing'+i+'.glowing:hover:before{opacity:0;}';
o += '#cf-glowing'+i+'.glowing:before{opacity:1;}';
}
if (fshow==2&&m=='glowing'){
o += '#cf-glowing'+i+'.glowing:before{opacity:1;}';
}
$(a[i]).html(b);
h += '#cf-btn'+i+'.cf-large:hover,#cf-btn'+i+'.cf-medium:hover,#cf-btn'+i+'.cf-small:hover,#cf-btn'+i+'.cf-mini:hover{color:'+d+';background:#fff !important;}';
if(m=='pulse'||m=='glowing'){g += 'a#cf-btn'+i+'.cf-btn span:after,a#cf-btn'+i+'.cf-btn span:before{background:'+d+' !important;}a#cf-btn'+i+'{margin:0;}'+h+o;}
else{g += 'a#cf-btn'+i+'.cf-btn span:after,a#cf-btn'+i+'.cf-btn span:before{background:'+d+' !important;}a#cf-btn'+i+'{margin:10px 5px;}'+h+o;}
}
$('head').append('<style>'+g+'</style>');
}
function hexToRgbA(hex){
var c;
if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
c= hex.substring(1).split('');
if(c.length== 3){
c= [c[0], c[0], c[1], c[1], c[2], c[2]];
}
c= '0x'+c.join('');
return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
}
throw new Error('Bad Hex');
}
function colourNameToHex(colour){
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};
    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];
    return false;
}
