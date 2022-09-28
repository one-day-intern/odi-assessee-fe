interface DashboardNotification {
    message: string;
    priority: "high" | "normal" | "low";
}

interface DashboardAPIContextType {
    pushNotification: (notifcation: DashboardNotification) => void
    // other methods for communication between application and
    // dashboard GUI will be here
}