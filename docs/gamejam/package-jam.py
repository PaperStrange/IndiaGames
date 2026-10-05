"""Package three branch checkouts as self-contained browser games. Requires esbuild."""
from pathlib import Path
import argparse, subprocess, re, json, shutil, hashlib
p=argparse.ArgumentParser()
p.add_argument('--memorable',type=Path,required=True)
p.add_argument('--vivid',type=Path,required=True)
p.add_argument('--bell',type=Path,required=True)
p.add_argument('--out',type=Path,required=True)
p.add_argument('--esbuild',required=True)
a=p.parse_args(); a.out.mkdir(parents=True,exist_ok=True)
manifest={'date':'2026-10-05','games':[]}
for name,root,relative,entry in [('memorable',a.memorable,'memorable-moments-game/play','game.js'),('vivid',a.vivid,'vivid-2.5d-photo-game/play','src/app.js')]:
    src=root/relative; dest=a.out/name; dest.mkdir(exist_ok=True)
    result=subprocess.run([a.esbuild,str(src/entry),'--bundle','--format=iife','--platform=browser','--target=es2020','--log-level=warning'],capture_output=True,text=True,check=True).stdout
    html=(src/'index.html').read_text()
    html=re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*/?>',lambda m:'<style>\n'+(src/m.group(1)).read_text()+'\n</style>',html)
    html=re.sub(r'<script\b[^>]*\bsrc="[^"]+"[^>]*>\s*</script>', '', html)
    html=html.replace('</body>', '<script>\n'+result.replace('</script','<\\/script')+'\n</script>\n</body>')
    (dest/'index.html').write_text(html)
    manifest['games'].append({'id':name,'branch':subprocess.check_output(['git','branch','--show-current'],cwd=root,text=True).strip(),'source_commit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(),'entry':name+'/index.html','sha256':hashlib.sha256(html.encode()).hexdigest()})
dest=a.out/'bell';dest.mkdir(exist_ok=True)
subprocess.run(['node','build.mjs'],cwd=a.bell,check=True,capture_output=True)
shutil.copy2(a.bell/'dist/thirteenth-bell-playable-demo.html',dest/'index.html')
manifest['games'].append({'id':'bell','branch':'the-thirteenth-bell','source_commit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=a.bell,text=True).strip(),'entry':'bell/index.html','sha256':hashlib.sha256((dest/'index.html').read_bytes()).hexdigest()})
(a.out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(manifest,indent=2))
