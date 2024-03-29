/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { validEvents } from '../editor/Events';
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
const ɵ0 = bindHandlers;
let unique = 0;
const uuid = (prefix) => {
    const date = new Date();
    const time = date.getTime();
    const random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
const ɵ1 = uuid;
const isTextarea = (element) => {
    return typeof element !== 'undefined' && element.tagName.toLowerCase() === 'textarea';
};
const ɵ2 = isTextarea;
const normalizePluginArray = (plugins) => {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(' ');
};
const ɵ3 = normalizePluginArray;
const mergePlugins = (initPlugins, inputPlugins) => normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
const ɵ4 = mergePlugins;
// tslint:disable-next-line:no-empty
const noop = () => { };
const ɵ5 = noop;
export { bindHandlers, uuid, isTextarea, normalizePluginArray, mergePlugins, noop };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGlueW1jZS90aW55bWNlLWFuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0MsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFvQixFQUFFLE1BQVcsRUFBRSxTQUFnQixFQUFRLEVBQUU7SUFDakYsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sWUFBWSxHQUFzQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQzFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0wsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9HO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7O0FBRUYsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFjLEVBQVUsRUFBRTtJQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQztJQUV0RCxNQUFNLEVBQUUsQ0FBQztJQUVULE9BQU8sTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUM7O0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFpQixFQUFrQyxFQUFFO0lBQ3ZFLE9BQU8sT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVSxDQUFDO0FBQ3hGLENBQUMsQ0FBQzs7QUFFRixNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBMkIsRUFBWSxFQUFFO0lBQ3JFLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7UUFDcEQsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQzs7QUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLFdBQThCLEVBQUUsWUFBZ0MsRUFBRSxFQUFFLENBQ3hGLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztBQUUvRSxvQ0FBb0M7QUFDcEMsTUFBTSxJQUFJLEdBQTZCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFakQsT0FBTyxFQUNMLFlBQVksRUFDWixJQUFJLEVBQ0osVUFBVSxFQUNWLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osSUFBSSxFQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNy1wcmVzZW50LCBFcGhveCwgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSAyIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vZWRpdG9yL2VkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgdmFsaWRFdmVudHMgfSBmcm9tICcuLi9lZGl0b3IvRXZlbnRzJztcblxuY29uc3QgYmluZEhhbmRsZXJzID0gKGN0eDogRWRpdG9yQ29tcG9uZW50LCBlZGl0b3I6IGFueSwgaW5pdEV2ZW50OiBFdmVudCk6IHZvaWQgPT4ge1xuICB2YWxpZEV2ZW50cy5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICBjb25zdCBldmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gY3R4W2V2ZW50TmFtZV07XG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gJ29uSW5pdCcpIHtcbiAgICAgIGN0eC5uZ1pvbmUucnVuKCgpID0+IGV2ZW50RW1pdHRlci5lbWl0KHsgZXZlbnQ6IGluaXRFdmVudCwgZWRpdG9yIH0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWRpdG9yLm9uKGV2ZW50TmFtZS5zdWJzdHJpbmcoMiksIChldmVudDogYW55KSA9PiBjdHgubmdab25lLnJ1bigoKSA9PiBldmVudEVtaXR0ZXIuZW1pdCh7IGV2ZW50LCBlZGl0b3IgfSkpKTtcbiAgICB9XG4gIH0pO1xufTtcblxubGV0IHVuaXF1ZSA9IDA7XG5cbmNvbnN0IHV1aWQgPSAocHJlZml4OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3QgdGltZSA9IGRhdGUuZ2V0VGltZSgpO1xuICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwKTtcblxuICB1bmlxdWUrKztcblxuICByZXR1cm4gcHJlZml4ICsgJ18nICsgcmFuZG9tICsgdW5pcXVlICsgU3RyaW5nKHRpbWUpO1xufTtcblxuY29uc3QgaXNUZXh0YXJlYSA9IChlbGVtZW50PzogRWxlbWVudCk6IGVsZW1lbnQgaXMgSFRNTFRleHRBcmVhRWxlbWVudCA9PiB7XG4gIHJldHVybiB0eXBlb2YgZWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYSc7XG59O1xuXG5jb25zdCBub3JtYWxpemVQbHVnaW5BcnJheSA9IChwbHVnaW5zPzogc3RyaW5nIHwgc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3VuZGVmaW5lZCcgfHwgcGx1Z2lucyA9PT0gJycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gQXJyYXkuaXNBcnJheShwbHVnaW5zKSA/IHBsdWdpbnMgOiBwbHVnaW5zLnNwbGl0KCcgJyk7XG59O1xuXG5jb25zdCBtZXJnZVBsdWdpbnMgPSAoaW5pdFBsdWdpbnM6IHN0cmluZyB8IHN0cmluZ1tdLCBpbnB1dFBsdWdpbnM/OiBzdHJpbmcgfCBzdHJpbmdbXSkgPT5cbiAgbm9ybWFsaXplUGx1Z2luQXJyYXkoaW5pdFBsdWdpbnMpLmNvbmNhdChub3JtYWxpemVQbHVnaW5BcnJheShpbnB1dFBsdWdpbnMpKTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG5jb25zdCBub29wOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbmV4cG9ydCB7XG4gIGJpbmRIYW5kbGVycyxcbiAgdXVpZCxcbiAgaXNUZXh0YXJlYSxcbiAgbm9ybWFsaXplUGx1Z2luQXJyYXksXG4gIG1lcmdlUGx1Z2lucyxcbiAgbm9vcFxufTtcbiJdfQ==