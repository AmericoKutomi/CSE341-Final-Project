const swaggerRouter = require('express').Router()
const swaggerUserInterface = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

swaggerRouter.use('/api-docs', swaggerUserInterface.serve)
swaggerRouter.get('/api-docs', swaggerUserInterface.setup(swaggerDocument))

module.exports = swaggerRouter