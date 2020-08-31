import * as API from '../modules/vkAPI';
import {TextChannel, MessageEmbed} from 'discord.js';

module.exports = {
  name: "vk",
  async run(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.send("アクセスが拒否されました");
      return;
    }
    const NewsChannel: TextChannel = message.guild.channels.cache.find(ch => ch.id === '683018619118157923') as TextChannel;
    if (!NewsChannel) return;
    //hardcoded now but will be rewrited later

    let posts = await API.getVKposts();

    const postTime0 = posts["items"][0]["date"];
    const postTime1 = posts["items"][1]["date"];
          let postNumber = 0;
        if (postTime0 > postTime1) {
          postNumber = 0;
        } else {
          postNumber = 1;
        }
        if (posts["items"][postNumber]["post_type"] != "post") {
          message.channel.send(
            "Это не пост, это просто картинка или что-то другое..."
          );
          return;
        }
        let postText = posts["items"][postNumber]["text"];
  
        let embed = new MessageEmbed()
        .setColor(0x000)
        .setDescription(postText);

        if (posts["items"][postNumber]["attachments"][0]["photo"]) {
          let postAttachmentPhoto = posts["items"][postNumber]["attachments"][0]["photo"]["sizes"];
          
          postAttachmentPhoto = postAttachmentPhoto[postAttachmentPhoto.length - 1]["url"];
          
  
          embed.setImage(`${postAttachmentPhoto}`);
         }
       
         let escortMessage = "Новости!!";
         let pingMessage = "@everyone" + " " + escortMessage;
  
        //let postAttachment = new Attachment(`${postAttachmentPhoto}`);
        await message.delete();

  
        NewsChannel.send(pingMessage, embed);
  }
};
