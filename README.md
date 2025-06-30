# Uniform Structure File

A TypeScript library for generating uniform structure files with full TypeScript support.

## Installation

```bash
npm install uniform_structure_file
```

## Usage

### JavaScript/CommonJS
```javascript
const { generateUSF } = require('uniform_structure_file');

// Use the function
const result = await generateUSF(input);
```

### TypeScript/ES Modules
```typescript
import { generateUSF, UniformStructureInput, USFResult } from 'uniform_structure_file';

// Use with full type safety
const result: USFResult = await generateUSF(input);
```

## Available Types

The package exports all necessary TypeScript types:

- `UniformStructureInput` - Main input interface
- `USFResult` - Result interface
- `DocumentType` - Document type enums
- `PaymentMethod` - Payment method enums
- `SoftwareType` - Software type enums
- And many more...

## Development

### Building
```bash
npm run build
```

This generates:
- `dist/index.js` - CommonJS bundle
- `dist/index.mjs` - ES Module bundle  
- `dist/index.d.ts` - TypeScript declarations

### Testing
```bash
npm test
```

## Publishing

Before publishing run:
```shell
npm run build

# Then
npm publish
```

The package is configured to:
- Support both CommonJS and ES Module imports
- Include full TypeScript type definitions
- Only publish the `dist` folder to npm

