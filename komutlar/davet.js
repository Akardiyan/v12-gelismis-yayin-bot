const Discord = require("discord.js")
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let davet = ayarlar.davet
let botid = ayarlar.botid
let botadı = ayarlar.botadı

exports.run = async (client, message, args) => {
  let p = db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix;
  
const embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(`${botadı} Davet Menüsü`, client.user.avatarURL())
.setDescription(`**\n• [Beni Sunucuna Ekle](${davet})**\n`)
.setFooter(`${botadı} Bot`) 
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)   
 };

 exports.config = {
      name: 'davet',
   aliases: ["davet"]
 };