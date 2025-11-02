import { Readable } from 'stream'

export const sendResponse = (res, status, result) => {
  return res.status(status).json({ status, result })
}

export const sendStream = (res, buffer) => {
  const stream = Readable.from(buffer)
  return stream.pipe(res)
}
