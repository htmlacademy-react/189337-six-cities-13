import { useAppSelector } from '../../hooks';
import styles from './loader.module.css';

function Loader() {
  const isLoading = useAppSelector((state) => state.isLoading);
  return (
    isLoading &&
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Loader;

