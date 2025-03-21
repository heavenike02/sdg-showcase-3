import { SectionHeading } from './SectionHeading'

export function AboutSection() {
  return (
    <section className="pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Organization" subtitle="About Us" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg">
              TC3 has four Working Groups and one Task Force.
            </p>
            
            <h3 className="text-xl font-medium">Working Groups/Special Interest Groups:</h3>
            <ul className="space-y-4">
              <li className="border-l-2 border-primary/80 pl-4 py-1">
                <p className="font-medium">WG 3.1</p>
                <p>Informatics and Digital Technologies in School Education</p>
              </li>
              <li className="border-l-2 border-primary/80 pl-4 py-1">
                <p className="font-medium">WG 3.3</p>
                <p>Research into Educational Applications of Information Technologies</p>
              </li>
              <li className="border-l-2 border-primary/80 pl-4 py-1">
                <p className="font-medium">WG 3.4</p>
                <p>Professional, Higher and Vocational Education in ICT</p>
              </li>
              <li className="border-l-2 border-primary/80 pl-4 py-1">
                <p className="font-medium">WG 3.7</p>
                <p>Information Technology in Educational Management</p>
              </li>
            </ul>
            <p className="mt-6">
              In the Working Groups, professionals and researchers work together to examine current issues, 
              organise meetings, collaborate on research, develop publications etc.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="py-8 px-6 border-l-4 border-primary/80 bg-primary/5 rounded mt-12">
              <blockquote className="text-lg italic font-medium">
                IFIP is a federation of computer societies, so it brings together many people, from different areas 
                of work and with different perspectives – people in industry and in commerce, developers, 
                researchers, practitioners and policy makers.
                
                One of the wonderful things about IFIP is that it allows 
                you to gain from that mix of people coming together. 
              </blockquote>
              <div className="mt-4 font-medium">
                Professor Don Passey, Chair of TC3.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 