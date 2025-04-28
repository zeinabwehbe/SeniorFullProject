-- Insert sample users
INSERT INTO Users (name, email, password, bio, profile_pic, role) VALUES
('Admin User', 'admin@skillup.com', '123456', 'System administrator', 'https://t3.ftcdn.net/jpg/00/65/75/68/360_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I.jpg', 'admin');


-- Insert sample users
INSERT INTO Users (name, email, password, bio, profile_pic, role) VALUES
('Narjess', 'narjess@skillup.com', '123456', 'Web Designer', 'https://cdn-icons-png.flaticon.com/512/4515/4515630.png', 'user'),
('Yassine', 'yassine@skillup.com', '123456', 'Web Developer', 'https://static.vecteezy.com/system/resources/previews/000/439/863/large_2x/vector-users-icon.jpg', 'user'),
('Ayoub', 'ayoub@skillup.com', '123456', 'Graphic Designer', 'https://cdn-icons-png.flaticon.com/512/219/219970.png', 'user');

-- Insert sample Category
INSERT INTO Category (name, profile_pic, description) VALUES 
('Web Development', 'https://blog.zegocloud.com/wp-content/uploads/2024/03/types-of-web-development-services.jpg', 'Learn to build beautiful and functional websites from scratch. Master HTML, CSS, JavaScript, and modern frameworks.'),
('Graphic Design', 'https://digitaltribe.ae/wp-content/uploads/2021/05/Graphic-designing.jpg', 'Create eye-catching visuals and impactful brand elements. Learn design principles, tools, and techniques.'),
('Cooking', 'https://assets.heartfoundation.org.nz/images/all-shared-sections/blogs/cooking-at-home.png?mtime=1669000865', 'Master the art of cooking with expert guidance. Learn various cuisines, techniques, and kitchen skills.');


-- Insert sample skills
INSERT INTO Skills (categoryId,skill_name, description) VALUES
(1,'JavaScript', 'Programming language for web development'),
(1,'Python', 'Versatile programming language'),
(2,'Photography', 'Learn to capture stunning images with a camera'),
(2,'Videography', 'Capture and edit videos with professional tools'),
(3,'Cooking', 'Master the art of cooking with expert guidance'),
(3,'Baking', 'Learn to bake delicious pastries and cakes');


-- Insert sample user skills
INSERT INTO User_Skills (user_id, skill_id, skill_type, skill_level) VALUES
(1, 1, 'teach', 'Advanced'),
(1, 2, 'learn', 'Beginner'),
(2, 6, 'teach', 'Advanced'),
(3, 3, 'teach', 'Intermediate'),
(3, 5, 'teach', 'Beginner'),
(2, 4, 'teach', 'Advanced');


---Insert Sample app review
INSERT INTO Review (user_id, rating, comment)VALUES 
(2,  5, 'Great experience! Learned a lot.'),
(1,  4, 'As a photographer, I exchanged portrait sessions for cooking lessons. Now I can take beautiful photos AND make delicious pasta from scratch!'),
(2,  3, 'I taught web design and learned yoga in return. SkillSwap made it easy to find someone with complementary skills to exchange with.');


---Insert Sample app review
INSERT INTO Review (user_id, comment)VALUES 
(1, 'Great experience! Learned a lot.');