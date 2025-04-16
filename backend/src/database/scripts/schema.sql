CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    bio TEXT,
    profile_pic TEXT,  
    role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'active'
);

CREATE TABLE Category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  profile_pic TEXT
);


CREATE TABLE Skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryId  INTEGER,
    skill_name TEXT NOT NULL, 
    description TEXT,
    approval_status TEXT DEFAULT 'pending', 
  FOREIGN KEY (categoryId) REFERENCES Category(id) ON DELETE CASCADE

);

CREATE TABLE User_Skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    skill_id INTEGER ,
    skill_type TEXT NOT NULL CHECK(skill_type IN ('teach', 'learn')),
    skill_level TEXT CHECK(skill_level IN ('Beginner', 'Intermediate', 'Advanced')),
FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
FOREIGN KEY (skill_id) REFERENCES Skills(id) ON DELETE CASCADE
);

CREATE TABLE Review (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES Users(id)
);
