import { describe, it, expect, beforeEach, vi } from "vitest";
import { getTheme, setTheme, applyTheme, getResolvedTheme } from "../lib/theme";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

// Mock document.documentElement
const mockClassList = {
  add: vi.fn(),
  remove: vi.fn(),
  toggle: vi.fn(),
  contains: vi.fn(() => false),
};

Object.defineProperty(global, "document", {
  value: {
    documentElement: {
      classList: mockClassList,
    },
  },
  writable: true,
});

// Mock window.matchMedia
Object.defineProperty(global, "window", {
  value: {
    matchMedia: vi.fn((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  },
  writable: true,
});

describe("Theme Module", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("getTheme", () => {
    it("returns 'system' by default", () => {
      expect(getTheme()).toBe("system");
    });

    it("returns saved theme from localStorage", () => {
      localStorageMock.getItem.mockReturnValueOnce("dark");
      expect(getTheme()).toBe("dark");
    });

    it("returns 'system' for invalid stored value", () => {
      localStorageMock.getItem.mockReturnValueOnce("invalid");
      expect(getTheme()).toBe("system");
    });
  });

  describe("setTheme", () => {
    it("saves theme to localStorage", () => {
      setTheme("dark");
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "dot-theme",
        "dark"
      );
    });

    it("saves light theme", () => {
      setTheme("light");
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "dot-theme",
        "light"
      );
    });

    it("saves system theme", () => {
      setTheme("system");
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "dot-theme",
        "system"
      );
    });
  });

  describe("applyTheme", () => {
    it("adds dark class for dark theme", () => {
      applyTheme("dark");
      expect(mockClassList.add).toHaveBeenCalledWith("dark");
    });

    it("removes dark class for light theme", () => {
      applyTheme("light");
      expect(mockClassList.remove).toHaveBeenCalledWith("dark");
    });
  });

  describe("getResolvedTheme", () => {
    it("returns dark when theme is dark", () => {
      localStorageMock.getItem.mockReturnValue("dark");
      expect(getResolvedTheme()).toBe("dark");
    });

    it("returns light when theme is light", () => {
      localStorageMock.getItem.mockReturnValue("light");
      expect(getResolvedTheme()).toBe("light");
    });
  });
});
