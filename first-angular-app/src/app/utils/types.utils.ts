export interface Task {
    userId: string;
    id: string;
    title: string;
    summary: string;
    dueDate: string;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface TaskFormData {
    title: string;
    summary: string;
    dueDate: string;
}