import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Edit, Eye, Plus, BarChart3 } from "lucide-react";
import { achievementTypes } from '../data/mockFaculty';

const FacultyTable = ({ 
  facultyData, 
  onEditFaculty, 
  onViewDetails, 
  onAddFaculty 
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Get unique departments
  const departments = Array.from(new Set(facultyData.map(f => f.department)));

  // Filter faculty based on search and filters
  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || 
                             faculty.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  // Calculate total for a specific achievement type
  const calculateTotal = (achievementKey) => {
    if (achievementKey === 'all') return 0;
    return filteredFaculty.reduce((sum, faculty) => sum + faculty[achievementKey], 0);
  };

  // Get top performer for an achievement type
  const getTopPerformer = (achievementKey) => {
    if (achievementKey === 'all') return null;
    return filteredFaculty.reduce((top, faculty) => 
      faculty[achievementKey] > (top?.[achievementKey] || 0) ? faculty : top, null);
  };

  // Handle view individual graph
  const handleViewGraph = (faculty) => {
    navigate(`/faculty-stats/${faculty.id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <CardTitle className="text-xl font-bold dark:text-white">Faculty Achievement Overview</CardTitle>
          {onAddFaculty && (
            <Button onClick={onAddFaculty} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Faculty
            </Button>
          )}
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedAchievement} onValueChange={setSelectedAchievement}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by achievement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Achievements</SelectItem>
              {achievementTypes.map(type => (
                <SelectItem key={type.key} value={type.key}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary Stats */}
        {selectedAchievement !== 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-achievement rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {calculateTotal(selectedAchievement)}
              </div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {Math.round(calculateTotal(selectedAchievement) / filteredFaculty.length)}
              </div>
              <div className="text-sm text-muted-foreground">Average</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary-dark">
                {getTopPerformer(selectedAchievement)?.name || 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Top Performer</div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-tableHeader">
                <TableHead className="font-semibold dark:text-white">Faculty Name</TableHead>
                <TableHead className="font-semibold dark:text-white">Designation</TableHead>
                <TableHead className="font-semibold dark:text-white">Department</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">R&D Proposals (Sangsation)</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">R&D Proposals (Submition)</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Academic Pass %</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Effective Mentoring</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">R&D Funding</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Journal Publications</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Co-Author Journals</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Student Publications</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Book Publications</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Patents</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Online Certifications</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Student Projects</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">FDP Works</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">FDP Worps</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Industry Collaborations</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Other Activities</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((faculty) => (
                <TableRow 
                  key={faculty.id} 
                  className="hover:bg-tableHover transition-colors"
                >
                  <TableCell className="font-medium dark:text-white">
                    <div>
                      <div className="font-semibold dark:text-white">{faculty.name}</div>
                      <div className="text-sm text-muted-foreground dark:text-white">{faculty.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="dark:text-white">
                    {faculty.designation}
                  </TableCell>
                  <TableCell className="dark:text-white">
                    <Badge variant="secondary" className="text-xs dark:text-white">
                      {faculty.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.rdproposalssangsation ?? ''}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.rdproposalssubmition ?? ''}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.academicpasspercentage ?? '90%'}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.effectivementoring ?? 'Yes'}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.rdfunding}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.journalpublications}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.journalscoauthor}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.studentpublications}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.bookpublications}</TableCell>
                  <TableCell className="text-center font-semibold text-success dark:text-white">
                    {faculty.patents}
                  </TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.onlinecertifications}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.studentprojects}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.fdpworks}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.fdpworps}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.industrycollabs}</TableCell>
                  <TableCell className="text-center dark:text-white">{faculty.otheractivities}</TableCell>
                  <TableCell className="text-center dark:text-white">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewGraph(faculty)}
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Individual Graph"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredFaculty.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No faculty members found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FacultyTable;