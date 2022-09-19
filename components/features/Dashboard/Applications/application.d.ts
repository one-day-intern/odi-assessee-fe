interface Application {
    appId: string;
    app: () => JSX.Element;
    icon: () => JSX.Element;
    initialWidth: number;
    initialHeight: number;
}
