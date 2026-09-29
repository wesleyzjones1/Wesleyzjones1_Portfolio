import { STATUS_LABELS } from '../../lib/projects'

export default function StatusBadge({ status }) {
  if (!status) return null
  return <span className={`badge badge--${status}`}>{STATUS_LABELS[status] || status}</span>
}
