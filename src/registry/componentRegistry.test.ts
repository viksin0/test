import { describe, it, expect } from 'vitest';
import { getComponent, getAvailableComponents } from '../registry/componentRegistry';

describe('componentRegistry', () => {
  describe('getComponent', () => {
    it('should return a component for valid name', () => {
      const component = getComponent('ResourceCard');
      expect(component).toBeTruthy();
    });

    it('should return null for invalid component name', () => {
      const component = getComponent('NonExistentComponent');
      expect(component).toBeNull();
    });

    it('should return components for common Fluent UI names', () => {
      expect(getComponent('Button')).toBeTruthy();
      expect(getComponent('TextField')).toBeTruthy();
      expect(getComponent('Dropdown')).toBeTruthy();
      expect(getComponent('Toggle')).toBeTruthy();
    });

    it('should return components for Azure-specific names', () => {
      expect(getComponent('BladeHeader')).toBeTruthy();
      expect(getComponent('Essentials')).toBeTruthy();
      expect(getComponent('MetricCard')).toBeTruthy();
      expect(getComponent('SectionControl')).toBeTruthy();
    });
  });

  describe('getAvailableComponents', () => {
    it('should return an array of component names', () => {
      const components = getAvailableComponents();
      expect(Array.isArray(components)).toBe(true);
      expect(components.length).toBeGreaterThan(0);
    });

    it('should include Azure components', () => {
      const components = getAvailableComponents();
      expect(components).toContain('ResourceCard');
      expect(components).toContain('BladeHeader');
      expect(components).toContain('Essentials');
    });

    it('should include Fluent UI components', () => {
      const components = getAvailableComponents();
      expect(components).toContain('Button');
      expect(components).toContain('TextField');
      expect(components).toContain('Stack');
    });

    it('should return sorted component names', () => {
      const components = getAvailableComponents();
      const sorted = [...components].sort();
      expect(components).toEqual(sorted);
    });

    it('should have at least 40 components', () => {
      const components = getAvailableComponents();
      expect(components.length).toBeGreaterThanOrEqual(40);
    });
  });
});
