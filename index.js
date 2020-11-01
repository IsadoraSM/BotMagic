const Discord = require('discord.js')
const config = require('./config/config.json')
const bot = new Discord.Client()
const mtg = require('mtgsdk')

bot.login(config.token)

bot.once('ready', () => { console.log(`Bot online: ${bot.user.tag}!`) })

/**
 * Escuta todas as mensagens
 */
bot.on('message', message => {
    const prefix = config.prefix

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split('..')

    if(args[0].startsWith(".")) return

    const texto = args.shift().toLowerCase()

    if(!texto) return
    
    obj = '{' + texto + '}'
    obj = JSON.parse(obj);

    mtg.card.where(obj)
    .then(cards => {
        cards.forEach(card => {
            console.log(card)
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`**Nome:** ${card.name} \r\n **Tipo:** ${card.type} \r\n **Custo:** ${card.manaCost} \r\n **Texto original:** ${card.originalText}`)
            .setImage(card.imageUrl)

            message.channel.send(embed)
        });
    }).catch(error => {
        const embed = new Discord.MessageEmbed()
            .setColor(15158332)
            .setDescription(error)
        message.channel.send(embed)
    })
})