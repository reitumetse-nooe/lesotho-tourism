// Footer section displayed at the bottom of the website
function Footer() {
  return (
    <footer className="footer">
      {/* Website name */}
      <h3>LESOTHO<span>.</span></h3>

      {/* Short closing message */}
      <p>Discover the beauty of the Kingdom in the Sky.</p>

      {/* Copyright information */}
      <p>
        &copy; {new Date().getFullYear()} Lesotho Tourism.
        All rights reserved.
      </p>

      {/* Link back to the top of the website */}
      <a href="#home">Back to Top ↑</a>
    </footer>
  )
}

// Export the Footer component
export default Footer