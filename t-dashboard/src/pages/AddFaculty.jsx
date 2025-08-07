import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { updateFacultyData } from '../data/mockFaculty';

const AddFaculty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    designation: '',
    department: '',
    rdProposalsSangsation: 0,
    rdProposalsSubmition: 0,
    rdFunding: 0,
    journalPublications: 0,
    journalsCoAuthor: 0,
    studentPublications: 0,
    bookPublications: 0,
    patents: 0,
    onlineCertifications: 0,
    studentProjects: 0,
    fdpWorks: 0,
    fdpWorps: 0,
    industryCollabs: 0,
    otherActivities: 0,
    academicPassPercentage: '90%',
    effectiveMentoring: 'Yes'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.id || !formData.name || !formData.designation || !formData.department) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (ID, Name, Designation, Department).",
          variant: "destructive"
        });
        return;
      }

      // Convert numeric fields
      const facultyData = {
        ...formData,
        rdProposalsSangsation: parseInt(formData.rdProposalsSangsation) || 0,
        rdProposalsSubmition: parseInt(formData.rdProposalsSubmition) || 0,
        rdFunding: parseInt(formData.rdFunding) || 0,
        journalPublications: parseInt(formData.journalPublications) || 0,
        journalsCoAuthor: parseInt(formData.journalsCoAuthor) || 0,
        studentPublications: parseInt(formData.studentPublications) || 0,
        bookPublications: parseInt(formData.bookPublications) || 0,
        patents: parseInt(formData.patents) || 0,
        onlineCertifications: parseInt(formData.onlineCertifications) || 0,
        studentProjects: parseInt(formData.studentProjects) || 0,
        fdpWorks: parseInt(formData.fdpWorks) || 0,
        fdpWorps: parseInt(formData.fdpWorps) || 0,
        industryCollabs: parseInt(formData.industryCollabs) || 0,
        otherActivities: parseInt(formData.otherActivities) || 0
      };

      const success = await updateFacultyData(facultyData);
      
      if (success) {
        toast({
          title: "Success",
          description: "Faculty member added successfully!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Error",
          description: "Failed to add faculty member. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error adding faculty:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Add New Faculty Member</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Faculty Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="id">Faculty ID *</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                    placeholder="e.g., CSE013"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Dr. John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation *</Label>
                  <Select value={formData.designation} onValueChange={(value) => handleInputChange('designation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Head of Department">Head of Department</SelectItem>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                      <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                      <SelectItem value="Lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Research & Development */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Research & Development</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rdProposalsSangsation">R&D Proposals (Sangsation)</Label>
                    <Input
                      id="rdProposalsSangsation"
                      type="number"
                      value={formData.rdProposalsSangsation}
                      onChange={(e) => handleInputChange('rdProposalsSangsation', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rdProposalsSubmition">R&D Proposals (Submition)</Label>
                    <Input
                      id="rdProposalsSubmition"
                      type="number"
                      value={formData.rdProposalsSubmition}
                      onChange={(e) => handleInputChange('rdProposalsSubmition', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rdFunding">R&D Funding (in lakhs)</Label>
                    <Input
                      id="rdFunding"
                      type="number"
                      value={formData.rdFunding}
                      onChange={(e) => handleInputChange('rdFunding', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Publications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Publications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="journalPublications">Journal Publications</Label>
                    <Input
                      id="journalPublications"
                      type="number"
                      value={formData.journalPublications}
                      onChange={(e) => handleInputChange('journalPublications', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="journalsCoAuthor">Co-Author Journals</Label>
                    <Input
                      id="journalsCoAuthor"
                      type="number"
                      value={formData.journalsCoAuthor}
                      onChange={(e) => handleInputChange('journalsCoAuthor', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentPublications">Student Publications</Label>
                    <Input
                      id="studentPublications"
                      type="number"
                      value={formData.studentPublications}
                      onChange={(e) => handleInputChange('studentPublications', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bookPublications">Book Publications</Label>
                    <Input
                      id="bookPublications"
                      type="number"
                      value={formData.bookPublications}
                      onChange={(e) => handleInputChange('bookPublications', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Innovation & Projects */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Innovation & Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patents">Patents</Label>
                    <Input
                      id="patents"
                      type="number"
                      value={formData.patents}
                      onChange={(e) => handleInputChange('patents', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="onlineCertifications">Online Certifications</Label>
                    <Input
                      id="onlineCertifications"
                      type="number"
                      value={formData.onlineCertifications}
                      onChange={(e) => handleInputChange('onlineCertifications', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentProjects">Student Projects</Label>
                    <Input
                      id="studentProjects"
                      type="number"
                      value={formData.studentProjects}
                      onChange={(e) => handleInputChange('studentProjects', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Development */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Development</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fdpWorks">FDP Works</Label>
                    <Input
                      id="fdpWorks"
                      type="number"
                      value={formData.fdpWorks}
                      onChange={(e) => handleInputChange('fdpWorks', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fdpWorps">FDP Worps</Label>
                    <Input
                      id="fdpWorps"
                      type="number"
                      value={formData.fdpWorps}
                      onChange={(e) => handleInputChange('fdpWorps', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industryCollabs">Industry Collaborations</Label>
                    <Input
                      id="industryCollabs"
                      type="number"
                      value={formData.industryCollabs}
                      onChange={(e) => handleInputChange('industryCollabs', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Other Activities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Other Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="otherActivities">Other Activities</Label>
                    <Input
                      id="otherActivities"
                      type="number"
                      value={formData.otherActivities}
                      onChange={(e) => handleInputChange('otherActivities', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicPassPercentage">Academic Pass %</Label>
                    <Input
                      id="academicPassPercentage"
                      value={formData.academicPassPercentage}
                      onChange={(e) => handleInputChange('academicPassPercentage', e.target.value)}
                      placeholder="90%"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Adding Faculty...' : 'Add Faculty'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddFaculty;
