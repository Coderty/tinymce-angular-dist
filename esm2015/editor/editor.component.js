var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, forwardRef, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { getTinymce } from '../TinyMCE';
import * as ScriptLoader from '../utils/ScriptLoader';
import { bindHandlers, isTextarea, mergePlugins, uuid, noop } from '../utils/Utils';
import { Events } from './Events';
const scriptState = ScriptLoader.create();
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
                ScriptLoader.load(scriptState, doc, `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channel}/tinymce.min.js`, this.initialise);
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
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], EditorComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "cloudChannel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "apiKey", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "init", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "initialValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "inline", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "tagName", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "plugins", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "toolbar", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "forceInit$", void 0);
EditorComponent = __decorate([
    Component({
        selector: 'editor',
        template: '<ng-template></ng-template>',
        providers: [EDITOR_COMPONENT_VALUE_ACCESSOR],
        styles: [':host { display: block; }']
    }),
    __param(2, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [ElementRef, NgZone, Object])
], EditorComponent);
export { EditorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0aW55bWNlL3RpbnltY2UtYW5ndWxhci8iLCJzb3VyY2VzIjpbImVkaXRvci9lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sS0FBSyxZQUFZLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2xDLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUxQyxNQUFNLCtCQUErQixHQUFHO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDOUMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBUUYsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxNQUFNO0lBdUN6QyxZQUFZLFVBQXNCLEVBQUUsTUFBYyxFQUErQixVQUFrQjtRQUNqRyxLQUFLLEVBQUUsQ0FBQztRQUR1RSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBbkJuRixpQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUNuQixXQUFN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SyxFQUFFOztxREFBMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7OytDQUE4QjtBQUM3QjtJQUFSLEtBQUssRUFBRTs7NkNBQThDO0FBQzdDO0lBQVIsS0FBSyxFQUFFOzsyQ0FBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7cURBQXlDO0FBQ3hDO0lBQVIsS0FBSyxFQUFFOzsrQ0FBb0M7QUFDbkM7SUFBUixLQUFLLEVBQUU7O2dEQUFvQztBQUNuQztJQUFSLEtBQUssRUFBRTs7Z0RBQW9DO0FBQ25DO0lBQVIsS0FBSyxFQUFFOztnREFBaUQ7QUFDaEQ7SUFBUixLQUFLLEVBQUU7O21EQUFnRDtBQTdCN0MsZUFBZTtJQU4zQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsNkJBQTZCO1FBRXZDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO2lCQURuQywyQkFBMkI7S0FFckMsQ0FBQztJQXdDcUQsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7cUNBQWhELFVBQVUsRUFBVSxNQUFNLEVBQTJDLE1BQU07R0F2Q3hGLGVBQWUsQ0E4SjNCO1NBOUpZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZ2V0VGlueW1jZSB9IGZyb20gJy4uL1RpbnlNQ0UnO1xuaW1wb3J0ICogYXMgU2NyaXB0TG9hZGVyIGZyb20gJy4uL3V0aWxzL1NjcmlwdExvYWRlcic7XG5pbXBvcnQgeyBiaW5kSGFuZGxlcnMsIGlzVGV4dGFyZWEsIG1lcmdlUGx1Z2lucywgdXVpZCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzL1V0aWxzJztcbmltcG9ydCB7IEV2ZW50cyB9IGZyb20gJy4vRXZlbnRzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuY29uc3Qgc2NyaXB0U3RhdGUgPSBTY3JpcHRMb2FkZXIuY3JlYXRlKCk7XG5cbmNvbnN0IEVESVRPUl9DT01QT05FTlRfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBFZGl0b3JDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZWRpdG9yJyxcbiAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGU+PC9uZy10ZW1wbGF0ZT4nLFxuICBzdHlsZXM6IFsnOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfSddLFxuICBwcm92aWRlcnM6IFtFRElUT1JfQ09NUE9ORU5UX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0b3JDb21wb25lbnQgZXh0ZW5kcyBFdmVudHMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodmFsKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2VkaXRvci5zZXRNb2RlKHZhbCA/ICdyZWFkb25seScgOiAnZGVzaWduJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIGdldCBlZGl0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgfVxuXG4gIHB1YmxpYyBuZ1pvbmU6IE5nWm9uZTtcblxuICBASW5wdXQoKSBwdWJsaWMgY2xvdWRDaGFubmVsID0gJzUnO1xuICBASW5wdXQoKSBwdWJsaWMgYXBpS2V5ID0gJ25vLWFwaS1rZXknO1xuICBASW5wdXQoKSBwdWJsaWMgaW5pdDogUmVjb3JkPHN0cmluZywgYW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIGlkID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBpbml0aWFsVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIGlubGluZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIHRhZ05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIHBsdWdpbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIHRvb2xiYXI6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBmb3JjZUluaXQkOiBPYnNlcnZhYmxlPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2sgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZWxlbWVudFJlZiA9IGVsZW1lbnRSZWY7XG4gICAgdGhpcy5uZ1pvbmUgPSBuZ1pvbmU7XG4gICAgdGhpcy5pbml0aWFsaXNlID0gdGhpcy5pbml0aWFsaXNlLmJpbmQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gdmFsdWUgfHwgdGhpcy5pbml0aWFsVmFsdWU7XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCAnJztcblxuICAgIGlmICh0aGlzLl9lZGl0b3IgJiYgdGhpcy5fZWRpdG9yLmluaXRpYWxpemVkICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2VkaXRvci5zZXRDb250ZW50KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgdGhpcy5fZWRpdG9yLnNldE1vZGUoaXNEaXNhYmxlZCA/ICdyZWFkb25seScgOiAnZGVzaWduJyk7XG4gICAgfSBlbHNlIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmluaXQgPSB7IC4uLnRoaXMuaW5pdCwgcmVhZG9ubHk6IHRydWUgfTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCB1dWlkKCd0aW55LWFuZ3VsYXInKTtcbiAgICAgIHRoaXMuaW5saW5lID1cbiAgICAgICAgdHlwZW9mIHRoaXMuaW5saW5lICE9PSAndW5kZWZpbmVkJyA/ICh0eXBlb2YgdGhpcy5pbmxpbmUgPT09ICdib29sZWFuJyA/IHRoaXMuaW5saW5lIDogdHJ1ZSkgOiB0aGlzLmluaXQgJiYgdGhpcy5pbml0LmlubGluZTtcbiAgICAgIHRoaXMuY3JlYXRlRWxlbWVudCgpO1xuICAgICAgaWYgKGdldFRpbnltY2UoKSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpc2UoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fZWxlbWVudCAmJiB0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jbG91ZENoYW5uZWw7XG4gICAgICAgIGNvbnN0IGFwaUtleSA9IHRoaXMuYXBpS2V5O1xuXG4gICAgICAgIFNjcmlwdExvYWRlci5sb2FkKHNjcmlwdFN0YXRlLCBkb2MsIGBodHRwczovL2Nkbi50aW55LmNsb3VkLzEvJHthcGlLZXl9L3RpbnltY2UvJHtjaGFubmVsfS90aW55bWNlLm1pbi5qc2AsIHRoaXMuaW5pdGlhbGlzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcmNlSW5pdCQpIHtcbiAgICAgIHRoaXMuZm9yY2VJbml0JC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmZvcmNlSW5pdCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlRWRpdG9yKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRWxlbWVudCgpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gdHlwZW9mIHRoaXMudGFnTmFtZSA9PT0gJ3N0cmluZycgPyB0aGlzLnRhZ05hbWUgOiAnZGl2JztcbiAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLmlubGluZSA/IHRhZ05hbWUgOiAndGV4dGFyZWEnKTtcbiAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5pZCA9IHRoaXMuaWQ7XG4gICAgICBpZiAoaXNUZXh0YXJlYSh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaW5pdGlhbGlzZSgpIHtcbiAgICBjb25zdCBmaW5hbEluaXQgPSB7XG4gICAgICAuLi50aGlzLmluaXQsXG4gICAgICB0YXJnZXQ6IHRoaXMuX2VsZW1lbnQsXG4gICAgICBpbmxpbmU6IHRoaXMuaW5saW5lLFxuICAgICAgcmVhZG9ubHk6IHRoaXMuZGlzYWJsZWQsXG4gICAgICBwbHVnaW5zOiBtZXJnZVBsdWdpbnModGhpcy5pbml0ICYmIHRoaXMuaW5pdC5wbHVnaW5zLCB0aGlzLnBsdWdpbnMpLFxuICAgICAgdG9vbGJhcjogdGhpcy50b29sYmFyIHx8ICh0aGlzLmluaXQgJiYgdGhpcy5pbml0LnRvb2xiYXIpLFxuICAgICAgc2V0dXA6IChlZGl0b3I6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIGVkaXRvci5vbignaW5pdCcsIChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdEVkaXRvcihlLCBlZGl0b3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5pbml0ICYmIHR5cGVvZiB0aGlzLmluaXQuc2V0dXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLmluaXQuc2V0dXAoZWRpdG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoaXNUZXh0YXJlYSh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZ2V0VGlueW1jZSgpLmluaXQoZmluYWxJbml0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JjZUluaXQoKSB7XG4gICAgdGhpcy5yZW1vdmVFZGl0b3IoKTtcbiAgICB0aGlzLmluaXRpYWxpc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEVkaXRvcihpbml0RXZlbnQ6IEV2ZW50LCBlZGl0b3I6IGFueSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5pbml0aWFsVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gZWRpdG9yLnNldENvbnRlbnQodGhpcy5pbml0aWFsVmFsdWUpKTtcbiAgICB9XG4gICAgZWRpdG9yLm9uKCdibHVyJywgKCkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKSkpO1xuICAgIGVkaXRvci5vbignY2hhbmdlIGtleXVwIHVuZG8gcmVkbycsICgpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZWRpdG9yLmdldENvbnRlbnQoKSkpKTtcbiAgICBiaW5kSGFuZGxlcnModGhpcywgZWRpdG9yLCBpbml0RXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVFZGl0b3IoKSB7XG4gICAgaWYgKGdldFRpbnltY2UoKSAhPT0gbnVsbCkge1xuICAgICAgZ2V0VGlueW1jZSgpLnJlbW92ZSh0aGlzLl9lZGl0b3IpO1xuICAgIH1cbiAgfVxufVxuIl19