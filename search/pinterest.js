import db from '../../lib/database.js'
import { pinterest } from '../../lib/scrape.js'

let handler = async (m, { conn, text, usedPrefix, command, isPrems }) => {
	if (!text) throw `Example : ${usedPrefix + command} spongebob`
	try {
		await conn.sendMsg(m.chat, { react: { text: '🔍', key: m.key } })
		let anu = await pinterest(text)
		if (!anu[0]) throw Error()
		let random = [
			['OWNER',`https://wa.me/${db.data.datas.rowner[0]?.[0] || '6287815756002'}`,'cta_url'],
			['SCRIPT','https://github.com/arasea2/ely-md','cta_url'],
			['💬 Chat Bot',`https://wa.me/${conn.user.jid.split('@')[0]}`,'cta_url'],
			['IG','https://www.instagram.com/pandu.3_?igsh=MWdzbGFidXlsZzF0cA==','cta_url']]
		let push = [];
		for (let x of anu.sort(() => Math.random() - 0.5))
			push.push([x.title || 'Untitled', 'pinterest search', '', x.image, [random.getRandom()]])
		await conn.sendSlide(m.chat, `*Found : ${anu.length} Result*`, pauthor, push, m)
		//await conn.sendButton(m.chat, `${command} > ${text}`, pauthor, anu.url, [['next', usedPrefix+command+' '+text]], m)
		//await conn.sendButton(m.chat, `${command} > ${text}`, pauthor, anu.url, [['next', usedPrefix+command+' '+text], ['google','https://google.com'], ['copy this', 'https://wa.me/6282337245566', 'cta_copy']], m)
	} catch (e) {
		console.log(e)
		m.reply('media tidak ditemukan')
	}
}

handler.help = ['pinterest <teks>']
handler.tags = ['searching']
handler.command = /^(pin(terest2?)?)$/i

export default handler
