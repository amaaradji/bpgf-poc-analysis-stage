#!/usr/bin/env node
// Minimal ODRL Evaluator wrapper for PoC
import { ODRLEvaluator } from 'odrl-evaluator';
import { readFileSync, writeFileSync } from 'fs';
import { Parser } from 'n3';

async function parseFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  const parser = new Parser();
  return parser.parse(content);
}

async function main() {
  const evaluator = new ODRLEvaluator();

  const policy = await parseFile('./policies/ph1_analysis_policy.jsonld');
  const request = await parseFile('./requests/req1.jsonld');
  const world = await parseFile('./world/world1.ttl');

  const report = await evaluator.evaluate(policy, request, world);

  const output = {
    timestamp: new Date().toISOString(),
    policy: 'policies/ph1_analysis_policy.jsonld',
    request: 'requests/req1.jsonld',
    world: 'world/world1.ttl',
    result: report
  };

  writeFileSync('./results/ph1_report.json', JSON.stringify(output, null, 2));
  console.log('Evaluation complete. Report written to results/ph1_report.json');
}

main().catch(err => {
  console.error('Evaluation failed:', err.message);
  process.exit(1);
});
