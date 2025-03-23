// Local storage keys
const USERS_KEY = 'promptTinder_users';
const CURRENT_USER_KEY = 'promptTinder_currentUser';
const PROFILES_KEY = 'promptTinder_profiles';
const SWIPES_KEY = 'promptTinder_swipes';
const MATCHES_KEY = 'promptTinder_matches';
const MESSAGES_KEY = 'promptTinder_messages';

// Sample profile images for demo
const sampleImages = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce'
];

// AI style examples for demo profiles
const aiStyles = [
    "I create hyper-detailed, cinematic prompts with specific camera lenses and lighting setups.",
    "My prompts are minimalist and abstract, focusing on emotions rather than visuals.",
    "I specialize in creating fantasy world-building prompts with elaborate backstories.",
    "I love crafting prompts that blend futuristic technology with natural elements.",
    "My style involves writing prompts that mimic famous artists and art movements.",
    "I focus on creating detailed character-driven prompts with specific personality traits.",
    "I design prompts that generate 3D rendered product concepts and prototypes.",
    "My approach is experimental, using unusual word combinations to get unique results."
];

// Initialize the app
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // Check if sample data exists, if not generate it
    if (!localStorage.getItem(PROFILES_KEY)) {
        generateSampleProfiles();
    }
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    if (currentUser) {
        showMainApp();
        loadUserProfile();
        loadProfilesToSwipe();
        loadMatches();
    } else {
        showAuthContainer();
    }
    
    // Add event listeners for auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            showTab(this.textContent.toLowerCase());
        });
    });
}

// Generate sample profiles for demo purposes
function generateSampleProfiles() {
    const profiles = [];
    
    for (let i = 0; i < 20; i++) {
        const gender = Math.random() > 0.5 ? 'male' : 'female';
        const age = Math.floor(Math.random() * 15) + 21; // 21-35
        const imgIndex = Math.floor(Math.random() * sampleImages.length);
        const aiStyleIndex = Math.floor(Math.random() * aiStyles.length);
        
        // Generate random interests from this pool
        const allInterests = ['AI Art', 'Prompt Engineering', 'Digital Art', 'Photography', 
                            'NFTs', 'Blockchain', 'Machine Learning', 'UI/UX Design', 
                            'Virtual Reality', 'Game Design', 'Writing', 'Music', 
                            'Animation', '3D Modeling', 'Robotics', 'Web3'];
        
        // Pick 3-5 random interests
        const numInterests = Math.floor(Math.random() * 3) + 3;
        const interests = [];
        for (let j = 0; j < numInterests; j++) {
            const randomInterest = allInterests[Math.floor(Math.random() * allInterests.length)];
            if (!interests.includes(randomInterest)) {
                interests.push(randomInterest);
            }
        }
        
        // Generate random Solana tokens
        const allTokens = ['SOL', 'BONK', 'SAMO', 'RAY', 'SRM', 'FIDA', 'ORCA', 'MNGO'];
        const numTokens = Math.floor(Math.random() * 3) + 1;
        const tokens = [];
        for (let j = 0; j < numTokens; j++) {
            const randomToken = allTokens[Math.floor(Math.random() * allTokens.length)];
            if (!tokens.includes(randomToken)) {
                tokens.push(randomToken);
            }
        }
        
        // Create profile with random first and last names
        const firstNames = gender === 'male' 
            ? ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles']
            : ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
        
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];
        
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        profiles.push({
            id: 'profile_' + i,
            name: `${firstName} ${lastName}`,
            username: (firstName + lastName + Math.floor(Math.random() * 100)).toLowerCase(),
            age: age,
            dob: new Date(new Date().getFullYear() - age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            interests: interests,
            solanaTokens: tokens,
            aiStyle: aiStyles[aiStyleIndex],
            image: `${sampleImages[imgIndex]}?sig=${i}`,
            gender: gender
        });
    }
    
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

// Auth functions
function showTab(tabName) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show the selected form
    document.getElementById(`${tabName}-form`).classList.add('active');
    
    // Set the active tab
    document.querySelectorAll('.auth-tab').forEach(tab => {
        if (tab.textContent.toLowerCase() === tabName) {
            tab.classList.add('active');
        }
    });
}

function loginUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Get users from local storage
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store current user
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        
        // Show main app
        showMainApp();
        loadUserProfile();
        loadProfilesToSwipe();
        loadMatches();
    } else {
        alert('Invalid username or password');
    }
}

function signupUser(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const username = document.getElementById('signup-username').value;
    const dob = document.getElementById('signup-dob').value;
    const interests = document.getElementById('signup-interests').value.split(',').map(i => i.trim());
    const solanaTokens = document.getElementById('signup-solana').value ? document.getElementById('signup-solana').value.split(',').map(t => t.trim()) : [];
    const aiStyle = document.getElementById('signup-ai-style').value;
    const password = document.getElementById('signup-password').value;
    
    // Calculate age
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Get profile picture if provided, otherwise use a default
    const profilePicInput = document.getElementById('profile-pic');
    let profilePic = 'default-profile.jpg';
    
    if (profilePicInput.files.length > 0) {
        const file = profilePicInput.files[0];
        profilePic = URL.createObjectURL(file);
    }
    
    // Create user object
    const user = {
        id: 'user_' + Date.now(),
        name,
        username,
        dob,
        age,
        interests,
        solanaTokens,
        aiStyle,
        password,
        image: profilePic
    };
    
    // Get existing users or create empty array
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
        alert('Username already exists');
        return;
    }
    
    // Add new user
    users.push(user);
    
    // Save users to local storage
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Set current user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    // Show main app
    showMainApp();
    loadUserProfile();
    loadProfilesToSwipe();
}

function logout() {
    // Clear current user
    localStorage.removeItem(CURRENT_USER_KEY);
    
    // Show auth container
    showAuthContainer();
}

// UI functions
function showAuthContainer() {
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
}

function showMainApp() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.app-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show the selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Set the active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('onclick').includes(sectionName)) {
            btn.classList.add('active');
        }
    });
    
    // Special handling for the matches section
    if (sectionName === 'matches') {
        document.getElementById('match-list').classList.remove('hidden');
        document.getElementById('chat-container').classList.add('hidden');
    }
}

// Profile functions
function loadUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    
    if (currentUser) {
        document.getElementById('profile-name').textContent = currentUser.name;
        document.getElementById('profile-username').textContent = '@' + currentUser.username;
        document.getElementById('profile-age').textContent = currentUser.age + ' years old';
        
        // Set profile picture
        document.getElementById('user-profile-pic').src = currentUser.image;
        
        // Display interests
        const interestsContainer = document.getElementById('profile-interests');
        interestsContainer.innerHTML = '';
        currentUser.interests.forEach(interest => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = interest;
            interestsContainer.appendChild(tag);
        });
        
        // Display Solana tokens
        const solanaContainer = document.getElementById('profile-solana');
        solanaContainer.innerHTML = '';
        if (currentUser.solanaTokens && currentUser.solanaTokens.length > 0) {
            currentUser.solanaTokens.forEach(token => {
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = token;
                solanaContainer.appendChild(tag);
            });
        } else {
            solanaContainer.textContent = 'No tokens added';
        }
        
        // Display AI style
        document.getElementById('profile-ai-style').textContent = currentUser.aiStyle;
        
        // Populate edit form
        document.getElementById('edit-name').value = currentUser.name;
        document.getElementById('edit-interests').value = currentUser.interests.join(', ');
        document.getElementById('edit-solana').value = currentUser.solanaTokens ? currentUser.solanaTokens.join(', ') : '';
        document.getElementById('edit-ai-style').value = currentUser.aiStyle;
    }
}

function toggleEditProfile() {
    const profileView = document.getElementById('profile-view');
    const profileEdit = document.getElementById('profile-edit');
    
    if (profileView.classList.contains('hidden')) {
        profileView.classList.remove('hidden');
        profileEdit.classList.add('hidden');
    } else {
        profileView.classList.add('hidden');
        profileEdit.classList.remove('hidden');
    }
}

