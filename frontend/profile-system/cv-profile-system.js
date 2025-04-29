
// Mock data for testing - will be replaced with API data in production
// let userData = {};
// let educationData = [];
// let experienceData = [];
// let projectData = [];
// let certificationData = [];
// let skillsData = [];

// Authentication functions
// Get JWT token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Function to logout user
function logout() {
    localStorage.removeItem('token');
    window.location.href = "../auth-system.html";
}

// Decode JWT to get user information
function getUserFromToken(token) {
    if (!token) return null;
    try {
        const decoded = jwt_decode(token);
        
        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
            console.error('Token has expired');
            alert('Session expired. Please log in again.');
            logout();
            return null;
        }

        return decoded;
    } catch (error) {
        console.error('Failed to decode token:', error);
        alert('Invalid session detected. Redirecting to login page.');
        logout();
        return null;
    }
}

// <!-- Section 1 / 6 : PROFILE -->
    async function fetchUserData(userId) {
        try {
            const token = getToken();
            console.log('you are in users data:', userId)
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
    // DOM manipulation functions to populate the UI
    function populateUserInfo() {
        // Set profile picture
        const profilePic = document.getElementById('profilePic');
        profilePic.src = `http://localhost:3000/users/${userData.id}/profile-picture`;
        profilePic.onerror = function() {
            this.onerror = null;
            this.src = 'default-profile.png';
        };

        document.getElementById('userName').textContent = userData.name || 'Name Not Available';
        document.getElementById('userEmail').innerHTML = userData.email ? 
            `<i class="fas fa-envelope"></i> ${userData.email}` : 
            `<i class="fas fa-envelope"></i> Email Not Available`;
        document.getElementById('userPhone').innerHTML = userData.phone ? 
            `<i class="fas fa-phone"></i> ${userData.phone}` : 
            `<i class="fas fa-phone"></i> Phone Not Available`;
        document.getElementById('userAddress').innerHTML = userData.address ? 
            `<i class="fas fa-map-marker-alt"></i> ${userData.address}` : 
            `<i class="fas fa-map-marker-alt"></i> Address Not Available`;
        
        // Social links
        const linkedinLink = document.getElementById('linkedinLink');
        const githubLink = document.getElementById('githubLink');
        const portfolioLink = document.getElementById('portfolioLink');
        
        if (userData.linkedin_url) {
            linkedinLink.href = userData.linkedin_url;
            linkedinLink.style.display = 'inline-block';
        } else {
            linkedinLink.style.display = 'none';
        }
        
        if (userData.github_url) {
            githubLink.href = userData.github_url;
            githubLink.style.display = 'inline-block';
        } else {
            githubLink.style.display = 'none';
        }
        
        if (userData.portfolio_url) {
            portfolioLink.href = userData.portfolio_url;
            portfolioLink.style.display = 'inline-block';
        } else {
            portfolioLink.style.display = 'none';
        }
        
        // Bio
        const bioContainer = document.getElementById('userBio');
        if (userData.bio) {
            bioContainer.innerHTML = `<p>${userData.bio}</p>`;
        } else {
            bioContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-edit"></i>
                    <p>No bio information available</p>
                </div>
            `;
        }
    }

    // Initialize user data
    function initializeUserData() {
        const token = getToken();
        if (!token) {
            alert('Session expired. Please log in again.');
            window.location.href = "../auth-system.html";
            return null;
        }
        
        const user = getUserFromToken(token);
        if (!user) return null;
        
        // Set profile data
        const userId = user.sub;
        
        // Set profile picture
        const profilePic = document.getElementById('profilePic');
        profilePic.src = `http://localhost:3000/users/${userId}/profile-picture`;
        profilePic.onerror = function() {
            this.onerror = null;
            this.src = 'default-profile.png';
        };
        
        // Set user info
        document.getElementById('userName').textContent = user.name || "No Name";
        document.getElementById('userEmail').innerHTML = `<i class="fas fa-envelope"></i> ${user.email || "No Email"}`;
        document.getElementById('userPhone').innerHTML = `<i class="fas fa-phone"></i> ${user.phone || "No Phone"}`;
        document.getElementById('userAddress').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${user.address || "No Address"}`;
        
        // Set social links
        if (user.linkedinUrl) {
            document.getElementById('linkedinLink').href = user.linkedinUrl;
        }
        if (user.githubUrl) {
            document.getElementById('githubLink').href = user.githubUrl;
        }
        if (user.portfolioUrl) {
            document.getElementById('portfolioLink').href = user.portfolioUrl;
        }
        
        // Set bio if available
        if (user.bio) {
            document.getElementById('userBio').innerHTML = `<p>${user.bio}</p>`;
        }
        
        return user;
    }

    document.getElementById('uploadPicBtn').addEventListener('click', async function() {
        const input = document.getElementById('profilePicInput');
        if (!input.files.length) {
            alert('Please select an image to upload.');
            return;
        }
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const token = getToken();
        if (!token) {
            alert('Session expired. Please log in again.');
            window.location.href = "../auth-system.html";
            return;
        }

        const user = getUserFromToken(token);
        if (!user) return;

        try {
            const response = await fetch(`http://localhost:3000/users/${user.sub}/profile-picture`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                alert('Unauthorized. Please log in again.');
                return;
            }
            if (!response.ok) throw new Error('Upload failed');
            document.getElementById('profilePic').src = `http://localhost:3000/users/${user.sub}/profile-picture`;
            alert('Profile picture updated!');
        } catch (err) {
            console.log(err);
            alert('Failed to upload image.');
        }
    });

    // Function to open the Edit Profile Modal
    function openEditProfileModal() {
        const modal = document.getElementById('editProfileModal');
        
        // Pre-fill form with current user data
        document.getElementById('editName').value = userData.name || '';
        document.getElementById('editEmail').value = userData.email || '';
        document.getElementById('editPhone').value = userData.phone || '';
        document.getElementById('editAddress').value = userData.address || '';
        document.getElementById('editBio').value = userData.bio || '';
        document.getElementById('editLinkedinUrl').value = userData.linkedin_url || '';
        document.getElementById('editGithubUrl').value = userData.github_url || '';
        document.getElementById('editPortfolioUrl').value = userData.portfolio_url || '';
        
        modal.style.display = 'block';
    }

    // Function to close the Edit Profile Modal
    function closeEditProfileModal() {
        document.getElementById('editProfileModal').style.display = 'none';
    }

    function saveProfileChanges(event) {
        event.preventDefault();
        
        const token = getToken();
        if (!token) {
            alert('Session expired. Please log in again.');
            window.location.href = "../auth-system.html";
            return;
        }
        
        const user = getUserFromToken(token);
        if (!user) return;
        
        const userId = user.sub;
        
        const formData = {
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value,
            address: document.getElementById('editAddress').value,
            bio: document.getElementById('editBio').value,
            linkedin_url: document.getElementById('editLinkedinUrl').value,
            github_url: document.getElementById('editGithubUrl').value,
            portfolio_url: document.getElementById('editPortfolioUrl').value
        };
        
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update profile');
            return response.json();
        })
        .then(data => {
            // Update local data and refresh UI
            userData = data;
            populateUserInfo();
            closeEditProfileModal();
            alert('Profile updated successfully!');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        });
    }


