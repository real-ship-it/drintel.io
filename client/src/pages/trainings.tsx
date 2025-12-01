import { Navbar, Footer } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Clock, Award, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const defaultTrainings = [
  {
    id: 1,
    title: "HIPAA Privacy & Security Basics",
    duration: "45 min",
    modules: 5,
    completed: 3,
    progress: 60,
    thumbnail: "bg-gradient-to-br from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    title: "Bloodborne Pathogens (OSHA)",
    duration: "30 min",
    modules: 4,
    completed: 0,
    progress: 0,
    thumbnail: "bg-gradient-to-br from-red-500 to-orange-600"
  },
  {
    id: 3,
    title: "Cybersecurity Awareness 2025",
    duration: "20 min",
    modules: 3,
    completed: 3,
    progress: 100,
    thumbnail: "bg-gradient-to-br from-teal-500 to-emerald-600"
  },
  {
    id: 4,
    title: "Patient Access Rights",
    duration: "15 min",
    modules: 2,
    completed: 1,
    progress: 50,
    thumbnail: "bg-gradient-to-br from-purple-500 to-pink-600"
  }
];

export default function Trainings() {
  const [trainings, setTrainings] = useState(defaultTrainings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const { data, error } = await supabase
          .from('trainings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          const colors = [
            'bg-gradient-to-br from-blue-500 to-indigo-600',
            'bg-gradient-to-br from-red-500 to-orange-600',
            'bg-gradient-to-br from-teal-500 to-emerald-600',
            'bg-gradient-to-br from-purple-500 to-pink-600'
          ];
          
          const mappedTrainings = data.map((training: any, idx: number) => ({
            id: training.id,
            title: training.title,
            duration: `${training.duration_minutes || 30} min`,
            modules: 3,
            completed: 0,
            progress: 0,
            thumbnail: colors[idx % colors.length]
          }));
          setTrainings(mappedTrainings);
        }
      } catch (error) {
        console.error('Error fetching trainings:', error);
        setTrainings(defaultTrainings);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold font-heading text-slate-900 mb-2">Staff Training</h1>
            <p className="text-lg text-slate-600">Manage and track mandatory compliance training for your entire team.</p>
          </div>
          <Button size="lg" className="gap-2">
            <PlayCircle className="w-5 h-5" /> Resume Learning
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">85%</div>
                <div className="text-sm text-slate-500">Overall Compliance</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">12</div>
                <div className="text-sm text-slate-500">Hours Logged</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">4</div>
                <div className="text-sm text-slate-500">Certificates Earned</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Courses</h2>
          {trainings.map((training: any) => (
            <div key={training.id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow group cursor-pointer">
              <div className={`w-full md:w-48 h-32 rounded-lg ${training.thumbnail} flex items-center justify-center shrink-0`}>
                <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{training.title}</h3>
                  <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {training.duration}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span>{training.modules} Modules</span>
                  <span>•</span>
                  <span>{training.completed}/{training.modules} Completed</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Progress</span>
                    <span>{training.progress}%</span>
                  </div>
                  <Progress value={training.progress} className="h-2" />
                </div>
              </div>

              <div className="hidden md:block pl-4 border-l border-slate-100">
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
