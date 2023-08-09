/* eslint-disable */
import { ReactElement, createElement } from "react";
import { SlideMenuPreviewProps } from "../typings/SlideMenuProps";
import classNames from "classnames";

export function preview(props: SlideMenuPreviewProps): ReactElement {
    return (
        <div
            className={classNames("slide-menu-preview", props.className, "open", props.screenSide.toLowerCase(), {
                center: props.center
            })}
            style={props.styleObject}
        >
            <button className="btn mx-button tag">
                {props.tagType === "TEXT" ? (
                    props.tagText
                ) : (
                    // @ts-ignore
                    <props.tagContent.renderer caption="Place custom tag content here">
                        <div />
                    </props.tagContent.renderer>
                )}
            </button>
            <div className="menu background-main">
                {
                    // @ts-ignore
                    <props.menuContent.renderer caption="Place custom menu content here">
                        <div />
                    </props.menuContent.renderer>
                }
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/SlideMenu.scss");
}
