"""Export the running landing as one portable HTML document (no external assets)."""
from pathlib import Path
import argparse
import base64
import re
import urllib.request

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:3000')
parser.add_argument('--output', default='FOBIA-anteprima.html')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
html = urllib.request.urlopen(args.url).read().decode()
styles = []
for tag in re.findall(r'<link\b[^>]*>', html):
    if 'rel="stylesheet"' not in tag:
        continue
    href = re.search(r'href="([^"]+)"', tag)[1]
    css = (root / '.next' / href.split('?')[0].removeprefix('/_next/')).read_text()
    def embed_font(match):
        url = match[1].strip('"\'')
        if url.startswith('data:'):
            return match[0]
        path = root / '.next' / url.split('?')[0].removeprefix('/_next/') if url.startswith('/_next/') else root / '.next/static/media' / Path(url).name
        if not path.exists():
            raise FileNotFoundError(path)
        mime = 'font/woff2' if path.suffix == '.woff2' else 'font/woff'
        return 'url(data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode() + ')'
    styles.append(re.sub(r'url\(([^)]+)\)', embed_font, css))
html = re.sub(r'<link\b[^>]*>', '', html)
html = re.sub(r'<script\b[^>]*>.*?</script>', '', html, flags=re.S)
html = html.replace('</head>', '<style>' + ''.join(styles) + '</style></head>')
def embed_image(match):
    tag = match[0]
    src = re.search(r'src="([^"]+)"', tag)
    if not src or src[1].startswith('data:'):
        return tag
    import html as html_module
    url = html_module.unescape(src[1])
    srcset = re.search(r'srcSet="([^"]+)"', tag, flags=re.I)
    if srcset:
        candidates = [(int(width), html_module.unescape(path)) for path, width in re.findall(r'([^ ,]+)\s+(\d+)w', srcset[1])]
        if candidates:
            eligible = [item for item in candidates if item[0] >= 1080]
            url = min(eligible)[1] if eligible else max(candidates)[1]
    if not url.startswith('/'):
        raise ValueError('Only local official assets may be embedded')
    with urllib.request.urlopen(urllib.request.Request(args.url + url, headers={'Accept': 'image/webp'})) as response:
        data = response.read()
        mime = response.headers.get_content_type()
    tag = re.sub(r'\s+srcSet="[^"]*"', '', tag, flags=re.I)
    return re.sub(r'src="[^"]*"', 'src="data:' + mime + ';base64,' + base64.b64encode(data).decode() + '"', tag)
html = re.sub(r'<img\b[^>]*>', embed_image, html)
script = '''<script>
document.querySelectorAll('button').forEach(button=>{const dialog=button.nextElementSibling;if(dialog&&dialog.tagName==='DIALOG')button.addEventListener('click',()=>dialog.showModal());});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});});
</script>'''
html = html.replace('</body>', script + '</body>')
Path(args.output).write_text(html)
print(args.output)
