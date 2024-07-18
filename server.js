const express = require('express');
const app = express();
const mongodb = require('./database/connect')
const static = require("./routes/static")
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const GithubStrategy = require('passport-github2').Strategy
const cors = require('cors')
const port = process.env.PORT
const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(static)

const corsOptions = {
    origin: '*', // Ou especifique os domínios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] // Adicione outros cabeçalhos conforme necessário
  };

app.use(cors(corsOptions));

// Leia o template do Swagger
const swaggerTemplate = fs.readFileSync(path.join(__dirname, 'swagger-template.json'), 'utf8');

// Substitua os placeholders pelos valores das variáveis de ambiente
const host = process.env.HOST || 'localhost:8080';
const schemes = host.includes('localhost') ? 'http' : 'https';
const swaggerDocument = swaggerTemplate
    .replace('{{HOST}}', host)
    .replace('{{SCHEMES}}', schemes);

// Salve o arquivo gerado
fs.writeFileSync(path.join(__dirname, 'swagger.json'), swaggerDocument);

// This is the basic express session initialization.
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true,
}))

// Init passport on every routes call.
app.use(passport.initialize())
//Allow passport to use express-session
app.use(passport.session())

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})


app.use(express.static(__dirname + '../public'));
app.use('/', require('./routes/index') )

passport.use(new GithubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
   
    // User.findOrCreate({githubId:profile.Id}, function(err,){
        return done(null, profile)
    // })
    }
   

))


passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}`: "logged Out")
})

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: "/api-docs", session: false
}),
(req, res) => {
    req.session.user = req.user
    res.redirect('/api-docs')
}
)
mongodb.initDb((err) => {
    if(err){
        console.log(err)
    }else{
        app.listen(port, () => {
            console.log(`Running on port ${port}`)
        })
    }
})