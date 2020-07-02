import * as firebaseAdmin from "firebase-admin";
import { GuildMember } from "discord.js";
const serviceAccount = require("../../secrets/firebase.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://sanbotdata.firebaseio.com/",
});

const fr = firebaseAdmin.firestore();

export const FieldValue = firebaseAdmin.firestore.FieldValue;

export async function readCollection(collectionName: string): Promise<Array<object>>
{
  let docs: Array<object> = new Array();

  await fr
    .collection(collectionName)
    .orderBy("timestamp")
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        docs.push(doc.data());
      });
    });

    return docs;
}

export async function writeToCollection(collectionName: string, newData: unknown)
{
  fr.collection(collectionName).add(newData);
}
