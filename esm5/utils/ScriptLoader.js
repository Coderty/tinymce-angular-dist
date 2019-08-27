/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { uuid } from './Utils';
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
var ɵ0 = injectScriptTag;
var create = function () {
    return {
        listeners: [],
        scriptId: uuid('tiny-script'),
        scriptLoaded: false
    };
};
var ɵ1 = create;
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
var ɵ2 = load;
export { create, load };
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyaXB0TG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRpbnltY2UvdGlueW1jZS1hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvU2NyaXB0TG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFTL0IsSUFBTSxlQUFlLEdBQUcsVUFBQyxRQUFnQixFQUFFLEdBQWEsRUFBRSxHQUFXLEVBQUUsUUFBb0I7SUFDekYsSUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxTQUFTLENBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO0lBQzFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0MsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDcEIsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ1osR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDLENBQUM7O0FBRUYsSUFBTSxNQUFNLEdBQUc7SUFDYixPQUFPO1FBQ0wsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM3QixZQUFZLEVBQUUsS0FBSztLQUNwQixDQUFDO0FBQ0osQ0FBQyxDQUFDOztBQUVGLElBQU0sSUFBSSxHQUFHLFVBQUMsS0FBZ0IsRUFBRSxHQUFhLEVBQUUsR0FBVyxFQUFFLFFBQW9CO0lBQzlFLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtRQUN0QixRQUFRLEVBQUUsQ0FBQztLQUNaO1NBQU07UUFDTCxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdkMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDeEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUFFLEVBQUUsRUFBSixDQUFJLENBQUMsQ0FBQztnQkFDdEMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLE9BQU8sRUFDTCxNQUFNLEVBQ04sSUFBSSxFQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNy1wcmVzZW50LCBFcGhveCwgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSAyIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbmltcG9ydCB7IHV1aWQgfSBmcm9tICcuL1V0aWxzJztcblxuZXhwb3J0IHR5cGUgY2FsbGJhY2tGbiA9ICgpID0+IHZvaWQ7XG5leHBvcnQgaW50ZXJmYWNlIElTdGF0ZU9iaiB7XG4gIGxpc3RlbmVyczogY2FsbGJhY2tGbltdO1xuICBzY3JpcHRJZDogc3RyaW5nO1xuICBzY3JpcHRMb2FkZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGluamVjdFNjcmlwdFRhZyA9IChzY3JpcHRJZDogc3RyaW5nLCBkb2M6IERvY3VtZW50LCB1cmw6IHN0cmluZywgY2FsbGJhY2s6IGNhbGxiYWNrRm4pID0+IHtcbiAgY29uc3Qgc2NyaXB0VGFnID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzY3JpcHRUYWcudHlwZSA9ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JztcbiAgc2NyaXB0VGFnLmlkID0gc2NyaXB0SWQ7XG4gIHNjcmlwdFRhZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2FsbGJhY2spO1xuICBzY3JpcHRUYWcuc3JjID0gdXJsO1xuICBpZiAoZG9jLmhlYWQpIHtcbiAgICBkb2MuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHRUYWcpO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGUgPSAoKTogSVN0YXRlT2JqID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsaXN0ZW5lcnM6IFtdLFxuICAgIHNjcmlwdElkOiB1dWlkKCd0aW55LXNjcmlwdCcpLFxuICAgIHNjcmlwdExvYWRlZDogZmFsc2VcbiAgfTtcbn07XG5cbmNvbnN0IGxvYWQgPSAoc3RhdGU6IElTdGF0ZU9iaiwgZG9jOiBEb2N1bWVudCwgdXJsOiBzdHJpbmcsIGNhbGxiYWNrOiBjYWxsYmFja0ZuKSA9PiB7XG4gIGlmIChzdGF0ZS5zY3JpcHRMb2FkZWQpIHtcbiAgICBjYWxsYmFjaygpO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmxpc3RlbmVycy5wdXNoKGNhbGxiYWNrKTtcbiAgICBpZiAoIWRvYy5nZXRFbGVtZW50QnlJZChzdGF0ZS5zY3JpcHRJZCkpIHtcbiAgICAgIGluamVjdFNjcmlwdFRhZyhzdGF0ZS5zY3JpcHRJZCwgZG9jLCB1cmwsICgpID0+IHtcbiAgICAgICAgc3RhdGUubGlzdGVuZXJzLmZvckVhY2goKGZuKSA9PiBmbigpKTtcbiAgICAgICAgc3RhdGUuc2NyaXB0TG9hZGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlLFxuICBsb2FkXG59OyJdfQ==