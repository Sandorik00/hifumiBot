import { Message } from 'discord.js';
import { client } from '../main';

const ALPHABET = new Set(
 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяwhen'
);

const whenSet = new Set(['when', 'вен', 'вэн', 'когда', 'когда-же']);

client.on('message', (message: Message) => {
 if (message.author.id === '652841585590927390') return;

 let str = message.content.trim().toLowerCase();
 let currentWord = '';
 let words: string[] = [];

 for (let i = 0, len = str.length; i < len; i++) {
  let c = str[i];
  if (ALPHABET.has(c)) {
   currentWord += c;
  } else {
   words.push(currentWord);
   currentWord = '';
  }
 }

 if (currentWord.length > 0) {
  words.push(currentWord);
 }

 console.log(whenSet);

 console.log(words);

 for (const when of words) {
  console.log(when);

  if (whenSet.has(when)) {
   message.channel.send('Тогда, когда сделаешь это самостоятельно!!');
   return;
  }
 }
});
