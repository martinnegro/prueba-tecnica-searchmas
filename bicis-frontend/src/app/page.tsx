'use client';
import styles from "./page.module.css";
import dynamic from 'next/dynamic';

const BicisMap = dynamic(() => import('./components/BicisMap'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BicisMap/>
      </main>
     </div>
  );
}
