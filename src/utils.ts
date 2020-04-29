function sentenceTruncation(sentence: string, truncationWordNum: number) {
  const words: string[] = sentence.trim().split(/[^a-zA-Z0-9_-]/);
  if (words.length <= truncationWordNum) return sentence.trim();
  return words.splice(0, truncationWordNum).join(" ").concat("...");
}

export function sentenceTruncationByChar(
  sentence: string,
  truncationCharNum: number
) {
  if (sentence.trim().length <= truncationCharNum) return sentence.trim();
  return sentence.trim().substring(0, truncationCharNum).concat("...");
}
