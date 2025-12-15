import type { FC, PropsWithChildren } from "react"

export const Kbd: FC<PropsWithChildren> = ({ children }) => {
  const classes = [
    "border border-gray-600 px-1 py-0.5 rounded shadow bg-gray-800 font-mono font-medium nowrap",
    "px-2 border border-base-content/20 border-b-2 text-sm h-6 min-w-6",
    "items-center justify-center align-middle",
    "bg-base-200 rounded-field font-mono font-medium text-gray-50"
  ]

  return <kbd className={classes.join(" ")}>
    {children}
  </kbd>
}