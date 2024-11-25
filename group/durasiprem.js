import db from '../../lib/database.js'

let handler = async (m, { conn, isOwner }) => {
    let chat = db.data.users[m.sender]
    
    let sisaWaktu = chat.expired - Date.now()

    if (isOwner) {
        return m.reply(`Owner tidak perlu Premium :3`)
    }
    
    if (sisaWaktu <= 0) return

    let durasi = msToDate(sisaWaktu)

    await conn.reply(m.chat, `Sisa Waktu Premium :\n\n*${durasi}*`, m)
}

handler.menugroup = ['durasipremium']
handler.tagsgroup = ['group']
handler.command = /^((cek)?(durasi|info)(prem|premium)(bot)?)$/i

export default handler

function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000))
    let daysms = ms % (24 * 60 * 60 * 1000)
    let hours = Math.floor((daysms) / (60 * 60 * 1000))
    let hoursms = ms % (60 * 60 * 1000)
    let minutes = Math.floor((hoursms) / (60 * 1000))
    let minutesms = ms % (60 * 1000)
    let sec = Math.floor((minutesms) / 1000)
    return `${days} hari ${hours} jam ${minutes} menit ${sec} detik`
}
