import { SectionHeading } from './SectionHeading'
import Image from 'next/image'

interface CommitteeMember {
  name: string
  role: string
  image: string
}

const committeeMembers: CommitteeMember[] = [
  {
    name: 'Prof. Don Passey',
    role: 'CHAIR',
    image: '/donpassy.jpg'
  },
  {
    name: 'Prof. Rosa Bottino',
    role: 'VICE-CHAIR',
    image: '/rosa.jpg'
  },
  {
    name: 'Mrs. Sharon Singh',
    role: 'SECRETARY',
    image: '/sharon.jpg'
  },
  {
    name: 'Dr. Christoph Reffay',
    role: 'WG-Liaison',
    image: '/christoph.jpg'
  },
  {
    name: 'Dr. Mary Webb',
    role: 'WEBSITE-Liaison',
    image: '/mary.jpg'
  }
]

export function CommitteeSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Meet our Executive Committee" 
          subtitle="Executive Committee"
          center
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {committeeMembers.map((member) => (
            <MemberCard 
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface MemberCardProps {
  name: string
  role: string
  image: string
}

function MemberCard({ name, role, image }: MemberCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
        <Image 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          width={128}
          height={128}
        />
      </div>
      <h3 className="text-xl mb-1 text-center">{name}</h3>
      <p className="text-muted-foreground text-center">{role}</p>
    </div>
  )
} 