import { mkdir, readFile, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const projectRoot = process.cwd()
const cataloguePath = path.join(projectRoot, "src/data/postcards.json")
const originalsDirectory = path.join(projectRoot, "assets/postcards-originals")
const outputDirectory = path.join(projectRoot, "public/postcards")
const catalogue = JSON.parse(await readFile(cataloguePath, "utf8"))

await mkdir(outputDirectory, { recursive: true })

const imageEntries = catalogue
  .filter((postcard) => postcard.image)
  .map((postcard) => {
    const imageName = path.basename(postcard.image)
    const basename = path.parse(imageName).name

    return {
      postcard,
      input: path.join(originalsDirectory, `${basename}.png`),
      output: path.join(outputDirectory, `${basename}.webp`),
      publicPath: `/postcards/${basename}.webp`,
    }
  })

if (imageEntries.length === 0) {
  throw new Error("No postcard images are referenced in the catalogue.")
}

let originalBytes = 0
let optimizedBytes = 0

for (const { postcard, input, output, publicPath } of imageEntries) {
  const inputStats = await stat(input)
  const result = await sharp(input)
    .trim()
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 86, alphaQuality: 100, effort: 6 })
    .toFile(output)

  postcard.image = publicPath
  originalBytes += inputStats.size
  optimizedBytes += result.size
}

await writeFile(cataloguePath, `${JSON.stringify(catalogue, null, 2)}\n`)
const savings = originalBytes === 0 ? 0 : 1 - optimizedBytes / originalBytes

console.log(
  `Optimized ${imageEntries.length} postcards: `
  + `${(originalBytes / 1024 / 1024).toFixed(1)} MiB originals -> `
  + `${(optimizedBytes / 1024 / 1024).toFixed(1)} MiB WebP `
  + `(${(savings * 100).toFixed(1)}% smaller).`,
)
