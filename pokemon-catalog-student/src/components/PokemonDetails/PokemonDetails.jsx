
import { useEffect } from 'react'
import styles from './PokemonDetails.module.css'

function PokemonDetails({
  pokemon,
  loading,
  error,
  onClose,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pokemon-title"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Закрити"
        >
          ×
        </button>

        {loading && (
          <p className={styles.message}>
            Завантажуємо інформацію...
          </p>
        )}

        {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}

        {pokemon && !loading && (
          <>
            <div className={styles.imageBox}>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default ||
                  pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            </div>

            <p className={styles.number}>
              #{String(pokemon.id).padStart(4, '0')}
            </p>

            <h2 id="pokemon-title">
              {pokemon.name.charAt(0).toUpperCase() +
                pokemon.name.slice(1)}
            </h2>

            <div className={styles.types}>
              {pokemon.types.map((item) => (
                <span key={item.type.name}>
                  {item.type.name}
                </span>
              ))}
            </div>

            <div className={styles.measurements}>
              <div>
                <strong>{pokemon.height / 10} m</strong>
                <span>Зріст</span>
              </div>

              <div>
                <strong>{pokemon.weight / 10} kg</strong>
                <span>Вага</span>
              </div>
            </div>

            <h3>Здібності</h3>

            <div className={styles.abilities}>
              {pokemon.abilities.map((item) => (
                <span key={item.ability.name}>
                  {item.ability.name.replace('-', ' ')}
                </span>
              ))}
            </div>

            <h3>Базові характеристики</h3>

            <div className={styles.stats}>
              {pokemon.stats.map((item) => (
                <div
                  className={styles.stat}
                  key={item.stat.name}
                >
                  <span>{item.stat.name.replace('-', ' ')}</span>

                  <strong>{item.base_stat}</strong>

                  <div className={styles.bar}>
                    <div
                      style={{
                        width: `${Math.min(item.base_stat, 150) / 150 * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default PokemonDetails
