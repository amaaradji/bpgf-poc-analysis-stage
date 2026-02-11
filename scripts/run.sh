#!/usr/bin/env bash
# run.sh - Run ODRL Evaluator on the Process analysis policy
# Requires: Node.js 18+, npm

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$ROOT_DIR"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install --silent odrl-evaluator n3
fi

# Run evaluation
echo "Running ODRL Evaluator..."
node scripts/evaluate.mjs

# Check output exists
if [ -f "results/ph1_report.json" ]; then
  echo "Success: results/ph1_report.json generated"
  exit 0
else
  echo "Error: Report not generated"
  exit 1
fi
