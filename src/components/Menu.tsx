import React, { createElement } from "react";
import classNames from "classnames";
import getMxPageName from "../utils/getMxPageName";
import useOnClickOutside from "../utils/useOnClickOutside";
import { ActionValue, EditableValue } from "mendix";
import { MenuStateTypeEnum, ScreenSideEnum, TagTypeEnum } from "../../typings/SlideMenuProps";
import useWindowWidth from "../utils/useWindowWidth";

interface MenuProps {
    class: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    tagType: TagTypeEnum;
    tagText: string;
    tagContent: React.ReactNode;
    menuContent: React.ReactNode;
    screenSide: ScreenSideEnum;
    menuLengthDesktop: string;
    menuLengthTablet: string;
    menuLengthPhone: string;
    center: boolean;
    tagOffset: string;
    toggleOnHover: boolean;
    closeClickOutside: boolean;
    closeTabOutside: boolean;
    menuStateType: MenuStateTypeEnum;
    openOverride: boolean | undefined;
    openAttribute: EditableValue<boolean> | undefined;
    debugMode: boolean;
    usePortal: boolean;
    pageName?: EditableValue<string>;
    intervalOffset: number;
    onTabClick?: ActionValue;
    onClickOutside?: ActionValue;
    tagAriaLabel?: string;
    modalAriaLabel?: string;
}

