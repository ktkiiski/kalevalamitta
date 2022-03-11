import { FC } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.scroll}>
        <div className={styles.scrollTop}>
          <div className={styles.scrollEndShade} />
        </div>
        <div className={styles.scrollMiddle}>
          <div className={styles.scrollMiddleTop} />
          <div className={styles.scrollContent}>{children}</div>
          <div className={styles.scrollMiddleBottom} />
        </div>
        <div className={styles.scrollBottom}>
          <div className={styles.scrollEndShade} />
        </div>
      </div>
      <div className={styles.shadowRight} />
      <div className={styles.shadowBottom} />
    </div>
  );
};

export default Layout;
