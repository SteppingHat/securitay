import "./App.css"
import { useEffect, useState } from "react"
import imageList from "./image-list.json"
import { LockCombination } from "./components/lock-combination"
import { ScrollCover } from "./components/scroll-cover"
import { bumpHitCount } from "./scripts/counter"

function App() {
  const [randomImage, setRandomImage] = useState<string|undefined>(undefined)
  const count = bumpHitCount()

  useEffect(() => {
    const imagePaths = imageList.filter((path) => {
      return /\.(jpg|jpeg|png|gif|webp|svg)$/.test(path)
    })

    if (imagePaths.length > 0) {
      const randomIndex = Math.floor(Math.random() * imagePaths.length)
      setRandomImage(`./assets/${imagePaths[randomIndex]}`)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return
      if (e.key.toLowerCase() === "f") toggleFullScreen()
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])


  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error("Error attempting to enable full-screen mode:", e)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return <>
    <div onDoubleClick={toggleFullScreen}>
      <div className={"w-full h-screen overflow-hidden relative select-text"}>
        <img src={randomImage} className={"inset-0 -z-10 size-full object-cover pointer-events-none"} />
        <ScrollCover />
      </div>
      <div className={"bg-gray-50 dark:bg-gray-900 text-gray-950 dark:text-white text-center space-y-4 py-8"}>
        <h1 className={"text-5xl font-bold text-shadow-sm"}>You've been securitay-ed!</h1>
        <div className={"text-lg"}>Don't forget to lock your machine before leaving it unattended</div>
        <div>You can quickly do this by pressing <LockCombination /></div>
        <div className={"text-sm text-gray-600 dark:text-gray-400"}>You've been hit {count} time{count !== 1 ? "s" : ""}</div>
      </div>
    </div>
  </>
}

export default App
