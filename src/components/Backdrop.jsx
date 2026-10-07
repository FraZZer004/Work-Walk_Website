/** The page's background: three slow orange lights, a faint grid at the top and film grain. */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <i className="light-a" />
      <i className="light-b" />
      <i className="light-c" />
      <div className="grid-lines" />
      <div className="grain" />
    </div>
  )
}
