import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import NorthernLights, { AURORA_DEFAULTS } from './animations/NorthernLights'

const EMAILJS_SERVICE_ID  = 'service_yiapkfw'
const EMAILJS_TEMPLATE_ID = 'template_usoo54o'
const EMAILJS_PUBLIC_KEY  = 'SFHWNCxgc98cNrGgU'

const MAX_EMAILS_PER_DAY = 5
const STORAGE_KEY = 'contact_send_log'

function getDailyCount() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 0
    const { date, count } = JSON.parse(raw)
    return date === new Date().toISOString().slice(0, 10) ? count : 0
  } catch {
    return 0
  }
}

function incrementDailyCount() {
  const count = getDailyCount() + 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    date: new Date().toISOString().slice(0, 10),
    count,
  }))
}

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error | limited

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (getDailyCount() >= MAX_EMAILS_PER_DAY) {
      setStatus('limited')
      return
    }

    const data = new FormData(formRef.current)
    const name = data.get('from_name').trim()
    const email = data.get('from_email').trim()
    const subject = data.get('subject').trim()

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          reply_to: email,
          sender_label: name ? `${name} <${email}>` : email,
          subject,
          formatted_subject: name
            ? `${name}${subject ? `: ${subject}` : ''}`
            : subject || 'Portfolio contact form message',
          message: data.get('message'),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      incrementDailyCount()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    formRef.current?.reset()
  }

  const isLimited = status === 'limited' || getDailyCount() >= MAX_EMAILS_PER_DAY

  return (
    <div className="contact-page">
      <NorthernLights {...AURORA_DEFAULTS} />

      <section className="contact-header">
        <div className="contact-header-icon"><MailIcon /></div>
        <div className="contact-header-text">
          <h1>Get in Touch</h1>
          <p>Have a question or want to work together? Send me a message and I&apos;ll get back to you as soon as possible.</p>
        </div>
      </section>

      <div className="contact-form-card">
        {status === 'success' ? (
          <div className="contact-success-card">
            <div className="contact-success-icon"><CheckIcon /></div>
            <h2>Message Sent!</h2>
            <p>Thanks for reaching out. I&apos;ll get back to you at the email you provided.</p>
            <button className="contact-success-back" onClick={handleReset}>Send another message</button>
          </div>
        ) : isLimited ? (
          <div className="contact-error-banner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><AlertIcon /> Daily limit reached</span>
            <span style={{ fontSize: 12, opacity: 0.85 }}>
              This form allows up to {MAX_EMAILS_PER_DAY} messages per day. Try again tomorrow.
            </span>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="contact-row">
              <div className="contact-field">
                <label className="contact-label" htmlFor="from_name">Name</label>
                <input id="from_name" name="from_name" type="text" className="contact-input" placeholder="Your name" required />
              </div>
              <div className="contact-field">
                <label className="contact-label" htmlFor="from_email">Email</label>
                <input id="from_email" name="from_email" type="email" className="contact-input" placeholder="your@email.com" required />
                <p className="contact-field-note">Replies should go to this address.</p>
              </div>
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" className="contact-input" placeholder="What's this about?" required />
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="message">Message</label>
              <textarea id="message" name="message" className="contact-textarea" placeholder="Tell me more..." required />
            </div>

            {status === 'error' && (
              <div className="contact-error-banner">
                <AlertIcon /> Something went wrong. Please try again.
              </div>
            )}

            <button type="submit" className="contact-submit" disabled={status === 'sending'}>
              <SendIcon />
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
