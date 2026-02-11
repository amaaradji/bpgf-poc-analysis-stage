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

## PoC Demo

This PoC implements the **Process analysis** lifecycle stage from the BPGF paper.

**Key files:**
- `data/ph1.txt` - Sample PH entry (Order Fulfillment process)
- `prompts/analysis_stage.md` - Prompt template for value-added classification
- `policies/ph1_analysis_policy.jsonld` - Generated ODRL policy
- `requests/req1.jsonld` - ODRL request for evaluation
- `world/world1.ttl` - World state facts

**Run the evaluator:**
```bash
./scripts/run.sh
```

**Expected output:** `results/ph1_report.json` containing the ODRL Evaluator report.

## Requirements

- Node.js 18+
- npm
