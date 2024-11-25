import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase()
    let rubah = db.data.users[m.sender].foxlvl
    let kuda = db.data.users[m.sender].horselvl
    let kucing = db.data.users[m.sender].catlvl
    let dog = db.data.users[m.sender].doglvl
    let wolf = db.data.users[m.sender].wolflvl
    let centaur = db.data.users[m.sender].centaurlvl
    let phoenix = db.data.users[m.sender].phoenixlvl
    let dragon = db.data.users[m.sender].dragonlvl

    switch (type) {
        case 'rubah':
        case 'fox':
            if (db.data.users[m.sender].fox == 0) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (!db.data.users[m.sender].fox) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (rubah == 7) return m.reply('*Pet kamu dah lvl max*')
            let __waktur = (new Date - db.data.users[m.sender].foxlastfeed)
            let _waktur = (1200000 - __waktur)
            let waktur = clockString(_waktur)
            if (new Date - db.data.users[m.sender].foxlastfeed > 1200000) {
                if (db.data.users[m.sender].petfood > 0) {
                    db.data.users[m.sender].petfood -= 1
                    db.data.users[m.sender].foxexp += 20
                    db.data.users[m.sender].foxlastfeed = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (db.data.users[m.sender].fox > 0) {
                        let naiklvl = ((rubah * 100) - 1)
                        if (db.data.users[m.sender].foxexp > naiklvl) {
                            db.data.users[m.sender].foxlvl += 1
                            db.data.users[m.sender].foxexp -= (rubah * 100)
                            conn.reply(m.chat, `*Selamat Pet Rubah kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktur}* lagi`)
            break
        case 'kuda':
        case 'horse':
            if (db.data.users[m.sender].horse == 0) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (!db.data.users[m.sender].horse) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (kuda == 7) return m.reply('*Pet kamu dah lvl max*')
            let __waktuk = (new Date - db.data.users[m.sender].horselastfeed)
            let _waktuk = (1200000 - __waktuk)
            let waktuk = clockString(_waktuk)
            if (new Date - db.data.users[m.sender].horselastfeed > 1200000) {
                if (db.data.users[m.sender].petfood > 0) {
                    db.data.users[m.sender].petfood -= 1
                    db.data.users[m.sender].horseexp += 20
                    db.data.users[m.sender].horselastfeed = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (kuda > 0) {
                        let naiklvl = ((kuda * 100) - 1)
                        if (db.data.users[m.sender].horseexp > naiklvl) {
                            db.data.users[m.sender].horselvl += 1
                            db.data.users[m.sender].horseexp -= (kuda * 100)
                            conn.reply(m.chat, `*Selamat Pet Kuda kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktuk}* lagi`)
            break
        case 'cat':
        case 'kucing':
            if (db.data.users[m.sender].cat == 0) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (!db.data.users[m.sender].cat) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (kucing == 7) return m.reply('*Pet kamu dah lvl max*')
            let __waktu = (new Date - db.data.users[m.sender].catlastfeed)
            let _waktu = (1200000 - __waktu)
            let waktu = clockString(_waktu)
            if (new Date - db.data.users[m.sender].catlastfeed > 1200000) {
                if (db.data.users[m.sender].petfood > 0) {
                    db.data.users[m.sender].petfood -= 1
                    db.data.users[m.sender].catexp += 20
                    db.data.users[m.sender].catlastfeed = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (db.data.users[m.sender].cat > 0) {
                        let naiklvl = ((kucing * 100) - 1)
                        if (db.data.users[m.sender].catexp > naiklvl) {
                            db.data.users[m.sender].catlvl += 1
                            db.data.users[m.sender].catexp -= (kucing * 100)
                            conn.reply(m.chat, `*Selamat Pet Kucing kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktu}* lagi`)
            break
        case 'dog':
        case 'anjing':
            if (db.data.users[m.sender].dog == 0) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (!db.data.users[m.sender].dog) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (dog == 7) return m.reply('*Pet kamu dah lvl max*')
            let __waktua = (new Date - db.data.users[m.sender].doglastfeed)
            let _waktua = (1200000 - __waktua)
            let waktua = clockString(_waktua)
            if (new Date - db.data.users[m.sender].doglastfeed > 1200000) {
                if (db.data.users[m.sender].petfood > 0) {
                    db.data.users[m.sender].petfood -= 1
                    db.data.users[m.sender].dogexp += 20
                    db.data.users[m.sender].doglastfeed = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (db.data.users[m.sender].fog > 0) {
                        let naiklvl = ((dog * 100) - 1)
                        if (db.data.users[m.sender].dogexp > naiklvl) {
                            db.data.users[m.sender].doglvl += 1
                            db.data.users[m.sender].dogexp -= (dog * 100)
                            conn.reply(m.chat, `*Selamat Pet Dog kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktua}* lagi`)
            break
        case 'wolf':
        case 'serigala':
            if (db.data.users[m.sender].wolf == 0) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (!db.data.users[m.sender].wolf) return m.reply(`*Kamu belum memiliki Pet ${type}*`)
            if (wolf == 7) return m.reply('*Pet kamu dah lvl max*')
            let __waktuw = (new Date - db.data.users[m.sender].wolflastfeed)
            let _waktuw = (1200000 - __waktuw)
            let waktuw = clockString(_waktuw)
            if (new Date - db.data.users[m.sender].wolflastfeed > 1200000) {
                if (db.data.users[m.sender].petfood > 0) {
                    db.data.users[m.sender].petfood -= 1
                    db.data.users[m.sender].wolfexp += 20
                    db.data.users[m.sender].wolflastfeed = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (db.data.users[m.sender].wolf > 0) {
                        let naiklvl = ((wolf * 100) - 1)
                        if (db.data.users[m.sender].wolfexp > naiklvl) {
                            db.data.users[m.sender].wolflvl += 1
                            db.data.users[m.sender].wolfexp -= (wolf * 100)
                            conn.reply(m.chat, `*Selamat Pet Wolf kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktuw}* lagi`)
            break
        case 'centaur':
            if (db.data.users[m.sender].centaur == 0) return m.reply('*Kamu belum memiliki Pet Centaur*')
            if (!db.data.users[m.sender].centaur) return m.reply('*Kamu belum memiliki Pet Centaur*')
            if (centaur == 7) return m.reply('*Pet kamu dah lvl max*')
            let __waktuc = (new Date - db.data.users[m.sender].centaurlastfeed)
            let _waktuc = (1200000 - __waktuc)
            let waktuc = clockString(_waktuc)
            if (new Date - db.data.users[m.sender].centaurlastfeed > 1200000) {
                if (db.data.users[m.sender].petfood > 0) {
                    db.data.users[m.sender].petfood -= 1
                    db.data.users[m.sender].centaurexp += 20
                    db.data.users[m.sender].centaurlastfeed = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (db.data.users[m.sender].centaur > 0) {
                        let naiklvl = ((centaur * 100) - 1)
                        if (db.data.users[m.sender].centaurexp > naiklvl) {
                            db.data.users[m.sender].centaurlvl += 1
                            db.data.users[m.sender].centaurexp -= (centaur * 100)
                            conn.reply(m.chat, `*Selamat Pet Centaur kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktuc}* lagi`)
            break
        case 'phoenix':
            if (db.data.users[m.sender].phoenix == 0) return m.reply('*Kamu belum memiliki Pet Phoenix*')
            if (!db.data.users[m.sender].phoenix) return m.reply('*Kamu belum memiliki Pet Phoenix*')
            if (phoenix == 7) return m.reply('*Pet kamu dah lvl max*')
            let __waktup = (new Date - db.data.users[m.sender].phoenixlastfeed)
            let _waktup = (1200000 - __waktup)
            let waktup = clockString(_waktup)
            if (new Date - db.data.users[m.sender].phoenixlastfeed > 1200000) {
                if (db.data.users[m.sender].petfood > 0) {
                    db.data.users[m.sender].petfood -= 3
                    db.data.users[m.sender].phoenixexp += 20
                    db.data.users[m.sender].phoenixlastfeed = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (db.data.users[m.sender].phoenix > 0) {
                        let naiklvl = ((phoenix * 100) - 1)
                        if (db.data.users[m.sender].phoenixexp > naiklvl) {
                            db.data.users[m.sender].phoenixlvl += 1
                            db.data.users[m.sender].phoenixexp -= (phoenix * 100)
                            conn.reply(m.chat, `*Selamat Pet Phoenix kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktup}* lagi`)
            break
        case 'dragon':
            if (db.data.users[m.sender].dragon == 0) return m.reply('*Kamu belum memiliki Pet Dragon*')
            if (!db.data.users[m.sender].dragon) return m.reply('*Kamu belum memiliki Pet Dragon*')
            if (dragon == 7) return m.reply('*Pet kamu dah lvl max*')
            let __waktud = (new Date - db.data.users[m.sender].dragonlastfeed)
            let _waktud = (1200000 - __waktud)
            let waktud = clockString(_waktud)
            if (new Date - db.data.users[m.sender].dragonlastfeed > 1200000) {
                if (db.data.users[m.sender].petfood > 0) {
                    db.data.users[m.sender].petfood -= 5
                    db.data.users[m.sender].dragonexp += 20
                    db.data.users[m.sender].dragonlastfeed = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (db.data.users[m.sender].dragon > 0) {
                        let naiklvl = ((dragon * 100) - 1)
                        if (db.data.users[m.sender].dragonexp > naiklvl) {
                            db.data.users[m.sender].dragonlvl += 1
                            db.data.users[m.sender].dragonexp -= (dragon * 100)
                            conn.reply(m.chat, `*Selamat Pet Dragon kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktud}* lagi`)
            break
        default:
            return conn.reply(m.chat, `${usedPrefix}feed [kucing | car | rubah | fox | kuda | horse | anjing | dog | centaur | phoenix | dragon]\nContoh penggunaan: *${usedPrefix}feed kucing*`, m)
    }
}
handler.menufun = ['feeding [pet type]']
handler.tagsfun = ['rpg']
handler.command = /^(feeding)$/i

handler.rpg = true

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 31200000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ ms, h, m, s })
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
