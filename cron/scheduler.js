// cron/scheduler.js
import cron from 'node-cron'
import { exec } from 'child_process'

cron.schedule('0 * * * *', () => {
  // console.log('Running cron to remove breaking flag...')
  exec('node cron/removeBreaking.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`)
      return
    }
    if (stderr) console.error(`stderr: ${stderr}`)
    // console.log(`stdout: ${stdout}`)
  })
})
