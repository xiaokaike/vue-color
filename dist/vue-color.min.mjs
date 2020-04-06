import Vue from 'vue';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

/**
  * vue-class-component v7.2.3
  * (c) 2015-present Evan You
  * @license MIT
  */

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
  return function (target, key, index) {
    var Ctor = typeof target === 'function' ? target : target.constructor;

    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }

    if (typeof index !== 'number') {
      index = undefined;
    }

    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index);
    });
  };
}
function mixins() {
  for (var _len = arguments.length, Ctors = new Array(_len), _key = 0; _key < _len; _key++) {
    Ctors[_key] = arguments[_key];
  }

  return Vue.extend({
    mixins: Ctors
  });
}
function isPrimitive(value) {
  var type = _typeof(value);

  return value == null || type !== 'object' && type !== 'function';
}
function warn(message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message);
  }
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this;

    // proxy to actual vm
    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get: function get() {
            return vm[key];
          },
          set: function set(value) {
            vm[key] = value;
          },
          configurable: true
        });
      }
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
      warn('Component class must inherit Vue or its descendant class ' + 'when class property is used.');
    }
  }

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];
function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty$1({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof Vue ? superProto.constructor : Vue;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}
var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // Skip the properties that should not be overwritten
    if (shouldIgnore[key]) {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (process.env.NODE_ENV !== 'production' && reservedPropertyNames.indexOf(key) >= 0) {
      warn("Static property name '".concat(key, "' declared on class '").concat(Original.name, "' ") + 'conflicts with reserved property name of Vue internal. ' + 'It may cause unexpected behavior of the component. Consider renaming the property.');
    }

    Object.defineProperty(Extended, key, descriptor);
  });
}

function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

/** vue-property-decorator verson 8.4.1 MIT LICENSE copyright 2019 kaorun343 */
/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
function applyMetadata(options, target, key) {
    if (reflectMetadataIsSupported) {
        if (!Array.isArray(options) &&
            typeof options !== 'function' &&
            typeof options.type === 'undefined') {
            var type = Reflect.getMetadata('design:type', target, key);
            if (type !== Object) {
                options.type = type;
            }
        }
    }
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return createDecorator(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        var watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
    });
}
/**
 * decorator of a ref prop
 * @param refKey the ref key defined in template
 */
function Ref(refKey) {
    return createDecorator(function (options, key) {
        options.computed = options.computed || {};
        options.computed[key] = {
            cache: false,
            get: function () {
                return this.$refs[refKey || key];
            },
        };
    });
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var tinycolor = createCommonjsModule(function (module) {
// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if ( module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else {
    window.tinycolor = tinycolor;
}

})(Math);
});

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_debounce = debounce;

var DEFAULT_COLOR = '#000';

var _class, _temp;

var supportFormat = ['hex', 'hex8']; // We declare the props separately
// to make props types inferable.

var Props = Vue.extend({
  props: {
    value: {
      // default: '#fff',
      // required: true,
      validator: function validator(value) {
        return tinycolor(value).isValid();
      }
    },
    outputFormat: {
      type: String,
      validator: function validator(value) {
        return supportFormat.indexOf(value) >= 0;
      }
    },
    consistent: {
      type: Boolean,
      "default": true
    }
  }
}); // TODO: 枚举 & fallback

var formatMethodMap = {
  hex: 'toHexString',
  hex8: 'toHex8String'
};

var Color = Component(_class = (_temp = /*#__PURE__*/function (_Props) {
  _inherits(Color, _Props);

  var _super = _createSuper(Color);

  function Color() {
    var _this;

    _classCallCheck(this, Color);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.debounced = lodash_debounce(function (fn) {
      fn();
    }, 100);
    _this._outputFormat = 'hex';
    return _this;
  }

  _createClass(Color, [{
    key: "created",
    value: function created() {
      if (this.value === null) {
        // TODO: warning, if `value` is `null`, outputFormat need to be undefined
        this._outputFormat = this.outputFormat;
      }

      this._outputFormat = new tinycolor(this.value).getFormat();
    }
  }, {
    key: "getOutputFormat",
    value: function getOutputFormat() {
      return this._outputFormat;
    }
  }, {
    key: "setOutputFormat",
    value: function setOutputFormat(
    /*TODO: enum this type */
    format) {
      this._outputFormat = format;
    }
  }, {
    key: "onColorChange",
    value: function onColorChange(value) {
      var _this2 = this;

      var tc = new tinycolor(value); // to support v-model

      this.$emit('input', tc);
      this.$emit('change', tc);
      this.debounced(function () {
        _this2.$emit('change-complete', tc);
      }); // to avoid precision lose, need to separate another method to provide identical output

      var formatMethod = formatMethodMap[this._outputFormat];

      if (formatMethod) {
        var formatted = tc[formatMethod]();
        this.$emit('consistent-change', formatted);
        this.debounced(function () {
          return _this2.$emit('consistent-change-complete', formatted);
        });
      }
    }
  }, {
    key: "equals",
    value: function equals(color) {
      if (this.isInputEmpty) {
        return false;
      }

      return tinycolor.equals(this.tc, color);
    }
  }, {
    key: "isInputEmpty",
    get: function get() {
      return this.value === null;
    } // `tc` stands for tinycolor

  }, {
    key: "tc",
    get: function get() {
      if (this.value === null) {
        return new tinycolor(DEFAULT_COLOR);
      }

      var tc = new tinycolor(this.value);
      return tc;
    }
  }]);

  return Color;
}(Props), _temp)) || _class;

var _dec, _class$1, _class2, _descriptor, _temp$1;
var defaultColors = ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];
var Compact = (_dec = Prop({
  "default": function _default() {
    return defaultColors;
  }
}), Component(_class$1 = (_class2 = (_temp$1 = /*#__PURE__*/function (_mixins) {
  _inherits(Compact, _mixins);

  var _super = _createSuper(Compact);

  function Compact() {
    var _this;

    _classCallCheck(this, Compact);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "palette", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  return Compact;
}(mixins(Color)), _temp$1), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "palette", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class$1);

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__ = Compact;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vc-compact",
    attrs: {
      role: "CompactColorPicker"
    }
  }, [_c("ul", {
    staticClass: "vc-compact-colors",
    attrs: {
      role: "option"
    }
  }, _vm._l(_vm.palette, function (c) {
    return _c("li", {
      key: c,
      staticClass: "vc-compact-color-item",
      "class": {
        "vc-compact-color-item--white": c === "#FFFFFF"
      },
      style: {
        background: c
      },
      attrs: {
        "aria-label": "Color:" + c
      },
      on: {
        click: function click($event) {
          return _vm.onColorChange(c);
        }
      }
    }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.equals(c),
        expression: "equals(c)"
      }],
      staticClass: "vc-compact-dot"
    })]);
  }), 0)]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1b607f64_0", {
    source: "\n.vc-compact {\n  padding-top: 5px;\n  padding-left: 5px;\n  width: 240px;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-compact-colors {\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-compact-color-item {\n  list-style: none;\n  width: 15px;\n  height: 15px;\n  float: left;\n  margin-right: 5px;\n  margin-bottom: 5px;\n  position: relative;\n  cursor: pointer;\n}\n.vc-compact-color-item--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-compact-color-item--white .vc-compact-dot {\n  background: #000;\n}\n.vc-compact-dot {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  bottom: 5px;\n  left: 5px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Compact.vue"],
      "names": [],
      "mappings": ";AAkDA;EACA,gBAAA;EACA,iBAAA;EACA,YAAA;EACA,kBAAA;EACA,iEAAA;EACA,sBAAA;AACA;AACA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;AACA;AACA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,gCAAA;AACA;AACA;EACA,gBAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,kBAAA;EACA,UAAA;EACA,gBAAA;AACA",
      "file": "Compact.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"CompactColorPicker\"\n    class=\"vc-compact\"\n  >\n    <ul\n      role=\"option\"\n      class=\"vc-compact-colors\"\n    >\n      <li\n        v-for=\"c in palette\"\n        :key=\"c\"\n        :aria-label=\"'Color:' + c\"\n        class=\"vc-compact-color-item\"\n        :class=\"{'vc-compact-color-item--white': c === '#FFFFFF' }\"\n        :style=\"{background: c}\"\n        @click=\"onColorChange(c)\"\n      >\n        <div\n          v-show=\"equals(c)\"\n          class=\"vc-compact-dot\"\n        />\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\n\nconst defaultColors = [\n  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',\n  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',\n  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',\n  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',\n  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',\n  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'\n];\n\n@Component\nexport default class Compact extends mixins(Color) {\n  @Prop({default: () => defaultColors})\n  palette !: string[];\n}\n\n</script>\n\n<style>\n.vc-compact {\n  padding-top: 5px;\n  padding-left: 5px;\n  width: 240px;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-compact-colors {\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-compact-color-item {\n  list-style: none;\n  width: 15px;\n  height: 15px;\n  float: left;\n  margin-right: 5px;\n  margin-bottom: 5px;\n  position: relative;\n  cursor: pointer;\n}\n.vc-compact-color-item--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-compact-color-item--white .vc-compact-dot {\n  background: #000;\n}\n\n.vc-compact-dot {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  bottom: 5px;\n  left: 5px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var _dec$1, _class$2, _class2$1, _descriptor$1, _temp$2;
var defaultPalatte = ['#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3', '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959', '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000'];
var Grayscale = (_dec$1 = Prop({
  "default": function _default() {
    return defaultPalatte;
  }
}), Component(_class$2 = (_class2$1 = (_temp$2 = /*#__PURE__*/function (_mixins) {
  _inherits(Grayscale, _mixins);

  var _super = _createSuper(Grayscale);

  function Grayscale() {
    var _this;

    _classCallCheck(this, Grayscale);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "palette", _descriptor$1, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Grayscale, [{
    key: "handlerClick",
    value: function handlerClick(value) {
      this.onColorChange(value);
    }
  }, {
    key: "pick",
    get: function get() {
      return this.tc.toHexString();
    }
  }]);

  return Grayscale;
}(mixins(Color)), _temp$2), (_descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "palette", [_dec$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$1)) || _class$2);

/* script */
var __vue_script__$1 = Grayscale;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vc-grayscale",
    attrs: {
      role: "GrayscaleColorPicker"
    }
  }, [_c("ul", {
    staticClass: "vc-grayscale-colors",
    attrs: {
      role: "option"
    }
  }, _vm._l(_vm.palette, function (c) {
    return _c("li", {
      key: c,
      staticClass: "vc-grayscale-color-item",
      "class": {
        "vc-grayscale-color-item--white": c == "#FFFFFF"
      },
      style: {
        background: c
      },
      attrs: {
        "aria-label": "Color:" + c
      },
      on: {
        click: function click($event) {
          return _vm.handlerClick(c);
        }
      }
    }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.equals(c),
        expression: "equals(c)"
      }],
      staticClass: "vc-grayscale-dot"
    })]);
  }), 0)]);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6056046b_0", {
    source: "\n.vc-grayscale {\n  width: 125px;\n  border-radius: 2px;\n  box-shadow: 0 2px 15px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-grayscale-colors {\n  border-radius: 2px;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-grayscale-color-item {\n  list-style: none;\n  width: 25px;\n  height: 25px;\n  float: left;\n  position: relative;\n  cursor: pointer;\n}\n.vc-grayscale-color-item--white .vc-grayscale-dot {\n  background: #000;\n}\n.vc-grayscale-dot {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 6px;\n  height: 6px;\n  margin: -3px 0 0 -2px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Grayscale.vue"],
      "names": [],
      "mappings": ";AAuDA;EACA,YAAA;EACA,kBAAA;EACA,kEAAA;EACA,sBAAA;AACA;AACA;EACA,kBAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;AACA;AACA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,gBAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,qBAAA;EACA,kBAAA;EACA,UAAA;EACA,gBAAA;AACA",
      "file": "Grayscale.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"GrayscaleColorPicker\"\n    class=\"vc-grayscale\"\n  >\n    <ul\n      role=\"option\"\n      class=\"vc-grayscale-colors\"\n    >\n      <li\n        v-for=\"c in palette\"\n        :key=\"c\"\n        :aria-label=\"'Color:' + c\"\n        class=\"vc-grayscale-color-item\"\n        :class=\"{'vc-grayscale-color-item--white': c == '#FFFFFF'}\"\n        :style=\"{background: c}\"\n        @click=\"handlerClick(c)\"\n      >\n        <div\n          v-show=\"equals(c)\"\n          class=\"vc-grayscale-dot\"\n        />\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\n\nconst defaultPalatte = [\n  '#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3',\n  '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959',\n  '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000'\n]\n\n@Component\nexport default class Grayscale extends mixins(Color) {\n  @Prop({default: () => defaultPalatte})\n  readonly palette!: string[][];\n\n  get pick() {\n    return this.tc.toHexString();\n  }\n\n  handlerClick(value: string) {\n    this.onColorChange(value);\n  }\n}\n\n</script>\n\n<style>\n.vc-grayscale {\n  width: 125px;\n  border-radius: 2px;\n  box-shadow: 0 2px 15px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-grayscale-colors {\n  border-radius: 2px;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-grayscale-color-item {\n  list-style: none;\n  width: 25px;\n  height: 25px;\n  float: left;\n  position: relative;\n  cursor: pointer;\n}\n.vc-grayscale-color-item--white .vc-grayscale-dot {\n  background: #000;\n}\n\n.vc-grayscale-dot {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 6px;\n  height: 6px;\n  margin: -3px 0 0 -2px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var clamp_1 = clamp;

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

