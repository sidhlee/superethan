import styles from '../styles/ChallengeText.module.css';

type Props = {
  challengeText: string;
  challengeAnswer: string;
  finishedAllChallenges: boolean;
};

const ChallengeText = ({
  challengeText,
  challengeAnswer,
  finishedAllChallenges,
}: Props) => {
  if (finishedAllChallenges) {
    return <p>Ethan, you are Amazing! Want to try some more?</p>;
  }

  const spans = challengeText.split('').map((char, i) => {
    if (i >= challengeAnswer.length || challengeAnswer.length === 0)
      return <span key={i}>{char}</span>;

    const match = char === challengeAnswer[i];
    return (
      <span key={i} className={match ? styles.correct : styles.wrong}>
        {char}
      </span>
    );
  });

  return <div>{spans}</div>;
};

export default ChallengeText;
