/* CodeFlare Deobfuscator Engine - v3.13 modular */
(function(g){
'use strict';

function stripScriptWrapper(s){
s=String(s||'').trim();
/* Accept attributes, whitespace, and Blogger wrappers. */
var m=s.match(/^<script\b[^>]*>([\s\S]*?)<\/script\s*>\s*$/i);
return m?m[1]:s
}
function stripCDATA(s){
s=String(s||'');
s=s.replace(/^\s*(?:\/\*<!\[CDATA\[\*\/|\/\/\s*<!\[CDATA\[)\s*/i,'');
s=s.replace(/\s*(?:\/\*\]\]>\*\/|\/\/\s*\]\]>)\s*$/i,'');
return s
}
function cleanInput(s){return stripCDATA(stripScriptWrapper(String(s||''))).trim()}

function b64dec(s){
s=String(s||'').replace(/\s+/g,'');
var bin=atob(s),u=new Uint8Array(bin.length);
for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
return new TextDecoder().decode(u)
}
async function sha256(s){
if(!g.crypto||!g.crypto.subtle)throw new Error('SHA-256 NOT SUPPORTED');
var b=await g.crypto.subtle.digest('SHA-256',new TextEncoder().encode(String(s||'')));
return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')
}

function readMeta(s){
var mm=s.match(/\/\*CFJS5:([A-Za-z0-9+/=\s]+?)\*\//);
var hm=s.match(/\b(?:var|let|const)\s+_q7n\s*=\s*["']([A-Za-z0-9+/=]+)["']\s*;?/);
var raw=mm?mm[1].replace(/\s+/g,''):hm?hm[1]:null;
if(!raw)return null;
try{return JSON.parse(b64dec(raw))}catch(e){return null}
}

function payloadCandidates(s){
var out=[];
/* Payload can be var/let/const and may omit final semicolon. */
var re=/\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*(\[[\s\S]*?\])\s*;?/g,m;
while((m=re.exec(s))){
if(m[1]==='_ha')continue; // Domain Lock hostname fragments.
try{
var a=JSON.parse(m[2]);
if(Array.isArray(a)&&a.length&&a.every(function(v){return typeof v==='string'})){
var joined=a.join('');
/* Encoded source is base64-like; reject ordinary string tables. */
var base64ish=/^[A-Za-z0-9+/=]+$/.test(joined);
if(base64ish)out.push({name:m[1],chunks:a,size:joined.length})
}
}catch(e){}
}
out.sort(function(a,b){return b.size-a.size});
return out
}

function detectNative(input){
var s=cleanInput(input),meta=readMeta(s);
if(!meta)return null;
var arrays=payloadCandidates(s);
if(!arrays.length)return null;
return {meta:meta,chunks:arrays[0].chunks,payloadVar:arrays[0].name}
}

async function decodeNative(input,options){
options=options||{};
var x=detectNative(input);
if(!x)return null;

if(x.meta&&x.meta.p){
var pass=String(options.password||'');
if(!pass)throw new Error('PASSWORD REQUIRED');
if(await sha256(pass)!==String(x.meta.h||''))throw new Error('PASSWORD INVALID')
}

var chunks=x.chunks.slice();
var tech=x.meta&&x.meta.t||{};
if(tech.shuffle)chunks.reverse();
if(tech.rotate&&chunks.length){
var back=chunks.length-(7%chunks.length);
if(back===chunks.length)back=0;
chunks=chunks.slice(back).concat(chunks.slice(0,back))
}
var joined=chunks.join('');
try{return b64dec(joined)}
catch(e){throw new Error('CODEFLARE PAYLOAD DECODE FAILED')}
}

function analyze(input){
var s=String(input||''),a=[];
if(detectNative(s))a.push('CODEFLARE PROTECTED');
if(/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,/i.test(s))a.push('P.A.C.K.E.R / BASE62');
if(/\b(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*\[(?:\s*['"][\s\S]*?['"]\s*,?){3,}\]/.test(s))a.push('STRING ARRAY');
if(/\b[A-Za-z_$][\w$]*\s*\[\s*(?:0x[0-9a-f]+|\d+(?:\s*[+\-*/%]\s*\d+)+)\s*\]/i.test(s))a.push('COMPUTED ARRAY INDEX');
if(/\\x[0-9a-f]{2}/i.test(s))a.push('HEX ESCAPE');
if(/\\u[0-9a-f]{4}/i.test(s))a.push('UNICODE ESCAPE');
if(/String\.fromCharCode\s*\(/.test(s))a.push('FROM CHAR CODE');
if(/\b(?:_0x[a-z0-9]+(?:x[a-z0-9]+)*|__0x[a-z0-9]+|_\$[A-Za-z0-9]+)\b/i.test(s))a.push('MANGLED IDENTIFIER');
if(/\[['"][A-Za-z_$][\w$]*['"]\]/.test(s))a.push('BRACKET PROPERTY');
return a
}

function inspect(input){
var s=String(input||''),methods=analyze(s);
if(detectNative(s))return {type:'CODEFLARE PROTECTED',engine:'CODEFLARE JS5',confidence:99,methods:methods};
if(/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,/i.test(s))return {type:'P.A.C.K.E.R / BASE62',engine:'PACKER COMPATIBLE',confidence:92,methods:methods};
if(/javascript-obfuscator|_0x[a-f0-9]{4,}/i.test(s)&&methods.indexOf('STRING ARRAY')>=0)return {type:'STRING ARRAY / MANGLED',engine:'JAVASCRIPT OBFUSCATOR STYLE',confidence:88,methods:methods};
if(methods.indexOf('STRING ARRAY')>=0)return {type:'STRING ARRAY',engine:'STATIC ARRAY LOOKUP',confidence:85,methods:methods};
if(methods.indexOf('HEX ESCAPE')>=0||methods.indexOf('UNICODE ESCAPE')>=0)return {type:'HEX / UNICODE ESCAPE',engine:'ESCAPE ENCODING',confidence:85,methods:methods};
if(methods.indexOf('MANGLED IDENTIFIER')>=0)return {type:'MANGLED IDENTIFIER',engine:'GENERIC OBFUSCATOR',confidence:75,methods:methods};
return {type:'NORMAL / UNKNOWN',engine:'GENERIC / UNKNOWN',confidence:50,methods:methods}
}

g.CFDeobfuscatorEngine=Object.freeze({
version:'3.13-modular',
cleanInput:cleanInput,
detectNative:detectNative,
decodeNative:decodeNative,
analyze:analyze,
inspect:inspect
});
})(window);
