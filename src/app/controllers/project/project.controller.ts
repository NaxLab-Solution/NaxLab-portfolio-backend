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
    const projects = await _projectRepository.findAll({}, 'tag');
    if (!projects || projects.length === 0) {
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'No project founds',
            data: projects,
        });
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
    
    let primary_image: string = "";
    let secondary_image: string = "";

    // Check if images were uploaded and process them as base64 strings
    if (req.files) {
        // images = req.files.map((file: Express.Multer.File) => file.buffer.toString('base64'));
        primary_image = (req.files as { [fieldname: string]: Express.Multer.File[] })["primary_image"][0].buffer.toString('base64');
        secondary_image = (req.files as { [fieldname: string]: Express.Multer.File[] })["secondary_image"][0].buffer.toString('base64');
        
    }
    const {tag} = req.body
    if(!Array.isArray(tag)){
        return next(new ErrorHandler("Tags needs to be an array", 400));
    }
    const newProject = await _projectRepository.create({...req.body, primary_image:primary_image, secondary_image:secondary_image});
    // const newProject = req.files;

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
    let primary_image: string = "";
    let secondary_image: string = "";
    if (req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files["primary_image"] && files["primary_image"].length > 0) {
            primary_image = files["primary_image"][0].buffer.toString('base64');
        }
        if (files["secondary_image"] && files["secondary_image"].length > 0) {
            secondary_image = files["secondary_image"][0].buffer.toString('base64');
        }
    }

    // Only include the images in req.body if they are defined
    if (primary_image) req.body["primary_image"] = primary_image;
    if (secondary_image) req.body["secondary_image"] = secondary_image;

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
