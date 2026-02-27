'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ListChecks,
  PlusCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Server,
  Monitor,
  Wifi,
  Shield,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Tarefas', href: '/tasks', icon: <ListChecks className="h-5 w-5" /> },
  { title: 'Nova Tarefa', href: '/tasks/new', icon: <PlusCircle className="h-5 w-5" /> },
  { title: 'Configurações', href: '/settings', icon: <Settings className="h-5 w-5" /> },
];

const typeIcons = [
  { icon: <Monitor className="h-4 w-4" />, label: 'Hardware', count: 42 },
  { icon: <Server className="h-4 w-4" />, label: 'Software', count: 38 },
  { icon: <Wifi className="h-4 w-4" />, label: 'Rede', count: 15 },
  { icon: <Shield className="h-4 w-4" />, label: 'Segurança', count: 8 },
  { icon: <Wrench className="h-4 w-4" />, label: 'Manutenção', count: 25 },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-50 h-screen border-r border-border bg-card"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Server className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">TI Manager</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {item.icon}
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}

          {/* Quick Stats - Type Categories */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-4"
            >
              <div className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                Categorias
              </div>
              <div className="space-y-1">
                {typeIcons.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-muted/50 p-3"
            >
              <div className="text-xs text-muted-foreground">Total de Computadores</div>
              <div className="text-2xl font-bold">260</div>
              <div className="mt-1 text-xs text-green-500">98% operacionais</div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
