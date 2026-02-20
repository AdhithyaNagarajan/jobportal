// ========================================
// JobHunt Pro - Data & Jobs
// ========================================

const JOBS = [
    { id: 'job-001', title: 'Senior Frontend Developer', company: 'Google', companyLogo: 'https://ui-avatars.com/api/?name=Google&background=4285F4&color=fff&size=128', location: 'San Francisco, CA', salary: { min: 150000, max: 220000 }, type: 'full-time', remote: true, experience: 'senior', category: 'engineering', description: 'We are looking for an experienced Frontend Developer to join our team.', requirements: ['5+ years experience', 'React expertise', 'TypeScript skills'], benefits: ['Health insurance', '401(k)', 'Remote work'], postedDate: Date.now() - 2 * 24 * 60 * 60 * 1000, featured: true },
    { id: 'job-002', title: 'UX Designer', company: 'Apple', companyLogo: 'https://ui-avatars.com/api/?name=Apple&background=555555&color=fff&size=128', location: 'Cupertino, CA', salary: { min: 120000, max: 180000 }, type: 'full-time', remote: false, experience: 'mid', category: 'design', description: 'Join our design team to create beautiful user experiences.', requirements: ['3+ years UX experience', 'Figma proficiency', 'Portfolio required'], benefits: ['Stock options', 'Premium health'], postedDate: Date.now() - 1 * 24 * 60 * 60 * 1000, featured: true },
    { id: 'job-003', title: 'Full Stack Engineer', company: 'Netflix', companyLogo: 'https://ui-avatars.com/api/?name=Netflix&background=E50914&color=fff&size=128', location: 'Los Angeles, CA', salary: { min: 140000, max: 200000 }, type: 'full-time', remote: true, experience: 'senior', category: 'engineering', description: 'Build scalable microservices for our streaming platform.', requirements: ['4+ years full-stack', 'Java/Spring', 'Cloud experience'], benefits: ['Top compensation', 'Unlimited PTO'], postedDate: Date.now() - 3 * 24 * 60 * 60 * 1000, featured: true },
    { id: 'job-004', title: 'Marketing Manager', company: 'Amazon', companyLogo: 'https://ui-avatars.com/api/?name=Amazon&background=FF9900&color=fff&size=128', location: 'Seattle, WA', salary: { min: 90000, max: 140000 }, type: 'full-time', remote: false, experience: 'mid', category: 'marketing', description: 'Lead marketing campaigns for AWS services.', requirements: ['5+ years marketing', 'Digital marketing', 'Analytics'], benefits: ['Performance bonus', 'Career growth'], postedDate: Date.now() - 5 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-005', title: 'Data Scientist', company: 'Meta', companyLogo: 'https://ui-avatars.com/api/?name=Meta&background=0668E1&color=fff&size=128', location: 'Menlo Park, CA', salary: { min: 160000, max: 240000 }, type: 'full-time', remote: true, experience: 'senior', category: 'engineering', description: 'Apply machine learning to solve complex problems.', requirements: ['PhD preferred', 'Python/R', 'ML frameworks'], benefits: ['Equity package', 'Full health'], postedDate: Date.now() - 7 * 24 * 60 * 60 * 1000, featured: true },
    { id: 'job-006', title: 'Product Designer', company: 'Airbnb', companyLogo: 'https://ui-avatars.com/api/?name=Airbnb&background=FF5A5F&color=fff&size=128', location: 'San Francisco, CA', salary: { min: 110000, max: 160000 }, type: 'full-time', remote: true, experience: 'mid', category: 'design', description: 'Design end-to-end product experiences.', requirements: ['3-5 years product design', 'UX/UI skills', 'Portfolio'], benefits: ['Travel credits', 'Equity'], postedDate: Date.now() - 4 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-007', title: 'DevOps Engineer', company: 'Stripe', companyLogo: 'https://ui-avatars.com/api/?name=Stripe&background=635BFF&color=fff&size=128', location: 'San Francisco, CA', salary: { min: 170000, max: 250000 }, type: 'full-time', remote: true, experience: 'senior', category: 'engineering', description: 'Build payment infrastructure at scale.', requirements: ['5+ years DevOps', 'Kubernetes', 'CI/CD'], benefits: ['Competitive equity', 'Remote-first'], postedDate: Date.now() - 2 * 24 * 60 * 60 * 1000, featured: true },
    { id: 'job-008', title: 'Sales Representative', company: 'Salesforce', companyLogo: 'https://ui-avatars.com/api/?name=Salesforce&background=00A1E0&color=fff&size=128', location: 'New York, NY', salary: { min: 50000, max: 80000 }, type: 'full-time', remote: false, experience: 'entry', category: 'sales', description: 'Drive new business opportunities.', requirements: ['1-2 years experience', 'Communication', 'Self-motivated'], benefits: ['Base + commission', 'Health benefits'], postedDate: Date.now() - 1 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-009', title: 'HR Business Partner', company: 'Microsoft', companyLogo: 'https://ui-avatars.com/api/?name=Microsoft&background=00A4EF&color=fff&size=128', location: 'Redmond, WA', salary: { min: 80000, max: 120000 }, type: 'full-time', remote: false, experience: 'mid', category: 'hr', description: 'Partner with business leaders on HR matters.', requirements: ['4+ years HR', 'HRBP experience', 'Interpersonal skills'], benefits: ['Stock awards', '401(k)'], postedDate: Date.now() - 6 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-010', title: 'Financial Analyst', company: 'Tesla', companyLogo: 'https://ui-avatars.com/api/?name=Tesla&background=CC0000&color=fff&size=128', location: 'Austin, TX', salary: { min: 70000, max: 100000 }, type: 'full-time', remote: false, experience: 'entry', category: 'finance', description: 'Support financial planning and analysis.', requirements: ['Finance degree', 'Excel', 'Modeling'], benefits: ['Stock options', 'Health coverage'], postedDate: Date.now() - 8 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-011', title: 'Backend Engineer (Go)', company: 'Spotify', companyLogo: 'https://ui-avatars.com/api/?name=Spotify&background=1DB954&color=fff&size=128', location: 'Remote', salary: { min: 130000, max: 190000 }, type: 'full-time', remote: true, experience: 'mid', category: 'engineering', description: 'Build backend services for music streaming.', requirements: ['3+ years backend', 'Go', 'REST APIs'], benefits: ['Remote flexibility', 'Stock options'], postedDate: Date.now() - 3 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-012', title: 'iOS Developer', company: 'Apple', companyLogo: 'https://ui-avatars.com/api/?name=Apple&background=555555&color=fff&size=128', location: 'Cupertino, CA', salary: { min: 180000, max: 260000 }, type: 'full-time', remote: false, experience: 'senior', category: 'engineering', description: 'Develop next-gen iOS applications.', requirements: ['6+ years iOS', 'Swift', 'App Store'], benefits: ['Top pay', 'Stock grants'], postedDate: Date.now() - 10 * 24 * 60 * 60 * 1000, featured: true },
    { id: 'job-013', title: 'Content Marketing', company: 'HubSpot', companyLogo: 'https://ui-avatars.com/api/?name=HubSpot&background=FF7A59&color=fff&size=128', location: 'Boston, MA', salary: { min: 55000, max: 75000 }, type: 'full-time', remote: true, experience: 'entry', category: 'marketing', description: 'Create compelling content for audiences.', requirements: ['Writing skills', 'SEO knowledge', 'Social media'], benefits: ['Growth culture', 'Remote work'], postedDate: Date.now() - 5 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-014', title: 'Account Executive', company: 'Stripe', companyLogo: 'https://ui-avatars.com/api/?name=Stripe&background=635BFF&color=fff&size=128', location: 'New York, NY', salary: { min: 60000, max: 120000 }, type: 'full-time', remote: false, experience: 'mid', category: 'sales', description: 'Drive revenue with enterprise customers.', requirements: ['3+ years sales', 'SaaS', 'Negotiation'], benefits: ['Uncapped commission', 'Equity'], postedDate: Date.now() - 7 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-015', title: 'Graphic Designer', company: 'Netflix', companyLogo: 'https://ui-avatars.com/api/?name=Netflix&background=E50914&color=fff&size=128', location: 'Los Angeles, CA', salary: { min: 80000, max: 120000 }, type: 'full-time', remote: false, experience: 'mid', category: 'design', description: 'Design marketing assets and brand materials.', requirements: ['3-5 years design', 'Adobe Creative', 'Typography'], benefits: ['Creative freedom', 'Full benefits'], postedDate: Date.now() - 4 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-016', title: 'Machine Learning Engineer', company: 'Google', companyLogo: 'https://ui-avatars.com/api/?name=Google&background=4285F4&color=fff&size=128', location: 'Mountain View, CA', salary: { min: 200000, max: 300000 }, type: 'full-time', remote: true, experience: 'lead', category: 'engineering', description: 'Work on cutting-edge ML models.', requirements: ['7+ years ML', 'PhD preferred', 'TensorFlow'], benefits: ['Top salary', 'Stock options'], postedDate: Date.now() - 9 * 24 * 60 * 60 * 1000, featured: true },
    { id: 'job-017', title: 'Customer Success Manager', company: 'Salesforce', companyLogo: 'https://ui-avatars.com/api/?name=Salesforce&background=00A1E0&color=fff&size=128', location: 'Chicago, IL', salary: { min: 70000, max: 100000 }, type: 'full-time', remote: true, experience: 'mid', category: 'sales', description: 'Ensure customers achieve their goals.', requirements: ['3+ years CS', 'SaaS', 'CRM'], benefits: ['Base + bonus', 'Remote work'], postedDate: Date.now() - 6 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-018', title: 'Technical Writer', company: 'Microsoft', companyLogo: 'https://ui-avatars.com/api/?name=Microsoft&background=00A4EF&color=fff&size=128', location: 'Seattle, WA', salary: { min: 75000, max: 110000 }, type: 'full-time', remote: true, experience: 'mid', category: 'engineering', description: 'Create documentation for developers.', requirements: ['3+ years tech writing', 'API docs', 'Technical background'], benefits: ['Inclusive culture', 'Health'], postedDate: Date.now() - 11 * 24 * 60 * 60 * 1000, featured: false },
    { id: 'job-019', title: 'Product Manager', company: 'Amazon', companyLogo: 'https://ui-avatars.com/api/?name=Amazon&background=FF9900&color=fff&size=128', location: 'Seattle, WA', salary: { min: 130000, max: 200000 }, type: 'full-time', remote: false, experience: 'senior', category: 'engineering', description: 'Define product strategy for AWS services.', requirements: ['5+ years PM', 'Technical', 'Data-driven'], benefits: ['RSU grants', 'Career growth'], postedDate: Date.now() - 12 * 24 * 60 * 60 * 1000, featured: true },
    { id: 'job-020', title: 'Social Media Coordinator', company: 'Airbnb', companyLogo: 'https://ui-avatars.com/api/?name=Airbnb&background=FF5A5F&color=fff&size=128', location: 'San Francisco, CA', salary: { min: 50000, max: 70000 }, type: 'full-time', remote: true, experience: 'entry', category: 'marketing', description: 'Manage social media presence.', requirements: ['Social media experience', 'Content creation', 'Analytics'], benefits: ['Travel credits', 'Remote'], postedDate: Date.now() - 2 * 24 * 60 * 60 * 1000, featured: false }
];

const COMPANIES = [
    { id: 'google', name: 'Google', logo: 'https://ui-avatars.com/api/?name=Google&background=4285F4&color=fff&size=128', description: 'Tech Giant', jobCount: 156 },
    { id: 'microsoft', name: 'Microsoft', logo: 'https://ui-avatars.com/api/?name=Microsoft&background=00A4EF&color=fff&size=128', description: 'Software Corp', jobCount: 142 },
    { id: 'amazon', name: 'Amazon', logo: 'https://ui-avatars.com/api/?name=Amazon&background=FF9900&color=fff&size=128', description: 'E-Commerce', jobCount: 198 },
    { id: 'apple', name: 'Apple', logo: 'https://ui-avatars.com/api/?name=Apple&background=555555&color=fff&size=128', description: 'Electronics', jobCount: 89 },
    { id: 'meta', name: 'Meta', logo: 'https://ui-avatars.com/api/?name=Meta&background=0668E1&color=fff&size=128', description: 'Social Media', jobCount: 124 },
    { id: 'netflix', name: 'Netflix', logo: 'https://ui-avatars.com/api/?name=Netflix&background=E50914&color=fff&size=128', description: 'Streaming', jobCount: 67 },
    { id: 'tesla', name: 'Tesla', logo: 'https://ui-avatars.com/api/?name=Tesla&background=CC0000&color=fff&size=128', description: 'Automotive', jobCount: 93 },
    { id: 'stripe', name: 'Stripe', logo: 'https://ui-avatars.com/api/?name=Stripe&background=635BFF&color=fff&size=128', description: 'Fintech', jobCount: 78 },
    { id: 'airbnb', name: 'Airbnb', logo: 'https://ui-avatars.com/api/?name=Airbnb&background=FF5A5F&color=fff&size=128', description: 'Travel', jobCount: 54 },
    { id: 'spotify', name: 'Spotify', logo: 'https://ui-avatars.com/api/?name=Spotify&background=1DB954&color=fff&size=128', description: 'Music', jobCount: 61 }
];

const CATEGORIES = [
    { id: 'engineering', name: 'Engineering', icon: 'fa-code', count: 2450 },
    { id: 'design', name: 'Design', icon: 'fa-paint-brush', count: 1820 },
    { id: 'marketing', name: 'Marketing', icon: 'fa-bullhorn', count: 1530 },
    { id: 'sales', name: 'Sales', icon: 'fa-chart-line', count: 1280 },
    { id: 'hr', name: 'Human Resources', icon: 'fa-users', count: 890 },
    { id: 'finance', name: 'Finance', icon: 'fa-coins', count: 1120 }
];

const TESTIMONIALS = [
    { id: 1, name: 'Sarah Johnson', role: 'Software Engineer at Google', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0ea5e9&color=fff&size=128', text: 'JobHunt Pro made my job search incredibly easy. I found my dream job within just 2 weeks!' },
    { id: 2, name: 'Michael Chen', role: 'Product Designer at Airbnb', avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff&size=128', text: 'The personalized job alerts saved me so much time. Highly recommend!' },
    { id: 3, name: 'Emily Rodriguez', role: 'Data Scientist at Meta', avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=10b981&color=fff&size=128', text: 'What I loved most was the transparency in salary information. It helped me negotiate a better offer.' },
    { id: 4, name: 'David Kim', role: 'Frontend Developer at Netflix', avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=f59e0b&color=fff&size=128', text: 'The application process was smooth and straightforward. I could track all my applications in one place.' },
    { id: 5, name: 'Jessica Williams', role: 'Marketing Manager at Amazon', avatar: 'https://ui-avatars.com/api/?name=Jessica+Williams&background=ec4899&color=fff&size=128', text: 'As someone transitioning careers, the skill assessments helped me identify gaps and land my dream role.' }
];

// Initialize jobs in localStorage
function initData() {
    if (!localStorage.getItem('jobs')) {
        localStorage.setItem('jobs', JSON.stringify(JOBS));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}

// Get jobs
function getAllJobs() {
    const stored = localStorage.getItem('jobs');
    return stored ? JSON.parse(stored) : JOBS;
}

// Get job by ID
function getJobById(id) {
    const jobs = getAllJobs();
    return jobs.find(job => job.id === id);
}

// Add new job
function addJob(job) {
    const jobs = getAllJobs();
    const newJob = { ...job, id: 'job-' + Date.now(), postedDate: Date.now() };
    jobs.unshift(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    return newJob;
}

// Delete job
function deleteJob(id) {
    const jobs = getAllJobs();
    const filtered = jobs.filter(job => job.id !== id);
    localStorage.setItem('jobs', JSON.stringify(filtered));
}

// Get users
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Save current user
function saveCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Remove current user
function removeCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Format salary
function formatSalary(salary) {
    if (!salary) return 'Salary not specified';
    const min = salary.min ? salary.min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
    const max = salary.max ? salary.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
    return '$' + min + ' - $' + max;
}

// Format relative time
function formatRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return days + ' days ago';
    if (days < 30) return Math.floor(days / 7) + ' weeks ago';
    return Math.floor(days / 30) + ' months ago';
}

// Get experience label
function getExperienceLabel(level) {
    const labels = { 'entry': 'Entry Level', 'mid': 'Mid Level', 'senior': 'Senior Level', 'lead': 'Lead / Manager' };
    return labels[level] || level;
}

// Get job type label
function getJobTypeLabel(type) {
    const labels = { 'full-time': 'Full Time', 'part-time': 'Part Time', 'contract': 'Contract', 'internship': 'Internship', 'freelance': 'Freelance' };
    return labels[type] || type;
}

// Escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Generate ID
function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

// Initialize on load
initData();
