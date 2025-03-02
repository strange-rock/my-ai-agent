# v0-embed-zerowidth-agent

This repository contains a simple React component that acts as a chat agent. It communicates with a serverless function that proxies requests to the zerowidth API. The project is designed to be deployed on Vercel and easily embedded in a website (for example, in a Google Site via an iframe).

## Features

- **React Component:** A basic user interface for entering messages and displaying responses.
- **Serverless Proxy:** A serverless function that forwards requests to the zerowidth API.
- **Environment Variables:** Secret keys and API endpoints are stored in an .env file.
- **Basic CORS Support:** Enables cross-origin requests.
- **Error Handling:** Handles API errors gracefully.
- **Verbose Comments:** Explanations throughout the code to help beginners.
- **MIT License:** Open-source and free to use (see License section).

## Project Structure

v0-embed-zerowidth-agent/  
  pages/  
    index.js    - Main React component for the chat interface.  
    api/  
      proxy.js  - Serverless function to proxy API requests.  
  .env.example   - Template environment file (copy to .env with your actual keys).  
  package.json   - Project configuration file (dependencies, scripts, etc.).  
  README.md    - This documentation file.  
  LICENSE     - MIT License file.

## Getting Started

### Prerequisites

- Node.js installed on your computer.
- A Vercel account for deployment.
- Visual Studio Code (VS Code) for development.

### Setup in VS Code

1. **Create a New GitHub Repository:**  
   Log in to GitHub, create a new repository named "v0-embed-zerowidth-agent" without initializing with a README.

2. **Clone the Repository in VS Code:**  
   Open VS Code, use the Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and select "Git: Clone".  
   Enter your repository URL and choose a local folder.  
   Open the cloned folder in VS Code.

3. **Add Project Files:**  
   Create the following files and folders in VS Code as per the structure above:

   - pages/index.js (React component)
   - pages/api/proxy.js (serverless function)
   - package.json (project configuration)
   - .env.example (environment variables template)
   - README.md (this file)
   - LICENSE (MIT License file)

4. **Install Dependencies:**  
   Open the integrated terminal in VS Code and run "npm install".

5. **Set Up Environment Variables:**  
   Copy .env.example to a new file named ".env" in the project root and update the variables:

   - ZEROWIDTH_API_URL should be set to:  
     https://api.zerowidth.ai/v1/process/UvxlzCFXzR3aAgvsD8Nf/jGTpHrmOtyya3SkDfPcN
   - BEARER_TOKEN should be set to your bearer token (e.g., sk0w-b81313c8251142a0e2b93d290473da0e).

6. **Run the Development Server:**  
   In the terminal, run "npm run dev" and open http://localhost:3000 in your browser to preview the chat component.

## Deployment on Vercel

1. **Push Your Code to GitHub:**  
   Stage, commit, and push your changes using VS Code's Source Control tools or the terminal.

2. **Import Your Repository into Vercel:**  
   Log in to Vercel at vercel.com and create a new project by importing your "v0-embed-zerowidth-agent" repository from GitHub.  
   Vercel should auto-detect your Next.js configuration.

3. **Configure Environment Variables on Vercel:**  
   In the Vercel project settings, add the following variables:

   - ZEROWIDTH_API_URL:  <the specific flow you want to access>
   - BEARER_TOKEN:  <from the zerowidth api for your flow>

4. **Deploy the Project:**  
   Click "Deploy" in the Vercel dashboard. Monitor the build logs to ensure the project builds successfully.  
   Once deployed, Vercel will provide a URL for your project.

## Embedding in a Google Site

1. Copy the deployment URL from Vercel.
2. On your Google Site, add an HTML embed or use the embed widget.
3. Insert an iframe snippet similar to the following (replace the src URL with your Vercel deployment URL):

<iframe src="https://your-vercel-deployment-url.vercel.app" width="600" height="400"></iframe>

4. Save and publish your Google Site to see the embedded chat component.

## Additional Information

- **Local Development:**  
  Use "npm run dev" to start the development server. Any changes saved in VS Code will trigger a hot-reload.
- **VS Code Tips:**  
  Leverage the integrated Git, terminal, and debugging tools in VS Code to enhance your workflow.
- **Documentation:**  
  For further details on Vercel and Next.js, refer to their official documentation on vercel.com/docs and nextjs.org/docs.

## License

MIT License

Copyright (c) 2025 Thomas J McLeish

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author

Thomas J McLeish
