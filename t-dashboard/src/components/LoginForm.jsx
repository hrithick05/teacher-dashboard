import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn, User, IdCard } from "lucide-react";

const LoginForm = ({ facultyData, onLogin }) => {
  const [name, setName] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const faculty = facultyData.find(
      f => f.name.toLowerCase() === name.toLowerCase() && f.id.toLowerCase() === facultyId.toLowerCase()
    );

    if (faculty) {
      onLogin(faculty);
    } else {
      setError('Invalid faculty name or ID. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Faculty Login</CardTitle>
          <p className="text-muted-foreground">
            Computer Science Department
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Faculty Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name (e.g., Dr. Sarah Johnson)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facultyId" className="flex items-center gap-2">
                <IdCard className="w-4 h-4" />
                Faculty ID
              </Label>
              <Input
                id="facultyId"
                type="text"
                placeholder="Enter your ID (e.g., CSE001)"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md border border-destructive/20">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Login to Dashboard
            </Button>
            <Button type="button" className="w-full mt-2" variant="outline" onClick={() => window.location.href = '/'}>
              Back
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground font-medium mb-2">Sample Credentials:</p>
            <div className="text-sm space-y-1">
              <div><strong>Name:</strong> Dr. Sarah Johnson</div>
              <div><strong>ID:</strong> CSE001</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
