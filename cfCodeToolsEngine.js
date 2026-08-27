/* CodeFlare Code Tools Engine - v3.14 modular */
(function(g){
'use strict';

function escHTML(s){
return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}
function unescHTML(s){
var ta=document.createElement('textarea');ta.innerHTML=String(s);return ta.value
}
function stripComments(s){
s=String(s||'');var out='',i=0,q=null,esc=false,line=false,block=false;
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
return stripComments(s).replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n[ \t]+/g,'\n').replace(/\n{2,}/g,'\n').replace(/\s*([{};,=:])\s*/g,'$1').trim()
}

/* Readable JS formatter: physical newlines + 2-space indentation. */
function beautifySource(s){
s=String(s||'').replace(/\r\n?/g,'\n').replace(/\t/g,'  ');
var out='',indent=0,lineStart=true,pending=false,q=null,esc=false,lineComment=false,blockComment=false,paren=0,bracket=0;
function pad(){return'  '.repeat(Math.max(0,indent))}
function trim(){out=out.replace(/[ ]+$/,'')}
function nl(){trim();if(!out.endsWith('\n'))out+='\n';lineStart=true;pending=false}
function write(x){
if(lineStart){out+=pad();lineStart=false}
if(pending&&out&&!/[ \n]$/.test(out)&&!/[;,)\]]/.test(x))out+=' ';
pending=false;out+=x
}
for(var i=0;i<s.length;i++){
var c=s[i],n=s[i+1]||'';
if(lineComment){write(c);if(c==='\n'){lineComment=false;lineStart=true}continue}
if(blockComment){write(c);if(c==='*'&&n==='/'){write('/');i++;blockComment=false}continue}
if(q){write(c);if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;continue}
if(c==='/'&&n==='/'){write('//');i++;lineComment=true;continue}
if(c==='/'&&n==='*'){write('/*');i++;blockComment=true;continue}
if(c==='"'||c==="'"||c==='`'){write(c);q=c;continue}
if(/\s/.test(c)){pending=true;continue}
if(c==='('){write(c);paren++;continue}
if(c===')'){write(c);paren=Math.max(0,paren-1);continue}
if(c==='['){write(c);bracket++;continue}
if(c===']'){write(c);bracket=Math.max(0,bracket-1);continue}
if(c==='{'){if(!lineStart&&out&&!/[ \n]$/.test(out))out+=' ';write('{');indent++;nl();continue}
if(c==='}'){
trim();if(!lineStart)nl();indent=Math.max(0,indent-1);write('}');
var tail=s.slice(i+1).match(/^\s*(else\b|catch\b|finally\b|while\s*\()/);
if(tail){out+=' ';continue}
var next=s.slice(i+1).match(/^\s*([;,)\]])/);
if(!next)nl();
continue
}
if(c===';'){write(';');if(paren===0&&bracket===0)nl();continue}
if(c===','){write(',');pending=true;continue}
write(c)
}
trim();
return out.replace(/[ ]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').replace(/^\s*\n/,'').replace(/\n\s*$/,'')
}

/* Blogger-ready Beautify: escape HTML, convert each newline to <br />,
   preserve indentation with &nbsp;. */
function bloggerBeautify(s){
var v=beautifySource(s);
v=escHTML(v);
return v.split('\n').map(function(line){
var m=line.match(/^(\s*)/),lead=m?m[1].length:0;
return '&nbsp;'.repeat(lead)+line.slice(lead)
}).join('<br />\n')
}
function bloggerMinify(s){return escHTML(minify(s))}
function bloggerParse(s,format){return format==='minify'?bloggerMinify(s):bloggerBeautify(s)}
function bloggerUnparse(s){
return beautifySource(unescHTML(String(s||'').replace(/<br\s*\/?>/gi,'\n').replace(/&nbsp;/gi,' ')))
}

g.CFCodeToolsEngine=Object.freeze({
version:'3.14-modular',
beautify:beautifySource,
minify:minify,
bloggerBeautify:bloggerBeautify,
bloggerMinify:bloggerMinify,
bloggerParse:bloggerParse,
bloggerUnparse:bloggerUnparse
});
})(window);
