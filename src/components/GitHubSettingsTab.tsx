import React from 'react';
import { Github, Play, CheckCircle2, Copy, FileCode, HelpCircle } from 'lucide-react';

export default function GitHubSettingsTab() {
  const [copied, setCopied] = React.useState(false);

  const workflowCode = `name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build-and-deploy:
    concurrency: ci-\${{ github.ref }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4

      - name: Install and Build 🔧
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages`;

  const handleCopy = () => {
    navigator.clipboard.writeText(workflowCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-elevated p-6 animate-fade-up space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-heading font-medium tracking-tight text-[var(--color-primary)] uppercase flex items-center gap-2">
          <Github className="h-5 w-5 text-[var(--color-accent)]" />
          <span>GitHub Actions Deployment Settings</span>
        </h2>
        <p className="text-xs text-[var(--color-muted)] font-sans mt-1">
          Configure GitHub Actions to automatically deploy this Workbook SaaS app to GitHub Pages completely free.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step-by-step Guide */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">
            How to Deploy in 3 Simple Steps
          </h3>
          
          <div className="space-y-4 text-xs leading-relaxed text-[var(--color-primary)]">
            {/* Step 1 */}
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Create a GitHub Repository & Push Code</h4>
                <p className="text-[var(--color-muted)]">
                  Create a new repository on your GitHub account. Initialize your local workspace and push all files (including the configured `.github/workflows/deploy.yml` workflow) to your repository's <code>main</code> branch.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Enable Actions Write Permissions</h4>
                <p className="text-[var(--color-muted)]">
                  Go to your GitHub Repository <strong className="text-[var(--color-primary)]">Settings &rarr; Actions &rarr; General</strong>. 
                  Scroll down to <strong className="text-[var(--color-primary)]">Workflow permissions</strong>, select <strong className="text-[var(--color-accent)]">&ldquo;Read and write permissions&rdquo;</strong>, and click <strong className="text-[var(--color-primary)]">Save</strong>. This allows the compiler to write and deploy static assets.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Configure Pages Branch</h4>
                <p className="text-[var(--color-muted)]">
                  Push your code. This triggers the GitHub action to run, compile, and push a compiled static site to a new branch called <code>gh-pages</code>. 
                  Once done, go to your Repository <strong className="text-[var(--color-primary)]">Settings &rarr; Pages</strong>. Under Build and deployment, set the source to <strong className="text-[var(--color-primary)]">Deploy from a branch</strong>, select the <strong className="text-[var(--color-accent)]">gh-pages</strong> branch, and click <strong className="text-[var(--color-primary)]">Save</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="insight-block flex items-start gap-3 mt-4">
            <CheckCircle2 className="h-5 w-5 text-[var(--color-positive)] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-[var(--color-accent)] uppercase">Live Deployment URL</h4>
              <p className="text-[11px] text-[var(--color-primary)]">
                Your console will be live at: <br />
                <code className="bg-black/5 px-1 py-0.5 rounded font-mono text-[10px] select-all">
                  https://&lt;your-username&gt;.github.io/&lt;your-repo-name&gt;/
                </code>
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Code display */}
        <div className="space-y-3 flex flex-col h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] flex items-center gap-1">
              <FileCode className="h-4 w-4 text-[var(--color-muted)]" />
              <span>deploy.yml Configuration</span>
            </h3>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 border border-[var(--color-border)] rounded hover:bg-gray-50 active:scale-95 transition-all cursor-pointer bg-white"
            >
              <Copy className="h-3.5 w-3.5 text-gray-500" />
              <span>{copied ? 'Copied!' : 'Copy Config'}</span>
            </button>
          </div>

          <p className="text-[11px] text-[var(--color-muted)] leading-relaxed">
            The file has already been generated at <code>.github/workflows/deploy.yml</code> in your workspace. You do not need to rewrite it, but you can copy it below if needed:
          </p>

          <pre className="flex-1 bg-gray-950 text-gray-300 p-4 rounded-lg font-mono text-[10px] overflow-auto border border-black max-h-[300px] select-all leading-relaxed whitespace-pre">
            {workflowCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
