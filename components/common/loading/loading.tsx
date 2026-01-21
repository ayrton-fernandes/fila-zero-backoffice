import styles from "./index.module.scss"

export function Loading({ className }: { className?: string }) {
  return <div className={`${styles.spinner} ${className}`} />
}
