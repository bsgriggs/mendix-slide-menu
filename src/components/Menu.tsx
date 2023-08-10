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
    debugMode: boolean;
    pageName?: EditableValue<string>;
    intervalOffset: number;
    onTabClick?: ActionValue;
    onClickOutside?: ActionValue;
    tagAriaLabel?: string;
}

const Menu = (props: MenuProps): React.ReactElement => {
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
        if (showMenu && props.closeClickOutside) {
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

    return (
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
                                : props.tagOffset
                            : props.screenSide === "TOP"
                            ? showMenu
                                ? props.menuLength
                                : 0
                            : undefined,
                    left:
                        props.screenSide === "TOP" || props.screenSide === "BOTTOM"
                            ? props.center
                                ? "50%"
                                : props.tagOffset
                            : props.screenSide === "LEFT"
                            ? showMenu
                                ? props.menuLength
                                : 0
                            : undefined,
                    right: props.screenSide === "RIGHT" ? (showMenu ? props.menuLength : 0) : undefined,
                    bottom: props.screenSide === "BOTTOM" ? (showMenu ? props.menuLength : 0) : undefined
                }}
                tabIndex={props.tabIndex || 0}
                onClick={onClickHandler}
                aria-label={props.tagType === "TEXT" ? props.tagText : props.tagAriaLabel}
            >
                {props.tagType === "TEXT" ? props.tagText : props.tagContent}
            </button>
            <div
                className="menu background-main"
                aria-hidden={!showMenu}
                style={{
                    width: props.screenSide === "RIGHT" || props.screenSide === "LEFT" ? props.menuLength : "100vw",
                    height: props.screenSide === "TOP" || props.screenSide === "BOTTOM" ? props.menuLength : "100vh",
                    top: props.screenSide === "TOP" ? (showMenu ? 0 : `-${props.menuLength}`) : undefined,
                    right: props.screenSide === "RIGHT" ? (showMenu ? 0 : `-${props.menuLength}`) : undefined,
                    bottom: props.screenSide === "BOTTOM" ? (showMenu ? 0 : `-${props.menuLength}`) : undefined,
                    left: props.screenSide === "LEFT" ? (showMenu ? 0 : `-${props.menuLength}`) : undefined
                }}
            >
                {props.menuContent}
            </div>
        </div>
    );
};

export default Menu;
