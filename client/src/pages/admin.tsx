import { Navbar, Footer } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus, Edit2, Save, X, Shield, Lock, Settings, FileText, Copy, Palette, Image, Type, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

type TabType = "posts" | "templates" | "trainings" | "users" | "pages" | "branding";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "doctor" | "staff";
  status: "active" | "suspended";
  created_at: string;
}

interface PageMeta {
  id: string;
  name: string;
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: string;
  created_at: string;
}

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  file_url?: string;
  created_at: string;
}

interface Training {
  id: number;
  title: string;
  description?: string;
  duration_minutes: number;
  category?: string;
  content?: string;
  created_at: string;
}

interface BrandingSettings {
  logoUrl: string;
  logoAlt: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  companyName: string;
}

// Mock users data for demo
const mockUsers: User[] = [
  { id: "1", email: "admin@drintel.com", name: "Dr. Admin Demo", role: "admin", status: "active", created_at: "2025-01-01" },
  { id: "2", email: "doctor@drintel.com", name: "Dr. John Smith", role: "doctor", status: "active", created_at: "2025-01-05" },
  { id: "3", email: "staff@drintel.com", name: "Staff Member", role: "staff", status: "active", created_at: "2025-01-10" },
];

// Mock pages data for demo
const mockPages: PageMeta[] = [
  {
    id: "1",
    name: "Home",
    path: "/",
    title: "DrIntel - Medical Compliance Platform",
    description: "The leading HIPAA compliance platform for medical offices",
    ogTitle: "DrIntel - Medical Compliance Platform for Healthcare Practices",
    ogDescription: "Streamline HIPAA compliance, OSHA training, and compliance audits",
    ogImage: "/og-home.png",
    twitterTitle: "DrIntel - Medical Compliance Platform",
    twitterDescription: "Help your medical practice achieve HIPAA compliance",
    imageUrl: "/hero-home.png",
    imageAlt: "DrIntel Medical Compliance Dashboard",
  },
  {
    id: "2",
    name: "Pricing",
    path: "/pricing",
    title: "Pricing - DrIntel",
    description: "Transparent, affordable compliance solutions",
    ogTitle: "DrIntel Pricing Plans",
    ogDescription: "Flexible pricing for practices of all sizes",
    ogImage: "/og-pricing.png",
    twitterTitle: "DrIntel Pricing",
    twitterDescription: "Affordable HIPAA compliance solutions",
    imageUrl: "/pricing-table.png",
    imageAlt: "DrIntel Pricing Plans",
  },
  {
    id: "3",
    name: "Blog",
    path: "/blog",
    title: "Medical Compliance Blog - HIPAA, OSHA & Healthcare Compliance",
    description: "Expert articles on compliance best practices",
    ogTitle: "Medical Compliance Blog",
    ogDescription: "Expert articles on HIPAA compliance, OSHA training, and healthcare compliance",
    ogImage: "/og-blog.png",
    twitterTitle: "Medical Compliance Blog",
    twitterDescription: "Expert compliance insights",
    imageUrl: "/blog-hero.png",
    imageAlt: "Medical Compliance Blog",
  },
  {
    id: "4",
    name: "About",
    path: "/about",
    title: "About DrIntel - Our Mission",
    description: "Learn about DrIntel and our compliance expertise",
    ogTitle: "About DrIntel",
    ogDescription: "Dedicated to helping medical practices achieve compliance",
    ogImage: "/og-about.png",
    twitterTitle: "About DrIntel",
    twitterDescription: "Our mission for compliance excellence",
    imageUrl: "/about-team.png",
    imageAlt: "About DrIntel Team",
  },
];

