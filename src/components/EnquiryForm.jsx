import { useState } from 'react'

// Get a date in YYYY-MM-DD format, optionally years ahead
function getDate(yearsAhead = 0) {
  const date = new Date()
  date.setFullYear(date.getFullYear() + yearsAhead)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  visitors: '1',
  visitDate: '',
  message: ''
}

const destinations = [
  'Maletsunyane Falls',
  'Katse Dam',
  'Thaba Bosiu',
  'Sehlabathebe National Park',
  'Afriski Mountain Resort',
  'Liphofung Cave',
  'Bokong Nature Reserve',
  'Morija Museum'
]

const MESSAGE_LIMIT = 500

function EnquiryForm() {
  // Store the form information
  const [formData, setFormData] = useState(emptyForm)

  // Store the error message for each field
  const [errors, setErrors] = useState({})

  // Store the success message
  const [confirmation, setConfirmation] = useState('')

  // Check every field and return an object of error messages
  function validate(data) {
    const newErrors = {}

    // ---- Full name ----
    const name = data.fullName.trim()
    if (!name) {
      newErrors.fullName = 'Please enter your full name.'
    } else if (name.length < 2) {
      newErrors.fullName = 'Your name must be at least 2 characters.'
    } else if (name.length > 60) {
      newErrors.fullName = 'Your name must be 60 characters or fewer.'
    } else if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(name)) {
      newErrors.fullName =
        'Names can only contain letters, spaces, hyphens and apostrophes.'
    }

    // ---- Email ----
    const email = data.email.trim()
    if (!email) {
      newErrors.email = 'Please enter your email address.'
    } else if (/\s/.test(email)) {
      newErrors.email = 'An email address cannot contain spaces.'
    } else if (!email.includes('@')) {
      newErrors.email = 'Your email must contain an @ symbol.'
    } else if (email.split('@').length > 2) {
      newErrors.email = 'Your email can only contain one @ symbol.'
    } else if (email.startsWith('@')) {
      newErrors.email = 'Please enter the part before the @, e.g. name@example.com.'
    } else if (email.endsWith('@')) {
      newErrors.email = 'Please enter the domain after the @, e.g. name@example.com.'
    } else if (!email.split('@')[1].includes('.')) {
      newErrors.email = 'The domain needs a dot, e.g. example.com.'
    } else if (email.includes('..')) {
      newErrors.email = 'An email address cannot have two dots in a row.'
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(
        email
      ) ||
      email.startsWith('.') ||
      email.split('@')[0].endsWith('.')
    ) {
      newErrors.email = 'Please enter a valid email, e.g. name@example.com.'
    } else if (email.length > 254) {
      newErrors.email = 'That email address is too long.'
    }

    // ---- Phone ----
    const phone = data.phone.trim()
    const phoneDigits = phone.replace(/\D/g, '')
    if (!phone) {
      newErrors.phone = 'Please enter your phone number.'
    } else if (/[^0-9+\s-]/.test(phone)) {
      newErrors.phone = 'Phone numbers can only contain digits, spaces, + and -.'
    } else if (phone.lastIndexOf('+') > 0) {
      newErrors.phone = 'The + sign can only be at the start, e.g. +266 5812 3456.'
    } else if (phoneDigits.length < 8) {
      newErrors.phone = 'Your phone number is too short (at least 8 digits).'
    } else if (phoneDigits.length > 15) {
      newErrors.phone = 'Your phone number is too long (at most 15 digits).'
    }

    // ---- Destination ----
    if (!data.destination) {
      newErrors.destination = 'Please select a destination.'
    } else if (!destinations.includes(data.destination)) {
      newErrors.destination = 'Please choose a destination from the list.'
    }

    // ---- Number of visitors ----
    const visitors = Number(data.visitors)
    if (data.visitors === '') {
      newErrors.visitors = 'Please enter the number of visitors.'
    } else if (!/^\d+$/.test(data.visitors)) {
      newErrors.visitors = 'Please enter a whole number, e.g. 2.'
    } else if (visitors < 1) {
      newErrors.visitors = 'There must be at least 1 visitor.'
    } else if (visitors > 50) {
      newErrors.visitors = 'For groups over 50, please contact us directly.'
    }

    // ---- Visit date ----
    if (!data.visitDate) {
      newErrors.visitDate = 'Please choose your preferred visit date.'
    } else if (data.visitDate < getDate()) {
      newErrors.visitDate = 'The visit date cannot be in the past.'
    } else if (data.visitDate > getDate(2)) {
      newErrors.visitDate = 'Please choose a date within the next 2 years.'
    }

    // ---- Message ----
    const message = data.message.trim()
    if (!message) {
      newErrors.message = 'Please tell us a little about your visit.'
    } else if (message.length < 10) {
      newErrors.message = 'Your message must be at least 10 characters.'
    } else if (!/\p{L}/u.test(message)) {
      newErrors.message = 'Your message must contain some words, not only numbers or symbols.'
    } else if (message.length > MESSAGE_LIMIT) {
      newErrors.message = `Your message must be ${MESSAGE_LIMIT} characters or fewer.`
    }

    return newErrors
  }

  // Update the form when the user types.
  // Characters that are not allowed are removed straight away.
  function handleChange(event) {
    const { name, value } = event.target
    let cleaned = value
    let liveError = ''

    if (name === 'fullName') {
      cleaned = value.replace(/[^\p{L}\s'.-]/gu, '')
      if (cleaned !== value) {
        liveError =
          'Names can only contain letters, spaces, hyphens and apostrophes.'
      }
    }

    if (name === 'phone') {
      cleaned = value.replace(/[^0-9+\s-]/g, '')
      if (cleaned !== value) {
        liveError = 'Phone numbers can only contain digits, spaces, + and -.'
      }
    }

    if (name === 'email') {
      cleaned = value.replace(/\s/g, '')
      if (cleaned !== value) {
        liveError = 'An email address cannot contain spaces.'
      }
    }

    setFormData({ ...formData, [name]: cleaned })
    setErrors({ ...errors, [name]: liveError })
    setConfirmation('')
  }

  // Stop symbols like e, +, - and . in the visitors box
  function handleVisitorsKeyDown(event) {
    if (['e', 'E', '+', '-', '.', ','].includes(event.key)) {
      event.preventDefault()
    }
  }

  // Check the field when the user leaves it
  function handleBlur(event) {
    const { name } = event.target
    const fieldError = validate(formData)[name]

    setErrors({ ...errors, [name]: fieldError || '' })
  }

  // Check the whole form and submit the enquiry
  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validate(formData)
    setErrors(newErrors)

    const errorFields = Object.keys(newErrors)

    if (errorFields.length > 0) {
      setConfirmation('')

      // Move the cursor to the first field that has a problem
      const firstField = document.getElementById(errorFields[0])
      if (firstField) {
        firstField.focus()
      }
      return
    }

    // Show a message after successful validation
    setConfirmation(
      `Thank you, ${formData.fullName.trim()}! Your enquiry has been received.`
    )

    // Clear the form after submission
    setFormData(emptyForm)
    setErrors({})
  }

  const hasErrors = Object.values(errors).some((message) => message)

  return (
    <section className="enquiry" id="contact">
      {/* Form heading */}
      <p className="section-label">PLAN YOUR VISIT</p>
      <h2>Send Us an Enquiry</h2>
      <p>Tell us about your planned visit to Lesotho.</p>

      {/* Enquiry form (noValidate lets our own messages show) */}
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          maxLength={60}
          autoComplete="name"
          placeholder="e.g. Thabo Mokoena"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.fullName ? 'input-error' : ''}
          aria-invalid={errors.fullName ? 'true' : 'false'}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p className="field-error" id="fullName-error" role="alert">
            {errors.fullName}
          </p>
        )}

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          maxLength={254}
          autoComplete="email"
          placeholder="e.g. name@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email ? 'input-error' : ''}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p className="field-error" id="email-error" role="alert">
            {errors.email}
          </p>
        )}

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          maxLength={20}
          inputMode="tel"
          autoComplete="tel"
          placeholder="e.g. +266 5812 3456"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.phone ? 'input-error' : ''}
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p className="field-error" id="phone-error" role="alert">
            {errors.phone}
          </p>
        )}

        <label htmlFor="destination">Destination</label>
        <select
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.destination ? 'input-error' : ''}
          aria-invalid={errors.destination ? 'true' : 'false'}
          aria-describedby={errors.destination ? 'destination-error' : undefined}
        >
          <option value="">Select a destination</option>
          {destinations.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>
        {errors.destination && (
          <p className="field-error" id="destination-error" role="alert">
            {errors.destination}
          </p>
        )}

        <label htmlFor="visitors">Number of Visitors</label>
        <input
          type="number"
          id="visitors"
          name="visitors"
          min="1"
          max="50"
          step="1"
          value={formData.visitors}
          onChange={handleChange}
          onKeyDown={handleVisitorsKeyDown}
          onBlur={handleBlur}
          className={errors.visitors ? 'input-error' : ''}
          aria-invalid={errors.visitors ? 'true' : 'false'}
          aria-describedby={errors.visitors ? 'visitors-error' : undefined}
        />
        {errors.visitors && (
          <p className="field-error" id="visitors-error" role="alert">
            {errors.visitors}
          </p>
        )}

        <label htmlFor="visitDate">Preferred Visit Date</label>
        <input
          type="date"
          id="visitDate"
          name="visitDate"
          min={getDate()}
          max={getDate(2)}
          value={formData.visitDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.visitDate ? 'input-error' : ''}
          aria-invalid={errors.visitDate ? 'true' : 'false'}
          aria-describedby={errors.visitDate ? 'visitDate-error' : undefined}
        />
        {errors.visitDate && (
          <p className="field-error" id="visitDate-error" role="alert">
            {errors.visitDate}
          </p>
        )}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          maxLength={MESSAGE_LIMIT}
          placeholder="Tell us about your trip, interests and any questions."
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.message ? 'input-error' : ''}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        ></textarea>
        <p className="char-counter">
          {formData.message.length} / {MESSAGE_LIMIT}
        </p>
        {errors.message && (
          <p className="field-error" id="message-error" role="alert">
            {errors.message}
          </p>
        )}

        <button type="submit">Send Enquiry</button>

        {/* Summary shown when something is wrong */}
        {hasErrors && (
          <p className="form-error-summary" role="alert">
            Please fix the highlighted fields and try again.
          </p>
        )}
      </form>

      {/* Success message */}
      {confirmation && (
        <p className="confirmation" role="status">
          {confirmation}
        </p>
      )}
    </section>
  )
}

export default EnquiryForm