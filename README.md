# cf-workers-deployer

A reverse engineering library that simulates deployment links in [Cloudflare Workers Playground](https://workers.new).

## Installation

```bash
# use npm
npm install cf-workers-deployer

# use pnpm
pnpm install cf-workers-deployer
```

## Usage

```typescript
import { compressFile, getDeployUrl } from 'cf-workers-deployer';

const compressedFiles = compressFile({
    fileData:[
        {
            "name": "index.js", // File Name
            "fileName": "index.js", // File path
            "data": "console.log('Hello World')". // File Data
            "type": "text/javascript" // Content Type
        }
    ],
    mainModule: "index.js" // Main Module file path
})

console.log(compressedFiles) // Returns a string that can be deployed via cloudflare worker playground

const deployUrl = getDeployUrl({fileData:...}) // Returns a deploy url
```

## Features

- Convert files to strings that can be deployed via cloudflare worker playground
- Create URL to deploy

## Contributing

### Reporting Issues

If you find a bug or have a suggestion for improvement:
1. Check if the issue has already been reported.
2. If not, create a new issue.
3. Clearly describe the issue, including steps to reproduce if applicable.

### Submitting Pull Requests

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Write or adapt tests as needed.
5. Run the test suite to ensure everything still passes.
6. Commit your changes (`git commit -am 'Add some feature'`).
7. Push to the branch (`git push origin feature-branch`).
8. Create a new Pull Request.

## Author

- [moons-14](https://github.com/moons-14)

## License

MIT
