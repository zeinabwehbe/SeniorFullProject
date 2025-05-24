
let userId = null;
let token = null;
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
        return decoded;
    } catch (error) {
        console.error('Failed to decode token:', error);
        logout();
        return null;
    }
}

     // ATS Banner Toggle Functionality
     document.addEventListener('DOMContentLoaded', function() {
        const atsBanner = document.getElementById('atsBanner');
        const atsBannerContent = document.getElementById('atsBannerContent');
        const atsBannerToggle = document.querySelector('.ats-banner-toggle');
        
        if (atsBanner) {
          const bannerTeaser = atsBanner.querySelector('.ats-banner-teaser');
          
          bannerTeaser.addEventListener('click', function() {
            if (atsBannerContent.style.maxHeight) {
              atsBannerContent.style.maxHeight = null;
              atsBannerToggle.classList.remove('active');
            } else {
              atsBannerContent.style.maxHeight = atsBannerContent.scrollHeight + "px";
              atsBannerToggle.classList.add('active');
            }
          });
        }
      });
// <!-- Section 1 / 6 : PROFILE -->
    async function fetchUserData(userId) {
        try {
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
        
        if (userData.linkedinUrl) {
            linkedinLink.href = userData.linkedinUrl;
        } else {
            linkedinLink.style.display = 'none';
        }
        
        if (userData.githubUrl) {
            githubLink.href = userData.githubUrl;
        } else {
            githubLink.style.display = 'none';
        }
        
        if (userData.portfolioUrl) {
            portfolioLink.href = userData.portfolioUrl;
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
        document.getElementById('editLinkedinUrl').value = userData.linkedinUrl || '';
        document.getElementById('editGithubUrl').value = userData.githubUrl || '';
        document.getElementById('editPortfolioUrl').value = userData.portfolioUrl || '';
        
        modal.style.display = 'block';
    }

    // Function to close the Edit Profile Modal
    function closeEditProfileModal() {
        document.getElementById('editProfileModal').style.display = 'none';
    }

    function saveProfileChanges(event) {
        event.preventDefault();
        
        
        const formData = {
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value,
            address: document.getElementById('editAddress').value,
            bio: document.getElementById('editBio').value,
            linkedinUrl: document.getElementById('editLinkedinUrl').value,
            githubUrl: document.getElementById('editGithubUrl').value,
            portfolioUrl: document.getElementById('editPortfolioUrl').value
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


// <!-- Section 2 / 6 : EDUCATION -->
async function fetchEducation(userId) {
    try {
    
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

// <!-- Section 3 / 6 : EXPERIENCE -->

async function fetchExperience(userId) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}/experience`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Server response:', response.status, errorData);
            throw new Error(`Failed to fetch experience data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Experience data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error in fetchExperience:', error.message);
        console.error('Full error:', error);
        return [];
    }
}

function populateExperience() {
    const experienceContainer = document.getElementById('experienceContainer');
    
    if (experienceData.length > 0) {
        experienceContainer.innerHTML = '';
        
        experienceData.forEach(exp => {
            const startDate = new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            const endDate = exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';
            
            const experienceCard = document.createElement('div');
            experienceCard.className = 'card';
            experienceCard.innerHTML = `
            <div style="position: relative;">
            <div class="card-actions" style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px;">
                <button class="btn btn-warning" onclick="openEditExperienceModal(${exp.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteExperience(${exp.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
                <div class="card-title">${exp.jobTitle}</div>
                <div class="card-subtitle">${exp.company}</div>
                <div class="card-date">${startDate} - ${endDate}</div>
                <div class="card-description">${exp.description || ''}</div>

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

// Function to delete experience
function deleteExperience(experienceId) {
    if (!confirm('Are you sure you want to delete this experience record?')) {
        return;
    }

    fetch(`http://localhost:3000/users/${userId}/experience/${experienceId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete experience');
        experienceData = experienceData.filter(exp => exp.id !== experienceId);
        populateExperience();
        alert('Experience record deleted successfully!');
    })
    .catch(error => {
        console.error('Error deleting experience:', error);
        alert('Failed to delete experience record. Please try again.');
    });
}

// Function to open the Create Experience Modal
function openCreateExperienceModal() {
    document.getElementById('createExperienceModal').style.display = 'block';
}

// Function to close the Create Experience Modal
function closeCreateExperienceModal() {
    document.getElementById('createExperienceModal').style.display = 'none';
}

// Function to save new experience entry
function saveNewExperience() {
    const formData = {
        jobTitle: document.getElementById('jobTitle').value,
        company: document.getElementById('company').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value || null,
        description: document.getElementById('experienceDescription').value
    };

    fetch(`http://localhost:3000/users/${userId}/experience`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to add experience');
        return response.json();
    })
    .then(async data => {
        experienceData = data;
        populateExperience();
        closeCreateExperienceModal();
        alert('Experience added successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error adding experience:', error);
        alert('Failed to add experience. Please try again.');
    });
}

// Function to open the Edit Experience Modal
function openEditExperienceModal(experienceId) {
    const experience = experienceData.find(exp => exp.id === experienceId);
    if (!experience) return;

    document.getElementById('experienceId').value = experience.id;
    document.getElementById('editJobTitle').value = experience.jobTitle;
    document.getElementById('editCompany').value = experience.company;
    document.getElementById('editStartDate').value = experience.startDate;
    document.getElementById('editEndDate').value = experience.endDate || '';
    document.getElementById('editExperienceDescription').value = experience.description || '';

    document.getElementById('editExperienceModal').style.display = 'block';
}

// Function to close the Edit Experience Modal
function closeEditExperienceModal() {
    document.getElementById('editExperienceModal').style.display = 'none';
}

// Function to save edited experience entry
function saveEditedExperience() {
    const experienceId = document.getElementById('experienceId').value;

    const formData = {
        jobTitle: document.getElementById('editJobTitle').value,
        company: document.getElementById('editCompany').value,
        startDate: document.getElementById('editStartDate').value,
        endDate: document.getElementById('editEndDate').value || null,
        description: document.getElementById('editExperienceDescription').value
    };

    const data = fetch(`http://localhost:3000/users/${userId}/experience/${experienceId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to update experience');
        return response.json();
    })
    .then(async data => {
        experienceData = data;
        populateExperience();
        closeEditExperienceModal();
        alert('Experience updated successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error updating experience:', error);
        alert('Failed to update experience. Please try again.');
    });
}

// <!-- Section 4 / 6 : EXPERIENCE -->
async function fetchProjects(userId) {
    try {
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

function populateProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    if (projectData.length > 0) {
        projectsContainer.innerHTML = '';
        
        projectData.forEach(project => {
            const dates = project.startDate ? 
                `${new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                 ${project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}` : '';
            
            const projectCard = document.createElement('div');
            projectCard.className = 'card';
            projectCard.innerHTML = `
                <div style="position: relative;">
                    <div class="card-actions" style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px;">
                        <button class="btn btn-warning" onclick="openEditProjectModal(${project.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger" onclick="deleteProject(${project.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                    <div class="card-title">${project.title}</div>
                    ${dates ? `<div class="card-date">${dates}</div>` : ''}
                    <div class="card-description">${project.description || ''}</div>
                    ${project.link ? `<a href="${project.link}" target="_blank" class="link-btn"><i class="fas fa-link"></i> Project Link</a>` : ''}
                </div>
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

function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }

    fetch(`http://localhost:3000/users/${userId}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete project');
        projectData = projectData.filter(project => project.id !== projectId);
        populateProjects();
        alert('Project deleted successfully!');
    })
    .catch(error => {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
    });
}

function openCreateProjectModal() {
    document.getElementById('createProjectModal').style.display = 'block';
}

function closeCreateProjectModal() {
    document.getElementById('createProjectModal').style.display = 'none';
}

function saveNewProject() {
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        link: document.getElementById('link').value,
        startDate: document.getElementById('projectStartDate').value,
        endDate: document.getElementById('projectEndDate').value || null
    };

    fetch(`http://localhost:3000/users/${userId}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to add project');
        return response.json();
    })
    .then(data => {
        projectData = data;
        populateProjects();
        closeCreateProjectModal();
        alert('Project added successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error adding project:', error);
        alert('Failed to add project. Please try again.');
    });
}

function openEditProjectModal(projectId) {
    const project = projectData.find(proj => proj.id === projectId);
    if (!project) return;

    document.getElementById('projectId').value = project.id;
    document.getElementById('editTitle').value = project.title;
    document.getElementById('editDescription').value = project.description || '';
    document.getElementById('editLink').value = project.link || '';
    document.getElementById('editProjectStartDate').value = project.startDate || '';
    document.getElementById('editProjectEndDate').value = project.endDate || '';

    document.getElementById('editProjectModal').style.display = 'block';
}

function closeEditProjectModal() {
    document.getElementById('editProjectModal').style.display = 'none';
}

function saveEditedProject() {
    const projectId = document.getElementById('projectId').value;

    const formData = {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value,
        link: document.getElementById('editLink').value,
        startDate: document.getElementById('editProjectStartDate').value,
        endDate: document.getElementById('editProjectEndDate').value || null
    };

    fetch(`http://localhost:3000/users/${userId}/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to update project');
        return response.json();
    })
    .then(data => {
        projectData = data;
        populateProjects();
        closeEditProjectModal();
        alert('Project updated successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error updating project:', error);
        alert('Failed to update project. Please try again.');
    });
}


// <!-- Section 5 / 6 : CERTIFICATIONS -->

async function fetchCertifications(userId) {
    try {
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
function populateCertifications() {
    const certificationsContainer = document.getElementById('certificationsContainer');
    
    if (certificationData.length > 0) {
        certificationsContainer.innerHTML = '';
        
        certificationData.forEach(cert => {
            console.log("each certification", cert)
            const startDate = cert.startDate ? new Date(cert.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
            const endDate = cert.endDate ? new Date(cert.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'No Expiration';
            
            const certCard = document.createElement('div');
            certCard.className = 'card';
            certCard.innerHTML = `
                <div style="position: relative;">
                    <div class="card-actions" style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px;">
                        <button class="btn btn-warning" onclick="openEditCertificationModal(${cert.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger" onclick="deleteCertification(${cert.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                    <div class="card-title">${cert.name}</div>
                    <div class="card-subtitle">${cert.authority || ''}</div>
                    ${startDate ? `<div class="card-date">${startDate} - ${endDate}</div>` : ''}
                    ${cert.licenseNumber ? `<div class="cert-license"><strong>License:</strong> ${cert.licenseNumber}</div>` : ''}
                    <div class="card-description">${cert.description || ''}</div>
                </div>
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

function deleteCertification(certificationId) {
    if (!confirm('Are you sure you want to delete this certification?')) {
        return;
    }

    fetch(`http://localhost:3000/users/${userId}/certifications/${certificationId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete certification');
        certificationData = certificationData.filter(cert => cert.id !== certificationId);
        populateCertifications();
        alert('Certification deleted successfully!');
    })
    .catch(error => {
        console.error('Error deleting certification:', error);
        alert('Failed to delete certification. Please try again.');
    });
}

function openCreateCertificationModal() {
    document.getElementById('createCertificationModal').style.display = 'block';
}

function closeCreateCertificationModal() {
    document.getElementById('createCertificationModal').style.display = 'none';
}

function saveNewCertification() {
    const formData = {
        name: document.getElementById('name').value,
        authority: document.getElementById('authority').value,
        licenseNumber: document.getElementById('licenseNumber').value,
        startDate: document.getElementById('certificationStartDate').value,
        endDate: document.getElementById('certificationEndDate').value || null,
        description: document.getElementById('certificationDescription').value
    };

    fetch(`http://localhost:3000/users/${userId}/certifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to add certification');
        return response.json();
    })
    .then(data => {
        certificationData = data;
        populateCertifications();
        closeCreateCertificationModal();
        alert('Certification added successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error adding certification:', error);
        alert('Failed to add certification. Please try again.');
    });
}

function openEditCertificationModal(certificationId) {
    const certification = certificationData.find(cert => cert.id === certificationId);
    if (!certification) return;

    document.getElementById('certificationId').value = certification.id;
    document.getElementById('editCertificateName').value = certification.name;
    document.getElementById('editAuthority').value = certification.authority || '';
    document.getElementById('editLicenseNumber').value = certification.licenseNumber || '';
    document.getElementById('editCertificationStartDate').value = certification.startDate || '';
    document.getElementById('editCertificationEndDate').value = certification.endDate || '';
    document.getElementById('editCertificationDescription').value = certification.description || '';

    document.getElementById('editCertificationModal').style.display = 'block';
}

function closeEditCertificationModal() {
    document.getElementById('editCertificationModal').style.display = 'none';
}

function saveEditedCertification() {
    const certificationId = document.getElementById('certificationId').value;

    const formData = {
        name: document.getElementById('editName').value,
        authority: document.getElementById('editAuthority').value,
        licenseNumber: document.getElementById('editLicenseNumber').value,
        startDate: document.getElementById('editCertificationStartDate').value,
        endDate: document.getElementById('editCertificationEndDate').value || null,
        description: document.getElementById('editCertificationDescription').value
    };

    fetch(`http://localhost:3000/users/${userId}/certifications/${certificationId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to update certification');
        return response.json();
    })
    .then(data => {
        certificationData = data;
        populateCertifications();
        closeEditCertificationModal();
        alert('Certification updated successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error updating certification:', error);
        alert('Failed to update certification. Please try again.');
    });
}


// <!-- Section 6 / 6 : SKILLS -->
async function fetchSkills(userId) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}/skills`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch skills data');
        }
        
        const data = await response.json();
        console.log('Skills data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error in fetchSkills:', error.message);
        return [];
    }
}
function populateSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    
    if (!skillsData || skillsData.length === 0) {
        skillsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tools"></i>
                <p>No skills added yet</p>
            </div>
        `;
        return;
    }

    skillsContainer.innerHTML = ''; // Clear existing content

    skillsData.forEach(skill => {
         const skillName = skill.skill.skill_name || '';
        const skillLevel = skill.skill_level || '';
        skills: skillsData.map(skill => ({
            name: skill.skill.skill_name,
            level: skill.skill_level
        }))
          const skillCard = document.createElement('div');
        skillCard.className = 'card';
        skillCard.innerHTML = `
            <div style="position: relative; display: flex; align-items: center;">
                 <div style="flex: 1;">
                    <div class="card-title">${skillName}</div>
                    <div class="card-subtitle">
                        ${skillName ? `<span class="badge badge-info">${skillName}</span>` : ''}
                         ${skillLevel ? `<span class="badge badge-primary">${skillLevel}</span>` : ''}
                     </div>
                 </div>
                <div class="card-actions" style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px;">
                    <button class="btn btn-warning" onclick="openEditSkillModal(${skill.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteSkill(${skill.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        skillsContainer.appendChild(skillCard);
    });
}
function deleteSkill(skillId) {
    if (!confirm('Are you sure you want to delete this skill?')) {
        return;
    }

    fetch(`http://localhost:3000/users/${userId}/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete skill');
        skillsData = skillsData.filter(skill => skill.id !== skillId);
        populateSkills();
        alert('Skill deleted successfully!');
    })
    .catch(error => {
        console.error('Error deleting skill:', error);
        alert('Failed to delete skill. Please try again.');
    });
}

function openCreateSkillModal() {
    document.getElementById('createSkillModal').style.display = 'block';
}

function closeCreateSkillModal() {
    document.getElementById('createSkillModal').style.display = 'none';
}

function saveNewSkill() {
    const formData = {
        user_id: userId,
        skill_name: document.getElementById('skillId').value,
        skill_type: document.getElementById('skillType').value,
        skill_level: document.getElementById('skillLevel').value
    };

    fetch(`http://localhost:3000/users/${userId}/skills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to add skill');
        return response.json();
    })
    .then(data => {
        skillsData = data;
        populateSkills();
        closeCreateSkillModal();
        alert('Skill added successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error adding skill:', error);
        alert('Failed to add skill. Please try again.');
    });
}

