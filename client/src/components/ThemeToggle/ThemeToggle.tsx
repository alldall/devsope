'use client'

import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import styles from './ThemeToggle.module.scss'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <button className={styles.button} onClick={toggleTheme} aria-label='Toggle theme'>
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    )
}