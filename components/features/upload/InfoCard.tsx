'use client';

import { Card, Icon, Typography } from '@uigovpe/components';
import styles from './InfoCard.module.scss';

interface InfoCardProps {
  icon: string;
  title: string;
  items: string[];
  variant?: 'warning' | 'info';
}

export const InfoCard = ({ icon, title, items, variant = 'info' }: InfoCardProps) => {
  return (
    <Card className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.header}>
        <Icon icon={icon} className={styles.icon} />
        <Typography variant="h3" className={styles.title}>
          {title}
        </Typography>
      </div>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <span className={styles.bullet}>•</span>
            <Typography variant="p">{item}</Typography>
          </li>
        ))}
      </ul>
    </Card>
  );
};