// API functions
async function fetchEducation(userId) {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        console.log('Fetching education data for user:', userId);
        const response = await fetch(`http://localhost:3000/users/${userId}/education`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Server response:', response.status, errorData);
            throw new Error(`Failed to fetch education data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Education data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error in fetchEducation:', error.message);
        console.error('Full error:', error);
        return [];
    }
}

function populateEducation() {
    const educationContainer = document.getElementById('educationContainer');
    
    if (educationData.length > 0) {
        educationContainer.innerHTML = '';
        
        educationData.forEach(edu => {
            const years = `${edu.startYear} - ${edu.endYear || 'Present'}`;
            
            const educationCard = document.createElement('div');
            educationCard.className = 'card';
            educationCard.innerHTML = `
                <div style="position: relative;">
                    <div class="card-actions" style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px;">
                        <button class="btn btn-warning" onclick="openEditEducationModal(${edu.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger" onclick="deleteEducation(${edu.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                    <div class="card-title">${edu.institution}</div>
                    <div class="card-subtitle">${edu.degree} in ${edu.fieldOfStudy}</div>
                    <div class="card-date">${years}</div>
                    <div class="card-description">${edu.description || ''}</div>
                </div>
            `;
            
            educationContainer.appendChild(educationCard);
        });
    } else {
        educationContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-graduation-cap"></i>
                <p>No education details added yet</p>
            </div>
        `;
    }
}

// Add this new function for deleting education records
function deleteEducation(educationId) {
    if (!confirm('Are you sure you want to delete this education record?')) {
        return;
    }

    const token = getToken();
    if (!token) {
        alert('Session expired. Please log in again.');
        window.location.href = "../auth-system.html";
        return;
    }

    const user = getUserFromToken(token);
    if (!user) return;

    const userId = user.sub;

    fetch(`http://localhost:3000/users/${userId}/education/${educationId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete education');
        // Remove the education from local data
        educationData = educationData.filter(edu => edu.id !== educationId);
        populateEducation();
        alert('Education record deleted successfully!');
    })
    .catch(error => {
        console.error('Error deleting education:', error);
        alert('Failed to delete education record. Please try again.');
    });
}

// Function to open the Create Education Modal
function openCreateEducationModal() {
    document.getElementById('createEducationModal').style.display = 'block';
}

// Function to close the Create Education Modal
function closeCreateEducationModal() {
    document.getElementById('createEducationModal').style.display = 'none';
}

// Function to save new education entry
function saveNewEducation() {
    const token = getToken();
    if (!token) {
        alert('Session expired. Please log in again.');
        window.location.href = "../auth-system.html";
        return;
    }

    const user = getUserFromToken(token);
    if (!user) return;

    const userId = user.sub;

    const formData = {
        degree: document.getElementById('degree').value,
        fieldOfStudy: document.getElementById('fieldOfStudy').value,
        institution: document.getElementById('institution').value,
        startYear: document.getElementById('startYear').value,
        endYear: document.getElementById('endYear').value,
        description: document.getElementById('educationDescription').value
    };

    fetch(`http://localhost:3000/users/${userId}/education`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to add education');
        return response.json();
    })
    .then(async data => {
        // Fetch fresh education data instead of manually updating
        educationData = data;
        populateEducation();
        closeCreateEducationModal();
        alert('Education added successfully!');
        window.location.reload(); // Refresh the page after user clicks OK on alert
    })
    .catch(error => {
        console.error('Error adding education:', error);
        alert('Failed to add education. Please try again.');
    });
}