var _dec$2, _dec2, _dec3, _dec4, _dec5, _class$3, _class2$2, _descriptor$2, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp$3;
var clamps = {
  r: function r(v) {
    return clamp_1(v, 255, 0);
  },
  g: function g(v) {
    return clamp_1(v, 255, 0);
  },
  b: function b(v) {
    return clamp_1(v, 255, 0);
  },
  a: function a(v) {
    return clamp_1(v, 1, 0);
  },
  h: function h(v) {
    return clamp_1(v, 360, 0);
  },
  s: function s(v) {
    return clamp_1(v, 100, 0);
  },
  l: function l(v) {
    return clamp_1(v, 100, 0);
  },
  v: function v(_v) {
    return clamp_1(_v, 100, 0);
  }
};
var EditableInput = (_dec$2 = Prop(), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop({
  "default": 1
}), _dec5 = Ref(), Component(_class$3 = (_class2$2 = (_temp$3 = /*#__PURE__*/function (_Vue) {
  _inherits(EditableInput, _Vue);

  var _super = _createSuper(EditableInput);

  function EditableInput() {
    var _this;

    _classCallCheck(this, EditableInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "value", _descriptor$2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "label", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "desc", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "step", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "input", _descriptor5, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EditableInput, [{
    key: "handleChange",
    value: function handleChange(value) {
      var label = this.label;
      var v = value;
      var numberedValue = +value;

      if (!isNaN(numberedValue)) {
        if (label === 'r' || label === 'g' || label === 'b' || label === 'a' || label === 'h' || label === 's' || label === 'l' || label === 'v') {
          var _clamp = clamps[label];
          v = _clamp(numberedValue);
        }
      }

      this.$emit('change', v);
      this.$emit('input', v);
      var $input = this.$refs.input;
      $input.value = v.toString();
    }
  }, {
    key: "handleInput",
    value: function handleInput(e) {
      var target = e.target;
      e.target && this.handleChange(target.value);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var target = e.target;
      var val = target.value;
      var number = Number(val);

      if (!isNaN(number)) {
        var amount = this.step || 1; // Up

        if (e.keyCode === 38) {
          // TODO: 精度问题
          this.handleChange(number + amount);
          e.preventDefault();
        } // Down


        if (e.keyCode === 40) {
          // TODO: 精度问题
          this.handleChange(number - amount);
          e.preventDefault();
        }
      }
    }
  }]);

  return EditableInput;
}(Vue), _temp$3), (_descriptor$2 = _applyDecoratedDescriptor(_class2$2.prototype, "value", [_dec$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2$2.prototype, "label", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2$2.prototype, "desc", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2$2.prototype, "step", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2$2.prototype, "input", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$2)) || _class$3);

/* script */
var __vue_script__$2 = EditableInput;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vc-editable-input"
  }, [_c("input", {
    ref: "input",
    staticClass: "vc-input__input",
    attrs: {
      "aria-label": _vm.desc ? _vm.label + "(" + _vm.desc + ")" : _vm.label
    },
    domProps: {
      value: _vm.value
    },
    on: {
      keydown: _vm.handleKeyDown,
      input: _vm.handleInput
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "vc-input__label",
    attrs: {
      "for": _vm.label
    }
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c("span", {
    staticClass: "vc-input__desc"
  }, [_vm._v(_vm._s(_vm.desc))])]);
};

var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-47f63629_0", {
    source: "\n.vc-editable-input {\n  position: relative;\n}\n.vc-input__input {\n  padding: 0;\n  border: 0;\n  outline: none;\n}\n.vc-input__label {\n  text-transform: capitalize;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/EditableInput.vue"],
      "names": [],
      "mappings": ";AAkGA;EACA,kBAAA;AACA;AACA;EACA,UAAA;EACA,SAAA;EACA,aAAA;AACA;AACA;EACA,0BAAA;AACA",
      "file": "EditableInput.vue",
      "sourcesContent": ["<template>\n  <div class=\"vc-editable-input\">\n    <input\n      ref=\"input\"\n      :value=\"value\"\n      :aria-label=\"desc ? label + '(' + desc + ')' : label\"\n      class=\"vc-input__input\"\n      @keydown=\"handleKeyDown\"\n      @input=\"handleInput\"\n    >\n    <span\n      :for=\"label\"\n      class=\"vc-input__label\"\n    >{{ label }}</span>\n    <span class=\"vc-input__desc\">{{ desc }}</span>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport clamp from 'clamp';\nimport { Vue, Component, Prop, Ref } from 'vue-property-decorator';\n\nconst clamps = {\n  r: (v: number) => clamp(v, 255, 0),\n  g: (v: number) => clamp(v, 255, 0),\n  b: (v: number) => clamp(v, 255, 0),\n  a: (v: number) => clamp(v, 1, 0),\n  h: (v: number) => clamp(v, 360, 0),\n  s: (v: number) => clamp(v, 100, 0),\n  l: (v: number) => clamp(v, 100, 0),\n  v: (v: number) => clamp(v, 100, 0),\n}\n\ntype LabelsWithClamp = 'r' | 'g' | 'b' | 'a' | 'h' | 's' | 'l' | 'v';\n\n@Component\nexport default class EditableInput extends Vue {\n  @Prop()\n  value !: string | number;\n  @Prop()\n  label?: LabelsWithClamp | string;\n  @Prop()\n  desc ?: string;\n  @Prop({ default: 1 })\n  step?: number;\n\n  @Ref()\n  readonly input!: HTMLInputElement;\n\n  handleChange (value: string | number) {\n    const { label } = this;\n    let v = value;\n    let numberedValue = +value;\n    if (!isNaN(numberedValue)) {\n      if (label === 'r' ||  label === 'g' ||  label === 'b' ||  label === 'a' ||  label === 'h' ||  label === 's' ||  label === 'l' ||  label === 'v') {\n        const clamp = clamps[label];\n        v = clamp(numberedValue);\n      }\n    }\n    this.$emit('change', v);\n    this.$emit('input', v);\n    const $input = this.$refs.input as HTMLInputElement;\n    $input.value = v.toString();\n  }\n\n  handleInput(e: Event) {\n    const target = e.target as HTMLInputElement;\n    e.target && this.handleChange(target.value);\n  }\n\n  handleKeyDown(e: KeyboardEvent) {\n    const target = e.target as HTMLInputElement;\n    let val = target.value;\n\n    let number = Number(val)\n\n    if (!isNaN(number)) {\n      let amount = this.step || 1;\n\n      // Up\n      if (e.keyCode === 38) {\n        // TODO: 精度问题\n        this.handleChange(number + amount)\n        e.preventDefault()\n      }\n\n      // Down\n      if (e.keyCode === 40) {\n        // TODO: 精度问题\n        this.handleChange(number - amount)\n        e.preventDefault()\n      }\n    }\n  }\n}\n</script>\n\n<style>\n.vc-editable-input {\n  position: relative;\n}\n.vc-input__input {\n  padding: 0;\n  border: 0;\n  outline: none;\n}\n.vc-input__label {\n  text-transform: capitalize;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

function isValidHex(hex) {
  return tinycolor(hex).isValid();
}
function isTransparent(color) {
  return tinycolor(color).getAlpha() === 0;
}
function hasAlpha(color) {
  return tinycolor(color).getAlpha() < 1;
}

var _dec$3, _class$4;
var Material = (_dec$3 = Component({
  components: {
    EditableInput: __vue_component__$2
  }
}), _dec$3(_class$4 = /*#__PURE__*/function (_mixins) {
  _inherits(Material, _mixins);

  var _super = _createSuper(Material);

  function Material() {
    _classCallCheck(this, Material);

    return _super.apply(this, arguments);
  }

  _createClass(Material, [{
    key: "onChangeHex",
    value: function onChangeHex(hex) {
      if (isValidHex(hex) && hex.length === 7) {
        this.onColorChange(hex);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(label, data) {
      if (this.rgba === null) {
        return;
      }

      this.onColorChange(_objectSpread2({}, this.rgba, {}, _defineProperty({}, label, data)));
    }
  }, {
    key: "hex",
    get: function get() {
      if (this.isInputEmpty) {
        return null;
      }

      return this.tc.toHexString();
    }
  }, {
    key: "rgba",
    get: function get() {
      if (this.isInputEmpty) {
        return null;
      }

      return this.tc.toRgb();
    }
  }]);

  return Material;
}(mixins(Color))) || _class$4);

/* script */
var __vue_script__$3 = Material;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vc-material",
    attrs: {
      role: "MaterialColorPicker"
    }
  }, [_c("EditableInput", {
    staticClass: "vc-material-hex",
    style: {
      borderColor: _vm.hex
    },
    attrs: {
      label: "hex",
      value: _vm.hex
    },
    on: {
      change: _vm.onChangeHex
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "vc-material-split"
  }, [_c("div", {
    staticClass: "vc-material-third"
  }, [_c("EditableInput", {
    attrs: {
      label: "r",
      value: _vm.rgba && _vm.rgba.r
    },
    on: {
      change: function change($event) {
        return _vm.onChange("r", $event);
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-material-third"
  }, [_c("EditableInput", {
    attrs: {
      label: "g",
      value: _vm.rgba && _vm.rgba.g
    },
    on: {
      change: function change($event) {
        return _vm.onChange("g", $event);
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-material-third"
  }, [_c("EditableInput", {
    attrs: {
      label: "b",
      value: _vm.rgba && _vm.rgba.b
    },
    on: {
      change: function change($event) {
        return _vm.onChange("b", $event);
      }
    }
  })], 1)])], 1);
};

var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;
/* style */

var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-49921d68_0", {
    source: "\n.vc-material {\n  width: 98px;\n  height: 98px;\n  padding: 16px;\n  font-family: \"Roboto\";\n  position: relative;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-material .vc-input__input {\n  width: 100%;\n  margin-top: 12px;\n  font-size: 15px;\n  color: #333;\n  height: 30px;\n}\n.vc-material .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 11px;\n  color: #999;\n  text-transform: capitalize;\n}\n.vc-material-hex {\n  border-bottom-width: 2px;\n  border-bottom-style: solid;\n}\n.vc-material-split {\n  display: flex;\n  margin-right: -10px;\n  padding-top: 11px;\n}\n.vc-material-third {\n  flex: 1;\n  padding-right: 10px;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Material.vue"],
      "names": [],
      "mappings": ";AA6EA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,qBAAA;EACA,kBAAA;EACA,kBAAA;EACA,iEAAA;EACA,sBAAA;AACA;AAEA;EACA,WAAA;EACA,gBAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,eAAA;EACA,WAAA;EACA,0BAAA;AACA;AAEA;EACA,wBAAA;EACA,0BAAA;AACA;AACA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;AACA;AACA;EACA,OAAA;EACA,mBAAA;AACA",
      "file": "Material.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"MaterialColorPicker\"\n    class=\"vc-material\"\n  >\n    <EditableInput\n      class=\"vc-material-hex\"\n      label=\"hex\"\n      :style=\"{ borderColor: hex }\"\n      :value=\"hex\"\n      @change=\"onChangeHex\"\n    />\n\n    <div class=\"vc-material-split\">\n      <div class=\"vc-material-third\">\n        <EditableInput\n          label=\"r\"\n          :value=\"rgba && rgba.r\"\n          @change=\"onChange('r', $event)\"\n        />\n      </div>\n      <div class=\"vc-material-third\">\n        <EditableInput\n          label=\"g\"\n          :value=\"rgba && rgba.g\"\n          @change=\"onChange('g', $event)\"\n        />\n      </div>\n      <div class=\"vc-material-third\">\n        <EditableInput\n          label=\"b\"\n          :value=\"rgba && rgba.b\"\n          @change=\"onChange('b', $event)\"\n        />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport EditableInput from './common/EditableInput.vue';\nimport { mixins } from 'vue-class-component';\nimport { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';\nimport Color from '../common/ColorMixin';\nimport { isValidHex } from '../utils';\n\n@Component({\n  components: { EditableInput }\n})\nexport default class Material extends mixins(Color) {\n  get hex() {\n    if (this.isInputEmpty) {\n      return null;\n    }\n    return this.tc.toHexString();\n  }\n  get rgba() {\n    if (this.isInputEmpty) {\n      return null;\n    }\n    return this.tc.toRgb();\n  }\n  onChangeHex(hex: string) {\n    if (isValidHex(hex) && hex.length === 7) {\n      this.onColorChange(hex);\n    }\n  }\n  onChange(label: 'r' | 'g' | 'b', data: number) {\n    if (this.rgba === null) {\n      return\n    }\n    this.onColorChange({...this.rgba, ...{[label]: data }});\n  }\n}\n</script>\n\n<style>\n.vc-material {\n  width: 98px;\n  height: 98px;\n  padding: 16px;\n  font-family: \"Roboto\";\n  position: relative;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n\n.vc-material .vc-input__input {\n  width: 100%;\n  margin-top: 12px;\n  font-size: 15px;\n  color: #333;\n  height: 30px;\n}\n\n.vc-material .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 11px;\n  color: #999;\n  text-transform: capitalize;\n}\n\n.vc-material-hex {\n  border-bottom-width: 2px;\n  border-bottom-style: solid;\n}\n.vc-material-split {\n  display: flex;\n  margin-right: -10px;\n  padding-top: 11px;\n}\n.vc-material-third {\n  flex: 1;\n  padding-right: 10px;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

var _dec$4, _dec2$1, _dec3$1, _class$5, _class2$3, _descriptor$3, _descriptor2$1, _temp$4;
var Hue = (_dec$4 = Prop({
  "default": 'horizontal'
}), _dec2$1 = Ref('container'), _dec3$1 = Watch('hsl'), Component(_class$5 = (_class2$3 = (_temp$4 = /*#__PURE__*/function (_mixins) {
  _inherits(Hue, _mixins);

  var _super = _createSuper(Hue);

  function Hue() {
    var _this;

    _classCallCheck(this, Hue);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "direction", _descriptor$3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "container", _descriptor2$1, _assertThisInitialized(_this));

    _this.oldHue = 0;
    _this.pullDirection = '';
    _this.containerWidth = 0;
    _this.containerHeight = 0;
    _this.xOffset = 0;
    _this.yOffset = 0;
    return _this;
  }

  _createClass(Hue, [{
    key: "onHSLChanged",
    value: function onHSLChanged(val) {
      var h = val.h;
      if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right';
      if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left';
      this.oldHue = h;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var $container = this.container;
      this.containerWidth = $container.clientWidth;
      this.containerHeight = $container.clientHeight;
      this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset;
      this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset;
    }
  }, {
    key: "handleChange",
    value: function handleChange(pageX, pageY) {
      var h;
      var percent;
      var containerWidth = this.containerWidth,
          containerHeight = this.containerHeight,
          xOffset = this.xOffset,
          yOffset = this.yOffset;
      var left = pageX - xOffset;
      var top = pageY - yOffset;

      if (this.direction === 'vertical') {
        if (top < 0) {
          h = 360;
        } else if (top > containerHeight) {
          h = 0;
        } else {
          percent = -(top * 100 / containerHeight) + 100;
          h = 360 * percent / 100;
        }
      } else {
        if (left < 0) {
          h = 0;
        } else if (left > containerWidth) {
          h = 360;
        } else {
          percent = left * 100 / containerWidth;
          h = 360 * percent / 100;
        }
      }

      if (this.hsl.h !== h) {
        this.onColorChange(_objectSpread2({}, this.hsl, {}, {
          h: h
        }));
      }
    }
  }, {
    key: "handleTouchEvnet",
    value: function handleTouchEvnet(e) {
      e.preventDefault();
      this.handleChange(e.touches ? e.touches[0].pageX : 0, e.touches ? e.touches[0].pageY : 0);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      this.handleChange(e.pageX, e.pageY);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      this.handleChange(e.pageX, e.pageY);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp()
    /*e*/
    {
      this.unbindEventListeners();
    }
  }, {
    key: "unbindEventListeners",
    value: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "hsl",
    get: function get() {
      return this.tc.toHsl();
    }
  }, {
    key: "directionClass",
    get: function get() {
      return {
        'vc-hue--horizontal': this.direction === 'horizontal',
        'vc-hue--vertical': this.direction === 'vertical'
      };
    }
  }, {
    key: "pointerTop",
    get: function get() {
      var top = 0;

      if (this.direction === 'vertical') {
        if (this.hsl.h === 0 && this.pullDirection === 'right') {
          top = 0;
        } else {
          top = -(this.hsl.h * 100 / 360) + 100;
        }
      }

      return "".concat(top, "%");
    }
  }, {
    key: "pointerLeft",
    get: function get() {
      var left = 0;

      if (this.direction === 'horizontal') {
        if (this.hsl.h === 0 && this.pullDirection === 'right') {
          left = 100;
        } else {
          left = this.hsl.h * 100 / 360;
        }
      }

      return "".concat(left, "%");
    }
  }]);

  return Hue;
}(mixins(Color)), _temp$4), (_descriptor$3 = _applyDecoratedDescriptor(_class2$3.prototype, "direction", [_dec$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$1 = _applyDecoratedDescriptor(_class2$3.prototype, "container", [_dec2$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2$3.prototype, "onHSLChanged", [_dec3$1], Object.getOwnPropertyDescriptor(_class2$3.prototype, "onHSLChanged"), _class2$3.prototype)), _class2$3)) || _class$5);

/* script */
var __vue_script__$4 = Hue;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    "class": ["vc-hue", _vm.directionClass],
    attrs: {
      role: "HuePanel"
    }
  }, [_c("div", {
    ref: "container",
    staticClass: "vc-hue-container",
    on: {
      mousedown: _vm.handleMouseDown,
      touchmove: _vm.handleTouchEvnet,
      touchstart: _vm.handleTouchEvnet
    }
  }, [_c("div", {
    staticClass: "vc-hue-pointer",
    style: {
      top: _vm.pointerTop,
      left: _vm.pointerLeft
    },
    attrs: {
      role: "CurrentHuePointer"
    }
  }, [_c("div", {
    staticClass: "vc-hue-picker"
  })])])]);
};

var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;
/* style */

var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e7898c56_0", {
    source: "\n.vc-hue {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\n  cursor: pointer;\n  margin: 0 2px;\n  position: relative;\n  height: 100%;\n}\n.vc-hue-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-hue-picker {\n  cursor: pointer;\n  margin-top: 1px;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  transform: translateX(-2px);\n}\n.vc-hue--vertical .vc-hue-picker {\n  transform: translateX(-2px) translateY(-50%);\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/Hue.vue"],
      "names": [],
      "mappings": ";AAyJA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,kBAAA;AACA;AACA;EACA,2GAAA;AACA;AACA;EACA,yGAAA;AACA;AACA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;EACA,YAAA;AACA;AACA;EACA,UAAA;EACA,kBAAA;AACA;AACA;EACA,eAAA;EACA,eAAA;EACA,UAAA;EACA,kBAAA;EACA,WAAA;EACA,qCAAA;EACA,gBAAA;EACA,2BAAA;AACA;AACA;EACA,4CAAA;AACA",
      "file": "Hue.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"HuePanel\"\n    :class=\"['vc-hue', directionClass]\"\n  >\n    <div\n      ref=\"container\"\n      class=\"vc-hue-container\"\n      @mousedown=\"handleMouseDown\"\n      @touchmove=\"handleTouchEvnet\"\n      @touchstart=\"handleTouchEvnet\"\n    >\n      <div\n        role=\"CurrentHuePointer\"\n        class=\"vc-hue-pointer\"\n        :style=\"{top: pointerTop, left: pointerLeft}\"\n      >\n        <div class=\"vc-hue-picker\" />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../../common/ColorMixin';\n\n@Component\nexport default class Hue extends mixins(Color) {\n\n  @Prop({ default: 'horizontal' }) readonly direction!: 'horizontal' | 'vertical'\n\n  @Ref('container') readonly container!: HTMLDivElement\n\n  oldHue = 0;\n  pullDirection = '';\n  containerWidth = 0;\n  containerHeight = 0;\n  xOffset = 0;\n  yOffset = 0;\n\n  get hsl() {\n    return this.tc.toHsl();\n  }\n\n  get directionClass() {\n    return {\n      'vc-hue--horizontal': this.direction === 'horizontal',\n      'vc-hue--vertical': this.direction === 'vertical'\n    }\n  }\n\n  get pointerTop() {\n    let top = 0;\n    if (this.direction === 'vertical') {\n      if (this.hsl.h === 0 && this.pullDirection === 'right') {\n        top = 0\n      } else {\n        top = -((this.hsl.h * 100) / 360) + 100\n      }\n    }\n    return `${top}%`;\n  }\n\n  get pointerLeft() {\n    let left = 0;\n    if (this.direction === 'horizontal') {\n      if (this.hsl.h === 0 && this.pullDirection === 'right') {\n        left = 100\n      } else {\n        left = (this.hsl.h * 100) / 360\n      }\n    }\n    return `${left}%`;\n  }\n\n  @Watch('hsl')\n  onHSLChanged(val: tinycolor.ColorFormats.HSLA) {\n    const h = val.h\n    if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right'\n    if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left'\n    this.oldHue = h\n  }\n\n  mounted() {\n    const $container = this.container;\n    this.containerWidth = $container.clientWidth\n    this.containerHeight = $container.clientHeight\n\n    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset\n    this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset\n  }\n\n  handleChange(pageX: number, pageY: number) {\n    let h\n    let percent\n    const { containerWidth, containerHeight, xOffset, yOffset } = this;\n    const left = pageX - xOffset\n    const top = pageY - yOffset\n\n    if (this.direction === 'vertical') {\n      if (top < 0) {\n        h = 360\n      } else if (top > containerHeight) {\n        h = 0\n      } else {\n        percent = -(top * 100 / containerHeight) + 100\n        h = (360 * percent / 100)\n      }\n    } else {\n      if (left < 0) {\n        h = 0\n      } else if (left > containerWidth) {\n        h = 360\n      } else {\n        percent = left * 100 / containerWidth\n        h = (360 * percent / 100)\n      }\n    }\n\n    if (this.hsl.h !== h) {\n      this.onColorChange({...this.hsl, ...{ h }});\n    }\n  }\n\n  handleTouchEvnet(e: TouchEvent) {\n    e.preventDefault();\n    this.handleChange(e.touches ? e.touches[0].pageX : 0, e.touches ? e.touches[0].pageY : 0);\n  }\n\n  handleMouseDown(e: MouseEvent) {\n    this.handleChange(e.pageX, e.pageY);\n    window.addEventListener('mousemove', this.handleMouseMove)\n    window.addEventListener('mouseup', this.handleMouseUp)\n  }\n\n  handleMouseMove(e: MouseEvent) {\n    this.handleChange(e.pageX, e.pageY);\n  }\n\n  handleMouseUp (/*e*/) {\n    this.unbindEventListeners()\n  }\n\n  unbindEventListeners () {\n    window.removeEventListener('mousemove', this.handleMouseMove)\n    window.removeEventListener('mouseup', this.handleMouseUp)\n  }\n}\n</script>\n\n<style>\n.vc-hue {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\n  cursor: pointer;\n  margin: 0 2px;\n  position: relative;\n  height: 100%;\n}\n.vc-hue-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-hue-picker {\n  cursor: pointer;\n  margin-top: 1px;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  transform: translateX(-2px);\n}\n.vc-hue--vertical .vc-hue-picker {\n  transform: translateX(-2px) translateY(-50%);\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

var _dec$5, _dec2$2, _class$6, _class2$4, _descriptor$4, _temp$5;
var Slider = (_dec$5 = Component({
  components: {
    Hue: __vue_component__$4
  }
}), _dec2$2 = Prop({
  "default": function _default() {
    return ['.80', '.65', '.50', '.35', '.20'];
  }
}), _dec$5(_class$6 = (_class2$4 = (_temp$5 = /*#__PURE__*/function (_mixins) {
  _inherits(Slider, _mixins);

  var _super = _createSuper(Slider);

  function Slider() {
    var _this;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "swatches", _descriptor$4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Slider, [{
    key: "handleSwClick",
    value: function handleSwClick(offset) {
      this.onColorChange(_objectSpread2({}, this.hsl, {
        s: 0.5,
        l: offset
      }));
    }
  }, {
    key: "hsl",
    get: function get() {
      return this.tc.toHsl();
    }
  }, {
    key: "activeOffset",
    get: function get() {
      var hasBlack = this.swatches.includes('0');
      var hasWhite = this.swatches.includes('1');
      var hsl = this.hsl;

      if (Math.round(hsl.s * 100) / 100 === 0.50) {
        return Math.round(hsl.l * 100) / 100;
      } else if (hasBlack && hsl.l === 0) {
        return 0;
      } else if (hasWhite && hsl.l === 1) {
        return 1;
      }

      return -1;
    }
  }]);

  return Slider;
}(mixins(Color)), _temp$5), (_descriptor$4 = _applyDecoratedDescriptor(_class2$4.prototype, "swatches", [_dec2$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$4)) || _class$6);

/* script */
var __vue_script__$5 = Slider;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vc-slider",
    attrs: {
      role: "SliderColorPicker"
    }
  }, [_c("div", {
    staticClass: "vc-slider-hue-warp"
  }, [_c("Hue", {
    attrs: {
      value: _vm.tc
    },
    on: {
      change: _vm.onColorChange
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-slider-swatches",
    attrs: {
      role: "group"
    }
  }, _vm._l(_vm.swatches, function (offset, index) {
    return _c("div", {
      key: index,
      staticClass: "vc-slider-swatch",
      attrs: {
        "data-index": index
      },
      on: {
        click: function click($event) {
          return _vm.handleSwClick(offset);
        }
      }
    }, [_c("div", {
      staticClass: "vc-slider-swatch-picker",
      "class": {
        "vc-slider-swatch-picker--active": offset == _vm.activeOffset,
        "vc-slider-swatch-picker--white": offset === "1"
      },
      style: {
        background: "hsl(" + _vm.hsl.h + ", 50%, " + offset * 100 + "%)"
      },
      attrs: {
        "aria-label": "color:" + "hsl(" + _vm.hsl.h + ", 50%, " + offset * 100 + "%)"
      }
    })]);
  }), 0)]);
};

var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-ae3a2f14_0", {
    source: "\n.vc-slider {\n  position: relative;\n  width: 410px;\n}\n.vc-slider-hue-warp {\n  height: 12px;\n  position: relative;\n}\n.vc-slider-hue-warp .vc-hue-picker {\n  width: 14px;\n  height: 14px;\n  border-radius: 6px;\n  transform: translate(-7px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-slider-swatches {\n  display: flex;\n  margin-top: 20px;\n}\n.vc-slider-swatch {\n  margin-right: 1px;\n  flex: 1;\n  width: 20%;\n}\n.vc-slider-swatch:first-child {\n  margin-right: 1px;\n}\n.vc-slider-swatch:first-child .vc-slider-swatch-picker {\n  border-radius: 2px 0px 0px 2px;\n}\n.vc-slider-swatch:last-child {\n  margin-right: 0;\n}\n.vc-slider-swatch:last-child .vc-slider-swatch-picker {\n  border-radius: 0px 2px 2px 0px;\n}\n.vc-slider-swatch-picker {\n  cursor: pointer;\n  height: 12px;\n}\n.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active {\n  transform: scaleY(1.8);\n  border-radius: 3.6px/2px;\n}\n.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 0.6px #ddd;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Slider.vue"],
      "names": [],
      "mappings": ";AA6EA;EACA,kBAAA;EACA,YAAA;AACA;AACA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gCAAA;EACA,oCAAA;EACA,2CAAA;AACA;AACA;EACA,aAAA;EACA,gBAAA;AACA;AACA;EACA,iBAAA;EACA,OAAA;EACA,UAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,8BAAA;AACA;AACA;EACA,eAAA;AACA;AACA;EACA,8BAAA;AACA;AACA;EACA,eAAA;EACA,YAAA;AACA;AACA;EACA,sBAAA;EACA,wBAAA;AACA;AACA;EACA,gCAAA;AACA;AACA;EACA,kCAAA;AACA",
      "file": "Slider.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"SliderColorPicker\"\n    class=\"vc-slider\"\n  >\n    <div class=\"vc-slider-hue-warp\">\n      <Hue\n        :value=\"tc\"\n        @change=\"onColorChange\"\n      />\n    </div>\n    <div\n      role=\"group\"\n      class=\"vc-slider-swatches\"\n    >\n      <div\n        v-for=\"(offset, index) in swatches\"\n        :key=\"index\"\n        :data-index=\"index\"\n        class=\"vc-slider-swatch\"\n        @click=\"handleSwClick(offset)\"\n      >\n        <div\n          class=\"vc-slider-swatch-picker\"\n          :aria-label=\"'color:' + 'hsl(' + hsl.h + ', 50%, ' + (offset * 100) + '%)'\"\n          :class=\"{'vc-slider-swatch-picker--active': offset == activeOffset, 'vc-slider-swatch-picker--white': offset === '1'}\"\n          :style=\"{background: 'hsl(' + hsl.h + ', 50%, ' + (offset * 100) + '%)'}\"\n        />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\n\nimport Hue from './common/Hue.vue'\n\n@Component({\n  components: { Hue }\n})\nexport default class Slider extends mixins(Color) {\n  @Prop({default: () => ['.80', '.65', '.50', '.35', '.20']})\n  swatches!: string[];\n\n  get hsl() {\n    return this.tc.toHsl();\n  }\n\n  get activeOffset() {\n    const hasBlack = this.swatches.includes('0');\n    const hasWhite = this.swatches.includes('1');\n    const hsl = this.hsl;\n\n    if (Math.round(hsl.s * 100) / 100 === 0.50) {\n      return Math.round(hsl.l * 100) / 100;\n    } else if (hasBlack && hsl.l === 0) {\n      return 0;\n    } else if (hasWhite && hsl.l === 1) {\n      return 1;\n    }\n    return -1;\n  }\n\n  handleSwClick(offset) {\n    this.onColorChange({\n      ...this.hsl,\n      s: 0.5,\n      l: offset\n    })\n  }\n}\n</script>\n\n<style>\n.vc-slider {\n  position: relative;\n  width: 410px;\n}\n.vc-slider-hue-warp {\n  height: 12px;\n  position: relative;\n}\n.vc-slider-hue-warp .vc-hue-picker {\n  width: 14px;\n  height: 14px;\n  border-radius: 6px;\n  transform: translate(-7px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-slider-swatches {\n  display: flex;\n  margin-top: 20px;\n}\n.vc-slider-swatch {\n  margin-right: 1px;\n  flex: 1;\n  width: 20%;\n}\n.vc-slider-swatch:first-child {\n  margin-right: 1px;\n}\n.vc-slider-swatch:first-child .vc-slider-swatch-picker {\n  border-radius: 2px 0px 0px 2px;\n}\n.vc-slider-swatch:last-child {\n  margin-right: 0;\n}\n.vc-slider-swatch:last-child .vc-slider-swatch-picker {\n  border-radius: 0px 2px 2px 0px;\n}\n.vc-slider-swatch-picker {\n  cursor: pointer;\n  height: 12px;\n}\n.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active {\n  transform: scaleY(1.8);\n  border-radius: 3.6px/2px;\n}\n.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 0.6px #ddd;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

var red = {"50":"#ffebee","100":"#ffcdd2","200":"#ef9a9a","300":"#e57373","400":"#ef5350","500":"#f44336","600":"#e53935","700":"#d32f2f","800":"#c62828","900":"#b71c1c","a100":"#ff8a80","a200":"#ff5252","a400":"#ff1744","a700":"#d50000"};
var pink = {"50":"#fce4ec","100":"#f8bbd0","200":"#f48fb1","300":"#f06292","400":"#ec407a","500":"#e91e63","600":"#d81b60","700":"#c2185b","800":"#ad1457","900":"#880e4f","a100":"#ff80ab","a200":"#ff4081","a400":"#f50057","a700":"#c51162"};
var purple = {"50":"#f3e5f5","100":"#e1bee7","200":"#ce93d8","300":"#ba68c8","400":"#ab47bc","500":"#9c27b0","600":"#8e24aa","700":"#7b1fa2","800":"#6a1b9a","900":"#4a148c","a100":"#ea80fc","a200":"#e040fb","a400":"#d500f9","a700":"#aa00ff"};
var deepPurple = {"50":"#ede7f6","100":"#d1c4e9","200":"#b39ddb","300":"#9575cd","400":"#7e57c2","500":"#673ab7","600":"#5e35b1","700":"#512da8","800":"#4527a0","900":"#311b92","a100":"#b388ff","a200":"#7c4dff","a400":"#651fff","a700":"#6200ea"};
var indigo = {"50":"#e8eaf6","100":"#c5cae9","200":"#9fa8da","300":"#7986cb","400":"#5c6bc0","500":"#3f51b5","600":"#3949ab","700":"#303f9f","800":"#283593","900":"#1a237e","a100":"#8c9eff","a200":"#536dfe","a400":"#3d5afe","a700":"#304ffe"};
var blue = {"50":"#e3f2fd","100":"#bbdefb","200":"#90caf9","300":"#64b5f6","400":"#42a5f5","500":"#2196f3","600":"#1e88e5","700":"#1976d2","800":"#1565c0","900":"#0d47a1","a100":"#82b1ff","a200":"#448aff","a400":"#2979ff","a700":"#2962ff"};
var lightBlue = {"50":"#e1f5fe","100":"#b3e5fc","200":"#81d4fa","300":"#4fc3f7","400":"#29b6f6","500":"#03a9f4","600":"#039be5","700":"#0288d1","800":"#0277bd","900":"#01579b","a100":"#80d8ff","a200":"#40c4ff","a400":"#00b0ff","a700":"#0091ea"};
var cyan = {"50":"#e0f7fa","100":"#b2ebf2","200":"#80deea","300":"#4dd0e1","400":"#26c6da","500":"#00bcd4","600":"#00acc1","700":"#0097a7","800":"#00838f","900":"#006064","a100":"#84ffff","a200":"#18ffff","a400":"#00e5ff","a700":"#00b8d4"};
var teal = {"50":"#e0f2f1","100":"#b2dfdb","200":"#80cbc4","300":"#4db6ac","400":"#26a69a","500":"#009688","600":"#00897b","700":"#00796b","800":"#00695c","900":"#004d40","a100":"#a7ffeb","a200":"#64ffda","a400":"#1de9b6","a700":"#00bfa5"};
var green = {"50":"#e8f5e9","100":"#c8e6c9","200":"#a5d6a7","300":"#81c784","400":"#66bb6a","500":"#4caf50","600":"#43a047","700":"#388e3c","800":"#2e7d32","900":"#1b5e20","a100":"#b9f6ca","a200":"#69f0ae","a400":"#00e676","a700":"#00c853"};
var lightGreen = {"50":"#f1f8e9","100":"#dcedc8","200":"#c5e1a5","300":"#aed581","400":"#9ccc65","500":"#8bc34a","600":"#7cb342","700":"#689f38","800":"#558b2f","900":"#33691e","a100":"#ccff90","a200":"#b2ff59","a400":"#76ff03","a700":"#64dd17"};
var lime = {"50":"#f9fbe7","100":"#f0f4c3","200":"#e6ee9c","300":"#dce775","400":"#d4e157","500":"#cddc39","600":"#c0ca33","700":"#afb42b","800":"#9e9d24","900":"#827717","a100":"#f4ff81","a200":"#eeff41","a400":"#c6ff00","a700":"#aeea00"};
var yellow = {"50":"#fffde7","100":"#fff9c4","200":"#fff59d","300":"#fff176","400":"#ffee58","500":"#ffeb3b","600":"#fdd835","700":"#fbc02d","800":"#f9a825","900":"#f57f17","a100":"#ffff8d","a200":"#ffff00","a400":"#ffea00","a700":"#ffd600"};
var amber = {"50":"#fff8e1","100":"#ffecb3","200":"#ffe082","300":"#ffd54f","400":"#ffca28","500":"#ffc107","600":"#ffb300","700":"#ffa000","800":"#ff8f00","900":"#ff6f00","a100":"#ffe57f","a200":"#ffd740","a400":"#ffc400","a700":"#ffab00"};
var orange = {"50":"#fff3e0","100":"#ffe0b2","200":"#ffcc80","300":"#ffb74d","400":"#ffa726","500":"#ff9800","600":"#fb8c00","700":"#f57c00","800":"#ef6c00","900":"#e65100","a100":"#ffd180","a200":"#ffab40","a400":"#ff9100","a700":"#ff6d00"};
var deepOrange = {"50":"#fbe9e7","100":"#ffccbc","200":"#ffab91","300":"#ff8a65","400":"#ff7043","500":"#ff5722","600":"#f4511e","700":"#e64a19","800":"#d84315","900":"#bf360c","a100":"#ff9e80","a200":"#ff6e40","a400":"#ff3d00","a700":"#dd2c00"};
var brown = {"50":"#efebe9","100":"#d7ccc8","200":"#bcaaa4","300":"#a1887f","400":"#8d6e63","500":"#795548","600":"#6d4c41","700":"#5d4037","800":"#4e342e","900":"#3e2723"};
var grey = {"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121"};
var blueGrey = {"50":"#eceff1","100":"#cfd8dc","200":"#b0bec5","300":"#90a4ae","400":"#78909c","500":"#607d8b","600":"#546e7a","700":"#455a64","800":"#37474f","900":"#263238"};
var darkText = {"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","dividers":"rgba(0, 0, 0, 0.12)"};
var lightText = {"primary":"rgba(255, 255, 255, 1)","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","dividers":"rgba(255, 255, 255, 0.12)"};
var darkIcons = {"active":"rgba(0, 0, 0, 0.54)","inactive":"rgba(0, 0, 0, 0.38)"};
var lightIcons = {"active":"rgba(255, 255, 255, 1)","inactive":"rgba(255, 255, 255, 0.5)"};
var white = "#ffffff";
var black = "#000000";

var material = {
  red: red,
  pink: pink,
  purple: purple,
  deepPurple: deepPurple,
  indigo: indigo,
  blue: blue,
  lightBlue: lightBlue,
  cyan: cyan,
  teal: teal,
  green: green,
  lightGreen: lightGreen,
  lime: lime,
  yellow: yellow,
  amber: amber,
  orange: orange,
  deepOrange: deepOrange,
  brown: brown,
  grey: grey,
  blueGrey: blueGrey,
  darkText: darkText,
  lightText: lightText,
  darkIcons: darkIcons,
  lightIcons: lightIcons,
  white: white,
  black: black
};

var _dec$6, _class$7, _class2$5, _descriptor$5, _temp$6;
var colorMap = ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'blueGrey', 'black'];
var colorLevel = ['900', '700', '500', '300', '100'];

var defaultPalatte$1 = function defaultPalatte() {
  var colors = [];
  colorMap.forEach(function (color) {
    var typeColor = [];

    if (color.toLowerCase() === 'black' || color.toLowerCase() === 'white') {
      typeColor = typeColor.concat(['#000000', '#FFFFFF']);
    } else {
      colorLevel.forEach(function (level) {
        var c = material[color][level];
        typeColor.push(c.toUpperCase());
      });
    }

    colors.push(typeColor);
  });
  return colors;
};

var Swatches = (_dec$6 = Prop({
  "default": defaultPalatte$1
}), Component(_class$7 = (_class2$5 = (_temp$6 = /*#__PURE__*/function (_mixins) {
  _inherits(Swatches, _mixins);

  var _super = _createSuper(Swatches);

  function Swatches() {
    var _this;

    _classCallCheck(this, Swatches);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "palette", _descriptor$5, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Swatches, [{
    key: "handlerClick",
    value: function handlerClick(value) {
      this.onColorChange(value);
    }
  }, {
    key: "pick",
    get: function get() {
      if (this.tc === null) {
        return '';
      }

      return this.tc.toHexString();
    }
  }]);

  return Swatches;
}(mixins(Color)), _temp$6), (_descriptor$5 = _applyDecoratedDescriptor(_class2$5.prototype, "palette", [_dec$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$5)) || _class$7);

/* script */
var __vue_script__$6 = Swatches;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vc-swatches",
    attrs: {
      role: "SwatchesColorPicker",
      "data-pick": _vm.pick
    }
  }, [_c("div", {
    staticClass: "vc-swatches-box",
    attrs: {
      role: "group"
    }
  }, _vm._l(_vm.palette, function (group, $idx) {
    return _c("div", {
      key: $idx,
      staticClass: "vc-swatches-color-group"
    }, _vm._l(group, function (c) {
      return _c("div", {
        key: c,
        "class": ["vc-swatches-color-it", {
          "vc-swatches-color--white": c === "#FFFFFF"
        }],
        style: {
          background: c
        },
        attrs: {
          "aria-label": "Color:" + c,
          "data-color": c
        },
        on: {
          click: function click($event) {
            return _vm.handlerClick(c);
          }
        }
      }, [_c("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.equals(c),
          expression: "equals(c)"
        }],
        staticClass: "vc-swatches-pick"
      }, [_c("svg", {
        staticStyle: {
          width: "24px",
          height: "24px"
        },
        attrs: {
          viewBox: "0 0 24 24"
        }
      }, [_c("path", {
        attrs: {
          d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
        }
      })])])]);
    }), 0);
  }), 0)]);
};

var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;
/* style */

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1de4e1e7_0", {
    source: "\n.vc-swatches {\n  width: 320px;\n  height: 240px;\n  overflow-y: scroll;\n  background-color: #fff;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n}\n.vc-swatches-box {\n  padding: 16px 0 6px 16px;\n  overflow: hidden;\n}\n.vc-swatches-color-group {\n  padding-bottom: 10px;\n  width: 40px;\n  float: left;\n  margin-right: 10px;\n}\n.vc-swatches-color-it {\n  box-sizing: border-box;\n  width: 40px;\n  height: 24px;\n  cursor: pointer;\n  background: #880e4f;\n  margin-bottom: 1px;\n  overflow: hidden;\n  -ms-border-radius: 2px 2px 0 0;\n  -moz-border-radius: 2px 2px 0 0;\n  -o-border-radius: 2px 2px 0 0;\n  -webkit-border-radius: 2px 2px 0 0;\n  border-radius: 2px 2px 0 0;\n}\n.vc-swatches-color--white {\n  border: 1px solid #DDD;\n}\n.vc-swatches-pick {\n  fill: rgb(255, 255, 255);\n  margin-left: 8px;\n  display: block;\n}\n.vc-swatches-color--white .vc-swatches-pick {\n  fill: rgb(51, 51, 51);\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Swatches.vue"],
      "names": [],
      "mappings": ";AA2FA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,sBAAA;EACA,iEAAA;AACA;AACA;EACA,wBAAA;EACA,gBAAA;AACA;AACA;EACA,oBAAA;EACA,WAAA;EACA,WAAA;EACA,kBAAA;AACA;AACA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;EACA,8BAAA;EACA,+BAAA;EACA,6BAAA;EACA,kCAAA;EACA,0BAAA;AACA;AACA;EACA,sBAAA;AACA;AACA;EACA,wBAAA;EACA,gBAAA;EACA,cAAA;AACA;AACA;EACA,qBAAA;AACA",
      "file": "Swatches.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"SwatchesColorPicker\"\n    class=\"vc-swatches\"\n    :data-pick=\"pick\"\n  >\n    <div\n      role=\"group\"\n      class=\"vc-swatches-box\"\n    >\n      <div\n        v-for=\"(group, $idx) in palette\"\n        :key=\"$idx\"\n        class=\"vc-swatches-color-group\"\n      >\n        <div\n          v-for=\"c in group\"\n          :key=\"c\"\n          :aria-label=\"'Color:' + c\"\n          :class=\"['vc-swatches-color-it', {'vc-swatches-color--white': c === '#FFFFFF' }]\"\n          :data-color=\"c\"\n          :style=\"{background: c}\"\n          @click=\"handlerClick(c)\"\n        >\n          <div\n            v-show=\"equals(c)\"\n            class=\"vc-swatches-pick\"\n          >\n            <svg\n              style=\"width: 24px; height:24px;\"\n              viewBox=\"0 0 24 24\"\n            >\n              <path d=\"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z\" />\n            </svg>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport material from 'material-colors';\nimport { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\n\nconst colorMap = [\n  'red', 'pink', 'purple', 'deepPurple',\n  'indigo', 'blue', 'lightBlue', 'cyan',\n  'teal', 'green', 'lightGreen', 'lime',\n  'yellow', 'amber', 'orange', 'deepOrange',\n  'brown', 'blueGrey', 'black'\n];\nconst colorLevel = ['900', '700', '500', '300', '100'];\nconst defaultPalatte = () => {\n  const colors: string[][] = [];\n  colorMap.forEach((color) => {\n    let typeColor: string[] = [];\n    if (color.toLowerCase() === 'black' || color.toLowerCase() === 'white') {\n      typeColor = typeColor.concat(['#000000', '#FFFFFF'])\n    } else {\n      colorLevel.forEach((level) => {\n        const c = material[color][level]\n        typeColor.push(c.toUpperCase())\n      })\n    }\n    colors.push(typeColor)\n  })\n  return colors\n}\n\n@Component\nexport default class Swatches extends mixins(Color) {\n  @Prop({default: defaultPalatte})\n  readonly palette!: string[][];\n\n  get pick() {\n    if (this.tc === null) {\n      return '';\n    }\n    return this.tc.toHexString();\n  }\n\n  handlerClick(value: string) {\n    this.onColorChange(value);\n  }\n}\n</script>\n\n<style>\n.vc-swatches {\n  width: 320px;\n  height: 240px;\n  overflow-y: scroll;\n  background-color: #fff;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n}\n.vc-swatches-box {\n  padding: 16px 0 6px 16px;\n  overflow: hidden;\n}\n.vc-swatches-color-group {\n  padding-bottom: 10px;\n  width: 40px;\n  float: left;\n  margin-right: 10px;\n}\n.vc-swatches-color-it {\n  box-sizing: border-box;\n  width: 40px;\n  height: 24px;\n  cursor: pointer;\n  background: #880e4f;\n  margin-bottom: 1px;\n  overflow: hidden;\n  -ms-border-radius: 2px 2px 0 0;\n  -moz-border-radius: 2px 2px 0 0;\n  -o-border-radius: 2px 2px 0 0;\n  -webkit-border-radius: 2px 2px 0 0;\n  border-radius: 2px 2px 0 0;\n}\n.vc-swatches-color--white {\n  border: 1px solid #DDD;\n}\n.vc-swatches-pick {\n  fill: rgb(255, 255, 255);\n  margin-left: 8px;\n  display: block;\n}\n.vc-swatches-color--white .vc-swatches-pick {\n  fill: rgb(51, 51, 51);\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN$1 = 0 / 0;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim$1 = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary$1 = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal$1 = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt$1 = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max,
    nativeMin$1 = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root$1.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber$1(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now$1());
  }

  function debounced() {
    var time = now$1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  if (isObject$1(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce$1(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol$1(value)) {
    return NAN$1;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim$1, '');
  var isBinary = reIsBinary$1.test(value);
  return (isBinary || reIsOctal$1.test(value))
    ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex$1.test(value) ? NAN$1 : +value);
}

var lodash_throttle = throttle;

var _dec$7, _class$8, _class2$6, _descriptor$6, _temp$7;
var Saturation = (_dec$7 = Ref('container'), Component(_class$8 = (_class2$6 = (_temp$7 = /*#__PURE__*/function (_mixins) {
  _inherits(Saturation, _mixins);

  var _super = _createSuper(Saturation);

  function Saturation() {
    var _this;

    _classCallCheck(this, Saturation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.containerWidth = 0;
    _this.containerHeight = 0;
    _this.xOffset = 0;
    _this.yOffset = 0;
    _this.lastMouseEvent = '';
    _this.throttle = lodash_throttle(function (fn, data) {
      fn(data);
    }, 20, {
      'leading': true,
      'trailing': false
    });

    _initializerDefineProperty(_this, "container", _descriptor$6, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Saturation, [{
    key: "mounted",
    value: function mounted() {
      var $container = this.$refs.container;
      this.containerWidth = $container.clientWidth;
      this.containerHeight = $container.clientHeight;
      this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset;
      this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset;
    }
  }, {
    key: "handleChange",
    value: function handleChange(pageX, pageY) {
      // !skip && e.preventDefault()
      var containerWidth = this.containerWidth,
          containerHeight = this.containerHeight,
          xOffset = this.xOffset,
          yOffset = this.yOffset;
      var left = clamp_1(pageX - xOffset, 0, containerWidth);
      var top = clamp_1(pageY - yOffset, 0, containerHeight);
      var saturation = left / containerWidth;
      var bright = clamp_1(-(top / containerHeight) + 1, 0, 1);
      this.throttle(this.onColorChange, _objectSpread2({}, this.hsv, {}, {
        s: saturation,
        v: bright
      }));
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown()
    /* e: MouseEvent */
    {
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      this.lastMouseEvent = e.type;
      this.handleChange(e.pageX, e.pageY);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(e) {
      if (this.lastMouseEvent !== 'mousemove') {
        this.handleChange(e.pageX, e.pageY);
      }

      this.lastMouseEvent = '';
      this.unbindEventListeners();
    }
  }, {
    key: "unbindEventListeners",
    value: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "handleTouchEvents",
    value: function handleTouchEvents(e) {
      console.log(e.type);
      var pageX = e.touches ? e.touches[0].pageX : 0;
      var pageY = e.touches ? e.touches[0].pageY : 0;
      this.handleChange(pageX, pageY);
    }
  }, {
    key: "hsv",
    get: function get() {
      return this.tc.toHsv();
    }
  }, {
    key: "bgColor",
    get: function get() {
      return "hsl(".concat(this.hsv.h, ", 100%, 50%)");
    }
  }, {
    key: "pointerTop",
    get: function get() {
      return -(this.hsv.v * 100) + 1 + 100 + '%';
    }
  }, {
    key: "pointerLeft",
    get: function get() {
      return this.hsv.s * 100 + '%';
    }
  }]);

  return Saturation;
}(mixins(Color)), _temp$7), (_descriptor$6 = _applyDecoratedDescriptor(_class2$6.prototype, "container", [_dec$7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$6)) || _class$8);

/* script */
var __vue_script__$7 = Saturation;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    ref: "container",
    staticClass: "vc-saturation",
    style: {
      background: _vm.bgColor
    },
    attrs: {
      role: "SaturationPanel"
    },
    on: {
      mousedown: _vm.handleMouseDown,
      touchmove: _vm.handleTouchEvents,
      touchstart: _vm.handleTouchEvents
    }
  }, [_c("div", {
    staticClass: "vc-saturation--white"
  }), _vm._v(" "), _c("div", {
    staticClass: "vc-saturation--black"
  }), _vm._v(" "), _c("div", {
    staticClass: "vc-saturation-pointer",
    style: {
      top: _vm.pointerTop,
      left: _vm.pointerLeft
    },
    attrs: {
      role: "CurrentSaturationPointer"
    }
  }, [_c("div", {
    staticClass: "vc-saturation-circle"
  })])]);
};

var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;
/* style */

var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-530d886b_0", {
    source: "\n.vc-saturation,\n.vc-saturation--white,\n.vc-saturation--black {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-tap-highlight-color: transparent; /* for removing the highlight */\n}\n.vc-saturation--white {\n  background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n}\n.vc-saturation--black {\n  background: linear-gradient(to top, #000, rgba(0,0,0,0));\n}\n.vc-saturation-pointer {\n  cursor: pointer;\n  position: absolute;\n}\n.vc-saturation-circle {\n  cursor: head;\n  width: 4px;\n  height: 4px;\n  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);\n  border-radius: 50%;\n  transform: translate(-2px, -2px);\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/Saturation.vue"],
      "names": [],
      "mappings": ";AAkHA;;;EAGA,eAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,wCAAA,EAAA,+BAAA;AACA;AAEA;EACA,gEAAA;AACA;AACA;EACA,wDAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;AACA;AACA;EACA,YAAA;EACA,UAAA;EACA,WAAA;EACA,0FAAA;EACA,kBAAA;EACA,gCAAA;AACA",
      "file": "Saturation.vue",
      "sourcesContent": ["<template>\n  <div\n    ref=\"container\"\n    role=\"SaturationPanel\"\n    class=\"vc-saturation\"\n    :style=\"{background: bgColor}\"\n    @mousedown=\"handleMouseDown\"\n    @touchmove=\"handleTouchEvents\"\n    @touchstart=\"handleTouchEvents\"\n  >\n    <div class=\"vc-saturation--white\" />\n    <div class=\"vc-saturation--black\" />\n    <div\n      role=\"CurrentSaturationPointer\"\n      class=\"vc-saturation-pointer\"\n      :style=\"{top: pointerTop, left: pointerLeft}\"\n    >\n      <div class=\"vc-saturation-circle\" />\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Ref } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../../common/ColorMixin';\nimport clamp from 'clamp';\nimport throttle from 'lodash.throttle';\n\n@Component\nexport default class Saturation extends mixins(Color) {\n  containerWidth = 0;\n  containerHeight = 0;\n  xOffset = 0;\n  yOffset = 0;\n\n  lastMouseEvent = '';\n\n  throttle = throttle((fn, data) => {\n    fn(data)\n  }, 20,\n  {\n    'leading': true,\n    'trailing': false\n  })\n\n  @Ref('container')\n  readonly container!: HTMLDivElement\n\n  get hsv() {\n    return this.tc.toHsv();\n  }\n  get bgColor() {\n    return `hsl(${this.hsv.h}, 100%, 50%)`\n  }\n  get pointerTop () {\n    return (-(this.hsv.v * 100) + 1) + 100 + '%'\n  }\n  get pointerLeft () {\n    return this.hsv.s * 100 + '%'\n  }\n  mounted() {\n    const $container = this.$refs.container as HTMLDivElement;\n    this.containerWidth = $container.clientWidth\n    this.containerHeight = $container.clientHeight\n\n    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset\n    this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset\n  }\n  handleChange (pageX: number, pageY: number) {\n    // !skip && e.preventDefault()\n    const { containerWidth, containerHeight, xOffset, yOffset } = this;\n    const left = clamp(pageX - xOffset, 0, containerWidth)\n    const top = clamp(pageY - yOffset, 0, containerHeight)\n    const saturation = left / containerWidth\n    const bright = clamp(-(top / containerHeight) + 1, 0, 1)\n\n    this.throttle(this.onColorChange, {\n      ...this.hsv,\n      ... {\n        s: saturation,\n        v: bright,\n      }\n    })\n  }\n  handleMouseDown (/* e: MouseEvent */) {\n    window.addEventListener('mousemove', this.handleMouseMove)\n    window.addEventListener('mouseup', this.handleMouseUp)\n  }\n  handleMouseMove(e: MouseEvent) {\n    this.lastMouseEvent = e.type;\n    this.handleChange(e.pageX, e.pageY);\n  }\n  handleMouseUp (e: MouseEvent) {\n    if (this.lastMouseEvent !== 'mousemove') {\n      this.handleChange(e.pageX, e.pageY);\n    }\n    this.lastMouseEvent = '';\n    this.unbindEventListeners()\n  }\n  unbindEventListeners () {\n    window.removeEventListener('mousemove', this.handleMouseMove)\n    window.removeEventListener('mouseup', this.handleMouseUp)\n  }\n  handleTouchEvents(e: TouchEvent) {\n    console.log(e.type);\n    const pageX = e.touches ? e.touches[0].pageX : 0;\n    const pageY = e.touches ? e.touches[0].pageY : 0;\n    this.handleChange(pageX, pageY);\n  }\n}\n</script>\n\n<style>\n.vc-saturation,\n.vc-saturation--white,\n.vc-saturation--black {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-tap-highlight-color: transparent; /* for removing the highlight */\n}\n\n.vc-saturation--white {\n  background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n}\n.vc-saturation--black {\n  background: linear-gradient(to top, #000, rgba(0,0,0,0));\n}\n.vc-saturation-pointer {\n  cursor: pointer;\n  position: absolute;\n}\n.vc-saturation-circle {\n  cursor: head;\n  width: 4px;\n  height: 4px;\n  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);\n  border-radius: 50%;\n  transform: translate(-2px, -2px);\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

var _dec$8, _dec2$3, _dec3$2, _dec4$1, _dec5$1, _dec6, _dec7, _class$9, _class2$7, _descriptor$7, _descriptor2$2, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6, _temp$8;
var Photoshop = (_dec$8 = Component({
  components: {
    Saturation: __vue_component__$7,
    Hue: __vue_component__$4,
    EditableInput: __vue_component__$2
  }
}), _dec2$3 = Prop({
  "default": 'Color Picker'
}), _dec3$2 = Prop({
  "default": false
}), _dec4$1 = Prop({
  "default": false
}), _dec5$1 = Prop({
  "default": 'OK'
}), _dec6 = Prop({
  "default": 'Cancel'
}), _dec7 = Prop({
  "default": 'Reset'
}), _dec$8(_class$9 = (_class2$7 = (_temp$8 = /*#__PURE__*/function (_mixins) {
  _inherits(Photoshop, _mixins);

  var _super = _createSuper(Photoshop);

  function Photoshop() {
    var _this;

    _classCallCheck(this, Photoshop);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "head", _descriptor$7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "disableFields", _descriptor2$2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "hasResetButton", _descriptor3$1, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "acceptLabel", _descriptor4$1, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "cancelLabel", _descriptor5$1, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "resetLabel", _descriptor6, _assertThisInitialized(_this));

    _this.currentColor = null;
    return _this;
  }

  _createClass(Photoshop, [{
    key: "mounted",
    value: function mounted() {
      this.currentColor = this.tc.toHexString();
    }
  }, {
    key: "inputChange",
    value: function inputChange(label, color) {
      if (label === 'hex' && isValidHex(color)) {
        this.onColorChange(color);
        return;
      }

      if (label === 'r' || label === 'g' || label === 'b') {
        this.onColorChange(_objectSpread2({}, this.rgba, _defineProperty({}, label, color)));
        return;
      }

      if (label === 'h' || label === 's' || label === 'v') {
        this.onColorChange(_objectSpread2({}, this.tc.toHsv(), _defineProperty({}, label, color)));
        return;
      }
    }
  }, {
    key: "clickCurrentColor",
    value: function clickCurrentColor() {
      if (this.currentColor) {
        this.onColorChange(this.currentColor);
      }
    }
  }, {
    key: "handleAccept",
    value: function handleAccept() {
      this.$emit('ok');
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.$emit('cancel');
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      this.$emit('reset');
    }
  }, {
    key: "hex",
    get: function get() {
      return this.tc.toHexString();
    }
  }, {
    key: "rgba",
    get: function get() {
      return this.tc.toRgb();
    }
  }, {
    key: "hsv",
    get: function get() {
      var hsv = this.tc.toHsv();
      return {
        h: hsv.h.toFixed(),
        s: (hsv.s * 100).toFixed(),
        v: (hsv.v * 100).toFixed()
      };
    }
  }]);

  return Photoshop;
}(mixins(Color)), _temp$8), (_descriptor$7 = _applyDecoratedDescriptor(_class2$7.prototype, "head", [_dec2$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$2 = _applyDecoratedDescriptor(_class2$7.prototype, "disableFields", [_dec3$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3$1 = _applyDecoratedDescriptor(_class2$7.prototype, "hasResetButton", [_dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4$1 = _applyDecoratedDescriptor(_class2$7.prototype, "acceptLabel", [_dec5$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5$1 = _applyDecoratedDescriptor(_class2$7.prototype, "cancelLabel", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2$7.prototype, "resetLabel", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$7)) || _class$9);

/* script */
var __vue_script__$8 = Photoshop;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    "class": ["vc-photoshop", _vm.disableFields ? "vc-photoshop__disable-fields" : ""],
    attrs: {
      role: "PhotoShopColorPicker"
    }
  }, [_c("div", {
    staticClass: "vc-ps-head"
  }, [_vm._v(_vm._s(_vm.head))]), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-body"
  }, [_c("div", {
    staticClass: "vc-ps-saturation-wrap"
  }, [_c("Saturation", {
    attrs: {
      value: _vm.tc
    },
    on: {
      change: _vm.onColorChange
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-hue-wrap"
  }, [_c("hue", {
    attrs: {
      value: _vm.tc,
      direction: "vertical"
    },
    on: {
      change: _vm.onColorChange
    }
  }, [_c("div", {
    staticClass: "vc-ps-hue-pointer"
  }, [_c("i", {
    staticClass: "vc-ps-hue-pointer--left"
  }), _vm._v(" "), _c("i", {
    staticClass: "vc-ps-hue-pointer--right"
  })])])], 1), _vm._v(" "), _c("div", {
    "class": ["vc-ps-controls", _vm.disableFields ? "vc-ps-controls__disable-fields" : ""]
  }, [_c("div", {
    staticClass: "vc-ps-previews"
  }, [_c("div", {
    staticClass: "vc-ps-previews__label"
  }, [_vm._v("new")]), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-previews__swatches"
  }, [_c("div", {
    staticClass: "vc-ps-previews__pr-color",
    style: {
      background: _vm.hex
    },
    attrs: {
      "aria-label": "NewColor:" + _vm.hex
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-previews__pr-color",
    style: {
      background: _vm.currentColor
    },
    attrs: {
      "aria-label": "CurrentColor:" + _vm.currentColor
    },
    on: {
      click: _vm.clickCurrentColor
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-previews__label"
  }, [_vm._v("current")])]), _vm._v(" "), !_vm.disableFields ? _c("div", {
    staticClass: "vc-ps-actions"
  }, [_c("div", {
    staticClass: "vc-ps-ac-btn",
    attrs: {
      role: "button",
      "aria-label": "Confirm"
    },
    on: {
      click: _vm.handleAccept
    }
  }, [_vm._v("\n          " + _vm._s(_vm.acceptLabel) + "\n        ")]), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-ac-btn",
    attrs: {
      role: "button",
      "aria-label": "Cancel"
    },
    on: {
      click: _vm.handleCancel
    }
  }, [_vm._v("\n          " + _vm._s(_vm.cancelLabel) + "\n        ")]), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-fields"
  }, [_c("EditableInput", {
    attrs: {
      label: "h",
      desc: "°",
      value: _vm.hsv.h
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("h", $event);
      }
    }
  }), _vm._v(" "), _c("EditableInput", {
    attrs: {
      label: "s",
      desc: "%",
      value: _vm.hsv.s,
      max: 100
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("s", $event);
      }
    }
  }), _vm._v(" "), _c("EditableInput", {
    attrs: {
      label: "v",
      desc: "%",
      value: _vm.hsv.v,
      max: 100
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("v", $event);
      }
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-fields__divider"
  }), _vm._v(" "), _c("EditableInput", {
    attrs: {
      label: "r",
      value: _vm.rgba.r
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("r", $event);
      }
    }
  }), _vm._v(" "), _c("EditableInput", {
    attrs: {
      label: "g",
      value: _vm.rgba.g
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("g", $event);
      }
    }
  }), _vm._v(" "), _c("EditableInput", {
    attrs: {
      label: "b",
      value: _vm.rgba.b
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("b", $event);
      }
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "vc-ps-fields__divider"
  }), _vm._v(" "), _c("EditableInput", {
    staticClass: "vc-ps-fields__hex",
    attrs: {
      label: "#",
      value: _vm.tc.toHex()
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("hex", $event);
      }
    }
  })], 1), _vm._v(" "), _vm.hasResetButton ? _c("div", {
    staticClass: "vc-ps-ac-btn",
    attrs: {
      "aria-label": "reset"
    },
    on: {
      click: _vm.handleReset
    }
  }, [_vm._v("\n          " + _vm._s(_vm.resetLabel) + "\n        ")]) : _vm._e()]) : _vm._e()])])]);
};

var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;
/* style */

var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3f1005e3_0", {
    source: "\n.vc-photoshop {\n  background: #DCDCDC;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15);\n  box-sizing: initial;\n  width: 513px;\n  font-family: Roboto;\n}\n.vc-photoshop__disable-fields {\n  width: 390px;\n}\n.vc-ps-head {\n  background-image: linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%);\n  border-bottom: 1px solid #B1B1B1;\n  box-shadow: inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02);\n  height: 23px;\n  line-height: 24px;\n  border-radius: 4px 4px 0 0;\n  font-size: 13px;\n  color: #4D4D4D;\n  text-align: center;\n}\n.vc-ps-body {\n  padding: 15px;\n  display: flex;\n}\n.vc-ps-saturation-wrap {\n  width: 256px;\n  height: 256px;\n  position: relative;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n  overflow: hidden;\n}\n.vc-ps-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n.vc-ps-hue-wrap {\n  position: relative;\n  height: 256px;\n  width: 19px;\n  margin-left: 10px;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n}\n.vc-ps-hue-pointer {\n  position: relative;\n}\n.vc-ps-hue-pointer--left,\n.vc-ps-hue-pointer--right {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 5px 0 5px 8px;\n  border-color: transparent transparent transparent #555;\n}\n.vc-ps-hue-pointer--left:after,\n.vc-ps-hue-pointer--right:after {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 4px 0 4px 6px;\n  border-color: transparent transparent transparent #fff;\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  transform: translate(-8px, -5px);\n}\n.vc-ps-hue-pointer--left {\n  transform: translate(-13px, -4px);\n}\n.vc-ps-hue-pointer--right {\n  transform: translate(20px, -4px) rotate(180deg);\n}\n.vc-ps-controls {\n  width: 180px;\n  margin-left: 10px;\n  display: flex;\n}\n.vc-ps-controls__disable-fields {\n  width: auto;\n}\n.vc-ps-actions {\n  margin-left: 20px;\n  flex: 1;\n}\n.vc-ps-ac-btn {\n  cursor: pointer;\n  background-image: linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%);\n  border: 1px solid #878787;\n  border-radius: 2px;\n  height: 20px;\n  box-shadow: 0 1px 0 0 #EAEAEA;\n  font-size: 14px;\n  color: #000;\n  line-height: 20px;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.vc-ps-previews {\n  width: 60px;\n}\n.vc-ps-previews__swatches {\n  border: 1px solid #B3B3B3;\n  border-bottom: 1px solid #F0F0F0;\n  margin-bottom: 2px;\n  margin-top: 1px;\n}\n.vc-ps-previews__pr-color {\n  height: 34px;\n  box-shadow: inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000;\n}\n.vc-ps-previews__label {\n  font-size: 14px;\n  color: #000;\n  text-align: center;\n}\n.vc-ps-fields {\n  padding-top: 5px;\n  padding-bottom: 9px;\n  width: 80px;\n  position: relative;\n}\n.vc-ps-fields .vc-input__input {\n  margin-left: 40%;\n  width: 40%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 5px;\n  font-size: 13px;\n  padding-left: 3px;\n  margin-right: 10px;\n}\n.vc-ps-fields .vc-input__label, .vc-ps-fields .vc-input__desc {\n  top: 0;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n  position: absolute;\n}\n.vc-ps-fields .vc-input__label {\n  left: 0;\n  width: 34px;\n}\n.vc-ps-fields .vc-input__desc {\n  right: 0;\n  width: 0;\n}\n.vc-ps-fields__divider {\n  height: 5px;\n}\n.vc-ps-fields__hex .vc-input__input {\n  margin-left: 20%;\n  width: 80%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 6px;\n  font-size: 13px;\n  padding-left: 3px;\n}\n.vc-ps-fields__hex .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 14px;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Photoshop.vue"],
      "names": [],
      "mappings": ";AA2NA;EACA,mBAAA;EACA,kBAAA;EACA,iEAAA;EACA,mBAAA;EACA,YAAA;EACA,mBAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,oEAAA;EACA,gCAAA;EACA,kFAAA;EACA,YAAA;EACA,iBAAA;EACA,0BAAA;EACA,eAAA;EACA,cAAA;EACA,kBAAA;AACA;AACA;EACA,aAAA;EACA,aAAA;AACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,yBAAA;EACA,gCAAA;EACA,gBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,aAAA;EACA,WAAA;EACA,iBAAA;EACA,yBAAA;EACA,gCAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;;EAEA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,mBAAA;EACA,2BAAA;EACA,sDAAA;AACA;AACA;;EAEA,WAAA;EACA,QAAA;EACA,SAAA;EACA,mBAAA;EACA,2BAAA;EACA,sDAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;EACA,+CAAA;AACA;AAEA;EACA,YAAA;EACA,iBAAA;EACA,aAAA;AACA;AACA;EACA,WAAA;AACA;AAEA;EACA,iBAAA;EACA,OAAA;AACA;AACA;EACA,eAAA;EACA,oEAAA;EACA,yBAAA;EACA,kBAAA;EACA,YAAA;EACA,6BAAA;EACA,eAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,yBAAA;EACA,gCAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,YAAA;EACA,uEAAA;AACA;AACA;EACA,eAAA;EACA,WAAA;EACA,kBAAA;AACA;AAEA;EACA,gBAAA;EACA,mBAAA;EACA,WAAA;EACA,kBAAA;AACA;AACA;EACA,gBAAA;EACA,UAAA;EACA,YAAA;EACA,yBAAA;EACA,6DAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;AACA;AACA;EACA,MAAA;EACA,yBAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;AACA;AACA;EACA,OAAA;EACA,WAAA;AACA;AACA;EACA,QAAA;EACA,QAAA;AACA;AAEA;EACA,WAAA;AACA;AAEA;EACA,gBAAA;EACA,UAAA;EACA,YAAA;EACA,yBAAA;EACA,6DAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;AACA;AACA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,yBAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;AACA",
      "file": "Photoshop.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"PhotoShopColorPicker\"\n    :class=\"['vc-photoshop', disableFields ? 'vc-photoshop__disable-fields' : '']\"\n  >\n    <div class=\"vc-ps-head\">{{ head }}</div>\n    <div class=\"vc-ps-body\">\n      <div class=\"vc-ps-saturation-wrap\">\n        <Saturation\n          :value=\"tc\"\n          @change=\"onColorChange\"\n        />\n      </div>\n      <div class=\"vc-ps-hue-wrap\">\n        <hue\n          :value=\"tc\"\n          direction=\"vertical\"\n          @change=\"onColorChange\"\n        >\n          <div class=\"vc-ps-hue-pointer\">\n            <i class=\"vc-ps-hue-pointer--left\" />\n            <i class=\"vc-ps-hue-pointer--right\" />\n          </div>\n        </hue>\n      </div>\n      <div :class=\"['vc-ps-controls', disableFields ? 'vc-ps-controls__disable-fields' : '']\">\n        <div class=\"vc-ps-previews\">\n          <div class=\"vc-ps-previews__label\">new</div>\n          <div class=\"vc-ps-previews__swatches\">\n            <div\n              class=\"vc-ps-previews__pr-color\"\n              :aria-label=\"'NewColor:' + hex\"\n              :style=\"{background: hex}\"\n            />\n            <div\n              class=\"vc-ps-previews__pr-color\"\n              :aria-label=\"'CurrentColor:' + currentColor\"\n              :style=\"{background: currentColor}\"\n              @click=\"clickCurrentColor\"\n            />\n          </div>\n          <div class=\"vc-ps-previews__label\">current</div>\n        </div>\n        <div\n          v-if=\"!disableFields\"\n          class=\"vc-ps-actions\"\n        >\n          <div\n            class=\"vc-ps-ac-btn\"\n            role=\"button\"\n            aria-label=\"Confirm\"\n            @click=\"handleAccept\"\n          >\n            {{ acceptLabel }}\n          </div>\n          <div\n            class=\"vc-ps-ac-btn\"\n            role=\"button\"\n            aria-label=\"Cancel\"\n            @click=\"handleCancel\"\n          >\n            {{ cancelLabel }}\n          </div>\n\n          <div class=\"vc-ps-fields\">\n            <!-- hsla -->\n            <EditableInput\n              label=\"h\"\n              desc=\"°\"\n              :value=\"hsv.h\"\n              @change=\"inputChange('h', $event)\"\n            />\n            <EditableInput\n              label=\"s\"\n              desc=\"%\"\n              :value=\"hsv.s\"\n              :max=\"100\"\n              @change=\"inputChange('s', $event)\"\n            />\n            <EditableInput\n              label=\"v\"\n              desc=\"%\"\n              :value=\"hsv.v\"\n              :max=\"100\"\n              @change=\"inputChange('v', $event)\"\n            />\n            <div class=\"vc-ps-fields__divider\" />\n            <!-- rgba -->\n            <EditableInput\n              label=\"r\"\n              :value=\"rgba.r\"\n              @change=\"inputChange('r', $event)\"\n            />\n            <EditableInput\n              label=\"g\"\n              :value=\"rgba.g\"\n              @change=\"inputChange('g', $event)\"\n            />\n            <EditableInput\n              label=\"b\"\n              :value=\"rgba.b\"\n              @change=\"inputChange('b', $event)\"\n            />\n            <div class=\"vc-ps-fields__divider\" />\n            <!-- hex -->\n            <EditableInput\n              label=\"#\"\n              class=\"vc-ps-fields__hex\"\n              :value=\"tc.toHex()\"\n              @change=\"inputChange('hex', $event)\"\n            />\n          </div>\n\n          <div\n            v-if=\"hasResetButton\"\n            class=\"vc-ps-ac-btn\"\n            aria-label=\"reset\"\n            @click=\"handleReset\"\n          >\n            {{ resetLabel }}\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\nimport { isValidHex } from '../utils';\nimport EditableInput from './common/EditableInput.vue'\nimport Saturation from './common/Saturation.vue'\nimport Hue from './common/Hue.vue'\n\n@Component({\n  components: { Saturation, Hue, EditableInput },\n})\nexport default class Photoshop extends mixins(Color) {\n  @Prop({default: 'Color Picker'})\n  head!: string;\n\n  @Prop({default: false})\n  disableFields!: boolean;\n\n  @Prop({default: false})\n  hasResetButton!: boolean;\n\n  @Prop({default: 'OK'})\n  acceptLabel!: string;\n\n  @Prop({default: 'Cancel'})\n  cancelLabel!: string;\n\n  @Prop({default: 'Reset'})\n  resetLabel!: string;\n\n  currentColor: null | string = null;\n\n  get hex() {\n    return this.tc.toHexString();\n  }\n\n  get rgba() {\n    return this.tc.toRgb();\n  }\n\n  get hsv () {\n    const hsv = this.tc.toHsv();\n    return {\n      h: hsv.h.toFixed(),\n      s: (hsv.s * 100).toFixed(),\n      v: (hsv.v * 100).toFixed()\n    }\n  }\n\n  mounted() {\n    this.currentColor = this.tc.toHexString();\n  }\n\n  inputChange(label: 'r' | 'g' | 'b' | 'h' | 's' | 'v' | 'hex', color: string) {\n    if (label === 'hex' && isValidHex(color)) {\n      this.onColorChange(color);\n      return;\n    };\n    if (label === 'r' || label === 'g' || label === 'b') {\n      this.onColorChange({\n        ...this.rgba,\n        [label]: color\n      })\n      return;\n    }\n    if (label === 'h' || label === 's' || label === 'v') {\n      this.onColorChange({\n        ...this.tc.toHsv(),\n        [label]: color\n      });\n      return;\n    }\n  }\n  clickCurrentColor () {\n    if (this.currentColor) {\n      this.onColorChange(this.currentColor);\n    }\n  }\n  handleAccept() {\n    this.$emit('ok');\n  }\n  handleCancel() {\n    this.$emit('cancel');\n  }\n  handleReset() {\n    this.$emit('reset');\n  }\n}\n</script>\n\n<style>\n.vc-photoshop {\n  background: #DCDCDC;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15);\n  box-sizing: initial;\n  width: 513px;\n  font-family: Roboto;\n}\n.vc-photoshop__disable-fields {\n  width: 390px;\n}\n.vc-ps-head {\n  background-image: linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%);\n  border-bottom: 1px solid #B1B1B1;\n  box-shadow: inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02);\n  height: 23px;\n  line-height: 24px;\n  border-radius: 4px 4px 0 0;\n  font-size: 13px;\n  color: #4D4D4D;\n  text-align: center;\n}\n.vc-ps-body {\n  padding: 15px;\n  display: flex;\n}\n\n.vc-ps-saturation-wrap {\n  width: 256px;\n  height: 256px;\n  position: relative;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n  overflow: hidden;\n}\n.vc-ps-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n\n.vc-ps-hue-wrap {\n  position: relative;\n  height: 256px;\n  width: 19px;\n  margin-left: 10px;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n}\n.vc-ps-hue-pointer {\n  position: relative;\n}\n.vc-ps-hue-pointer--left,\n.vc-ps-hue-pointer--right {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 5px 0 5px 8px;\n  border-color: transparent transparent transparent #555;\n}\n.vc-ps-hue-pointer--left:after,\n.vc-ps-hue-pointer--right:after {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 4px 0 4px 6px;\n  border-color: transparent transparent transparent #fff;\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  transform: translate(-8px, -5px);\n}\n.vc-ps-hue-pointer--left {\n  transform: translate(-13px, -4px);\n}\n.vc-ps-hue-pointer--right {\n  transform: translate(20px, -4px) rotate(180deg);\n}\n\n.vc-ps-controls {\n  width: 180px;\n  margin-left: 10px;\n  display: flex;\n}\n.vc-ps-controls__disable-fields {\n  width: auto;\n}\n\n.vc-ps-actions {\n  margin-left: 20px;\n  flex: 1;\n}\n.vc-ps-ac-btn {\n  cursor: pointer;\n  background-image: linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%);\n  border: 1px solid #878787;\n  border-radius: 2px;\n  height: 20px;\n  box-shadow: 0 1px 0 0 #EAEAEA;\n  font-size: 14px;\n  color: #000;\n  line-height: 20px;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.vc-ps-previews {\n  width: 60px;\n}\n.vc-ps-previews__swatches {\n  border: 1px solid #B3B3B3;\n  border-bottom: 1px solid #F0F0F0;\n  margin-bottom: 2px;\n  margin-top: 1px;\n}\n.vc-ps-previews__pr-color {\n  height: 34px;\n  box-shadow: inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000;\n}\n.vc-ps-previews__label {\n  font-size: 14px;\n  color: #000;\n  text-align: center;\n}\n\n.vc-ps-fields {\n  padding-top: 5px;\n  padding-bottom: 9px;\n  width: 80px;\n  position: relative;\n}\n.vc-ps-fields .vc-input__input {\n  margin-left: 40%;\n  width: 40%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 5px;\n  font-size: 13px;\n  padding-left: 3px;\n  margin-right: 10px;\n}\n.vc-ps-fields .vc-input__label, .vc-ps-fields .vc-input__desc {\n  top: 0;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n  position: absolute;\n}\n.vc-ps-fields .vc-input__label {\n  left: 0;\n  width: 34px;\n}\n.vc-ps-fields .vc-input__desc {\n  right: 0;\n  width: 0;\n}\n\n.vc-ps-fields__divider {\n  height: 5px;\n}\n\n.vc-ps-fields__hex .vc-input__input {\n  margin-left: 20%;\n  width: 80%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 6px;\n  font-size: 13px;\n  padding-left: 3px;\n}\n.vc-ps-fields__hex .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 14px;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, createInjector, undefined, undefined);

var _dec$9, _dec2$4, _dec3$3, _class$a, _class2$8, _descriptor$8, _descriptor2$3, _descriptor3$2, _temp$9;
var _checkboardCache = {};
var Checkboard = (_dec$9 = Prop({
  "default": 8
}), _dec2$4 = Prop({
  "default": '#fff'
}), _dec3$3 = Prop({
  "default": '#e6e6e6'
}), Component(_class$a = (_class2$8 = (_temp$9 = /*#__PURE__*/function (_Vue) {
  _inherits(Checkboard, _Vue);

  var _super = _createSuper(Checkboard);

  function Checkboard() {
    var _this;

    _classCallCheck(this, Checkboard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "size", _descriptor$8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "white", _descriptor2$3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "grey", _descriptor3$2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Checkboard, [{
    key: "bgStyle",
    get: function get() {
      var checkboard = getCheckboard(this.white, this.grey, this.size);

      if (checkboard === null) {
        return {};
      }

      return {
        'background-image': "url(".concat(checkboard, ")")
      };
    }
  }]);

  return Checkboard;
}(Vue), _temp$9), (_descriptor$8 = _applyDecoratedDescriptor(_class2$8.prototype, "size", [_dec$9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$3 = _applyDecoratedDescriptor(_class2$8.prototype, "white", [_dec2$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3$2 = _applyDecoratedDescriptor(_class2$8.prototype, "grey", [_dec3$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$8)) || _class$a);
/**
 * get checkboard base data and cache
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */

function getCheckboard(c1, c2, size) {
  var key = c1 + ',' + c2 + ',' + size;

  if (_checkboardCache[key]) {
    return _checkboardCache[key];
  } else {
    var checkboard = renderCheckboard(c1, c2, size);

    if (checkboard === null) {
      return null;
    }

    _checkboardCache[key] = checkboard;
    return checkboard;
  }
}
/**
 * get base 64 data by canvas
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */


function renderCheckboard(c1, c2, size) {
  // Dont Render On Server
  if (typeof document === 'undefined') {
    return null;
  }

  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = size * 2;
  var ctx = canvas.getContext('2d'); // If no context can be found, return early.

  if (!ctx) {
    return null;
  }

  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
}

/* script */
var __vue_script__$9 = Checkboard;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vc-checkerboard",
    style: _vm.bgStyle
  });
};

var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;
/* style */

var __vue_inject_styles__$9 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-f1467a88_0", {
    source: "\n.vc-checkerboard {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  background-size: contain;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/Checkboard.vue"],
      "names": [],
      "mappings": ";AAwFA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,wBAAA;AACA",
      "file": "Checkboard.vue",
      "sourcesContent": ["<template>\n  <div\n    class=\"vc-checkerboard\"\n    :style=\"bgStyle\"\n  />\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Prop } from 'vue-property-decorator';\n\nlet _checkboardCache: {[key: string]: string} = {};\n\n@Component\nexport default class Checkboard extends Vue {\n  @Prop({default: 8})\n  readonly size!: number;\n\n  @Prop({default: '#fff'})\n  readonly white!: string;\n\n  @Prop({default: '#e6e6e6'})\n  readonly grey!: string;\n\n  get bgStyle() {\n    const checkboard = getCheckboard(this.white, this.grey, this.size);\n    if (checkboard === null) {\n      return {};\n    }\n    return {\n      'background-image': `url(${checkboard})`\n    }\n  }\n}\n\n/**\n * get checkboard base data and cache\n *\n * @param {String} c1 hex color\n * @param {String} c2 hex color\n * @param {Number} size\n */\nfunction getCheckboard (c1: string, c2: string, size: number) {\n  const key = c1 + ',' + c2 + ',' + size\n\n  if (_checkboardCache[key]) {\n    return _checkboardCache[key]\n  } else {\n    const checkboard = renderCheckboard(c1, c2, size);\n    if (checkboard === null) {\n      return null;\n    }\n    _checkboardCache[key] = checkboard\n    return checkboard\n  }\n}\n\n/**\n * get base 64 data by canvas\n *\n * @param {String} c1 hex color\n * @param {String} c2 hex color\n * @param {Number} size\n */\n\nfunction renderCheckboard (c1: string, c2: string, size: number) {\n  // Dont Render On Server\n  if (typeof document === 'undefined') {\n    return null\n  }\n  var canvas = document.createElement('canvas')\n  canvas.width = canvas.height = size * 2\n  var ctx = canvas.getContext('2d')\n  // If no context can be found, return early.\n  if (!ctx) {\n    return null\n  }\n  ctx.fillStyle = c1\n  ctx.fillRect(0, 0, canvas.width, canvas.height)\n  ctx.fillStyle = c2\n  ctx.fillRect(0, 0, size, size)\n  ctx.translate(size, size)\n  ctx.fillRect(0, 0, size, size)\n  return canvas.toDataURL()\n}\n\n</script>\n\n<style>\n.vc-checkerboard {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  background-size: contain;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, createInjector, undefined, undefined);

var _dec$a, _dec2$5, _class$b, _class2$9, _descriptor$9, _temp$a;
var Alpha = (_dec$a = Component({
  components: {
    Checkboard: __vue_component__$9
  }
}), _dec2$5 = Ref(), _dec$a(_class$b = (_class2$9 = (_temp$a = /*#__PURE__*/function (_mixins) {
  _inherits(Alpha, _mixins);

  var _super = _createSuper(Alpha);

  function Alpha() {
    var _this;

    _classCallCheck(this, Alpha);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "container", _descriptor$9, _assertThisInitialized(_this));

    _this.containerWidth = 0;
    _this.xOffset = 0;
    return _this;
  }

  _createClass(Alpha, [{
    key: "gradientColor",
    value: function gradientColor() {
      var rgba = this.tc.toRgb();
      var rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
      return "linear-gradient(to right, rgba(".concat(rgbStr, ", 0) 0%, rgba(").concat(rgbStr, ", 1) 100%)");
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var $container = this.$refs.container;
      this.containerWidth = $container.clientWidth;
      this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset;
    }
  }, {
    key: "handleChange",
    value: function handleChange(pageX) {
      var containerWidth = this.containerWidth,
          xOffset = this.xOffset;
      var left = pageX - xOffset;
      var a;

      if (left < 0) {
        a = 0;
      } else if (left > containerWidth) {
        a = 1;
      } else {
        a = Math.round(left * 100 / containerWidth) / 100;
      }

      if (this.a !== a) {
        if (this.getOutputFormat() === 'hex') {
          this.setOutputFormat('hex8');
        }

        this.onColorChange(this.tc.setAlpha(a));
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      e.preventDefault();
      this.handleChange(e.pageX);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      this.handleChange(e.pageX);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp() {
      this.unbindEventListeners();
    }
  }, {
    key: "unbindEventListeners",
    value: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "handlTouchEvents",
    value: function handlTouchEvents(e) {
      var pageX = e.touches ? e.touches[0].pageX : 0;
      this.handleChange(pageX);
    }
  }, {
    key: "a",
    get: function get() {
      return this.tc.getAlpha();
    }
  }, {
    key: "pointerLeft",
    get: function get() {
      return "".concat(this.a * 100, "%");
    }
  }]);

  return Alpha;
}(mixins(Color)), _temp$a), (_descriptor$9 = _applyDecoratedDescriptor(_class2$9.prototype, "container", [_dec2$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$9)) || _class$b);

/* script */
var __vue_script__$a = Alpha;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vc-alpha",
    attrs: {
      role: "HuePanel"
    }
  }, [_c("div", {
    staticClass: "vc-alpha-checkboard-wrap"
  }, [_c("Checkboard")], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-alpha-gradient",
    style: {
      background: _vm.gradientColor
    }
  }), _vm._v(" "), _c("div", {
    ref: "container",
    staticClass: "vc-alpha-container",
    on: {
      mousedown: _vm.handleMouseDown,
      touchmove: _vm.handlTouchEvents,
      touchstart: _vm.handlTouchEvents
    }
  }, [_c("div", {
    staticClass: "vc-alpha-pointer",
    style: {
      left: _vm.pointerLeft
    },
    attrs: {
      role: "CurrentAlphaPointer"
    }
  }, [_c("div", {
    staticClass: "vc-alpha-picker"
  })])])]);
};

var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;
/* style */

var __vue_inject_styles__$a = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-10309338_0", {
    source: "\n.vc-alpha {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-checkboard-wrap {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  overflow: hidden;\n}\n.vc-alpha-gradient {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-container {\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n  height: 100%;\n  margin: 0 3px;\n  -webkit-tap-highlight-color: transparent; /* for removing the highlight */\n}\n.vc-alpha-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-alpha-picker {\n  cursor: pointer;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  margin-top: 1px;\n  transform: translateX(-2px);\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/Alpha.vue"],
      "names": [],
      "mappings": ";AA8GA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,gBAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;EACA,YAAA;EACA,aAAA;EACA,wCAAA,EAAA,+BAAA;AACA;AACA;EACA,UAAA;EACA,kBAAA;AACA;AACA;EACA,eAAA;EACA,UAAA;EACA,kBAAA;EACA,WAAA;EACA,qCAAA;EACA,gBAAA;EACA,eAAA;EACA,2BAAA;AACA",
      "file": "Alpha.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"HuePanel\"\n    class=\"vc-alpha\"\n  >\n    <div class=\"vc-alpha-checkboard-wrap\">\n      <Checkboard />\n    </div>\n    <div\n      class=\"vc-alpha-gradient\"\n      :style=\"{background: gradientColor}\"\n    />\n    <div\n      ref=\"container\"\n      class=\"vc-alpha-container\"\n      @mousedown=\"handleMouseDown\"\n      @touchmove=\"handlTouchEvents\"\n      @touchstart=\"handlTouchEvents\"\n    >\n      <div\n        role=\"CurrentAlphaPointer\"\n        class=\"vc-alpha-pointer\"\n        :style=\"{left: pointerLeft}\"\n      >\n        <div class=\"vc-alpha-picker\" />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport Checkboard from './Checkboard.vue';\nimport { Component, Ref, Watch } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../../common/ColorMixin';\n\n@Component({\n  components: {\n    Checkboard\n  }\n})\nexport default class Alpha extends mixins(Color) {\n  @Ref()\n  readonly container!: HTMLDivElement;\n\n  containerWidth = 0;\n  xOffset = 0;\n\n  get a() {\n    return this.tc.getAlpha();\n  }\n  get pointerLeft() {\n    return `${this.a * 100}%`;\n  }\n  gradientColor() {\n    const rgba = this.tc.toRgb();\n    const rgbStr = [rgba.r, rgba.g, rgba.b].join(',');\n    return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;\n  }\n  mounted() {\n    const $container = this.$refs.container as HTMLDivElement;\n    this.containerWidth = $container.clientWidth\n    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset\n  }\n  handleChange(pageX: number) {\n\n    const { containerWidth, xOffset } = this;\n    const left = pageX - xOffset;\n\n    let a;\n    if (left < 0) {\n      a = 0;\n    } else if (left > containerWidth) {\n      a = 1;\n    } else {\n      a = Math.round(left * 100 / containerWidth) / 100;\n    }\n\n    if (this.a !== a) {\n      if (this.getOutputFormat() === 'hex') {\n        this.setOutputFormat('hex8')\n      }\n      this.onColorChange(this.tc.setAlpha(a));\n    }\n  }\n  handleMouseDown(e: MouseEvent) {\n    e.preventDefault();\n    this.handleChange(e.pageX);\n    window.addEventListener('mousemove', this.handleMouseMove)\n    window.addEventListener('mouseup', this.handleMouseUp)\n  }\n  handleMouseMove(e: MouseEvent) {\n    this.handleChange(e.pageX);\n  }\n  handleMouseUp () {\n    this.unbindEventListeners()\n  }\n  unbindEventListeners () {\n    window.removeEventListener('mousemove', this.handleMouseMove)\n    window.removeEventListener('mouseup', this.handleMouseUp)\n  }\n  handlTouchEvents (e: TouchEvent) {\n    const pageX = e.touches ? e.touches[0].pageX : 0;\n    this.handleChange(pageX);\n  }\n}\n\n</script>\n\n<style>\n.vc-alpha {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-checkboard-wrap {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  overflow: hidden;\n}\n.vc-alpha-gradient {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-container {\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n  height: 100%;\n  margin: 0 3px;\n  -webkit-tap-highlight-color: transparent; /* for removing the highlight */\n}\n.vc-alpha-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-alpha-picker {\n  cursor: pointer;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  margin-top: 1px;\n  transform: translateX(-2px);\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = undefined;
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, createInjector, undefined, undefined);

var _dec$b, _dec2$6, _dec3$4, _dec4$2, _class$c, _class2$a, _descriptor$a, _descriptor2$4, _descriptor3$3, _temp$b;
var presetColors = ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF', 'rgba(0,0,0,0)'];
var Sketch = (_dec$b = Component({
  components: {
    EditableInput: __vue_component__$2,
    Saturation: __vue_component__$7,
    Hue: __vue_component__$4,
    Alpha: __vue_component__$a,
    Checkboard: __vue_component__$9
  }
}), _dec2$6 = Prop({
  "default": function _default() {
    return presetColors;
  }
}), _dec3$4 = Prop({
  "default": false
}), _dec4$2 = Prop({
  "default": false
}), _dec$b(_class$c = (_class2$a = (_temp$b = /*#__PURE__*/function (_mixins) {
  _inherits(Sketch, _mixins);

  var _super = _createSuper(Sketch);

  function Sketch() {
    var _this;

    _classCallCheck(this, Sketch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "presetColors", _descriptor$a, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "disableAlpha", _descriptor2$4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "disableFields", _descriptor3$3, _assertThisInitialized(_this));

    _this.isTransparent = isTransparent;
    return _this;
  }

  _createClass(Sketch, [{
    key: "onAlphaChange",
    value: function onAlphaChange(color) {
      if (hasAlpha(color) && this.getOutputFormat() === 'hex') {
        this.setOutputFormat('hex8');
      }

      this.onColorChange(color);
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(label, value) {
      this.onColorChange(_objectSpread2({}, this.rgba, _defineProperty({}, label, value)));
    }
  }, {
    key: "hex",
    get: function get() {
      if (hasAlpha(this.tc)) {
        return this.tc.toHex8();
      } else {
        return this.tc.toHex();
      }
    }
  }, {
    key: "rgba",
    get: function get() {
      return this.tc.toRgb();
    }
  }]);

  return Sketch;
}(mixins(Color)), _temp$b), (_descriptor$a = _applyDecoratedDescriptor(_class2$a.prototype, "presetColors", [_dec2$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$4 = _applyDecoratedDescriptor(_class2$a.prototype, "disableAlpha", [_dec3$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3$3 = _applyDecoratedDescriptor(_class2$a.prototype, "disableFields", [_dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$a)) || _class$c);

/* script */
var __vue_script__$b = Sketch;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    "class": ["vc-sketch", _vm.disableAlpha ? "vc-sketch__disable-alpha" : ""],
    attrs: {
      role: "SketchColorPicker"
    }
  }, [_c("div", {
    staticClass: "vc-sketch-saturation-wrap"
  }, [_c("Saturation", {
    attrs: {
      value: _vm.tc
    },
    on: {
      change: _vm.onColorChange
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-sketch-controls"
  }, [_c("div", {
    staticClass: "vc-sketch-sliders"
  }, [_c("div", {
    staticClass: "vc-sketch-hue-wrap"
  }, [_c("Hue", {
    attrs: {
      value: _vm.tc
    },
    on: {
      change: _vm.onColorChange
    }
  })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
    staticClass: "vc-sketch-alpha-wrap"
  }, [_c("Alpha", {
    attrs: {
      value: _vm.tc
    },
    on: {
      change: _vm.onAlphaChange
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "vc-sketch-color-wrap"
  }, [_c("div", {
    staticClass: "vc-sketch-active-color",
    style: {
      background: _vm.tc.toRgbString()
    },
    attrs: {
      "aria-label": "Currentcolor: " + _vm.tc.toRgbString()
    }
  }), _vm._v(" "), _c("Checkboard")], 1)]), _vm._v(" "), !_vm.disableFields ? _c("div", {
    staticClass: "vc-sketch-field"
  }, [_c("div", {
    staticClass: "vc-sketch-field--double"
  }, [_c("EditableInput", {
    attrs: {
      label: "hex",
      value: _vm.hex
    },
    on: {
      change: _vm.onColorChange
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-sketch-field--single"
  }, [_c("EditableInput", {
    attrs: {
      label: "r",
      value: _vm.rgba.r
    },
    on: {
      change: function change($event) {
        return _vm.onInputChange("r", $event);
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-sketch-field--single"
  }, [_c("EditableInput", {
    attrs: {
      label: "g",
      value: _vm.rgba.g
    },
    on: {
      change: function change($event) {
        return _vm.onInputChange("r", $event);
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-sketch-field--single"
  }, [_c("EditableInput", {
    attrs: {
      label: "b",
      value: _vm.rgba.b
    },
    on: {
      change: function change($event) {
        return _vm.onInputChange("r", $event);
      }
    }
  })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
    staticClass: "vc-sketch-field--single"
  }, [_c("EditableInput", {
    attrs: {
      label: "a",
      value: _vm.rgba.a,
      step: 0.01
    },
    on: {
      change: function change($event) {
        return _vm.onInputChange("r", $event);
      }
    }
  })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "vc-sketch-presets",
    attrs: {
      role: "group"
    }
  }, [_vm._l(_vm.presetColors, function (c) {
    return [!_vm.isTransparent(c) ? _c("div", {
      key: c,
      staticClass: "vc-sketch-presets-color",
      style: {
        background: c
      },
      attrs: {
        "aria-label": "Color:" + c
      },
      on: {
        click: function click($event) {
          return _vm.onColorChange(c);
        }
      }
    }) : _c("div", {
      key: c,
      staticClass: "vc-sketch-presets-color",
      attrs: {
        "aria-label": "Color:" + c
      },
      on: {
        click: function click($event) {
          return _vm.onColorChange(c);
        }
      }
    }, [_c("checkboard")], 1)];
  })], 2)]);
};

var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;
/* style */

var __vue_inject_styles__$b = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e3367314_0", {
    source: "\n.vc-sketch {\n  position: relative;\n  width: 200px;\n  padding: 10px 10px 0;\n  box-sizing: initial;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);\n}\n.vc-sketch-saturation-wrap {\n  width: 100%;\n  padding-bottom: 75%;\n  position: relative;\n  overflow: hidden;\n}\n.vc-sketch-controls {\n  display: flex;\n}\n.vc-sketch-sliders {\n  padding: 4px 0;\n  flex: 1;\n}\n.vc-sketch-sliders .vc-hue,\n.vc-sketch-sliders .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-sketch-hue-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-sketch-alpha-wrap {\n  position: relative;\n  height: 10px;\n  margin-top: 4px;\n  overflow: hidden;\n}\n.vc-sketch-color-wrap {\n  width: 24px;\n  height: 24px;\n  position: relative;\n  margin-top: 4px;\n  margin-left: 4px;\n  border-radius: 3px;\n}\n.vc-sketch-active-color {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);\n  z-index: 2;\n}\n.vc-sketch-color-wrap .vc-checkerboard {\n  background-size: auto;\n}\n.vc-sketch-field {\n  display: flex;\n  padding-top: 4px;\n}\n.vc-sketch-field .vc-input__input {\n  width: 90%;\n  padding: 4px 0 3px 10%;\n  border: none;\n  box-shadow: inset 0 0 0 1px #ccc;\n  font-size: 10px;\n}\n.vc-sketch-field .vc-input__label {\n  display: block;\n  text-align: center;\n  font-size: 11px;\n  color: #222;\n  padding-top: 3px;\n  padding-bottom: 4px;\n  text-transform: capitalize;\n}\n.vc-sketch-field--single {\n  flex: 1;\n  padding-left: 6px;\n}\n.vc-sketch-field--double {\n  flex: 2;\n}\n.vc-sketch-presets {\n  margin-right: -10px;\n  margin-left: -10px;\n  padding-left: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #eee;\n}\n.vc-sketch-presets-color {\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n  display: inline-block;\n  margin: 0 10px 10px 0;\n  vertical-align: top;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n}\n.vc-sketch-presets-color .vc-checkerboard {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n  border-radius: 3px;\n}\n.vc-sketch__disable-alpha .vc-sketch-color-wrap {\n  height: 10px;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Sketch.vue"],
      "names": [],
      "mappings": ";AA6KA;EACA,kBAAA;EACA,YAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,uEAAA;AACA;AAEA;EACA,WAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,cAAA;EACA,OAAA;AACA;AAEA;;EAEA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;AACA;AAEA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,kBAAA;EACA,gFAAA;EACA,UAAA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;EACA,aAAA;EACA,gBAAA;AACA;AAEA;EACA,UAAA;EACA,sBAAA;EACA,YAAA;EACA,gCAAA;EACA,eAAA;AACA;AAEA;EACA,cAAA;EACA,kBAAA;EACA,eAAA;EACA,WAAA;EACA,gBAAA;EACA,mBAAA;EACA,0BAAA;AACA;AAEA;EACA,OAAA;EACA,iBAAA;AACA;AAEA;EACA,OAAA;AACA;AAEA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,iBAAA;EACA,0BAAA;AACA;AAEA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,mBAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,8CAAA;AACA;AAEA;EACA,8CAAA;EACA,kBAAA;AACA;AAEA;EACA,YAAA;AACA",
      "file": "Sketch.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"SketchColorPicker\"\n    :class=\"['vc-sketch', disableAlpha ? 'vc-sketch__disable-alpha' : '']\"\n  >\n    <div class=\"vc-sketch-saturation-wrap\">\n      <Saturation\n        :value=\"tc\"\n        @change=\"onColorChange\"\n      />\n    </div>\n    <div class=\"vc-sketch-controls\">\n      <div class=\"vc-sketch-sliders\">\n        <div class=\"vc-sketch-hue-wrap\">\n          <Hue\n            :value=\"tc\"\n            @change=\"onColorChange\"\n          />\n        </div>\n        <div\n          v-if=\"!disableAlpha\"\n          class=\"vc-sketch-alpha-wrap\"\n        >\n          <Alpha\n            :value=\"tc\"\n            @change=\"onAlphaChange\"\n          />\n        </div>\n      </div>\n      <div class=\"vc-sketch-color-wrap\">\n        <div\n          :aria-label = \"`Currentcolor: ${tc.toRgbString()}`\"\n          class=\"vc-sketch-active-color\"\n          :style=\"{background: tc.toRgbString()}\"\n        />\n        <Checkboard />\n      </div>\n    </div>\n    <div\n      v-if=\"!disableFields\"\n      class=\"vc-sketch-field\"\n    >\n      <!-- rgba -->\n      <div class=\"vc-sketch-field--double\">\n        <EditableInput\n          label=\"hex\"\n          :value=\"hex\"\n          @change=\"onColorChange\"\n        />\n      </div>\n      <div class=\"vc-sketch-field--single\">\n        <EditableInput\n          label=\"r\"\n          :value=\"rgba.r\"\n          @change=\"onInputChange('r', $event)\"\n        />\n      </div>\n      <div class=\"vc-sketch-field--single\">\n        <EditableInput\n          label=\"g\"\n          :value=\"rgba.g\"\n          @change=\"onInputChange('r', $event)\"\n        />\n      </div>\n      <div class=\"vc-sketch-field--single\">\n        <EditableInput\n          label=\"b\"\n          :value=\"rgba.b\"\n          @change=\"onInputChange('r', $event)\"\n        />\n      </div>\n      <div\n        v-if=\"!disableAlpha\"\n        class=\"vc-sketch-field--single\"\n      >\n        <EditableInput\n          label=\"a\"\n          :value=\"rgba.a\"\n          :step=\"0.01\"\n          @change=\"onInputChange('r', $event)\"\n        />\n      </div>\n    </div>\n    <div\n      class=\"vc-sketch-presets\"\n      role=\"group\"\n    >\n      <template v-for=\"c in presetColors\">\n        <div\n          v-if=\"!isTransparent(c)\"\n          :key=\"c\"\n          class=\"vc-sketch-presets-color\"\n          :aria-label=\"'Color:' + c\"\n          :style=\"{background: c}\"\n          @click=\"onColorChange(c)\"\n        />\n        <div\n          v-else\n          :key=\"c\"\n          :aria-label=\"'Color:' + c\"\n          class=\"vc-sketch-presets-color\"\n          @click=\"onColorChange(c)\"\n        >\n          <checkboard />\n        </div>\n      </template>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\nimport { hasAlpha, isTransparent } from '../utils';\n\nimport EditableInput from './common/EditableInput.vue'\nimport Saturation from './common/Saturation.vue'\nimport Hue from './common/Hue.vue'\nimport Alpha from './common/Alpha.vue'\nimport Checkboard from './common/Checkboard.vue'\n\nconst presetColors = [\n  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',\n  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',\n  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',\n  'rgba(0,0,0,0)'\n];\n\n@Component({\n  components: {EditableInput, Saturation, Hue, Alpha, Checkboard}\n})\nexport default class Sketch extends mixins(Color) {\n  @Prop({default: () => presetColors})\n  presetColors!: string[];\n\n  @Prop({default: false})\n  disableAlpha!: boolean;\n\n  @Prop({default: false})\n  disableFields!: boolean;\n\n  get hex() {\n    if (hasAlpha(this.tc)) {\n      return this.tc.toHex8();\n    } else {\n      return this.tc.toHex();\n    }\n  }\n\n  get rgba() {\n    return this.tc.toRgb();\n  }\n\n  isTransparent = isTransparent;\n\n  onAlphaChange(color: string) {\n    if (hasAlpha(color)  && this.getOutputFormat() === 'hex') {\n      this.setOutputFormat('hex8')\n    }\n    this.onColorChange(color);\n  }\n\n  onInputChange(label: 'r' | 'g' | 'b' | 'a', value: string) {\n    this.onColorChange({\n      ...this.rgba,\n      [label]: value\n    })\n  }\n}\n</script>\n\n<style>\n.vc-sketch {\n  position: relative;\n  width: 200px;\n  padding: 10px 10px 0;\n  box-sizing: initial;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);\n}\n\n.vc-sketch-saturation-wrap {\n  width: 100%;\n  padding-bottom: 75%;\n  position: relative;\n  overflow: hidden;\n}\n\n.vc-sketch-controls {\n  display: flex;\n}\n\n.vc-sketch-sliders {\n  padding: 4px 0;\n  flex: 1;\n}\n\n.vc-sketch-sliders .vc-hue,\n.vc-sketch-sliders .vc-alpha-gradient {\n  border-radius: 2px;\n}\n\n.vc-sketch-hue-wrap {\n  position: relative;\n  height: 10px;\n}\n\n.vc-sketch-alpha-wrap {\n  position: relative;\n  height: 10px;\n  margin-top: 4px;\n  overflow: hidden;\n}\n\n.vc-sketch-color-wrap {\n  width: 24px;\n  height: 24px;\n  position: relative;\n  margin-top: 4px;\n  margin-left: 4px;\n  border-radius: 3px;\n}\n\n.vc-sketch-active-color {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);\n  z-index: 2;\n}\n\n.vc-sketch-color-wrap .vc-checkerboard {\n  background-size: auto;\n}\n\n.vc-sketch-field {\n  display: flex;\n  padding-top: 4px;\n}\n\n.vc-sketch-field .vc-input__input {\n  width: 90%;\n  padding: 4px 0 3px 10%;\n  border: none;\n  box-shadow: inset 0 0 0 1px #ccc;\n  font-size: 10px;\n}\n\n.vc-sketch-field .vc-input__label {\n  display: block;\n  text-align: center;\n  font-size: 11px;\n  color: #222;\n  padding-top: 3px;\n  padding-bottom: 4px;\n  text-transform: capitalize;\n}\n\n.vc-sketch-field--single {\n  flex: 1;\n  padding-left: 6px;\n}\n\n.vc-sketch-field--double {\n  flex: 2;\n}\n\n.vc-sketch-presets {\n  margin-right: -10px;\n  margin-left: -10px;\n  padding-left: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #eee;\n}\n\n.vc-sketch-presets-color {\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n  display: inline-block;\n  margin: 0 10px 10px 0;\n  vertical-align: top;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n}\n\n.vc-sketch-presets-color .vc-checkerboard {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n  border-radius: 3px;\n}\n\n.vc-sketch__disable-alpha .vc-sketch-color-wrap {\n  height: 10px;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = undefined;
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, createInjector, undefined, undefined);

var _dec$c, _dec2$7, _dec3$5, _class$d, _class2$b, _descriptor$b, _descriptor2$5, _temp$c;
var Chrome = (_dec$c = Component({
  components: {
    EditableInput: __vue_component__$2,
    Saturation: __vue_component__$7,
    Hue: __vue_component__$4,
    Alpha: __vue_component__$a,
    Checkboard: __vue_component__$9
  }
}), _dec2$7 = Prop({
  "default": false
}), _dec3$5 = Prop({
  "default": false
}), _dec$c(_class$d = (_class2$b = (_temp$c = /*#__PURE__*/function (_mixins) {
  _inherits(Chrome, _mixins);

  var _super = _createSuper(Chrome);

  function Chrome() {
    var _this;

    _classCallCheck(this, Chrome);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "disableAlpha", _descriptor$b, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "disableFields", _descriptor2$5, _assertThisInitialized(_this));

    _this.fieldsIndex = 0;
    _this.highlight = false;
    return _this;
  }

  _createClass(Chrome, [{
    key: "toggleViews",
    value: function toggleViews() {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = 0;
        return;
      }

      this.fieldsIndex++;
    } // TODO: use css instead ?

  }, {
    key: "showHighlight",
    value: function showHighlight() {
      this.highlight = true;
    }
  }, {
    key: "hideHighlight",
    value: function hideHighlight() {
      this.highlight = false;
    }
  }, {
    key: "onAlphaChange",
    value: function onAlphaChange(color) {
      if (hasAlpha(color) && this.getOutputFormat() === 'hex') {
        this.setOutputFormat('hex8');
      }

      this.onColorChange(color);
    }
  }, {
    key: "inputChange",
    value: function inputChange(label, value) {
      if (label === 'r' || label === 'g' || label === 'b') {
        this.onColorChange(_objectSpread2({}, this.rgba, _defineProperty({}, label, value)));
      }

      if (label === 'h' || label === 's' || label === 'l') {
        this.onColorChange(_objectSpread2({}, this.hsl, _defineProperty({}, label, value)));
      }

      if (label = 'a') {
        this.onColorChange(this.tc.setAlpha(+value));
      }
    }
  }, {
    key: "rgba",
    get: function get() {
      return this.tc.toRgb();
    }
  }, {
    key: "hsl",
    get: function get() {
      return this.tc.toHsl();
    }
  }, {
    key: "hasAlpha",
    get: function get() {
      return this.tc.getAlpha() < 1;
    }
  }]);

  return Chrome;
}(mixins(Color)), _temp$c), (_descriptor$b = _applyDecoratedDescriptor(_class2$b.prototype, "disableAlpha", [_dec2$7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$5 = _applyDecoratedDescriptor(_class2$b.prototype, "disableFields", [_dec3$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$b)) || _class$d);

/* script */
var __vue_script__$c = Chrome;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    "class": ["vc-chrome", _vm.disableAlpha ? "vc-chrome__disable-alpha" : ""],
    attrs: {
      role: "ChromeColorPicker"
    }
  }, [_c("div", {
    staticClass: "vc-chrome-saturation-wrap"
  }, [_c("Saturation", {
    attrs: {
      value: _vm.tc
    },
    on: {
      change: _vm.onColorChange
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-chrome-body"
  }, [_c("div", {
    staticClass: "vc-chrome-controls"
  }, [_c("div", {
    staticClass: "vc-chrome-color-wrap"
  }, [_c("div", {
    staticClass: "vc-chrome-active-color",
    style: {
      background: _vm.tc.toRgbString()
    }
  }), _vm._v(" "), !_vm.disableAlpha ? _c("Checkboard") : _vm._e()], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-chrome-sliders"
  }, [_c("div", {
    staticClass: "vc-chrome-hue-wrap"
  }, [_c("Hue", {
    attrs: {
      value: _vm.tc
    },
    on: {
      change: _vm.onColorChange
    }
  })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
    staticClass: "vc-chrome-alpha-wrap"
  }, [_c("Alpha", {
    attrs: {
      value: _vm.tc
    },
    on: {
      change: _vm.onAlphaChange
    }
  })], 1) : _vm._e()])]), _vm._v(" "), !_vm.disableFields ? _c("div", {
    staticClass: "vc-chrome-fields-wrap"
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.fieldsIndex === 0,
      expression: "fieldsIndex === 0"
    }],
    staticClass: "vc-chrome-fields"
  }, [_c("div", {
    staticClass: "vc-chrome-field"
  }, [!_vm.hasAlpha ? _c("EditableInput", {
    attrs: {
      label: "hex",
      value: _vm.tc.toHexString()
    },
    on: {
      change: _vm.onColorChange
    }
  }) : _vm._e(), _vm._v(" "), _vm.hasAlpha ? _c("EditableInput", {
    attrs: {
      label: "hex",
      value: _vm.tc.toHex8String()
    },
    on: {
      change: _vm.onColorChange
    }
  }) : _vm._e()], 1)]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.fieldsIndex === 1,
      expression: "fieldsIndex === 1"
    }],
    staticClass: "vc-chrome-fields"
  }, [_c("div", {
    staticClass: "vc-chrome-field"
  }, [_c("EditableInput", {
    attrs: {
      label: "r",
      value: _vm.rgba.r
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("r", $event);
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-chrome-field"
  }, [_c("EditableInput", {
    attrs: {
      label: "g",
      value: _vm.rgba.g
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("g", $event);
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-chrome-field"
  }, [_c("EditableInput", {
    attrs: {
      label: "b",
      value: _vm.rgba.b
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("b", $event);
      }
    }
  })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
    staticClass: "vc-chrome-field"
  }, [_c("EditableInput", {
    attrs: {
      label: "a",
      value: _vm.rgba.a,
      step: 0.01
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("a", $event);
      }
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.fieldsIndex === 2,
      expression: "fieldsIndex === 2"
    }],
    staticClass: "vc-chrome-fields"
  }, [_c("div", {
    staticClass: "vc-chrome-field"
  }, [_c("EditableInput", {
    attrs: {
      label: "h",
      value: _vm.hsl.h
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("h", $event);
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-chrome-field"
  }, [_c("EditableInput", {
    attrs: {
      label: "s",
      value: (_vm.hsl.s * 100).toFixed() + "%"
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("s", $event);
      }
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vc-chrome-field"
  }, [_c("EditableInput", {
    attrs: {
      label: "l",
      value: (_vm.hsl.l * 100).toFixed() + "%"
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("l", $event);
      }
    }
  })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
    staticClass: "vc-chrome-field"
  }, [_c("EditableInput", {
    attrs: {
      label: "a",
      value: _vm.hsl.a,
      step: 0.01
    },
    on: {
      change: function change($event) {
        return _vm.inputChange("a", $event);
      }
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "vc-chrome-toggle-btn",
    attrs: {
      role: "button",
      "aria-label": "Change another color definition"
    },
    on: {
      click: _vm.toggleViews
    }
  }, [_c("div", {
    staticClass: "vc-chrome-toggle-icon"
  }, [_c("svg", {
    staticStyle: {
      width: "24px",
      height: "24px"
    },
    attrs: {
      viewBox: "0 0 24 24"
    },
    on: {
      mouseover: _vm.showHighlight,
      mouseenter: _vm.showHighlight,
      mouseout: _vm.hideHighlight
    }
  }, [_c("path", {
    attrs: {
      fill: "#333",
      d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
    }
  })])]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.highlight,
      expression: "highlight"
    }],
    staticClass: "vc-chrome-toggle-icon-highlight"
  })])]) : _vm._e()])]);
};

var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;
/* style */

var __vue_inject_styles__$c = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6b37dafd_0", {
    source: "\n.vc-chrome {\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);\n  box-sizing: initial;\n  width: 225px;\n  font-family: Menlo;\n  background-color: #fff;\n}\n.vc-chrome-controls {\n  display: flex;\n}\n.vc-chrome-color-wrap {\n  position: relative;\n  width: 36px;\n}\n.vc-chrome-active-color {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  overflow: hidden;\n  z-index: 1;\n}\n.vc-chrome-color-wrap .vc-checkerboard {\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-size: auto;\n}\n.vc-chrome-sliders {\n  flex: 1;\n}\n.vc-chrome-fields-wrap {\n  display: flex;\n  padding-top: 16px;\n}\n.vc-chrome-fields {\n  display: flex;\n  margin-left: -6px;\n  flex: 1;\n}\n.vc-chrome-field {\n  padding-left: 6px;\n  width: 100%;\n}\n.vc-chrome-toggle-btn {\n  width: 32px;\n  text-align: right;\n  position: relative;\n}\n.vc-chrome-toggle-icon {\n  margin-right: -4px;\n  margin-top: 12px;\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n}\n.vc-chrome-toggle-icon-highlight {\n  position: absolute;\n  width: 24px;\n  height: 28px;\n  background: #eee;\n  border-radius: 4px;\n  top: 10px;\n  left: 12px;\n}\n.vc-chrome-hue-wrap {\n  position: relative;\n  height: 10px;\n  margin-bottom: 8px;\n}\n.vc-chrome-alpha-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-chrome-hue-wrap .vc-hue {\n  border-radius: 2px;\n}\n.vc-chrome-alpha-wrap .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  transform: translate(-6px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-chrome-body {\n  padding: 16px 16px 12px;\n  background-color: #fff;\n}\n.vc-chrome-saturation-wrap {\n  width: 100%;\n  padding-bottom: 55%;\n  position: relative;\n  border-radius: 2px 2px 0 0;\n  overflow: hidden;\n}\n.vc-chrome-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n.vc-chrome-fields .vc-input__input {\n  font-size: 11px;\n  color: #333;\n  width: 100%;\n  border-radius: 2px;\n  border: none;\n  box-shadow: inset 0 0 0 1px #dadada;\n  height: 21px;\n  text-align: center;\n}\n.vc-chrome-fields .vc-input__label {\n  text-transform: uppercase;\n  font-size: 11px;\n  line-height: 11px;\n  color: #969696;\n  text-align: center;\n  display: block;\n  margin-top: 12px;\n}\n.vc-chrome__disable-alpha .vc-chrome-active-color {\n  width: 18px;\n  height: 18px;\n}\n.vc-chrome__disable-alpha .vc-chrome-color-wrap {\n  width: 30px;\n}\n.vc-chrome__disable-alpha .vc-chrome-hue-wrap {\n  margin-top: 4px;\n  margin-bottom: 4px;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Chrome.vue"],
      "names": [],
      "mappings": ";AAmPA;EACA,gBAAA;EACA,kBAAA;EACA,4DAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,sBAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,UAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,qBAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,aAAA;EACA,iBAAA;AACA;AACA;EACA,aAAA;EACA,iBAAA;EACA,OAAA;AACA;AACA;EACA,iBAAA;EACA,WAAA;AACA;AACA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;AACA;AACA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,YAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gCAAA;EACA,oCAAA;EACA,2CAAA;AACA;AACA;EACA,uBAAA;EACA,sBAAA;AACA;AACA;EACA,WAAA;EACA,mBAAA;EACA,kBAAA;EACA,0BAAA;EACA,gBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,eAAA;EACA,WAAA;EACA,WAAA;EACA,kBAAA;EACA,YAAA;EACA,mCAAA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,yBAAA;EACA,eAAA;EACA,iBAAA;EACA,cAAA;EACA,kBAAA;EACA,cAAA;EACA,gBAAA;AACA;AAEA;EACA,WAAA;EACA,YAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;AACA",
      "file": "Chrome.vue",
      "sourcesContent": ["<template>\n  <div\n    role=\"ChromeColorPicker\"\n    :class=\"['vc-chrome', disableAlpha ? 'vc-chrome__disable-alpha' : '']\"\n  >\n    <div class=\"vc-chrome-saturation-wrap\">\n      <Saturation :value=\"tc\" @change=\"onColorChange\" />\n    </div>\n    <div class=\"vc-chrome-body\">\n      <div class=\"vc-chrome-controls\">\n        <div class=\"vc-chrome-color-wrap\">\n          <div\n            class=\"vc-chrome-active-color\"\n            :style=\"{background: tc.toRgbString()}\"\n          />\n          <Checkboard v-if=\"!disableAlpha\" />\n        </div>\n\n        <div class=\"vc-chrome-sliders\">\n          <div class=\"vc-chrome-hue-wrap\">\n            <Hue :value=\"tc\" @change=\"onColorChange\" />\n          </div>\n          <div\n            v-if=\"!disableAlpha\"\n            class=\"vc-chrome-alpha-wrap\"\n          >\n            <Alpha :value=\"tc\" @change=\"onAlphaChange\" />\n          </div>\n        </div>\n      </div>\n\n      <div\n        v-if=\"!disableFields\"\n        class=\"vc-chrome-fields-wrap\"\n      >\n        <div\n          v-show=\"fieldsIndex === 0\"\n          class=\"vc-chrome-fields\"\n        >\n          <!-- hex -->\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              v-if=\"!hasAlpha\"\n              label=\"hex\"\n              :value=\"tc.toHexString()\"\n              @change=\"onColorChange\"\n            />\n            <EditableInput\n              v-if=\"hasAlpha\"\n              label=\"hex\"\n              :value=\"tc.toHex8String()\"\n              @change=\"onColorChange\"\n            />\n          </div>\n        </div>\n        <div\n          v-show=\"fieldsIndex === 1\"\n          class=\"vc-chrome-fields\"\n        >\n          <!-- rgba -->\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"r\"\n              :value=\"rgba.r\"\n              @change=\"inputChange('r', $event)\"\n            />\n          </div>\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"g\"\n              :value=\"rgba.g\"\n              @change=\"inputChange('g', $event)\"\n            />\n          </div>\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"b\"\n              :value=\"rgba.b\"\n              @change=\"inputChange('b', $event)\"\n            />\n          </div>\n          <div\n            v-if=\"!disableAlpha\"\n            class=\"vc-chrome-field\"\n          >\n            <EditableInput\n              label=\"a\"\n              :value=\"rgba.a\"\n              :step=\"0.01\"\n              @change=\"inputChange('a', $event)\"\n            />\n          </div>\n        </div>\n        <div\n          v-show=\"fieldsIndex === 2\"\n          class=\"vc-chrome-fields\"\n        >\n          <!-- hsla -->\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"h\"\n              :value=\"hsl.h\"\n              @change=\"inputChange('h', $event)\"\n            />\n          </div>\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"s\"\n              :value=\"`${(hsl.s * 100).toFixed()}%`\"\n              @change=\"inputChange('s', $event)\"\n            />\n          </div>\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"l\"\n              :value=\"`${(hsl.l * 100).toFixed()}%`\"\n              @change=\"inputChange('l', $event)\"\n            />\n          </div>\n          <div\n            v-if=\"!disableAlpha\"\n            class=\"vc-chrome-field\"\n          >\n            <EditableInput\n              label=\"a\"\n              :value=\"hsl.a\"\n              :step=\"0.01\"\n              @change=\"inputChange('a', $event)\"\n            />\n          </div>\n        </div>\n        <!-- btn -->\n        <div\n          class=\"vc-chrome-toggle-btn\"\n          role=\"button\"\n          aria-label=\"Change another color definition\"\n          @click=\"toggleViews\"\n        >\n          <div class=\"vc-chrome-toggle-icon\">\n            <svg\n              style=\"width:24px; height:24px\"\n              viewBox=\"0 0 24 24\"\n              @mouseover=\"showHighlight\"\n              @mouseenter=\"showHighlight\"\n              @mouseout=\"hideHighlight\"\n            >\n              <path\n                fill=\"#333\"\n                d=\"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z\"\n              />\n            </svg>\n          </div>\n          <div\n            v-show=\"highlight\"\n            class=\"vc-chrome-toggle-icon-highlight\"\n          />\n        </div>\n        <!-- btn -->\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\nimport { hasAlpha } from '../utils';\n\nimport EditableInput from './common/EditableInput.vue'\nimport Saturation from './common/Saturation.vue'\nimport Hue from './common/Hue.vue'\nimport Alpha from './common/Alpha.vue'\nimport Checkboard from './common/Checkboard.vue'\n\n@Component({\n  components: { EditableInput, Saturation, Hue, Alpha, Checkboard }\n})\nexport default class Chrome extends mixins(Color) {\n  @Prop({default: false})\n  disableAlpha !: boolean;\n\n  @Prop({default: false})\n  disableFields !: boolean;\n\n  fieldsIndex = 0;\n  highlight = false;\n\n  get rgba() {\n    return this.tc.toRgb();\n  }\n\n  get hsl() {\n    return this.tc.toHsl();\n  }\n\n  get hasAlpha() {\n    return this.tc.getAlpha() < 1;\n  }\n\n  toggleViews () {\n    if (this.fieldsIndex >= 2) {\n      this.fieldsIndex = 0;\n      return;\n    }\n    this.fieldsIndex ++;\n  }\n  // TODO: use css instead ?\n  showHighlight () {\n    this.highlight = true;\n  }\n  hideHighlight () {\n    this.highlight = false;\n  }\n\n  onAlphaChange(color: string) {\n    if (hasAlpha(color)  && this.getOutputFormat() === 'hex') {\n      this.setOutputFormat('hex8')\n    }\n    this.onColorChange(color);\n  }\n\n  inputChange(label: 'r' | 'g' | 'b' | 'a' | 'h' | 's' | 'l', value: string | number) {\n    if (label === 'r' || label === 'g' || label === 'b') {\n      this.onColorChange({\n        ...this.rgba,\n        [label]: value\n      })\n    }\n    if (label === 'h' || label === 's' || label === 'l') {\n      this.onColorChange({\n        ...this.hsl,\n        [label]: value\n      })\n    }\n    if (label = 'a') {\n      this.onColorChange(this.tc.setAlpha(+value));\n    }\n  }\n}\n</script>\n\n<style>\n.vc-chrome {\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);\n  box-sizing: initial;\n  width: 225px;\n  font-family: Menlo;\n  background-color: #fff;\n}\n.vc-chrome-controls {\n  display: flex;\n}\n.vc-chrome-color-wrap {\n  position: relative;\n  width: 36px;\n}\n.vc-chrome-active-color {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  overflow: hidden;\n  z-index: 1;\n}\n.vc-chrome-color-wrap .vc-checkerboard {\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-size: auto;\n}\n.vc-chrome-sliders {\n  flex: 1;\n}\n.vc-chrome-fields-wrap {\n  display: flex;\n  padding-top: 16px;\n}\n.vc-chrome-fields {\n  display: flex;\n  margin-left: -6px;\n  flex: 1;\n}\n.vc-chrome-field {\n  padding-left: 6px;\n  width: 100%;\n}\n.vc-chrome-toggle-btn {\n  width: 32px;\n  text-align: right;\n  position: relative;\n}\n.vc-chrome-toggle-icon {\n  margin-right: -4px;\n  margin-top: 12px;\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n}\n.vc-chrome-toggle-icon-highlight {\n  position: absolute;\n  width: 24px;\n  height: 28px;\n  background: #eee;\n  border-radius: 4px;\n  top: 10px;\n  left: 12px;\n}\n.vc-chrome-hue-wrap {\n  position: relative;\n  height: 10px;\n  margin-bottom: 8px;\n}\n.vc-chrome-alpha-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-chrome-hue-wrap .vc-hue {\n  border-radius: 2px;\n}\n.vc-chrome-alpha-wrap .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  transform: translate(-6px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-chrome-body {\n  padding: 16px 16px 12px;\n  background-color: #fff;\n}\n.vc-chrome-saturation-wrap {\n  width: 100%;\n  padding-bottom: 55%;\n  position: relative;\n  border-radius: 2px 2px 0 0;\n  overflow: hidden;\n}\n.vc-chrome-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n\n.vc-chrome-fields .vc-input__input {\n  font-size: 11px;\n  color: #333;\n  width: 100%;\n  border-radius: 2px;\n  border: none;\n  box-shadow: inset 0 0 0 1px #dadada;\n  height: 21px;\n  text-align: center;\n}\n.vc-chrome-fields .vc-input__label {\n  text-transform: uppercase;\n  font-size: 11px;\n  line-height: 11px;\n  color: #969696;\n  text-align: center;\n  display: block;\n  margin-top: 12px;\n}\n\n.vc-chrome__disable-alpha .vc-chrome-active-color {\n  width: 18px;\n  height: 18px;\n}\n.vc-chrome__disable-alpha .vc-chrome-color-wrap {\n  width: 30px;\n}\n.vc-chrome__disable-alpha .vc-chrome-hue-wrap {\n  margin-top: 4px;\n  margin-bottom: 4px;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = undefined;
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, createInjector, undefined, undefined);

var version = '2.6.0';

export { __vue_component__$a as Alpha, __vue_component__$9 as Checkboard, __vue_component__$c as Chrome, __vue_component__ as Compact, __vue_component__$2 as EditableInput, __vue_component__$1 as Grayscale, __vue_component__$4 as Hue, __vue_component__$3 as Material, __vue_component__$8 as Photoshop, __vue_component__$7 as Saturation, __vue_component__$b as Sketch, __vue_component__$5 as Slider, __vue_component__$6 as Swatches, version };
