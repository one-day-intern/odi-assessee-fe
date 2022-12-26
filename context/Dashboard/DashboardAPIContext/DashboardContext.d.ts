interface DashboardNotification {
    id: string;
    title: string;
    message: string;
    priority: "high" | "normal" | "low";
}

interface DashboardAPIContextType {
    window: DOMRect;
    pushNotification: (notifcation: DashboardNotification) => void
    // other methods for communication between application and
    // dashboard GUI will be here
}