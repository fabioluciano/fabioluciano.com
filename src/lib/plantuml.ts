// =============================================================================
// PlantUML Utilities - Build-time diagram rendering
// =============================================================================

import plantumlEncoder from 'plantuml-encoder';
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { getSiteConfig } from '@/config';

// =============================================================================
// Types
// =============================================================================

interface PlantUMLOptions {
  format?: 'svg' | 'png';
  serverUrl?: string;
}

// =============================================================================
// Hash Generation
// =============================================================================

/**
 * Generate a hash for PlantUML code to use as filename
 */
export function generateDiagramHash(code: string): string {
  return createHash('md5').update(code).digest('hex').slice(0, 12);
}

// =============================================================================
// Encoding
// =============================================================================

/**
 * Encode PlantUML code for URL
 */
export function encodePlantUML(code: string): string {
  return plantumlEncoder.encode(code);
}

/**
 * Decode PlantUML code from URL encoding
 */
export function decodePlantUML(encoded: string): string {
  return plantumlEncoder.decode(encoded);
}

// =============================================================================
// URL Generation
// =============================================================================

/**
 * Generate PlantUML server URL for a diagram
 */
export function getPlantUMLUrl(
  code: string,
  options: PlantUMLOptions = {}
): string {
  const config = getSiteConfig();
  const serverUrl = options.serverUrl || config.plantuml.serverUrl;
  const format = options.format || config.plantuml.format;

  const encoded = encodePlantUML(code);

  return `${serverUrl}/${format}/${encoded}`;
}

// =============================================================================
// Build-time Rendering
// =============================================================================

/**
 * Fetch and save diagram from PlantUML server
 */
export async function fetchAndSaveDiagram(
  code: string,
  options: PlantUMLOptions = {}
): Promise<string> {
  const config = getSiteConfig();
  const format = options.format || config.plantuml.format;
  const cacheDir = config.plantuml.cacheDir;

  const hash = generateDiagramHash(code);
  const filename = `${hash}.${format}`;
  const filepath = path.join(process.cwd(), cacheDir, filename);
  const publicPath = `/${cacheDir.replace('public/', '')}/${filename}`;

  // Check if diagram already exists in cache
  if (fs.existsSync(filepath)) {
    return publicPath;
  }

  // Ensure cache directory exists
  const dirPath = path.dirname(filepath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Fetch diagram from server
  const url = getPlantUMLUrl(code, options);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch diagram: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));

    console.log(`[PlantUML] Generated: ${filename}`);
    return publicPath;
  } catch (error) {
    console.error(`[PlantUML] Error generating diagram:`, error);
    throw error;
  }
}

// =============================================================================
// Validation
// =============================================================================

/**
 * Check if a string is valid PlantUML code
 */
export function isValidPlantUML(code: string): boolean {
  const trimmed = code.trim();
  return (
    trimmed.startsWith('@startuml') ||
    trimmed.startsWith('@startmindmap') ||
    trimmed.startsWith('@startwbs') ||
    trimmed.startsWith('@startgantt') ||
    trimmed.startsWith('@startjson') ||
    trimmed.startsWith('@startyaml') ||
    trimmed.startsWith('@startebnf') ||
    trimmed.startsWith('@startregex')
  );
}

/**
 * Extract PlantUML code from markdown code block
 */
export function extractPlantUMLFromCodeBlock(content: string): string[] {
  const regex = /```plantuml\n([\s\S]*?)```/g;
  const matches: string[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1].trim());
  }

  return matches;
}
