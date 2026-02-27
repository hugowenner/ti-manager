export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskType {
  HARDWARE = 'hardware',
  SOFTWARE = 'software',
  NETWORK = 'network',
  MAINTENANCE = 'maintenance',
  SECURITY = 'security'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  assignedTo: string;
  computerId?: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  history: TaskHistory[];
}

export interface TaskHistory {
  id: string;
  action: string;
  description: string;
  performedBy: string;
  timestamp: Date;
}

export interface DashboardMetrics {
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  urgent: number;
  total: number;
}

export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  type?: TaskType;
  search?: string;
}
