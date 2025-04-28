const API_URL = 'http://localhost:3000';
const USER_SKILLS_URL = `${API_URL}/user-skills`;

document.addEventListener('DOMContentLoaded', async () => {
    const skillListings = document.getElementById('skill-listings');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const proficiencyFilter = document.getElementById('proficiency-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const noResults = document.getElementById('no-results');

    try {
        // Fetch user skills from the backend
        const response = await fetch(USER_SKILLS_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user skills');
        }

        const userSkills = await response.json();
        console.log('Raw User Skills Data:', JSON.stringify(userSkills, null, 2));

        // Display user skills
        displayUserSkills(userSkills);

        // Add event listeners for filters
        searchInput.addEventListener('input', () => filterSkills(userSkills));
        categoryFilter.addEventListener('change', () => filterSkills(userSkills));
        proficiencyFilter.addEventListener('change', () => filterSkills(userSkills));
        availabilityFilter.addEventListener('change', () => filterSkills(userSkills));
        resetFiltersBtn.addEventListener('click', () => {
            searchInput.value = '';
            categoryFilter.value = '';
            proficiencyFilter.value = '';
            availabilityFilter.value = '';
            filterSkills(userSkills);
        });

    } catch (error) {
        console.error('Error fetching user skills:', error);
        skillListings.innerHTML = `
            <div class="col-span-full text-center py-12">
                <h3 class="text-lg font-medium text-red-600">Error loading skills</h3>
                <p class="text-gray-500 mt-2">Please try again later</p>
            </div>
        `;
    }
});

function displayUserSkills(userSkills) {
    const skillListings = document.getElementById('skill-listings');
    const template = document.getElementById('skill-card-template');
    
    // Clear existing listings
    skillListings.innerHTML = '';

    // Filter only teaching skills
    const teachingSkills = userSkills.filter(skill => skill.skill_type === 'teach');
    console.log('Teaching Skills:', JSON.stringify(teachingSkills, null, 2));

    if (teachingSkills.length === 0) {
        document.getElementById('no-results').classList.remove('hidden');
        return;
    }

    document.getElementById('no-results').classList.add('hidden');

    teachingSkills.forEach(skill => {
        console.log('Processing skill:', JSON.stringify(skill, null, 2));
        
        const card = template.content.cloneNode(true);
        
        // Fill in the card with user skill data
        const userName = skill.user?.name;
        const userBio = skill.user?.bio;
        const skillName = skill.skill?.skill_name;
        const categoryName = skill.skill?.category?.name;
        
        console.log('Extracted data:', {
            userName,
            userBio,
            skillName,
            categoryName,
            skillType: skill.skill_type,
            skillLevel: skill.skill_level
        });

        card.querySelector('.user-name').textContent = userName || 'Anonymous User';
        card.querySelector('.user-bio').textContent = userBio || 'SkillSwap User';
        card.querySelector('.skill-teach').textContent = skillName || 'Unnamed Skill';
        
        // Remove or hide the "Wants to Learn" section since this is teaching-only
        const learnSection = card.querySelector('.skill-learn').closest('div');
        if (learnSection) {
            learnSection.style.display = 'none';
        }

        // Set category, proficiency and availability tags
        card.querySelector('.skill-category').textContent = categoryName || 'Uncategorized';
        card.querySelector('.skill-proficiency').textContent = skill.skill_level || 'Not specified';
        card.querySelector('.skill-availability').textContent = 'Available';

        // Add user photo if available
        const userPhotoContainer = card.querySelector('#user-photo-container');
        const imgSrc = skill.user?.profile_pic ? skill.user.profile_pic : 'assets/images/default-user.jpg';
        userPhotoContainer.innerHTML = `<img class="user-photo w-10 h-10 rounded-full object-cover" alt="User" src="${imgSrc}" onerror="this.src='assets/images/default-user.jpg';">`;

        // Add click handler for connect button
        const connectButton = card.querySelector('.connect-button');
        connectButton.addEventListener('click', () => {
            console.log('Connecting with user:', skill.user_id);
            alert('Connection feature coming soon!');
        });

        skillListings.appendChild(card);
    });

    // Update the results count with teaching skills only
    updateResultsStats(teachingSkills.length);
}

function filterSkills(userSkills) {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const proficiency = document.getElementById('proficiency-filter').value;
    const availability = document.getElementById('availability-filter').value;

    // First filter for teaching skills only, then apply other filters
    const filteredSkills = userSkills
        .filter(skill => skill.skill_type === 'teach')
        .filter(skill => {
            const matchesSearch = 
                skill.skill?.skill_name?.toLowerCase().includes(searchTerm) ||
                skill.user?.name?.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !category || skill.skill?.category?.name === category;
            const matchesProficiency = !proficiency || skill.skill_level === proficiency;
            const matchesAvailability = !availability || true;

            return matchesSearch && matchesCategory && matchesProficiency && matchesAvailability;
        });

    displayUserSkills(filteredSkills);
    updateResultsStats(filteredSkills.length);
}

function updateResultsStats(total) {
    const resultsFrom = document.getElementById('results-from');
    const resultsTo = document.getElementById('results-to');
    const resultsTotal = document.getElementById('results-total');

    resultsFrom.textContent = '1';
    resultsTo.textContent = total;
    resultsTotal.textContent = total;
} 