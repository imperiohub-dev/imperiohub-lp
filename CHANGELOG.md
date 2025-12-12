# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-12

### Added
- Initial release of `@imperiohub/lp-templates`
- Core architecture with schemas, validators, components, and generator
- Zod-based validation system for templates and content
- `menuTemplate`: Template para menús de restaurante con secciones, items y combos
- `MenuTemplate` component: Placeholder component for menu rendering
- `TemplateRenderer`: Smart component that maps template slugs to React components
- `createLandingPageTemplate`: Function to insert templates into database via Prisma
- `initializeTemplates`: Batch initialization of multiple templates
- `validateTemplate`: Template validation with business rules
- `validateContent`: Content validation against template schema
- `safeValidateContent`: Safe validation without throwing errors
- Example content for menu template
- Complete documentation (README.md, USAGE.md)
- TypeScript type safety across all modules
- Support for 3 field types: `string`, `array_string`, `array_object`
- Maximum 2 levels of nesting for `array_object` fields

### Features
- Centralized template management for 3 repositories (backend, admin, client)
- Type-safe schemas shared across ecosystem
- Runtime validation with Zod
- React components for landing page rendering
- Backend utilities for Prisma integration
- Flexible export system (main, schemas, components, generator)

### Technical
- TypeScript 5.9.3
- React 19.2.0 (peer dependency)
- Zod 3.23.8
- Vite 7.2.4 for bundling
- ESM and CJS outputs
- Full type declarations (.d.ts)

## [Unreleased]

### Added
- `heroConBeneficiosTemplate`: Template para páginas de servicios con título, ventajas y CTAs
- `HeroBeneficiosTemplate` component: Placeholder component for hero-beneficios rendering
- `homePageV1Template`: Template para home pages con hero section y bloques de navegación
- `HomePageV1Template` component: Placeholder component for home-page-v1 rendering
- Example content for both new templates

### Planned
- Visual design implementation for all templates
- Form builder utilities for admin panel
- Validation error messages in Spanish
- Template preview component
- Migration utilities for existing landing pages
