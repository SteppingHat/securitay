import type { FC } from "react"
import { Kbd } from "./kbd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindows } from "@fortawesome/free-brands-svg-icons"

type os = "Windows" | "Mac OS" | "Linux" | "Other"

export const LockCombination: FC = () => {
  const getOS = (): os => {
    const platform = window.navigator.platform

    const macosPlatforms = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"]
    const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"]

    if (macosPlatforms.indexOf(platform) !== -1) {
      return "Mac OS"
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      return "Windows"
    } else if (/Linux/.test(platform)) {
      return "Linux"
    } else {
      return "Other"
    }
  }


  switch (getOS()) {
    case "Windows":
      return <CombinationWrapper>
        <Kbd><FontAwesomeIcon icon={faWindows} /></Kbd>+<Kbd>L</Kbd>
      </CombinationWrapper>
    case "Mac OS":
      return <CombinationWrapper>
        <Kbd>Ctrl</Kbd> + <Kbd>Cmd</Kbd> + <Kbd>Q</Kbd>
      </CombinationWrapper>
    case "Linux":
      return <CombinationWrapper>
        <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>L</Kbd>
      </CombinationWrapper>
    default:
      return <CombinationWrapper>
        <Kbd>Ctrl</Kbd> + <Kbd>L</Kbd> or <Kbd>Super</Kbd> + <Kbd>L</Kbd>
      </CombinationWrapper>
  }
}

const CombinationWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={"font-mono inline-flex gap-1"}>
    {children}
  </div>
}