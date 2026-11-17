import { defineEventHandler } from 'h3'

const startAt = Date.now()
let count = 0

export default defineEventHandler(() => ({
  pageview: count++,
  startAt,
}))
