
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import NoticeBoard from "./pages/NoticeBoard";
import Package from "./pages/Package";
import Team from "./pages/Team";
import Mining from "./pages/Mining";
import Apps from "./pages/Apps";
import Guide from "./pages/Guide";
import Profile from "./pages/Profile";
import Recharge from "./pages/Recharge";
import ProfileSetting from "./pages/ProfileSetting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notice-board" element={<NoticeBoard />} />
          <Route path="/package" element={<Package />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="/team/:level" element={<Team />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/recharge/:id" element={<Recharge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
