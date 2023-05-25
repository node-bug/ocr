const { createWorker } = require('tesseract.js')
const { log } = require('@nodebug/logger')
const config = require('@nodebug/config')('ocr')

class Worker {
  constructor() {
    this.worker = null
  }

  async create() {
    try {
      this.worker = await createWorker()
      await this.worker.loadLanguage(config.language)
      await this.worker.initialize(config.language)
      return this
    } catch (e) {
      log.error(`Unable to create a OCR Worker Thread`)
      log.error(e.message)
    }
    return true
  }

  async terminate() {
    try {
      await this.worker.terminate()
    } catch (e) {
      log.error(`Unable to terminate OCR Worker Thread.`)
      log.error(e.message)
    }
    return true
  }
}

module.exports = Worker