function updateProfile(event) {
    event.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    
    // Update user data
    currentUser.name = document.getElementById('edit-name').value;
    currentUser.interests = document.getElementById('edit-interests').value.split(',').map(i => i.trim());
    currentUser.solanaTokens = document.getElementById('edit-solana').value ? document.getElementById('edit-solana').value.split(',').map(t => t.trim()) : [];
    currentUser.aiStyle = document.getElementById('edit-ai-style').value;
    
    // Update profile picture if provided
    const profilePicInput = document.getElementById('edit-profile-pic');
    if (profilePicInput.files.length > 0) {
        const file = profilePicInput.files[0];
        currentUser.image = URL.createObjectURL(file);
    }
    
    // Update user in local storage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    
    // Update users array
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    
    // Reload profile and toggle view
    loadUserProfile();
    toggleEditProfile();
}

// Swipe functionality
let currentProfiles = [];
let currentProfileIndex = 0;

function loadProfilesToSwipe() {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    const allProfiles = JSON.parse(localStorage.getItem(PROFILES_KEY)) || [];
    const swipes = JSON.parse(localStorage.getItem(SWIPES_KEY)) || {};
    
    // Get user's swipes or initialize empty object
    const userSwipes = swipes[currentUser.id] || {};
    
    // Filter out profiles that the user has already swiped on
    const unseenProfiles = allProfiles.filter(profile => 
        !userSwipes[profile.id] && profile.id !== currentUser.id
    );
    
    // Shuffle the profiles for a random order
    currentProfiles = shuffleArray(unseenProfiles);
    currentProfileIndex = 0;
    
    // Display the first profile
    displayCurrentProfile();
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function displayCurrentProfile() {
    const cardStack = document.getElementById('card-stack');
    cardStack.innerHTML = '';
    
    if (currentProfileIndex >= currentProfiles.length) {
        // No more profiles to show
        cardStack.innerHTML = `
            <div class="profile-card no-more-profiles">
                <div class="profile-card-info" style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                    <h3>No more profiles</h3>
                    <p>Check back later for new matches!</p>
                </div>
            </div>
        `;
        return;
    }
    
    const profile = currentProfiles[currentProfileIndex];
    
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.id = `profile-card-${profile.id}`;
    
    card.innerHTML = `
        <img src="${profile.image}" alt="${profile.name}" class="profile-card-img">
        <div class="profile-card-info">
            <h2 class="profile-card-name">${profile.name}, <span class="profile-card-age">${profile.age}</span></h2>
            <p class="profile-card-bio">${profile.aiStyle}</p>
            <div class="tags-container">
                ${profile.interests.map(interest => `<span class="tag">${interest}</span>`).join('')}
            </div>
            ${profile.solanaTokens && profile.solanaTokens.length > 0 ? 
                `<div class="tags-container" style="margin-top: 8px;">
                    ${profile.solanaTokens.map(token => `<span class="tag">${token}</span>`).join('')}
                </div>` : ''}
        </div>
        <div class="like-indicator hidden">LIKE</div>
        <div class="dislike-indicator hidden">NOPE</div>
    `;
    
    // Add touch/drag event listeners for mobile swiping
    let startX = 0;
    let currentX = 0;
    
    card.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    card.addEventListener('touchmove', function(e) {
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        
        // Move the card
        card.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.1}deg)`;
        
        // Show like/dislike indicators
        if (deltaX > 50) {
            card.querySelector('.like-indicator').classList.remove('hidden');
            card.querySelector('.dislike-indicator').classList.add('hidden');
        } else if (deltaX < -50) {
            card.querySelector('.dislike-indicator').classList.remove('hidden');
            card.querySelector('.like-indicator').classList.add('hidden');
        } else {
            card.querySelector('.like-indicator').classList.add('hidden');
            card.querySelector('.dislike-indicator').classList.add('hidden');
        }
    });
    
    card.addEventListener('touchend', function() {
        const deltaX = currentX - startX;
        
        if (deltaX > 100) {
            swipeRight();
        } else if (deltaX < -100) {
            swipeLeft();
        } else {
            // Reset card position
            card.style.transform = '';
            card.querySelector('.like-indicator').classList.add('hidden');
            card.querySelector('.dislike-indicator').classList.add('hidden');
        }
    });
    
    cardStack.appendChild(card);
}

function swipeLeft() {
    if (currentProfileIndex >= currentProfiles.length) return;
    
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    const profile = currentProfiles[currentProfileIndex];
    
    // Get user's swipes or initialize empty object
    const swipes = JSON.parse(localStorage.getItem(SWIPES_KEY)) || {};
    const userSwipes = swipes[currentUser.id] || {};
    
    // Record the swipe
    userSwipes[profile.id] = 'left';
    swipes[currentUser.id] = userSwipes;
    
    localStorage.setItem(SWIPES_KEY, JSON.stringify(swipes));
    
    // Animate the card swiping left
    const card = document.getElementById(`profile-card-${profile.id}`);
    card.classList.add('swiped-left');
    
    // Show next profile after animation
    setTimeout(() => {
        currentProfileIndex++;
        displayCurrentProfile();
    }, 300);
}

function swipeRight() {
    if (currentProfileIndex >= currentProfiles.length) return;
    
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    const profile = currentProfiles[currentProfileIndex];
    
    // Get user's swipes or initialize empty object
    const swipes = JSON.parse(localStorage.getItem(SWIPES_KEY)) || {};
    const userSwipes = swipes[currentUser.id] || {};
    
    // Record the swipe
    userSwipes[profile.id] = 'right';
    swipes[currentUser.id] = userSwipes;
    
    localStorage.setItem(SWIPES_KEY, JSON.stringify(swipes));
    
    // Check if it's a match
    const otherUserSwipes = swipes[profile.id] || {};
    if (otherUserSwipes[currentUser.id] === 'right') {
        // It's a match!
        createMatch(currentUser.id, profile.id);
        showMatchOverlay(currentUser, profile);
    }
    
    // Animate the card swiping right
    const card = document.getElementById(`profile-card-${profile.id}`);
    card.classList.add('swiped-right');
    
    // Show next profile after animation
    setTimeout(() => {
        currentProfileIndex++;
        displayCurrentProfile();
    }, 300);
}

function createMatch(userId1, userId2) {
    // Get existing matches or initialize empty array
    const matches = JSON.parse(localStorage.getItem(MATCHES_KEY)) || [];
    
    // Create a unique match ID
    const matchId = [userId1, userId2].sort().join('_');
    
    // Check if match already exists
    if (!matches.some(match => match.id === matchId)) {
        matches.push({
            id: matchId,
            users: [userId1, userId2],
            timestamp: new Date().toISOString(),
            lastMessage: null
        });
        
        localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
    }
}

function showMatchOverlay(user1, user2) {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'match-overlay';
    
    overlay.innerHTML = `
        <h2>It's a Match!</h2>
        <div class="match-profiles">
            <div class="match-profile">
                <img src="${user1.image}" alt="${user1.name}">
                <h3>${user1.name}</h3>
            </div>
            <div class="match-profile">
                <img src="${user2.image}" alt="${user2.name}">
                <h3>${user2.name}</h3>
            </div>
        </div>
        <div class="match-actions">
            <button class="match-btn send-message-btn" onclick="openChat('${user2.id}'); closeMatchOverlay();">Send Message</button>
            <button class="match-btn keep-swiping-btn" onclick="closeMatchOverlay();">Keep Swiping</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function closeMatchOverlay() {
    const overlay = document.querySelector('.match-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Matches and messaging functionality
function loadMatches() {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    const matches = JSON.parse(localStorage.getItem(MATCHES_KEY)) || [];
    const matchListContainer = document.getElementById('match-list');
    
    // Clear container
    matchListContainer.innerHTML = '';
    
    // Filter matches for current user
    const userMatches = matches.filter(match => match.users.includes(currentUser.id));
    
    if (userMatches.length === 0) {
        matchListContainer.innerHTML = '<p style="text-align: center; padding: 20px;">No matches yet. Start swiping!</p>';
        return;
    }
    
    // Get all users and profiles
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY)) || [];
    const allProfiles = [...users, ...profiles];
    
    // Sort matches by last message time (most recent first)
    userMatches.sort((a, b) => {
        const timeA = a.lastMessage ? new Date(a.lastMessage.timestamp) : new Date(a.timestamp);
        const timeB = b.lastMessage ? new Date(b.lastMessage.timestamp) : new Date(b.timestamp);
        return timeB - timeA;
    });
    
    // Create match items
    userMatches.forEach(match => {
        // Get the other user's ID
        const otherUserId = match.users.find(id => id !== currentUser.id);
        
        // Find the other user
        const otherUser = allProfiles.find(profile => profile.id === otherUserId);
        
        if (!otherUser) return;
        
        // Get last message if exists
        const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || {};
        const matchMessages = messages[match.id] || [];
        const lastMessage = matchMessages.length > 0 ? matchMessages[matchMessages.length - 1] : null;
        
        const matchItem = document.createElement('div');
        matchItem.className = 'match-item';
        matchItem.onclick = () => openChat(otherUserId);
        
        matchItem.innerHTML = `
            <img src="${otherUser.image}" alt="${otherUser.name}" class="match-img">
            <div class="match-info">
                <div class="match-name">${otherUser.name}</div>
                <div class="match-last-msg">${lastMessage ? lastMessage.text : 'New match! Say hello.'}</div>
            </div>
        `;
        
        matchListContainer.appendChild(matchItem);
    });
}

function openChat(otherUserId) {
    // Show matches section
    showSection('matches');
    
    // Hide match list and show chat
    document.getElementById('match-list').classList.add('hidden');
    document.getElementById('chat-container').classList.remove('hidden');
    
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    
    // Get all users and profiles
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY)) || [];
    const allProfiles = [...users, ...profiles];
    
    // Find the other user
    const otherUser = allProfiles.find(profile => profile.id === otherUserId);
    
    if (!otherUser) return;
    
    // Set chat user info
    document.getElementById('chat-user-img').src = otherUser.image;
    document.getElementById('chat-user-name').textContent = otherUser.name;
    
    // Get match ID
    const matchId = [currentUser.id, otherUserId].sort().join('_');
    
    // Load messages
    loadMessages(matchId);
    
    // Store current chat partner ID
    document.getElementById('chat-container').dataset.partnerId = otherUserId;
}

