interface VirtualDesktop {
    applications: Application[];
    openedApps: Application[];
    openApp: (app: Application) => void;
    closeApp: (app: Application) => void;
    focusApp: (app: Application) => void;
}