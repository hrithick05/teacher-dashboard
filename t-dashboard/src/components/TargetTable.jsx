import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { achievementTypes } from '../data/mockFaculty';

const TargetTable = ({ target }) => {
  if (!target) return null;
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-primary">Target Achievement (Department)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-tableHeader">
                <TableHead className="font-semibold dark:text-white">Faculty Name</TableHead>
                <TableHead className="font-semibold dark:text-white">Department</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">R&D Proposals</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">R&D Funding</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Journal Publications</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Co-Author Journals</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Student Publications</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Book Publications</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Patents</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Online Certifications</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Student Projects</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Industry Collaborations</TableHead>
                <TableHead className="font-semibold text-center dark:text-white">Other Activities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-accent/10">
                <TableCell className="font-medium font-bold dark:text-white">{target.name}</TableCell>
                <TableCell className="dark:text-white">{target.department}</TableCell>
                <TableCell className="text-center dark:text-white">{target.rdProposals}</TableCell>
                <TableCell className="text-center dark:text-white">{target.rdFunding}</TableCell>
                <TableCell className="text-center dark:text-white">{target.journalPublications}</TableCell>
                <TableCell className="text-center dark:text-white">{target.journalsCoAuthor}</TableCell>
                <TableCell className="text-center dark:text-white">{target.studentPublications}</TableCell>
                <TableCell className="text-center dark:text-white">{target.bookPublications}</TableCell>
                <TableCell className="text-center dark:text-white">{target.patents}</TableCell>
                <TableCell className="text-center dark:text-white">{target.onlineCertifications}</TableCell>
                <TableCell className="text-center dark:text-white">{target.studentProjects}</TableCell>
                <TableCell className="text-center dark:text-white">{target.industryCollabs}</TableCell>
                <TableCell className="text-center dark:text-white">{target.otherActivities}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetTable;