function backToMatches() {
    document.getElementById('match-list').classList.remove('hidden');
    document.getElementById('chat-container').classList.add('hidden');
}

function loadMessages(matchId) {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';
    
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    
    // Get messages for this match
    const allMessages = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || {};
    const matchMessages = allMessages[matchId] || [];
    
    // Display messages
    matchMessages.forEach(message => {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.senderId === currentUser.id ? 'sent' : 'received'}`;
        
        // Format timestamp
        const timestamp = new Date(message.timestamp);
        const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageEl.innerHTML = `
            <div>${message.text}</div>
            <div class="message-time">${formattedTime}</div>
        `;
        
        messagesContainer.appendChild(messageEl);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const text = messageInput.value.trim();
    
    if (!text) return;
    
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    const otherUserId = document.getElementById('chat-container').dataset.partnerId;
    
    // Create message object
    const message = {
        senderId: currentUser.id,
        receiverId: otherUserId,
        text: text,
        timestamp: new Date().toISOString()
    };
    
    // Get match ID
    const matchId = [currentUser.id, otherUserId].sort().join('_');
    
    // Save message
    const allMessages = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || {};
    const matchMessages = allMessages[matchId] || [];
    
    matchMessages.push(message);
    allMessages[matchId] = matchMessages;
    
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));
    
    // Update last message in match
    const matches = JSON.parse(localStorage.getItem(MATCHES_KEY)) || [];
    const matchIndex = matches.findIndex(m => m.id === matchId);
    
    if (matchIndex !== -1) {
        matches[matchIndex].lastMessage = message;
        localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
    }
    
    // Clear input
    messageInput.value = '';
    
    // Reload messages
    loadMessages(matchId);
} 