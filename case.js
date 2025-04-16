/* 
  - Github: @Eternals-Satya

*/

require("./nganuin")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const chalk = require('chalk')
const crypto = require('crypto')
const geminiTextReply = async (text) => {

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flask' })

  const result = await model.generateContent(text)

  const response = await result.response

  return response.text()

}
const { exec } = require("child_process")
const path = require('path')
module.exports = async (conn, m, store) => {
  const fs = require('fs')
  const fetch = require('node-fetch')
  const { GoogleGenerativeAI } = require('@google/generative-ai')
  const genAI = new GoogleGenerativeAI('AIzaSyAb1xzBcZDtcPPIMpOhqJn8I36PDgl8L2g')

  const q = m.body?.trim() || ''
  const text = q.toLowerCase()

  const botNumber = conn.decodeJid(conn.user.id)
  if (m.sender === botNumber) return

  const senderNumber = m.sender.replace(/[^0-9]/g, '')

  // === BACA DATABASE ADMIN ===
  const adminPath = './database/admin1.json'
  let adminData = {}
  if (fs.existsSync(adminPath)) {
    adminData = JSON.parse(fs.readFileSync(adminPath))
  }
  const adminInfo = adminData[senderNumber]
  const isAdminUser = !!adminInfo
  
  
  
  // === GANTI NAMA GRUP ===

const gantiNamaGrupRegex = /(nama\sgrup|edit\snama\sgrup|ganti\snama\sgrup|set\snama\sgrup|ubah\snama\sgrup)/i

if (m.isGroup && gantiNamaGrupRegex.test(text)) {

  if (!isAdminUser) return m.reply('Kamu gak punya izin buat ngeganti nama grup.')

  // Ambil nama grup baru setelah perintah

  const newGroupName = text.replace(gantiNamaGrupRegex, '').trim()

  if (!newGroupName) return m.reply('apaa nama grupnyaa?')

  try {

    // Ganti nama grup

    await conn.groupUpdateSubject(m.chat, newGroupName)

    m.reply(`Nama grup berhasil diganti jadi: ${newGroupName}`)

  } catch (err) {

    m.reply('Gagal ngeganti nama grup:\n' + err.message)

  }

}
  
  // === TAMBAH ADMIN BARU KE DATABASE ===

  const tambahAdminRegex = /(jadikan admin|jadiin admin|adminin|adminnin|adminkan)\s/i

  if (m.isGroup && tambahAdminRegex.test(text)) {

    if (!isAdminUser) return m.reply('Apasih, lu bukan admin')

    const mentioned = m.mentionedJid?.[0]

    if (!mentioned) return m.reply('Tag dong nomor yang mau dijadiin admin. Contoh: *adminin @628xxxx dong*')

    const newAdminNumber = mentioned.replace(/[^0-9]/g, '')

    // Cek apakah sudah ada

    if (adminData[newAdminNumber]) {

      return m.reply('Nomor itu udah jadi admin.')

    }

    // Default data admin baru

    adminData[newAdminNumber] = {

      nama: newAdminNumber,

      role: 'admin tambahan',

      izinSemuaFitur: false

    }

    // Simpan ke file

    fs.writeFileSync(adminPath, JSON.stringify(adminData, null, 2))

    return m.reply(`Nomor @${newAdminNumber} berhasil jadi admin.`)

  }

  // === EDIT BIO GRUP (khusus admin) ===
  const bioRegex = /^(set|edit|ubah)\s(bio|deskripsi)/i
  if (m.isGroup && bioRegex.test(text)) {
    if (!isAdminUser) return m.reply('Kamu bukan admin yang diizinkan pakai fitur ini.')

    const match = text.match(/^(set|ganti|edit|ubah)\s(bio|deskripsi|desk)( grup)? ke (.+)/i)
    if (!match) return m.reply('Format salah. Contoh: *set bio grup ke Ini grup AI keren!*')

    const newBio = match[4]
    try {
      await conn.groupUpdateDescription(m.chat, newBio)
      return m.reply('Deskripsi grup berhasil diubah.')
    } catch (err) {
      return m.reply('Gagal mengubah deskripsi grup:\n' + err.message)
    }
  }

  // === GANTI FOTO GRUP (reply gambar) ===
  const fotoRegex = /(set|edit|ubah|ganti)\s(foto|pp)\s(grup|gc)/i
  if (m.isGroup && fotoRegex.test(text)) {
    if (!isAdminUser) return m.reply('Kamu bukan admin yang diizinkan pakai fitur ini.')
    if (!m.quoted || !/image/.test(m.quoted.mimetype)) {
      return m.reply('Balas gambar dengan caption *set foto grup* atau variasinya untuk mengubah foto grup.')
    }

    try {
      const buffer = await m.quoted.download()
      await conn.updateProfilePicture(m.chat, buffer)
      return m.reply('Foto grup berhasil diubah.')
    } catch (err) {
      return m.reply('Gagal mengubah foto grup:\n' + err.message)
    }
  }
  
  // === FITUR TUTUP/BUKA GRUP HANYA UNTUK ADMIN ===
  if (m.isGroup && (/tutup(.*)grup|tutupin|admin(.*)saja/i.test(text) || /buka(.*)grup|bukain/i.test(text))) {
    try {
      const groupMetadata = await conn.groupMetadata(m.chat)
      const botParticipant = groupMetadata.participants.find(p => p.id === botNumber)
      const isBotAdmin = botParticipant?.admin === 'admin' || botParticipant?.admin === 'superadmin'

      if (!isBotAdmin) return m.reply('Bot bukan admin.')
      if (!isAdminUser) return m.reply('Kamu bukan admin yang diizinkan pakai fitur ini.')

      if (/tutup(.*)grup|tutupin|admin(.*)saja/i.test(text)) {
        await conn.groupSettingUpdate(m.chat, 'announcement')
        return m.reply('Grup ditutup. Hanya admin yang bisa mengirim pesan.')
      }

      if (/buka(.*)grup|bukain/i.test(text)) {
        await conn.groupSettingUpdate(m.chat, 'not_announcement')
        return m.reply('Grup dibuka. Semua anggota bisa mengirim pesan.')
      }
    } catch (err) {
      return m.reply(`Gagal mengatur grup: ${err.message}`)
    }
  }

  // === MEMORI PERCAKAPAN ===
  const memoriPath = './database/memori.json'
  let memoriData = {}
  if (fs.existsSync(memoriPath)) {
    memoriData = JSON.parse(fs.readFileSync(memoriPath))
  }
  if (!memoriData[senderNumber]) memoriData[senderNumber] = []

  // Tambahkan input user
  memoriData[senderNumber].push({ user: q })
  if (memoriData[senderNumber].length > 10) memoriData[senderNumber].shift()

  // === PROMPT DASAR ===
  const promptPath = './database/prompt.json'
  let promptData = {}
  if (fs.existsSync(promptPath)) {
    promptData = JSON.parse(fs.readFileSync(promptPath))
  }
  let prompt = promptData.default || "Kamu adalah AI yang membantu pengguna dengan sopan."

  // Tambahkan konteks jika user adalah admin
  if (isAdminUser) {
    prompt += `\n\nCatatan: User ini adalah admin bernama ${adminInfo.nama}, dengan peran ${adminInfo.role}. Dia memiliki hak akses penuh: ${adminInfo.izinSemuaFitur}. Hormati dan bantu dengan prioritas.`
  }

  // Gabungkan memori ke dalam prompt
  const memoryHistory = memoriData[senderNumber].map(entry => `User: ${entry.user}\nAI: ${entry.ai || ''}`).join('\n')
  const fullPrompt = `${prompt}\n\n${memoryHistory}\nUser: ${q}`

  try {
    let replyText

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
      const result = await model.generateContent(fullPrompt)
      replyText = result.response.text()
    } catch (err) {
      if (err.message.includes('429')) {
        const fallback = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const result = await fallback.generateContent(fullPrompt)
        replyText = result.response.text()
      } else {
        throw err
      }
    }

    memoriData[senderNumber][memoriData[senderNumber].length - 1].ai = replyText
    fs.writeFileSync(memoriPath, JSON.stringify(memoriData, null, 2))

    m.reply(replyText)
  } catch (err) {
    m.reply('Gagal menjawab dengan AI:\n' + err.message)
  }
    }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
