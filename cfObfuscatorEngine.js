/* CodeFlare Obfuscator Engine - v3.12 modular */
(function(g){
'use strict';

function b64enc(s){
var u=new TextEncoder().encode(String(s||'')),bin='';
for(var i=0;i<u.length;i++)bin+=String.fromCharCode(u[i]);
return btoa(bin)
}
async function sha256(s){
if(!g.crypto||!g.crypto.subtle)throw new Error('SHA-256 NOT SUPPORTED');
var b=await g.crypto.subtle.digest('SHA-256',new TextEncoder().encode(String(s||'')));
return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')
}
function randomId(){return Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4)}
function stripComments(s){
var out='',i=0,q=null,esc=false,line=false,block=false;
s=String(s||'');
while(i<s.length){
var c=s[i],n=s[i+1];
if(line){if(c==='\n'){line=false;out+=c}i++;continue}
if(block){if(c==='*'&&n==='/'){block=false;i+=2}else i++;continue}
if(q){out+=c;if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;i++;continue}
if(c==='"'||c==="'"||c==='`'){q=c;out+=c;i++;continue}
if(c==='/'&&n==='/'){line=true;i+=2;continue}
if(c==='/'&&n==='*'){block=true;i+=2;continue}
out+=c;i++
}
return out
}
function minify(s){
return stripComments(String(s||'')).replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n[ \t]+/g,'\n').replace(/\n{2,}/g,'\n').replace(/\s*([{};,=:])\s*/g,'$1').trim()
}
function protectScriptEnds(s){return String(s||'').replace(/<\/script/gi,'<\\/script')}
function stripDebug(s){
return String(s||'')
.replace(/\bconsole\s*\.\s*(?:log|debug|info|trace)\s*\((?:[^()"'`]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\([^()]*\))*\)\s*;?/g,'')
.replace(/\/\*\s*CF(?:JS|DEBUG|MARKER)[\s\S]*?\*\//gi,'')
}

function buildWrapper(opt,id,chunks,meta){
var arr=opt.rename?'_'+id:'cfPayload';
var p=opt.rename?'_p':'cfEncoded',b=opt.rename?'_b':'cfBinary',u=opt.rename?'_u':'cfBytes',s=opt.rename?'_s':'cfSource',i=opt.rename?'_i':'cfIndex';
var dead=opt.dead?'var _g=(17*3)-51,_n="'+id.slice(0,3)+'";if(_g!==0&&_n.length<0){throw new Error(_n);}':'';
var dbg=opt.debug?'var _dt=Date.now();debugger;var _dd=Date.now()-_dt;if(_dd>1800){}':'';
var obj=opt.objectKeys?'var _cfg={["k"]:"v"};if(_cfg["k"]!=="v"){return;}':'';
var self=opt.selfDefend?'var _sig="'+id.slice(0,6)+'";if(_sig.length!==6){return;}':'';
var lock='';
if(opt.domain&&opt.host){
var dh=b64enc(opt.host),parts=[];
for(var x=0;x<dh.length;x+=4)parts.push(dh.slice(x,x+4));
if(opt.shuffle)parts.reverse();
lock='var _ha='+JSON.stringify(parts)+';'+(opt.shuffle?'_ha.reverse();':'')+'var _hd=atob(_ha.join(""));if(location.hostname!==_hd&&!location.hostname.endsWith("."+_hd)){return;}'
}
var undoShuffle=opt.shuffle?arr+'.reverse();':'',undoRotate='';
if(opt.rotate)undoRotate='var _back='+arr+'.length-(('+(opt.numbers?'(3+4)':'7')+')%'+arr+'.length);'+arr+'='+arr+'.slice(_back).concat('+arr+'.slice(0,_back));';
var fs=opt.controlFlow?'var _st=0;while(_st<3){switch(_st){case 0:':'';
var f1=opt.controlFlow?'_st=1;break;case 1:':'';
var f2=opt.controlFlow?'_st=2;break;case 2:':'';
var fe=opt.controlFlow?'_st=3;break;}}':'';
var marker=opt.debugLog?'/*CFJS5:'+meta+'*/':'';
return marker+'(function(){'+lock+self+dbg+obj+dead+'var '+arr+'='+JSON.stringify(chunks)+';'+fs+undoShuffle+undoRotate+f1+'var '+p+'='+arr+'.join("");'+f2+'var '+b+'=atob('+p+'),'+u+'=new Uint8Array('+b+'.length);for(var '+i+'=0;'+i+'<'+b+'.length;'+i+'++)'+u+'['+i+']='+b+'.charCodeAt('+i+');var '+s+'=new TextDecoder().decode('+u+');'+fe+'(0,eval)('+s+');})();'+(opt.debugLog?'':'var _q7n='+JSON.stringify(meta)+';')
}

async function obfuscate(src,options){
options=options||{};
var opt=Object.assign({},options.tech||{});
opt.host=String(opt.host||'').trim().toLowerCase().replace(/^https?:\/\//,'').replace(/\/.*$/,'');
if(opt.domain&&!opt.host)throw new Error('DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME');

var source=opt.debugLog?String(src||''):stripDebug(src);
source=opt.compact?minify(source):source;
source=protectScriptEnds(source);

var payload=b64enc(source),step=opt.split?73:Math.max(payload.length,1),chunks=[];
for(var i=0;i<payload.length;i+=step)chunks.push(payload.slice(i,i+step));
if(opt.array===false)chunks=[chunks.join('')];
if(opt.rotate&&chunks.length){var shift=7%chunks.length;chunks=chunks.slice(shift).concat(chunks.slice(0,shift))}
if(opt.shuffle)chunks.reverse();

var protectedOn=!!options.passwordEnabled,hash='';
if(protectedOn){
var pass=String(options.password||''),pass2=String(options.passwordConfirm||'');
if(!pass)throw new Error('ISI PASSWORD');
if(!pass2)throw new Error('ISI KONFIRMASI PASSWORD');
if(pass!==pass2)throw new Error('PASSWORD MISMATCH');
hash=await sha256(pass)
}
var meta=b64enc(JSON.stringify({v:5,p:protectedOn?1:0,h:hash,t:opt}));
return protectScriptEnds(buildWrapper(opt,randomId(),chunks,meta))
}

g.CFObfuscatorEngine=Object.freeze({
version:'3.12-modular',
obfuscate:obfuscate
});
})(window);
