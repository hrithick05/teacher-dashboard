import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, User, Award, BookOpen, Lightbulb, Users, Trophy, GraduationCap, Building, Edit } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const FacultyDetailView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Load faculty data from localStorage
  const faculty = JSON.parse(localStorage.getItem('loggedInFaculty') || '{}');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedFaculty, setEditedFaculty] = useState(faculty);

  // If no faculty data, redirect to login
  if (!faculty || !faculty.id) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    localStorage.setItem('loggedInFaculty', JSON.stringify(editedFaculty));
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Your achievements have been updated successfully!",
    });
  };

  const handleCancel = () => {
    setEditedFaculty(faculty);
    setIsEditing(false);
  };

  const updateField = (field, value) => {
    setEditedFaculty(prev => ({ ...prev, [field]: value }));
  };

  const achievementCategories = [
    {
      title: "Research & Development",
      icon: <Lightbulb className="w-5 h-5" />,
      items: [
        { key: 'rdProposalsSangsation', label: 'R&D Proposals (Sangsation)', value: faculty.rdProposalsSangsation },
        { key: 'rdProposalsSubmition', label: 'R&D Proposals (Submition)', value: faculty.rdProposalsSubmition },
        { key: 'rdFunding', label: 'R&D Funding (in lakhs)', value: faculty.rdFunding },
      ]
    },
    {
      title: "Publications",
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        { key: 'journalPublications', label: 'Journal Publications', value: faculty.journalPublications },
        { key: 'journalsCoAuthor', label: 'Co-Author Publications', value: faculty.journalsCoAuthor },
        { key: 'bookPublications', label: 'Book Publications', value: faculty.bookPublications },
        { key: 'studentPublications', label: 'Student Publications', value: faculty.studentPublications },
      ]
    },
    {
      title: "Innovation & Patents",
      icon: <Award className="w-5 h-5" />,
      items: [
        { key: 'patents', label: 'Patents Filed', value: faculty.patents },
        { key: 'onlineCertifications', label: 'Online Certifications', value: faculty.onlineCertifications },
      ]
    },
    {
      title: "Student Engagement",
      icon: <Users className="w-5 h-5" />,
      items: [
        { key: 'studentProjects', label: 'Student Projects Guided', value: faculty.studentProjects },
      ]
    },
    {
      title: "Professional Development",
      icon: <GraduationCap className="w-5 h-5" />,
      items: [
        { key: 'fdpWorks', label: 'FDP Works', value: faculty.fdpWorks },
        { key: 'fdpWorps', label: 'FDP Worps', value: faculty.fdpWorps },
      ]
    },
    {
      title: "Industry & Others",
      icon: <Building className="w-5 h-5" />,
      items: [
        { key: 'industryCollabs', label: 'Industry Collaborations', value: faculty.industryCollabs },
        { key: 'otherActivities', label: 'Other Activities', value: faculty.otherActivities },
      ]
    }
  ];

  const totalAchievements = Object.values(faculty).reduce((sum, val) => typeof val === 'number' ? sum + val : sum, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-lg p-6 shadow-elevated">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">{faculty.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-white/30">
                    {faculty.id}
                  </Badge>
                  <span>•</span>
                  <span>{faculty.department}</span>
                </div>
                <div className="mt-2">
                  <Label className="text-sm font-medium">Designation:</Label>{' '}
                  {isEditing ? (
                    <select
                      value={editedFaculty.designation}
                      onChange={e => updateField('designation', e.target.value)}
                      className="ml-2 px-2 py-1 rounded border"
                    >
                      <option value="Head of Department">Head of Department</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                    </select>
                  ) : (
                    <Badge variant="secondary" className="ml-2">{faculty.designation}</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 border-white/30 text-primary-foreground hover:bg-white/30"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel Edit' : 'Edit Achievements'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="bg-white/20 border-white/30 text-primary-foreground hover:bg-white/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
          
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalAchievements}</div>
              <div className="text-primary-foreground/80 text-sm">Total Achievements</div>
            </div>
          </div>
        </div>

        {/* Save/Cancel Buttons when editing */}
        {isEditing && (
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              Cancel Changes
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}

        {/* Achievement Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {achievementCategories.map((category, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.key} className="flex justify-between items-center">
                      <Label className="text-sm font-medium">{item.label}</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          min="0"
                          value={editedFaculty[item.key]}
                          onChange={(e) => updateField(item.key, parseInt(e.target.value) || 0)}
                          className="w-20 text-right"
                        />
                      ) : (
                        <Badge variant="secondary" className="text-lg font-semibold">
                          {item.value}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Summary Card */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-success" />
              Achievement Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-achievement rounded-lg">
                <div className="text-2xl font-bold text-primary">{faculty.patents}</div>
                <div className="text-sm text-muted-foreground">Patents</div>
              </div>
              <div className="text-center p-4 bg-achievement rounded-lg">
                <div className="text-2xl font-bold text-success">{faculty.journalPublications}</div>
                <div className="text-sm text-muted-foreground">Publications</div>
              </div>
              <div className="text-center p-4 bg-achievement rounded-lg">
                <div className="text-2xl font-bold text-primary-dark">{faculty.studentProjects}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-4 bg-achievement rounded-lg">
                <div className="text-2xl font-bold text-success-light">{faculty.industryCollabs}</div>
                <div className="text-sm text-muted-foreground">Industry</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Pass Percentage & Effective Mentoring */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Academic & Mentoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Academic Pass Percentage</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={editedFaculty.academicPassPercentage ?? '90%'}
                    onChange={e => updateField('academicPassPercentage', e.target.value)}
                    className="w-24 text-right"
                  />
                ) : (
                  <Badge variant="secondary" className="text-lg font-semibold">
                    {faculty.academicPassPercentage ?? '90%'}
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Effective Mentoring</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={editedFaculty.effectiveMentoring ?? 'Yes'}
                    onChange={e => updateField('effectiveMentoring', e.target.value)}
                    className="w-24 text-right"
                  />
                ) : (
                  <Badge variant="secondary" className="text-lg font-semibold">
                    {faculty.effectiveMentoring ?? 'Yes'}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDetailView;