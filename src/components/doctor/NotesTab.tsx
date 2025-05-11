
import { useState } from 'react';
import { patients, notes } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, FileText, FilePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotesTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patientFilter, setPatientFilter] = useState('all');
  const [noteTypeFilter, setNoteTypeFilter] = useState('all');
  
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedNoteType, setSelectedNoteType] = useState<'H&P' | 'MDM' | 'Progress' | 'Procedure' | 'Discharge'>('H&P');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { toast } = useToast();

  // Filter notes based on search and filters
  const filteredNotes = notes.filter(note => {
    let matches = true;
    
    if (patientFilter !== 'all' && note.patientId !== patientFilter) {
      matches = false;
    }
    
    if (noteTypeFilter !== 'all' && note.type !== noteTypeFilter) {
      matches = false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const content = note.content.toLowerCase();
      const title = note.title.toLowerCase();
      const patientName = patients.find(p => p.id === note.patientId)?.name.toLowerCase() || '';
      
      if (!content.includes(query) && !title.includes(query) && !patientName.includes(query)) {
        matches = false;
      }
    }
    
    return matches;
  });

  // Function to get patient name from ID
  const getPatientName = (patientId: string) => {
    return patients.find(p => p.id === patientId)?.name || 'Unknown Patient';
  };

  // Function to format date
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleCreateNote = () => {
    if (!selectedPatient || !noteTitle || !noteContent) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Note Created",
      description: `${selectedNoteType} note created for ${patients.find(p => p.id === selectedPatient)?.name}`,
    });
    
    // Reset form and close dialog
    setSelectedPatient('');
    setNoteTitle('');
    setNoteContent('');
    setDialogOpen(false);
  };

  // Predefined templates for different note types
  const getNoteTemplate = (type: string) => {
    switch(type) {
      case 'H&P':
        return 'HISTORY OF PRESENT ILLNESS:\n\nPAST MEDICAL HISTORY:\n\nMEDICATIONS:\n\nALLERGIES:\n\nREVIEW OF SYSTEMS:\n\nPHYSICAL EXAMINATION:\n\nASSESSMENT:\n\nPLAN:';
      case 'MDM':
        return 'ASSESSMENT:\n\nDIAGNOSIS:\n\nDIFFERENTIAL DIAGNOSIS:\n\nDIAGNOSTIC EVALUATION:\n\nTREATMENT PLAN:';
      case 'Progress':
        return 'SUBJECTIVE:\n\nOBJECTIVE:\n\nASSESSMENT:\n\nPLAN:';
      case 'Procedure':
        return 'PROCEDURE PERFORMED:\n\nINDICATION:\n\nTECHNIQUE:\n\nFINDINGS:\n\nCOMPLICATIONS:\n\nDISPOSITION:';
      case 'Discharge':
        return 'ADMISSION DIAGNOSIS:\n\nDISCHARGE DIAGNOSIS:\n\nHOSPITAL COURSE:\n\nDISCHARGE MEDICATIONS:\n\nFOLLOW-UP INSTRUCTIONS:\n\nRETURN TO ED INSTRUCTIONS:';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Documentation</h2>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FilePlus className="h-4 w-4" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Patient</label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Note Type</label>
                  <Select 
                    value={selectedNoteType} 
                    onValueChange={(val) => {
                      setSelectedNoteType(val as any);
                      setNoteContent(getNoteTemplate(val));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="H&P">H&P</SelectItem>
                      <SelectItem value="MDM">MDM</SelectItem>
                      <SelectItem value="Progress">Progress Note</SelectItem>
                      <SelectItem value="Procedure">Procedure Note</SelectItem>
                      <SelectItem value="Discharge">Discharge Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input 
                  placeholder="Enter note title" 
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea 
                  placeholder="Enter note content" 
                  className="min-h-[300px]"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNote}>
                  Create Note
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select value={patientFilter} onValueChange={setPatientFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Patients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                {patients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={noteTypeFilter} onValueChange={setNoteTypeFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="H&P">H&P</SelectItem>
                <SelectItem value="MDM">MDM</SelectItem>
                <SelectItem value="Progress">Progress</SelectItem>
                <SelectItem value="Procedure">Procedure</SelectItem>
                <SelectItem value="Discharge">Discharge</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all-notes" className="w-full">
        <TabsList>
          <TabsTrigger value="all-notes">All Notes</TabsTrigger>
          <TabsTrigger value="my-notes">My Notes</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all-notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notes ({filteredNotes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredNotes.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotes.map((note) => (
                    <Card key={note.id} className="border-l-4 border-l-gray-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-medical-blue" />
                              <span className="font-medium">{note.title}</span>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                                {note.type}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Patient: {getPatientName(note.patientId)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Created: {formatDateTime(note.createdAt)} by {note.createdBy}
                            </div>
                            {note.createdAt !== note.updatedAt && (
                              <div className="text-sm text-muted-foreground">
                                Updated: {formatDateTime(note.updatedAt)}
                              </div>
                            )}
                          </div>
                          <div className="mt-3 md:mt-0">
                            <Button size="sm" variant="outline">
                              View Note
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <div className="line-clamp-3 text-sm">{note.content}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No notes found matching your criteria
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Your authored notes would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Note Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Note templates would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotesTab;
