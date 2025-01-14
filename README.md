# Code Quality & Testing Evaluation Project

## Context
You are working for a company that has recently acquired a small e-commerce project. The codebase is functional but lacks proper code quality standards, testing, and modern development practices. Your task is to improve the codebase by implementing various tools and best practices.

## Git Requirements (Mandatory)

### 1. Branch Strategy
- Main branch is protected and cannot be pushed to directly
- Must create the following branches:
  - `feature/eslint-prettier-setup`
  - `feature/testing-setup`
  - `feature/git-hooks`
  - `feature/lighthouse-ci`
- Additional features should follow the pattern: `feature/feature-name`
- Bug fixes should use: `fix/issue-description`
- Each feature/fix must have its own branch

### 2. Commit Message Convention
Must follow the Conventional Commits specification:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `chore`: Changes to build process or auxiliary tools
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests
- `ci`: Changes to CI configuration files and scripts

Examples:
```
feat(frontend): add user authentication component
fix(backend): resolve CORS issue with products API
test(frontend): add unit tests for ProductList component
chore: update eslint configuration
```

## Main Requirements

### 1. Code Quality Tools Implementation
- [X] Install and configure Prettier with following requirements:
  - Single quotes
  - No trailing commas
  - 2 spaces indentation
  - 80 characters line length
  - Configure specific overrides for markdown files
- [X] Install and configure ESLint:
  - Frontend:
    - Extend from `eslint-config-react-app`
    - Add `eslint-plugin-react-hooks` rules
    - Configure import order rules
    - Add `eslint-plugin-jsx-a11y` for accessibility
  - Backend:
    - Extend from `eslint-config-node`
    - Configure proper Node.js environment
    - Add `eslint-plugin-security`
    - Add `eslint-plugin-node`

### 2. Git Hooks Setup
- [X] Install and configure Husky
- [X] Configure lint-staged
- [X] Implement pre-commit hooks:
  - Run ESLint
  - Run Prettier
  - Run Jest tests related to changed files
- [ ] Implement pre-push hooks:
  - Run full test suite
  - Check test coverage thresholds

### 3. Testing Implementation
- [X] Configure Jest for both packages
- [ ] Implement test coverage reporting with minimum thresholds:

  - Statements: 80%
  - Branches: 75%
  - Functions: 80%
  - Lines: 80%
- [ ] Frontend Tests:
  - Unit tests for all components
  - Integration tests for forms
  - Mock API calls
  - Test authentication flow
- [X] Backend Tests:
  - Unit tests for controllers
  - Integration tests for API endpoints
  - Database operation tests
  - Authentication middleware tests

### 4. Performance Analysis
- [X] Implement Google Lighthouse CI
- [X] Create npm script for running Lighthouse
- [X] Set minimum score thresholds:
  - Performance: 90
  - Accessibility: 90
  - Best Practices: 90
  - SEO: 90

## Bonus Points

### 1. Styling Enhancement
- [X] Implement Tailwind CSS
- [X] Add ESLint plugin for Tailwind
- [ ] Create proper color scheme and design system
- [ ] Implement responsive design
- [ ] Add dark mode support

### 2. Code Quality Enhancements
- [ ] Implement TypeScript
- [ ] Add proper error boundaries in React
- [ ] Implement proper state management (Redux Toolkit or Zustand)
- [ ] Add proper logging system
- [ ] Implement proper environment variable handling

### 3. Additional Features
- [ ] Add product categories
- [ ] Implement product search
- [ ] Add product sorting and filtering
- [ ] Implement pagination
- [ ] Add user roles (admin/user)

## Project Setup
```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Run tests
npm run test

# Run lint
npm run lint

# Run prettier
npm run format

# Build project
npm run build
```

## Notes
- Code must follow community standards
- All tools must be properly configured with appropriate documentation
- Extra attention will be paid to:
  - Code organization
  - Commit messages
  - Documentation quality
  - Test quality
  - Error handling
  - Security practices

## Resources
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
- [Jest Documentation](https://jestjs.io/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
