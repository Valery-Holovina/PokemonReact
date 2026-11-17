
import styles from './PokemonCard.module.css'

const ACCENTS = [
  '#ffca62',
  '#74e0bc',
  '#8eb8ff',
  '#d6a0ff',
  '#ff8eab',
]

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function PokemonCard({ pokemon, onDetails }) {
  const accent = ACCENTS[(pokemon.id - 1) % ACCENTS.length]

  return (
    <article
      className={styles.card}
      style={{ '--accent': accent }}
    >
      <div className={styles.number}>
        #{String(pokemon.id).padStart(4, '0')}
      </div>

      <div className={styles.imageBox}>
        <div className={styles.circle} />

        <img
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
        />
      </div>

      <h2>{formatName(pokemon.name)}</h2>

      <p>Кишеньковий монстр</p>

      <button
        type="button"
        className={styles.detailsButton}
        onClick={() => onDetails(pokemon.name)}
      >
        Детальніше →
      </button>
    </article>
  )
}

export default PokemonCard
