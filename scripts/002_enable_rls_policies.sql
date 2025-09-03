-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_periods ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'administrator')
);
CREATE POLICY "Admins can delete profiles" ON public.profiles FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'administrator')
);

-- Teams policies
CREATE POLICY "Users can view teams they belong to" ON public.teams FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.team_members WHERE team_id = id AND user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'manager'))
);
CREATE POLICY "Managers and admins can manage teams" ON public.teams FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'manager'))
);

-- Team members policies
CREATE POLICY "Users can view team memberships" ON public.team_members FOR SELECT USING (
  user_id = auth.uid() 
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'manager'))
);
CREATE POLICY "Managers and admins can manage team members" ON public.team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'manager'))
);

-- Competencies policies
CREATE POLICY "All users can view competencies" ON public.competencies FOR SELECT USING (true);
CREATE POLICY "Admins can manage competencies" ON public.competencies FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'administrator')
);

-- Feedback policies
CREATE POLICY "Users can view feedback they're involved in" ON public.feedback FOR SELECT USING (
  evaluator_id = auth.uid() 
  OR evaluated_id = auth.uid()
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'manager'))
);
CREATE POLICY "Users can create feedback" ON public.feedback FOR INSERT WITH CHECK (
  evaluator_id = auth.uid()
);
CREATE POLICY "Users can update their own feedback" ON public.feedback FOR UPDATE USING (
  evaluator_id = auth.uid() AND status = 'draft'
);
CREATE POLICY "Admins and managers can update any feedback" ON public.feedback FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'manager'))
);

-- Feedback competencies policies
CREATE POLICY "Users can view feedback competencies" ON public.feedback_competencies FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.feedback WHERE id = feedback_id AND (evaluator_id = auth.uid() OR evaluated_id = auth.uid()))
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'manager'))
);
CREATE POLICY "Users can manage their feedback competencies" ON public.feedback_competencies FOR ALL USING (
  EXISTS (SELECT 1 FROM public.feedback WHERE id = feedback_id AND evaluator_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('administrator', 'manager'))
);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Audit logs policies
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'administrator')
);
CREATE POLICY "System can create audit logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- Feedback periods policies
CREATE POLICY "All users can view feedback periods" ON public.feedback_periods FOR SELECT USING (true);
CREATE POLICY "Admins can manage feedback periods" ON public.feedback_periods FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'administrator')
);
