// ========================================
// JobHunt Pro - UI Components
// ========================================

const UI = {
    init() {
        this.bindNavbar();
        this.bindModals();
        this.bindThemeToggle();
        this.bindScrollTop();
        this.bindTestimonials();
        this.bindStats();
    },
    
    bindNavbar() {
        const navbar = document.getElementById('navbar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Show/hide scroll top
            const scrollTop = document.getElementById('scrollTop');
            if (window.scrollY > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });
        
        // Mobile menu
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
        
        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    },
    
    bindModals() {
        // Login modal
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeLoginModal = document.getElementById('closeLoginModal');
        
        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => this.openModal('loginModal'));
        }
        if (closeLoginModal) {
            closeLoginModal.addEventListener('click', () => this.closeModal('loginModal'));
        }
        
        // Register modal
        const registerBtn = document.getElementById('registerBtn');
        const registerModal = document.getElementById('registerModal');
        const closeRegisterModal = document.getElementById('closeRegisterModal');
        
        if (registerBtn && registerModal) {
            registerBtn.addEventListener('click', () => this.openModal('registerModal'));
        }
        if (closeRegisterModal) {
            closeRegisterModal.addEventListener('click', () => this.closeModal('registerModal'));
        }
        
        // Switch between login/register
        const switchToRegister = document.getElementById('switchToRegister');
        const switchToLogin = document.getElementById('switchToLogin');
        
        if (switchToRegister) {
            switchToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('loginModal');
                setTimeout(() => this.openModal('registerModal'), 200);
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('registerModal');
                setTimeout(() => this.openModal('loginModal'), 200);
            });
        }
        
        // Job details modal
        const closeJobModal = document.getElementById('closeJobModal');
        if (closeJobModal) {
            closeJobModal.addEventListener('click', () => this.closeModal('jobDetailsModal'));
        }
        
        // Apply modal
        const closeApplyModal = document.getElementById('closeApplyModal');
        if (closeApplyModal) {
            closeApplyModal.addEventListener('click', () => this.closeModal('applyModal'));
        }
        
        // Post job modal
        const closePostJobModal = document.getElementById('closePostJobModal');
        if (closePostJobModal) {
            closePostJobModal.addEventListener('click', () => this.closeModal('postJobModal'));
        }
        
        // Profile modal
        const closeProfileModal = document.getElementById('closeProfileModal');
        if (closeProfileModal) {
            closeProfileModal.addEventListener('click', () => this.closeModal('profileModal'));
        }
        
        // Dashboard modal
        const closeDashboardModal = document.getElementById('closeDashboardModal');
        if (closeDashboardModal) {
            closeDashboardModal.addEventListener('click', () => this.closeModal('dashboardModal'));
        }
        
        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                const modal = overlay.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });
        
        // Close modals on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
        
        // Dashboard links
        const dashboardLink = document.getElementById('dashboardLink');
        const myApplicationsLink = document.getElementById('myApplicationsLink');
        const savedJobsLink = document.getElementById('savedJobsLink');
        const profileLink = document.getElementById('profileLink');
        
        if (dashboardLink) {
            dashboardLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('userDropdown');
                this.openDashboard();
            });
        }
        
        if (myApplicationsLink) {
            myApplicationsLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('userDropdown');
                this.openDashboard('applied');
            });
        }
        
        if (savedJobsLink) {
            savedJobsLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('userDropdown');
                this.openDashboard('saved');
            });
        }
        
        if (profileLink) {
            profileLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('userDropdown');
                this.openProfile();
            });
        }
        
        // CTA buttons
        const ctaSearchJobs = document.getElementById('ctaSearchJobs');
        if (ctaSearchJobs) {
            ctaSearchJobs.addEventListener('click', () => {
                document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        const ctaPostJob = document.getElementById('ctaPostJob');
        if (ctaPostJob) {
            ctaPostJob.addEventListener('click', () => {
                if (Auth.isLoggedIn() && Auth.isEmployer()) {
                    this.openPostJob();
                } else {
                    this.openModal('loginModal');
                }
            });
        }
        
        // Post new job from dashboard
        const postNewJobBtn = document.getElementById('postNewJobBtn');
        if (postNewJobBtn) {
            postNewJobBtn.addEventListener('click', () => {
                this.closeModal('dashboardModal');
                this.openPostJob();
            });
        }
        
        // Dashboard tabs
        document.querySelectorAll('.dashboard-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchDashboardTab(tabName);
            });
        });
    },
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },
    
    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    },
    
    bindThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    },
    
    bindScrollTop() {
        const scrollTop = document.getElementById('scrollTop');
        if (scrollTop) {
            scrollTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    },
    
    bindTestimonials() {
        const track = document.getElementById('testimonialsTrack');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        const dotsContainer = document.getElementById('testimonialsDots');
        
        if (!track) return;
        
        const testimonials = getTestimonials();
        let currentIndex = 0;
        
        // Create testimonial cards
        track.innerHTML = testimonials.map(t => `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <div class="testimonial-avatar">
                        <img src="${t.avatar}" alt="${t.name}">
                    </div>
                    <blockquote>"${t.text}"</blockquote>
                    <cite>
                        <strong>${t.name}</strong>
                        <span>${t.role}</span>
                    </cite>
                </div>
            </div>
        `).join('');
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = testimonials.map((_, i) => `
                <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
            `).join('');
            
            dotsContainer.querySelectorAll('.dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    currentIndex = parseInt(dot.dataset.index);
                    this.updateTestimonialPosition(currentIndex);
                });
            });
        }
        
        // Navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : testimonials.length - 1;
                this.updateTestimonialPosition(currentIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = currentIndex < testimonials.length - 1 ? currentIndex + 1 : 0;
                this.updateTestimonialPosition(currentIndex);
            });
        }
        
        // Auto-rotate
        setInterval(() => {
            currentIndex = currentIndex < testimonials.length - 1 ? currentIndex + 1 : 0;
            this.updateTestimonialPosition(currentIndex);
        }, 5000);
    },
    
    updateTestimonialPosition(index) {
        const track = document.getElementById('testimonialsTrack');
        const dots = document.querySelectorAll('.testimonials-dots .dot');
        
        if (track) {
            track.style.transform = `translateX(-${index * 100}%)`;
        }
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    },
    
    bindStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    Utils.animateCounter(entry.target, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    },
    
    showToast(type, title, message, duration = 4000) {
        const container = document.getElementById('toastContainer');
        
        const icons = {
            success: 'fa-check',
            error: 'fa-times',
            warning: 'fa-exclamation',
            info: 'fa-info'
        };
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icons[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(toast);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
        
        // Auto dismiss
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    openDashboard(tab = 'applied') {
        if (!Auth.isLoggedIn()) {
            this.openModal('loginModal');
            return;
        }
        
        this.openModal('dashboardModal');
        this.switchDashboardTab(tab);
    },
    
    switchDashboardTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.dashboard-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update panels
        document.querySelectorAll('.dashboard-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabName}Panel`);
        });
        
        // Load data
        if (tabName === 'applied') {
            this.loadDashboardApplied();
        } else if (tabName === 'saved') {
            this.loadDashboardSaved();
        } else if (tabName === 'posted') {
            this.loadDashboardPosted();
        }
    },
    
    loadDashboardApplied() {
        const container = document.getElementById('appliedJobsList');
        const jobs = Auth.getAppliedJobs();
        
        if (jobs.length === 0) {
            container.innerHTML = `
                <div class="dashboard-empty">
                    <i class="fas fa-paper-plane"></i>
                    <h3>No applications yet</h3>
                    <p>Start applying to jobs to track them here</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = jobs.map(job => `
            <div class="dashboard-job-card">
                <div class="company-logo">
                    <img src="${job.companyLogo}" alt="${job.company}">
                </div>
                <div class="dashboard-job-info">
                    <h4>${job.title}</h4>
                    <p>${job.company} &bull; ${Utils.formatRelativeTime(job.application.appliedAt)}</p>
                </div>
                <div class="dashboard-job-actions">
                    <button class="btn btn-sm btn-outline view-job" data-job-id="${job.id}">
                        View Job
                    </button>
                </div>
            </div>
        `).join('');
        
        // Bind view buttons
        container.querySelectorAll('.view-job').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal('dashboardModal');
                Jobs.showJobDetails(btn.dataset.jobId);
            });
        });
    },
    
    loadDashboardSaved() {
        const container = document.getElementById('savedJobsList');
        const jobs = Auth.getSavedJobs();
        
        if (jobs.length === 0) {
            container.innerHTML = `
                <div class="dashboard-empty">
                    <i class="fas fa-bookmark"></i>
                    <h3>No saved jobs</h3>
                    <p>Save jobs to view them later</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = jobs.map(job => `
            <div class="dashboard-job-card">
                <div class="company-logo">
                    <img src="${job.companyLogo}" alt="${job.company}">
                </div>
                <div class="dashboard-job-info">
                    <h4>${job.title}</h4>
                    <p>${job.company} &bull; ${job.location}</p>
                </div>
                <div class="dashboard-job-actions">
                    <button class="btn btn-sm btn-outline view-job" data-job-id="${job.id}">View</button>
                    <button class="btn btn-sm btn-text unsave-job" data-job-id="${job.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Bind view buttons
        container.querySelectorAll('.view-job').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal('dashboardModal');
                Jobs.showJobDetails(btn.dataset.jobId);
            });
        });
        
        // Bind unsave buttons
        container.querySelectorAll('.unsave-job').forEach(btn => {
            btn.addEventListener('click', () => {
                Auth.saveJob(btn.dataset.jobId);
                this.loadDashboardSaved();
            });
        });
    },
    
    loadDashboardPosted() {
        const container = document.getElementById('postedJobsList');
        
        if (!Auth.isEmployer()) {
            container.innerHTML = `
                <div class="dashboard-empty">
                    <i class="fas fa-building"></i>
                    <h3>Employer account required</h3>
                    <p>Register as an employer to post jobs</p>
                </div>
            `;
            return;
        }
        
        const postedJobs = DataManager.getAllJobs().filter(job => 
            job.postedBy === Auth.currentUser.id
        );
        
        if (postedJobs.length === 0) {
            container.innerHTML = `
                <div class="dashboard-empty">
                    <i class="fas fa-briefcase"></i>
                    <h3>No posted jobs</h3>
                    <p>Post your first job to attract candidates</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = postedJobs.map(job => `
            <div class="dashboard-job-card">
                <div class="company-logo">
                    <img src="${job.companyLogo}" alt="${job.company}">
                </div>
                <div class="dashboard-job-info">
                    <h4>${job.title}</h4>
                    <p>${job.company} &bull; ${Utils.formatRelativeTime(job.postedDate)}</p>
                </div>
                <div class="dashboard-job-actions">
                    <span class="badge">${job.applications || 0} applicants</span>
                    <button class="btn btn-sm btn-text delete-job" data-job-id="${job.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Bind delete buttons
        container.querySelectorAll('.delete-job').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this job?')) {
                    DataManager.deleteJob(btn.dataset.jobId);
                    this.loadDashboardPosted();
                    Jobs.render();
                    this.showToast('success', 'Job Deleted', 'The job has been removed');
                }
            });
        });
    },
    
    openProfile() {
        if (!Auth.isLoggedIn()) {
            this.openModal('loginModal');
            return;
        }
        
        const user = Auth.currentUser;
        
        document.getElementById('profileName').value = user.name || '';
        document.getElementById('profileTitle').value = user.title || '';
        document.getElementById('profileBio').value = user.bio || '';
        document.getElementById('profileSkills').value = (user.skills || []).join(', ');
        document.getElementById('profileLocation').value = user.location || '';
        document.getElementById('profilePhone').value = user.phone || '';
        document.getElementById('profileWebsite').value = user.website || '';
        
        this.openModal('profileModal');
    },
    
    openPostJob() {
        if (!Auth.isLoggedIn()) {
            this.openModal('loginModal');
            return;
        }
        
        if (!Auth.isEmployer()) {
            this.showToast('error', 'Employer Only', 'Only employers can post jobs. Please register as an employer.');
            return;
        }
        
        this.openModal('postJobModal');
    }
};

// Profile form handler
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const updates = {
                name: document.getElementById('profileName').value,
                title: document.getElementById('profileTitle').value,
                bio: document.getElementById('profileBio').value,
                skills: document.getElementById('profileSkills').value.split(',').map(s => s.trim()).filter(Boolean),
                location: document.getElementById('profileLocation').value,
                phone: document.getElementById('profilePhone').value,
                website: document.getElementById('profileWebsite').value,
                profileComplete: true
            };
            
            const result = Auth.updateProfile(updates);
            
            if (result.success) {
                UI.closeModal('profileModal');
                UI.showToast('success', 'Profile Updated', 'Your profile has been saved');
                Auth.updateUI();
            } else {
                UI.showToast('error', 'Update Failed', result.message);
            }
        });
    }
    
    // Post job form handler
    const postJobForm = document.getElementById('postJobForm');
    if (postJobForm) {
        postJobForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const jobData = {
                title: document.getElementById('postJobTitle').value,
                company: document.getElementById('postJobCompany').value,
                companyLogo: `https://ui-avatars.com/api/?name=${encodeURIComponent(document.getElementById('postJobCompany').value)}&background=0ea5e9&color=fff`,
                location: document.getElementById('postJobLocation').value,
                type: document.getElementById('postJobType').value,
                experience: document.getElementById('postJobExperience').value,
                salary: {
                    min: parseInt(document.getElementById('postJobSalaryMin').value) || 0,
                    max: parseInt(document.getElementById('postJobSalaryMax').value) || 0
                },
                remote: document.getElementById('postJobRemote').checked,
                description: document.getElementById('postJobDescription').value,
                requirements: document.getElementById('postJobRequirements').value.split('\n').filter(r => r.trim()),
                benefits: document.getElementById('postJobBenefits').value.split('\n').filter(b => b.trim()),
                postedBy: Auth.currentUser.id
            };
            
            DataManager.addJob(jobData);
            
            UI.closeModal('postJobModal');
            UI.showToast('success', 'Job Posted!', 'Your job has been published successfully');
            Jobs.render();
            postJobForm.reset();
        });
    }
});

// Make UI available globally
window.UI = UI;
