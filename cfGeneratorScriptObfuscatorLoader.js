/* CodeFlare JS Lab - Split Loader */
(function(w,d){
'use strict';

var BASE='https://codeflareblogspot.github.io/code/';
var CSS='cfGeneratorScriptObfuscator.css';
var JS=[
  'cfObfuscatorEngine.js',
  'cfDeobfuscatorEngine.js',
  'cfCodeToolsEngine.js',
  'cfGeneratorScriptObfuscatorMain.js'
];

function loadCSS(){
  if(d.querySelector('link[data-cf-js-lab-css]'))return;
  var l=d.createElement('link');
  l.rel='stylesheet';
  l.href=BASE+CSS;
  l.setAttribute('data-cf-js-lab-css','1');
  (d.head||d.documentElement).appendChild(l);
}

function loadJS(src){
  return new Promise(function(resolve,reject){
    var s=d.createElement('script');
    s.src=BASE+src;
    s.defer=true;
    s.onload=function(){resolve(src)};
    s.onerror=function(){reject(new Error('LOAD FAILED - '+src))};
    (d.head||d.documentElement).appendChild(s);
  });
}

async function boot(){
  try{
    loadCSS();
    for(var i=0;i<JS.length;i++)await loadJS(JS[i]);

    if(!w.CFObfuscatorEngine)throw new Error('OBFUSCATOR ENGINE NOT READY');
    if(!w.CFDeobfuscatorEngine)throw new Error('DEOBFUSCATOR ENGINE NOT READY');
    if(!w.CFCodeToolsEngine)throw new Error('CODE TOOLS ENGINE NOT READY');
  }catch(err){
    console.error('[CODEFLARE JS LAB] '+String(err&&err.message||err));
  }
}

if(d.readyState==='loading'){
  d.addEventListener('DOMContentLoaded',boot,{once:true});
}else{
  boot();
}
})(window,document);
