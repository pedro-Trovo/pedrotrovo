import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useLanguage } from '../i18n'
import { useMouseGlow } from '../hooks/useMouseGlow'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'contact.error_name'
  if (!values.email.trim()) errors.email = 'contact.error_email_required'
  else if (!EMAIL_RE.test(values.email)) errors.email = 'contact.error_email_invalid'
  if (!values.subject.trim()) errors.subject = 'contact.error_subject'
  if (!values.message.trim()) errors.message = 'contact.error_message'
  return errors
}

function Contato() {
  const { t } = useLanguage()
  const submitRef = useMouseGlow()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')

  const errors = validate(form)
  const hasErrors = Object.keys(errors).length > 0

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    if (hasErrors) return

    setStatus('loading')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="page contact-page">
      <Helmet>
        <title>{t('contact.title')} | Pedro Trovo</title>
        <meta name="description" content={t('contact.subtitle')} />
      </Helmet>

      <motion.h1 className="heading-gradient" variants={fadeUp} initial="initial" animate="animate">{t('contact.title')}</motion.h1>
      <motion.p className="contact-subtitle text-muted" variants={fadeUp} initial="initial" animate="animate">
        {t('contact.subtitle')}
      </motion.p>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        variants={fadeUp}
        initial="initial"
        animate="animate"
      >
        <div className="form-row">
          <div className={`form-group${touched.name && errors.name ? ' has-error' : ''}`}>
            <label htmlFor="name">{t('contact.name')}</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === 'loading'}
            />
            {touched.name && errors.name && (
              <span className="field-error">{t(errors.name)}</span>
            )}
          </div>
          <div className={`form-group${touched.email && errors.email ? ' has-error' : ''}`}>
            <label htmlFor="email">{t('contact.email')}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === 'loading'}
            />
            {touched.email && errors.email && (
              <span className="field-error">{t(errors.email)}</span>
            )}
          </div>
        </div>
        <div className={`form-group${touched.subject && errors.subject ? ' has-error' : ''}`}>
          <label htmlFor="subject">{t('contact.subject')}</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={form.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={status === 'loading'}
          />
          {touched.subject && errors.subject && (
            <span className="field-error">{t(errors.subject)}</span>
          )}
        </div>
        <div className={`form-group${touched.message && errors.message ? ' has-error' : ''}`}>
          <label htmlFor="message">{t('contact.message')}</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={status === 'loading'}
          />
          {touched.message && errors.message && (
            <span className="field-error">{t(errors.message)}</span>
          )}
        </div>

        <button
          ref={submitRef}
          type="submit"
          className="btn btn-primary btn-submit btn-glow"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <span className="spinner" />
          ) : (
            <FontAwesomeIcon icon={faEnvelope} />
          )}
          {status === 'loading' ? t('contact.sending') : t('contact.send')}
        </button>

        {status === 'success' && (
          <motion.p
            className="form-feedback form-feedback--success form-feedback-enter"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FontAwesomeIcon icon={faCheckCircle} /> {t('contact.success')}
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            className="form-feedback form-feedback--error form-feedback-enter"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FontAwesomeIcon icon={faExclamationCircle} /> {t('contact.error')}
          </motion.p>
        )}
      </motion.form>

      <motion.div
        className="contact-direct"
        variants={fadeUp}
        initial="initial"
        animate="animate"
      >
        <div className="footer-social">
          <a href="https://github.com/pedro-Trovo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/pedro-trovo-link/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:pedroramostrovo@gmail.com" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Contato
