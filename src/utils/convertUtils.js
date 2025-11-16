export const convertTime = (time) => {
  return time.toLocaleString('vi-VN')
}

export const convertPrice = (price) => {
  return (price / 26000).toFixed(2)
}
