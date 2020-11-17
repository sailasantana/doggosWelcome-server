const business = require('../db/business-store')
require('dotenv').config()
const uuid = require('uuid/v4')
const logger = require('./winston-logger')

const { NODE_ENV } = require('../misc/config')

const businessRouter = express.Router()
const bodyParser = express.json()

businessRouter.route('/businesses')
    .get((req,res) => {
        res.json(business)
    })
    //adding a form feature that allows users/business owners to 
    //add/suggest their businesses 
    .post(bodyParser, (req,res) => {
        console.log(req.body)
        for (const field of ['title', 'website', 'address', 'zipCode', 'type']){
            if(!req.body['field']){
                logger.error(`${field} is required!`)
                return res.status(400).send(`${field} is required!`)
            }
        }

        const title = req.body.title
        const wesbite = req.body.wesbite
        const address = req.body.address
        const zipCode = req.body.zipCode

        const businessrRec = {title, website, address, zipCode, id:uuid()}
        business.push(businessrRec)
        logger.info(`Your recommendation was successfully submitted - ${title}`)
            res.status(201)
            .location(`http://localhost:8000/businesses/${business.zipCode}/${businessrRec.id}`)
    })
    //get all businesses associated with a zip code + type 
    businessRouter
        .route('/businesses/:zip')
        .get((req,res) => {
            const zip = req.params.zip
            //this value will come from the form submission
            const type = req.body.type

            const businesses = business.find(b => b.zipCode == zip && b.type === type)

            if(!businesses){
                logger.error(`Doggo-friendly businesses not found`)
                return res
                .status(404)
                .send( `Doggo-friendly businesses not found. Try a different
                zip code or type of activity`)
            }

            res.json(businesses)
        })

 //get a specific businesse associated with a zip code 
 businessRouter
    .route('http://localhost:8000/businesses/:zip/:id')
    .get((req, res) => {

    })


