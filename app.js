// ========================================
// JobHunt Pro - Main Application
// ========================================

const App = {
    init() {
        // Initialize modules
        this.initData();
        this.initAuth();
        this.initUI();
        this.initJobs();
        this.handleURLParams();
        
        console.log('JobHunt Pro initialized successfully!');
    },
    
    initData() {
        // Initialize default data if needed
        initializeJobs();
    },
    
    initAuth() {
        Auth.init();
    },
    
    initUI() {
        UI.init();
    },
    
    initJobs() {
        Jobs.init();
    },
    
    handleURLParams() {
        const params = Utils.getURLParams();
        
        // Check for job parameter
        if (params.job) {
            const job = DataManager.getJobById(params.job);
            if (job) {
                setTimeout(() => {
                    Jobs.showJobDetails(params.job);
                }, 500);
            }
        }
        
        // Check for action parameter
        if (params.action) {
            setTimeout(() => {
                switch (params.action) {
                    case 'login':
                        UI.openModal('loginModal');
                        break;
                    case 'register':
                        UI.openModal('registerModal');
                        break;
                    case 'post-job':
                        UI.openPostJob();
                        break;
                    case 'dashboard':
                        UI.openDashboard();
                        break;
                }
            }, 500);
        }
        
        // Clear URL params
        if (params.job || params.action) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Make App available globally
window.App = App;