const Menu = (props: MenuProps): React.ReactElement => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [showMenuContent, setShowMenuContent] = React.useState<boolean>(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const tagRef = React.useRef<HTMLButtonElement>(null);
    const windowWidth = useWindowWidth();

    const debugLog = React.useCallback(
        (message?: any, ...optionalParams: any[]) => {
            if (props.debugMode === true) {
                console.log(message, ...optionalParams);
            }
        },
        [props.debugMode]
    );

    const length: string = React.useMemo(() => {
        let newLength;
        if (windowWidth > 992) {
            newLength = props.menuLengthDesktop || "40%";
            debugLog(`new menu length ${newLength} based on screen width ${windowWidth}. Assumed DESKTOP`);
        } else if (windowWidth > 768) {
            newLength = props.menuLengthTablet || "60%";
            debugLog(`new menu length ${newLength} based on screen width ${windowWidth}. Assumed TABLET`);
        } else {
            newLength = props.menuLengthPhone || "85%";
            debugLog(`new menu length ${newLength} based on screen width ${windowWidth}. Assumed PHONE`);
        }

        return newLength;
    }, [props.menuLengthDesktop, props.menuLengthTablet, props.menuLengthPhone, windowWidth, debugLog]);

    const updatePageName = React.useCallback(() => {
        if (props.pageName) {
            const newPageName = getMxPageName();
            if (props.pageName?.value !== newPageName) {
                debugLog("updatePageName", `changing page name from '${props.pageName?.value}' to '${newPageName}'`);
                props.pageName?.setValue(newPageName);
            }
        }
    }, [props.pageName, debugLog]);

    const callMxAction = React.useCallback(
        (mxAction: ActionValue | undefined, actionName: string) => {
            if (mxAction) {
                debugLog("callMxAction", `attempting to call action '${actionName}'`, mxAction);
                if (mxAction.canExecute) {
                    mxAction.execute();
                    debugLog("callMxAction", `called'${actionName}'`, mxAction);
                } else {
                    debugLog("callMxAction", `user does not have permission to call action '${actionName}'`);
                }
            }
        },
        [debugLog]
    );

    const setMenuState = (newState: boolean): void => {
        setOpen(newState);
        if (props.menuStateType === "ATTRIBUTE" && props.openAttribute) {
            props.openAttribute.setValue(newState);
        }
    };

    const onClickHandler = (): void => {
        setMenuState(!open);
        updatePageName();
        callMxAction(props.onTabClick, "onTabClick");
    };

    useOnClickOutside(menuRef, () => {
        debugLog("onClickOutside", "Click outside of the slide menu detected");
        if (open && props.closeClickOutside) {
            debugLog("onClickOutside", "closing the menu");
            setMenuState(false);
        }
        updatePageName();
        callMxAction(props.onClickOutside, "onClickOutside");
    });

    // polling to check the page name
    React.useEffect(() => {
        if (props.pageName && props.intervalOffset > 0) {
            const interval = setInterval(() => {
                debugLog("polling page name", getMxPageName());
                updatePageName();
            }, props.intervalOffset);
            return () => clearInterval(interval);
        }
    }, [props.pageName, debugLog, props.intervalOffset, updatePageName]);

    // handle the menu state changing outside the widget
    React.useEffect(() => {
        if (props.menuStateType === "EXPRESSION_OVERRIDE") {
            debugLog("open override useEffect, new value:", props.openOverride);
            setMenuState(props.openOverride !== undefined ? props.openOverride : false);
        } else {
            debugLog("open attribute useEffect, new value:", props.openAttribute);
            setMenuState(props.openAttribute !== undefined ? props.openAttribute?.value === true : false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.openOverride, props.openAttribute, props.menuStateType, debugLog]);

    // wait for the menu to visibly close before un-rendering content.
    // Content must be un-rendered to prevent tabbing
    React.useEffect(() => {
        const handler = setTimeout(
            () => {
                setShowMenuContent(open);
            },
            open ? 0 : 300
        );

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, debugLog]);

    debugLog("props", props);

    debugLog("state", { open, showMenuContent, menuRef, tagRef, windowWidth });

    return (
        <div
            className={classNames("slide-menu", props.class, open ? "open" : "closed", props.screenSide.toLowerCase(), {
                center: props.center
            })}
            style={props.style}
            ref={menuRef}
            onMouseLeave={props.toggleOnHover ? () => setMenuState(false) : undefined}
        >
            <button
                ref={tagRef}
                className="btn mx-button tag"
                style={{
                    top:
                        props.screenSide === "LEFT" || props.screenSide === "RIGHT"
                            ? props.center
                                ? "50%"
                                : props.tagOffset
                            : props.screenSide === "TOP"
                            ? open
                                ? length
                                : 0
                            : undefined,
                    left:
                        props.screenSide === "TOP" || props.screenSide === "BOTTOM"
                            ? props.center
                                ? "50%"
                                : props.tagOffset
                            : props.screenSide === "LEFT"
                            ? open
                                ? length
                                : 0
                            : undefined,
                    right: props.screenSide === "RIGHT" ? (open ? length : 0) : undefined,
                    bottom: props.screenSide === "BOTTOM" ? (open ? length : 0) : undefined
                }}
                tabIndex={props.tabIndex || 0}
                onClick={onClickHandler}
                aria-label={props.tagAriaLabel ? props.tagAriaLabel : props.tagText}
                onMouseEnter={props.toggleOnHover ? () => setMenuState(true) : undefined}
            >
                {props.tagType === "TEXT" ? props.tagText : props.tagContent}
            </button>
            <div
                className="menu background-main"
                role={props.usePortal ? "dialog" : undefined}
                aria-modal={props.usePortal ? "true" : undefined}
                aria-label={
                    props.modalAriaLabel
                        ? props.modalAriaLabel
                        : props.tagAriaLabel
                        ? props.tagAriaLabel
                        : props.tagText
                }
                style={{
                    width: props.screenSide === "RIGHT" || props.screenSide === "LEFT" ? length : "100vw",
                    height: props.screenSide === "TOP" || props.screenSide === "BOTTOM" ? length : "100vh",
                    top: props.screenSide === "TOP" ? (open ? 0 : `-${length}`) : undefined,
                    right: props.screenSide === "RIGHT" ? (open ? 0 : `-${length}`) : undefined,
                    bottom: props.screenSide === "BOTTOM" ? (open ? 0 : `-${length}`) : undefined,
                    left: props.screenSide === "LEFT" ? (open ? 0 : `-${length}`) : undefined
                }}
                onKeyDown={event => {
                    if (event.key === "Tab" && props.closeTabOutside) {
                        setTimeout(() => {
                            debugLog("tab clicked", { menu: menuRef.current, active: document.activeElement });
                            if (!menuRef.current?.contains(document.activeElement)) {
                                setMenuState(false);
                            }
                        }, 100);
                    }
                }}
                onMouseEnter={() => setMenuState(true)}
            >
                {showMenuContent ? props.menuContent : <React.Fragment />}
            </div>
        </div>
    );
};

export default Menu;
