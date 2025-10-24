import { defineConfig } from "vite";
import vituum from "vituum";
import nunjucks from "@vituum/vite-plugin-nunjucks";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
    plugins: [
        vituum(),
        nunjucks({ root: "./src" }),
        Sitemap({
            hostname: "https://alhajillo-interactive.github.io",
            i18n: { defaultLanguage: "en", languages: ["en", "es"], strategy: "suffix" },
            dynamicRoutes: ["/"],
            extensions: "",
        }),
    ],
});
