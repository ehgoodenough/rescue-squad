export function getDistance(a, b) {
    var x = b.x - a.x, y = b.y - a.y
    return Math.sqrt((x * x) + (y * y))
}

export function getMidpoint(a, b) {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        r: Math.atan2(a.y - b.y, a.x - b.x) * 180 / Math.PI
    }
}
