'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Search,
  Plus,
  Filter,
  Monitor,
  Server,
  Wifi,
  Shield,
  Wrench,
  ArrowUpDown,
} from 'lucide-react';
import { mockTasks } from '@/lib/mockData';
import { Task, TaskStatus, TaskPriority, TaskType } from '@/lib/types';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
};

export default function TasksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesType = typeFilter === 'all' || task.type === typeFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });

    // Sort
    filtered = filtered.sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'createdAt') {
        return (a.createdAt.getTime() - b.createdAt.getTime()) * modifier;
      } else if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return (a.dueDate.getTime() - b.dueDate.getTime()) * modifier;
      } else if (sortBy === 'priority') {
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        return (priorityOrder[a.priority] - priorityOrder[b.priority]) * modifier;
      }
      return 0;
    });

    return filtered;
  }, [tasks, searchTerm, statusFilter, priorityFilter, typeFilter, sortBy, sortOrder]);

  useEffect(() => {
    // Fake loading simulation
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
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
        return <Monitor className="h-4 w-4 text-purple-500" />;
      case TaskType.SOFTWARE:
        return <Server className="h-4 w-4 text-blue-500" />;
      case TaskType.NETWORK:
        return <Wifi className="h-4 w-4 text-green-500" />;
      case TaskType.SECURITY:
        return <Shield className="h-4 w-4 text-red-500" />;
      case TaskType.MAINTENANCE:
        return <Wrench className="h-4 w-4 text-orange-500" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
            <p className="text-muted-foreground">Gerencie todas as tarefas da equipe de TI</p>
          </div>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
                ))}
              </div>
            </CardContent>
          </Card>
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
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
            <p className="text-muted-foreground">
              Gerencie todas as tarefas da equipe de TI
            </p>
          </div>
          <Link href="/tasks/new">
            <Button className="gap-2 rounded-xl shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4" />
              Nova Tarefa
            </Button>
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar tarefas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-muted/50 border-0 rounded-xl"
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-[180px] bg-muted/50 border-0 rounded-xl">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value={TaskStatus.PENDING}>Pendente</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>Em Andamento</SelectItem>
                    <SelectItem value={TaskStatus.COMPLETED}>Concluída</SelectItem>
                    <SelectItem value={TaskStatus.CANCELLED}>Cancelada</SelectItem>
                  </SelectContent>
                </Select>

                {/* Priority Filter */}
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full lg:w-[180px] bg-muted/50 border-0 rounded-xl">
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Prioridades</SelectItem>
                    <SelectItem value={TaskPriority.URGENT}>Urgente</SelectItem>
                    <SelectItem value={TaskPriority.HIGH}>Alta</SelectItem>
                    <SelectItem value={TaskPriority.MEDIUM}>Média</SelectItem>
                    <SelectItem value={TaskPriority.LOW}>Baixa</SelectItem>
                  </SelectContent>
                </Select>

                {/* Type Filter */}
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full lg:w-[180px] bg-muted/50 border-0 rounded-xl">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value={TaskType.HARDWARE}>Hardware</SelectItem>
                    <SelectItem value={TaskType.SOFTWARE}>Software</SelectItem>
                    <SelectItem value={TaskType.NETWORK}>Rede</SelectItem>
                    <SelectItem value={TaskType.SECURITY}>Segurança</SelectItem>
                    <SelectItem value={TaskType.MAINTENANCE}>Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium text-foreground">{filteredTasks.length}</span> de{' '}
            <span className="font-medium text-foreground">{tasks.length}</span> tarefas
          </p>
        </motion.div>

        {/* Tasks Table */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="w-[400px]">Tarefa</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-medium"
                        onClick={() => handleSort('priority')}
                      >
                        Prioridade
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-medium"
                        onClick={() => handleSort('dueDate')}
                      >
                        Prazo
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredTasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <div className="flex flex-col items-center gap-2">
                            <Filter className="h-12 w-12 text-muted-foreground/50" />
                            <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTasks.map((task, index) => (
                        <motion.tr
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.03 }}
                          className="border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <TableCell>
                            {getStatusIcon(task.status)}
                          </TableCell>
                          <TableCell>
                            <Link href={`/tasks/${task.id}`}>
                              <div>
                                <p className="font-medium hover:text-primary transition-colors">
                                  {task.title}
                                </p>
                                <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                                  {task.location}
                                </p>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getPriorityBadge(task.priority)}>
                              {task.priority === 'urgent' ? 'Urgente' :
                               task.priority === 'high' ? 'Alta' :
                               task.priority === 'medium' ? 'Média' : 'Baixa'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadge(task.status)}>
                              {task.status === 'pending' ? 'Pendente' :
                               task.status === 'in_progress' ? 'Em Andamento' :
                               task.status === 'completed' ? 'Concluída' : 'Cancelada'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(task.type)}
                              <span className="text-sm capitalize">{task.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                                {task.assignedTo.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm">{task.assignedTo}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {task.dueDate ? (
                              <span className={`text-sm ${
                                new Date() > task.dueDate && task.status !== TaskStatus.COMPLETED
                                  ? 'text-red-500 font-medium'
                                  : 'text-muted-foreground'
                              }`}>
                                {task.dueDate.toLocaleDateString('pt-BR')}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
