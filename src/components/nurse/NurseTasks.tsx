
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { orders, patients } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

// Sample nurse tasks based on medication orders and patient needs
const nurseTasks = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Michael Johnson',
    task: 'Administer Aspirin 325mg',
    status: 'pending',
    dueTime: '2023-05-10T09:15:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'Michael Johnson',
    task: 'Check vital signs',
    status: 'pending',
    dueTime: '2023-05-10T09:30:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null
  },
  {
    id: '3',
    patientId: '2',
    patientName: 'Emily Rodriguez',
    task: 'Collect blood sample for labs',
    status: 'pending',
    dueTime: '2023-05-10T10:15:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null
  },
  {
    id: '4',
    patientId: '3',
    patientName: 'David Williams',
    task: 'Monitor oxygen saturation',
    status: 'pending',
    dueTime: '2023-05-10T08:00:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null
  },
  {
    id: '5',
    patientId: '3',
    patientName: 'David Williams',
    task: 'Administer nebulizer treatment',
    status: 'pending',
    dueTime: '2023-05-10T08:30:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null
  },
  {
    id: '6',
    patientId: '5',
    patientName: 'Robert Johnson',
    task: 'Administer antipyretic medication',
    status: 'completed',
    dueTime: '2023-05-10T09:00:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: '2023-05-10T09:05:00'
  },
  {
    id: '7',
    patientId: '4',
    patientName: 'Sophia Lee',
    task: 'Clean and dress laceration',
    status: 'completed',
    dueTime: '2023-05-10T10:30:00',
    priority: 'medium',
    assignedTo: 'Nurse Thomas Jackson',
    completedAt: '2023-05-10T10:35:00'
  },
  {
    id: '8',
    patientId: '6',
    patientName: 'Lisa Martinez',
    task: 'Administer pain medication',
    status: 'pending',
    dueTime: '2023-05-10T10:00:00',
    priority: 'high',
    assignedTo: 'Nurse Robert Chen',
    completedAt: null
  }
];

const NurseTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(nurseTasks);
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter tasks based on active filter and current nurse
  const filteredTasks = tasks.filter(task => {
    // Always filter by assigned nurse
    if (task.assignedTo !== user?.name) {
      return false;
    }
    
    // Then apply active filter
    switch (activeFilter) {
      case 'pending':
        return task.status === 'pending';
      case 'completed':
        return task.status === 'completed';
      case 'high-priority':
        return task.priority === 'high' && task.status === 'pending';
      default:
        return true;
    }
  });

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
      return { label: 'Overdue', class: 'text-medical-red' };
    } else if (diffMinutes < 15) {
      return { label: 'Due soon', class: 'text-medical-orange' };
    } else {
      return { label: 'Upcoming', class: 'text-medical-green' };
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tasks</h2>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeFilter === 'all' ? 'default' : 'outline'} 
          onClick={() => setActiveFilter('all')}
          size="sm"
        >
          All Tasks
        </Button>
        <Button 
          variant={activeFilter === 'pending' ? 'default' : 'outline'} 
          onClick={() => setActiveFilter('pending')}
          size="sm"
        >
          Pending
        </Button>
        <Button 
          variant={activeFilter === 'high-priority' ? 'default' : 'outline'} 
          onClick={() => setActiveFilter('high-priority')}
          size="sm"
        >
          High Priority
        </Button>
        <Button 
          variant={activeFilter === 'completed' ? 'default' : 'outline'} 
          onClick={() => setActiveFilter('completed')}
          size="sm"
        >
          Completed
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeFilter === 'all' && 'All Tasks'}
            {activeFilter === 'pending' && 'Pending Tasks'}
            {activeFilter === 'high-priority' && 'High Priority Tasks'}
            {activeFilter === 'completed' && 'Completed Tasks'}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({filteredTasks.length} tasks)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTasks.length > 0 ? (
            <div className="space-y-4">
              {filteredTasks.map(task => {
                const timeStatus = getTimeStatus(task.dueTime);
                
                return (
                  <div 
                    key={task.id} 
                    className={`p-4 border rounded-md flex items-start gap-3 ${
                      task.status === 'completed' ? 'bg-muted/30' : ''
                    }`}
                  >
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                    />
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
                            <span className="text-xs bg-medical-red text-white px-2 py-0.5 rounded">
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
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No tasks found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NurseTasks;
