// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="description" content="Wuthering Waves Achievements DB" />
          <meta property="twitter:image" content="/thumbnail.webp" />
          <meta property="twitter:card" content="/thumbnail.webp" />
          <meta property="twitter:title" content="WuWaAchieve" />
          <meta property="twitter:description" content="Wuthering Waves Achievements DB" />
          <meta property="og:image" content="/thumbnail.webp" />
          <meta property="og:site_name" content="WuWaAchieve" />
          <meta property="og:title" content="WuWaAchieve" />
          <meta property="og:description" content="Wuthering Waves Achievements DB" />
          <meta property="og:url" content="https://wuwa-achieve.vercel.app" />
          <link rel="apple-touch-icon" type="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUITE/fonts/variable/woff2/SUITE-Variable.css" rel="stylesheet" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
