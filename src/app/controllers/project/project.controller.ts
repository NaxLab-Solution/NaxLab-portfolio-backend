// project.controller.ts

import { RequestHandler } from 'express';
import { ProjectModel } from '../../model/project.model';
import { Repository } from '../../repository/impementation/Repository';
import catchAsync from '../../utils/catchAsync';
import ErrorHandler from '../../utils/ErrorHandler';
import sendResponse from '../../utils/sendResponse';

// Instantiate the repository with the Project model
const _projectRepository = new Repository(ProjectModel);

// Get all projects
const GetProjects: RequestHandler = catchAsync(async (req, res, next) => {
    const projects = await _projectRepository.findAll();
    if (!projects || projects.length === 0) {
        return next(new ErrorHandler('No projects found', 404));
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Projects retrieved successfully',
        data: projects,
    });
});

// Get project by ID
const GetProjectById: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const project = await _projectRepository.findById(id);
    if (!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Project retrieved successfully',
        data: project,
    });
});

// Create a new project
const CreateProject: RequestHandler = catchAsync(async (req, res, next) => {
    
    let images: string[] = [];

    // Check if images were uploaded and process them as base64 strings
    if (req.files && Array.isArray(req.files)) {
        images = req.files.map((file: Express.Multer.File) => file.buffer.toString('base64'));
    }
    const newProject = await _projectRepository.create({...req.body, image:images});

    if (!newProject) {
        return next(new ErrorHandler('Failed to create project', 400));
    }

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Project created successfully',
        data: newProject,
    });
});

// Update project by ID
const UpdateProject: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedProject = await _projectRepository.update(id, req.body);

    if (!updatedProject) {
        return next(new ErrorHandler('Failed to update project', 404));
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Project updated successfully',
        data: updatedProject,
    });
});

// Delete project by ID
const DeleteProject: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProject = await _projectRepository.delete(id);

    if (!deletedProject) {
        return next(new ErrorHandler('Failed to delete project', 404));
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Project deleted successfully',
        data: deletedProject,
    });
});

// Export all controllers
export const ProjectControllers = {
    GetProjects,
    GetProjectById,
    CreateProject,
    UpdateProject,
    DeleteProject,
};
