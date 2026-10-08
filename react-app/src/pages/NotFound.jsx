import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import { ArrowLeft } from '../components/ui/Icons'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="notfound">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1 className="display h1">That page does not exist.</h1>
        <p className="lead">The link may be old, or the project may have been renamed.</p>
        <Link to="/" className="btn btn--primary"><ArrowLeft size={15} /> Back home</Link>
      </div>
    </section>
  )
}
