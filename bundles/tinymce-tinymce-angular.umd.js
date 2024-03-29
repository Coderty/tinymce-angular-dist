(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@tinymce/tinymce-angular', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = global || self, factory((global.tinymce = global.tinymce || {}, global.tinymce['tinymce-angular'] = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, function (exports, core, common, forms) { 'use strict';

    /**
     * Copyright (c) 2017-present, Ephox, Inc.
     *
     * This source code is licensed under the Apache 2 license found in the
     * LICENSE file in the root directory of this source tree.
     *
     */
    var getTinymce = function () {
        var w = typeof window !== 'undefined' ? window : undefined;
        return w && w.tinymce ? w.tinymce : null;
    };

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Events = /** @class */ (function () {
        function Events() {
            this.onBeforePaste = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onClick = new core.EventEmitter();
            this.onContextMenu = new core.EventEmitter();
            this.onCopy = new core.EventEmitter();
            this.onCut = new core.EventEmitter();
            this.onDblclick = new core.EventEmitter();
            this.onDrag = new core.EventEmitter();
            this.onDragDrop = new core.EventEmitter();
            this.onDragEnd = new core.EventEmitter();
            this.onDragGesture = new core.EventEmitter();
            this.onDragOver = new core.EventEmitter();
            this.onDrop = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onFocusIn = new core.EventEmitter();
            this.onFocusOut = new core.EventEmitter();
            this.onKeyDown = new core.EventEmitter();
            this.onKeyPress = new core.EventEmitter();
            this.onKeyUp = new core.EventEmitter();
            this.onMouseDown = new core.EventEmitter();
            this.onMouseEnter = new core.EventEmitter();
            this.onMouseLeave = new core.EventEmitter();
            this.onMouseMove = new core.EventEmitter();
            this.onMouseOut = new core.EventEmitter();
            this.onMouseOver = new core.EventEmitter();
            this.onMouseUp = new core.EventEmitter();
            this.onPaste = new core.EventEmitter();
            this.onSelectionChange = new core.EventEmitter();
            this.onActivate = new core.EventEmitter();
            this.onAddUndo = new core.EventEmitter();
            this.onBeforeAddUndo = new core.EventEmitter();
            this.onBeforeExecCommand = new core.EventEmitter();
            this.onBeforeGetContent = new core.EventEmitter();
            this.onBeforeRenderUI = new core.EventEmitter();
            this.onBeforeSetContent = new core.EventEmitter();
            this.onChange = new core.EventEmitter();
            this.onClearUndos = new core.EventEmitter();
            this.onDeactivate = new core.EventEmitter();
            this.onDirty = new core.EventEmitter();
            this.onExecCommand = new core.EventEmitter();
            this.onGetContent = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.onInit = new core.EventEmitter();
            this.onLoadContent = new core.EventEmitter();
            this.onNodeChange = new core.EventEmitter();
            this.onPostProcess = new core.EventEmitter();
            this.onPostRender = new core.EventEmitter();
            this.onPreInit = new core.EventEmitter();
            this.onPreProcess = new core.EventEmitter();
            this.onProgressState = new core.EventEmitter();
            this.onRedo = new core.EventEmitter();
            this.onRemove = new core.EventEmitter();
            this.onReset = new core.EventEmitter();
            this.onSaveContent = new core.EventEmitter();
            this.onSetAttrib = new core.EventEmitter();
            this.onObjectResizeStart = new core.EventEmitter();
            this.onObjectResized = new core.EventEmitter();
            this.onObjectSelected = new core.EventEmitter();
            this.onSetContent = new core.EventEmitter();
            this.onShow = new core.EventEmitter();
            this.onSubmit = new core.EventEmitter();
            this.onUndo = new core.EventEmitter();
            this.onVisualAid = new core.EventEmitter();
        }
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onBeforePaste", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onBlur", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onClick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onContextMenu", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onCopy", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onCut", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDblclick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDrag", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDragDrop", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDragEnd", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDragGesture", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDragOver", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDrop", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onFocus", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onFocusIn", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onFocusOut", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onKeyDown", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onKeyPress", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onKeyUp", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onMouseDown", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onMouseEnter", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onMouseLeave", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onMouseMove", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onMouseOut", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onMouseOver", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onMouseUp", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onPaste", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onSelectionChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onActivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onAddUndo", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onBeforeAddUndo", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onBeforeExecCommand", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onBeforeGetContent", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onBeforeRenderUI", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onBeforeSetContent", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onClearUndos", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDeactivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onDirty", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onExecCommand", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onGetContent", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onHide", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onInit", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onLoadContent", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onNodeChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onPostProcess", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onPostRender", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onPreInit", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onPreProcess", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onProgressState", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onRedo", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onRemove", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onReset", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onSaveContent", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onSetAttrib", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onObjectResizeStart", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onObjectResized", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onObjectSelected", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onSetContent", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onShow", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onSubmit", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onUndo", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Events.prototype, "onVisualAid", void 0);
        return Events;
    }());
    var validEvents = [
        'onActivate',
        'onAddUndo',
        'onBeforeAddUndo',
        'onBeforeExecCommand',
        'onBeforeGetContent',
        'onBeforeRenderUI',
        'onBeforeSetContent',
        'onBeforePaste',
        'onBlur',
        'onChange',
        'onClearUndos',
        'onClick',
        'onContextMenu',
        'onCopy',
        'onCut',
        'onDblclick',
        'onDeactivate',
        'onDirty',
        'onDrag',
        'onDragDrop',
        'onDragEnd',
        'onDragGesture',
        'onDragOver',
        'onDrop',
        'onExecCommand',
        'onFocus',
        'onFocusIn',
        'onFocusOut',
        'onGetContent',
        'onHide',
        'onInit',
        'onKeyDown',
        'onKeyPress',
        'onKeyUp',
        'onLoadContent',
        'onMouseDown',
        'onMouseEnter',
        'onMouseLeave',
        'onMouseMove',
        'onMouseOut',
        'onMouseOver',
        'onMouseUp',
        'onNodeChange',
        'onObjectResizeStart',
        'onObjectResized',
        'onObjectSelected',
        'onPaste',
        'onPostProcess',
        'onPostRender',
        'onPreProcess',
        'onProgressState',
        'onRedo',
        'onRemove',
        'onReset',
        'onSaveContent',
        'onSelectionChange',
        'onSetAttrib',
        'onSetContent',
        'onShow',
        'onSubmit',
        'onUndo',
        'onVisualAid'
    ];

    /**
     * Copyright (c) 2017-present, Ephox, Inc.
     *
     * This source code is licensed under the Apache 2 license found in the
     * LICENSE file in the root directory of this source tree.
     *
     */
    var bindHandlers = function (ctx, editor, initEvent) {
        validEvents.forEach(function (eventName) {
            var eventEmitter = ctx[eventName];
            if (eventName === 'onInit') {
                ctx.ngZone.run(function () { return eventEmitter.emit({ event: initEvent, editor: editor }); });
            }
            else {
                editor.on(eventName.substring(2), function (event) { return ctx.ngZone.run(function () { return eventEmitter.emit({ event: event, editor: editor }); }); });
            }
        });
    };
    var unique = 0;
    var uuid = function (prefix) {
        var date = new Date();
        var time = date.getTime();
        var random = Math.floor(Math.random() * 1000000000);
        unique++;
        return prefix + '_' + random + unique + String(time);
    };
    var isTextarea = function (element) {
        return typeof element !== 'undefined' && element.tagName.toLowerCase() === 'textarea';
    };
    var normalizePluginArray = function (plugins) {
        if (typeof plugins === 'undefined' || plugins === '') {
            return [];
        }
        return Array.isArray(plugins) ? plugins : plugins.split(' ');
    };
    var mergePlugins = function (initPlugins, inputPlugins) {
        return normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
    };
    // tslint:disable-next-line:no-empty
    var noop = function () { };

    /**
     * Copyright (c) 2017-present, Ephox, Inc.
     *
     * This source code is licensed under the Apache 2 license found in the
     * LICENSE file in the root directory of this source tree.
     *
     */
    var injectScriptTag = function (scriptId, doc, url, callback) {
        var scriptTag = doc.createElement('script');
        scriptTag.type = 'application/javascript';
        scriptTag.id = scriptId;
        scriptTag.addEventListener('load', callback);
        scriptTag.src = url;
        if (doc.head) {
            doc.head.appendChild(scriptTag);
        }
    };
    var create = function () {
        return {
            listeners: [],
            scriptId: uuid('tiny-script'),
            scriptLoaded: false
        };
    };
    var load = function (state, doc, url, callback) {
        if (state.scriptLoaded) {
            callback();
        }
        else {
            state.listeners.push(callback);
            if (!doc.getElementById(state.scriptId)) {
                injectScriptTag(state.scriptId, doc, url, function () {
                    state.listeners.forEach(function (fn) { return fn(); });
                    state.scriptLoaded = true;
                });
            }
        }
    };

    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var scriptState = create();
    var EDITOR_COMPONENT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return EditorComponent; }),
        multi: true
    };
    var EditorComponent = /** @class */ (function (_super) {
        __extends(EditorComponent, _super);
        function EditorComponent(elementRef, ngZone, platformId) {
            var _this = _super.call(this) || this;
            _this.platformId = platformId;
            _this.cloudChannel = '5';
            _this.apiKey = 'no-api-key';
            _this.id = '';
            _this.toolbar = null;
            _this._element = undefined;
            _this.onTouchedCallback = noop;
            _this.onChangeCallback = noop;
            _this._elementRef = elementRef;
            _this.ngZone = ngZone;
            _this.initialise = _this.initialise.bind(_this);
            return _this;
        }
        Object.defineProperty(EditorComponent.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = val;
                if (this._editor && this._editor.initialized) {
                    this._editor.setMode(val ? 'readonly' : 'design');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditorComponent.prototype, "editor", {
            get: function () {
                return this._editor;
            },
            enumerable: true,
            configurable: true
        });
        EditorComponent.prototype.writeValue = function (value) {
            this.initialValue = value || this.initialValue;
            value = value || '';
            if (this._editor && this._editor.initialized && typeof value === 'string') {
                this._editor.setContent(value);
            }
        };
        EditorComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        EditorComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedCallback = fn;
        };
        EditorComponent.prototype.setDisabledState = function (isDisabled) {
            if (this._editor) {
                this._editor.setMode(isDisabled ? 'readonly' : 'design');
            }
            else if (isDisabled) {
                this.init = __assign({}, this.init, { readonly: true });
            }
        };
        EditorComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (common.isPlatformBrowser(this.platformId)) {
                this.id = this.id || uuid('tiny-angular');
                this.inline =
                    typeof this.inline !== 'undefined' ? (typeof this.inline === 'boolean' ? this.inline : true) : this.init && this.init.inline;
                this.createElement();
                if (getTinymce() !== null) {
                    this.initialise();
                }
                else if (this._element && this._element.ownerDocument) {
                    var doc = this._element.ownerDocument;
                    var channel = this.cloudChannel;
                    var apiKey = this.apiKey;
                    load(scriptState, doc, "https://cdn.tiny.cloud/1/" + apiKey + "/tinymce/" + channel + "/tinymce.min.js", this.initialise);
                }
            }
            if (this.forceInit$) {
                this.forceInit$.subscribe(function () {
                    _this.forceInit();
                });
            }
        };
        EditorComponent.prototype.ngOnDestroy = function () {
            this.removeEditor();
        };
        EditorComponent.prototype.createElement = function () {
            var tagName = typeof this.tagName === 'string' ? this.tagName : 'div';
            this._element = document.createElement(this.inline ? tagName : 'textarea');
            if (this._element) {
                this._element.id = this.id;
                if (isTextarea(this._element)) {
                    this._element.style.visibility = 'hidden';
                }
                this._elementRef.nativeElement.appendChild(this._element);
            }
        };
        EditorComponent.prototype.initialise = function () {
            var _this = this;
            var finalInit = __assign({}, this.init, { target: this._element, inline: this.inline, readonly: this.disabled, plugins: mergePlugins(this.init && this.init.plugins, this.plugins), toolbar: this.toolbar || (this.init && this.init.toolbar), setup: function (editor) {
                    _this._editor = editor;
                    editor.on('init', function (e) {
                        _this.initEditor(e, editor);
                    });
                    if (_this.init && typeof _this.init.setup === 'function') {
                        _this.init.setup(editor);
                    }
                } });
            if (isTextarea(this._element)) {
                this._element.style.visibility = '';
            }
            this.ngZone.runOutsideAngular(function () {
                getTinymce().init(finalInit);
            });
        };
        EditorComponent.prototype.forceInit = function () {
            this.removeEditor();
            this.initialise();
        };
        EditorComponent.prototype.initEditor = function (initEvent, editor) {
            var _this = this;
            if (typeof this.initialValue === 'string') {
                this.ngZone.run(function () { return editor.setContent(_this.initialValue); });
            }
            editor.on('blur', function () { return _this.ngZone.run(function () { return _this.onTouchedCallback(); }); });
            editor.on('change keyup undo redo', function () { return _this.ngZone.run(function () { return _this.onChangeCallback(editor.getContent()); }); });
            bindHandlers(this, editor, initEvent);
        };
        EditorComponent.prototype.removeEditor = function () {
            if (getTinymce() !== null) {
                getTinymce().remove(this._editor);
            }
        };
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object),
            __metadata$1("design:paramtypes", [Object])
        ], EditorComponent.prototype, "disabled", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "cloudChannel", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "apiKey", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "init", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "id", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "initialValue", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "inline", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "tagName", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "plugins", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "toolbar", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], EditorComponent.prototype, "forceInit$", void 0);
        EditorComponent = __decorate$1([
            core.Component({
                selector: 'editor',
                template: '<ng-template></ng-template>',
                providers: [EDITOR_COMPONENT_VALUE_ACCESSOR],
                styles: [':host { display: block; }']
            }),
            __param(2, core.Inject(core.PLATFORM_ID)),
            __metadata$1("design:paramtypes", [core.ElementRef, core.NgZone, Object])
        ], EditorComponent);
        return EditorComponent;
    }(Events));

    var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var EditorModule = /** @class */ (function () {
        function EditorModule() {
        }
        EditorModule = __decorate$2([
            core.NgModule({
                imports: [common.CommonModule, forms.FormsModule],
                declarations: [EditorComponent],
                exports: [EditorComponent]
            })
        ], EditorModule);
        return EditorModule;
    }());

    exports.EditorComponent = EditorComponent;
    exports.EditorModule = EditorModule;
    exports.ɵa = Events;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tinymce-tinymce-angular.umd.js.map
