require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __webpack_require__(232);
  
  var _lodash = __webpack_require__(254);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _fs = __webpack_require__(99);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(102);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(97);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _mongoose = __webpack_require__(101);
  
  var _mongoose2 = _interopRequireDefault(_mongoose);
  
  var _bodyParser = __webpack_require__(250);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _cookieParser = __webpack_require__(251);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _jsonwebtoken = __webpack_require__(100);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  //import './dispatchers/Dispatcher';
  //import './stores/AppStore';
  
  var _coreDatabase = __webpack_require__(90);
  
  var _coreDatabase2 = _interopRequireDefault(_coreDatabase);
  
  var _componentsApp = __webpack_require__(88);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _utilsClientDetection = __webpack_require__(231);
  
  var _utilsClientDetection2 = _interopRequireDefault(_utilsClientDetection);
  
  var _databaseConfig = __webpack_require__(225);
  
  var _databaseConfig2 = _interopRequireDefault(_databaseConfig);
  
  var _modelsUser = __webpack_require__(227);
  
  var _modelsUser2 = _interopRequireDefault(_modelsUser);
  
  var _reactRouter = __webpack_require__(24);
  
  var _reactRouter2 = _interopRequireDefault(_reactRouter);
  
  var _routesRoutes = __webpack_require__(229);
  
  var _routesRoutes2 = _interopRequireDefault(_routesRoutes);
  
  var _componentsLoginPage = __webpack_require__(58);
  
  var _componentsLoginPage2 = _interopRequireDefault(_componentsLoginPage);
  
  var _componentsRegisterPage = __webpack_require__(59);
  
  var _componentsRegisterPage2 = _interopRequireDefault(_componentsRegisterPage);
  
  var _componentsUserHomePage = __webpack_require__(89);
  
  var _componentsUserHomePage2 = _interopRequireDefault(_componentsUserHomePage);
  
  var _nodemailer = __webpack_require__(255);
  
  var _nodemailer2 = _interopRequireDefault(_nodemailer);
  
  var server = (0, _express2['default'])();
  
  server.set('port', process.env.PORT || 5000);
  server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
  
  // db token seed
  server.set('superSecret', _databaseConfig2['default'].secret); // secret variable
  
  // use body parser so we can get info from POST and/or URL parameters
  server.use(_bodyParser2['default'].urlencoded({ extended: false }));
  server.use(_bodyParser2['default'].json());
  server.use((0, _cookieParser2['default'])());
  
  // TODO: move transporter to a diff file
  //--------------------------------------------------------------------------------
  // creating transporter for sending email.
  //--------------------------------------------------------------------------------
  var transporter = _nodemailer2['default'].createTransport({
    service: 'Gmail',
    auth: {
      user: 'scomart.pulse@gmail.com',
      pass: 'pulse@gmail.com'
    }
  });
  //--------------------------------------------------------------------------------
  
  // db connection
  _mongoose2['default'].connect(_databaseConfig2['default'].database);
  var mongoDB = _mongoose2['default'].connection;
  
  mongoDB.on('error', console.error.bind(console, 'connection error:'));
  
  /*mongoDB.on('error', function callback (){
    console.log('Server.mongoDB.onError()| mongoDB connection error', arguments);
  });*/
  
  mongoDB.once('open', function callback() {
    console.log('Server.mongoDB.once()| mongoDB CONNECTED');
  });
  // console.log('superSecret:', server.get('superSecret'));
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/routeapi/query', __webpack_require__(228));
  //
  // Register API authentication
  // -----------------------------------------------------------------------------
  // TODO: refactor and move to a module/class
  // -----------------
  // utility functions
  function expiresInMins(minutes) {
    var d1 = new Date();
    return new Date(d1.getTime() + minutes * 60000);
  }
  // -----------------
  var apiRoutes = _express2['default'].Router();
  // console.log('apiRoutes:', apiRoutes);
  apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });
  
  apiRoutes.post('/signup', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    console.log('server.post()| REST call /signup, request body:', req.body);
  
    _modelsUser2['default'].findOne({
      userid: email
    }, function (err, user) {
  
      if (err) {
        throw err;
      }
  
      if (!user) {
        console.log('server.post()| REST call /signup, creating new user...');
  
        var minExpire = 10; // expires in 10 min
        var expires = expiresInMins(minExpire);
  
        user = {
          userid: email,
          email: email,
          name: name,
          address: address
        };
  
        var signObj = {
          user: user,
          expires: expires // this acts a token differentiator
        };
        var token = _jsonwebtoken2['default'].sign(signObj, server.get('superSecret'), {
          //expiresInMinutes: minExpire //never expires
        });
  
        user.jwt = token;
  
        var newUser = new _modelsUser2['default'](user);
  
        console.log("server.post()| REST call /signup: trying to add:", newUser);
  
        newUser.save(function (error, result) {
          if (error) {
            console.log("server.post()| REST call /signup: Error during save:", error);
            throw error;
          }
          console.log("server.post()| REST call /signup: Inserted a document into the user collection:", result);
  
          var host = req.headers.host;
          console.log("server.post()| REST call /signup: server host:", host);
          // setup e-mail data with unicode symbols
          var mailOptions = {
            from: 'scomart<scomart@gmail.com>', // sender address
            to: result.email, // list of receivers
            subject: 'Welcome to scomart', // Subject line
            text: '', // plaintext body
            html: '<div>Hello <b>' + result.name + '</b>,<p>Please <a href="http://' + host + '/signup?key=' + result.jwt + '">Complete your registration</a> to <a href="http://' + host + '">scomart</a></p>' + '<p>Looking forward to see you,<br><b>scomart Team</b></p></div>' // html body
          };
  
          // send mail with defined transport object
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log('server.post()| Email ERROR:', error);
            } else {
              console.log('server.post()| Email sent: ', info.response);
            }
          });
        });
  
        res.json({ success: true, message: 'User signup success!!!' });
      } else {
        res.json({ success: false, message: 'User already exists, did you forget your password?' }); // TODO: send error code instead of msg
      }
    });
  });
  
  apiRoutes.post('/authenticate', function (req, res) {
    var userid = req.body.userid;
    var password = req.body.password;
    // console.log('authenticate:', req.body);
  
    _modelsUser2['default'].findOne({
      userid: userid
    }, function (err, user) {
  
      if (err) {
        throw err;
      }
  
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // check if password matches
        if (user.password !== password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          console.log('Server.apiRoutes.post()| Login Success for user:', user.name);
          // if user is found and password is right
          // create a token
          var minExpire = 10; // expires in 10 min
          var expires = expiresInMins(minExpire);
  
          var signObj = {
            userid: user.userid,
            name: user.name,
            id: user._id,
            expires: expires // this acts a token differentiator
          };
          var token = _jsonwebtoken2['default'].sign(signObj, server.get('superSecret'), {
            //expiresInMinutes: minExpire //never expires
          });
  
          // return the information including token as JSON
          user.password = null;
          //delete user.password;
          res.json({
            success: true,
            message: 'Login Success!',
            user: user,
            //expires: expires,
            token: token
          });
        }
      }
    });
  });
  
  apiRoutes.post('/changepassword', function (req, res) {
    var mongoDBUserId = req.body.id;
    var token = req.body.token;
    console.log('server.REST.POST.changepassword()| userid, token:', mongoDBUserId, token);
  
    _modelsUser2['default'].findOne({
      _id: mongoDBUserId
    }, function (err, user) {
  
      if (err) {
        console.log('server.REST.POST.changepassword()| DB error:', err);
        return res.status(403).json({ success: false, message: 'Password reset failed. database exception.' });
      }
  
      if (!user) {
        res.status(403).json({ success: false, message: 'Password reset failed. User not found.' });
      } else if (user) {
  
        console.log('server.REST.POST.changepassword()| trying to authenticate token:', token);
  
        _jsonwebtoken2['default'].verify(token, user.jwt, function (jwtError, decoded) {
          if (jwtError) {
            return res.status(403).json({ success: false, message: 'Password reset failed. Failed to authenticate token.' });
          } else {
            console.log('server.REST.POST.changepassword()| token verified... decoded user:', decoded);
            // TODO: ALERT!!!! this is not at all secure, just pseudo security.
            var query = { _id: decoded._id };
  
            _modelsUser2['default'].findOneAndUpdate(query, { $set: { jwt: undefined, password: decoded.password } }, function (updateError, numRow) {
              console.log('server.REST.POST.changepassword()| mongoDB update:', numRow, updateError);
              if (updateError) {
                return res.status(500).json({ success: false, message: 'Password reset failed. Failed to authenticate token.', error: updateError });
              }
              return res.status(200).json({ success: true, message: 'Password reset Successful!!!' });
            });
  
            // console.log('Auth Success decoded:', decoded);
          }
        });
      }
    });
  });
  
  // route middleware to verify a token
  // all requests after this will be authenticated via token
  apiRoutes.use(function (req, res, next) {
  
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-scomart-access-token'];
  
    // decode token
    if (token) {
      // verifies secret and checks exp
      _jsonwebtoken2['default'].verify(token, server.get('superSecret'), function (err, decoded) {
        if (err) {
          return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          // console.log('Auth Success decoded:', decoded);
          req.decoded = decoded;
          req.token = token;
          next();
        }
      });
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });
  
  apiRoutes.get('/verify', function (req, res) {
    console.log('Server.apiRoutes() REST Call to /verify:', req.decoded);
    var mongoDBUserId = req.decoded.id;
  
    _modelsUser2['default'].findOne({
      _id: mongoDBUserId
    }, function (err, user) {
  
      if (err) {
        console.log('server.REST.POST.changepassword()| DB error:', err);
        return res.status(403).json({ success: false, message: 'user verification failed. database exception.' });
      }
  
      if (!user) {
        return res.status(403).json({ success: false, message: 'user verification failed. User not found.' });
      } else if (user) {
  
        console.log('server.REST.POST.changepassword()| User found:', user);
        user.password = null;
        var validUser = {
          verified: true,
          user: user
        };
        return res.status(200).json(validUser);
      }
    });
  });
  
  apiRoutes.get('/verifyusertoken', function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-scomart-access-token'];
    console.log('Server.apiRoutes() REST Call to /verifyusertoken token==>', token);
    var userID = req.decoded.user.userid;
  
    _modelsUser2['default'].findOne({
      userid: userID
    }, function (err, user) {
  
      if (err) {
        throw err;
      }
  
      if (!user) {
        res.status(403).json({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // check if jwt matches
        if (user.jwt !== token) {
          res.status(403).json({ success: false, message: 'Authentication failed. Token did not match.' });
        } else {
          console.log('Server.apiRoutes() REST Call to /verifyusertoken: Authentication success...');
          // TODO: verify expiry
          return res.status(200).send({
            success: true,
            user: user
          });
        }
      }
    });
  });
  
  apiRoutes.get('/users', function (req, res) {
    // console.log('get users called');
  
    _modelsUser2['default'].find({}).exec(function (err, users) {
      if (err) {}
      // console.log('user mongoDB error:', err);
  
      // console.log('getting users', users);
      res.json(users);
    });
  });
  
  server.use('/api', apiRoutes);
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  
  // The top-level React component + HTML template for it
  var templateFile = _path2['default'].join(__dirname, 'templates/index.html');
  var template = _lodash2['default'].template(_fs2['default'].readFileSync(templateFile, 'utf8'));
  
  server.get('*', function callee$0$0(req, res, next) {
    var dt, router;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          dt = new Date();
  
          console.log('=============================================');
          console.log('server.server.get()| render start...', dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ':' + dt.getMilliseconds());
          console.log('server.server.get()| req query string==>', req.query);
          console.log('server.server.get()| req cookies string==>', req.cookies.rememberuser);
          try {
            (function () {
              var isMobile = _utilsClientDetection2['default'].isMobile(req.headers['user-agent']);
              // console.log('Serverjs AMIT: isMobile:', isMobile);
              // TODO: Temporary fix #159
              // if (['/about', '/privacy'].indexOf(req.path) !== -1) {
              //   console.log('dd');
              //   await db.getPage(req.path);
              // }
              var notFound = false;
              var css = [];
              var data = { description: '' };
              /*
              let app = (<App
                path={req.path}
                isMobile={isMobile}
                context={{
                  onInsertCss: value => css.push(value),
                  onSetTitle: value => {data.title = value; },
                  onSetMeta: (key, value) => data[key] = value,
                  onPageNotFound: () => notFound = true
                }} />);
               data.body = React.renderToString(app);
              data.css = css.join('');
              
              let html = template(data);
              if (notFound) {
                res.status(404);
              }
              res.send(html);*/
              /*
              var appRoutes = (
                <Route path="/" handler={App}>
                    <Route name="login" handler={LoginPage}/>
                    <Route name="register" handler={RegisterPage}/>
                    <Route name="home" handler={HomePage}/>
                </Route>
              );*/
              console.log('server.server.get()| req.url:', req.params);
              router = _reactRouter2['default'].create({
                location: req.url,
                routes: _routesRoutes2['default'],
                onAbort: function onAbort(abortReason) {
                  console.log('server.Router.create().onAbort()| reason:', abortReason);
                  console.log('server.Router.create().onAbort()| instance of ', abortReason.constructor.name);
                  if (abortReason.constructor.name === 'Redirect') {
                    var url = this.makePath(abortReason.to, abortReason.params, abortReason.query);
  
                    url += '?redirect=' + abortReason.query;
                    console.log('server.Router.create().onAbort()| url: [', url, '] q:', abortReason.params);
                    res.redirect(url);
                  } else {
                    // TODO: review logic here
                    if (abortReason.reason === 'NOTLOGGED') {
                      var url = this.makePath('login');
                      res.redirect(url);
                    }
                  }
                },
                onError: function onError(err) {
                  console.log('server.Router.create().onError()| err, arguments:', err, arguments);
                }
              });
  
              console.log('server.server.get()| router created...');
              router.run(function (Handler, state) {
                console.log('server.Router.run()| router running...');
                console.log('server.Router.run()| router Query params:', state.query);
  
                data.body = _react2['default'].renderToString(_react2['default'].createElement(Handler, { rememberuser: req.cookies.rememberuser === 'true', context: {
                    onInsertCss: function onInsertCss(value) {
                      return css.push(value);
                    },
                    onSetTitle: function onSetTitle(value) {
                      data.title = value;
                    },
                    onSetMeta: function onSetMeta(key, value) {
                      return data[key] = value;
                    },
                    onPageNotFound: function onPageNotFound() {
                      notFound = true;console.log('PAGE NOT FOUND!!!!');
                    }
                  } }));
                data.css = css.join('');
                var html = template(data);
                if (notFound) {
                  res.status(404);
                }
                res.send(html);
                // --------------------
                var dt = new Date();
                console.log('server.server.get()| render end...', dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ':' + dt.getMilliseconds());
                console.log('-------------------------------------------------');
                // --------------------
              });
            })();
          } catch (err) {
            // console.log('AMIT: server exception:', err);
            next(err);
          }
  
        case 6:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  
  server.listen(server.get('port'), function () {
    // console.log('AMIT: Listening to port:', server.get('port'));
    if (process.send) {
      // console.log('AMIT: going online');
      process.send('online');
    } else {
      // console.log('The server is running at http://localhost:' + server.get('port'));
    }
  });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  var global     = __webpack_require__(6)
    , core       = __webpack_require__(18)
    , hide       = __webpack_require__(13)
    , $redef     = __webpack_require__(15)
    , PROTOTYPE  = 'prototype';
  var ctx = function(fn, that){
    return function(){
      return fn.apply(that, arguments);
    };
  };
  var $def = function(type, name, source){
    var key, own, out, exp
      , isGlobal = type & $def.G
      , isProto  = type & $def.P
      , target   = isGlobal ? global : type & $def.S
          ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
      , exports  = isGlobal ? core : core[name] || (core[name] = {});
    if(isGlobal)source = name;
    for(key in source){
      // contains in native
      own = !(type & $def.F) && target && key in target;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      if(type & $def.B && own)exp = ctx(out, global);
      else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
      // extend global
      if(target && !own)$redef(target, key, out);
      // export
      if(exports[key] != out)hide(exports, key, exp);
      if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  global.core = core;
  // type bitmap
  $def.F = 1;  // forced
  $def.G = 2;  // global
  $def.S = 4;  // static
  $def.P = 8;  // proto
  $def.B = 16; // bind
  $def.W = 32; // wrap
  module.exports = $def;

/***/ },
/* 2 */
/***/ function(module, exports) {

  var $Object = Object;
  module.exports = {
    create:     $Object.create,
    getProto:   $Object.getPrototypeOf,
    isEnum:     {}.propertyIsEnumerable,
    getDesc:    $Object.getOwnPropertyDescriptor,
    setDesc:    $Object.defineProperty,
    setDescs:   $Object.defineProperties,
    getKeys:    $Object.keys,
    getNames:   $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each:       [].forEach
  };

/***/ },
/* 3 */
/***/ function(module, exports) {

  // http://jsperf.com/core-js-isobject
  module.exports = function(it){
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(3);
  module.exports = function(it){
    if(!isObject(it))throw TypeError(it + ' is not an object!');
    return it;
  };

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports) {

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var UNDEFINED = 'undefined';
  var global = module.exports = typeof window != UNDEFINED && window.Math == Math
    ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
  if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = function(exec){
    try {
      return !!exec();
    } catch(e){
      return true;
    }
  };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  var store  = __webpack_require__(81)('wks')
    , Symbol = __webpack_require__(6).Symbol;
  module.exports = function(name){
    return store[name] || (store[name] =
      Symbol && Symbol[name] || (Symbol || __webpack_require__(26))('Symbol.' + name));
  };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  // eslint-disable-line no-unused-vars
  
  var _node_modulesReactLibInvariant = __webpack_require__(96);
  
  var _node_modulesReactLibInvariant2 = _interopRequireDefault(_node_modulesReactLibInvariant);
  
  var _node_modulesReactLibExecutionEnvironment = __webpack_require__(28);
  
  var count = 0;
  
  function withStyles(styles) {
    return function (ComposedComponent) {
      return (function () {
        _createClass(WithStyles, null, [{
          key: 'contextTypes',
          value: {
            onInsertCss: _react.PropTypes.func
          },
          enumerable: true
        }]);
  
        function WithStyles() {
          _classCallCheck(this, WithStyles);
  
          this.refCount = 0;
          ComposedComponent.prototype.renderCss = (function (css) {
            var style = undefined;
            if (_node_modulesReactLibExecutionEnvironment.canUseDOM) {
              if (this.styleId && (style = document.getElementById(this.styleId))) {
                if ('textContent' in style) {
                  style.textContent = css;
                } else {
                  style.styleSheet.cssText = css;
                }
              } else {
                this.styleId = 'dynamic-css-' + count++;
                style = document.createElement('style');
                style.setAttribute('id', this.styleId);
                style.setAttribute('type', 'text/css');
  
                if ('textContent' in style) {
                  style.textContent = css;
                } else {
                  style.styleSheet.cssText = css;
                }
  
                document.getElementsByTagName('head')[0].appendChild(style);
                this.refCount++;
              }
            } else {
              this.context.onInsertCss(css);
            }
          }).bind(this);
        }
  
        _createClass(WithStyles, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            if (_node_modulesReactLibExecutionEnvironment.canUseDOM) {
              (0, _node_modulesReactLibInvariant2['default'])(styles.use, 'The style-loader must be configured with reference-counted API.');
              styles.use();
            } else {
              this.context.onInsertCss(styles.toString());
            }
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            styles.unuse();
            if (this.styleId) {
              this.refCount--;
              if (this.refCount < 1) {
                var style = document.getElementById(this.styleId);
                if (style) {
                  style.parentNode.removeChild(style);
                }
              }
            }
          }
        }, {
          key: 'render',
          value: function render() {
            // console.log'withStyles called:', ComposedComponent)
            return _react2['default'].createElement(ComposedComponent, this.props);
          }
        }]);
  
        return WithStyles;
      })();
    };
  }
  
  exports['default'] = withStyles;
  module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 11 */
/***/ function(module, exports) {

  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function(it, key){
    return hasOwnProperty.call(it, key);
  };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  // 7.1.15 ToLength
  var toInteger = __webpack_require__(34)
    , min       = Math.min;
  module.exports = function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  var $          = __webpack_require__(2)
    , createDesc = __webpack_require__(25);
  module.exports = __webpack_require__(16) ? function(object, key, value){
    return $.setDesc(object, key, createDesc(1, value));
  } : function(object, key, value){
    object[key] = value;
    return object;
  };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  // most Object methods by ES6 should accept primitives
  module.exports = function(KEY, exec){
    var $def = __webpack_require__(1)
      , fn   = (__webpack_require__(18).Object || {})[KEY] || Object[KEY]
      , exp  = {};
    exp[KEY] = exec(fn);
    $def($def.S + $def.F * __webpack_require__(7)(function(){ fn(1); }), 'Object', exp);
  };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  // add fake Function#toString
  // for correct work wrapped methods / constructors with methods like LoDash isNative
  var global    = __webpack_require__(6)
    , hide      = __webpack_require__(13)
    , SRC       = __webpack_require__(26)('src')
    , TO_STRING = 'toString'
    , $toString = Function[TO_STRING]
    , TPL       = ('' + $toString).split(TO_STRING);
  
  __webpack_require__(18).inspectSource = function(it){
    return $toString.call(it);
  };
  
  (module.exports = function(O, key, val, safe){
    if(typeof val == 'function'){
      hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if(!('name' in val))val.name = key;
    }
    if(O === global){
      O[key] = val;
    } else {
      if(!safe)delete O[key];
      hide(O, key, val);
    }
  })(Function.prototype, TO_STRING, function toString(){
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  // Thank's IE8 for his funny defineProperty
  module.exports = !__webpack_require__(7)(function(){
    return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
  });

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  // to indexed object, toObject with fallback for non-array-like ES3 strings
  var IObject = __webpack_require__(44)
    , defined = __webpack_require__(19);
  module.exports = function(it){
    return IObject(defined(it));
  };

/***/ },
/* 18 */
/***/ function(module, exports) {

  var core = module.exports = {};
  if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports) {

  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function(it){
    if(it == undefined)throw TypeError("Can't call method on  " + it);
    return it;
  };

/***/ },
/* 20 */,
/* 21 */
/***/ function(module, exports) {

  var toString = {}.toString;
  
  module.exports = function(it){
    return toString.call(it).slice(8, -1);
  };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  // optional / simple context binding
  var aFunction = __webpack_require__(29);
  module.exports = function(fn, that, length){
    aFunction(fn);
    if(that === undefined)return fn;
    switch(length){
      case 1: return function(a){
        return fn.call(that, a);
      };
      case 2: return function(a, b){
        return fn.call(that, a, b);
      };
      case 3: return function(a, b, c){
        return fn.call(that, a, b, c);
      };
    } return function(/* ...args */){
        return fn.apply(that, arguments);
      };
  };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  // 7.1.13 ToObject(argument)
  var defined = __webpack_require__(19);
  module.exports = function(it){
    return Object(defined(it));
  };

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("react-router");

/***/ },
/* 25 */
/***/ function(module, exports) {

  module.exports = function(bitmap, value){
    return {
      enumerable  : !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable    : !(bitmap & 4),
      value       : value
    };
  };

/***/ },
/* 26 */
/***/ function(module, exports) {

  var id = 0
    , px = Math.random();
  module.exports = function(key){
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = __webpack_require__(8)('unscopables');
  if(!(UNSCOPABLES in []))__webpack_require__(13)(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key){
    [][UNSCOPABLES][key] = true;
  };

/***/ },
/* 28 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ExecutionEnvironment
   */
  
  /*jslint evil: true */
  
  "use strict";
  
  var canUseDOM = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  );
  
  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */
  var ExecutionEnvironment = {
  
    canUseDOM: canUseDOM,
  
    canUseWorkers: typeof Worker !== 'undefined',
  
    canUseEventListeners:
      canUseDOM && !!(window.addEventListener || window.attachEvent),
  
    canUseViewport: canUseDOM && !!window.screen,
  
    isInWorker: !canUseDOM // For now, this is true - might change in the future.
  
  };
  
  module.exports = ExecutionEnvironment;


/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = function(it){
    if(typeof it != 'function')throw TypeError(it + ' is not a function!');
    return it;
  };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  var ctx         = __webpack_require__(22)
    , call        = __webpack_require__(74)
    , isArrayIter = __webpack_require__(72)
    , anObject    = __webpack_require__(4)
    , toLength    = __webpack_require__(12)
    , getIterFn   = __webpack_require__(85);
  module.exports = function(iterable, entries, fn, that){
    var iterFn = getIterFn(iterable)
      , f      = ctx(fn, that, entries ? 2 : 1)
      , index  = 0
      , length, step, iterator;
    if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
    // fast case for arrays with default iterator
    if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
      entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
      call(iterator, f, step.value, entries);
    }
  };

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  var has  = __webpack_require__(11)
    , hide = __webpack_require__(13)
    , TAG  = __webpack_require__(8)('toStringTag');
  
  module.exports = function(it, tag, stat){
    if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
  };

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  var toInteger = __webpack_require__(34)
    , max       = Math.max
    , min       = Math.min;
  module.exports = function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  };

/***/ },
/* 34 */
/***/ function(module, exports) {

  // 7.1.4 ToInteger
  var ceil  = Math.ceil
    , floor = Math.floor;
  module.exports = function(it){
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _reactLibKeyMirror = __webpack_require__(247);
  
  var _reactLibKeyMirror2 = _interopRequireDefault(_reactLibKeyMirror);
  
  exports['default'] = (0, _reactLibKeyMirror2['default'])({
    GET_PAGE: null,
    RECEIVE_PAGE: null,
    CHANGE_LOCATION: null,
    LOGIN_USER: null,
    LOGOUT_USER: null,
    SIGNUP_USER: null,
    TOKEN_VERIFIED: null
  });
  module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _superagent = __webpack_require__(62);
  
  var _superagent2 = _interopRequireDefault(_superagent);
  
  var _actionsLoginAction = __webpack_require__(87);
  
  var _actionsLoginAction2 = _interopRequireDefault(_actionsLoginAction);
  
  var _jsonwebtoken = __webpack_require__(100);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var AuthService = (function () {
    function AuthService() {
      _classCallCheck(this, AuthService);
    }
  
    _createClass(AuthService, [{
      key: 'verifyJWT',
      value: function verifyJWT(jwt) {
        if (jwt) {
          _superagent2['default'].get('/api/verify').set('x-scomart-access-token', jwt).end(function (err, response) {
            console.log('AuthService. rest call|  err, response', err, response);
            if (!err && response && response.body && response.body.verified) {
              console.log('AuthService.verifyJWT()| JWT verification success!!!');
  
              _actionsLoginAction2['default'].loginUser(jwt, response.body.user);
            } else {
              console.log('AuthService.verifyJWT()| JWT verification Fail!!!');
              _actionsLoginAction2['default'].loginFailed();
            }
            // console.log('LoginAction.loginUser()| RouterContainer.get().getCurrentQuery():', RouterContainer.get().getCurrentPathname());
            // var nextPath = RouterContainer.get().getCurrentQuery() && RouterContainer.get().getCurrentQuery().redirect || '/';
            // console.log('LoginAction.loginUser()| nextPath:', nextPath);
            // RouterContainer.get().transitionTo(nextPath);
          });
        }
      }
    }, {
      key: 'login',
      value: function login(username, password, errorCb) {
        console.log('AuthService.login()| Trying login user with', username, password);
  
        _superagent2['default'].post('/api/authenticate').type('form').send({
          userid: username,
          password: password
        }).set('Accept', 'application/json').end(function (err, response) {
          console.log('AuthService.login()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('AuthService.login()| Authentication success!!!');
            // We get a JWT back.
            var _jwt = response.body.token;
            // We trigger the LoginAction with that JWT.
            _actionsLoginAction2['default'].loginUser(_jwt, response.body.user);
            return true;
          } else {
            console.log('AuthService.login()| Authentication Failed!!!');
            errorCb();
          }
        });
        // We call the server to log the user in.
        /*
        return when(request({
          url: '/api/authenticate',
          method: 'POST',
          crossOrigin: true,
          type: 'json',
          data: {
            userid: username,
            password: password
          }
        }))
        .then(function(response) {
            console.log('AMIT AuthService', response);
            // We get a JWT back.
            let jwt = response.token;
            // We trigger the LoginAction with that JWT.
            LoginActions.loginUser(jwt);
            return true;
        });*/
      }
    }, {
      key: 'logout',
      value: function logout() {
        _actionsLoginAction2['default'].logoutUser();
      }
    }, {
      key: 'signUp',
      value: function signUp(user, errorCb) {
        console.log('AuthService.signUp()| Trying signUp user:', user);
        _superagent2['default'].post('/api/signup').type('form').send(user).set('Accept', 'application/json').end(function (err, response) {
          console.log('AuthService.signUp()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('AuthService.signUp()| signUp success!!!');
            // We get a JWT back.
            //let jwt = response.body.token;
            // We trigger the LoginAction with that JWT.
            _actionsLoginAction2['default'].signUpUser(user);
            return true;
          } else {
            console.log('AuthService.signUp()| signUp Failed!!!');
            errorCb(response);
          }
        });
      }
    }, {
      key: 'changePassword',
      value: function changePassword(user, cb) {
        console.log('AuthService.changePassword()| Trying changePassword for user:', user);
        // TODO: implement SSL. For the time being doing a pseudo security
  
        var token = _jsonwebtoken2['default'].sign(user, user.jwt);
  
        console.log('AuthService.changePassword()| jwt:', user.jwt);
        console.log('AuthService.changePassword()| token:', token);
  
        _superagent2['default'].post('/api/changepassword').type('form').send({
          id: user._id,
          token: token
        }).set('Accept', 'application/json').end(function (err, response) {
          console.log('AuthService.changePassword()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('AuthService.changePassword()| changePassword success!!!');
            // We get a JWT back.
            //let jwt = response.body.token;
            // We trigger the LoginAction with that JWT.
          } else {
              console.log('AuthService.changePassword()| changePassword Failed!!!');
            }
          cb(response.body);
        });
      }
    }]);
  
    return AuthService;
  })();
  
  exports['default'] = new AuthService();
  module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _constantsActionTypes = __webpack_require__(35);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  var _BaseStore2 = __webpack_require__(94);
  
  var _BaseStore3 = _interopRequireDefault(_BaseStore2);
  
  //import jwt_decode from 'jwt-decode';
  
  var LoginStore = (function (_BaseStore) {
    _inherits(LoginStore, _BaseStore);
  
    function LoginStore() {
      var _this = this;
  
      _classCallCheck(this, LoginStore);
  
      _get(Object.getPrototypeOf(LoginStore.prototype), 'constructor', this).call(this);
      console.log('LoginStore.constructor()');
      this.subscribe(function () {
        return _this._registerToActions.bind(_this);
      });
      this._user = null;
      this._jwt = null;
      this._isloggedin = null;
      this._failedLogin = null;
    }
  
    _createClass(LoginStore, [{
      key: '_registerToActions',
      value: function _registerToActions(action) {
        console.log('LoginStore._registerToActions()| dispatchToken:', action);
        switch (action.type) {
          case _constantsActionTypes2['default'].LOGIN_FAILED:
            this._failedLogin = true;
            this.emitChange();
            break;
          case _constantsActionTypes2['default'].LOGIN_USER:
            //console.log('AMIT LOGINSTORE: emitchange with jwt', action.jwt);
            this._jwt = action.jwt;
            this._user = action.user;
            this._isloggedin = true;
            //this._user = jwt_decode(this._jwt);
            this.emitChange();
            break;
          case _constantsActionTypes2['default'].LOGOUT_USER:
            this._user = null;
            this._isloggedin = false;
            this.emitChange();
            break;
          case _constantsActionTypes2['default'].SIGNUP_USER:
            this._user = action.user;
            this.emitChange();
            break;
          case _constantsActionTypes2['default'].TOKEN_VERIFIED:
            this._user = action.user;
            this.emitChange();
          default:
            break;
        }
      }
    }, {
      key: 'isLoginFailed',
      value: function isLoginFailed() {
        return this._failedLogin;
      }
    }, {
      key: 'isLoggedIn',
      value: function isLoggedIn() {
        //console.log('LoginStore.isLoggedIn()| :', this._isloggedin);
        return this._isloggedin;
      }
    }, {
      key: 'user',
      get: function get() {
        return this._user;
      }
    }, {
      key: 'jwt',
      get: function get() {
        return this._jwt;
      }
    }]);
  
    return LoginStore;
  })(_BaseStore3['default']);
  
  exports['default'] = new LoginStore();
  module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex
  var ctx      = __webpack_require__(22)
    , IObject  = __webpack_require__(44)
    , toObject = __webpack_require__(23)
    , toLength = __webpack_require__(12);
  module.exports = function(TYPE){
    var IS_MAP        = TYPE == 1
      , IS_FILTER     = TYPE == 2
      , IS_SOME       = TYPE == 3
      , IS_EVERY      = TYPE == 4
      , IS_FIND_INDEX = TYPE == 6
      , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
    return function($this, callbackfn, that){
      var O      = toObject($this)
        , self   = IObject(O)
        , f      = ctx(callbackfn, that, 3)
        , length = toLength(self.length)
        , index  = 0
        , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
        , val, res;
      for(;length > index; index++)if(NO_HOLES || index in self){
        val = self[index];
        res = f(val, index, O);
        if(TYPE){
          if(IS_MAP)result[index] = res;            // map
          else if(res)switch(TYPE){
            case 3: return true;                    // some
            case 5: return val;                     // find
            case 6: return index;                   // findIndex
            case 2: result.push(val);               // filter
          } else if(IS_EVERY)return false;          // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  // getting tag from 19.1.3.6 Object.prototype.toString()
  var cof = __webpack_require__(21)
    , TAG = __webpack_require__(8)('toStringTag')
    // ES3 wrong here
    , ARG = cof(function(){ return arguments; }()) == 'Arguments';
  
  module.exports = function(it){
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
      // builtinTag case
      : ARG ? cof(O)
      // ES3 arguments fallback
      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var global     = __webpack_require__(6)
    , $def       = __webpack_require__(1)
    , forOf      = __webpack_require__(30)
    , strictNew  = __webpack_require__(47);
  
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
    var Base  = global[NAME]
      , C     = Base
      , ADDER = IS_MAP ? 'set' : 'add'
      , proto = C && C.prototype
      , O     = {};
    var fixMethod = function(KEY){
      var fn = proto[KEY];
      __webpack_require__(15)(proto, KEY,
        KEY == 'delete' ? function(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'has' ? function has(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'get' ? function get(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
      );
    };
    if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !__webpack_require__(7)(function(){
      new C().entries().next();
    }))){
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      __webpack_require__(45)(C.prototype, methods);
    } else {
      var inst  = new C
        , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
        , buggyZero;
      // wrap for init collections from iterable
      if(!__webpack_require__(51)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
        C = wrapper(function(target, iterable){
          strictNew(target, C, NAME);
          var that = new Base;
          if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      IS_WEAK || inst.forEach(function(val, key){
        buggyZero = 1 / key === -Infinity;
      });
      // fix converting -0 key to +0
      if(buggyZero){
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      // + fix .add & .set for chaining
      if(buggyZero || chain !== inst)fixMethod(ADDER);
      // weak collections should not contains .clear method
      if(IS_WEAK && proto.clear)delete proto.clear;
    }
  
    __webpack_require__(32)(C, NAME);
  
    O[NAME] = C;
    $def($def.G + $def.W + $def.F * (C != Base), O);
  
    if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
  
    return C;
  };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  module.exports = function(KEY, length, exec){
    var defined  = __webpack_require__(19)
      , SYMBOL   = __webpack_require__(8)(KEY)
      , original = ''[KEY];
    if(__webpack_require__(7)(function(){
      var O = {};
      O[SYMBOL] = function(){ return 7; };
      return ''[KEY](O) != 7;
    })){
      __webpack_require__(15)(String.prototype, KEY, exec(defined, SYMBOL, original));
      __webpack_require__(13)(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function(string, arg){ return original.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function(string){ return original.call(string, this); }
      );
    }
  };

/***/ },
/* 43 */
/***/ function(module, exports) {

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  module.exports = function(fn, args, that){
    var un = that === undefined;
    switch(args.length){
      case 0: return un ? fn()
                        : fn.call(that);
      case 1: return un ? fn(args[0])
                        : fn.call(that, args[0]);
      case 2: return un ? fn(args[0], args[1])
                        : fn.call(that, args[0], args[1]);
      case 3: return un ? fn(args[0], args[1], args[2])
                        : fn.call(that, args[0], args[1], args[2]);
      case 4: return un ? fn(args[0], args[1], args[2], args[3])
                        : fn.call(that, args[0], args[1], args[2], args[3]);
    } return              fn.apply(that, args);
  };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  // indexed object, fallback for non-array-like ES3 strings
  var cof = __webpack_require__(21);
  module.exports = 0 in Object('z') ? Object : function(it){
    return cof(it) == 'String' ? it.split('') : Object(it);
  };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  var $redef = __webpack_require__(15);
  module.exports = function(target, src){
    for(var key in src)$redef(target, key, src[key]);
    return target;
  };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $       = __webpack_require__(2)
    , SPECIES = __webpack_require__(8)('species');
  module.exports = function(C){
    if(__webpack_require__(16) && !(SPECIES in C))$.setDesc(C, SPECIES, {
      configurable: true,
      get: function(){ return this; }
    });
  };

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = function(it, Constructor, name){
    if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
    return it;
  };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _flux = __webpack_require__(98);
  
  exports['default'] = new _flux.Dispatcher();
  module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports) {

  // 20.2.2.14 Math.expm1(x)
  module.exports = Math.expm1 || function expm1(x){
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
  };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var LIBRARY         = __webpack_require__(52)
    , $def            = __webpack_require__(1)
    , $redef          = __webpack_require__(15)
    , hide            = __webpack_require__(13)
    , has             = __webpack_require__(11)
    , SYMBOL_ITERATOR = __webpack_require__(8)('iterator')
    , Iterators       = __webpack_require__(31)
    , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
    , FF_ITERATOR     = '@@iterator'
    , KEYS            = 'keys'
    , VALUES          = 'values';
  var returnThis = function(){ return this; };
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
    __webpack_require__(75)(Constructor, NAME, next);
    var createMethod = function(kind){
      switch(kind){
        case KEYS: return function keys(){ return new Constructor(this, kind); };
        case VALUES: return function values(){ return new Constructor(this, kind); };
      } return function entries(){ return new Constructor(this, kind); };
    };
    var TAG      = NAME + ' Iterator'
      , proto    = Base.prototype
      , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
      , _default = _native || createMethod(DEFAULT)
      , methods, key;
    // Fix native
    if(_native){
      var IteratorPrototype = __webpack_require__(2).getProto(_default.call(new Base));
      // Set @@toStringTag to native iterators
      __webpack_require__(32)(IteratorPrototype, TAG, true);
      // FF fix
      if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
    }
    // Define iterator
    if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
    // Plug for library
    Iterators[NAME] = _default;
    Iterators[TAG]  = returnThis;
    if(DEFAULT){
      methods = {
        keys:    IS_SET            ? _default : createMethod(KEYS),
        values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if(FORCE)for(key in methods){
        if(!(key in proto))$redef(proto, key, methods[key]);
      } else $def($def.P + $def.F * BUGGY, NAME, methods);
    }
  };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  var SYMBOL_ITERATOR = __webpack_require__(8)('iterator')
    , SAFE_CLOSING    = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function(){ SAFE_CLOSING = true; };
    Array.from(riter, function(){ throw 2; });
  } catch(e){ /* empty */ }
  module.exports = function(exec){
    if(!SAFE_CLOSING)return false;
    var safe = false;
    try {
      var arr  = [7]
        , iter = arr[SYMBOL_ITERATOR]();
      iter.next = function(){ safe = true; };
      arr[SYMBOL_ITERATOR] = function(){ return iter; };
      exec(arr);
    } catch(e){ /* empty */ }
    return safe;
  };

/***/ },
/* 52 */
/***/ function(module, exports) {

  module.exports = false;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var getDesc  = __webpack_require__(2).getDesc
    , isObject = __webpack_require__(3)
    , anObject = __webpack_require__(4);
  var check = function(O, proto){
    anObject(O);
    if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
      ? function(buggy, set){
          try {
            set = __webpack_require__(22)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
            set({}, []);
          } catch(e){ buggy = true; }
          return function setPrototypeOf(O, proto){
            check(O, proto);
            if(buggy)O.__proto__ = proto;
            else set(O, proto);
            return O;
          };
        }()
      : undefined),
    check: check
  };

/***/ },
/* 54 */
/***/ function(module, exports) {

  // 20.2.2.28 Math.sign(x)
  module.exports = Math.sign || function sign(x){
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  // true  -> String#at
  // false -> String#codePointAt
  var toInteger = __webpack_require__(34)
    , defined   = __webpack_require__(19);
  module.exports = function(TO_STRING){
    return function(that, pos){
      var s = String(defined(that))
        , i = toInteger(pos)
        , l = s.length
        , a, b;
      if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l
        || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
          ? TO_STRING ? s.charAt(i) : a
          : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  // helper for String#{startsWith, endsWith, includes}
  var defined = __webpack_require__(19)
    , cof     = __webpack_require__(21);
  
  module.exports = function(that, searchString, NAME){
    if(cof(searchString) == 'RegExp')throw TypeError('String#' + NAME + " doesn't accept regex!");
    return String(defined(that));
  };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim = function(string, TYPE){
    string = String(defined(string));
    if(TYPE & 1)string = string.replace(ltrim, '');
    if(TYPE & 2)string = string.replace(rtrim, '');
    return string;
  };
  
  var $def    = __webpack_require__(1)
    , defined = __webpack_require__(19)
    , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
    , space   = '[' + spaces + ']'
    , non     = '\u200b\u0085'
    , ltrim   = RegExp('^' + space + space + '*')
    , rtrim   = RegExp(space + space + '*$');
  
  module.exports = function(KEY, exec){
    var exp  = {};
    exp[KEY] = exec(trim);
    $def($def.P + $def.F * __webpack_require__(7)(function(){
      return !!spaces[KEY]() || non[KEY]() != non;
    }), 'String', exp);
  };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LoginPageLess = __webpack_require__(238);
  
  var _LoginPageLess2 = _interopRequireDefault(_LoginPageLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Login = __webpack_require__(220);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _LoadingPage = __webpack_require__(219);
  
  var _LoadingPage2 = _interopRequireDefault(_LoadingPage);
  
  var _RegisterPage = __webpack_require__(59);
  
  var _RegisterPage2 = _interopRequireDefault(_RegisterPage);
  
  var _servicesRouterContainer = __webpack_require__(93);
  
  var _servicesRouterContainer2 = _interopRequireDefault(_servicesRouterContainer);
  
  var _storesLoginStore = __webpack_require__(37);
  
  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);
  
  var _reactLibExecutionEnvironment = __webpack_require__(28);
  
  // import Link from '../../utils/Link';
  // import AppActions from '../../actions/AppActions';
  // import AuthService from '../../auth/AuthService';
  
  var LoginPage = (function (_Component) {
    _inherits(LoginPage, _Component);
  
    _createClass(LoginPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function LoginPage() {
      _classCallCheck(this, _LoginPage);
  
      _get(Object.getPrototypeOf(_LoginPage.prototype), 'constructor', this).call(this);
      this.state = {
        failed: false
      };
    }
  
    _createClass(LoginPage, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _storesLoginStore2['default'].removeChangeListener(this.changeListener);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.changeListener = this._onLoginStoreChange.bind(this);
        _storesLoginStore2['default'].addChangeListener(this.changeListener);
      }
    }, {
      key: '_onLoginStoreChange',
      value: function _onLoginStoreChange() {
        console.log('LoginPage._onLoginStoreChange()| LoginStore changed!!! isLoginFailed?', _storesLoginStore2['default'].isLoginFailed());
        if (_storesLoginStore2['default'].isLoginFailed()) {
          this.setState({ failed: true });
        }
        if (_storesLoginStore2['default'].isLoggedIn()) {
          console.log('LoginPage._onLoginStoreChange()| RouterContainer.get().getCurrentQuery():', _servicesRouterContainer2['default'].get().getCurrentQuery());
          var nextPath = _servicesRouterContainer2['default'].get().getCurrentQuery() && _servicesRouterContainer2['default'].get().getCurrentQuery().redirect || '/';
          console.log('LoginPage._onLoginStoreChange()| nextPath:', nextPath);
          _servicesRouterContainer2['default'].get().transitionTo(nextPath);
        }
        //this.setState(this._getLoginState());
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate() {
        console.log('LoginPage.componentWillUpdate()|', _storesLoginStore2['default'].isLoggedIn());
        // if(LoginStore.isLoggedIn()) {
        //   console.log('LoginPage.componentWillUpdate()| RouterContainer.get().getCurrentQuery():', RouterContainer.get().getCurrentQuery());
        //   var nextPath = RouterContainer.get().getCurrentQuery() && RouterContainer.get().getCurrentQuery().redirect || '/';
        //   console.log('LoginPage.componentWillUpdate()| nextPath:', nextPath);
        //   RouterContainer.get().transitionTo(nextPath);
        // }
      }
    }, {
      key: 'render',
      value: function render() {
  
        console.log('LoginPage.render()| state', this.state);
        console.log('LoginPage.render()| props', this.props);
        console.log('LoginPage.render()| loading page?', this.props.rememberuser && !this.state.failed);
  
        var title = 'Login to scomart';
        this.context.onSetTitle(title);
        return this.props.rememberuser && !this.state.failed ? _react2['default'].createElement(_LoadingPage2['default'], null) : _react2['default'].createElement(
          'div',
          { className: 'LoginPage' },
          _react2['default'].createElement(_Login2['default'], { className: 'Login' }),
          _react2['default'].createElement(_RegisterPage2['default'], { className: 'Register' })
        );
      }
    }]);
  
    var _LoginPage = LoginPage;
    LoginPage = (0, _decoratorsWithStyles2['default'])(_LoginPageLess2['default'])(LoginPage) || LoginPage;
    return LoginPage;
  })(_react.Component);
  
  exports['default'] = LoginPage;
  module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _RegisterPageLess = __webpack_require__(242);
  
  var _RegisterPageLess2 = _interopRequireDefault(_RegisterPageLess);
  
  var _TextBox = __webpack_require__(60);
  
  var _TextBox2 = _interopRequireDefault(_TextBox);
  
  var _classnames = __webpack_require__(38);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _servicesAuthService = __webpack_require__(36);
  
  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);
  
  var _storesLoginStore = __webpack_require__(37);
  
  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);
  
  var RegisterPage = (function (_React$Component) {
    _inherits(RegisterPage, _React$Component);
  
    _createClass(RegisterPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function RegisterPage() {
      _classCallCheck(this, _RegisterPage);
  
      _get(Object.getPrototypeOf(_RegisterPage.prototype), 'constructor', this).call(this);
      this.state = {
        name: '',
        email: '',
        address: '',
        signUpError: false
      };
    }
  
    _createClass(RegisterPage, [{
      key: '_getUser',
      value: function _getUser() {
        return _storesLoginStore2['default'].user;
      }
    }, {
      key: '_onchange',
      value: function _onchange(event) {
        //console.log('RegisterPage._onchange()| event:', event.target);
        var controlState = {};
        controlState[event.target.id] = event.target.value;
        //console.log('RegisterPage._onchange()| controlState:', controlState);
        this.setState(controlState);
      }
    }, {
      key: 'signUp',
      value: function signUp(e) {
        var _this = this;
  
        e.preventDefault();
  
        //alert(this.state);
        console.log('RegisterPage.signUp()| state:', this.state, e);
        if (this.state.name && this.state.email) {
          var user = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address
          };
          _servicesAuthService2['default'].signUp(user, function (response) {
            console.log('AMIT response:', response);
            _this.setState({ signUpError: response.body });
          });
        } else {
          this.setState({ signUpError: {
              message: 'Name and Email are mandatory'
            } });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        console.log('RegisterPage.render()| signUpError:', this.state.signUpError);
        var title = 'New User Registration!';
        this.context.onSetTitle(title);
        var user = this._getUser();
        var component = undefined;
        if (user) {
          //let userEmail = ;
          component = _react2['default'].createElement(
            'div',
            null,
            'Hello ',
            _react2['default'].createElement(
              'b',
              null,
              user.name
            ),
            ', ',
            _react2['default'].createElement('br', null),
            'We have sent the verification email to ',
            _react2['default'].createElement(
              'a',
              { href: 'mailto:' + user.email },
              user.email
            ),
            '. Please fllow the instruction provided in the email to complete your registration'
          );
        } else {
          var errorComponent = undefined;
          if (this.state.signUpError && !this.state.signUpError.success) {
            errorComponent = _react2['default'].createElement(
              'div',
              { className: 'RegisterPage-error' },
              _react2['default'].createElement(
                'b',
                null,
                this.state.signUpError.message
              )
            );
          }
  
          component = _react2['default'].createElement(
            'form',
            null,
            _react2['default'].createElement(
              'b',
              null,
              title
            ),
            errorComponent,
            _react2['default'].createElement(_TextBox2['default'], { id: 'name', className: 'RegisterPage-textbox', ref: 'name', value: this.name, type: 'text', placeholder: 'Name', onChange: this._onchange.bind(this) }),
            _react2['default'].createElement(_TextBox2['default'], { id: 'email', className: 'RegisterPage-textbox', ref: 'email', value: this.email, type: 'text', placeholder: 'email id', onChange: this._onchange.bind(this) }),
            _react2['default'].createElement('input', { type: 'submit', value: 'Sign up', onClick: this.signUp.bind(this) })
          );
        }
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'RegisterPage-container') },
          component
        );
      }
    }]);
  
    var _RegisterPage = RegisterPage;
    RegisterPage = (0, _decoratorsWithStyles2['default'])(_RegisterPageLess2['default'])(RegisterPage) || RegisterPage;
    return RegisterPage;
  })(_react2['default'].Component);
  
  exports['default'] = RegisterPage;
  module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(38);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _TextBoxLess = __webpack_require__(244);
  
  var _TextBoxLess2 = _interopRequireDefault(_TextBoxLess);
  
  var TextBox = (function () {
    function TextBox() {
      _classCallCheck(this, _TextBox);
    }
  
    _createClass(TextBox, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'TextBox') },
          _react2['default'].createElement(
            'span',
            { className: 'TextBox-span' },
            this.props.textboxLabel
          ),
          this.props.maxLines > 1 ? _react2['default'].createElement('textarea', _extends({}, this.props, { className: (0, _classnames2['default'])(this.props.controlClassName, "TextBox-input"), ref: 'input', key: 'input', rows: this.props.maxLines })) : _react2['default'].createElement('input', _extends({}, this.props, { className: (0, _classnames2['default'])(this.props.controlClassName, "TextBox-input"), ref: 'input', key: 'input' }))
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        maxLines: _react.PropTypes.number,
        textboxLabel: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        maxLines: 1
      },
      enumerable: true
    }]);
  
    var _TextBox = TextBox;
    TextBox = (0, _decoratorsWithStyles2['default'])(_TextBoxLess2['default'])(TextBox) || TextBox;
    return TextBox;
  })();
  
  exports['default'] = TextBox;
  module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports) {

  module.exports = require("events");

/***/ },
/* 62 */
/***/ function(module, exports) {

  module.exports = require("superagent");

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  // false -> Array#indexOf
  // true  -> Array#includes
  var toIObject = __webpack_require__(17)
    , toLength  = __webpack_require__(12)
    , toIndex   = __webpack_require__(33);
  module.exports = function(IS_INCLUDES){
    return function($this, el, fromIndex){
      var O      = toIObject($this)
        , length = toLength(O.length)
        , index  = toIndex(fromIndex, length)
        , value;
      // Array#includes uses SameValueZero equality algorithm
      if(IS_INCLUDES && el != el)while(length > index){
        value = O[index++];
        if(value != value)return true;
      // Array#toIndex ignores holes, Array#includes - not
      } else for(;length > index; index++)if(IS_INCLUDES || index in O){
        if(O[index] === el)return IS_INCLUDES || index;
      } return !IS_INCLUDES && -1;
    };
  };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $            = __webpack_require__(2)
    , hide         = __webpack_require__(13)
    , ctx          = __webpack_require__(22)
    , species      = __webpack_require__(46)
    , strictNew    = __webpack_require__(47)
    , defined      = __webpack_require__(19)
    , forOf        = __webpack_require__(30)
    , step         = __webpack_require__(76)
    , ID           = __webpack_require__(26)('id')
    , $has         = __webpack_require__(11)
    , isObject     = __webpack_require__(3)
    , isExtensible = Object.isExtensible || isObject
    , SUPPORT_DESC = __webpack_require__(16)
    , SIZE         = SUPPORT_DESC ? '_s' : 'size'
    , id           = 0;
  
  var fastKey = function(it, create){
    // return primitive with prefix
    if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if(!$has(it, ID)){
      // can't set id to frozen object
      if(!isExtensible(it))return 'F';
      // not necessary to add id
      if(!create)return 'E';
      // add missing object id
      hide(it, ID, ++id);
    // return object id with prefix
    } return 'O' + it[ID];
  };
  
  var getEntry = function(that, key){
    // fast case
    var index = fastKey(key), entry;
    if(index !== 'F')return that._i[index];
    // frozen object case
    for(entry = that._f; entry; entry = entry.n){
      if(entry.k == key)return entry;
    }
  };
  
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
      var C = wrapper(function(that, iterable){
        strictNew(that, C, NAME);
        that._i = $.create(null); // index
        that._f = undefined;      // first entry
        that._l = undefined;      // last entry
        that[SIZE] = 0;           // size
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
      });
      __webpack_require__(45)(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear(){
          for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
            entry.r = true;
            if(entry.p)entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function(key){
          var that  = this
            , entry = getEntry(that, key);
          if(entry){
            var next = entry.n
              , prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if(prev)prev.n = next;
            if(next)next.p = prev;
            if(that._f == entry)that._f = next;
            if(that._l == entry)that._l = prev;
            that[SIZE]--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /*, that = undefined */){
          var f = ctx(callbackfn, arguments[1], 3)
            , entry;
          while(entry = entry ? entry.n : this._f){
            f(entry.v, entry.k, this);
            // revert to the last existing entry
            while(entry && entry.r)entry = entry.p;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key){
          return !!getEntry(this, key);
        }
      });
      if(SUPPORT_DESC)$.setDesc(C.prototype, 'size', {
        get: function(){
          return defined(this[SIZE]);
        }
      });
      return C;
    },
    def: function(that, key, value){
      var entry = getEntry(that, key)
        , prev, index;
      // change existing entry
      if(entry){
        entry.v = value;
      // create new entry
      } else {
        that._l = entry = {
          i: index = fastKey(key, true), // <- index
          k: key,                        // <- key
          v: value,                      // <- value
          p: prev = that._l,             // <- previous entry
          n: undefined,                  // <- next entry
          r: false                       // <- removed
        };
        if(!that._f)that._f = entry;
        if(prev)prev.n = entry;
        that[SIZE]++;
        // add to index
        if(index !== 'F')that._i[index] = entry;
      } return that;
    },
    getEntry: getEntry,
    setStrong: function(C, NAME, IS_MAP){
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      __webpack_require__(50)(C, NAME, function(iterated, kind){
        this._t = iterated;  // target
        this._k = kind;      // kind
        this._l = undefined; // previous
      }, function(){
        var that  = this
          , kind  = that._k
          , entry = that._l;
        // revert to the last existing entry
        while(entry && entry.r)entry = entry.p;
        // get next entry
        if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
          // or finish the iteration
          that._t = undefined;
          return step(1);
        }
        // return step by kind
        if(kind == 'keys'  )return step(0, entry.k);
        if(kind == 'values')return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
  
      // add [@@species], 23.1.2.2, 23.2.2.2
      species(C);
      species(__webpack_require__(18)[NAME]); // for wrapper
    }
  };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var forOf   = __webpack_require__(30)
    , classof = __webpack_require__(40);
  module.exports = function(NAME){
    return function toJSON(){
      if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
      var arr = [];
      forOf(this, false, arr.push, arr);
      return arr;
    };
  };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var hide         = __webpack_require__(13)
    , anObject     = __webpack_require__(4)
    , strictNew    = __webpack_require__(47)
    , forOf        = __webpack_require__(30)
    , method       = __webpack_require__(39)
    , WEAK         = __webpack_require__(26)('weak')
    , isObject     = __webpack_require__(3)
    , $has         = __webpack_require__(11)
    , isExtensible = Object.isExtensible || isObject
    , find         = method(5)
    , findIndex    = method(6)
    , id           = 0;
  
  // fallback for frozen keys
  var frozenStore = function(that){
    return that._l || (that._l = new FrozenStore);
  };
  var FrozenStore = function(){
    this.a = [];
  };
  var findFrozen = function(store, key){
    return find(store.a, function(it){
      return it[0] === key;
    });
  };
  FrozenStore.prototype = {
    get: function(key){
      var entry = findFrozen(this, key);
      if(entry)return entry[1];
    },
    has: function(key){
      return !!findFrozen(this, key);
    },
    set: function(key, value){
      var entry = findFrozen(this, key);
      if(entry)entry[1] = value;
      else this.a.push([key, value]);
    },
    'delete': function(key){
      var index = findIndex(this.a, function(it){
        return it[0] === key;
      });
      if(~index)this.a.splice(index, 1);
      return !!~index;
    }
  };
  
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
      var C = wrapper(function(that, iterable){
        strictNew(that, C, NAME);
        that._i = id++;      // collection id
        that._l = undefined; // leak store for frozen objects
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
      });
      __webpack_require__(45)(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function(key){
          if(!isObject(key))return false;
          if(!isExtensible(key))return frozenStore(this)['delete'](key);
          return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key){
          if(!isObject(key))return false;
          if(!isExtensible(key))return frozenStore(this).has(key);
          return $has(key, WEAK) && $has(key[WEAK], this._i);
        }
      });
      return C;
    },
    def: function(that, key, value){
      if(!isExtensible(anObject(key))){
        frozenStore(that).set(key, value);
      } else {
        $has(key, WEAK) || hide(key, WEAK, {});
        key[WEAK][that._i] = value;
      } return that;
    },
    frozenStore: frozenStore,
    WEAK: WEAK
  };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__(3)
    , document = __webpack_require__(6).document
    // in old IE typeof document.createElement is 'object'
    , is = isObject(document) && isObject(document.createElement);
  module.exports = function(it){
    return is ? document.createElement(it) : {};
  };

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  // all enumerable object keys, includes symbols
  var $ = __webpack_require__(2);
  module.exports = function(it){
    var keys       = $.getKeys(it)
      , getSymbols = $.getSymbols;
    if(getSymbols){
      var symbols = getSymbols(it)
        , isEnum  = $.isEnum
        , i       = 0
        , key;
      while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
    }
    return keys;
  };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 21.2.5.3 get RegExp.prototype.flags
  var anObject = __webpack_require__(4);
  module.exports = function(){
    var that   = anObject(this)
      , result = '';
    if(that.global)result += 'g';
    if(that.ignoreCase)result += 'i';
    if(that.multiline)result += 'm';
    if(that.unicode)result += 'u';
    if(that.sticky)result += 'y';
    return result;
  };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var toString  = {}.toString
    , toIObject = __webpack_require__(17)
    , getNames  = __webpack_require__(2).getNames;
  
  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];
  
  var getWindowNames = function(it){
    try {
      return getNames(it);
    } catch(e){
      return windowNames.slice();
    }
  };
  
  module.exports.get = function getOwnPropertyNames(it){
    if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
    return getNames(toIObject(it));
  };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  // check on default Array iterator
  var Iterators = __webpack_require__(31)
    , ITERATOR  = __webpack_require__(8)('iterator');
  module.exports = function(it){
    return (Iterators.Array || Array.prototype[ITERATOR]) === it;
  };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.3 Number.isInteger(number)
  var isObject = __webpack_require__(3)
    , floor    = Math.floor;
  module.exports = function isInteger(it){
    return !isObject(it) && isFinite(it) && floor(it) === it;
  };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  // call something on iterator step with safe closing on error
  var anObject = __webpack_require__(4);
  module.exports = function(iterator, fn, value, entries){
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch(e){
      var ret = iterator['return'];
      if(ret !== undefined)anObject(ret.call(iterator));
      throw e;
    }
  };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $ = __webpack_require__(2)
    , IteratorPrototype = {};
  
  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  __webpack_require__(13)(IteratorPrototype, __webpack_require__(8)('iterator'), function(){ return this; });
  
  module.exports = function(Constructor, NAME, next){
    Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(25)(1,next)});
    __webpack_require__(32)(Constructor, NAME + ' Iterator');
  };

/***/ },
/* 76 */
/***/ function(module, exports) {

  module.exports = function(done, value){
    return {value: value, done: !!done};
  };

/***/ },
/* 77 */
/***/ function(module, exports) {

  // 20.2.2.20 Math.log1p(x)
  module.exports = Math.log1p || function log1p(x){
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
  };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  var $         = __webpack_require__(2)
    , toIObject = __webpack_require__(17);
  module.exports = function(isEntries){
    return function(it){
      var O      = toIObject(it)
        , keys   = $.getKeys(O)
        , length = keys.length
        , i      = 0
        , result = Array(length)
        , key;
      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
      else while(length > i)result[i] = O[keys[i++]];
      return result;
    };
  };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  // all object keys, includes non-enumerable and symbols
  var $        = __webpack_require__(2)
    , anObject = __webpack_require__(4)
    , Reflect  = __webpack_require__(6).Reflect;
  module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
    var keys       = $.getNames(anObject(it))
      , getSymbols = $.getSymbols;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };

