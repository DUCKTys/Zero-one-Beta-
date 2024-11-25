import { savefrom } from '@bochilteam/scraper'
import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!args[0]) throw `Linknya?\nExample: *${usedPrefix}${command} https://www.instagram.com/reel/CsC2PQCNgM1/?igshid=NTc4MTIwNjQ2YQ==*`;

  if (!args[0].match(new RegExp('^https?:\\/\\/(www\\.)?instagram\\.com\\/(p|tv|reel)\\/([a-zA-Z0-9_-]+)(\\/)?(\\?.*)?$'))) return m.reply(`Invalid Instagram URL.`)
    await conn.sendMessage(m.chat, {
      react: {
        text: "👌",
        key: m.key,
      },
    });
  try {
    const data = await savefrom(args[0])
    for (let i of data) {
      for (let a of i.url) {
        if (a.ext == 'jpg' || a.ext == 'png' || a.ext == 'jpeg' || a.ext == 'webp' || a.ext == 'heic' || a.ext == 'tiff' || a.ext == 'bmp') {
          await conn.sendMsg(m.chat, { image: { url: a.url } }, { quoted: m })
        } else {
          await conn.sendMsg(m.chat, { video: { url: a.url } }, { quoted: m })
        }
      }
    }
  } catch (e) {
    console.log(e)
    try {
      const res = await axios.get(`https://api.ryzendesu.vip/api/downloader/igdl?url=${args[0]}`)
      for (let i of res.data.data) {
        for (let a of i.url) {
          if (a.ext == 'jpg' || a.ext == 'png' || a.ext == 'jpeg' || a.ext == 'webp' || a.ext == 'heic' || a.ext == 'tiff' || a.ext == 'bmp') {
            await conn.sendMsg(m.chat, { image: { url: a.url } }, { quoted: m })
          } else {
            await conn.sendMsg(m.chat, { video: { url: a.url } }, { quoted: m })
          }
        }
      }
    } catch (e) {
      try {
        const res = await axios.get(`https://widipe.com/download/igdl?url=${args[0]}`)
        for (let a of res.data.result) {
          if (a.ext == 'jpg' || a.ext == 'png' || a.ext == 'jpeg' || a.ext == 'webp' || a.ext == 'heic' || a.ext == 'tiff' || a.ext == 'bmp') {
            await conn.sendMsg(m.chat, { image: { url: a.url } }, { quoted: m })
          } else {
            await conn.sendMsg(m.chat, { video: { url: a.url } }, { quoted: m })
          }
        }
      } catch (e) {
        console.log(e)
        m.reply(`Server down atau terjadi kesalahan, coba lagi nanti atau coba dengan video lain.`);
      }
    }
  }
}

handler.menudownload = ['instagram <url>'];
handler.tagsdownload = ['search'];
handler.command = /^(instagram|igdl|ig|instagramdl)$/i;

handler.limit = true;

export default handler
