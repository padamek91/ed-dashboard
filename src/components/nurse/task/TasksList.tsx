
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from './types';
import { LabOrder } from '@/contexts/OrdersContext';

interface TasksListProps {
  tasks: Task[];
  toggleTaskStatus: (id: string) => void;
  formatDueTime: (time: string) => string;
  getTimeStatus: (time: string) => { label: string; class: string };
  emptyMessage: string;
  title: string;
  handleLabAction: (taskId: string, orderId: string, action: string) => void;
  getLabOrder: (orderId?: string) => LabOrder | null;
  labOrders: LabOrder[];
}

const TasksList = ({ 
  tasks, 
  toggleTaskStatus, 
  formatDueTime, 
  getTimeStatus, 
  emptyMessage,
  title,
  handleLabAction,
  getLabOrder
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

export default TasksList;