/***/ },
/* 80 */
/***/ function(module, exports) {

  module.exports = Object.is || function is(x, y){
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  var global = __webpack_require__(6)
    , SHARED = '__core-js_shared__'
    , store  = global[SHARED] || (global[SHARED] = {});
  module.exports = function(key){
    return store[key] || (store[key] = {});
  };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/ljharb/proposal-string-pad-left-right
  var toLength = __webpack_require__(12)
    , repeat   = __webpack_require__(83)
    , defined  = __webpack_require__(19);
  
  module.exports = function(that, maxLength, fillString, left){
    var S            = String(defined(that))
      , stringLength = S.length
      , fillStr      = fillString === undefined ? ' ' : String(fillString)
      , intMaxLength = toLength(maxLength);
    if(intMaxLength <= stringLength)return S;
    if(fillStr == '')fillStr = ' ';
    var fillLen = intMaxLength - stringLength
      , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
    if(stringFiller.length > fillLen)stringFiller = left
      ? stringFiller.slice(stringFiller.length - fillLen)
      : stringFiller.slice(0, fillLen);
    return left ? stringFiller + S : S + stringFiller;
  };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var toInteger = __webpack_require__(34)
    , defined   = __webpack_require__(19);
  
  module.exports = function repeat(count){
    var str = String(defined(this))
      , res = ''
      , n   = toInteger(count);
    if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
    for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
    return res;
  };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var ctx                = __webpack_require__(22)
    , invoke             = __webpack_require__(43)
    , html               = __webpack_require__(71)
    , cel                = __webpack_require__(67)
    , global             = __webpack_require__(6)
    , process            = global.process
    , setTask            = global.setImmediate
    , clearTask          = global.clearImmediate
    , MessageChannel     = global.MessageChannel
    , counter            = 0
    , queue              = {}
    , ONREADYSTATECHANGE = 'onreadystatechange'
    , defer, channel, port;
  var run = function(){
    var id = +this;
    if(queue.hasOwnProperty(id)){
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };
  var listner = function(event){
    run.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if(!setTask || !clearTask){
    setTask = function setImmediate(fn){
      var args = [], i = 1;
      while(arguments.length > i)args.push(arguments[i++]);
      queue[++counter] = function(){
        invoke(typeof fn == 'function' ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id){
      delete queue[id];
    };
    // Node.js 0.8-
    if(__webpack_require__(21)(process) == 'process'){
      defer = function(id){
        process.nextTick(ctx(run, id, 1));
      };
    // Browsers with MessageChannel, includes WebWorkers
    } else if(MessageChannel){
      channel = new MessageChannel;
      port    = channel.port2;
      channel.port1.onmessage = listner;
      defer = ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScript){
      defer = function(id){
        global.postMessage(id + '', '*');
      };
      global.addEventListener('message', listner, false);
    // IE8-
    } else if(ONREADYSTATECHANGE in cel('script')){
      defer = function(id){
        html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
          html.removeChild(this);
          run.call(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function(id){
        setTimeout(ctx(run, id, 1), 0);
      };
    }
  }
  module.exports = {
    set:   setTask,
    clear: clearTask
  };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  var classof   = __webpack_require__(40)
    , ITERATOR  = __webpack_require__(8)('iterator')
    , Iterators = __webpack_require__(31);
  module.exports = __webpack_require__(18).getIteratorMethod = function(it){
    if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
  };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var setUnscope = __webpack_require__(27)
    , step       = __webpack_require__(76)
    , Iterators  = __webpack_require__(31)
    , toIObject  = __webpack_require__(17);
  
  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  __webpack_require__(50)(Array, 'Array', function(iterated, kind){
    this._t = toIObject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function(){
    var O     = this._t
      , kind  = this._k
      , index = this._i++;
    if(!O || index >= O.length){
      this._t = undefined;
      return step(1);
    }
    if(kind == 'keys'  )return step(0, index);
    if(kind == 'values')return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  
  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators.Arguments = Iterators.Array;
  
  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dispatchersDispatcher = __webpack_require__(48);
  
  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);
  
  var _constantsActionTypes = __webpack_require__(35);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  var _servicesRouterContainer = __webpack_require__(93);
  
  var _servicesRouterContainer2 = _interopRequireDefault(_servicesRouterContainer);
  
  var _superagent = __webpack_require__(62);
  
  var _superagent2 = _interopRequireDefault(_superagent);
  
  var jwtKey = 'scomart-jwt';
  exports['default'] = {
    loginUser: function loginUser(jwt, user) {
      console.log('LoginAction.loginUser()| supplied jwt:', jwt);
  
      if (jwt) {
  
        console.log('LoginAction.verifyJWT()| Saving jwt in localStorage for user...', document.cookie);
        localStorage.setItem(jwtKey, jwt);
        document.cookie = "rememberuser=true";
        // Send the action to all stores through the Dispatcher
        _dispatchersDispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].LOGIN_USER,
          jwt: jwt,
          user: user
        });
      } else {
        console.log('LoginAction.loginUser()| Authentication Fail!!!');
      }
    },
  
    loginFailed: function loginFailed() {
      console.log('LoginAction.loginFailed()| ');
      _dispatchersDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].LOGIN_FAILED
      });
    },
  
    logoutUser: function logoutUser() {
      console.log('LoginAction.logoutUser()...');
      document.cookie = "rememberuser=false";
      _servicesRouterContainer2['default'].get().transitionTo('/login');
      localStorage.removeItem(jwtKey);
      _dispatchersDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].LOGOUT_USER
      });
    },
  
    signUpUser: function signUpUser(user) {
      //RouterContainer.get().transitionTo('/setpassword?emailsent=1');
      _dispatchersDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].SIGNUP_USER,
        user: user
      });
    },
  
    // TODO: refator and move REST call to authservice.js
    verifyUserToken: function verifyUserToken(jwt) {
      console.log('LoginAction.verifyUserToken()| supplied jwt:', jwt);
  
      if (jwt) {
        _superagent2['default'].get('/api/verifyusertoken').set('x-scomart-access-token', jwt).end(function (err, response) {
          console.log('LoginAction.verifyUserToken() rest call|  response', response.body);
          if (!err && response && response.body && response.body.success) {
            console.log('LoginAction.verifyUserToken()| Authentication success!!!', response.body.user);
  
            // Send the action to all stores through the Dispatcher
  
            _dispatchersDispatcher2['default'].dispatch({
              type: _constantsActionTypes2['default'].TOKEN_VERIFIED,
              user: response.body.user
            });
          } else {
            console.log('LoginAction.verifyUserToken()| Authentication Fail!!!');
            _dispatchersDispatcher2['default'].dispatch({
              type: _constantsActionTypes2['default'].TOKEN_VERIFIED,
              user: {
                invalidToken: true
              }
            });
            //console.log('LoginAction.verifyUserToken()| Err:', err);
          }
        });
      }
    }
  };
  module.exports = exports['default'];

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = __webpack_require__(24);
  
  var _storesLoginStore = __webpack_require__(37);
  
  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);
  
  var _storesAppStore = __webpack_require__(230);
  
  var _storesAppStore2 = _interopRequireDefault(_storesAppStore);
  
  var _servicesAuthService = __webpack_require__(36);
  
  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);
  
  var _AppLess = __webpack_require__(233);
  
  var _AppLess2 = _interopRequireDefault(_AppLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _decoratorsWithContext = __webpack_require__(226);
  
  var _decoratorsWithContext2 = _interopRequireDefault(_decoratorsWithContext);
  
  var _Header = __webpack_require__(218);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(216);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(217);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _LoginPage = __webpack_require__(58);
  
  var _LoginPage2 = _interopRequireDefault(_LoginPage);
  
  var _reactLibExecutionEnvironment = __webpack_require__(28);
  
  var _decoratorsWithAuthentication = __webpack_require__(91);
  
  var _decoratorsWithAuthentication2 = _interopRequireDefault(_decoratorsWithAuthentication);
  
  var App = (function (_React$Component) {
    _inherits(App, _React$Component);
  
    _createClass(App, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
  
      // static propTypes = {
      //   path: PropTypes.string.isRequired
      // };
  
      enumerable: true
    }]);
  
    function App() {
      _classCallCheck(this, _App);
  
      _get(Object.getPrototypeOf(_App.prototype), 'constructor', this).call(this);
      this.state = this._getLoginState();
    }
  
    //export default App;
  
    _createClass(App, [{
      key: '_getLoginState',
      value: function _getLoginState() {
        return {
          userLoggedIn: _storesLoginStore2['default'].isLoggedIn(),
          user: _storesLoginStore2['default'].user
        };
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _storesLoginStore2['default'].removeChangeListener(this.changeListener);
        _storesAppStore2['default'].removeChangeListener(this.changePageListener);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        this.changePageListener = this._onPageChange.bind(this);
        _storesLoginStore2['default'].addChangeListener(this.changeListener);
        _storesAppStore2['default'].addChangeListener(this.changePageListener);
      }
    }, {
      key: '_onPageChange',
      value: function _onPageChange() {
        console.log('App._onPageChange()| AppStore changed!!!');
        //this.setState(this._getLoginState());
      }
    }, {
      key: '_onChange',
      value: function _onChange() {
        console.log('App._onChange()| LoginStore changed!!!');
        this.setState(this._getLoginState());
      }
    }, {
      key: 'render',
      value: function render() {
        console.log('App.Render()| client?:', _reactLibExecutionEnvironment.canUseDOM);
        console.log('App.Render()| props:', this.props);
        console.log('App.Render()| state:', this.state);
  
        this.context.onSetTitle('Scomart');
  
        if (this._getLoginState() && this._getLoginState().userLoggedIn) {
          console.log('App.Render()| user logged in...');
        } else {
          console.log('App.Render()| user NOT logged in...');
        }
  
        return _react2['default'].createElement(
          'div',
          { className: 'app-container' },
          _react2['default'].createElement(_Header2['default'], { LoginState: this.state }),
          _react2['default'].createElement(_reactRouter.RouteHandler, _extends({}, this.props, { user: this.state.user })),
          _react2['default'].createElement(_Feedback2['default'], null),
          _react2['default'].createElement(_Footer2['default'], { LoginState: this.state })
        );
      }
    }]);
  
    var _App = App;
    App = (0, _decoratorsWithStyles2['default'])(_AppLess2['default'])(App) || App;
    App = (0, _decoratorsWithContext2['default'])(App) || App;
    return App;
  })(_react2['default'].Component);
  
  exports['default'] = App;
  module.exports = exports['default'];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _UserHomePageLess = __webpack_require__(245);
  
  var _UserHomePageLess2 = _interopRequireDefault(_UserHomePageLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _decoratorsWithAuthentication = __webpack_require__(91);
  
  var _decoratorsWithAuthentication2 = _interopRequireDefault(_decoratorsWithAuthentication);
  
  var UserHomePage = (function (_React$Component) {
    _inherits(UserHomePage, _React$Component);
  
    function UserHomePage() {
      _classCallCheck(this, _UserHomePage);
  
      _get(Object.getPrototypeOf(_UserHomePage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(UserHomePage, [{
      key: 'render',
      value: function render() {
        var title = this.props.user.name;
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: 'userhome' },
          _react2['default'].createElement(
            'span',
            null,
            'User name: ',
            this.props.user.name
          ),
          _react2['default'].createElement('br', null),
          _react2['default'].createElement(
            'span',
            null,
            'user id: ',
            this.props.user.userid
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _UserHomePage = UserHomePage;
    UserHomePage = (0, _decoratorsWithStyles2['default'])(_UserHomePageLess2['default'])(UserHomePage) || UserHomePage;
    UserHomePage = (0, _decoratorsWithAuthentication2['default'])(UserHomePage) || UserHomePage;
    return UserHomePage;
  })(_react2['default'].Component);
  
  exports['default'] = UserHomePage;
  module.exports = exports['default'];

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fs = __webpack_require__(99);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(102);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _jade = __webpack_require__(253);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(252);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _Dispatcher = __webpack_require__(224);
  
  var _Dispatcher2 = _interopRequireDefault(_Dispatcher);
  
  var _constantsActionTypes = __webpack_require__(35);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = _path2['default'].join(__dirname, './content');
  
  // Check if that directory exists, print an error message if not
  _fs2['default'].exists(CONTENT_DIR, function (exists) {
    if (!exists) {
      console.error('Error: Directory \'' + CONTENT_DIR + '\' does not exist.');
    }
  });
  
  // Extract 'front matter' metadata and generate HTML
  function parseJade(uri, jadeContent) {
    var content = (0, _frontMatter2['default'])(jadeContent);
    var html = _jade2['default'].render(content.body, null, '  ');
    var page = Object.assign({ path: uri, content: html }, content.attributes);
    return page;
  }
  
  exports['default'] = {
  
    getPage: function getPage(uri) {
      // Read page content from a Jade file
      return new Promise(function (resolve) {
        var fileName = _path2['default'].join(CONTENT_DIR, (uri === '/' ? '/index' : uri) + '.jade');
        console.log('Database.getpage()| fileName:', fileName);
        _fs2['default'].readFile(fileName, { encoding: 'utf8' }, function (err, data) {
          if (err) {
            fileName = _path2['default'].join(CONTENT_DIR, uri + '/index.jade');
            _fs2['default'].readFile(fileName, { encoding: 'utf8' }, function (err2, data2) {
              resolve(err2 ? null : parseJade(uri, data2));
            });
          } else {
            resolve(parseJade(uri, data));
          }
        });
      }).then(function (page) {
        _Dispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].RECEIVE_PAGE,
          page: page });
        return Promise.resolve(page);
      });
    }
  
  };
  module.exports = exports['default'];

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _storesLoginStore = __webpack_require__(37);
  
  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);
  
  var _actionsAppActions = __webpack_require__(215);
  
  var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);
  
  var _reactLibExecutionEnvironment = __webpack_require__(28);
  
  function withAuthentication(ComposedComponent) {
    return (function (_React$Component) {
      _inherits(withAuthentication, _React$Component);
  
      _createClass(withAuthentication, null, [{
        key: 'willTransitionTo',
  
        // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her
        // to the Login page.
        /*static willTransitionTo() {
          console.log('AMIMT withAuthentication:', LoginStore.isLoggedIn());
          if (!LoginStore.isLoggedIn()) {
            console.log('AMIMT withAuthentication: user not logged in');
            AppActions.navigateTo('/login');
            //AppActions.redirect('/login', {}, {'nextPath': transition.path});
          }
        }*/
        value: function willTransitionTo(transition) {
          console.log('withAuthentication.willTransitionTo()| userLoggedin?:', _storesLoginStore2['default'].isLoggedIn());
          console.log('withAuthentication.willTransitionTo()| transition:', transition);
          console.log('withAuthentication.willTransitionTo()| canUseDOM:', _reactLibExecutionEnvironment.canUseDOM);
          if (!_storesLoginStore2['default'].isLoggedIn()) {
            console.log('withAuthentication.willTransitionTo()| user not logged in transitioning to path:', transition.path);
            transition.redirect('login', {}, transition.path);
          }
        }
      }]);
  
      function withAuthentication() {
        _classCallCheck(this, withAuthentication);
  
        _get(Object.getPrototypeOf(withAuthentication.prototype), 'constructor', this).call(this);
        this.state = this._getLoginState();
      }
  
      _createClass(withAuthentication, [{
        key: '_getLoginState',
        value: function _getLoginState() {
          return {
            userLoggedIn: _storesLoginStore2['default'].isLoggedIn(),
            user: _storesLoginStore2['default'].user,
            jwt: _storesLoginStore2['default'].jwt
          };
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.changeListener = this._onChange.bind(this);
          _storesLoginStore2['default'].addChangeListener(this.changeListener);
        }
      }, {
        key: '_onChange',
        value: function _onChange() {
          this.setState(this._getLoginState());
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          _storesLoginStore2['default'].removeChangeListener(this.changeListener);
        }
      }, {
        key: 'render',
        value: function render() {
          // if(this.state.userLoggedIn) {
          return _react2['default'].createElement(ComposedComponent, _extends({}, this.props, {
            user: this.state.user,
            jwt: this.state.jwt,
            userLoggedIn: this.state.userLoggedIn }));
          //} else {
          //  withAuthentication.willTransitionTo();
          //}
        }
      }]);
  
      return withAuthentication;
    })(_react2['default'].Component);
  }
  
  exports['default'] = withAuthentication;
  module.exports = exports['default'];

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  // eslint-disable-line no-unused-vars
  
  var _events = __webpack_require__(61);
  
  var _events2 = _interopRequireDefault(_events);
  
  var _node_modulesReactLibExecutionEnvironment = __webpack_require__(28);
  
  var eventEmitter = undefined;
  var viewport = { width: 1366, height: 768 }; // Default size for server-side rendering
  var RESIZE_EVENT = 'resize';
  
  function handleWindowResize() {
    if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
      viewport = { width: window.innerWidth, height: window.innerHeight };
      eventEmitter.emit(RESIZE_EVENT, viewport);
    }
  }
  
  function withViewport(ComposedComponent) {
    return (function (_Component) {
      _inherits(WithViewport, _Component);
  
      function WithViewport() {
        _classCallCheck(this, WithViewport);
  
        _get(Object.getPrototypeOf(WithViewport.prototype), 'constructor', this).call(this);
        this.state = {
          viewport: _node_modulesReactLibExecutionEnvironment.canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : viewport,
          isSmallViewport: _node_modulesReactLibExecutionEnvironment.canUseDOM ? this.isSmall(window.innerWidth, window.innerHeight) : this.isSmall(viewport.width, viewport.height)
        };
      }
  
      _createClass(WithViewport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (!eventEmitter) {
            eventEmitter = new _events2['default']();
            eventEmitter.setMaxListeners(1);
            window.addEventListener(RESIZE_EVENT, handleWindowResize);
            window.addEventListener('orientationchange', handleWindowResize);
          }
          // console.log'withViewport componentDidMount:', this);
          eventEmitter.on(RESIZE_EVENT, this.handleResize.bind(this));
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          eventEmitter.removeListener(RESIZE_EVENT, this.handleResize.bind(this));
          if (!eventEmitter.listeners(RESIZE_EVENT, true)) {
            window.removeventEmitterventListener(RESIZE_EVENT, handleWindowResize);
            window.removeventEmitterventListener('orientationchange', handleWindowResize);
            eventEmitter = null;
          }
        }
      }, {
        key: 'render',
        value: function render() {
          // console.log'withViewport called:',ComposedComponent);
          return _react2['default'].createElement(ComposedComponent, _extends({}, this.props, { viewport: this.state.viewport, isSmallViewport: this.state.isSmallViewport }));
        }
      }, {
        key: 'handleResize',
        value: function handleResize(value) {
          // console.log'withViewport handleResize:', value, this);
          this.setState({ viewport: value, isSmallViewport: this.isSmall(value.width) });
        }
      }, {
        key: 'isSmall',
        value: function isSmall(width, height) {
          // console.log'isSmall called', width, 'X',height);
          return width < 400 || height < 300;
        }
      }]);
  
      return WithViewport;
    })(_react.Component);
  }
  
  exports['default'] = withViewport;
  module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _router = null;
  exports["default"] = {
    set: function set(router) {
      return _router = router;
    },
    get: function get() {
      return _router;
    }
  };
  module.exports = exports["default"];

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _events = __webpack_require__(61);
  
  var _dispatchersDispatcher = __webpack_require__(48);
  
  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);
  
  var BaseStore = (function (_EventEmitter) {
    _inherits(BaseStore, _EventEmitter);
  
    function BaseStore() {
      _classCallCheck(this, BaseStore);
  
      _get(Object.getPrototypeOf(BaseStore.prototype), 'constructor', this).call(this);
      // console.log('BaseStore constructor');
    }
  
    _createClass(BaseStore, [{
      key: 'subscribe',
      value: function subscribe(actionSubscribe) {
        this._dispatchToken = _dispatchersDispatcher2['default'].register(actionSubscribe());
      }
    }, {
      key: 'emitChange',
      value: function emitChange() {
        this.emit('CHANGE');
      }
    }, {
      key: 'addChangeListener',
      value: function addChangeListener(cb) {
        this.on('CHANGE', cb);
      }
    }, {
      key: 'removeChangeListener',
      value: function removeChangeListener(cb) {
        this.removeListener('CHANGE', cb);
      }
    }, {
      key: 'dispatchToken',
      get: function get() {
        return this._dispatchToken;
      }
    }]);
  
    return BaseStore;
  })(_events.EventEmitter);
  
  exports['default'] = BaseStore;
  module.exports = exports['default'];

