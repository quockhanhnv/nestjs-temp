export interface Task {
    uuid?: string;
    name: string;
    completed?: boolean;
    description?: string;
    ownder?: string;
    duration?: number;
}