// Import all website components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Attractions from './components/Attractions'
import Activities from './components/Activities'
import EnquiryForm from './components/EnquiryForm'
import Footer from './components/Footer'

// Import website styling
import './App.css'

// Main application component
function App() {
  return (
    <>
      {/* Navigation menu */}
      <Navbar />

      {/* Main welcome section */}
      <Hero />

      {/* Information about Lesotho */}
      <About />

      {/* Tourist attractions and search */}
      <Attractions />

      {/* Popular tourist activities */}
      <Activities />

      {/* Visitor enquiry form */}
      <EnquiryForm />

      {/* Website footer */}
      <Footer />
    </>
  )
}

// Export the main application
export default App