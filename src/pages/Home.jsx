import Showcase from '../sections/Showcase'
import Details from '../sections/Details'
import Devices from '../sections/Devices'
import Pro from '../sections/Pro'
import PrivacyStrip from '../sections/PrivacyStrip'
import HomeFaq from '../sections/HomeFaq'
import FinalCTA from '../sections/FinalCTA'

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Showcase />
      <Details />
      <Devices />
      <Pro />
      <PrivacyStrip />
      <HomeFaq />
      <FinalCTA />
    </main>
  )
}
