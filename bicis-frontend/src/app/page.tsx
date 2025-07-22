'use client';
import { useState } from "react";
import styles from "./page.module.css";
import dynamic from 'next/dynamic';
import { SelectStatusSwitch } from "./components/SelectStatusSwitch";

const BicisMap = dynamic(() => import('./components/BicisMap'), {
  ssr: false,
});

export default function Home() {
  const [selectedStatus, setSelectedStatus] = useState<'bikes' | 'docks'>('bikes');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SelectStatusSwitch selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        <BicisMap selectedStatus={selectedStatus} />
      </main>
     </div>
  );
}
