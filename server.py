"""Server locale per lo sviluppo.

Come `python3 -m http.server`, ma dice al browser di NON usare la cache:
così dopo ogni modifica vedi sempre i file aggiornati.

Uso:  python3 server.py          (poi apri http://localhost:5500)
      python3 server.py --rete   (visibile anche dal telefono, sulla stessa rete Wi-Fi)
"""
import http.server
import os
import sys

args = [a for a in sys.argv[1:] if not a.startswith("--")]
PORT = int(args[0]) if args else 5500
HOST = "0.0.0.0" if "--rete" in sys.argv else "127.0.0.1"


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    # come Cloudflare: /progetto apre progetto.html
    def translate_path(self, path):
        full = super().translate_path(path)
        if not os.path.exists(full) and os.path.exists(full + ".html"):
            return full + ".html"
        return full


os.chdir(os.path.dirname(os.path.abspath(__file__)))
with http.server.ThreadingHTTPServer((HOST, PORT), NoCacheHandler) as httpd:
    print(f"Portfolio su http://localhost:{PORT}  (Ctrl+C per fermare)")
    httpd.serve_forever()
