import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { profile } from '../content/profile'
import { usePageTitle } from '../hooks/usePageTitle'
import { Alert, Check, GitHub, LinkedIn, Mail, MapPin, Send } from '../components/ui/Icons'

/* EmailJS public identifiers (safe to ship; the public key only allows sending
   through this template, and the form is rate-limited below). */
const EMAILJS_SERVICE_ID = 'service_yiapkfw'
const EMAILJS_TEMPLATE_ID = 'template_usoo54o'
const EMAILJS_PUBLIC_KEY = 'SFHWNCxgc98cNrGgU'

const MAX_EMAILS_PER_DAY = 5
const STORAGE_KEY = 'contact_send_log'

function getDailyCount() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 0
    const { date, count } = JSON.parse(raw)
    return date === new Date().toISOString().slice(0, 10) ? count : 0
  } catch { return 0 }
}

function incrementDailyCount() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: new Date().toISOString().slice(0, 10), count: getDailyCount() + 1 }))
  } catch { /* ignore */ }
}

export default function Contact() {
  usePageTitle('Contact')
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error | limited

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (getDailyCount() >= MAX_EMAILS_PER_DAY) { setStatus('limited'); return }
    const data = new FormData(formRef.current)
    const name = String(data.get('from_name') || '').trim()
    const email = String(data.get('from_email') || '').trim()
    const subject = String(data.get('subject') || '').trim()

    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        reply_to: email,
        sender_label: name ? `${name} <${email}>` : email,
        subject,
        formatted_subject: name ? `${name}${subject ? `: ${subject}` : ''}` : subject || 'Portfolio contact form message',
        message: data.get('message'),
      }, { publicKey: EMAILJS_PUBLIC_KEY })
      incrementDailyCount()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const isLimited = status === 'limited' || getDailyCount() >= MAX_EMAILS_PER_DAY

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1 className="display h1">Let&apos;s talk.</h1>
          <p className="lead">Recruiting, a role you think I would fit, or a technical problem you want a second opinion on. I read everything and reply within a couple of days.</p>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container contact">
          <div>
            <div className="contact__list">
              <a href={`mailto:${profile.email}`}><span className="ico"><Mail /></span><span><b>Email</b><span>{profile.email}</span></span></a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"><span className="ico"><LinkedIn /></span><span><b>LinkedIn</b><span>{profile.links.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span></span></a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer"><span className="ico"><GitHub /></span><span><b>GitHub</b><span>{profile.links.github.replace(/^https?:\/\/(www\.)?/, '')}</span></span></a>
              <a href={`https://www.google.com/maps/place/${encodeURIComponent(profile.location)}`} target="_blank" rel="noopener noreferrer"><span className="ico"><MapPin /></span><span><b>Based in</b><span>{profile.location} · open to remote and relocation</span></span></a>
            </div>
          </div>

          <div className="card form">
            {status === 'success' ? (
              <div className="form__success">
                <span className="ico"><Check size={24} /></span>
                <h2 className="h3 display">Message sent</h2>
                <p className="muted">Thanks for reaching out. I will reply to the address you provided.</p>
                <button type="button" className="btn btn--sm" onClick={() => { setStatus('idle'); formRef.current?.reset() }}>Send another</button>
              </div>
            ) : isLimited ? (
              <div className="form__note form__note--info"><Alert /> This form allows {MAX_EMAILS_PER_DAY} messages per day. Please email me directly instead.</div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate={false} style={{ display: 'contents' }}>
                <div className="form__row">
                  <div className="field"><label htmlFor="from_name">Name</label><input id="from_name" name="from_name" type="text" autoComplete="name" required /></div>
                  <div className="field"><label htmlFor="from_email">Email</label><input id="from_email" name="from_email" type="email" autoComplete="email" required /><small>I reply to this address.</small></div>
                </div>
                <div className="field"><label htmlFor="subject">Subject</label><input id="subject" name="subject" type="text" required /></div>
                <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" required /></div>
                {status === 'error' && <div className="form__note form__note--error"><Alert /> Something went wrong. Please try again or email me directly.</div>}
                <div><button type="submit" className="btn btn--primary" disabled={status === 'sending'}><Send size={15} /> {status === 'sending' ? 'Sending…' : 'Send message'}</button></div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
