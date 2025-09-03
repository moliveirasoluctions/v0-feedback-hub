-- Insert sample competencies
INSERT INTO public.competencies (name, description, category) VALUES
('Comunicação', 'Capacidade de se comunicar de forma clara e efetiva', 'Soft Skills'),
('Liderança', 'Habilidade para liderar e motivar equipes', 'Liderança'),
('Trabalho em Equipe', 'Colaboração efetiva com colegas', 'Soft Skills'),
('Resolução de Problemas', 'Capacidade de identificar e resolver problemas', 'Técnica'),
('Inovação', 'Criatividade e pensamento inovador', 'Estratégica'),
('Orientação a Resultados', 'Foco em atingir objetivos e metas', 'Performance'),
('Adaptabilidade', 'Flexibilidade para mudanças', 'Soft Skills'),
('Conhecimento Técnico', 'Domínio das competências técnicas da função', 'Técnica'),
('Gestão de Tempo', 'Organização e priorização de tarefas', 'Produtividade'),
('Relacionamento Interpessoal', 'Habilidade de se relacionar com outros', 'Soft Skills');

-- Insert sample feedback period
INSERT INTO public.feedback_periods (name, description, start_date, end_date, is_active) VALUES
('Avaliação Anual 2024', 'Período de avaliação de desempenho anual', '2024-01-01', '2024-12-31', true),
('1º Trimestre 2024', 'Avaliação do primeiro trimestre', '2024-01-01', '2024-03-31', false),
('2º Trimestre 2024', 'Avaliação do segundo trimestre', '2024-04-01', '2024-06-30', false);
