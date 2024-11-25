import fetch from 'node-fetch'
import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    conn.whatanime = conn.whatanime ? conn.whatanime : {}
    if (m.sender in conn.whatanime)
        throw "Masih Ada Proses Yang Belum Selesai, Silahkan Tunggu Sampai Selesai Yah~"
    await conn.sendMessage(m.chat, {
        react: {
            text: "👌",
            key: m.key,
        },
    });
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!mime)
        throw `Fotonya Mana?`
    if (!/image\/(jpe?g|png)/.test(mime))
        throw `Mime ${mime} tidak support`
    else conn.whatanime[m.sender] = true;
    let media = await q.download()
    let error
    try {
        let url = await uploadImage(media)
        let hasil = await (await fetch(`https://api.ryzendesu.vip/api/weebs/whatanime?url=${url}`)).json()
        let txt = `*Title: ${hasil.judul}*\n\nEpisode : ${hasil.episode}\n\nSimilarity : ${hasil.similarity}`
        await conn.sendMsg(m.chat, { video: { url: hasil.videoURL }, caption: txt }, { quoted: m })
    } catch (er) {
        console.log(er)
        m.reply("Proses Gagal :(")
    } finally {
        delete conn.whatanime[m.sender]
    }
}

handler.menuanime = ['whatanime']
handler.tagsanime = ['search']
handler.command = /^(whatanime)$/i

handler.limit = true
handler.premium = true

export default handler
