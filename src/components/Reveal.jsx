import { createElement } from 'react'
import { useInView } from '../hooks/useInView'

/** Fades and lifts its content into place the first time it is seen. `delay` staggers siblings. */
export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return createElement(
    as,
    { ref, className: `reveal ${inView ? 'is-in' : ''} ${className}`, style: { '--d': `${delay}ms` }, ...rest },
    children,
  )
}
