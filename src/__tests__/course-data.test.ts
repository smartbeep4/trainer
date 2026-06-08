import { describe, it, expect } from "vitest";
import {
  parts,
  getAllModules,
  getModuleBySlug,
  getModuleById,
  getNextModule,
  getPreviousModule,
  getPartByNumber,
  courseStats,
} from "../lib/course-data";

describe("Course Data Module", () => {
  describe("parts", () => {
    it("has 4 parts", () => {
      expect(parts).toHaveLength(4);
    });

    it("parts are numbered 1-4", () => {
      expect(parts.map((p) => p.number)).toEqual([1, 2, 3, 4]);
    });

    it("each part has modules", () => {
      parts.forEach((part) => {
        expect(part.modules.length).toBeGreaterThan(0);
      });
    });
  });

  describe("getAllModules", () => {
    it("returns 23 modules", () => {
      const modules = getAllModules();
      expect(modules).toHaveLength(23);
    });

    it("modules are in order by id", () => {
      const modules = getAllModules();
      for (let i = 0; i < modules.length - 1; i++) {
        expect(modules[i].id).toBeLessThan(modules[i + 1].id);
      }
    });

    it("all modules have required fields", () => {
      const modules = getAllModules();
      modules.forEach((module) => {
        expect(module.id).toBeDefined();
        expect(module.slug).toBeDefined();
        expect(module.title).toBeDefined();
        expect(module.duration).toBeDefined();
        expect(module.difficulty).toBeDefined();
        expect(module.part).toBeDefined();
        expect(module.partTitle).toBeDefined();
        expect(module.description).toBeDefined();
      });
    });
  });

  describe("getModuleBySlug", () => {
    it("returns module for valid slug", () => {
      const module = getModuleBySlug("developer-mental-model");
      expect(module).toBeDefined();
      expect(module?.title).toBe("The Developer's Mental Model for AI");
    });

    it("returns undefined for invalid slug", () => {
      const module = getModuleBySlug("nonexistent-module");
      expect(module).toBeUndefined();
    });
  });

  describe("getModuleById", () => {
    it("returns module for valid id", () => {
      const module = getModuleById(1);
      expect(module).toBeDefined();
      expect(module?.slug).toBe("developer-mental-model");
    });

    it("returns undefined for invalid id", () => {
      const module = getModuleById(999);
      expect(module).toBeUndefined();
    });
  });

  describe("getNextModule", () => {
    it("returns next module for valid id", () => {
      const next = getNextModule(1);
      expect(next).toBeDefined();
      expect(next?.id).toBe(2);
    });

    it("returns undefined for last module", () => {
      const next = getNextModule(23);
      expect(next).toBeUndefined();
    });

    it("returns undefined for invalid id", () => {
      const next = getNextModule(999);
      expect(next).toBeUndefined();
    });
  });

  describe("getPreviousModule", () => {
    it("returns previous module for valid id", () => {
      const prev = getPreviousModule(2);
      expect(prev).toBeDefined();
      expect(prev?.id).toBe(1);
    });

    it("returns undefined for first module", () => {
      const prev = getPreviousModule(1);
      expect(prev).toBeUndefined();
    });

    it("returns undefined for invalid id", () => {
      const prev = getPreviousModule(999);
      expect(prev).toBeUndefined();
    });
  });

  describe("getPartByNumber", () => {
    it("returns part for valid number", () => {
      const part = getPartByNumber(1);
      expect(part).toBeDefined();
      expect(part?.title).toBe("Foundations");
    });

    it("returns undefined for invalid number", () => {
      const part = getPartByNumber(99);
      expect(part).toBeUndefined();
    });
  });

  describe("courseStats", () => {
    it("has correct total modules", () => {
      expect(courseStats.totalModules).toBe(23);
    });

    it("has correct number of parts", () => {
      expect(courseStats.parts).toBe(4);
    });

    it("total hours is defined", () => {
      expect(courseStats.totalHours).toBeDefined();
    });
  });

  // Duplication guard note:
  // The authoritative validation happens at build time via astro:content + getStaticPaths
  // (see the JSDoc in src/lib/course-data.ts). We intentionally do not run a runtime
  // collection import test here because Vitest does not fully replicate the Astro
  // content layer. Run `npm run build` or `npm run check` after editing modules.
});
