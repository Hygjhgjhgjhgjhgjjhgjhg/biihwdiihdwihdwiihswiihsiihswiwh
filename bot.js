const { storage }  = require('store')
const { Telegraf } = require('telegraf')
const BOT_TOKEN = "5060926324:AAEQNa1y_iMS-zVBM7GTN2-_g7OabevRsQ8"
const bot = new Telegraf(BOT_TOKEN)
bot.command("start", async(ctx) => {
  ctx.reply("*Welcome!\nI'm your friendly dictionary bot!\nYou can use me to find about words which are new to you, or you don't know it's meaning, you can find words details like: Meaning, Phonetic, Synonyms, antonyms, part of speech, origin, example usage of word etc.\n\nUsage: /find [word]*", {parse_mode: "Markdown", reply_to_message_id: ctx.message.message_id})
  return
})
bot.command("find", (ctx) => {
const axios = require('axios');
var message = ctx.message.text
var word = message.split(" ")[1]
axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/'+word).then(resp => {
const obj = resp.data
if(!obj){
  ctx.reply("*Oops! We couldn't find out this word in our dictionary!*",{parse_mode: "Markdown", reply_to_message_id: ctx.message.message_id})
  return
}
const phonetic = obj[0].phonetic ? obj[0].phonetic: "None"
const origin = obj[0].origin ? obj[0].origin : "None"
const example = obj[0].meanings[0].definitions[0].example ?obj[0].meanings[0].definitions[0].example: "None"
const partOfSpeech = obj[0].meanings[0].partOfSpeech ?obj[0].meanings[0].partOfSpeech: "None"
const sy = obj[0].meanings[0].definitions[0].synonyms[0] ? obj[0].meanings[0].definitions[0].synonyms[0] : "No data"
const an = obj[0].meanings[0].definitions[0].antonyms[0] ? obj[0].meanings[0].definitions[0].antonyms[0] : "No data"
ctx.reply(`*š Word: ${word}\nāļø Phonetic: ${phonetic}\nš Origin: ${origin}\nš Meaning: ${obj[0].meanings[0].definitions[0].definition}\nš£ļø Part of Speech: ${partOfSpeech}\n āļø Synonyms: ${sy}\nš Antonyms: ${an}\nš Example: ${example}*`, {parse_mode: "Markdown", reply_to_message_id: ctx.message.message_id})
    console.log(resp.data);
});
})
bot.command("/quote", ctx => {
var axios = require("axios").default;
var options = {
  method: 'GET',
  url: 'https://quotes15.p.rapidapi.com/quotes/random/',
  headers: {
    'x-rapidapi-host': 'quotes15.p.rapidapi.com',
    'x-rapidapi-key': '631e1d7ed3mshc5e2b967162cfd9p1aaa4cjsna31424be573f'
  }
};

axios.request(options).then(function (response) {
ctx.reply(`_${response.data.content}_\n*Quote by: ${response.data.originator.name}*`, {parse_mode: "Markdown", reply_to_message_id: ctx.message.message_id})
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
})
process.on('unhandledRejection',console.error)
bot.launch()
