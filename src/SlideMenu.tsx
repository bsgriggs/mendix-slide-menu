import React, { createElement } from "react";
import { SlideMenuContainerProps } from "../typings/SlideMenuProps";
import "./ui/SlideMenu.scss";
import classNames from "classnames";
import { createPortal } from "react-dom";
import MxPageName from "./utils/MxPageName";
import useOnClickOutside from "./utils/useOnClickOutside";
import { ActionValue } from "mendix";

export function SlideMenu(props: SlideMenuContainerProps): React.ReactElement {
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

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
        setShowMenu(!showMenu);
        updatePageName();
        callMxAction(props.onTabClick, "onTabClick");
    };

    useOnClickOutside(menuRef, () => {
        debugLog("onClickOutside", "Click outside of the slide menu detected");
        if (showMenu && (props.closeClickOutside.value as boolean)) {
            debugLog("onClickOutside", "closing the menu");
            setShowMenu(false);
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

    debugLog("props", props);

    debugLog("state", { showMenu, menuRef });

    return createPortal(
        <div
            className={classNames(
                "slide-menu",
                props.class,
                showMenu ? "open" : "closed",
                props.screenSide.toLowerCase(),
                {
                    center: props.center
                }
            )}
            style={props.style}
            ref={menuRef}
        >
            <button
                className="btn mx-button tag"
                style={{
                    top:
                        props.screenSide === "LEFT" || props.screenSide === "RIGHT"
                            ? props.center
                                ? "50%"
                                : props.tagOffset.value
                            : props.screenSide === "TOP"
                            ? showMenu
                                ? (props.menuLength.value as string)
                                : 0
                            : undefined,
                    left:
                        props.screenSide === "TOP" || props.screenSide === "BOTTOM"
                            ? props.center
                                ? "50%"
                                : props.tagOffset.value
                            : props.screenSide === "LEFT"
                            ? showMenu
                                ? (props.menuLength.value as string)
                                : 0
                            : undefined,
                    right:
                        props.screenSide === "RIGHT" ? (showMenu ? (props.menuLength.value as string) : 0) : undefined,
                    bottom:
                        props.screenSide === "BOTTOM" ? (showMenu ? (props.menuLength.value as string) : 0) : undefined
                }}
                tabIndex={props.tabIndex || 0}
                onClick={onClickHandler}
                aria-label={props.tagType === "TEXT" ? props.tagText.value : props.tagAriaLabel?.value}
            >
                {props.tagType === "TEXT" ? props.tagText.value : props.tagContent}
            </button>
            <div
                className="menu background-main"
                aria-hidden={!showMenu}
                style={{
                    width:
                        props.screenSide === "RIGHT" || props.screenSide === "LEFT"
                            ? (props.menuLength.value as string)
                            : "100vw",
                    height:
                        props.screenSide === "TOP" || props.screenSide === "BOTTOM"
                            ? (props.menuLength.value as string)
                            : "100vh",
                    top:
                        props.screenSide === "TOP"
                            ? showMenu
                                ? 0
                                : `-${props.menuLength.value as string}`
                            : undefined,
                    right:
                        props.screenSide === "RIGHT"
                            ? showMenu
                                ? 0
                                : `-${props.menuLength.value as string}`
                            : undefined,
                    bottom:
                        props.screenSide === "BOTTOM"
                            ? showMenu
                                ? 0
                                : `-${props.menuLength.value as string}`
                            : undefined,
                    left:
                        props.screenSide === "LEFT"
                            ? showMenu
                                ? 0
                                : `-${props.menuLength.value as string}`
                            : undefined
                }}
            >
                {props.menuContent}
            </div>
        </div>,
        document.body
    );
}
