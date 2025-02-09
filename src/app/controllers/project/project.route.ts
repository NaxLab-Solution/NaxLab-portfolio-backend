import { Router } from 'express';
import { ProjectControllers } from './project.controller';
import upload from '../../utils/multer';
import validateRequest from '../../middlewares/validateRequest';
import { projectValidationSchema } from '../../model/validations/project.validation';

const project = Router();

// Routes
// Get all projects
project.get('/', ProjectControllers.GetProjects);

// Get a specific project by ID
project.get('/:id', ProjectControllers.GetProjectById);

// Create a new project 
project.post(
    '/create',
    upload.fields([
        {name:"primary_image", maxCount:1},
        {name:"secondary_image", maxCount:1},
    ]), // Upload multiple images
    validateRequest(projectValidationSchema),
    ProjectControllers.CreateProject
);

// Update an existing project 
project.put(
    '/:id',
    upload.fields([
        {name:"primary_image", maxCount:1},
        {name:"secondary_image", maxCount:1},
    ]), // Upload multiple images
    validateRequest(projectValidationSchema),
    ProjectControllers.UpdateProject
);

// Delete a project by ID
project.delete('/:id', ProjectControllers.DeleteProject);

export const ProjectRoutes = project;
