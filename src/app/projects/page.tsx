import Link from 'next/link';

export default function Projects() {
  // Placeholder projects
  const projects = [
    {
      id: 1,
      title: 'Personal Website',
      description: 'A creative portfolio website showcasing photography, projects, and collections.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      link: '#',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Photo Gallery App',
      description: 'A web application for organizing and sharing travel photographs with metadata.',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Postcard Database',
      description: 'A cataloging system for managing a large collection of vintage postcards.',
      tags: ['Django', 'PostgreSQL', 'Python'],
      link: '#',
      status: 'Completed',
    },
    {
      id: 4,
      title: 'Travel Blog Engine',
      description: 'A custom CMS for publishing travel stories with integrated photo galleries.',
      tags: ['Next.js', 'Markdown', 'TypeScript'],
      link: '#',
      status: 'In Progress',
    },
    {
      id: 5,
      title: 'Creative Coding Experiments',
      description: 'A collection of interactive visualizations and generative art pieces.',
      tags: ['p5.js', 'Three.js', 'JavaScript'],
      link: '#',
      status: 'Ongoing',
    },
    {
      id: 6,
      title: 'Color Palette Generator',
      description: 'A tool that generates earthy color palettes inspired by travel photography.',
      tags: ['React', 'Canvas', 'TypeScript'],
      link: '#',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1814] to-[#201d19] px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#e8e4df] mb-4">
            Projects
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d4a574] to-[#8b7355] mx-auto mb-6"></div>
          <p className="text-[#b5ada5] text-lg max-w-2xl mx-auto">
            A collection of software projects, creative coding experiments, and tools I&apos;ve built.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#201d19] border border-[#6b5d52] p-8 hover:border-[#d4a574] transition-all duration-300 group hover:shadow-2xl"
            >
              {/* Status Badge */}
              <div className="inline-block mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${
                    project.status === 'Completed'
                      ? 'bg-[#6b5d52] text-[#d4a574]'
                      : 'bg-[#d4a574] text-[#1a1814]'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Project Title */}
              <h3 className="text-2xl font-semibold text-[#e8e4df] mb-3 group-hover:text-[#d4a574] transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[#b5ada5] leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#2a2620] text-[#d4a574] px-3 py-1 border border-[#6b5d52] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <Link
                href={project.link}
                className="inline-block text-[#d4a574] font-semibold hover:text-[#e8c8a0] transition-colors text-sm uppercase tracking-wide"
              >
                View Project →
              </Link>
            </div>
          ))}
        </div>

        {/* Expertise Section */}
        <section className="bg-[#201d19] border border-[#6b5d52] p-8 max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-[#d4a574] mb-8">
            Technical Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#d4a574] font-semibold mb-4 uppercase text-sm tracking-wide">
                Frontend
              </h3>
              <ul className="space-y-2 text-[#b5ada5]">
                <li>• React & Next.js</li>
                <li>• TypeScript & JavaScript</li>
                <li>• Tailwind CSS & Custom Styling</li>
                <li>• Responsive Design</li>
                <li>• Performance Optimization</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#d4a574] font-semibold mb-4 uppercase text-sm tracking-wide">
                Backend & Tools
              </h3>
              <ul className="space-y-2 text-[#b5ada5]">
                <li>• Node.js & Python</li>
                <li>• MongoDB & PostgreSQL</li>
                <li>• API Design & REST</li>
                <li>• Git & Version Control</li>
                <li>• Deployment & DevOps</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#8b7355] text-sm mb-6 uppercase tracking-widest">
            Interested in working together?
          </p>
          <Link
            href="mailto:hello@example.com"
            className="inline-block px-8 py-3 bg-[#d4a574] text-[#1a1814] font-semibold hover:bg-[#e8c8a0] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
