import { serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // 如果是根路径，返回index.html
    if (pathname === "/" || pathname === "/index.html") {
        return serveFile(req, "./index.html");
    }

    // 支持其他静态文件（如音频文件等）
    try {
        return await serveFile(req, `.${pathname}`);
    } catch {
        // 如果文件不存在，返回404
        return new Response("Not Found", { status: 404 });
    }
});