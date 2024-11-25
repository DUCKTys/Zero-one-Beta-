import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {

    if (!args[0]) throw 'Please provide a Twitter video URL';
    const sender = m.sender.split(`@`)[0];

    m.reply('Please wait...')

    try {
        const url = args[0];
        const apiUrl = `https://widipe.com/download/twtdl?url=${url}`
        let response = await fetch(apiUrl);
        let result = await response.json();
        if (!result || !result.status || !result.result || !result.result.url) {
            throw 'Failed to fetch video details from APIs'
        }

        const videoLink = result.result.url[0].hd
        const caption = `
*Title*: ${result.result.title || 'No title'}
`;

        await conn.sendMsg(m.chat, { video: { url: videoLink }, caption: `ini Videonya @${sender}`, mentions: [m.sender] }, { quoted: m })

    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error}`, m)
    }
};

handler.menudownload = ['twitter <url>']
handler.tagsdownload = ['search']
handler.command = /^(twitterdownload|twitter|twt(dl)?)$/i

handler.limit = true
handler.premium = true

export default handler
