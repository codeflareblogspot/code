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
input:$('cfObInput'),inputLabel:$('cfObInputLabel'),output:$('cfObOutput'),
process:$('cfObProcess'),copy:$('cfObCopy'),copyScript:$('cfObCopyScript'),
paste:$('cfObPaste'),clear:$('cfObClear'),tools:$('cfObCodeTools'),
passBox:$('cfObPasswordOption'),passEnable:$('cfObPasswordEnable'),
pass:$('cfObPassword'),pass2:$('cfObPasswordConfirm'),
accessBox:$('cfObPasswordAccess'),access:$('cfObAccessPassword'),
normalizePanel:$('cfObNormalizePanel'),normalizeFull:$('cfObNormalizeFull'),injectFull:$('cfObInjectFull'),
normalizeReset:$('cfObNormalizeReset'),normalizeState:$('cfObNormalizeState'),
normalizeBeautify:$('cfObNormalizeBeautify'),normalizeFlush:$('cfObNormalizeFlush'),
layerSection:$('cfObLayerSection'),layerStatus:$('cfObLayerStatus'),
layerCurrent:$('cfObLayerCurrent'),layerDetected:$('cfObLayerDetected'),
layerRemaining:$('cfObLayerRemaining'),layerResult:$('cfObLayerResult'),
layerList:$('cfObLayerList'),deobSupport:$('cfObDeobSupport'),
outTitle:$('cfObOutputTitle'),outCount:$('cfObOutputCount'),
message:$('cfObMessage'),status:$('cfObStatus'),progress:$('cfObProgressBar'),
original:$('cfObOriginalSize'),resultSize:$('cfObResultSize'),
sizeChange:$('cfObSizeChange'),resultStatus:$('cfObResultStatus'),
techBox:$('cfObOptions'),techState:$('cfObTechState'),domain:$('cfObDomain'),
protection:$('cfObProtectionLevel'),runtime:$('cfObRuntimeImpact'),
growth:$('cfObGrowthImpact'),selected:$('cfObSelectedTech')
};

var S={mode:'obfuscate',parserFormat:'beautify',theme:'auto',preset:'balanced',
normalizeFinal:false,normalizeFormat:'beautify',layerIndex:0,layerHistory:[],originalSource:'',originalRawSource:'',normalizedBase:'',normalizeBusy:false,tableCache:{}};

var presets={
light:{rename:1,array:1,encode:1,shuffle:0,rotate:0,split:0,numbers:0,objectKeys:0,controlFlow:0,dead:0,debug:0,selfDefend:0,compact:1,debugLog:0,domain:0},
balanced:{rename:1,array:1,encode:1,shuffle:1,rotate:1,split:1,numbers:1,objectKeys:0,controlFlow:0,dead:0,debug:0,selfDefend:0,compact:1,debugLog:0,domain:0},
strong:{rename:1,array:1,encode:1,shuffle:1,rotate:1,split:1,numbers:1,objectKeys:1,controlFlow:1,dead:1,debug:1,selfDefend:1,compact:1,debugLog:0,domain:0}
};

function say(t){if(E.message)E.message.textContent=t;if(E.status)E.status.innerHTML='<i></i> '+t}
function kb(s){return(new Blob([String(s||'')]).size/1024).toFixed(2)+' KB'}
function _copyScriptState(){
if(!E.copyScript)return;
var inject=!!(E.injectFull&&E.injectFull.checked);
E.copyScript.disabled=inject;
E.copyScript.setAttribute('aria-disabled',inject?'true':'false');
E.copyScript.title=inject?'Disabled when Source Inject is active':'Copy output with <script> tag';
}

function setProgress(n){if(E.progress)E.progress.style.width=Math.max(0,Math.min(100,n))+'%'}

function _ui(){return new Promise(function(resolve){if(typeof requestAnimationFrame==='function')requestAnimationFrame(function(){resolve()});else setTimeout(resolve,0)})}
function _busy(on,msg){
S.normalizeBusy=!!on;
if(E.normalizeFull)E.normalizeFull.disabled=!!on||S.normalizeFinal||!(S.mode==='deobfuscate'&&E.output.value);
if(E.normalizePanel)E.normalizePanel.classList.toggle('is-processing',!!on);
if(msg)say(msg)
}

