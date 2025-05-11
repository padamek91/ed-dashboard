
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();
  
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 font-bold">
        DEMO MODE
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex gap-2 items-center">
            <UserRound size={16} />
            Switch Role
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            className={user?.role === 'doctor' ? 'bg-accent' : ''}
            onClick={() => switchRole('doctor')}
          >
            Doctor
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={user?.role === 'nurse' ? 'bg-accent' : ''}
            onClick={() => switchRole('nurse')}
          >
            Nurse
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RoleSwitcher;
