/**
 * Prints /resume to public/Naitik_Jasani_Resume.pdf so the downloadable résumé
 * always matches the site. Run against a production server:
 *
 *   pnpm build && pnpm start      # in one terminal
 *   pnpm resume:pdf               # in another
 *
 * Env: RESUME_URL (default http://localhost:3000/resume), CHROME_PATH.
 */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const url = process.env.RESUME_URL ?? "http://localhost:3000/resume";
const out = fileURLToPath(new URL("../public/Naitik_Jasani_Resume.pdf", import.meta.url));

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Chromium found. Set CHROME_PATH.");
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath, headless: true });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.emulateMediaType("print");
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    margin: { top: "9mm", bottom: "9mm", left: "11mm", right: "11mm" },
  });
  console.log(`Wrote ${out}`);
} finally {
  await browser.close();
}
