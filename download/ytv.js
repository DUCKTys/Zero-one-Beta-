import axios from 'axios'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'
import ytdl from 'ytdl-core'
import { niceBytes } from '../../lib/func.js'
import { youtubedl } from '@bochilteam/scraper-sosmed'
import { savefrom } from '@bochilteam/scraper'

const streamPipeline = promisify(pipeline);

let handler = async (m, { conn, command, text, usedPrefix, args }) => {
    if (!text) throw `Usage: ${usedPrefix}${command} url reso`;

    if (!(args[0] || '').match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)

    const videoUrl = args[0];
    let resolution = '720';

    await conn.sendMessage(m.chat, {
        react: {
            text: "👌",
            key: m.key,
        },
    });
    try {
        const url = videoUrl
        const data = await savefrom(url);
        const dataObj = data[0].url.slice().reverse().find(i => i.ext === 'mp4');
        await conn.sendMsg(m.chat, { video: { url: dataObj.url }, mimetype: 'audio/mpeg' }, { quoted: m })
    } catch (error) {
        console.log(error)
        try {
            let anu = await youtubedl(args[0])
            let list = Object.keys(anu.video).toString()
            let data = anu.video[`${list.includes('36') ? '360p' : list.includes('24') ? '240p' : '144p'}`]
            let url = await data.download()
            if (data.fileSize > 200000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 200 MB`)
            let txt = `*${anu.title}*\n\n`
                + `⭔ Watch : ${args[0]}\n`
                + `⭔ Resolution : ${data.quality}\n`
                + `⭔ Size : ${data.fileSizeH}`
            await conn.sendFile(m.chat, url, `${anu.title}.mp4`, txt, m)
        } catch (e) {
            console.log(e)
            try {
                let res = await ytdl.getURLVideoID(args[0])
                let anu = await ytdl.getInfo(res)
                let data, det = anu.videoDetails
                for (let x of ['360', '480', '240']) {
                    if (!data) data = anu.formats.find(v => v.mimeType.includes('video') && v.audioBitrate !== null && (v.qualityLabel || '').includes(x))
                }
                if (!data) throw Error()
                let size = parseInt(data.bitrate)
                let buffer = Buffer.from(await (await fetch(data.url)).arrayBuffer())
                let buffl = Buffer.byteLength(buffer)
                if (size > 200000000) return m.reply(`Filesize: ${niceBytes(buffl)}\nTidak dapat mengirim, maksimal file 200 MB`)
                let txt = `*${det.title}*\n\n`
                    + `⭔ Watch : ${args[0]}\n`
                    + `⭔ Resolution : ${data.width} x ${data.height}\n`
                    + `⭔ Size : ${niceBytes(buffl)}`
                await conn.sendFile(m.chat, buffer, `${det.title}.mp4`, txt, m)
            } catch (e) {
                console.log(e)
                try {
                    const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(videoUrl)}`;
                    const response = await axios.get(apiUrl);
                    const { url: videoStreamUrl } = response.data;

                    if (!videoStreamUrl) throw 'Video URL not found in API response.';

                    const videoStream = await axios({
                        url: videoStreamUrl,
                        method: 'GET',
                        responseType: 'stream'
                    }).then(res => res.data);

                    const tmpDir = os.tmpdir();
                    const filePath = `${tmpDir}/${new URL(videoUrl).pathname.split('/').pop()}_${resolution}.mp4`;
                    const writableStream = fs.createWriteStream(filePath);

                    await streamPipeline(videoStream, writableStream);

                    let doc = {
                        video: {
                            url: filePath
                        },
                        mimetype: 'video/mp4',
                        fileName: filePath.split('/').pop(),
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                mediaType: 2,
                                mediaUrl: videoUrl,
                                title: filePath.split('/').pop(),
                                sourceUrl: videoUrl
                            }
                        }
                    };

                    // await conn.sendMessage(m.chat, doc, { quoted: m });
                    await conn.sendMsg(m.chat, { video: { url: filePath } }, { quoted: m })

                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Failed to delete video file: ${err}`);
                        } else {
                            console.log(`Deleted video file: ${filePath}`);
                        }
                    });
                } catch (error) {
                    console.log(error)
                    try {
                        let anu = await (await fetch(`https://rest-api.akuari.my.id/downloader/yt1?link=${args[0]}`)).json()
                        let size = anu.urldl_video.size
                        let vs = parseInt(size)
                        if (isNaN(vs)) vs = 1
                        if (vs > 200 && /mb|gb/i.test(size)) return m.reply(`Filesize: ${size}\nTidak dapat mengirim, maksimal file 200 MB`)
                        let txt = `*${anu.info.title}*\n\n`
                            + `⭔ Watch : ${args[0]}\n`
                            + `⭔ Resolution : ${anu.urldl_video.quality}\n`
                            + `⭔ Size : ${size}`
                        await conn.sendFile(m.chat, anu.urldl_video.link, `${anu.info.title}.mp4`, txt, m)
                    } catch (e) {
                        console.log(e)
                        console.error(`Error: ${error.message}`);
                        m.reply('invalid url / internal server error')
                    }
                }
            }
        }
    }
}

handler.menudownload = ['ytvideo <url>'];
handler.tagsdownload = ['search'];
handler.command = /^(yt(v(ideo)?|mp4))$/i

handler.limit = true
handler.premium = true

export default handler
