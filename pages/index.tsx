import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [challengeText, setChallengeText] = useState(
    "A lot of noise was coming from Robert's garage."
  );
  const [challengeAnswer, setChallengeAnswer] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validateChallengeAnswer = (answer: string): boolean => {
    const textChars = challengeText.split('');

    return challengeAnswer === challengeText;
  };

  const handleAnswerChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value;
    setChallengeAnswer(answer);
    const isCorrect = validateChallengeAnswer(answer);
    if (isCorrect) {
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
        <p className={styles.challengeText}>
          {challengeText.split('').map((char, i) => {
            if (i >= challengeAnswer.length || challengeAnswer.length === 0)
              return <span>{char}</span>;

            const match = char === challengeAnswer[i];
            return (
              <span key={i} className={match ? styles.correct : styles.wrong}>
                {char}
              </span>
            );
          })}
        </p>
        <form>
          <textarea
            ref={inputRef}
            className={styles.challengeInput}
            value={challengeAnswer}
            onChange={handleAnswerChange}
          ></textarea>
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
