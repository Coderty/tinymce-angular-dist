import { EventEmitter, Output, forwardRef, Input, Component, Inject, PLATFORM_ID, ElementRef, NgZone, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const getTinymce = () => {
    const w = typeof window !== 'undefined' ? window : undefined;
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
class Events {
    constructor() {
        this.onBeforePaste = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onContextMenu = new EventEmitter();
        this.onCopy = new EventEmitter();
        this.onCut = new EventEmitter();
        this.onDblclick = new EventEmitter();
        this.onDrag = new EventEmitter();
        this.onDragDrop = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        this.onDragGesture = new EventEmitter();
        this.onDragOver = new EventEmitter();
        this.onDrop = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onFocusIn = new EventEmitter();
        this.onFocusOut = new EventEmitter();
        this.onKeyDown = new EventEmitter();
        this.onKeyPress = new EventEmitter();
        this.onKeyUp = new EventEmitter();
        this.onMouseDown = new EventEmitter();
        this.onMouseEnter = new EventEmitter();
        this.onMouseLeave = new EventEmitter();
        this.onMouseMove = new EventEmitter();
        this.onMouseOut = new EventEmitter();
        this.onMouseOver = new EventEmitter();
        this.onMouseUp = new EventEmitter();
        this.onPaste = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onActivate = new EventEmitter();
        this.onAddUndo = new EventEmitter();
        this.onBeforeAddUndo = new EventEmitter();
        this.onBeforeExecCommand = new EventEmitter();
        this.onBeforeGetContent = new EventEmitter();
        this.onBeforeRenderUI = new EventEmitter();
        this.onBeforeSetContent = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onClearUndos = new EventEmitter();
        this.onDeactivate = new EventEmitter();
        this.onDirty = new EventEmitter();
        this.onExecCommand = new EventEmitter();
        this.onGetContent = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onInit = new EventEmitter();
        this.onLoadContent = new EventEmitter();
        this.onNodeChange = new EventEmitter();
        this.onPostProcess = new EventEmitter();
        this.onPostRender = new EventEmitter();
        this.onPreInit = new EventEmitter();
        this.onPreProcess = new EventEmitter();
        this.onProgressState = new EventEmitter();
        this.onRedo = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onReset = new EventEmitter();
        this.onSaveContent = new EventEmitter();
        this.onSetAttrib = new EventEmitter();
        this.onObjectResizeStart = new EventEmitter();
        this.onObjectResized = new EventEmitter();
        this.onObjectSelected = new EventEmitter();
        this.onSetContent = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onSubmit = new EventEmitter();
        this.onUndo = new EventEmitter();
        this.onVisualAid = new EventEmitter();
    }
}
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onBeforePaste", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onBlur", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onContextMenu", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onCopy", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onCut", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDblclick", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDrag", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDragDrop", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDragEnd", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDragGesture", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDragOver", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDrop", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onFocus", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onFocusIn", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onFocusOut", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onKeyDown", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onKeyPress", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onKeyUp", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onMouseDown", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onMouseEnter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onMouseLeave", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onMouseMove", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onMouseOut", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onMouseOver", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onMouseUp", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onPaste", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onSelectionChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onActivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onAddUndo", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onBeforeAddUndo", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onBeforeExecCommand", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onBeforeGetContent", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onBeforeRenderUI", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onBeforeSetContent", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onClearUndos", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDeactivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onDirty", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onExecCommand", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onGetContent", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onHide", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onInit", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onLoadContent", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onNodeChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onPostProcess", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onPostRender", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onPreInit", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onPreProcess", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onProgressState", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onRedo", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onRemove", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onReset", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onSaveContent", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onSetAttrib", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onObjectResizeStart", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onObjectResized", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onObjectSelected", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onSetContent", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onShow", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onSubmit", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onUndo", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Events.prototype, "onVisualAid", void 0);
const validEvents = [
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
const bindHandlers = (ctx, editor, initEvent) => {
    validEvents.forEach((eventName) => {
        const eventEmitter = ctx[eventName];
        if (eventName === 'onInit') {
            ctx.ngZone.run(() => eventEmitter.emit({ event: initEvent, editor }));
        }
        else {
            editor.on(eventName.substring(2), (event) => ctx.ngZone.run(() => eventEmitter.emit({ event, editor })));
        }
    });
};
let unique = 0;
const uuid = (prefix) => {
    const date = new Date();
    const time = date.getTime();
    const random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
const isTextarea = (element) => {
    return typeof element !== 'undefined' && element.tagName.toLowerCase() === 'textarea';
};
const normalizePluginArray = (plugins) => {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(' ');
};
const mergePlugins = (initPlugins, inputPlugins) => normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
// tslint:disable-next-line:no-empty
const noop = () => { };

/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const injectScriptTag = (scriptId, doc, url, callback) => {
    const scriptTag = doc.createElement('script');
    scriptTag.type = 'application/javascript';
    scriptTag.id = scriptId;
    scriptTag.addEventListener('load', callback);
    scriptTag.src = url;
    if (doc.head) {
        doc.head.appendChild(scriptTag);
    }
};
const create = () => {
    return {
        listeners: [],
        scriptId: uuid('tiny-script'),
        scriptLoaded: false
    };
};
const load = (state, doc, url, callback) => {
    if (state.scriptLoaded) {
        callback();
    }
    else {
        state.listeners.push(callback);
        if (!doc.getElementById(state.scriptId)) {
            injectScriptTag(state.scriptId, doc, url, () => {
                state.listeners.forEach((fn) => fn());
                state.scriptLoaded = true;
            });
        }
    }
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
const scriptState = create();
const EDITOR_COMPONENT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
};
let EditorComponent = class EditorComponent extends Events {
    constructor(elementRef, ngZone, platformId) {
        super();
        this.platformId = platformId;
        this.cloudChannel = '5';
        this.apiKey = 'no-api-key';
        this.id = '';
        this.toolbar = null;
        this._element = undefined;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._elementRef = elementRef;
        this.ngZone = ngZone;
        this.initialise = this.initialise.bind(this);
    }
    set disabled(val) {
        this._disabled = val;
        if (this._editor && this._editor.initialized) {
            this._editor.setMode(val ? 'readonly' : 'design');
        }
    }
    get disabled() {
        return this._disabled;
    }
    get editor() {
        return this._editor;
    }
    writeValue(value) {
        this.initialValue = value || this.initialValue;
        value = value || '';
        if (this._editor && this._editor.initialized && typeof value === 'string') {
            this._editor.setContent(value);
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        if (this._editor) {
            this._editor.setMode(isDisabled ? 'readonly' : 'design');
        }
        else if (isDisabled) {
            this.init = Object.assign({}, this.init, { readonly: true });
        }
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.id = this.id || uuid('tiny-angular');
            this.inline =
                typeof this.inline !== 'undefined' ? (typeof this.inline === 'boolean' ? this.inline : true) : this.init && this.init.inline;
            this.createElement();
            if (getTinymce() !== null) {
                this.initialise();
            }
            else if (this._element && this._element.ownerDocument) {
                const doc = this._element.ownerDocument;
                const channel = this.cloudChannel;
                const apiKey = this.apiKey;
                load(scriptState, doc, `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channel}/tinymce.min.js`, this.initialise);
            }
        }
        if (this.forceInit$) {
            this.forceInit$.subscribe(() => {
                this.forceInit();
            });
        }
    }
    ngOnDestroy() {
        this.removeEditor();
    }
    createElement() {
        const tagName = typeof this.tagName === 'string' ? this.tagName : 'div';
        this._element = document.createElement(this.inline ? tagName : 'textarea');
        if (this._element) {
            this._element.id = this.id;
            if (isTextarea(this._element)) {
                this._element.style.visibility = 'hidden';
            }
            this._elementRef.nativeElement.appendChild(this._element);
        }
    }
    initialise() {
        const finalInit = Object.assign({}, this.init, { target: this._element, inline: this.inline, readonly: this.disabled, plugins: mergePlugins(this.init && this.init.plugins, this.plugins), toolbar: this.toolbar || (this.init && this.init.toolbar), setup: (editor) => {
                this._editor = editor;
                editor.on('init', (e) => {
                    this.initEditor(e, editor);
                });
                if (this.init && typeof this.init.setup === 'function') {
                    this.init.setup(editor);
                }
            } });
        if (isTextarea(this._element)) {
            this._element.style.visibility = '';
        }
        this.ngZone.runOutsideAngular(() => {
            getTinymce().init(finalInit);
        });
    }
    forceInit() {
        this.removeEditor();
        this.initialise();
    }
    initEditor(initEvent, editor) {
        if (typeof this.initialValue === 'string') {
            this.ngZone.run(() => editor.setContent(this.initialValue));
        }
        editor.on('blur', () => this.ngZone.run(() => this.onTouchedCallback()));
        editor.on('change keyup undo redo', () => this.ngZone.run(() => this.onChangeCallback(editor.getContent())));
        bindHandlers(this, editor, initEvent);
    }
    removeEditor() {
        if (getTinymce() !== null) {
            getTinymce().remove(this._editor);
        }
    }
};
__decorate$1([
    Input(),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [Object])
], EditorComponent.prototype, "disabled", null);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "cloudChannel", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "apiKey", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "init", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "id", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "initialValue", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "inline", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "tagName", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "plugins", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "toolbar", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], EditorComponent.prototype, "forceInit$", void 0);
EditorComponent = __decorate$1([
    Component({
        selector: 'editor',
        template: '<ng-template></ng-template>',
        providers: [EDITOR_COMPONENT_VALUE_ACCESSOR],
        styles: [':host { display: block; }']
    }),
    __param(2, Inject(PLATFORM_ID)),
    __metadata$1("design:paramtypes", [ElementRef, NgZone, Object])
], EditorComponent);

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let EditorModule = class EditorModule {
};
EditorModule = __decorate$2([
    NgModule({
        imports: [CommonModule, FormsModule],
        declarations: [EditorComponent],
        exports: [EditorComponent]
    })
], EditorModule);

/**
 * Generated bundle index. Do not edit.
 */

export { EditorComponent, EditorModule, Events as ɵa };
//# sourceMappingURL=tinymce-tinymce-angular.js.map
