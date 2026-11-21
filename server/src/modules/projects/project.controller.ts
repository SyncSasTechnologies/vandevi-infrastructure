import { Request, Response, NextFunction } from 'express';
import { ProjectService } from './project.service.js';
import {
  createProjectSchema,
  updateProjectSchema,
  projectQuerySchema
} from './project.schema.js';
import { ApiResponse } from '../../shared/utils/apiResponse.js';

export class ProjectController {
  static async getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryValidation = projectQuerySchema.safeParse(req.query);
      if (!queryValidation.success) {
        ApiResponse.error(res, 'Invalid query parameters', 400, queryValidation.error.issues);
        return;
      }

      const result = await ProjectService.getProjects(queryValidation.data);
      ApiResponse.success(res, result, 'Projects retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getProjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const project = await ProjectService.getProjectById(id);
      ApiResponse.success(res, project, 'Project retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validation = createProjectSchema.safeParse(req.body);
      if (!validation.success) {
        ApiResponse.error(res, 'Validation failed', 400, validation.error.issues);
        return;
      }

      const project = await ProjectService.createProject(validation.data);
      ApiResponse.created(res, project, 'Project created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const validation = updateProjectSchema.safeParse(req.body);
      if (!validation.success) {
        ApiResponse.error(res, 'Validation failed', 400, validation.error.issues);
        return;
      }

      const updated = await ProjectService.updateProject(id, validation.data);
      ApiResponse.success(res, updated, 'Project updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const result = await ProjectService.deleteProject(id);
      ApiResponse.success(res, result, 'Project deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

