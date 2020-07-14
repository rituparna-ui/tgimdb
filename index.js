const TOKEN = "1375550519:AAHwWNGQ8H7PT-XHCtCDPf8K11sKKPF03Gc";
//const Telegraf = require("telegraf");
const {Composer} = require("micro-bot");
const spawn = require("child_process").spawn;
//const bot = new Telegraf(TOKEN);
const bot = new Composer;
/*************************************************************/
bot.start((ctx)=> {
	ctx.reply("Search for a movie\nFor eg.\n/search The Godfather");
});

bot.command("search",(ctx)=> {
	ctx.reply("Showing the top search result\nPlease wait");
	var msg = ctx.message.text;
	var msgArr = msg.split(" ");
	msgArr.shift();
	var param = msgArr.join("+");
	//var url = `https://www.imdb.com/search/title/?title=${param}&title_type=feature&sort=user_rating,desc`;
	const pyPro = spawn("python3",["dat.py",param]);
	pyPro.stdout.on("data",(dat)=> {
		dataStr=dat.toString();
		dataJson = JSON.parse(dataStr)
		imgurl = dataJson.Iurl[0];
		cap = dataJson.Data[0];
		ctx.telegram.sendChatAction(ctx.chat.id,"upload_photo");
		ctx.telegram.sendPhoto(ctx.chat.id,imgurl,{"caption":msgArr.join(" ")},{"reply_to_message_id":ctx.message.id});

	});

});
//bot.launch();
module.exports = bot;
