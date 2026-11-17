
import PokemonCard from '../PokemonCard/PokemonCard.jsx'
import styles from './PokemonGrid.module.css'

function PokemonGrid({ pokemon, onDetails }) {
  return (
    <section
      className={styles.grid}
      aria-label="Каталог покемонів"
    >
      {pokemon.map((item) => (
        <PokemonCard
          key={item.id}
          pokemon={item}
          onDetails={onDetails}
        />
      ))}
    </section>
  )
}

export default PokemonGrid
