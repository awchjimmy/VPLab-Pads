// Allen
export const coordinateConversion = (x, y) => {
    if (x > 13 || x < 1 || y > 8 || y < 1)
        return

    else if (y % 2)
        return y * 13 + x - 14

    else
        return y * 13 - x
}