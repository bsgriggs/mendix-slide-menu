import React, { createElement } from "react";
import { SlideMenuContainerProps } from "../typings/SlideMenuProps";
import "./ui/SlideMenu.scss";
import classNames from "classnames";
import { createPortal } from "react-dom";
import MxPageName from "./utils/MxPageName";
import useOnClickOutside from "./utils/useOnClickOutside";

export function SlideMenu({
    class: className,
    style,
    tabIndex,
    tabContent,
    screenSide,
    menuContent,
    pageName,
    topOffset,
    menuWidth,
    center,
    onTabClick,
    closeClickOutside
}: SlideMenuContainerProps): React.ReactElement {
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const onClickHandler = (): void => {
        setShowMenu(!showMenu);
        pageName?.setValue(MxPageName());
        onTabClick?.execute();
    };

    useOnClickOutside(menuRef, () => {
        if (showMenu && (closeClickOutside.value as boolean)) {
            setShowMenu(!showMenu);
        }
        pageName?.setValue(MxPageName());
    });

    return createPortal(
        <div
            className={classNames(
                "slide-menu",
                className,
                showMenu ? "open" : "closed",
                screenSide === "LEFT" ? "left" : "right",
                { center: center }
            )}
            style={style}
            ref={menuRef}
        >
            <button
                className="btn mx-button tag"
                style={{
                    top: center ? "50%" : topOffset.value,
                    right: screenSide === "RIGHT" ? (showMenu ? (menuWidth.value as string) : 0) : undefined,
                    left: screenSide === "LEFT" ? (showMenu ? (menuWidth.value as string) : 0) : undefined
                }}
                tabIndex={tabIndex || 0}
                onClick={onClickHandler}
            >
                {tabContent}
            </button>
            <div
                className="menu background-secondary"
                aria-hidden={!showMenu}
                style={{
                    width: menuWidth.value as string,
                    right: screenSide === "RIGHT" ? (showMenu ? 0 : `-${menuWidth.value as string}`) : undefined,
                    left: screenSide === "LEFT" ? (showMenu ? 0 : `-${menuWidth.value as string}`) : undefined
                }}
            >
                {menuContent}
            </div>
        </div>,
        document.body
    );
}
