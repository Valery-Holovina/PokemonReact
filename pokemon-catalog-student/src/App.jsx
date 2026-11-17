
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

import {
  getPokemonList,
  getPokemonByType,
  getPokemonDetails,
} from './api/pokemonApi.js'

import Header from './components/Header/Header.jsx'
import Message from './components/Message/Message.jsx'
import PokemonGrid from './components/PokemonGrid/PokemonGrid.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import CatalogControls from './components/CatalogControls/CatalogControls.jsx'
import Pagination from './components/Pagination/Pagination.jsx'
import PokemonDetails from './components/PokemonDetails/PokemonDetails.jsx'

import styles from './App.module.css'

const PAGE_SIZE = 12

function App() {
 
  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('id-asc')
  const [type, setType] = useState('all')
  const [typeIds, setTypeIds] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [isTypeLoading, setIsTypeLoading] = useState(false)
  const [error, setError] = useState('')

  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pokedex-theme') || 'dark'
  })

 
  const [selectedName, setSelectedName] = useState(null)
  const [details, setDetails] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')

 
  const loadPokemon = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      const data = await getPokemonList()
      setPokemon(data)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPokemon()
  }, [loadPokemon])

  
  useEffect(() => {
    if (type === 'all') {
      setTypeIds(null)
      setIsTypeLoading(false)
      return
    }

    let cancelled = false

    async function loadType() {
      setIsTypeLoading(true)
      setTypeIds([])

      try {
        const data = await getPokemonByType(type)

        if (!cancelled) {
          setTypeIds(data.map((item) => item.id))
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message)
        }
      } finally {
        if (!cancelled) {
          setIsTypeLoading(false)
        }
      }
    }

    loadType()

    return () => {
      cancelled = true
    }
  }, [type])


  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('pokedex-theme', theme)
  }, [theme])

  function handleToggleTheme() {
    setTheme((current) =>
      current === 'dark' ? 'light' : 'dark'
    )
  }

 
  const filteredPokemon = useMemo(() => {
    let result = [...pokemon]

    if (type !== 'all') {
      const allowedIds = new Set(typeIds || [])

      result = result.filter((item) =>
        allowedIds.has(item.id)
      )
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter((item) =>
        item.name.includes(query)
      )
    }

    return result
  }, [pokemon, type, typeIds, search])

  
  const sortedPokemon = useMemo(() => {
    const result = [...filteredPokemon]

    switch (sort) {
      case 'id-desc':
        result.sort((a, b) => b.id - a.id)
        break

      case 'name-asc':
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
        break

      case 'name-desc':
        result.sort((a, b) =>
          b.name.localeCompare(a.name)
        )
        break

      default:
        result.sort((a, b) => a.id - b.id)
    }

    return result
  }, [filteredPokemon, sort])

 
  const totalPages = Math.max(
    1,
    Math.ceil(sortedPokemon.length / PAGE_SIZE)
  )

  const safePage = Math.min(currentPage, totalPages)

  const startIndex = (safePage - 1) * PAGE_SIZE

  const visiblePokemon = sortedPokemon.slice(
    startIndex,
    startIndex + PAGE_SIZE
  )

  
  function handleSearchChange(value) {
    setSearch(value)
    setCurrentPage(1)
  }

  function handleTypeChange(value) {
    setType(value)
    setCurrentPage(1)
    setError('')
  }

  function handleSortChange(value) {
    setSort(value)
    setCurrentPage(1)
  }

  
  function handleOpenDetails(name) {
    setDetails(null)
    setDetailError('')
    setSelectedName(name)
  }

  const handleCloseDetails = useCallback(() => {
    setSelectedName(null)
    setDetails(null)
  }, [])

  
  useEffect(() => {
    if (!selectedName) return

    let cancelled = false

    async function loadDetails() {
      setDetailLoading(true)
      setDetailError('')

      try {
        const data = await getPokemonDetails(selectedName)

        if (!cancelled) {
          setDetails(data)
        }
      } catch (requestError) {
        if (!cancelled) {
          setDetailError(requestError.message)
        }
      } finally {
        if (!cancelled) {
          setDetailLoading(false)
        }
      }
    }

    loadDetails()

    return () => {
      cancelled = true
    }
  }, [selectedName])

  return (
    <div className={styles.app} id="top">
      <Header
        loadedCount={pokemon.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>
              React · Fetch · PokéAPI
            </span>

            <h1>
              Знайди свого
              <em> покемона.</em>
            </h1>

            <p>
              Досліджуй світ покемонів, шукай улюблених
              персонажів та дізнавайся про них більше.
            </p>
          </div>

          <div className={styles.heroArt} aria-hidden="true">
            <span>?</span>
          </div>
        </section>

        <SearchBar
          value={search}
          onChange={handleSearchChange}
          resultCount={filteredPokemon.length}
        />

        <CatalogControls
          sort={sort}
          onSortChange={handleSortChange}
          type={type}
          onTypeChange={handleTypeChange}
        />

        {error && (
          <div className={styles.errorBox}>
            <Message title="Не вдалося завантажити дані" error>
              {error}
            </Message>

            <button
              type="button"
              className={styles.retryButton}
              onClick={loadPokemon}
              disabled={isLoading}
            >
              {isLoading ? 'Завантажуємо...' : 'Спробувати ще раз'}
            </button>
          </div>
        )}

        {(isLoading || isTypeLoading) && (
          <Message title="Завантажуємо покемонів...">
            Будь ласка, зачекайте.
          </Message>
        )}

        {!isLoading &&
          !isTypeLoading &&
          !error &&
          filteredPokemon.length === 0 && (
            <Message title="Нічого не знайдено">
              Спробуйте змінити пошук або тип покемона.
            </Message>
          )}

        {!isLoading &&
          !isTypeLoading &&
          !error &&
          visiblePokemon.length > 0 && (
            <>
              <PokemonGrid
                pokemon={visiblePokemon}
                onDetails={handleOpenDetails}
              />

              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

              <p className={styles.catalogInfo}>
                Показано {startIndex + 1}–
                {Math.min(startIndex + PAGE_SIZE, sortedPokemon.length)}
                {' '}із {sortedPokemon.length} покемонів
              </p>
            </>
          )}
      </main>

      <footer className={styles.footer}>
        Дані: PokéAPI · React навчальний проєкт
      </footer>

      {selectedName && (
        <PokemonDetails
          pokemon={details}
          loading={detailLoading}
          error={detailError}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  )
}

export default App



