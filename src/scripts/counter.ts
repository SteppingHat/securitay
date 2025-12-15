const INCREMENT_INTERVAL_DELAY = 10 * 60 * 1000 // Buffer for better counting

export const bumpHitCount = (): number => {
  const now = new Date()
  let count = Number(localStorage.getItem("hitCount")) || 0

  if (count === 0) {
    count = 1
    localStorage.setItem("hitCount", "1")
    localStorage.setItem("lastHit", new Date().toISOString())
    return count
  }

  const lastHitRaw = localStorage.getItem("lastHit")
  const lastHitTime = lastHitRaw ? new Date(lastHitRaw).getTime() : undefined
  const shouldIncrement = !lastHitRaw || !lastHitTime || now.getTime() - lastHitTime > INCREMENT_INTERVAL_DELAY

  if (shouldIncrement) {
    count += 1
    localStorage.setItem("hitCount", count.toString())
    localStorage.setItem("lastHit", now.toISOString())
    return count
  }

  return count
}