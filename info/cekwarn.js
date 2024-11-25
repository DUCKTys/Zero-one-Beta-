import db from '../../lib/database.js'

let handler = async (m, { conn, args, isOwner }) => {
    try {
        if (isOwner && args[0]) {
            let who = args[0] ? (args[0].replace(/\D/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : m.sender
            if (who.startsWith('0')) {
                who = '62' + who.slice(1);
            }
            let warning = db.data.users[who].warn
            let ndy = `
*@${who.split(`@`)[0]} Kamu Memiliki ${warning} Warn*
 `.trim()
            conn.reply(m.chat, ndy, m, { mentions: [who] })
        } else {
            let warning = db.data.users[m.sender].warn

            let ndy = `
*Kamu Memiliki ${warning} Warn*
 `.trim()
            conn.reply(m.chat, ndy, m)
        }
    } catch (e) {
        console.log(e)
    }
}

handler.help = ['cekwarn']
handler.tags = ['information']
handler.command = /^(cekwarn)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)