/***/ },
/* 95 */,
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule invariant
   */
  
  "use strict";
  
  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */
  
  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (true) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
  
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          'Invariant Violation: ' +
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
      }
  
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  
  module.exports = invariant;


/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 98 */
/***/ function(module, exports) {

  module.exports = require("flux");

/***/ },
/* 99 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 100 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 101 */
/***/ function(module, exports) {

  module.exports = require("mongoose");

/***/ },
/* 102 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  __webpack_require__(212);
  
  __webpack_require__(213);
  
  if (global._babelPolyfill) {
    throw new Error("only one instance of babel/polyfill is allowed");
  }
  global._babelPolyfill = true;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.1 Object.assign(target, source, ...)
  var toObject = __webpack_require__(23)
    , IObject  = __webpack_require__(44)
    , enumKeys = __webpack_require__(68);
  
  module.exports = __webpack_require__(7)(function(){
    return Symbol() in Object.assign({}); // Object.assign available and Symbol is native
  }) ? function assign(target, source){   // eslint-disable-line no-unused-vars
    var T = toObject(target)
      , l = arguments.length
      , i = 1;
    while(l > i){
      var S      = IObject(arguments[i++])
        , keys   = enumKeys(S)
        , length = keys.length
        , j      = 0
        , key;
      while(length > j)T[key = keys[j++]] = S[key];
    }
    return T;
  } : Object.assign;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  var $         = __webpack_require__(2)
    , toIObject = __webpack_require__(17);
  module.exports = function(object, el){
    var O      = toIObject(object)
      , keys   = $.getKeys(O)
      , length = keys.length
      , index  = 0
      , key;
    while(length > index)if(O[key = keys[index++]] === el)return key;
  };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  var global    = __webpack_require__(6)
    , macrotask = __webpack_require__(84).set
    , Observer  = global.MutationObserver || global.WebKitMutationObserver
    , process   = global.process
    , isNode    = __webpack_require__(21)(process) == 'process'
    , head, last, notify;
  
  var flush = function(){
    var parent, domain;
    if(isNode && (parent = process.domain)){
      process.domain = null;
      parent.exit();
    }
    while(head){
      domain = head.domain;
      if(domain)domain.enter();
      head.fn.call(); // <- currently we use it only for Promise - try / catch not required
      if(domain)domain.exit();
      head = head.next;
    } last = undefined;
    if(parent)parent.enter();
  }
  
  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = 1
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = -toggle;
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
  
  module.exports = function asap(fn){
    var task = {fn: fn, next: undefined, domain: isNode && process.domain};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var path      = __webpack_require__(108)
    , invoke    = __webpack_require__(43)
    , aFunction = __webpack_require__(29);
  module.exports = function(/* ...pargs */){
    var fn     = aFunction(this)
      , length = arguments.length
      , pargs  = Array(length)
      , i      = 0
      , _      = path._
      , holder = false;
    while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
    return function(/* ...args */){
      var that    = this
        , _length = arguments.length
        , j = 0, k = 0, args;
      if(!holder && !_length)return invoke(fn, pargs, that);
      args = pargs.slice();
      if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
      while(_length > k)args.push(arguments[k++]);
      return invoke(fn, args, that);
    };
  };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(6);

