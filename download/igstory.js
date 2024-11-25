import { instagramStory } from "@bochilteam/scraper-sosmed"

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
    if (!text) throw `Masukkan usernamenya`
    try {
        await conn.sendMessage(m.chat, {
            react: {
                text: "👌",
                key: m.key,
            },
        });
        const results = await instagramStory(args[0])
        for (let a of results.results) {
            if (a.url.includes('mp4')) {
                await conn.sendMsg(m.chat, { video: { url: a.url } }, { quoted: m })
            } else {
                await conn.sendMsg(m.chat, { image: { url: a.url } }, { quoted: m })
            }
        }
    } catch (e) {
        console.log(e)
        m.reply("Server Down / Username tidak ditemukan")
    }
}

handler.menudownload = ['instastory <url>']
handler.tagsdownload = ['search']
handler.command = /^(instastory|storyinstagram|igstory|storyig|storiinstagram|storiig|igstori)$/i

handler.limit = true
handler.premium = true

export default handler