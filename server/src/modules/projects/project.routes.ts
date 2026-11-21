import { Router } from 'express';
import { ProjectController } from './project.controller.js';
import { authGuard } from '../../shared/middleware/authGuard.js';

const router = Router();

// Public routes for portfolio discovery
router.get('/', ProjectController.getProjects);
router.get('/:id', ProjectController.getProjectById);

// Administrative CRUD operations (Strictly protected by Firebase authGuard)
router.post('/', authGuard, ProjectController.createProject);
router.patch('/:id', authGuard, ProjectController.updateProject);
router.delete('/:id', authGuard, ProjectController.deleteProject);

export const projectRoutes = router;
