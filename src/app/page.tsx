import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import SearchBar from '@/components/home/SearchBar'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import HowItWorks from '@/components/home/HowItWorks'
import UserTypesSection from '@/components/home/UserTypesSection'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-navy overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <SearchBar />
      <FeaturedProperties />
      <HowItWorks />
      <UserTypesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
