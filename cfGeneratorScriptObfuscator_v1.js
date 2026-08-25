(function(){
function cfGeneratorInit(){
'use strict';
function _z(a){return String.fromCharCode.apply(null,a)}
var tool=document.getElementById('cfObTool'),warning=document.getElementById('cfObExternalWarning');
if(!tool)return;
var PATH=_z([47,50,48,50,54,47,48,56,47,103,101,110,101,114,97,116,111,114,45,106,97,118,97,115,99,114,105,112,116,45,111,98,102,117,115,99,97,116,101,45,101,110,99,114,121,112,116,105,111,110,46,104,116,109,108]);
var host=(location.hostname||'').toLowerCase(),path=location.pathname||'';
var local=/^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(host)||location.protocol==='file:';
var allowed=local||((host===_z([99,111,100,101,102,108,97,114,101,46,110,101,116])||host===_z([119,119,119,46,99,111,100,101,102,108,97,114,101,46,110,101,116]))&&path===PATH);
if(!allowed){tool.style.display='none';if(warning)warning.style.display='flex';return}
function $(id){return document.getElementById(id)}
var E={
input:$('cfObInput'),inputLabel:$('cfObInputLabel'),output:$('cfObOutput'),process:$('cfObProcess'),copy:$('cfObCopy'),copyScript:$('cfObCopyScript'),paste:$('cfObPaste'),clear:$('cfObClear'),
tools:$('cfObCodeTools'),passBox:$('cfObPasswordOption'),passEnable:$('cfObPasswordEnable'),pass:$('cfObPassword'),pass2:$('cfObPasswordConfirm'),
accessBox:$('cfObPasswordAccess'),access:$('cfObAccessPassword'),normalizePanel:$('cfObNormalizePanel'),normalize:$('cfObNormalizeOutput'),normalizeReset:$('cfObNormalizeReset'),normalizeState:$('cfObNormalizeState'),normalizeBeautify:$('cfObNormalizeBeautify'),normalizeFlush:$('cfObNormalizeFlush'),layerSection:$('cfObLayerSection'),layerStatus:$('cfObLayerStatus'),layerCurrent:$('cfObLayerCurrent'),layerDetected:$('cfObLayerDetected'),layerRemaining:$('cfObLayerRemaining'),layerResult:$('cfObLayerResult'),layerList:$('cfObLayerList'),
outTitle:$('cfObOutputTitle'),outCount:$('cfObOutputCount'),message:$('cfObMessage'),status:$('cfObStatus'),progress:$('cfObProgressBar'),
original:$('cfObOriginalSize'),resultSize:$('cfObResultSize'),sizeChange:$('cfObSizeChange'),resultStatus:$('cfObResultStatus'),
techBox:$('cfObOptions'),techState:$('cfObTechState'),domain:$('cfObDomain'),
protection:$('cfObProtectionLevel'),runtime:$('cfObRuntimeImpact'),growth:$('cfObGrowthImpact'),selected:$('cfObSelectedTech')
};
var S={mode:'obfuscate',parserFormat:'beautify',theme:'auto',preset:'balanced',normalizeFinal:false,normalizeFormat:'beautify',layerIndex:0,layerHistory:[]};
var presets={
light:{rename:1,array:1,encode:1,shuffle:0,rotate:0,split:0,numbers:0,objectKeys:0,controlFlow:0,dead:0,debug:0,selfDefend:0,compact:1,debugLog:0,domain:0},
balanced:{rename:1,array:1,encode:1,shuffle:1,rotate:1,split:1,numbers:1,objectKeys:0,controlFlow:0,dead:0,debug:0,selfDefend:0,compact:1,debugLog:0,domain:0},
strong:{rename:1,array:1,encode:1,shuffle:1,rotate:1,split:1,numbers:1,objectKeys:1,controlFlow:1,dead:1,debug:1,selfDefend:1,compact:1,debugLog:0,domain:0}
};
function say(t){E.message.textContent=t;E.status.innerHTML='<i></i> '+t}
function kb(s){return (new Blob([String(s||'')]).size/1024).toFixed(2)+' KB'}
function setProgress(n){E.progress.style.width=Math.max(0,Math.min(100,n))+'%'}
function setOutput(v,title,status){v=String(v||'');E.output.value=v;E.outCount.textContent=v.length.toLocaleString()+' CHAR';if(title)E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> '+title;E.original.textContent=kb(E.input.value);E.resultSize.textContent=kb(v);var a=new Blob([E.input.value]).size||1,b=new Blob([v]).size;E.sizeChange.textContent=((b-a)/a*100).toFixed(1)+'%';E.resultStatus.textContent=status||'READY';E.normalize.disabled=!(S.mode==='deobfuscate'&&v)}
function escHTML(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function unescHTML(s){var ta=document.createElement('textarea');ta.innerHTML=String(s);return ta.value}
function stripComments(s){var out='',i=0,q=null,esc=false,line=false,block=false;while(i<s.length){var c=s[i],n=s[i+1];if(line){if(c==='\n'){line=false;out+=c}i++;continue}if(block){if(c==='*'&&n==='/'){block=false;i+=2}else i++;continue}if(q){out+=c;if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;i++;continue}if(c==='"'||c==="'"||c==='`'){q=c;out+=c;i++;continue}if(c==='/'&&n==='/'){line=true;i+=2;continue}if(c==='/'&&n==='*'){block=true;i+=2;continue}out+=c;i++}return out}
function minify(s){return stripComments(String(s)).replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n[ \t]+/g,'\n').replace(/\n{2,}/g,'\n').replace(/\s*([{};,=:])\s*/g,'$1').trim()}
function beautify(s){s=String(s).replace(/\r/g,'').trim();var out='',ind=0,q=null,esc=false,paren=0;function pad(){return'  '.repeat(Math.max(0,ind))}for(var i=0;i<s.length;i++){var c=s[i];if(q){out+=c;if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;continue}if(c==='"'||c==="'"||c==='`'){q=c;out+=c;continue}if(c==='('||c==='['){paren++;out+=c;continue}if(c===')'||c===']'){paren=Math.max(0,paren-1);out+=c;continue}if(c==='{'){out=out.replace(/[ \t]+$/,'')+' {\n';ind++;out+=pad();continue}if(c==='}'){ind=Math.max(0,ind-1);out=out.replace(/[ \t]+$/,'');if(!out.endsWith('\n'))out+='\n';out+=pad()+'}';if(s[i+1]!==';'&&s[i+1]!==','&&s[i+1]!==')')out+='\n'+pad();continue}if(c===';'&&paren===0){out+=';\n'+pad();continue}if(c==='\n'){if(!out.endsWith('\n'))out+='\n'+pad();continue}out+=c}return out.replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim()}
function bloggerParse(s){var v=S.parserFormat==='minify'?minify(s):beautify(s);v=escHTML(v);if(S.parserFormat==='minify')return v;return v.split('\n').map(function(line){var m=line.match(/^(\s*)/),lead=m?m[1].length:0;return'&nbsp;'.repeat(lead)+line.slice(lead)}).join('<br />\n')}
function bloggerUnparse(s){return beautify(unescHTML(String(s).replace(/<br\s*\/?>/gi,'\n').replace(/&nbsp;/gi,' ')))}
function extractJS(s){s=String(s);var un=unescHTML(s),blocks=[],re=/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,m;while((m=re.exec(un)))blocks.push(m[1]);if(blocks.length)return blocks.join('\n\n');if(/<\/?(?:html|body|style|div|span|p|link|meta)\b/i.test(un))return un.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi,'').replace(/<[^>]+>/g,'\n');return un}
function b64enc(s){var u=new TextEncoder().encode(s),bin='';for(var i=0;i<u.length;i++)bin+=String.fromCharCode(u[i]);return btoa(bin)}
function b64dec(s){var bin=atob(s),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new TextDecoder().decode(u)}
async function sha256(s){if(!crypto||!crypto.subtle)throw new Error('SHA-256 NOT SUPPORTED');var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}
function randomId(){return Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4)}
function techValues(){var o={};tool.querySelectorAll('[data-tech]').forEach(function(x){o[x.dataset.tech]=!!x.checked});o.domain=!!o.domain;o.host=(E.domain.value||'').trim().toLowerCase().replace(/^https?:\/\//,'').replace(/\/.*$/,'');return o}
function updateTechSummary(){var o=techValues(),count=Object.keys(o).filter(function(k){return k!=='host'&&o[k]}).length;var level=S.preset==='custom'?'CUSTOM':S.preset.toUpperCase();E.protection.textContent=level;E.runtime.textContent=(o.controlFlow||o.debug||o.selfDefend)?'MEDIUM':o.dead?'LOW–MEDIUM':'LOW';E.growth.textContent=(o.dead||o.controlFlow)?'+MEDIUM':(o.split||o.rotate)?'+LOW':'LOW';E.selected.textContent=count+' TECH'}
function applyPreset(name){if(!presets[name])return;S.preset=name;var p=presets[name];tool.querySelectorAll('[data-tech]').forEach(function(x){x.checked=!!p[x.dataset.tech]});tool.querySelectorAll('#cfObPreset button').forEach(function(b){b.classList.toggle('active',b.dataset.preset===name)});updateTechSummary()}
function customPreset(){S.preset='custom';tool.querySelectorAll('#cfObPreset button').forEach(function(b){b.classList.toggle('active',b.dataset.preset==='custom')});updateTechSummary()}
function setTechEnabled(on){if(!E.techBox)return;E.techBox.classList.toggle('is-disabled',!on);if(E.techState){E.techState.classList.toggle('disabled',!on);E.techState.innerHTML='<i></i> '+(on?'ACTIVE':'DISABLED')}E.techBox.querySelectorAll('button,input').forEach(function(x){if(x!==E.domain)x.disabled=!on});var d=E.techBox.querySelector('[data-tech="domain"]');E.domain.disabled=!on||!(d&&d.checked)}
function _a1(src,opt,id,chunks,meta){
var arrName=opt.rename?'_'+id:'cfPayload',pName=opt.rename?'_p':'cfEncoded',bName=opt.rename?'_b':'cfBinary',uName=opt.rename?'_u':'cfBytes',sName=opt.rename?'_s':'cfSource',iName=opt.rename?'_i':'cfIndex';
var dead=opt.dead?'var _guard=(17*3)-51,_noise="'+id.slice(0,3)+'";if(_guard!==0&&_noise.length<0){throw new Error(_noise);}':'';
var debug=opt.debug?'var _dt=Date.now();debugger;var _dd=Date.now()-_dt;if(_dd>1800){/* debug delay detected */}':'';
var obj=opt.objectKeys?'var _cfg={["k"]:"v"};if(_cfg["k"]!=="v"){return;}':'';
var selfDef=opt.selfDefend?'var _sig="'+id.slice(0,6)+'";if(_sig.length!==6){return;}':'';
var lock='';
if(opt.domain&&opt.host){
var _dh=b64enc(opt.host),_parts=[];
for(var _di=0;_di<_dh.length;_di+=4)_parts.push(_dh.slice(_di,_di+4));
if(opt.shuffle)_parts.reverse();
var _arr=JSON.stringify(_parts),_rev=opt.shuffle?'_ha.reverse();':'';
lock='var _ha='+_arr+';'+_rev+'var _hd=atob(_ha.join(""));if(location.hostname!==_hd&&!location.hostname.endsWith("."+_hd)){return;}';
}
var undoShuffle=opt.shuffle?arrName+'.reverse();':'',undoRotate='';
if(opt.rotate){undoRotate='var _back='+arrName+'.length-(('+(opt.numbers?'(3+4)':'7')+')%'+arrName+'.length);'+arrName+'='+arrName+'.slice(_back).concat('+arrName+'.slice(0,_back));';}
var flowStart=opt.controlFlow?'var _st=0;while(_st<3){switch(_st){case 0:':'',flowMid1=opt.controlFlow?'_st=1;break;case 1:':'',flowMid2=opt.controlFlow?'_st=2;break;case 2:':'',flowEnd=opt.controlFlow?'_st=3;break;}}':'';
var _marker=opt.debugLog?'/*CFJS5:'+meta+'*/':'';
return _marker+'(function(){'+lock+selfDef+debug+obj+dead+'var '+arrName+'='+JSON.stringify(chunks)+';'+flowStart+undoShuffle+undoRotate+flowMid1+'var '+pName+'='+arrName+'.join("");'+flowMid2+'var '+bName+'=atob('+pName+'),'+uName+'=new Uint8Array('+bName+'.length);for(var '+iName+'=0;'+iName+'<'+bName+'.length;'+iName+'++)'+uName+'['+iName+']='+bName+'.charCodeAt('+iName+');var '+sName+'=new TextDecoder().decode('+uName+');'+flowEnd+'(0,eval)('+sName+');})();'+(opt.debugLog?'':'var _m5x='+JSON.stringify(meta)+';');
}
function _c1(el,msg){if(!el)return;el.classList.add('cfObFieldError');try{el.scrollIntoView({behavior:'smooth',block:'center'})}catch(_e){}setTimeout(function(){try{el.focus()}catch(_e){}},180);if(msg)say(msg)}
function _a9(s){return String(s).replace(/\bconsole\s*\.\s*(?:log|debug|info|trace)\s*\((?:[^()"'`]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\([^()]*\))*\)\s*;?/g,'').replace(/\/\*\s*CF(?:JS|DEBUG|MARKER)[\s\S]*?\*\//gi,'')}
async function _a2(src){
var opt=techValues();
if(opt.domain&&!opt.host){_c1(E.domain,'DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME');throw new Error('DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME')}
var source=opt.debugLog?String(src):_a9(src);source=opt.compact?minify(source):source;
var payload=b64enc(source),step=opt.split?73:Math.max(payload.length,1),chunks=[];
for(var i=0;i<payload.length;i+=step)chunks.push(payload.slice(i,i+step));
if(opt.array===false)chunks=[chunks.join('')];
if(opt.rotate&&chunks.length){var _shift=7%chunks.length;chunks=chunks.slice(_shift).concat(chunks.slice(0,_shift))}
if(opt.shuffle)chunks.reverse();
var protectedOn=E.passEnable.checked,hash='';
if(protectedOn){
if(!E.pass.value){_c1(E.pass,'ISI PASSWORD');throw new Error('ISI PASSWORD')}
if(!E.pass2.value){_c1(E.pass2,'ISI KONFIRMASI PASSWORD');throw new Error('ISI KONFIRMASI PASSWORD')}
if(E.pass.value!==E.pass2.value){_c1(E.pass2,'PASSWORD MISMATCH');throw new Error('PASSWORD MISMATCH')}
hash=await sha256(E.pass.value)
}
var meta=b64enc(JSON.stringify({v:5,p:protectedOn?1:0,h:hash,t:opt}));
return _a1(source,opt,randomId(),chunks,meta)
}
function _a3(s){s=String(s);var mm=s.match(/\/\*CFJS5:([A-Za-z0-9+/=]+)\*\//),hm=s.match(/var\s+_m5x\s*=\s*["']([A-Za-z0-9+/=]+)["']\s*;/),am=s.match(/var\s+(?:_[A-Za-z0-9]+|cfPayload)\s*=\s*(\[[\s\S]*?\]);/);if(!am||(!mm&&!hm))return null;try{return{meta:JSON.parse(b64dec(mm?mm[1]:hm[1])),chunks:JSON.parse(am[1])}}catch(e){return null}}
async function _a4(s){var x=_a3(s);if(!x)return null;if(x.meta.p){E.accessBox.style.display='block';var h=await sha256(E.access.value||'');if(!E.access.value||h!==x.meta.h)throw new Error('PASSWORD REQUIRED / INVALID')}var chunks=x.chunks.slice();if(x.meta.t&&x.meta.t.shuffle)chunks.reverse();if(x.meta.t&&x.meta.t.rotate&&chunks.length){var back=chunks.length-(7%chunks.length);chunks=chunks.slice(back).concat(chunks.slice(0,back))}return b64dec(chunks.join(''))}
function _b4(s){return String(s).replace(/(?:\\x[0-9a-fA-F]{2})+/g,function(g){return g.replace(/\\x([0-9a-fA-F]{2})/g,function(_,h){var n=parseInt(h,16);return n>=32&&n!==127?String.fromCharCode(n):'\\x'+h})}).replace(/(?:\\u[0-9a-fA-F]{4})+/g,function(g){return g.replace(/\\u([0-9a-fA-F]{4})/g,function(_,h){var n=parseInt(h,16);return n>=32?String.fromCharCode(n):'\\u'+h})}).replace(/String\.fromCharCode\((\s*(?:0x[0-9a-f]+|\d+)\s*(?:,\s*(?:0x[0-9a-f]+|\d+)\s*)*)\)/gi,function(_,a){try{return JSON.stringify(a.split(',').map(function(x){return String.fromCharCode(parseInt(x.trim(),0))}).join(''))}catch(e){return _}})}
function _b7(raw){var out='';for(var i=0;i<raw.length;i++){var c=raw[i];if(c!=='\\'){out+=c;continue}var n=raw[++i];if(n===undefined){out+='\\';break}if(n==='x'&&/^[0-9a-fA-F]{2}$/.test(raw.slice(i+1,i+3))){out+=String.fromCharCode(parseInt(raw.slice(i+1,i+3),16));i+=2;continue}if(n==='u'&&/^[0-9a-fA-F]{4}$/.test(raw.slice(i+1,i+5))){out+=String.fromCharCode(parseInt(raw.slice(i+1,i+5),16));i+=4;continue}var map={n:'\n',r:'\r',t:'\t',b:'\b',f:'\f',v:'\v','0':'\0'};out+=map[n]!==undefined?map[n]:n}return out}
function _b8(src,pos){var i=pos;while(/\s/.test(src[i]||''))i++;if(src[i]!=='[')return null;i++;var vals=[];while(i<src.length){while(/[\s,]/.test(src[i]||''))i++;if(src[i]===']')return{vals:vals,end:i+1};var q=src[i];if(q!=='"'&&q!=="'")return null;i++;var raw='',esc=false,closed=false;for(;i<src.length;i++){var c=src[i];if(esc){raw+='\\'+c;esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q){i++;closed=true;break}raw+=c}if(!closed)return null;vals.push(_b7(raw));while(/\s/.test(src[i]||''))i++;if(src[i]===','){i++;continue}if(src[i]===']')return{vals:vals,end:i+1};return null}return null}
function _b2(src){src=String(src);var tables={},ranges=[],re=/(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*/g,m;while((m=re.exec(src))){var parsed=_b8(src,re.lastIndex);if(!parsed)continue;tables[m[1]]=parsed.vals;var tail=src.slice(parsed.end).match(/^\s*;/);ranges.push([m.index,parsed.end+(tail?tail[0].length:0)]);re.lastIndex=parsed.end}Object.keys(tables).forEach(function(name){var vals=tables[name],rx=new RegExp('\\b'+name.replace(/[$]/g,'\\$&')+'\\s*\\[\\s*(\\d+)\\s*\\]','g');src=src.replace(rx,function(all,idx){idx=+idx;return idx<vals.length?JSON.stringify(vals[idx]):all})});for(var i=ranges.length-1;i>=0;i--)src=src.slice(0,ranges[i][0])+src.slice(ranges[i][1]);return src}
function _b9(lit){if(!lit||lit.length<2)return lit;return _b7(lit.slice(1,-1))}
function _b1(src){src=String(src);var re=/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*(?:r|d)\s*\)\s*\{[\s\S]*?\}\s*\(\s*((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))\.split\(\s*((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))\s*\)/;var m=src.match(re);if(!m)return src;var p=_b9(m[1]),a=parseInt(m[2],10),c=parseInt(m[3],10),k=_b9(m[4]).split(_b9(m[5]));function enc(n){return(n<a?'':enc(Math.floor(n/a)))+((n%=a)>35?String.fromCharCode(n+29):n.toString(36))}while(c--){if(k[c])p=p.replace(new RegExp('\\b'+enc(c)+'\\b','g'),k[c])}return p}
function _b5(s){s=String(s);s=s.replace(/\.\s*\[\s*(["'])([A-Za-z_$][\w$]*)\1\s*\]/g,'.$2');s=s.replace(/\[\s*(["'])([A-Za-z_$][\w$]*)\1\s*\]/g,'.$2');s=s.replace(/\b!0\b/g,'true').replace(/\b!1\b/g,'false');s=s.replace(/\bvoid\s+0\b/g,'undefined');return s}
function _b3(s){var map={},c={text:0,num:0,flag:0,array:0,object:0,func:0,element:0,regex:0,date:0,data:0};function next(t){c[t]++;return t+c[t]}function cls(v){v=v.trim();if(/^['"`]/.test(v))return'text';if(/^(true|false)\b/.test(v))return'flag';if(/^-?(?:\d|0x)/i.test(v))return'num';if(/^new\s+Date\b/.test(v))return'date';if(/^\[/.test(v))return'array';if(/^\{/.test(v))return'object';if(/^(?:function\b|\([^)]*\)\s*=>)/.test(v))return'func';if(/^\//.test(v))return'regex';if(/(?:document\.|\$\s*\()/.test(v))return'element';return'data'}var pat='(_0x[a-fA-F0-9]+|__0x[a-fA-F0-9]+|_\\$[A-Za-z0-9]+)';var d=new RegExp('\\b(?:var|let|const)\\s+'+pat+'\\s*=\\s*([^;]+)','g');s.replace(d,function(_,n,v){if(!map[n])map[n]=next(cls(v));return _});var f=new RegExp('\\bfunction\\s+'+pat,'g');s.replace(f,function(_,n){if(!map[n])map[n]=next('func');return _});var any=new RegExp('\\b'+pat+'\\b','g');s.replace(any,function(n){if(!map[n])map[n]=next('data');return n});Object.keys(map).sort(function(a,b){return b.length-a.length}).forEach(function(n){s=s.replace(new RegExp('\\b'+n.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')+'\\b','g'),map[n])});return s}
function _b6(s){return beautify(s).split('\n').map(function(line){return line.replace(/^\s+/,'')}).join('\n')}
function _a5(s){s=String(s);var prev='',passes=0;for(;passes<8&&s!==prev;passes++){prev=s;s=_b2(s);s=_b1(s);s=_b2(s);s=_b4(s);s=_b5(s)}s=_b3(s);s=_b5(s);return S.normalizeFormat==='flush'?_b6(s):beautify(s)}
function _a7(s){
s=String(s||'');var a=[];
if(/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,/i.test(s))a.push('P.A.C.K.E.R / BASE62');
if(/\b(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*\[(?:\s*['"][\s\S]*?['"]\s*,?){3,}\]/.test(s))a.push('STRING ARRAY');
if(/\\x[0-9a-f]{2}/i.test(s))a.push('HEX ESCAPE');
if(/\\u[0-9a-f]{4}/i.test(s))a.push('UNICODE ESCAPE');
if(/String\.fromCharCode\s*\(/.test(s))a.push('FROM CHAR CODE');
if(/\b(?:_0x[a-f0-9]+|__0x[a-f0-9]+|_\$[A-Za-z0-9]+)\b/i.test(s))a.push('MANGLED IDENTIFIER');
if(/\[['"][A-Za-z_$][\w$]*['"]\]/.test(s))a.push('BRACKET PROPERTY');
return a
}
function updateLayerPanel(src,status){
var layers=_a7(src),remaining=layers.length;
E.layerCurrent.textContent=S.layerIndex;
E.layerDetected.textContent=layers.length?layers[0]:'NONE';
E.layerRemaining.textContent=remaining;
E.layerStatus.textContent=status||'ANALYZED';
E.layerResult.textContent=S.normalizeFinal?'FINAL LAYER':(remaining?'LAYER DETECTED':'READY');
if(!S.layerHistory.length){E.layerList.innerHTML='<span>No layer processed yet.</span>';return}
E.layerList.innerHTML=S.layerHistory.map(function(x,i){return '<div class="cfObLayerItem"><b>Layer '+(i+1)+' - '+x.name+'</b><em>'+x.status+'</em></div>'}).join('')
}
function _a8(s){s=String(s||'');return /eval\(function\(p,a,c,k,e,|\\x[0-9a-f]{2}|\\u[0-9a-f]{4}|String\.fromCharCode\s*\(|\b(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*\[(?:\s*['"][\s\S]*?['"]\s*,?){3,}\]|\b(?:_0x[a-f0-9]+|__0x[a-f0-9]+|_\$[A-Za-z0-9]+)\b/i.test(s)}
function setNormalizeFinal(on,msg){S.normalizeFinal=!!on;E.normalizePanel.classList.toggle('is-final',!!on);if(E.normalizeState)E.normalizeState.textContent=msg||(on?'Final layer reached. Tidak ada layer Normalize yang terdeteksi lagi.':'Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.');E.normalize.disabled=!!on||!(S.mode==='deobfuscate'&&E.output.value);E.normalize.innerHTML=on?'<i class="fa fa-check-circle"></i> FINAL LAYER':'<i class="fa fa-magic"></i> NORMALIZE OUTPUT'}
async function _a6(src){src=extractJS(src);var cf=await _a4(src);if(cf!==null)return beautify(cf);var out=_b1(src);out=_b4(out);out=_b2(out);return beautify(out)}
function analyze(){var s=E.input.value||'',len=s.length,lines=s?s.split(/\r?\n/).length:0;$('cfObSize').textContent=kb(s);$('cfObChars').textContent=len.toLocaleString();$('cfObLines').textContent=lines.toLocaleString();$('cfObFunctions').textContent=((s.match(/\bfunction\b|=>/g)||[]).length).toLocaleString();$('cfObVariables').textContent=((s.match(/\b(?:var|let|const)\b/g)||[]).length).toLocaleString();$('cfObStringCount').textContent=((s.match(/(['"`])(?:\\.|(?!\1)[\s\S])*?\1/g)||[]).length).toLocaleString();var pat='NORMAL / UNKNOWN',eng='GENERIC / UNKNOWN',comp='LOW',rec=95;if(_a3(s)){pat='CODEFLARE PROTECTED';eng='CODEFLARE JS5';comp='MEDIUM';rec=99}else if(/eval\(function\(p,a,c,k,e,/.test(s)){pat='P.A.C.K.E.R / BASE62';eng='PACKER COMPATIBLE';comp='HIGH';rec=82}else if(/\\x[0-9a-f]{2}|\\u[0-9a-f]{4}/i.test(s)){pat='HEX / UNICODE ESCAPE';comp='MEDIUM';rec=90}else if(/_0x[a-f0-9]+/i.test(s)){pat='MANGLED IDENTIFIER';comp='MEDIUM';rec=78}$('cfObPattern').textContent=pat;$('cfObSourceEngine').textContent=eng;$('cfObComplexity').textContent=comp;$('cfObRecommended').textContent=S.mode==='obfuscate'?'OBFUSCATE':S.mode==='deobfuscate'?'DEOBFUSCATE - NORMALIZE':'CODE TOOLS';$('cfObRecoveryValue').textContent=rec+'%';$('cfObRecoveryBar').style.width=rec+'%';$('cfObAnalyzeState').textContent=s?'ANALYZED':'WAITING INPUT'}
function mode(m){S.mode=m;if(E.inputLabel){E.inputLabel.innerHTML=m==='tools'?'<i class="fa fa-terminal"></i> CODE INPUT HTML | CSS | JS | TEXT':m==='deobfuscate'?'<i class="fa fa-terminal"></i> JAVASCRIPT INPUT - DEOBFUSCATE':'<i class="fa fa-terminal"></i> JAVASCRIPT INPUT'}tool.querySelectorAll('.cfObModeBtn').forEach(function(b){b.classList.toggle('active',b.dataset.mode===m)});E.tools.style.display=m==='tools'?'block':'none';E.process.style.display=m==='tools'?'none':'block';E.passBox.style.display=m==='obfuscate'?'block':'none';E.accessBox.style.display='none';E.layerSection.style.display=m==='deobfuscate'?'block':'none';E.normalizePanel.style.display=m==='deobfuscate'?'flex':'none';E.normalize.disabled=S.normalizeFinal||!(m==='deobfuscate'&&E.output.value);if(m!=='deobfuscate')E.normalizePanel.classList.remove('is-final');setTechEnabled(m==='obfuscate');if(m==='obfuscate'){E.process.innerHTML='<i class="fa fa-cogs"></i> OBFUSCATE CODE';E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> ENCRYPTION CODE OUTPUT'}else if(m==='deobfuscate'){E.process.innerHTML='<i class="fa fa-unlock-alt"></i> DEOBFUSCATE CODE';E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> DEOBFUSCATION CODE OUTPUT'}else E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> CODE TOOLS OUTPUT';analyze();say('READY')}
tool.querySelectorAll('.cfObModeBtn').forEach(function(b){b.addEventListener('click',function(){mode(b.dataset.mode)})});
tool.querySelectorAll('#cfObPreset button').forEach(function(b){b.addEventListener('click',function(){if(S.mode!=='obfuscate')return;if(b.dataset.preset==='custom')customPreset();else applyPreset(b.dataset.preset)})});
tool.querySelectorAll('[data-tech]').forEach(function(x){x.addEventListener('change',function(){if(S.mode!=='obfuscate')return;customPreset();if(x.dataset.tech==='domain'){E.domain.disabled=!x.checked;if(!x.checked)E.domain.classList.remove('cfObFieldError')}updateTechSummary()})});
E.domain.addEventListener('input',function(){if(this.value.trim())this.classList.remove('cfObFieldError');updateTechSummary()});
E.input.addEventListener('input',analyze);
E.passEnable.addEventListener('change',function(){E.passBox.classList.toggle('active',this.checked);if(!this.checked){E.pass.classList.remove('cfObFieldError');E.pass2.classList.remove('cfObFieldError')}});
[E.pass,E.pass2].forEach(function(el){el.addEventListener('input',function(){if(this.value.trim())this.classList.remove('cfObFieldError')})});
tool.querySelectorAll('.cfObPassEye').forEach(function(b){b.addEventListener('click',function(){var i=b.parentNode.querySelector('input'),show=i.type==='password';i.type=show?'text':'password';b.querySelector('i').className=show?'fa fa-eye-slash':'fa fa-eye'})});
E.paste.addEventListener('click',async function(){try{E.input.value=await navigator.clipboard.readText();analyze();say('PASTED')}catch(e){E.input.focus();say('USE CTRL+V')}});
E.clear.addEventListener('click',function(){E.input.value='';S.normalizeFinal=false;S.layerIndex=0;S.layerHistory=[];E.normalizePanel.classList.remove('is-final');E.normalizeState.textContent='Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.';E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';setOutput('','','READY');E.normalize.disabled=true;updateLayerPanel('','WAITING');analyze();say('CLEARED')});
E.copy.addEventListener('click',async function(){if(!E.output.value)return;try{await navigator.clipboard.writeText(E.output.value);say('COPIED')}catch(e){E.output.select();document.execCommand('copy');say('COPIED')}});
E.copyScript.addEventListener('click',async function(){if(!E.output.value)return;var code=E.output.value.replace(/^\s*<script\b[^>]*>/i,'').replace(/<\/script\s*>\s*$/i,'').trim(),wrapped='<script>\n'+code+'\n<\/script>';try{await navigator.clipboard.writeText(wrapped);say('SCRIPT TAG COPIED')}catch(e){var ta=document.createElement('textarea');ta.value=wrapped;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);say('SCRIPT TAG COPIED')}});
E.process.addEventListener('click',async function(){var src=E.input.value;if(!src.trim()){say('INPUT EMPTY');return}setProgress(20);E.process.disabled=true;try{var out;if(S.mode==='obfuscate'){out=await _a2(src);setOutput(out,'ENCRYPTION CODE OUTPUT','SUCCESS')}else{out=await _a6(src);S.layerIndex=0;S.layerHistory=[];setNormalizeFinal(false,'Deobfuscation selesai - NORMALIZE OUTPUT untuk membuka dan merapikan layer berikutnya.');setOutput(out,'DEOBFUSCATION CODE OUTPUT','SUCCESS');E.normalize.disabled=!out;updateLayerPanel(out,'ANALYZED')}setProgress(100);say('SUCCESS')}catch(e){say(e.message||'PROCESS ERROR');E.resultStatus.textContent='ERROR'}finally{E.process.disabled=false;setTimeout(function(){setProgress(0)},500)}});
function reformatNormalizedOutput(){if(S.mode!=='deobfuscate'||!E.output.value)return;var current=E.output.value,formatted=S.normalizeFormat==='flush'?_b6(current):beautify(current);setOutput(formatted,'HUMAN READABLE CODE OUTPUT',S.normalizeFinal?'FINAL LAYER':'NORMALIZED');if(S.normalizeFinal)E.resultStatus.textContent='FINAL LAYER'}
E.normalizeBeautify.addEventListener('change',function(){if(this.checked){E.normalizeFlush.checked=false;S.normalizeFormat='beautify';reformatNormalizedOutput()}else if(!E.normalizeFlush.checked){this.checked=true;S.normalizeFormat='beautify'}});
E.normalizeFlush.addEventListener('change',function(){if(this.checked){E.normalizeBeautify.checked=false;S.normalizeFormat='flush';reformatNormalizedOutput()}else if(!E.normalizeBeautify.checked){this.checked=true;S.normalizeFormat='flush'}});
E.normalize.addEventListener('click',function(){if(S.mode!=='deobfuscate'||!E.output.value)return;if(S.normalizeFinal){say('FINAL LAYER REACHED');return}var before=E.output.value,beforeLayers=_a7(before),out=_a5(before),changed=out.trim()!==before.trim();S.layerIndex++;S.layerHistory.push({name:beforeLayers.length?beforeLayers[0]:'NORMALIZE / BEAUTIFY',status:changed?'RESOLVED':'NO CHANGE'});setOutput(out,'HUMAN READABLE CODE OUTPUT','NORMALIZED');var remain=_a8(out);updateLayerPanel(out,remain?'NEXT LAYER':'FINAL CHECK');if(!remain||!changed){setNormalizeFinal(true,'FINAL LAYER REACHED - Hasil sudah berada pada layer terakhir yang dapat dinormalisasi otomatis.');updateLayerPanel(out,'FINAL LAYER');E.resultStatus.textContent='FINAL LAYER';say('FINAL LAYER REACHED')}else{setNormalizeFinal(false,'Layer lain masih terdeteksi. Tekan NORMALIZE OUTPUT untuk melanjutkan.');E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE NEXT LAYER';say('NEXT LAYER DETECTED')}});
E.normalizeReset.addEventListener('click',function(){S.normalizeFinal=false;S.normalizeFormat='beautify';S.layerIndex=0;S.layerHistory=[];E.normalizeBeautify.checked=true;E.normalizeFlush.checked=false;E.input.value='';setOutput('','','READY');E.access.value='';E.accessBox.style.display='none';E.normalizePanel.classList.remove('is-final');E.normalizeState.textContent='Reset selesai. Paste kode baru lalu jalankan DEOBFUSCATE.';E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';E.normalize.disabled=true;updateLayerPanel('','WAITING');analyze();E.input.focus();say('READY FOR NEW CODE')});
tool.querySelectorAll('.cfObToolCard').forEach(function(b){b.addEventListener('click',function(){var src=E.input.value;if(!src.trim()){say('INPUT EMPTY');return}var a=b.dataset.action,r='';if(a==='beautify')r=beautify(src);if(a==='minify')r=minify(src);if(a==='bloggerParse')r=bloggerParse(src);if(a==='bloggerUnparse')r=bloggerUnparse(src);setOutput(r,a==='beautify'?'BEAUTIFIED CODE OUTPUT':a==='minify'?'MINIFIED CODE OUTPUT':a==='bloggerParse'?'BLOGGER PARSED OUTPUT':'BLOGGER UNPARSED OUTPUT','SUCCESS');say('SUCCESS')})});
tool.querySelectorAll('.cfObParserToggle button').forEach(function(b){b.addEventListener('click',function(){tool.querySelectorAll('.cfObParserToggle button').forEach(function(x){x.classList.remove('active')});b.classList.add('active');S.parserFormat=b.dataset.format||'beautify'})});
var themeBtns=tool.querySelectorAll('.cfObThemeBtn');
function theme(t){S.theme=t;tool.dataset.theme=t;themeBtns.forEach(function(b){b.classList.toggle('active',b.dataset.theme===t)});try{localStorage.setItem('cfObTheme',t)}catch(e){}}
themeBtns.forEach(function(b){b.addEventListener('click',function(){theme(b.dataset.theme)})});
try{theme(localStorage.getItem('cfObTheme')||'auto')}catch(e){theme('auto')}
applyPreset('balanced');mode('obfuscate');analyze();
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',cfGeneratorInit,{once:true})}
else{cfGeneratorInit()}
})();
