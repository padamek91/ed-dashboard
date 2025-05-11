
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext';
import { patients } from '@/data/mockData';
import TasksFilter from './task/TasksFilter';
import TasksList from './task/TasksList';
import { Task, initialNurseTasks } from './task/types';

const NurseTasks = () => {
  const { user } = useAuth();
  const { labOrders, medicationOrders, acknowledgeLabOrder, printLabels, collectLabSpecimen } = useOrders();
  
  const [tasks, setTasks] = useState<Task[]>(initialNurseTasks);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<{id: string; name: string; mrn: string} | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Convert lab orders to tasks
  useEffect(() => {
    const labTasks = labOrders
      .filter(order => ['order placed', 'acknowledged by nurse', 'labels printed', 'collected', 'in process'].includes(order.status))
      .map(order => ({
        id: `lab-task-${order.id}`,
        patientId: patients.find(p => p.name === order.patient)?.id || '',
        patientName: order.patient,
        patientMrn: order.mrn || '',
        task: `Process lab: ${order.type}`,
        status: order.status === 'order placed' ? 'pending' : 'in progress',
        dueTime: new Date(order.timestamp).toISOString(),
        priority: order.urgent ? 'high' as const : 'medium' as const,
        assignedTo: user?.name || 'Nurse',
        completedAt: null,
        taskType: 'lab' as const,
        orderId: order.id
      }));

    // Convert medication orders to tasks
    const medicationTasks = medicationOrders
      .filter(order => order.status === 'ordered')
      .map(order => ({
        id: `med-task-${order.id}`,
        patientId: patients.find(p => p.name === order.patient)?.id || '',
        patientName: order.patient,
        patientMrn: order.mrn || '',
        task: `Administer: ${order.type}`,
        status: 'pending',
        dueTime: new Date(order.timestamp).toISOString(),
        priority: order.urgent ? 'high' as const : 'medium' as const,
        assignedTo: user?.name || 'Nurse',
        completedAt: null,
        taskType: 'medication' as const,
        orderId: order.id
      }));
    
    // Combine all tasks
    setTasks([...initialNurseTasks, ...labTasks, ...medicationTasks]);
  }, [labOrders, medicationOrders, user]);
  
  // Filter tasks based on search query
  const searchFilteredTasks = tasks.filter(task => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      task.task.toLowerCase().includes(query) ||
      task.patientName.toLowerCase().includes(query) ||
      task.patientMrn.toLowerCase().includes(query)
    );
  });
  
  // Filter tasks based on active tab, patient selection, and status filter
  const getFilteredTasks = () => {
    let filtered = searchFilteredTasks;
    
    // Filter by task type based on active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(task => task.taskType === activeTab);
    }
    
    // Filter by patient if selected
    if (selectedPatient) {
      filtered = filtered.filter(task => 
        task.patientName === selectedPatient.name || 
        task.patientMrn === selectedPatient.mrn
      );
    }
    
    // Then apply status filter
    switch (statusFilter) {
      case 'pending':
        return filtered.filter(task => task.status === 'pending');
      case 'completed':
        return filtered.filter(task => task.status === 'completed');
      case 'overdue':
        return filtered.filter(task => {
          const now = new Date();
          const dueTime = new Date(task.dueTime);
          return task.status !== 'completed' && dueTime < now;
        });
      default:
        return filtered;
    }
  };
  
  const filteredTasks = getFilteredTasks();
  
  // Count pending tasks by type for badges
  const pendingLabTasks = searchFilteredTasks.filter(task => task.taskType === 'lab' && task.status === 'pending').length;
  const pendingMedTasks = searchFilteredTasks.filter(task => task.taskType === 'medication' && task.status === 'pending').length;
  const pendingAllTasks = searchFilteredTasks.filter(task => task.status === 'pending').length;

  // Function to toggle task completion
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'completed' ? 'pending' : 'completed',
          completedAt: task.status === 'completed' ? null : new Date().toISOString()
        };
      }
      return task;
    }));
  };

  // Function to format due time
  const formatDueTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Function to get time status (overdue, upcoming, etc.)
  const getTimeStatus = (dueTime: string) => {
    const now = new Date();
    const due = new Date(dueTime);
    const diffMinutes = Math.round((due.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffMinutes < 0) {
      return { label: 'Overdue', class: 'text-red-600' };
    } else if (diffMinutes < 15) {
      return { label: 'Due soon', class: 'text-amber-600' };
    } else {
      return { label: 'Upcoming', class: 'text-green-600' };
    }
  };

  // Function to handle lab workflow actions
  const handleLabAction = (taskId: string, orderId: string, action: string) => {
    switch (action) {
      case 'acknowledge':
        acknowledgeLabOrder(orderId);
        break;
      case 'print':
        printLabels(orderId);
        break;
      case 'collect':
        collectLabSpecimen(orderId);
        break;
      default:
        break;
    }
  };

  // Find the corresponding lab order for a task
  const getLabOrder = (orderId?: string) => {
    if (!orderId) return null;
    return labOrders.find(order => order.id === orderId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tasks</h2>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="relative">
            All Tasks
            {pendingAllTasks > 0 && (
              <Badge className="ml-1 bg-medical-blue text-white absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                {pendingAllTasks}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="lab" className="relative">
            Lab Orders
            {pendingLabTasks > 0 && (
              <Badge className="ml-1 bg-medical-blue text-white absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                {pendingLabTasks}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="medication" className="relative">
            Medication Orders
            {pendingMedTasks > 0 && (
              <Badge className="ml-1 bg-medical-blue text-white absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                {pendingMedTasks}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Filter Bar */}
        <TasksFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          selectedPatientId={selectedPatientId}
          setSelectedPatientId={setSelectedPatientId}
        />

        <TabsContent value="all">
          <TasksList 
            tasks={filteredTasks} 
            toggleTaskStatus={toggleTaskStatus} 
            formatDueTime={formatDueTime} 
            getTimeStatus={getTimeStatus} 
            emptyMessage="No tasks found matching your criteria"
            title={`All Tasks (${filteredTasks.length})`}
            handleLabAction={handleLabAction}
            getLabOrder={getLabOrder}
            labOrders={labOrders}
          />
        </TabsContent>
          
        <TabsContent value="lab">
          <TasksList 
            tasks={filteredTasks} 
            toggleTaskStatus={toggleTaskStatus} 
            formatDueTime={formatDueTime} 
            getTimeStatus={getTimeStatus} 
            emptyMessage="No lab orders found matching your criteria"
            title={`Lab Orders (${filteredTasks.length})`}
            handleLabAction={handleLabAction}
            getLabOrder={getLabOrder}
            labOrders={labOrders}
          />
        </TabsContent>
          
        <TabsContent value="medication">
          <TasksList 
            tasks={filteredTasks} 
            toggleTaskStatus={toggleTaskStatus} 
            formatDueTime={formatDueTime} 
            getTimeStatus={getTimeStatus} 
            emptyMessage="No medication orders found matching your criteria"
            title={`Medication Orders (${filteredTasks.length})`}
            handleLabAction={handleLabAction}
            getLabOrder={getLabOrder}
            labOrders={labOrders}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NurseTasks;
