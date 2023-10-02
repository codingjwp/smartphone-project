import { ReactNode } from 'react'
import styles from './layout.module.css'

export default function PostLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className={styles.container}>{children}</div>
    )
}