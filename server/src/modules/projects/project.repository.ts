import { ProjectModel, IProject } from './project.model.js';

export class ProjectRepository {
  static async find(
    filter: Record<string, unknown>,
    options: { skip?: number; limit?: number; sort?: Record<string, 1 | -1> } = {}
  ): Promise<IProject[]> {
    const { skip = 0, limit = 50, sort = { order: 1, createdAt: -1 } } = options;
    return ProjectModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean<IProject[]>()
      .exec();
  }

  static async count(filter: Record<string, unknown>): Promise<number> {
    return ProjectModel.countDocuments(filter).exec();
  }

  static async findById(id: string): Promise<IProject | null> {
    return ProjectModel.findById(id).lean<IProject>().exec();
  }

  static async create(data: Partial<IProject>): Promise<IProject> {
    const project = new ProjectModel(data);
    return project.save();
  }

  static async update(id: string, data: Partial<IProject>): Promise<IProject | null> {
    return ProjectModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .lean<IProject>()
      .exec();
  }

  static async delete(id: string): Promise<IProject | null> {
    return ProjectModel.findByIdAndDelete(id).lean<IProject>().exec();
  }
}

