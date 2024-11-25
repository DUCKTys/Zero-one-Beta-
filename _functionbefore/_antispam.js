import db from '../../lib/database.js'

const cooldown = 60000

export async function all(m) {
	if (!m.message) return
	if (!db.data.users[m.sender]) return !1
	if (db.data.users[m.sender].banned) return

	this.spam = this.spam ? this.spam : {}

	if (m.sender in this.spam) {
		this.spam[m.sender].count++
		if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 12) {
			// if (this.spam[m.sender].count > 10) m.reply('*Jangan Spam!!*')
			if (this.spam[m.sender].count > 10) {
				let warn = db.data.users[m.sender].warn
				if (warn >= 5) {
					db.data.users[m.sender].banned = true
					db.data.users[m.sender].permaban = true
					db.data.users[m.sender].warn = 0
					m.reply(`Anda terkena banned permanen karena terlalu banyak melakukan spam`)
					delete this.spam[m.sender]
				} else {
					let warnn = warn + 1
					db.data.users[m.sender].banned = true
					db.data.users[m.sender].lastbanned = new Date().getTime()
					db.data.users[m.sender].bannedcd = cooldown * 60 * warnn
					m.reply(`*Saya tidak suka dengan banjir pesan yang anda lakukan*\n*Nomormu di ban selama ${warn + 1} jam dikarenakan terdeteksi spam.*\n\nWarn = ${warn + 1} / 5`)
					db.data.users[m.sender].warn += 1
					this.spam[m.sender].count = 0
					this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
				}
			}
			this.spam[m.sender].count = 0
			this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
		}
	}
	else this.spam[m.sender] = { jid: m.sender, count: 0, lastspam: 0 }
}
