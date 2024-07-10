/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9306:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);
var tryToString = __webpack_require__(6823);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 8551:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isObject = __webpack_require__(34);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 9617:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIndexedObject = __webpack_require__(5397);
var toAbsoluteIndex = __webpack_require__(5610);
var lengthOfArrayLike = __webpack_require__(6198);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4527:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var isArray = __webpack_require__(4376);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 4576:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 7740:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var hasOwn = __webpack_require__(9297);
var ownKeys = __webpack_require__(5031);
var getOwnPropertyDescriptorModule = __webpack_require__(7347);
var definePropertyModule = __webpack_require__(4913);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 6699:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 6980:
/***/ (function(module) {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6840:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);
var definePropertyModule = __webpack_require__(4913);
var makeBuiltIn = __webpack_require__(283);
var defineGlobalProperty = __webpack_require__(9433);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 9433:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 3724:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 4055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var isObject = __webpack_require__(34);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 6837:
/***/ (function(module) {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 9392:
/***/ (function(module) {


module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 7388:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var userAgent = __webpack_require__(9392);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 8727:
/***/ (function(module) {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 6518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var getOwnPropertyDescriptor = (__webpack_require__(7347).f);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIn = __webpack_require__(6840);
var defineGlobalProperty = __webpack_require__(9433);
var copyConstructorProperties = __webpack_require__(7740);
var isForced = __webpack_require__(2796);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global[TARGET] && global[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 9039:
/***/ (function(module) {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 616:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9565:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(616);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 350:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var hasOwn = __webpack_require__(9297);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 9504:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 7751:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var isCallable = __webpack_require__(4901);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 5966:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aCallable = __webpack_require__(9306);
var isNullOrUndefined = __webpack_require__(4117);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 4475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 9297:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var toObject = __webpack_require__(8981);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 421:
/***/ (function(module) {


module.exports = {};


/***/ }),

/***/ 5917:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);
var createElement = __webpack_require__(4055);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 7055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var classof = __webpack_require__(4576);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 3706:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var isCallable = __webpack_require__(4901);
var store = __webpack_require__(7629);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 1181:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_WEAK_MAP = __webpack_require__(8622);
var global = __webpack_require__(4475);
var isObject = __webpack_require__(34);
var createNonEnumerableProperty = __webpack_require__(6699);
var hasOwn = __webpack_require__(9297);
var shared = __webpack_require__(7629);
var sharedKey = __webpack_require__(6119);
var hiddenKeys = __webpack_require__(421);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 4376:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(4576);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ 4901:
/***/ (function(module) {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 2796:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 4117:
/***/ (function(module) {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 34:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 6395:
/***/ (function(module) {


module.exports = false;


/***/ }),

/***/ 757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(7751);
var isCallable = __webpack_require__(4901);
var isPrototypeOf = __webpack_require__(1625);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6198:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toLength = __webpack_require__(8014);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 283:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var hasOwn = __webpack_require__(9297);
var DESCRIPTORS = __webpack_require__(3724);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(350).CONFIGURABLE);
var inspectSource = __webpack_require__(3706);
var InternalStateModule = __webpack_require__(1181);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 741:
/***/ (function(module) {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 4913:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var IE8_DOM_DEFINE = __webpack_require__(5917);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var anObject = __webpack_require__(8551);
var toPropertyKey = __webpack_require__(6969);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7347:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var call = __webpack_require__(9565);
var propertyIsEnumerableModule = __webpack_require__(8773);
var createPropertyDescriptor = __webpack_require__(6980);
var toIndexedObject = __webpack_require__(5397);
var toPropertyKey = __webpack_require__(6969);
var hasOwn = __webpack_require__(9297);
var IE8_DOM_DEFINE = __webpack_require__(5917);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8480:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 3717:
/***/ (function(__unused_webpack_module, exports) {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 1625:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1828:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var hasOwn = __webpack_require__(9297);
var toIndexedObject = __webpack_require__(5397);
var indexOf = (__webpack_require__(9617).indexOf);
var hiddenKeys = __webpack_require__(421);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 8773:
/***/ (function(__unused_webpack_module, exports) {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 4270:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 5031:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(7751);
var uncurryThis = __webpack_require__(9504);
var getOwnPropertyNamesModule = __webpack_require__(8480);
var getOwnPropertySymbolsModule = __webpack_require__(3717);
var anObject = __webpack_require__(8551);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 7750:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isNullOrUndefined = __webpack_require__(4117);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6119:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var shared = __webpack_require__(5745);
var uid = __webpack_require__(3392);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 7629:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var IS_PURE = __webpack_require__(6395);
var globalThis = __webpack_require__(4475);
var defineGlobalProperty = __webpack_require__(9433);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.37.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.37.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 5745:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var store = __webpack_require__(7629);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 4495:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7388);
var fails = __webpack_require__(9039);
var global = __webpack_require__(4475);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 5610:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(1291);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5397:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7055);
var requireObjectCoercible = __webpack_require__(7750);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 1291:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var trunc = __webpack_require__(741);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 8014:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(1291);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 8981:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var requireObjectCoercible = __webpack_require__(7750);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 2777:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var isObject = __webpack_require__(34);
var isSymbol = __webpack_require__(757);
var getMethod = __webpack_require__(5966);
var ordinaryToPrimitive = __webpack_require__(4270);
var wellKnownSymbol = __webpack_require__(8227);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 6969:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toPrimitive = __webpack_require__(2777);
var isSymbol = __webpack_require__(757);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 6823:
/***/ (function(module) {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 3392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 7040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4495);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 8686:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 8622:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var isCallable = __webpack_require__(4901);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 8227:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var shared = __webpack_require__(5745);
var hasOwn = __webpack_require__(9297);
var uid = __webpack_require__(3392);
var NATIVE_SYMBOL = __webpack_require__(4495);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 4114:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var setArrayLength = __webpack_require__(4527);
var doesNotExceedSafeInteger = __webpack_require__(6837);
var fails = __webpack_require__(9039);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

// UNUSED EXPORTS: SisdaiAlluvial, SisdaiAreasApiladas, SisdaiAreasApiladasOrdenadas, SisdaiBarras, SisdaiCajasBigotes, SisdaiChecks, SisdaiDona, SisdaiGraficas, SisdaiGraficasGloboInfo, SisdaiNomenclatura, SisdaiSeriesTiempo, SisdaiViolines

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-alluvial/SisdaiAlluvial.vue?vue&type=template&id=7c1a303d
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('g', {
    ref: "sisdaiAlluvial",
    staticClass: "contenedor-alluvial",
    attrs: {
      "transform": `translate(${_setup.margenesSvg?.izquierda || 0},${_setup.margenesSvg?.arriba || 0})`
    }
  });
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(4114);
;// CONCATENATED MODULE: ./node_modules/d3-format/src/formatDecimal.js
/* harmony default export */ function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/exponent.js


/* harmony default export */ function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/formatGroup.js
/* harmony default export */ function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/formatNumerals.js
/* harmony default export */ function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/formatSpecifier.js
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

;// CONCATENATED MODULE: ./node_modules/d3-format/src/formatTrim.js
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
/* harmony default export */ function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/formatPrefixAuto.js


var prefixExponent;

/* harmony default export */ function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/formatRounded.js


/* harmony default export */ function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/formatTypes.js




/* harmony default export */ var formatTypes = ({
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
});

;// CONCATENATED MODULE: ./node_modules/d3-format/src/identity.js
/* harmony default export */ function src_identity(x) {
  return x;
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/locale.js









var map = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

/* harmony default export */ function locale(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? src_identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? src_identity : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/defaultLocale.js


var defaultLocale_locale;
var format;
var formatPrefix;

defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  defaultLocale_locale = locale(definition);
  format = defaultLocale_locale.format;
  formatPrefix = defaultLocale_locale.formatPrefix;
  return defaultLocale_locale;
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/node_modules/d3-array/src/sum.js
function sum(values, valueof) {
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum += value;
      }
    }
  }
  return sum;
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/node_modules/d3-array/src/max.js
function max(values, valueof) {
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/node_modules/d3-array/src/min.js
function min_min(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/src/align.js


function targetDepth(d) {
  return d.target.depth;
}

function left(node) {
  return node.depth;
}

function right(node, n) {
  return n - 1 - node.height;
}

function justify(node, n) {
  return node.sourceLinks.length ? node.depth : n - 1;
}

function center(node) {
  return node.targetLinks.length ? node.depth
      : node.sourceLinks.length ? min(node.sourceLinks, targetDepth) - 1
      : 0;
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/src/constant.js
function constant_constant(x) {
  return function() {
    return x;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/src/sankey.js




function ascendingSourceBreadth(a, b) {
  return ascendingBreadth(a.source, b.source) || a.index - b.index;
}

function ascendingTargetBreadth(a, b) {
  return ascendingBreadth(a.target, b.target) || a.index - b.index;
}

function ascendingBreadth(a, b) {
  return a.y0 - b.y0;
}

function value(d) {
  return d.value;
}

function defaultId(d) {
  return d.index;
}

function defaultNodes(graph) {
  return graph.nodes;
}

function defaultLinks(graph) {
  return graph.links;
}

function find(nodeById, id) {
  const node = nodeById.get(id);
  if (!node) throw new Error("missing: " + id);
  return node;
}

function computeLinkBreadths({nodes}) {
  for (const node of nodes) {
    let y0 = node.y0;
    let y1 = y0;
    for (const link of node.sourceLinks) {
      link.y0 = y0 + link.width / 2;
      y0 += link.width;
    }
    for (const link of node.targetLinks) {
      link.y1 = y1 + link.width / 2;
      y1 += link.width;
    }
  }
}

function Sankey() {
  let x0 = 0, y0 = 0, x1 = 1, y1 = 1; // extent
  let dx = 24; // nodeWidth
  let dy = 8, py; // nodePadding
  let id = defaultId;
  let align = justify;
  let sort;
  let linkSort;
  let nodes = defaultNodes;
  let links = defaultLinks;
  let iterations = 6;

  function sankey() {
    const graph = {nodes: nodes.apply(null, arguments), links: links.apply(null, arguments)};
    computeNodeLinks(graph);
    computeNodeValues(graph);
    computeNodeDepths(graph);
    computeNodeHeights(graph);
    computeNodeBreadths(graph);
    computeLinkBreadths(graph);
    return graph;
  }

  sankey.update = function(graph) {
    computeLinkBreadths(graph);
    return graph;
  };

  sankey.nodeId = function(_) {
    return arguments.length ? (id = typeof _ === "function" ? _ : constant_constant(_), sankey) : id;
  };

  sankey.nodeAlign = function(_) {
    return arguments.length ? (align = typeof _ === "function" ? _ : constant_constant(_), sankey) : align;
  };

  sankey.nodeSort = function(_) {
    return arguments.length ? (sort = _, sankey) : sort;
  };

  sankey.nodeWidth = function(_) {
    return arguments.length ? (dx = +_, sankey) : dx;
  };

  sankey.nodePadding = function(_) {
    return arguments.length ? (dy = py = +_, sankey) : dy;
  };

  sankey.nodes = function(_) {
    return arguments.length ? (nodes = typeof _ === "function" ? _ : constant_constant(_), sankey) : nodes;
  };

  sankey.links = function(_) {
    return arguments.length ? (links = typeof _ === "function" ? _ : constant_constant(_), sankey) : links;
  };

  sankey.linkSort = function(_) {
    return arguments.length ? (linkSort = _, sankey) : linkSort;
  };

  sankey.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], sankey) : [x1 - x0, y1 - y0];
  };

  sankey.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], sankey) : [[x0, y0], [x1, y1]];
  };

  sankey.iterations = function(_) {
    return arguments.length ? (iterations = +_, sankey) : iterations;
  };

  function computeNodeLinks({nodes, links}) {
    for (const [i, node] of nodes.entries()) {
      node.index = i;
      node.sourceLinks = [];
      node.targetLinks = [];
    }
    const nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d]));
    for (const [i, link] of links.entries()) {
      link.index = i;
      let {source, target} = link;
      if (typeof source !== "object") source = link.source = find(nodeById, source);
      if (typeof target !== "object") target = link.target = find(nodeById, target);
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    }
    if (linkSort != null) {
      for (const {sourceLinks, targetLinks} of nodes) {
        sourceLinks.sort(linkSort);
        targetLinks.sort(linkSort);
      }
    }
  }

  function computeNodeValues({nodes}) {
    for (const node of nodes) {
      node.value = node.fixedValue === undefined
          ? Math.max(sum(node.sourceLinks, value), sum(node.targetLinks, value))
          : node.fixedValue;
    }
  }

  function computeNodeDepths({nodes}) {
    const n = nodes.length;
    let current = new Set(nodes);
    let next = new Set;
    let x = 0;
    while (current.size) {
      for (const node of current) {
        node.depth = x;
        for (const {target} of node.sourceLinks) {
          next.add(target);
        }
      }
      if (++x > n) throw new Error("circular link");
      current = next;
      next = new Set;
    }
  }

  function computeNodeHeights({nodes}) {
    const n = nodes.length;
    let current = new Set(nodes);
    let next = new Set;
    let x = 0;
    while (current.size) {
      for (const node of current) {
        node.height = x;
        for (const {source} of node.targetLinks) {
          next.add(source);
        }
      }
      if (++x > n) throw new Error("circular link");
      current = next;
      next = new Set;
    }
  }

  function computeNodeLayers({nodes}) {
    const x = max(nodes, d => d.depth) + 1;
    const kx = (x1 - x0 - dx) / (x - 1);
    const columns = new Array(x);
    for (const node of nodes) {
      const i = Math.max(0, Math.min(x - 1, Math.floor(align.call(null, node, x))));
      node.layer = i;
      node.x0 = x0 + i * kx;
      node.x1 = node.x0 + dx;
      if (columns[i]) columns[i].push(node);
      else columns[i] = [node];
    }
    if (sort) for (const column of columns) {
      column.sort(sort);
    }
    return columns;
  }

  function initializeNodeBreadths(columns) {
    const ky = min_min(columns, c => (y1 - y0 - (c.length - 1) * py) / sum(c, value));
    for (const nodes of columns) {
      let y = y0;
      for (const node of nodes) {
        node.y0 = y;
        node.y1 = y + node.value * ky;
        y = node.y1 + py;
        for (const link of node.sourceLinks) {
          link.width = link.value * ky;
        }
      }
      y = (y1 - y + py) / (nodes.length + 1);
      for (let i = 0; i < nodes.length; ++i) {
        const node = nodes[i];
        node.y0 += y * (i + 1);
        node.y1 += y * (i + 1);
      }
      reorderLinks(nodes);
    }
  }

  function computeNodeBreadths(graph) {
    const columns = computeNodeLayers(graph);
    py = Math.min(dy, (y1 - y0) / (max(columns, c => c.length) - 1));
    initializeNodeBreadths(columns);
    for (let i = 0; i < iterations; ++i) {
      const alpha = Math.pow(0.99, i);
      const beta = Math.max(1 - alpha, (i + 1) / iterations);
      relaxRightToLeft(columns, alpha, beta);
      relaxLeftToRight(columns, alpha, beta);
    }
  }

  // Reposition each node based on its incoming (target) links.
  function relaxLeftToRight(columns, alpha, beta) {
    for (let i = 1, n = columns.length; i < n; ++i) {
      const column = columns[i];
      for (const target of column) {
        let y = 0;
        let w = 0;
        for (const {source, value} of target.targetLinks) {
          let v = value * (target.layer - source.layer);
          y += targetTop(source, target) * v;
          w += v;
        }
        if (!(w > 0)) continue;
        let dy = (y / w - target.y0) * alpha;
        target.y0 += dy;
        target.y1 += dy;
        reorderNodeLinks(target);
      }
      if (sort === undefined) column.sort(ascendingBreadth);
      resolveCollisions(column, beta);
    }
  }

  // Reposition each node based on its outgoing (source) links.
  function relaxRightToLeft(columns, alpha, beta) {
    for (let n = columns.length, i = n - 2; i >= 0; --i) {
      const column = columns[i];
      for (const source of column) {
        let y = 0;
        let w = 0;
        for (const {target, value} of source.sourceLinks) {
          let v = value * (target.layer - source.layer);
          y += sourceTop(source, target) * v;
          w += v;
        }
        if (!(w > 0)) continue;
        let dy = (y / w - source.y0) * alpha;
        source.y0 += dy;
        source.y1 += dy;
        reorderNodeLinks(source);
      }
      if (sort === undefined) column.sort(ascendingBreadth);
      resolveCollisions(column, beta);
    }
  }

  function resolveCollisions(nodes, alpha) {
    const i = nodes.length >> 1;
    const subject = nodes[i];
    resolveCollisionsBottomToTop(nodes, subject.y0 - py, i - 1, alpha);
    resolveCollisionsTopToBottom(nodes, subject.y1 + py, i + 1, alpha);
    resolveCollisionsBottomToTop(nodes, y1, nodes.length - 1, alpha);
    resolveCollisionsTopToBottom(nodes, y0, 0, alpha);
  }

  // Push any overlapping nodes down.
  function resolveCollisionsTopToBottom(nodes, y, i, alpha) {
    for (; i < nodes.length; ++i) {
      const node = nodes[i];
      const dy = (y - node.y0) * alpha;
      if (dy > 1e-6) node.y0 += dy, node.y1 += dy;
      y = node.y1 + py;
    }
  }

  // Push any overlapping nodes up.
  function resolveCollisionsBottomToTop(nodes, y, i, alpha) {
    for (; i >= 0; --i) {
      const node = nodes[i];
      const dy = (node.y1 - y) * alpha;
      if (dy > 1e-6) node.y0 -= dy, node.y1 -= dy;
      y = node.y0 - py;
    }
  }

  function reorderNodeLinks({sourceLinks, targetLinks}) {
    if (linkSort === undefined) {
      for (const {source: {sourceLinks}} of targetLinks) {
        sourceLinks.sort(ascendingTargetBreadth);
      }
      for (const {target: {targetLinks}} of sourceLinks) {
        targetLinks.sort(ascendingSourceBreadth);
      }
    }
  }

  function reorderLinks(nodes) {
    if (linkSort === undefined) {
      for (const {sourceLinks, targetLinks} of nodes) {
        sourceLinks.sort(ascendingTargetBreadth);
        targetLinks.sort(ascendingSourceBreadth);
      }
    }
  }

  // Returns the target.y0 that would produce an ideal link from source to target.
  function targetTop(source, target) {
    let y = source.y0 - (source.sourceLinks.length - 1) * py / 2;
    for (const {target: node, width} of source.sourceLinks) {
      if (node === target) break;
      y += width + py;
    }
    for (const {source: node, width} of target.targetLinks) {
      if (node === source) break;
      y -= width;
    }
    return y;
  }

  // Returns the source.y0 that would produce an ideal link from source to target.
  function sourceTop(source, target) {
    let y = target.y0 - (target.targetLinks.length - 1) * py / 2;
    for (const {source: node, width} of target.targetLinks) {
      if (node === source) break;
      y += width + py;
    }
    for (const {target: node, width} of source.sourceLinks) {
      if (node === target) break;
      y -= width;
    }
    return y;
  }

  return sankey;
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/node_modules/d3-path/src/path.js
var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

/* harmony default export */ var src_path = (path);

;// CONCATENATED MODULE: ./node_modules/d3-sankey/node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;

;// CONCATENATED MODULE: ./node_modules/d3-sankey/node_modules/d3-shape/src/constant.js
/* harmony default export */ function src_constant(x) {
  return function constant() {
    return x;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/node_modules/d3-shape/src/point.js
function point_x(p) {
  return p[0];
}

function point_y(p) {
  return p[1];
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/node_modules/d3-shape/src/link/index.js






function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link_link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = point_x,
      y = point_y,
      context = null;

  function link() {
    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = src_path();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : src_constant(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : src_constant(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link_link(curveHorizontal);
}

function linkVertical() {
  return link_link(curveVertical);
}

function linkRadial() {
  var l = link_link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

;// CONCATENATED MODULE: ./node_modules/d3-sankey/src/sankeyLinkHorizontal.js


function horizontalSource(d) {
  return [d.source.x1, d.y0];
}

function horizontalTarget(d) {
  return [d.target.x0, d.y1];
}

/* harmony default export */ function sankeyLinkHorizontal() {
  return linkHorizontal()
      .source(horizontalSource)
      .target(horizontalTarget);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selector.js
function none() {}

/* harmony default export */ function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/select.js



/* harmony default export */ function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/array.js
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}

/* harmony default export */ function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/selectAll.js




function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}

/* harmony default export */ function selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/matcher.js
/* harmony default export */ function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}


;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/selectChild.js


var selectChild_find = Array.prototype.find;

function childFind(match) {
  return function() {
    return selectChild_find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

/* harmony default export */ function selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/selectChildren.js


var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

/* harmony default export */ function selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/filter.js



/* harmony default export */ function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/sparse.js
/* harmony default export */ function sparse(update) {
  return new Array(update.length);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/enter.js



/* harmony default export */ function enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/constant.js
/* harmony default export */ function d3_selection_src_constant(x) {
  return function() {
    return x;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/data.js




function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

/* harmony default export */ function data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = d3_selection_src_constant(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/exit.js



/* harmony default export */ function exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/join.js
/* harmony default export */ function join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/merge.js


/* harmony default export */ function merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/order.js
/* harmony default export */ function order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/sort.js


/* harmony default export */ function sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/call.js
/* harmony default export */ function call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/nodes.js
/* harmony default export */ function nodes() {
  return Array.from(this);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/node.js
/* harmony default export */ function node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/size.js
/* harmony default export */ function size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/empty.js
/* harmony default export */ function selection_empty() {
  return !this.node();
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/each.js
/* harmony default export */ function each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ var namespaces = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/namespace.js


/* harmony default export */ function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/attr.js


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ function attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/window.js
/* harmony default export */ function src_window(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/style.js


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ function style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || src_window(node).getComputedStyle(node, null).getPropertyValue(name);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ function property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ function classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ function html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ function selection_raise() {
  return this.each(raise);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ function selection_lower() {
  return this.each(lower);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/creator.js



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/append.js


/* harmony default export */ function append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/insert.js



function constantNull() {
  return null;
}

/* harmony default export */ function insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ function selection_remove() {
  return this.each(remove);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

/* harmony default export */ function clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/datum.js
/* harmony default export */ function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ function on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/dispatch.js


function dispatchEvent(node, type, params) {
  var window = src_window(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ function dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/iterator.js
/* harmony default export */ function* iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/selection/index.js



































var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selectAll,
  selectChild: selectChild,
  selectChildren: selectChildren,
  filter: selection_filter,
  data: data,
  enter: enter,
  exit: exit,
  join: join,
  merge: merge,
  selection: selection_selection,
  order: order,
  sort: sort,
  call: call,
  nodes: nodes,
  node: node,
  size: size,
  empty: selection_empty,
  each: each,
  attr: attr,
  style: style,
  property: property,
  classed: classed,
  text: selection_text,
  html: html,
  raise: selection_raise,
  lower: selection_lower,
  append: append,
  insert: insert,
  remove: selection_remove,
  clone: clone,
  datum: selection_datum,
  on: on,
  dispatch: dispatch,
  [Symbol.iterator]: iterator
};

/* harmony default export */ var src_selection = (selection);

;// CONCATENATED MODULE: ./node_modules/d3-selection/src/select.js


/* harmony default export */ function src_select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}

;// CONCATENATED MODULE: ./node_modules/d3-dispatch/src/dispatch.js
var noop = {value: () => {}};

function dispatch_dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function dispatch_parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch_dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = dispatch_parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ var src_dispatch = (dispatch_dispatch);

;// CONCATENATED MODULE: ./node_modules/d3-timer/src/timer.js
var timer_frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++timer_frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --timer_frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  timer_frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    timer_frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (timer_frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    timer_frame = 1, setFrame(wake);
  }
}

;// CONCATENATED MODULE: ./node_modules/d3-timer/src/timeout.js


/* harmony default export */ function src_timeout(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/schedule.js



var emptyOn = src_dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

/* harmony default export */ function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = schedule_get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function schedule_set(node, id) {
  var schedule = schedule_get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function schedule_get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return src_timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    src_timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/interrupt.js


/* harmony default export */ function interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/selection/interrupt.js


/* harmony default export */ function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/number.js
/* harmony default export */ function src_number(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;

var decompose_identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/transform/parse.js


var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? decompose_identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return decompose_identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return decompose_identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/transform/index.js



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: src_number(xa, xb)}, {i: i - 2, x: src_number(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: src_number(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: src_number(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: src_number(xa, xb)}, {i: i - 2, x: src_number(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/tween.js


function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = schedule_set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = schedule_set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

/* harmony default export */ function tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = schedule_get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = schedule_set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return schedule_get(node, id).value[name];
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-color/src/define.js
/* harmony default export */ function src_define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

;// CONCATENATED MODULE: ./node_modules/d3-color/src/color.js


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

src_define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function color_rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

src_define(Rgb, color_rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

src_define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ function src_basis(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/basisClosed.js


/* harmony default export */ function basisClosed(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/constant.js
/* harmony default export */ var d3_interpolate_src_constant = (x => () => x);

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/color.js


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : d3_interpolate_src_constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : d3_interpolate_src_constant(isNaN(a) ? b : a);
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/rgb.js





/* harmony default export */ var rgb = ((function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = color_rgb(start)).r, (end = color_rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = color_rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(src_basis);
var rgbBasisClosed = rgbSpline(basisClosed);

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/string.js


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: src_number(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/interpolate.js



/* harmony default export */ function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? src_number
      : b instanceof color ? rgb
      : (c = color(b)) ? (b = c, rgb)
      : string)(a, b);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/attr.js





function attr_attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attr_attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attr_attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attr_attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attr_attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attr_attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

/* harmony default export */ function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attr_attrFunctionNS : attr_attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attr_attrRemoveNS : attr_attrRemove)(fullname)
      : (fullname.local ? attr_attrConstantNS : attr_attrConstant)(fullname, i, value));
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/attrTween.js


function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/delay.js


function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

/* harmony default export */ function delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : schedule_get(this.node(), id).delay;
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/duration.js


function durationFunction(id, value) {
  return function() {
    schedule_set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    schedule_set(this, id).duration = value;
  };
}

/* harmony default export */ function duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : schedule_get(this.node(), id).duration;
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/ease.js


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    schedule_set(this, id).ease = value;
  };
}

/* harmony default export */ function ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : schedule_get(this.node(), id).ease;
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/easeVarying.js


function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    schedule_set(this, id).ease = v;
  };
}

/* harmony default export */ function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/filter.js



/* harmony default export */ function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/merge.js


/* harmony default export */ function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/on.js


function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : schedule_set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? schedule_get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/remove.js
function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

/* harmony default export */ function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/select.js




/* harmony default export */ function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, schedule_get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/selectAll.js




/* harmony default export */ function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = schedule_get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/selection.js


var selection_Selection = src_selection.prototype.constructor;

/* harmony default export */ function transition_selection() {
  return new selection_Selection(this._groups, this._parents);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/style.js






function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function style_styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function style_styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function style_styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = schedule_set(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = style_styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, style_styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, style_styleFunction(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, style_styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/text.js


function text_textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function text_textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

/* harmony default export */ function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? text_textFunction(tweenValue(this, "text", value))
      : text_textConstant(value == null ? "" : value + ""));
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/transition.js



/* harmony default export */ function transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = schedule_get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/end.js


/* harmony default export */ function end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = schedule_set(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/transition/index.js






















var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition_transition(name) {
  return src_selection().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = src_selection.prototype;

Transition.prototype = transition_transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: tween,
  delay: delay,
  duration: duration,
  ease: ease,
  easeVarying: transition_easeVarying,
  end: end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

;// CONCATENATED MODULE: ./node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/selection/transition.js





var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

/* harmony default export */ function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/selection/index.js




src_selection.prototype.interrupt = selection_interrupt;
src_selection.prototype.transition = selection_transition;

;// CONCATENATED MODULE: ./node_modules/d3-transition/src/index.js





;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

;// CONCATENATED MODULE: ./src/clases/ResgistroObjetos.js

/**
 *  @module clases/RegistroObjetos
 */

/**
 * @classdesc
 * Clase que permite guardar objetos de una forma controlada.
 */
class RegistroObjetos {
  /**
   *
   * @param {String} tipo de objetos que se registrarán en la instancia.
   */
  constructor(tipo) {
    /**
     * @property {Object} Objeto en el que se almacenarán los objetos registrados.
     */
    _defineProperty(this, "registros", {});
    this.tipoObjetos = tipo || 'objeto';
  }

  /**
   * Regresa true si el objeto está registrado.
   * @param {String} id del objeto que se desea consultar.
   * @returns {Boolean}
   */
  existe(id) {
    return Object.keys(this.registros).includes(id);
  }

  /**
   * Registra un objeto en los registros.
   * @param {String} id del objeto que se desea registrar.
   * @param {Object} valor valor que adquiere el objeto que se está registrando.
   */
  registrar(id, valor) {
    if (!this.existe(id)) {
      this.registros[id] = valor;
      //console.log(`registro ${this.tipoObjetos}: ${id}`)
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} ya existe`);
    }
  }

  /**
   * Modifica el valor de un objeto.
   * @param {String} id del objeto que se desea modificar.
   * @param {Object} valor nuevo valor que adquiere el objeto.
   */
  asignar(id, valor) {
    if (this.existe(id)) {
      this.registros[id] = valor;
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} no encontrado`);
    }
  }

  /**
   * Regresa el valor u objeto de un registro.
   * @param {String} id del objeto que se desea registrar.
   * @returns {Object}
   */
  objeto(id) {
    if (this.existe(id)) {
      return this.registros[id];
    } else {
      // eslint-disable-next-line
      console.warn(`${this.tipoObjetos} ${id} no encontrado`);
    }
  }

  /**
   * Regresa el valor u objeto de un registro como promesa, util cuando se trata de consultar un
   * objeo cuando este no ha sido registrado aún.
   * @param {String} id del objeto que se desea registrar.
   * @returns {Promise}
   */
  objetoPromesa(id) {
    return new Promise(resolve => {
      const _this = this;
      function revisar() {
        if (_this.existe(id)) {
          resolve(_this.registros[id]);
        } else {
          setTimeout(revisar, 50);
        }
      }
      revisar();
    });
  }

  /**
   * Elimina un obbjeto del objeto registros.
   * @param {String} id del objeto que se desea borrar.
   */
  borrar(id) {
    if (this.existe(id)) {
      delete this.registros[id];
      //console.log(`borrado ${this.tipoObjetos}: ${id}`)
    }
  }
}
;// CONCATENATED MODULE: ./src/valores/grafica.js
const margenes = {
  arriba: 20,
  abajo: 20,
  derecha: 20,
  izquierda: 30
};
const altoVis = 400;
;// CONCATENATED MODULE: ./src/clases/Svg.js


class Svg {
  constructor() {
    _defineProperty(this, "_alto", 0);
    _defineProperty(this, "_ancho", 0);
    _defineProperty(this, "_margenes", new Margenes(margenes));
    _defineProperty(this, "_grupoVis", new GrupoVis({
      alto: 0,
      ancho: 0
    }));
    _defineProperty(this, "_posicion_cursor", {
      x: 0,
      y: 0
    });
    _defineProperty(this, "_globo_visible", false);
  }
  set alto(v) {
    this._alto = v;
    this.calcularGrupoVis();
  }
  get alto() {
    return this._alto;
  }
  set ancho(v) {
    this._ancho = v;
    this.calcularGrupoVis();
  }
  get ancho() {
    return this._ancho;
  }
  set posicion_cursor(v) {
    this._posicion_cursor = v;
    //this.calcularGrupoVis()
  }
  get posicion_cursor() {
    return this._posicion_cursor;
  }
  set globo_visible(v) {
    this._globo_visible = v;
    //this.calcularGrupoVis()
  }
  get globo_visible() {
    return this._globo_visible;
  }
  set margenes(opciones) {
    this._margenes = new Margenes(opciones);
    this.calcularGrupoVis();
  }
  get margenes() {
    return this._margenes;
  }
  set grupoVis(opciones) {
    this._grupoVis = new GrupoVis(opciones);
  }
  get grupoVis() {
    return this._grupoVis;
  }
  calcularGrupoVis() {
    this.grupoVis = {
      alto: this._alto - this.margenes.vertical,
      ancho: this._ancho - this.margenes.horizontal
    };
  }
}
class GrupoVis {
  constructor({
    alto,
    ancho
  }) {
    this.alto = alto;
    this.ancho = ancho;
  }
}
class Margenes {
  constructor({
    arriba,
    abajo,
    derecha,
    izquierda
  }) {
    this.arriba = arriba;
    this.abajo = abajo;
    this.derecha = derecha;
    this.izquierda = izquierda;
  }
  get vertical() {
    return this.arriba + this.abajo;
  }
  get horizontal() {
    return this.derecha + this.izquierda;
  }
}
;// CONCATENATED MODULE: ./src/composables/usarRegistroGraficas.js



const registroGraficas = new RegistroObjetos('grafica');
/* harmony default export */ function usarRegistroGraficas(idGrafica) {
  function registrarGrafica(_idGrafica) {
    registroGraficas.registrar(_idGrafica, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)(new Svg({})));
  }
  if (idValido(idGrafica)) {
    registrarGrafica(idGrafica);
  }
  function grafica(_idGrafica) {
    return registroGraficas.objeto(_idGrafica || idGrafica);
  }
  function graficaPromesa(_idGrafica) {
    return registroGraficas.objetoPromesa(_idGrafica || idGrafica);
  }
  function borrarGrafica(_idGrafica) {
    registroGraficas.borrar(_idGrafica || idGrafica);
  }
  return {
    registrarGrafica,
    grafica,
    graficaPromesa,
    borrarGrafica
  };
}
function idValido(id) {
  return id !== undefined && typeof id === typeof String();
}
;// CONCATENATED MODULE: ./node_modules/d3-array/src/max.js
function max_max(values, valueof) {
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/min.js
function src_min_min(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/range.js
function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/ascending.js
function ascending_ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

;// CONCATENATED MODULE: ./node_modules/d3-axis/src/identity.js
/* harmony default export */ function d3_axis_src_identity(x) {
  return x;
}

;// CONCATENATED MODULE: ./node_modules/d3-axis/src/axis.js


var axis_top = 1,
    axis_right = 2,
    bottom = 3,
    axis_left = 4,
    axis_epsilon = 1e-6;

function translateX(x) {
  return "translate(" + x + ",0)";
}

function translateY(y) {
  return "translate(0," + y + ")";
}

function axis_number(scale) {
  return d => +scale(d);
}

function axis_center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return d => +scale(d) + offset;
}

function entering() {
  return !this.__axis;
}

function axis(orient, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3,
      offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
      k = orient === axis_top || orient === axis_left ? -1 : 1,
      x = orient === axis_left || orient === axis_right ? "x" : "y",
      transform = orient === axis_top || orient === bottom ? translateX : translateY;

  function axis(context) {
    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : d3_axis_src_identity) : tickFormat,
        spacing = Math.max(tickSizeInner, 0) + tickPadding,
        range = scale.range(),
        range0 = +range[0] + offset,
        range1 = +range[range.length - 1] + offset,
        position = (scale.bandwidth ? axis_center : axis_number)(scale.copy(), offset),
        selection = context.selection ? context.selection() : context,
        path = selection.selectAll(".domain").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter().append("g").attr("class", "tick"),
        line = tick.select("line"),
        text = tick.select("text");

    path = path.merge(path.enter().insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "currentColor"));

    tick = tick.merge(tickEnter);

    line = line.merge(tickEnter.append("line")
        .attr("stroke", "currentColor")
        .attr(x + "2", k * tickSizeInner));

    text = text.merge(tickEnter.append("text")
        .attr("fill", "currentColor")
        .attr(x, k * spacing)
        .attr("dy", orient === axis_top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);

      tickExit = tickExit.transition(context)
          .attr("opacity", axis_epsilon)
          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

      tickEnter
          .attr("opacity", axis_epsilon)
          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
    }

    tickExit.remove();

    path
        .attr("d", orient === axis_left || orient === axis_right
            ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
            : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

    tick
        .attr("opacity", 1)
        .attr("transform", function(d) { return transform(position(d) + offset); });

    line
        .attr(x + "2", k * tickSizeInner);

    text
        .attr(x, k * spacing)
        .text(format);

    selection.filter(entering)
        .attr("fill", "none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", orient === axis_right ? "start" : orient === axis_left ? "end" : "middle");

    selection
        .each(function() { this.__axis = position; });
  }

  axis.scale = function(_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function() {
    return tickArguments = Array.from(arguments), axis;
  };

  axis.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };

  axis.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };

  axis.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };

  axis.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  axis.offset = function(_) {
    return arguments.length ? (offset = +_, axis) : offset;
  };

  return axis;
}

function axisTop(scale) {
  return axis(axis_top, scale);
}

function axisRight(scale) {
  return axis(axis_right, scale);
}

function axisBottom(scale) {
  return axis(bottom, scale);
}

function axisLeft(scale) {
  return axis(axis_left, scale);
}

;// CONCATENATED MODULE: ./node_modules/d3-time/src/interval.js
const t0 = new Date, t1 = new Date;

function timeInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
  }

  interval.floor = (date) => {
    return floori(date = new Date(+date)), date;
  };

  interval.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = (date) => {
    const d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = (date, step) => {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = (start, stop, step) => {
    const range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    let previous;
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? (d) => field(d) % step === 0
              : (d) => interval.count(0, d) % step === 0);
    };
  }

  return interval;
}

;// CONCATENATED MODULE: ./node_modules/d3-time/src/duration.js
const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;

;// CONCATENATED MODULE: ./node_modules/d3-time/src/second.js



const second = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});

const seconds = second.range;

;// CONCATENATED MODULE: ./node_modules/d3-time/src/minute.js



const timeMinute = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getMinutes();
});

const timeMinutes = timeMinute.range;

const utcMinute = timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});

const utcMinutes = utcMinute.range;

;// CONCATENATED MODULE: ./node_modules/d3-time/src/hour.js



const timeHour = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getHours();
});

const timeHours = timeHour.range;

const utcHour = timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getUTCHours();
});

const utcHours = utcHour.range;

;// CONCATENATED MODULE: ./node_modules/d3-time/src/day.js



const timeDay = timeInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  date => date.getDate() - 1
);

const timeDays = timeDay.range;

const utcDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});

const utcDays = utcDay.range;

const unixDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});

const unixDays = unixDay.range;

;// CONCATENATED MODULE: ./node_modules/d3-time/src/month.js


const timeMonth = timeInterval((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});

const timeMonths = timeMonth.range;

const utcMonth = timeInterval((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});

const utcMonths = utcMonth.range;

;// CONCATENATED MODULE: ./node_modules/d3-time/src/week.js



function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

const timeSunday = timeWeekday(0);
const timeMonday = timeWeekday(1);
const timeTuesday = timeWeekday(2);
const timeWednesday = timeWeekday(3);
const timeThursday = timeWeekday(4);
const timeFriday = timeWeekday(5);
const timeSaturday = timeWeekday(6);

const timeSundays = timeSunday.range;
const timeMondays = timeMonday.range;
const timeTuesdays = timeTuesday.range;
const timeWednesdays = timeWednesday.range;
const timeThursdays = timeThursday.range;
const timeFridays = timeFriday.range;
const timeSaturdays = timeSaturday.range;

function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}

const utcSunday = utcWeekday(0);
const utcMonday = utcWeekday(1);
const utcTuesday = utcWeekday(2);
const utcWednesday = utcWeekday(3);
const utcThursday = utcWeekday(4);
const utcFriday = utcWeekday(5);
const utcSaturday = utcWeekday(6);

const utcSundays = utcSunday.range;
const utcMondays = utcMonday.range;
const utcTuesdays = utcTuesday.range;
const utcWednesdays = utcWednesday.range;
const utcThursdays = utcThursday.range;
const utcFridays = utcFriday.range;
const utcSaturdays = utcSaturday.range;

;// CONCATENATED MODULE: ./node_modules/d3-time/src/year.js


const timeYear = timeInterval((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date) => {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
timeYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

const timeYears = timeYear.range;

const utcYear = timeInterval((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

const utcYears = utcYear.range;

;// CONCATENATED MODULE: ./node_modules/d3-time-format/src/locale.js


function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newDate(y, m, d) {
  return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, undefined, 1),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return localDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}

function dISO(d) {
  var day = d.getDay();
  return (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
}

function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}

function UTCdISO(d) {
  var day = d.getUTCDay();
  return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
}

function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

;// CONCATENATED MODULE: ./src/utils/index.js






transition_transition;
/**
 * @module utiles/index
 */

/**
 * Devuelve una cadena de texto aleatoreo.
 * @returns {String}
 */
function idAleatorio() {
  return 'id-' + Math.random().toString(36).substring(2);
}

/**
 * Busca el atributo `sisdai-{tipo}` en los elemntos padre del html de un componente y deviuelve
 * su valor.
 * @param {String} tipo puede ser contenedor de grafica, mapa o algun derivado de los mismos.
 * @param {HTMLElement} html de cualquier elemento.
 * @returns {String} valor del atrubutos sisdai-contenedor.
 */
function buscarIdContenedorHtmlSisdai(tipo, {
  parentElement
}) {
  // console.log('buscarIdContenedorHtmlSisdai', parentElement)

  if (parentElement.getAttribute(`sisdai-${tipo}`) !== null) {
    // console.log('es sisdai-contenedor')
    return parentElement.getAttribute(`sisdai-${tipo}`);
  }
  if (parentElement.parentElement !== null) {
    // console.log('buscar un nivel abajo', parentElement.parentElement)
    return buscarIdContenedorHtmlSisdai(tipo, parentElement);
  } else {
    // eslint-disable-next-line
    console.warn(`No se encontro el contenedor`);
  }
}

/**
 * Crea el eje vertical
 * @param {String} id el id asociado al componente SisdaiGraficas.
 * @param {Function} escala funcion de d3 (scaleBand, scaleLinear, etc.) que se emplea para graficar y se asocia al eje vertical.
 * @param {Number} angulo es el ángulo que se rotan las etiquetas del eje.
 * @param {String} alineacion corresponde a la propiedad alineacion_eje_y con valor 'izquierda' o 'derecha'.
 * @param {Number} ancho es el ancho de la gráfica. Se utiliza para dar longitud correcta a las lineas punteadas.
 */
function creaEjeVertical(id, escala, angulo, alineacion, ancho) {
  const eje_y = src_select(`div#${id} svg g.eje-y-${alineacion}`);
  eje_y.transition().duration(500).call(alineacion === 'izquierda' ? axisLeft(escala) : axisRight(escala));
  eje_y.selectAll('path').remove();
  eje_y.selectAll('text').attr('transform', `translate(${alineacion === 'izquierda' ? '-5' : '5'},0)rotate(${angulo})`).attr('dy', `0em`).interrupt().attr('x', '0').attr('class', 'vis-valores-ejes').style('dominant-baseline', 'middle').text(d => d.toLocaleString('en'));
  eje_y.selectAll('g.tick line').interrupt().attr('x1', '0').attr('y1', '0').attr('x2', alineacion === 'izquierda' ? ancho : -ancho).attr('y2', '0').attr('class', 'vis-linea-ejes');
  eje_y.selectAll('line.vis-linea-base').remove();
  eje_y.append('line').attr('class', 'vis-linea-base').attr('x1', '0').attr('y1', max_max(escala.range())).attr('x2', alineacion === 'izquierda' ? ancho : -ancho).attr('y2', max_max(escala.range()));
  return eje_y;
}
/**
 * Crea el eje horizontal
 * @param {String} id el id asociado al componente SisdaiGraficas.
 * @param {Function} escala funcion de d3 (scaleBand, scaleLinear, etc.) que se emplea para graficar y se asocia al eje vertical.
 * @param {Number} angulo es el ángulo que se rotan las etiquetas del eje.
 */
function creaEjeHorizontal(id, escala, angulo) {
  const eje_x = src_select(`div#${id} svg g.eje-x-abajo`);
  eje_x.transition().duration(500).call(axisBottom(escala).tickFormat(d => {
    if (d instanceof Date) {
      return multiFormat(d);
    } else {
      return d;
    }
  }));
  eje_x.selectAll('path').remove();
  eje_x.selectAll('line').remove();
  eje_x.selectAll('text').attr('class', 'vis-valores-ejes').attr('transform', `translate(0,8)rotate(${angulo})`).attr('dy', `${-Math.abs(angulo / 90)}em`).style('dominant-baseline', angulo !== 0 ? 'middle' : 'inherit').style('text-anchor', angulo < 0 ? 'end' : angulo === 0 ? 'middle' : 'start');
  return eje_x;
}

/**
 * formatea eje temporal al espaniol
 * @param {Date} date el id asociado al componente SisdaiGraficas.
 */
function multiFormat(date) {
  /**
   * Método para traducir el formato de fecha
   */
  let locale = formatLocale({
    decimal: ',',
    thousands: '.',
    grouping: [3],
    currency: ['€', ''],
    dateTime: '%A, %e %B %Y г. %X',
    date: '%d.%m.%Y',
    time: '%H:%M:%S',
    periods: ['AM', 'PM'],
    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    shortDays: ['Dom', 'Lun', 'Mar', 'Mi', 'Jue', 'Vie', 'Sab'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    shortMonths: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  });
  let formatMillisecond = locale.format('.%L');
  let formatSecond = locale.format(':%S');
  let formatMinute = locale.format('%I:%M');
  let formatHour = locale.format('%I %p');
  let formatDay = locale.format('%a %d');
  let formatWeek = locale.format('%b %d');
  //let formatMonth = locale.format('%b')
  let formatMonthYear = locale.format('%Y');
  //let formatYear = locale.format('%Y')
  return (second(date) < date ? formatMillisecond : timeMinute(date) < date ? formatSecond : timeHour(date) < date ? formatMinute : timeDay(date) < date ? formatHour : timeMonth(date) < date ? timeSunday(date) < date ? formatDay : formatWeek : timeYear(date) < date ? formatMonthYear : formatMonthYear)(date);
}
function reordenamientoApilado(datos_apilados) {
  for (var indice_fecha = 0; indice_fecha < datos_apilados[0].length; indice_fecha++) {
    var dictsStack = [];
    for (var indice_franja = 0; indice_franja < datos_apilados.length; indice_franja++) {
      var min_val = src_min_min(range(datos_apilados.length).map(i => datos_apilados[i][indice_fecha][0]));
      dictsStack[indice_franja] = {
        cat: indice_franja,
        intervalo: datos_apilados[indice_franja][indice_fecha],
        delta: datos_apilados[indice_franja][indice_fecha][1] - datos_apilados[indice_franja][indice_fecha][0],
        minimo: min_val
      };
    }
    dictsStack.sort((a, b) => ascending_ascending(a.delta, b.delta));
    let contador_apilador = 0;
    for (indice_franja = 0; indice_franja < datos_apilados.length; indice_franja++) {
      if (indice_franja === 0) {
        contador_apilador = dictsStack[indice_franja].minimo;
      }
      dictsStack[indice_franja].intervalo = [contador_apilador, contador_apilador + dictsStack[indice_franja].delta];
      datos_apilados[dictsStack[indice_franja].cat][indice_fecha][0] = contador_apilador;
      datos_apilados[dictsStack[indice_franja].cat][indice_fecha][1] = contador_apilador + dictsStack[indice_franja].delta;
      contador_apilador += dictsStack[indice_franja].delta;
    }
  }
  return datos_apilados;
}
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-alluvial/SisdaiAlluvial.vue?vue&type=script&setup=true&lang=js








/* harmony default export */ var SisdaiAlluvialvue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiAlluvial',
  props: {
    datos: {
      type: Object,
      require: true
    },
    variables: {
      type: Array,
      require: true,
      validator(value) {
        // debe tener: id, ¡ color
        const validado = value.some(({
          id,
          color
        }) => id !== undefined || color !== undefined);
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    }
  },
  setup(__props) {
    const props = __props;
    var idGrafica;
    const sisdaiAlluvial = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.shallowRef)();
    const {
      datos,
      variables
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    transition_transition;
    const margenesSvg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const grupoContenedor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoNodos = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoEnlaces = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();

    // preguntar a Dani y Moni
    const formatea = format(',.0f'); // cero decimales

    function creaAlluvial() {
      const grupoVis = usarRegistroGraficas().grafica(idGrafica).grupoVis;

      // configura las propiedades del sankey
      const grupoSankey = Sankey().nodeId(d => d.name).nodeWidth(24) // ancho del nodo
      .nodePadding(8) // separación vertical entre nodos
      .extent([[-margenesSvg.value.izquierda, -margenesSvg.value.arriba], [grupoVis.ancho + margenesSvg.value.derecha, grupoVis.alto + margenesSvg.value.abajo]]);

      // obtén el formato de datos para nodos y enlaces
      const {
        nodes,
        links
      } = grupoSankey({
        nodes: datos.value.nodos.map(d => Object.assign({}, d)),
        links: datos.value.enlaces.map(d => Object.assign({}, d))
      });

      // agrega enlaces
      grupoEnlaces.value.selectAll('g.grupo-enlace').data(links).join(enter => {
        enter.append('g').attr('class', 'grupo-enlace').style('isolation', 'isolate') // sin aislación, el color de fondo será tomado en cuenta
        .append('path').attr('class', 'enlace').attr('d', sankeyLinkHorizontal()).attr('stroke-width', d => Math.max(1, d.width)).attr('fill', 'none').attr('stroke', variables.value.filter(dd => dd.id === 'enlaces')[0].color).attr('opacity', 0.25).style('mix-blend-mode', 'multiply')
        // interacción con el mouse
        .on('mouseover', function () {
          src_select(this).transition().duration(500).attr('opacity', 0.5);
        }).on('mouseout', function () {
          src_select(this).transition().duration(500).attr('opacity', 0.25);
        }).append('title').text(d =>
        // revisar cuando son más de dos nodos
        `${d.source.name} → ${d.target.name}\nvalor: ${d.value.toLocaleString()}`);
      }, update => {
        let grupo = update;
        let trazo = grupo.selectAll('path.enlace').data(d => [d]).attr('d', sankeyLinkHorizontal()).attr('stroke-width', d => Math.max(1, d.width));
        trazo.selectAll('title').data(d => [d]).text(d => `${d.source.name} → ${d.target.name}\nvalor: ${d.value.toLocaleString()}`);
      }, exit => {
        exit.remove();
      });

      // agrega nodos
      grupoNodos.value.selectAll('g.grupo-nodo').data(nodes).join(enter => {
        let grupo = enter.append('g').attr('class', 'grupo-nodo');
        grupo.append('rect').attr('class', 'nodo-rectangulo').attr('x', d => d.x0 + 1) // separación entre el nodo y el enlace
        .attr('y', d => d.y0).attr('height', d => d.y1 - d.y0).attr('width', d => d.x1 - d.x0 - 2) // proporcional a la separación por ambos lados
        .attr('fill', d => variables.value.filter(dd => dd.id === d.id)[0].color).attr('opacity', 1).attr('id', (d, i) => {
          d.id = i;
          return 'rect-' + i;
        })
        // interacción con el mouse
        .on('mouseover', (d, i) => {
          let nodoResaltado = [];

          // resalta los enlaces según el nodo seleccionado
          grupoEnlaces.value.transition().duration(500).selectAll('path.enlace').attr('opacity', function (l) {
            if (l.source.index === i.index || l.target.index === i.index) {
              nodoResaltado.push(l.target.id);
              nodoResaltado.push(l.source.id);
            }
            return l.source.index === i.index || l.target.index === i.index ? 0.5 : 0.2; // baja la opacidad a los enlaces que no estén relacionados
          });

          // baja la opacidad a los nodos y textos que no estén relacionados
          grupoNodos.value.transition().duration(500).selectAll('rect.nodo-rectangulo').attr('opacity', 0.2);
          grupoNodos.value.transition().duration(500).selectAll('text.nodo-nombre')
          // .selectAll('foreignObject.nodo-nombre')
          .attr('opacity', 0.2);

          // resalta los nodos y textos que estén relacionados
          for (let i = 0; i < nodoResaltado.length; i++) {
            grupoNodos.value.transition().duration(500).selectAll('rect#rect-' + nodoResaltado[i]).attr('opacity', 1);
            grupoNodos.value.transition().duration(500).selectAll('text#rect-texto-' + nodoResaltado[i])
            // .selectAll('foreignObject#rect-texto-' + nodoResaltado[i])
            .attr('opacity', 1);
          }
        }).on('mouseleave', () => {
          // resetea la opacidad de los enlaces y nodos a como estaban
          grupoEnlaces.value.transition().duration(500).selectAll('path.enlace').attr('opacity', 0.25);
          grupoNodos.value.transition().duration(500).selectAll('rect.nodo-rectangulo').attr('opacity', 1);
          grupoNodos.value.transition().duration(500).selectAll('text.nodo-nombre')
          // .selectAll('foreignObject.nodo-nombre')
          .attr('opacity', 1);
        }).append('title').text(d => `${d.name}\nvalor: ${d.value.toLocaleString()}`);

        // Utilizando foreignObject
        // let texto = grupo
        //   .append('foreignObject')
        //   .attr('class', 'nodo-nombre')
        //   .attr('id', (d, i) => {
        //     d.id = i
        //     return 'rect-texto-' + i
        //   })
        //   // si la x0 del vector es menor a la mitad del ancho anchoVis
        //   .attr('x', d =>
        //     d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8 - 110
        //   ) // padding horizontal de 8px
        //   .attr('y', d => (d.y1 + d.y0) / 2 - 80)
        //   .attr('width', 110)
        //   .attr('height', 160)
        //   .attr('opacity', 1)
        //   // agrega div
        //   .append('xhtml:div')
        //   .style('display', 'inline-grid')
        //   .style('align-content', 'center')
        //   .style('justify-content', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'start' : 'end'
        //   )
        //   .style('height', '160px')
        //   .style('width', '110px')
        // // agrega p
        // texto
        //   .append('p')
        //   .style('margin', '0px')
        //   .style('font-size', '.75rem')
        //   .style('font-weight', '600')
        //   .style('line-height', '1.3em')
        //   .style('text-align', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'left' : 'right'
        //   )
        //   .text(d => d.name)
        // texto
        //   .append('p')
        //   .attr('class', 'nodo-valor')
        //   .style('margin', '0px')
        //   .style('font-size', '.75rem')
        //   .attr('font-weight', '400')
        //   .style('text-align', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'left' : 'right'
        //   )
        //   .text(d => `valor: ${formatea(d.value).toLocaleString()}`) // solo la cantidad

        grupo.append('text').attr('class', 'nodo-nombre').attr('id', (d, i) => {
          d.id = i;
          return 'rect-texto-' + i;
        }).attr('x', d => d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8) // padding horizontal de 8px
        .attr('y', d => (d.y1 + d.y0) / 2).attr('dy', '0em').attr('text-anchor', d => d.x0 < grupoVis.ancho / 2 ? 'start' : 'end').attr('font-size', '.75rem').attr('font-weight', '600').attr('opacity', 1).text(d => d.name)
        // adjunta tspan
        .append('tspan').attr('class', 'nodo-valor').attr('x', d => d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8).attr('dy', '1.3em') // salto de línea con interlineado 1.3em
        .attr('font-weight', '400').text(d => `valor: ${formatea(d.value).toLocaleString()}`); // solo la cantidad
      }, update => {
        let grupo = update;
        let rectangulo = grupo.selectAll('rect.nodo-rectangulo').data(d => [d]).attr('x', d => d.x0 + 1).attr('y', d => d.y0).attr('height', d => d.y1 - d.y0).attr('width', d => d.x1 - d.x0 - 2).attr('fill', d => variables.value.filter(dd => dd.id === d.id)[0].color).attr('id', (d, i) => {
          d.id = i;
          return 'rect-' + i;
        });
        rectangulo.selectAll('title').data(d => [d]).text(d => `${d.name}\nvalor: ${d.value.toLocaleString()}`);

        // Utilizando foreignObject
        // let texto = grupo.selectAll('foreignObject.nodo-nombre').data(d => [d])
        // texto
        //   .attr('id', (d, i) => {
        //     d.id = i
        //     return 'rect-texto-' + i
        //   })
        //   .attr('x', d =>
        //     d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8 - 110
        //   )
        //   .attr('y', d => (d.y1 + d.y0) / 2 - 80)
        //   .append('xhtml:div')
        //   .style('justify-content', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'start' : 'end'
        //   )
        // texto
        //   .append('p')
        //   .style('text-align', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'left' : 'right'
        //   )
        //   .text(d => d.name)
        // texto
        //   .append('p')
        //   .style('text-align', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'left' : 'right'
        //   )
        //   .text(d => `valor: ${formatea(d.value).toLocaleString()}`)

        let texto = grupo.selectAll('text.nodo-nombre').data(d => [d]);
        texto.attr('id', (d, i) => {
          d.id = i;
          return 'rect-texto-' + i;
        }).attr('x', d => d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8).attr('y', d => (d.y1 + d.y0) / 2).attr('text-anchor', d => d.x0 < grupoVis.ancho / 2 ? 'start' : 'end').text(d => d.name).append('tspan').attr('class', 'nodo-valor').attr('x', d => d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8).attr('dy', '1.3em').attr('font-weight', 'normal').text(d => `valor: ${formatea(d.value).toLocaleString()}`);
      }, exit => {
        exit.remove();
      });
    }
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiAlluvial.value);
      grupoContenedor.value = src_select('#' + idGrafica + ' svg g.contenedor-alluvial');
      margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes;
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).margenes, nv => margenesSvg.value = nv);
      grupoEnlaces.value = grupoContenedor.value.append('g').attr('class', 'contenedor-enlaces');
      grupoNodos.value = grupoContenedor.value.append('g').attr('class', 'contenedor-nodos');
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaAlluvial();
      }
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).grupoVis, () => {
        if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
          creaAlluvial();
        }
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(datos, () => {
        creaAlluvial();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(variables, () => {
        creaAlluvial();
      });
    });
    return {
      __sfc: true,
      idGrafica,
      props,
      sisdaiAlluvial,
      datos,
      variables,
      margenesSvg,
      grupoContenedor,
      grupoNodos,
      grupoEnlaces,
      formatea,
      creaAlluvial
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-alluvial/SisdaiAlluvial.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_alluvial_SisdaiAlluvialvue_type_script_setup_true_lang_js = (SisdaiAlluvialvue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/componentes/sisdai-alluvial/SisdaiAlluvial.vue





/* normalize component */
;
var component = normalizeComponent(
  sisdai_alluvial_SisdaiAlluvialvue_type_script_setup_true_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiAlluvial = (component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-alluvial/index.js

const sisdai_alluvial_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiAlluvial', SisdaiAlluvial);
  }
};
/* harmony default export */ var sisdai_alluvial = (sisdai_alluvial_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-areas-apiladas/SisdaiAreasApiladas.vue?vue&type=template&id=2f22ad52
var SisdaiAreasApiladasvue_type_template_id_2f22ad52_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('g', {
    ref: "sisdaiAreasApiladas",
    staticClass: "contenedor-areas",
    attrs: {
      "transform": `translate(${_setup.margenesSvg?.izquierda || 0},${_setup.margenesSvg?.arriba || 0})`
    }
  });
};
var SisdaiAreasApiladasvue_type_template_id_2f22ad52_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/d3-array/src/extent.js
function extent(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/sum.js
function sum_sum(values, valueof) {
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum += value;
      }
    }
  }
  return sum;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/descending.js
function descending(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/bisector.js



function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending_ascending;
    compare2 = (d, x) => ascending_ascending(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending_ascending || f === descending ? f : bisector_zero;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function bisector_zero() {
  return 0;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/ticks.js
const e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log10(step)),
      error = step / Math.pow(10, power),
      factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}

function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

;// CONCATENATED MODULE: ./node_modules/d3-time/src/millisecond.js


const millisecond = timeInterval(() => {
  // noop
}, (date, step) => {
  date.setTime(+date + step);
}, (start, end) => {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = (k) => {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return timeInterval((date) => {
    date.setTime(Math.floor(date / k) * k);
  }, (date, step) => {
    date.setTime(+date + step * k);
  }, (start, end) => {
    return (end - start) / k;
  });
};

const milliseconds = millisecond.range;

;// CONCATENATED MODULE: ./node_modules/d3-time/src/ticks.js











function ticker(year, month, week, day, hour, minute) {

  const tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function ticks(start, stop, count) {
    const reverse = stop < start;
    if (reverse) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
    return reverse ? ticks.reverse() : ticks;
  }

  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = bisector(([,, step]) => step).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }

  return [ticks, tickInterval];
}

const [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
const [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);



;// CONCATENATED MODULE: ./node_modules/d3-time-format/src/defaultLocale.js


var src_defaultLocale_locale;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;

defaultLocale_defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale_defaultLocale(definition) {
  src_defaultLocale_locale = formatLocale(definition);
  timeFormat = src_defaultLocale_locale.format;
  timeParse = src_defaultLocale_locale.parse;
  utcFormat = src_defaultLocale_locale.utcFormat;
  utcParse = src_defaultLocale_locale.utcParse;
  return src_defaultLocale_locale;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/number.js
function number_number(x) {
  return x === null ? NaN : +x;
}

function* numbers(values, valueof) {
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/bisect.js




const ascendingBisect = bisector(ascending_ascending);
const bisectRight = ascendingBisect.right;
const bisectLeft = ascendingBisect.left;
const bisectCenter = bisector(number_number).center;
/* harmony default export */ var bisect = (bisectRight);

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/array.js



/* harmony default export */ function src_array(a, b) {
  return (isNumberArray(b) ? numberArray : genericArray)(a, b);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = src_value(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/date.js
/* harmony default export */ function date(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/object.js


/* harmony default export */ function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = src_value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/numberArray.js
/* harmony default export */ function src_numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function numberArray_isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/value.js










/* harmony default export */ function src_value(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? d3_interpolate_src_constant(b)
      : (t === "number" ? src_number
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date
      : numberArray_isNumberArray(b) ? src_numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : src_number)(a, b);
}

;// CONCATENATED MODULE: ./node_modules/d3-interpolate/src/round.js
/* harmony default export */ function round(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/constant.js
function constants(x) {
  return function() {
    return x;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/number.js
function src_number_number(x) {
  return +x;
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/continuous.js





var unit = [0, 1];

function continuous_identity(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate = src_value,
      transform,
      untransform,
      unknown,
      clamp = continuous_identity,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== continuous_identity) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), src_number)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, src_number_number), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate = round, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : continuous_identity, rescale()) : clamp !== continuous_identity;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer()(continuous_identity, continuous_identity);
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/init.js
function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/nice.js
function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/time.js






function time_date(t) {
  return new Date(t);
}

function time_number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
  var scale = continuous(),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(Array.from(_, time_number)) : domain().map(time_date);
  };

  scale.ticks = function(interval) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice(d, interval)) : scale;
  };

  scale.copy = function() {
    return copy(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
  };

  return scale;
}

function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionPrefix.js


/* harmony default export */ function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionRound.js


/* harmony default export */ function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

;// CONCATENATED MODULE: ./node_modules/d3-format/src/precisionFixed.js


/* harmony default export */ function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/tickFormat.js



function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/linear.js





function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start
        d[i1] = stop
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

function linear_linear() {
  var scale = continuous();

  scale.copy = function() {
    return copy(scale, linear_linear());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/array.js
var array_slice = Array.prototype.slice;

/* harmony default export */ function d3_shape_src_array(x) {
  return typeof x === "object" && "length" in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/constant.js
/* harmony default export */ function d3_shape_src_constant(x) {
  return function constant() {
    return x;
  };
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/offset/none.js
/* harmony default export */ function offset_none(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/order/none.js
/* harmony default export */ function order_none(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/stack.js





function stackValue(d, key) {
  return d[key];
}

function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}

/* harmony default export */ function stack() {
  var keys = d3_shape_src_constant([]),
      order = order_none,
      offset = offset_none,
      value = stackValue;

  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries),
        i, n = sz.length, j = -1,
        oz;

    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }

    for (i = 0, oz = d3_shape_src_array(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : d3_shape_src_constant(Array.from(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : d3_shape_src_constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? order_none : typeof _ === "function" ? _ : d3_shape_src_constant(Array.from(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? offset_none : _, stack) : offset;
  };

  return stack;
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: this._context.lineTo(x, y); break;
    }
  }
};

/* harmony default export */ function curve_linear(context) {
  return new Linear(context);
}

;// CONCATENATED MODULE: ./node_modules/d3-path/src/path.js
const path_pi = Math.PI,
    path_tau = 2 * path_pi,
    path_epsilon = 1e-6,
    path_tauEpsilon = path_tau - path_epsilon;

function path_append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}

function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return path_append;
  const k = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}

class path_Path {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
    this._append = digits == null ? path_append : appendRound(digits);
  }
  moveTo(x, y) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x, y) {
    this._append`L${this._x1 = +x},${this._y1 = +y}`;
  }
  quadraticCurveTo(x1, y1, x, y) {
    this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > path_epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > path_epsilon) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    }

    // Otherwise, draw an arc!
    else {
      let x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((path_pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > path_epsilon) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }

      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > path_epsilon || Math.abs(this._y1 - y0) > path_epsilon) {
      this._append`L${x0},${y0}`;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % path_tau + path_tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > path_tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > path_epsilon) {
      this._append`A${r},${r},0,${+(da >= path_pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
    }
  }
  rect(x, y, w, h) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
}

function path_path() {
  return new path_Path;
}

// Allow instanceof d3.path
path_path.prototype = path_Path.prototype;

function pathRound(digits = 3) {
  return new path_Path(+digits);
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/path.js


function withPath(shape) {
  let digits = 3;

  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };

  return () => new path_Path(digits);
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/point.js
function src_point_x(p) {
  return p[0];
}

function src_point_y(p) {
  return p[1];
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/line.js






/* harmony default export */ function line(x, y) {
  var defined = d3_shape_src_constant(true),
      context = null,
      curve = curve_linear,
      output = null,
      path = withPath(line);

  x = typeof x === "function" ? x : (x === undefined) ? src_point_x : d3_shape_src_constant(x);
  y = typeof y === "function" ? y : (y === undefined) ? src_point_y : d3_shape_src_constant(y);

  function line(data) {
    var i,
        n = (data = d3_shape_src_array(data)).length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : d3_shape_src_constant(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : d3_shape_src_constant(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : d3_shape_src_constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/area.js







/* harmony default export */ function src_area(x0, y0, y1) {
  var x1 = null,
      defined = d3_shape_src_constant(true),
      context = null,
      curve = curve_linear,
      output = null,
      path = withPath(area);

  x0 = typeof x0 === "function" ? x0 : (x0 === undefined) ? src_point_x : d3_shape_src_constant(+x0);
  y0 = typeof y0 === "function" ? y0 : (y0 === undefined) ? d3_shape_src_constant(0) : d3_shape_src_constant(+y0);
  y1 = typeof y1 === "function" ? y1 : (y1 === undefined) ? src_point_y : d3_shape_src_constant(+y1);

  function area(data) {
    var i,
        j,
        k,
        n = (data = d3_shape_src_array(data)).length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : d3_shape_src_constant(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : d3_shape_src_constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : d3_shape_src_constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : d3_shape_src_constant(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : d3_shape_src_constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : d3_shape_src_constant(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : d3_shape_src_constant(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-areas-apiladas/SisdaiAreasApiladas.vue?vue&type=script&setup=true&lang=js










/* harmony default export */ var SisdaiAreasApiladasvue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiAreasApiladas',
  props: {
    datos: {
      type: Array,
      require: true
    },
    variables: {
      type: Array,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color
        const validado = value.some(({
          id,
          nombre,
          color
        }) => id !== undefined || nombre !== undefined || color !== undefined);
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    },
    clave_fecha: {
      type: String,
      default: 'fecha'
    },
    alineacion_eje_y: {
      type: String,
      default: 'izquierda',
      validator(value) {
        const validado = value === 'izquierda' || value === 'derecha';
        if (!validado) {
          console.error("la propiedad 'alineacion_eje_y' sólo admite los valores 'izquierda' o 'derecha'");
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_x: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_y: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    formato_temporal: {
      default: '%d-%m-%Y',
      type: String
    },
    reordenamientoTemporal: {
      // Propiedad de prueba
      default: false
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    var idGrafica;
    const sisdaiAreasApiladas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.shallowRef)();
    const {
      datos,
      clave_fecha,
      variables
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    transition_transition;
    const margenesSvg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const datos_apilados = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)([]);
    const conversionTemporal = timeParse(props.formato_temporal);
    const escalaTemporal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      escalaLineal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const grupoContenedor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoAreas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    function calcularEscalas(grupoVis) {
      if (!grupoVis && grupoVis.ancho === 0) return;
      escalaTemporal.value = time().domain(extent(datos.value?.map(d => d.la_fecha))).range([0, grupoVis.ancho]);
      escalaLineal.value = linear_linear().domain([0, max_max(datos.value?.map(d => sum_sum(variables.value.map(dd => d[dd.id]))))]).range([grupoVis.alto, 0]);
      creaEjeHorizontal(idGrafica, escalaTemporal.value, props.angulo_etiquetas_eje_x);
      creaEjeVertical(idGrafica, escalaLineal.value, props.angulo_etiquetas_eje_y, props.alineacion_eje_y, grupoVis.ancho);
    }
    function creaAreas() {
      datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
      datos_apilados.value = stack().keys(variables.value.map(d => d.id))(datos.value);
      if (props.reordenamientoTemporal) {
        datos_apilados.value = reordenamientoApilado(datos_apilados.value);
      }
      grupoAreas.value = grupoContenedor.value.selectAll('path.area').data(datos_apilados.value).join(enter => {
        enter.append('path').attr('class', 'area').attr('d', dd => src_area().x(d => escalaTemporal.value(d.data.la_fecha)).y0(d => escalaLineal.value(d[0])).y1(d => escalaLineal.value(d[1]))(dd)).attr('fill', d => variables.value.filter(dd => dd.id === d.key)[0].color);
      }, update => {
        update.transition().duration(500).attr('d', dd => src_area().x(d => escalaTemporal.value(d.data.la_fecha)).y0(d => escalaLineal.value(d[0])).y1(d => escalaLineal.value(d[1]))(dd)).attr('fill', d => variables.value.filter(dd => dd.id === d.key)[0].color).selection();
      }, exit => {
        exit.remove();
      });
    }
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiAreasApiladas.value);
      grupoContenedor.value = src_select('#' + idGrafica + ' svg g.contenedor-areas');
      margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes;
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).margenes, nv => margenesSvg.value = nv);
      datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
      creaAreas();
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).grupoVis, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
          creaAreas();
        }
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(datos, () => {
        datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaAreas();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(variables, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaAreas();
      });
    });
    expose({
      escalaTemporal,
      escalaLineal
    });
    return {
      __sfc: true,
      idGrafica,
      props,
      sisdaiAreasApiladas,
      datos,
      clave_fecha,
      variables,
      margenesSvg,
      datos_apilados,
      conversionTemporal,
      escalaTemporal,
      escalaLineal,
      grupoContenedor,
      grupoAreas,
      calcularEscalas,
      creaAreas
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-areas-apiladas/SisdaiAreasApiladas.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_areas_apiladas_SisdaiAreasApiladasvue_type_script_setup_true_lang_js = (SisdaiAreasApiladasvue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-areas-apiladas/SisdaiAreasApiladas.vue





/* normalize component */
;
var SisdaiAreasApiladas_component = normalizeComponent(
  sisdai_areas_apiladas_SisdaiAreasApiladasvue_type_script_setup_true_lang_js,
  SisdaiAreasApiladasvue_type_template_id_2f22ad52_render,
  SisdaiAreasApiladasvue_type_template_id_2f22ad52_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiAreasApiladas = (SisdaiAreasApiladas_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-areas-apiladas/index.js

const sisdai_areas_apiladas_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiAreasApiladas', SisdaiAreasApiladas);
  }
};
/* harmony default export */ var sisdai_areas_apiladas = (sisdai_areas_apiladas_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-areas-apiladas-ordenadas/SisdaiAreasApiladasOrdenadas.vue?vue&type=template&id=9ecb3fc4
var SisdaiAreasApiladasOrdenadasvue_type_template_id_9ecb3fc4_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('g', {
    ref: "sisdaiAreasApiladas",
    staticClass: "contenedor-areas",
    attrs: {
      "transform": `translate(${_setup.margenesSvg?.izquierda || 0},${_setup.margenesSvg?.arriba || 0})`
    }
  });
};
var SisdaiAreasApiladasOrdenadasvue_type_template_id_9ecb3fc4_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-areas-apiladas-ordenadas/SisdaiAreasApiladasOrdenadas.vue?vue&type=script&setup=true&lang=js









/* harmony default export */ var SisdaiAreasApiladasOrdenadasvue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiAreasApiladasOrdenadas',
  props: {
    datos: {
      type: Array,
      require: true
    },
    variables: {
      type: Array,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color
        const validado = value.some(({
          id,
          nombre,
          color
        }) => id !== undefined || nombre !== undefined || color !== undefined);
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    },
    clave_fecha: {
      type: String,
      default: 'fecha'
    },
    alineacion_eje_y: {
      type: String,
      default: 'izquierda',
      validator(value) {
        const validado = value === 'izquierda' || value === 'derecha';
        if (!validado) {
          console.error("la propiedad 'alineacion_eje_y' sólo admite los valores 'izquierda' o 'derecha'");
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_x: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_y: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    formato_temporal: {
      default: '%d-%m-%Y',
      type: String
    },
    ancho_barra: {
      default: 0.3,
      validator(value) {
        // debe estar entre 0 y 1
        const validado = 0 <= value && value <= 1;
        if (!validado) {
          console.error('El número debe estar entre 0 y 1');
        }
        return validado;
      }
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    var idGrafica;
    const sisdaiAreasApiladas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.shallowRef)();
    const {
      datos,
      clave_fecha,
      variables
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    transition_transition;
    const margenesSvg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const datos_apilados = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)([]);
    const conversionTemporal = timeParse(props.formato_temporal);
    const escalaTemporal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      escalaLineal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const grupoContenedor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoAreas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoRectangulos = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      eje_y = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const minDeltaTiempo = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const anchoBanda = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const datos_hover = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    function calcularEscalas(grupoVis) {
      if (!grupoVis && grupoVis.ancho === 0) return;
      escalaTemporal.value = time().domain(extent(datos.value?.map(d => d.la_fecha))).range([0, grupoVis.ancho]);
      let fechasOrdenadas = datos.value?.map(d => d.la_fecha).sort((a, b) => a - b);
      minDeltaTiempo.value = src_min_min(fechasOrdenadas.map((d, i) => i > 0 ? d - fechasOrdenadas[i - 1] : null));
      escalaLineal.value = linear_linear().domain([0, max_max(datos.value?.map(d => sum_sum(variables.value.map(dd => d[dd.id]))))]).range([grupoVis.alto, 0]);
      creaEjeHorizontal(idGrafica, escalaTemporal.value, props.angulo_etiquetas_eje_x);
      eje_y.value = creaEjeVertical(idGrafica, escalaLineal.value, props.angulo_etiquetas_eje_y, props.alineacion_eje_y, grupoVis.ancho);
    }
    function creaAreas() {
      datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
      datos_apilados.value = stack().keys(variables.value.map(d => d.id))(datos.value);
      datos_apilados.value = reordenamientoApilado(datos_apilados.value);
      let ancho_barra = escalaTemporal.value(new Date(datos_apilados.value[0][0]?.data.la_fecha.getTime() + 0.5 * props.ancho_barra * minDeltaTiempo.value)) - escalaTemporal.value(new Date(datos_apilados.value[0][0]?.data.la_fecha.getTime() - 0.5 * props.ancho_barra * minDeltaTiempo.value));
      anchoBanda.value = ancho_barra > 20 ? 20 : ancho_barra;
      eje_y.value.selectAll('text').attr('x', -0.5 * anchoBanda.value);
      grupoAreas.value = grupoContenedor.value.selectAll('path.area').data(datos_apilados.value).join(enter => {
        enter.append('path').attr('class', 'area').attr('d', dd => generadorAreaBezier(dd)).attr('fill', d => variables.value.filter(dd => dd.id === d.key)[0].color).attr('fill-opacity', '.5');
      }, update => {
        update.transition().duration(500).attr('d', dd => generadorAreaBezier(dd)).attr('fill', d => variables.value.filter(dd => dd.id === d.key)[0].color).attr('fill-opacity', '.5').selection();
      }, exit => {
        exit.remove();
      });
    }
    function creaVis() {
      creaAreas();
      creaBarras();
    }
    function creaBarras() {
      grupoRectangulos.value = grupoContenedor.value.selectAll('g.barras').data(datos_apilados.value).join(enter => {
        let grupo = enter.append('g').attr('class', 'barras').attr('fill', d => variables.value.filter(dd => dd.id === d.key)[0].color);
        grupo.selectAll('rect.barra').data(d => d).enter().append('rect').attr('class', `barra`).attr('y', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('x', d => escalaTemporal.value(d.data.la_fecha) - 0.5 * anchoBanda.value).attr('height', 0).attr('width', anchoBanda.value >= 0 ? anchoBanda.value : 0).transition().duration(500).attr('y', d => escalaLineal.value(d[1])).attr('height', d => escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0 ? 0 : escalaLineal.value(d[0]) - escalaLineal.value(d[1]));
      }, update => {
        let grupo = update.call(update1 => update1.transition().duration(500).attr('fill', d => variables.value.filter(v => v.id === d.key)[0].color));
        grupo.selectAll('rect.barra').data(d => d).join(barras_enter => {
          barras_enter.append('rect').attr('class', `barra`).attr('y', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('x', d => escalaTemporal.value(d?.data.la_fecha) - 0.5 * anchoBanda.value).attr('height', 0).attr('width', anchoBanda.value).transition().duration(500).attr('y', d => escalaLineal.value(d[1])).attr('height', d => escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0 ? 0 : escalaLineal.value(d[0]) - escalaLineal.value(d[1]));
        }, barras_update => {
          barras_update.transition().duration(500).attr('y', d => escalaLineal.value(d[1])).attr('height', d => escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0 ? 0 : escalaLineal.value(d[0]) - escalaLineal.value(d[1])).attr('x', d => escalaTemporal.value(d?.data.la_fecha) - 0.5 * anchoBanda.value).attr('width', anchoBanda.value);
        }, barras_exit => barras_exit.remove());
      }, exit => {
        exit.remove();
      });
    }
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiAreasApiladas.value);
      grupoContenedor.value = src_select('#' + idGrafica + ' svg g.contenedor-areas');
      margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes;
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).margenes, nv => margenesSvg.value = nv);
      datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
      creaVis();
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).grupoVis, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
          creaVis();
        }
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(datos, () => {
        datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaVis();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(variables, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaVis();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).posicion_cursor, nv => {
        let bisecetDate = bisector(d => d.la_fecha).left;
        let x0 = escalaTemporal.value.invert(nv.x - margenesSvg.value.izquierda);
        let indice = bisecetDate(datos.value, x0, 1);
        let d0 = datos.value[indice - 1];
        let d1 = datos.value[indice];
        if (!d1) {
          d1 = d0;
        }
        datos_hover.value = x0 - d0.la_fecha > d1.la_fecha - x0 ? d1 : d0;
        console.log(datos_hover.value);
      }, {
        deep: true
      });
    });
    expose({
      escalaTemporal,
      escalaLineal,
      datos_hover
    });
    function generadorAreaBezier(datum) {
      if (datum.length > 2) {
        var txt = `M ${escalaTemporal.value(+datum[0].data.la_fecha)}, ${escalaLineal.value(datum[0][1])}`;
        let x_i_mas_1;
        for (let i = 0; i < datum.length - 1; i++) {
          //let x00 = escalaTemporal.value(+datum[i-1].data.Year) - escalaTemporal.value.bandwidth() * .5
          let x_i = escalaTemporal.value(datum[i].data.la_fecha);
          x_i_mas_1 = escalaTemporal.value(datum[i + 1].data.la_fecha) - 0.5 * anchoBanda.value;

          //escalaTemporal.value(+datum[i + 1].datala_fecha)

          let x_i_bandwidth = x_i + 0.5 * anchoBanda.value;
          let x_mid = 0.5 * (x_i_mas_1 - x_i_bandwidth) + x_i_bandwidth;
          let y_i = escalaLineal.value(datum[i][1]);
          let y_i_mas_1 = escalaLineal.value(datum[i + 1][1]);
          txt += `H ${x_i_bandwidth} C ${x_mid} ${y_i},
        ${x_mid} ${y_i_mas_1},
        ${x_i_mas_1} ${y_i_mas_1}H ${x_i_mas_1}`;
        }
        txt += `H ${x_i_mas_1 + 0.5 * anchoBanda.value}`;
        txt += `V ${escalaLineal.value(datum[datum.length - 1][0])}`;
        txt += `H ${x_i_mas_1 - 0.5 * anchoBanda.value}`;
        for (let i = datum.length - 1; i > 0; i--) {
          //let x00 = escalaTemporal.value(+datum[i-1].data.Year) - escalaTemporal.value.bandwidth() * .5
          let x_i = escalaTemporal.value(+datum[i].data.la_fecha) - 1 * anchoBanda.value;
          let x_i_menos_1 = escalaTemporal.value(+datum[i - 1].data.la_fecha);
          let x_i_bandwidth = x_i + 0.5 * anchoBanda.value;
          let x_i_bandwidth_menos_1 = +0.5 * anchoBanda.value + x_i_menos_1;
          let x_mid = 0.5 * (x_i - x_i_bandwidth_menos_1) + x_i_bandwidth_menos_1;
          let y_i = escalaLineal.value(datum[i][0]);
          let y_i_menos_1 = escalaLineal.value(datum[i - 1][0]);
          txt += `H ${x_i_bandwidth} C ${x_mid} ${y_i}, ${x_mid} ${y_i_menos_1}, ${x_i_bandwidth_menos_1} ${y_i_menos_1}H ${x_i_menos_1}`;
        }
        return txt;
      }
    }
    return {
      __sfc: true,
      idGrafica,
      props,
      sisdaiAreasApiladas,
      datos,
      clave_fecha,
      variables,
      margenesSvg,
      datos_apilados,
      conversionTemporal,
      escalaTemporal,
      escalaLineal,
      grupoContenedor,
      grupoAreas,
      grupoRectangulos,
      eje_y,
      minDeltaTiempo,
      anchoBanda,
      datos_hover,
      calcularEscalas,
      creaAreas,
      creaVis,
      creaBarras,
      generadorAreaBezier
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-areas-apiladas-ordenadas/SisdaiAreasApiladasOrdenadas.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_areas_apiladas_ordenadas_SisdaiAreasApiladasOrdenadasvue_type_script_setup_true_lang_js = (SisdaiAreasApiladasOrdenadasvue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-areas-apiladas-ordenadas/SisdaiAreasApiladasOrdenadas.vue





/* normalize component */
;
var SisdaiAreasApiladasOrdenadas_component = normalizeComponent(
  sisdai_areas_apiladas_ordenadas_SisdaiAreasApiladasOrdenadasvue_type_script_setup_true_lang_js,
  SisdaiAreasApiladasOrdenadasvue_type_template_id_9ecb3fc4_render,
  SisdaiAreasApiladasOrdenadasvue_type_template_id_9ecb3fc4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiAreasApiladasOrdenadas = (SisdaiAreasApiladasOrdenadas_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-areas-apiladas-ordenadas/index.js

const sisdai_areas_apiladas_ordenadas_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiAreasApiladasOrdenadas', SisdaiAreasApiladasOrdenadas);
  }
};
/* harmony default export */ var sisdai_areas_apiladas_ordenadas = (sisdai_areas_apiladas_ordenadas_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-barras/SisdaiBarras.vue?vue&type=template&id=f09b6d22
var SisdaiBarrasvue_type_template_id_f09b6d22_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('g', {
    ref: "sisdaiBarras",
    staticClass: "contenedor-barras",
    attrs: {
      "transform": `translate(${_setup.margenesSvg?.izquierda || 0},${_setup.margenesSvg?.arriba || 0})`
    }
  });
};
var SisdaiBarrasvue_type_template_id_f09b6d22_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/internmap/src/index.js
class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}

class InternSet extends Set {
  constructor(values, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (values != null) for (const value of values) this.add(value);
  }
  has(value) {
    return super.has(intern_get(this, value));
  }
  add(value) {
    return super.add(intern_set(this, value));
  }
  delete(value) {
    return super.delete(intern_delete(this, value));
  }
}

function intern_get({_intern, _key}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/ordinal.js



const implicit = Symbol("implicit");

function ordinal() {
  var index = new InternMap(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    let i = index.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

;// CONCATENATED MODULE: ./node_modules/d3-scale/src/band.js




function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), [r0, r1])
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-barras/SisdaiBarras.vue?vue&type=script&setup=true&lang=js








/* harmony default export */ var SisdaiBarrasvue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiBarras',
  props: {
    datos: {
      type: Array,
      require: true
    },
    variables: {
      type: Array,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color
        const validado = value.some(({
          id,
          nombre,
          color
        }) => id !== undefined || nombre !== undefined || color !== undefined);
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    },
    acomodo: {
      type: String,
      default: 'apiladas',
      validator(value) {
        const validado = value === 'apiladas' || value === 'agrupadas';
        if (!validado) {
          console.error("la propiedad 'acomodo' sólo admite los valores 'apiladas' o 'agrupadas'");
        }
        return validado;
      }
    },
    separacion: {
      type: Number,
      default: 0.2,
      validator(value) {
        const validado = 0 <= value && value <= 1;
        if (!validado) {
          console.error('El valor debe estar entre 0 y 1');
        }
        return validado;
      }
    },
    separacion_agrupadas: {
      type: Number,
      default: 0.1,
      validator(value) {
        const validado = 0 <= value && value <= 1;
        if (!validado) {
          console.error('El valor debe estar entre 0 y 1');
        }
        return validado;
      }
    },
    clave_categorias: {
      type: String,
      default: 'categoria'
    },
    alineacion_eje_y: {
      type: String,
      default: 'izquierda',
      validator(value) {
        const validado = value === 'izquierda' || value === 'derecha';
        if (!validado) {
          console.error("la propiedad 'alineacion_eje_y' sólo admite los valores 'izquierda' o 'derecha'");
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_x: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_y: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    var idGrafica;
    const datos_hover = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const sisdaiBarras = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.shallowRef)();
    const {
      datos,
      clave_categorias,
      variables
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    transition_transition;
    const margenesSvg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const escalaBanda = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      escalaLineal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      escalaSubBanda = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const grupoContenedor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      data_apilada = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoBarras = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    function calcularEscalas(grupoVis) {
      if (!grupoVis && grupoVis.ancho === 0) return;
      escalaBanda.value = band().domain(datos.value?.map(d => d[clave_categorias.value])).range([0, grupoVis.ancho]).padding(props.separacion);
      escalaLineal.value = linear_linear().domain([0, props.acomodo === 'apiladas' ? max_max(datos.value?.map(d => sum_sum(variables.value.map(dd => d[dd.id])))) : max_max(datos.value?.map(d => max_max(variables.value.map(dd => d[dd.id]))))]).range([grupoVis.alto, 0]);
      escalaSubBanda.value = band().domain(variables.value.map(d => d.id)).range([0, escalaBanda.value.bandwidth()]).padding(props.separacion_agrupadas);
      let eje_horizontal = creaEjeHorizontal(idGrafica, escalaBanda.value, props.angulo_etiquetas_eje_x);
      eje_horizontal.selectAll('text').interrupt().html(d => {
        console.log(d);
        return d;
      });
      creaEjeVertical(idGrafica, escalaLineal.value, props.angulo_etiquetas_eje_y, props.alineacion_eje_y, grupoVis.ancho);
    }
    function creaBarras() {
      let apilada = stack().keys(variables.value.map(d => d.id))(datos.value);
      for (let i = 0; i < variables.value.length; i++) {
        apilada[i].forEach(d => {
          d.data = {
            ...d.data,
            ...{
              key: apilada[i].key
            }
          };
        });
      }
      data_apilada.value = apilada;
      grupoBarras.value = grupoContenedor.value.selectAll('g.subcategoria-barras').data(data_apilada.value).join(enter => {
        let grupo = enter.append('g').attr('class', 'subcategoria-barras').attr('fill', d => variables.value.filter(v => v.id === d.key)[0].color);
        grupo.selectAll('rect.barra').data(d => d).enter().append('rect').attr('class', d => `barra ${d.data.key}`).attr('y', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('x', d => {
          return props.acomodo === 'apiladas' ? escalaBanda.value(d.data[clave_categorias.value]) : escalaBanda.value(d.data[clave_categorias.value]) + escalaSubBanda.value(d.data.key);
        }).attr('height', 0).attr('width', props.acomodo === 'apiladas' ? escalaBanda.value.bandwidth() : escalaSubBanda.value.bandwidth()).transition().duration(500).attr('y', d => props.acomodo === 'apiladas' ? escalaLineal.value(d[1]) : escalaLineal.value(d[1] - d[0])).attr('height', d => escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0 ? 0 : escalaLineal.value(d[0]) - escalaLineal.value(d[1]));
      }, update => {
        let grupo = update.call(update1 => update1.transition().duration(500).attr('fill', d => variables.value.filter(v => v.id === d.key)[0].color));
        grupo.selectAll('rect.barra').data(d => d).join(barras_enter => {
          barras_enter.append('rect').attr('class', d => `barra ${d.data.key}`).attr('y', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('x', d => props.acomodo === 'apiladas' ? escalaBanda.value(d.data[clave_categorias.value]) : escalaBanda.value(d.data[clave_categorias.value]) + escalaSubBanda.value(d.data.key)).attr('height', 0).attr('width', props.acomodo === 'apiladas' ? escalaBanda.value.bandwidth() : escalaSubBanda.value.bandwidth()).transition().duration(500).attr('y', d => props.acomodo === 'apiladas' ? escalaLineal.value(d[1]) : escalaLineal.value(d[1] - d[0])).attr('height', d => escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0 ? 0 : escalaLineal.value(d[0]) - escalaLineal.value(d[1]));
        }, barras_update => {
          barras_update.transition().duration(500).attr('y', d => props.acomodo === 'apiladas' ? escalaLineal.value(d[1]) : escalaLineal.value(d[1] - d[0])).attr('height', d => escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0 ? 0 : escalaLineal.value(d[0]) - escalaLineal.value(d[1])).attr('x', d => props.acomodo === 'apiladas' ? escalaBanda.value(d.data[clave_categorias.value]) : escalaBanda.value(d.data[clave_categorias.value]) + escalaSubBanda.value(d.data.key)).attr('width', props.acomodo === 'apiladas' ? escalaBanda.value.bandwidth() : escalaSubBanda.value.bandwidth());
        }, barras_exit => barras_exit.remove());
      },
      // no update function
      exit => {
        exit.remove();
      });
    }
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiBarras.value);
      grupoContenedor.value = src_select('#' + idGrafica + ' svg g.contenedor-barras');
      margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes;
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).margenes, nv => margenesSvg.value = nv);
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
      creaBarras();
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).grupoVis, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
          creaBarras();
        }
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(datos, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaBarras();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(variables, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaBarras();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).posicion_cursor, nv => {
        let bandas = escalaBanda.value.step();
        let indice = nv.x < margenesSvg.value.derecha ? 0 : nv.x >= usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho + margenesSvg.value.izquierda ? escalaBanda.value.domain().length - 1 : parseInt((nv.x - margenesSvg.value.derecha - margenesSvg.value.izquierda) / bandas);
        indice = indice === escalaBanda.value.domain().length ? indice - 1 : indice;
        let categoria = escalaBanda.value.domain()[indice];
        datos_hover.value = data_apilada.value[0].filter(dd => dd.data[clave_categorias.value] === categoria)[0].data;
        grupoContenedor.value.selectAll('g.subcategoria-barras').selectAll('rect.barra').style('fill-opacity', '.2');
        grupoContenedor.value.selectAll('g.subcategoria-barras').selectAll('rect.barra').filter(d => d.data[clave_categorias.value] === datos_hover.value[clave_categorias.value]).style('fill-opacity', '1');
      }, {
        deep: true
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).globo_visible, nv => {
        if (!nv) {
          grupoContenedor.value.selectAll('g.subcategoria-barras').selectAll('rect.barra').style('fill-opacity', '1');
        }
      });
    });
    expose({
      escalaBanda,
      escalaLineal,
      escalaSubBanda,
      datos_hover
    });
    return {
      __sfc: true,
      idGrafica,
      props,
      datos_hover,
      sisdaiBarras,
      datos,
      clave_categorias,
      variables,
      margenesSvg,
      escalaBanda,
      escalaLineal,
      escalaSubBanda,
      grupoContenedor,
      data_apilada,
      grupoBarras,
      calcularEscalas,
      creaBarras
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-barras/SisdaiBarras.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_barras_SisdaiBarrasvue_type_script_setup_true_lang_js = (SisdaiBarrasvue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-barras/SisdaiBarras.vue





/* normalize component */
;
var SisdaiBarras_component = normalizeComponent(
  sisdai_barras_SisdaiBarrasvue_type_script_setup_true_lang_js,
  SisdaiBarrasvue_type_template_id_f09b6d22_render,
  SisdaiBarrasvue_type_template_id_f09b6d22_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiBarras = (SisdaiBarras_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-barras/index.js

const sisdai_barras_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiBarras', SisdaiBarras);
  }
};
/* harmony default export */ var sisdai_barras = (sisdai_barras_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-cajas-bigotes/SisdaiCajasBigotes.vue?vue&type=template&id=4f4ac904
var SisdaiCajasBigotesvue_type_template_id_4f4ac904_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('g', {
    ref: "sisdaiCajasBigotes",
    staticClass: "contenedor-cajas-bigotes",
    attrs: {
      "transform": `translate(${_setup.margenesSvg?.izquierda || 0},${_setup.margenesSvg?.arriba || 0})`
    }
  });
};
var SisdaiCajasBigotesvue_type_template_id_4f4ac904_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/d3-array/src/identity.js
function identity_identity(x) {
  return x;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/group.js



function group(values, ...keys) {
  return nest(values, identity, identity, keys);
}

function groups(values, ...keys) {
  return nest(values, Array.from, identity, keys);
}

function flatten(groups, keys) {
  for (let i = 1, n = keys.length; i < n; ++i) {
    groups = groups.flatMap(g => g.pop().map(([key, value]) => [...g, key, value]));
  }
  return groups;
}

function flatGroup(values, ...keys) {
  return flatten(groups(values, ...keys), keys);
}

function flatRollup(values, reduce, ...keys) {
  return flatten(rollups(values, reduce, ...keys), keys);
}

function rollup(values, reduce, ...keys) {
  return nest(values, identity_identity, reduce, keys);
}

function rollups(values, reduce, ...keys) {
  return nest(values, Array.from, reduce, keys);
}

function index(values, ...keys) {
  return nest(values, identity, unique, keys);
}

function indexes(values, ...keys) {
  return nest(values, Array.from, unique, keys);
}

function unique(values) {
  if (values.length !== 1) throw new Error("duplicate key");
  return values[0];
}

function nest(values, map, reduce, keys) {
  return (function regroup(values, i) {
    if (i >= keys.length) return reduce(values);
    const groups = new InternMap();
    const keyof = keys[i++];
    let index = -1;
    for (const value of values) {
      const key = keyof(value, ++index, values);
      const group = groups.get(key);
      if (group) group.push(value);
      else groups.set(key, [value]);
    }
    for (const [key, values] of groups) {
      groups.set(key, regroup(values, i));
    }
    return map(groups);
  })(values, 0);
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/sort.js



function sort_sort(values, ...F) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  values = Array.from(values);
  let [f] = F;
  if ((f && f.length !== 2) || F.length > 1) {
    const index = Uint32Array.from(values, (d, i) => i);
    if (F.length > 1) {
      F = F.map(f => values.map(f));
      index.sort((i, j) => {
        for (const f of F) {
          const c = sort_ascendingDefined(f[i], f[j]);
          if (c) return c;
        }
      });
    } else {
      f = values.map(f);
      index.sort((i, j) => sort_ascendingDefined(f[i], f[j]));
    }
    return permute(values, index);
  }
  return values.sort(compareDefined(f));
}

function compareDefined(compare = ascending_ascending) {
  if (compare === ascending_ascending) return sort_ascendingDefined;
  if (typeof compare !== "function") throw new TypeError("compare is not a function");
  return (a, b) => {
    const x = compare(a, b);
    if (x || x === 0) return x;
    return (compare(b, b) === 0) - (compare(a, a) === 0);
  };
}

function sort_ascendingDefined(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b)) || (a < b ? -1 : a > b ? 1 : 0);
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/quickselect.js


// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect_quickselect(array, k, left = 0, right = Infinity, compare) {
  k = Math.floor(k);
  left = Math.floor(Math.max(0, left));
  right = Math.floor(Math.min(array.length - 1, right));

  if (!(left <= k && k <= right)) return array;

  compare = compare === undefined ? sort_ascendingDefined : compareDefined(compare);

  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect_quickselect(array, k, newLeft, newRight, compare);
    }

    const t = array[k];
    let i = left;
    let j = right;

    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);

    while (i < j) {
      swap(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }

    if (compare(array[left], t) === 0) swap(array, left, j);
    else ++j, swap(array, j, right);

    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }

  return array;
}

function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/quantile.js









function quantile(values, p, valueof) {
  values = Float64Array.from(numbers(values, valueof));
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return src_min_min(values);
  if (p >= 1) return max_max(values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = max_max(quickselect_quickselect(values, i0).subarray(0, i0 + 1)),
      value1 = src_min_min(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

function quantileSorted(values, p, valueof = number) {
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

function quantileIndex(values, p, valueof = number) {
  if (isNaN(p = +p)) return;
  numbers = Float64Array.from(values, (_, i) => number(valueof(values[i], i, values)));
  if (p <= 0) return minIndex(numbers);
  if (p >= 1) return maxIndex(numbers);
  var numbers,
      index = Uint32Array.from(values, (_, i) => i),
      j = numbers.length - 1,
      i = Math.floor(j * p);
  quickselect(index, i, 0, j, (i, j) => ascendingDefined(numbers[i], numbers[j]));
  i = greatest(index.subarray(0, i + 1), (i) => numbers[i]);
  return i >= 0 ? i : -1;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/mean.js
function mean(values, valueof) {
  let count = 0;
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  }
  if (count) return sum / count;
}

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-cajas-bigotes/SisdaiCajasBigotes.vue?vue&type=script&setup=true&lang=js







/* harmony default export */ var SisdaiCajasBigotesvue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiCajasBigotes',
  props: {
    datos: {
      type: Array,
      require: true
    },
    variables: {
      type: Object,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color

        const validado = 'id' in value && 'nombre' in value && 'color' in value;
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    },
    clave_categorias: {
      type: String,
      default: 'categoria'
    },
    alineacion_eje_y: {
      type: String,
      default: 'izquierda',
      validator(value) {
        const validado = value === 'izquierda' || value === 'derecha';
        if (!validado) {
          console.error("la propiedad 'alineacion_eje_y' sólo admite los valores 'izquierda' o 'derecha'");
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_x: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_y: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    var idGrafica;
    const sisdaiCajasBigotes = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.shallowRef)();
    const {
      datos,
      clave_categorias,
      variables
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    transition_transition;
    const margenesSvg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const escalaBanda = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      escalaLineal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const grupoContenedor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      data_agrupada = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoCajasBigotes = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    function calcularEscalas(grupoVis) {
      if (!grupoVis && grupoVis.ancho === 0) return;
      escalaBanda.value = band().domain(datos.value?.map(d => d[clave_categorias.value])).range([0, grupoVis.ancho]).padding(0.5);
      escalaLineal.value = linear_linear().domain(extent(datos.value.map(d => d[variables.value.id]))).range([grupoVis.alto, 0]);
      creaEjeHorizontal(idGrafica, escalaBanda.value, props.angulo_etiquetas_eje_x);
      creaEjeVertical(idGrafica, escalaLineal.value, props.angulo_etiquetas_eje_y, props.alineacion_eje_y, grupoVis.ancho);
    }
    function creaCajasBigotes() {
      data_agrupada.value = rollup(datos.value, d => {
        let q1 = quantile(d.map(g => g[variables.value.id]).sort(ascending_ascending), 0.25);
        let median = quantile(d.map(g => g[variables.value.id]).sort(ascending_ascending), 0.5);
        let q3 = quantile(d.map(g => g[variables.value.id]).sort(ascending_ascending), 0.75);
        let interQuantileRange = q3 - q1;
        let min = q1 - 1.5 * interQuantileRange;
        let max = q3 + 1.5 * interQuantileRange;
        let puntos = d.map(g => g[variables.value.id]);
        let promedio = mean(d.map(g => g[variables.value.id]));
        max = puntos.filter(g => g <= max).sort(descending)[0];
        min = puntos.filter(g => g >= min).sort(ascending_ascending)[0];
        return {
          q1: q1,
          median: median,
          q3: q3,
          interQuantileRange: interQuantileRange,
          min: min,
          max: max,
          puntos: puntos,
          promedio: promedio
        };
      }, d => d[props.clave_categorias]);
      grupoCajasBigotes.value = grupoContenedor.value.selectAll('g.grupo-caja').data(data_agrupada.value).join(enter => {
        let grupo = enter.append('g').attr('class', 'grupo-caja').style('fill', variables.value.color).style('stroke', variables.value.color).attr('transform', d => `translate(${escalaBanda.value(d[0])} ,0)`);
        grupo.selectAll('line.vertical').data(d => [d[1]]).enter().append('line').attr('class', 'vertical').attr('x1', 0.5 * escalaBanda.value.bandwidth()).attr('x2', 0.5 * escalaBanda.value.bandwidth()).attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).transition().duration(500).attr('y1', d => escalaLineal.value(d.min)).attr('y2', d => escalaLineal.value(d.max)).style('stroke-width', '1px').style('stroke-dasharray', '5 2');
        grupo.selectAll('line.max').data(d => [d[1]]).enter().append('line').attr('class', 'max').attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).transition().duration(500).attr('y1', d => escalaLineal.value(d.max)).attr('y2', d => escalaLineal.value(d.max));
        grupo.selectAll('line.min').data(d => [d[1]]).enter().append('line').attr('class', 'min').attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).transition().duration(500).attr('y1', d => escalaLineal.value(d.min)).attr('y2', d => escalaLineal.value(d.min));
        grupo.selectAll('line.q1').data(d => [d[1]]).enter().append('line').attr('class', 'q1').attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).transition().duration(500).attr('y1', d => escalaLineal.value(d.q1)).attr('y2', d => escalaLineal.value(d.q1));
        grupo.selectAll('line.q3').data(d => [d[1]]).enter().append('line').attr('class', 'q3').attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).transition().duration(500).attr('y1', d => escalaLineal.value(d.q3)).attr('y2', d => escalaLineal.value(d.q3));
        grupo.selectAll('rect.caja').data(d => [d[1]]).enter().append('rect').attr('class', 'caja').attr('width', escalaBanda.value.bandwidth()).attr('x', 0).attr('y', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('height', 0).style('fill-opacity', 0.25).style('stroke-width', '0').transition().duration(500).attr('y', d => escalaLineal.value(d.q3)).attr('height', d => escalaLineal.value(d.q1) - escalaLineal.value(d.q3) < 0 ? 0 : escalaLineal.value(d.q1) - escalaLineal.value(d.q3));
        grupo.selectAll('line.media').data(d => [d[1]]).enter().append('line').attr('class', 'media').attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).transition().duration(500).attr('y1', d => escalaLineal.value(d.median)).attr('y2', d => escalaLineal.value(d.median));
        grupo.selectAll('circle.promedio').data(d => [d[1]]).enter().append('circle').attr('class', 'promedio').attr('r', 0).attr('cx', escalaBanda.value.bandwidth() * 0.5).attr('cy', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).style('stroke', '#fff').transition().duration(500).attr('cy', d => escalaLineal.value(d.promedio)).attr('r', 4);
        grupo.selectAll('circle.atipicos').data(d => d[1].puntos.filter(dd => dd < d[1].min || d[1].max < dd)).enter().append('circle').attr('class', 'atipicos').attr('r', 0).attr('cx', escalaBanda.value.bandwidth() * 0.5).attr('cy', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).style('stroke-opacity', '.4').style('stroke-width', '1px').style('fill-opacity', 0.25).transition().duration(500).attr('cy', d => escalaLineal.value(d)).attr('r', 2);
      }, update => {
        let grupo = update.call(update1 => update1.transition().duration(500).style('fill', variables.value.color).style('stroke', variables.value.color).attr('transform', d => `translate(${escalaBanda.value(d[0])} ,0)`));
        grupo.selectAll('line.vertical').data(d => [d[1]]).transition().duration(500).attr('x1', 0.5 * escalaBanda.value.bandwidth()).attr('y1', d => escalaLineal.value(d.min)).attr('x2', 0.5 * escalaBanda.value.bandwidth()).attr('y2', d => escalaLineal.value(d.max));
        grupo.selectAll('line.max').data(d => [d[1]]).transition().duration(500).attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', d => escalaLineal.value(d.max)).attr('y2', d => escalaLineal.value(d.max));
        grupo.selectAll('line.min').data(d => [d[1]]).transition().duration(500).attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', d => escalaLineal.value(d.min)).attr('y2', d => escalaLineal.value(d.min));
        grupo.selectAll('line.q1').data(d => [d[1]]).transition().duration(500).attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', d => escalaLineal.value(d.q1)).attr('y2', d => escalaLineal.value(d.q1));
        grupo.selectAll('line.q3').data(d => [d[1]]).transition().duration(500).attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', d => escalaLineal.value(d.q3)).attr('y2', d => escalaLineal.value(d.q3));
        grupo.selectAll('rect.caja').data(d => [d[1]]).transition().duration(500).attr('y', d => escalaLineal.value(d.q3)).attr('height', d => escalaLineal.value(d.q1) - escalaLineal.value(d.q3)).attr('width', escalaBanda.value.bandwidth());
        grupo.selectAll('line.media').data(d => [d[1]]).transition().duration(500).attr('x1', 0).attr('x2', escalaBanda.value.bandwidth()).attr('y1', d => escalaLineal.value(d.median)).attr('y2', d => escalaLineal.value(d.median));
        grupo.selectAll('circle.promedio').data(d => [d[1]]).transition().duration(500).attr('cx', escalaBanda.value.bandwidth() * 0.5).attr('cy', d => escalaLineal.value(d.promedio)).attr('r', 4);
        grupo.selectAll('circle.atipicos').data(d => d[1].puntos.filter(dd => dd < d[1].min || d[1].max < dd)).join(atipicos_enter => {
          atipicos_enter.append('circle').attr('class', 'atipicos').attr('r', 0).attr('cx', escalaBanda.value.bandwidth() * 0.5).attr('cy', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).style('stroke-opacity', '.4').style('stroke-width', '1px').style('fill-opacity', 0.25).transition().duration(500).attr('cy', d => escalaLineal.value(d)).attr('r', 2);
        }, atipicos_update => {
          atipicos_update.transition().duration(500).attr('cy', d => escalaLineal.value(d)).attr('r', 2).attr('cx', escalaBanda.value.bandwidth() * 0.5);
        }, atipicos_exit => {
          atipicos_exit.remove();
        });
      }, exit => {
        exit.remove();
      });
    }
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiCajasBigotes.value);
      grupoContenedor.value = src_select('#' + idGrafica + ' svg g.contenedor-cajas-bigotes');
      margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes;
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).margenes, nv => margenesSvg.value = nv);
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
      creaCajasBigotes();
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).grupoVis, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
          creaCajasBigotes();
        }
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(datos, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaCajasBigotes();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(variables, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaCajasBigotes();
      });
    });
    expose({
      escalaBanda,
      escalaLineal
    });
    return {
      __sfc: true,
      idGrafica,
      props,
      sisdaiCajasBigotes,
      datos,
      clave_categorias,
      variables,
      margenesSvg,
      escalaBanda,
      escalaLineal,
      grupoContenedor,
      data_agrupada,
      grupoCajasBigotes,
      calcularEscalas,
      creaCajasBigotes
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-cajas-bigotes/SisdaiCajasBigotes.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_cajas_bigotes_SisdaiCajasBigotesvue_type_script_setup_true_lang_js = (SisdaiCajasBigotesvue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-cajas-bigotes/SisdaiCajasBigotes.vue





/* normalize component */
;
var SisdaiCajasBigotes_component = normalizeComponent(
  sisdai_cajas_bigotes_SisdaiCajasBigotesvue_type_script_setup_true_lang_js,
  SisdaiCajasBigotesvue_type_template_id_4f4ac904_render,
  SisdaiCajasBigotesvue_type_template_id_4f4ac904_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiCajasBigotes = (SisdaiCajasBigotes_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-cajas-bigotes/index.js

const sisdai_cajas_bigotes_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiCajasBigotes', SisdaiCajasBigotes);
  }
};
/* harmony default export */ var sisdai_cajas_bigotes = (sisdai_cajas_bigotes_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-checks/SisdaiChecks.vue?vue&type=template&id=029088b9
var SisdaiChecksvue_type_template_id_029088b9_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', _vm._l(_vm.variables, function (variable) {
    return _c('span', {
      key: variable.id,
      staticClass: "controlador-vis"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _setup.variables_checkeadas,
        expression: "variables_checkeadas"
      }],
      attrs: {
        "id": variable.id,
        "type": "checkbox",
        "disabled": _setup.variables_checkeadas.length === 1 && variable.id == _setup.variables_checkeadas[0]
      },
      domProps: {
        "value": variable.id,
        "checked": Array.isArray(_setup.variables_checkeadas) ? _vm._i(_setup.variables_checkeadas, variable.id) > -1 : _setup.variables_checkeadas
      },
      on: {
        "change": function ($event) {
          var $$a = _setup.variables_checkeadas,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;
          if (Array.isArray($$a)) {
            var $$v = variable.id,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_setup.variables_checkeadas = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_setup.variables_checkeadas = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _setup.variables_checkeadas = $$c;
          }
        }
      }
    }), _c('label', {
      attrs: {
        "for": variable.id
      }
    }, [_c('span', {
      staticClass: "figura-variable",
      style: {
        background: variable.color
      }
    }), _c('span', {
      staticClass: "nombre-variable"
    }, [_vm._v(" " + _vm._s(variable.nombre) + " ")])])]);
  }), 0);
};
var SisdaiChecksvue_type_template_id_029088b9_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-checks/SisdaiChecks.vue?vue&type=script&setup=true&lang=js

/* harmony default export */ var SisdaiChecksvue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiChecks',
  props: {
    variables: {
      type: Array,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color
        const validado = value.some(({
          id,
          nombre,
          color
        }) => id !== undefined || nombre !== undefined || color !== undefined);
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    const variables_checkeadas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)([...props.variables].map(d => d.id));
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => props.variables, nv => {
      variables_checkeadas.value = [...nv].map(d => d.id);
    });
    const variables_activas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      let vars_activas = props.variables.filter(d => variables_checkeadas.value.includes(d.id));
      if (vars_activas.length === 0) {
        vars_activas = [...props.variables];
      }
      return vars_activas;
    });
    expose({
      variables_activas
    });
    return {
      __sfc: true,
      props,
      variables_checkeadas,
      variables_activas
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-checks/SisdaiChecks.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_checks_SisdaiChecksvue_type_script_setup_true_lang_js = (SisdaiChecksvue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-checks/SisdaiChecks.vue





/* normalize component */
;
var SisdaiChecks_component = normalizeComponent(
  sisdai_checks_SisdaiChecksvue_type_script_setup_true_lang_js,
  SisdaiChecksvue_type_template_id_029088b9_render,
  SisdaiChecksvue_type_template_id_029088b9_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiChecks = (SisdaiChecks_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-checks/index.js

const sisdai_checks_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiChecks', SisdaiChecks);
  }
};
/* harmony default export */ var sisdai_checks = (sisdai_checks_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-dona/SisdaiDona.vue?vue&type=template&id=17a6ef8c
var SisdaiDonavue_type_template_id_17a6ef8c_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('g', {
    ref: "sisdaiDona",
    staticClass: "contenedor-dona",
    attrs: {
      "transform": `translate(${_setup.margenesSvg.izquierda ? _setup.margenesSvg.izquierda + _setup.ancho * 0.5 : _setup.ancho * 0.5},${_setup.margenesSvg.arriba ? _setup.margenesSvg.arriba + _setup.alto * 0.5 : _setup.alto * 0.5})`
    }
  });
};
var SisdaiDonavue_type_template_id_17a6ef8c_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/descending.js
/* harmony default export */ function src_descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/identity.js
/* harmony default export */ function d3_shape_src_identity(d) {
  return d;
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/math.js
const abs = Math.abs;
const atan2 = Math.atan2;
const cos = Math.cos;
const math_max = Math.max;
const math_min = Math.min;
const sin = Math.sin;
const sqrt = Math.sqrt;

const math_epsilon = 1e-12;
const math_pi = Math.PI;
const halfPi = math_pi / 2;
const math_tau = 2 * math_pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? math_pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/pie.js






/* harmony default export */ function pie() {
  var value = d3_shape_src_identity,
      sortValues = src_descending,
      sort = null,
      startAngle = d3_shape_src_constant(0),
      endAngle = d3_shape_src_constant(math_tau),
      padAngle = d3_shape_src_constant(0);

  function pie(data) {
    var i,
        n = (data = d3_shape_src_array(data)).length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(math_tau, Math.max(-math_tau, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : d3_shape_src_constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : d3_shape_src_constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : d3_shape_src_constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : d3_shape_src_constant(+_), pie) : padAngle;
  };

  return pie;
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/arc.js




function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < math_epsilon) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt(math_max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

/* harmony default export */ function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = d3_shape_src_constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null,
      path = withPath(arc);

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > math_epsilon)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > math_tau - math_epsilon) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > math_epsilon) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > math_epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
          rc = math_min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > math_epsilon) {
        var p0 = asin(rp / r0 * sin(ap)),
            p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > math_epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > math_epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos(a01),
          y01 = r1 * sin(a01),
          x10 = r0 * cos(a10),
          y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > math_epsilon) {
        var x11 = r1 * cos(a11),
            y11 = r1 * sin(a11),
            x00 = r0 * cos(a00),
            y00 = r0 * sin(a00),
            oc;

        // Restrict the corner radius according to the sector angle. If this
        // intersection fails, it’s probably because the arc is too small, so
        // disable the corner radius entirely.
        if (da < math_pi) {
          if (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10)) {
            var ax = x01 - oc[0],
                ay = y01 - oc[1],
                bx = x11 - oc[0],
                by = y11 - oc[1],
                kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
                lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = math_min(rc, (r0 - lc) / (kc - 1));
            rc1 = math_min(rc, (r1 - lc) / (kc + 1));
          } else {
            rc0 = rc1 = 0;
          }
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > math_epsilon)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > math_epsilon) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > math_epsilon) || !(da0 > math_epsilon)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > math_epsilon) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - math_pi / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : d3_shape_src_constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : d3_shape_src_constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : d3_shape_src_constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : d3_shape_src_constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : d3_shape_src_constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : d3_shape_src_constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : d3_shape_src_constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-dona/SisdaiDona.vue?vue&type=script&setup=true&lang=js







/* harmony default export */ var SisdaiDonavue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiDona',
  props: {
    datos: {
      type: Array,
      require: true
    },
    clave_categoria: {
      type: String,
      default: 'categoria'
    },
    clave_cantidad: {
      type: String,
      default: 'cantidad'
    },
    variables: {
      type: Array,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color
        const validado = value.some(({
          id,
          nombre,
          color
        }) => id !== undefined || nombre !== undefined || color !== undefined);
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    },
    radio_interno: {
      type: Number,
      default: 0.18
    },
    radio_externo: {
      type: Number,
      default: 0.32
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    const alto = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    const ancho = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    var idGrafica;
    const sisdaiDona = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.shallowRef)();
    const datos_hover = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const {
      datos,
      clave_cantidad,
      variables,
      clave_categoria
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    transition_transition;
    const margenesSvg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const pay = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(pie()),
      arco = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(arc()),
      arco_txt = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(arc()),
      data_pay = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const grupoContenedor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoDona = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    function calcularEscalas(grupoVis) {
      alto.value = grupoVis.alto;
      ancho.value = grupoVis.ancho;
      let limites = src_min_min([ancho.value, alto.value]);
      pay.value.sort(null).value(d => d[clave_cantidad.value]);
      arco.value.innerRadius(props.radio_interno * limites).outerRadius(props.radio_externo * limites);
      arco_txt.value.innerRadius(props.radio_externo * limites + 4).outerRadius(props.radio_externo * limites + 4);
      data_pay.value = pay.value(datos.value.filter(d => variables.value.map(dd => dd.id).includes(d[clave_categoria.value])));
    }
    function creaDona() {
      grupoDona.value = grupoContenedor.value.selectAll('g.segmento').data(data_pay.value);
      grupoDona.value.join(enter => {
        var grupo = enter.append('g').attr('class', 'segmento').attr('fill', d => {
          return variables.value.filter(dd => dd.id === d.data[clave_categoria.value])[0].color;
        });
        grupo.selectAll('path.path-segmento').data(d => [d]).enter().append('path').attr('class', 'path-segmento').attr('d', arco.value);
        grupo.selectAll('text.vis-valores-ejes').data(d => [d]).enter().append('text').attr('class', 'vis-valores-ejes').text(d => Math.round(1000 * d.data[clave_cantidad.value] / sum_sum(data_pay.value.map(d => d.data[clave_cantidad.value]))) / 10 + '%').style('text-anchor', d => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? 'start' : 'end';
        }).style('dominant-baseline', d => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < 0.5 * Math.PI || midangle > 1.5 * Math.PI ? 'auto' : 'hanging';
        }).style('font-size', '16px').style('font-weight', '500').attr('transform', d => 'translate(' + arco_txt.value.centroid(d) + ')').style('font-weight', '500');
      }, update => {
        let grupo = update.call(update1 => {
          update1.transition().duration(500).attr('fill', d => {
            return variables.value.filter(dd => dd.id === d.data[clave_categoria.value])[0].color;
          });
        });
        grupo.selectAll('path.path-segmento').data(d => [d]).attr('d', arco.value);
        grupo.selectAll('text.vis-valores-ejes').data(d => [d]).text(d => Math.round(1000 * d.data[clave_cantidad.value] / sum_sum(data_pay.value.map(d => d.data[clave_cantidad.value]))) / 10 + '%').style('font-size', '16px').style('font-weight', '500').style('text-anchor', d => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? 'start' : 'end';
        }).style('dominant-baseline', d => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < 0.5 * Math.PI || midangle > 1.5 * Math.PI ? 'auto' : 'hanging';
        }).attr('transform', d => 'translate(' + arco_txt.value.centroid(d) + ')').attr('class', 'vis-valores-ejes');
      }, exit => {
        exit.remove();
      });
    }
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiDona.value);
      grupoContenedor.value = src_select('#' + idGrafica + ' svg g.contenedor-dona');
      margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes;
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).margenes, nv => margenesSvg.value = nv);
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
      creaDona();
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).grupoVis, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
          creaDona();
        }
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(datos, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaDona();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(variables, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaDona();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).posicion_cursor, nv => {
        let x = nv.x - 0.5 * usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho;
        let y = nv.y - 0.5 * usarRegistroGraficas().grafica(idGrafica).grupoVis.alto;
        let ang = Math.atan(y / x) + 0.5 * Math.PI;
        let angulo;
        if (x >= 0) {
          angulo = ang;
        } else {
          angulo = ang + Math.PI;
        }
        grupoDona.value.style('fill-opacity', '.2');
        var segmento_over = grupoDona.value.filter(d => d.startAngle <= angulo && angulo < d.endAngle).style('fill-opacity', 1);
        datos_hover.value = {
          porcentaje: Math.round(1000 * segmento_over.data()[0].value / sum_sum(data_pay.value.map(d => d.value))) / 10,
          ...segmento_over.data()[0].data
        };
      }, {
        deep: true
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).globo_visible, nv => {
        if (!nv) {
          grupoDona.value.style('fill-opacity', '1');
        }
      });
    });
    expose({
      datos_hover
    });
    return {
      __sfc: true,
      props,
      alto,
      ancho,
      idGrafica,
      sisdaiDona,
      datos_hover,
      datos,
      clave_cantidad,
      variables,
      clave_categoria,
      margenesSvg,
      pay,
      arco,
      arco_txt,
      data_pay,
      grupoContenedor,
      grupoDona,
      calcularEscalas,
      creaDona
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-dona/SisdaiDona.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_dona_SisdaiDonavue_type_script_setup_true_lang_js = (SisdaiDonavue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-dona/SisdaiDona.vue





/* normalize component */
;
var SisdaiDona_component = normalizeComponent(
  sisdai_dona_SisdaiDonavue_type_script_setup_true_lang_js,
  SisdaiDonavue_type_template_id_17a6ef8c_render,
  SisdaiDonavue_type_template_id_17a6ef8c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiDona = (SisdaiDona_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-dona/index.js

const sisdai_dona_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiDona', SisdaiDona);
  }
};
/* harmony default export */ var sisdai_dona = (sisdai_dona_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-graficas/SisdaiGraficas.vue?vue&type=template&id=76344e96
var SisdaiGraficasvue_type_template_id_76344e96_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "contenedor-vis contenedor-sisdai-graficas",
    staticStyle: {
      "--contenedor-vis-alto-menus": "auto"
    },
    style: {
      '--contenedor-vis-alto-maximo': 'auto'
    },
    attrs: {
      "sisdai-grafica": _vm.id,
      "id": _vm.id
    }
  }, [_c('div', {
    staticClass: "contenedor-vis-paneles",
    class: _setup.panelesEnUso()
  }, [_c('div', {
    staticClass: "panel-encabezado-vis"
  }, [_vm._t("panel-encabezado-vis")], 2), _c('div', {
    staticClass: "panel-izquierda-vis"
  }, [_vm._t("panel-izquierda-vis")], 2), _c('div', {
    ref: "contenedorSisdaiGraficas",
    staticClass: "contenido-vis"
  }, [_c('div', {
    staticClass: "contenedor-svg-ejes-tooltip",
    style: {
      height: !_setup.grafica().alto ? '100%' : `${_setup.grafica().alto + _setup.espacio_eje_x}px`
    }
  }, [_vm._t("globo-informacion"), _c('div', {
    staticClass: "contenedor-titulo-eje-y",
    style: {
      height: !_setup.grafica().alto ? '100%' : _setup.grafica().alto + 'px'
    }
  }, [_c('div', {
    staticClass: "titulo-eje-y vis-titulo-ejes",
    staticStyle: {
      "padding": "0 0 5px 0"
    },
    style: {
      width: !_setup.grafica().alto ? '100%' : _setup.grafica().alto + 'px',
      transform: `rotate(-90deg)translateX(calc(-100% - ${0.5 * (_setup.margenes.arriba - _setup.margenes.abajo)}px))`
    },
    domProps: {
      "innerHTML": _vm._s(_vm.titulo_eje_y)
    }
  })]), _c('figure', {
    style: {
      left: _setup.espacio_eje_y + 'px'
    }
  }, [_c('svg', {
    staticClass: "svg-vis",
    attrs: {
      "width": _setup.grafica().ancho,
      "height": _setup.grafica().alto
    }
  }, [_c('g', {
    staticClass: "grupo-fondo",
    attrs: {
      "transform": `translate(${_setup.margenes.izquierda}, ${_setup.margenes.arriba})`
    }
  }), _c('g', {
    staticClass: "eje-x-arriba"
  }), _c('g', {
    staticClass: "eje-x-abajo",
    attrs: {
      "transform": `translate(${_setup.margenes.izquierda}, ${_setup.grafica().alto - _setup.margenes.abajo})`
    }
  }), _c('g', {
    staticClass: "eje-y-izquierda",
    attrs: {
      "transform": `translate(${_setup.margenes.izquierda}, ${+_setup.margenes.arriba})`
    }
  }), _c('g', {
    staticClass: "eje-y-derecha",
    attrs: {
      "transform": `translate(${_setup.grafica().ancho - _setup.margenes.derecha}, ${+_setup.margenes.arriba})`
    }
  }), _vm._t("default"), _c('g', {
    staticClass: "grupo-frente",
    attrs: {
      "transform": `translate(${_setup.margenes.izquierda}, ${_setup.margenes.arriba})`
    }
  })], 2)]), _c('div', {
    staticClass: "contenedor-titulo-eje-x"
  }, [_c('div', {
    staticClass: "titulo-eje-x vis-titulo-ejes",
    domProps: {
      "innerHTML": _vm._s(_vm.titulo_eje_x)
    }
  })])], 2)]), _c('div', {
    staticClass: "panel-derecha-vis"
  }, [_vm._t("panel-derecha-vis")], 2), _c('div', {
    staticClass: "panel-pie-vis"
  }, [_vm._t("panel-pie-vis")], 2)]), _c(_setup.ContenedorVisAtribuciones)], 1);
};
var SisdaiGraficasvue_type_template_id_76344e96_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/internos/ContenedorVisAtribuciones.vue?vue&type=template&id=067256ac
var ContenedorVisAtribucionesvue_type_template_id_067256ac_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm._m(0);
};
var ContenedorVisAtribucionesvue_type_template_id_067256ac_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "contenedor-vis-atribuciones borde-t borde-color-3"
  }, [_c('a', {
    staticClass: "logo-conacyt atribucion-conahcyt",
    attrs: {
      "href": "https://conahcyt.mx/",
      "target": "_blank"
    }
  }, [_c('img', {
    staticClass: "invertir",
    attrs: {
      "src": "https://conahcyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg",
      "alt": "Conahcyt"
    }
  })]), _c('a', {
    staticClass: "atribucion-sisdai",
    attrs: {
      "href": "https://sisdai.conahcyt.mx/",
      "target": "_blank",
      "rel": "noopener noreferrer"
    }
  }, [_vm._v(" Sisdai ")])]);
}];

;// CONCATENATED MODULE: ./src/componentes/internos/ContenedorVisAtribuciones.vue?vue&type=template&id=067256ac

;// CONCATENATED MODULE: ./src/componentes/internos/ContenedorVisAtribuciones.vue

var script = {}


/* normalize component */
;
var ContenedorVisAtribuciones_component = normalizeComponent(
  script,
  ContenedorVisAtribucionesvue_type_template_id_067256ac_render,
  ContenedorVisAtribucionesvue_type_template_id_067256ac_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ContenedorVisAtribuciones = (ContenedorVisAtribuciones_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-graficas/SisdaiGraficas.vue?vue&type=script&setup=true&lang=js






/* harmony default export */ var SisdaiGraficasvue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiGraficas',
  props: {
    id: {
      type: String,
      default: () => idAleatorio()
    },
    margenes: {
      type: Object,
      default: () => margenes,
      validator(objeto) {
        // Debe tener las claves arriba, abajo, derecha e izquierda
        const validado = 'arriba' in objeto && 'abajo' in objeto && 'derecha' in objeto && 'izquierda' in objeto;
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones', objeto);
        }
        return validado;
      }
    },
    titulo_eje_y: {
      type: String
    },
    titulo_eje_x: {
      type: String
    },
    ancho: {
      type: Number
    },
    alto: {
      type: Number
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    const ancho_grafica = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const alto_grafica = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const slots = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.useSlots)();
    const posicion_cursor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({
      x: 0,
      y: 0
    });
    const posicion_globo_info = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({
      x: 0,
      y: 0
    });
    usarRegistroGraficas().registrarGrafica(props.id);
    const grafica = () => {
      return usarRegistroGraficas().grafica(props.id);
    };
    const {
      margenes
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    grafica().margenes = margenes.value;
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(margenes, nv => {
      grafica().margenes = nv;
    });
    const contenedorSisdaiGraficas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    const espacio_eje_y = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0),
      espacio_eje_x = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    const grupoFondo = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const grupoFrente = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      obteniendoDimensiones();
      grupoFondo.value = src_select(`#${props.id}  g.grupo-fondo`);
      grupoFrente.value = src_select(`#${props.id}  g.grupo-frente`);
      window.addEventListener('resize', obteniendoDimensiones);
      if ('globo-informacion' in slots) {
        siHayGlobo();
      }
    });
    function obteniendoDimensiones() {
      espacio_eje_y.value = document.querySelector(`#${props.id}  .titulo-eje-y`).clientHeight;
      espacio_eje_x.value = document.querySelector(`#${props.id}  .titulo-eje-x`).clientHeight;
      grafica().ancho = props.ancho ? props.ancho : contenedorSisdaiGraficas.value.clientWidth - espacio_eje_y.value;
      grafica().alto = props.alto ? props.alto : altoVis;
      ancho_grafica.value = props.ancho ? props.ancho : contenedorSisdaiGraficas.value.clientWidth - espacio_eje_y.value;
      alto_grafica.value = props.alto ? props.alto : altoVis;
    }
    expose({
      ancho_grafica,
      alto_grafica,
      grafica,
      grupoFondo,
      grupoFrente
    });
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onUnmounted)(() => {
      usarRegistroGraficas().borrarGrafica(props.id);
      window.removeEventListener('resize', obteniendoDimensiones);
    });
    const paneles = ['encabezado', 'izquierda', 'derecha', 'pie'];
    function siHayGlobo() {
      let ancho_globo = src_select(`#${props.id} .contenedor-svg-ejes-tooltip .globo-informacion`).node().clientWidth;
      src_select(`#${props.id} svg.svg-vis`).on('mousemove', e => {
        posicion_cursor.value.x = e.layerX;
        posicion_cursor.value.y = e.layerY;
        posicion_globo_info.value.top = e.layerY;
        grafica().posicion_cursor = posicion_cursor.value;
        src_select(`#${props.id} .contenedor-svg-ejes-tooltip .globo-informacion`).style('left', (e.layerX > 0.5 * (grafica().ancho + margenes.value.izquierda + margenes.value.derecha) ? e.layerX - ancho_globo + espacio_eje_y.value - 5 : e.layerX + espacio_eje_y.value + 5) + 'px').style('top', e.layerY + 15 + 'px').classed('no-visible', false);
        grafica().globo_visible = true;
      }).on('click', e => {
        posicion_cursor.value.x = e.layerX;
        posicion_cursor.value.y = e.layerY;
        posicion_globo_info.value.top = e.layerY;
        grafica().posicion_cursor = posicion_cursor.value;
        src_select(`#${props.id} .contenedor-svg-ejes-tooltip .globo-informacion`).style('left', (e.layerX > 0.5 * (grafica().ancho + margenes.value.izquierda + margenes.value.derecha) ? e.layerX - ancho_globo + espacio_eje_y.value - 5 : e.layerX + espacio_eje_y.value + 5) + 'px').style('top', e.layerY + 15 + 'px').classed('no-visible', false);
        grafica().globo_visible = true;
      }).on('mouseout', () => {
        grafica().globo_visible = false;
        src_select(`#${props.id} .contenedor-svg-ejes-tooltip .globo-informacion`).classed('no-visible', true);
      });
    }
    function panelesEnUso() {
      // return !!slots[name]
      return paneles.filter(panel => !!slots[`panel-${panel}-vis`]).map(panel => `con-panel-${panel}-vis`);
    }
    return {
      __sfc: true,
      props,
      ancho_grafica,
      alto_grafica,
      slots,
      posicion_cursor,
      posicion_globo_info,
      grafica,
      margenes,
      contenedorSisdaiGraficas,
      espacio_eje_y,
      espacio_eje_x,
      grupoFondo,
      grupoFrente,
      obteniendoDimensiones,
      paneles,
      siHayGlobo,
      panelesEnUso,
      ContenedorVisAtribuciones: ContenedorVisAtribuciones
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-graficas/SisdaiGraficas.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_graficas_SisdaiGraficasvue_type_script_setup_true_lang_js = (SisdaiGraficasvue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-graficas/SisdaiGraficas.vue





/* normalize component */
;
var SisdaiGraficas_component = normalizeComponent(
  sisdai_graficas_SisdaiGraficasvue_type_script_setup_true_lang_js,
  SisdaiGraficasvue_type_template_id_76344e96_render,
  SisdaiGraficasvue_type_template_id_76344e96_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiGraficas = (SisdaiGraficas_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-graficas/index.js

const sisdai_graficas_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiGraficas', SisdaiGraficas);
  }
};
/* harmony default export */ var sisdai_graficas = (sisdai_graficas_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-graficas-globo-info/SisdaiGraficasGloboInfo.vue?vue&type=template&id=23ffba04
var SisdaiGraficasGloboInfovue_type_template_id_23ffba04_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    ref: "contenedorGlobo",
    staticClass: "globo-informacion no-visible",
    style: {
      width: _setup.props.ancho + 'px',
      position: 'absolute'
    },
    attrs: {
      "role": "tooltip"
    }
  }, [_c('div', {
    staticClass: "globo-informacion-cuerpo"
  }, [_vm._t("default")], 2), _vm._m(0)]);
};
var SisdaiGraficasGloboInfovue_type_template_id_23ffba04_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('button', {
    staticClass: "globo-informacion-cerrar"
  }, [_c('span', {
    staticClass: "pictograma-cerrar",
    attrs: {
      "aria-hidden": "true"
    }
  }), _c('span', {
    staticClass: "a11y-solo-lectura"
  }, [_vm._v("Cerrar.")])]);
}];

;// CONCATENATED MODULE: ./src/componentes/sisdai-graficas-globo-info/SisdaiGraficasGloboInfo.vue?vue&type=template&id=23ffba04

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-graficas-globo-info/SisdaiGraficasGloboInfo.vue?vue&type=script&setup=true&lang=js

/* harmony default export */ var SisdaiGraficasGloboInfovue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiGraficasGloboInfo',
  props: {
    ancho: {
      type: Number,
      default: 240
    }
  },
  setup(__props) {
    const props = __props;
    const contenedorGlobo = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    return {
      __sfc: true,
      props,
      contenedorGlobo
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-graficas-globo-info/SisdaiGraficasGloboInfo.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_graficas_globo_info_SisdaiGraficasGloboInfovue_type_script_setup_true_lang_js = (SisdaiGraficasGloboInfovue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-graficas-globo-info/SisdaiGraficasGloboInfo.vue





/* normalize component */
;
var SisdaiGraficasGloboInfo_component = normalizeComponent(
  sisdai_graficas_globo_info_SisdaiGraficasGloboInfovue_type_script_setup_true_lang_js,
  SisdaiGraficasGloboInfovue_type_template_id_23ffba04_render,
  SisdaiGraficasGloboInfovue_type_template_id_23ffba04_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiGraficasGloboInfo = (SisdaiGraficasGloboInfo_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-graficas-globo-info/index.js

const sisdai_graficas_globo_info_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiGraficasGloboInfo', SisdaiGraficasGloboInfo);
  }
};
/* harmony default export */ var sisdai_graficas_globo_info = (sisdai_graficas_globo_info_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-nomenclatura/SisdaiNomenclatura.vue?vue&type=template&id=25c10340
var SisdaiNomenclaturavue_type_template_id_25c10340_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('div', {
    staticClass: "contenedor-nomenclatura"
  }, _vm._l(_vm.variables, function (variable) {
    return _c('p', {
      key: variable.id,
      staticClass: "vis-nomenclatura"
    }, [_c('span', {
      staticClass: "figura-variable",
      style: {
        background: variable.color
      }
    }), _c('span', {
      attrs: {
        "for": variable.id
      }
    }, [_vm._v(_vm._s(variable.nombre))])]);
  }), 0);
};
var SisdaiNomenclaturavue_type_template_id_25c10340_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-nomenclatura/SisdaiNomenclatura.vue?vue&type=script&setup=true&lang=js

/* harmony default export */ var SisdaiNomenclaturavue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiNomenclatura',
  props: {
    variables: {
      type: Array,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color
        const validado = value.some(({
          id,
          nombre,
          color
        }) => id !== undefined || nombre !== undefined || color !== undefined);
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    const variables_checkeadas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)([...props.variables].map(d => d.id));
    const variables_activas = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => props.variables.filter(d => variables_checkeadas.value.includes(d.id)));
    expose({
      variables_activas
    });
    return {
      __sfc: true,
      props,
      variables_checkeadas,
      variables_activas
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-nomenclatura/SisdaiNomenclatura.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_nomenclatura_SisdaiNomenclaturavue_type_script_setup_true_lang_js = (SisdaiNomenclaturavue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-nomenclatura/SisdaiNomenclatura.vue?vue&type=style&index=0&id=25c10340&prod&lang=css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/componentes/sisdai-nomenclatura/SisdaiNomenclatura.vue?vue&type=style&index=0&id=25c10340&prod&lang=css

;// CONCATENATED MODULE: ./src/componentes/sisdai-nomenclatura/SisdaiNomenclatura.vue



;


/* normalize component */

var SisdaiNomenclatura_component = normalizeComponent(
  sisdai_nomenclatura_SisdaiNomenclaturavue_type_script_setup_true_lang_js,
  SisdaiNomenclaturavue_type_template_id_25c10340_render,
  SisdaiNomenclaturavue_type_template_id_25c10340_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiNomenclatura = (SisdaiNomenclatura_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-nomenclatura/index.js

const sisdai_nomenclatura_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiNomenclatura', SisdaiNomenclatura);
  }
};
/* harmony default export */ var sisdai_nomenclatura = (sisdai_nomenclatura_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-series-tiempo/SisdaiSeriesTiempo.vue?vue&type=template&id=5e0f3c56
var SisdaiSeriesTiempovue_type_template_id_5e0f3c56_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('g', {
    ref: "sisdaiSeriesTiempo",
    staticClass: "contenedor-series",
    attrs: {
      "transform": `translate(${_setup.margenesSvg?.izquierda || 0},${_setup.margenesSvg?.arriba || 0})`
    }
  });
};
var SisdaiSeriesTiempovue_type_template_id_5e0f3c56_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-series-tiempo/SisdaiSeriesTiempo.vue?vue&type=script&setup=true&lang=js









/* harmony default export */ var SisdaiSeriesTiempovue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiSeriesTiempo',
  props: {
    datos: {
      type: Array,
      require: true
    },
    variables: {
      type: Array,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color
        const validado = value.some(({
          id,
          nombre,
          color
        }) => id !== undefined || nombre !== undefined || color !== undefined);
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    },
    clave_fecha: {
      type: String,
      default: 'fecha'
    },
    alineacion_eje_y: {
      type: String,
      default: 'izquierda',
      validator(value) {
        const validado = value === 'izquierda' || value === 'derecha';
        if (!validado) {
          console.error("la propiedad 'alineacion_eje_y' sólo admite los valores 'izquierda' o 'derecha'");
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_x: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_y: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    formato_temporal: {
      default: '%d-%m-%Y',
      type: String
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    var idGrafica;
    const datos_hover = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const sisdaiSeriesTiempo = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.shallowRef)();
    const {
      datos,
      clave_fecha,
      variables
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    transition_transition;
    const margenesSvg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const conversionTemporal = timeParse(props.formato_temporal);
    const escalaTemporal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      escalaLineal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const grupoContenedor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoSeries = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const circulo_marcador = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    function calcularEscalas(grupoVis) {
      if (!grupoVis && grupoVis.ancho === 0) return;
      escalaTemporal.value = time().domain(extent(datos.value?.map(d => d.la_fecha))).range([0, grupoVis.ancho]);
      escalaLineal.value = linear_linear().domain([
      //min(datos.value?.map((d) => min(variables.value.map((dd) => d[dd.id])))),
      0, max_max(datos.value?.map(d => max_max(variables.value.map(dd => d[dd.id]))))]).range([grupoVis.alto, 0]);
      creaEjeHorizontal(idGrafica, escalaTemporal.value, props.angulo_etiquetas_eje_x);
      creaEjeVertical(idGrafica, escalaLineal.value, props.angulo_etiquetas_eje_y, props.alineacion_eje_y, grupoVis.ancho);
    }
    function creaSeries() {
      datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
      grupoSeries.value = grupoContenedor.value.selectAll('g.serie-temporal');
      grupoSeries.value.data(variables.value).join(enter => {
        let grupo = enter.append('g').attr('class', 'serie-temporal').style('fill', 'none').style('stroke', d => d.color).style('stroke-width', '1px');
        grupo.selectAll('path.linea').data(d => [{
          ...d,
          datos: datos.value
        }]).enter().append('path').attr('class', 'linea').attr('d', dd => line().x(d => escalaTemporal.value(d.la_fecha)).y(d => escalaLineal.value(d[dd.id]))(dd.datos));
        grupo.selectAll('circle.puntos').data(d => datos.value.map(datum => ({
          la_fecha: datum.la_fecha,
          valor: datum[d.id],
          ...d
        }))).enter().append('circle').attr('class', 'puntos').attr('r', 0).attr('cx', d => escalaTemporal.value(d.la_fecha)).attr('cy', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto).style('stroke', '#fff').style('fill', d => d.color);
      }, update => {
        let grupo = update.call(update1 => update1.transition().duration(500).style('fill', 'none').style('stroke', d => d.color).style('stroke-width', '1px'));
        grupo.selectAll('path.linea').data(d => [{
          ...d,
          datos: datos.value
        }]).transition().duration(500).attr('d', dd => line().x(d => escalaTemporal.value(d.la_fecha)).y(d => escalaLineal.value(d[dd.id]))(dd.datos)).style('stroke', d => d.color);
        grupo.selectAll('circle.puntos').data(d => datos.value.map(datum => ({
          la_fecha: datum.la_fecha,
          valor: datum[d.id],
          ...d
        }))).transition().duration(500).attr('r', variables.value.length > 1 ? 0 : 4).attr('cx', d => escalaTemporal.value(d.la_fecha)).attr('cy', d => escalaLineal.value(d.valor)).style('stroke', '#fff').style('fill', d => d.color);
      },
      // no update function
      exit => {
        exit.remove();
      });
    }
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiSeriesTiempo.value);
      grupoContenedor.value = src_select('#' + idGrafica + ' svg g.contenedor-series');
      circulo_marcador.value = grupoContenedor.value.append('circle').style('fill-opacity', 0).attr('r', 5);
      margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes;
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).margenes, nv => margenesSvg.value = nv);
      datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
      creaSeries();
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).grupoVis, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
          creaSeries();
        }
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(datos, () => {
        datos.value.forEach(d => d.la_fecha = conversionTemporal(d[clave_fecha.value]));
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaSeries();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(variables, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaSeries();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).posicion_cursor, nv => {
        let bisecetDate = bisector(d => d.la_fecha).left;
        let x0 = escalaTemporal.value.invert(nv.x - margenesSvg.value.izquierda);
        let indice = bisecetDate(datos.value, x0, 1);
        let d0 = datos.value[indice - 1];
        let d1 = datos.value[indice];
        if (!d1) d1 = d0;
        let tooltip_data_seleccionada_x = x0 - d0.la_fecha > d1.la_fecha - x0 ? d1 : d0;
        let datos_y = variables.value.map(d => [d, tooltip_data_seleccionada_x[d.id]]).sort((a, b) => ascending_ascending(a[1], b[1]));
        let bisectCantidad = bisector(d => d).center;
        let y0 = escalaLineal.value.invert(nv.y - margenesSvg.value.arriba);
        let indiceY = bisectCantidad(datos_y.map(d => d[1]), y0);
        datos_hover.value = {
          ...datos_y[indiceY][0],
          ...tooltip_data_seleccionada_x
        };
        circulo_marcador.value.style('fill-opacity', 1).attr('cx', escalaTemporal.value(datos_hover.value.la_fecha)).attr('cy', escalaLineal.value(+datos_hover.value[datos_hover.value['id']])).style('fill', datos_hover.value.color);
        grupoSeries.value.selectAll('path').style('stroke-width', '2px').style('stroke-opacity', '.3');
        grupoSeries.value.filter(d => d.id === datos_hover.value.id).selectAll('path').style('stroke-width', '3px').style('stroke-opacity', '1');
      }, {
        deep: true
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).globo_visible, nv => {
        if (!nv) {
          circulo_marcador.value.style('fill-opacity', 0);
          grupoSeries.value.selectAll('path').style('stroke-width', '2px').style('stroke-opacity', '.8');
        }
      });
    });
    expose({
      escalaTemporal,
      escalaLineal,
      conversionTemporal,
      datos_hover
    });
    return {
      __sfc: true,
      idGrafica,
      props,
      datos_hover,
      sisdaiSeriesTiempo,
      datos,
      clave_fecha,
      variables,
      margenesSvg,
      conversionTemporal,
      escalaTemporal,
      escalaLineal,
      grupoContenedor,
      grupoSeries,
      circulo_marcador,
      calcularEscalas,
      creaSeries
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-series-tiempo/SisdaiSeriesTiempo.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_series_tiempo_SisdaiSeriesTiempovue_type_script_setup_true_lang_js = (SisdaiSeriesTiempovue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-series-tiempo/SisdaiSeriesTiempo.vue





/* normalize component */
;
var SisdaiSeriesTiempo_component = normalizeComponent(
  sisdai_series_tiempo_SisdaiSeriesTiempovue_type_script_setup_true_lang_js,
  SisdaiSeriesTiempovue_type_template_id_5e0f3c56_render,
  SisdaiSeriesTiempovue_type_template_id_5e0f3c56_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiSeriesTiempo = (SisdaiSeriesTiempo_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-series-tiempo/index.js

const sisdai_series_tiempo_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiSeriesTiempo', SisdaiSeriesTiempo);
  }
};
/* harmony default export */ var sisdai_series_tiempo = (sisdai_series_tiempo_plugin);
;// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6081fbb3-vue-loader-template"}!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-violines/SisdaiViolines.vue?vue&type=template&id=596afb80
var SisdaiViolinesvue_type_template_id_596afb80_render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c('g', {
    ref: "sisdaiViolines",
    staticClass: "contenedor-violines",
    attrs: {
      "transform": `translate(${_setup.margenesSvg?.izquierda || 0},${_setup.margenesSvg?.arriba || 0})`
    }
  });
};
var SisdaiViolinesvue_type_template_id_596afb80_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/d3-array/src/array.js
var array_array = Array.prototype;

var src_array_slice = array_array.slice;
var array_map = array_array.map;

;// CONCATENATED MODULE: ./node_modules/d3-array/src/constant.js
function src_constant_constant(x) {
  return () => x;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/nice.js


function nice_nice(start, stop, count) {
  let prestep;
  while (true) {
    const step = tickIncrement(start, stop, count);
    if (step === prestep || step === 0 || !isFinite(step)) {
      return [start, stop];
    } else if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
    }
    prestep = step;
  }
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/count.js
function count(values, valueof) {
  let count = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count;
      }
    }
  }
  return count;
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/threshold/sturges.js


function thresholdSturges(values) {
  return Math.max(1, Math.ceil(Math.log(count(values)) / Math.LN2) + 1);
}

;// CONCATENATED MODULE: ./node_modules/d3-array/src/bin.js









function bin() {
  var value = identity_identity,
      domain = extent,
      threshold = thresholdSturges;

  function histogram(data) {
    if (!Array.isArray(data)) data = Array.from(data);

    var i,
        n = data.length,
        x,
        step,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds, and nice the
    // default domain accordingly.
    if (!Array.isArray(tz)) {
      const max = x1, tn = +tz;
      if (domain === extent) [x0, x1] = nice_nice(x0, x1, tn);
      tz = ticks(x0, x1, tn);

      // If the domain is aligned with the first tick (which it will by
      // default), then we can use quantization rather than bisection to bin
      // values, which is substantially faster.
      if (tz[0] <= x0) step = tickIncrement(x0, x1, tn);

      // If the last threshold is coincident with the domain’s upper bound, the
      // last bin will be zero-width. If the default domain is used, and this
      // last threshold is coincident with the maximum input value, we can
      // extend the niced upper bound by one tick to ensure uniform bin widths;
      // otherwise, we simply remove the last threshold. Note that we don’t
      // coerce values or the domain to numbers, and thus must be careful to
      // compare order (>=) rather than strict equality (===)!
      if (tz[tz.length - 1] >= x1) {
        if (max >= x1 && domain === extent) {
          const step = tickIncrement(x0, x1, tn);
          if (isFinite(step)) {
            if (step > 0) {
              x1 = (Math.floor(x1 / step) + 1) * step;
            } else if (step < 0) {
              x1 = (Math.ceil(x1 * -step) + 1) / -step;
            }
          }
        } else {
          tz.pop();
        }
      }
    }

    // Remove any thresholds outside the domain.
    // Be careful not to mutate an array owned by the user!
    var m = tz.length, a = 0, b = m;
    while (tz[a] <= x0) ++a;
    while (tz[b - 1] > x1) --b;
    if (a || b < m) tz = tz.slice(a, b), m = b - a;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    if (isFinite(step)) {
      if (step > 0) {
        for (i = 0; i < n; ++i) {
          if ((x = values[i]) != null && x0 <= x && x <= x1) {
            bins[Math.min(m, Math.floor((x - x0) / step))].push(data[i]);
          }
        }
      } else if (step < 0) {
        for (i = 0; i < n; ++i) {
          if ((x = values[i]) != null && x0 <= x && x <= x1) {
            const j = Math.floor((x0 - x) * step);
            bins[Math.min(m, j + (tz[j] <= x))].push(data[i]); // handle off-by-one due to rounding
          }
        }
      }
    } else {
      for (i = 0; i < n; ++i) {
        if ((x = values[i]) != null && x0 <= x && x <= x1) {
          bins[bisect(tz, x, 0, m)].push(data[i]);
        }
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : src_constant_constant(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : src_constant_constant([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : src_constant_constant(Array.isArray(_) ? src_array_slice.call(_) : _), histogram) : threshold;
  };

  return histogram;
}

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/cardinal.js
function cardinal_point(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: cardinal_point(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // falls through
      default: cardinal_point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ var cardinal = ((function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));

;// CONCATENATED MODULE: ./node_modules/d3-shape/src/curve/catmullRom.js



function catmullRom_point(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > math_epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > math_epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // falls through
      default: catmullRom_point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ var catmullRom = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/componentes/sisdai-violines/SisdaiViolines.vue?vue&type=script&setup=true&lang=js








/* harmony default export */ var SisdaiViolinesvue_type_script_setup_true_lang_js = ({
  __name: 'SisdaiViolines',
  props: {
    datos: {
      type: Array,
      require: true
    },
    variables: {
      type: Object,
      require: true,
      validator(value) {
        // debe tener: id, nombre, color

        const validado = 'id' in value && 'nombre' in value && 'color' in value;
        if (!validado) {
          console.error('El objeto no cumple con las especificaciones');
        }
        return validado;
      }
    },
    clave_categorias: {
      type: String,
      default: 'categoria'
    },
    alineacion_eje_y: {
      type: String,
      default: 'izquierda',
      validator(value) {
        const validado = value === 'izquierda' || value === 'derecha';
        if (!validado) {
          console.error("la propiedad 'alineacion_eje_y' sólo admite los valores 'izquierda' o 'derecha'");
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_x: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    angulo_etiquetas_eje_y: {
      type: Number,
      default: 0,
      validator(value) {
        // debe estar entre -90 y 90
        const validado = -90 <= value && value <= 90;
        if (!validado) {
          console.error('El número debe estar entre -90 y 90');
        }
        return validado;
      }
    },
    numero_divisiones: {
      type: Number,
      default: 10
    }
  },
  setup(__props, {
    expose
  }) {
    const props = __props;
    var idGrafica;
    const sisdaiViolines = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.shallowRef)();
    const {
      datos,
      clave_categorias,
      variables
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toRefs)(props);
    transition_transition;
    const margenesSvg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)({});
    const escalaBanda = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      escalaLineal = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      escalaPathX = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    const grupoContenedor = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      data_agrupada = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      histograma = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(),
      grupoViolines = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
    function calcularEscalas(grupoVis) {
      if (!grupoVis && grupoVis.ancho === 0) return;
      escalaBanda.value = band().domain(datos.value?.map(d => d[clave_categorias.value])).range([0, grupoVis.ancho]).padding(0.05);
      escalaLineal.value = linear_linear().domain(extent(datos.value.map(d => d[variables.value.id]))).range([grupoVis.alto, 0]);
      creaEjeHorizontal(idGrafica, escalaBanda.value, props.angulo_etiquetas_eje_x);
      creaEjeVertical(idGrafica, escalaLineal.value, props.angulo_etiquetas_eje_y, props.alineacion_eje_y, grupoVis.ancho);
      histograma.value = bin().domain(escalaLineal.value.domain()).thresholds(props.numero_divisiones).value(d => d);
      data_agrupada.value = rollup(datos.value, d => {
        let input = d.map(g => g[variables.value.id]);
        let bins = histograma.value(input);
        return bins;
      }, d => d[props.clave_categorias]);
      let numero_maximo = 0;
      for (var i of data_agrupada.value) {
        let longuest = max_max(i[1].map(a => a.length));
        if (longuest > numero_maximo) {
          numero_maximo = longuest;
        }
      }
      escalaPathX.value = linear_linear().range([0, escalaBanda.value.bandwidth()]).domain([-numero_maximo, numero_maximo]);
    }
    function creaViolines() {
      grupoViolines.value = grupoContenedor.value.selectAll('g.grupo-violin').data(data_agrupada.value).join(enter => {
        let grupo = enter.append('g').attr('class', 'grupo-violin').style('fill', variables.value.color).attr('transform', d => `translate(${escalaBanda.value(d[0])} ,0)`);
        grupo.selectAll('path.violin').data(d => [d[1]]).enter().append('path').attr('class', 'violin').attr('width', escalaBanda.value.bandwidth()).transition().duration(500).attr('d', src_area().x0(d => escalaPathX.value(-d.length)).x1(d => escalaPathX.value(d.length)).y(d => escalaLineal.value(d.x0)).curve(catmullRom));
      }, update => {
        let grupo = update.call(update1 => update1.transition().duration(500).style('fill', variables.value.color).attr('transform', d => `translate(${escalaBanda.value(d[0])} ,0)`));
        grupo.selectAll('path.violin').data(d => [d[1]]).transition().duration(500).attr('d', src_area().x0(d => escalaPathX.value(-d.length)).x1(d => escalaPathX.value(d.length)).y(d => escalaLineal.value(d.x0)).curve(catmullRom));
      }, exit => {
        exit.remove();
      });
    }
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiViolines.value);
      grupoContenedor.value = src_select('#' + idGrafica + ' svg g.contenedor-violines');
      margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes;
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).margenes, nv => margenesSvg.value = nv);
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
      creaViolines();
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => usarRegistroGraficas().grafica(idGrafica).grupoVis, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
          creaViolines();
        }
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(datos, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaViolines();
      });
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(variables, () => {
        calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis);
        creaViolines();
      });
    });
    expose({
      escalaBanda,
      escalaLineal
    });
    return {
      __sfc: true,
      idGrafica,
      props,
      sisdaiViolines,
      datos,
      clave_categorias,
      variables,
      margenesSvg,
      escalaBanda,
      escalaLineal,
      escalaPathX,
      grupoContenedor,
      data_agrupada,
      histograma,
      grupoViolines,
      calcularEscalas,
      creaViolines
    };
  }
});
;// CONCATENATED MODULE: ./src/componentes/sisdai-violines/SisdaiViolines.vue?vue&type=script&setup=true&lang=js
 /* harmony default export */ var sisdai_violines_SisdaiViolinesvue_type_script_setup_true_lang_js = (SisdaiViolinesvue_type_script_setup_true_lang_js); 
;// CONCATENATED MODULE: ./src/componentes/sisdai-violines/SisdaiViolines.vue





/* normalize component */
;
var SisdaiViolines_component = normalizeComponent(
  sisdai_violines_SisdaiViolinesvue_type_script_setup_true_lang_js,
  SisdaiViolinesvue_type_template_id_596afb80_render,
  SisdaiViolinesvue_type_template_id_596afb80_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SisdaiViolines = (SisdaiViolines_component.exports);
;// CONCATENATED MODULE: ./src/componentes/sisdai-violines/index.js

const sisdai_violines_plugin = {
  install: function (Vue) {
    Vue.component('SisdaiViolines', SisdaiViolines);
  }
};
/* harmony default export */ var sisdai_violines = (sisdai_violines_plugin);
;// CONCATENATED MODULE: ./src/componentes/index.js













;// CONCATENATED MODULE: ./src/index.js
// This file is part of sisdai-graficas.
//
//   sisdai-graficas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-graficas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-graficas. If not, see <https://www.gnu.org/licenses/>.


const src_plugin = {
  install: function (Vue) {
    //UI base
    Vue.use(sisdai_graficas);
    Vue.use(sisdai_barras);
    Vue.use(sisdai_cajas_bigotes);
    Vue.use(sisdai_checks);
    Vue.use(sisdai_dona);
    Vue.use(sisdai_nomenclatura);
    Vue.use(sisdai_series_tiempo);
    Vue.use(sisdai_areas_apiladas);
    Vue.use(sisdai_areas_apiladas_ordenadas);
    Vue.use(sisdai_violines);
    Vue.use(sisdai_alluvial);
    Vue.use(sisdai_graficas_globo_info);
  }
};

/* harmony default export */ var src_0 = (src_plugin);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_0);


module.exports = __webpack_exports__["default"];
/******/ })()
;