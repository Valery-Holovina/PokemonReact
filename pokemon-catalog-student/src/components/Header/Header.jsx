
import styles from './Header.module.css'

function Header({ loadedCount, theme, onToggleTheme }) {
  return (
    <header className={styles.header}>
      <a
        className={styles.logo}
        href="#top"
        aria-label="На початок сторінки"
      >
        <span className={styles.logoIcon}>P</span>
        <span>Pokédex</span>
      </a>

      <div className={styles.right}>
        <div className={styles.counter}>
          <strong>{loadedCount}</strong>
          <span>завантажено</span>
        </div>

        <button
          type="button"
          className={styles.themeButton}
          onClick={onToggleTheme}
          aria-label="Перемкнути тему"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header

