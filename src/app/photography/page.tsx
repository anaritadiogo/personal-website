export default function Photography() {
  // Placeholder gallery items
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Travel Moment ${i + 1}`,
    location: 'Destination',
    description: 'A beautiful moment captured during my travels around the world.',
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1814] to-[#201d19] px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#e8e4df] mb-4">
            Photography
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d4a574] to-[#8b7355] mx-auto mb-6"></div>
          <p className="text-[#b5ada5] text-lg max-w-2xl mx-auto">
            Travel stories and moments captured through my lens. Exploring the world, one photograph at a time.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-[#201d19] border border-[#6b5d52] overflow-hidden aspect-square hover:border-[#d4a574] transition-all duration-300"
            >
              {/* Placeholder Image */}
              <div className="w-full h-full bg-gradient-to-br from-[#2a2620] to-[#1a1814] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">📸</div>
                  <p className="text-[#8b7355] text-sm">Image {photo.id}</p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                <h3 className="text-[#d4a574] font-semibold text-lg mb-2">
                  {photo.title}
                </h3>
                <p className="text-[#b5ada5] text-sm mb-3">{photo.location}</p>
                <p className="text-[#e8e4df] text-xs leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <section className="bg-[#201d19] border border-[#6b5d52] p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">
            About These Photos
          </h2>
          <p className="text-[#e8e4df] leading-relaxed mb-4">
            This collection represents my travel adventures and the moments that moved me.
            Each photograph tells a story about the places I&apos;ve visited and the people
            I&apos;ve met.
          </p>
          <p className="text-[#b5ada5]">
            Coming soon: High-resolution images, location details, and behind-the-scenes stories
            for each photograph.
          </p>
        </section>
      </div>
    </div>
  );
}
