E.layerRemaining.textContent=remaining;
E.layerStatus.textContent=status||'ANALYZED';
E.layerResult.textContent=S.normalizeFinal?'FINAL LAYER':(remaining?'LAYER DETECTED':'READY');
if(!S.layerHistory.length){E.layerList.innerHTML='<span>No layer processed yet.</span>';return}
E.layerList.innerHTML=S.layerHistory.map(function(x,i){return '<div class="cfObLayerItem"><b>Layer '+(i+1)+' - '+x.name+'</b><em>'+x.status+'</em></div>'}).join('')
}
function hasNormalizeLayer(s){s=String(s||'');return /eval\(function\(p,a,c,k,e,|\\x[0-9a-f]{2}|\\u[0-9a-f]{4}|String\.fromCharCode\s*\(|\b(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*\[(?:\s*['"][\s\S]*?['"]\s*,?){3,}\]|\b(?:_0x[a-f0-9]+|__0x[a-f0-9]+|_\$[A-Za-z0-9]+)\b/i.test(s)}
function setNormalizeFinal(on,msg){S.normalizeFinal=!!on;E.normalizePanel.classList.toggle('is-final',!!on);if(E.normalizeState)E.normalizeState.textContent=msg||(on?'Final layer reached. Tidak ada layer Normalize yang terdeteksi lagi.':'Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.');E.normalize.disabled=!!on||!(S.mode==='deobfuscate'&&E.output.value);E.normalize.innerHTML=on?'<i class="fa fa-check-circle"></i> FINAL LAYER':'<i class="fa fa-magic"></i> NORMALIZE OUTPUT'}
async function deobfuscate(src){src=extractJS(src);var cf=await deobfuscateCF(src);if(cf!==null)return beautify(cf);var out=unpackPacker(src);out=decodeEscapes(out);out=resolveSimpleStringArrays(out);return beautify(out)}
function analyze(){var s=E.input.value||'',len=s.length,lines=s?s.split(/\r?\n/).length:0;$('cfObSize').textContent=kb(s);$('cfObChars').textContent=len.toLocaleString();$('cfObLines').textContent=lines.toLocaleString();$('cfObFunctions').textContent=((s.match(/\bfunction\b|=>/g)||[]).length).toLocaleString();$('cfObVariables').textContent=((s.match(/\b(?:var|let|const)\b/g)||[]).length).toLocaleString();$('cfObStringCount').textContent=((s.match(/(['"`])(?:\\.|(?!\1)[\s\S])*?\1/g)||[]).length).toLocaleString();var pat='NORMAL / UNKNOWN',eng='GENERIC / UNKNOWN',comp='LOW',rec=95;if(parseCF(s)){pat='CODEFLARE PROTECTED';eng='CODEFLARE JS5';comp='MEDIUM';rec=99}else if(/eval\(function\(p,a,c,k,e,/.test(s)){pat='P.A.C.K.E.R / BASE62';eng='PACKER COMPATIBLE';comp='HIGH';rec=82}else if(/\\x[0-9a-f]{2}|\\u[0-9a-f]{4}/i.test(s)){pat='HEX / UNICODE ESCAPE';comp='MEDIUM';rec=90}else if(/_0x[a-f0-9]+/i.test(s)){pat='MANGLED IDENTIFIER';comp='MEDIUM';rec=78}$('cfObPattern').textContent=pat;$('cfObSourceEngine').textContent=eng;$('cfObComplexity').textContent=comp;$('cfObRecommended').textContent=S.mode==='obfuscate'?'OBFUSCATE':S.mode==='deobfuscate'?'DEOBFUSCATE - NORMALIZE':'CODE TOOLS';$('cfObRecoveryValue').textContent=rec+'%';$('cfObRecoveryBar').style.width=rec+'%';$('cfObAnalyzeState').textContent=s?'ANALYZED':'WAITING INPUT'}
function mode(m){S.mode=m;if(E.inputLabel){E.inputLabel.innerHTML=m==='tools'?'<i class="fa fa-terminal"></i> CODE INPUT HTML | CSS | JS | TEXT':m==='deobfuscate'?'<i class="fa fa-terminal"></i> JAVASCRIPT INPUT - DEOBFUSCATE':'<i class="fa fa-terminal"></i> JAVASCRIPT INPUT';}tool.querySelectorAll('.cfObModeBtn').forEach(function(b){b.classList.toggle('active',b.dataset.mode===m)});E.tools.style.display=m==='tools'?'block':'none';E.process.style.display=m==='tools'?'none':'block';E.passBox.style.display=m==='obfuscate'?'block':'none';E.accessBox.style.display='none';E.normalizePanel.style.display=m==='deobfuscate'?'flex':'none';E.normalize.disabled=S.normalizeFinal||!(m==='deobfuscate'&&E.output.value);if(m!=='deobfuscate'){E.normalizePanel.classList.remove('is-final')}setTechEnabled(m==='obfuscate');if(m==='obfuscate'){E.process.innerHTML='<i class="fa fa-cogs"></i> OBFUSCATE CODE';E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> ENCRYPTION CODE OUTPUT'}else if(m==='deobfuscate'){E.process.innerHTML='<i class="fa fa-unlock-alt"></i> DEOBFUSCATE CODE';E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> DEOBFUSCATION CODE OUTPUT'}else E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> CODE TOOLS OUTPUT';analyze();say('READY')}
tool.querySelectorAll('.cfObModeBtn').forEach(function(b){b.addEventListener('click',function(){mode(b.dataset.mode)})});
tool.querySelectorAll('#cfObPreset button').forEach(function(b){b.addEventListener('click',function(){if(S.mode!=='obfuscate')return;if(b.dataset.preset==='custom'){customPreset()}else applyPreset(b.dataset.preset)})});
tool.querySelectorAll('[data-tech]').forEach(function(x){x.addEventListener('change',function(){
if(S.mode!=='obfuscate')return;
customPreset();
if(x.dataset.tech==='domain'){
E.domain.disabled=!x.checked;
if(!x.checked)E.domain.classList.remove('cfObFieldError');
}
updateTechSummary();
})});
E.domain.addEventListener('input',function(){
if(this.value.trim())this.classList.remove('cfObFieldError');
updateTechSummary();
});
E.input.addEventListener('input',analyze);
E.passEnable.addEventListener('change',function(){E.passBox.classList.toggle('active',this.checked);if(!this.checked){E.pass.classList.remove('cfObFieldError');E.pass2.classList.remove('cfObFieldError')}});
[E.pass,E.pass2].forEach(function(el){el.addEventListener('input',function(){if(this.value.trim())this.classList.remove('cfObFieldError')})});
tool.querySelectorAll('.cfObPassEye').forEach(function(b){b.addEventListener('click',function(){var i=b.parentNode.querySelector('input'),show=i.type==='password';i.type=show?'text':'password';b.querySelector('i').className=show?'fa fa-eye-slash':'fa fa-eye'})});
E.paste.addEventListener('click',async function(){try{E.input.value=await navigator.clipboard.readText();analyze();say('PASTED')}catch(e){E.input.focus();say('USE CTRL+V')}});
E.clear.addEventListener('click',function(){E.input.value='';S.normalizeFinal=false;S.layerIndex=0;S.layerHistory=[];E.normalizePanel.classList.remove('is-final');E.normalizeState.textContent='Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.';E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';setOutput('','','READY');E.normalize.disabled=true;updateLayerPanel('','WAITING');analyze();say('CLEARED')});
E.copy.addEventListener('click',async function(){if(!E.output.value)return;try{await navigator.clipboard.writeText(E.output.value);say('COPIED')}catch(e){E.output.select();document.execCommand('copy');say('COPIED')}});
E.copyScript.addEventListener('click',async function(){
if(!E.output.value)return;
var code=E.output.value.replace(/^\s*<script\b[^>]*>/i,'').replace(/<\/script\s*>\s*$/i,'').trim();
var wrapped='<script>\n'+code+'\n<\/script>';
try{await navigator.clipboard.writeText(wrapped);say('SCRIPT TAG COPIED')}catch(e){
var ta=document.createElement('textarea');ta.value=wrapped;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);say('SCRIPT TAG COPIED')
}
});
E.process.addEventListener('click',async function(){var src=E.input.value;if(!src.trim()){say('INPUT EMPTY');return}setProgress(20);E.process.disabled=true;try{var out;if(S.mode==='obfuscate'){out=await obfuscate(src);setOutput(out,'ENCRYPTION CODE OUTPUT','SUCCESS')}else{out=await deobfuscate(src);S.layerIndex=0;S.layerHistory=[];setNormalizeFinal(false,'Deobfuscation selesai - NORMALIZE OUTPUT untuk membuka dan merapikan layer berikutnya.');setOutput(out,'DEOBFUSCATION CODE OUTPUT','SUCCESS');E.normalize.disabled=!out;updateLayerPanel(out,'ANALYZED')}setProgress(100);say('SUCCESS')}catch(e){say(e.message||'PROCESS ERROR');E.resultStatus.textContent='ERROR'}finally{E.process.disabled=false;setTimeout(function(){setProgress(0)},500)}});
function reformatNormalizedOutput(){
if(S.mode!=='deobfuscate'||!E.output.value)return;
var current=E.output.value;
var formatted=S.normalizeFormat==='flush'?cfFlushLeft(current):beautify(current);
setOutput(formatted,'HUMAN READABLE CODE OUTPUT',S.normalizeFinal?'FINAL LAYER':'NORMALIZED');
if(S.normalizeFinal){E.resultStatus.textContent='FINAL LAYER'}
}
E.normalizeBeautify.addEventListener('change',function(){
if(this.checked){
E.normalizeFlush.checked=false;
S.normalizeFormat='beautify';
reformatNormalizedOutput();
}else if(!E.normalizeFlush.checked){
this.checked=true;
S.normalizeFormat='beautify';
}
});
E.normalizeFlush.addEventListener('change',function(){
if(this.checked){
E.normalizeBeautify.checked=false;
S.normalizeFormat='flush';
reformatNormalizedOutput();
}else if(!E.normalizeBeautify.checked){
this.checked=true;
S.normalizeFormat='flush';
}
});
E.normalize.addEventListener('click',function(){
if(S.mode!=='deobfuscate'||!E.output.value)return;
if(S.normalizeFinal){say('FINAL LAYER REACHED');return}
var before=E.output.value,beforeLayers=detectNormalizeLayers(before),out=normalize(before),changed=out.trim()!==before.trim();
S.layerIndex++;
S.layerHistory.push({name:beforeLayers.length?beforeLayers[0]:'NORMALIZE / BEAUTIFY',status:changed?'RESOLVED':'NO CHANGE'});
setOutput(out,'HUMAN READABLE CODE OUTPUT','NORMALIZED');
var remain=hasNormalizeLayer(out);
updateLayerPanel(out,remain?'NEXT LAYER':'FINAL CHECK');
if(!remain||!changed){
setNormalizeFinal(true,'FINAL LAYER REACHED - Hasil sudah berada pada layer terakhir yang dapat dinormalisasi otomatis.');updateLayerPanel(out,'FINAL LAYER');
E.resultStatus.textContent='FINAL LAYER';
say('FINAL LAYER REACHED');
}else{
setNormalizeFinal(false,'Layer lain masih terdeteksi. Tekan NORMALIZE OUTPUT untuk melanjutkan.');
E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE NEXT LAYER';
say('NEXT LAYER DETECTED');
}
});
E.normalizeReset.addEventListener('click',function(){
S.normalizeFinal=false;
S.normalizeFormat='beautify';
S.layerIndex=0;
S.layerHistory=[];
E.normalizeBeautify.checked=true;
E.normalizeFlush.checked=false;
E.input.value='';
setOutput('','','READY');
E.access.value='';
E.accessBox.style.display='none';
E.normalizePanel.classList.remove('is-final');
E.normalizeState.textContent='Reset selesai. Paste kode baru lalu jalankan DEOBFUSCATE.';
E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';
E.normalize.disabled=true;updateLayerPanel('','WAITING');
analyze();
E.input.focus();
say('READY FOR NEW CODE');
});
tool.querySelectorAll('.cfObToolCard').forEach(function(b){b.addEventListener('click',function(){var src=E.input.value;if(!src.trim()){say('INPUT EMPTY');return}var a=b.dataset.action,r='';if(a==='beautify')r=beautify(src);if(a==='minify')r=minify(src);if(a==='bloggerParse')r=bloggerParse(src);if(a==='bloggerUnparse')r=bloggerUnparse(src);setOutput(r,a==='beautify'?'BEAUTIFIED CODE OUTPUT':a==='minify'?'MINIFIED CODE OUTPUT':a==='bloggerParse'?'BLOGGER PARSED OUTPUT':'BLOGGER UNPARSED OUTPUT','SUCCESS');say('SUCCESS')})});
tool.querySelectorAll('.cfObParserToggle button').forEach(function(b){b.addEventListener('click',function(){tool.querySelectorAll('.cfObParserToggle button').forEach(function(x){x.classList.remove('active')});b.classList.add('active');S.parserFormat=b.dataset.format||'beautify'})});
var themeBtns=tool.querySelectorAll('.cfObThemeBtn');function theme(t){S.theme=t;tool.dataset.theme=t;themeBtns.forEach(function(b){b.classList.toggle('active',b.dataset.theme===t)});try{localStorage.setItem('cfObTheme',t)}catch(e){}}themeBtns.forEach(function(b){b.addEventListener('click',function(){theme(b.dataset.theme)})});try{theme(localStorage.getItem('cfObTheme')||'auto')}catch(e){theme('auto')}
applyPreset('balanced');mode('obfuscate');analyze();
})();
E.layerRemaining.textContent=remaining;
E.layerStatus.textContent=status||'ANALYZED';
E.layerResult.textContent=S.normalizeFinal?'FINAL LAYER':(remaining?'LAYER DETECTED':'READY');
if(!S.layerHistory.length){E.layerList.innerHTML='<span>No layer processed yet.</span>';return}
E.layerList.innerHTML=S.layerHistory.map(function(x,i){return '<div class="cfObLayerItem"><b>Layer '+(i+1)+' - '+x.name+'</b><em>'+x.status+'</em></div>'}).join('')
}
function hasNormalizeLayer(s){s=String(s||'');return /eval\(function\(p,a,c,k,e,|\\x[0-9a-f]{2}|\\u[0-9a-f]{4}|String\.fromCharCode\s*\(|\b(?:var|let|const)\s+[A-Za-z_$][\w$]*\s*=\s*\[(?:\s*['"][\s\S]*?['"]\s*,?){3,}\]|\b(?:_0x[a-f0-9]+|__0x[a-f0-9]+|_\$[A-Za-z0-9]+)\b/i.test(s)}
function setNormalizeFinal(on,msg){S.normalizeFinal=!!on;E.normalizePanel.classList.toggle('is-final',!!on);if(E.normalizeState)E.normalizeState.textContent=msg||(on?'Final layer reached. Tidak ada layer Normalize yang terdeteksi lagi.':'Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.');E.normalize.disabled=!!on||!(S.mode==='deobfuscate'&&E.output.value);E.normalize.innerHTML=on?'<i class="fa fa-check-circle"></i> FINAL LAYER':'<i class="fa fa-magic"></i> NORMALIZE OUTPUT'}
async function deobfuscate(src){src=extractJS(src);var cf=await deobfuscateCF(src);if(cf!==null)return beautify(cf);var out=unpackPacker(src);out=decodeEscapes(out);out=resolveSimpleStringArrays(out);return beautify(out)}
function analyze(){var s=E.input.value||'',len=s.length,lines=s?s.split(/\r?\n/).length:0;$('cfObSize').textContent=kb(s);$('cfObChars').textContent=len.toLocaleString();$('cfObLines').textContent=lines.toLocaleString();$('cfObFunctions').textContent=((s.match(/\bfunction\b|=>/g)||[]).length).toLocaleString();$('cfObVariables').textContent=((s.match(/\b(?:var|let|const)\b/g)||[]).length).toLocaleString();$('cfObStringCount').textContent=((s.match(/(['"`])(?:\\.|(?!\1)[\s\S])*?\1/g)||[]).length).toLocaleString();var pat='NORMAL / UNKNOWN',eng='GENERIC / UNKNOWN',comp='LOW',rec=95;if(parseCF(s)){pat='CODEFLARE PROTECTED';eng='CODEFLARE JS5';comp='MEDIUM';rec=99}else if(/eval\(function\(p,a,c,k,e,/.test(s)){pat='P.A.C.K.E.R / BASE62';eng='PACKER COMPATIBLE';comp='HIGH';rec=82}else if(/\\x[0-9a-f]{2}|\\u[0-9a-f]{4}/i.test(s)){pat='HEX / UNICODE ESCAPE';comp='MEDIUM';rec=90}else if(/_0x[a-f0-9]+/i.test(s)){pat='MANGLED IDENTIFIER';comp='MEDIUM';rec=78}$('cfObPattern').textContent=pat;$('cfObSourceEngine').textContent=eng;$('cfObComplexity').textContent=comp;$('cfObRecommended').textContent=S.mode==='obfuscate'?'OBFUSCATE':S.mode==='deobfuscate'?'DEOBFUSCATE - NORMALIZE':'CODE TOOLS';$('cfObRecoveryValue').textContent=rec+'%';$('cfObRecoveryBar').style.width=rec+'%';$('cfObAnalyzeState').textContent=s?'ANALYZED':'WAITING INPUT'}
function mode(m){S.mode=m;if(E.inputLabel){E.inputLabel.innerHTML=m==='tools'?'<i class="fa fa-terminal"></i> CODE INPUT HTML | CSS | JS | TEXT':m==='deobfuscate'?'<i class="fa fa-terminal"></i> JAVASCRIPT INPUT - DEOBFUSCATE':'<i class="fa fa-terminal"></i> JAVASCRIPT INPUT';}tool.querySelectorAll('.cfObModeBtn').forEach(function(b){b.classList.toggle('active',b.dataset.mode===m)});E.tools.style.display=m==='tools'?'block':'none';E.process.style.display=m==='tools'?'none':'block';E.passBox.style.display=m==='obfuscate'?'block':'none';E.accessBox.style.display='none';E.normalizePanel.style.display=m==='deobfuscate'?'flex':'none';E.normalize.disabled=S.normalizeFinal||!(m==='deobfuscate'&&E.output.value);if(m!=='deobfuscate'){E.normalizePanel.classList.remove('is-final')}setTechEnabled(m==='obfuscate');if(m==='obfuscate'){E.process.innerHTML='<i class="fa fa-cogs"></i> OBFUSCATE CODE';E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> ENCRYPTION CODE OUTPUT'}else if(m==='deobfuscate'){E.process.innerHTML='<i class="fa fa-unlock-alt"></i> DEOBFUSCATE CODE';E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> DEOBFUSCATION CODE OUTPUT'}else E.outTitle.innerHTML='<i class="fa fa-file-code-o"></i> CODE TOOLS OUTPUT';analyze();say('READY')}
tool.querySelectorAll('.cfObModeBtn').forEach(function(b){b.addEventListener('click',function(){mode(b.dataset.mode)})});
tool.querySelectorAll('#cfObPreset button').forEach(function(b){b.addEventListener('click',function(){if(S.mode!=='obfuscate')return;if(b.dataset.preset==='custom'){customPreset()}else applyPreset(b.dataset.preset)})});
tool.querySelectorAll('[data-tech]').forEach(function(x){x.addEventListener('change',function(){
if(S.mode!=='obfuscate')return;
customPreset();
if(x.dataset.tech==='domain'){
E.domain.disabled=!x.checked;
if(!x.checked)E.domain.classList.remove('cfObFieldError');
}
updateTechSummary();
})});
E.domain.addEventListener('input',function(){
if(this.value.trim())this.classList.remove('cfObFieldError');
updateTechSummary();
});
E.input.addEventListener('input',analyze);
E.passEnable.addEventListener('change',function(){E.passBox.classList.toggle('active',this.checked);if(!this.checked){E.pass.classList.remove('cfObFieldError');E.pass2.classList.remove('cfObFieldError')}});
[E.pass,E.pass2].forEach(function(el){el.addEventListener('input',function(){if(this.value.trim())this.classList.remove('cfObFieldError')})});
tool.querySelectorAll('.cfObPassEye').forEach(function(b){b.addEventListener('click',function(){var i=b.parentNode.querySelector('input'),show=i.type==='password';i.type=show?'text':'password';b.querySelector('i').className=show?'fa fa-eye-slash':'fa fa-eye'})});
E.paste.addEventListener('click',async function(){try{E.input.value=await navigator.clipboard.readText();analyze();say('PASTED')}catch(e){E.input.focus();say('USE CTRL+V')}});
E.clear.addEventListener('click',function(){E.input.value='';S.normalizeFinal=false;S.layerIndex=0;S.layerHistory=[];E.normalizePanel.classList.remove('is-final');E.normalizeState.textContent='Multi-pass decode, humanize identifier dan beautify hasil Deobfuscate.';E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';setOutput('','','READY');E.normalize.disabled=true;updateLayerPanel('','WAITING');analyze();say('CLEARED')});
E.copy.addEventListener('click',async function(){if(!E.output.value)return;try{await navigator.clipboard.writeText(E.output.value);say('COPIED')}catch(e){E.output.select();document.execCommand('copy');say('COPIED')}});
E.copyScript.addEventListener('click',async function(){
if(!E.output.value)return;
var code=E.output.value.replace(/^\s*<script\b[^>]*>/i,'').replace(/<\/script\s*>\s*$/i,'').trim();
var wrapped='<script>\n'+code+'\n<\/script>';
try{await navigator.clipboard.writeText(wrapped);say('SCRIPT TAG COPIED')}catch(e){
var ta=document.createElement('textarea');ta.value=wrapped;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);say('SCRIPT TAG COPIED')
}
});
E.process.addEventListener('click',async function(){var src=E.input.value;if(!src.trim()){say('INPUT EMPTY');return}setProgress(20);E.process.disabled=true;try{var out;if(S.mode==='obfuscate'){out=await obfuscate(src);setOutput(out,'ENCRYPTION CODE OUTPUT','SUCCESS')}else{out=await deobfuscate(src);S.layerIndex=0;S.layerHistory=[];setNormalizeFinal(false,'Deobfuscation selesai - NORMALIZE OUTPUT untuk membuka dan merapikan layer berikutnya.');setOutput(out,'DEOBFUSCATION CODE OUTPUT','SUCCESS');E.normalize.disabled=!out;updateLayerPanel(out,'ANALYZED')}setProgress(100);say('SUCCESS')}catch(e){say(e.message||'PROCESS ERROR');E.resultStatus.textContent='ERROR'}finally{E.process.disabled=false;setTimeout(function(){setProgress(0)},500)}});
function reformatNormalizedOutput(){
if(S.mode!=='deobfuscate'||!E.output.value)return;
var current=E.output.value;
var formatted=S.normalizeFormat==='flush'?cfFlushLeft(current):beautify(current);
setOutput(formatted,'HUMAN READABLE CODE OUTPUT',S.normalizeFinal?'FINAL LAYER':'NORMALIZED');
if(S.normalizeFinal){E.resultStatus.textContent='FINAL LAYER'}
}
E.normalizeBeautify.addEventListener('change',function(){
if(this.checked){
E.normalizeFlush.checked=false;
S.normalizeFormat='beautify';
reformatNormalizedOutput();
}else if(!E.normalizeFlush.checked){
this.checked=true;
S.normalizeFormat='beautify';
}
});
E.normalizeFlush.addEventListener('change',function(){
if(this.checked){
E.normalizeBeautify.checked=false;
S.normalizeFormat='flush';
reformatNormalizedOutput();
}else if(!E.normalizeBeautify.checked){
this.checked=true;
S.normalizeFormat='flush';
}
});
E.normalize.addEventListener('click',function(){
if(S.mode!=='deobfuscate'||!E.output.value)return;
if(S.normalizeFinal){say('FINAL LAYER REACHED');return}
var before=E.output.value,beforeLayers=detectNormalizeLayers(before),out=normalize(before),changed=out.trim()!==before.trim();
S.layerIndex++;
S.layerHistory.push({name:beforeLayers.length?beforeLayers[0]:'NORMALIZE / BEAUTIFY',status:changed?'RESOLVED':'NO CHANGE'});
setOutput(out,'HUMAN READABLE CODE OUTPUT','NORMALIZED');
var remain=hasNormalizeLayer(out);
updateLayerPanel(out,remain?'NEXT LAYER':'FINAL CHECK');
if(!remain||!changed){
setNormalizeFinal(true,'FINAL LAYER REACHED - Hasil sudah berada pada layer terakhir yang dapat dinormalisasi otomatis.');updateLayerPanel(out,'FINAL LAYER');
E.resultStatus.textContent='FINAL LAYER';
say('FINAL LAYER REACHED');
}else{
setNormalizeFinal(false,'Layer lain masih terdeteksi. Tekan NORMALIZE OUTPUT untuk melanjutkan.');
E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE NEXT LAYER';
say('NEXT LAYER DETECTED');
}
});
E.normalizeReset.addEventListener('click',function(){
S.normalizeFinal=false;
S.normalizeFormat='beautify';
S.layerIndex=0;
S.layerHistory=[];
E.normalizeBeautify.checked=true;
E.normalizeFlush.checked=false;
E.input.value='';
setOutput('','','READY');
E.access.value='';
E.accessBox.style.display='none';
E.normalizePanel.classList.remove('is-final');
E.normalizeState.textContent='Reset selesai. Paste kode baru lalu jalankan DEOBFUSCATE.';
E.normalize.innerHTML='<i class="fa fa-magic"></i> NORMALIZE OUTPUT';
E.normalize.disabled=true;updateLayerPanel('','WAITING');
analyze();
E.input.focus();
say('READY FOR NEW CODE');
});
tool.querySelectorAll('.cfObToolCard').forEach(function(b){b.addEventListener('click',function(){var src=E.input.value;if(!src.trim()){say('INPUT EMPTY');return}var a=b.dataset.action,r='';if(a==='beautify')r=beautify(src);if(a==='minify')r=minify(src);if(a==='bloggerParse')r=bloggerParse(src);if(a==='bloggerUnparse')r=bloggerUnparse(src);setOutput(r,a==='beautify'?'BEAUTIFIED CODE OUTPUT':a==='minify'?'MINIFIED CODE OUTPUT':a==='bloggerParse'?'BLOGGER PARSED OUTPUT':'BLOGGER UNPARSED OUTPUT','SUCCESS');say('SUCCESS')})});
tool.querySelectorAll('.cfObParserToggle button').forEach(function(b){b.addEventListener('click',function(){tool.querySelectorAll('.cfObParserToggle button').forEach(function(x){x.classList.remove('active')});b.classList.add('active');S.parserFormat=b.dataset.format||'beautify'})});
var themeBtns=tool.querySelectorAll('.cfObThemeBtn');function theme(t){S.theme=t;tool.dataset.theme=t;themeBtns.forEach(function(b){b.classList.toggle('active',b.dataset.theme===t)});try{localStorage.setItem('cfObTheme',t)}catch(e){}}themeBtns.forEach(function(b){b.addEventListener('click',function(){theme(b.dataset.theme)})});try{theme(localStorage.getItem('cfObTheme')||'auto')}catch(e){theme('auto')}
applyPreset('balanced');mode('obfuscate');analyze();
})();
