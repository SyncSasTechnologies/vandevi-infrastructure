import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Disable sharp file handle caching to prevent file locking issues on Windows and in memory-constrained containers
sharp.cache(false);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project images storage directory (server/uploads/projects)
const PROJECTS_UPLOAD_DIR = path.resolve(__dirname, '../../../uploads/projects');

export interface ProcessedProjectMedia {
  imageUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export class MediaService {
  /**
   * Initializes and ensures the destination upload directory exists.
   */
  static async ensureUploadDir(): Promise<void> {
    try {
      await fs.mkdir(PROJECTS_UPLOAD_DIR, { recursive: true });
    } catch (error) {
      console.error('Failed to create project uploads directory:', error);
      throw error;
    }
  }

  /**
   * Processes an uploaded image buffer:
   * 1. Decodes and validates image format (throws if corrupted or spoofed)
   * 2. Auto-rotates based on EXIF orientation
   * 3. Strips all EXIF metadata (eliminates GPS and device telemetry)
   * 4. Encodes a high-fidelity display version (max 1920px width WebP)
   * 5. Encodes an efficient thumbnail version (max 600px width WebP)
   */
  static async processProjectImage(
    buffer: Buffer
  ): Promise<ProcessedProjectMedia> {
    await this.ensureUploadDir();

    // 1. Validate image and read metadata
    const imageInstance = sharp(buffer);
    const metadata = await imageInstance.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Invalid or unreadable image file.');
    }

    // 2. Generate secure unique filename base
    const timestamp = Date.now();
    const entropy = crypto.randomBytes(6).toString('hex');
    const fileBase = `proj-${timestamp}-${entropy}`;

    const displayFilename = `${fileBase}-display.webp`;
    const thumbFilename = `${fileBase}-thumb.webp`;

    const displayFilePath = path.join(PROJECTS_UPLOAD_DIR, displayFilename);
    const thumbFilePath = path.join(PROJECTS_UPLOAD_DIR, thumbFilename);

    // 3. Process Display Rendition (Max 1920px width, WebP quality 82, EXIF stripped)
    await sharp(buffer)
      .rotate() // Auto-orient based on EXIF orientation
      .resize({
        width: 1920,
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 82, effort: 4 })
      .toFile(displayFilePath);

    // 4. Process Thumbnail Rendition (Max 600px width, WebP quality 75, EXIF stripped)
    await sharp(buffer)
      .rotate()
      .resize({
        width: 600,
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 75, effort: 4 })
      .toFile(thumbFilePath);

    // 5. Calculate aspect ratio representation
    const width = metadata.width;
    const height = metadata.height;
    const ratioNumeric = (width / height).toFixed(2);

    return {
      imageUrl: `/uploads/projects/${displayFilename}`,
      thumbnailUrl: `/uploads/projects/${thumbFilename}`,
      width,
      height,
      aspectRatio: ratioNumeric
    };
  }

  /**
   * Safely deletes local project images.
   * Enforces path confinement within the PROJECTS_UPLOAD_DIR to prevent directory traversal.
   */
  static async deleteProjectImageFiles(relativeUrls: (string | undefined | null)[]): Promise<void> {
    for (const url of relativeUrls) {
      if (!url || typeof url !== 'string') continue;

      // Only delete files that target /uploads/projects/
      if (!url.startsWith('/uploads/projects/')) continue;

      const filename = path.basename(url);
      const targetPath = path.resolve(PROJECTS_UPLOAD_DIR, filename);

      // Security check: ensure target path is strictly inside PROJECTS_UPLOAD_DIR
      if (!targetPath.startsWith(PROJECTS_UPLOAD_DIR)) {
        console.warn(`Blocked potential directory traversal deletion attempt: ${url}`);
        continue;
      }

      try {
        await fs.unlink(targetPath);
      } catch (err: any) {
        // ENOENT means file already doesn't exist, ignore
        if (err.code !== 'ENOENT') {
          console.error(`Error deleting project asset (${targetPath}):`, err);
        }
      }
    }
  }
}
