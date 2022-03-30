const nodeHtmlToImage = require('node-html-to-image');
const { builder } = require("@netlify/functions");
const fs = require("fs").promises;

exports.handler = builder(async function (event, context) {
  const image = nodeHtmlToImage({
    html: `<html>
      <head>
        <style>
          body {
            background: #1a67fd;
            text-align:center;
            display: grid;
            justify-content: center;
            align-content: center;
            font-family: sans-serif;
            width:1200px;
            height:600px;
          }

          h1 {
            color: white;
            font-size: 80px;
          }

          p {
            color: white;
            font-size: 30px;
          }
        </style>
      </head>
      <body>
        <img src="https://wpowls.co/app/uploads/2021/05/cropped-WP-Sowka-new-sygnet-kontrast512-192x192.png" /><br/>
        <h1>{{ title }}</h1>
        <p>New post</p>
      </body>
    </html>
    `,
    content: {
      title: "test title",
    },
    puppeteerArgs: { args: ['--no-sandbox'] }
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: image.toString("base64"),
    isBase64Encoded: true,
  };
});
