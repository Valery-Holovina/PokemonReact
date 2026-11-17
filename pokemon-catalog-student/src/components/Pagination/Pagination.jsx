
import styles from './Pagination.module.css'

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Назад
      </button>

      <span>
        Сторінка <strong>{currentPage}</strong> із{' '}
        <strong>{totalPages}</strong>
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Далі →
      </button>
    </div>
  )
}

export default Pagination
