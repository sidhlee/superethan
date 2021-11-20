import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Me</title>
        <meta name="description" content="About Ethan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>About Me</h1>

        <p className={styles.description}>
          Hi! My name is Ethan. I like playing video games and coding. When I
          grow up, I want to become a programmer and build many exciting games
          for kids all around the world!
        </p>

        <div className={styles.grid}>
          <Link href="/">
            <a className={styles.card}>
              <h2>Back to SuperEthan &rarr;</h2>
              <p>Level up your English with SuperEthan!</p>
            </a>
          </Link>

          <a
            href="https://timescraft.netlify.app/"
            className={styles.card}
            target="_blank"
            rel="noreferrer"
          >
            <h2>TimesCraft</h2>
            <p>Practice times table with TimesCraft!</p>
          </a>
        </div>
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
