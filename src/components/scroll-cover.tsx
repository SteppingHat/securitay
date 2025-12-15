import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { Kbd } from "./kbd"

export const ScrollCover = () => {
  const [isVisible, setVisible] = useState(false)
  const [isHovered, setHovered] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleMouseMove = () => {
      setVisible(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      if (isHovered) {
        timeoutRef.current = setTimeout(() => {
          setVisible(false)
        }, 2000)
      }
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isHovered])

  const handleMouseEnter = () => {
    setHovered(true)
    setVisible(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setVisible(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return <>
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
      className={`h-full w-full absolute top-0 left-0 select-none transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className={"absolute top-0 right-0 p-4 font-medium text-shadow-sm/30"}>
                Double click or press <Kbd>F</Kbd> for full-screen
      </div>
      <div className={"absolute bottom-0 left-0 w-full h-64 bg-linear-to-t from-gray-950 to-transparent"}>
        <div className={"w-full h-full  flex items-end justify-center p-4 text-center"}>
          <div className={"flex flex-col items-center animate-bounce"}>
            <div className={"p-4 text-3xl font-medium"}>Scroll down</div>
            <FontAwesomeIcon icon={faArrowDown} size={"2x"} className={"ml-2"} />
          </div>
        </div>
      </div>
    </div>
  </>
}