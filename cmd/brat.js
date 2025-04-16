//require('../settings/config');

let handler = async (m, { ade, text, reply, prefix, command }) => {
  if (!text) return reply(`Ex: ${prefix + command} Aku Sayang Kamu`)
  const media = `https://brat.caliphdev.com/api/brat?text=${text}`;

  ade.sendImageAsSticker(m.chat, media, m, {
    packname: "Zyrenn Assisten",
    author: "Lezz DcodeR"
  });
}

handler.help = ['sticker brat'];
handler.tags = ['sticker'];
handler.command = ["sbrat", "brat"];

module.exports = handler;
