import { describe, it, expect } from 'vitest';
import { presets, getPresetById, getPresetNames } from '../presets';

describe('presets', () => {
  it('should have at least 6 presets', () => {
    expect(presets.length).toBeGreaterThanOrEqual(6);
  });

  it('should have all required preset types', () => {
    const presetIds = presets.map(p => p.id);
    expect(presetIds).toContain('vm-overview');
    expect(presetIds).toContain('storage-account');
    expect(presetIds).toContain('dashboard');
    expect(presetIds).toContain('table-view');
    expect(presetIds).toContain('form');
    expect(presetIds).toContain('blade');
  });

  it('should have valid structure for each preset', () => {
    presets.forEach(preset => {
      expect(preset).toHaveProperty('id');
      expect(preset).toHaveProperty('name');
      expect(preset).toHaveProperty('description');
      expect(preset).toHaveProperty('config');
      expect(preset.config).toHaveProperty('name');
      expect(preset.config).toHaveProperty('layout');
      expect(preset.config.layout).toHaveProperty('type');
      expect(preset.config.layout).toHaveProperty('components');
      expect(Array.isArray(preset.config.layout.components)).toBe(true);
    });
  });

  describe('getPresetById', () => {
    it('should return preset for valid id', () => {
      const preset = getPresetById('vm-overview');
      expect(preset).toBeTruthy();
      expect(preset?.id).toBe('vm-overview');
      expect(preset?.name).toBe('Virtual Machine Overview');
    });

    it('should return undefined for invalid id', () => {
      const preset = getPresetById('non-existent');
      expect(preset).toBeUndefined();
    });

    it('should return all documented presets', () => {
      expect(getPresetById('vm-overview')).toBeTruthy();
      expect(getPresetById('storage-account')).toBeTruthy();
      expect(getPresetById('dashboard')).toBeTruthy();
      expect(getPresetById('table-view')).toBeTruthy();
      expect(getPresetById('form')).toBeTruthy();
      expect(getPresetById('blade')).toBeTruthy();
    });
  });

  describe('getPresetNames', () => {
    it('should return array of preset options', () => {
      const names = getPresetNames();
      expect(Array.isArray(names)).toBe(true);
      expect(names.length).toBe(presets.length);
    });

    it('should have correct structure for dropdown options', () => {
      const names = getPresetNames();
      names.forEach(option => {
        expect(option).toHaveProperty('key');
        expect(option).toHaveProperty('text');
        expect(typeof option.key).toBe('string');
        expect(typeof option.text).toBe('string');
      });
    });

    it('should include all preset names', () => {
      const names = getPresetNames();
      const texts = names.map(n => n.text);
      expect(texts).toContain('Virtual Machine Overview');
      expect(texts).toContain('Storage Account');
      expect(texts).toContain('Dashboard Tiles');
    });
  });
});
