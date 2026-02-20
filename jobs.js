// ========================================
// JobHunt Pro - Jobs Module
// ========================================

const DataManager = {
    getAllJobs() {
        return Utils.storage.get('jobs', []);
    },
    
    getJobById(id) {
        const jobs = this.getAllJobs();
        return jobs.find(job => job.id === id);
    },
    
    addJob(job) {
        const jobs = this.getAllJobs();
        const newJob = {
            ...job,
            id: Utils.generateId(),
            postedDate: Date.now(),
            featured: false
        };
        jobs.unshift(newJob);
        Utils.storage.set('jobs', jobs);
        return newJob;
    },
    
    updateJob(id, updates) {
        const jobs = this.getAllJobs();
        const index = jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            jobs[index] = { ...jobs[index], ...updates };
            Utils.storage.set('jobs', jobs);
            return jobs[index];
        }
        return null;
    },
    
    deleteJob(id) {
        const jobs = this.getAllJobs();
        const filtered = jobs.filter(job => job.id !== id);
        Utils.storage.set('jobs', filtered);
    }
};

const Jobs = {
    filters: {
        keyword: '',
        location: '',
        category: '',
        jobTypes: [],
        experience: [],
        salaryMin: 0,
        salaryMax: 200000,
        remote: false,
        datePosted: ''
    },
    sortBy: 'newest',
    currentPage: 1,
    jobsPerPage: 10,
    
    init() {
        this.bindEvents();
        this.render();
        this.renderCategories();
        this.renderCompanies();
    },
    
    bindEvents() {
        // Search
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }
        
        // Enter key search
        const searchInputs = ['searchKeyword', 'searchLocation'];
        searchInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.handleSearch();
                });
            }
        });
        
        // Category search from hero tags
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const searchTerm = tag.dataset.search;
                document.getElementById('searchKeyword').value = searchTerm;
                this.handleSearch();
                document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Filters
        const jobTypeCheckboxes = document.querySelectorAll('input[name="jobType"]');
        jobTypeCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => this.handleFilterChange());
        });
        
        const experienceCheckboxes = document.querySelectorAll('input[name="experience"]');
        experienceCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => this.handleFilterChange());
        });
        
        const salaryRange = document.getElementById('salaryRange');
        if (salaryRange) {
            salaryRange.addEventListener('input', (e) => {
                document.getElementById('salaryValue').textContent = formatNumber(e.target.value);
                this.filters.salaryMax = parseInt(e.target.value);
                this.handleFilterChange();
            });
        }
        
        const locationFilter = document.getElementById('locationFilter');
        if (locationFilter) {
            locationFilter.addEventListener('change', () => this.handleFilterChange());
        }
        
        const dateFilter = document.getElementById('dateFilter');
        if (dateFilter) {
            dateFilter.addEventListener('change', () => this.handleFilterChange());
        }
        
        const remoteFilter = document.getElementById('remoteFilter');
        if (remoteFilter) {
            remoteFilter.addEventListener('change', () => this.handleFilterChange());
        }
        
        // Clear filters
        const clearFilters = document.getElementById('clearFilters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => this.clearFilters());
        }
        
        // Sort
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.render();
            });
        }
        
        // Load more
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMore());
        }
        
        // Filter toggle (mobile)
        const filterToggle = document.getElementById('filterToggle');
        const filtersSidebar = document.getElementById('filtersSidebar');
        if (filterToggle && filtersSidebar) {
            filterToggle.addEventListener('click', () => {
                filtersSidebar.classList.toggle('active');
            });
        }
    },
    
    handleSearch() {
        const keyword = document.getElementById('searchKeyword').value;
        const location = document.getElementById('searchLocation').value;
        const category = document.getElementById('searchCategory').value;
        
        this.filters.keyword = keyword;
        this.filters.location = location;
        this.filters.category = category;
        
        this.currentPage = 1;
        this.render();
        
        // Scroll to jobs section
        document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
    },
    
    handleFilterChange() {
        // Job types
        const jobTypeCheckboxes = document.querySelectorAll('input[name="jobType"]:checked');
        this.filters.jobTypes = Array.from(jobTypeCheckboxes).map(cb => cb.value);
        
        // Experience
        const experienceCheckboxes = document.querySelectorAll('input[name="experience"]:checked');
        this.filters.experience = Array.from(experienceCheckboxes).map(cb => cb.value);
        
        // Salary
        this.filters.salaryMin = parseInt(document.getElementById('salaryMin').value) || 0;
        this.filters.salaryMax = parseInt(document.getElementById('salaryMax').value) || 200000;
        
        // Location
        this.filters.location = document.getElementById('locationFilter').value;
        
        // Date posted
        this.filters.datePosted = document.getElementById('dateFilter').value;
        
        // Remote
        this.filters.remote = document.getElementById('remoteFilter').checked;
        
        this.currentPage = 1;
        this.render();
    },
    
    clearFilters() {
        // Reset filter state
        this.filters = {
            keyword: '',
            location: '',
            category: '',
            jobTypes: [],
            experience: [],
            salaryMin: 0,
            salaryMax: 200000,
            remote: false,
            datePosted: ''
        };
        
        // Reset UI
        document.getElementById('searchKeyword').value = '';
        document.getElementById('searchLocation').value = '';
        document.getElementById('searchCategory').value = '';
        document.getElementById('salaryRange').value = 200000;
        document.getElementById('salaryValue').textContent = '200,000';
        document.getElementById('locationFilter').value = '';
        document.getElementById('dateFilter').value = '';
        document.getElementById('remoteFilter').checked = false;
        
        document.querySelectorAll('input[name="jobType"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="experience"]').forEach(cb => cb.checked = false);
        
        this.render();
    },
    
    getFilteredJobs() {
        let jobs = DataManager.getAllJobs();
        
        // Keyword search
        if (this.filters.keyword) {
            const keyword = this.filters.keyword.toLowerCase();
            jobs = jobs.filter(job => 
                job.title.toLowerCase().includes(keyword) ||
                job.company.toLowerCase().includes(keyword) ||
                job.description.toLowerCase().includes(keyword) ||
                job.requirements.some(r => r.toLowerCase().includes(keyword))
            );
        }
        
        // Location
        if (this.filters.location) {
            const location = this.filters.location.toLowerCase();
            jobs = jobs.filter(job => 
                job.location.toLowerCase().includes(location)
            );
        }
        
        // Category
        if (this.filters.category) {
            jobs = jobs.filter(job => job.category === this.filters.category);
        }
        
        // Job type
        if (this.filters.jobTypes.length > 0) {
            jobs = jobs.filter(job => this.filters.jobTypes.includes(job.type));
        }
        
        // Experience
        if (this.filters.experience.length > 0) {
            jobs = jobs.filter(job => this.filters.experience.includes(job.experience));
        }
        
        // Salary range
        jobs = jobs.filter(job => {
            const jobMin = job.salary?.min || 0;
            const jobMax = job.salary?.max || 0;
            return jobMax >= this.filters.salaryMin && jobMin <= this.filters.salaryMax;
        });
        
        // Remote
        if (this.filters.remote) {
            jobs = jobs.filter(job => job.remote);
        }
        
        // Date posted
        if (this.filters.datePosted) {
            const days = parseInt(this.filters.datePosted);
            const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
            jobs = jobs.filter(job => job.postedDate >= cutoff);
        }
        
        // Sort
        jobs = this.sortJobs(jobs);
        
        return jobs;
    },
    
    sortJobs(jobs) {
        switch (this.sortBy) {
            case 'newest':
                return jobs.sort((a, b) => b.postedDate - a.postedDate);
            case 'oldest':
                return jobs.sort((a, b) => a.postedDate - b.postedDate);
            case 'salary-high':
                return jobs.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
            case 'salary-low':
                return jobs.sort((a, b) => (a.salary?.min || 0) - (b.salary?.min || 0));
            default:
                return jobs;
        }
    },
    
    getPaginatedJobs() {
        const filtered = this.getFilteredJobs();
        const start = 0;
        const end = this.currentPage * this.jobsPerPage;
        return filtered.slice(start, end);
    },
    
    loadMore() {
        this.currentPage++;
        this.render();
    },
    
    render() {
        const jobsGrid = document.getElementById('jobsGrid');
        const resultsCount = document.getElementById('resultsCount');
        const loadMoreWrapper = document.getElementById('loadMoreWrapper');
        const noResults = document.getElementById('noResults');
        
        const filtered = this.getFilteredJobs();
        const jobs = this.getPaginatedJobs();
        
        resultsCount.textContent = filtered.length;
        
        if (jobs.length === 0) {
            jobsGrid.innerHTML = '';
            noResults.classList.remove('hidden');
            loadMoreWrapper.classList.add('hidden');
            return;
        }
        
        noResults.classList.add('hidden');
        
        // Show load more if there are more jobs
        if (filtered.length > this.currentPage * this.jobsPerPage) {
            loadMoreWrapper.classList.remove('hidden');
        } else {
            loadMoreWrapper.classList.add('hidden');
        }
        
        jobsGrid.innerHTML = jobs.map(job => this.createJobCard(job)).join('');
        
        // Bind job card events
        this.bindJobCardEvents();
    },
    
    createJobCard(job) {
        const isSaved = Auth.isJobSaved(job.id);
        const isApplied = Auth.hasAppliedForJob(job.id);
        
        return `
            <div class="job-card" data-job-id="${job.id}">
                <div class="job-card-header">
                    <div class="company-logo">
                        <img src="${job.companyLogo}" alt="${job.company}">
                    </div>
                    <div class="job-card-info">
                        <h3><a href="#" class="job-title-link" data-job-id="${job.id}">${Utils.escapeHtml(job.title)}</a></h3>
                        <div class="company-name">
                            <i class="fas fa-building"></i>
                            ${Utils.escapeHtml(job.company)}
                        </div>
                    </div>
                </div>
                <div class="job-card-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${Utils.escapeHtml(job.location)}</span>
                    <span><i class="fas fa-dollar-sign"></i> ${Utils.formatSalary(job.salary)}</span>
                    <span><i class="fas fa-clock"></i> ${Utils.formatRelativeTime(job.postedDate)}</span>
                </div>
                <div class="job-card-tags">
                    <span class="job-tag ${job.type}">${Utils.getJobTypeLabel(job.type)}</span>
                    ${job.remote ? '<span class="job-tag remote"><i class="fas fa-home"></i> Remote</span>' : ''}
                    <span class="job-tag experience">${Utils.getExperienceLabel(job.experience)}</span>
                </div>
                <div class="job-card-footer">
                    <div class="salary">${Utils.formatSalary(job.salary)}</div>
                    <div class="posted-date">${Utils.formatRelativeTime(job.postedDate)}</div>
                    <div class="job-card-actions">
                        <button class="btn-save ${isSaved ? 'saved' : ''}" data-job-id="${job.id}" title="Save job">
                            <i class="far fa-bookmark"></i>
                        </button>
                        <button class="btn btn-primary btn-apply ${isApplied ? 'applied' : ''}" data-job-id="${job.id}" ${isApplied ? 'disabled' : ''}>
                            ${isApplied ? 'Applied' : 'Apply Now'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    bindJobCardEvents() {
        // Job title click - open details
        document.querySelectorAll('.job-title-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const jobId = link.dataset.jobId;
                Jobs.showJobDetails(jobId);
            });
        });
        
        // Save button
        document.querySelectorAll('.btn-save').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const jobId = btn.dataset.jobId;
                const result = Auth.saveJob(jobId);
                
                if (result.success) {
                    btn.classList.toggle('saved');
                    const icon = btn.querySelector('i');
                    if (btn.classList.contains('saved')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                    }
                    
                    UI.showToast(
                        result.saved ? 'success' : 'info',
                        result.saved ? 'Job Saved' : 'Job Removed',
                        result.message
                    );
                } else {
                    UI.showToast('error', 'Error', result.message);
                }
            });
        });
        
        // Apply button
        document.querySelectorAll('.btn-apply').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (btn.disabled) return;
                
                const jobId = btn.dataset.jobId;
                Jobs.showApplyModal(jobId);
            });
        });
        
        // Card click - open details
        document.querySelectorAll('.job-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-save') || e.target.closest('.btn-apply')) return;
                const jobId = card.dataset.jobId;
                Jobs.showJobDetails(jobId);
            });
        });
    },
    
    showJobDetails(jobId) {
        const job = DataManager.getJobById(jobId);
        if (!job) return;
        
        const modal = document.getElementById('jobDetailsModal');
        const content = document.getElementById('jobDetailsContent');
        
        const isSaved = Auth.isJobSaved(jobId);
        const isApplied = Auth.hasAppliedForJob(jobId);
        
        content.innerHTML = `
            <div class="job-details-header">
                <div class="company-logo">
                    <img src="${job.companyLogo}" alt="${job.company}">
                </div>
                <div class="job-details-title">
                    <h2>${Utils.escapeHtml(job.title)}</h2>
                    <div class="company-name">
                        <i class="fas fa-building"></i>
                        ${Utils.escapeHtml(job.company)}
                    </div>
                    <div class="job-details-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${Utils.escapeHtml(job.location)}</span>
                        <span><i class="fas fa-dollar-sign"></i> ${Utils.formatSalary(job.salary)}</span>
                        <span><i class="fas fa-briefcase"></i> ${Utils.getJobTypeLabel(job.type)}</span>
                        <span><i class="fas fa-layer-group"></i> ${Utils.getExperienceLabel(job.experience)}</span>
                    </div>
                </div>
            </div>
            <div class="job-details-body">
                <h3>Job Description</h3>
                <p>${Utils.escapeHtml(job.description)}</p>
                
                <h3>Requirements</h3>
                <ul>
                    ${job.requirements.map(req => `<li>${Utils.escapeHtml(req)}</li>`).join('')}
                </ul>
                
                <h3>Benefits</h3>
                <ul>
                    ${job.benefits.map(benefit => `<li>${Utils.escapeHtml(benefit)}</li>`).join('')}
                </ul>
                
                <div class="job-details-skills">
                    ${job.remote ? '<span class="job-tag remote"><i class="fas fa-home"></i> Remote</span>' : ''}
                    <span class="job-tag ${job.type}">${Utils.getJobTypeLabel(job.type)}</span>
                    <span class="job-tag experience">${Utils.getExperienceLabel(job.experience)}</span>
                </div>
                
                <div class="job-details-actions">
                    <button class="btn btn-primary btn-apply-modal" data-job-id="${job.id}" ${isApplied ? 'disabled' : ''}>
                        ${isApplied ? 'Already Applied' : 'Apply Now'}
                    </button>
                    <button class="btn btn-outline btn-save-modal ${isSaved ? 'saved' : ''}" data-job-id="${job.id}">
                        <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i>
                        ${isSaved ? 'Saved' : 'Save Job'}
                    </button>
                    <button class="btn btn-outline" onclick="Jobs.shareJob('${job.id}')">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        `;
        
        // Bind modal actions
        const applyBtn = content.querySelector('.btn-apply-modal');
        if (applyBtn && !applyBtn.disabled) {
            applyBtn.addEventListener('click', () => {
                UI.closeModal('jobDetailsModal');
                Jobs.showApplyModal(jobId);
            });
        }
        
        const saveBtn = content.querySelector('.btn-save-modal');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const result = Auth.saveJob(jobId);
                if (result.success) {
                    saveBtn.classList.toggle('saved');
                    const icon = saveBtn.querySelector('i');
                    if (saveBtn.classList.contains('saved')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        saveBtn.innerHTML = '<i class="far fa-bookmark"></i> Save Job';
                    }
                    
                    UI.showToast(
                        saveBtn.classList.contains('saved') ? 'success' : 'info',
                        saveBtn.classList.contains('saved') ? 'Job Saved' : 'Job Removed',
                        result.message
                    );
                }
                Jobs.render();
            });
        }
        
        UI.openModal('jobDetailsModal');
    },
    
    showApplyModal(jobId) {
        if (!Auth.isLoggedIn()) {
            UI.showToast('error', 'Login Required', 'Please login to apply for jobs');
            UI.openModal('loginModal');
            return;
        }
        
        const job = DataManager.getJobById(jobId);
        if (!job) return;
        
        if (Auth.hasAppliedForJob(jobId)) {
            UI.showToast('info', 'Already Applied', 'You have already applied for this job');
            return;
        }
        
        document.getElementById('applyJobId').value = jobId;
        document.getElementById('applyJobTitle').textContent = `Apply for ${job.title} at ${job.company}`;
        
        // Pre-fill user data if available
        if (Auth.currentUser) {
            document.getElementById('applyName').value = Auth.currentUser.name || '';
            document.getElementById('applyEmail').value = Auth.currentUser.email || '';
        }
        
        UI.openModal('applyModal');
    },
    
    shareJob(jobId) {
        const url = `${window.location.origin}${window.location.pathname}?job=${jobId}`;
        
        Utils.copyToClipboard(url).then(() => {
            UI.showToast('success', 'Link Copied', 'Job link copied to clipboard');
        });
    },
    
    renderCategories() {
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;
        
        const categories = getCategories();
        grid.innerHTML = categories.map(cat => `
            <div class="category-card" data-category="${cat.id}">
                <div class="category-icon" style="background: linear-gradient(135deg, ${cat.color}, ${cat.color}dd)">
                    <i class="fas ${cat.icon}"></i>
                </div>
                <h3>${cat.name}</h3>
                <p>${cat.count.toLocaleString()} open positions</p>
            </div>
        `).join('');
        
        // Bind category clicks
        grid.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                document.getElementById('searchCategory').value = category;
                document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
                Jobs.handleSearch();
            });
        });
    },
    
    renderCompanies() {
        const grid = document.getElementById('companiesGrid');
        if (!grid) return;
        
        const companies = getCompanies();
        grid.innerHTML = companies.map(company => `
            <div class="company-card" data-company="${company.id}">
                <div class="company-logo">
                    <img src="${company.logo}" alt="${company.name}">
                </div>
                <h3>${company.name}</h3>
                <p>${company.description}</p>
                <span class="jobs-count">${company.jobCount} open jobs</span>
            </div>
        `).join('');
        
        // Bind company clicks
        grid.querySelectorAll('.company-card').forEach(card => {
            card.addEventListener('click', () => {
                const companyName = card.querySelector('h3').textContent;
                document.getElementById('searchKeyword').value = companyName;
                document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
                Jobs.handleSearch();
            });
        });
    },
    
    submitApplication(formData) {
        const jobId = formData.get('jobId');
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            coverLetter: formData.get('coverLetter'),
            resume: formData.get('resume')
        };
        
        const result = Auth.applyForJob(jobId, data);
        
        if (result.success) {
            Jobs.render();
            UI.showToast('success', 'Application Sent!', 'Your application has been submitted successfully');
            return true;
        } else {
            UI.showToast('error', 'Application Failed', result.message);
            return false;
        }
    }
};

// Apply form handler
document.addEventListener('DOMContentLoaded', () => {
    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        applyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(applyForm);
            const jobId = document.getElementById('applyJobId').value;
            
            formData.append('jobId', jobId);
            
            const data = {
                name: formData.get('applyName'),
                email: formData.get('applyEmail'),
                phone: formData.get('applyPhone'),
                coverLetter: formData.get('applyCoverLetter'),
                resume: formData.get('applyResume')?.name
            };
            
            const result = Auth.applyForJob(jobId, data);
            
            if (result.success) {
                UI.closeModal('applyModal');
                Jobs.render();
                UI.showToast('success', 'Application Sent!', 'Your application has been submitted successfully');
                applyForm.reset();
            } else {
                UI.showToast('error', 'Application Failed', result.message);
            }
        });
    }
});

// Make Jobs available globally
window.Jobs = Jobs;
window.DataManager = DataManager;
