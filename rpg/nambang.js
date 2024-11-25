import db from '../../lib/database.js'

let handler = async (m, {
    conn, usedPrefix
}) => {
    try {
        let user = db.data.users[m.sender]
        let __timers = (new Date - db.data.users[m.sender].lastmining)
        let _timers = (86400000 - __timers)
        let timers = clockString(_timers)
        let penambang = await conn.getName(m.sender)
        if (!user.tambang) return m.reply(`Lu gapunya tambang`)

        if (user.health < 40) return m.reply(`Health Kamu Tidak Cukup\nHarap Isi Health Kamu Dengan *${usedPrefix}heal`)
        if (new Date - user.lastmining <= 86400000) throw m.reply(`Kamu Masih Kelelahan\nHarap Tunggu ${timers} Lagi`)
        // if (new Date - user.lastmining <= cooldown) return m.reply(`📍 Anda sudah ${command}, selanjutnya dapat dilakukan dalam  . . .\n🕖 *${((user.lastmining + cooldown) - new Date()).toTimeString()}*`)


        let rndm1 = `${Math.floor(Math.random() * 3)}`
        let rndm2 = `${Math.floor(Math.random() * 5)}`
        let rndm3 = `${Math.floor(Math.random() * 7)}`
        let rndm4 = `${Math.floor(Math.random() * 4)}`
        let rndm5 = `${Math.floor(Math.random() * 20)}`
        let rndm6 = `${Math.floor(Math.random() * 20)}`
        let rndm7 = `${Math.floor(Math.random() * 8)}`
        let rndm8 = `${Math.floor(Math.random() * 15)}`
        let rndm9 = `${Math.floor(Math.random() * 294)}`
            .trim()

        let ran1 = (rndm1)
        let ran2 = (rndm2 * 10)
        let ran3 = (rndm3)
        let ran4 = (rndm4)
        let ran5 = (rndm5 * 10)
        let ran6 = (rndm6 * 10)
        let ran7 = (rndm7 * 10)
        let ran8 = (rndm8 * 10)
        let ran9 = (rndm9 * 10)

        let hmsil1 = parseInt(ran1)
        let hmsil2 = parseInt(ran2)
        let hmsil3 = parseInt(ran3)
        let hmsil4 = parseInt(ran4)
        let hmsil5 = parseInt(ran5)
        let hmsil6 = parseInt(ran6)
        let hmsil7 = parseInt(ran7)
        let hmsil8 = parseInt(ran8)
        let hmsil9 = parseInt(ran9)

        let jln = `
    ⬛⬛⬛⬛⬛⬛⬛⬛🚶⬛
    ⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
    ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
    🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳
    
    ✔️ ${penambang} Mohon Tunggu....
    `

        let jln2 = `
    ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
    ⬛⬜⬜⬜⬛⬜⬜⬜⬛🚶
    ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
    🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳
    
    ➕ ${penambang} Menemukan Area....
    `

        let jln3 = `
    ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
    ⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
    ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
    🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🚶
    
    ➕ ${penambang} Mulai Menambang....
    `

        let jln4 = `
    ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
    ⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
    ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
    🏘️🏘️🏘️🏘️🌳🌳🏘️ 🚶
    
    ➕ ${penambang}
    💹 Menerima Gaji....
    `

        let hsl = `
    *Hasil Nambang ${penambang}*
    
    Diamond: ${hmsil1}
    Iron: ${hmsil2}
    Gold: ${hmsil3}
    Emerald: ${hmsil4}
    Rock: ${hmsil5}
    String: ${hmsil6}
    Trash: ${hmsil7}
    Sand: ${hmsil8}
    Exp: ${hmsil9}
     
    Health Kamu Berkurang -40
    `

        user.diamond += hmsil1
        user.iron += hmsil2
        user.gold += hmsil3
        user.emerald += hmsil4
        user.rock += hmsil5
        user.string += hmsil6
        user.trash += hmsil7
        user.sand += hmsil8
        user.exp += hmsil9
        user.health -= 40

        setTimeout(() => {
            conn.reply(m.chat, hsl, m)
        }, 27000)

        setTimeout(() => {
            conn.reply(m.chat, jln4, m)
        }, 25000)

        setTimeout(() => {
            conn.reply(m.chat, jln3, m)
        }, 20000)

        setTimeout(() => {
            conn.reply(m.chat, jln2, m)
        }, 15000)

        setTimeout(() => {
            conn.reply(m.chat, jln, m)
        }, 10000)

        setTimeout(() => {
            conn.reply(m.chat, `${penambang} Mencari Area Nambang.....`, m)
        }, 0)
        user.lastmining = new Date * 1
    } catch (e) {
        console.log(e)
    }
}
handler.menufun = ['nambang', 'mining']
handler.tagsfun = ['rpg']
handler.command = /^(nambang|menambang|mining)$/i

export default handler


function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return ['\n' + d, ' *Hari*\n ', h, ' *Jam*\n ', m, ' *Menit*\n ', s, ' *Detik* '].map(v => v.toString().padStart(2, 0)).join('')
}