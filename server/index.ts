import 'reflect-metadata'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { logger } from './util/Logger'
import { InversifyExpressServer } from 'inversify-express-utils'
import axios, { AxiosRequestConfig } from 'axios'
import path = require('path')
import { Container } from 'inversify'
import { getContainer } from './container/inversify.config'

;(async () => {
  const container = new Container()
  /*  When using InversifyExpressServer without a controller, {forceControllers: false} */
  let server = new InversifyExpressServer(
    container,
    null,
    null,
    null,
    null,
    false
  )
  /* See: https://github.com/inversify/inversify-express-utils/pull/97 */

  // THIS DOES NOT WORK WITH EB WITHOUT PRESETTING UP SOME POSTGRES INSTANCE
  // const container = await getContainer()
  // let server = new InversifyExpressServer(container)

  server.setConfig((app) => {
    // let express support JSON bodies
    app.use(bodyParser.json())
    // error handling
    app.use(function (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      logger.error(err.stack)
      next(err)
    })
    app.use(function (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.status(500).send('Internal Server Error')
    })
    app.use(express.static(path.join(__dirname, '../web/public')))

    // repeater for CORS requests
    app.get('/repeater', (req, res) => {
      const keys = Object.keys(req.headers)
      let config = {} as AxiosRequestConfig
      keys.map((key) => {
        config[key] = req.headers[key]
      })
      axios
        .request(config)
        .then((response) => {
          res.send(response.data)
        })
        .catch((error) => {
          res.status(400).send(error.data)
        })
    })
    app.get('*', (req, res) => {
      res.sendFile('/web/public/index.html', { root: __dirname + '/../' })
    })
  })

  let app = server.build()

  // setup express middleware logging and begin listening
  app.listen(8081, function () {
    logger.info('Listening on port 8081!')
  })
})()
