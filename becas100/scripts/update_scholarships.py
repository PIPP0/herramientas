#!/usr/bin/env python3
import json,re,ssl,sys
from datetime import date,datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin,urlparse
from urllib.request import Request,urlopen
ROOT=Path(__file__).resolve().parents[1]; UA='Becas100Bot/1.0 (+https://github.com/)'; TIMEOUT=18
KEYWORDS=('beca','scholarship','convocatoria','maestr','master','magister','doctorado','diplomado','curso','inteligencia artificial',' ia ')
FULL=('100%','100 %','beca completa','beca total','matrícula completa','matricula completa','arancel completo','totalmente financiada','financiación completa','financiacion completa','fully funded')
PARTIAL=('hasta 100%','hasta el 100%','up to 100%')
class Links(HTMLParser):
 def __init__(self): super().__init__(); self.links=[]; self.href=None; self.txt=[]
 def handle_starttag(self,tag,attrs):
  if tag=='a': self.href=dict(attrs).get('href'); self.txt=[]
 def handle_data(self,data):
  if self.href is not None: self.txt.append(data)
 def handle_endtag(self,tag):
  if tag=='a' and self.href is not None: self.links.append((self.href,' '.join(self.txt).strip())); self.href=None; self.txt=[]
def fetch(url):
 req=Request(url,headers={'User-Agent':UA,'Accept':'text/html,application/xhtml+xml'}); ctx=ssl.create_default_context()
 with urlopen(req,timeout=TIMEOUT,context=ctx) as r:
  ctype=r.headers.get('content-type','')
  if 'text' not in ctype and 'html' not in ctype:return ''
  return r.read(700_000).decode('utf-8','ignore')
def textify(html):
 s=re.sub(r'<script[\s\S]*?</script>|<style[\s\S]*?</style>',' ',html,flags=re.I); s=re.sub(r'<[^>]+>',' ',s); return re.sub(r'\s+',' ',s).strip()
def classify_status(deadline):
 if not deadline:return None
 try:return 'open' if date.fromisoformat(deadline)>=date.today() else 'closed'
 except:return None
def update_known(items):
 today=date.today().isoformat()
 for x in items:
  x['lastChecked']=today; st=classify_status(x.get('deadline'))
  if st:x['status']=st
 return items
def discover(sources,known_urls):
 found=[]; seen=set()
 for src in sources:
  try:html=fetch(src['url'])
  except Exception as e:print(f"WARN source {src['name']}: {e}",file=sys.stderr);continue
  p=Links();p.feed(html)
  for href,anchor in p.links:
   if not href:continue
   url=urljoin(src['url'],href).split('#')[0]
   if url in known_urls or url in seen or urlparse(url).scheme not in ('http','https'):continue
   hay=(anchor+' '+url).lower()
   if not any(k in hay for k in KEYWORDS):continue
   seen.add(url)
   try:page=fetch(url);txt=textify(page).lower()
   except:continue
   if not any(f in txt for f in FULL):continue
   if any(q in txt for q in PARTIAL) and not re.search(r'(100\s*%\s*(de\s*)?(la\s*)?(matr[ií]cula|arancel|financiaci[oó]n)|beca\s+(completa|total))',txt,re.I):continue
   title=anchor.strip() or urlparse(url).path.rstrip('/').split('/')[-1].replace('-',' ').title()
   found.append({'id':re.sub(r'[^a-z0-9]+','-',title.lower()).strip('-')[:72],'title':title[:180],'sourceName':src['name'],'url':url,'detectedCoverage':'Posible cobertura 100% — requiere revisión humana','detectedAt':datetime.utcnow().replace(microsecond=0).isoformat()+'Z'})
   if len(found)>=60:return found
 return found
def main():
 sch_path=ROOT/'data/scholarships.json';src_path=ROOT/'data/sources.json';cand_path=ROOT/'data/candidates.json'; scholarships=json.loads(sch_path.read_text(encoding='utf-8'));sources=json.loads(src_path.read_text(encoding='utf-8'))['sources'];scholarships['scholarships']=update_known(scholarships.get('scholarships',[]));known={x.get('url') for x in scholarships['scholarships']};candidates=discover(sources,known);sch_path.write_text(json.dumps(scholarships,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');cand_path.write_text(json.dumps({'candidates':candidates,'generatedAt':datetime.utcnow().replace(microsecond=0).isoformat()+'Z','note':'Detección automática: no se publica como verificada hasta confirmar cobertura 100% en fuente oficial.'},ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(f"Known: {len(scholarships['scholarships'])}; candidates: {len(candidates)}")
if __name__=='__main__':main()