// Function to open the Edit Education Modal
function openEditEducationModal(educationId) {
    const education = educationData.find(edu => edu.id === educationId);
    if (!education) return;

    document.getElementById('educationId').value = education.id;
    document.getElementById('editDegree').value = education.degree;
    document.getElementById('editFieldOfStudy').value = education.fieldOfStudy;
    document.getElementById('editInstitution').value = education.institution;
    document.getElementById('editStartYear').value = education.startYear;
    document.getElementById('editEndYear').value = education.endYear;
    document.getElementById('editEducationDescription').value = education.description;

    document.getElementById('editEducationModal').style.display = 'block';
}

// Function to close the Edit Education Modal
function closeEditEducationModal() {
    document.getElementById('editEducationModal').style.display = 'none';
}


// Function to save edited education entry
function saveEditedEducation() {
    const token = getToken();
    if (!token) {
        alert('Session expired. Please log in again.');
        window.location.href = "../auth-system.html";
        return;
    }

    const user = getUserFromToken(token);
    if (!user) return;

    const userId = user.sub;
    const educationId = document.getElementById('educationId').value;

    const formData = {
        degree: document.getElementById('editDegree').value,
        fieldOfStudy: document.getElementById('editFieldOfStudy').value,
        institution: document.getElementById('editInstitution').value,
        startYear: document.getElementById('editStartYear').value,
        endYear: document.getElementById('editEndYear').value,
        description: document.getElementById('editEducationDescription').value
    };

    const data = fetch(`http://localhost:3000/users/${userId}/education/${educationId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to update education');
        return response.json();
    })
    .then(async data => {
        // Fetch fresh education data instead of manually updating
        educationData = data;
        populateEducation();
        closeEditEducationModal();
        alert('Education updated successfully!');
        window.location.reload(); // Refresh the page after user clicks OK on alert

    })
    .catch(error => {
        console.error('Error updating education:', error);
        alert('Failed to update education. Please try again.');
    });
}

async function fetchExperience(userId) {
    try {
        const token = getToken();
        const response = await fetch(`http://localhost:3000/users/${userId}/experience`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch experience data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching experience data:', error);
        return [];
    }
}

