-- Insert sample users
INSERT INTO Users (name, email, password, bio, profile_pic, role) VALUES
('Admin User', 'admin@skillup.com', '123456', 'System administrator', 'admin_profile.jpg', 'admin');


-- Insert sample users
INSERT INTO Users (name, email, password, bio, profile_pic, role) VALUES
('Narjess', 'narjess@skillup.com', '123456', 'Web Designer', 'admin_profile.jpg', 'user');

-- Insert sample Category
INSERT INTO Category (name) VALUES ('Programming'), ('Graphic Design'), ('Cooking');


-- Insert sample skills
INSERT INTO Skills (categoryId,skill_name, description) VALUES
(1,'JavaScript', 'Programming language for web development'),
(1,'Python', 'Versatile programming language'),
(2,'Interior Design', 'Creating visual content for digital media');

-- Insert sample user skills
INSERT INTO User_Skills (user_id, skill_id, skill_type, skill_level) VALUES
(1, 1, 'teach', 'Advanced'),(1, 2, 'learn', 'Beginner');



---Insert Sample app review
INSERT INTO Review (user_id, rating, comment)VALUES 
(2,  5, 'Great experience! Learned a lot.'),
(1,  4, 'As a photographer, I exchanged portrait sessions for cooking lessons. Now I can take beautiful photos AND make delicious pasta from scratch!'),
(2,  3, 'I taught web design and learned yoga in return. SkillSwap made it easy to find someone with complementary skills to exchange with.');

