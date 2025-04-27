// Mock data - will be replaced with API calls
const userData = {
    id: 1,
    name: "zaynab",
    email: "john.doe@example.com",
    profile_pic: "Full Stack Developer",
    status: "active",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA",
    bio: "Passionate software developer with over 8 years of experience building web applications. Specialized in JavaScript frameworks and API development. Always looking for challenging projects that push the boundaries of what's possible on the web.",
    linkedin_url: "https://linkedin.com/in/johndoe",
    github_url: "https://github.com/johndoe",
    portfolio_url: "https://johndoe.dev"
};

const educationData = [
    {
        id: 1,
        user_id: 1,
        institution: "Stanford University",
        degree: "Master of Science",
        field_of_study: "Computer Science",
        start_year: 2015,
        end_year: 2017,
        description: "Specialized in Human-Computer Interaction and Machine Learning. Thesis on improving web accessibility through AI."
    },
    {
        id: 2,
        user_id: 1,
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field_of_study: "Computer Science",
        start_year: 2011,
        end_year: 2015,
        description: "Graduated with honors. Active member of the ACM chapter and Hackathon club."
    },
];

const experienceData = [
    {
        id: 1,
        user_id: 1,
        job_title: "Senior Full Stack Developer",
        company: "Tech Innovations Inc.",
        start_date: "2020-03-01",
        end_date: null,
        description: "Lead development of the company's flagship product, a SaaS platform for project management. Implemented microservices architecture and mentored junior developers."
    },
    {
        id: 2,
        user_id: 1,
        job_title: "Full Stack Developer",
        company: "Digital Solutions LLC",
        start_date: "2017-06-01",
        end_date: "2020-02-28",
        description: "Developed and maintained web applications for clients in finance and healthcare sectors. Implemented responsive designs and RESTful APIs."
    },
    {
        id: 3,
        user_id: 1,
        job_title: "Full Stack Developer",
        company: "Digital Solutions LLC",
        start_date: "2017-06-01",
        end_date: "2020-02-28",
        description: "Developed and maintained web applications for clients in finance and healthcare sectors. Implemented responsive designs and RESTful APIs."
    }
];

const projectData = [
    {
        id: 1,
        user_id: 1,
        title: "E-commerce Platform",
        description: "Built a full-featured e-commerce platform with React, Node.js, and MongoDB. Implemented payment processing, inventory management, and analytics dashboard.",
        link: "https://github.com/johndoe/ecommerce-platform",
        start_date: "2022-01-01",
        end_date: "2022-06-30"
    },
    {
        id: 2,
        user_id: 1,
        title: "Task Management App",
        description: "Developed a mobile-first task management application with real-time collaboration features using Flutter and Firebase.",
        link: "https://github.com/johndoe/task-manager",
        start_date: "2021-07-01",
        end_date: "2021-11-15"
    }
];

const skillsData = [
    { id: 1, categoryId: 1, skill_name: "JavaScript", description: "Expert level", approval_status: "approved" },
    { id: 2, categoryId: 1, skill_name: "React", description: "Advanced", approval_status: "approved" },
    { id: 3, categoryId: 1, skill_name: "Node.js", description: "Advanced", approval_status: "approved" },
    { id: 4, categoryId: 2, skill_name: "MongoDB", description: "Intermediate", approval_status: "approved" },
    { id: 5, categoryId: 2, skill_name: "PostgreSQL", description: "Advanced", approval_status: "approved" },
    { id: 6, categoryId: 3, skill_name: "Docker", description: "Intermediate", approval_status: "approved" },
    { id: 7, categoryId: 3, skill_name: "AWS", description: "Intermediate", approval_status: "approved" },
    { id: 8, categoryId: 4, skill_name: "UI/UX Design", description: "Intermediate", approval_status: "approved" }
];

const certificationData = [
    {
        id: 1,
        user_id: 1,
        name: "AWS Certified Solutions Architect",
        authority: "Amazon Web Services",
        license_number: "AWS-SAA-12345",
        start_date: "2021-05-01",
        end_date: "2024-05-01",
        description: "Professional level certification for designing distributed applications on AWS."
    },
    {
        id: 2,
        user_id: 1,
        name: "Certified Scrum Master",
        authority: "Scrum Alliance",
        license_number: "CSM-98765",
        start_date: "2020-03-15",
        end_date: "2022-03-15",
        description: "Certification in Agile project management methodologies."
    }
];

