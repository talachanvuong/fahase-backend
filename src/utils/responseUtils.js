export const sendResponse = (res, status, message, result = null) => {
  const response = { message }

  if (result !== null) {
    response.result = result
  }

  return res.status(status).json(response)
}
