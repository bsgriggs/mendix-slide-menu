import React, { createElement } from "react";
import { SlideMenuContainerProps } from "../typings/SlideMenuProps";
import "./ui/SlideMenu.scss";
import classNames from "classnames";
import MxPageName from "./utils/MxPageName";
import { ValueStatus } from "mendix";

export function SlideMenu({
    name,
    class: className,
    style,
    tabIndex,
    caption,
    screenSide,
    content,
    pageName
}: SlideMenuContainerProps): React.ReactElement {
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    // const [reRender, setReRender] = React.useState<boolean>(false);

    React.useEffect(() => {
        console.info(pageName);
        if (pageName.status === ValueStatus.Available) {
            const newPageName = MxPageName();
            console.info(newPageName);
            pageName.setValue(newPageName);
        }
    }, [showMenu]);

    return (
        <div
            id={name}
            className={classNames(
                "slide-menu",
                className,
                { left: screenSide === "LEFT" },
                { right: screenSide === "RIGHT" }
            )}
            style={style}
        >
            <button tabIndex={tabIndex || 0} aria-label={caption.value} onClick={() => setShowMenu(!showMenu)}>
                {caption.value as string}
            </button>
            {showMenu && (
                <div>
                    <p>{pageName.displayValue}</p>
                    {content}
                </div>
            )}
        </div>
    );
}
