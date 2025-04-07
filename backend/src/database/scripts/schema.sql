
    CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    bio TEXT,
    profile_pic TEXT,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,status TEXT DEFAULT 'active' 
);

CREATE TABLE Skills (
    skill_id INTEGER PRIMARY KEY AUTOINCREMENT,
    skill_name TEXT NOT NULL,
   
    description TEXT,
    approval_status TEXT DEFAULT 'pending'  
);

CREATE TABLE User_Skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    skill_id INTEGER ,
    skill_type TEXT NOT NULL CHECK(skill_type IN ('teach', 'learn')),
    skill_level TEXT CHECK(skill_level IN ('Beginner', 'Intermediate', 'Advanced')),
   

FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE
);