/***/ },
/* 109 */
/***/ function(module, exports) {

  module.exports = function(regExp, replace){
    var replacer = replace === Object(replace) ? function(part){
      return replace[part];
    } : replace;
    return function(it){
      return String(it).replace(regExp, replacer);
    };
  };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $                = __webpack_require__(2)
    , SUPPORT_DESC     = __webpack_require__(16)
    , createDesc       = __webpack_require__(25)
    , html             = __webpack_require__(71)
    , cel              = __webpack_require__(67)
    , has              = __webpack_require__(11)
    , cof              = __webpack_require__(21)
    , $def             = __webpack_require__(1)
    , invoke           = __webpack_require__(43)
    , arrayMethod      = __webpack_require__(39)
    , IE_PROTO         = __webpack_require__(26)('__proto__')
    , isObject         = __webpack_require__(3)
    , anObject         = __webpack_require__(4)
    , aFunction        = __webpack_require__(29)
    , toObject         = __webpack_require__(23)
    , toIObject        = __webpack_require__(17)
    , toInteger        = __webpack_require__(34)
    , toIndex          = __webpack_require__(33)
    , toLength         = __webpack_require__(12)
    , IObject          = __webpack_require__(44)
    , fails            = __webpack_require__(7)
    , ObjectProto      = Object.prototype
    , A                = []
    , _slice           = A.slice
    , _join            = A.join
    , defineProperty   = $.setDesc
    , getOwnDescriptor = $.getDesc
    , defineProperties = $.setDescs
    , $indexOf         = __webpack_require__(63)(false)
    , factories        = {}
    , IE8_DOM_DEFINE;
  
  if(!SUPPORT_DESC){
    IE8_DOM_DEFINE = !fails(function(){
      return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
    });
    $.setDesc = function(O, P, Attributes){
      if(IE8_DOM_DEFINE)try {
        return defineProperty(O, P, Attributes);
      } catch(e){ /* empty */ }
      if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
      if('value' in Attributes)anObject(O)[P] = Attributes.value;
      return O;
    };
    $.getDesc = function(O, P){
      if(IE8_DOM_DEFINE)try {
        return getOwnDescriptor(O, P);
      } catch(e){ /* empty */ }
      if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
    };
    $.setDescs = defineProperties = function(O, Properties){
      anObject(O);
      var keys   = $.getKeys(Properties)
        , length = keys.length
        , i = 0
        , P;
      while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
      return O;
    };
  }
  $def($def.S + $def.F * !SUPPORT_DESC, 'Object', {
    // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $.getDesc,
    // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
    defineProperty: $.setDesc,
    // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
    defineProperties: defineProperties
  });
  
    // IE 8- don't enum bug keys
  var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
              'toLocaleString,toString,valueOf').split(',')
    // Additional keys for getOwnPropertyNames
    , keys2 = keys1.concat('length', 'prototype')
    , keysLen1 = keys1.length;
  
  // Create object with `null` prototype: use iframe Object with cleared prototype
  var createDict = function(){
    // Thrash, waste and sodomy: IE GC bug
    var iframe = cel('iframe')
      , i      = keysLen1
      , gt     = '>'
      , iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write('<script>document.F=Object</script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while(i--)delete createDict.prototype[keys1[i]];
    return createDict();
  };
  var createGetKeys = function(names, length){
    return function(object){
      var O      = toIObject(object)
        , i      = 0
        , result = []
        , key;
      for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while(length > i)if(has(O, key = names[i++])){
        ~$indexOf(result, key) || result.push(key);
      }
      return result;
    };
  };
  var Empty = function(){};
  $def($def.S, 'Object', {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    getPrototypeOf: $.getProto = $.getProto || function(O){
      O = toObject(O);
      if(has(O, IE_PROTO))return O[IE_PROTO];
      if(typeof O.constructor == 'function' && O instanceof O.constructor){
        return O.constructor.prototype;
      } return O instanceof Object ? ObjectProto : null;
    },
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    create: $.create = $.create || function(O, /*?*/Properties){
      var result;
      if(O !== null){
        Empty.prototype = anObject(O);
        result = new Empty();
        Empty.prototype = null;
        // add "__proto__" for Object.getPrototypeOf shim
        result[IE_PROTO] = O;
      } else result = createDict();
      return Properties === undefined ? result : defineProperties(result, Properties);
    },
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
  });
  
  var construct = function(F, len, args){
    if(!(len in factories)){
      for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
      factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
    }
    return factories[len](F, args);
  };
  
  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
  $def($def.P, 'Function', {
    bind: function bind(that /*, args... */){
      var fn       = aFunction(this)
        , partArgs = _slice.call(arguments, 1);
      var bound = function(/* args... */){
        var args = partArgs.concat(_slice.call(arguments));
        return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
      };
      if(isObject(fn.prototype))bound.prototype = fn.prototype;
      return bound;
    }
  });
  
  // fallback for not array-like ES3 strings and DOM objects
  var buggySlice = fails(function(){
    if(html)_slice.call(html);
  });
  
  $def($def.P + $def.F * buggySlice, 'Array', {
    slice: function(begin, end){
      var len   = toLength(this.length)
        , klass = cof(this);
      end = end === undefined ? len : end;
      if(klass == 'Array')return _slice.call(this, begin, end);
      var start  = toIndex(begin, len)
        , upTo   = toIndex(end, len)
        , size   = toLength(upTo - start)
        , cloned = Array(size)
        , i      = 0;
      for(; i < size; i++)cloned[i] = klass == 'String'
        ? this.charAt(start + i)
        : this[start + i];
      return cloned;
    }
  });
  $def($def.P + $def.F * (IObject != Object), 'Array', {
    join: function(){
      return _join.apply(IObject(this), arguments);
    }
  });
  
  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
  $def($def.S, 'Array', {isArray: function(arg){ return cof(arg) == 'Array'; }});
  
  var createArrayReduce = function(isRight){
    return function(callbackfn, memo){
      aFunction(callbackfn);
      var O      = IObject(this)
        , length = toLength(O.length)
        , index  = isRight ? length - 1 : 0
        , i      = isRight ? -1 : 1;
      if(arguments.length < 2)for(;;){
        if(index in O){
          memo = O[index];
          index += i;
          break;
        }
        index += i;
        if(isRight ? index < 0 : length <= index){
          throw TypeError('Reduce of empty array with no initial value');
        }
      }
      for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
        memo = callbackfn(memo, O[index], index, this);
      }
      return memo;
    };
  };
  var methodize = function($fn){
    return function(arg1/*, arg2 = undefined */){
      return $fn(this, arg1, arguments[1]);
    };
  };
  $def($def.P, 'Array', {
    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
    forEach: $.each = $.each || methodize(arrayMethod(0)),
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: methodize(arrayMethod(1)),
    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
    filter: methodize(arrayMethod(2)),
    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: methodize(arrayMethod(3)),
    // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
    every: methodize(arrayMethod(4)),
    // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
    reduce: createArrayReduce(false),
    // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
    reduceRight: createArrayReduce(true),
    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
    indexOf: methodize($indexOf),
    // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
    lastIndexOf: function(el, fromIndex /* = @[*-1] */){
      var O      = toIObject(this)
        , length = toLength(O.length)
        , index  = length - 1;
      if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
      if(index < 0)index = toLength(length + index);
      for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
      return -1;
    }
  });
  
  // 20.3.3.1 / 15.9.4.4 Date.now()
  $def($def.S, 'Date', {now: function(){ return +new Date; }});
  
  var lz = function(num){
    return num > 9 ? num : '0' + num;
  };
  
  // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
  // PhantomJS and old webkit had a broken Date implementation.
  var date       = new Date(-5e13 - 1)
    , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
        && fails(function(){ new Date(NaN).toISOString(); }));
  $def($def.P + $def.F * brokenDate, 'Date', {
    toISOString: function toISOString(){
      if(!isFinite(this))throw RangeError('Invalid time value');
      var d = this
        , y = d.getUTCFullYear()
        , m = d.getUTCMilliseconds()
        , s = y < 0 ? '-' : y > 9999 ? '+' : '';
      return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
        '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
        'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
        ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
    }
  });

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def     = __webpack_require__(1)
    , toObject = __webpack_require__(23)
    , toIndex  = __webpack_require__(33)
    , toLength = __webpack_require__(12);
  $def($def.P, 'Array', {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
      var O     = toObject(this)
        , len   = toLength(O.length)
        , to    = toIndex(target, len)
        , from  = toIndex(start, len)
        , end   = arguments[2]
        , fin   = end === undefined ? len : toIndex(end, len)
        , count = Math.min(fin - from, len - to)
        , inc   = 1;
      if(from < to && to < from + count){
        inc  = -1;
        from = from + count - 1;
        to   = to   + count - 1;
      }
      while(count-- > 0){
        if(from in O)O[to] = O[from];
        else delete O[to];
        to   += inc;
        from += inc;
      } return O;
    }
  });
  __webpack_require__(27)('copyWithin');

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def     = __webpack_require__(1)
    , toObject = __webpack_require__(23)
    , toIndex  = __webpack_require__(33)
    , toLength = __webpack_require__(12);
  $def($def.P, 'Array', {
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    fill: function fill(value /*, start = 0, end = @length */){
      var O      = toObject(this, true)
        , length = toLength(O.length)
        , index  = toIndex(arguments[1], length)
        , end    = arguments[2]
        , endPos = end === undefined ? length : toIndex(end, length);
      while(endPos > index)O[index++] = value;
      return O;
    }
  });
  __webpack_require__(27)('fill');

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
  var KEY    = 'findIndex'
    , $def   = __webpack_require__(1)
    , forced = true
    , $find  = __webpack_require__(39)(6);
  // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){ forced = false; });
  $def($def.P + $def.F * forced, 'Array', {
    findIndex: function findIndex(callbackfn/*, that = undefined */){
      return $find(this, callbackfn, arguments[1]);
    }
  });
  __webpack_require__(27)(KEY);

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
  var KEY    = 'find'
    , $def   = __webpack_require__(1)
    , forced = true
    , $find  = __webpack_require__(39)(5);
  // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){ forced = false; });
  $def($def.P + $def.F * forced, 'Array', {
    find: function find(callbackfn/*, that = undefined */){
      return $find(this, callbackfn, arguments[1]);
    }
  });
  __webpack_require__(27)(KEY);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var ctx         = __webpack_require__(22)
    , $def        = __webpack_require__(1)
    , toObject    = __webpack_require__(23)
    , call        = __webpack_require__(74)
    , isArrayIter = __webpack_require__(72)
    , toLength    = __webpack_require__(12)
    , getIterFn   = __webpack_require__(85);
  $def($def.S + $def.F * !__webpack_require__(51)(function(iter){ Array.from(iter); }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
      var O       = toObject(arrayLike)
        , C       = typeof this == 'function' ? this : Array
        , mapfn   = arguments[1]
        , mapping = mapfn !== undefined
        , index   = 0
        , iterFn  = getIterFn(O)
        , length, result, step, iterator;
      if(mapping)mapfn = ctx(mapfn, arguments[2], 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
        for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
          result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
        }
      } else {
        for(result = new C(length = toLength(O.length)); length > index; index++){
          result[index] = mapping ? mapfn(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }
  });

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(1);
  
  // WebKit Array.of isn't generic
  $def($def.S + $def.F * __webpack_require__(7)(function(){
    function F(){}
    return !(Array.of.call(F) instanceof F);
  }), 'Array', {
    // 22.1.2.3 Array.of( ...items)
    of: function of(/* ...args */){
      var index  = 0
        , length = arguments.length
        , result = new (typeof this == 'function' ? this : Array)(length);
      while(length > index)result[index] = arguments[index++];
      result.length = length;
      return result;
    }
  });

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(46)(Array);

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $             = __webpack_require__(2)
    , isObject      = __webpack_require__(3)
    , HAS_INSTANCE  = __webpack_require__(8)('hasInstance')
    , FunctionProto = Function.prototype;
  // 19.2.3.6 Function.prototype[@@hasInstance](V)
  if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
    if(typeof this != 'function' || !isObject(O))return false;
    if(!isObject(this.prototype))return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while(O = $.getProto(O))if(this.prototype === O)return true;
    return false;
  }});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  var setDesc    = __webpack_require__(2).setDesc
    , createDesc = __webpack_require__(25)
    , has        = __webpack_require__(11)
    , FProto     = Function.prototype
    , nameRE     = /^\s*function ([^ (]*)/
    , NAME       = 'name';
  // 19.2.4.2 name
  NAME in FProto || __webpack_require__(16) && setDesc(FProto, NAME, {
    configurable: true,
    get: function(){
      var match = ('' + this).match(nameRE)
        , name  = match ? match[1] : '';
      has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
      return name;
    }
  });

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var strong = __webpack_require__(64);
  
  // 23.1 Map Objects
  __webpack_require__(41)('Map', function(get){
    return function Map(){ return get(this, arguments[0]); };
  }, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key){
      var entry = strong.getEntry(this, key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value){
      return strong.def(this, key === 0 ? 0 : key, value);
    }
  }, strong, true);

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.3 Math.acosh(x)
  var $def   = __webpack_require__(1)
    , log1p  = __webpack_require__(77)
    , sqrt   = Math.sqrt
    , $acosh = Math.acosh;
  
  // V8 bug https://code.google.com/p/v8/issues/detail?id=3509 
  $def($def.S + $def.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
    acosh: function acosh(x){
      return (x = +x) < 1 ? NaN : x > 94906265.62425156
        ? Math.log(x) + Math.LN2
        : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
    }
  });

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.5 Math.asinh(x)
  var $def = __webpack_require__(1);
  
  function asinh(x){
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
  }
  
  $def($def.S, 'Math', {asinh: asinh});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.7 Math.atanh(x)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Math', {
    atanh: function atanh(x){
      return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
    }
  });

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.9 Math.cbrt(x)
  var $def = __webpack_require__(1)
    , sign = __webpack_require__(54);
  
  $def($def.S, 'Math', {
    cbrt: function cbrt(x){
      return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
    }
  });

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.11 Math.clz32(x)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Math', {
    clz32: function clz32(x){
      return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
    }
  });

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.12 Math.cosh(x)
  var $def = __webpack_require__(1)
    , exp  = Math.exp;
  
  $def($def.S, 'Math', {
    cosh: function cosh(x){
      return (exp(x = +x) + exp(-x)) / 2;
    }
  });

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.14 Math.expm1(x)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Math', {expm1: __webpack_require__(49)});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.16 Math.fround(x)
  var $def  = __webpack_require__(1)
    , sign  = __webpack_require__(54)
    , pow   = Math.pow
    , EPSILON   = pow(2, -52)
    , EPSILON32 = pow(2, -23)
    , MAX32     = pow(2, 127) * (2 - EPSILON32)
    , MIN32     = pow(2, -126);
  
  var roundTiesToEven = function(n){
    return n + 1 / EPSILON - 1 / EPSILON;
  };
  
  
  $def($def.S, 'Math', {
    fround: function fround(x){
      var $abs  = Math.abs(x)
        , $sign = sign(x)
        , a, result;
      if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);
      if(result > MAX32 || result != result)return $sign * Infinity;
      return $sign * result;
    }
  });

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
  var $def = __webpack_require__(1)
    , abs  = Math.abs;
  
  $def($def.S, 'Math', {
    hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
      var sum  = 0
        , i    = 0
        , len  = arguments.length
        , larg = 0
        , arg, div;
      while(i < len){
        arg = abs(arguments[i++]);
        if(larg < arg){
          div  = larg / arg;
          sum  = sum * div * div + 1;
          larg = arg;
        } else if(arg > 0){
          div  = arg / larg;
          sum += div * div;
        } else sum += arg;
      }
      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
    }
  });

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.18 Math.imul(x, y)
  var $def = __webpack_require__(1);
  
  // WebKit fails with big numbers
  $def($def.S + $def.F * __webpack_require__(7)(function(){
    return Math.imul(0xffffffff, 5) != -5;
  }), 'Math', {
    imul: function imul(x, y){
      var UINT16 = 0xffff
        , xn = +x
        , yn = +y
        , xl = UINT16 & xn
        , yl = UINT16 & yn;
      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
    }
  });

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.21 Math.log10(x)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Math', {
    log10: function log10(x){
      return Math.log(x) / Math.LN10;
    }
  });

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.20 Math.log1p(x)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Math', {log1p: __webpack_require__(77)});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.22 Math.log2(x)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Math', {
    log2: function log2(x){
      return Math.log(x) / Math.LN2;
    }
  });

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.28 Math.sign(x)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Math', {sign: __webpack_require__(54)});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.30 Math.sinh(x)
  var $def  = __webpack_require__(1)
    , expm1 = __webpack_require__(49)
    , exp   = Math.exp;
  
  $def($def.S, 'Math', {
    sinh: function sinh(x){
      return Math.abs(x = +x) < 1
        ? (expm1(x) - expm1(-x)) / 2
        : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
    }
  });

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.33 Math.tanh(x)
  var $def  = __webpack_require__(1)
    , expm1 = __webpack_require__(49)
    , exp   = Math.exp;
  
  $def($def.S, 'Math', {
    tanh: function tanh(x){
      var a = expm1(x = +x)
        , b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    }
  });

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  // 20.2.2.34 Math.trunc(x)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Math', {
    trunc: function trunc(it){
      return (it > 0 ? Math.floor : Math.ceil)(it);
    }
  });

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $          = __webpack_require__(2)
    , global     = __webpack_require__(6)
    , has        = __webpack_require__(11)
    , cof        = __webpack_require__(21)
    , isObject   = __webpack_require__(3)
    , fails      = __webpack_require__(7)
    , NUMBER     = 'Number'
    , $Number    = global[NUMBER]
    , Base       = $Number
    , proto      = $Number.prototype
    // Opera ~12 has broken Object#toString
    , BROKEN_COF = cof($.create(proto)) == NUMBER;
  var toPrimitive = function(it){
    var fn, val;
    if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
    if(typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
    throw TypeError("Can't convert object to number");
  };
  var toNumber = function(it){
    if(isObject(it))it = toPrimitive(it);
    if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
      var binary = false;
      switch(it.charCodeAt(1)){
        case 66 : case 98  : binary = true;
        case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
      }
    } return +it;
  };
  if(!($Number('0o1') && $Number('0b1'))){
    $Number = function Number(it){
      var that = this;
      return that instanceof $Number
        // check on 1..constructor(foo) case
        && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
          ? new Base(toNumber(it)) : toNumber(it);
    };
    $.each.call(__webpack_require__(16) ? $.getNames(Base) : (
        // ES3:
        'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
        // ES6 (in case, if modules with ES6 Number statics required before):
        'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
        'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
      ).split(','), function(key){
        if(has(Base, key) && !has($Number, key)){
          $.setDesc($Number, key, $.getDesc(Base, key));
        }
      }
    );
    $Number.prototype = proto;
    proto.constructor = $Number;
    __webpack_require__(15)(global, NUMBER, $Number);
  }

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.1 Number.EPSILON
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.2 Number.isFinite(number)
  var $def      = __webpack_require__(1)
    , _isFinite = __webpack_require__(6).isFinite;
  
  $def($def.S, 'Number', {
    isFinite: function isFinite(it){
      return typeof it == 'number' && _isFinite(it);
    }
  });

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.3 Number.isInteger(number)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Number', {isInteger: __webpack_require__(73)});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.4 Number.isNaN(number)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Number', {
    isNaN: function isNaN(number){
      return number != number;
    }
  });

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.5 Number.isSafeInteger(number)
  var $def      = __webpack_require__(1)
    , isInteger = __webpack_require__(73)
    , abs       = Math.abs;
  
  $def($def.S, 'Number', {
    isSafeInteger: function isSafeInteger(number){
      return isInteger(number) && abs(number) <= 0x1fffffffffffff;
    }
  });

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.6 Number.MAX_SAFE_INTEGER
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.10 Number.MIN_SAFE_INTEGER
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.12 Number.parseFloat(string)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Number', {parseFloat: parseFloat});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  // 20.1.2.13 Number.parseInt(string, radix)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Number', {parseInt: parseInt});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.1 Object.assign(target, source)
  var $def = __webpack_require__(1);
  
  $def($def.S + $def.F, 'Object', {assign: __webpack_require__(104)});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.5 Object.freeze(O)
  var isObject = __webpack_require__(3);
  
  __webpack_require__(14)('freeze', function($freeze){
    return function freeze(it){
      return $freeze && isObject(it) ? $freeze(it) : it;
    };
  });

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  var toIObject = __webpack_require__(17);
  
  __webpack_require__(14)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
    return function getOwnPropertyDescriptor(it, key){
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.7 Object.getOwnPropertyNames(O)
  __webpack_require__(14)('getOwnPropertyNames', function(){
    return __webpack_require__(70).get;
  });

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.9 Object.getPrototypeOf(O)
  var toObject = __webpack_require__(23);
  
  __webpack_require__(14)('getPrototypeOf', function($getPrototypeOf){
    return function getPrototypeOf(it){
      return $getPrototypeOf(toObject(it));
    };
  });

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.11 Object.isExtensible(O)
  var isObject = __webpack_require__(3);
  
  __webpack_require__(14)('isExtensible', function($isExtensible){
    return function isExtensible(it){
      return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
    };
  });

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.12 Object.isFrozen(O)
  var isObject = __webpack_require__(3);
  
  __webpack_require__(14)('isFrozen', function($isFrozen){
    return function isFrozen(it){
      return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
    };
  });

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.13 Object.isSealed(O)
  var isObject = __webpack_require__(3);
  
  __webpack_require__(14)('isSealed', function($isSealed){
    return function isSealed(it){
      return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
    };
  });

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.10 Object.is(value1, value2)
  var $def = __webpack_require__(1);
  $def($def.S, 'Object', {
    is: __webpack_require__(80)
  });

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.14 Object.keys(O)
  var toObject = __webpack_require__(23);
  
  __webpack_require__(14)('keys', function($keys){
    return function keys(it){
      return $keys(toObject(it));
    };
  });

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.15 Object.preventExtensions(O)
  var isObject = __webpack_require__(3);
  
  __webpack_require__(14)('preventExtensions', function($preventExtensions){
    return function preventExtensions(it){
      return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
    };
  });

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.2.17 Object.seal(O)
  var isObject = __webpack_require__(3);
  
  __webpack_require__(14)('seal', function($seal){
    return function seal(it){
      return $seal && isObject(it) ? $seal(it) : it;
    };
  });

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.19 Object.setPrototypeOf(O, proto)
  var $def = __webpack_require__(1);
  $def($def.S, 'Object', {setPrototypeOf: __webpack_require__(53).set});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 19.1.3.6 Object.prototype.toString()
  var classof = __webpack_require__(40)
    , test    = {};
  test[__webpack_require__(8)('toStringTag')] = 'z';
  if(test + '' != '[object z]'){
    __webpack_require__(15)(Object.prototype, 'toString', function toString(){
      return '[object ' + classof(this) + ']';
    }, true);
  }

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $          = __webpack_require__(2)
    , LIBRARY    = __webpack_require__(52)
    , global     = __webpack_require__(6)
    , ctx        = __webpack_require__(22)
    , classof    = __webpack_require__(40)
    , $def       = __webpack_require__(1)
    , isObject   = __webpack_require__(3)
    , anObject   = __webpack_require__(4)
    , aFunction  = __webpack_require__(29)
    , strictNew  = __webpack_require__(47)
    , forOf      = __webpack_require__(30)
    , setProto   = __webpack_require__(53).set
    , same       = __webpack_require__(80)
    , species    = __webpack_require__(46)
    , SPECIES    = __webpack_require__(8)('species')
    , RECORD     = __webpack_require__(26)('record')
    , asap       = __webpack_require__(106)
    , PROMISE    = 'Promise'
    , process    = global.process
    , isNode     = classof(process) == 'process'
    , P          = global[PROMISE]
    , Wrapper;
  
  var testResolve = function(sub){
    var test = new P(function(){});
    if(sub)test.constructor = Object;
    return P.resolve(test) === test;
  };
  
  var useNative = function(){
    var works = false;
    function P2(x){
      var self = new P(x);
      setProto(self, P2.prototype);
      return self;
    }
    try {
      works = P && P.resolve && testResolve();
      setProto(P2, P);
      P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
      // actual Firefox has broken subclass support, test that
      if(!(P2.resolve(5).then(function(){}) instanceof P2)){
        works = false;
      }
      // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
      if(works && __webpack_require__(16)){
        var thenableThenGotten = false;
        P.resolve($.setDesc({}, 'then', {
          get: function(){ thenableThenGotten = true; }
        }));
        works = thenableThenGotten;
      }
    } catch(e){ works = false; }
    return works;
  }();
  
  // helpers
  var isPromise = function(it){
    return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
  };
  var sameConstructor = function(a, b){
    // library wrapper special case
    if(LIBRARY && a === P && b === Wrapper)return true;
    return same(a, b);
  };
  var getConstructor = function(C){
    var S = anObject(C)[SPECIES];
    return S != undefined ? S : C;
  };
  var isThenable = function(it){
    var then;
    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };
  var notify = function(record, isReject){
    if(record.n)return;
    record.n = true;
    var chain = record.c;
    asap(function(){
      var value = record.v
        , ok    = record.s == 1
        , i     = 0;
      var run = function(react){
        var cb = ok ? react.ok : react.fail
          , ret, then;
        try {
          if(cb){
            if(!ok)record.h = true;
            ret = cb === true ? value : cb(value);
            if(ret === react.P){
              react.rej(TypeError('Promise-chain cycle'));
            } else if(then = isThenable(ret)){
              then.call(ret, react.res, react.rej);
            } else react.res(ret);
          } else react.rej(value);
        } catch(err){
          react.rej(err);
        }
      };
      while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
      chain.length = 0;
      record.n = false;
      if(isReject)setTimeout(function(){
        if(isUnhandled(record.p)){
          if(isNode){
            process.emit('unhandledRejection', value, record.p);
          } else if(global.console && console.error){
            console.error('Unhandled promise rejection', value);
          }
        } record.a = undefined;
      }, 1);
    });
  };
  var isUnhandled = function(promise){
    var record = promise[RECORD]
      , chain  = record.a || record.c
      , i      = 0
      , react;
    if(record.h)return false;
    while(chain.length > i){
      react = chain[i++];
      if(react.fail || !isUnhandled(react.P))return false;
    } return true;
  };
  var $reject = function(value){
    var record = this;
    if(record.d)return;
    record.d = true;
    record = record.r || record; // unwrap
    record.v = value;
    record.s = 2;
    record.a = record.c.slice();
    notify(record, true);
  };
  var $resolve = function(value){
    var record = this
      , then;
    if(record.d)return;
    record.d = true;
    record = record.r || record; // unwrap
    try {
      if(then = isThenable(value)){
        asap(function(){
          var wrapper = {r: record, d: false}; // wrap
          try {
            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
          } catch(e){
            $reject.call(wrapper, e);
          }
        });
      } else {
        record.v = value;
        record.s = 1;
        notify(record, false);
      }
    } catch(e){
      $reject.call({r: record, d: false}, e); // wrap
    }
  };
  
  // constructor polyfill
  if(!useNative){
    // 25.4.3.1 Promise(executor)
    P = function Promise(executor){
      aFunction(executor);
      var record = {
        p: strictNew(this, P, PROMISE),         // <- promise
        c: [],                                  // <- awaiting reactions
        a: undefined,                           // <- checked in isUnhandled reactions
        s: 0,                                   // <- state
        d: false,                               // <- done
        v: undefined,                           // <- value
        h: false,                               // <- handled rejection
        n: false                                // <- notify
      };
      this[RECORD] = record;
      try {
        executor(ctx($resolve, record, 1), ctx($reject, record, 1));
      } catch(err){
        $reject.call(record, err);
      }
    };
    __webpack_require__(45)(P.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected){
        var S = anObject(anObject(this).constructor)[SPECIES];
        var react = {
          ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
          fail: typeof onRejected == 'function'  ? onRejected  : false
        };
        var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
          react.res = aFunction(res);
          react.rej = aFunction(rej);
        });
        var record = this[RECORD];
        record.c.push(react);
        if(record.a)record.a.push(react);
        if(record.s)notify(record, false);
        return promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function(onRejected){
        return this.then(undefined, onRejected);
      }
    });
  }
  
  // export
  $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
  __webpack_require__(32)(P, PROMISE);
  species(P);
  species(Wrapper = __webpack_require__(18)[PROMISE]);
  
  // statics
  $def($def.S + $def.F * !useNative, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r){
      return new this(function(res, rej){ rej(r); });
    }
  });
  $def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x){
      return isPromise(x) && sameConstructor(x.constructor, this)
        ? x : new this(function(res){ res(x); });
    }
  });
  $def($def.S + $def.F * !(useNative && __webpack_require__(51)(function(iter){
    P.all(iter)['catch'](function(){});
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable){
      var C      = getConstructor(this)
        , values = [];
      return new C(function(res, rej){
        forOf(iterable, false, values.push, values);
        var remaining = values.length
          , results   = Array(remaining);
        if(remaining)$.each.call(values, function(promise, index){
          C.resolve(promise).then(function(value){
            results[index] = value;
            --remaining || res(results);
          }, rej);
        });
        else res(results);
      });
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable){
      var C = getConstructor(this);
      return new C(function(res, rej){
        forOf(iterable, false, function(promise){
          C.resolve(promise).then(res, rej);
        });
      });
    }
  });

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
  var $def   = __webpack_require__(1)
    , _apply = Function.apply;
  
  $def($def.S, 'Reflect', {
    apply: function apply(target, thisArgument, argumentsList){
      return _apply.call(target, thisArgument, argumentsList);
    }
  });

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
  var $         = __webpack_require__(2)
    , $def      = __webpack_require__(1)
    , aFunction = __webpack_require__(29)
    , anObject  = __webpack_require__(4)
    , isObject  = __webpack_require__(3)
    , bind      = Function.bind || __webpack_require__(18).Function.prototype.bind;
  
  // MS Edge supports only 2 arguments
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  $def($def.S + $def.F * __webpack_require__(7)(function(){
    function F(){}
    return !(Reflect.construct(function(){}, [], F) instanceof F);
  }), 'Reflect', {
    construct: function construct(Target, args /*, newTarget*/){
      aFunction(Target);
      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
      if(Target == newTarget){
        // w/o altered newTarget, optimization for 0-4 arguments
        if(args != undefined)switch(anObject(args).length){
          case 0: return new Target;
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        $args.push.apply($args, args);
        return new (bind.apply(Target, $args));
      }
      // with altered newTarget, not support built-in constructors
      var proto    = newTarget.prototype
        , instance = $.create(isObject(proto) ? proto : Object.prototype)
        , result   = Function.apply.call(Target, instance, args);
      return isObject(result) ? result : instance;
    }
  });

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
  var $        = __webpack_require__(2)
    , $def     = __webpack_require__(1)
    , anObject = __webpack_require__(4);
  
  // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
  $def($def.S + $def.F * __webpack_require__(7)(function(){
    Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
  }), 'Reflect', {
    defineProperty: function defineProperty(target, propertyKey, attributes){
      anObject(target);
      try {
        $.setDesc(target, propertyKey, attributes);
        return true;
      } catch(e){
        return false;
      }
    }
  });

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
  var $def     = __webpack_require__(1)
    , getDesc  = __webpack_require__(2).getDesc
    , anObject = __webpack_require__(4);
  
  $def($def.S, 'Reflect', {
    deleteProperty: function deleteProperty(target, propertyKey){
      var desc = getDesc(anObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    }
  });

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 26.1.5 Reflect.enumerate(target)
  var $def     = __webpack_require__(1)
    , anObject = __webpack_require__(4);
  var Enumerate = function(iterated){
    this._t = anObject(iterated); // target
    this._i = 0;                  // next index
    var keys = this._k = []       // keys
      , key;
    for(key in iterated)keys.push(key);
  };
  __webpack_require__(75)(Enumerate, 'Object', function(){
    var that = this
      , keys = that._k
      , key;
    do {
      if(that._i >= keys.length)return {value: undefined, done: true};
    } while(!((key = keys[that._i++]) in that._t));
    return {value: key, done: false};
  });
  
  $def($def.S, 'Reflect', {
    enumerate: function enumerate(target){
      return new Enumerate(target);
    }
  });

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
  var $        = __webpack_require__(2)
    , $def     = __webpack_require__(1)
    , anObject = __webpack_require__(4);
  
  $def($def.S, 'Reflect', {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
      return $.getDesc(anObject(target), propertyKey);
    }
  });

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.8 Reflect.getPrototypeOf(target)
  var $def     = __webpack_require__(1)
    , getProto = __webpack_require__(2).getProto
    , anObject = __webpack_require__(4);
  
  $def($def.S, 'Reflect', {
    getPrototypeOf: function getPrototypeOf(target){
      return getProto(anObject(target));
    }
  });

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
  var $        = __webpack_require__(2)
    , has      = __webpack_require__(11)
    , $def     = __webpack_require__(1)
    , isObject = __webpack_require__(3)
    , anObject = __webpack_require__(4);
  
  function get(target, propertyKey/*, receiver*/){
    var receiver = arguments.length < 3 ? target : arguments[2]
      , desc, proto;
    if(anObject(target) === receiver)return target[propertyKey];
    if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
      ? desc.value
      : desc.get !== undefined
        ? desc.get.call(receiver)
        : undefined;
    if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
  }
  
  $def($def.S, 'Reflect', {get: get});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.9 Reflect.has(target, propertyKey)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Reflect', {
    has: function has(target, propertyKey){
      return propertyKey in target;
    }
  });

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.10 Reflect.isExtensible(target)
  var $def          = __webpack_require__(1)
    , anObject      = __webpack_require__(4)
    , $isExtensible = Object.isExtensible;
  
  $def($def.S, 'Reflect', {
    isExtensible: function isExtensible(target){
      anObject(target);
      return $isExtensible ? $isExtensible(target) : true;
    }
  });

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.11 Reflect.ownKeys(target)
  var $def = __webpack_require__(1);
  
  $def($def.S, 'Reflect', {ownKeys: __webpack_require__(79)});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.12 Reflect.preventExtensions(target)
  var $def               = __webpack_require__(1)
    , anObject           = __webpack_require__(4)
    , $preventExtensions = Object.preventExtensions;
  
  $def($def.S, 'Reflect', {
    preventExtensions: function preventExtensions(target){
      anObject(target);
      try {
        if($preventExtensions)$preventExtensions(target);
        return true;
      } catch(e){
        return false;
      }
    }
  });

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.14 Reflect.setPrototypeOf(target, proto)
  var $def     = __webpack_require__(1)
    , setProto = __webpack_require__(53);
  
  if(setProto)$def($def.S, 'Reflect', {
    setPrototypeOf: function setPrototypeOf(target, proto){
      setProto.check(target, proto);
      try {
        setProto.set(target, proto);
        return true;
      } catch(e){
        return false;
      }
    }
  });

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
  var $          = __webpack_require__(2)
    , has        = __webpack_require__(11)
    , $def       = __webpack_require__(1)
    , createDesc = __webpack_require__(25)
    , anObject   = __webpack_require__(4)
    , isObject   = __webpack_require__(3);
  
  function set(target, propertyKey, V/*, receiver*/){
    var receiver = arguments.length < 4 ? target : arguments[3]
      , ownDesc  = $.getDesc(anObject(target), propertyKey)
      , existingDescriptor, proto;
    if(!ownDesc){
      if(isObject(proto = $.getProto(target))){
        return set(proto, propertyKey, V, receiver);
      }
      ownDesc = createDesc(0);
    }
    if(has(ownDesc, 'value')){
      if(ownDesc.writable === false || !isObject(receiver))return false;
      existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
      existingDescriptor.value = V;
      $.setDesc(receiver, propertyKey, existingDescriptor);
      return true;
    }
    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }
  
  $def($def.S, 'Reflect', {set: set});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  var $       = __webpack_require__(2)
    , global  = __webpack_require__(6)
    , cof     = __webpack_require__(21)
    , $flags  = __webpack_require__(69)
    , $RegExp = global.RegExp
    , Base    = $RegExp
    , proto   = $RegExp.prototype
    , re      = /a/g
    // "new" creates a new object
    , CORRECT_NEW = new $RegExp(re) !== re
    // RegExp allows a regex with flags as the pattern
    , ALLOWS_RE_WITH_FLAGS = function(){
      try {
        return $RegExp(re, 'i') == '/a/i';
      } catch(e){ /* empty */ }
    }();
  
  if(__webpack_require__(16)){
    if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
      $RegExp = function RegExp(pattern, flags){
        var patternIsRegExp  = cof(pattern) == 'RegExp'
          , flagsIsUndefined = flags === undefined;
        if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
        return CORRECT_NEW
          ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
          : new Base(patternIsRegExp ? pattern.source : pattern
            , patternIsRegExp && flagsIsUndefined ? $flags.call(pattern) : flags);
      };
      $.each.call($.getNames(Base), function(key){
        key in $RegExp || $.setDesc($RegExp, key, {
          configurable: true,
          get: function(){ return Base[key]; },
          set: function(it){ Base[key] = it; }
        });
      });
      proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      __webpack_require__(15)(global, 'RegExp', $RegExp);
    }
  }
  
  __webpack_require__(46)($RegExp);

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  // 21.2.5.3 get RegExp.prototype.flags()
  var $ = __webpack_require__(2);
  if(__webpack_require__(16) && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
    configurable: true,
    get: __webpack_require__(69)
  });

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  // @@match logic
  __webpack_require__(42)('match', 1, function(defined, MATCH){
    // 21.1.3.11 String.prototype.match(regexp)
    return function match(regexp){
      'use strict';
      var O  = defined(this)
        , fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    };
  });

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

  // @@replace logic
  __webpack_require__(42)('replace', 2, function(defined, REPLACE, $replace){
    // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
    return function replace(searchValue, replaceValue){
      'use strict';
      var O  = defined(this)
        , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    };
  });

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

  // @@search logic
  __webpack_require__(42)('search', 1, function(defined, SEARCH){
    // 21.1.3.15 String.prototype.search(regexp)
    return function search(regexp){
      'use strict';
      var O  = defined(this)
        , fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    };
  });

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

  // @@split logic
  __webpack_require__(42)('split', 2, function(defined, SPLIT, $split){
    // 21.1.3.17 String.prototype.split(separator, limit)
    return function split(separator, limit){
      'use strict';
      var O  = defined(this)
        , fn = separator == undefined ? undefined : separator[SPLIT];
      return fn !== undefined
        ? fn.call(separator, O, limit)
        : $split.call(String(O), separator, limit);
    };
  });

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var strong = __webpack_require__(64);
  
  // 23.2 Set Objects
  __webpack_require__(41)('Set', function(get){
    return function Set(){ return get(this, arguments[0]); };
  }, {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value){
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }
  }, strong);

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(1)
    , $at  = __webpack_require__(55)(false);
  $def($def.P, 'String', {
    // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: function codePointAt(pos){
      return $at(this, pos);
    }
  });

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def     = __webpack_require__(1)
    , toLength = __webpack_require__(12)
    , context  = __webpack_require__(56);
  
  // should throw error on regex
  $def($def.P + $def.F * !__webpack_require__(7)(function(){ 'q'.endsWith(/./); }), 'String', {
    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
    endsWith: function endsWith(searchString /*, endPosition = @length */){
      var that = context(this, searchString, 'endsWith')
        , endPosition = arguments[1]
        , len    = toLength(that.length)
        , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
        , search = String(searchString);
      return that.slice(end - search.length, end) === search;
    }
  });

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

  var $def    = __webpack_require__(1)
    , toIndex = __webpack_require__(33)
    , fromCharCode = String.fromCharCode
    , $fromCodePoint = String.fromCodePoint;
  
  // length should be 1, old FF problem
  $def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
    // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
      var res = []
        , len = arguments.length
        , i   = 0
        , code;
      while(len > i){
        code = +arguments[i++];
        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000
          ? fromCharCode(code)
          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
        );
      } return res.join('');
    }
  });

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def    = __webpack_require__(1)
    , context = __webpack_require__(56);
  
  $def($def.P, 'String', {
    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
    includes: function includes(searchString /*, position = 0 */){
      return !!~context(this, searchString, 'includes').indexOf(searchString, arguments[1]);
    }
  });

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $at  = __webpack_require__(55)(true);
  
  // 21.1.3.27 String.prototype[@@iterator]()
  __webpack_require__(50)(String, 'String', function(iterated){
    this._t = String(iterated); // target
    this._i = 0;                // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function(){
    var O     = this._t
      , index = this._i
      , point;
    if(index >= O.length)return {value: undefined, done: true};
    point = $at(O, index);
    this._i += point.length;
    return {value: point, done: false};
  });

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

  var $def      = __webpack_require__(1)
    , toIObject = __webpack_require__(17)
    , toLength  = __webpack_require__(12);
  
  $def($def.S, 'String', {
    // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function raw(callSite){
      var tpl = toIObject(callSite.raw)
        , len = toLength(tpl.length)
        , sln = arguments.length
        , res = []
        , i   = 0;
      while(len > i){
        res.push(String(tpl[i++]));
        if(i < sln)res.push(String(arguments[i]));
      } return res.join('');
    }
  });

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

  var $def = __webpack_require__(1);
  
  $def($def.P, 'String', {
    // 21.1.3.13 String.prototype.repeat(count)
    repeat: __webpack_require__(83)
  });

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def     = __webpack_require__(1)
    , toLength = __webpack_require__(12)
    , context  = __webpack_require__(56);
  
  // should throw error on regex
  $def($def.P + $def.F * !__webpack_require__(7)(function(){ 'q'.startsWith(/./); }), 'String', {
    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
    startsWith: function startsWith(searchString /*, position = 0 */){
      var that   = context(this, searchString, 'startsWith')
        , index  = toLength(Math.min(arguments[1], that.length))
        , search = String(searchString);
      return that.slice(index, index + search.length) === search;
    }
  });

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 21.1.3.25 String.prototype.trim()
  __webpack_require__(57)('trim', function($trim){
    return function trim(){
      return $trim(this, 3);
    };
  });

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // ECMAScript 6 symbols shim
  var $              = __webpack_require__(2)
    , global         = __webpack_require__(6)
    , has            = __webpack_require__(11)
    , SUPPORT_DESC   = __webpack_require__(16)
    , $def           = __webpack_require__(1)
    , $redef         = __webpack_require__(15)
    , shared         = __webpack_require__(81)
    , setTag         = __webpack_require__(32)
    , uid            = __webpack_require__(26)
    , wks            = __webpack_require__(8)
    , keyOf          = __webpack_require__(105)
    , $names         = __webpack_require__(70)
    , enumKeys       = __webpack_require__(68)
    , isObject       = __webpack_require__(3)
    , anObject       = __webpack_require__(4)
    , toIObject      = __webpack_require__(17)
    , createDesc     = __webpack_require__(25)
    , getDesc        = $.getDesc
    , setDesc        = $.setDesc
    , _create        = $.create
    , getNames       = $names.get
    , $Symbol        = global.Symbol
    , setter         = false
    , HIDDEN         = wks('_hidden')
    , isEnum         = $.isEnum
    , SymbolRegistry = shared('symbol-registry')
    , AllSymbols     = shared('symbols')
    , useNative      = typeof $Symbol == 'function'
    , ObjectProto    = Object.prototype;
  
  var setSymbolDesc = SUPPORT_DESC ? function(){ // fallback for old Android
    try {
      return _create(setDesc({}, HIDDEN, {
        get: function(){
          return setDesc(this, HIDDEN, {value: false})[HIDDEN];
        }
      }))[HIDDEN] || setDesc;
    } catch(e){
      return function(it, key, D){
        var protoDesc = getDesc(ObjectProto, key);
        if(protoDesc)delete ObjectProto[key];
        setDesc(it, key, D);
        if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
      };
    }
  }() : setDesc;
  
  var wrap = function(tag){
    var sym = AllSymbols[tag] = _create($Symbol.prototype);
    sym._k = tag;
    SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value){
        if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      }
    });
    return sym;
  };
  
  var $defineProperty = function defineProperty(it, key, D){
    if(D && has(AllSymbols, key)){
      if(!D.enumerable){
        if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
        D = _create(D, {enumerable: createDesc(0, false)});
      } return setSymbolDesc(it, key, D);
    } return setDesc(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P){
    anObject(it);
    var keys = enumKeys(P = toIObject(P))
      , i    = 0
      , l = keys.length
      , key;
    while(l > i)$defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P){
    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key){
    var E = isEnum.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
      ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
    var D = getDesc(it = toIObject(it), key);
    if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it){
    var names  = getNames(toIObject(it))
      , result = []
      , i      = 0
      , key;
    while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
    return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
    var names  = getNames(toIObject(it))
      , result = []
      , i      = 0
      , key;
    while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
    return result;
  };
  
  // 19.4.1.1 Symbol([description])
  if(!useNative){
    $Symbol = function Symbol(){
      if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments[0]));
    };
    $redef($Symbol.prototype, 'toString', function toString(){
      return this._k;
    });
  
    $.create     = $create;
    $.isEnum     = $propertyIsEnumerable;
    $.getDesc    = $getOwnPropertyDescriptor;
    $.setDesc    = $defineProperty;
    $.setDescs   = $defineProperties;
    $.getNames   = $names.get = $getOwnPropertyNames;
    $.getSymbols = $getOwnPropertySymbols;
  
    if(SUPPORT_DESC && !__webpack_require__(52)){
      $redef(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }
  }
  
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values in objects to JSON as null
  if(!useNative || __webpack_require__(7)(function(){
    return JSON.stringify([{a: $Symbol()}, [$Symbol()]]) != '[{},[null]]';
  }))$redef($Symbol.prototype, 'toJSON', function toJSON(){
    if(useNative && isObject(this))return this;
  });
  
  var symbolStatics = {
    // 19.4.2.1 Symbol.for(key)
    'for': function(key){
      return has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(key){
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function(){ setter = true; },
    useSimple: function(){ setter = false; }
  };
  // 19.4.2.2 Symbol.hasInstance
  // 19.4.2.3 Symbol.isConcatSpreadable
  // 19.4.2.4 Symbol.iterator
  // 19.4.2.6 Symbol.match
  // 19.4.2.8 Symbol.replace
  // 19.4.2.9 Symbol.search
  // 19.4.2.10 Symbol.species
  // 19.4.2.11 Symbol.split
  // 19.4.2.12 Symbol.toPrimitive
  // 19.4.2.13 Symbol.toStringTag
  // 19.4.2.14 Symbol.unscopables
  $.each.call((
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
      'species,split,toPrimitive,toStringTag,unscopables'
    ).split(','), function(it){
      var sym = wks(it);
      symbolStatics[it] = useNative ? sym : wrap(sym);
    }
  );
  
  setter = true;
  
  $def($def.G + $def.W, {Symbol: $Symbol});
  
  $def($def.S, 'Symbol', symbolStatics);
  
  $def($def.S + $def.F * !useNative, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  });
  
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  setTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  setTag(global.JSON, 'JSON', true);

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $            = __webpack_require__(2)
    , weak         = __webpack_require__(66)
    , isObject     = __webpack_require__(3)
    , has          = __webpack_require__(11)
    , frozenStore  = weak.frozenStore
    , WEAK         = weak.WEAK
    , isExtensible = Object.isExtensible || isObject
    , tmp          = {};
  
  // 23.3 WeakMap Objects
  var $WeakMap = __webpack_require__(41)('WeakMap', function(get){
    return function WeakMap(){ return get(this, arguments[0]); };
  }, {
    // 23.3.3.3 WeakMap.prototype.get(key)
    get: function get(key){
      if(isObject(key)){
        if(!isExtensible(key))return frozenStore(this).get(key);
        if(has(key, WEAK))return key[WEAK][this._i];
      }
    },
    // 23.3.3.5 WeakMap.prototype.set(key, value)
    set: function set(key, value){
      return weak.def(this, key, value);
    }
  }, weak, true, true);
  
  // IE11 WeakMap frozen keys fix
  if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
    $.each.call(['delete', 'has', 'get', 'set'], function(key){
      var proto  = $WeakMap.prototype
        , method = proto[key];
      __webpack_require__(15)(proto, key, function(a, b){
        // store frozen objects on leaky map
        if(isObject(a) && !isExtensible(a)){
          var result = frozenStore(this)[key](a, b);
          return key == 'set' ? this : result;
        // store all the rest on native weakmap
        } return method.call(this, a, b);
      });
    });
  }

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var weak = __webpack_require__(66);
  
  // 23.4 WeakSet Objects
  __webpack_require__(41)('WeakSet', function(get){
    return function WeakSet(){ return get(this, arguments[0]); };
  }, {
    // 23.4.3.1 WeakSet.prototype.add(value)
    add: function add(value){
      return weak.def(this, value, true);
    }
  }, weak, false, true);

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def      = __webpack_require__(1)
    , $includes = __webpack_require__(63)(true);
  $def($def.P, 'Array', {
    // https://github.com/domenic/Array.prototype.includes
    includes: function includes(el /*, fromIndex = 0 */){
      return $includes(this, el, arguments[1]);
    }
  });
  __webpack_require__(27)('includes');

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $def  = __webpack_require__(1);
  
  $def($def.P, 'Map', {toJSON: __webpack_require__(65)('Map')});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  // http://goo.gl/XkBrjD
  var $def     = __webpack_require__(1)
    , $entries = __webpack_require__(78)(true);
  
  $def($def.S, 'Object', {
    entries: function entries(it){
      return $entries(it);
    }
  });

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

  // https://gist.github.com/WebReflection/9353781
  var $          = __webpack_require__(2)
    , $def       = __webpack_require__(1)
    , ownKeys    = __webpack_require__(79)
    , toIObject  = __webpack_require__(17)
    , createDesc = __webpack_require__(25);
  
  $def($def.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
      var O       = toIObject(object)
        , setDesc = $.setDesc
        , getDesc = $.getDesc
        , keys    = ownKeys(O)
        , result  = {}
        , i       = 0
        , key, D;
      while(keys.length > i){
        D = getDesc(O, key = keys[i++]);
        if(key in result)setDesc(result, key, createDesc(0, D));
        else result[key] = D;
      } return result;
    }
  });

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  // http://goo.gl/XkBrjD
  var $def    = __webpack_require__(1)
    , $values = __webpack_require__(78)(false);
  
  $def($def.S, 'Object', {
    values: function values(it){
      return $values(it);
    }
  });

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/benjamingr/RexExp.escape
  var $def = __webpack_require__(1)
    , $re  = __webpack_require__(109)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
  $def($def.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $def  = __webpack_require__(1);
  
  $def($def.P, 'Set', {toJSON: __webpack_require__(65)('Set')});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/mathiasbynens/String.prototype.at
  'use strict';
  var $def = __webpack_require__(1)
    , $at  = __webpack_require__(55)(true);
  $def($def.P, 'String', {
    at: function at(pos){
      return $at(this, pos);
    }
  });

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(1)
    , $pad = __webpack_require__(82);
  $def($def.P, 'String', {
    padLeft: function padLeft(maxLength /*, fillString = ' ' */){
      return $pad(this, maxLength, arguments[1], true);
    }
  });

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(1)
    , $pad = __webpack_require__(82);
  $def($def.P, 'String', {
    padRight: function padRight(maxLength /*, fillString = ' ' */){
      return $pad(this, maxLength, arguments[1], false);
    }
  });

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // https://github.com/sebmarkbage/ecmascript-string-left-right-trim
  __webpack_require__(57)('trimLeft', function($trim){
    return function trimLeft(){
      return $trim(this, 1);
    };
  });

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // https://github.com/sebmarkbage/ecmascript-string-left-right-trim
  __webpack_require__(57)('trimRight', function($trim){
    return function trimRight(){
      return $trim(this, 2);
    };
  });

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

  // JavaScript 1.6 / Strawman array statics shim
  var $       = __webpack_require__(2)
    , $def    = __webpack_require__(1)
    , $Array  = __webpack_require__(18).Array || Array
    , statics = {};
  var setStatics = function(keys, length){
    $.each.call(keys.split(','), function(key){
      if(length == undefined && key in $Array)statics[key] = $Array[key];
      else if(key in [])statics[key] = __webpack_require__(22)(Function.call, [][key], length);
    });
  };
  setStatics('pop,reverse,shift,keys,values,entries', 1);
  setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
             'reduce,reduceRight,copyWithin,fill');
  $def($def.S, 'Array', statics);

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(86);
  var global      = __webpack_require__(6)
    , hide        = __webpack_require__(13)
    , Iterators   = __webpack_require__(31)
    , ITERATOR    = __webpack_require__(8)('iterator')
    , NL          = global.NodeList
    , HTC         = global.HTMLCollection
    , NLProto     = NL && NL.prototype
    , HTCProto    = HTC && HTC.prototype
    , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
  if(NL && !(ITERATOR in NLProto))hide(NLProto, ITERATOR, ArrayValues);
  if(HTC && !(ITERATOR in HTCProto))hide(HTCProto, ITERATOR, ArrayValues);

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

  var $def  = __webpack_require__(1)
    , $task = __webpack_require__(84);
  $def($def.G + $def.B, {
    setImmediate:   $task.set,
    clearImmediate: $task.clear
  });

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

  // ie9- setTimeout & setInterval additional parameters fix
  var global     = __webpack_require__(6)
    , $def       = __webpack_require__(1)
    , invoke     = __webpack_require__(43)
    , partial    = __webpack_require__(107)
    , navigator  = global.navigator
    , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
  var wrap = function(set){
    return MSIE ? function(fn, time /*, ...args */){
      return set(invoke(
        partial,
        [].slice.call(arguments, 2),
        typeof fn == 'function' ? fn : Function(fn)
      ), time);
    } : set;
  };
  $def($def.G + $def.B + $def.F * MSIE, {
    setTimeout:  wrap(global.setTimeout),
    setInterval: wrap(global.setInterval)
  });

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(110);
  __webpack_require__(193);
  __webpack_require__(148);
  __webpack_require__(156);
  __webpack_require__(160);
  __webpack_require__(161);
  __webpack_require__(149);
  __webpack_require__(159);
  __webpack_require__(158);
  __webpack_require__(154);
  __webpack_require__(155);
  __webpack_require__(153);
  __webpack_require__(150);
  __webpack_require__(152);
  __webpack_require__(157);
  __webpack_require__(151);
  __webpack_require__(119);
  __webpack_require__(118);
  __webpack_require__(138);
  __webpack_require__(139);
  __webpack_require__(140);
  __webpack_require__(141);
  __webpack_require__(142);
  __webpack_require__(143);
  __webpack_require__(144);
  __webpack_require__(145);
  __webpack_require__(146);
  __webpack_require__(147);
  __webpack_require__(121);
  __webpack_require__(122);
  __webpack_require__(123);
  __webpack_require__(124);
  __webpack_require__(125);
  __webpack_require__(126);
  __webpack_require__(127);
  __webpack_require__(128);
  __webpack_require__(129);
  __webpack_require__(130);
  __webpack_require__(131);
  __webpack_require__(132);
  __webpack_require__(133);
  __webpack_require__(134);
  __webpack_require__(135);
  __webpack_require__(136);
  __webpack_require__(137);
  __webpack_require__(186);
  __webpack_require__(189);
  __webpack_require__(192);
  __webpack_require__(188);
  __webpack_require__(184);
  __webpack_require__(185);
  __webpack_require__(187);
  __webpack_require__(190);
  __webpack_require__(191);
  __webpack_require__(115);
  __webpack_require__(116);
  __webpack_require__(86);
  __webpack_require__(117);
  __webpack_require__(111);
  __webpack_require__(112);
  __webpack_require__(114);
  __webpack_require__(113);
  __webpack_require__(177);
  __webpack_require__(178);
  __webpack_require__(179);
  __webpack_require__(180);
  __webpack_require__(181);
  __webpack_require__(182);
  __webpack_require__(162);
  __webpack_require__(120);
  __webpack_require__(183);
  __webpack_require__(194);
  __webpack_require__(195);
  __webpack_require__(163);
  __webpack_require__(164);
  __webpack_require__(165);
  __webpack_require__(166);
  __webpack_require__(167);
  __webpack_require__(170);
  __webpack_require__(168);
  __webpack_require__(169);
  __webpack_require__(171);
  __webpack_require__(172);
  __webpack_require__(173);
  __webpack_require__(174);
  __webpack_require__(176);
  __webpack_require__(175);
  __webpack_require__(196);
  __webpack_require__(203);
  __webpack_require__(204);
  __webpack_require__(205);
  __webpack_require__(206);
  __webpack_require__(207);
  __webpack_require__(201);
  __webpack_require__(199);
  __webpack_require__(200);
  __webpack_require__(198);
  __webpack_require__(197);
  __webpack_require__(202);
  __webpack_require__(208);
  __webpack_require__(211);
  __webpack_require__(210);
  __webpack_require__(209);
  module.exports = __webpack_require__(18);

