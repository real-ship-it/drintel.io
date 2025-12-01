import { Navbar, Footer } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertTriangle, Mail, Download, FileBarChart, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const actionItems = [
  {
    id: 1,
    priority: "High",
    task: "Update HIPAA Security Policy",
    deadline: "Dec 01, 2025",
    assignee: "Dr. Smith",
    status: "Pending"
  },
  {
    id: 2,
    priority: "Medium",
    task: "Review Annual Staff Training Logs",
    deadline: "Dec 15, 2025",
    assignee: "Office Manager",
    status: "In Progress"
  },
  {
    id: 3,
    priority: "High",
    task: "Complete Risk Assessment Questionnaire",
    deadline: "Nov 30, 2025",
    assignee: "IT Admin",
    status: "Overdue"
  }
];

const audits = [
  { id: "AUD-2025-001", date: "Nov 15, 2025", type: "Quarterly HIPAA Review", score: "92%", status: "Passed" },
  { id: "AUD-2025-002", date: "Aug 15, 2025", type: "Security Risk Analysis", score: "88%", status: "Passed" },
  { id: "AUD-2025-003", date: "May 15, 2025", type: "OSHA Walkthrough", score: "95%", status: "Passed" },
];

export default function Reports() {
  const [isEmailing, setIsEmailing] = useState(false);

  const handleEmailActionItems = () => {
    setIsEmailing(true);
    setTimeout(() => {
      setIsEmailing(false);
      toast({
        title: "Action Items Sent",
        description: "The consolidated action item list has been emailed to the Office Manager.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold font-heading text-slate-900 mb-2">Compliance Reports</h1>
            <p className="text-lg text-slate-600">Real-time insights, audit logs, and actionable practice intelligence.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </Button>
            <Button className="gap-2" onClick={handleEmailActionItems} disabled={isEmailing}>
              {isEmailing ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              Email Action Items
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="border-l-4 border-l-teal-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-slate-500 mb-1">Overall Score</div>
              <div className="text-3xl font-bold text-slate-900">94/100</div>
              <div className="text-xs text-teal-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +2% from last month
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-400 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-slate-500 mb-1">Open Risks</div>
              <div className="text-3xl font-bold text-slate-900">3</div>
              <div className="text-xs text-orange-600 mt-2">Needs attention</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-slate-500 mb-1">Training Status</div>
              <div className="text-3xl font-bold text-slate-900">85%</div>
              <div className="text-xs text-slate-500 mt-2">12/14 Staff Certified</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-slate-500 mb-1">Next Audit</div>
              <div className="text-3xl font-bold text-slate-900">14 Days</div>
              <div className="text-xs text-slate-500 mt-2">Scheduled for Dec 12</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="action-items" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-lg h-auto">
            <TabsTrigger value="action-items" className="px-6 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">Action Items</TabsTrigger>
            <TabsTrigger value="audit-logs" className="px-6 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">Audit History</TabsTrigger>
            <TabsTrigger value="risks" className="px-6 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="action-items">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Pending Action Items</CardTitle>
                <CardDescription>Critical tasks assigned to your practice staff. Use the "Email Action Items" button to notify the Office Manager.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Priority</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {actionItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.priority}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">{item.task}</TableCell>
                        <TableCell>{item.assignee}</TableCell>
                        <TableCell>{item.deadline}</TableCell>
                        <TableCell>
                          <span className={`text-sm ${item.status === 'Overdue' ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit-logs">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Audit History</CardTitle>
                <CardDescription>Archive of past compliance audits and their results.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Audit ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {audits.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-mono text-xs">{audit.id}</TableCell>
                        <TableCell>{audit.date}</TableCell>
                        <TableCell>{audit.type}</TableCell>
                        <TableCell className="font-bold text-teal-700">{audit.score}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" /> Passed
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
