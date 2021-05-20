const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
let aprefix = ayarlar.prefix
let bprefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
 let o = await db.fetch(`prefix.${message.guild.id}`)
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
.setDescription(`**Bu Komutu Kullanabilmek İçin Mesajları Yönet Yetkisine Sahip Olmalısınız** | **Şuanki Prefix:** ${bprefix}`));
  
if(args[0] === "ayarla") {
if(o) { return message.channel.send(new Discord. MessageEmbed()
                                         .setColor("#ffffff")
.setDescription(`**Ayarlanmış Şeyi Tekrar Ayarlıyamassın | Şuanki Prefix:** ${bprefix} **Sıfırlamak İçin** ${bprefix}**prefix sıfırla**`));
      }
if(!args[1]) return message.channel.send(new Discord.MessageEmbed()
                                              .setColor("#ffffff")
.setDescription(`**Bir Prefix Girip Tekrar Dene |  Şuanki Prefix:** ${bprefix}`));
db.set(`prefix.${message.guild.id}`, args[1])
message.channel.send(new Discord.MessageEmbed()
                          .setColor("#ffffff")
.setDescription(`**Prefix Başarıyla Ayarlandı | Şuanki Prefix:** ${args[1]}`));
}
    if(args[0] === "sıfırla") {
    if(!o) {
       return message.channel.send(new Discord.MessageEmbed()
                                        .setColor("#ffffff")
.setDescription(`**Ayarlanmayan Prefixi Sıfırlayamazsınız | Şuanki Prefix:** ${bprefix}`));
    }
    db.delete(`prefix.${message.guild.id}`)       
   return message.channel.send(new Discord.MessageEmbed()
                                    .setColor("#ffffff")
.setDescription(`**Prefix Başarıyla Sıfırlandı | Şuanki Prefix:** ${aprefix}`));
  }
 
 if(!args[0]) return message.channel.send(new Discord.MessageEmbed()     
                  .setColor("#ffffff")                             
.setDescription(`**Prefix Ayarlamak İçin** ${bprefix}**prefix ayarla <prefix>**\n**Sıfırlamak İçin** ${bprefix}**prefix sıfırla | Şuanki Prefix:** \`${bprefix}\``));
  
};
exports.config = {
name: "prefix",
aliases: ['p']
};