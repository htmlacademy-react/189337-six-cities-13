import { useAppSelector } from '../../hooks';
import styles from './loader.module.css';

export default function Loader() {
  const isLoading = useAppSelector((state) => state.isLoading);
  return (
    isLoading &&
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
}
