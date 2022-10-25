interface AssesseeNotification extends DashboardNotification {
    id: string;
    app: Application;
}

interface ServerNotification {
    id: string;
    type: string;
    name: string;
    description: string;
    additional_info?: any;
}