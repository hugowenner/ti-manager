'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Save,
  Monitor,
  Server,
  Wifi,
  Shield,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { TaskType, TaskPriority, TaskStatus } from '@/lib/types';
import { toast } from 'sonner';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function NewTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as TaskType | '',
    priority: '' as TaskPriority | '',
    assignedTo: '',
    computerId: '',
    location: '',
    dueDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setShowSuccess(true);
    toast.success('Tarefa criada com sucesso!');

    setTimeout(() => {
      router.push('/tasks');
    }, 2000);
  };

  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case TaskType.HARDWARE:
        return <Monitor className="h-5 w-5" />;
      case TaskType.SOFTWARE:
        return <Server className="h-5 w-5" />;
      case TaskType.NETWORK:
        return <Wifi className="h-5 w-5" />;
      case TaskType.SECURITY:
        return <Shield className="h-5 w-5" />;
      case TaskType.MAINTENANCE:
        return <Wrench className="h-5 w-5" />;
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <AppLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center min-h-[60vh]"
        >
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur p-12 text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Tarefa Criada!</h2>
            <p className="text-muted-foreground">
              A tarefa foi adicionada com sucesso ao sistema.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <p className="text-sm text-muted-foreground">Redirecionando...</p>
            </motion.div>
          </Card>
        </motion.div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nova Tarefa</h1>
            <p className="text-muted-foreground">
              Crie uma nova tarefa para a equipe de TI
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Informações da Tarefa</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Reinstalação do Windows - Laboratório 3"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o problema ou tarefa..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary resize-none"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value as TaskType })}
                      required
                    >
                      <SelectTrigger className="rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TaskType.HARDWARE}>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(TaskType.HARDWARE)}
                            <span>Hardware</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={TaskType.SOFTWARE}>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(TaskType.SOFTWARE)}
                            <span>Software</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={TaskType.NETWORK}>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(TaskType.NETWORK)}
                            <span>Rede</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={TaskType.SECURITY}>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(TaskType.SECURITY)}
                            <span>Segurança</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={TaskType.MAINTENANCE}>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(TaskType.MAINTENANCE)}
                            <span>Manutenção</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade *</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value as TaskPriority })}
                      required
                    >
                      <SelectTrigger className="rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary">
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TaskPriority.URGENT}>
                          <span className="text-red-500 font-medium">Urgente</span>
                        </SelectItem>
                        <SelectItem value={TaskPriority.HIGH}>
                          <span className="text-orange-500 font-medium">Alta</span>
                        </SelectItem>
                        <SelectItem value={TaskPriority.MEDIUM}>
                          <span className="text-yellow-500 font-medium">Média</span>
                        </SelectItem>
                        <SelectItem value={TaskPriority.LOW}>
                          <span className="text-green-500 font-medium">Baixa</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Assigned To */}
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Responsável *</Label>
                    <Input
                      id="assignedTo"
                      placeholder="Nome do técnico"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                      required
                      className="rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  {/* Due Date */}
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Prazo</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Computer ID */}
                  <div className="space-y-2">
                    <Label htmlFor="computerId">ID do Computador</Label>
                    <Input
                      id="computerId"
                      placeholder="Ex: LAB3-PC12"
                      value={formData.computerId}
                      onChange={(e) => setFormData({ ...formData, computerId: e.target.value })}
                      className="rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização *</Label>
                    <Input
                      id="location"
                      placeholder="Ex: Laboratório 3 - PC 12"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    className="rounded-xl"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl gap-2 shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                        Criando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Criar Tarefa
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
