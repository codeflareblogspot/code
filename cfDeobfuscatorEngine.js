/* CodeFlare Deobfuscator Engine - v3.12 modular */
(function(g){
'use strict';

function stripScriptWrapper(s){
s=String(s||'').trim();
var m=s.match(/^<script\b[^>]*>([\s\S]*?)<\/script\s*>\s*$/i);
return m?m[1]:s
}
function stripCDATA(s){
s=String(s||'');
s=s.replace(/^\s*\/\/\s*<!\[CDATA\[\s*/,'');
s=s.replace(/\s*\/\/\s*\]\]>\s*$/,'');
return s
}
function cleanInput(s){return stripCDATA(stripScriptWrapper(String(s||''))).trim()}

function b64dec(s){
var bin=atob(String(s||'')),u=new Uint8Array(bin.length);
for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
return new TextDecoder().decode(u)
}
async function sha256(s){
if(!g.crypto||!g.crypto.subtle)throw new Error('SHA-256 NOT SUPPORTED');
var b=await g.crypto.subtle.digest('SHA-256',new TextEncoder().encode(String(s||'')));
return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')
}

function detectNative(input){
var s=cleanInput(input);
var mm=s.match(/\/\*CFJS5:([A-Za-z0-9+/=]+)\*\//);
var hm=s.match(/var\s+_q7n\s*=\s*["']([A-Za-z0-9+/=]+)["']\s*;?/);
if(!mm&&!hm)return null;

var arrays=[],ar=/var\s+(_[A-Za-z0-9]+|cfPayload)\s*=\s*(\[[\s\S]*?\])\s*;/g,m;
while((m=ar.exec(s))){
if(m[1]==='_ha')continue;
try{
var a=JSON.parse(m[2]);
if(Array.isArray(a)&&a.length&&a.every(function(v){return typeof v==='string'})){
arrays.push({name:m[1],chunks:a,size:a.join('').length})
}
}catch(_e){}
}
if(!arrays.length)return null;

try{
var meta=JSON.parse(b64dec(mm?mm[1]:hm[1]));
arrays.sort(function(a,b){return b.size-a.size});
return{meta:meta,chunks:arrays[0].chunks,payloadVar:arrays[0].name}
}catch(_e2){return null}
}

async function decodeNative(input,options){
options=options||{};
var x=detectNative(input);
if(!x)return null;

if(x.meta&&x.meta.p){
var pass=String(options.password||'');
if(!pass)throw new Error('PASSWORD REQUIRED');
if(await sha256(pass)!==x.meta.h)throw new Error('PASSWORD INVALID')
}

var chunks=x.chunks.slice();
if(x.meta&&x.meta.t&&x.meta.t.shuffle)chunks.reverse();
if(x.meta&&x.meta.t&&x.meta.t.rotate&&chunks.length){
var back=chunks.length-(7%chunks.length);
chunks=chunks.slice(back).concat(chunks.slice(0,back))
}
return b64dec(chunks.join(''))
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

g.CFDeobfuscatorEngine=Object.freeze({
version:'3.12-modular',
cleanInput:cleanInput,
detectNative:detectNative,
decodeNative:decodeNative,
analyze:analyze
});
})(window);
