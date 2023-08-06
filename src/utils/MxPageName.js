/**
 * @param {} params
 * @returns {string}
 * This must be in a separate file, because you cannot use mx core apis in typescript
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MxPageName = () =>
    // eslint-disable-next-line no-undef
    mx.ui.getContentForm().path;

export default MxPageName;
