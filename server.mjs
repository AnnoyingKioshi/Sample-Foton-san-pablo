import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/* Serve the folder this script lives in, not the launcher's cwd — otherwise a
   stale working directory silently serves an old copy of the site. */
const ROOT = dirname(fileURLToPath(import.meta.url));
/* Take the port the launcher assigns; falling back to a fixed one means a
   stale process on that port blocks every later start. */
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const rel = normalize(url === "/" ? "/index.html" : url).replace(/^(\.\.[/\\])+/, "");
  try {
    const body = await readFile(join(ROOT, rel));
    res.writeHead(200, { "content-type": TYPES[extname(rel)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
