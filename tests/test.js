const { log } = require('@nodebug/logger')
const fs = require('fs')
const OCR = require('..')

const testfilepath = `${process.env.PWD}/tests/test.jpeg`

const ocr = new OCR()
const buffer = fs.readFileSync(testfilepath)
log.debug('OCR text from buffer')
ocr.recognize(buffer).then((data) => log.debug(data))

log.debug('OCR text from file')
ocr.recognize(testfilepath).then((data) => log.debug(data))
