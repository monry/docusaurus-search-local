import lunr from "lunr";

/**
 * Split a sentence to tokens, considering a sequence of consecutive Chinese words as a single token.
 *
 * @param text - Text to be tokenized.
 * @param language - Languages used.
 *
 * @returns Tokens.
 */
export function tokenize(text: string, language: string[]): string[] {
  // Some languages have their own tokenizer.
  if (language.length === 1 && ["ja", "jp", "th"].includes(language[0])) {
    return ((lunr as any)[language[0]] as typeof lunr)
      .tokenizer(text)
      .map((token) => token.toString());
  }

  // https://qiita.com/y_catch/items/46b7eb7d618d95fbc9c3
  let regExpMatchWords = /[\s\-\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]+/gu;

  return text.toLowerCase().match(regExpMatchWords) || [];
}
