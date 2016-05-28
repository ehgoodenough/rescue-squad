export function getDistance(a, b) {
    var x = b.x - a.x, y = b.y - a.y
    return Math.sqrt((x * x) + (y * y))
}
