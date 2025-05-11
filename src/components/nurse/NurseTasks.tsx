
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import PatientSelector from '@/components/orders/PatientSelector';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext';
import { patients } from '@/data/mockData';

// Task type definition
interface Task {
  id: string;
  patientId: string;
  patientName: string;
  patientMrn: string;
  task: string;
  status: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  completedAt: string | null;
  taskType: 'lab' | 'medication' | 'other';
  orderId?: string;
}

// Sample nurse tasks with taskType added
const initialNurseTasks: Task[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Michael Johnson',
    patientMrn: 'MRN12345',
    task: 'Administer Aspirin 325mg',
    status: 'pending',
    dueTime: '2025-05-11T09:15:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'medication'
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'Michael Johnson',
    patientMrn: 'MRN12345',
    task: 'Check vital signs',
    status: 'pending',
    dueTime: '2025-05-11T09:30:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'other'
  },
  {
    id: '3',
    patientId: '2',
    patientName: 'Emily Rodriguez',
    patientMrn: 'MRN23456',
    task: 'Collect blood sample for labs',
    status: 'pending',
    dueTime: '2025-05-11T10:15:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'lab'
  },
  {
    id: '4',
    patientId: '3',
    patientName: 'David Williams',
    patientMrn: 'MRN34567',
    task: 'Monitor oxygen saturation',
    status: 'pending',
    dueTime: '2025-05-11T08:00:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'other'
  },
  {
    id: '5',
    patientId: '3',
    patientName: 'David Williams',
    patientMrn: 'MRN34567',
    task: 'Administer nebulizer treatment',
    status: 'pending',
    dueTime: '2025-05-11T08:30:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'medication'
  },
  {
    id: '6',
    patientId: '5',
    patientName: 'Robert Johnson',
    patientMrn: 'MRN56789',
    task: 'Administer antipyretic medication',
    status: 'completed',
    dueTime: '2025-05-11T09:00:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: '2025-05-11T09:05:00',
    taskType: 'medication'
  },
  {
    id: '7',
    patientId: '4',
    patientName: 'Sophia Lee',
    patientMrn: 'MRN45678',
    task: 'Clean and dress laceration',
    status: 'completed',
    dueTime: '2025-05-11T10:30:00',
    priority: 'medium',
    assignedTo: 'Nurse Thomas Jackson',
    completedAt: '2025-05-11T10:35:00',
    taskType: 'other'
  },
  {
    id: '8',
    patientId: '6',
    patientName: 'Lisa Martinez',
    patientMrn: 'MRN67890',
    task: 'Administer pain medication',
    status: 'pending',
    dueTime: '2025-05-11T10:00:00',
    priority: 'high',
    assignedTo: 'Nurse Robert Chen',
    completedAt: null,
    taskType: 'medication'
  }
];

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
        priority: order.urgent ? 'high' : 'medium',
        assignedTo: user?.name || 'Nurse',
        completedAt: null,
        taskType: 'lab',
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
        priority: order.urgent ? 'high' : 'medium',
        assignedTo: user?.name || 'Nurse',
        completedAt: null,
        taskType: 'medication',
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
              <Badge className="ml-1 bg-red-500 text-white absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                {pendingAllTasks}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="lab" className="relative">
            Lab Orders
            {pendingLabTasks > 0 && (
              <Badge className="ml-1 bg-red-500 text-white absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                {pendingLabTasks}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="medication" className="relative">
            Medication Orders
            {pendingMedTasks > 0 && (
              <Badge className="ml-1 bg-red-500 text-white absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                {pendingMedTasks}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1">
            <PatientSelector 
              selectedPatient={selectedPatient}
              onPatientSelect={setSelectedPatient}
              selectedPatientId={selectedPatientId}
              onPatientIdChange={setSelectedPatientId}
            />
          </div>
          <div className="col-span-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients or tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="col-span-1">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

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

// Extracted TasksList component to avoid repetition
interface TasksListProps {
  tasks: Task[];
  toggleTaskStatus: (id: string) => void;
  formatDueTime: (time: string) => string;
  getTimeStatus: (time: string) => { label: string; class: string };
  emptyMessage: string;
  title: string;
  handleLabAction: (taskId: string, orderId: string, action: string) => void;
  getLabOrder: (orderId?: string) => any;
  labOrders: any[];
}

const TasksList = ({ 
  tasks, 
  toggleTaskStatus, 
  formatDueTime, 
  getTimeStatus, 
  emptyMessage,
  title,
  handleLabAction,
  getLabOrder,
  labOrders
}: TasksListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map(task => {
              const timeStatus = getTimeStatus(task.dueTime);
              const labOrder = task.orderId ? getLabOrder(task.orderId) : null;
              
              return (
                <div 
                  key={task.id} 
                  className={`p-4 border rounded-md flex items-start gap-3 ${
                    task.status === 'completed' ? 'bg-muted/30' : ''
                  }`}
                >
                  {task.taskType !== 'lab' && (
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                    />
                  )}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <label 
                        htmlFor={`task-${task.id}`}
                        className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {task.task}
                      </label>
                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        {task.priority === 'high' && task.status !== 'completed' && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                            High Priority
                          </span>
                        )}
                        {task.status !== 'completed' && (
                          <span className={`text-xs ${timeStatus.class}`}>
                            {timeStatus.label}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Patient: {task.patientName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {task.status === 'completed' 
                        ? `Completed at ${new Date(task.completedAt!).toLocaleTimeString()}` 
                        : `Due at ${formatDueTime(task.dueTime)}`}
                    </div>
                    
                    {/* Lab workflow buttons */}
                    {task.taskType === 'lab' && task.orderId && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {labOrder?.status === 'order placed' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleLabAction(task.id, task.orderId!, 'acknowledge')}
                          >
                            Acknowledge Order
                          </Button>
                        )}
                        
                        {labOrder?.status === 'acknowledged by nurse' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleLabAction(task.id, task.orderId!, 'print')}
                          >
                            Print Labels
                          </Button>
                        )}
                        
                        {labOrder?.status === 'labels printed' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleLabAction(task.id, task.orderId!, 'collect')}
                          >
                            Document Collection
                          </Button>
                        )}
                        
                        {labOrder?.status === 'collected' && (
                          <Badge className="bg-amber-500">Specimen Collected - Awaiting Processing</Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NurseTasks;
