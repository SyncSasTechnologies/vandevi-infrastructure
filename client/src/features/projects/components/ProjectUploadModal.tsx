import React, { useState, useRef, useEffect } from 'react';
import { X, UploadCloud, Loader2, AlertCircle, Check, Globe } from 'lucide-react';
import {
  TARGET_SERVICES,
  FILTER_TAG_GROUPS,
  ALL_FILTER_TAGS,
  type Project,
  type TargetServiceId,
  type FilterTag
} from '../types/project.types';
import { useProjectMutations } from '../hooks/useProjectMutations';
import { getMediaUrl } from '../../../shared/utils/mediaUrl';

interface ProjectUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: Project | null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const ProjectUploadModal: React.FC<ProjectUploadModalProps> = ({
  isOpen,
  onClose,
  projectToEdit
}) => {
  const isEditing = Boolean(projectToEdit);
  const { createProject, updateProject, isCreating, isUpdating } = useProjectMutations();
  const isSubmitting = isCreating || isUpdating;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState<TargetServiceId[]>(['residential']);
  const [filterTag, setFilterTag] = useState<FilterTag>(ALL_FILTER_TAGS[0]);
  const [featured, setFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize or reset form state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (projectToEdit) {
        setTitle(projectToEdit.title);
        setSlug(projectToEdit.slug || slugify(projectToEdit.title));
        setIsCustomSlug(Boolean(projectToEdit.slug));
        setDescription(projectToEdit.description || '');
        setSelectedServices(
          projectToEdit.targetServices && projectToEdit.targetServices.length > 0
            ? projectToEdit.targetServices
            : ['residential']
        );
        setFilterTag(projectToEdit.filterTag || (projectToEdit.category as FilterTag) || ALL_FILTER_TAGS[0]);
        setFeatured(projectToEdit.featured ?? false);
        setIsPublished(projectToEdit.isPublished ?? true);
        setSelectedFile(null);
        setPreviewUrl(getMediaUrl(projectToEdit.imageUrl || projectToEdit.thumbnailUrl));
      } else {
        setTitle('');
        setSlug('');
        setIsCustomSlug(false);
        setDescription('');
        setSelectedServices(['residential']);
        setFilterTag(ALL_FILTER_TAGS[0]);
        setFeatured(false);
        setIsPublished(true);
        setSelectedFile(null);
        setPreviewUrl(null);
      }
      setFormError(null);
    }
  }, [isOpen, projectToEdit]);

  // Handle title change and auto-generate slug unless manually modified
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isCustomSlug) {
      setSlug(slugify(val));
    }
  };

  // Toggle target service
  const handleToggleService = (serviceId: TargetServiceId) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        // Keep at least one service selected
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Lock scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !isSubmitting) {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    const validMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validMimes.includes(file.type)) {
      setFormError('Please upload a valid JPEG, PNG, or WebP image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFormError('Image size exceeds 10MB limit. Please select a smaller photo.');
      return;
    }

    setFormError(null);
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Please enter a project title.');
      return;
    }

    if (selectedServices.length === 0) {
      setFormError('Please select at least one service page where this image should be displayed.');
      return;
    }

    if (!isEditing && !selectedFile) {
      setFormError('Please select or drop an architectural photo to upload.');
      return;
    }

    try {
      const finalSlug = slug.trim() ? slugify(slug) : slugify(title);

      if (isEditing && projectToEdit) {
        await updateProject({
          id: projectToEdit._id,
          title,
          slug: finalSlug,
          description,
          targetServices: selectedServices,
          filterTag,
          featured,
          isPublished,
          imageFile: selectedFile || undefined
        });
      } else if (selectedFile) {
        await createProject({
          title,
          slug: finalSlug,
          description,
          targetServices: selectedServices,
          filterTag,
          featured,
          isPublished,
          imageFile: selectedFile
        });
      }

      onClose();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save project concept.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
    >
      {/* Dark Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-soft-charcoal/85 backdrop-blur-xs transition-opacity"
        onClick={() => !isSubmitting && onClose()}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 bg-ivory border border-stone-taupe/30 rounded-[24px] max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-montserrat my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-taupe/20 flex items-center justify-between bg-ivory shrink-0">
          <div>
            <h2 className="font-semibold text-lg sm:text-xl text-soft-charcoal tracking-tight">
              {isEditing ? 'Edit Project Concept' : 'Upload & Categorize Project'}
            </h2>
            <p className="text-xs text-stone-taupe mt-0.5">
              Select which service page receives this image, and pick its visitor filter tag.
            </p>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-soft-charcoal/10 hover:bg-soft-charcoal hover:text-ivory text-soft-charcoal flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex flex-col gap-5">
          {formError && (
            <div className="p-3.5 rounded-[12px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* 1. Image Upload Dropzone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-soft-charcoal mb-2">
              Architectural Photo {isEditing ? '(Optional to replace)' : '(Required)'}
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-[16px] p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[160px] ${
                isDragging
                  ? 'border-gold bg-gold/10'
                  : previewUrl
                  ? 'border-stone-taupe/40 bg-sand-beige/20'
                  : 'border-stone-taupe/30 hover:border-gold bg-sand-beige/10 hover:bg-sand-beige/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              {previewUrl ? (
                <div className="flex flex-col items-center gap-2.5 w-full">
                  <div className="relative max-h-44 rounded-[12px] overflow-hidden border border-stone-taupe/30 shadow-xs">
                    <img
                      src={previewUrl}
                      alt="Selected preview"
                      className="max-h-44 w-auto object-contain"
                    />
                  </div>
                  <p className="text-xs text-soft-charcoal font-medium">
                    {selectedFile ? selectedFile.name : 'Current concept image'} (Click or drop to replace)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-stone-taupe">
                  <div className="w-11 h-11 rounded-full bg-sand-beige/40 flex items-center justify-center text-soft-charcoal">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-soft-charcoal text-xs">
                      Click to browse
                    </span>{' '}
                    or drag &amp; drop an image here
                  </div>
                  <span className="text-[10px] text-stone-taupe/80">
                    PNG, JPEG, or WebP (up to 10MB)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Project Title & Auto-Generated Slug */}
          <div className="flex flex-col gap-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-soft-charcoal mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                maxLength={120}
                placeholder="e.g., Travertine &amp; Oak Minimalist Living"
                value={title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2.5 rounded-[10px] border border-stone-taupe/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold bg-white text-soft-charcoal text-sm"
              />
            </div>

            {/* Auto-generated Slug Pill */}
            <div className="flex items-center gap-2 text-xs text-stone-taupe bg-sand-beige/25 px-3 py-1.5 rounded-[8px] border border-stone-taupe/20">
              <Globe className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="font-medium text-[11px] text-soft-charcoal/70">Auto URL Slug:</span>
              <span className="font-mono text-soft-charcoal font-semibold text-[11px]">
                /projects/{slug || 'auto-generated-slug'}
              </span>
            </div>
          </div>

          {/* 3. Destination: Target Service Pages (Click to select - Zero Typing) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-soft-charcoal">
                Target Service Pages * (Where this image appears)
              </label>
              <span className="text-[10px] text-stone-taupe">Select one or more</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TARGET_SERVICES.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => handleToggleService(srv.id)}
                    className={`px-3.5 py-2.5 rounded-[12px] border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-soft-charcoal text-ivory border-soft-charcoal shadow-xs'
                        : 'bg-white text-soft-charcoal border-stone-taupe/25 hover:border-gold'
                    }`}
                  >
                    <span className="text-xs font-semibold">{srv.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'bg-gold border-gold text-soft-charcoal'
                          : 'border-stone-taupe/40 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Discovery: Visitor Filter Tag (Select from list - Zero Typing) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-soft-charcoal mb-1.5">
              Visitor Filter Tag * (For search on /projects page)
            </label>

            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value as FilterTag)}
              className="w-full px-4 py-2.5 rounded-[10px] border border-stone-taupe/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold bg-white text-soft-charcoal text-sm cursor-pointer"
            >
              {FILTER_TAG_GROUPS.map((group) => (
                <optgroup key={group.group} label={`── ${group.group} ──`}>
                  {group.tags.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* 5. Architectural Narrative (Optional) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-soft-charcoal mb-1.5">
              Architectural Concept Narrative (Optional)
            </label>
            <textarea
              rows={2}
              maxLength={2000}
              placeholder="Material specs, spatial layout highlights, lighting nuances..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-[10px] border border-stone-taupe/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold bg-white text-soft-charcoal text-sm resize-none"
            />
          </div>

          {/* 6. Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-center gap-3 p-3 rounded-[12px] bg-sand-beige/20 border border-stone-taupe/20 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-gold rounded border-stone-taupe/40 focus:ring-gold cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-soft-charcoal block">Featured Concept</span>
                <span className="text-[10px] text-stone-taupe">Highlight in featured carousels</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-[12px] bg-sand-beige/20 border border-stone-taupe/20 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-gold rounded border-stone-taupe/40 focus:ring-gold cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-soft-charcoal block">Publish Concept</span>
                <span className="text-[10px] text-stone-taupe">Make visible publicly</span>
              </div>
            </label>
          </div>

          {/* 7. Action Buttons */}
          <div className="pt-3 border-t border-stone-taupe/20 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-5 py-2.5 rounded-pill border border-stone-taupe/30 text-soft-charcoal hover:bg-stone-taupe/10 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill bg-soft-charcoal hover:bg-gold text-ivory hover:text-soft-charcoal text-xs font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  <span>Optimizing WebP &amp; Saving...</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Upload & Route Concept'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
