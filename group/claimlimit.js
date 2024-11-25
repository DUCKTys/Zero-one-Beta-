import db from '../../lib/database.js'

const rewards = {
    limit: 5,
}
const cooldown = 86400000
let handler = async (m, { conn, isPrems }) => {
    let user = db.data.users[m.sender]

    if (isPrems) throw `[!] Premium User tidak perlu limit.`

    if (!isPrems && user.limit >= 15) {
        conn.reply(m.chat, 'Free users can only claim up to a maximum limit of 20', m)
        return
    }

    if (new Date - user.lastclaimlimit < cooldown) throw `You have already claimed this daily limit!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`
    let text = ''
    for (let reward of Object.keys(rewards)) {
        if (!(reward in user)) continue
        user[reward] += rewards[reward]
        text += `*+${rewards[reward]}* ${reward}\n`
    }
    conn.reply(m.chat, text.trim(), m)
    user.lastclaimlimit = new Date * 1
}
handler.command = /^(claimlimit)$/i

handler.cooldown = cooldown
handler.disable = false

export default handler