export default function Admin() {
  const [_, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("posts");
  const [isCreating, setIsCreating] = useState(false);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminLoginTime");
      toast.success("Logged out successfully");
      setLocation("/admin-login");
    }
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [pages, setPages] = useState<PageMeta[]>(mockPages);
  const [editingPage, setEditingPage] = useState<PageMeta | null>(null);
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);
  const [newPageForm, setNewPageForm] = useState({ name: "", path: "", title: "" });
  const [branding, setBranding] = useState<BrandingSettings>({
    logoUrl: "/logo.png",
    logoAlt: "DrIntel Logo",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    fontFamily: "Inter",
    companyName: "DrIntel",
  });
  const [editingBranding, setEditingBranding] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [postForm, setPostForm] = useState({ title: "", slug: "", body: "", status: "draft" });
  const [templateForm, setTemplateForm] = useState({ name: "", category: "", description: "" });
  const [trainingForm, setTrainingForm] = useState({ title: "", duration_minutes: 30, category: "", description: "" });
  const [userForm, setUserForm] = useState({ email: "", name: "", role: "doctor" as const });

  // Fetch all data
  useEffect(() => {
    fetchPosts();
    fetchTemplates();
    fetchTrainings();
    fetchPages();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data && data.length > 0) {
        setUsers(data.map((u: any) => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          status: u.status,
          created_at: u.created_at,
        })));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers(mockUsers);
    }
  };

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase.from("page_metadata").select("*");
      if (error) throw error;
      if (data) {
        const mappedPages = data.map((page: any) => ({
          id: page.id,
          name: page.name,
          path: page.path,
          title: page.title || "",
          description: page.description || "",
          ogTitle: page.og_title || "",
          ogDescription: page.og_description || "",
          ogImage: page.og_image || "",
          twitterTitle: page.twitter_title || "",
          twitterDescription: page.twitter_description || "",
        }));
        setPages(mappedPages);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
      if (data) setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data } = await supabase.from("templates").select("*").order("created_at", { ascending: false });
      if (data) setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const fetchTrainings = async () => {
    try {
      const { data } = await supabase.from("trainings").select("*").order("created_at", { ascending: false });
      if (data) setTrainings(data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  // POST CRUD
  const addPost = async () => {
    if (!postForm.title || !postForm.slug || !postForm.body) {
      toast.error("Fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("posts").insert([postForm]);
      if (error) throw error;
      toast.success("Post created!");
      setPostForm({ title: "", slug: "", body: "", status: "draft" });
      setIsCreating(false);
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      toast.success("Post deleted!");
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete post");
    }
  };

  const publishPost = async (id: string) => {
    try {
      const { error } = await supabase.from("posts").update({ status: "published" }).eq("id", id);
      if (error) throw error;
      toast.success("Post published!");
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || "Failed to publish post");
    }
  };

  // TEMPLATE CRUD
  const addTemplate = async () => {
    if (!templateForm.name || !templateForm.category) {
      toast.error("Fill in required fields");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("templates").insert([templateForm]);
      if (error) throw error;
      toast.success("Template created!");
      setTemplateForm({ name: "", category: "", description: "" });
      setIsCreating(false);
      fetchTemplates();
    } catch (error: any) {
      toast.error(error.message || "Failed to create template");
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (id: number) => {
    if (!confirm("Delete this template?")) return;
    try {
      const { error } = await supabase.from("templates").delete().eq("id", id);
      if (error) throw error;
      toast.success("Template deleted!");
      fetchTemplates();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete template");
    }
  };

  // TRAINING CRUD
  const addTraining = async () => {
    if (!trainingForm.title || !trainingForm.duration_minutes) {
      toast.error("Fill in required fields");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("trainings").insert([trainingForm]);
      if (error) throw error;
      toast.success("Training created!");
      setTrainingForm({ title: "", duration_minutes: 30, category: "", description: "" });
      setIsCreating(false);
      fetchTrainings();
    } catch (error: any) {
      toast.error(error.message || "Failed to create training");
    } finally {
      setLoading(false);
    }
  };

  const deleteTraining = async (id: number) => {
    if (!confirm("Delete this training?")) return;
    try {
      const { error } = await supabase.from("trainings").delete().eq("id", id);
      if (error) throw error;
      toast.success("Training deleted!");
      fetchTrainings();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete training");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold font-heading text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-slate-600">Manage blog posts, templates, and training modules</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="templates">Templates ({templates.length})</TabsTrigger>
            <TabsTrigger value="trainings">Trainings ({trainings.length})</TabsTrigger>
            <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
            <TabsTrigger value="pages">Pages ({pages.length})</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>

          {/* POSTS TAB */}
          <TabsContent value="posts">
            <div className="space-y-6">
              {!isCreating ? (
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> New Post
                </Button>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Title</label>
                      <Input
                        placeholder="Post title"
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Slug</label>
                      <Input
                        placeholder="post-slug"
                        value={postForm.slug}
                        onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Content</label>
                      <Textarea
                        placeholder="Post content"
                        value={postForm.body}
                        onChange={(e) => setPostForm({ ...postForm, body: e.target.value })}
                        rows={10}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addPost} disabled={loading} className="gap-2">
                        <Save className="w-4 h-4" /> Save Post
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreating(false)} className="gap-2">
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{post.title}</CardTitle>
                          <CardDescription>{post.slug}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {post.status !== "published" && (
                            <Button size="sm" onClick={() => publishPost(post.id)} variant="outline">
                              Publish
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deletePost(post.id)}
                            className="gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 line-clamp-2">{post.body}</p>
                    </CardContent>
                    <CardFooter>
                      <span className={`text-xs px-2 py-1 rounded ${
                        post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {post.status}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TEMPLATES TAB */}
          <TabsContent value="templates">
            <div className="space-y-6">
              {!isCreating ? (
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> New Template
                </Button>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Template</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Name</label>
                      <Input
                        placeholder="Template name"
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Category</label>
                      <Input
                        placeholder="HIPAA, OSHA, General"
                        value={templateForm.category}
                        onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Description</label>
                      <Textarea
                        placeholder="Template description"
                        value={templateForm.description}
                        onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addTemplate} disabled={loading} className="gap-2">
                        <Save className="w-4 h-4" /> Save Template
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreating(false)} className="gap-2">
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{template.name}</CardTitle>
                          <CardDescription>{template.category}</CardDescription>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteTemplate(template.id)}
                          className="gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TRAININGS TAB */}
          <TabsContent value="trainings">
            <div className="space-y-6">
              {!isCreating ? (
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> New Training
                </Button>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Training</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Title</label>
                      <Input
                        placeholder="Training title"
                        value={trainingForm.title}
                        onChange={(e) => setTrainingForm({ ...trainingForm, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Duration (minutes)</label>
                      <Input
                        type="number"
                        placeholder="30"
                        value={trainingForm.duration_minutes}
                        onChange={(e) =>
                          setTrainingForm({ ...trainingForm, duration_minutes: parseInt(e.target.value) })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Category</label>
                      <Input
                        placeholder="HIPAA, OSHA, etc"
                        value={trainingForm.category}
                        onChange={(e) => setTrainingForm({ ...trainingForm, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Description</label>
                      <Textarea
                        placeholder="Training description"
                        value={trainingForm.description}
                        onChange={(e) => setTrainingForm({ ...trainingForm, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addTraining} disabled={loading} className="gap-2">
                        <Save className="w-4 h-4" /> Save Training
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreating(false)} className="gap-2">
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {trainings.map((training) => (
                  <Card key={training.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{training.title}</CardTitle>
                          <CardDescription>{training.duration_minutes} minutes</CardDescription>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteTraining(training.id)}
                          className="gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{training.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users">
            <div className="space-y-6">
              {!isCreating ? (
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> Add User
                </Button>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New User</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Name</label>
                      <Input
                        placeholder="Full name"
                        value={userForm.name}
                        onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Role</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                        value={userForm.role}
                        onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                      >
                        <option value="staff">Staff</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={async () => {
                          if (!userForm.email || !userForm.name) {
                            toast.error("Fill in all fields");
                            return;
                          }
                          setLoading(true);
                          try {
                            const { data, error } = await supabase.from("users").insert([{
                              email: userForm.email,
                              name: userForm.name,
                              role: userForm.role,
                              status: "suspended",
                            }]).select();
                            
                            if (error) throw error;
                            if (data) {
                              setUsers([data[0] as User, ...users]);
                              setUserForm({ email: "", name: "", role: "doctor" });
                              setIsCreating(false);
                              toast.success("User created and saved to Supabase!");
                            }
                          } catch (error: any) {
                            toast.error(error.message || "Failed to create user");
                          } finally {
                            setLoading(false);
                          }
                        }}
                        disabled={loading}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" /> Create User
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreating(false)} className="gap-2">
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {user.name}
                            {user.role === "admin" && <Shield className="w-4 h-4 text-blue-600" />}
                          </CardTitle>
                          <CardDescription>{user.email}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={user.status === "active" ? "outline" : "default"}
                            onClick={async () => {
                              setLoading(true);
                              try {
                                const newStatus = user.status === "active" ? "suspended" : "active";
                                const { error } = await supabase.from("users").update({ status: newStatus }).eq("id", user.id);
                                if (error) throw error;
                                setUsers(
                                  users.map((u) =>
                                    u.id === user.id ? { ...u, status: newStatus } : u
                                  )
                                );
                                toast.success(newStatus === "active" ? "User activated" : "User suspended");
                              } catch (error: any) {
                                toast.error(error.message || "Failed to update user");
                              } finally {
                                setLoading(false);
                              }
                            }}
                            disabled={loading}
                          >
                            <Lock className="w-3 h-3 mr-1" />
                            {user.status === "active" ? "Suspend" : "Activate"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              if (!confirm("Delete this user?")) return;
                              setLoading(true);
                              try {
                                const { error } = await supabase.from("users").delete().eq("id", user.id);
                                if (error) throw error;
                                setUsers(users.filter((u) => u.id !== user.id));
                                toast.success("User deleted from Supabase");
                              } catch (error: any) {
                                toast.error(error.message || "Failed to delete user");
                              } finally {
                                setLoading(false);
                              }
                            }}
                            disabled={loading}
                            className="gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium text-slate-700">Role: </span>
                          <span className="capitalize text-slate-600">{user.role}</span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* PAGES & SEO TAB */}
          <TabsContent value="pages">
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  📝 <strong>SEO & Metadata Management:</strong> Edit page titles, descriptions, Open Graph tags, and images. Create new pages and generate sitemap code.
                </p>
              </div>

              {/* CREATE NEW PAGE FORM */}
              {isCreatingPage && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle>Create New Page</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-700">Page Name</label>
                      <Input
                        value={newPageForm.name}
                        onChange={(e) => setNewPageForm({ ...newPageForm, name: e.target.value })}
                        placeholder="e.g., Contact, FAQ, Privacy Policy"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">Page Path</label>
                      <Input
                        value={newPageForm.path}
                        onChange={(e) => setNewPageForm({ ...newPageForm, path: e.target.value })}
                        placeholder="e.g., /contact, /faq, /privacy"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">Page Title (SEO)</label>
                      <Input
                        value={newPageForm.title}
                        onChange={(e) => setNewPageForm({ ...newPageForm, title: e.target.value })}
                        placeholder="Page title for search engines"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          if (!newPageForm.name || !newPageForm.path || !newPageForm.title) {
                            toast.error("Fill in all fields");
                            return;
                          }
                          const newPage: PageMeta = {
                            id: Date.now().toString(),
                            name: newPageForm.name,
                            path: newPageForm.path,
                            title: newPageForm.title,
                            description: "",
                            ogTitle: "",
                            ogDescription: "",
                            ogImage: "",
                            twitterTitle: "",
                            twitterDescription: "",
                            imageUrl: "",
                            imageAlt: "",
                          };
                          setPages([...pages, newPage]);
                          setNewPageForm({ name: "", path: "", title: "" });
                          setIsCreatingPage(false);
                          toast.success("Page created!");
                        }}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" /> Create Page
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreatingPage(false)} className="gap-2">
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                <Button onClick={() => setIsCreatingPage(!isCreatingPage)} className="gap-2">
                  <Plus className="w-4 h-4" /> Add New Page
                </Button>
                <Button onClick={() => setShowSitemap(!showSitemap)} variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" /> Generate Sitemap
                </Button>
              </div>

              {/* SITEMAP GENERATOR */}
              {showSitemap && (
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle>Sitemap Code</CardTitle>
                    <CardDescription>Copy this XML and save as public/sitemap.xml</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded font-mono text-xs overflow-x-auto mb-4">
                      <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>https://drintel.io${page.path}</loc>
    <changefreq>${page.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`}</pre>
                    </div>
                    <Button
                      onClick={() => {
                        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>https://drintel.io${page.path}</loc>
    <changefreq>${page.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;
                        navigator.clipboard.writeText(xml);
                        toast.success("Sitemap code copied to clipboard!");
                      }}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" /> Copy to Clipboard
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {pages.map((page) => (
                  <Card key={page.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{page.name}</CardTitle>
                          <CardDescription>{page.path}</CardDescription>
                        </div>
                        <Button
                          size="sm"
                          variant={editingPage?.id === page.id ? "default" : "outline"}
                          onClick={() => setEditingPage(editingPage?.id === page.id ? null : page)}
                          className="gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> {editingPage?.id === page.id ? "Done" : "Edit"}
                        </Button>
                      </div>
                    </CardHeader>

                    {editingPage?.id === page.id ? (
                      <CardContent className="space-y-4">
                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm text-slate-900 mb-3">🔍 Search Engine Tags</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs font-medium text-slate-700">Page Title (SEO)</label>
                              <Input
                                value={editingPage.title}
                                onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                                placeholder="Page title for search engines"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-slate-700">Meta Description</label>
                              <Textarea
                                value={editingPage.description}
                                onChange={(e) => setEditingPage({ ...editingPage, description: e.target.value })}
                                placeholder="Brief description for search results"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm text-slate-900 mb-3">📱 Open Graph (Social Media)</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs font-medium text-slate-700">OG Title</label>
                              <Input
                                value={editingPage.ogTitle}
                                onChange={(e) => setEditingPage({ ...editingPage, ogTitle: e.target.value })}
                                placeholder="Title for Facebook, LinkedIn, etc."
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-slate-700">OG Description</label>
                              <Textarea
                                value={editingPage.ogDescription}
                                onChange={(e) => setEditingPage({ ...editingPage, ogDescription: e.target.value })}
                                placeholder="Description for social sharing"
                                rows={2}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-slate-700">OG Image URL</label>
                              <Input
                                value={editingPage.ogImage}
                                onChange={(e) => setEditingPage({ ...editingPage, ogImage: e.target.value })}
                                placeholder="/og-image.png"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm text-slate-900 mb-3">🖼️ Page Images</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs font-medium text-slate-700">Upload Image</label>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      const dataUrl = event.target?.result as string;
                                      setEditingPage({ ...editingPage, imageUrl: dataUrl });
                                      toast.success("Image uploaded!");
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="cursor-pointer"
                              />
                              <p className="text-xs text-slate-500 mt-1">Main image for this page (hero, banner, etc.)</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-slate-700">Or paste Image URL</label>
                              <Input
                                value={editingPage.imageUrl || ""}
                                onChange={(e) => setEditingPage({ ...editingPage, imageUrl: e.target.value })}
                                placeholder="/hero-image.png"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-slate-700">Image Alt Text</label>
                              <Input
                                value={editingPage.imageAlt || ""}
                                onChange={(e) => setEditingPage({ ...editingPage, imageAlt: e.target.value })}
                                placeholder="Descriptive alt text for accessibility"
                              />
                            </div>
                            {editingPage.imageUrl && (
                              <div className="border rounded p-3 bg-slate-50">
                                <p className="text-xs text-slate-700 mb-2">Preview:</p>
                                <img src={editingPage.imageUrl} alt={editingPage.imageAlt} className="w-full h-32 object-cover rounded" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm text-slate-900 mb-3">🐦 Twitter Card</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs font-medium text-slate-700">Twitter Title</label>
                              <Input
                                value={editingPage.twitterTitle}
                                onChange={(e) => setEditingPage({ ...editingPage, twitterTitle: e.target.value })}
                                placeholder="Title for Twitter"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-slate-700">Twitter Description</label>
                              <Textarea
                                value={editingPage.twitterDescription}
                                onChange={(e) => setEditingPage({ ...editingPage, twitterDescription: e.target.value })}
                                placeholder="Description for Twitter"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 border-t pt-4">
                          <Button
                            onClick={async () => {
                              setLoading(true);
                              try {
                                const { error } = await supabase.from("page_metadata").update({
                                  title: editingPage.title,
                                  description: editingPage.description,
                                  og_title: editingPage.ogTitle,
                                  og_description: editingPage.ogDescription,
                                  og_image: editingPage.ogImage,
                                  twitter_title: editingPage.twitterTitle,
                                  twitter_description: editingPage.twitterDescription,
                                  image_url: editingPage.imageUrl || null,
                                  image_alt: editingPage.imageAlt || null,
                                  updated_at: new Date().toISOString(),
                                }).eq("id", editingPage.id);
                                
                                if (error) throw error;
                                setPages(pages.map((p) => (p.id === editingPage.id ? editingPage : p)));
                                setEditingPage(null);
                                toast.success("Page metadata saved to Supabase!");
                              } catch (error: any) {
                                toast.error(error.message || "Failed to save");
                              } finally {
                                setLoading(false);
                              }
                            }}
                            disabled={loading}
                            className="gap-2"
                          >
                            <Save className="w-4 h-4" /> Save to Supabase
                          </Button>
                          <Button variant="outline" onClick={() => setEditingPage(null)} className="gap-2">
                            <X className="w-4 h-4" /> Cancel
                          </Button>
                        </div>
                      </CardContent>
                    ) : (
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium text-slate-700">Title:</span>{" "}
                              <span className="text-slate-600">{page.title}</span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">Description:</span>{" "}
                              <span className="text-slate-600 line-clamp-1">{page.description}</span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">OG Title:</span>{" "}
                              <span className="text-slate-600 line-clamp-1">{page.ogTitle}</span>
                            </p>
                          </div>
                          {page.imageUrl && (
                            <div className="border-t pt-4">
                              <p className="text-xs font-medium text-slate-700 mb-2">🖼️ Current Image:</p>
                              <img src={page.imageUrl} alt={page.imageAlt} className="w-full h-40 object-cover rounded border" />
                              <p className="text-xs text-slate-600 mt-2">Alt: {page.imageAlt}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                <p className="text-sm text-green-900">
                  ✅ <strong>Next Step:</strong> Changes are saved in your session. To persist to database, connect to Supabase backend.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* BRANDING TAB */}
          <TabsContent value="branding">
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-900">
                  🎨 <strong>Brand Settings:</strong> Customize logo, colors, fonts, and company name across your site.
                </p>
              </div>

              {editingBranding ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Brand Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* LOGO */}
                    <div className="border-b pb-4">
                      <h4 className="font-semibold text-sm text-slate-900 mb-3">📌 Logo</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-slate-700">Upload Logo</label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const dataUrl = event.target?.result as string;
                                  setBranding({ ...branding, logoUrl: dataUrl });
                                  toast.success("Logo uploaded!");
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-700">Or paste Logo URL</label>
                          <Input
                            value={branding.logoUrl}
                            onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                            placeholder="/logo.png"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-700">Logo Alt Text</label>
                          <Input
                            value={branding.logoAlt}
                            onChange={(e) => setBranding({ ...branding, logoAlt: e.target.value })}
                            placeholder="Company Logo"
                          />
                        </div>
                        {branding.logoUrl && (
                          <div className="border rounded p-3 bg-slate-50">
                            <p className="text-xs text-slate-600 mb-2">Preview:</p>
                            <img src={branding.logoUrl} alt={branding.logoAlt} className="h-12 object-contain" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* COMPANY NAME */}
                    <div className="border-b pb-4">
                      <h4 className="font-semibold text-sm text-slate-900 mb-3">🏢 Company</h4>
                      <div>
                        <label className="text-xs font-medium text-slate-700">Company Name</label>
                        <Input
                          value={branding.companyName}
                          onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    {/* COLORS */}
                    <div className="border-b pb-4">
                      <h4 className="font-semibold text-sm text-slate-900 mb-3">🎨 Colors</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-slate-700">Primary Color</label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={branding.primaryColor}
                              onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                              className="w-16 h-10 cursor-pointer"
                            />
                            <Input
                              value={branding.primaryColor}
                              onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                              placeholder="#3b82f6"
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-700">Secondary Color</label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={branding.secondaryColor}
                              onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                              className="w-16 h-10 cursor-pointer"
                            />
                            <Input
                              value={branding.secondaryColor}
                              onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                              placeholder="#1e40af"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FONTS */}
                    <div className="pb-4">
                      <h4 className="font-semibold text-sm text-slate-900 mb-3">✍️ Font Family</h4>
                      <select
                        value={branding.fontFamily}
                        onChange={(e) => setBranding({ ...branding, fontFamily: e.target.value })}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                      >
                        <option value="Inter">Inter (Modern, Clean)</option>
                        <option value="Syne">Syne (Bold, Dynamic)</option>
                        <option value="Manrope">Manrope (Geometric)</option>
                        <option value="Space Grotesk">Space Grotesk (Futuristic)</option>
                        <option value="Playfair Display">Playfair Display (Elegant)</option>
                        <option value="Georgia">Georgia (Classic)</option>
                      </select>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button
                        onClick={() => {
                          localStorage.setItem("branding", JSON.stringify(branding));
                          setEditingBranding(false);
                          toast.success("Brand settings saved!");
                        }}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" /> Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingBranding(false)} className="gap-2">
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Current Brand Settings</CardTitle>
                        </div>
                        <Button size="sm" onClick={() => setEditingBranding(true)} className="gap-1">
                          <Edit2 className="w-3 h-3" /> Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* LOGO PREVIEW */}
                      <div className="border-b pb-4">
                        <p className="text-xs font-medium text-slate-700 mb-2">📌 Logo</p>
                        {branding.logoUrl && (
                          <img src={branding.logoUrl} alt={branding.logoAlt} className="h-16 object-contain" />
                        )}
                        <p className="text-xs text-slate-600 mt-2">{branding.logoUrl}</p>
                      </div>

                      {/* COMPANY NAME */}
                      <div className="border-b pb-4">
                        <p className="text-xs font-medium text-slate-700">🏢 Company Name</p>
                        <p className="text-base font-bold">{branding.companyName}</p>
                      </div>

                      {/* COLORS */}
                      <div className="border-b pb-4">
                        <p className="text-xs font-medium text-slate-700 mb-2">🎨 Colors</p>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: branding.primaryColor }}
                            />
                            <span className="text-xs">Primary: {branding.primaryColor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: branding.secondaryColor }}
                            />
                            <span className="text-xs">Secondary: {branding.secondaryColor}</span>
                          </div>
                        </div>
                      </div>

                      {/* FONT */}
                      <div>
                        <p className="text-xs font-medium text-slate-700">✍️ Font Family</p>
                        <p style={{ fontFamily: branding.fontFamily }} className="text-base mt-1">
                          {branding.fontFamily}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-900">
                      <strong>💡 Tip:</strong> These settings are saved in your browser's local storage. In production, connect to Supabase to persist these globally.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
