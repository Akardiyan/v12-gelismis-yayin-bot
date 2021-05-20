const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const db = require("quick.db");
const fetch = require("node-fetch");
const aktiviteler = {
    "pkr": {
        id: "755827207812677713",
        name: "Poker Night"
    },
    "bio": {
        id: "773336526917861400",
        name: "Betrayal.io"
    },
    "yt": {
        id: "755600276941176913",
        name: "YouTube Together"
    },
    "fio": {
        id: "814288819477020702",
        name: "Fishington.io"
    }
};

//------------- Aktivite Bölümü---------------\\

client.on("message", async message => {
    let prefix = (await db.fetch(`prefix.${message.guild.id}`)) || ayarlar.prefix;
    if (message.author.bot || !message.guild) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
  
    const hataxd = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | <@${message.author.id}> Lütfen Geçerli Bir Sesli Kanal İd Girin`)
    .setThumbnail(client.user.avatarURL)
    
    const formatlar = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | Doğru Formatlar İçin **${prefix}yardım** Kullanınız`)
    .setThumbnail(client.user.avatarURL)
    
    const hatasj = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **Davet Oluştur** İznine İhtiyacım Var`)
    .setThumbnail(client.user.avatarURL)
    
    
    if (cmd === "aktivite") {
        const channel = message.guild.channels.cache.get(args[0]);
        if (!channel || channel.type !== "voice") return message.channel.send(hataxd);
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send(hatasj);
        const activity = aktiviteler[args[1] ? args[1].toLowerCase() : null];
        if (!activity) return message.channel.send(formatlar) 
      
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: activity.id,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
    
    .then(res => res.json())
    .then(invite => {
          
    const hata31 = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **${activity.name}** Başlatılamadı`)
    .setThumbnail(client.user.avatarURL)
    
    if (invite.error || !invite.code) return message.channel.send(hata31);
    const aktivite = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`✅ | **${channel.name}** Adlı Ses Kanalında **${activity.name}** Başlatmak İçin [Tıklayın](<https://discord.gg/${invite.code}>)`)
    .setThumbnail(client.user.avatarURL)
          message.channel.send(aktivite) 
            })   
    const hata31 = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **${activity.name}** Başlatılamadı`)
    .setThumbnail(client.user.avatarURL)
            .catch(e => {
                message.channel.send(hata31);
            })
    }
});


//----------------------------------------------\\

client.on("message", async message => {
  let prefix =
    (await db.fetch(`prefix.${message.guild.id}`)) || ayarlar.prefix;
  const messageArray = message.content.split(" ");
  const cmd = messageArray[0].toLowerCase();
  const args = messageArray.slice(1);
  if (!message.content.startsWith(prefix)) return;
  const commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) commandfile.run(client, message, args);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  const jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    return console.log("Herhangi bir komut bulunamadı!");
  }
  jsfiles.forEach(file => {
    console.log(`${file} Komutu Hazır`);
    const command = require(`./komutlar/${file}`);
    client.commands.set(command.config.name, command);
    command.config.aliases.forEach(alias => {
      client.aliases.set(alias, command.config.name);
    });
  });
});

//---------------------------------------------------------\\

client.login(process.env.token).then(
  function() {
    console.log("Tüm Sistemler Çalışır Durumda Bot Başlatılıyor...");
  },
  function(err) {
    console.log("Malesef Tüm Sistemler Çalışır Değil Tekrar Deneniyor...");
    setInterval(function() {
      process.exit(0);
    }, 20000);
  }
);

//------------------Oynuyor---------------------\\

const bot = new Discord.Client();
let botadı = ayarlar.botadı
client.on('ready', async () => {
  
 client.user.setActivity(`@${botadı}`, { type:'PLAYING' })
  
});

//-----------------Etiket Prefix-----------------\\

let botid = ayarlar.botid
client.on("message", async msg => {
  let prefix = (await db.fetch(`prefix.${msg.guild.id}`)) || ayarlar.prefix;
  if (msg.content == `<@!${botid}>`)
    return msg.channel.send(`Sanırım Yardım İstiyorsun ?\nYardım İçin => \`${prefix}yardım\``);
});
