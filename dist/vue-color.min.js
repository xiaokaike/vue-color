(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.vueColor = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
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

  function _typeof$1(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
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
    var type = _typeof$1(value);

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
              return _defineProperty({}, key, descriptor.value);
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

  function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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

  function _createSuper$1(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$1()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var defaultColors = ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];
  var Compact = (_dec = Prop({
    "default": function _default() {
      return defaultColors;
    }
  }), Component(_class$1 = (_class2 = (_temp$1 = /*#__PURE__*/function (_mixins) {
    _inherits(Compact, _mixins);

    var _super = _createSuper$1(Compact);

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

    return _c('div', {
      staticClass: "vc-compact",
      attrs: {
        "role": "CompactColorPicker"
      }
    }, [_c('ul', {
      staticClass: "vc-compact-colors",
      attrs: {
        "role": "option"
      }
    }, _vm._l(_vm.palette, function (c) {
      return _c('li', {
        key: c,
        staticClass: "vc-compact-color-item",
        "class": {
          'vc-compact-color-item--white': c === '#FFFFFF'
        },
        style: {
          background: c
        },
        attrs: {
          "aria-label": 'Color:' + c
        },
        on: {
          "click": function click($event) {
            return _vm.onColorChange(c);
          }
        }
      }, [_c('div', {
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
  /* style */

  var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-219e7b26_0", {
      source: ".vc-compact{padding-top:5px;padding-left:5px;width:240px;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);background-color:#fff}.vc-compact-colors{overflow:hidden;padding:0;margin:0}.vc-compact-color-item{list-style:none;width:15px;height:15px;float:left;margin-right:5px;margin-bottom:5px;position:relative;cursor:pointer}.vc-compact-color-item--white{box-shadow:inset 0 0 0 1px #ddd}.vc-compact-color-item--white .vc-compact-dot{background:#000}.vc-compact-dot{position:absolute;top:5px;right:5px;bottom:5px;left:5px;border-radius:50%;opacity:1;background:#fff}",
      map: undefined,
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

  function _createSuper$2(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$2()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var defaultPalatte = ['#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3', '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959', '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000'];
  var Grayscale = (_dec$1 = Prop({
    "default": function _default() {
      return defaultPalatte;
    }
  }), Component(_class$2 = (_class2$1 = (_temp$2 = /*#__PURE__*/function (_mixins) {
    _inherits(Grayscale, _mixins);

    var _super = _createSuper$2(Grayscale);

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

    return _c('div', {
      staticClass: "vc-grayscale",
      attrs: {
        "role": "GrayscaleColorPicker"
      }
    }, [_c('ul', {
      staticClass: "vc-grayscale-colors",
      attrs: {
        "role": "option"
      }
    }, _vm._l(_vm.palette, function (c) {
      return _c('li', {
        key: c,
        staticClass: "vc-grayscale-color-item",
        "class": {
          'vc-grayscale-color-item--white': c == '#FFFFFF'
        },
        style: {
          background: c
        },
        attrs: {
          "aria-label": 'Color:' + c
        },
        on: {
          "click": function click($event) {
            return _vm.handlerClick(c);
          }
        }
      }, [_c('div', {
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
  /* style */

  var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-ea26c37c_0", {
      source: ".vc-grayscale{width:125px;border-radius:2px;box-shadow:0 2px 15px rgba(0,0,0,.12),0 2px 10px rgba(0,0,0,.16);background-color:#fff}.vc-grayscale-colors{border-radius:2px;overflow:hidden;padding:0;margin:0}.vc-grayscale-color-item{list-style:none;width:25px;height:25px;float:left;position:relative;cursor:pointer}.vc-grayscale-color-item--white .vc-grayscale-dot{background:#000}.vc-grayscale-dot{position:absolute;top:50%;left:50%;width:6px;height:6px;margin:-3px 0 0 -2px;border-radius:50%;opacity:1;background:#fff}",
      map: undefined,
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

  var clamp_1 = clamp;

  function clamp(value, min, max) {
    return min < max
      ? (value < min ? min : value > max ? max : value)
      : (value < max ? max : value > min ? min : value)
  }

  var _dec$2, _dec2, _dec3, _dec4, _dec5, _class$3, _class2$2, _descriptor$2, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp$3;

  function _createSuper$3(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$3()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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

    var _super = _createSuper$3(EditableInput);

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

    return _c('div', {
      staticClass: "vc-editable-input"
    }, [_c('input', {
      ref: "input",
      staticClass: "vc-input__input",
      attrs: {
        "aria-label": _vm.desc ? _vm.label + '(' + _vm.desc + ')' : _vm.label
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "keydown": _vm.handleKeyDown,
        "input": _vm.handleInput
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "vc-input__label",
      attrs: {
        "for": _vm.label
      }
    }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('span', {
      staticClass: "vc-input__desc"
    }, [_vm._v(_vm._s(_vm.desc))])]);
  };

  var __vue_staticRenderFns__$2 = [];
  /* style */

  var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-1d9ea8fa_0", {
      source: ".vc-editable-input{position:relative}.vc-input__input{padding:0;border:0;outline:0}.vc-input__label{text-transform:capitalize}",
      map: undefined,
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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$4(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$4()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var Material = (_dec$3 = Component({
    components: {
      EditableInput: __vue_component__$2
    }
  }), _dec$3(_class$4 = /*#__PURE__*/function (_mixins) {
    _inherits(Material, _mixins);

    var _super = _createSuper$4(Material);

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

        this.onColorChange(_objectSpread({}, this.rgba, {}, _defineProperty$1({}, label, data)));
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

    return _c('div', {
      staticClass: "vc-material",
      attrs: {
        "role": "MaterialColorPicker"
      }
    }, [_c('EditableInput', {
      staticClass: "vc-material-hex",
      style: {
        borderColor: _vm.hex
      },
      attrs: {
        "label": "hex",
        "value": _vm.hex
      },
      on: {
        "change": _vm.onChangeHex
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "vc-material-split"
    }, [_c('div', {
      staticClass: "vc-material-third"
    }, [_c('EditableInput', {
      attrs: {
        "label": "r",
        "value": _vm.rgba && _vm.rgba.r
      },
      on: {
        "change": function change($event) {
          return _vm.onChange('r', $event);
        }
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-material-third"
    }, [_c('EditableInput', {
      attrs: {
        "label": "g",
        "value": _vm.rgba && _vm.rgba.g
      },
      on: {
        "change": function change($event) {
          return _vm.onChange('g', $event);
        }
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-material-third"
    }, [_c('EditableInput', {
      attrs: {
        "label": "b",
        "value": _vm.rgba && _vm.rgba.b
      },
      on: {
        "change": function change($event) {
          return _vm.onChange('b', $event);
        }
      }
    })], 1)])], 1);
  };

  var __vue_staticRenderFns__$3 = [];
  /* style */

  var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-37c532a3_0", {
      source: ".vc-material{width:98px;height:98px;padding:16px;font-family:Roboto;position:relative;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);background-color:#fff}.vc-material .vc-input__input{width:100%;margin-top:12px;font-size:15px;color:#333;height:30px}.vc-material .vc-input__label{position:absolute;top:0;left:0;font-size:11px;color:#999;text-transform:capitalize}.vc-material-hex{border-bottom-width:2px;border-bottom-style:solid}.vc-material-split{display:flex;margin-right:-10px;padding-top:11px}.vc-material-third{flex:1;padding-right:10px}",
      map: undefined,
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

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$5(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$5()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var Hue = (_dec$4 = Prop({
    "default": 'horizontal'
  }), _dec2$1 = Ref('container'), _dec3$1 = Watch('hsl'), Component(_class$5 = (_class2$3 = (_temp$4 = /*#__PURE__*/function (_mixins) {
    _inherits(Hue, _mixins);

    var _super = _createSuper$5(Hue);

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
          this.onColorChange(_objectSpread$1({}, this.hsl, {}, {
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

    return _c('div', {
      "class": ['vc-hue', _vm.directionClass],
      attrs: {
        "role": "HuePanel"
      }
    }, [_c('div', {
      ref: "container",
      staticClass: "vc-hue-container",
      on: {
        "mousedown": _vm.handleMouseDown,
        "touchmove": _vm.handleTouchEvnet,
        "touchstart": _vm.handleTouchEvnet
      }
    }, [_c('div', {
      staticClass: "vc-hue-pointer",
      style: {
        top: _vm.pointerTop,
        left: _vm.pointerLeft
      },
      attrs: {
        "role": "CurrentHuePointer"
      }
    }, [_c('div', {
      staticClass: "vc-hue-picker"
    })])])]);
  };

  var __vue_staticRenderFns__$4 = [];
  /* style */

  var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-579123e4_0", {
      source: ".vc-hue{position:absolute;top:0;right:0;bottom:0;left:0;border-radius:2px}.vc-hue--horizontal{background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}.vc-hue--vertical{background:linear-gradient(to top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}.vc-hue-container{cursor:pointer;margin:0 2px;position:relative;height:100%}.vc-hue-pointer{z-index:2;position:absolute}.vc-hue-picker{cursor:pointer;margin-top:1px;width:4px;border-radius:1px;height:8px;box-shadow:0 0 2px rgba(0,0,0,.6);background:#fff;transform:translateX(-2px)}.vc-hue--vertical .vc-hue-picker{transform:translateX(-2px) translateY(-50%)}",
      map: undefined,
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

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$6(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$6()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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

    var _super = _createSuper$6(Slider);

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
        this.onColorChange(_objectSpread$2({}, this.hsl, {
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

    return _c('div', {
      staticClass: "vc-slider",
      attrs: {
        "role": "SliderColorPicker"
      }
    }, [_c('div', {
      staticClass: "vc-slider-hue-warp"
    }, [_c('Hue', {
      attrs: {
        "value": _vm.tc
      },
      on: {
        "change": _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-slider-swatches",
      attrs: {
        "role": "group"
      }
    }, _vm._l(_vm.swatches, function (offset, index) {
      return _c('div', {
        key: index,
        staticClass: "vc-slider-swatch",
        attrs: {
          "data-index": index
        },
        on: {
          "click": function click($event) {
            return _vm.handleSwClick(offset);
          }
        }
      }, [_c('div', {
        staticClass: "vc-slider-swatch-picker",
        "class": {
          'vc-slider-swatch-picker--active': offset == _vm.activeOffset,
          'vc-slider-swatch-picker--white': offset === '1'
        },
        style: {
          background: 'hsl(' + _vm.hsl.h + ', 50%, ' + offset * 100 + '%)'
        },
        attrs: {
          "aria-label": 'color:' + 'hsl(' + _vm.hsl.h + ', 50%, ' + offset * 100 + '%)'
        }
      })]);
    }), 0)]);
  };

  var __vue_staticRenderFns__$5 = [];
  /* style */

  var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-7d76e88d_0", {
      source: ".vc-slider{position:relative;width:410px}.vc-slider-hue-warp{height:12px;position:relative}.vc-slider-hue-warp .vc-hue-picker{width:14px;height:14px;border-radius:6px;transform:translate(-7px,-2px);background-color:#f8f8f8;box-shadow:0 1px 4px 0 rgba(0,0,0,.37)}.vc-slider-swatches{display:flex;margin-top:20px}.vc-slider-swatch{margin-right:1px;flex:1;width:20%}.vc-slider-swatch:first-child{margin-right:1px}.vc-slider-swatch:first-child .vc-slider-swatch-picker{border-radius:2px 0 0 2px}.vc-slider-swatch:last-child{margin-right:0}.vc-slider-swatch:last-child .vc-slider-swatch-picker{border-radius:0 2px 2px 0}.vc-slider-swatch-picker{cursor:pointer;height:12px}.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active{transform:scaleY(1.8);border-radius:3.6px/2px}.vc-slider-swatch-picker--white{box-shadow:inset 0 0 0 1px #ddd}.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white{box-shadow:inset 0 0 0 .6px #ddd}",
      map: undefined,
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

  function _createSuper$7(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$7()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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

    var _super = _createSuper$7(Swatches);

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

    return _c('div', {
      staticClass: "vc-swatches",
      attrs: {
        "role": "SwatchesColorPicker",
        "data-pick": _vm.pick
      }
    }, [_c('div', {
      staticClass: "vc-swatches-box",
      attrs: {
        "role": "group"
      }
    }, _vm._l(_vm.palette, function (group, $idx) {
      return _c('div', {
        key: $idx,
        staticClass: "vc-swatches-color-group"
      }, _vm._l(group, function (c) {
        return _c('div', {
          key: c,
          "class": ['vc-swatches-color-it', {
            'vc-swatches-color--white': c === '#FFFFFF'
          }],
          style: {
            background: c
          },
          attrs: {
            "aria-label": 'Color:' + c,
            "data-color": c
          },
          on: {
            "click": function click($event) {
              return _vm.handlerClick(c);
            }
          }
        }, [_c('div', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: _vm.equals(c),
            expression: "equals(c)"
          }],
          staticClass: "vc-swatches-pick"
        }, [_c('svg', {
          staticStyle: {
            "width": "24px",
            "height": "24px"
          },
          attrs: {
            "viewBox": "0 0 24 24"
          }
        }, [_c('path', {
          attrs: {
            "d": "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
          }
        })])])]);
      }), 0);
    }), 0)]);
  };

  var __vue_staticRenderFns__$6 = [];
  /* style */

  var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-2b663370_0", {
      source: ".vc-swatches{width:320px;height:240px;overflow-y:scroll;background-color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16)}.vc-swatches-box{padding:16px 0 6px 16px;overflow:hidden}.vc-swatches-color-group{padding-bottom:10px;width:40px;float:left;margin-right:10px}.vc-swatches-color-it{box-sizing:border-box;width:40px;height:24px;cursor:pointer;background:#880e4f;margin-bottom:1px;overflow:hidden;-ms-border-radius:2px 2px 0 0;-moz-border-radius:2px 2px 0 0;-o-border-radius:2px 2px 0 0;-webkit-border-radius:2px 2px 0 0;border-radius:2px 2px 0 0}.vc-swatches-color--white{border:1px solid #ddd}.vc-swatches-pick{fill:#fff;margin-left:8px;display:block}.vc-swatches-color--white .vc-swatches-pick{fill:#333}",
      map: undefined,
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

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$8(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$8()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var Saturation = (_dec$7 = Ref('container'), Component(_class$8 = (_class2$6 = (_temp$7 = /*#__PURE__*/function (_mixins) {
    _inherits(Saturation, _mixins);

    var _super = _createSuper$8(Saturation);

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
        this.throttle(this.onColorChange, _objectSpread$3({}, this.hsv, {}, {
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

    return _c('div', {
      ref: "container",
      staticClass: "vc-saturation",
      style: {
        background: _vm.bgColor
      },
      attrs: {
        "role": "SaturationPanel"
      },
      on: {
        "mousedown": _vm.handleMouseDown,
        "touchmove": _vm.handleTouchEvents,
        "touchstart": _vm.handleTouchEvents
      }
    }, [_c('div', {
      staticClass: "vc-saturation--white"
    }), _vm._v(" "), _c('div', {
      staticClass: "vc-saturation--black"
    }), _vm._v(" "), _c('div', {
      staticClass: "vc-saturation-pointer",
      style: {
        top: _vm.pointerTop,
        left: _vm.pointerLeft
      },
      attrs: {
        "role": "CurrentSaturationPointer"
      }
    }, [_c('div', {
      staticClass: "vc-saturation-circle"
    })])]);
  };

  var __vue_staticRenderFns__$7 = [];
  /* style */

  var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-7500df3c_0", {
      source: ".vc-saturation,.vc-saturation--black,.vc-saturation--white{cursor:pointer;position:absolute;top:0;left:0;right:0;bottom:0;-webkit-tap-highlight-color:transparent}.vc-saturation--white{background:linear-gradient(to right,#fff,rgba(255,255,255,0))}.vc-saturation--black{background:linear-gradient(to top,#000,rgba(0,0,0,0))}.vc-saturation-pointer{cursor:pointer;position:absolute}.vc-saturation-circle{cursor:head;width:4px;height:4px;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);border-radius:50%;transform:translate(-2px,-2px)}",
      map: undefined,
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

  function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$9(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$9()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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

    var _super = _createSuper$9(Photoshop);

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
          this.onColorChange(_objectSpread$4({}, this.rgba, _defineProperty$1({}, label, color)));
          return;
        }

        if (label === 'h' || label === 's' || label === 'v') {
          this.onColorChange(_objectSpread$4({}, this.tc.toHsv(), _defineProperty$1({}, label, color)));
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

    return _c('div', {
      "class": ['vc-photoshop', _vm.disableFields ? 'vc-photoshop__disable-fields' : ''],
      attrs: {
        "role": "PhotoShopColorPicker"
      }
    }, [_c('div', {
      staticClass: "vc-ps-head"
    }, [_vm._v(_vm._s(_vm.head))]), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-body"
    }, [_c('div', {
      staticClass: "vc-ps-saturation-wrap"
    }, [_c('Saturation', {
      attrs: {
        "value": _vm.tc
      },
      on: {
        "change": _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-hue-wrap"
    }, [_c('hue', {
      attrs: {
        "value": _vm.tc,
        "direction": "vertical"
      },
      on: {
        "change": _vm.onColorChange
      }
    }, [_c('div', {
      staticClass: "vc-ps-hue-pointer"
    }, [_c('i', {
      staticClass: "vc-ps-hue-pointer--left"
    }), _vm._v(" "), _c('i', {
      staticClass: "vc-ps-hue-pointer--right"
    })])])], 1), _vm._v(" "), _c('div', {
      "class": ['vc-ps-controls', _vm.disableFields ? 'vc-ps-controls__disable-fields' : '']
    }, [_c('div', {
      staticClass: "vc-ps-previews"
    }, [_c('div', {
      staticClass: "vc-ps-previews__label"
    }, [_vm._v("new")]), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-previews__swatches"
    }, [_c('div', {
      staticClass: "vc-ps-previews__pr-color",
      style: {
        background: _vm.hex
      },
      attrs: {
        "aria-label": 'NewColor:' + _vm.hex
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-previews__pr-color",
      style: {
        background: _vm.currentColor
      },
      attrs: {
        "aria-label": 'CurrentColor:' + _vm.currentColor
      },
      on: {
        "click": _vm.clickCurrentColor
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-previews__label"
    }, [_vm._v("current")])]), _vm._v(" "), !_vm.disableFields ? _c('div', {
      staticClass: "vc-ps-actions"
    }, [_c('div', {
      staticClass: "vc-ps-ac-btn",
      attrs: {
        "role": "button",
        "aria-label": "Confirm"
      },
      on: {
        "click": _vm.handleAccept
      }
    }, [_vm._v("\n          " + _vm._s(_vm.acceptLabel) + "\n        ")]), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-ac-btn",
      attrs: {
        "role": "button",
        "aria-label": "Cancel"
      },
      on: {
        "click": _vm.handleCancel
      }
    }, [_vm._v("\n          " + _vm._s(_vm.cancelLabel) + "\n        ")]), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-fields"
    }, [_c('EditableInput', {
      attrs: {
        "label": "h",
        "desc": "°",
        "value": _vm.hsv.h
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('h', $event);
        }
      }
    }), _vm._v(" "), _c('EditableInput', {
      attrs: {
        "label": "s",
        "desc": "%",
        "value": _vm.hsv.s,
        "max": 100
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('s', $event);
        }
      }
    }), _vm._v(" "), _c('EditableInput', {
      attrs: {
        "label": "v",
        "desc": "%",
        "value": _vm.hsv.v,
        "max": 100
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('v', $event);
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-fields__divider"
    }), _vm._v(" "), _c('EditableInput', {
      attrs: {
        "label": "r",
        "value": _vm.rgba.r
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('r', $event);
        }
      }
    }), _vm._v(" "), _c('EditableInput', {
      attrs: {
        "label": "g",
        "value": _vm.rgba.g
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('g', $event);
        }
      }
    }), _vm._v(" "), _c('EditableInput', {
      attrs: {
        "label": "b",
        "value": _vm.rgba.b
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('b', $event);
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "vc-ps-fields__divider"
    }), _vm._v(" "), _c('EditableInput', {
      staticClass: "vc-ps-fields__hex",
      attrs: {
        "label": "#",
        "value": _vm.tc.toHex()
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('hex', $event);
        }
      }
    })], 1), _vm._v(" "), _vm.hasResetButton ? _c('div', {
      staticClass: "vc-ps-ac-btn",
      attrs: {
        "aria-label": "reset"
      },
      on: {
        "click": _vm.handleReset
      }
    }, [_vm._v("\n          " + _vm._s(_vm.resetLabel) + "\n        ")]) : _vm._e()]) : _vm._e()])])]);
  };

  var __vue_staticRenderFns__$8 = [];
  /* style */

  var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-55f2423a_0", {
      source: ".vc-photoshop{background:#dcdcdc;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.25),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;width:513px;font-family:Roboto}.vc-photoshop__disable-fields{width:390px}.vc-ps-head{background-image:linear-gradient(-180deg,#f0f0f0 0,#d4d4d4 100%);border-bottom:1px solid #b1b1b1;box-shadow:inset 0 1px 0 0 rgba(255,255,255,.2),inset 0 -1px 0 0 rgba(0,0,0,.02);height:23px;line-height:24px;border-radius:4px 4px 0 0;font-size:13px;color:#4d4d4d;text-align:center}.vc-ps-body{padding:15px;display:flex}.vc-ps-saturation-wrap{width:256px;height:256px;position:relative;border:2px solid #b3b3b3;border-bottom:2px solid #f0f0f0;overflow:hidden}.vc-ps-saturation-wrap .vc-saturation-circle{width:12px;height:12px}.vc-ps-hue-wrap{position:relative;height:256px;width:19px;margin-left:10px;border:2px solid #b3b3b3;border-bottom:2px solid #f0f0f0}.vc-ps-hue-pointer{position:relative}.vc-ps-hue-pointer--left,.vc-ps-hue-pointer--right{position:absolute;width:0;height:0;border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent #555}.vc-ps-hue-pointer--left:after,.vc-ps-hue-pointer--right:after{content:\"\";width:0;height:0;border-style:solid;border-width:4px 0 4px 6px;border-color:transparent transparent transparent #fff;position:absolute;top:1px;left:1px;transform:translate(-8px,-5px)}.vc-ps-hue-pointer--left{transform:translate(-13px,-4px)}.vc-ps-hue-pointer--right{transform:translate(20px,-4px) rotate(180deg)}.vc-ps-controls{width:180px;margin-left:10px;display:flex}.vc-ps-controls__disable-fields{width:auto}.vc-ps-actions{margin-left:20px;flex:1}.vc-ps-ac-btn{cursor:pointer;background-image:linear-gradient(-180deg,#fff 0,#e6e6e6 100%);border:1px solid #878787;border-radius:2px;height:20px;box-shadow:0 1px 0 0 #eaeaea;font-size:14px;color:#000;line-height:20px;text-align:center;margin-bottom:10px}.vc-ps-previews{width:60px}.vc-ps-previews__swatches{border:1px solid #b3b3b3;border-bottom:1px solid #f0f0f0;margin-bottom:2px;margin-top:1px}.vc-ps-previews__pr-color{height:34px;box-shadow:inset 1px 0 0 #000,inset -1px 0 0 #000,inset 0 1px 0 #000}.vc-ps-previews__label{font-size:14px;color:#000;text-align:center}.vc-ps-fields{padding-top:5px;padding-bottom:9px;width:80px;position:relative}.vc-ps-fields .vc-input__input{margin-left:40%;width:40%;height:18px;border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;margin-bottom:5px;font-size:13px;padding-left:3px;margin-right:10px}.vc-ps-fields .vc-input__desc,.vc-ps-fields .vc-input__label{top:0;text-transform:uppercase;font-size:13px;height:18px;line-height:22px;position:absolute}.vc-ps-fields .vc-input__label{left:0;width:34px}.vc-ps-fields .vc-input__desc{right:0;width:0}.vc-ps-fields__divider{height:5px}.vc-ps-fields__hex .vc-input__input{margin-left:20%;width:80%;height:18px;border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;margin-bottom:6px;font-size:13px;padding-left:3px}.vc-ps-fields__hex .vc-input__label{position:absolute;top:0;left:0;width:14px;text-transform:uppercase;font-size:13px;height:18px;line-height:22px}",
      map: undefined,
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

  function _createSuper$a(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$a()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var _checkboardCache = {};
  var Checkboard = (_dec$9 = Prop({
    "default": 8
  }), _dec2$4 = Prop({
    "default": '#fff'
  }), _dec3$3 = Prop({
    "default": '#e6e6e6'
  }), Component(_class$a = (_class2$8 = (_temp$9 = /*#__PURE__*/function (_Vue) {
    _inherits(Checkboard, _Vue);

    var _super = _createSuper$a(Checkboard);

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

    return _c('div', {
      staticClass: "vc-checkerboard",
      style: _vm.bgStyle
    });
  };

  var __vue_staticRenderFns__$9 = [];
  /* style */

  var __vue_inject_styles__$9 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-0130206a_0", {
      source: ".vc-checkerboard{position:absolute;top:0;right:0;bottom:0;left:0;background-size:contain}",
      map: undefined,
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

  function _createSuper$b(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$b()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var Alpha = (_dec$a = Component({
    components: {
      Checkboard: __vue_component__$9
    }
  }), _dec2$5 = Ref(), _dec$a(_class$b = (_class2$9 = (_temp$a = /*#__PURE__*/function (_mixins) {
    _inherits(Alpha, _mixins);

    var _super = _createSuper$b(Alpha);

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

    return _c('div', {
      staticClass: "vc-alpha",
      attrs: {
        "role": "HuePanel"
      }
    }, [_c('div', {
      staticClass: "vc-alpha-checkboard-wrap"
    }, [_c('Checkboard')], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-alpha-gradient",
      style: {
        background: _vm.gradientColor
      }
    }), _vm._v(" "), _c('div', {
      ref: "container",
      staticClass: "vc-alpha-container",
      on: {
        "mousedown": _vm.handleMouseDown,
        "touchmove": _vm.handlTouchEvents,
        "touchstart": _vm.handlTouchEvents
      }
    }, [_c('div', {
      staticClass: "vc-alpha-pointer",
      style: {
        left: _vm.pointerLeft
      },
      attrs: {
        "role": "CurrentAlphaPointer"
      }
    }, [_c('div', {
      staticClass: "vc-alpha-picker"
    })])])]);
  };

  var __vue_staticRenderFns__$a = [];
  /* style */

  var __vue_inject_styles__$a = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-fd896072_0", {
      source: ".vc-alpha{position:absolute;top:0;right:0;bottom:0;left:0}.vc-alpha-checkboard-wrap{position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden}.vc-alpha-gradient{position:absolute;top:0;right:0;bottom:0;left:0}.vc-alpha-container{cursor:pointer;position:relative;z-index:2;height:100%;margin:0 3px;-webkit-tap-highlight-color:transparent}.vc-alpha-pointer{z-index:2;position:absolute}.vc-alpha-picker{cursor:pointer;width:4px;border-radius:1px;height:8px;box-shadow:0 0 2px rgba(0,0,0,.6);background:#fff;margin-top:1px;transform:translateX(-2px)}",
      map: undefined,
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

  function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$c(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$c()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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

    var _super = _createSuper$c(Sketch);

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
        this.onColorChange(_objectSpread$5({}, this.rgba, _defineProperty$1({}, label, value)));
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

    return _c('div', {
      "class": ['vc-sketch', _vm.disableAlpha ? 'vc-sketch__disable-alpha' : ''],
      attrs: {
        "role": "SketchColorPicker"
      }
    }, [_c('div', {
      staticClass: "vc-sketch-saturation-wrap"
    }, [_c('Saturation', {
      attrs: {
        "value": _vm.tc
      },
      on: {
        "change": _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-sketch-controls"
    }, [_c('div', {
      staticClass: "vc-sketch-sliders"
    }, [_c('div', {
      staticClass: "vc-sketch-hue-wrap"
    }, [_c('Hue', {
      attrs: {
        "value": _vm.tc
      },
      on: {
        "change": _vm.onColorChange
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c('div', {
      staticClass: "vc-sketch-alpha-wrap"
    }, [_c('Alpha', {
      attrs: {
        "value": _vm.tc
      },
      on: {
        "change": _vm.onAlphaChange
      }
    })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "vc-sketch-color-wrap"
    }, [_c('div', {
      staticClass: "vc-sketch-active-color",
      style: {
        background: _vm.tc.toRgbString()
      },
      attrs: {
        "aria-label": "Currentcolor: " + _vm.tc.toRgbString()
      }
    }), _vm._v(" "), _c('Checkboard')], 1)]), _vm._v(" "), !_vm.disableFields ? _c('div', {
      staticClass: "vc-sketch-field"
    }, [_c('div', {
      staticClass: "vc-sketch-field--double"
    }, [_c('EditableInput', {
      attrs: {
        "label": "hex",
        "value": _vm.hex
      },
      on: {
        "change": _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-sketch-field--single"
    }, [_c('EditableInput', {
      attrs: {
        "label": "r",
        "value": _vm.rgba.r
      },
      on: {
        "change": function change($event) {
          return _vm.onInputChange('r', $event);
        }
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-sketch-field--single"
    }, [_c('EditableInput', {
      attrs: {
        "label": "g",
        "value": _vm.rgba.g
      },
      on: {
        "change": function change($event) {
          return _vm.onInputChange('r', $event);
        }
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-sketch-field--single"
    }, [_c('EditableInput', {
      attrs: {
        "label": "b",
        "value": _vm.rgba.b
      },
      on: {
        "change": function change($event) {
          return _vm.onInputChange('r', $event);
        }
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c('div', {
      staticClass: "vc-sketch-field--single"
    }, [_c('EditableInput', {
      attrs: {
        "label": "a",
        "value": _vm.rgba.a,
        "step": 0.01
      },
      on: {
        "change": function change($event) {
          return _vm.onInputChange('r', $event);
        }
      }
    })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "vc-sketch-presets",
      attrs: {
        "role": "group"
      }
    }, [_vm._l(_vm.presetColors, function (c) {
      return [!_vm.isTransparent(c) ? _c('div', {
        key: c,
        staticClass: "vc-sketch-presets-color",
        style: {
          background: c
        },
        attrs: {
          "aria-label": 'Color:' + c
        },
        on: {
          "click": function click($event) {
            return _vm.onColorChange(c);
          }
        }
      }) : _c('div', {
        key: c,
        staticClass: "vc-sketch-presets-color",
        attrs: {
          "aria-label": 'Color:' + c
        },
        on: {
          "click": function click($event) {
            return _vm.onColorChange(c);
          }
        }
      }, [_c('checkboard')], 1)];
    })], 2)]);
  };

  var __vue_staticRenderFns__$b = [];
  /* style */

  var __vue_inject_styles__$b = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-4b47afcd_0", {
      source: ".vc-sketch{position:relative;width:200px;padding:10px 10px 0;box-sizing:initial;background:#fff;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 8px 16px rgba(0,0,0,.15)}.vc-sketch-saturation-wrap{width:100%;padding-bottom:75%;position:relative;overflow:hidden}.vc-sketch-controls{display:flex}.vc-sketch-sliders{padding:4px 0;flex:1}.vc-sketch-sliders .vc-alpha-gradient,.vc-sketch-sliders .vc-hue{border-radius:2px}.vc-sketch-hue-wrap{position:relative;height:10px}.vc-sketch-alpha-wrap{position:relative;height:10px;margin-top:4px;overflow:hidden}.vc-sketch-color-wrap{width:24px;height:24px;position:relative;margin-top:4px;margin-left:4px;border-radius:3px}.vc-sketch-active-color{position:absolute;top:0;left:0;right:0;bottom:0;border-radius:2px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15),inset 0 0 4px rgba(0,0,0,.25);z-index:2}.vc-sketch-color-wrap .vc-checkerboard{background-size:auto}.vc-sketch-field{display:flex;padding-top:4px}.vc-sketch-field .vc-input__input{width:90%;padding:4px 0 3px 10%;border:none;box-shadow:inset 0 0 0 1px #ccc;font-size:10px}.vc-sketch-field .vc-input__label{display:block;text-align:center;font-size:11px;color:#222;padding-top:3px;padding-bottom:4px;text-transform:capitalize}.vc-sketch-field--single{flex:1;padding-left:6px}.vc-sketch-field--double{flex:2}.vc-sketch-presets{margin-right:-10px;margin-left:-10px;padding-left:10px;padding-top:10px;border-top:1px solid #eee}.vc-sketch-presets-color{border-radius:3px;overflow:hidden;position:relative;display:inline-block;margin:0 10px 10px 0;vertical-align:top;cursor:pointer;width:16px;height:16px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}.vc-sketch-presets-color .vc-checkerboard{box-shadow:inset 0 0 0 1px rgba(0,0,0,.15);border-radius:3px}.vc-sketch__disable-alpha .vc-sketch-color-wrap{height:10px}",
      map: undefined,
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

  function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$d(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$d()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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

    var _super = _createSuper$d(Chrome);

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
          this.onColorChange(_objectSpread$6({}, this.rgba, _defineProperty$1({}, label, value)));
        }

        if (label === 'h' || label === 's' || label === 'l') {
          this.onColorChange(_objectSpread$6({}, this.hsl, _defineProperty$1({}, label, value)));
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

    return _c('div', {
      "class": ['vc-chrome', _vm.disableAlpha ? 'vc-chrome__disable-alpha' : ''],
      attrs: {
        "role": "ChromeColorPicker"
      }
    }, [_c('div', {
      staticClass: "vc-chrome-saturation-wrap"
    }, [_c('Saturation', {
      attrs: {
        "value": _vm.tc
      },
      on: {
        "change": _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-chrome-body"
    }, [_c('div', {
      staticClass: "vc-chrome-controls"
    }, [_c('div', {
      staticClass: "vc-chrome-color-wrap"
    }, [_c('div', {
      staticClass: "vc-chrome-active-color",
      style: {
        background: _vm.tc.toRgbString()
      }
    }), _vm._v(" "), !_vm.disableAlpha ? _c('Checkboard') : _vm._e()], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-chrome-sliders"
    }, [_c('div', {
      staticClass: "vc-chrome-hue-wrap"
    }, [_c('Hue', {
      attrs: {
        "value": _vm.tc
      },
      on: {
        "change": _vm.onColorChange
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c('div', {
      staticClass: "vc-chrome-alpha-wrap"
    }, [_c('Alpha', {
      attrs: {
        "value": _vm.tc
      },
      on: {
        "change": _vm.onAlphaChange
      }
    })], 1) : _vm._e()])]), _vm._v(" "), !_vm.disableFields ? _c('div', {
      staticClass: "vc-chrome-fields-wrap"
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.fieldsIndex === 0,
        expression: "fieldsIndex === 0"
      }],
      staticClass: "vc-chrome-fields"
    }, [_c('div', {
      staticClass: "vc-chrome-field"
    }, [!_vm.hasAlpha ? _c('EditableInput', {
      attrs: {
        "label": "hex",
        "value": _vm.tc.toHexString()
      },
      on: {
        "change": _vm.onColorChange
      }
    }) : _vm._e(), _vm._v(" "), _vm.hasAlpha ? _c('EditableInput', {
      attrs: {
        "label": "hex",
        "value": _vm.tc.toHex8String()
      },
      on: {
        "change": _vm.onColorChange
      }
    }) : _vm._e()], 1)]), _vm._v(" "), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.fieldsIndex === 1,
        expression: "fieldsIndex === 1"
      }],
      staticClass: "vc-chrome-fields"
    }, [_c('div', {
      staticClass: "vc-chrome-field"
    }, [_c('EditableInput', {
      attrs: {
        "label": "r",
        "value": _vm.rgba.r
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('r', $event);
        }
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-chrome-field"
    }, [_c('EditableInput', {
      attrs: {
        "label": "g",
        "value": _vm.rgba.g
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('g', $event);
        }
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-chrome-field"
    }, [_c('EditableInput', {
      attrs: {
        "label": "b",
        "value": _vm.rgba.b
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('b', $event);
        }
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c('div', {
      staticClass: "vc-chrome-field"
    }, [_c('EditableInput', {
      attrs: {
        "label": "a",
        "value": _vm.rgba.a,
        "step": 0.01
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('a', $event);
        }
      }
    })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.fieldsIndex === 2,
        expression: "fieldsIndex === 2"
      }],
      staticClass: "vc-chrome-fields"
    }, [_c('div', {
      staticClass: "vc-chrome-field"
    }, [_c('EditableInput', {
      attrs: {
        "label": "h",
        "value": _vm.hsl.h
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('h', $event);
        }
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-chrome-field"
    }, [_c('EditableInput', {
      attrs: {
        "label": "s",
        "value": (_vm.hsl.s * 100).toFixed() + "%"
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('s', $event);
        }
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "vc-chrome-field"
    }, [_c('EditableInput', {
      attrs: {
        "label": "l",
        "value": (_vm.hsl.l * 100).toFixed() + "%"
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('l', $event);
        }
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c('div', {
      staticClass: "vc-chrome-field"
    }, [_c('EditableInput', {
      attrs: {
        "label": "a",
        "value": _vm.hsl.a,
        "step": 0.01
      },
      on: {
        "change": function change($event) {
          return _vm.inputChange('a', $event);
        }
      }
    })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "vc-chrome-toggle-btn",
      attrs: {
        "role": "button",
        "aria-label": "Change another color definition"
      },
      on: {
        "click": _vm.toggleViews
      }
    }, [_c('div', {
      staticClass: "vc-chrome-toggle-icon"
    }, [_c('svg', {
      staticStyle: {
        "width": "24px",
        "height": "24px"
      },
      attrs: {
        "viewBox": "0 0 24 24"
      },
      on: {
        "mouseover": _vm.showHighlight,
        "mouseenter": _vm.showHighlight,
        "mouseout": _vm.hideHighlight
      }
    }, [_c('path', {
      attrs: {
        "fill": "#333",
        "d": "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
      }
    })])]), _vm._v(" "), _c('div', {
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
  /* style */

  var __vue_inject_styles__$c = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-d9a37274_0", {
      source: ".vc-chrome{background:#fff;border-radius:2px;box-shadow:0 0 2px rgba(0,0,0,.3),0 4px 8px rgba(0,0,0,.3);box-sizing:initial;width:225px;font-family:Menlo;background-color:#fff}.vc-chrome-controls{display:flex}.vc-chrome-color-wrap{position:relative;width:36px}.vc-chrome-active-color{position:relative;width:30px;height:30px;border-radius:15px;overflow:hidden;z-index:1}.vc-chrome-color-wrap .vc-checkerboard{width:30px;height:30px;border-radius:15px;background-size:auto}.vc-chrome-sliders{flex:1}.vc-chrome-fields-wrap{display:flex;padding-top:16px}.vc-chrome-fields{display:flex;margin-left:-6px;flex:1}.vc-chrome-field{padding-left:6px;width:100%}.vc-chrome-toggle-btn{width:32px;text-align:right;position:relative}.vc-chrome-toggle-icon{margin-right:-4px;margin-top:12px;cursor:pointer;position:relative;z-index:2}.vc-chrome-toggle-icon-highlight{position:absolute;width:24px;height:28px;background:#eee;border-radius:4px;top:10px;left:12px}.vc-chrome-hue-wrap{position:relative;height:10px;margin-bottom:8px}.vc-chrome-alpha-wrap{position:relative;height:10px}.vc-chrome-hue-wrap .vc-hue{border-radius:2px}.vc-chrome-alpha-wrap .vc-alpha-gradient{border-radius:2px}.vc-chrome-alpha-wrap .vc-alpha-picker,.vc-chrome-hue-wrap .vc-hue-picker{width:12px;height:12px;border-radius:6px;transform:translate(-6px,-2px);background-color:#f8f8f8;box-shadow:0 1px 4px 0 rgba(0,0,0,.37)}.vc-chrome-body{padding:16px 16px 12px;background-color:#fff}.vc-chrome-saturation-wrap{width:100%;padding-bottom:55%;position:relative;border-radius:2px 2px 0 0;overflow:hidden}.vc-chrome-saturation-wrap .vc-saturation-circle{width:12px;height:12px}.vc-chrome-fields .vc-input__input{font-size:11px;color:#333;width:100%;border-radius:2px;border:none;box-shadow:inset 0 0 0 1px #dadada;height:21px;text-align:center}.vc-chrome-fields .vc-input__label{text-transform:uppercase;font-size:11px;line-height:11px;color:#969696;text-align:center;display:block;margin-top:12px}.vc-chrome__disable-alpha .vc-chrome-active-color{width:18px;height:18px}.vc-chrome__disable-alpha .vc-chrome-color-wrap{width:30px}.vc-chrome__disable-alpha .vc-chrome-hue-wrap{margin-top:4px;margin-bottom:4px}",
      map: undefined,
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

  exports.Alpha = __vue_component__$a;
  exports.Checkboard = __vue_component__$9;
  exports.Chrome = __vue_component__$c;
  exports.Compact = __vue_component__;
  exports.EditableInput = __vue_component__$2;
  exports.Grayscale = __vue_component__$1;
  exports.Hue = __vue_component__$4;
  exports.Material = __vue_component__$3;
  exports.Photoshop = __vue_component__$8;
  exports.Saturation = __vue_component__$7;
  exports.Sketch = __vue_component__$b;
  exports.Slider = __vue_component__$5;
  exports.Swatches = __vue_component__$6;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