function setOutput(v,title,status){
v=String(v||'');E.output.value=v;
if(E.outCount)E.outCount.textContent=v.length.toLocaleString()+' CHAR';
if(title&&E.outTitle)E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> '+title;
if(E.original)E.original.textContent=kb(E.input.value);
if(E.resultSize)E.resultSize.textContent=kb(v);
var a=new Blob([E.input.value]).size||1,b=new Blob([v]).size;
if(E.sizeChange)E.sizeChange.textContent=((b-a)/a*100).toFixed(1)+'%';
if(E.resultStatus)E.resultStatus.textContent=status||'READY';
if(E.normalizeFull)E.normalizeFull.disabled=S.normalizeBusy||S.normalizeFinal||!(S.mode==='deobfuscate'&&v);
}
function escHTML(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function unescHTML(s){var ta=document.createElement('textarea');ta.innerHTML=String(s);return ta.value}
function stripComments(s){
var out='',i=0,q=null,esc=false,line=false,block=false;
while(i<s.length){var c=s[i],n=s[i+1];
if(line){if(c==='\n'){line=false;out+=c}i++;continue}
if(block){if(c==='*'&&n==='/'){block=false;i+=2}else i++;continue}
if(q){out+=c;if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;i++;continue}
if(c==='"'||c==="'"||c==='`'){q=c;out+=c;i++;continue}
if(c==='/'&&n==='/'){line=true;i+=2;continue}
if(c==='/'&&n==='*'){block=true;i+=2;continue}
out+=c;i++}
return out
}
function minify(s){return stripComments(String(s)).replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n[ \t]+/g,'\n').replace(/\n{2,}/g,'\n').replace(/\s*([{};,=:])\s*/g,'$1').trim()}
function beautify(s){
s=String(s||'').replace(/\r\n?/g,'\n').replace(/\t/g,'  ');
var out='',ind=0,q=null,esc=false,lineComment=false,blockComment=false;
var par=0,br=0,i=0,lineStart=true,pendingSpace=false;

function pad(){return'  '.repeat(Math.max(0,ind))}
function trimEnd(){out=out.replace(/[ ]+$/,'')}
function nl(){
trimEnd();
if(!out.endsWith('\n'))out+='\n';
lineStart=true;
pendingSpace=false
}
function write(x){
if(lineStart){out+=pad();lineStart=false}
if(pendingSpace&&out&&!/[ \n]$/.test(out)&&x!==';'&&x!==','&&x!==')'&&x!==']')out+=' ';
pendingSpace=false;
out+=x
}

for(;i<s.length;i++){
var c=s[i],n=s[i+1]||'';

if(lineComment){
write(c);
if(c==='\n'){lineComment=false;lineStart=true}
continue
}
if(blockComment){
write(c);
if(c==='*'&&n==='/'){write('/');i++;blockComment=false}
continue
}
if(q){
write(c);
if(esc)esc=false;
else if(c==='\\')esc=true;
else if(c===q)q=null;
continue
}

if(c==='/'&&n==='/'){write('//');i++;lineComment=true;continue}
if(c==='/'&&n==='*'){write('/*');i++;blockComment=true;continue}
if(c==='"'||c==="'"||c==='`'){write(c);q=c;continue}

if(/\s/.test(c)){pendingSpace=true;continue}

if(c==='('){write(c);par++;continue}
if(c===')'){write(c);par=Math.max(0,par-1);continue}
if(c==='['){write(c);br++;continue}
if(c===']'){write(c);br=Math.max(0,br-1);continue}

if(c==='{'){
if(!lineStart&&out&&!/[ \n]$/.test(out))out+=' ';
write('{');
ind++;
nl();
continue
}

if(c==='}'){
trimEnd();
if(!lineStart)nl();
ind=Math.max(0,ind-1);
write('}');
var tail=s.slice(i+1).match(/^\s*(else\b|catch\b|finally\b|while\s*\()/);
if(tail){out+=' ';continue}
var next=s.slice(i+1).match(/^\s*([;,)\]])/);
if(!next)nl();
continue
}

/* Semicolon is a safe line break only outside (), [].
This prevents for(;;), function arguments and chained expressions being split. */
if(c===';'){
write(';');
if(par===0&&br===0)nl();
continue
}

/* Commas stay inline. Breaking on comma was the main cause of disconnected code. */
if(c===','){write(',');pendingSpace=true;continue}

/* Never force a newline around operators, ternaries, object properties or chains. */
write(c)
}