async function fetchProjects(userId) {
    try {
        const token = getToken();
        const response = await fetch(`http://localhost:3000/users/${userId}/projects`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch project data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching project data:', error);
        return [];
    }
}

async function fetchSkills(userId) {
    try {
        const token = getToken();
        const response = await fetch(`http://localhost:3000/users/${userId}/skills`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch skills data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching skills data:', error);
        return [];
    }
}

async function fetchCertifications(userId) {
    try {
        const token = getToken();
        const response = await fetch(`http://localhost:3000/users/${userId}/certifications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch certification data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching certification data:', error);
        return [];
    }
}




function populateExperience() {
    const experienceContainer = document.getElementById('experienceContainer');
    
    if (experienceData.length > 0) {
        experienceContainer.innerHTML = '';
        
        experienceData.forEach(exp => {
            const startDate = new Date(exp.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            const endDate = exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';
            
            const experienceCard = document.createElement('div');
            experienceCard.className = 'card';
            experienceCard.innerHTML = `
                <div class="card-title">${exp.job_title}</div>
                <div class="card-subtitle">${exp.company}</div>
                <div class="card-date">${startDate} - ${endDate}</div>
                <div class="card-description">${exp.description || ''}</div>
                <div class="card-actions">
                    <button class="btn btn-warning" onclick="editExperience(${exp.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteExperience(${exp.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            experienceContainer.appendChild(experienceCard);
        });
    } else {
        experienceContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-briefcase"></i>
                <p>No work experience added yet</p>
            </div>
        `;
    }
}

function populateProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    if (projectData.length > 0) {
        projectsContainer.innerHTML = '';
        
        projectData.forEach(project => {
            let date = '';
            if (project.start_date) {
                const startDate = new Date(project.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                const endDate = project.end_date ? 
                    new Date(project.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 
                    'Present';
                date = `${startDate} - ${endDate}`;
            }
            
            const projectCard = document.createElement('div');
            projectCard.className = 'card';
            projectCard.innerHTML = `
                <div class="card-title">${project.title}</div>
                ${date ? `<div class="card-date">${date}</div>` : ''}
                <div class="card-description">${project.description || ''}</div>
                ${project.link ? `<a href="${project.link}" target="_blank" class="link-btn"><i class="fas fa-link"></i> Project Link</a>` : ''}
            `;
            
            projectsContainer.appendChild(projectCard);
        });
    } else {
        projectsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-project-diagram"></i>
                <p>No projects added yet</p>
            </div>
        `;
    }
}

function populateSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    
    if (skillsData.length > 0) {
        const approvedSkills = skillsData.filter(skill => skill.approval_status === 'approved');
        
        if (approvedSkills.length > 0) {
            skillsContainer.innerHTML = '<div class="skills-container"></div>';
            const skillsWrapper = skillsContainer.querySelector('.skills-container');
            
            approvedSkills.forEach(skill => {
                const skillTag = document.createElement('div');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill.skill_name;
                skillTag.title = skill.description || '';
                
                skillsWrapper.appendChild(skillTag);
            });
        } else {
            skillsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tools"></i>
                    <p>No approved skills yet</p>
                </div>
            `;
        }
    } else {
        skillsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tools"></i>
                <p>No skills added yet</p>
            </div>
        `;
    }
}

function populateCertifications() {
    const certificationsContainer = document.getElementById('certificationsContainer');
    
    if (certificationData.length > 0) {
        certificationsContainer.innerHTML = '';
        
        certificationData.forEach(cert => {
            let validity = '';
            if (cert.start_date) {
                const startDate = new Date(cert.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                const endDate = cert.end_date ? 
                    new Date(cert.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 
                    'No Expiration';
                validity = `${startDate} - ${endDate}`;
            }
            
            const certCard = document.createElement('div');
            certCard.className = 'card';
            certCard.innerHTML = `
                <div class="card-title">${cert.name}</div>
                <div class="card-subtitle">${cert.authority || ''}</div>
                ${validity ? `<div class="card-date">${validity}</div>` : ''}
                ${cert.license_number ? `<div class="cert-license"><strong>License:</strong> ${cert.license_number}</div>` : ''}
                <div class="card-description">${cert.description || ''}</div>
            `;
            
            certificationsContainer.appendChild(certCard);
        });
    } else {
        certificationsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-certificate"></i>
                <p>No certifications added yet</p>
            </div>
        `;
    }
}

// Initialize the page
async function initPage() {
    const token = getToken();
    if (!token) {
        alert('Session expired. Please log in again.');
        window.location.href = "../auth-system.html";
        return;
    }
    
    const user = getUserFromToken(token);
    console.log(user)
    if (!user) return;
    
    const userId = user.sub;
    
    try {
        // Fetch all user data
        userData = await fetchUserData(userId) || {};
        educationData = await fetchEducation(userId) || [];
        // experienceData = await fetchExperience(userId) || [];
        // projectData = await fetchProjects(userId) || [];
        // certificationData = await fetchCertifications(userId) || [];
        // skillsData = await fetchSkills(userId) || [];
        
        // Populate the UI with fetched data
        populateUserInfo();
        populateEducation();
        // populateExperience();
        // populateProjects();
        // populateSkills();
        // populateCertifications();
    
    } catch (error) {
        console.log('Error initializing page:', error);
        alert('Failed to load data. Please try again.');
    }
}

// Call initPage when the document is ready
document.addEventListener('DOMContentLoaded', initPage);
