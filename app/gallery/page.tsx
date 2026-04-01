import { readdir } from 'fs/promises'
import path from 'path'
import dynamic from 'next/dynamic'

const GalleryCanvas = dynamic(() => import('./GalleryCanvas'), { ssr: false })

export default async function GalleryPage() {
  let images: string[] = []

  try {
    const imgsDir = path.join(process.cwd(), 'public', 'imgs')
    const files = await readdir(imgsDir)
    images = files
      .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .sort((a, b) => {
        const numA = parseInt(a)
        const numB = parseInt(b)
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB
        return a.localeCompare(b)
      })
      .map((f) => `/imgs/${f}`)
  } catch {
    // imgs directory not found — canvas will render without images
  }

  return <GalleryCanvas images={images} />
}
