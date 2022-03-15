const TelegramBot=require('node-telegram-bot-api');
const token='5254918144:AAHbD2bcwfKlxIO9Gp7QlbtXADeC5wKOMd0'

const bot=new TelegramBot(token,{polling:true})


bot.onText(/\/love/,function onLoveText(msg){
    const opts={
        reply_to_message_id:msg.message.id,
        reply_markup:JSON.stringify({keyword:[
            ['yes,you are the bot of my life!'],
            ['no,sorry there is another one...']
        ]})
    };
    bot.sendMessage(msg.chat_id,'do u love me?',opts);
});

bot.onText(/\/echo (.+)/,function onEchoText(msg,match) {
    const resp=match[1];
    bot.sendMessage(msg.chat_id,resp);
})

bot.onText(/\/editable/,function onEditableText(msg) {
    const opts={
        reply_markup: {
            inline_keyboard:[
                [
                    {
                        text:'Edit Text',
                        callback_data:'edit'
                    }
                ]
            ]
        }

    };
    bot.sendMessage(msg.from.id,'Original Text',opts);
});

bot.on('callback_query',function onCallbackQuery(callbackQuery) {
    const action=callbackQuery.data;
    const msg=callbackQuery.message;
    const opts={
        chat_id:msg.chat_id,
        message_id:msg.message_id,
    };
    let text;
    if(action==='edit'){
        text='Edited Text';
    }
    bot.editMessageText(text,opts);
})












