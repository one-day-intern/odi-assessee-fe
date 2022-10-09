interface DashboardNotification {
    id: string;
    message: string;
    priority: "high" | "normal" | "low";
}

interface DashboardAPIContextType {
    app: Application;
    pushNotification: (notifcation: DashboardNotification) => void
    // other methods for communication between application and
    // dashboard GUI will be here
}