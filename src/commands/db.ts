import * as firebase from "../modules/firebase";

module.exports =
{
  name: "fb",
  async run(message, args)
  {
    let data = await firebase.readCollection(args[1]);

    data.forEach((doc) => {

      if (doc["member"].includes(`${message.member.id}`))
      {
        let info: Array<string> = new Array();
        for (let key in doc)
        {
          info.push(`${key}` + ": " + doc[key]);
        }
        message.channel.send(info.join("\n"));
      }
      
      console.log(doc);
    });
  },
};
