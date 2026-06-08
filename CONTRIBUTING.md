# Contributing to Developer of Tomorrow

Thank you for your interest in improving this free course! We welcome contributions that help technical professionals learn to use AI effectively and responsibly.

## How to Contribute

### 1. Content Improvements (Most Valuable)
- Fix inaccuracies, clarify explanations, or update examples
- Improve exercises, quizzes, or diagrams
- Add better references or real-world case studies
- Suggest new topics for future modules (open an issue first)

**Process:**
1. Edit the relevant `.mdx` file in `src/content/modules/`
2. If you also maintain the source, update the matching file in `modules/`
3. Run `npm run build` and `npm test` to ensure nothing is broken
4. Open a Pull Request with a clear description of the change

### 2. Code & Platform Improvements
- Bug fixes in components, layouts, or interactivity
- Accessibility, performance, or UX enhancements
- Test coverage improvements
- Documentation updates (README, DEVELOPMENT.md, etc.)

**Process:**
1. Follow the patterns in `src/components/` and `src/lib/`
2. Prefer small, focused React islands (see existing `Quiz.tsx`, `ProgressTracker.tsx`)
3. Add or update tests in `src/__tests__/`
4. Run the full test suite + build before submitting

### 3. Reporting Issues
- Use GitHub Issues with clear reproduction steps
- For content accuracy issues, include the module name + specific claim
- For technical bugs, include browser, steps, and (if possible) a screenshot

## Development Setup

```bash
git clone <your-fork>
cd trainer
npm install
npm run dev
```

See [DEVELOPMENT.md](./DEVELOPMENT.md) for full commands, architecture notes, and how to add a new module.

## Style & Quality Guidelines

- **Tone**: Professional but approachable. Honest about AI limitations. Avoid hype.
- **Content**: Update the MDX frontmatter (title, duration, difficulty, objectives) when changing a module significantly.
- **Code**: TypeScript + Astro + React islands. Follow existing formatting (`npm run format`).
- **Tests**: New interactive features should have unit + E2E coverage where practical.
- **No breaking changes** to existing quiz/exercise IDs or progress storage keys.

## License

- Course content: Creative Commons BY-NC-SA 4.0
- Code: MIT

By contributing, you agree that your contributions will be licensed under the same terms.

## Questions?

Open an issue or start a discussion. We appreciate every improvement that helps more developers use AI thoughtfully.

---

**Built with care for the developer community.**
