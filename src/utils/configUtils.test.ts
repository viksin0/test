import { describe, it, expect } from 'vitest';
import { parseConfig, validateConfig, stringifyConfig } from '../utils/configUtils';
import { PlaygroundConfig } from '../types';

describe('configUtils', () => {
  describe('parseConfig', () => {
    it('should parse valid JSON config', () => {
      const jsonStr = JSON.stringify({
        name: 'Test',
        layout: {
          type: 'dashboard',
          components: []
        }
      });
      
      const result = parseConfig(jsonStr);
      expect(result).toBeTruthy();
      expect(result?.name).toBe('Test');
      expect(result?.layout.type).toBe('dashboard');
    });

    it('should return null for invalid JSON and YAML', () => {
      // This is invalid for both JSON and YAML parsers
      const result = parseConfig('[[[invalid');
      expect(result).toBeNull();
    });

    it('should parse valid YAML config', () => {
      const yamlStr = `
name: Test
layout:
  type: dashboard
  components: []
`;
      const result = parseConfig(yamlStr);
      expect(result).toBeTruthy();
      expect(result?.name).toBe('Test');
    });
  });

  describe('validateConfig', () => {
    it('should validate correct config structure', () => {
      const config: PlaygroundConfig = {
        name: 'Test',
        layout: {
          type: 'dashboard',
          components: []
        }
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing layout', () => {
      const config = {
        name: 'Test'
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should detect missing layout.type', () => {
      const config = {
        name: 'Test',
        layout: {
          components: []
        }
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing "layout.type" property');
    });

    it('should detect missing layout.components', () => {
      const config = {
        name: 'Test',
        layout: {
          type: 'dashboard'
        }
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing or invalid "layout.components" array');
    });
  });

  describe('stringifyConfig', () => {
    it('should stringify config to JSON', () => {
      const config: PlaygroundConfig = {
        name: 'Test',
        layout: {
          type: 'dashboard',
          components: []
        }
      };

      const result = stringifyConfig(config);
      expect(result).toContain('"name": "Test"');
      expect(result).toContain('"type": "dashboard"');
    });

    it('should format JSON prettily by default', () => {
      const config: PlaygroundConfig = {
        name: 'Test',
        layout: {
          type: 'dashboard',
          components: []
        }
      };

      const result = stringifyConfig(config);
      expect(result).toContain('\n');
      expect(result).toContain('  ');
    });

    it('should format JSON compactly when pretty is false', () => {
      const config: PlaygroundConfig = {
        name: 'Test',
        layout: {
          type: 'dashboard',
          components: []
        }
      };

      const result = stringifyConfig(config, false);
      expect(result).not.toContain('\n  ');
    });
  });
});
