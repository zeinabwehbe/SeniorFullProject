const API_URL = 'http://localhost:3000';
//const API_URL ="https://seniorfullproject-production.up.railway.app";

const USER_SKILLS_URL = `${API_URL}/user-skills`;
const CATEGORIES_URL = `${API_URL}/categories`;

document.addEventListener("DOMContentLoaded", async () => {
    const skillListings = document.getElementById("skill-listings");
    const skillCardTemplate = document.getElementById("skill-card-template");
    const modal = createUserModal();
    const categoryFilter = document.getElementById("category-filter");

    const searchInput = document.getElementById('search-input');
    const proficiencyFilter = document.getElementById('proficiency-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');

    const addSkillSection = document.getElementById("add-skill-section");
    const addSkillBtn = document.getElementById("add-skill-btn");

    try {
        // Fetch categories first
        const categoriesResponse = await fetch(CATEGORIES_URL);
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categories = await categoriesResponse.json();
        
        // Populate category dropdown
        populateCategoryFilter(categories);

        const response = await fetch(USER_SKILLS_URL);
        if (!response.ok) throw new Error('Failed to fetch user skills');
        const userSkills = await response.json();

        // Initialize with all skills
        filterSkills(userSkills);

        searchInput.addEventListener('input', () => filterSkills(userSkills));
        categoryFilter.addEventListener('change', () => filterSkills(userSkills));
        proficiencyFilter.addEventListener('change', () => filterSkills(userSkills));
        resetFiltersBtn.addEventListener('click', () => {
            searchInput.value = '';
            categoryFilter.value = '';
            proficiencyFilter.value = '';
            filterSkills(userSkills);
        });
    } catch (error) {
        skillListings.innerHTML = `<div class="col-span-full text-center py-12 text-red-600">Error loading skills: ${error.message}</div>`;
        console.error("Detailed error:", error);
    }

    function populateCategoryFilter(categories) {
        // Clear existing options except the first one
        while (categoryFilter.options.length > 1) {
            categoryFilter.remove(1);
        }
        
        // Add new options from the database
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
    }

    function createUserModal() {
        // Check if modal already exists to avoid duplicates
        let modal = document.getElementById("user-modal");
        if (modal) return modal;

        modal = document.createElement("div");
        modal.id = "user-modal";
        modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50";
        modal.innerHTML = `
            <div class="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
                <button id="modal-close" class="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-2xl">&times;</button>
                <div id="modal-content">
                    <p class="text-center text-gray-400">Loading...</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById("modal-close").addEventListener("click", () => {
            modal.classList.add("hidden");
        });
        return modal;
    }

    async function openUserModal(userId) {
        if (!userId) {
            console.error("No user ID provided");
            return;
        }
    
        const modal = document.getElementById("user-modal");
        const content = modal.querySelector("#modal-content");
        modal.classList.remove("hidden");
        content.innerHTML = `<p class="text-center text-gray-400">Loading...</p>`;
    
        try {
            console.log(`Fetching data for user ${userId}`);
            
            const userUrl = `${API_URL}/users/public/${userId}`;
            const skillsUrl = `${API_URL}/user-skills/user/${userId}`;
            
            const [userResponse, skillsResponse] = await Promise.all([
                fetch(userUrl),
                fetch(skillsUrl)
            ]);
    
            if (!userResponse.ok || !skillsResponse.ok) {
                throw new Error('Failed to fetch user data');
            }
    
            const user = await userResponse.json();
            const userSkills = await skillsResponse.json();
    
            // Separate teaching and learning skills
            const teachingSkills = userSkills.filter(skill => skill.skill_type === 'teach');
            const learningSkills = userSkills.filter(skill => skill.skill_type === 'learn');
    
            // Create HTML for skills lists with descriptions
            const teachingSkillsHTML = teachingSkills.map(skill => 
                `<div class="mb-3 p-3 bg-gray-50 rounded-lg">
                    <h4 class="font-semibold text-gray-800">${skill.skill?.skill_name || 'Unnamed Skill'}</h4>
                    <p class="text-sm text-gray-600">${skill.skill_level ? `Proficiency: ${skill.skill_level}` : ''}</p>
                    ${skill.skill?.description ? `<p class="mt-1 text-gray-700">${skill.skill.description}</p>` : ''}
                    ${skill.skill?.category?.name ? `<p class="text-xs text-gray-500 mt-1">Category: ${skill.skill.category.name}</p>` : ''}
                </div>`
            ).join('');
    
            const learningSkillsHTML = learningSkills.map(skill => 
                `<div class="mb-3 p-3 bg-gray-50 rounded-lg">
                    <h4 class="font-semibold text-gray-800">${skill.skill?.skill_name || 'Unnamed Skill'}</h4>
                    <p class="text-sm text-gray-600">${skill.skill_level ? `Current Level: ${skill.skill_level}` : ''}</p>
                    ${skill.skill?.description ? `<p class="mt-1 text-gray-700">${skill.skill.description}</p>` : ''}
                    ${skill.skill?.category?.name ? `<p class="text-xs text-gray-500 mt-1">Category: ${skill.skill.category.name}</p>` : ''}
                </div>`
            ).join('');
    
            // Create optional fields HTML
            const optionalFieldsHTML = `
                ${user.phone ? `<p class="text-gray-600 mb-2"><strong>Phone:</strong> ${user.phone}</p>` : ''}
                ${user.linkedinUrl ? `<p class="text-gray-600 mb-2"><strong>LinkedIn:</strong> <a href="${user.linkedinUrl}" target="_blank" class="text-blue-500 hover:underline">${user.linkedinUrl}</a></p>` : ''}
                ${user.githubUrl ? `<p class="text-gray-600 mb-2"><strong>GitHub:</strong> <a href="${user.githubUrl}" target="_blank" class="text-blue-500 hover:underline">${user.githubUrl}</a></p>` : ''}
                ${user.portfolioUrl ? `<p class="text-gray-600 mb-2"><strong>Portfolio:</strong> <a href="${user.portfolioUrl}" target="_blank" class="text-blue-500 hover:underline">${user.portfolioUrl}</a></p>` : ''}
            `;
    
            // Populate modal content
            content.innerHTML = `
                <div class="text-center">
                    <div class="flex justify-center mb-4">
                        <img src="${user.profilePic ? `${API_URL}/users/${userId}/profile-picture` : 'assets/images/default-user.jpg'}" 
                             alt="Profile" 
                             class="w-24 h-24 rounded-full object-cover"
                             onerror="this.src='assets/images/default-user.jpg'">
                    </div>
                    <h2 class="text-2xl font-bold mb-4" style="color: #DEAD9C">${user.name || 'No name'}</h2>
                    <div class="text-left">
                        <p class="text-gray-600 mb-2"><strong>Bio:</strong> ${user.bio || 'No bio'}</p>
                        <p class="text-gray-600 mb-2"><strong>Email:</strong> ${user.email || 'No email'}</p>
                        ${optionalFieldsHTML}
                        
                        <div class="mt-6">
                            <h3 class="font-semibold text-gray-800 mb-3 text-lg">Skills to Teach:</h3>
                            ${teachingSkills.length > 0 ? 
                                `<div class="space-y-3">${teachingSkillsHTML}</div>` : 
                                `<p class="text-gray-500">None specified</p>`}
                        </div>
                        
                    </div>
                </div>
            `;
        } catch (error) {
            console.error("Error loading user data:", error);
            content.innerHTML = `
                <div class="text-center">
                    <p class="text-red-500">Failed to load user data</p>
                    <p class="text-gray-500 text-sm mt-2">Error: ${error.message}</p>
                    <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gray-200 rounded">
                        Try Again
                    </button>
                </div>
            `;
        }
    }

    function displayUserSkills(userSkills) {
        skillListings.innerHTML = '';
        const teachingSkills = userSkills.filter(skill => skill.skill_type === 'teach');
        if (teachingSkills.length === 0) {
            document.getElementById('no-results').classList.remove('hidden');
            return;
        }
        document.getElementById('no-results').classList.add('hidden');

        teachingSkills.forEach(skill => {
            const card = skillCardTemplate.content.cloneNode(true);
            card.querySelector('.user-name').textContent = skill.user?.name || 'Anonymous User';
            card.querySelector('.user-bio').textContent = skill.user?.bio || 'SkillSwap User';
            card.querySelector('.skill-teach').textContent = skill.skill?.skill_name || 'Unnamed Skill';
            card.querySelector('.skill-category').textContent = skill.skill?.category?.name || 'Uncategorized';
            card.querySelector('.skill-proficiency').textContent = skill.skill_level || 'Not specified';
            card.querySelector('.skill-availability').textContent = skill.availability || 'Available';

            const userPhotoContainer = card.querySelector('#user-photo-container');
            const imgSrc = skill.user?.id ? `${API_URL}/users/${skill.user.id}/profile-picture` : 'assets/images/default-user.jpg';
            userPhotoContainer.innerHTML = `<img class="user-photo w-10 h-10 rounded-full object-cover" alt="User" src="${imgSrc}" onerror="this.src='assets/images/default-user.jpg';">`;

            // Add click listener to open modal
            const cardElement = card.querySelector('.skill-card');
            if (cardElement) {
                cardElement.addEventListener('click', (e) => {
                    if (!e.target.closest('.connect-button') && skill.user?.id) {
                        openUserModal(skill.user.id);
                    }
                });
            }
            
            // Add specific click listener to the Connect button
            const connectButton = card.querySelector('.connect-button');
            if (connectButton && skill.user?.id) {
                connectButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                       openUserModal(skill.user.id);
                });
            }
            
            skillListings.appendChild(card);
        });
        
    }

    function filterSkills(userSkills) {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const proficiency = proficiencyFilter.value;
    
        const filteredSkills = userSkills
            .filter(skill => skill.skill_type === 'teach')
            .filter(skill => {
                const matchesSearch = skill.skill?.skill_name?.toLowerCase().includes(searchTerm) || 
                                   skill.user?.name?.toLowerCase().includes(searchTerm);
                const matchesCategory = !category || skill.skill?.category?.name === category;
                const matchesProficiency = !proficiency || skill.skill_level === proficiency;
                return matchesSearch && matchesCategory && matchesProficiency;
            });
    
             // Update the results count
    document.getElementById('results-total').textContent = filteredSkills.length;
    
        displayUserSkills(filteredSkills);
    }

    function getToken() {
        try {
            return JSON.parse(localStorage.getItem('token'));;
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            return null;
        }
    }

    function getUserIdFromToken(token) {
        try {
            if (!token) return null;
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.sub || payload.userId;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }
    
    // Check authentication status
    async function checkAuth() {
        const token = getToken();
        if (token) {
            addSkillSection.classList.remove("hidden");
            
            // Add click handler for the button
            addSkillBtn.addEventListener("click", (e) => {
                e.preventDefault();
                openAddSkillModal();
            });
        }
    }

    // Call checkAuth after your initial data loading
    try {
        await checkAuth();
    } catch (error) {
        console.error("Error checking auth:", error);
    }

    async function openAddSkillModal() {
        try {
            // Fetch categories for dropdown
            const categoriesResponse = await fetch(CATEGORIES_URL);
            if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
            const categories = await categoriesResponse.json();

            const modal = createUserModal();
            const content = modal.querySelector("#modal-content");
            modal.classList.remove("hidden");
            
            // Create category options
            const categoryOptions = categories.map(category => 
                `<option value="${category.id}">${category.name}</option>`
            ).join('');

            content.innerHTML = `
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-4">Add New Skill</h2>
                    <form id="add-skill-form" class="text-left space-y-4">
                        <!-- Skill Type -->
                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">Skill Type</label>
                            <select name="skill_type" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required>
                                <option value="">Select type</option>
                                <option value="teach">I can teach this</option>
                                <option value="learn">I want to learn this</option>
                            </select>
                        </div>
                        
                        <!-- Skill Name -->
                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">Skill Name</label>
                            <input type="text" name="skill_name" 
                                   class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" 
                                   placeholder="e.g. JavaScript, Graphic Design" required>
                        </div>
                        
                        <!-- Category -->
                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">Category</label>
                            <select name="category_id" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required>
                                <option value="">Select a category</option>
                                ${categoryOptions}
                            </select>
                        </div>
                        
                        <!-- Proficiency Level -->
                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">Your Level</label>
                            <select name="skill_level" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                                <option value="">Select your level (optional)</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        
                        <!-- Description -->
                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">Description</label>
                            <textarea name="description" 
                                      class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" 
                                      rows="3"
                                      placeholder="Briefly describe your skill or what you want to learn"></textarea>
                        </div>
                        
                        <!-- Submit Button -->
                        <button type="submit" 
                                class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors mt-6">
                            Add Skill
                        </button>
                    </form>
                </div>
            `;
            
            // Form submission handler
            document.getElementById("add-skill-form").addEventListener("submit", async (e) => {
                e.preventDefault();
                const form = e.target;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                try {
                    const token = getToken();
                    //if (!token) throw new Error('Authentication required');
                    if (!token) {
                        alert('Please log in to add skills');
                        return;
                    }
                    // Get user ID from token
                    const userId = getUserIdFromToken(token);
                    if (!userId) throw new Error('Could not determine user ID');
            
                    // Show loading state
                    const submitBtn = form.querySelector('button[type="submit"]');
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = 'Adding...';
                  
                    // Step 1: First create the skill in Skills table
                    const skillResponse = await fetch(`${API_URL}/skills`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                             Authorization: `Bearer ${token}`,  // Note the space before Authorization
                         },
                        body: JSON.stringify({
                            skill_name: data.skill_name,
                            categoryId: data.category_id,
                            description: data.description || null,
                            approval_status: 'pending'
                        })
                    });

                    if (!skillResponse.ok) {
                        const errorData = await skillResponse.json();
                        console.error('Server response:', errorData);
                        throw new Error(errorData.message || 'Failed to create skill');
                    }

                    const newSkill = await skillResponse.json();
                                        
                 // In your openAddSkillModal form submission handler:
                    const userSkillResponse = await fetch(`${API_URL}/user-skills`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                             Authorization: `Bearer ${token}`,  // Note the space before Authorization
                         },
                        body: JSON.stringify({
                            user_id: userId,
                            skill_id: newSkill.id,
                            skill_type: data.skill_type,
                            skill_level: data.skill_level || null
                        })
                    });

                    if (!userSkillResponse.ok) {
                        const errorData = await userSkillResponse.json();
                        throw new Error(errorData.message || 'Failed to add user skill');
                    }

                    // Refresh skills listadmin-dashboard.html
                    const skillsResponse = await fetch(USER_SKILLS_URL, {
                        headers: {
                         
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const userSkills = await skillsResponse.json();
                     displayUserSkills(userSkills);
                    
                    // Close modal and show success
                    modal.classList.add("hidden");
                    alert('Skill added successfully!');
                    
                } catch (error) {
                    console.error("Error adding skill:", error);
                    alert(`Error1: ${error.message}`);
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Add Skill';
                }
            });
            
        } catch (error) {
            console.error("Error opening add skill modal:", error);
            alert(`Error2: ${error.message}`);
        }
    }
});