// DOM manipulation functions to populate the UI
function populateUserInfo() {
    document.getElementById('userName').textContent = userData.name || 'Name Not Available';
   // document.getElementById('userProfile').textContent = ;
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
        linkedinLink.style.display = 'flex';
    } else {
        linkedinLink.style.display = 'none';
    }
    
    if (userData.github_url) {
        githubLink.href = userData.github_url;
        githubLink.style.display = 'flex';
    } else {
        githubLink.style.display = 'none';
    }
    
    if (userData.portfolio_url) {
        portfolioLink.href = userData.portfolio_url;
        portfolioLink.style.display = 'flex';
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

function populateEducation() {
    const educationContainer = document.getElementById('educationContainer');
    
    if (educationData.length > 0) {
        educationContainer.innerHTML = '';
        
        educationData.forEach(edu => {
            const years = `${edu.start_year} - ${edu.end_year || 'Present'}`;
            
            const educationCard = document.createElement('div');
            educationCard.className = 'card';
            educationCard.innerHTML = `
                <div class="card-title">${edu.institution}</div>
                <div class="card-subtitle">${edu.degree} in ${edu.field_of_study}</div>
                <div class="card-date">${years}</div>
                <div class="card-description">${edu.description || ''}</div>
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
                ${project.link ? `<a href="${project.link}" target="_blank" style="color: var(--primary); display: block; margin-top: 10px;"><i class="fas fa-link"></i> Project Link</a>` : ''}
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
                ${cert.license_number ? `<div style="margin-bottom: 10px;"><strong>License:</strong> ${cert.license_number}</div>` : ''}
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
function populateSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    
    if (skillsData.length > 0) {
        skillsContainer.innerHTML = '<div class="skills-container"></div>';
        const skillsWrapper = skillsContainer.querySelector('.skills-container');
        
        skillsData.forEach(skill => {
            if (skill.approval_status === 'approved') {
                const skillTag = document.createElement('div');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill.skill_name;
                skillTag.title = skill.description || '';
                
                skillsWrapper.appendChild(skillTag);
            }
        });
    } else {
        skillsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tools"></i>
                <p>No skills added yet</p>
            </div>
        `;
    }
}


//models to edit
// Modal logic and editing logic
document.getElementById('edit-profile-btn').onclick = function() {
    // Populate modal with current data
    document.getElementById('editName').value = document.getElementById('userName').textContent;
   // document.getElementById('editProfilePic').value = ;
    document.getElementById('editEmail').value = document.getElementById('userEmail').textContent.replace(/^[^@]+@[^@]+\.[^@]+$/, '');
    document.getElementById('editPhone').value = document.getElementById('userPhone').textContent.replace('Loading...', '');
    document.getElementById('editAddress').value = document.getElementById('userAddress').textContent.replace('Loading...', '');
    document.getElementById('editBio').value = document.getElementById('userBio').innerText;
    document.getElementById('editProfileModal').style.display = 'block';
};
function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}
document.getElementById('editProfileForm').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('userName').textContent = document.getElementById('editName').value;
   // document.getElementById('userProfilePic').textContent =;
    document.getElementById('userEmail').innerHTML = `<i class="fas fa-envelope"></i> ${document.getElementById('editEmail').value}`;
    document.getElementById('userPhone').innerHTML = `<i class="fas fa-phone"></i> ${document.getElementById('editPhone').value}`;
    document.getElementById('userAddress').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${document.getElementById('editAddress').value}`;
    document.getElementById('userBio').innerHTML = `<p>${document.getElementById('editBio').value}</p>`;
    closeEditProfileModal();
};
// Close modal when clicking outside
window.onclick = function(event) {
    var modal = document.getElementById('editProfileModal');
    if (event.target == modal) {
        closeEditProfileModal();
    }
}

// PDF Generation functions
function formatDate(dateString) {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function preparePdfData() {
    // Populate PDF template with data
    document.getElementById('pdf-name').textContent = userData.name || 'Name Not Available';
    document.getElementById('pdf-email').textContent = userData.email || 'Email Not Available';
    document.getElementById('pdf-phone').textContent = userData.phone || 'Phone Not Available';
    document.getElementById('pdf-address').textContent = userData.address || 'Address Not Available';
    
    // Links
    let linksHTML = [];
    if (userData.linkedin_url) linksHTML.push(`LinkedIn: ${userData.linkedin_url}`);
    if (userData.github_url) linksHTML.push(`GitHub: ${userData.github_url}`);
    if (userData.portfolio_url) linksHTML.push(`Portfolio: ${userData.portfolio_url}`);
    document.getElementById('pdf-links').textContent = linksHTML.join(' | ');
    
    // Bio
    const bioSection = document.getElementById('pdf-bio-section');
    const bioContent = document.getElementById('pdf-bio');
    if (userData.bio) {
        bioContent.textContent = userData.bio;
        bioSection.style.display = 'block';
    } else {
        bioSection.style.display = 'none';
    }
    
    // Experience
    const expSection = document.getElementById('pdf-experience-section');
    const expContent = document.getElementById('pdf-experience');
    if (experienceData.length > 0) {
        expContent.innerHTML = '';
        experienceData.forEach(exp => {
            const expItem = document.createElement('div');
            expItem.className = 'pdf-item';
            expItem.innerHTML = `
                <div class="pdf-item-header">
                    <span>${exp.job_title}, ${exp.company}</span>
                    <span>${formatDate(exp.start_date)} - ${formatDate(exp.end_date)}</span>
                </div>
                <div class="pdf-item-content">${exp.description || ''}</div>
            `;
            expContent.appendChild(expItem);
        });
        expSection.style.display = 'block';
    } else {
        expSection.style.display = 'none';
    }
    
    // Education
    const eduSection = document.getElementById('pdf-education-section');
    const eduContent = document.getElementById('pdf-education');
    if (educationData.length > 0) {
        eduContent.innerHTML = '';
        educationData.forEach(edu => {
            const eduItem = document.createElement('div');
            eduItem.className = 'pdf-item';
            eduItem.innerHTML = `
                <div class="pdf-item-header">
                    <span>${edu.degree} in ${edu.field_of_study}, ${edu.institution}</span>
                    <span>${edu.start_year} - ${edu.end_year || 'Present'}</span>
                </div>
                <div class="pdf-item-content">${edu.description || ''}</div>
            `;
            eduContent.appendChild(eduItem);
        });
        eduSection.style.display = 'block';
    } else {
        eduSection.style.display = 'none';
    }
    
    // Projects
    const projSection = document.getElementById('pdf-projects-section');
    const projContent = document.getElementById('pdf-projects');
    if (projectData.length > 0) {
        projContent.innerHTML = '';
        projectData.forEach(proj => {
            let dateStr = '';
            if (proj.start_date) {
                dateStr = `${formatDate(proj.start_date)} - ${formatDate(proj.end_date)}`;
            }
            
            const projItem = document.createElement('div');
            projItem.className = 'pdf-item';
            projItem.innerHTML = `
                <div class="pdf-item-header">
                    <span>${proj.title}</span>
                    ${dateStr ? `<span>${dateStr}</span>` : ''}
                </div>
                <div class="pdf-item-content">
                    ${proj.description || ''}
                    ${proj.link ? `<br>Link: ${proj.link}` : ''}
                </div>
            `;
            projContent.appendChild(projItem);
        });
        projSection.style.display = 'block';
    } else {
        projSection.style.display = 'none';
    }
    
    // Skills
    const skillsSection = document.getElementById('pdf-skills-section');
    const skillsContent = document.getElementById('pdf-skills');
    if (skillsData.length > 0) {
        const approvedSkills = skillsData.filter(skill => skill.approval_status === 'approved');
        if (approvedSkills.length > 0) {
            skillsContent.innerHTML = '';
            const skillsList = document.createElement('div');
            skillsList.className = 'pdf-skills';
            
            approvedSkills.forEach(skill => {
                skillsList.innerHTML += `<span>${skill.skill_name}${skill.description ? ` (${skill.description})` : ''}</span>`;
            });
            
            skillsContent.appendChild(skillsList);
            skillsSection.style.display = 'block';
        } else {
            skillsSection.style.display = 'none';
        }
    } else {
        skillsSection.style.display = 'none';
    }
    
    // Certifications
    const certSection = document.getElementById('pdf-certifications-section');
    const certContent = document.getElementById('pdf-certifications');
    if (certificationData.length > 0) {
        certContent.innerHTML = '';
        certificationData.forEach(cert => {
            let validityStr = '';
            if (cert.start_date) {
                validityStr = `${formatDate(cert.start_date)} - ${formatDate(cert.end_date)}`;
            }
            
            const certItem = document.createElement('div');
            certItem.className = 'pdf-item';
            certItem.innerHTML = `
                <div class="pdf-item-header">
                    <span>${cert.name}, ${cert.authority}</span>
                    ${validityStr ? `<span>${validityStr}</span>` : ''}
                </div>
                <div class="pdf-item-content">
                    ${cert.license_number ? `License: ${cert.license_number}<br>` : ''}
                    ${cert.description || ''}
                </div>
            `;
            certContent.appendChild(certItem);
        });
        certSection.style.display = 'block';
    } else {
        certSection.style.display = 'none';
    }
}

// Generate PDF using jsPDF and html2canvas
function generatePDF() {
    preparePdfData();
    
    const pdfTemplate = document.getElementById('pdfTemplate');
    pdfTemplate.style.display = 'block';
    
    // Show the PDF in the preview modal
    const modal = document.getElementById('pdfModal');
    const pdfPreview = document.getElementById('pdfPreview');
    
    html2canvas(pdfTemplate, {
        scale: 2,
        useCORS: true,
        logging: false
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        pdfPreview.innerHTML = `<img src="${imgData}" style="width: 100%;">`;
        modal.style.display = 'block';
        
        // Hide the template again
        pdfTemplate.style.display = 'none';
    });
}

function downloadPDF() {
    preparePdfData();
    
    const pdfTemplate = document.getElementById('pdfTemplate');
    pdfTemplate.style.display = 'block';
    
    html2canvas(pdfTemplate, {
        scale: 2,
        useCORS: true,
        logging: false
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${userData.name.replace(/\s+/g, '_')}_CV.pdf`);
        
        // Hide the template again
        pdfTemplate.style.display = 'none';
    });
}

