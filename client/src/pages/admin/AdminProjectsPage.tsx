import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  FolderOpen,
  Star,
  CheckCircle2,
  EyeOff,
  AlertTriangle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../features/projects/hooks/useProjects';
import { useProjectMutations } from '../../features/projects/hooks/useProjectMutations';
import { ProjectUploadModal } from '../../features/projects/components/ProjectUploadModal';
import {
  TARGET_SERVICES,
  ALL_FILTER_TAGS,
  type Project
} from '../../features/projects/types/project.types';
import { getMediaUrl } from '../../shared/utils/mediaUrl';
import { Badge } from '../../shared/components/Badge';

export const AdminProjectsPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const { data, isLoading, isError, refetch } = useProjects({
    service: selectedService === 'all' ? undefined : selectedService,
    tag: selectedTag === 'all' ? undefined : selectedTag
  });

  const { deleteProject, isDeleting } = useProjectMutations();

  const allProjects = data?.projects || [];

  // Filter projects by search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return allProjects;
    const query = searchQuery.toLowerCase().trim();
    return allProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.filterTag && p.filterTag.toLowerCase().includes(query)) ||
        (p.slug && p.slug.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
    );
  }, [allProjects, searchQuery]);

  const handleOpenCreateModal = () => {
    setProjectToEdit(null);
    setIsUploadModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setProjectToEdit(project);
    setIsUploadModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete._id);
      setProjectToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  return (
    <div className="flex flex-col gap-8 font-montserrat">
      {/* 1. Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-2xl sm:text-3xl text-soft-charcoal tracking-tight">
              Projects &amp; Portfolio
            </h1>
            <span className="px-2.5 py-0.5 rounded-pill bg-sand-beige/40 text-stone-taupe text-xs font-semibold">
              {allProjects.length} {allProjects.length === 1 ? 'Concept' : 'Concepts'}
            </span>
          </div>
          <p className="text-stone-taupe text-sm mt-1">
            Upload images, select which service page displays them, and set visitor search tags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-pill border border-stone-taupe/30 hover:border-soft-charcoal text-soft-charcoal text-xs font-semibold transition-colors"
          >
            <span>Live Projects Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-soft-charcoal hover:bg-gold text-ivory hover:text-soft-charcoal text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Concept</span>
          </button>
        </div>
      </div>

      {/* 2. Target Service Tabs & Tag Filter Bar */}
      <div className="flex flex-col gap-3 bg-sand-beige/15 p-4 rounded-[18px] border border-stone-taupe/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Target Service Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-taupe mr-1">
              Service:
            </span>
            <button
              type="button"
              onClick={() => setSelectedService('all')}
              className={`px-3 py-1 rounded-pill text-xs font-medium transition-colors cursor-pointer border ${
                selectedService === 'all'
                  ? 'bg-soft-charcoal text-ivory border-soft-charcoal'
                  : 'bg-white text-soft-charcoal border-stone-taupe/20 hover:border-stone-taupe/60'
              }`}
            >
              All Services
            </button>

            {TARGET_SERVICES.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedService(srv.id)}
                className={`px-3 py-1 rounded-pill text-xs font-medium transition-colors cursor-pointer border ${
                  selectedService === srv.id
                    ? 'bg-soft-charcoal text-ivory border-soft-charcoal'
                    : 'bg-white text-soft-charcoal border-stone-taupe/20 hover:border-stone-taupe/60'
                }`}
              >
                {srv.label}
              </button>
            ))}
          </div>

          {/* Tag Dropdown & Search */}
          <div className="flex items-center gap-3">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-pill border border-stone-taupe/30 bg-white text-soft-charcoal focus:border-gold focus:outline-none"
            >
              <option value="all">All Filter Tags</option>
              {ALL_FILTER_TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-stone-taupe absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-pill border border-stone-taupe/30 bg-white text-soft-charcoal focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-sand-beige/25 rounded-[20px] border border-stone-taupe/20 p-4 animate-pulse flex flex-col gap-3"
            >
              <div className="aspect-[4/3] rounded-[14px] bg-sand-beige/50" />
              <div className="h-4 bg-sand-beige/60 rounded w-3/4" />
              <div className="h-3 bg-sand-beige/40 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* 4. Error State */}
      {isError && (
        <div className="p-8 text-center bg-sand-beige/20 border border-stone-taupe/30 rounded-[20px]">
          <p className="text-soft-charcoal font-semibold mb-2">Unable to connect to the Projects API.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-5 py-2 rounded-pill bg-soft-charcoal text-ivory text-xs font-semibold hover:bg-gold hover:text-soft-charcoal transition-all"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* 5. Empty State */}
      {!isLoading && !isError && filteredProjects.length === 0 && (
        <div className="py-20 px-6 text-center bg-ivory border border-stone-taupe/25 rounded-[24px] flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-sand-beige/40 text-soft-charcoal flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8 text-stone-taupe" />
          </div>
          <h3 className="font-semibold text-lg text-soft-charcoal mb-2">
            {searchQuery || selectedService !== 'all' || selectedTag !== 'all'
              ? 'No Matching Concepts'
              : 'No Portfolio Concepts Uploaded Yet'}
          </h3>
          <p className="text-stone-taupe text-sm max-w-md mx-auto mb-6">
            Upload your high-resolution architectural images. Select which service page displays them and pick their visitor filter tag.
          </p>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill bg-soft-charcoal hover:bg-gold text-ivory hover:text-soft-charcoal text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Upload First Project Concept</span>
          </button>
        </div>
      )}

      {/* 6. Projects Responsive Grid */}
      {!isLoading && !isError && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const displayImg = getMediaUrl(project.thumbnailUrl || project.imageUrl);
            return (
              <div
                key={project._id}
                className="bg-white border border-stone-taupe/25 rounded-[20px] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
              >
                <div>
                  {/* Image Preview */}
                  <div className="relative aspect-[4/3] bg-sand-beige/25 overflow-hidden">
                    <img
                      src={displayImg}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Featured Star Badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 bg-soft-charcoal/85 backdrop-blur-xs text-gold px-2.5 py-1 rounded-pill flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider border border-gold/30">
                        <Star className="w-3 h-3 fill-gold" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Publish Status Pill */}
                    <div className="absolute top-3 right-3">
                      {project.isPublished ? (
                        <span className="bg-emerald-600/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-pill text-[10px] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Live
                        </span>
                      ) : (
                        <span className="bg-amber-600/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-pill text-[10px] font-semibold flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-5">
                    {/* Visitor Tag & Target Services */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                      <Badge variant="default" className="text-[11px] font-semibold">
                        {project.filterTag || project.category}
                      </Badge>

                      {project.targetServices &&
                        project.targetServices.map((srvId) => {
                          const srv = TARGET_SERVICES.find((s) => s.id === srvId);
                          return (
                            <span
                              key={srvId}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-pill bg-sand-beige/35 text-soft-charcoal border border-stone-taupe/20"
                            >
                              {srv?.label || srvId}
                            </span>
                          );
                        })}
                    </div>

                    <h3 className="font-semibold text-base text-soft-charcoal leading-snug line-clamp-1 mb-1">
                      {project.title}
                    </h3>

                    {/* Auto Slug display */}
                    <p className="text-[11px] text-stone-taupe/80 font-mono mb-2">
                      /projects/{project.slug}
                    </p>

                    {project.description ? (
                      <p className="text-xs text-stone-taupe line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    ) : (
                      <p className="text-xs text-stone-taupe/50 italic">
                        No description provided.
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 py-3.5 border-t border-stone-taupe/15 bg-sand-beige/10 flex items-center justify-between">
                  <span className="text-[11px] text-stone-taupe">
                    {new Date(project.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(project)}
                      aria-label={`Edit ${project.title}`}
                      className="p-2 rounded-full hover:bg-stone-taupe/15 text-soft-charcoal transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 text-stone-taupe hover:text-soft-charcoal" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setProjectToDelete(project)}
                      aria-label={`Delete ${project.title}`}
                      className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 7. Upload / Edit Project Modal */}
      <ProjectUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        projectToEdit={projectToEdit}
      />

      {/* 8. Delete Confirmation Dialog */}
      {projectToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-soft-charcoal/80 backdrop-blur-xs animate-fade-in"
        >
          <div className="bg-ivory border border-stone-taupe/30 rounded-[22px] max-w-md w-full p-6 shadow-2xl font-montserrat">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-lg text-soft-charcoal">
                Delete Project Concept?
              </h3>
            </div>

            <p className="text-xs text-stone-taupe leading-relaxed mb-6">
              Are you sure you want to permanently delete &ldquo;{projectToDelete.title}&rdquo;?
              This will remove the concept from MongoDB and delete its WebP media files from local storage.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-pill border border-stone-taupe/30 text-xs font-semibold text-soft-charcoal hover:bg-stone-taupe/10"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-pill bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors disabled:opacity-60"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
