import Image from "next/image";


export const TestimonialQuote = () => {
  return (
    <section className="py-20 bg-white">
      <div className="page-container">
        <div className="flex flex-col space-y-3 mb-8">
          <div className="flex items-center">
            <span className="dot-indicator"></span>
            <span className="text-sm font-medium text-foreground">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl">What our community says</h2>
        </div>
        
        <div className="card max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <Image 
                src="/don.jpg" 
                alt="Professor Don Passey"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <blockquote className="text-muted-foreground leading-relaxed">
                &ldquo;IFIP is a federation of computer societies, so it brings together many people, from different areas 
                of work and with different perspectives – people in industry and in commerce, developers, 
                researchers, practitioners and policy makers. One of the wonderful things about IFIP is that it allows 
                you to gain from that mix of people coming together. For me, the form of networking that comes from our 
                community, the opportunities to become involved with people from those different backgrounds, is of 
                enormous value. That for me has been the real value of IFIP and TC3. I have undoubtedly gained from the 
                enormous width of experiences offered, from the friendliness and collegiality of colleagues. I hope you 
                will also come enjoy the width and value of their experience and expertise, and take full advantage 
                of it, as I have done over the past years.&rdquo;
              </blockquote>
              
              <footer className="font-medium text-foreground">
                Professor Don Passey, Chair of TC3
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
