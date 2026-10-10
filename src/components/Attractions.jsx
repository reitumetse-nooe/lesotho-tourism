import { useState, useEffect } from 'react'
import attractions from '../data/attractions'

function Attractions() {
  // Store the search text and selected category
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedAttraction, setSelectedAttraction] = useState(null)

  // Store the picture that is opened in the large view
  const [openImage, setOpenImage] = useState(null)

  // Close the large picture when the Escape key is pressed
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') {
        setOpenImage(null)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Filter attractions by name and category
  const filteredAttractions = attractions.filter((attraction) => {
    const matchesSearch = attraction.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || attraction.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <section className="destinations" id="destinations">
      {/* Section heading */}
      <p className="section-label">PLACES TO EXPLORE</p>
      <h2>Explore Our Attractions</h2>

      {/* Search attractions by name */}
      <input
        type="text"
        placeholder="Search attractions..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* Filter attractions by category */}
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Nature">Nature</option>
        <option value="History">History</option>
        <option value="Adventure">Adventure</option>
        <option value="Culture">Culture</option>
      </select>

      {/* Display matching attractions */}
      <div className="destination-grid">
        {filteredAttractions.map((attraction) => (
          <article className="destination-card" key={attraction.id}>
            {/* Click the picture to view it larger */}
            <button
              type="button"
              className="image-button"
              onClick={() => setOpenImage(attraction)}
              aria-label={`View a larger picture of ${attraction.name}`}
            >
              <img src={attraction.image} alt={attraction.name} />
            </button>

            <div className="card-content">
              <p>{attraction.location}</p>
              <h3>{attraction.name}</h3>
              <p>{attraction.description}</p>
              <p><strong>Category:</strong> {attraction.category}</p>
              <p>
                <strong>Activities:</strong>{' '}
                {attraction.activities.join(', ')}
              </p>
              <p>
                <strong>Estimated cost:</strong> M{attraction.cost}
              </p>

              {/* Show or hide additional details */}
              <button
                onClick={() =>
                  setSelectedAttraction(
                    selectedAttraction?.id === attraction.id
                      ? null
                      : attraction
                  )
                }
              >
                {selectedAttraction?.id === attraction.id
                  ? 'Hide Details'
                  : 'View Details'}
              </button>

              {selectedAttraction?.id === attraction.id && (
                <div className="details-panel">
                  <h4>About {attraction.name}</h4>
                  <p>{attraction.description}</p>
                  <p><strong>Location:</strong> {attraction.location}</p>
                  <p>
                    <strong>Activities:</strong>{' '}
                    {attraction.activities.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Message shown when there are no matching results */}
      {filteredAttractions.length === 0 && (
        <p>No attractions found. Try another search.</p>
      )}

      {/* Large picture view */}
      {openImage && (
        <div className="lightbox" onClick={() => setOpenImage(null)}>
          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setOpenImage(null)}
              aria-label="Close picture"
            >
              ✕
            </button>
            <img src={openImage.image} alt={openImage.name} />
            <p>{openImage.name}, {openImage.location}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Attractions