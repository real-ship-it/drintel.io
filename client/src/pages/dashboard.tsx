import { Navbar, Footer } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, CheckCircle2, Clock, TrendingUp, Calendar, ListTodo, FileText, BookOpen } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const complianceScore = 87;
const upcomingDeadlines = [
  {
    id: 1,
    title: "HIPAA Training - All Staff",
    dueDate: "Dec 15, 2025",
    status: "urgent",
    daysLeft: 3,
    progress: 65
  },
  {
    id: 2,
    title: "Annual OSHA Certification",
    dueDate: "Dec 28, 2025",
    status: "warning",
    daysLeft: 16,
    progress: 40
  },
  {
    id: 3,
    title: "Patient Privacy Update",
    dueDate: "Jan 10, 2026",
    status: "on-track",
    daysLeft: 29,
    progress: 85
  }
];

const recentAudits = [
  {
    id: 1,
    name: "Q4 2025 Compliance Audit",
    score: 92,
    date: "Dec 1, 2025",
    findings: 3,
    status: "passed"
  },
  {
    id: 2,
    name: "HIPAA Security Review",
    score: 88,
    date: "Nov 15, 2025",
    findings: 5,
    status: "passed"
  },
  {
    id: 3,
    name: "Staff Training Verification",
    score: 76,
    date: "Oct 30, 2025",
    findings: 8,
    status: "needs-action"
  }
];

const actionItems = [
  {
    id: 1,
    title: "Update Privacy Policy",
    category: "Documentation",
    dueDate: "Dec 10, 2025",
    priority: "high",
    assignee: "You",
    completed: false
  },
  {
    id: 2,
    title: "Complete Dr. Martinez HIPAA Training",
    category: "Training",
    dueDate: "Dec 12, 2025",
    priority: "high",
    assignee: "Dr. Martinez",
    completed: false
  },
  {
    id: 3,
    title: "Review BAA with Legal Team",
    category: "Legal",
    dueDate: "Dec 20, 2025",
    priority: "medium",
    assignee: "Office Manager",
    completed: false
  },
  {
    id: 4,
    title: "Document Server Access Logs",
    category: "Security",
    dueDate: "Dec 5, 2025",
    priority: "high",
    assignee: "IT Staff",
    completed: true
  }
];

const complianceTrend = [
  { month: "Aug", score: 78 },
  { month: "Sep", score: 82 },
  { month: "Oct", score: 80 },
  { month: "Nov", score: 85 },
  { month: "Dec", score: 87 }
];

const scoreDistribution = [
  { name: "Excellent (90+)", value: 45 },
  { name: "Good (80-89)", value: 35 },
  { name: "Fair (70-79)", value: 15 },
  { name: "Needs Work (70-)", value: 5 }
];

const COLORS = ["#10b981", "#f59e0b", "#f97316", "#ef4444"];

function ComplianceScore() {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (complianceScore / 100) * circumference;

  return (
    <Card className="bg-white border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Overall Compliance Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg width="128" height="128" className="transform -rotate-90">
              <circle cx="64" cy="64" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="64"
                cy="64"
                r="45"
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">{complianceScore}</div>
                <div className="text-xs text-slate-500">out of 100</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-700">Good standing with all regulations</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-slate-700">3 action items need attention</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-700">Up 7% from last month</span>
              </div>
              <Button className="mt-4 w-full" variant="outline">View Full Audit Report</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-heading text-slate-900 mb-2">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-lg text-slate-600">Here's your compliance overview for this month</p>
        </div>

        {/* Compliance Score Section */}
        <div className="mb-12">
          <ComplianceScore />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Compliance Trend */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Compliance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={complianceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1" }} />
                  <Bar dataKey="score" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Industry Benchmark */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Industry Benchmark</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={scoreDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines & Action Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Upcoming Deadlines */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{deadline.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{deadline.dueDate} • {deadline.daysLeft} days left</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        deadline.status === "urgent" ? "bg-red-100 text-red-700" :
                        deadline.status === "warning" ? "bg-amber-100 text-amber-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {deadline.status === "urgent" ? "URGENT" : deadline.status === "warning" ? "DUE SOON" : "ON TRACK"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${deadline.progress}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{deadline.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-4 bg-blue-600 text-white rounded-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-900">8</div>
                  <div className="text-sm text-blue-700">Active Trainings</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-4 bg-green-600 text-white rounded-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-900">12</div>
                  <div className="text-sm text-green-700">Completed This Month</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-4 bg-purple-600 text-white rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-900">23</div>
                  <div className="text-sm text-purple-700">Documents Stored</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-4 bg-amber-600 text-white rounded-lg">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-900">3</div>
                  <div className="text-sm text-amber-700">Action Items</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Items */}
        <Card className="bg-white border-slate-200 shadow-lg mb-12">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-lg">Action Items</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {actionItems.map((item) => (
                <div key={item.id} className={`p-4 border rounded-lg flex items-center gap-4 transition-all ${
                  item.completed 
                    ? "bg-slate-50 border-slate-200 opacity-60" 
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}>
                  <input 
                    type="checkbox" 
                    checked={item.completed} 
                    readOnly 
                    className="w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${item.completed ? "line-through text-slate-500" : "text-slate-900"}`}>
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">{item.category}</span>
                      <span className="text-xs text-slate-500">{item.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      item.priority === "high" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {item.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-600 min-w-max">{item.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Audits */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recent Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAudits.map((audit) => (
                <div key={audit.id} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{audit.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{audit.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{audit.score}</div>
                      <div className="text-xs text-slate-500">Score</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span>{audit.findings} findings</span>
                    <span className={`font-semibold px-2 py-1 rounded ${
                      audit.status === "passed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {audit.status === "passed" ? "PASSED" : "NEEDS ACTION"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
