const db = require("quick.db");
const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
exports.run = async(client, message, args) => { let davet = ayarlar.davet
let botid = ayarlar.botid
let botadı = ayarlar.botadı
let website = ayarlar.website
let destek = ayarlar.desteksw
let banner = ayarlar.banner
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix 
let aktivite = new Discord.MessageEmbed()  
.setAuthor(`${botadı} Yardım Menüsü`, client.user.avatarURL())
.setColor('GREEN')
.addField(`• [Beni Sunucuna Ekle](${davet})\n• [Destek Sunucumuz](${destek})\n• [Website](${website})`) 
.addField(`__Youtube Together__`,`\`${prefix}aktivite <kanal id> yt\`\n YouTube Together Oynarsınız`,true)
.addField(`__Poker Night__`,`\`${prefix}aktivite <kanal id> pkr\`\n Poker Night Oynarsınız.`,true)
.addField(`__Betrayal.io__`,`\`${prefix}aktivite <kanal id> bio\`\n Betrayal.io Oynarsınız.`,true)
.addField(`__Fishington.io__`,`\`${prefix}aktivite <kanal id> fio\`\n Fishington.io.`,true)
.setDescription('Aktivite Sistemi Discordun Yeni Güncellemesi İle Sizlerle Birlikte')
.addField(`__Bilgilendirme__`,`\`${prefix}davet\` => Botu Sunucunuza Davet Edersiniz\n\`${prefix}prefix\` => Botun Prefixini Ayarlarsınız`)
.setImage(`${banner}`)
.setThumbnail(client.user.avatarURL)
 message.channel.send(aktivite) 
  };
exports.config = {
name: "yardım",
  aliases: ['yardım']
}