/***/ },
/* 213 */
/***/ function(module, exports) {

  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  
  !(function(global) {
    "use strict";
  
    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol =
      typeof Symbol === "function" && Symbol.iterator || "@@iterator";
  
    var inModule = typeof module === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }
  
    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = Object.create((outerFn || Generator).prototype);
  
      generator._invoke = makeInvokeMethod(
        innerFn, self || null,
        new Context(tryLocsList || [])
      );
  
      return generator;
    }
    runtime.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = "GeneratorFunction";
  
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }
  
    runtime.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };
  
    runtime.mark = function(genFun) {
      genFun.__proto__ = GeneratorFunctionPrototype;
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
  
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `value instanceof AwaitArgument` to determine if the yielded value is
    // meant to be awaited. Some may consider the name of this method too
    // cutesy, but they are curmudgeons.
    runtime.awrap = function(arg) {
      return new AwaitArgument(arg);
    };
  
    function AwaitArgument(arg) {
      this.arg = arg;
    }
  
    function AsyncIterator(generator) {
      // This invoke function is written in a style that assumes some
      // calling function (or Promise) will handle exceptions.
      function invoke(method, arg) {
        var result = generator[method](arg);
        var value = result.value;
        return value instanceof AwaitArgument
          ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
          : Promise.resolve(value).then(function(unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration. If the Promise is rejected, however, the
              // result for this iteration will be rejected with the same
              // reason. Note that rejections of yielded Promises are not
              // thrown back into the generator function, as is the case
              // when an awaited Promise is rejected. This difference in
              // behavior between yield and await is important, because it
              // allows the consumer to decide what to do with the yielded
              // rejection (swallow it and continue, manually .throw it back
              // into the generator, abandon iteration, whatever). With
              // await, by contrast, there is no opportunity to examine the
              // rejection reason outside the generator function, so the
              // only option is to throw it from the await expression, and
              // let the generator function handle the exception.
              result.value = unwrapped;
              return result;
            });
      }
  
      if (typeof process === "object" && process.domain) {
        invoke = process.domain.bind(invoke);
      }
  
      var invokeNext = invoke.bind(generator, "next");
      var invokeThrow = invoke.bind(generator, "throw");
      var invokeReturn = invoke.bind(generator, "return");
      var previousPromise;
  
      function enqueue(method, arg) {
        var enqueueResult =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(function() {
            return invoke(method, arg);
          }) : new Promise(function(resolve) {
            resolve(invoke(method, arg));
          });
  
        // Avoid propagating enqueueResult failures to Promises returned by
        // later invocations of the iterator.
        previousPromise = enqueueResult["catch"](function(ignored){});
  
        return enqueueResult;
      }
  
      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }
  
    defineIteratorMethods(AsyncIterator.prototype);
  
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );
  
      return runtime.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
  
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            if (method === "return" ||
                (method === "throw" && delegate.iterator[method] === undefined)) {
              // A return or throw (when the delegate iterator has no throw
              // method) always terminates the yield* loop.
              context.delegate = null;
  
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              var returnMethod = delegate.iterator["return"];
              if (returnMethod) {
                var record = tryCatch(returnMethod, delegate.iterator, arg);
                if (record.type === "throw") {
                  // If the return method threw an exception, let that
                  // exception prevail over the original return or throw.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }
              }
  
              if (method === "return") {
                // Continue with the outer return, now that the delegate
                // iterator has been terminated.
                continue;
              }
            }
  
            var record = tryCatch(
              delegate.iterator[method],
              delegate.iterator,
              arg
            );
  
            if (record.type === "throw") {
              context.delegate = null;
  
              // Like returning generator.throw(uncaught), but without the
              // overhead of an extra function call.
              method = "throw";
              arg = record.arg;
              continue;
            }
  
            // Delegate generator ran and handled its own exceptions so
            // regardless of what the method was, we continue as if it is
            // "next" with an undefined arg.
            method = "next";
            arg = undefined;
  
            var info = record.arg;
            if (info.done) {
              context[delegate.resultName] = info.value;
              context.next = delegate.nextLoc;
            } else {
              state = GenStateSuspendedYield;
              return info;
            }
  
            context.delegate = null;
          }
  
          if (method === "next") {
            if (state === GenStateSuspendedYield) {
              context.sent = arg;
            } else {
              context.sent = undefined;
            }
  
          } else if (method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw arg;
            }
  
            if (context.dispatchException(arg)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = "next";
              arg = undefined;
            }
  
          } else if (method === "return") {
            context.abrupt("return", arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;
  
            var info = {
              value: record.arg,
              done: context.done
            };
  
            if (record.arg === ContinueSentinel) {
              if (context.delegate && method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                arg = undefined;
              }
            } else {
              return info;
            }
  
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(arg) call above.
            method = "throw";
            arg = record.arg;
          }
        }
      };
    }
  
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
  
    Gp[iteratorSymbol] = function() {
      return this;
    };
  
    Gp.toString = function() {
      return "[object Generator]";
    };
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
  
    runtime.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.tryEntries.forEach(resetTryEntry);
  
        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
  
      stop: function() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          return !!caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
  
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.next = finallyEntry.finallyLoc;
        } else {
          this.complete(record);
        }
  
        return ContinueSentinel;
      },
  
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = record.arg;
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
      },
  
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
  
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        return ContinueSentinel;
      }
    };
  })(
    // Among the various tricks for obtaining a reference to the global
    // object, this seems to be the most reliable technique that does not
    // use indirect eval (which violates Content Security Policy).
    typeof global === "object" ? global :
    typeof window === "object" ? window :
    typeof self === "object" ? self : this
  );


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(103);


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _superagent = __webpack_require__(62);
  
  var _superagent2 = _interopRequireDefault(_superagent);
  
  var _reactLibExecutionEnvironment = __webpack_require__(28);
  
  var _dispatchersDispatcher = __webpack_require__(48);
  
  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);
  
  var _constantsActionTypes = __webpack_require__(35);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  exports['default'] = {
  
    navigateTo: function navigateTo(path, options) {
      console.log('AppActions.navigateTo()| path:', path);
      console.log('AppActions.navigateTo()| options:', options);
      this.loadPage(path, function () {
        if (_reactLibExecutionEnvironment.canUseDOM) {
          if (options && options.replace) {
            window.history.replaceState({}, document.title, path);
          } else {
            window.history.pushState({}, document.title, path);
          }
        }
  
        _dispatchersDispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].CHANGE_LOCATION,
          path: path
        });
      });
    },
  
    loadPage: function loadPage(path, cb) {
      console.log('AppActions.loadPage()| path:', path);
      _dispatchersDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].GET_PAGE,
        path: path
      });
  
      _superagent2['default'].get('/routeapi/query?path=' + encodeURI(path)).accept('application/json').end(function (err, res) {
        _dispatchersDispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].RECEIVE_PAGE,
          path: path,
          err: err,
          page: res ? res.body : null
        });
  
        if (cb) {
          cb();
        }
      });
    }
  
  };
  module.exports = exports['default'];

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FeedbackLess = __webpack_require__(234);
  
  var _FeedbackLess2 = _interopRequireDefault(_FeedbackLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _decoratorsWithViewport = __webpack_require__(92);
  
  var _decoratorsWithViewport2 = _interopRequireDefault(_decoratorsWithViewport);
  
  var Feedback = (function () {
    function Feedback() {
      _classCallCheck(this, _Feedback);
    }
  
    _createClass(Feedback, [{
      key: 'render',
      value: function render() {
        var _props$viewport = this.props.viewport;
        var width = _props$viewport.width;
        var height = _props$viewport.height;
  
        var feedbackClassName = "feedback";
        if (width < 340) {
          feedbackClassName += " bottom";
        }
        return _react2['default'].createElement(
          'div',
          { className: feedbackClassName },
          _react2['default'].createElement(
            'div',
            { className: 'feedback-container' },
            _react2['default'].createElement(
              'a',
              { className: 'feedback-link', href: 'https://github.com/amit242/antyka/issues/new' },
              'Ask a question'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'feedback-spacer' },
              '|'
            ),
            _react2['default'].createElement(
              'a',
              { className: 'feedback-link', href: 'https://github.com/amit242/antyka/issues/new' },
              'Report an issue'
            )
          )
        );
      }
    }]);
  
    var _Feedback = Feedback;
    Feedback = (0, _decoratorsWithStyles2['default'])(_FeedbackLess2['default'])(Feedback) || Feedback;
    Feedback = (0, _decoratorsWithViewport2['default'])(Feedback) || Feedback;
    return Feedback;
  })();
  
  exports['default'] = Feedback;
  module.exports = exports['default'];

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FooterLess = __webpack_require__(235);
  
  var _FooterLess2 = _interopRequireDefault(_FooterLess);
  
  var _decoratorsWithViewport = __webpack_require__(92);
  
  var _decoratorsWithViewport2 = _interopRequireDefault(_decoratorsWithViewport);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _reactRouter = __webpack_require__(24);
  
  var Footer = (function () {
    function Footer() {
      _classCallCheck(this, _Footer);
    }
  
    _createClass(Footer, [{
      key: 'render',
  
      /*componentWillMount() {
        let { width, height } = this.props.viewport;
        console.log('Footer componentWillMount()|', arguments, width, height);
      }
      componentDidMount(rootNode) {
        let { width, height } = this.props.viewport;
        console.log('Footer componentDidMount()|', arguments, width, height);
      }*/
      value: function render() {
        // This is just an example how one can render CSS
        var _props$viewport = this.props.viewport;
        var width = _props$viewport.width;
        var height = _props$viewport.height;
  
        //console.log('Footer render()|', width, height);
        // let width=400;
        // let height=700;
        this.renderCss('.Footer-viewport:after {content:\' ' + width + 'x' + height + '\';}');
        var viewportString;
  
        // console.log'FOOTER render', this.isSmallViewport);
        var footerClassName = "Footer";
        if (width < 340) {
          footerClassName += " hide";
        }
        /*if(width < 630) {
          viewportString = '';
        } else {
          viewportString = 'Viewport:';
        }*/
        return _react2['default'].createElement(
          'div',
          { className: footerClassName },
          _react2['default'].createElement(
            'div',
            { className: 'Footer-container' },
            _react2['default'].createElement(
              'span',
              { className: 'Footer-text' },
              '© scomart'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              ' | '
            ),
            _react2['default'].createElement(
              'span',
              { ref: 'viewport', className: 'Footer-viewport Footer-text Footer-text--muted' },
              viewportString
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '|'
            ),
            _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: '/' },
              'Home'
            ),
            !this.props.LoginState.userLoggedIn && _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            !this.props.LoginState.userLoggedIn && _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: 'login' },
              'Log in'
            ),
            width > 350 && _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              ' | '
            ),
            width > 350 && _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: 'about' },
              'About'
            ),
            width > 420 && _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            width > 420 && _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: 'contact' },
              'Contact'
            ),
            width > 480 && _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            width > 480 && _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: 'privacy' },
              'Privacy'
            )
          )
        );
        /*return (
          <div className={footerClassName}>
            <div className="Footer-container">
              <span className="Footer-text">© scomart</span>
              <span className="Footer-spacer"> | </span>
              <span ref="viewport" className="Footer-viewport Footer-text Footer-text--muted">{viewportString}</span>
              <span className="Footer-spacer">|</span>
              <a className="Footer-link" href="/" onClick={Link.handleClick}>Home</a>
              
              {!this.props.LoginState.userLoggedIn && (<span className="Footer-spacer">·</span>)}
              {!this.props.LoginState.userLoggedIn && (<Link className="Footer-link" to="login">Log in</Link>)}
              <span className="Footer-spacer">·</span>
              <a className="Footer-link" href="/not-found" onClick={Link.handleClick}>Not Found</a>
              <span className="Footer-spacer"> | </span>
              <a className="Footer-link" href="/about" onClick={Link.handleClick}>About</a>
              <span className="Footer-spacer">·</span>
              <a className="Footer-link" href="/contact" onClick={Link.handleClick}>Contact</a>
              <span className="Footer-spacer">·</span>
              <a className="Footer-link" href="/privacy" onClick={Link.handleClick}>Privacy</a>
            </div>
          </div>
        );*/
      }
    }], [{
      key: 'propTypes',
      value: {
        viewport: _react.PropTypes.shape({
          width: _react.PropTypes.number.isRequired,
          height: _react.PropTypes.number.isRequired
        }).isRequired
      },
      enumerable: true
    }]);
  
    var _Footer = Footer;
    Footer = (0, _decoratorsWithStyles2['default'])(_FooterLess2['default'])(Footer) || Footer;
    Footer = (0, _decoratorsWithViewport2['default'])(Footer) || Footer;
    return Footer;
  })();
  
  exports['default'] = Footer;
  module.exports = exports['default'];

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeaderLess = __webpack_require__(236);
  
  var _HeaderLess2 = _interopRequireDefault(_HeaderLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _reactRouter = __webpack_require__(24);
  
  var _Navigation = __webpack_require__(221);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var Header = (function () {
    function Header() {
      _classCallCheck(this, _Header);
    }
  
    _createClass(Header, [{
      key: 'render',
      value: function render() {
        console.log('Header.render()| props:', this.props);
        return _react2['default'].createElement(
          'div',
          { className: 'Header' },
          _react2['default'].createElement(
            'div',
            { className: 'Header-container' },
            _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Header-brand', to: '/' },
              _react2['default'].createElement('img', { className: 'Header-brandImg', src: __webpack_require__(249), width: '114', height: '50', alt: 'scomart' })
            ),
            _react2['default'].createElement(_Navigation2['default'], _extends({ className: 'Header-nav' }, this.props)),
            _react2['default'].createElement('div', { className: 'Header-banner' })
          )
        );
      }
    }]);
  
    var _Header = Header;
    Header = (0, _decoratorsWithStyles2['default'])(_HeaderLess2['default'])(Header) || Header;
    return Header;
  })();
  
  exports['default'] = Header;
  module.exports = exports['default'];

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LoadingPageLess = __webpack_require__(237);
  
  var _LoadingPageLess2 = _interopRequireDefault(_LoadingPageLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  //import withAuthentication from '../../decorators/withAuthentication';
  //import { Link } from 'react-router';
  
  var LoadingPage = (function (_React$Component) {
    _inherits(LoadingPage, _React$Component);
  
    function LoadingPage() {
      _classCallCheck(this, _LoadingPage);
  
      _get(Object.getPrototypeOf(_LoadingPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(LoadingPage, [{
      key: 'render',
  
      //onPageNotFound: PropTypes.func.isRequired
      value: function render() {
        //let title = this.props.user.name;
        this.context.onSetTitle('loading page');
        return _react2['default'].createElement(
          'div',
          { className: 'loading' },
          _react2['default'].createElement('img', { className: 'loading-image', src: __webpack_require__(248), alt: 'page loading...' })
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired },
      enumerable: true
    }]);
  
    var _LoadingPage = LoadingPage;
    LoadingPage = (0, _decoratorsWithStyles2['default'])(_LoadingPageLess2['default'])(LoadingPage) || LoadingPage;
    return LoadingPage;
  })(_react2['default'].Component);
  
  exports['default'] = LoadingPage;
  module.exports = exports['default'];

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LoginLess = __webpack_require__(239);
  
  var _LoginLess2 = _interopRequireDefault(_LoginLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _TextBox = __webpack_require__(60);
  
  var _TextBox2 = _interopRequireDefault(_TextBox);
  
  var _reactRouter = __webpack_require__(24);
  
  var _classnames = __webpack_require__(38);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  //import AppActions from '../../actions/AppActions';
  
  var _servicesAuthService = __webpack_require__(36);
  
  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);
  
  var Login = (function (_React$Component) {
    _inherits(Login, _React$Component);
  
    _createClass(Login, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function Login() {
      _classCallCheck(this, _Login);
  
      _get(Object.getPrototypeOf(_Login.prototype), 'constructor', this).call(this);
  
      this.state = {
        userId: '',
        password: '',
        loginError: false
      };
    }
  
    _createClass(Login, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        //console.log('componentDidMount', this);
      }
    }, {
      key: 'userNameChanged',
      value: function userNameChanged(event) {
        this.setState({ userId: event.target.value });
      }
    }, {
      key: 'passwordChanged',
      value: function passwordChanged(event) {
        this.setState({ password: event.target.value });
      }
    }, {
      key: 'authenticate',
      value: function authenticate(e) {
        var _this = this;
  
        e.preventDefault();
        //alert(this.state);
        console.log('Login.authenticate()| state:', this.state, e);
        _servicesAuthService2['default'].login(this.state.userId, this.state.password, function () {
          _this.setState({ loginError: true });
        });
        //alert(this.state);
        //   .catch(function(err) {
        //     console.log('Error logging in', err);
        //   });
      }
    }, {
      key: 'render',
      value: function render() {
        //console.log('amit', this);
        var title = 'Login';
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'Login-container') },
          _react2['default'].createElement(
            'form',
            null,
            _react2['default'].createElement(_TextBox2['default'], { className: 'Login-TextBox', ref: 'userId', value: this.userId, type: 'text', placeholder: 'Email', onChange: this.userNameChanged.bind(this) }),
            _react2['default'].createElement(_TextBox2['default'], { className: 'Login-TextBox', ref: 'password', value: this.password, type: 'password', placeholder: 'Password', onChange: this.passwordChanged.bind(this) }),
            this.state.loginError && _react2['default'].createElement(
              'span',
              { className: 'Login-error' },
              'Invalid userId/password'
            ),
            _react2['default'].createElement(
              'div',
              { className: 'Login-helper' },
              _react2['default'].createElement(
                'label',
                null,
                _react2['default'].createElement('input', { type: 'checkbox', ref: 'rememberme' }),
                _react2['default'].createElement(
                  'span',
                  null,
                  'Remember me'
                )
              ),
              _react2['default'].createElement(
                'a',
                { className: 'Login-helper-forgot', href: '/account/reset_password' },
                'Forgot password?'
              )
            ),
            _react2['default'].createElement('input', { type: 'submit', onClick: this.authenticate.bind(this), value: 'Log in' })
          )
        );
      }
    }]);
  
    var _Login = Login;
    Login = (0, _decoratorsWithStyles2['default'])(_LoginLess2['default'])(Login) || Login;
    return Login;
  })(_react2['default'].Component);
  
  exports['default'] = Login;
  module.exports = exports['default'];

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(38);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _NavigationLess = __webpack_require__(240);
  
  var _NavigationLess2 = _interopRequireDefault(_NavigationLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _servicesAuthService = __webpack_require__(36);
  
  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);
  
  var _reactRouter = __webpack_require__(24);
  
  //import Link from '../../utils/Link';
  
  var Navigation = (function () {
    function Navigation() {
      _classCallCheck(this, _Navigation);
    }
  
    _createClass(Navigation, [{
      key: 'logout',
      value: function logout(e) {
        e.preventDefault();
        _servicesAuthService2['default'].logout();
      }
    }, {
      key: 'render',
      value: function render() {
        console.log('Navigation.render()| props:', this.props);
        var navContent = undefined;
        if (this.props.LoginState.userLoggedIn) {
          navContent = _react2['default'].createElement(
            'a',
            { href: '', className: 'navigation-link', onClick: this.logout },
            'Logout'
          );
        }
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'navigation'), role: 'navigation' },
          _react2['default'].createElement(
            'div',
            { className: 'navigation-container' },
            this.props.LoginState && this.props.LoginState.userLoggedIn && _react2['default'].createElement(
              'div',
              null,
              'Welcome ',
              _react2['default'].createElement(
                _reactRouter.Link,
                { className: 'navigation-link', to: '/' },
                this.props.LoginState.user.name
              )
            ),
            navContent
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        className: _react.PropTypes.string
      },
      enumerable: true
    }]);
  
    var _Navigation = Navigation;
    Navigation = (0, _decoratorsWithStyles2['default'])(_NavigationLess2['default'])(Navigation) || Navigation;
    return Navigation;
  })();
  
  exports['default'] = Navigation;
  module.exports = exports['default'];

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _NotFoundPageLess = __webpack_require__(241);
  
  var _NotFoundPageLess2 = _interopRequireDefault(_NotFoundPageLess);
  
  var NotFoundPage = (function () {
    function NotFoundPage() {
      _classCallCheck(this, _NotFoundPage);
    }
  
    _createClass(NotFoundPage, [{
      key: 'render',
      value: function render() {
        var title = 'Page Not Found';
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _NotFoundPage = NotFoundPage;
    NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageLess2['default'])(NotFoundPage) || NotFoundPage;
    return NotFoundPage;
  })();
  
  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SetPasswordLess = __webpack_require__(243);
  
  var _SetPasswordLess2 = _interopRequireDefault(_SetPasswordLess);
  
  var _decoratorsWithStyles = __webpack_require__(9);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _TextBox = __webpack_require__(60);
  
  var _TextBox2 = _interopRequireDefault(_TextBox);
  
  var _actionsLoginAction = __webpack_require__(87);
  
  var _actionsLoginAction2 = _interopRequireDefault(_actionsLoginAction);
  
  var _storesLoginStore = __webpack_require__(37);
  
  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);
  
  var _servicesAuthService = __webpack_require__(36);
  
  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);
  
  var _classnames = __webpack_require__(38);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _reactRouter = __webpack_require__(24);
  
  var LoginPage = (function (_React$Component) {
    _inherits(LoginPage, _React$Component);
  
    _createClass(LoginPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function LoginPage() {
      _classCallCheck(this, _LoginPage);
  
      _get(Object.getPrototypeOf(_LoginPage.prototype), 'constructor', this).call(this);
  
      this.state = {
        newPwd: '',
        confirmPwd: '',
        updateResponse: null
      };
    }
  
    _createClass(LoginPage, [{
      key: '_getUser',
      value: function _getUser() {
        return _storesLoginStore2['default'].user;
      }
    }, {
      key: '_onchange',
      value: function _onchange(event) {
        //console.log('RegisterPage._onchange()| event:', event.target);
        var controlState = {};
        controlState[event.target.id] = event.target.value;
        //console.log('RegisterPage._onchange()| controlState:', controlState);
        this.setState(controlState);
      }
  
      /*_onChange() {
        console.log('SetPassword._onChange()| LoginStore changed!!!');
        this.setState(this._getLoginState());
      }*/
  
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        //LoginStore.removeChangeListener(this.changeListener);
        console.log('SetPassword.componentWillMount()| query: ', this.props.query, this.props.user);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        //this.changeListener = this._onChange.bind(this);
        //LoginStore.addChangeListener(this.changeListener);
        console.log('SetPassword.componentDidMount()| query: ', this.props.query);
        if (this.props.query && this.props.query.key) {
          _actionsLoginAction2['default'].verifyJWT(this.props.query.key);
        } else {}
      }
    }, {
      key: 'updatePassword',
      value: function updatePassword(e) {
        var _this = this;
  
        e.preventDefault();
        //alert(this.state);
        console.log('SetPassword.updatePassword()| state:', this.state, e);
        var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
  
        if (this.state.newPwd === this.state.confirmPwd) {
          if (pattern.test(this.state.newPwd)) {
            var user = this._getUser();
            user.password = this.state.newPwd;
  
            _servicesAuthService2['default'].changePassword(user, function (response) {
              _this.setState({ updateResponse: response });
            }, function (response) {
              _this.setState({ updateResponse: response });
            });
          } else {
            alert('Passwords must have: \nMinimum 8 characters\nAt least 1 Alphabet, 1 Number and 1 Special Character\nNo spaces');
          }
        } else {
          alert('Passwords dont match');
        }
      }
    }, {
      key: 'render',
      value: function render() {
        //console.log('amit', this);
        var title = 'Set/Reset Password';
        this.context.onSetTitle(title);
        console.log('SetPassword.render()| user: ', this._getUser());
        var pwdMatch = undefined;
        if (this.state.newPwd !== this.state.confirmPwd) {
          pwdMatch = 'SetPassword-textbox-error';
        }
        var component = undefined;
        console.log('PWD server response:', this.state.updateResponse);
  
        if (this.state.updateResponse) {
          var classname = undefined,
              message = this.state.updateResponse.message;
          if (this.state.updateResponse.success) {
            classname = 'SetPassword-success';
            message = _react2['default'].createElement(
              'div',
              null,
              message,
              'Please ',
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: 'login' },
                'login'
              ),
              ' with the new password...'
            );
          } else {
            classname = 'SetPassword-error';
          }
          component = _react2['default'].createElement(
            'div',
            { className: classname },
            message
          );
        } else {
          var user = this._getUser();
          if (user && user.name) {
            component = _react2['default'].createElement(
              'div',
              { className: 'SetPassword-container' },
              _react2['default'].createElement(
                'div',
                null,
                'Hello ',
                _react2['default'].createElement(
                  'b',
                  null,
                  user.name
                ),
                ', ',
                _react2['default'].createElement('br', null),
                ' Please update your Password'
              ),
              _react2['default'].createElement(_TextBox2['default'], { id: 'newPwd', className: 'SetPassword-textbox', controlClassName: pwdMatch, ref: 'newPwd', value: this.newPwd, type: 'Password', placeholder: 'Enter New Password', onChange: this._onchange.bind(this) }),
              _react2['default'].createElement(_TextBox2['default'], { id: 'confirmPwd', className: 'SetPassword-textbox', controlClassName: pwdMatch, ref: 'confirmPwd', value: this.confirmPwd, type: 'Password', placeholder: 'Confirm Password', onChange: this._onchange.bind(this) }),
              _react2['default'].createElement('input', { type: 'submit', value: 'Update Password', onClick: this.updatePassword.bind(this) })
            );
          } else if (user && user.invalidToken) {
            component = _react2['default'].createElement(
              'div',
              { className: 'SetPassword-error' },
              'Bad/Expired Token!!!'
            );
          } else {
            component = '';
          }
        }
        return _react2['default'].createElement(
          'div',
          { className: 'SetPassword' },
          component
        );
      }
    }]);
  
    var _LoginPage = LoginPage;
    LoginPage = (0, _decoratorsWithStyles2['default'])(_SetPasswordLess2['default'])(LoginPage) || LoginPage;
    return LoginPage;
  })(_react2['default'].Component);
  
  exports['default'] = LoginPage;
  module.exports = exports['default'];

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _flux = __webpack_require__(98);
  
  exports['default'] = new _flux.Dispatcher();
  module.exports = exports['default'];

