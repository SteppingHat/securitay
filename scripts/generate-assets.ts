import fs from "fs"
import path from "path"

const ASSETS_DIR = path.join(__dirname, "../public/assets")
const OUTPUT_FILE = path.join(__dirname, "../src/image-list.json")

const getAllFiles = (dir: string, baseDir: string = dir): string[] => {
  const files: string[] = []

  if (!fs.existsSync(dir)) {
    console.warn(`Directory ${dir} does not exist.`)
    return files
  }

  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const item of items) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir))
    } else if (item.isFile()) {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/")
      files.push(relativePath.replace(/\//g, "/"))
    } else {
      throw new Error(`Unsupported file system item: ${fullPath}`)
    }
  }

  return files
}

const generateImageList = () => {
  console.log("Scanning assets directory:", ASSETS_DIR)
  const imageList = getAllFiles(ASSETS_DIR)

  imageList.sort()

  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(imageList, null, 2))
  console.log(`✓ Generated asset list with ${imageList.length} files`)
  console.log(`✓ Output: ${OUTPUT_FILE}`)
}

try {
  generateImageList()
} catch (error) {
  console.error("Error generating asset list:", error)
  process.exit(1)
}