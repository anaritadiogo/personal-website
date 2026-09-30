export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1814] to-[#201d19] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#e8e4df] mb-4">
            About Me
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d4a574] to-[#8b7355] mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Biography Section */}
          <section className="bg-[#201d19] border border-[#6b5d52] p-8">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">
              My Journey
            </h2>
            <p className="text-[#e8e4df] leading-relaxed mb-4">
              Hello! I&apos;m Ana Rita Diogo, a creative explorer passionate about capturing
              moments, building software, and collecting memories. My background blends design,
              technology, and storytelling.
            </p>
            <p className="text-[#e8e4df] leading-relaxed mb-4">
              I believe that the best work happens at the intersection of creativity and
              technical skill. Whether I&apos;m behind the camera, writing code, or curating
              my postcard collection, I&apos;m always seeking to connect ideas in meaningful ways.
            </p>
            <p className="text-[#e8e4df] leading-relaxed">
              This space is a reflection of my interests and experiences. I invite you to
              explore my photography, software projects, postcard treasures, and the stories
              behind them.
            </p>
          </section>

          {/* Interests */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#201d19] border border-[#6b5d52] p-8">
              <h3 className="text-xl font-semibold text-[#d4a574] mb-4">Photography</h3>
              <p className="text-[#b5ada5] leading-relaxed">
                Travel photography that captures the essence of places, cultures, and unexpected
                moments. I love exploring new destinations and documenting the beauty I find.
              </p>
            </div>

            <div className="bg-[#201d19] border border-[#6b5d52] p-8">
              <h3 className="text-xl font-semibold text-[#d4a574] mb-4">Software Development</h3>
              <p className="text-[#b5ada5] leading-relaxed">
                Building thoughtful digital solutions that combine functionality with beautiful
                user experiences. I specialize in web development and creative coding.
              </p>
            </div>

            <div className="bg-[#201d19] border border-[#6b5d52] p-8">
              <h3 className="text-xl font-semibold text-[#d4a574] mb-4">Postcard Collection</h3>
              <p className="text-[#b5ada5] leading-relaxed">
                A passion for collecting vintage and modern postcards from around the world.
                Each card tells a story about travel, art, and cultural moments.
              </p>
            </div>

            <div className="bg-[#201d19] border border-[#6b5d52] p-8">
              <h3 className="text-xl font-semibold text-[#d4a574] mb-4">Storytelling</h3>
              <p className="text-[#b5ada5] leading-relaxed">
                I believe every photograph, project, and postcard has a story to tell. I love
                weaving narratives through my work.
              </p>
            </div>
          </section>

          {/* Skills */}
          <section className="bg-[#201d19] border border-[#6b5d52] p-8">
            <h3 className="text-2xl font-semibold text-[#d4a574] mb-6">Skills & Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { category: 'Languages', skills: 'TypeScript, JavaScript, Python' },
                { category: 'Frontend', skills: 'React, Next.js, Tailwind CSS' },
                { category: 'Photography', skills: 'Composition, Editing, Travel' },
                { category: 'Design', skills: 'UI/UX, Visual Design, Aesthetics' },
                { category: 'Tools', skills: 'Git, VS Code, Adobe Suite' },
                { category: 'Other', skills: 'Curating, Collecting, Storytelling' },
              ].map((item, idx) => (
                <div key={idx}>
                  <h4 className="text-[#d4a574] font-semibold mb-2 text-sm uppercase tracking-wide">
                    {item.category}
                  </h4>
                  <p className="text-[#b5ada5] text-sm leading-relaxed">
                    {item.skills}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
