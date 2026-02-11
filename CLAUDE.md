# CLAUDE.md - Project Guidance

## Project Goal

This repository implements a minimal PoC for the BPGF analysis stage.
It takes process history data as input and produces policy recommendations.
The focus is on demonstrating the analysis pipeline, not full BPM integration.

## Non-Goals

- No BPM execution engine integration
- No process mining or discovery
- No external service dependencies

## Scope: One-Stage PoC

This PoC covers **process analysis only**:
- Read a single PH entry from `data/`
- Apply the analysis prompt template from `prompts/`
- Generate outputs to `policies/` and `results/`

## Required Outputs

1. A policy file in `policies/` (generated from analysis)
2. One evaluator output report in `results/`

## Development Rules

- Make small, incremental changes
- Keep files minimal and focused
- Do not break the existing scaffold structure
- Test changes before committing

## Step 2 Checklist

- [ ] Fill `data/ph1.txt` with a sample PH entry
- [ ] Write the prompt template in `prompts/analysis_stage.md`
