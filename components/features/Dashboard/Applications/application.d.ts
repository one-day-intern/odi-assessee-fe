interface Application {
    appId: string;
    appName: string;
    app: () => JSX.Element;
    icon: (() => JSX.Element) | React.FC<ApplicationIconProps>;
    width: number;
    height: number;
    currentX: number;
    currentY: number;
    fullscreen: boolean;
    minimized: boolean;
    zIndex: number;
}

interface ApplicationIconProps {
    width?: number;
    height?: number;
    color?: string;
}