/***/ },
/* 225 */
/***/ function(module, exports) {

  'use strict';
  
  module.exports = {
      'secret': 'scomartdbtokenseed',
      'database': 'mongodb://amit:amitadmin@ds051953.mongolab.com:51953/scromartdb'
  };

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  // eslint-disable-line no-unused-vars
  
  var _node_modulesReactLibEmptyFunction = __webpack_require__(246);
  
  var _node_modulesReactLibEmptyFunction2 = _interopRequireDefault(_node_modulesReactLibEmptyFunction);
  
  function withContext(ComposedComponent) {
    return (function () {
      function WithContext() {
        _classCallCheck(this, WithContext);
      }
  
      _createClass(WithContext, [{
        key: 'getChildContext',
        value: function getChildContext() {
  
          var context = this.props.context;
          return {
            onInsertCss: context.onInsertCss || _node_modulesReactLibEmptyFunction2['default'],
            onSetTitle: context.onSetTitle || _node_modulesReactLibEmptyFunction2['default'],
            onSetMeta: context.onSetMeta || _node_modulesReactLibEmptyFunction2['default'],
            onPageNotFound: context.onPageNotFound || _node_modulesReactLibEmptyFunction2['default']
          };
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props;
          var context = _props.context;
  
          var other = _objectWithoutProperties(_props, ['context']);
  
          // eslint-disable-line no-unused-vars
          return _react2['default'].createElement(ComposedComponent, other);
        }
      }], [{
        key: 'propTypes',
        value: {
          context: _react.PropTypes.shape({
            onInsertCss: _react.PropTypes.func,
            onSetTitle: _react.PropTypes.func,
            onSetMeta: _react.PropTypes.func,
            onPageNotFound: _react.PropTypes.func
          })
        },
        enumerable: true
      }, {
        key: 'childContextTypes',
        value: {
          onInsertCss: _react.PropTypes.func.isRequired,
          onSetTitle: _react.PropTypes.func.isRequired,
          onSetMeta: _react.PropTypes.func.isRequired,
          onPageNotFound: _react.PropTypes.func.isRequired
        },
        enumerable: true
      }]);
  
      return WithContext;
    })();
  }
  
  exports['default'] = withContext;
  module.exports = exports['default'];

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

  // get an instance of mongoose and mongoose.Schema
  'use strict';
  
  var mongoose = __webpack_require__(101);
  var Schema = mongoose.Schema;
  
  // set up a mongoose model and pass it using module.exports
  module.exports = mongoose.model('user', new Schema({
      userid: String,
      email: String,
      name: String,
      password: String,
      jwt: String,
      address: String
  }), 'user');

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _express = __webpack_require__(97);
  
  var _coreDatabase = __webpack_require__(90);
  
  var _coreDatabase2 = _interopRequireDefault(_coreDatabase);
  
  var router = new _express.Router();
  
  router.get('/', function callee$0$0(req, res, next) {
    var path, page;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          path = req.query.path;
  
          console.log('Query.route.get(): path:', path);
          if (!path) {
            res.status(400).send({ error: 'The \'path\' query parameter cannot be empty.' });
          }
  
          context$1$0.next = 6;
          return regeneratorRuntime.awrap(_coreDatabase2['default'].getPage(path));
  
        case 6:
          page = context$1$0.sent;
  
          console.log('Query.route.get(): page:', page);
          if (page) {
            res.status(200).send(page);
          } else {
            res.status(404).send({ error: 'The page \'' + path + '\' is not found.' });
          }
          context$1$0.next = 14;
          break;
  
        case 11:
          context$1$0.prev = 11;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 14:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 11]]);
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = __webpack_require__(24);
  
  var _componentsApp = __webpack_require__(88);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _componentsLoginPage = __webpack_require__(58);
  
  var _componentsLoginPage2 = _interopRequireDefault(_componentsLoginPage);
  
  var _componentsUserHomePage = __webpack_require__(89);
  
  var _componentsUserHomePage2 = _interopRequireDefault(_componentsUserHomePage);
  
  var _componentsRegisterPage = __webpack_require__(59);
  
  var _componentsRegisterPage2 = _interopRequireDefault(_componentsRegisterPage);
  
  var _componentsSetPassword = __webpack_require__(223);
  
  var _componentsSetPassword2 = _interopRequireDefault(_componentsSetPassword);
  
  var _componentsNotFoundPage = __webpack_require__(222);
  
  var _componentsNotFoundPage2 = _interopRequireDefault(_componentsNotFoundPage);
  
  module.exports = [_react2['default'].createElement(
    _reactRouter.Route,
    { path: '/', handler: _componentsApp2['default'] },
    _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsUserHomePage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'login', path: '/login', handler: _componentsLoginPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'home', handler: _componentsUserHomePage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'register', path: '/register', handler: _componentsRegisterPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'signup', path: '/signup', handler: _componentsSetPassword2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'about', path: '/notfound', handler: _componentsNotFoundPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'contact', path: '/notfound', handler: _componentsNotFoundPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'privacy', path: '/notfound', handler: _componentsNotFoundPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'notfound', path: '/notfound', handler: _componentsNotFoundPage2['default'] }),
    _react2['default'].createElement(_reactRouter.NotFoundRoute, { handler: _componentsNotFoundPage2['default'] })
  )];

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _events = __webpack_require__(61);
  
  var _events2 = _interopRequireDefault(_events);
  
  var _dispatchersDispatcher = __webpack_require__(48);
  
  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);
  
  var _constantsActionTypes = __webpack_require__(35);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  var _BaseStore2 = __webpack_require__(94);
  
  var _BaseStore3 = _interopRequireDefault(_BaseStore2);
  
  var CHANGE_EVENT = 'change';
  var pages = {};
  var loading = false;
  
  var AppStore = (function (_BaseStore) {
    _inherits(AppStore, _BaseStore);
  
    function AppStore() {
      var _this = this;
  
      _classCallCheck(this, AppStore);
  
      _get(Object.getPrototypeOf(AppStore.prototype), 'constructor', this).call(this);
      console.log('AppStore.constructor()');
      this.subscribe(function () {
        return _this._registerToActions.bind(_this);
      });
      this._user = null;
      this._jwt = null;
    }
  
    _createClass(AppStore, [{
      key: 'getPage',
      value: function getPage(path) {
        return path in pages ? pages[path] : null;
      }
    }, {
      key: 'isLoading',
      value: function isLoading() {
        return loading;
      }
    }, {
      key: '_registerToActions',
      value: function _registerToActions(action) {
        console.log('AppStore._registerToActions()| dispatchToken:', action);
        switch (action.type) {
          case _constantsActionTypes2['default'].GET_PAGE:
            loading = true;
            this.emitChange();
            break;
  
          case _constantsActionTypes2['default'].RECEIVE_PAGE:
            loading = false;
            if (!action.err) {
              console.log('AppStore._registerToActions()| action.page.path:', action.page.path);
              pages[action.page.path] = action.page;
            }
            this.emitChange();
            break;
  
          default:
          // Do nothing
        }
      }
    }]);
  
    return AppStore;
  })(_BaseStore3['default']);
  
  exports['default'] = new AppStore();
  module.exports = exports['default'];

