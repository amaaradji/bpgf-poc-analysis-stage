# bpgf-poc-analysis-stage

A minimal proof-of-concept for the BPGF process analysis stage.

## Goal

Demonstrate a single-stage analysis workflow that reads process history (PH) data,
applies a prompt template, and produces a policy file with an evaluator output report.

## Repository Structure

- `data/` - Input PH entries
- `prompts/` - Prompt templates for analysis stages
- `policies/` - Generated policy files
- `requests/` - Request artifacts
- `world/` - World state files
- `scripts/` - Automation scripts
- `results/` - Output reports and evaluation results

## Next Steps

1. Populate `data/ph1.txt` with a sample PH entry
2. Write the analysis prompt template in `prompts/analysis_stage.md`
3. Implement `scripts/run.sh` to execute the analysis pipeline