trimEnd();
return out
.replace(/[ ]+\n/g,'\n')
.replace(/\n{3,}/g,'\n\n')
.replace(/^\s*\n/,'')
.replace(/\n\s*$/,'')
}
function _b6(s){
return String(s||'')
.replace(/\r\n?/g,'\n')
.replace(/\t/g,'  ')
.replace(/^[ ]+/gm,'')
.replace(/[ ]+$/gm,'')
.replace(/\n{3,}/g,'\n\n')
.trim()
}
function _a5(s){
s=String(s);var prev='',passes=0;
_p1(s);
for(;passes<12&&s!==prev;passes++){
prev=s;
s=_p2(s);
s=_d2(s);
s=_b2(s);
s=_b1(s);
s=_p2(s);
s=_d2(s);
s=_b2(s);
s=_b4(s);
s=_p4(s);
s=_b5(s)
}
s=_p2(s);
s=_b3(s);
s=_p4(s);
s=_b5(s);
s=_p3(s);
return S.normalizeFormat==='flush'?_b6(s):beautify(s)
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
if(E.normalizeFull)E.normalizeFull.disabled=S.normalizeBusy||!!on||!(S.mode==='deobfuscate'&&E.output.value)
}

async function _a6(src){
S.originalSource=extractJS(src);
src=S.originalSource;
S.tableCache={};
_p1(src);
var cf=await _a4(src);if(cf!==null)return beautify(cf);
src=_p2(src);
src=_d2(src);
var out=_b1(src);
out=_p2(out);
out=_b4(out);
out=_d2(out);
out=_b2(out);
out=_p4(out);
return beautify(out)
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
if(E.normalizeFull)E.normalizeFull.disabled=S.normalizeFinal||!(m==='deobfuscate'&&E.output.value);if(m==='deobfuscate')_h1(E.input.value);else if(E.deobSupport)E.deobSupport.querySelectorAll('.cfObDeobMethod').forEach(function(el){el.classList.remove('is-detected')});
if(m!=='deobfuscate'&&E.normalizePanel)E.normalizePanel.classList.remove('is-final');
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
E.clear.addEventListener('click',function(){E.input.value='';S.normalizeFinal=false;S.layerIndex=0;S.layerHistory=[];S.normalizedBase='';S.normalizeBusy=false;S.tableCache={};S.originalSource='';S.originalRawSource='';if(E.injectFull)E.injectFull.checked=false;_copyScriptState();if(E.normalizePanel)E.normalizePanel.classList.remove('is-final');if(E.normalizeState)E.normalizeState.textContent='Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.';if(E.normalize)E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';setOutput('','','READY');updateLayerPanel('','WAITING');if(E.deobSupport)E.deobSupport.querySelectorAll('.cfObDeobMethod').forEach(function(el){el.classList.remove('is-detected')});if(E.normalizeFull)E.normalizeFull.disabled=true;analyze();say('CLEARED')});
E.copy.addEventListener('click',async function(){if(!E.output.value)return;try{await navigator.clipboard.writeText(E.output.value);say('COPIED')}catch(e){E.output.select();document.execCommand('copy');say('COPIED')}});
if(E.copyScript)E.copyScript.addEventListener('click',async function(){
if(E.injectFull&&E.injectFull.checked){_copyScriptState();say('COPY <SCRIPT> DISABLED - SOURCE INJECT ACTIVE');return}if(!E.output.value)return;var code=E.output.value.replace(/^\s*<script\b[^>]*>/i,'').replace(/<\/script\s*>\s*$/i,'').trim(),wrapped='<script>\n'+code+'\n<\/script>';try{await navigator.clipboard.writeText(wrapped);say('SCRIPT TAG COPIED')}catch(e){var ta=document.createElement('textarea');ta.value=wrapped;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);say('SCRIPT TAG COPIED')}});

E.process.addEventListener('click',async function(){
var src=E.input.value;if(!src.trim()){say('INPUT EMPTY');E.input.focus();return}
setProgress(20);E.process.disabled=true;
try{
var out;
if(S.mode==='obfuscate'){out=await _a2(src);setOutput(out,'ENCRYPTION CODE OUTPUT','SUCCESS')}
else{_h1(src);out=await _a6(src);S.layerIndex=0;S.layerHistory=[];setNormalizeFinal(false,'Deobfuscation selesai - NORMALIZE OUTPUT untuk membuka dan merapikan layer berikutnya.');setOutput(out,'DEOBFUSCATION CODE OUTPUT','SUCCESS');updateLayerPanel(out,'ANALYZED')}
setProgress(100);say('SUCCESS')
}catch(e){say(e.message||'PROCESS ERROR');if(E.resultStatus)E.resultStatus.textContent='ERROR'}
finally{E.process.disabled=false;setTimeout(function(){setProgress(0)},500)}
});

function _flowCheck(js){
js=String(js||'');
var raw=js.replace(/<script\b[^>]*>/gi,'').replace(/<\/script\s*>/gi,'');
var issues=[],stack=[],q=null,esc=false,line=false,block=false,i=0;
for(;i<raw.length;i++){
var c=raw[i],n=raw[i+1]||'';
if(line){if(c==='\n')line=false;continue}
if(block){if(c==='*'&&n==='/'){block=false;i++}continue}
if(q){if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;continue}
if(c==='/'&&n==='/'){line=true;i++;continue}
if(c==='/'&&n==='*'){block=true;i++;continue}
if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c==='('||c==='['||c==='{')stack.push({c:c,p:i});
else if(c===')'||c===']'||c==='}'){
var need=c===')'?'(':c===']'?'[':'{',last=stack.pop();
if(!last||last.c!==need)issues.push('UNMATCHED '+c+' @ '+i)
}
}
if(q)issues.push('UNCLOSED STRING / TEMPLATE');
if(block)issues.push('UNCLOSED BLOCK COMMENT');
while(stack.length){var x=stack.pop();issues.push('UNCLOSED '+x.c+' @ '+x.p)}
try{new Function(raw)}catch(e){issues.push('SYNTAX: '+String(e&&e.message||e))}
var lines=raw.split('\n');
lines.forEach(function(line,idx){
var s=line.trim();
if(!s)return;
if(/^[.+*/%?:]|^(?:&&|\|\|)/.test(s))issues.push('SUSPICIOUS LINE START @ '+(idx+1));
if(/[=+\-*/%?:.,&|]\s*$/.test(s)&&!/^[ \t]*\/\//.test(s))issues.push('SUSPICIOUS LINE END @ '+(idx+1))
});
return{ok:issues.length===0,issues:Array.from(new Set(issues)).slice(0,12)}
}

function _syntaxSafe(js){
js=String(js||'');
if(/<\/?script\b/i.test(js))return true;
try{new Function(js);return true}catch(e){return false}
}

function _renderNormalizeOutput(){
if(S.mode!=='deobfuscate')return;
var base=String(S.normalizedBase||E.output.value||'');
if(!base)return;
var formatted=S.normalizeFormat==='flush'?_b6(base):beautify(base);
formatted=formatted.replace(/\t/g,'  ').replace(/[ \t]+$/gm,'');
if(S.normalizeFormat==='beautify'&&!_syntaxSafe(formatted)&&_syntaxSafe(base)){
formatted=String(base).replace(/\t/g,'  ').replace(/[ \t]+$/gm,'');
say('BEAUTIFY SAFETY FALLBACK - ORIGINAL NORMALIZED STRUCTURE KEPT')
}
var flow=_flowCheck(formatted);
if(!flow.ok){
if(_flowCheck(base).ok){
formatted=String(base).replace(/\t/g,'  ').replace(/[ \t]+$/gm,'');
say('FLOW SAFETY FALLBACK - POSSIBLE BROKEN SCRIPT PATH DETECTED')
}else{
say('FINAL CHECK WARNING - '+flow.issues[0])
}
}else if(S.normalizeFinal){
say('FINAL SCRIPT CHECK PASSED - NO BROKEN PATH DETECTED')
}
var injected=E.injectFull&&E.injectFull.checked&&S.normalizeFinal;
if(injected){
try{formatted=_j1(formatted)}catch(_e){injected=false}
}
setOutput(formatted,injected?'INJECTED SOURCE OUTPUT':'HUMAN READABLE CODE OUTPUT',S.normalizeFinal?'FINAL LAYER':'NORMALIZED');
if(S.normalizeFinal&&E.resultStatus)E.resultStatus.textContent='FINAL LAYER'
}

if(E.normalizeBeautify)E.normalizeBeautify.addEventListener('change',function(){
if(this.checked){
if(E.normalizeFlush)E.normalizeFlush.checked=false;
S.normalizeFormat='beautify';
_renderNormalizeOutput()
}else if(!E.normalizeFlush||!E.normalizeFlush.checked){
this.checked=true;
S.normalizeFormat='beautify'
}
});

if(E.normalizeFlush)E.normalizeFlush.addEventListener('change',function(){
if(this.checked){
if(E.normalizeBeautify)E.normalizeBeautify.checked=false;
S.normalizeFormat='flush';
_renderNormalizeOutput()
}else if(!E.normalizeBeautify||!E.normalizeBeautify.checked){
this.checked=true;
S.normalizeFormat='flush'
}
});

function _j1(normalized){
var raw=String(S.originalRawSource||E.input.value||'');
var js=String(S.originalSource||extractJS(raw)||'');
normalized=String(normalized||'');

if(!raw)return normalized;

/* If original input was a single script wrapper, preserve the wrapper only. */
var single=raw.match(/^\s*(<script\b[^>]*>)([\s\S]*?)(<\/script\s*>)\s*$/i);
if(single){
return single[1]+'\n'+normalized+'\n'+single[3];
}

/* If input contains mixed HTML/CSS and inline script tags, replace only the
largest inline script body without touching the DOM or executing anything. */
var matches=[],re=/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,m;
while((m=re.exec(raw))){
matches.push({full:m[0],body:m[1],index:m.index});
}
if(matches.length){
var target=matches.reduce(function(a,b){return b.body.length>a.body.length?b:a},matches[0]);
var open=target.full.match(/^<script\b[^>]*>/i);
var close=target.full.match(/<\/script\s*>$/i);
if(open&&close){
var rebuilt=open[0]+'\n'+normalized+'\n'+close[0];
return raw.slice(0,target.index)+rebuilt+raw.slice(target.index+target.full.length);
}
}

/* Plain JavaScript input: injected result is simply the normalized JS. */
return normalized;
}

if(E.injectFull)E.injectFull.addEventListener('change',function(){
_copyScriptState();
say(this.checked?'SOURCE INJECT ENABLED - COPY <SCRIPT> DISABLED':'SOURCE INJECT DISABLED - COPY <SCRIPT> ENABLED');
if(S.normalizedBase)_renderNormalizeOutput()
});
if(E.normalizeFull)E.normalizeFull.addEventListener('click',async function(){
if(S.mode!=='deobfuscate'||!E.output.value||S.normalizeFinal||S.normalizeBusy)return;
var out=String(S.normalizedBase||E.output.value),guard=0,maxPass=16;
_busy(true,'FULL NORMALIZE - PREPARING');
setProgress(4);
if(E.resultStatus)E.resultStatus.textContent='PROCESSING';
if(E.normalizeState)E.normalizeState.textContent='Sedang menganalisis dan membuka layer. Jangan tutup halaman sampai proses selesai.';
await _ui();

try{
while(guard<maxPass){
var before=out,layers=_a7(before);
say('NORMALIZING LAYER '+(guard+1)+' / '+maxPass);
if(E.normalizeState)E.normalizeState.textContent='Processing layer '+(guard+1)+' dari maksimal '+maxPass+'...';
setProgress(8+Math.round((guard/maxPass)*82));
await _ui();

out=_a5(before);
var changed=out.trim()!==before.trim();

S.layerIndex++;
S.layerHistory.push({
name:layers.length?layers[0]:'NORMALIZE / BEAUTIFY',
status:changed?'RESOLVED':'NO CHANGE'
});
updateLayerPanel(out,changed?'RESOLVED':'NO CHANGE');

setProgress(8+Math.round(((guard+1)/maxPass)*82));
await _ui();

guard++;
if(!changed||!_a8(out))break;
}

S.normalizedBase=String(out);
var finalFlow=_flowCheck(S.normalizedBase);
if(!finalFlow.ok){
if(E.resultStatus)E.resultStatus.textContent='CHECK WARNING';
if(E.normalizeState)E.normalizeState.textContent='Final check menemukan kemungkinan jalur script terputus: '+finalFlow.issues[0];
say('FINAL CHECK WARNING - '+finalFlow.issues[0])
}
S.normalizeFinal=true;
setProgress(94);
say('FORMATTING FINAL OUTPUT');
if(E.normalizeState)E.normalizeState.textContent='Merapikan hasil akhir sesuai pilihan format...';
await _ui();

_renderNormalizeOutput();

setProgress(100);
updateLayerPanel(S.normalizedBase,'FINAL LAYER');
setNormalizeFinal(true,E.injectFull&&E.injectFull.checked?'FULL NORMALIZE + INJECT COMPLETE - Hasil source siap digunakan.':'FULL NORMALIZE COMPLETE - Semua layer yang dikenali sudah diproses.');
if(E.resultStatus)E.resultStatus.textContent='FINAL LAYER';
say(E.injectFull&&E.injectFull.checked?'FULL NORMALIZE + INJECT COMPLETE':'FULL NORMALIZE COMPLETE');

await _ui();
setTimeout(function(){setProgress(0)},700)
}catch(err){
if(E.resultStatus)E.resultStatus.textContent='ERROR';
if(E.normalizeState)E.normalizeState.textContent='Normalize gagal pada layer aktif. Hasil terakhir yang aman tetap dipertahankan.';
say(err&&err.message?err.message:'NORMALIZE ERROR');
setTimeout(function(){setProgress(0)},700)
}finally{
_busy(false)
}
});

if(E.normalizeReset)E.normalizeReset.addEventListener('click',function(){
S.normalizeFinal=false;S.normalizeFormat='beautify';S.layerIndex=0;S.layerHistory=[];S.normalizedBase='';S.normalizeBusy=false;S.tableCache={};S.originalSource='';S.originalRawSource='';if(E.injectFull)E.injectFull.checked=false;_copyScriptState();
if(E.normalizeBeautify)E.normalizeBeautify.checked=true;if(E.normalizeFlush)E.normalizeFlush.checked=false;
E.input.value='';setOutput('','','READY');if(E.access)E.access.value='';if(E.accessBox)E.accessBox.style.display='none';
if(E.normalizePanel)E.normalizePanel.classList.remove('is-final');if(E.normalizeState)E.normalizeState.textContent='Reset selesai. Paste kode baru lalu jalankan DEOBFUSCATE.';
if(E.normalizeFull)E.normalizeFull.disabled=true;if(E.deobSupport)E.deobSupport.querySelectorAll('.cfObDeobMethod').forEach(function(el){el.classList.remove('is-detected')});
updateLayerPanel('','WAITING');analyze();E.input.focus();say('READY FOR NEW CODE')
});

tool.querySelectorAll('.cfObToolCard').forEach(function(b){b.addEventListener('click',function(){
var src=E.input.value;if(!src.trim()){say('INPUT EMPTY');E.input.focus();return}
var a=b.dataset.action,r='';if(a==='beautify')r=beautify(src);if(a==='minify')r=minify(src);if(a==='bloggerParse')r=bloggerParse(src);if(a==='bloggerUnparse')r=bloggerUnparse(src);
setOutput(r,a==='beautify'?'BEAUTIFIED CODE OUTPUT':a==='minify'?'MINIFIED CODE OUTPUT':a==='bloggerParse'?'BLOGGER PARSED OUTPUT':'BLOGGER UNPARSED OUTPUT','SUCCESS');say('SUCCESS')
})});
tool.querySelectorAll('.cfObParserToggle button').forEach(function(b){b.addEventListener('click',function(){tool.querySelectorAll('.cfObParserToggle button').forEach(function(x){x.classList.remove('active')});b.classList.add('active');S.parserFormat=b.dataset.format||'beautify'})});
var themeBtns=tool.querySelectorAll('.cfObThemeBtn');
function theme(t){S.theme=t;tool.dataset.theme=t;themeBtns.forEach(function(b){b.classList.toggle('active',b.dataset.theme===t)});try{localStorage.setItem('cfObTheme',t)}catch(e){}}
themeBtns.forEach(function(b){b.addEventListener('click',function(){theme(b.dataset.theme)})});
try{theme(localStorage.getItem('cfObTheme')||'auto')}catch(e){theme('auto')}

applyPreset('balanced');mode('obfuscate');analyze();
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',cfGeneratorInit,{once:true})}
else{cfGeneratorInit()}
_copyScriptState();
})();
