let handler = async (m) => {
    let anu = await (await fetch(`https://raw.githubusercontent.com/arasea2/elydb/refs/heads/main/db/src/information/kurs.json`)).json()
    let txt = ''
    for (let i of anu) {
        txt += `*Nama Mata Uang* : ${i.nama_mata_uang} ( ${i.mata_uang} )\n`
        txt += `*Kurs Beli* : ${i.kurs_beli}\n`
        txt += `*Kurs Jual* : ${i.kurs_jual}\n`
        txt += `---------------------------\n`
    }

    await m.reply(txt)
}

handler.help = ['kurs']
handler.tags = ['information']
handler.command = /^(kurs)$/i

export default handler