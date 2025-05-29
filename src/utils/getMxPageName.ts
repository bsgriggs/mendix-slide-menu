const getMxPageName = (): string => {
    /* eslint-disable */
    // @ts-ignore
    return window.dojo !== undefined ? mx.ui.getContentForm().path : window.history.state.pageName;
    /* eslint-enable */
};
export default getMxPageName;
