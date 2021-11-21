export function getChallengeText(
  currentReadingContent: string,
  currentChallengeIndex: number
): string {
  const challenges = getAllChallengeText(currentReadingContent);

  return challenges[currentChallengeIndex];
}

export function getAllChallengeText(currentReadingContent: string) {
  const allChallengeText = currentReadingContent
    .replace(/\n/g, ' ')
    .split('. ')
    .map((t, i, a) => (i === a.length - 1 ? t.trim() : (t + '.').trim()));
  return allChallengeText;
}
