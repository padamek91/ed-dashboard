
import { AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DuplicateTestAlertProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  duplicateTests: string[];
  retestReason: string;
  setRetestReason: (reason: string) => void;
  onGoToResult: () => void;
  onSubmitAnyway: () => void;
}

const DuplicateTestAlert = ({
  open,
  setOpen,
  duplicateTests,
  retestReason,
  setRetestReason,
  onGoToResult,
  onSubmitAnyway
}: DuplicateTestAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Duplicate Test Warning
          </AlertDialogTitle>
          <AlertDialogDescription>
            {duplicateTests.length > 1 
              ? `The following tests have recently been performed for this patient: ${duplicateTests.join(', ')}`
              : `${duplicateTests[0]} has recently been performed for this patient.`
            }
            <br /><br />
            Would you like to order these tests again or view the most recent result?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="mb-4">
          <label htmlFor="retest-reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for retesting (required)
          </label>
          <Input
            id="retest-reason"
            value={retestReason}
            onChange={(e) => setRetestReason(e.target.value)}
            placeholder="Enter reason for reordering this test"
            className="w-full"
          />
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onGoToResult}>
            Go to Result
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={onSubmitAnyway}
            disabled={!retestReason.trim()}
            className={!retestReason.trim() ? "opacity-50 cursor-not-allowed" : ""}
          >
            Order Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DuplicateTestAlert;
