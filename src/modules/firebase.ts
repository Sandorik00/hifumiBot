import * as firebaseAdmin from "firebase-admin";
const serviceAccount = require("../../secrets/firebase.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://sanbotdata.firebaseio.com/",
});

const fr = firebaseAdmin.firestore();

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
        console.log(doc.id, "=>", doc.data());
        docs.push(doc.data());
      });
    });

    return docs;
}
