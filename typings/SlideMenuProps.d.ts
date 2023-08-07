/**
 * This file was generated from SlideMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type ScreenSideEnum = "LEFT" | "RIGHT";

export interface SlideMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    tabContent: ReactNode;
    menuContent: ReactNode;
    screenSide: ScreenSideEnum;
    pageName?: EditableValue<string>;
    center: boolean;
    topOffset: DynamicValue<string>;
    menuWidth: DynamicValue<string>;
    onTabClick?: ActionValue;
    closeClickOutside: DynamicValue<boolean>;
}

export interface SlideMenuPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    tabContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    menuContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    screenSide: ScreenSideEnum;
    pageName: string;
    center: boolean;
    topOffset: string;
    menuWidth: string;
    onTabClick: {} | null;
    closeClickOutside: string;
}
