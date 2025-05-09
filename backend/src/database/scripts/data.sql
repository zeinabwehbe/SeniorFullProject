-- Insert sample users
INSERT INTO Users (name, email, password, bio, profile_pic, role) VALUES
('Admin User', 'admin@skillup.com', '123456', 'System administrator', 'https://t3.ftcdn.net/jpg/00/65/75/68/360_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I.jpg', 'admin');


-- Insert sample users
INSERT INTO Users (name, email, password, bio, profile_pic, role) VALUES
('Narjess', 'narjess@skillup.com', '123456', 'Web Designer', 'https://cdn-icons-png.flaticon.com/512/4515/4515630.png', 'user'),
('Yassine', 'yassine@skillup.com', '123456', 'Web Developer', 'https://static.vecteezy.com/system/resources/previews/000/439/863/large_2x/vector-users-icon.jpg', 'user'),
('Ayoub', 'ayoub@skillup.com', '123456', 'Graphic Designer', 'https://cdn-icons-png.flaticon.com/512/219/219970.png', 'user'),
('Zahraa', 'zahraa@gmail.com', '123', 'Cooking Enthusiast', 'https://cdn-icons-png.flaticon.com/512/2922/2922565.png', 'user'),
('Tariq', 'tariq@skillup.com', '123456', 'Python Developer', 'https://cdn-icons-png.flaticon.com/512/2922/2922688.png', 'user'),
('Lina', 'lina@skillup.com', '123456', 'Photographer', 'https://cdn-icons-png.flaticon.com/512/2922/2922616.png', 'user');


INSERT INTO Users (name, email, password, role, profile_pic, phone, address, bio, linkedin_url, github_url, portfolio_url) VALUES
('Omar', 'omar@skillup.com', 'password123', 'user',
 'https://cdn-icons-png.flaticon.com/512/2922/2922506.png', '567-890-1234', '654 Tech Lane, Startup City', 'Mobile app developer with a focus on Flutter and React Native',
 'https://linkedin.com/in/omar-dev', 'https://github.com/omar123', 'https://omarapps.dev'),

('Fatima', 'fatima@skillup.com', 'pass456', 'user',
 'https://cdn-icons-png.flaticon.com/512/219/219969.png', '678-901-2345', '987 Creativity St, Art Town', 'Digital illustrator and concept artist',
 'https://linkedin.com/in/fatima-art', 'https://github.com/fatima-arts', 'https://fatimaillustrations.com');

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


(3, 5, 'teach', 'Beginner'),
(2, 4, 'teach', 'Advanced'),     -- Yassine teaches Videography
(4, 5, 'learn', 'Intermediate'),   -- Zahraa learning Cooking
(4, 6, 'learn', 'Beginner'),       -- Zahraa learning Baking
(5, 2, 'teach', 'Advanced'),       -- Tariq teaches Python
(6, 3, 'teach', 'Advanced'),       -- Lina teaches Photography
(8,6,'teach','Intermediate'),
(9,4,'teach','Advanced'),
(3,1,'teach','Beginner'),
(3,3,'teach','Advanced'),
(5,2,'teach','Intermediate');





---Insert Sample app review
INSERT INTO Review (user_id, rating, comment)VALUES 
(2,  5, 'Great experience! Learned a lot.'),
(1,  4, 'As a photographer, I exchanged portrait sessions for cooking lessons. Now I can take beautiful photos AND make delicious pasta from scratch!'),
(2,  3, 'I taught web design and learned yoga in return. SkillSwap made it easy to find someone with complementary skills to exchange with.');


---Insert Sample app review
INSERT INTO Review (user_id, comment)VALUES 
(1, 'Great experience! Learned a lot.');