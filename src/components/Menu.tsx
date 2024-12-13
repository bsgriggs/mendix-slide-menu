import React, { createElement } from "react";
import classNames from "classnames";
import MxPageName from "../utils/MxPageName";
import useOnClickOutside from "../utils/useOnClickOutside";
import { ActionValue, EditableValue } from "mendix";
import { ScreenSideEnum, TagTypeEnum } from "../../typings/SlideMenuProps";

interface MenuProps {
    class: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    tagType: TagTypeEnum;
    tagText: string;
    tagContent: React.ReactNode;
    menuContent: React.ReactNode;
    screenSide: ScreenSideEnum;
    menuLength: string;
    center: boolean;
    tagOffset: string;
    closeClickOutside: boolean;
    closeTabOutside: boolean;
    openOverride: boolean | undefined;
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

    const debugLog = React.useCallback(
        (message?: any, ...optionalParams: any[]) => {
            if (props.debugMode) {
                console.log(message, ...optionalParams);
            }
        },
        [props.debugMode]
    );

    const updatePageName = React.useCallback(() => {
        const newPageName = MxPageName();
        if (props.pageName?.value !== newPageName) {
            debugLog("updatePageName", `changing page name from '${props.pageName?.value}' to '${newPageName}'`);
            props.pageName?.setValue(newPageName);
        }
    }, [props.pageName, debugLog]);

    const callMxAction = React.useCallback(
        (mxAction: ActionValue | undefined, actionName: string) => {
            if (mxAction) {
                if (mxAction.canExecute) {
                    mxAction.execute();
                } else {
                    debugLog("callMxAction", `user does not have permission to call action '${actionName}'`);
                }
            }
        },
        [debugLog]
    );

    const onClickHandler = (): void => {
        setOpen(!open);
        updatePageName();
        callMxAction(props.onTabClick, "onTabClick");
    };

    useOnClickOutside(menuRef, () => {
        debugLog("onClickOutside", "Click outside of the slide menu detected");
        if (open && props.closeClickOutside) {
            debugLog("onClickOutside", "closing the menu");
            setOpen(false);
        }
        updatePageName();
        callMxAction(props.onClickOutside, "onClickOutside");
    });

    // polling to check the page name
    React.useEffect(() => {
        if (props.pageName && props.intervalOffset > 0) {
            const interval = setInterval(() => {
                debugLog("polling page name", MxPageName());
                updatePageName();
            }, props.intervalOffset);
            return () => clearInterval(interval);
        }
    }, [props.pageName, debugLog, props.intervalOffset, updatePageName]);

    React.useEffect(() => {
        debugLog("open override useEffect, new value:", props.openOverride);
        setOpen(props.openOverride !== undefined ? props.openOverride : false);
    }, [props.openOverride]);

    //wait for the menu to visibly close before un-rendering content.
    //Content must be un-rendered to prevent tabbing
    React.useEffect(() => {
        if (open !== showMenuContent) {
            debugLog("update show content useEffect, new value:", open);
            !open ? setTimeout(() => setShowMenuContent(false), 500) : setShowMenuContent(true);
        }
    }, [open]);

    debugLog("props", props);

    debugLog("state", { open, showMenuContent, menuRef });

    return (
        <div
            className={classNames("slide-menu", props.class, open ? "open" : "closed", props.screenSide.toLowerCase(), {
                center: props.center
            })}
            style={props.style}
            ref={menuRef}
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
                                ? props.menuLength
                                : 0
                            : undefined,
                    left:
                        props.screenSide === "TOP" || props.screenSide === "BOTTOM"
                            ? props.center
                                ? "50%"
                                : props.tagOffset
                            : props.screenSide === "LEFT"
                            ? open
                                ? props.menuLength
                                : 0
                            : undefined,
                    right: props.screenSide === "RIGHT" ? (open ? props.menuLength : 0) : undefined,
                    bottom: props.screenSide === "BOTTOM" ? (open ? props.menuLength : 0) : undefined
                }}
                tabIndex={props.tabIndex || 0}
                onClick={onClickHandler}
                aria-label={props.tagAriaLabel ? props.tagAriaLabel : props.tagText}
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
                    width: props.screenSide === "RIGHT" || props.screenSide === "LEFT" ? props.menuLength : "100vw",
                    height: props.screenSide === "TOP" || props.screenSide === "BOTTOM" ? props.menuLength : "100vh",
                    top: props.screenSide === "TOP" ? (open ? 0 : `-${props.menuLength}`) : undefined,
                    right: props.screenSide === "RIGHT" ? (open ? 0 : `-${props.menuLength}`) : undefined,
                    bottom: props.screenSide === "BOTTOM" ? (open ? 0 : `-${props.menuLength}`) : undefined,
                    left: props.screenSide === "LEFT" ? (open ? 0 : `-${props.menuLength}`) : undefined
                }}
                onKeyDown={event => {
                    if (event.key === "Tab" && props.closeClickOutside) {
                        setTimeout(() => {
                            debugLog("tab clicked", { menu: menuRef.current, active: document.activeElement });
                            if (!menuRef.current?.contains(document.activeElement)) {
                                setOpen(false);
                            }
                        }, 100);
                    }
                }}
            >
                {showMenuContent ? props.menuContent : <React.Fragment />}
            </div>
        </div>
    );
};

export default Menu;
