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
var scriptState = ScriptLoader.create();
var EDITOR_COMPONENT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return EditorComponent; }),
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
        if (isPlatformBrowser(this.platformId)) {
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
                ScriptLoader.load(scriptState, doc, "https://cdn.tiny.cloud/1/" + apiKey + "/tinymce/" + channel + "/tinymce.min.js", this.initialise);
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
    return EditorComponent;
}(Events));
export { EditorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0aW55bWNlL3RpbnltY2UtYW5ndWxhci8iLCJzb3VyY2VzIjpbImVkaXRvci9lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sS0FBSyxZQUFZLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2xDLElBQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUxQyxJQUFNLCtCQUErQixHQUFHO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZUFBZSxFQUFmLENBQWUsQ0FBQztJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFRRjtJQUFxQyxtQ0FBTTtJQXVDekMseUJBQVksVUFBc0IsRUFBRSxNQUFjLEVBQStCLFVBQWtCO1FBQW5HLFlBQ0UsaUJBQU8sU0FJUjtRQUxnRixnQkFBVSxHQUFWLFVBQVUsQ0FBUTtRQW5CbkYsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFD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LElBQUksRUFBRTtZQUN6QixVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQTFKRDtRQURDLEtBQUssRUFBRTs7O21EQU1QO0lBWVE7UUFBUixLQUFLLEVBQUU7O3lEQUEyQjtJQUMxQjtRQUFSLEtBQUssRUFBRTs7bURBQThCO0lBQzdCO1FBQVIsS0FBSyxFQUFFOztpREFBOEM7SUFDN0M7UUFBUixLQUFLLEVBQUU7OytDQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzt5REFBeUM7SUFDeEM7UUFBUixLQUFLLEVBQUU7O21EQUFvQztJQUNuQztRQUFSLEtBQUssRUFBRTs7b0RBQW9DO0lBQ25DO1FBQVIsS0FBSyxFQUFFOztvREFBb0M7SUFDbkM7UUFBUixLQUFLLEVBQUU7O29EQUFpRDtJQUNoRDtRQUFSLEtBQUssRUFBRTs7dURBQWdEO0lBN0I3QyxlQUFlO1FBTjNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSw2QkFBNkI7WUFFdkMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7cUJBRG5DLDJCQUEyQjtTQUVyQyxDQUFDO1FBd0NxRCxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTt5Q0FBaEQsVUFBVSxFQUFVLE1BQU0sRUFBMkMsTUFBTTtPQXZDeEYsZUFBZSxDQThKM0I7SUFBRCxzQkFBQztDQUFBLEFBOUpELENBQXFDLE1BQU0sR0E4SjFDO1NBOUpZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZ2V0VGlueW1jZSB9IGZyb20gJy4uL1RpbnlNQ0UnO1xuaW1wb3J0ICogYXMgU2NyaXB0TG9hZGVyIGZyb20gJy4uL3V0aWxzL1NjcmlwdExvYWRlcic7XG5pbXBvcnQgeyBiaW5kSGFuZGxlcnMsIGlzVGV4dGFyZWEsIG1lcmdlUGx1Z2lucywgdXVpZCwgbm9vcCB9IGZyb20gJy4uL3V0aWxzL1V0aWxzJztcbmltcG9ydCB7IEV2ZW50cyB9IGZyb20gJy4vRXZlbnRzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuY29uc3Qgc2NyaXB0U3RhdGUgPSBTY3JpcHRMb2FkZXIuY3JlYXRlKCk7XG5cbmNvbnN0IEVESVRPUl9DT01QT05FTlRfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBFZGl0b3JDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZWRpdG9yJyxcbiAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGU+PC9uZy10ZW1wbGF0ZT4nLFxuICBzdHlsZXM6IFsnOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfSddLFxuICBwcm92aWRlcnM6IFtFRElUT1JfQ09NUE9ORU5UX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0b3JDb21wb25lbnQgZXh0ZW5kcyBFdmVudHMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodmFsKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2VkaXRvci5zZXRNb2RlKHZhbCA/ICdyZWFkb25seScgOiAnZGVzaWduJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIGdldCBlZGl0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgfVxuXG4gIHB1YmxpYyBuZ1pvbmU6IE5nWm9uZTtcblxuICBASW5wdXQoKSBwdWJsaWMgY2xvdWRDaGFubmVsID0gJzUnO1xuICBASW5wdXQoKSBwdWJsaWMgYXBpS2V5ID0gJ25vLWFwaS1rZXknO1xuICBASW5wdXQoKSBwdWJsaWMgaW5pdDogUmVjb3JkPHN0cmluZywgYW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIGlkID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBpbml0aWFsVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIGlubGluZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIHRhZ05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIHBsdWdpbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIHRvb2xiYXI6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBmb3JjZUluaXQkOiBPYnNlcnZhYmxlPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2sgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZWxlbWVudFJlZiA9IGVsZW1lbnRSZWY7XG4gICAgdGhpcy5uZ1pvbmUgPSBuZ1pvbmU7XG4gICAgdGhpcy5pbml0aWFsaXNlID0gdGhpcy5pbml0aWFsaXNlLmJpbmQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gdmFsdWUgfHwgdGhpcy5pbml0aWFsVmFsdWU7XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCAnJztcblxuICAgIGlmICh0aGlzLl9lZGl0b3IgJiYgdGhpcy5fZWRpdG9yLmluaXRpYWxpemVkICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2VkaXRvci5zZXRDb250ZW50KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgdGhpcy5fZWRpdG9yLnNldE1vZGUoaXNEaXNhYmxlZCA/ICdyZWFkb25seScgOiAnZGVzaWduJyk7XG4gICAgfSBlbHNlIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmluaXQgPSB7IC4uLnRoaXMuaW5pdCwgcmVhZG9ubHk6IHRydWUgfTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCB1dWlkKCd0aW55LWFuZ3VsYXInKTtcbiAgICAgIHRoaXMuaW5saW5lID1cbiAgICAgICAgdHlwZW9mIHRoaXMuaW5saW5lICE9PSAndW5kZWZpbmVkJyA/ICh0eXBlb2YgdGhpcy5pbmxpbmUgPT09ICdib29sZWFuJyA/IHRoaXMuaW5saW5lIDogdHJ1ZSkgOiB0aGlzLmluaXQgJiYgdGhpcy5pbml0LmlubGluZTtcbiAgICAgIHRoaXMuY3JlYXRlRWxlbWVudCgpO1xuICAgICAgaWYgKGdldFRpbnltY2UoKSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpc2UoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fZWxlbWVudCAmJiB0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jbG91ZENoYW5uZWw7XG4gICAgICAgIGNvbnN0IGFwaUtleSA9IHRoaXMuYXBpS2V5O1xuXG4gICAgICAgIFNjcmlwdExvYWRlci5sb2FkKHNjcmlwdFN0YXRlLCBkb2MsIGBodHRwczovL2Nkbi50aW55LmNsb3VkLzEvJHthcGlLZXl9L3RpbnltY2UvJHtjaGFubmVsfS90aW55bWNlLm1pbi5qc2AsIHRoaXMuaW5pdGlhbGlzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcmNlSW5pdCQpIHtcbiAgICAgIHRoaXMuZm9yY2VJbml0JC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmZvcmNlSW5pdCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlRWRpdG9yKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRWxlbWVudCgpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gdHlwZW9mIHRoaXMudGFnTmFtZSA9PT0gJ3N0cmluZycgPyB0aGlzLnRhZ05hbWUgOiAnZGl2JztcbiAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLmlubGluZSA/IHRhZ05hbWUgOiAndGV4dGFyZWEnKTtcbiAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5pZCA9IHRoaXMuaWQ7XG4gICAgICBpZiAoaXNUZXh0YXJlYSh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaW5pdGlhbGlzZSgpIHtcbiAgICBjb25zdCBmaW5hbEluaXQgPSB7XG4gICAgICAuLi50aGlzLmluaXQsXG4gICAgICB0YXJnZXQ6IHRoaXMuX2VsZW1lbnQsXG4gICAgICBpbmxpbmU6IHRoaXMuaW5saW5lLFxuICAgICAgcmVhZG9ubHk6IHRoaXMuZGlzYWJsZWQsXG4gICAgICBwbHVnaW5zOiBtZXJnZVBsdWdpbnModGhpcy5pbml0ICYmIHRoaXMuaW5pdC5wbHVnaW5zLCB0aGlzLnBsdWdpbnMpLFxuICAgICAgdG9vbGJhcjogdGhpcy50b29sYmFyIHx8ICh0aGlzLmluaXQgJiYgdGhpcy5pbml0LnRvb2xiYXIpLFxuICAgICAgc2V0dXA6IChlZGl0b3I6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIGVkaXRvci5vbignaW5pdCcsIChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdEVkaXRvcihlLCBlZGl0b3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5pbml0ICYmIHR5cGVvZiB0aGlzLmluaXQuc2V0dXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLmluaXQuc2V0dXAoZWRpdG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoaXNUZXh0YXJlYSh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZ2V0VGlueW1jZSgpLmluaXQoZmluYWxJbml0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JjZUluaXQoKSB7XG4gICAgdGhpcy5yZW1vdmVFZGl0b3IoKTtcbiAgICB0aGlzLmluaXRpYWxpc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEVkaXRvcihpbml0RXZlbnQ6IEV2ZW50LCBlZGl0b3I6IGFueSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5pbml0aWFsVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gZWRpdG9yLnNldENvbnRlbnQodGhpcy5pbml0aWFsVmFsdWUpKTtcbiAgICB9XG4gICAgZWRpdG9yLm9uKCdibHVyJywgKCkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKSkpO1xuICAgIGVkaXRvci5vbignY2hhbmdlIGtleXVwIHVuZG8gcmVkbycsICgpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZWRpdG9yLmdldENvbnRlbnQoKSkpKTtcbiAgICBiaW5kSGFuZGxlcnModGhpcywgZWRpdG9yLCBpbml0RXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVFZGl0b3IoKSB7XG4gICAgaWYgKGdldFRpbnltY2UoKSAhPT0gbnVsbCkge1xuICAgICAgZ2V0VGlueW1jZSgpLnJlbW92ZSh0aGlzLl9lZGl0b3IpO1xuICAgIH1cbiAgfVxufVxuIl19