/***/ },
/* 231 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var ClientDetection = (function () {
    function ClientDetection() {
      _classCallCheck(this, ClientDetection);
    }
  
    _createClass(ClientDetection, null, [{
      key: "isMobile",
      value: function isMobile(userAgent) {
        var isMobile = undefined;
        if (/mobile/i.test(userAgent)) {
          isMobile = true;
        } else {
          isMobile = false;
        }
        return isMobile;
      }
    }]);
  
    return ClientDetection;
  })();
  
  exports["default"] = ClientDetection;
  module.exports = exports["default"];

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(214);


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n/**\n * Remove default margin.\n */\nbody {\n  margin: 0;\n}\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n[hidden],\ntemplate {\n  display: none;\n}\n/* Links\n   ========================================================================== */\n/**\n * Remove the gray background color from active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\na:active,\na:hover {\n  outline: 0;\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\nb,\nstrong {\n  font-weight: bold;\n}\n/**\n * Address styling not present in Safari and Chrome.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/**\n * Address styling not present in IE 8/9.\n */\nmark {\n  background: #ff0;\n  color: #000;\n}\n/**\n * Address inconsistent and variable font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\nimg {\n  border: 0;\n}\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * Address differences between Firefox and other browsers.\n */\nhr {\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\n/**\n * Contain overflow in all browsers.\n */\npre {\n  overflow: auto;\n}\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n/* Forms\n   ========================================================================== */\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */\n}\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\nbutton {\n  overflow: visible;\n}\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\nbutton,\nselect {\n  text-transform: none;\n}\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n}\n/**\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n/**\n * Remove inner padding and border in Firefox 4+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\ninput {\n  line-height: normal;\n}\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 2 */\n}\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\noptgroup {\n  font-weight: bold;\n}\n/* Tables\n   ========================================================================== */\n/**\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntd,\nth {\n  padding: 0;\n}\n/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\nhtml,\nbody,\n#app,\n.app-container {\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n}\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em;\n  font-family: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n  line-height: 1.375;\n}\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n/*\n * A better looking default horizontal rule\n */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n/*\n * Remove default fieldset styles.\n */\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n/*\n * Allow only vertical resizing of textareas.\n */\ntextarea {\n  resize: vertical;\n}\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important;\n    /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  img {\n    max-width: 100% !important;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n", ""]);

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.feedback {\n  width: 100%;\n  background: #ddd;\n  color: #555;\n  position: fixed;\n  bottom: 20px;\n  height: 18px;\n  z-index: 1000;\n  -webkit-box-shadow: 0px 3px 15px #333;\n          box-shadow: 0px 3px 15px #333;\n}\n.feedback-container {\n  width: 100%;\n  text-align: center;\n  font-size: .9em;\n}\n.feedback-link,\n.feedback-link:active,\n.feedback-link:hover,\n.feedback-link:visited {\n  color: #555;\n  text-decoration: none;\n}\n.feedback-link:hover {\n  text-decoration: underline;\n}\n.feedback-spacer {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n", ""]);

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.Footer {\n  width: 100%;\n  background: #333;\n  color: #fff;\n  position: fixed;\n  bottom: 0px;\n  height: 20px;\n  z-index: 1000;\n}\n.Footer-container {\n  width: 100%;\n  text-align: center;\n}\n.Footer-text {\n  color: rgba(255, 255, 255, 0.5);\n}\n.Footer-text--muted {\n  color: rgba(255, 255, 255, 0.3);\n}\n.Footer-spacer {\n  color: rgba(255, 255, 255, 0.3);\n}\n.Footer-text,\n.Footer-link {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n.Footer-link,\n.Footer-link:active,\n.Footer-link:visited {\n  color: rgba(255, 255, 255, 0.6);\n  text-decoration: none;\n}\n.Footer-link:hover {\n  color: #ffffff;\n}\n", ""]);

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.Header {\n  width: 100%;\n  background: #dddda0;\n  color: #fff;\n  position: fixed;\n  z-index: 1000;\n  top: 0px;\n  height: 63px;\n  -webkit-box-shadow: 0px 3px 15px #333;\n          box-shadow: 0px 3px 15px #333;\n}\n.Header-container {\n  width: auto;\n  min-width: 300px;\n  max-width: 1000px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.Header-brand {\n  float: left;\n  color: #93e6fc;\n  text-decoration: none;\n  font-size: 1.75em;\n}\n.Header-brandImg {\n  height: 50px;\n  width: 91px;\n}\n.Header-brandTxt {\n  margin-left: 10px;\n  font-family: cursive;\n}\n.Header-nav {\n  float: right;\n}\n.Header-banner {\n  text-align: center;\n}\n.Header-bannerTitle {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em;\n}\n.Header-bannerDesc {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n", ""]);

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.loading {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.loading-image {\n  height: 128px;\n  width: 128px;\n  margin-left: 50%;\n}\n", ""]);

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.LoginPage {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.LoginPage .Register {\n  float: right;\n  margin-top: 50px;\n}\n.LoginPage .Login {\n  float: right;\n  margin-top: 50px;\n}\n", ""]);

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.scomart-button {\n  color: white;\n  border: none;\n  font-size: 1.125em;\n  width: 100%;\n  float: left;\n  background: rgba(0, 0, 255, 0.6);\n}\n.scomart-button:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n}\n.scomart-button:disabled {\n  color: #555;\n}\n.scomart-link-button {\n  width: 100%;\n  display: inline-block;\n  text-decoration: none;\n  text-align: center;\n  color: white;\n  font-size: 1.125em;\n}\n.scomart-link-buttondiv {\n  margin-left: 80%;\n}\n.scomart-link-button,\n.scomart-link-button:active,\n.scomart-link-button-highlight {\n  color: white;\n  background: rgba(0, 0, 255, 0.6);\n}\n.scomart-link-button:hover,\n.scomart-link-button:active:hover,\n.scomart-link-button-highlight:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n          box-shadow: 0px 0px 5px #00F;\n}\n.Login-container {\n  padding-bottom: 20px;\n  min-width: 300px;\n  border: 2px solid #789;\n}\n.Login-TextBox {\n  width: 100%;\n}\n.Login input {\n  color: black;\n}\n.Login-error {\n  color: #d04;\n  font-size: 15px;\n  padding-left: 10px;\n}\n.Login-spacer {\n  line-height: 40px;\n  text-align: center;\n  vertical-align: middle;\n  color: #55f;\n}\n.Login-helper {\n  color: #00f;\n  padding: 10px;\n  font-size: 12px;\n}\n.Login-helper input {\n  vertical-align: bottom;\n}\n.Login-helper-forgot {\n  float: right;\n  color: #00f;\n}\n.Login input[type=submit] {\n  color: white;\n  border: none;\n  font-size: 1.125em;\n  width: 100%;\n  float: left;\n  background: rgba(0, 0, 255, 0.6);\n}\n.Login input[type=submit]:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n}\n.Login input[type=submit]:disabled {\n  color: #555;\n}\n.Login-link {\n  margin-left: 5%;\n  width: 85%;\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  text-align: center;\n  color: white;\n  font-size: 1.125em;\n}\n.Login-linkdiv {\n  margin-left: 80%;\n}\n.Login-link,\n.Login-link:active,\n.Login-link-highlight {\n  color: white;\n  background: rgba(0, 0, 255, 0.6);\n}\n.Login-link:hover,\n.Login-link:active:hover,\n.Login-link-highlight:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n          box-shadow: 0px 0px 5px #00F;\n}\n", ""]);

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.navigation {\n  width: 50%;\n}\n.navigation-container {\n  float: right;\n}\n.navigation-link {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em;\n}\n.navigation-link,\n.navigation-link:active,\n.navigation-link:visited {\n  color: rgba(255, 255, 255, 0.6);\n}\n.navigation-link:hover {\n  color: #ffffff;\n}\n.navigation-link--highlight {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n.navigation-link--highlight:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n.navigation-spacer {\n  color: rgba(255, 255, 255, 0.3);\n}\n.navigation-input {\n  color: black;\n}\n", ""]);

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n* {\n  margin: 0;\n  line-height: 1.2;\n}\nhtml {\n  display: table;\n  width: 100%;\n  height: 100%;\n  color: #888;\n  text-align: center;\n  font-family: sans-serif;\n}\nbody {\n  display: table-cell;\n  margin: 2em auto;\n  vertical-align: middle;\n}\nh1 {\n  color: #555;\n  font-weight: 400;\n  font-size: 2em;\n}\np {\n  margin: 0 auto;\n  width: 280px;\n}\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n", ""]);

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.scomart-button {\n  color: white;\n  border: none;\n  font-size: 1.125em;\n  width: 100%;\n  float: left;\n  background: rgba(0, 0, 255, 0.6);\n}\n.scomart-button:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n}\n.scomart-button:disabled {\n  color: #555;\n}\n.scomart-link-button {\n  width: 100%;\n  display: inline-block;\n  text-decoration: none;\n  text-align: center;\n  color: white;\n  font-size: 1.125em;\n}\n.scomart-link-buttondiv {\n  margin-left: 80%;\n}\n.scomart-link-button,\n.scomart-link-button:active,\n.scomart-link-button-highlight {\n  color: white;\n  background: rgba(0, 0, 255, 0.6);\n}\n.scomart-link-button:hover,\n.scomart-link-button:active:hover,\n.scomart-link-button-highlight:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n          box-shadow: 0px 0px 5px #00F;\n}\n.RegisterPage-container {\n  padding-bottom: 20px;\n  min-width: 300px;\n  border: 2px solid #789;\n  color: black;\n}\n.RegisterPage-container input[type=submit] {\n  color: white;\n  border: none;\n  font-size: 1.125em;\n  width: 100%;\n  float: left;\n  background: rgba(0, 0, 255, 0.6);\n}\n.RegisterPage-container input[type=submit]:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n}\n.RegisterPage-container input[type=submit]:disabled {\n  color: #555;\n}\n.RegisterPage-container a {\n  color: blue;\n}\n.RegisterPage-error {\n  color: #C12;\n}\n.RegisterPage-textbox {\n  width: 100%;\n}\n", ""]);

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.scomart-button {\n  color: white;\n  border: none;\n  font-size: 1.125em;\n  width: 100%;\n  float: left;\n  background: rgba(0, 0, 255, 0.6);\n}\n.scomart-button:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n}\n.scomart-button:disabled {\n  color: #555;\n}\n.scomart-link-button {\n  width: 100%;\n  display: inline-block;\n  text-decoration: none;\n  text-align: center;\n  color: white;\n  font-size: 1.125em;\n}\n.scomart-link-buttondiv {\n  margin-left: 80%;\n}\n.scomart-link-button,\n.scomart-link-button:active,\n.scomart-link-button-highlight {\n  color: white;\n  background: rgba(0, 0, 255, 0.6);\n}\n.scomart-link-button:hover,\n.scomart-link-button:active:hover,\n.scomart-link-button-highlight:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n          box-shadow: 0px 0px 5px #00F;\n}\n.SetPassword {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n  float: left;\n}\n.SetPassword-container {\n  border: 2px solid #789;\n  width: 400px;\n  color: black;\n  margin: 50px;\n  padding: 20px;\n  padding-bottom: 50px;\n}\n.SetPassword-error {\n  margin: 100px;\n  color: red;\n  font-size: 25px;\n}\n.SetPassword-success {\n  margin: 100px;\n  color: green;\n  font-size: 25px;\n}\n.SetPassword-textbox-error {\n  border: 2px solid #911;\n}\n.SetPassword input[type=submit] {\n  color: white;\n  border: none;\n  font-size: 1.125em;\n  width: 100%;\n  float: left;\n  background: rgba(0, 0, 255, 0.6);\n}\n.SetPassword input[type=submit]:hover {\n  background: rgba(0, 0, 255, 0.9);\n  -webkit-box-shadow: 0px 0px 5px #00F;\n}\n.SetPassword input[type=submit]:disabled {\n  color: #555;\n}\n", ""]);

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, ".TextBox {\n  padding: 8px;\n}\n.TextBox-input {\n  color: black;\n  width: 95%;\n  height: 30px;\n}\n.TextBox-span {\n  width: 30px;\n}\n", ""]);

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(10)();
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n.content-width {\n  width: 100%;\n}\n.box-border {\n  border: 2px solid #789;\n}\n.page-width {\n  width: 1000px;\n}\n.page-margin {\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.hide {\n  display: none;\n}\n.bottom {\n  bottom: 0px;\n}\n.icon-medium {\n  height: 25px;\n  width: 25px;\n  cursor: pointer;\n}\n.nowrap {\n  white-space: nowrap;\n}\n.userhome {\n  width: 100%;\n  width: 1000px;\n  position: static;\n  padding-top: 60px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.userhome-container {\n  width: 740px;\n  float: left;\n  background-color: #FFB;\n}\n", ""]);

/***/ },
/* 246 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule emptyFunction
   */
  
  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }
  
  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  function emptyFunction() {}
  
  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function() { return this; };
  emptyFunction.thatReturnsArgument = function(arg) { return arg; };
  
  module.exports = emptyFunction;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule keyMirror
   * @typechecks static-only
   */
  
  'use strict';
  
  var invariant = __webpack_require__(96);
  
  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * For example:
   *
   *   var COLORS = keyMirror({blue: null, red: null});
   *   var myColor = COLORS.blue;
   *   var isColorValid = !!COLORS[myColor];
   *
   * The last line could not be performed if the values of the generated enum were
   * not equal to their keys.
   *
   *   Input:  {key1: val1, key2: val2}
   *   Output: {key1: key1, key2: key2}
   *
   * @param {object} obj
   * @return {object}
   */
  var keyMirror = function(obj) {
    var ret = {};
    var key;
    (true ? invariant(
      obj instanceof Object && !Array.isArray(obj),
      'keyMirror(...): Argument must be an object.'
    ) : invariant(obj instanceof Object && !Array.isArray(obj)));
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      ret[key] = key;
    }
    return ret;
  };
  
  module.exports = keyMirror;


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "87bc9ed8bee40add698e24c588fa0a6e.gif"

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "0ff956f65d301dc44c954185d046cb9d.png"

/***/ },
/* 250 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 251 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 252 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 253 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 254 */
/***/ function(module, exports) {

  module.exports = require("lodash");

/***/ },
/* 255 */
/***/ function(module, exports) {

  module.exports = require("nodemailer");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map