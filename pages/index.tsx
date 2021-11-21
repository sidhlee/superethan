import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useRef, useState } from 'react';
import { getAllReadings } from '../lib/parse-readings-markdown';
import Reading from '../types/reading';
import { getChallengeText, getAllChallengeText } from '../lib/challenge';

type Props = {
  allReadings: Reading[];
};

const Home = ({ allReadings }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [currentReading, setCurrentReading] = useState(allReadings[0]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const allChallengeText = getAllChallengeText(currentReading.content);
  const challengeText = getChallengeText(
    currentReading.content,
    currentChallengeIndex
  );
  const isAnswerCorrect = challengeAnswer.trim() === challengeText.trim();

  useEffect(() => {
    inputRef.current?.focus();
    if (typeof window !== 'undefined') {
      const readingFromLocalStorage = localStorage.getItem('currentReading');
      if (readingFromLocalStorage) {
        setCurrentReading(JSON.parse(readingFromLocalStorage));
      }
    }
  }, []);

  const winChallenge = () => {
    inputRef.current!.value = '';
    setCurrentChallengeIndex((i) => i + 1);
    setChallengeAnswer('');
  };

  const handleReadingChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectedReading = allReadings.find(
      (reading) => reading.title === e.currentTarget.value
    );
    if (selectedReading) {
      setCurrentReading(selectedReading);
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentReading', JSON.stringify(selectedReading));
      }
    }
  };

  const handleAnswerChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value;
    setChallengeAnswer(answer.trimStart());
  };

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    winChallenge();
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      // prevent line break
      e.preventDefault();
      if (challengeAnswer.trim() === challengeText.trim()) {
        submitButtonRef.current!.click();
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Super Ethan</title>
        <meta
          name="description"
          content="Level up your English with SuperEthan!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <Link href="/about">
            <a>SuperEthan!</a>
          </Link>
        </h1>
        <div className={styles.challenge}>
          <form>
            <select
              className={styles.readingSelect}
              onChange={handleReadingChange}
              value={currentReading.title}
            >
              {allReadings.map((reading) => (
                <option key={reading.title} value={reading.title}>
                  {reading.title}
                </option>
              ))}
            </select>
          </form>
          <p>
            {currentChallengeIndex + 1} / {allChallengeText.length} (
            {(
              ((currentChallengeIndex + 1) / allChallengeText.length) *
              100
            ).toFixed(0)}
            %)
          </p>
        </div>

        <p className={styles.challengeText + ' disable-select'}>
          {challengeText.split('').map((char, i) => {
            if (i >= challengeAnswer.length || challengeAnswer.length === 0)
              return <span key={i}>{char}</span>;

            const match = char === challengeAnswer[i];
            return (
              <span key={i} className={match ? styles.correct : styles.wrong}>
                {char}
              </span>
            );
          })}
        </p>
        <form ref={formRef} onSubmit={handleAnswerSubmit}>
          <textarea
            ref={inputRef}
            className={styles.challengeInput}
            value={challengeAnswer}
            onChange={handleAnswerChange}
            onKeyDown={handlePressEnter}
          ></textarea>
          <button
            className={styles.submitButton}
            type="submit"
            ref={submitButtonRef}
            disabled={!isAnswerCorrect}
          >
            Enter!
          </button>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const allReadings = getAllReadings(['title', 'content']);

  return {
    props: { allReadings },
  };
};