function openEditSkillModal(skillId) {
    const skill = skillsData.find(skill => skill.id === skillId);
    if (!skill) return;

    document.getElementById('skillId').value = skill.skill_id;
    document.getElementById('editSkillType').value = skill.skill_type;
    document.getElementById('editSkillLevel').value = skill.skill_level;

    document.getElementById('editSkillModal').style.display = 'block';
}

function closeEditSkillModal() {
    document.getElementById('editSkillModal').style.display = 'none';
}

function saveEditedSkill() {
    const skillId = document.getElementById('skillId').value;

    const formData = {
        skill_type: document.getElementById('editSkillType').value,
        skill_level: document.getElementById('editSkillLevel').value
    };

    fetch(`http://localhost:3000/users/${userId}/skills/${skillId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to update skill');
        return response.json();
    })
    .then(data => {
        skillsData = data;
        populateSkills();
        closeEditSkillModal();
        alert('Skill updated successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error updating skill:', error);
        alert('Failed to update skill. Please try again.');
    });
}


//validation
document.getElementById('createEducationForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveNewEducationBtn');
    saveButton.disabled = !form.checkValidity();
});

document.getElementById('editEducationForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveEditedEducationBtn');
    saveButton.disabled = !form.checkValidity();
});

document.getElementById('createExperienceForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveNewExperienceBtn');
    saveButton.disabled = !form.checkValidity();
});

document.getElementById('editExperienceForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveEditedExperienceBtn');
    saveButton.disabled = !form.checkValidity();
});

document.getElementById('createProjectForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveNewProjectBtn');
    saveButton.disabled = !form.checkValidity();
});

document.getElementById('editProjectForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveEditedProjectBtn');
    saveButton.disabled = !form.checkValidity();
});

document.getElementById('createCertificationForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveCertificationBtn');
    saveButton.disabled = !form.checkValidity();
});

document.getElementById('editCertificationForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveEditedCertificationBtn');
    saveButton.disabled = !form.checkValidity();
});
document.getElementById('createSkillForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveNewSkillBtn');
    saveButton.disabled =!form.checkValidity();
});

document.getElementById('editSkillForm').addEventListener('input', function() {
    const form = this;
    const saveButton = document.getElementById('saveEditedSkillBtn');
    saveButton.disabled =!form.checkValidity();
});

// Initialize the page
async function initPage() {
    token = getToken();
    console.log('Token:', token);
    if (!token) {
         window.location.href = "../auth-system.html";
        return;
    }
    
    const user = getUserFromToken(token);
    if (!user) return;
    
    userId = user.sub;  // Set global userId
    console.log('User ID:', userId);
    try {
        // Fetch all user data
        userData = await fetchUserData(userId) || {};
        educationData = await fetchEducation(userId) || [];
        experienceData = await fetchExperience(userId) || [];
        projectData = await fetchProjects(userId) || [];
        certificationData = await fetchCertifications(userId) || [];
        skillsData = await fetchSkills(userId) || [];
        // Call this function when the page loads or when the modal is opened
        // Populate the UI with fetched data
        populateUserInfo();
        populateEducation();
        populateExperience();
        populateProjects();
        populateCertifications();
        populateSkills();
    } catch (error) {
        console.error('Error initializing page:', error);
        alert('Failed to load data. Please try again.');
    }
    
}


// Call initPage when the document is ready
document.addEventListener('DOMContentLoaded', initPage);
