// PDF Functions
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
    console.log('pdf will be generated when completed')
    preparePdfData();
    console.log('pdf is prepared')

    const pdfTemplate = document.getElementById('pdfTemplate');
    pdfTemplate.style.display = 'block'; // Show template for rendering
    
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
        modal.style.display = 'block'; // Display the modal
        
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
        
        const imgProps = pdf.getImageProperties(imgData);
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
    const emailAddress = prompt('Enter email address to send CV:');
    
    if (!emailAddress) return;
    
    if (!validateEmail(emailAddress)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert(`This would send the CV to ${emailAddress}. Implementation requires backend support.`);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}