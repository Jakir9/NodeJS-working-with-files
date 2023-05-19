import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "quotes.json";

export async function addQuote(quoteText) {
  const newQuote = {
    id: uuidv4(),
    quoteText: quoteText,
  };
  const quoteJSON = await fs.readFile(fileName, "utf-8");
  const quotes = JSON.parse(quoteJSON);
  quotes.push(newQuote);
  const quoteStringJSON = JSON.stringify(quotes, null, 20);
  await fs.writeFile(fileName, quoteStringJSON, "utf-8");
  return newQuote;
}

export async function getQuotes() {
  //parse quotes from quotes.json
  //return array of all existing objects
  let JSONFile = await fs.readFile(fileName, "utf-8");
  let quotes = JSON.parse(JSONFile);
  return quotes;
}

export async function getRandomQuote() {
  const file = await fs.readFile(fileName);
  const quotes = JSON.parse(file);
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export async function editQuote(id, quoteText) {
  const file = await fs.readFile(fileName, "utf8"); //read the file and save it
  const quotes = JSON.parse(file); //parse(decode) the json

  for (const quote of quotes) {
    //loop through the quotes
    if (id === quote.id) {
      //if the id matches the quote id
      quote.quoteText = quoteText; //change the quote text
      await fs.writeFile(fileName, JSON.stringify(quotes)); //write the file
      return quote; //return the quote
    }
  }

  return null; // Return null if the quote with the specified ID was not found
}

export async function deleteQuote(id) {
  const file = await fs.readFile(fileName, "utf8"); //read the file and save it
  let quotes = JSON.parse(file); //parse(decode) the json

  for (const quote of quotes) {
    //loop through the quotes
    if (id === quote.id) {
      //if the id matches the quote id
      quotes.splice(quotes.indexOf(quote), 1); //remove the quote
      await fs.writeFile(fileName, JSON.stringify(quotes)); //write the file
      return quote; //return the quote
    }
  }
  return null; // if no quote is found
}
