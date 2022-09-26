interface VirtualDesktop {
    applications: Application[];
    openedApps: Application[];
    numberOfMinimizedApps: number;
    openApp: (app: Application) => void;
    closeApp: (app: Application) => void;
    focusApp: (app: Application) => void;
    toggleReveal: (app: Application, reveal: boolean) => void;
    updateAppPosition: (app: Application, position: { x: number, y: number }) => void;
    updateAppSize: (app: Application, size: { width: number, height: number }) => void;
    toggleFullscreen: (app: Application, fullscreen: boolean) => void;
    toggleMinimize: (app: Application, minimize: boolean) => void;
}