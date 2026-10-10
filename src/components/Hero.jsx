function Hero() {
  return (
    <section
      className="hero"
      id="home"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('/images/hero.jpg')"
      }}
    >
      <div className="hero-content">

        {/* Small heading introducing Lesotho */}
        <p className="eyebrow">THE KINGDOM IN THE SKY</p>

        {/* Main heading of the website */}
        <h1>
          Discover the beauty of <span>Lesotho.</span>
        </h1>

        {/* Short introduction to Lesotho's attractions */}
        <p className="hero-text">
          From breathtaking mountains to beautiful waterfalls,
          discover the hidden treasures of our mountain kingdom.
        </p>

        {/* Button linking to the attractions section */}
        <a href="#destinations" className="main-button">
          Explore Destinations →
        </a>

      </div>
    </section>
  )
}

// Export the component so App.jsx can use it
export default Hero