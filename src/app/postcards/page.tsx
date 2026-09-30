export default function Postcards() {
  // Placeholder postcard collection
  const postcards = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `Postcard ${i + 1}`,
    year: 1950 + Math.floor(Math.random() * 74),
    origin: 'Various Locations',
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1814] to-[#201d19] px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#e8e4df] mb-4">
            Postcard Collection
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d4a574] to-[#8b7355] mx-auto mb-6"></div>
          <p className="text-[#b5ada5] text-lg max-w-2xl mx-auto">
            A curated collection of vintage and modern postcards from around the world.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {postcards.map((postcard) => (
            <div
              key={postcard.id}
              className="group perspective"
            >
              {/* Postcard Card */}
              <div className="bg-[#201d19] border-2 border-[#6b5d52] p-6 hover:border-[#d4a574] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                {/* Postcard Image Area */}
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#2a2620] to-[#1a1814] mb-4 flex items-center justify-center border border-[#6b5d52] group-hover:border-[#8b7355] transition-colors">
                  <div className="text-center">
                    <div className="text-5xl mb-2">🏤</div>
                    <p className="text-[#8b7355] text-sm">Postcard</p>
                  </div>
                </div>

                {/* Postcard Details */}
                <div className="border-t border-[#6b5d52] pt-4">
                  <h3 className="text-[#d4a574] font-semibold text-lg mb-2">
                    {postcard.title}
                  </h3>
                  <p className="text-[#b5ada5] text-sm mb-1">{postcard.origin}</p>
                  <p className="text-[#8b7355] text-xs">Circa {postcard.year}s</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collection Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <section className="bg-[#201d19] border border-[#6b5d52] p-8">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">
              Why Postcards?
            </h2>
            <p className="text-[#e8e4df] leading-relaxed mb-4">
              Postcards are time capsules. They capture snapshots of places, cultures, and
              moments in history. Each one tells a story about travel, connection, and the
              way people once shared experiences across distances.
            </p>
            <p className="text-[#b5ada5]">
              I collect them for their visual beauty, historical significance, and the
              connections they represent between people and places.
            </p>
          </section>

          <section className="bg-[#201d19] border border-[#6b5d52] p-8">
            <h2 className="text-2xl font-semibold text-[#d4a574] mb-4">
              Collection Stats
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[#d4a574] font-semibold">Total Postcards</p>
                <p className="text-2xl text-[#e8e4df]">150+</p>
              </div>
              <div>
                <p className="text-[#d4a574] font-semibold">Date Range</p>
                <p className="text-[#e8e4df]">1920s - 2020s</p>
              </div>
              <div>
                <p className="text-[#d4a574] font-semibold">Origin Countries</p>
                <p className="text-[#e8e4df]">35+ countries</p>
              </div>
            </div>
          </section>
        </div>

        {/* Featured Section */}
        <section className="mt-16 bg-[#201d19] border border-[#6b5d52] p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#d4a574] mb-6">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Vintage European', desc: 'Early 20th century postcards from Europe' },
              { name: 'Modern Travel', desc: 'Contemporary postcards from recent travels' },
              { name: 'Architectural', desc: 'Famous buildings and landmarks' },
              { name: 'Cultural', desc: 'Postcards celebrating diverse cultures' },
            ].map((collection, idx) => (
              <div
                key={idx}
                className="border border-[#6b5d52] p-4 hover:border-[#d4a574] transition-colors"
              >
                <h3 className="text-[#d4a574] font-semibold mb-2">{collection.name}</h3>
                <p className="text-[#b5ada5] text-sm">{collection.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
