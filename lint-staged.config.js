module.exports = {
  // Type check TypeScript files admin
  // '**/*.(ts|tsx)': () => 'yarn tsc --p packages/admin/tsconfig.json --noEmit',
  // Type check TypeScript files user
  // '**/*.(ts|tsx)': () => 'yarn tsc --p packages/user/tsconfig.json --noEmit',
  // Type check TypeScript files shared
  // '**/*.(ts|tsx)': () => 'yarn tsc --p packages/shared/tsconfig.json --noEmit',
  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [`yarn eslint --fix .`, `yarn prettier --write ${filenames.join(' ')}`],
  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `yarn prettier --write ${filenames.join(' ')}`,
};
