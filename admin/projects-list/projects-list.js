// import { ProjectApi } from '../../api/projects.api.js'

// const projectsApi = new ProjectApi;

// Start ! ----------
console.log('START ! ')
projectsApi.getProjects().then(projects => {
    projects.forEach(project => {
        console.log(project);
    });
}).catch(e => console.error(e));