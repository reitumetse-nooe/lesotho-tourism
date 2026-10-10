// Component for showing extra information about a selected attraction
function AttractionDetails({ attraction, onClose }) {
  // Do not display anything if no attraction is selected
  if (!attraction) {
    return null
  }

  return (
    <div className="details-panel">
      {/* Attraction name */}
      <h3>{attraction.name}</h3>

      {/* Attraction description */}
      <p>{attraction.description}</p>

      {/* Attraction location */}
      <p>
        <strong>Location:</strong> {attraction.location}
      </p>

      {/* Attraction category */}
      <p>
        <strong>Category:</strong> {attraction.category}
      </p>

      {/* Activities available at this attraction */}
      <p>
        <strong>Activities:</strong> {attraction.activities.join(', ')}
      </p>

      {/* Estimated visiting cost */}
      <p>
        <strong>Estimated Cost:</strong> M{attraction.cost}
      </p>

      {/* Button to close the details */}
      <button onClick={onClose}>Close Details</button>
    </div>
  )
}

// Export the component for use in other files
export default AttractionDetails