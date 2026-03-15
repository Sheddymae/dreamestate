import { PrismaClient, UserRole, PropertyType, ListingType, PropertyStatus } from '@prisma/client'

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL })

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dreamestate.co.ke' },
    update: {},
    create: {
      clerkId: 'seed_admin_001',
      email: 'admin@dreamestate.co.ke',
      fullName: 'DreamEstate Admin',
      role: UserRole.ADMIN,
      isVerified: true,
    },
  })

  // Create seller user
  const seller = await prisma.user.upsert({
    where: { email: 'seller@dreamestate.co.ke' },
    update: {},
    create: {
      clerkId: 'seed_seller_001',
      email: 'seller@dreamestate.co.ke',
      fullName: 'John Kamau',
      role: UserRole.SELLER,
      isVerified: true,
      phone: '+254712345678',
    },
  })

  // Create sample properties
  const properties = [
    {
      title: 'Stunning 5-Bedroom Villa with Pool — Runda',
      description: 'A magnificent villa nestled in the serene Runda estate. Features an infinity pool, mature gardens, and panoramic views.',
      type: PropertyType.VILLA,
      listingType: ListingType.SALE,
      status: PropertyStatus.ACTIVE,
      price: 85000000,
      address: 'Runda Close',
      city: 'Nairobi',
      neighbourhood: 'Runda',
      lat: -1.2120,
      lng: 36.8097,
      bedrooms: 5,
      bathrooms: 5,
      sqMeters: 680,
      yearBuilt: 2019,
      furnished: true,
      petFriendly: true,
      amenities: ['Swimming Pool', 'Gym', 'Security', 'Garden', 'Smart Home'],
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
      ownerId: seller.id,
    },
    {
      title: 'Modern 3-Bedroom Apartment — Westlands',
      description: 'Sleek apartment on the 14th floor with breathtaking city views. Premium finishes, open-plan kitchen, private balcony.',
      type: PropertyType.APARTMENT,
      listingType: ListingType.RENT,
      status: PropertyStatus.ACTIVE,
      price: 120000,
      address: 'Westlands Road',
      city: 'Nairobi',
      neighbourhood: 'Westlands',
      lat: -1.2676,
      lng: 36.8082,
      bedrooms: 3,
      bathrooms: 2,
      sqMeters: 185,
      yearBuilt: 2021,
      furnished: true,
      petFriendly: false,
      amenities: ['Gym', 'Security', 'Balcony', 'Air Conditioning'],
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      ownerId: seller.id,
    },
  ]

  for (const property of properties) {
    await prisma.property.create({ data: property })
  }

  console.log('✅ Seeding complete!')
  console.log(`   Admin: ${admin.email}`)
  console.log(`   Seller: ${seller.email}`)
  console.log(`   Properties: ${properties.length} created`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())

