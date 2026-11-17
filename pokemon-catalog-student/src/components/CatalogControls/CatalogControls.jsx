
import styles from './CatalogControls.module.css'

function CatalogControls({
  sort,
  onSortChange,
  type,
  onTypeChange,
}) {
  return (
    <div className={styles.controls}>
      <div className={styles.field}>
        <label htmlFor="sort">Сортування</label>

        <select
          id="sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="id-asc">Номер: від меншого</option>
          <option value="id-desc">Номер: від більшого</option>
          <option value="name-asc">Назва: А – Я</option>
          <option value="name-desc">Назва: Я – А</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="type">Тип покемона</label>

        <select
          id="type"
          value={type}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="all">Усі типи</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="dragon">Dragon</option>
          <option value="ice">Ice</option>
        </select>
      </div>
    </div>
  )
}

export default CatalogControls
