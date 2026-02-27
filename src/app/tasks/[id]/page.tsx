'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Clock,
  Calendar,
  MapPin,
  User,
  Monitor,
  Server,
  Wifi,
  Shield,
  Wrench,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  XCircle,
} from 'lucide-react';
import { mockTasks } from '@/lib/mockData';
import { Task, TaskStatus, TaskPriority, TaskType } from '@/lib/types';
import { toast } from 'sonner';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundTask = mockTasks.find(t => t.id === params.id);
      setTask(foundTask || null);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (!task) return;

    setIsUpdating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setTask({
      ...task,
      status: newStatus,
      updatedAt: new Date(),
      completedAt: newStatus === TaskStatus.COMPLETED ? new Date() : undefined,
      history: [
        ...task.history,
        {
          id: `hist-${Date.now()}`,
          action: 'Status alterado',
          description: `De ${task.status} para ${newStatus}`,
          performedBy: 'Carlos Silva',
          timestamp: new Date(),
        },
      ],
    });

    setIsUpdating(false);
    toast.success(`Status atualizado para ${newStatus === 'pending' ? 'Pendente' : newStatus === 'in_progress' ? 'Em Andamento' : newStatus === 'completed' ? 'Concluída' : 'Cancelada'}`);
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case TaskStatus.IN_PROGRESS:
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      case TaskStatus.PENDING:
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case TaskStatus.CANCELLED:
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case TaskStatus.PENDING:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case TaskStatus.CANCELLED:
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT:
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case TaskPriority.HIGH:
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case TaskPriority.MEDIUM:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case TaskPriority.LOW:
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case TaskType.HARDWARE:
        return <Monitor className="h-5 w-5 text-purple-500" />;
      case TaskType.SOFTWARE:
        return <Server className="h-5 w-5 text-blue-500" />;
      case TaskType.NETWORK:
        return <Wifi className="h-5 w-5 text-green-500" />;
      case TaskType.SECURITY:
        return <Shield className="h-5 w-5 text-red-500" />;
      case TaskType.MAINTENANCE:
        return <Wrench className="h-5 w-5 text-orange-500" />;
      default:
        return <Server className="h-5 w-5" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl" disabled>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="h-8 w-64 bg-muted animate-pulse rounded" />
              <div className="h-4 w-96 bg-muted animate-pulse rounded mt-2" />
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className="rounded-2xl h-64">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted animate-pulse rounded" />
                      <div className="h-4 w-full bg-muted animate-pulse rounded" />
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="rounded-2xl h-48" />
              <Card className="rounded-2xl h-64" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!task) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertCircle className="h-16 w-16 text-muted-foreground/50" />
          <h2 className="text-2xl font-bold">Tarefa não encontrada</h2>
          <p className="text-muted-foreground">A tarefa que você está procurando não existe.</p>
          <Button onClick={() => router.push('/tasks')} className="rounded-xl">
            Voltar para Tarefas
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/tasks')}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
              <Badge variant="outline" className={getPriorityBadge(task.priority)}>
                {task.priority === 'urgent' ? 'Urgente' :
                 task.priority === 'high' ? 'Alta' :
                 task.priority === 'medium' ? 'Média' : 'Baixa'}
              </Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {task.location}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <motion.div variants={itemVariants}>
              <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Descrição</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {task.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* History Timeline */}
            <motion.div variants={itemVariants}>
              <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Histórico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {task.history.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-6 pb-6 last:pb-0"
                      >
                        {/* Timeline line */}
                        {index !== task.history.length - 1 && (
                          <div className="absolute left-[7px] top-8 bottom-0 w-0.5 bg-border" />
                        )}

                        {/* Timeline dot */}
                        <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-primary" />

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.action}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.performedBy}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDate(item.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <motion.div variants={itemVariants}>
              <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <Badge variant="outline" className={getStatusBadge(task.status)}>
                      {task.status === 'pending' ? 'Pendente' :
                       task.status === 'in_progress' ? 'Em Andamento' :
                       task.status === 'completed' ? 'Concluída' : 'Cancelada'}
                    </Badge>
                  </div>

                  <Select
                    value={task.status}
                    onValueChange={handleStatusChange}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="rounded-xl bg-muted/50 border-0">
                      <SelectValue placeholder="Alterar status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TaskStatus.PENDING}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span>Pendente</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={TaskStatus.IN_PROGRESS}>
                        <div className="flex items-center gap-2">
                          <PlayCircle className="h-4 w-4 text-blue-500" />
                          <span>Em Andamento</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={TaskStatus.COMPLETED}>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Concluída</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={TaskStatus.CANCELLED}>
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span>Cancelada</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {isUpdating && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                      <span>Atualizando...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Details Card */}
            <motion.div variants={itemVariants}>
              <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Detalhes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(task.type)}
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium capitalize">{task.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Responsável</p>
                      <p className="font-medium">{task.assignedTo}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Criado em</p>
                      <p className="font-medium">{formatDate(task.createdAt)}</p>
                    </div>
                  </div>

                  {task.dueDate && (
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`h-5 w-5 mt-0.5 ${
                        new Date() > task.dueDate && task.status !== TaskStatus.COMPLETED
                          ? 'text-red-500'
                          : 'text-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Prazo</p>
                        <p className={`font-medium ${
                          new Date() > task.dueDate && task.status !== TaskStatus.COMPLETED
                            ? 'text-red-500'
                            : ''
                        }`}>
                          {formatDate(task.dueDate)}
                        </p>
                      </div>
                    </div>
                  )}

                  {task.completedAt && (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Concluído em</p>
                        <p className="font-medium">{formatDate(task.completedAt)}</p>
                      </div>
                    </div>
                  )}

                  {task.computerId && (
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Computador</p>
                        <p className="font-medium">{task.computerId}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
