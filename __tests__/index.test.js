import {
  test,
  describe,
  expect,
  beforeAll,
  afterEach,
} from "@jest/globals";
import fs from "node:fs";
import * as uuid from "uuid";

import {
  addQuote,
  getQuotes,
  getRandomQuote,
  editQuote,
  deleteQuote,
} from "../quote.js";

const fileName = "quotes.json";

beforeAll(() => {
  fs.writeFileSync(fileName, "[]", { encoding: "utf8" });
});

afterEach(() => {
  fs.writeFileSync(fileName, "[]", { encoding: "utf8" });
});

describe("ticket 2b", () => {
  test("that addQuote adds a valid quote", async () => {
    const quoteText = "Five four three two one";
    const result = await addQuote(quoteText);
    const result2 = await addQuote(quoteText);
    const quotes = JSON.parse(
      fs.readFileSync(fileName, { encoding: "utf8" })
    );
    expect(result).toStrictEqual({
      id: expect.any(String),
      quoteText,
    });
    expect(uuid.validate(result.id)).toBe(true);
    expect(quotes).toStrictEqual([result, result2]);
  });
});

describe("ticket 2c", () => {
  test("that getQuotes returns all quotes", async () => {
    const quoteText = "This is some random quote test";
    const result = await addQuote(quoteText);
    const result2 = await addQuote(quoteText);
    const quotes = await getQuotes();
    expect(quotes).toStrictEqual([result, result2]);
  });
});

describe("ticket 2d", () => {
  test("that getRandomQuote returns a random quote", async () => {
    const quoteText = "This is some random quote test";
    const result = await addQuote(quoteText);
    const result2 = await addQuote(quoteText);
    const quote = await getRandomQuote();
    expect(quote).toBeDefined();
    expect([result, result2]).toContainEqual(quote);
  });
});

describe("ticket 2e", () => {
  test("that editQuote modifies an existing quote", async () => {
    const quoteText = "Five four three two one";
    const editedText = "This has been edited";
    const result = await addQuote(quoteText);
    const result2 = await addQuote(quoteText);
    const editedQuote = await editQuote(result.id, editedText);
    expect(editedQuote).toStrictEqual({ id: result.id, quoteText: editedText });
    const quotes = JSON.parse(
      fs.readFileSync(fileName, { encoding: "utf8" })
    );
    expect(quotes).toStrictEqual([editedQuote, result2]);
  });

  test("that editQuote returns null when the quote id given is non-existent", async () => {
    const quoteText = "Five four three two one";
    const editedText = "This has been edited";
    const result = await addQuote(quoteText);
    const result2 = await addQuote(quoteText);
    const editedQuote = await editQuote("Not a real id", editedText);
    expect(editedQuote).toBeNull();
    const quotes = JSON.parse(
      fs.readFileSync(fileName, { encoding: "utf8" })
    );
    expect(quotes).toStrictEqual([result, result2]);
  });
});

describe("ticket 2f", () => {
  test("that deleteQuote deletes the correct existing quote", async () => {
    const quoteText = "Five four three two one";
    const result = await addQuote(quoteText);
    const result2 = await addQuote(quoteText);
    const deletedQuote = await deleteQuote(result.id);
    expect(deletedQuote).toStrictEqual(result);
    const quotes = JSON.parse(
      fs.readFileSync(fileName, { encoding: "utf8" })
    );
    expect(quotes).toStrictEqual([result2]);
  });

  test("that deleteQuote returns null when the quote id given is non-existent", async () => {
    const quoteText = "Five four three two one";
    const result = await addQuote(quoteText);
    const result2 = await addQuote(quoteText);
    const deletedQuote = await deleteQuote("Not a real id");
    expect(deletedQuote).toBeNull();
    const quotes = JSON.parse(
      fs.readFileSync(fileName, { encoding: "utf8" })
    );
    expect(quotes).toStrictEqual([result, result2]);
  });
});
