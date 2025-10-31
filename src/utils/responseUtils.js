export const sendResponse = (res, status, result) => {
  return res.status(status).json({ status, result })
}
