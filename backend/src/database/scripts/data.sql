-- Insert sample users
INSERT INTO Users (name, email, password, bio, profile_pic, role) VALUES
('Admin User', 'admin@skillup.com', '123456', 'System administrator', 'admin_profile.jpg', 'admin');

-- Insert sample skills
INSERT INTO Skills (skill_name, description) VALUES
('JavaScript', 'Programming language for web development'),
('Python', 'Versatile programming language'),
('Graphic Design', 'Creating visual content for digital media');

-- Insert sample user skills
INSERT INTO User_Skills (user_id, skill_id, skill_type, skill_level) VALUES
(1, 1, 'teach', 'Advanced'),
(1, 2, 'learn', 'Beginner');