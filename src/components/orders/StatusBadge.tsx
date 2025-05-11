
import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = 'bg-gray-200 text-gray-800';
  
  if (status.includes('order placed')) bgColor = 'bg-blue-100 text-blue-800';
  else if (status.includes('needs to be collected')) bgColor = 'bg-purple-100 text-purple-800';
  else if (status.includes('acknowledged by nurse')) bgColor = 'bg-purple-100 text-purple-800';
  else if (status.includes('collected')) bgColor = 'bg-yellow-100 text-yellow-800';
  else if (status.includes('in process')) bgColor = 'bg-orange-100 text-orange-800';
  else if (status.includes('resulted')) bgColor = 'bg-green-100 text-green-800';
  else if (status.includes('administered')) bgColor = 'bg-green-100 text-green-800';
  else if (status.includes('progress')) bgColor = 'bg-yellow-100 text-yellow-800';
  else if (status.includes('completed')) bgColor = 'bg-green-100 text-green-800';
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
