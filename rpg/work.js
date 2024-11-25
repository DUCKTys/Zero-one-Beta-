import db from '../../lib/database.js'

function ranNumb(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const cooldown = 10800000

function getRandomReward(rankMultiplier) {
    return {
        exp: ranNumb(1000, 3000) * rankMultiplier,
        money: ranNumb(700, 1100) * rankMultiplier,
        potion: ranNumb(1, 10) * rankMultiplier,
        kayu: ranNumb(1, 10) * rankMultiplier,
        batu: ranNumb(1, 10) * rankMultiplier,
        string: ranNumb(1, 10) * rankMultiplier,
        iron: ranNumb(1, 10) * rankMultiplier,
    }
}

let handler = async (m, { conn, text, command, usedPrefix }) => { 
    try { 
        let tool = text.trim().toLowerCase();
        let tools = ['fox', 'horse', 'cat', 'dog', 'wolf', 'centaur', 'phoenix', 'dragon'];
        if (!tools.includes(tool)) {
            return conn.sendMsg(m.chat, { text: `*Example :* *${usedPrefix}${command} fox*`, footer: '*Available tools :* fox, horse, cat, dog, wolf, centaur, phoenix, dragon' }, { quoted: m });
        }
        
        let toolRank = tools.indexOf(tool) + 1;
        let user = db.data.users[m.sender]
        let timers = (cooldown - (new Date - user.lastjb))
        if (new Date - user.lastjb <= cooldown) return m.reply(`Kamu sudah Eksplor hari ini, mohon tunggu\n*🕐${timers.toTimeString()}*`)

        if (db.data.users[m.sender].health > 79) {
            if (new Date - db.data.users[m.sender].lastjb > cooldown) {
                let armor = db.data.users[m.sender].armor;
                if (!armor) throw 'Silahkan craft armor terlebih dahulu';

                let userTools = {
                    horse: db.data.users[m.sender].horse,
                    cat: db.data.users[m.sender].cat,
                    dog: db.data.users[m.sender].dog,
                    fox: db.data.users[m.sender].fox,
                    wolf: db.data.users[m.sender].wolf,
                    centaur: db.data.users[m.sender].centaur,
                    phoenix: db.data.users[m.sender].phoenix,
                    dragon: db.data.users[m.sender].dragon
                };

                if (userTools[tool] === 0) {
                    return conn.sendMsg(m.chat, { text: `Anda tidak mempunyai ${tool.charAt(0).toUpperCase() + tool.slice(1)}` }, { quoted: m });
                }

                let reward = getRandomReward(toolRank);

                let ____health = `${Math.floor(Math.random() * 10)}`.trim();
                let ___health = (____health * 1);
                let kucingnya = (db.data.users[m.sender].cat == 0 ? 0 : '' || db.data.users[m.sender].cat == 1 ? 5 : '' || db.data.users[m.sender].cat == 2 ? 10 : '' || db.data.users[m.sender].cat == 3 ? 15 : '' || db.data.users[m.sender].cat == 4 ? 21 : ''  || db.data.users[m.sender].cat == 5 ? 30 : '');
                let armornya = (armor == 0 ? 0 : '' || armor == 1 ? 5 : '' || armor == 2 ? 10 : '' || armor == 3 ? 15 : '' || armor == 4 ? 21 : '' || armor == 5 ? 30 : '');
                let __health = (___health > 60 ? ___health - kucingnya - armornya : ___health);
                let healt = ranNumb(3, 10)

                let exp = reward.exp;
                let uang = reward.money;
                let potion = reward.potion;
                let kayu = reward.kayu
                let batu = reward.batu
                let string = reward.string
                let iron = reward.iron
                let diamond = 0
                
                let _common = `${Math.floor(Math.random() * 3)}`.trim();
                let common = (_common * 1);
                let _uncommon = `${Math.floor(Math.random() * 2)}`.trim();
                let uncommon = (_uncommon * 1);
                let _mythic = `${pickRandom(['1', '0', '0', '1'])}`;
                let mythic = (_mythic * 1);
                let _legendary = `${pickRandom(['1', '0', '0', '0'])}`;
                let sampah = `${Math.floor(Math.random() * 300)}`.trim();
                let legendary = (_legendary * 1);
                let prefix = usedPrefix;
                let str = `
${rpg.emoticon('healt')} Nyawa mu berkurang -${healt * 1} karena Kamu telah berpetualang sampai ${pickRandom(['🇯🇵 Jepang', '🇰🇷 Korea', '🇮🇳 India', '🇺🇲 Amerika', '🇵🇸 Palestin', '🇮🇶 Iraq', '🇸🇦 Arab', '🇵🇰 Pakistan', '🇩🇪 German', '🇫🇮 Finlandia', 'Ke bawa dunia mimpi 😱', 'Ujung dunia 🌏', 'Mars 👽', 'Bulan 🌚', 'Pluto 😱', 'Matahari 🌞', 'Hatinya dia ♥️', '...'])} menggunakan ${tool} dan mendapatkan
${rpg.emoticon('exp')} *exp:* ${exp} 
${rpg.emoticon('money')} *uang:* ${uang} 💵
${rpg.emoticon('sampah')} *sampah:* ${sampah}${potion == 0 ? '' : `\n*${rpg.emoticon('potion')}Potion:* ` + potion + ''}${iron == 0 ? '' : `\n*${rpg.emoticon('iron')}Iron:* ` + iron + ''}${kayu == 0 ? '' : `\n*${rpg.emoticon('kayu')}Kayu:* ` + kayu + ''}${batu == 0 ? '' : `\n*${rpg.emoticon('batu')}Batu:* ` + batu + ''}${string == 0 ? '' : `\n*${rpg.emoticon('string')}String:* ` + string + ''}${diamond == 0 ? '' : `\n*${rpg.emoticon('diamond')}diamond:* ` + diamond + ''}${common == 0 ? '' : `\n*${rpg.emoticon('common')}common crate:* ` + common + ''}${uncommon == 0 ? '' : `\n*${rpg.emoticon('uncommon')}uncommon crate:* ` + uncommon + ''}
`.trim();
                conn.sendMsg(m.chat, { text: str }, { quoted: m });

                db.data.users[m.sender].health -= healt;
                db.data.users[m.sender].money += uang * 1;
                db.data.users[m.sender].exp += exp * 1;
                db.data.users[m.sender].potion += potion * 1;
                db.data.users[m.sender].diamond += diamond * 1;
                db.data.users[m.sender].common += common * 1; 
                db.data.users[m.sender].uncommon += uncommon * 1;
                db.data.users[m.sender].trash += sampah * 1;
                db.data.users[m.sender].iron += iron * 1;
                db.data.users[m.sender].rock += batu * 1;
                db.data.users[m.sender].wood += kayu * 1;
                db.data.users[m.sender].string += string * 1;
                db.data.users[m.sender].lastjb = new Date * 1;
            } else {
                conn.sendMsg(m.chat, { text: `Anda sudah bekerja keras hari ini, silahkan menunggu sampai ${timers}` }, { quoted: m });
            }
        } else {
            conn.sendMsg(m.chat, { text: 'Minimal 80 health untuk bisa bercocok tanam, beli obat dulu biar kuat dengan ketik *' + usedPrefix + 'shop buy potion <jumlah>*\ndan ketik *' + usedPrefix + 'use potion <jumlah>*\n\n_Untuk mendapat money dan potion gratis ketik_ *' + usedPrefix + 'claim*' }, { quoted: m });
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

handler.menufun = ['explor', 'work'];
handler.tagsfun = ['rpg'];
handler.command = /^((explor|eksplor)(ation|asi)?|work)$/i;

handler.cooldown = cooldown
handler.rpg = true

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n' + d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('');
}
