import { PropsWithChildren } from 'react';
import Switch from "react-switch";
import styles from '../page.module.css';

// create switch component to select status
export function SelectStatusSwitch({ selectedStatus, setSelectedStatus }: PropsWithChildren<{ selectedStatus: 'bikes' | 'docks', setSelectedStatus: (status: 'bikes' | 'docks') => void }>) {
  return (
    <div className={styles["switch-container"]}>
      <p >Ver bicicletas disponibles</p>
      <Switch
          onChange={() => setSelectedStatus(selectedStatus === 'bikes' ? 'docks' : 'bikes')}
          checked={selectedStatus === 'docks'}
          uncheckedIcon={false}
          checkedIcon={false}
          offColor="#080"
        />
        <p>Ver espacios disponibles</p>
    </div>
  );
}