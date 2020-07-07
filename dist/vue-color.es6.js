import _initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import '@babel/runtime/helpers/esm/initializerWarningHelper';
import { Prop, Component as Component$1, Ref, Vue as Vue$1, Watch } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import Vue from 'vue';
import tinycolor from 'tinycolor2';
import debounce from 'lodash.debounce';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import clamp from 'clamp';
import material from 'material-colors';
import throttle from 'lodash.throttle';

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
    _this.debounced = debounce(function (fn) {
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
}), Component$1(_class$1 = (_class2 = (_temp$1 = /*#__PURE__*/function (_mixins) {
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
}), Component$1(_class$2 = (_class2$1 = (_temp$2 = /*#__PURE__*/function (_mixins) {
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

var _dec$2, _dec2, _dec3, _dec4, _dec5, _class$3, _class2$2, _descriptor$2, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp$3;

function _createSuper$3(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$3()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var clamps = {
  r: function r(v) {
    return clamp(v, 255, 0);
  },
  g: function g(v) {
    return clamp(v, 255, 0);
  },
  b: function b(v) {
    return clamp(v, 255, 0);
  },
  a: function a(v) {
    return clamp(v, 1, 0);
  },
  h: function h(v) {
    return clamp(v, 360, 0);
  },
  s: function s(v) {
    return clamp(v, 100, 0);
  },
  l: function l(v) {
    return clamp(v, 100, 0);
  },
  v: function v(_v) {
    return clamp(_v, 100, 0);
  }
};
var EditableInput = (_dec$2 = Prop(), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop({
  "default": 1
}), _dec5 = Ref(), Component$1(_class$3 = (_class2$2 = (_temp$3 = /*#__PURE__*/function (_Vue) {
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
}(Vue$1), _temp$3), (_descriptor$2 = _applyDecoratedDescriptor(_class2$2.prototype, "value", [_dec$2], {
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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$4(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$4()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Material = (_dec$3 = Component$1({
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

      this.onColorChange(_objectSpread({}, this.rgba, {}, _defineProperty({}, label, data)));
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

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$5(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$5()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Hue = (_dec$4 = Prop({
  "default": 'horizontal'
}), _dec2$1 = Ref('container'), _dec3$1 = Watch('hsl'), Component$1(_class$5 = (_class2$3 = (_temp$4 = /*#__PURE__*/function (_mixins) {
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

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$6(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$6()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Slider = (_dec$5 = Component$1({
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
}), Component$1(_class$7 = (_class2$5 = (_temp$6 = /*#__PURE__*/function (_mixins) {
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

var _dec$7, _class$8, _class2$6, _descriptor$6, _temp$7;

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$8(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$8()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Saturation = (_dec$7 = Ref('container'), Component$1(_class$8 = (_class2$6 = (_temp$7 = /*#__PURE__*/function (_mixins) {
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
    _this.throttle = throttle(function (fn, data) {
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
      var left = clamp(pageX - xOffset, 0, containerWidth);
      var top = clamp(pageY - yOffset, 0, containerHeight);
      var saturation = left / containerWidth;
      var bright = clamp(-(top / containerHeight) + 1, 0, 1);
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

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$9(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$9()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Photoshop = (_dec$8 = Component$1({
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
        this.onColorChange(_objectSpread$4({}, this.rgba, _defineProperty({}, label, color)));
        return;
      }

      if (label === 'h' || label === 's' || label === 'v') {
        this.onColorChange(_objectSpread$4({}, this.tc.toHsv(), _defineProperty({}, label, color)));
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
}), Component$1(_class$a = (_class2$8 = (_temp$9 = /*#__PURE__*/function (_Vue) {
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
}(Vue$1), _temp$9), (_descriptor$8 = _applyDecoratedDescriptor(_class2$8.prototype, "size", [_dec$9], {
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
var Alpha = (_dec$a = Component$1({
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

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$c(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$c()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var presetColors = ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF', 'rgba(0,0,0,0)'];
var Sketch = (_dec$b = Component$1({
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
      this.onColorChange(_objectSpread$5({}, this.rgba, _defineProperty({}, label, value)));
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

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$d(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$d()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Chrome = (_dec$c = Component$1({
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
        this.onColorChange(_objectSpread$6({}, this.rgba, _defineProperty({}, label, value)));
      }

      if (label === 'h' || label === 's' || label === 'l') {
        this.onColorChange(_objectSpread$6({}, this.hsl, _defineProperty({}, label, value)));
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

export { __vue_component__$a as Alpha, __vue_component__$9 as Checkboard, __vue_component__$c as Chrome, __vue_component__ as Compact, __vue_component__$2 as EditableInput, __vue_component__$1 as Grayscale, __vue_component__$4 as Hue, __vue_component__$3 as Material, __vue_component__$8 as Photoshop, __vue_component__$7 as Saturation, __vue_component__$b as Sketch, __vue_component__$5 as Slider, __vue_component__$6 as Swatches, version };
