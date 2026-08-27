/* CodeFlare JS Lab v3.11 stable — OBFUSCATOR ENGINE
   Split from the locked v3.11 monolith.
   This file is intentionally feature-scoped. */
(function(g){
'use strict';
function _a1(opt,id,chunks,meta){
var arr=opt.rename?'_'+id:'cfPayload',p=opt.rename?'_p':'cfEncoded',b=opt.rename?'_b':'cfBinary',u=opt.rename?'_u':'cfBytes',s=opt.rename?'_s':'cfSource',i=opt.rename?'_i':'cfIndex';
var dead=opt.dead?'var _g=(17*3)-51,_n="'+id.slice(0,3)+'";if(_g!==0&&_n.length<0){throw new Error(_n);}':'';
var dbg=opt.debug?'var _dt=Date.now();debugger;var _dd=Date.now()-_dt;if(_dd>1800){}':'';
var obj=opt.objectKeys?'var _cfg={["k"]:"v"};if(_cfg["k"]!=="v"){return;}':'';
var self=opt.selfDefend?'var _sig="'+id.slice(0,6)+'";if(_sig.length!==6){return;}':'';
var lock='';
if(opt.domain&&opt.host){
var dh=b64enc(opt.host),parts=[];for(var x=0;x<dh.length;x+=4)parts.push(dh.slice(x,x+4));
if(opt.shuffle)parts.reverse();
lock='var _ha='+JSON.stringify(parts)+';'+(opt.shuffle?'_ha.reverse();':'')+'var _hd=atob(_ha.join(""));if(location.hostname!==_hd&&!location.hostname.endsWith("."+_hd)){return;}'
}
var undoShuffle=opt.shuffle?arr+'.reverse();':'',undoRotate='';
if(opt.rotate)undoRotate='var _back='+arr+'.length-(('+(opt.numbers?'(3+4)':'7')+')%'+arr+'.length);'+arr+'='+arr+'.slice(_back).concat('+arr+'.slice(0,_back));';
var fs=opt.controlFlow?'var _st=0;while(_st<3){switch(_st){case 0:':'',f1=opt.controlFlow?'_st=1;break;case 1:':'',f2=opt.controlFlow?'_st=2;break;case 2:':'',fe=opt.controlFlow?'_st=3;break;}}':'';
var marker=opt.debugLog?'/*CFJS5:'+meta+'*/':'';
return marker+'(function(){'+lock+self+dbg+obj+dead+'var '+arr+'='+JSON.stringify(chunks)+';'+fs+undoShuffle+undoRotate+f1+'var '+p+'='+arr+'.join("");'+f2+'var '+b+'=atob('+p+'),'+u+'=new Uint8Array('+b+'.length);for(var '+i+'=0;'+i+'<'+b+'.length;'+i+'++)'+u+'['+i+']='+b+'.charCodeAt('+i+');var '+s+'=new TextDecoder().decode('+u+');'+fe+'(0,eval)('+s+');})();'+(opt.debugLog?'':'var _q7n='+JSON.stringify(meta)+';')
}
function _a2(src){
var opt=techValues();
if(opt.domain&&!opt.host){_c1(E.domain,'DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME');throw new Error('DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME')}
var source=opt.debugLog?String(src):_a9(src);source=opt.compact?minify(source):source;
/* Preserve Blogger/HTML raw-text safety inside the encoded source too. */
source=_protectHtmlRawTextEndTags(source);
var payload=b64enc(source),step=opt.split?73:Math.max(payload.length,1),chunks=[];
for(var i=0;i<payload.length;i+=step)chunks.push(payload.slice(i,i+step));
if(opt.array===false)chunks=[chunks.join('')];
if(opt.rotate&&chunks.length){var shift=7%chunks.length;chunks=chunks.slice(shift).concat(chunks.slice(0,shift))}
if(opt.shuffle)chunks.reverse();
var protectedOn=E.passEnable.checked,hash='';
if(protectedOn){
if(!E.pass.value){_c1(E.pass,'ISI PASSWORD');throw new Error('ISI PASSWORD')}
if(!E.pass2.value){_c1(E.pass2,'ISI KONFIRMASI PASSWORD');throw new Error('ISI KONFIRMASI PASSWORD')}
if(E.pass.value!==E.pass2.value){_c1(E.pass2,'PASSWORD MISMATCH');throw new Error('PASSWORD MISMATCH')}
hash=await sha256(E.pass.value)
}
var meta=b64enc(JSON.stringify({v:5,p:protectedOn?1:0,h:hash,t:opt}));
return _protectHtmlRawTextEndTags(_a1(opt,randomId(),chunks,meta))
}
function _a3(s){
/* Native CodeFlare detector must work identically with:
   - raw obfuscated JS
   - Add Tag Script output
   - Blogger CDATA wrapper
   - Domain Lock enabled
   - Password protection enabled */
s=String(s||'');
s=_stripCDATADeep(_stripScriptWrapper(s)).trim();

var mm=s.match(/\/\*CFJS5:([A-Za-z0-9+/=]+)\*\//);
var hm=s.match(/var\s+_q7n\s*=\s*["']([A-Za-z0-9+/=]+)["']\s*;?/);
/* Domain Lock also creates an array named _ha BEFORE the real payload.
   Never take the first array blindly. Collect candidates and select the
   actual encoded payload (largest valid string-array), excluding _ha. */
var arrays=[];
var ar=/var\s+(_[A-Za-z0-9]+|cfPayload)\s*=\s*(\[[\s\S]*?\])\s*;/g,am;
while((am=ar.exec(s))){
if(am[1]==='_ha')continue;
try{
var candidate=JSON.parse(am[2]);
if(Array.isArray(candidate)&&candidate.length&&candidate.every(function(v){return typeof v==='string'})){
arrays.push({name:am[1],chunks:candidate,size:candidate.join('').length})
}
}catch(_arrayErr){}
}

if(!arrays.length||(!mm&&!hm))return null;

try{
var meta=JSON.parse(b64dec(mm?mm[1]:hm[1]));
arrays.sort(function(a,b){return b.size-a.size});
return{meta:meta,chunks:arrays[0].chunks,payloadVar:arrays[0].name}
}catch(e){
return null
}
}
async function _a4(s){
var x=_a3(s);if(!x)return null;

/* Domain Lock only controls execution on the destination hostname.
   It must never prevent CodeFlare's own native decoder from opening the file.
   Password protection, when enabled, remains mandatory. */
if(x.meta.p){
E.accessBox.style.display='block';
var accessPassword=String(E.access.value||'');
if(!accessPassword)throw new Error('PASSWORD REQUIRED');
var h=await sha256(accessPassword);
if(h!==x.meta.h)throw new Error('PASSWORD INVALID')
}
var chunks=x.chunks.slice();
if(x.meta.t&&x.meta.t.shuffle)chunks.reverse();
if(x.meta.t&&x.meta.t.rotate&&chunks.length){var back=chunks.length-(7%chunks.length);chunks=chunks.slice(back).concat(chunks.slice(0,back))}
return b64dec(chunks.join(''))
}
function _a4(s){
var x=_a3(s);if(!x)return null;

/* Domain Lock only controls execution on the destination hostname.
   It must never prevent CodeFlare's own native decoder from opening the file.
   Password protection, when enabled, remains mandatory. */
if(x.meta.p){
E.accessBox.style.display='block';
var accessPassword=String(E.access.value||'');
if(!accessPassword)throw new Error('PASSWORD REQUIRED');
var h=await sha256(accessPassword);
if(h!==x.meta.h)throw new Error('PASSWORD INVALID')
}
var chunks=x.chunks.slice();
if(x.meta.t&&x.meta.t.shuffle)chunks.reverse();
if(x.meta.t&&x.meta.t.rotate&&chunks.length){var back=chunks.length-(7%chunks.length);chunks=chunks.slice(back).concat(chunks.slice(0,back))}
return b64dec(chunks.join(''))
}
function _a9(s){return String(s).replace(/\bconsole\s*\.\s*(?:log|debug|info|trace)\s*\((?:[^()"'`]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\([^()]*\))*\)\s*;?/g,'').replace(/\/\*\s*CF(?:JS|DEBUG|MARKER)[\s\S]*?\*\//gi,'')}

async function _a2(src){
var opt=techValues();
if(opt.domain&&!opt.host){_c1(E.domain,'DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME');throw new Error('DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME')}
var source=opt.debugLog?String(src):_a9(src);source=opt.compact?minify(source):source;
/* Preserve Blogger/HTML raw-text safety inside the encoded source too. */
source=_protectHtmlRawTextEndTags(source);
var payload=b64enc(source),step=opt.split?73:Math.max(payload.length,1),chunks=[];
for(var i=0;i<payload.length;i+=step)chunks.push(payload.slice(i,i+step));
if(opt.array===false)chunks=[chunks.join('')];
if(opt.rotate&&chunks.length){var shift=7%chunks.length;chunks=chunks.slice(shift).concat(chunks.slice(0,shift))}
if(opt.shuffle)chunks.reverse();
var protectedOn=E.passEnable.checked,hash='';
if(protectedOn){
if(!E.pass.value){_c1(E.pass,'ISI PASSWORD');throw new Error('ISI PASSWORD')}
if(!E.pass2.value){_c1(E.pass2,'ISI KONFIRMASI PASSWORD');throw new Error('ISI KONFIRMASI PASSWORD')}
if(E.pass.value!==E.pass2.value){_c1(E.pass2,'PASSWORD MISMATCH');throw new Error('PASSWORD MISMATCH')}
hash=await sha256(E.pass.value)
}
var meta=b64enc(JSON.stringify({v:5,p:protectedOn?1:0,h:hash,t:opt}));
return _protectHtmlRawTextEndTags(_a1(opt,randomId(),chunks,meta))
}
function _a3(s){
/* Native CodeFlare detector must work identically with:
   - raw obfuscated JS
   - Add Tag Script output
   - Blogger CDATA wrapper
   - Domain Lock enabled
   - Password protection enabled */
s=String(s||'');
s=_stripCDATADeep(_stripScriptWrapper(s)).trim();

var mm=s.match(/\/\*CFJS5:([A-Za-z0-9+/=]+)\*\//);
var hm=s.match(/var\s+_q7n\s*=\s*["']([A-Za-z0-9+/=]+)["']\s*;?/);
/* Domain Lock also creates an array named _ha BEFORE the real payload.
   Never take the first array blindly. Collect candidates and select the
   actual encoded payload (largest valid string-array), excluding _ha. */
var arrays=[];
var ar=/var\s+(_[A-Za-z0-9]+|cfPayload)\s*=\s*(\[[\s\S]*?\])\s*;/g,am;
while((am=ar.exec(s))){
if(am[1]==='_ha')continue;
try{
var candidate=JSON.parse(am[2]);
if(Array.isArray(candidate)&&candidate.length&&candidate.every(function(v){return typeof v==='string'})){
arrays.push({name:am[1],chunks:candidate,size:candidate.join('').length})
}
}catch(_arrayErr){}
}

if(!arrays.length||(!mm&&!hm))return null;

try{
var meta=JSON.parse(b64dec(mm?mm[1]:hm[1]));
arrays.sort(function(a,b){return b.size-a.size});
return{meta:meta,chunks:arrays[0].chunks,payloadVar:arrays[0].name}
}catch(e){
return null
}
}
async function _a4(s){
var x=_a3(s);if(!x)return null;

/* Domain Lock only controls execution on the destination hostname.
   It must never prevent CodeFlare's own native decoder from opening the file.
   Password protection, when enabled, remains mandatory. */
if(x.meta.p){
E.accessBox.style.display='block';
var accessPassword=String(E.access.value||'');
if(!accessPassword)throw new Error('PASSWORD REQUIRED');
var h=await sha256(accessPassword);
if(h!==x.meta.h)throw new Error('PASSWORD INVALID')
}
var chunks=x.chunks.slice();
if(x.meta.t&&x.meta.t.shuffle)chunks.reverse();
if(x.meta.t&&x.meta.t.rotate&&chunks.length){var back=chunks.length-(7%chunks.length);chunks=chunks.slice(back).concat(chunks.slice(0,back))}
return b64dec(chunks.join(''))
}
function _b4(src){
src=String(src||'');
var out='',i=0;

function readQuoted(start){
var q=src[start],j=start+1,esc=false;
for(;j<src.length;j++){
var c=src[j];
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}
if(c===q){j++;break}
}
if(j>src.length)return null;
return{text:src.slice(start,j),end:j}
}

function decodeLiteral(lit){
if(!/\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}/.test(lit))return lit;
try{
var val=Function('"use strict";return ('+lit+')')();
if(typeof val!=='string')return lit;

/* Keep characters that are dangerous in HTML/script embedding escaped. */
var s=JSON.stringify(val);
s=s.replace(/</g,function(ch,off,whole){
if(whole.slice(off,off+9).toLowerCase()==='</script>')return '\\x3C';
return ch
});
return s
}catch(_e){return lit}
}

while(i<src.length){
var c=src[i],n=src[i+1]||'';

if(c==='/'&&n==='/'){
var e=src.indexOf('\n',i+2);
if(e<0){out+=src.slice(i);break}
out+=src.slice(i,e+1);i=e+1;continue
}
if(c==='/'&&n==='*'){
var e2=src.indexOf('*/',i+2);
if(e2<0){out+=src.slice(i);break}
out+=src.slice(i,e2+2);i=e2+2;continue
}

if(c==='"'||c==="'"){
var r=readQuoted(i);
if(!r){out+=c;i++;continue}
out+=decodeLiteral(r.text);
i=r.end;continue
}

/* Preserve template literals: interpolation makes blind rewriting unsafe. */
if(c==='`'){
var j=i+1,escT=false;
for(;j<src.length;j++){
var t=src[j];
if(escT){escT=false;continue}
if(t==='\\'){escT=true;continue}
if(t==='`'){j++;break}
}
out+=src.slice(i,j);i=j;continue
}

out+=c;i++
}
return out
}
function _b7(raw){
var out='';for(var i=0;i<raw.length;i++){var c=raw[i];if(c!=='\\'){out+=c;continue}var n=raw[++i];if(n===undefined){out+='\\';break}
if(n==='x'&&/^[0-9a-fA-F]{2}$/.test(raw.slice(i+1,i+3))){out+=String.fromCharCode(parseInt(raw.slice(i+1,i+3),16));i+=2;continue}
if(n==='u'&&/^[0-9a-fA-F]{4}$/.test(raw.slice(i+1,i+5))){out+=String.fromCharCode(parseInt(raw.slice(i+1,i+5),16));i+=4;continue}
var map={n:'\n',r:'\r',t:'\t',b:'\b',f:'\f',v:'\v','0':'\0'};out+=map[n]!==undefined?map[n]:n}
return out
}
function _b8(src,pos){
var i=pos;while(/\s/.test(src[i]||''))i++;if(src[i]!=='[')return null;i++;var vals=[];
while(i<src.length){while(/[\s,]/.test(src[i]||''))i++;if(src[i]===']')return{vals:vals,end:i+1};
var q=src[i];if(q!=='"'&&q!=="'")return null;i++;var raw='',esc=false,closed=false;
for(;i<src.length;i++){var c=src[i];if(esc){raw+='\\'+c;esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q){i++;closed=true;break}raw+=c}
if(!closed)return null;vals.push(_b7(raw));while(/\s/.test(src[i]||''))i++;if(src[i]===','){i++;continue}if(src[i]===']')return{vals:vals,end:i+1};return null}
return null
}
function _b2(src){
src=String(src||'');
var tables={},re=/(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*/g,m;
while((m=re.exec(src))){
var parsed=_b8(src,re.lastIndex);
if(!parsed)continue;
tables[m[1]]=parsed.vals;
re.lastIndex=parsed.end
}

Object.keys(tables).forEach(function(name){
var vals=tables[name],rx=new RegExp('\\b'+name.replace(/[$]/g,'\\$&')+'\\s*\\[\\s*(\\d+)\\s*\\]','g');
src=src.replace(rx,function(all,idx){
idx=+idx;
return idx<vals.length?JSON.stringify(vals[idx]):all
})
});

/* Declaration removal is intentionally delegated to _p3(), which checks
references, balanced boundaries and syntax before deleting anything. */
return src
}
function _b9(lit){return!lit||lit.length<2?lit:_b7(lit.slice(1,-1))}

function _d1(src){
src=String(src);
var tables={},re=/(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*\[/g,m;
while((m=re.exec(src))){
var name=m[1],i=re.lastIndex-1,depth=0,q=null,esc=false,end=-1;
for(;i<src.length;i++){
var c=src[i];
if(q){if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;continue}
if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c==='[')depth++;
else if(c===']'){depth--;if(depth===0){end=i+1;break}}
}
if(end<0)continue;
var raw=src.slice(re.lastIndex-1,end),parsed=_b8(raw,0);
if(parsed&&parsed.end===raw.length)tables[name]=parsed.vals;
re.lastIndex=end;
}
return tables
}

function _e1(expr){
expr=String(expr||'').trim();
if(!expr)return null;
if(/^0x[0-9a-f]+$/i.test(expr))return parseInt(expr,16);
if(/^\d+$/.test(expr))return parseInt(expr,10);
if(!/^[0-9xXa-fA-F+\-*/%() <>&|^~]+$/.test(expr))return null;
try{var v=Function('"use strict";return ('+expr+')')();return Number.isFinite(v)&&Math.floor(v)===v?v:null}catch(e){return null}
}

function _e2(src){
src=String(src);
var tables=_d1(src),names=Object.keys(tables);
if(!names.length)return src;
names.forEach(function(name){
var vals=tables[name],safe=name.replace(/[$]/g,'\\$&');
var rx=new RegExp('\\b'+safe+'\\s*\\[\\s*([^\\]]+)\\s*\\]','g');
src=src.replace(rx,function(all,expr){
var idx=_e1(expr);
if(idx===null||idx<0||idx>=vals.length)return all;
return JSON.stringify(vals[idx])
});
});
return src
}

function _e3(src){
src=String(src);
return src.replace(/([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])*)\s*\[\s*(["'])([A-Za-z_$][\w$]*)\2\s*\]/g,function(all,obj,q,key){
return obj+'.'+key
})
}

function _p1(src){
src=String(src);
var found=_d1(src),names=Object.keys(found);
names.forEach(function(name){if(found[name]&&found[name].length)S.tableCache[name]=found[name].slice()});
return S.tableCache
}

function _p2(src){
src=String(src);
var tables=_p1(src),names=Object.keys(tables);
if(!names.length)return src;
var pass=0,prev='';
while(pass<8&&src!==prev){
prev=src;
names.forEach(function(name){
var vals=tables[name],safe=name.replace(/[$]/g,'\\$&');
var rx=new RegExp('\\b'+safe+'\\s*\\[\\s*([^\\]]+)\\s*\\]','g');
src=src.replace(rx,function(all,expr){
var idx=null,e=String(expr||'').trim();
if(/^0x[0-9a-f]+$/i.test(e))idx=parseInt(e,16);
else if(/^\d+$/.test(e))idx=parseInt(e,10);
else if(/^[0-9xXa-fA-F+\-*/%() <>&|^~]+$/.test(e)){
try{var v=Function('"use strict";return ('+e+')')();if(Number.isFinite(v)&&Math.floor(v)===v)idx=v}catch(_e){}
}
return idx!==null&&idx>=0&&idx<vals.length?JSON.stringify(vals[idx]):all
});
});
pass++;
}
return src
}

function _cleanupUnusedArrayDeclarator(src,name){
src=String(src||'');
name=String(name||'');
if(!name)return src;

var safe=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
var re=new RegExp('\\b(var|let|const)\\s+'+safe+'\\s*=\\s*\\[','g'),m;

while((m=re.exec(src))){
var open=src.indexOf('[',m.index);
var b=_scanJSArrayLiteral(src,open);
if(!b)return src;

/* Never remove a table that is still referenced anywhere outside its own declarator. */
var declStart=m.index,arrEnd=b.end;
var probeEnd=arrEnd;
while(/\s/.test(src[probeEnd]||''))probeEnd++;
var tail=src[probeEnd]||'';
var declEnd=probeEnd+(tail===';'?1:0);
if(_identifierUsedOutside(src,name,declStart,declEnd))return src;

var candidate=src;
if(tail===','){
/* Preserve chained declarations: var rgx=[...],sumLength=... -> var sumLength=... */
candidate=src.slice(0,declStart)+m[1]+' '+src.slice(probeEnd+1).replace(/^\s*/,'');
}else if(tail===';'){
candidate=src.slice(0,declStart)+src.slice(probeEnd+1);
}else{
return src
}

if(_syntaxValid(candidate)&&!_orphanCheck(candidate).length)return candidate;
return src
}
return src
}

function _finalUnusedTableCleanup(src){
src=String(src||'');
if(_packerPresent(src))return src;

/* Mixed regex/string tables are not always visible to the ordinary string-table cache. */
if(!(src.match(/\brgx\s*\[\s*\d+\s*\]/g)||[]).length){
var cleaned=_cleanupUnusedArrayDeclarator(src,'rgx');
if(cleaned!==src)src=cleaned
}
return src
}

function _p3(src){
src=String(src||'');
if(_packerPresent(src))return src;

var tables=_p1(src),names=Object.keys(tables);
if(!names.length)return src;

var removals=[];
names.forEach(function(name){
var d=_findSafeTableDecl(src,name);
if(!d)return;
if(_identifierUsedOutside(src,name,d.start,d.end))return;
removals.push(d)
});

removals.sort(function(a,b){return b.start-a.start}).forEach(function(d){
var candidate=src.slice(0,d.start)+src.slice(d.end);
try{
new Function(_stripCDATA(_stripScriptWrapper(candidate)));
if(!_orphanCheck(candidate).length)src=candidate
}catch(_e){}
});
return src
}

function _p4(src){
src=String(src);
return src.replace(/([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])*)\s*\[\s*(["'])([A-Za-z_$][\w$]*)\2\s*\]/g,function(all,obj,q,key){
return obj+'.'+key
})
}
function techValues(){
var o={};tool.querySelectorAll('[data-tech]').forEach(function(x){o[x.dataset.tech]=!!x.checked});
o.host=(E.domain.value||'').trim().toLowerCase().replace(/^https?:\/\//,'').replace(/\/.*$/,'');
return o
}
function sha256(s){if(!crypto||!crypto.subtle)throw new Error('SHA-256 NOT SUPPORTED');var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}
function b64enc(s){var u=new TextEncoder().encode(s),bin='';for(var i=0;i<u.length;i++)bin+=String.fromCharCode(u[i]);return btoa(bin)}
function b64dec(s){var bin=atob(s),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new TextDecoder().decode(u)}
function randomId(){return Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4)}
function minify(s){return stripComments(String(s)).replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n[ \t]+/g,'\n').replace(/\n{2,}/g,'\n').replace(/\s*([{};,=:])\s*/g,'$1').trim()}
function _protectHtmlRawTextEndTags(js){
js=String(js||'');
/* HTML SCRIPT is a raw-text element. The HTML parser does not care whether
   </script appears in a JS string, regex or comment. Therefore protect EVERY
   literal closing-script sequence in the JavaScript payload.
   </script>  -> <\/script>
   This is idempotent because <\/script no longer matches /<\/script/i. */
return js.replace(/<\/script/gi,'<\\/script')
}
function _stripCDATADeep(s){
s=String(s||'').trim();
s=s.replace(/^\s*\/\/\s*<!\[CDATA\[\s*(?:\r?\n)?/,'');
s=s.replace(/(?:\r?\n)?\s*\/\/\s*\]\]>\s*$/,'');
s=s.replace(/^\s*\/\*\s*<!\[CDATA\[\s*\*\/\s*/,'');
s=s.replace(/\s*\/\*\s*\]\]>\s*\*\/\s*$/,'');
return s.trim()
}
function _stripScriptWrapper(src){
src=String(src||'');
var m=src.match(/^\s*<script\b[^>]*>([\s\S]*?)<\/script\s*>\s*$/i);
return m?m[1]:src
}
g.CFObfuscatorEngine=Object.freeze({
_a1:_a1,_a2:_a2,_a3:_a3,_a4:_a4,_a9:_a9,techValues:techValues,sha256:sha256,b64enc:b64enc,b64dec:b64dec,randomId:randomId,minify:minify,_protectHtmlRawTextEndTags:_protectHtmlRawTextEndTags,_stripCDATADeep:_stripCDATADeep,_stripScriptWrapper:_stripScriptWrapper
});
})(window);
