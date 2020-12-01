var express = require('express')
//var app = express()
const app=require('express')();
const session = require('express-session')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var flash = require('connect-flash')
var moment = require('moment')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var methodOverride = require('method-override')
var Recipe = require('./models/recipe')
//var Comment = require('./models/comment')
var User = require('./models/user')
//var seedDB = require('./seeds')
var fs=require('fs')
var $ = require('jquery')

var url = process.env.DATABASEURL || 'mongodb://localhost:27017/Nutristy'
mongoose.connect(
  url,
  { useNewUrlParser: true }
)

// cart ----------------------------------------------------------------------------------
const MongoStore = require('connect-mongo')(session);
const config = require('./lib/config.js');

mongoose.Promise =global. Promise;
const db= mongoose.connection
//var Products = JSON.parse(fs.readFileSync('./models/products.json', 'utf8'));
const Products = require('./models/Products');
const Cart = require('./lib/Cart');
const Security = require('./lib/Security');

const store = new MongoStore({
    host: '127.0.01',
    port: '27017',
    url: 'mongodb://localhost:27017/Nutristy',
    collection: 'sessions'
});
// cart ----------------------------------------------------------------------------------

// requiring routes


var recipeRoutes = require('./routes/recipes')

var indexRoutes = require('./routes/index')



// exprot DATABASEURL=mongodb://conn.string...

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// seedDB(); //seed the database

// MOMENT app var declaration
app.locals.moment = require('moment')

// PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'nutristy',
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  next()
})

//cart ------------------------------------------------------------------------------------------------
//app.use(helmet());
app.use(session({
  secret: 'something',
  resave: false,
  saveUninitialized: true,
  unset: 'destroy',
  store: store,
  name: config.name + '-' + Security.generateId(),
  genid: (req) => {
      return Security.generateId()
  }
}));

app.get('/cartindex/:id', (req, res) => {
if(!req.session.cart) {
    req.session.cart = {
        items: [],
        totals: 0.00,
        formattedTotals: ''
    };
}  
//console.log(req.params.id);
var rcp_id=req.params.id; // gets rid of recipe
Products.find({belongs_to: {'$eq':rcp_id} }).sort({price: -1}).then(products => {
    let format = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'INR' });
    products.forEach( (product) => {
       product.formattedPrice = format.format(product.price);
    });
    res.render('cartindex', {
        pageTitle: 'nutristy Shopping Cart',
        products: products,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });

   }).catch(err => {
       res.status(400).send('Bad request');
   });
   

     

});
//without changes
// Products.find({price: {'$gt': 0}}).sort({price: -1}).limit(6).then(products => {
//     let format = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'INR' });
//     products.forEach( (product) => {
//        product.formattedPrice = format.format(product.price);
//     });
//     res.render('cartindex', {
//         pageTitle: 'nutristy Shopping Cart',
//         products: products,
//         nonce: Security.md5(req.sessionID + req.headers['user-agent'])
//     });


app.get('/cart', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('cart', {
        pageTitle: 'Cart',
        cart: cart,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
}); // this renders the page

app.get('/cart/remove/:id/:nonce', (req, res) => {
   let id = req.params.id;
   console.log(id);
   if(/^\d+$/.test(id) && Security.isValidNonce(req.params.nonce, req)) {
       Cart.removeFromCart(parseInt(id, 10), req.session.cart);
       res.redirect('/cart');
   } else {
       res.redirect('/');
   }
});

app.get('/cart/empty/:nonce', (req, res) => {
    if(Security.isValidNonce(req.params.nonce, req)) {
        Cart.emptyCart(req);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});

app.post('/cart', (req, res) => {
    let qty = parseInt(req.body.qty, 10);
    let product = parseInt(req.body.product_id, 10);
    if(qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
        Products.findOne({product_id: product}).then(prod => {
            let cart = (req.session.cart) ? req.session.cart : null;
            Cart.addToCart(prod, qty, cart);
            res.redirect('/cart');
            console.log('Item added to cart');
        }).catch(err => {
           res.redirect('/cartindex');
        });
    } else {
        res.redirect('/cartindex');
    }
});

app.post('/cart/update', (req, res) => {
    let ids = req.body["product_id[]"];
    let qtys = req.body["qty[]"];
    if(Security.isValidNonce(req.body.nonce, req)) {
        let cart = (req.session.cart) ? req.session.cart : null;
        let i = (!Array.isArray(ids)) ? [ids] : ids;
        let q = (!Array.isArray(qtys)) ? [qtys] : qtys;
        Cart.updateCart(i, q, cart);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});

app.get('/checkout', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('checkout', {
        pageTitle: 'Checkout',
        cart: cart,
        checkoutDone: false,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
});

app.post('/checkout', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    if(Security.isValidNonce(req.body.nonce, req)) {
        res.render('checkout', {
            pageTitle: 'Checkout',
            cart: cart,
            checkoutDone: true
        });
    } else {
        res.redirect('/');
    }
});
// cart ---------------------------------------------------------------------------------------------



app.use('/', indexRoutes)
app.use('/recipes', recipeRoutes)

//app.use('/cart/:id', cart)

app.use(function (req, res, next) {
  res
    .status(404)
    .render('404_error_template', { title: 'Sorry, page not found' })
})

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log('server started on port 3000')
})
