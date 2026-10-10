// Component showing popular activities in Lesotho
function Activities() {
  // List of activities visitors can enjoy
  const activities = [
    {
      id: 1,
      name: 'Hiking',
      description: 'Explore beautiful mountains and scenic trails.'
    },
    {
      id: 2,
      name: 'Skiing',
      description: 'Enjoy snow activities at Afriski Mountain Resort.'
    },
    {
      id: 3,
      name: 'Cultural Tours',
      description: 'Learn about Basotho traditions and history.'
    },
    {
      id: 4,
      name: 'Photography',
      description: 'Capture the beauty of Lesotho landscapes.'
    },
    {
      id: 5,
      name: 'Horse Riding',
      description: 'Explore the highlands on horseback.'
    },
    {
      id: 6,
      name: 'Camping',
      description: 'Enjoy the outdoors and beautiful mountain views.'
    }
  ]

  return (
    <section className="activities" id="activities">
      {/* Section heading */}
      <p className="section-label">MAKE MEMORIES</p>
      <h2>Popular Activities</h2>

      {/* Display each activity */}
      <div className="activities-grid">
        {activities.map((activity) => (
          <div className="activity-card" key={activity.id}>
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Export the component
export default Activities