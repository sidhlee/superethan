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
    .map((t) => (t + '.').trim());
  return allChallengeText;
}
