import db from '../../lib/database.js'

export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    let user = db.data.users[m.sender]

    if (user.pc) return
    await m.reply(`📮Note: Jangan spam botnya!!!
⏩Ketik *.menu* untuk menampilkan pilihan menu

📝Ingin menghilangkan *limit*?
Berdonasi minimal 10k untuk mendapat akses *Premium*

Ketik *.premium* untuk info lebih lanjut`)
    user.pc = new Date * 1
}
