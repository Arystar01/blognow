// cron/removeBreaking.js
import mongoose from 'mongoose'
import { Blog } from '../models/BlogModel.js'
import { connectDB } from '../lib/db.js'

async function removeBreakingFlag() {
  await connectDB()

  await Blog.updateMany(
    {
      breaking: true,
      createdAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
    { $set: { breaking: false } }
  )

  console.log('⏰ Updated expired breaking blogs')
  mongoose.disconnect()
}

removeBreakingFlag()
