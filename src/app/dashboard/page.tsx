'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  TrendingUp,
  ArrowRight,
  Monitor,
  Server,
  Wifi,
  Shield,
  Wrench,
} from 'lucide-react';
import { getMetrics, getUrgentTasks, getRecentTasks } from '@/lib/mockData';
import { Task, TaskStatus, TaskPriority } from '@/lib/types';
import Link from 'next/link';

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

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState(getMetrics());
  const [urgentTasks, setUrgentTasks] = useState(getUrgentTasks());
  const [recentTasks, setRecentTasks] = useState(getRecentTasks(5));

  useEffect(() => {
    // Fake loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case TaskStatus.IN_PROGRESS:
        return <Clock className="h-4 w-4 text-blue-500" />;
      case TaskStatus.PENDING:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case TaskStatus.CANCELLED:
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hardware':
        return <Monitor className="h-4 w-4" />;
      case 'software':
        return <Server className="h-4 w-4" />;
      case 'network':
        return <Wifi className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral das tarefas de TI</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="pb-3">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted animate-pulse rounded-xl" />
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral das tarefas de TI</p>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          variants={itemVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pendentes
                </CardTitle>
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.pending}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                +2 desde ontem
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Em Andamento
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.inProgress}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Ativamente sendo trabalhadas
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Concluídas
                </CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.completed}</div>
              <p className="mt-1 text-xs text-green-500">
                +3 esta semana
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-red-500/50 bg-red-500/5 backdrop-blur hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-red-500">
                  Urgentes
                </CardTitle>
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{metrics.urgent}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Requerem atenção imediata
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts and Lists */}
        <motion.div
          variants={itemVariants}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* Status Distribution Chart */}
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Distribuição de Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Pendentes</span>
                  </div>
                  <span className="text-sm font-medium">{metrics.pending}</span>
                </div>
                <Progress value={(metrics.pending / metrics.total) * 100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Em Andamento</span>
                  </div>
                  <span className="text-sm font-medium">{metrics.inProgress}</span>
                </div>
                <Progress value={(metrics.inProgress / metrics.total) * 100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm">Concluídas</span>
                  </div>
                  <span className="text-sm font-medium">{metrics.completed}</span>
                </div>
                <Progress value={(metrics.completed / metrics.total) * 100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm">Canceladas</span>
                  </div>
                  <span className="text-sm font-medium">{metrics.cancelled}</span>
                </div>
                <Progress value={(metrics.cancelled / metrics.total) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Urgent Tasks */}
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Tarefas Urgentes
                </CardTitle>
                <Link href="/tasks">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Ver todas
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {urgentTasks.slice(0, 4).map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-xl border border-border/50 bg-muted/50 p-4 hover:bg-muted/80 transition-all cursor-pointer"
                  >
                    <Link href={`/tasks/${task.id}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getTypeIcon(task.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                              {task.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className={getPriorityColor(task.priority)}
                            >
                              Urgente
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {getStatusIcon(task.status)}
                            <span className="text-xs text-muted-foreground">
                              {task.assignedTo}
                            </span>
                            {task.dueDate && (
                              <>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-xs text-red-500">
                                  {task.dueDate.toLocaleDateString('pt-BR')}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Tarefas Recentes
                </CardTitle>
                <Link href="/tasks">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Ver todas
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-xl border border-border/50 bg-muted/50 p-4 hover:bg-muted/80 transition-all cursor-pointer"
                  >
                    <Link href={`/tasks/${task.id}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(task.status)}
                          <div>
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                              {task.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {task.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={getPriorityColor(task.priority)}
                          >
                            {task.priority === 'urgent' ? 'Urgente' :
                             task.priority === 'high' ? 'Alta' :
                             task.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {task.createdAt.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
