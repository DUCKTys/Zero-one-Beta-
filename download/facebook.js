import fetch from 'node-fetch'
import { facebookdl } from '@bochilteam/scraper'

let handler = async (m, { conn, args }) => {

    if (!args[0]) throw 'Please provide a Facebook video URL';
    const sender = m.sender.split(`@`)[0];

    await conn.sendMessage(m.chat, {
		react: {
			text: "👌",
			key: m.key,
		},
	});

    try {
        const url = args[0];
        const apiUrl = `https://widipe.com/download/fbdl?url=${url}`;
        let response = await fetch(apiUrl);
        let result = await response.json();

        if (!result || !result.status || !result.result || (!result.result.HD && !result.result.Normal_video)) {
            // Try the second API if the first one fails
            const backupApiUrl = `https://widipe.com/download/fbdown?url=${url}`;
            response = await fetch(backupApiUrl);
            result = await response.json();

            if (!result || !result.status || !result.result || !result.result.url) {
                throw 'Failed to fetch video details from both APIs';
            }

            const videoLink = result.result.url.isHdAvailable ? result.result.url.urls[0].hd : result.result.url.urls[1].sd;
            const caption = `
*Title*: ${result.result.url.title || 'No title'}

*HD Link*: ${result.result.url.isHdAvailable ? result.result.url.urls[0].hd : 'Not available'}
*SD Link*: ${result.result.url.urls[1].sd}
`;

            await conn.sendMsg(m.chat, { video: { url: videoLink }, caption: `ini Videonya @${sender}`, mentions: [m.sender] }, { quoted: m })
        } else {
            // Handle the first API response
            const videoLink = result.result.HD || result.result.Normal_video;
            const caption = `
*Title*: ${result.result.title || 'No title'}

${result.result.description || 'No description'}

*HD Link*: ${result.result.HD || 'Not available'}
*Normal Video Link*: ${result.result.Normal_video || 'Not available'}
`;
            let video = await fetch(videoLink)

            await conn.sendMsg(m.chat, { video: { url: videoLink }, caption: `ini Videonya @${sender}`, mentions: [m.sender] }, { quoted: m })
        }
    } catch (error) {
        try {
            const result = await facebookdl(args[0])
            if (result.video && result.video.length > 0) {
                let video = result.video[0]

                await conn.sendMsg(m.chat, { video: { url: video.download() }, caption: `ini Videonya @${sender}`, mentions: [m.sender] }, { quoted: m })
            }
        }
        catch (error) {
            console.error('Handler Error:', error);
            conn.reply(m.chat, `An error occurred: ${error}`, m);
        }
    }
};

handler.menudownload = ['fb <url>']
handler.tagsdownload = ['search']
handler.command = /^(fbdownload|facebook|fb(dl)?)$/i

handler.limit = true

export default handler
