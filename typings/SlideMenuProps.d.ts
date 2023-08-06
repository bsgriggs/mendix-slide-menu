/**
 * This file was generated from SlideMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, EditableValue } from "mendix";

export type ScreenSideEnum = "LEFT" | "RIGHT";

export interface SlideMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    content: ReactNode;
    screenSide: ScreenSideEnum;
    caption: DynamicValue<string>;
    pageName: EditableValue<string>;
}

export interface SlideMenuPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    screenSide: ScreenSideEnum;
    caption: string;
    pageName: string;
}
