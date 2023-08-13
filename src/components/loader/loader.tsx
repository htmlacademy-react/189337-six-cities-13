import { useAppSelector } from '../../hooks';
import { getIsLoading } from '../../store/global-process/selectors';
import styles from './loader.module.css';

function Loader() {
  const isLoading = useAppSelector(getIsLoading);
  return (
    isLoading &&
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Loader;

