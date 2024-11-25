import db from '../../lib/database.js'

let handler = async (m, { conn }) => {
    let chat = db.data.chats[m.chat]
    
    if (!chat.expired || chat.expired <= 0) {
        return m.reply(`[ ! ] Bot join permanen, tidak ada durasi.`)
    }
    
    let sisaWaktu = chat.expired - Date.now()
    
    if (sisaWaktu <= 0) {
        return m.reply(`[ ! ] Waktu sewa telah habis.`)
    }

    let durasi = msToDate(sisaWaktu)

    await conn.reply(m.chat, `Sisa Waktu Sewa :\n\n*${durasi}*`, m)
}

handler.menugroup = ['durasisewa']
handler.tagsgroup = ['group']
handler.command = /^((cek)?(durasi|info)(sewa|join)(bot)?)$/i

handler.group = true

export default handler

function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000))
    let daysms = ms % (24 * 60 * 60 * 1000)
    let hours = Math.floor((daysms) / (60 * 60 * 1000))
    let hoursms = ms % (60 * 60 * 1000)
    let minutes = Math.floor((hoursms) / (60 * 1000))
    let minutesms = ms % (60 * 1000)
    let sec = Math.floor((minutesms) / 1000)
    return `${days} hari ${hours} jam ${minutes} menit`
}
