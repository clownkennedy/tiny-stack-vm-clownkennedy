import fs from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
function run(p,q){const S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256)
let s=0,c=0,pc=0,n=0,i=0,a,b,r,t,o=[],f=e=>({out:Uint8Array.from(o),exit:e})
while(1){if(n>=1e6)return f(10);if(pc<0||pc>=p.length)return f(9)
const k=p[pc],l=k==1?1:k==2?4:k>47&&k<52?2:0
if(pc+1+l>p.length)return f(9)
const w=l==2?p[pc+1]|p[pc+2]<<8:0
n++
switch(k){
case 0:return f(0)
case 1:if(s>255)return f(3);S[s++]=(p[pc+1]<<24)>>24;pc+=2;break
case 2:if(s>255)return f(3);S[s++]=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;pc+=5;break
case 3:if(!s)return f(2);s--;pc++;break
case 4:if(!s)return f(2);if(s>255)return f(3);S[s]=S[s-1];s++;pc++;break
case 5:if(s<2)return f(2);t=S[s-1];S[s-1]=S[s-2];S[s-2]=t;pc++;break
case 6:if(s<2)return f(2);if(s>255)return f(3);S[s]=S[s-2];s++;pc++;break
case 7:if(s<3)return f(2);a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a;pc++;break
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:
if(s<2)return f(2);b=S[--s];a=S[s-1]
switch(k){
case 16:r=a+b;break
case 17:r=a-b;break
case 18:r=Math.imul(a,b);break
case 19:if(!b)return f(4);r=(a/b)|0;break
case 20:if(!b)return f(4);r=a%b;break
case 21:if(!b)return f(4);r=Math.floor((a>>>0)/(b>>>0))|0;break
case 22:if(!b)return f(4);r=(a>>>0)%(b>>>0)|0;break
case 24:r=a&b;break
case 25:r=a|b;break
case 26:r=a^b;break
case 28:r=a<<(b&31);break
case 29:r=a>>(b&31);break
case 30:r=a>>>(b&31);break
case 32:r=a==b?1:0;break
case 33:r=a<b?1:0;break
case 34:r=(a>>>0)<(b>>>0)?1:0;break}
S[s-1]=r;pc++;break
case 23:if(!s)return f(2);S[s-1]=-S[s-1];pc++;break
case 27:if(!s)return f(2);S[s-1]=~S[s-1];pc++;break
case 48:pc=pc+3+((w<<16)>>16);break
case 49:case 50:if(!s)return f(2);a=S[--s];b=(w<<16)>>16;pc=(k==49?a==0:a!=0)?pc+3+b:pc+3;break
case 51:if(c>63)return f(7);C[c++]=pc+3;pc=w;break
case 52:if(!c)return f(8);pc=C[--c];break
case 64:if(!s)return f(2);a=S[s-1];if(a<0||a>255)return f(6);S[s-1]=M[a];pc++;break
case 65:if(s<2)return f(2);a=S[--s];b=S[--s];if(a<0||a>255)return f(6);M[a]=b;pc++;break
case 80:if(!s)return f(2);a=String(S[--s]);if(o.length+a.length>65536)return f(11);for(let j=0;j<a.length;j++)o.push(a.charCodeAt(j));pc++;break
case 81:if(!s)return f(2);if(o.length>65535)return f(11);o.push(S[--s]&255);pc++;break
case 82:if(s>255)return f(3);S[s++]=i<q.length?q[i++]:-1;pc++;break
case 83:if(!s)return f(2);return f(S[--s]&255)
default:return f(5)}}}
for(const d of fs.readdirSync(I).sort()){const D=I+'/'+d;if(!fs.statSync(D).isDirectory())continue
const x=run(fs.readFileSync(D+'/program.bin'),fs.readFileSync(D+'/input.bin'))
fs.mkdirSync(O+'/'+d,{recursive:true});fs.writeFileSync(O+'/'+d+'/stdout.bin',x.out);fs.writeFileSync(O+'/'+d+'/exit.txt',x.exit+'\n')}
