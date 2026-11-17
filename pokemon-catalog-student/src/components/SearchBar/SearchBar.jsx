import styles from './SearchBar.module.css'

function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.search}>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Знайти серед завантажених..."
        />
        {value && (
          <button type="button" onClick={() => onChange('')}>
            Очистити
          </button>
        )}
      </label>

      <p className={styles.result}>
        Знайдено: <strong>{resultCount}</strong>
      </p>
    </div>
  )
}

export default SearchBar