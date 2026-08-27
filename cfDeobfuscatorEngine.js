/* CodeFlare JS Lab v3.11 stable — DEOBFUSCATOR ENGINE
   Split from the locked v3.11 monolith.
   This file is intentionally feature-scoped. */
(function(g){
'use strict';
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
function _a7(s){
s=String(s||'');var a=[];
if(/\b(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*\[(?:\s*['"][\s\S]*?['"]\s*,?){3,}\]/.test(s)&&/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,/i.test(s))a.push('INDIRECT PACKER ARRAY');
if(/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,/i.test(s))a.push('P.A.C.K.E.R / BASE62');
if(/\b(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*\[(?:\s*['"][\s\S]*?['"]\s*,?){3,}\]/.test(s))a.push('STRING ARRAY');
if(/\b[A-Za-z_$][\w$]*\s*\[\s*(?:0x[0-9a-f]+|\d+(?:\s*[+\-*/%]\s*\d+)+)\s*\]/i.test(s))a.push('COMPUTED ARRAY INDEX');
if(/\\x[0-9a-f]{2}/i.test(s))a.push('HEX ESCAPE');
if(/\\u[0-9a-f]{4}/i.test(s))a.push('UNICODE ESCAPE');
if(/String\.fromCharCode\s*\(/.test(s))a.push('FROM CHAR CODE');
if(/\b(?:_0x[a-f0-9]+|__0x[a-f0-9]+|_\$[A-Za-z0-9]+)\b/i.test(s))a.push('MANGLED IDENTIFIER');
if(/\[['"][A-Za-z_$][\w$]*['"]\]/.test(s))a.push('BRACKET PROPERTY');
return a
}
function _a8(s){return _a7(s).length>0}
function _h1(src){
src=String(src||'');
if(!E.deobSupport)return;
var found={
'codeflare':!!_a3(src),
'packer':/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,/i.test(src),
'string-array':/\b(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*\[(?:\s*['"][\s\S]*?['"]\s*,?){3,}\]/.test(src),
'hex':/\\x[0-9a-f]{2}/i.test(src),
'unicode':/\\u[0-9a-f]{4}/i.test(src),
'charcode':/String\.fromCharCode\s*\(/.test(src),
'bracket':/\[['"][A-Za-z_$][\w$]*['"]\]/.test(src),
'mangled':/\b(?:_0x[a-f0-9]+|__0x[a-f0-9]+|_\$[A-Za-z0-9]+)\b/i.test(src)
};
var count=Object.keys(found).filter(function(k){return found[k]}).length;
found['multi-layer']=count>1;
E.deobSupport.querySelectorAll('.cfObDeobMethod').forEach(function(el){
el.classList.toggle('is-detected',!!found[el.getAttribute('data-method')]);
});
}

function updateLayerPanel(src,status){
var layers=_a7(src),remaining=layers.length;
if(E.layerCurrent)E.layerCurrent.textContent=S.layerIndex;
if(E.layerDetected)E.layerDetected.textContent=layers.length?layers[0]:'NONE';
if(E.layerRemaining)E.layerRemaining.textContent=remaining;
if(E.layerStatus)E.layerStatus.textContent=status||'ANALYZED';
if(E.layerResult)E.layerResult.textContent=S.normalizeFinal?'FINAL LAYER':remaining?'LAYER DETECTED':'READY';
if(!E.layerList)return;
if(!S.layerHistory.length){E.layerList.innerHTML='<span>No layer processed yet.</span>';return}
E.layerList.innerHTML=S.layerHistory.map(function(x,i){return'<div class="cfObLayerItem"><b>Layer '+(i+1)+' - '+x.name+'</b><em>'+x.status+'</em></div>'}).join('');var _last=E.layerList.lastElementChild;if(_last){try{_last.scrollIntoView({behavior:'smooth',block:'nearest'})}catch(_e){E.layerList.scrollTop=E.layerList.scrollHeight}}
}
function setNormalizeFinal(on,msg){
S.normalizeFinal=!!on;
if(E.normalizePanel)E.normalizePanel.classList.toggle('is-final',!!on);
if(E.normalizeState)E.normalizeState.textContent=msg||(on?'Final layer reached. Tidak ada layer Normalize yang terdeteksi lagi.':'Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.');
if(E.normalizeFull)E.normalizeFull.disabled=S.normalizeBusy||!!on||!S.deobfuscateReady||!(S.mode==='deobfuscate'&&E.output.value)
}

async function _a6(src){
src=String(src||'');

/* In LARGE SOURCE MODE, src is only the cached obfuscated target.
   Never overwrite the preserved full Blogger source used by Inject. */
if(!S.largeSourceMode){
S.originalRawSource=src;
S.bloggerMode=_detectBloggerMode(S.originalRawSource)
}else{
S.bloggerMode=_detectBloggerMode(_getInjectSource())||S.bloggerMode
}

var raw=_stripCDATA(_stripScriptWrapper(src));
S.originalSource=raw;
S.tableCache={};

var current=raw,t,next,cp,packed,sem;
_p1(current);

/* Optional CodeFlare decoder first, but checkpointed. */
var cf=await _a4(current);
if(cf!==null){
t=_safeTransform(current,String(cf),'CODEFLARE DECODE');
current=t.code
}

/* P.A.C.K.E.R must always run before table resolver. */
if(_packerPresent(current)){
say('PACKER DETECTED - PRIORITY UNPACK');
packed=_b1(current);

t=_safeTransform(current,packed,'PACKER UNPACK');
if(t.rolled||!t.changed){
say('PACKER UNPACK FAILED - ORIGINAL SCRIPT PRESERVED');
current=_deepReadablePass(current);
var complete=_deobfuscationCompleteness(current);
S.deobfuscationCompleteness=complete;
if(!complete.complete){
say('DEOBFUSCATION INCOMPLETE - HEX '+complete.hex+' | RGX '+complete.rgx+(complete.rgx?' ['+_unresolvedRgxIndexes(current).join(',')+']':'')+' | TABLE '+complete.table+' | PACKER '+complete.packer)
}else{
say('DEOBFUSCATION COMPLETE')
}
return current
}
current=t.code;
say('PACKER RESOLVED')
}

/* Resolve string references but never delete declarations here. */
next=_p2(current);
t=_safeTransform(current,next,'STRING TABLE RESOLVE');
current=t.code;

next=_d2(current);
t=_safeTransform(current,next,'INDIRECT RESOLVE');
current=t.code;

/* Escape/hex decode only through guarded implementation. */
next=_readabilityPass(current);
t=_safeTransform(current,next,'HEX UNICODE DECODE');
current=t.code;

/* Limited normalization transforms. */
next=_b2(current);
t=_safeTransform(current,next,'TABLE VALUE RESOLVE');
current=t.code;

next=_p4(current);
t=_safeTransform(current,next,'IDENTIFIER NORMALIZE');
current=t.code;

/* Deterministic semantic repair. */
sem=_conservativeHumanize(current);
if(sem.code!==current){
t=_safeTransform(current,sem.code,'SEMANTIC REPAIR');
current=t.code
}
if(sem.fixes.length){
S.lastSemanticFixes=sem.fixes;
say('SEMANTIC FIX: '+sem.fixes.slice(0,4).join(', '))
}
if(sem.warnings.length)S.lastSemanticWarnings=sem.warnings;

/* Final string-table cleanup only if references are truly gone. */
if(!_packerPresent(current)){
next=_p3(current);
t=_safeTransform(current,next,'STRING TABLE CLEANUP');
current=t.code;

/* Dedicated final cleanup for mixed RGX tables after every indexed reference is gone. */
next=_finalUnusedTableCleanup(current);
t=_safeTransform(current,next,'UNUSED RGX TABLE CLEANUP');
current=t.code
}

return current
}

function analyze(){
var s=E.input.value||'',len=s.length,lines=s?s.split(/\r?\n/).length:0;
var el;
if((el=$('cfObSize')))el.textContent=kb(s);
if((el=$('cfObChars')))el.textContent=len.toLocaleString();
if((el=$('cfObLines')))el.textContent=lines.toLocaleString();
if((el=$('cfObFunctions')))el.textContent=((s.match(/\bfunction\b|=>/g)||[]).length).toLocaleString();
if((el=$('cfObVariables')))el.textContent=((s.match(/\b(?:var|let|const)\b/g)||[]).length).toLocaleString();
if((el=$('cfObStringCount')))el.textContent=((s.match(/(['"`])(?:\\.|(?!\1)[\s\S])*?\1/g)||[]).length).toLocaleString();
var pat='NORMAL / UNKNOWN',eng='GENERIC / UNKNOWN',comp='LOW',rec=95;
if(_d3(s)){pat='MINIFIED LIBRARY';eng='LIBRARY / PLUGIN';comp='LOW';rec=96}
if(_a3(s)){pat='CODEFLARE PROTECTED';eng='CODEFLARE JS5';comp='MEDIUM';rec=99}
else if(/eval\(function\(p,a,c,k,e,/.test(s)){pat='P.A.C.K.E.R / BASE62';eng='PACKER COMPATIBLE';comp='HIGH';rec=82}
else if(/\\x[0-9a-f]{2}|\\u[0-9a-f]{4}/i.test(s)){pat='HEX / UNICODE ESCAPE';comp='MEDIUM';rec=90}
else if(/\b[A-Za-z_$][\w$]*\s*\[\s*(?:0x[0-9a-f]+|\d+(?:\s*[+\-*/%]\s*\d+)+)\s*\]/i.test(s)){pat='COMPUTED STRING ARRAY';eng='STATIC ARRAY LOOKUP';comp='MEDIUM';rec=94}else if(/_0x[a-f0-9]+/i.test(s)){pat='MANGLED IDENTIFIER';comp='MEDIUM';rec=78}
if((el=$('cfObPattern')))el.textContent=pat;if((el=$('cfObSourceEngine')))el.textContent=eng;if((el=$('cfObComplexity')))el.textContent=comp;
if((el=$('cfObRecommended')))el.textContent=S.mode==='obfuscate'?'OBFUSCATE':S.mode==='deobfuscate'?'DEOBFUSCATE - NORMALIZE':'CODE TOOLS';
if((el=$('cfObRecoveryValue')))el.textContent=rec+'%';if((el=$('cfObRecoveryBar')))el.style.width=rec+'%';if((el=$('cfObAnalyzeState')))el.textContent=s?'ANALYZED':'WAITING INPUT'
}

function mode(m){
S.mode=m;

/* Mode-specific Inject button label */
if(E.copyScript){
if(m==='obfuscate'){
E.copyScript.innerHTML='<i class="fa fa-code"></i> ADD TAG SCRIPT';
E.copyScript.setAttribute('data-action-label','ADD TAG SCRIPT')
}else if(m==='deobfuscate'){
E.copyScript.innerHTML='<i class="fa fa-code-fork"></i> INJECT SOURCE';
E.copyScript.setAttribute('data-action-label','INJECT SOURCE')
}else{
E.copyScript.innerHTML='<i class="fa fa-code-fork"></i> INJECT SOURCE';
E.copyScript.setAttribute('data-action-label','INJECT SOURCE')
}
}

_injectButtonState();
if(E.inputLabel)E.inputLabel.innerHTML=m==='tools'?'<i class="fa fa-terminal"></i> CODE INPUT HTML | CSS | JS | TEXT':m==='deobfuscate'?'<i class="fa fa-terminal"></i> JAVASCRIPT INPUT - DEOBFUSCATE':'<i class="fa fa-terminal"></i> JAVASCRIPT INPUT';
tool.querySelectorAll('.cfObModeBtn').forEach(function(b){b.classList.toggle('active',b.dataset.mode===m)});
if(E.tools)E.tools.style.display=m==='tools'?'block':'none';
if(E.process)E.process.style.display=m==='tools'?'none':'block';
if(E.passBox)E.passBox.style.display=m==='obfuscate'?'block':'none';
if(E.accessBox)E.accessBox.style.display='none';
if(E.deobSupport)E.deobSupport.style.display=m==='deobfuscate'?'block':'none';
if(E.techBox)E.techBox.style.display=m==='obfuscate'?'block':'none';
if(E.layerSection)E.layerSection.style.display=m==='deobfuscate'?'block':'none';
if(E.normalizePanel)E.normalizePanel.style.display=m==='deobfuscate'?'flex':'none';
if(E.normalizeFull)E.normalizeFull.disabled=S.normalizeFinal||!S.deobfuscateReady||!(m==='deobfuscate'&&E.output.value);if(m==='deobfuscate')_h1(E.input.value);else if(E.deobSupport)E.deobSupport.querySelectorAll('.cfObDeobMethod').forEach(function(el){el.classList.remove('is-detected')});
if(m!=='deobfuscate'&&E.normalizePanel)E.normalizePanel.classList.remove('is-final');
if(m!=='deobfuscate'){S.normalizePassed=false;S.injectCompleted=false}
_injectButtonState();
setTechEnabled(m==='obfuscate');
if(m==='obfuscate'){E.process.innerHTML='<i class="fa fa-cogs"></i> OBFUSCATE CODE';E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> ENCRYPTION CODE OUTPUT'}
else if(m==='deobfuscate'){E.process.innerHTML='<i class="fa fa-unlock-alt"></i> DEOBFUSCATE CODE';E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> DEOBFUSCATION CODE OUTPUT'}
else E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> CODE TOOLS OUTPUT';
analyze();say('READY')
}

tool.querySelectorAll('.cfObModeBtn').forEach(function(b){b.addEventListener('click',function(){mode(b.dataset.mode)})});
tool.querySelectorAll('#cfObPreset button').forEach(function(b){b.addEventListener('click',function(){if(S.mode!=='obfuscate')return;b.dataset.preset==='custom'?customPreset():applyPreset(b.dataset.preset)})});
tool.querySelectorAll('[data-tech]').forEach(function(x){x.addEventListener('change',function(){if(S.mode!=='obfuscate')return;customPreset();if(x.dataset.tech==='domain'){E.domain.disabled=!x.checked;if(!x.checked)E.domain.classList.remove('cfObFieldError')}updateTechSummary()})});
if(E.domain)E.domain.addEventListener('input',function(){if(this.value.trim())this.classList.remove('cfObFieldError');updateTechSummary()});
E.input.addEventListener('input',function(){analyze();if(S.mode==='deobfuscate')_h1(E.input.value)});
if(E.passEnable)E.passEnable.addEventListener('change',function(){E.passBox.classList.toggle('active',this.checked);if(!this.checked){E.pass.classList.remove('cfObFieldError');E.pass2.classList.remove('cfObFieldError')}});
[E.pass,E.pass2].forEach(function(el){if(el)el.addEventListener('input',function(){if(this.value.trim())this.classList.remove('cfObFieldError')})});
tool.querySelectorAll('.cfObPassEye').forEach(function(b){b.addEventListener('click',function(){var i=b.parentNode.querySelector('input'),show=i.type==='password';i.type=show?'text':'password';b.querySelector('i').className=show?'fa fa-eye-slash':'fa fa-eye'})});
E.paste.addEventListener('click',async function(){try{E.input.value=await navigator.clipboard.readText();analyze();say('PASTED')}catch(e){E.input.focus();say('USE CTRL+V')}});
E.clear.addEventListener('click',function(){
_lockFullNormalize();E.input.value='';S.normalizeFinal=false;S.layerIndex=0;S.layerHistory=[];S.normalizedBase='';S.normalizeBusy=false;S.bloggerMode=false;S.integrity={};S.normalizePassed=false;S.injectCompleted=false;S.tableCache={};S.originalSource='';S.originalRawSource='';S.injectSource='';S.injectTarget=null;S.dependencySnapshot=null;S.lastSafeOutput='';S.deobfuscateReady=false;if(E.normalizePanel)E.normalizePanel.classList.remove('is-final');if(E.normalizeState)E.normalizeState.textContent='Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.';if(E.normalize)E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';setOutput('','','READY');updateLayerPanel('','WAITING');if(E.deobSupport)E.deobSupport.querySelectorAll('.cfObDeobMethod').forEach(function(el){el.classList.remove('is-detected')});if(E.normalizeFull)E.normalizeFull.disabled=true;analyze();say('CLEARED')});
E.copy.addEventListener('click',async function(){
if(!E.output.value)return;
try{
await navigator.clipboard.writeText(E.output.value)
}catch(e){
E.output.select();
document.execCommand('copy')
}
say('COPIED');
E.copy.classList.add('is-copied');
E.copy.setAttribute('data-copy-state','copied');
var oldHTML=E.copy.innerHTML;
if(!E.copy.dataset.copyOriginal)E.copy.dataset.copyOriginal=oldHTML;
E.copy.innerHTML='<i class="fa fa-check"></i> COPIED';
clearTimeout(S.copyFeedbackTimer);
S.copyFeedbackTimer=setTimeout(function(){
E.copy.classList.remove('is-copied');
E.copy.removeAttribute('data-copy-state');
if(E.copy.dataset.copyOriginal)E.copy.innerHTML=E.copy.dataset.copyOriginal
},1800)
});

async function _processLargeTargetBatch(){
var blocks=(S.markerBlocks||[]).slice();
if(!blocks.length)throw new Error('LARGE SOURCE MODE - SUPPORTED OBFUSCATED TARGET NOT FOUND');

S.batchReplacements=[];
var preview=[];

for(var i=0;i<blocks.length;i++){
var b=blocks[i],transformed=b.original;

say('COLLECTED TARGET '+(i+1)+'/'+blocks.length+' - '+b.id);
setProgress(14+Math.round((i/blocks.length)*60));
await _ui();

try{
transformed=await _a6(b.original);

/* A second readability pass catches classic _0x tables exposed by the first pass. */
var readable=_readabilityPass(transformed);
if(_syntaxValid(readable))transformed=readable;

var staticClean=_strongStaticResolve(transformed);
if(_syntaxValid(staticClean))transformed=staticClean;

/* Humanize known deterministic patterns immediately after decode. */
var humanClean=_advancedSemanticHumanize(transformed);
if(_syntaxValid(humanClean))transformed=humanClean;

/* Static tables may become removable after semantic cleanup. */
staticClean=_strongStaticResolve(transformed);
if(_syntaxValid(staticClean))transformed=staticClean;

transformed=_protectHtmlRawTextEndTags(transformed);
if(!_syntaxValid(transformed))throw new Error(b.id+' SYNTAX CHECK FAILED');

b.processed=transformed;
b.skipped=false;
preview.push('/* ===== '+b.id+' ===== */\n'+transformed+'\n/* ===== /'+b.id+' ===== */');
say(b.id+' COMPLETE')
}catch(err){
b.processed=b.original;
b.skipped=true;
b.error=String(err&&err.message||err);
preview.push('/* ===== '+b.id+' ===== */\n'+b.original+'\n/* ===== /'+b.id+' ===== */');
say(b.id+' PRESERVED - '+b.error)
}
await _ui()
}

S.markerBlocks=blocks;
S.batchReplacements=blocks.map(function(b){
return{id:b.id,code:b.processed,skipped:!!b.skipped}
});
return preview.join('\n\n')
}

function _buildBatchInjectedSource(){
if(!S.markerCollectionReady||!S.markerSource)return'';

var map={};

for(var i=0;i<S.markerBlocks.length;i++){
var b=S.markerBlocks[i];
var body=typeof b.processed==='string'?b.processed:b.original;
body=_protectHtmlRawTextEndTags(String(body||'').trim());

if(!body)throw new Error('MARKER BLOCK EMPTY - '+b.id);
if(!_syntaxValid(body))throw new Error('MARKER BLOCK INVALID - '+b.id);

map[b.id]=body
}

var out=_restoreMarkerSource(S.markerSource,map);

/* Hard guard: no temporary marker is allowed to survive injection. */
if(/\/\*__CF_OBF_BLOCK_\d{3}__\*\//.test(out)){
throw new Error('MARKER RESTORE INCOMPLETE')
}
return out
}

function _markerDependencyPayload(){
if(!S.markerBlocks||!S.markerBlocks.length)return'';
return S.markerBlocks.map(function(b){
return typeof b.processed==='string'?b.processed:b.original
}).join('\n;\n')
}


if(E.copyScript)E.copyScript.addEventListener('click',async function(){
if(S.injectCompleted){
say('INJECT ALREADY COMPLETE - READY TO COPY');
if(E.resultStatus)E.resultStatus.textContent='READY TO COPY';
_injectButtonState();
return
}
if(S.mode==='deobfuscate'&&!S.normalizePassed){
say('INJECT LOCKED - RUN NORMALIZE FIRST');
return
}
if(S.mode==='tools')return;

E.copyScript.disabled=true;
if(E.resultStatus)E.resultStatus.textContent='INJECTING...';
setProgress(10);
say('INJECTING NORMALIZED DATA...');
await _ui();

try{
/* ADD TAG SCRIPT is isolated from marker/source injection. */
if(S.mode==='obfuscate'){
var tagPayload=String(E.output&&E.output.value||'');
if(!tagPayload.trim())throw new Error('OBFUSCATED OUTPUT EMPTY');
var tagged;
if(/^\s*<script\b/i.test(tagPayload)&&/<\/script\s*>\s*$/i.test(tagPayload)){
tagged=tagPayload
}else{
var tagBody=_stripScriptWrapper(tagPayload).trim();
var hasCDATA=/\/\/\s*<!\[CDATA\[/.test(tagBody)&&/\/\/\s*\]\]>/.test(tagBody);
if(hasCDATA){
tagged="<script type='text/javascript'>"+tagBody+"</script>"
}else{
tagBody=_stripCDATADeep(tagBody).trim();
tagged="<script type='text/javascript'>//<![CDATA[\n"+tagBody+"\n//]]></script>"
}
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
function b64dec(s){var bin=atob(s),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new TextDecoder().decode(u)}
function sha256(s){if(!crypto||!crypto.subtle)throw new Error('SHA-256 NOT SUPPORTED');var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}
g.CFDeobfuscatorEngine=Object.freeze({
_a3:_a3,_a4:_a4,_b4:_b4,_b7:_b7,_a7:_a7,_a8:_a8,_h1:_h1,_stripCDATADeep:_stripCDATADeep,_stripScriptWrapper:_stripScriptWrapper,b64dec:b64dec,sha256:sha256
});
})(window);
