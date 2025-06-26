// Add these functions to your existing JavaScript file
  // Email modal functions
  function openEmailModal() {
    document.getElementById('emailConfirmModal').style.display = 'block';
}

function closeEmailModal() {
    document.getElementById('emailConfirmModal').style.display = 'none';
}

function sendCVToEmail() {
    const customMessage = document.getElementById('customMessage').value;
    const email = document.getElementById('emailInput').value;
    if (!email) {
        alert('Please enter an email address.');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Close the modal
    closeEmailModal();
    
    // Generate and send CV
    generateAndSendCV(email);
}

// PDF download function
async function downloadCV() {
    const token = getToken();
    if (!token) {
        alert('Authentication error: Please log in again');
        window.location.href = "../auth-system.html";
        return;
    }

    try {
        showLoading('Generating PDF...');
        
        // Collect CV data like in sendCV function
        const cvData = {
            // Basic user info
            ...userData,
            customMessage,
            // Education section
            education: educationData.map(edu => ({
                fieldOfStudy: edu.fieldOfStudy,
                degree: edu.degree,
                institution: edu.institution,
                startDate: edu.startYear,
                endDate: edu.endYear,
                description: edu.description
            })),
            
            // Experience section
            experience: experienceData.map(exp => ({
                title: exp.jobTitle,
                company: exp.company,
                startDate: exp.startDate,
                endDate: exp.endDate,
                description: exp.description
            })),
            
            // Projects section
            projects: projectData.map(proj => ({
                title: proj.title,
                description: proj.description,
                technologies: proj.link
            })),
            
            // Certifications section
            certifications: certificationData.map(cert => ({
                name: cert.name,
                authority: cert.authority,
                date: cert.startDate,
                expiry: cert.endDate
            })),
            
            // Skills section
                skills: skillsData.map(skill => ({
                name: skill.skillName,
                level: skill.level
            }))
         };
        
        // Send request to backend to generate PDF
        const response = await fetch(`${API_URL}/cv/generate-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ cvData })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate PDF');
        }
        
        // Get PDF as blob
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${userData.first_name || 'CV'}_${userData.last_name || 'Profile'}.pdf`;
        
        // Append to body, click, and remove
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        hideLoading();
    } catch (error) {
        hideLoading();
        console.error('Error downloading CV:', error);
        alert('Error downloading CV: ' + error.message);
    }
}

// Remove the duplicate and keep only this version:
async function generateAndSendCV(email) {
    const token = getToken();
    if (!token) {
        alert('Authentication error: Please log in again');
        window.location.href = "../auth-system.html";
        return;
    }

    try {
        showLoading('Preparing your CV...');
        const customMessage = document.getElementById('customMessage').value;

        const cvData = {
            ...userData,
            customMessage,
            // Education section
            education: educationData.map(edu => ({
                fieldOfStudy: edu.fieldOfStudy,
                degree: edu.degree,
                institution: edu.institution,
                startDate: edu.startYear,
                endDate: edu.endYear,
                description: edu.description
            })),
            
            // Experience section
            experience: experienceData.map(exp => ({
                title: exp.jobTitle,
                company: exp.company,
                startDate: exp.startDate,
                endDate: exp.endDate,
                description: exp.description
            })),
            
            // Projects section
            projects: projectData.map(proj => ({
                title: proj.title,
                description: proj.description,
                technologies: proj.link
            })),
            
            // Certifications section
            certifications: certificationData.map(cert => ({
                name: cert.name,
                authority: cert.authority,
                date: cert.startDate,
                expiry: cert.endDate
            })),
            
            // Skills section
            skills: skillsData.map(skill => ({
            name: skill.skill.skillName,
            level: skill.level
        }))
         };
         const response = await fetch(`${API_URL}/cv/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: email,
                customMessage: customMessage,
                cvData: cvData
            })
        });

        const result = await response.json();

        hideLoading();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to send CV');
        }

        alert(`CV sent successfully to ${email}`);
    } catch (error) {
        hideLoading();
        console.error('Error sending CV:', error);
        alert('Error sending CV: ' + error.message);
    }
}


// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Loading indicator functions
function showLoading(message = 'Loading...') {
    // Create loading overlay if it doesn't exist
    let loadingOverlay = document.getElementById('loadingOverlay');
    
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.style.position = 'fixed';
        loadingOverlay.style.top = '0';
        loadingOverlay.style.left = '0';
        loadingOverlay.style.width = '100%';
        loadingOverlay.style.height = '100%';
        loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.justifyContent = 'center';
        loadingOverlay.style.alignItems = 'center';
        loadingOverlay.style.zIndex = '9999';
        
        const loadingContent = document.createElement('div');
        loadingContent.style.backgroundColor = 'white';
        loadingContent.style.padding = '20px';
        loadingContent.style.borderRadius = '5px';
        loadingContent.style.textAlign = 'center';
        
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.style.border = '5px solid #f3f3f3';
        spinner.style.borderTop = '5px solid #3498db';
        spinner.style.borderRadius = '50%';
        spinner.style.width = '50px';
        spinner.style.height = '50px';
        spinner.style.animation = 'spin 2s linear infinite';
        spinner.style.margin = '0 auto 10px auto';
        
        // Add keyframes for spinner animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        const messageElement = document.createElement('p');
        messageElement.id = 'loadingMessage';
        messageElement.textContent = message;
        
        loadingContent.appendChild(spinner);
        loadingContent.appendChild(messageElement);
        loadingOverlay.appendChild(loadingContent);
        document.body.appendChild(loadingOverlay);
    } else {
        document.getElementById('loadingMessage').textContent = message;
        loadingOverlay.style.display = 'flex';
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}



// Add this to your DOMContentLoaded event or wherever you initialize your UI

// Add these event listeners when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for the CV buttons if they exist
    const sendCVBtn = document.getElementById('sendCVBtn');
    if (sendCVBtn) {
        sendCVBtn.addEventListener('click', openEmailModal);
    }
    
    const downloadCVBtn = document.getElementById('downloadCVBtn');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', downloadCV);
    }
});