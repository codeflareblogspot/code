(function(){
function cfGeneratorInit(){
'use strict';
var CF_JS_LAB_VERSION='v2.18';
(function(){
var st=document.createElement('style');
st.id='cfObCopyFeedbackStyle';
st.textContent=
'#cfObTool .is-copied{background:#16a34a!important;border-color:#16a34a!important;color:#fff!important;box-shadow:0 0 0 3px rgba(22,163,74,.16)!important;transform:translateY(-1px)}'+
'#cfObTool .is-copied i{color:#fff!important}';
if(!document.getElementById(st.id))document.head.appendChild(st)
})();

function _z(a){return String.fromCharCode.apply(null,a)}
var tool=document.getElementById('cfObTool'),warning=document.getElementById('cfObExternalWarning');
if(!tool)return;

var PATH=_z([47,50,48,50,54,47,48,56,47,103,101,110,101,114,97,116,111,114,45,106,97,118,97,115,99,114,105,112,116,45,111,98,102,117,115,99,97,116,101,45,101,110,99,114,121,112,116,105,111,110,46,104,116,109,108]);
var host=(location.hostname||'').toLowerCase(),path=location.pathname||'';
var local=/^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(host)||location.protocol==='file:';
var allowed=local
||((host===_z([99,111,100,101,102,108,97,114,101,46,110,101,116])||host===_z([119,119,119,46,99,111,100,101,102,108,97,114,101,46,110,101,116]))&&path===PATH)
||((host===_z([99,111,100,101,102,108,97,114,101,46,109,121,46,105,100])||host===_z([119,119,119,46,99,111,100,101,102,108,97,114,101,46,109,121,46,105,100]))&&path===_z([47,50,48,50,54,47,48,56,47,116,101,115,116,45,97,114,116,105,107,101,108,46,104,116,109,108]));
if(!allowed){tool.style.display='none';if(warning)warning.style.display='flex';return}

function $(id){return document.getElementById(id)}
function _renderEngineVersion(){
var candidates=[
document.getElementById('cfObTitle'),
document.getElementById('cfObBrand'),
document.querySelector('#cfObTool .cfObTitle'),
document.querySelector('#cfObTool .cfObBrand'),
document.querySelector('#cfObTool [data-cf-js-lab-title]')
];
var el=null;
for(var i=0;i<candidates.length;i++){
if(candidates[i]&&/CODEFLARE\s+JS\s+LAB/i.test(candidates[i].textContent||'')){el=candidates[i];break}
}
if(!el){
var nodes=document.querySelectorAll('#cfObTool h1,#cfObTool h2,#cfObTool h3,#cfObTool strong,#cfObTool b,#cfObTool span,#cfObTool div');
for(var j=0;j<nodes.length;j++){
if(/^\s*CODEFLARE\s+JS\s+LAB(?:\s*[-—|]\s*ENGINE\s+v[\d.]+)?\s*$/i.test(nodes[j].textContent||'')){
el=nodes[j];break
}
}
}
if(!el)return;
var base=(el.textContent||'').replace(/\s*[-—|]\s*ENGINE\s+v[\d.]+\s*$/i,'').trim();
el.textContent=base+' — ENGINE '+CF_JS_LAB_VERSION;
el.setAttribute('data-engine-version',CF_JS_LAB_VERSION)
}

var E={
input:$('cfObInput'),inputLabel:$('cfObInputLabel'),output:$('cfObOutput'),
process:$('cfObProcess'),copy:$('cfObCopy'),copyScript:$('cfObCopyScript'),
paste:$('cfObPaste'),clear:$('cfObClear'),tools:$('cfObCodeTools'),
passBox:$('cfObPasswordOption'),passEnable:$('cfObPasswordEnable'),
pass:$('cfObPassword'),pass2:$('cfObPasswordConfirm'),
accessBox:$('cfObPasswordAccess'),access:$('cfObAccessPassword'),
normalizePanel:$('cfObNormalizePanel'),normalizeFull:$('cfObNormalizeFull'),
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
normalizeFinal:false,normalizeFormat:'beautify',layerIndex:0,layerHistory:[],originalSource:'',originalRawSource:'',injectSource:'',normalizedBase:'',lastSafeOutput:'',deobfuscateReady:false,normalizeBusy:false,bloggerMode:false,integrity:{},tableCache:{},normalizePassed:false,injectCompleted:false,injectTarget:null};

var presets={
light:{rename:1,array:1,encode:1,shuffle:0,rotate:0,split:0,numbers:0,objectKeys:0,controlFlow:0,dead:0,debug:0,selfDefend:0,compact:1,debugLog:0,domain:0},
balanced:{rename:1,array:1,encode:1,shuffle:1,rotate:1,split:1,numbers:1,objectKeys:0,controlFlow:0,dead:0,debug:0,selfDefend:0,compact:1,debugLog:0,domain:0},
strong:{rename:1,array:1,encode:1,shuffle:1,rotate:1,split:1,numbers:1,objectKeys:1,controlFlow:1,dead:1,debug:1,selfDefend:1,compact:1,debugLog:0,domain:0}
};

function say(t){if(E.message)E.message.textContent=t;if(E.status)E.status.innerHTML='<i></i> '+t}
function kb(s){return(new Blob([String(s||'')]).size/1024).toFixed(2)+' KB'}

function setProgress(n){if(E.progress)E.progress.style.width=Math.max(0,Math.min(100,n))+'%'}

function _ui(){return new Promise(function(resolve){if(typeof requestAnimationFrame==='function')requestAnimationFrame(function(){resolve()});else setTimeout(resolve,0)})}
function _busy(on,msg){
S.normalizeBusy=!!on;
if(E.normalizeFull)E.normalizeFull.disabled=!!on||S.normalizeFinal||!S.deobfuscateReady||!(S.mode==='deobfuscate'&&E.output.value);
if(E.normalizePanel)E.normalizePanel.classList.toggle('is-processing',!!on);
if(msg)say(msg)
}

function _captureInjectSource(src){
src=String(src||'');
if(!src)return;
S.injectSource=src;
S.originalRawSource=src;

/* Cache the replacement coordinates once. Inject itself must stay lightweight. */
S.injectTarget=null;
try{
var t=_findObfuscatorScriptMatch(src);
if(t){
var open=(t.full.match(/^<script\b[^>]*>/i)||['<script>'])[0];
S.injectTarget={
index:t.index,
length:t.full.length,
open:open,
hadCDATA:_hasCDATA(t.body)
}
}
}catch(_e){}
}
function _getInjectSource(){
return String(S.injectSource||S.originalRawSource||'')
}
function _sourceHasScriptWrapper(raw){
return /<script\b[^>]*>[\s\S]*?<\/script\s*>/i.test(String(raw||''))
}
function _pureScriptWrap(js){
js=_stripCDATADeep(String(js||'').trim());
var sem=_conservativeHumanize(js);
js=_scriptElementSafe(sem.code);
if(sem.fixes.length)S.lastSemanticFixes=sem.fixes;
if(sem.warnings.length)S.lastSemanticWarnings=sem.warnings;
return "<script type='text/javascript'>\n"+js+"\n</script>"
}
function _findInjectedScriptBody(source,payload){
source=String(source||'');
payload=_stripCDATADeep(_stripScriptWrapper(String(payload||''))).trim();
if(!source||!payload)return'';

var safePayload=_scriptElementSafe(payload);
var scripts=_extractInlineScripts(source);
var pfx=safePayload.slice(0,Math.min(260,safePayload.length));

for(var i=0;i<scripts.length;i++){
var body=_cleanInjectedBody(scripts[i]).trim();
if(body===safePayload)return body;
if(pfx&&body.indexOf(pfx)===0)return body
}
return''
}

function _injectedSourceReport(source,payload){
var report={syntax:[],flow:[],orphan:[],identifier:[],scope:[],semantic:[],blogger:[],hard:[],warnings:[],ok:true,safe:true};
var body=_findInjectedScriptBody(source,payload);

if(!body){
report.hard.push('INJECTED SCRIPT BODY NOT FOUND');
report.safe=false;report.ok=false;
return report
}

/* Validate only the transformed script that was injected. Pre-existing inline
scripts elsewhere in the page must not block this operation. */
body=_cleanInjectedBody(body);
var probe=_syntaxProbe(body);
if(!probe.ok){
report.syntax.push(probe.message+(probe.line?' @ line '+probe.line+(probe.column?':'+probe.column:''):'')+(probe.context?' | '+probe.context:''))
}

var fc=typeof _flowCheck==='function'?_flowCheck(body):{ok:true,issues:[],warnings:[]};
if(!fc.ok)report.flow=fc.issues.slice(0,10);
if(fc.warnings&&fc.warnings.length)report.scope=(report.scope||[]).concat(fc.warnings.slice(0,5));
var sc=_semanticCheck(body);
if(!sc.ok)report.semantic=sc.issues.slice(0,10);
if(sc.warnings.length)report.scope=(report.scope||[]).concat(sc.warnings.slice(0,8));
report.orphan=_orphanCheck(body);
report.identifier=_identifierCaseCheck(body);
report.scope=_scopeCheck(body);

if(_detectBloggerMode(_getInjectSource())||S.bloggerMode){
report.blogger=_bloggerXMLCheck(source,payload)
}

report.hard=[]
.concat(report.syntax)
.concat(report.flow)
.concat(report.orphan)
.concat(report.semantic||[])
.concat(report.blogger);
report.warnings=[]
.concat(report.identifier)
.concat(report.scope);
report.safe=report.hard.length===0;
report.ok=report.safe&&report.warnings.length===0;
return report
}

function _injectCurrentToSource(current){
current=String(current||'').trim();
var raw=_getInjectSource();
if(!raw)return current;

if(_sourceHasScriptWrapper(raw)){
var built=_j1(current);
if(!built)throw new Error('SOURCE BUILD FAILED - VALID PAYLOAD PRESERVED');
return built
}
return _pureScriptWrap(current)
}

function _lockFullNormalize(){
S.deobfuscateReady=false;
S.normalizeFinal=false;
S.normalizePassed=false;
S.injectCompleted=false;
S.normalizedBase='';
if(E.normalizeFull)E.normalizeFull.disabled=true
}
function _injectButtonState(){
if(!E.copyScript)return;

var hasOutput=!!(E.output&&String(E.output.value||'').trim());
var hasSource=!!_getInjectSource();
var active=false,title='';

if(S.injectCompleted){
active=false;
title='Inject already completed - ready to copy'
}else if(S.mode==='obfuscate'){
active=hasOutput&&hasSource;
title=active?'Inject obfuscated result to source':'Obfuscate source first'
}else if(S.mode==='deobfuscate'){
active=hasOutput&&hasSource&&S.normalizePassed&&!S.normalizeBusy;
title=active?'Inject normalized deobfuscation result to source':'Run FULL NORMALIZE first'
}else{
active=false;
title='Not available in Code Tools mode'
}

E.copyScript.disabled=!active;
E.copyScript.setAttribute('aria-disabled',active?'false':'true');
E.copyScript.tabIndex=active?0:-1;
E.copyScript.title=title;

if(S.injectCompleted){
E.copyScript.classList.add('is-injected')
}else{
E.copyScript.classList.remove('is-injected')
}

if(S.mode==='deobfuscate'&&!S.normalizePassed&&hasOutput&&!S.injectCompleted){
E.copyScript.classList.add('is-locked')
}else{
E.copyScript.classList.remove('is-locked')
}
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
_rememberSafeOutput(v);
if(E.normalizeFull)E.normalizeFull.disabled=S.normalizeBusy||S.normalizeFinal||!S.deobfuscateReady||!(S.mode==='deobfuscate'&&v);
_injectButtonState();
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

function _baScanBlock(src,startPos){
var i=startPos,open=src[i],close=open==='{'?'}':open==='['?']':open==='('?')':null;
if(!close)return null;
var depth=0,q=null,esc=false,line=false,block=false;
for(;i<src.length;i++){
var c=src[i],n=src[i+1]||'';
if(line){if(c==='\n')line=false;continue}
if(block){if(c==='*'&&n==='/'){block=false;i++}continue}
if(q){if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;continue}
if(c==='/'&&n==='/'){line=true;i++;continue}
if(c==='/'&&n==='*'){block=true;i++;continue}
if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c===open)depth++;
else if(c===close){depth--;if(depth===0)return{end:i+1,text:src.slice(startPos,i+1)}}
}
return null
}
function _baProtectedRanges(src){
src=String(src||'');
var ranges=[],re=/(?:^|[;\n])\s*(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*/g,m;
while((m=re.exec(src))){
var pos=re.lastIndex;
while(/\s/.test(src[pos]||''))pos++;
var c=src[pos];
if(c!=='{'&&c!=='['&&c!=='(')continue;
var block=_baScanBlock(src,pos);
if(!block)continue;
var tail=src.slice(block.end).match(/^\s*(?:[;,]|$)/);
if(!tail)continue;
var raw=block.text,lines=raw.split(/\r?\n/).length;
var complex=raw.length>=240||lines>=4||(/[?:]/.test(raw)&&raw.length>=120)||(/\.\s*[A-Za-z_$][\w$]*\s*\(/.test(raw)&&raw.length>=160);
if(complex)ranges.push({start:pos,end:block.end,text:raw})
}
return ranges
}
function _baMask(src,ranges){
var out=String(src),store=[];
for(var i=ranges.length-1;i>=0;i--){
var token='__CF_BLOCK_AWARE_'+i+'__';
store[i]=ranges[i].text.replace(/\t/g,'  ').replace(/[ \t]+$/gm,'');
out=out.slice(0,ranges[i].start)+token+out.slice(ranges[i].end)
}
return{src:out,store:store}
}
function _baRestore(src,store){
var out=String(src);
store.forEach(function(raw,i){out=out.replace('__CF_BLOCK_AWARE_'+i+'__',raw)});
return out
}

function beautify(s){
s=String(s||'').replace(/\r\n?/g,'\n').replace(/\t/g,'  ');
var protectedData=_baMask(s,_baProtectedRanges(s));
s=protectedData.src;
var out='',ind=0,q=null,esc=false,lineComment=false,blockComment=false,par=0,br=0,i=0,lineStart=true,pendingSpace=false;
function pad(){return'  '.repeat(Math.max(0,ind))}
function trimEnd(){out=out.replace(/[ ]+$/,'')}
function nl(){trimEnd();if(!out.endsWith('\n'))out+='\n';lineStart=true;pendingSpace=false}
function write(x){
if(lineStart){out+=pad();lineStart=false}
if(pendingSpace&&out&&!/[ \n]$/.test(out)&&x!==';'&&x!==','&&x!==')'&&x!==']')out+=' ';
pendingSpace=false;out+=x
}
for(;i<s.length;i++){
var c=s[i],n=s[i+1]||'';
if(lineComment){write(c);if(c==='\n'){lineComment=false;lineStart=true}continue}
if(blockComment){write(c);if(c==='*'&&n==='/'){write('/');i++;blockComment=false}continue}
if(q){write(c);if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;continue}
if(c==='/'&&n==='/'){write('//');i++;lineComment=true;continue}
if(c==='/'&&n==='*'){write('/*');i++;blockComment=true;continue}
if(c==='"'||c==="'"||c==='`'){write(c);q=c;continue}
if(/\s/.test(c)){pendingSpace=true;continue}
if(c==='('){write(c);par++;continue}
if(c===')'){write(c);par=Math.max(0,par-1);continue}
if(c==='['){write(c);br++;continue}
if(c===']'){write(c);br=Math.max(0,br-1);continue}
if(c==='{'){if(!lineStart&&out&&!/[ \n]$/.test(out))out+=' ';write('{');ind++;nl();continue}
if(c==='}'){
trimEnd();if(!lineStart)nl();ind=Math.max(0,ind-1);write('}');
var tail=s.slice(i+1).match(/^\s*(else\b|catch\b|finally\b|while\s*\()/);
if(tail){out+=' ';continue}
var next=s.slice(i+1).match(/^\s*([;,)\]])/);
if(!next)nl();
continue
}
if(c===';'){write(';');if(par===0&&br===0)nl();continue}
if(c===','){write(',');pendingSpace=true;continue}
write(c)
}
trimEnd();
out=out.replace(/[ ]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').replace(/^\s*\n/,'').replace(/\n\s*$/,'');
out=_baRestore(out,protectedData.store);
return out.replace(/\t/g,'  ').replace(/[ \t]+$/gm,'').replace(/\n{3,}/g,'\n\n')
}
function bloggerParse(s){
var v=S.parserFormat==='minify'?minify(s):beautify(s);v=escHTML(v);
if(S.parserFormat==='minify')return v;
return v.split('\n').map(function(line){var m=line.match(/^(\s*)/),lead=m?m[1].length:0;return'&nbsp;'.repeat(lead)+line.slice(lead)}).join('<br />\n')
}
function bloggerUnparse(s){return beautify(unescHTML(String(s).replace(/<br\s*\/?>/gi,'\n').replace(/&nbsp;/gi,' ')))}
function extractJS(s){
s=String(s);var un=unescHTML(s),blocks=[],re=/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,m;
while((m=re.exec(un)))blocks.push(m[1]);
if(blocks.length)return blocks.join('\n\n');
if(/<\/?(?:html|body|style|div|span|p|link|meta)\b/i.test(un))return un.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi,'').replace(/<[^>]+>/g,'\n');
return un
}
function b64enc(s){var u=new TextEncoder().encode(s),bin='';for(var i=0;i<u.length;i++)bin+=String.fromCharCode(u[i]);return btoa(bin)}
function b64dec(s){var bin=atob(s),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new TextDecoder().decode(u)}
async function sha256(s){if(!crypto||!crypto.subtle)throw new Error('SHA-256 NOT SUPPORTED');var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}
function randomId(){return Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4)}

function techValues(){
var o={};tool.querySelectorAll('[data-tech]').forEach(function(x){o[x.dataset.tech]=!!x.checked});
o.host=(E.domain.value||'').trim().toLowerCase().replace(/^https?:\/\//,'').replace(/\/.*$/,'');
return o
}
function updateTechSummary(){
var o=techValues(),count=Object.keys(o).filter(function(k){return k!=='host'&&o[k]}).length;
E.protection.textContent=S.preset==='custom'?'CUSTOM':S.preset.toUpperCase();
E.runtime.textContent=(o.controlFlow||o.debug||o.selfDefend)?'MEDIUM':o.dead?'LOW-MEDIUM':'LOW';
E.growth.textContent=(o.dead||o.controlFlow)?'+MEDIUM':(o.split||o.rotate)?'+LOW':'LOW';
E.selected.textContent=count+' TECH'
}
function applyPreset(name){
if(!presets[name])return;S.preset=name;var p=presets[name];
tool.querySelectorAll('[data-tech]').forEach(function(x){x.checked=!!p[x.dataset.tech]});
tool.querySelectorAll('#cfObPreset button').forEach(function(b){b.classList.toggle('active',b.dataset.preset===name)});
updateTechSummary()
}
function customPreset(){S.preset='custom';tool.querySelectorAll('#cfObPreset button').forEach(function(b){b.classList.toggle('active',b.dataset.preset==='custom')});updateTechSummary()}
function setTechEnabled(on){
if(!E.techBox)return;
E.techBox.classList.toggle('is-disabled',!on);
if(E.techState){E.techState.classList.toggle('disabled',!on);E.techState.innerHTML='<i></i> '+(on?'ACTIVE':'DISABLED')}
E.techBox.querySelectorAll('button,input').forEach(function(x){if(x!==E.domain)x.disabled=!on});
var d=E.techBox.querySelector('[data-tech="domain"]');E.domain.disabled=!on||!(d&&d.checked)
}

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
function _c1(el,msg){if(!el)return;el.classList.add('cfObFieldError');try{el.scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}setTimeout(function(){try{el.focus()}catch(e){}},180);if(msg)say(msg)}
function _a9(s){return String(s).replace(/\bconsole\s*\.\s*(?:log|debug|info|trace)\s*\((?:[^()"'`]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\([^()]*\))*\)\s*;?/g,'').replace(/\/\*\s*CF(?:JS|DEBUG|MARKER)[\s\S]*?\*\//gi,'')}

async function _a2(src){
var opt=techValues();
if(opt.domain&&!opt.host){_c1(E.domain,'DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME');throw new Error('DOMAIN LOCK ACTIVE - ISI ALLOWED HOSTNAME')}
var source=opt.debugLog?String(src):_a9(src);source=opt.compact?minify(source):source;
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
return _a1(opt,randomId(),chunks,meta)
}
function _a3(s){
s=String(s);
var mm=s.match(/\/\*CFJS5:([A-Za-z0-9+/=]+)\*\//),hm=s.match(/var\s+_q7n\s*=\s*["']([A-Za-z0-9+/=]+)["']\s*;/),am=s.match(/var\s+(?:_[A-Za-z0-9]+|cfPayload)\s*=\s*(\[[\s\S]*?\]);/);
if(!am||(!mm&&!hm))return null;
try{return{meta:JSON.parse(b64dec(mm?mm[1]:hm[1])),chunks:JSON.parse(am[1])}}catch(e){return null}
}
async function _a4(s){
var x=_a3(s);if(!x)return null;
if(x.meta.p){E.accessBox.style.display='block';var h=await sha256(E.access.value||'');if(!E.access.value||h!==x.meta.h)throw new Error('PASSWORD REQUIRED / INVALID')}
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

function _d2(src){
src=String(src);
_p1(src);
src=_p2(src);
return src
}

function _d3(src){
src=String(src||'');
var score=0;
if(src.length>3000&&src.split(/\r?\n/).length<20)score++;
if(/jQuery\s*v?\d|jquery\.org\/license|owlCarousel|Zepto|prototype\.[A-Za-z_$]/i.test(src))score+=2;
if(/!function\s*\([^)]*\)\s*\{|function\s*\([a-z](?:,[a-z]){2,}\)\s*\{/i.test(src))score++;
if(/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,/i.test(src))score-=2;
return score>=2
}

function _packerPresent(src){
return /eval\s*\(\s*function\s*\(\s*p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*(?:r|d)\s*\)/i.test(String(src||''))
}

function _packerArgValue(expr,tables){
expr=String(expr||'').trim();
var lit=expr.match(/^(["'])([\s\S]*)\1$/);
if(lit)return _b9(expr);

var ref=expr.match(/^([A-Za-z_$][\w$]*)\s*\[\s*(\d+)\s*\]$/);
if(ref&&tables[ref[1]]&&+ref[2]<tables[ref[1]].length)return tables[ref[1]][+ref[2]];
return null
}

function _scanBalancedLiteral(src,start,open,close){
src=String(src||'');
if(src[start]!==open)return null;
var depth=0,q=null,esc=false,line=false,block=false,i=start;
for(;i<src.length;i++){
var c=src[i],n=src[i+1]||'';
if(line){if(c==='\n')line=false;continue}
if(block){if(c==='*'&&n==='/'){block=false;i++}continue}
if(q){
if(esc)esc=false;
else if(c==='\\')esc=true;
else if(c===q)q=null;
continue
}
if(c==='/'&&n==='/'){line=true;i++;continue}
if(c==='/'&&n==='*'){block=true;i++;continue}
if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c===open)depth++;
else if(c===close){
depth--;
if(depth===0)return{start:start,end:i+1,text:src.slice(start,i+1)}
}
}
return null
}

function _findSafeTableDecl(src,name){
src=String(src||'');
var safe=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
var re=new RegExp('\\b(?:var|let|const)\\s+'+safe+'\\s*=\\s*','g'),m;
while((m=re.exec(src))){
var pos=re.lastIndex;
while(/\s/.test(src[pos]||''))pos++;

if(src[pos]==='['){
var b=_scanBalancedLiteral(src,pos,'[',']');
if(!b)return null;
var end=b.end;
while(/\s/.test(src[end]||''))end++;
if(src[end]===';')end++;
return{start:m.index,end:end}
}

var rest=src.slice(pos),na=rest.match(/^new\s+Array\s*\(/);
if(na){
var p=pos+na[0].lastIndexOf('(');
var b2=_scanBalancedLiteral(src,p,'(',')');
if(!b2)return null;
var end2=b2.end;
while(/\s/.test(src[end2]||''))end2++;
if(src[end2]===';')end2++;
return{start:m.index,end:end2}
}
}
return null
}

function _identifierUsedOutside(src,name,start,end){
var safe=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
var re=new RegExp('\\b'+safe+'\\b');
return re.test(src.slice(0,start))||re.test(src.slice(end))
}

function _findObfuscatorScriptMatch(raw){
raw=String(raw||'');
var re=/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,m,best=null;
while((m=re.exec(raw))){
var body=String(m[1]||''),score=0;
if(/\bvar\s+_\$_[A-Za-z0-9_$]+\s*=\s*\[/.test(body))score+=6;
if(_packerPresent(body))score+=10;
if(/_\$_[A-Za-z0-9_$]+\s*\[\s*\d+\s*\]/.test(body))score+=2;
if(score&&(!best||score>best.score))best={full:m[0],body:m[1],index:m.index,score:score}
}
return best
}

function _d4(src){
src=String(src||'');
var tables=_d1(src);

/* Standard literal P.A.C.K.E.R form */
var direct=/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*(?:r|d)\s*\)\s*\{[\s\S]*?\}\s*\(\s*((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))\.split\(\s*((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))\s*\)\s*,\s*[^,]*\s*,\s*\{\s*\}\s*\)\s*\)/;
var m=src.match(direct);
if(m){
return{
payload:_b9(m[1]),
base:parseInt(m[2],10),
count:parseInt(m[3],10),
dict:_b9(m[4]).split(_b9(m[5])),
indirect:false
}
}

/* Indirect table form:
eval(function(...)(TABLE[0],62,1989,TABLE[2].split(TABLE[1]),0,{})) */
var indirect=/eval\s*\(\s*function\s*\(p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*(?:r|d)\s*\)\s*\{[\s\S]*?\}\s*\(\s*([A-Za-z_$][\w$]*\s*\[\s*\d+\s*\])\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([A-Za-z_$][\w$]*\s*\[\s*\d+\s*\])\.split\(\s*([A-Za-z_$][\w$]*\s*\[\s*\d+\s*\])\s*\)\s*,\s*[^,]*\s*,\s*\{\s*\}\s*\)\s*\)/;
m=src.match(indirect);
if(!m)return null;

var payload=_packerArgValue(m[1],tables);
var dictRaw=_packerArgValue(m[4],tables);
var delim=_packerArgValue(m[5],tables);
if(payload===null||dictRaw===null||delim===null)return null;

return{
payload:payload,
base:parseInt(m[2],10),
count:parseInt(m[3],10),
dict:String(dictRaw).split(String(delim)),
indirect:true,
tableName:(m[1].match(/^([A-Za-z_$][\w$]*)/)||[])[1]||''
}
}

function _b1(src){
src=String(src||'');
var x=_d4(src);
if(!x)return src;

var p=x.payload,a=x.base,c=x.count,k=x.dict;
function enc(n){return(n<a?'':enc(Math.floor(n/a)))+((n%=a)>35?String.fromCharCode(n+29):n.toString(36))}

while(c--){
if(k[c])p=p.replace(new RegExp('\\b'+enc(c)+'\\b','g'),k[c])
}

/* Accept unpack only if it produces parseable JavaScript. */
try{new Function(_stripCDATA(_stripScriptWrapper(p)))}catch(_e){return src}
return p
}
function _decodeReadablePropertyKeys(src){
src=String(src||'');

/* Decode quoted object keys such as
{"\x74\x72...": value}
to {"transition-duration": value}
while leaving ordinary string values untouched. */
var re=/([,{]\s*)(["'])((?:\\.|(?!\2)[\s\S])*?)\2(\s*:)/g;
var out=src.replace(re,function(all,prefix,q,body,suffix){
if(!/\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}/.test(body))return all;
var lit=q+body+q;
try{
var value=Function('"use strict";return ('+lit+')')();
if(typeof value!=='string')return all;
return prefix+JSON.stringify(value)+suffix
}catch(_e){return all}
});

return _syntaxValid(out)?out:src
}

function _readabilityPass(src){
src=String(src||'');
var current=src,next;

next=_deepReadablePass(current);
if(_syntaxValid(next))current=next;

return current
}

function _safeEscapeDecode(src){
src=String(src||'');
var next=_b4(src);
if(next===src)return src;
try{
new Function(_stripCDATA(_stripScriptWrapper(next)));
return next
}catch(_e){
say('HEX / UNICODE DECODE ROLLBACK - SOURCE PRESERVED');
return src
}
}

function _b5(s){return String(s).replace(/\.\s*\[\s*(["'])([A-Za-z_$][\w$]*)\1\s*\]/g,'.$2').replace(/\[\s*(["'])([A-Za-z_$][\w$]*)\1\s*\]/g,'.$2').replace(/\b!0\b/g,'true').replace(/\b!1\b/g,'false').replace(/\bvoid\s+0\b/g,'undefined')}
function _b3(s){
var map={},c={text:0,num:0,flag:0,array:0,object:0,func:0,element:0,regex:0,date:0,data:0};
function next(t){c[t]++;return t+c[t]}
function cls(v){v=v.trim();if(/^['"`]/.test(v))return'text';if(/^(true|false)\b/.test(v))return'flag';if(/^-?(?:\d|0x)/i.test(v))return'num';if(/^new\s+Date\b/.test(v))return'date';if(/^\[/.test(v))return'array';if(/^\{/.test(v))return'object';if(/^(?:function\b|\([^)]*\)\s*=>)/.test(v))return'func';if(/^\//.test(v))return'regex';if(/(?:document\.|\$\s*\()/.test(v))return'element';return'data'}
var pat='(_0x[a-fA-F0-9]+|__0x[a-fA-F0-9]+|_\\$[A-Za-z0-9]+)',d=new RegExp('\\b(?:var|let|const)\\s+'+pat+'\\s*=\\s*([^;]+)','g');
s.replace(d,function(_,n,v){if(!map[n])map[n]=next(cls(v));return _});
var f=new RegExp('\\bfunction\\s+'+pat,'g');s.replace(f,function(_,n){if(!map[n])map[n]=next('func');return _});
var any=new RegExp('\\b'+pat+'\\b','g');s.replace(any,function(n){if(!map[n])map[n]=next('data');return n});
Object.keys(map).sort(function(a,b){return b.length-a.length}).forEach(function(n){s=s.replace(new RegExp('\\b'+n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','g'),map[n])});
return s
}
function _b6(s){return beautify(s).split('\n').map(function(line){return line.replace(/^\s+/,'')}).join('\n')}
function _nfingerprint(s){
s=String(s||'');
var h=2166136261,i=0,step=Math.max(1,Math.floor(s.length/2048));
for(i=0;i<s.length;i+=step){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}
return s.length+':'+(h>>>0)
}

function _nchanged(a,b){
return _nfingerprint(a)!==_nfingerprint(b)
}

function _a5(s){
s=String(s||'');
var current=s,seen={},fp='',step='',t,sem,passes=0;
_p1(current);

for(;passes<6;passes++){
fp=_nfingerprint(current);
if(seen[fp])break;
seen[fp]=1;

/* Packer first if still present. */
if(_packerPresent(current)){
step=_b1(current);
t=_safeTransform(current,step,'PACKER UNPACK');
if(!t.changed)break;
current=t.code;
continue
}

/* Each transform is checkpointed independently. */
step=_p2(current);
t=_safeTransform(current,step,'NORMALIZE STRING TABLE');
current=t.code;

step=_d2(current);
t=_safeTransform(current,step,'NORMALIZE INDIRECT');
current=t.code;

step=_readabilityPass(current);
t=_safeTransform(current,step,'NORMALIZE ESCAPE');
current=t.code;

step=_b2(current);
t=_safeTransform(current,step,'NORMALIZE TABLE VALUES');
current=t.code;

step=_p4(current);
t=_safeTransform(current,step,'NORMALIZE IDENTIFIER');
current=t.code;

sem=_conservativeHumanize(current);
if(sem.code!==current){
t=_safeTransform(current,sem.code,'NORMALIZE SEMANTIC');
current=t.code
}

if(!t.changed&&passes>0)break
}

/* Cleanup table only after every resolver pass completed. */
if(!_packerPresent(current)){
step=_p3(current);
t=_safeTransform(current,step,'FINAL STRING TABLE CLEANUP');
current=t.code
}

/* Beautify only when safe. */
current=_deepReadablePass(current);
var complete=_deobfuscationCompleteness(current);
S.deobfuscationCompleteness=complete;
if(!complete.complete){
say('NORMALIZE INCOMPLETE - HEX '+complete.hex+' | RGX '+complete.rgx+(complete.rgx?' ['+_unresolvedRgxIndexes(current).join(',')+']':'')+' | TABLE '+complete.table+' | PACKER '+complete.packer)
}
return S.normalizeFormat==='flush'?_b6(current):_safeBeautify(current)
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
S.originalRawSource=String(src||'');
S.bloggerMode=_detectBloggerMode(S.originalRawSource);

var raw=_stripCDATA(_stripScriptWrapper(S.originalRawSource));
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
S.mode=m;_injectButtonState();
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
_lockFullNormalize();E.input.value='';S.normalizeFinal=false;S.layerIndex=0;S.layerHistory=[];S.normalizedBase='';S.normalizeBusy=false;S.bloggerMode=false;S.integrity={};S.normalizePassed=false;S.injectCompleted=false;S.tableCache={};S.originalSource='';S.originalRawSource='';S.injectSource='';S.injectTarget=null;S.lastSafeOutput='';S.deobfuscateReady=false;if(E.normalizePanel)E.normalizePanel.classList.remove('is-final');if(E.normalizeState)E.normalizeState.textContent='Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.';if(E.normalize)E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';setOutput('','','READY');updateLayerPanel('','WAITING');if(E.deobSupport)E.deobSupport.querySelectorAll('.cfObDeobMethod').forEach(function(el){el.classList.remove('is-detected')});if(E.normalizeFull)E.normalizeFull.disabled=true;analyze();say('CLEARED')});
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
if(E.copyScript)E.copyScript.addEventListener('click',async function(){
if(S.injectCompleted){
say('INJECT ALREADY COMPLETE - READY TO COPY');
if(E.resultStatus)E.resultStatus.textContent='READY TO COPY';
_injectButtonState();
return
}
if(S.mode==='deobfuscate'&&!S.normalizePassed){
say('INJECT LOCKED - RUN FULL NORMALIZE FIRST');
return
}
if(S.mode==='tools')return;

E.copyScript.disabled=true;
if(E.resultStatus)E.resultStatus.textContent='INJECTING...';
setProgress(10);
say('INJECTING NORMALIZED DATA...');
await _ui();

try{
var payload='';

if(S.mode==='deobfuscate'){
/* Do not read/re-parse the huge textarea. Use the validated checkpoint. */
payload=String(S.normalizedBase||S.lastSafeOutput||'').trim()
}else{
payload=String(E.output.value||'').trim();
payload=_stripCDATADeep(_stripScriptWrapper(payload)).trim()
}

if(!payload)throw new Error('VALID PAYLOAD NOT FOUND');

/* BLOGGER/HTML RAW-TEXT SAFETY:
   deobfuscation can reveal literal </script> inside strings used by
   postscribe/dynamic widgets. In an inline script HTML parses that as the
   real closing tag, causing the remaining JavaScript to render as page text. */
var rawSafe=_protectHtmlRawTextEndTags(payload);
if(rawSafe!==payload){
payload=rawSafe;
say('HTML RAW-TEXT GUARD - LITERAL SCRIPT END TAGS PROTECTED')
}
if(!_syntaxValid(payload))throw new Error('RAW-TEXT PROTECTION SYNTAX FAILED');

setProgress(35);
await _ui();

var raw=_getInjectSource();
var fullSource=!!raw&&raw.indexOf('<script')!==-1;
var injected;

if(fullSource){
injected=_fastInjectBuild(payload);
if(!injected)throw new Error('TARGET SCRIPT NOT FOUND')
}else{
injected="<script type='text/javascript'>\n"+payload+"\n</script>"
}

setProgress(70);
say('WRITING FINAL SOURCE...');
await _ui();

/* Assign output once. Do not call setOutput(): it creates multiple Blob copies
   of very large Blogger source and was another freeze source. */
E.output.value=injected;
if(E.outCount)E.outCount.textContent=injected.length.toLocaleString()+' CHAR';
if(E.outTitle)E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> '+(fullSource?'INJECTED SOURCE OUTPUT':'SCRIPT TAG OUTPUT');
if(E.resultSize)E.resultSize.textContent=kb(injected);
if(E.resultStatus)E.resultStatus.textContent='READY TO COPY';

S.injectCompleted=true;
S.lastSafeOutput=payload;
_injectButtonState();

setProgress(100);
say('INJECT COMPLETE - READY TO COPY')
}catch(err){
if(E.resultStatus)E.resultStatus.textContent='INJECT ERROR';
say('INJECT FAILED - '+String(err&&err.message||err))
}finally{
setTimeout(function(){setProgress(0)},700);
_injectButtonState()
}
});
E.process.addEventListener('click',async function(){
S.injectCompleted=false;
_injectButtonState();
var src=E.input.value;if(src.trim())_captureInjectSource(src);
_lockFullNormalize();if(!src.trim()){say('INPUT EMPTY');E.input.focus();return}
setProgress(20);E.process.disabled=true;
try{
var out;
if(S.mode==='obfuscate'){
S.originalRawSource=src;S.originalSource=_stripCDATA(_stripScriptWrapper(src));
out=await _a2(src);setOutput(out,'ENCRYPTION CODE OUTPUT','SUCCESS')}
else{_h1(src);out=await _a6(src);S.layerIndex=0;S.layerHistory=[];setNormalizeFinal(false,'Deobfuscation selesai - NORMALIZE OUTPUT untuk membuka dan merapikan layer berikutnya.');setOutput(out,'DEOBFUSCATION CODE OUTPUT','SUCCESS');
S.deobfuscateReady=true;
S.normalizePassed=false;
S.injectCompleted=false;
if(E.normalizeFull)E.normalizeFull.disabled=false;
updateLayerPanel(out,'ANALYZED');
_injectButtonState();
say('DEOBFUSCATE COMPLETE - RUN FULL NORMALIZE')}
setProgress(100);say('SUCCESS')
}catch(e){say(e.message||'PROCESS ERROR');if(E.resultStatus)E.resultStatus.textContent='ERROR'}
finally{E.process.disabled=false;setTimeout(function(){setProgress(0)},500)}
});

function _stripScriptWrapper(src){
src=String(src||'');
var m=src.match(/^\s*<script\b[^>]*>([\s\S]*?)<\/script\s*>\s*$/i);
return m?m[1]:src
}

function _hasCDATA(src){
return /\/\/\s*<!\[CDATA\[|\/\*\s*<!\[CDATA\[\s*\*\//i.test(String(src||''))
}

function _stripCDATA(src){
return String(src||'')
.replace(/^\s*\/\/\s*<!\[CDATA\[\s*/i,'')
.replace(/\s*\/\/\s*\]\]>\s*$/i,'')
.replace(/^\s*\/\*\s*<!\[CDATA\[\s*\*\/\s*/i,'')
.replace(/\s*\/\*\s*\]\]>\s*\*\/\s*$/i,'')
}

function _detectBloggerMode(raw){
raw=String(raw||'');
return /<script\b/i.test(raw)&&(
/\/\/\s*<!\[CDATA\[/i.test(raw)||
/<b:(?:skin|if|section|widget)\b/i.test(raw)||
/expr:[A-Za-z-]+\s*=/.test(raw)||
/data:blog\./.test(raw)
)
}

function _bloggerWrap(js,raw){
js=String(js||'').trim();
raw=String(raw||'');
var open=(raw.match(/<script\b[^>]*>/i)||["<script type='text/javascript'>"])[0];
if(!/\btype\s*=/.test(open))open=open.replace(/>$/," type='text/javascript'>");
return open+'\n//<![CDATA[\n'+js+'\n//]]>\n</script>'
}

function _orphanCheck(js){
js=String(js||'').trim();
var issues=[];
if(/^["'][^;\n]{0,300}["']\s*,/.test(js))issues.push('ORPHAN STRING TABLE AT START');
if(/^[,\]\)]/.test(js))issues.push('ORPHAN TOKEN AT START');
if(/(?:^|[;\n])\s*,\s*[A-Za-z_$]/.test(js))issues.push('ORPHAN COMMA EXPRESSION');
if(/\{\s*,\s*[A-Za-z_$]/.test(js))issues.push('BROKEN BLOCK START');
return issues
}

function _identifierCaseCheck(js){
js=String(js||'');
var defs={},uses={},issues=[];
var d=/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g,m;
while((m=d.exec(js)))defs[m[1].toLowerCase()]=m[1];
var c=/\b([A-Za-z_$][\w$]*)\s*\(/g;
while((m=c.exec(js))){
var n=m[1],l=n.toLowerCase();
if(defs[l]&&defs[l]!==n&&n!=='function')issues.push('IDENTIFIER CASE: '+n+' -> '+defs[l])
}
return Array.from(new Set(issues)).slice(0,10)
}

function _scopeCheck(js){
js=String(js||'');
var issues=[];
var pushUse=/\b([A-Za-z_$][\w$]*)\.push\s*\(/g,m;
while((m=pushUse.exec(js))){
var n=m[1];
var before=js.slice(Math.max(0,m.index-5000),m.index);
var decl=new RegExp('\\b(?:var|let|const)\\s+'+n.replace(/[$]/g,'\\$&')+'\\b');
var param=new RegExp('function\\s*[^()]*\\([^)]*\\b'+n.replace(/[$]/g,'\\$&')+'\\b[^)]*\\)');
if(!decl.test(before)&&!param.test(before))issues.push('POSSIBLE UNDECLARED ARRAY: '+n)
}
return Array.from(new Set(issues)).slice(0,10)
}

function _bloggerXMLCheck(source,targetPayload){
source=String(source||'');
targetPayload=String(targetPayload||'').trim();
var issues=[];

if(!/<script\b/i.test(source))return issues;

/* When validating an Inject operation, locate only the injected script.
Do not require CDATA on unrelated pre-existing scripts in the template. */
if(targetPayload){
var target=_findInjectedScriptBody(source,targetPayload);
if(!target){
issues.push('INJECTED SCRIPT BODY NOT FOUND');
return issues
}

/* _findInjectedScriptBody strips CDATA, so inspect the raw script element
containing the escaped payload prefix. */
var safePayload=_scriptElementSafe(_stripCDATADeep(_stripScriptWrapper(targetPayload))).trim();
var prefix=safePayload.slice(0,Math.min(180,safePayload.length));
var re=/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,m,rawBody='';
while((m=re.exec(source))){
var clean=_stripCDATADeep(m[1]).trim();
if(clean===safePayload||(prefix&&clean.indexOf(prefix)!==-1)){
rawBody=m[1];
break
}
}

if((_detectBloggerMode(_getInjectSource())||S.bloggerMode)&&rawBody){
if(!/\/\/\s*<!\[CDATA\[[\s\S]*\/\/\s*\]\]>/.test(rawBody)){
issues.push('CDATA MISSING IN INJECTED SCRIPT')
}
}
return issues
}

/* General source inspection: missing CDATA in existing scripts is advisory,
not a hard Inject failure. */
return issues
}

function _extractInlineScripts(src){
src=String(src||'');
var out=[],re=/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,m;
while((m=re.exec(src))){
var body=_stripCDATA(m[1]).trim();
if(body)out.push(body)
}
return out
}

function _stripCDATADeep(s){
s=String(s||'').trim();
s=s.replace(/^\s*\/\/\s*<!\[CDATA\[\s*(?:\r?\n)?/,'');
s=s.replace(/(?:\r?\n)?\s*\/\/\s*\]\]>\s*$/,'');
s=s.replace(/^\s*\/\*\s*<!\[CDATA\[\s*\*\/\s*/,'');
s=s.replace(/\s*\/\*\s*\]\]>\s*\*\/\s*$/,'');
return s.trim()
}

function _syntaxProbe(js){
js=_stripCDATADeep(String(js||''));
try{
new Function(js);
return{ok:true,message:'',line:0,column:0,context:''}
}catch(e){
var msg=String(e&&e.message||e),line=0,col=0,stack=String(e&&e.stack||'');
var lm=stack.match(/<anonymous>:(\d+)(?::(\d+))?/);
if(lm){line=Math.max(1,(+lm[1])-2);col=+(lm[2]||0)}
var rows=js.split(/\r?\n/),ctx='';
if(line&&rows[line-1]!==undefined)ctx=rows[line-1].slice(0,180);
return{ok:false,message:msg,line:line,column:col,context:ctx}
}
}

function _cleanInjectedBody(body){
body=String(body||'');
return _stripCDATADeep(body)
}

function _jsSyntaxCheckAny(src){
src=String(src||'');
var issues=[];

if(/<script\b/i.test(src)){
var scripts=_extractInlineScripts(src);
if(!scripts.length)return issues;
scripts.forEach(function(js,i){
var p=_syntaxProbe(_cleanInjectedBody(js));
if(!p.ok){
var at=p.line?' @ line '+p.line+(p.column?':'+p.column:''):'';
issues.push('SCRIPT '+(i+1)+': '+p.message+at+(p.context?' | '+p.context:''))
}
});
return issues
}

var p=_syntaxProbe(_stripScriptWrapper(src));
if(!p.ok){
var at=p.line?' @ line '+p.line+(p.column?':'+p.column:''):'';
issues.push(p.message+at+(p.context?' | '+p.context:''))
}
return issues
}

function _integrityReport(js,raw){
js=String(js||'');
raw=String(raw||'');
var report={syntax:[],flow:[],orphan:[],identifier:[],scope:[],semantic:[],blogger:[],hard:[],warnings:[],ok:true,safe:true};
var hasSourceWrapper=/<script\b/i.test(js);

/* Pure JS and full source use different syntax paths. */
report.syntax=_jsSyntaxCheckAny(js);

var jsForChecks=js;
if(hasSourceWrapper){
var parts=_extractInlineScripts(js);
jsForChecks=parts.length?parts.join('\n'):'';
}

if(jsForChecks){
var fc=typeof _flowCheck==='function'?_flowCheck(jsForChecks):{ok:true,issues:[],warnings:[]};
if(!fc.ok)report.flow=fc.issues.slice(0,10);
if(fc.warnings&&fc.warnings.length)report.scope=(report.scope||[]).concat(fc.warnings.slice(0,5));
var sc=_semanticCheck(jsForChecks);
if(!sc.ok)report.semantic=sc.issues.slice(0,10);
if(sc.warnings.length)report.scope=(report.scope||[]).concat(sc.warnings.slice(0,8));
report.orphan=_orphanCheck(jsForChecks);
report.identifier=_identifierCaseCheck(jsForChecks);
report.scope=_scopeCheck(jsForChecks);
}

/* IMPORTANT:
Never run Blogger XML check on normalized JavaScript alone.
Run it only after Inject has produced source containing <script>. */
if(hasSourceWrapper&&(_detectBloggerMode(raw)||S.bloggerMode)){
report.blogger=_bloggerXMLCheck(js)
}

report.hard=[]
.concat(report.syntax)
.concat(report.flow)
.concat(report.orphan)
.concat(report.semantic||[])
.concat(report.blogger);

report.warnings=[]
.concat(report.identifier)
.concat(report.scope);

report.safe=report.hard.length===0;
report.ok=report.safe&&report.warnings.length===0;
return report
}

function _rememberSafeOutput(v){
v=String(v||'');
if(!v)return false;
var r=_integrityReport(v,S.originalRawSource||S.injectSource||'');
if(r.safe){
/* Do not replace a clean normalized snapshot with an already injected full source
unless there is no previous safe value. */
if(!/<script\b/i.test(v)||!S.lastSafeOutput)S.lastSafeOutput=v;
return true
}
return false
}

function _payloadForInject(v){
v=String(v||'').trim();
if(!v)return'';

/* Pure JavaScript output. */
if(!/<script\b/i.test(v)){
return _stripCDATADeep(_stripScriptWrapper(v)).trim()
}

/* If output is already a full source, prefer the script that replaced the
   original obfuscator block. */
var sourceTarget=_findObfuscatorScriptMatch(S.originalRawSource||S.injectSource||'');
var re=/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,m,candidates=[];
while((m=re.exec(v))){
var body=_stripCDATADeep(m[1]).trim();
if(body)candidates.push({body:body,index:m.index,full:m[0]})
}

/* Exact/prefix match against last known safe normalized output. */
var expected=_stripCDATADeep(_stripScriptWrapper(String(S.lastSafeOutput||S.normalizedBase||''))).trim();
if(expected){
var pfx=expected.slice(0,Math.min(220,expected.length));
for(var i=0;i<candidates.length;i++){
if(candidates[i].body===expected)return candidates[i].body;
if(pfx&&candidates[i].body.indexOf(pfx)!==-1)return candidates[i].body
}
}

/* Match position of original obfuscator script when available. */
if(sourceTarget&&candidates.length){
var best=null,dist=Infinity;
for(var j=0;j<candidates.length;j++){
var d=Math.abs(candidates[j].index-sourceTarget.index);
if(d<dist){dist=d;best=candidates[j]}
}
if(best)return best.body
}

/* Do not fall back to validating every script. */
return''
}

function _safeOutputForInject(v){
v=String(v||'').trim();
if(!v)return'';
var r=_integrityReport(v,S.originalRawSource||S.injectSource||'');
if(r.safe)return v;
if(S.lastSafeOutput){
var sr=_integrityReport(S.lastSafeOutput,S.originalRawSource||S.injectSource||'');
if(sr.safe){
say('INJECT SAFETY FALLBACK - USING LAST VALID OUTPUT');
return S.lastSafeOutput
}
}
return v
}

function _integrityFirstIssue(r){
r=r||{};
if(r.syntax&&r.syntax.length)return'SYNTAX: '+r.syntax[0];
if(r.flow&&r.flow.length)return'FLOW: '+r.flow[0];
if(r.orphan&&r.orphan.length)return'ORPHAN: '+r.orphan[0];
if(r.semantic&&r.semantic.length)return'SEMANTIC: '+r.semantic[0];
if(r.blogger&&r.blogger.length)return'BLOGGER XML: '+r.blogger[0];
if(r.identifier&&r.identifier.length)return'WARNING: '+r.identifier[0];
if(r.scope&&r.scope.length)return'WARNING: '+r.scope[0];
if(r.hard&&r.hard.length)return'CHECK: '+r.hard[0];
return'UNKNOWN INTEGRITY ERROR'
}

function _checkpoint(next,prev,label){
var r=_integrityReport(next,S.originalRawSource||'');
if(r.safe)return{code:next,report:r,rolled:false,warning:r.warnings.length?label+' WARNING - '+r.warnings[0]:''};

var pr=_integrityReport(prev,S.originalRawSource||'');
if(pr.safe){
return{code:prev,report:pr,rolled:true,reason:label+' ROLLBACK - '+_integrityFirstIssue(r)}
}

return{code:next,report:r,rolled:false,reason:label+' HARD WARNING - '+_integrityFirstIssue(r)}
}

function _syntaxValid(js){
js=_stripCDATADeep(String(js||''));
try{new Function(js);return true}catch(_e){return false}
}

function _safeTransform(current,next,label){
current=String(current||'');
next=String(next||'');
if(!next||next===current)return{code:current,changed:false,rolled:false};

if(!_syntaxValid(next)){
say((label||'TRANSFORM')+' ROLLBACK - SYNTAX PRESERVED');
return{code:current,changed:false,rolled:true}
}

var oldLen=current.length,newLen=next.length;
var delta=oldLen?Math.abs(newLen-oldLen)/oldLen:0;

/* Large unexpected size jumps are suspicious after deobfuscation.
Allow them only for PACKER UNPACK, where expansion is expected. */
if(label!=='PACKER UNPACK'&&delta>0.60){
say((label||'TRANSFORM')+' ROLLBACK - LARGE STRUCTURE CHANGE');
return{code:current,changed:false,rolled:true}
}

return{code:next,changed:true,rolled:false}
}

function _conservativeHumanize(js){
js=String(js||'');
var r=_semanticRepair(js),out=r.code;

/* Never accept semantic repair if it breaks syntax. */
if(!_syntaxValid(out))return{code:js,fixes:[],warnings:(r.warnings||[]).concat(['SEMANTIC ROLLBACK'])};

/* Keep only deterministic repairs. */
return{code:out,fixes:r.fixes||[],warnings:r.warnings||[]}
}

function _largeExpressionRisk(js){
js=String(js||'');
var max=0,cur=0,q=null,esc=false,line=false,block=false;
for(var i=0;i<js.length;i++){
var c=js[i],n=js[i+1]||'';
if(line){if(c==='\n')line=false;continue}
if(block){if(c==='*'&&n==='/'){block=false;i++}continue}
if(q){
if(esc)esc=false;
else if(c==='\\')esc=true;
else if(c===q)q=null;
continue
}
if(c==='/'&&n==='/'){line=true;i++;continue}
if(c==='/'&&n==='*'){block=true;i++;continue}
if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c===';'||c==='\n'){if(cur>max)max=cur;cur=0}else cur++
}
if(cur>max)max=cur;
return max>1800
}

function _safeBeautify(js){
js=String(js||'');
if(_largeExpressionRisk(js)){
say('BEAUTIFY CONSERVATIVE - LARGE EXPRESSION PRESERVED');
return js
}
var out;
try{out=beautify(js)}catch(_e){return js}
return _syntaxValid(out)?out:js
}

function _scanJSArrayLiteral(src,start){
src=String(src||'');
if(src[start]!=='[')return null;

var depth=0,q=null,esc=false,line=false,block=false,regex=false,charClass=false;
var prevSig='',i=start;

function regexCanStart(prev){
return !prev||/[[(,{:=;!&|?+\-*%^~<>]/.test(prev)
}

for(;i<src.length;i++){
var c=src[i],n=src[i+1]||'';

if(line){
if(c==='\n')line=false;
continue
}
if(block){
if(c==='*'&&n==='/'){block=false;i++}
continue
}
if(q){
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}
if(c===q)q=null;
continue
}
if(regex){
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}
if(c==='['){charClass=true;continue}
if(c===']'&&charClass){charClass=false;continue}
if(c==='/'&&!charClass){
regex=false;
while(/[a-z]/i.test(src[i+1]||''))i++;
prevSig='/'
}
continue
}

if(c==='/'&&n==='/'){line=true;i++;continue}
if(c==='/'&&n==='*'){block=true;i++;continue}
if(c==='"'||c==="'"||c==='`'){q=c;continue}

/* Regex literal inside array. */
if(c==='/'&&regexCanStart(prevSig)){
regex=true;charClass=false;esc=false;continue
}

if(c==='[')depth++;
else if(c===']'){
depth--;
if(depth===0)return{start:start,end:i+1,text:src.slice(start,i+1)}
}

if(!/\s/.test(c))prevSig=c
}
return null
}

function _parseSimpleArrayDecl(src,name){
src=String(src||'');
var safe=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
var re=new RegExp('\\b(?:var|let|const)\\s+'+safe+'\\s*=\\s*\\[','g'),m=re.exec(src);
if(!m)return null;

var start=src.indexOf('[',m.index);
var b=_scanJSArrayLiteral(src,start);
if(!b)return null;

var arrText=b.text;
try{
var vals=Function('"use strict";return ('+arrText+')')();
if(!Array.isArray(vals))return null;

var end=b.end;
while(/\s/.test(src[end]||''))end++;
if(src[end]===';')end++;

return{values:vals,start:m.index,end:end}
}catch(_e){
return null
}
}

function _collectIndexedAssignments(src,name){
src=String(src||'');
var values={},safe=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),m;

/* Start with a directly parseable array when available. */
var base=_parseSimpleArrayDecl(src,name);
if(base){
base.values.forEach(function(v,i){values[i]=v})
}

/* Collect explicit TABLE[n] = literal / regex assignments. */
var re=new RegExp('\\b'+safe+'\\s*\\[\\s*(\\d+)\\s*\\]\\s*=\\s*','g');
while((m=re.exec(src))){
var idx=+m[1],pos=re.lastIndex;
while(/\s/.test(src[pos]||''))pos++;

var q=src[pos];
if(q==='"'||q==="'"){
var j=pos+1,esc=false;
for(;j<src.length;j++){
var c=src[j];
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}
if(c===q){j++;break}
}
try{values[idx]=Function('"use strict";return ('+src.slice(pos,j)+')')()}catch(_e){}
re.lastIndex=j;
continue
}

/* Regex literal assignment. */
if(src[pos]==='/'){
var j=pos+1,esc=false,cls=false;
for(;j<src.length;j++){
var c=src[j];
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}
if(c==='['){cls=true;continue}
if(c===']'){cls=false;continue}
if(c==='/'&&!cls){j++;while(/[a-z]/i.test(src[j]||''))j++;break}
}
try{values[idx]=Function('"use strict";return ('+src.slice(pos,j)+')')()}catch(_e){}
re.lastIndex=j;
continue
}

/* primitive assignment */
var pm=src.slice(pos).match(/^(true|false|null|-?\d+(?:\.\d+)?)/);
if(pm){
try{values[idx]=Function('"use strict";return ('+pm[1]+')')()}catch(_e){}
re.lastIndex=pos+pm[1].length
}
}
return values
}

function _serializeResolvedValue(v){
if(typeof v==='string')return JSON.stringify(v);
if(typeof v==='number'||typeof v==='boolean'||v===null)return String(v);
if(v instanceof RegExp)return v.toString();
return null
}

function _resolveIndexedTable(src,name){
src=String(src||'');
var vals=_collectIndexedAssignments(src,name);
var keys=Object.keys(vals);
if(!keys.length)return{code:src,resolved:0,remaining:(src.match(new RegExp('\\b'+name.replace(/[$]/g,'\\$&')+'\\s*\\[\\s*\\d+\\s*\\]','g'))||[]).length};

var resolved=0,safe=name.replace(/[$]/g,'\\$&');
var rx=new RegExp('\\b'+safe+'\\s*\\[\\s*(\\d+)\\s*\\]','g');

var out=src.replace(rx,function(all,n,off,whole){
n=+n;
if(!Object.prototype.hasOwnProperty.call(vals,n))return all;

/* Never replace the left side of TABLE[n] = ... */
var after=whole.slice(off+all.length);
if(/^\s*=/.test(after)&&!/^\s*==/.test(after))return all;

/* Operand guard. A direct rgx[n] used as the argument of rgx[n].exec/test
   must not be converted blindly into the same RegExp literal. This is the
   exact corruption that produced /regex/.exec(/regex/) in the Blogger case. */
if(name==='rgx'){
var left=whole.slice(Math.max(0,off-120),off);
var same=new RegExp('rgx\\s*\\[\\s*'+n+'\\s*\\]\\s*\\.\\s*(?:exec|test)\\s*\\(\\s*$');
if(same.test(left))return all
}

var serialized=_serializeResolvedValue(vals[n]);
if(serialized===null)return all;
resolved++;
return serialized
});

var rem=(out.match(rx)||[]).length;
return{code:out,resolved:resolved,remaining:rem}
}

function _resolveKnownTablesDeep(src){
src=String(src||'');
var current=src,total=0,remaining=0;

/* rgx receives priority because it commonly mixes regex and string entries. */
var priority=['rgx'],names=[],m,re=/\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*\[/g;
while((m=re.exec(current))){
var n=m[1];
if(/^_\$_/.test(n)||/^(?:str|tbl|table|arr)$/i.test(n))names.push(n)
}
names=priority.concat(names);
names=Array.from(new Set(names));

for(var pass=0;pass<4;pass++){
var changed=false;
names.forEach(function(name){
var r=_resolveIndexedTable(current,name);
if(r.code!==current&&_syntaxValid(r.code)){
current=r.code;
total+=r.resolved;
changed=true
}
});
if(!changed)break
}

var rgxRem=(current.match(/\brgx\s*\[\s*\d+\s*\]/g)||[]).length;
var tblRem=(current.match(/\b_\$_[A-Za-z0-9_$]+\s*\[\s*\d+\s*\]/g)||[]).length;
remaining=rgxRem+tblRem;

return{code:current,resolved:total,remaining:remaining}
}

function _decodeAllEscapedStrings(src){
src=String(src||'');
var out='',i=0;

function readQuoted(start){
var q=src[start],j=start+1,esc=false;
for(;j<src.length;j++){
var c=src[j];
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}
if(c===q){j++;return{text:src.slice(start,j),end:j}}
}
return null
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
var lit=r.text;
if(/\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}/.test(lit)){
try{
var v=Function('"use strict";return ('+lit+')')();
if(typeof v==='string'){
var s=JSON.stringify(v).replace(/<\/script>/gi,'<\\/script>');
out+=s;i=r.end;continue
}
}catch(_e){}
}
out+=lit;i=r.end;continue
}
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

function _safeTransformStep(src,label,fn){
src=String(src||'');
var out=src;
try{out=String(fn(src)||src)}catch(e){
say('SAFE TRANSFORM ROLLBACK - '+label+' - '+String(e&&e.message||e));
return src
}
if(out===src)return src;
if(!_syntaxValid(out)){
say('SAFE TRANSFORM ROLLBACK - '+label+' - SYNTAX');
return src
}
return out
}

function _protectRegexSelfExecBeforeResolve(src){
src=String(src||'');
/* Repair only the known deterministic rgx[n].exec(rgx[n]) corruption
   while symbolic rgx references still exist. Once rgx[n] is converted
   into a RegExp literal, the original operand relationship is lost. */
var sem=_semanticRepair(src);
if(sem&&sem.code!==src&&_syntaxValid(sem.code))return sem.code;
return src
}

function _deepReadablePass(src){
src=String(src||'');
var current=src,r;

/* Critical ordering:
   repair symbolic regex self-exec BEFORE resolving rgx[n] into literals. */
current=_safeTransformStep(current,'REGEX OPERAND PROTECTION',function(s){
return _protectRegexSelfExecBeforeResolve(s)
});

/* Resolve index tables one pass at a time. Every changed pass must remain
   syntactically valid or that individual pass is rolled back. */
for(var i=0;i<4;i++){
var before=current;
r=_resolveKnownTablesDeep(before);
if(r.code===before)break;
current=_safeTransformStep(before,'TABLE RESOLVE '+(i+1),function(){return r.code});
if(current===before)break
}

/* Each readability transform owns its rollback boundary. */
current=_safeTransformStep(current,'ESCAPED STRING DECODE',function(s){
return _decodeAllEscapedStrings(s)
});

current=_safeTransformStep(current,'PROPERTY KEY READABILITY',function(s){
return _decodeReadablePropertyKeys(s)
});

/* A deobfuscated literal "</script>" is valid JavaScript but unsafe when the
   result is placed inside an HTML/Blogger inline <script>. */
current=_safeTransformStep(current,'HTML RAW-TEXT GUARD',function(s){
return _protectHtmlRawTextEndTags(s)
});

return current
}

function _rgxResolutionPreview(js){
js=String(js||'');
var p=_parseSimpleArrayDecl(js,'rgx');
if(!p)return'RGX ARRAY PARSE FAILED';
var v=p.values;
return'RGX ARRAY OK - '+v.length+' ITEMS'+(v.length>31?' | [31]='+String(v[31]):'')
}

function _unresolvedRgxIndexes(js){
js=String(js||'');
var a=[],m,re=/\brgx\s*\[\s*(\d+)\s*\]/g;
while((m=re.exec(js)))a.push(+m[1]);
return Array.from(new Set(a)).sort(function(x,y){return x-y})
}

function _deobfuscationCompleteness(js){
js=String(js||'');
var hex=(js.match(/\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}/g)||[]).length;
var rgx=(js.match(/\brgx\s*\[\s*\d+\s*\]/g)||[]).length;
var table=(js.match(/\b_\$_[A-Za-z0-9_$]+\s*\[\s*\d+\s*\]/g)||[]).length;
var packer=_packerPresent(js)?1:0;
return{hex:hex,rgx:rgx,table:table,packer:packer,complete:!(hex||rgx||table||packer)}
}

function _semanticRepair(js){
js=String(js||'');
var fixes=[],warnings=[];

/* Deterministic joined keyword repairs only. */
var joined=[
[/\breturnfalse\b/g,'return false','returnfalse'],
[/\breturntrue\b/g,'return true','returntrue'],
[/\breturnnull\b/g,'return null','returnnull'],
[/\breturnundefined\b/g,'return undefined','returnundefined'],
[/\bthrownew\b/g,'throw new','thrownew']
];
joined.forEach(function(x){
var before=js;
js=js.replace(x[0],x[1]);
if(js!==before)fixes.push(x[2])
});

/* Case-only function call repair:
apply only if exactly one declaration exists for the lowercase name. */
var decl={},m,dre=/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g;
while((m=dre.exec(js))){
var low=m[1].toLowerCase();
(decl[low]||(decl[low]=[])).push(m[1])
}

Object.keys(decl).forEach(function(low){
var names=Array.from(new Set(decl[low]));
if(names.length!==1)return;
var canonical=names[0];
var rx=new RegExp('\\b'+low.replace(/[$]/g,'\\$&')+'\\s*\\(','gi');

js=js.replace(rx,function(hit,off,whole){
var got=hit.replace(/\s*\($/,'');
var prefix=whole.slice(Math.max(0,off-16),off);

/* do not rewrite declaration */
if(/\bfunction\s*$/i.test(prefix))return hit;
if(got===canonical)return hit;

fixes.push('case:'+got+'→'+canonical);
return canonical+hit.slice(got.length)
})
});

/* Do NOT auto-rewrite regex self-exec unless context proves source variable. */
js=js.replace(/\brgx\[(\d+)\]\.exec\(\s*rgx\[\1\]\s*\)/g,function(hit,n,off,whole){
var left=whole.slice(Math.max(0,off-900),off);
var rx=new RegExp('rgx\\['+n+'\\]\\.test\\(([A-Za-z_$][\\w$]*)\\)','g'),mm,last='';
while((mm=rx.exec(left)))last=mm[1];

if(last){
fixes.push('rgx['+n+'].exec('+last+')');
return 'rgx['+n+'].exec('+last+')'
}
warnings.push('REGEX SELF EXEC LEFT UNCHANGED: '+hit);
return hit
});

return{
code:js,
fixes:Array.from(new Set(fixes)),
warnings:Array.from(new Set(warnings))
}
}

function _semanticCheck(js){
/* Literal RegExp self-exec is almost always a deobfuscation corruption:
   /x/.exec(/x/) or /x/.test(/x/). */
var literalSelf=/\/((?:\\.|[^\/\n])+?)\/([gimuy]*)\s*\.\s*(exec|test)\s*\(\s*\/\1\/\2\s*\)/g;
while((m=literalSelf.exec(js)))issues.push('REGEX LITERAL SELF '+m[3].toUpperCase()+' DETECTED');

js=String(js||'');
var issues=[],warnings=[],m;
if(/\breturn(?:false|true|null|undefined)\b/.test(js)){
var r=/\breturn(false|true|null|undefined)\b/g;
while((m=r.exec(js)))issues.push('JOINED TOKEN: return'+m[1])
}
var self=/\brgx\[(\d+)\]\.exec\(\s*rgx\[\1\]\s*\)/g;
while((m=self.exec(js)))warnings.push('REGEX SELF EXEC: '+m[0]);

/* Case-only unresolved function calls. */
var decl={},d=/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g;
while((m=d.exec(js)))decl[m[1].toLowerCase()]=m[1];
var call=/\b([A-Za-z_$][\w$]*)\s*\(/g;
while((m=call.exec(js))){
var low=m[1].toLowerCase(),canonical=decl[low];
if(canonical&&m[1]!==canonical){
var p=js.slice(Math.max(0,m.index-12),m.index);
if(!/\bfunction\s*$/i.test(p))warnings.push('CASE CALL: '+m[1]+' → '+canonical)
}
}
return{ok:issues.length===0,issues:Array.from(new Set(issues)),warnings:Array.from(new Set(warnings))}
}

function _flowCheck(js){
js=_stripCDATADeep(String(js||''));
var issues=[],stack=[],q=null,esc=false,line=false,block=false,regex=false,charClass=false,i=0,prevSig='';

function canStartRegex(prev){
return !prev||/[({[=,:;!&|?+\-*%^~<>]/.test(prev)
}

for(;i<js.length;i++){
var c=js[i],n=js[i+1]||'';

if(line){
if(c==='\n')line=false;
continue
}
if(block){
if(c==='*'&&n==='/'){block=false;i++}
continue
}
if(q){
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}

/* Template literal interpolation is intentionally treated as part of the
template token here. JavaScript parser below remains authoritative. */
if(c===q)q=null;
continue
}
if(regex){
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}
if(c==='['){charClass=true;continue}
if(c===']'&&charClass){charClass=false;continue}
if(c==='/'&&!charClass){
regex=false;
/* consume flags */
while(/[A-Za-z]/.test(js[i+1]||''))i++;
prevSig='/';
}
continue
}

if(c==='/'&&n==='/'){line=true;i++;continue}
if(c==='/'&&n==='*'){block=true;i++;continue}
if(c==='"'||c==="'"||c==='`'){q=c;continue}

/* Skip regex literals so braces/brackets inside regex do not corrupt flow. */
if(c==='/'&&canStartRegex(prevSig)){
regex=true;charClass=false;esc=false;continue
}

if(c==='('||c==='['||c==='{'){
stack.push(c)
}else if(c===')'||c===']'||c==='}'){
var need=c===')'?'(':c===']'?'[':'{';
var last=stack.length?stack.pop():null;
if(last!==need)issues.push('UNMATCHED '+c)
}

if(!/\s/.test(c))prevSig=c
}

if(q)issues.push('UNCLOSED STRING / TEMPLATE');
if(regex)issues.push('UNCLOSED REGEX');
if(block)issues.push('UNCLOSED BLOCK COMMENT');
if(stack.length)issues.push('UNCLOSED BLOCK');

/* JavaScript parser is authoritative. If parser accepts the source, scanner
mismatches are heuristic false positives and must not block Inject. */
try{
new Function(js);
return{ok:true,issues:[],warnings:Array.from(new Set(issues)).slice(0,8)}
}catch(e){
issues.push('SYNTAX: '+String(e&&e.message||e));
return{ok:false,issues:Array.from(new Set(issues)).slice(0,8),warnings:[]}
}
}

function _renderNormalizeOutput(){
if(S.mode!=='deobfuscate')return;
var base=String(S.normalizedBase||E.output.value||'');
if(!base)return;

var formatted;
if(S.normalizeFormat==='flush'){
formatted=_b6(base)
}else{
formatted=_safeBeautify(base)
}
if(!_syntaxValid(formatted)){
say('FINAL FORMAT ROLLBACK - VALID NORMALIZED SOURCE RESTORED');
formatted=base
}
formatted=formatted.replace(/\t/g,'  ').replace(/[ \t]+$/gm,'');

/* Whitespace cleanup itself is checked too. */
if(!_syntaxValid(formatted)){
formatted=base;
say('DISPLAY OUTPUT ROLLBACK - FORMATTER RESULT REJECTED')
}else{
S.lastSafeOutput=formatted
}

var beforeCheck=_integrityReport(base,S.originalRawSource||'');
var afterCheck=_integrityReport(formatted,S.originalRawSource||'');
if(!afterCheck.safe&&beforeCheck.safe){
formatted=String(base).replace(/\t/g,'  ').replace(/[ \t]+$/gm,'');
say('FORMAT SAFETY FALLBACK - '+_integrityFirstIssue(afterCheck))
}else if(afterCheck.safe&&afterCheck.warnings.length){
say('NORMALIZE SAFE - '+afterCheck.warnings[0])
}

var injected=false&&S.normalizeFinal;
if(injected){
try{
formatted=_j1(formatted)
}catch(_e){
injected=false;
say('INJECT FAILED - NORMALIZE RESULT KEPT')
}
}

S.integrity=_integrityReport(formatted,S.originalRawSource||'');
setOutput(formatted,injected?'INJECTED SOURCE OUTPUT':'HUMAN READABLE CODE OUTPUT',S.normalizeFinal?(S.integrity.ok?'FINAL VALID':'CHECK WARNING'):'NORMALIZED');

if(S.normalizeFinal){
if(S.integrity.safe){
if(E.resultStatus)E.resultStatus.textContent=S.integrity.warnings.length?'SAFE + WARNING':(S.bloggerMode?'BLOGGER SAFE':'FINAL VALID');
say(S.integrity.warnings.length?'FINAL SAFE - '+S.integrity.warnings[0]:(S.bloggerMode?'FINAL BLOGGER CHECK PASSED':'FINAL SCRIPT CHECK PASSED'))
}else{
if(E.resultStatus)E.resultStatus.textContent='CHECK ERROR';
say('FINAL CHECK ERROR - '+_integrityFirstIssue(S.integrity))
}
}
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

function _escapeScriptEndInStrings(src){
src=String(src||'');
var out='',i=0,q=null,esc=false,line=false,block=false;

while(i<src.length){
var c=src[i],n=src[i+1]||'';

if(line){
out+=c;
if(c==='\n')line=false;
i++;
continue
}
if(block){
out+=c;
if(c==='*'&&n==='/'){out+='/';i+=2;block=false;continue}
i++;
continue
}

if(q){
/* Inside string/template literal: neutralize literal </script so HTML parser
cannot terminate the surrounding script element. */
if(!esc&&c==='<'&&src.slice(i,i+9).toLowerCase()==='</script>'){
out+='<\\/script>';
i+=9;
continue
}
out+=c;
if(esc)esc=false;
else if(c==='\\')esc=true;
else if(c===q)q=null;
i++;
continue
}

if(c==='/'&&n==='/'){out+='//';i+=2;line=true;continue}
if(c==='/'&&n==='*'){out+='/*';i+=2;block=true;continue}
if(c==='"'||c==="'"||c==='`'){q=c;out+=c;i++;continue}

out+=c;i++
}
return out
}

function _scriptElementSafe(src){
src=String(src||'');
var original=src;
var out=_escapeScriptEndInStrings(src);

/* XML CDATA terminator inside JavaScript strings can terminate Blogger CDATA.
   Neutralize only when it appears as a literal string sequence. */
out=out.replace(/(["'`])((?:\\.|(?!\1)[\s\S])*?)\]\]>((?:\\.|(?!\1)[\s\S])*?)\1/g,function(all,q,a,b){
return q+a+']]\\x3E'+b+q
});

/* JavaScript-valid U+2028/U+2029 handling for older parsers / XML serializers. */
out=out.replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');

/* Embedding safety must never mutate valid JS into invalid JS. */
if(_syntaxValid(original)&&!_syntaxValid(out)){
say('SCRIPT EMBED ESCAPE ROLLBACK - ORIGINAL VALID PAYLOAD PRESERVED');
return original
}
return out
}

function _protectHtmlRawTextEndTags(js){
js=String(js||'');
/* HTML's SCRIPT element is a raw-text element. A literal </script sequence
   inside a JavaScript string can terminate the outer script before JS runs.
   Protect only occurrences that are inside JS quoted/template strings. */
var out='',q='',esc=false,i=0;
while(i<js.length){
var c=js[i];

if(q){
if(esc){out+=c;esc=false;i++;continue}
if(c==='\\'){out+=c;esc=true;i++;continue}
if(c===q){out+=c;q='';i++;continue}

if(c==='<'&&js.slice(i,i+9).toLowerCase()==='</script'){
out+='<\\/script';
i+=8;
continue
}
out+=c;i++;continue
}

/* Skip comments so quotes inside comments do not start string state. */
if(c==='/'&&js[i+1]==='/'){
var nl=js.indexOf('\n',i+2);
if(nl<0){out+=js.slice(i);break}
out+=js.slice(i,nl+1);i=nl+1;continue
}
if(c==='/'&&js[i+1]==='*'){
var ce=js.indexOf('*/',i+2);
if(ce<0){out+=js.slice(i);break}
out+=js.slice(i,ce+2);i=ce+2;continue
}
if(c==="'"||c==='"' || c==='`'){q=c;out+=c;i++;continue}
out+=c;i++
}
return out
}

function _rawTextSafetyCheck(js){
js=String(js||'');
var protectedJs=_protectHtmlRawTextEndTags(js);
return{
code:protectedJs,
changed:protectedJs!==js,
safe:!/<\/script/i.test(_extractStringBodiesForRawTextCheck(protectedJs))
}
}

function _extractStringBodiesForRawTextCheck(js){
/* Return only quoted/template string contents for lightweight verification. */
var out='',q='',esc=false;
for(var i=0;i<js.length;i++){
var c=js[i];
if(q){
if(esc){esc=false;continue}
if(c==='\\'){esc=true;continue}
if(c===q){q='';continue}
out+=c
}else if(c==="'"||c==='"'||c==='`')q=c
}
return out
}

function _fastInjectBuild(payload){
var raw=_getInjectSource(),t=S.injectTarget;
payload=String(payload||'').trim();
if(!raw||!payload)return'';

if(!t){
/* Fallback locator runs only if the earlier cache was unavailable. */
var found=_findObfuscatorScriptMatch(raw);
if(!found)return'';
t={
index:found.index,
length:found.full.length,
open:(found.full.match(/^<script\b[^>]*>/i)||['<script>'])[0],
hadCDATA:_hasCDATA(found.body)
};
S.injectTarget=t
}

/* Payload comes from the already-valid FULL NORMALIZE checkpoint.
   No parser, resolver, beautifier or semantic pass is allowed here. */
var body=(S.bloggerMode||t.hadCDATA)
?'//<![CDATA[\n'+payload+'\n//]]>'
:payload;

var rebuilt=t.open+'\n'+body+'\n</script>';
return raw.slice(0,t.index)+rebuilt+raw.slice(t.index+t.length)
}

function _j1(normalized){
var raw=String(S.originalRawSource||S.injectSource||''),clean=String(normalized||'').trim();
if(!raw)return clean;

clean=_stripCDATADeep(clean);

if(/^\s*<script\b/i.test(clean)){
clean=_stripCDATADeep(_stripScriptWrapper(clean)).trim()
}

/* Payload must already be valid before entering Inject. Never humanize,
   normalize or resolve again here. */
if(!_syntaxValid(clean)){
say('INJECT BUILD BLOCKED - PAYLOAD CHANGED BEFORE SOURCE BUILD');
return''
}

var embed=_scriptElementSafe(clean);
if(!_syntaxValid(embed)){
say('INJECT BUILD BLOCKED - SCRIPT EMBED SERIALIZER INVALID');
return''
}

var target=_findObfuscatorScriptMatch(raw);

if(!target){
var re=/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,m,matches=[];
while((m=re.exec(raw)))matches.push({full:m[0],body:m[1],index:m.index});

if(matches.length){
var orig=String(S.originalSource||'').trim();
for(var i=0;i<matches.length;i++){
var b=_stripCDATADeep(matches[i].body).trim();
if(orig&&(b===orig||b.indexOf(orig)>=0||orig.indexOf(b)>=0)){target=matches[i];break}
}
if(!target)target=matches.reduce(function(a,b){return b.body.length>a.body.length?b:a},matches[0])
}
}

if(target){
var open=(target.full.match(/^<script\b[^>]*>/i)||['<script>'])[0];
var newBody=(S.bloggerMode||_hasCDATA(target.body))
?'//<![CDATA[\n'+embed+'\n//]]>'
:embed;
var rebuilt=open+'\n'+newBody+'\n</script>';
return raw.slice(0,target.index)+rebuilt+raw.slice(target.index+target.full.length)
}

return embed
}

if(E.normalizeFull)E.normalizeFull.addEventListener('click',async function(){
S.injectCompleted=false;
_injectButtonState();
if(S.mode!=='deobfuscate'||!S.deobfuscateReady||!E.output.value||S.normalizeFinal||S.normalizeBusy)return;

var out=String(S.normalizedBase||E.output.value),guard=0,maxPass=8;
var seen={},lastFp='',fp='';
_busy(true,'FULL NORMALIZE - PREPARING');
setProgress(4);
if(E.resultStatus)E.resultStatus.textContent='PROCESSING';
if(E.normalizeState)E.normalizeState.textContent='Sedang menganalisis layer. Proses besar akan dihentikan otomatis bila tidak ada perubahan.';
await _ui();

try{
while(guard<maxPass){
fp=_nfingerprint(out);
if(seen[fp]){
say('NORMALIZE STOPPED - REPEATED LAYER DETECTED');
break
}
seen[fp]=1;
lastFp=fp;

var before=out,layers=_a7(before);
say('NORMALIZING LAYER '+(guard+1)+' / '+maxPass);
if(E.normalizeState)E.normalizeState.textContent='Processing layer '+(guard+1)+' dari maksimal '+maxPass+'...';
setProgress(8+Math.round((guard/maxPass)*82));
await _ui();

/* One normalize pass only. */
out=_a5(before);
fp=_nfingerprint(out);
var changed=fp!==lastFp;

S.layerIndex++;
S.layerHistory.push({
name:layers.length?layers[0]:'NORMALIZE / BEAUTIFY',
status:changed?'RESOLVED':'NO CHANGE'
});
updateLayerPanel(out,changed?'RESOLVED':'NO CHANGE');
if(changed)_rememberSafeOutput(out);

setProgress(8+Math.round(((guard+1)/maxPass)*82));
await _ui();

guard++;

/* Stop immediately if second pass produces no meaningful change. */
if(!changed)break;

/* Avoid repeatedly reprocessing a huge source when no supported layer remains. */
if(!_a8(out))break;

/* Give the browser a real event-loop break on large source. */
if(out.length>250000)await new Promise(function(r){setTimeout(r,16)});
}

S.normalizedBase=String(out);

/* Never let the final semantic pass replace valid normalized JS with broken JS. */
var beforeSemantic=S.normalizedBase;
var semFinal=_conservativeHumanize(beforeSemantic);
if(_syntaxValid(semFinal.code)){
S.normalizedBase=semFinal.code
}else{
S.normalizedBase=beforeSemantic;
say('FINAL SEMANTIC ROLLBACK - VALID SOURCE RESTORED')
}
if(semFinal.fixes.length)S.lastSemanticFixes=semFinal.fixes;
if(semFinal.warnings.length)S.lastSemanticWarnings=semFinal.warnings;

/* Store checkpoint only when pure JS is actually valid. */
if(_syntaxValid(S.normalizedBase)){
S.lastSafeOutput=S.normalizedBase
}else if(S.lastSafeOutput&&_syntaxValid(S.lastSafeOutput)){
S.normalizedBase=S.lastSafeOutput;
say('NORMALIZE SAFETY FALLBACK - LAST VALID OUTPUT RESTORED')
}
/* FULL NORMALIZE validates the normalized JavaScript payload only.
   Blogger/full-source/XML validation belongs to the Inject stage. */
var finalFlow={syntax:[],flow:[],orphan:[],identifier:[],scope:[],semantic:[],blogger:[],hard:[],warnings:[],ok:true,safe:true};
var normalizeProbe=_syntaxProbe(S.normalizedBase);

if(!normalizeProbe.ok){
finalFlow.syntax.push(normalizeProbe.message+(normalizeProbe.line?' @ line '+normalizeProbe.line+(normalizeProbe.column?':'+normalizeProbe.column:''):'')+(normalizeProbe.context?' | '+normalizeProbe.context:''))
}else{
var normalizeFlow=_flowCheck(S.normalizedBase);
if(!normalizeFlow.ok)finalFlow.flow=normalizeFlow.issues.slice(0,10);

finalFlow.orphan=_orphanCheck(S.normalizedBase);

var normalizeSemantic=_semanticCheck(S.normalizedBase);
if(!normalizeSemantic.ok)finalFlow.semantic=normalizeSemantic.issues.slice(0,10);
if(normalizeSemantic.warnings&&normalizeSemantic.warnings.length){
finalFlow.warnings=finalFlow.warnings.concat(normalizeSemantic.warnings.slice(0,10))
}

/* Completeness is informative at Normalize stage. Unresolved readable
   references do not automatically mean invalid JavaScript. */
var normalizeComplete=_deobfuscationCompleteness(S.normalizedBase);
if(!normalizeComplete.complete){
finalFlow.warnings.push(
'DEOBFUSCATION INCOMPLETE - HEX '+normalizeComplete.hex+
' | RGX '+normalizeComplete.rgx+
' | TABLE '+normalizeComplete.table+
' | PACKER '+normalizeComplete.packer
)
}

if(S.lastSemanticWarnings&&S.lastSemanticWarnings.length){
finalFlow.warnings=finalFlow.warnings.concat(S.lastSemanticWarnings.slice(0,8))
}
if(S.lastTableRollback&&S.lastTableRollback.length){
finalFlow.warnings.push('TABLE RESOLVE ROLLBACK: '+S.lastTableRollback.join(', '))
}
}

finalFlow.hard=[]
.concat(finalFlow.syntax)
.concat(finalFlow.flow)
.concat(finalFlow.orphan)
.concat(finalFlow.semantic);

finalFlow.safe=finalFlow.hard.length===0;
finalFlow.ok=finalFlow.safe;
finalFlow.warnings=Array.from(new Set(finalFlow.warnings));

S.integrity=finalFlow;
S.normalizeFinal=true;
S.normalizePassed=!!finalFlow.safe;
S.injectCompleted=false;
_injectButtonState();

setProgress(94);
say('FORMATTING FINAL OUTPUT');
if(E.normalizeState)E.normalizeState.textContent='Merapikan hasil akhir...';
await _ui();

_renderNormalizeOutput();

setProgress(100);
updateLayerPanel(S.normalizedBase,'FINAL CHECK');
setNormalizeFinal(true,finalFlow.safe?'FULL NORMALIZE COMPLETE - INJECT DATA TO SOURCE sekarang aktif.':'FULL NORMALIZE STOPPED - Integrity check belum aman.');
if(E.resultStatus)E.resultStatus.textContent=finalFlow.safe?(finalFlow.warnings.length?'NORMALIZED + WARNING':'READY TO INJECT'):'NORMALIZE CHECK ERROR';
if(finalFlow.safe){
say(finalFlow.warnings.length?'FULL NORMALIZE COMPLETE - READY TO INJECT (WARNING NON-BLOCKING)':'FULL NORMALIZE COMPLETE - READY TO INJECT');

}else{
say('FULL NORMALIZE NOT SAFE - INJECT REMAINS LOCKED - '+_integrityFirstIssue(finalFlow))
}

await _ui();
setTimeout(function(){setProgress(0)},700)
}catch(err){
if(E.resultStatus)E.resultStatus.textContent='ERROR';
if(E.normalizeState)E.normalizeState.textContent='Normalize dihentikan pada layer terakhir yang aman.';
say(err&&err.message?err.message:'NORMALIZE ERROR');
setTimeout(function(){setProgress(0)},700)
}finally{
_busy(false);
_injectButtonState()
}
});

if(E.normalizeReset)E.normalizeReset.addEventListener('click',function(){
_lockFullNormalize();
S.normalizeFinal=false;S.normalizeFormat='beautify';S.layerIndex=0;S.layerHistory=[];S.normalizedBase='';S.normalizeBusy=false;S.bloggerMode=false;S.integrity={};S.normalizePassed=false;S.injectCompleted=false;S.tableCache={};S.originalSource='';S.originalRawSource='';S.injectSource='';S.injectTarget=null;S.lastSafeOutput='';S.deobfuscateReady=false;
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

applyPreset('balanced');_renderEngineVersion();
mode('obfuscate');analyze();
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',cfGeneratorInit,{once:true})}
else{cfGeneratorInit()}
_injectButtonState();
if(E.normalizeFull)E.normalizeFull.disabled=true;
})();
