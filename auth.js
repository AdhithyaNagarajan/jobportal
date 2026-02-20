// ========================================
// JobHunt Pro - Authentication
// ========================================

const Auth = {
    currentUser: null,
    
    init() {
        this.currentUser = Utils.storage.get('currentUser');
        this.updateUI();
    },
    
    register(name, email, password, role) {
        const users = Utils.storage.get('users', []);
        
        // Check if email exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        
        // Create new user
        const newUser = {
            id: Utils.generateId(),
            name,
            email,
            password,
            role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0ea5e9&color=fff`,
            bio: '',
            skills: [],
            resume: null,
            savedJobs: [],
            appliedJobs: [],
            postedJobs: [],
            profileComplete: false,
            createdAt: Date.now()
        };
        
        users.push(newUser);
        Utils.storage.set('users', users);
        
        // Auto login
        this.login(email, password);
        
        return { success: true, message: 'Account created successfully!' };
    },
    
    login(email, password) {
        const users = Utils.storage.get('users', []);
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }
        
        // Remove password from session
        const sessionUser = { ...user };
        delete sessionUser.password;
        
        this.currentUser = sessionUser;
        Utils.storage.set('currentUser', sessionUser);
        
        return { success: true, message: 'Login successful!' };
    },
    
    logout() {
        this.currentUser = null;
        Utils.storage.remove('currentUser');
        this.updateUI();
        
        // Close any open modals
        UI.closeAllModals();
        
        // Show toast
        UI.showToast('success', 'Logged Out', 'You have been logged out successfully');
    },
    
    updateProfile(updates) {
        if (!this.currentUser) return { success: false, message: 'Not logged in' };
        
        const users = Utils.storage.get('users', []);
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) return { success: false, message: 'User not found' };
        
        // Update user
        users[userIndex] = { ...users[userIndex], ...updates };
        Utils.storage.set('users', users);
        
        // Update current session
        this.currentUser = { ...this.currentUser, ...updates };
        Utils.storage.set('currentUser', this.currentUser);
        
        return { success: true, message: 'Profile updated successfully!' };
    },
    
    isLoggedIn() {
        return this.currentUser !== null;
    },
    
    isEmployer() {
        return this.currentUser && this.currentUser.role === 'employer';
    },
    isJobSeeker() {
        return this.currentUser && this.currentUser.role === 'jobseeker';
    },
    
    saveJob(jobId) {
        if (!this.currentUser) return { success: false, message: 'Please login to save jobs' };
        
        const users = Utils.storage.get('users', []);
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) return { success: false, message: 'User not found' };
        
        if (!users[userIndex].savedJobs) {
            users[userIndex].savedJobs = [];
        }
        
        if (users[userIndex].savedJobs.includes(jobId)) {
            users[userIndex].savedJobs = users[userIndex].savedJobs.filter(id => id !== jobId);
            Utils.storage.set('users', users);
            this.currentUser.savedJobs = users[userIndex].savedJobs;
            Utils.storage.set('currentUser', this.currentUser);
            return { success: true, saved: false, message: 'Job removed from saved' };
        }
        
        users[userIndex].savedJobs.push(jobId);
        Utils.storage.set('users', users);
        
        this.currentUser.savedJobs = users[userIndex].savedJobs;
        Utils.storage.set('currentUser', this.currentUser);
        
        return { success: true, saved: true, message: 'Job saved successfully!' };
    },
    
    applyForJob(jobId, applicationData) {
        if (!this.currentUser) return { success: false, message: 'Please login to apply for jobs' };
        
        const users = Utils.storage.get('users', []);
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) return { success: false, message: 'User not found' };
        
        if (!users[userIndex].appliedJobs) {
            users[userIndex].appliedJobs = [];
        }
        
        // Check if already applied
        if (users[userIndex].appliedJobs.some(app => app.jobId === jobId)) {
            return { success: false, message: 'You have already applied for this job' };
        }
        
        const application = {
            id: Utils.generateId(),
            jobId,
            ...applicationData,
            appliedAt: Date.now(),
            status: 'pending'
        };
        
        users[userIndex].appliedJobs.push(application);
        Utils.storage.set('users', users);
        
        this.currentUser.appliedJobs = users[userIndex].appliedJobs;
        Utils.storage.set('currentUser', this.currentUser);
        
        return { success: true, message: 'Application submitted successfully!' };
    },
    
    getAppliedJobs() {
        if (!this.currentUser || !this.currentUser.appliedJobs) return [];
        
        const jobs = DataManager.getAllJobs();
        return this.currentUser.appliedJobs.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            return job ? { ...job, application: app } : null;
        }).filter(Boolean);
    },
    
    getSavedJobs() {
        if (!this.currentUser || !this.currentUser.savedJobs) return [];
        
        const jobs = DataManager.getAllJobs();
        return jobs.filter(job => this.currentUser.savedJobs.includes(job.id));
    },
    
    isJobSaved(jobId) {
        return this.currentUser && this.currentUser.savedJobs && this.currentUser.savedJobs.includes(jobId);
    },
    
    hasAppliedForJob(jobId) {
        return this.currentUser && this.currentUser.appliedJobs && this.currentUser.appliedJobs.some(app => app.jobId === jobId);
    },
    
    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const userAvatar = document.getElementById('userAvatar');
        
        if (this.currentUser) {
            authButtons.classList.add('hidden');
            userMenu.classList.remove('hidden');
            
            userName.textContent = this.currentUser.name;
            userEmail.textContent = this.currentUser.email;
            userAvatar.innerHTML = `<img src="${this.currentUser.avatar}" alt="${this.currentUser.name}">`;
            
            // Show/hide employer specific menu items
            const postedJobsTab = document.getElementById('postedJobsTab');
            if (this.isEmployer()) {
                postedJobsTab.style.display = 'block';
            } else {
                postedJobsTab.style.display = 'none';
            }
        } else {
            authButtons.classList.remove('hidden');
            userMenu.classList.add('hidden');
        }
    }
};

// Login form handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const result = Auth.login(email, password);
            
            if (result.success) {
                UI.closeModal('loginModal');
                UI.showToast('success', 'Welcome Back!', result.message);
                Auth.updateUI();
                Jobs.render();
            } else {
                UI.showToast('error', 'Login Failed', result.message);
            }
        });
    }
    
    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.querySelector('input[name="role"]:checked').value;
            
            const result = Auth.register(name, email, password, role);
            
            if (result.success) {
                UI.closeModal('registerModal');
                UI.showToast('success', 'Account Created!', result.message);
                Auth.updateUI();
                Jobs.render();
            } else {
                UI.showToast('error', 'Registration Failed', result.message);
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
            Jobs.render();
        });
    }
});

// Make Auth available globally
window.Auth = Auth;
