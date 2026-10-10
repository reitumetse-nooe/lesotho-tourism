
function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        LESOTHO<span>.</span>
      </a>

      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#destinations">Attractions</a>
        </li>
        <li>
          <a href="#activities">Activities</a>
        </li>
        <li>
          <a href="#contact">Enquiries</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