function closePdfModal() {
    document.getElementById('pdfModal').style.display = 'none';
}

function sendEmail() {
    // In a real application, this would send the CV to an email address
    // For now, we'll just show an alert
    alert('This feature would send the CV to an email address. Implementation requires backend support.');
    
    // In a real implementation, you would:
    // 1. Generate the PDF on the server or client
    // 2. Send it via API to the email service
    // 3. Confirm delivery to the user
}

// API functions (mock for now)
async function fetchUserData(userId) {
    // In a real application, this would be an API call
    // return await fetch(`/api/users/${userId}`).then(res => res.json());
    return userData;
}

async function fetchEducation(userId) {
    // In a real application, this would be an API call
    // return await fetch(`/api/users/${userId}/education`).then(res => res.json());
    return educationData;
}

async function fetchExperience(userId) {
    // In a real application, this would be an API call
    // return await fetch(`/api/users/${userId}/experience`).then(res => res.json());
    return experienceData;
}

async function fetchProjects(userId) {
    // In a real application, this would be an API call
    // return await fetch(`/api/users/${userId}/projects`).then(res => res.json());
    return projectData;
}

async function fetchSkills(userId) {
    // In a real application, this would be an API call
    // return await fetch(`/api/users/${userId}/skills`).then(res => res.json());
    return skillsData;
}

async function fetchCertifications(userId) {
    // In a real application, this would be an API call
    // return await fetch(`/api/users/${userId}/certifications`).then(res => res.json());
    return certificationData;
}

// Initialize the page
async function initPage() {
    try {
        // In a real application, these would be API calls with the correct user ID
        // const userId = getCurrentUserId(); // This would come from authentication
        const userId = 1; // Mock user ID for now
        
        // Load all user data
        populateUserInfo();
        populateExperience();
        populateEducation();
        populateProjects();
        populateCertifications();
        populateSkills();

        
    } catch (error) {
        console.error('Error initializing page:', error);
        alert('There was an error loading your profile. Please try again later.');
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
