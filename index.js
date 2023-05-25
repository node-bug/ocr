const { log } = require('@nodebug/logger')
const config = require('@nodebug/config')('ocr')
const Worker = require('./worker')

class OCR {
  // eslint-disable-next-line class-methods-use-this
  get worker() {
    const worker = new Worker()
    return worker.create()
  }

  async recognize(buffer) {
    const t = await this.worker
    try {
      const { data } = await t.worker.recognize(buffer)
      return data[config.strategy]
    } catch (e) {
      log.error(`Unable to get the OCR Result.`)
      log.error(e)
    } finally {
      await t.terminate()
    }
    return true
  }
}

module.exports = OCR
