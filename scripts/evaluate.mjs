#!/usr/bin/env node
// Minimal ODRL Evaluator wrapper for PoC
import { ODRLEvaluator, ODRLEngineMultipleSteps } from 'odrl-evaluator';
import { readFileSync, writeFileSync } from 'fs';
import { Parser } from 'n3';

async function parseFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  const parser = new Parser();
  return parser.parse(content);
}

async function main() {
  const engine = new ODRLEngineMultipleSteps();
  const evaluator = new ODRLEvaluator(engine);

  const policy = await parseFile('./policies/ph1_analysis_policy.ttl');
  const request = await parseFile('./requests/req1.ttl');
  const world = await parseFile('./world/world1.ttl');

  const report = await evaluator.evaluate(policy, request, world);

  // Also get intermediate constraint satisfaction results
  let constraintReport = [];
  try {
    constraintReport = await engine.constraintSatisfaction || [];
  } catch (e) { /* ignore */ }

  // The evaluator returns quads; serialize for inspection
  const resultQuads = Array.isArray(report) ? report.map(q => ({
    subject: q.subject?.value,
    predicate: q.predicate?.value,
    object: q.object?.value
  })) : report;

  const output = {
    timestamp: new Date().toISOString(),
    policy: 'policies/ph1_analysis_policy.ttl',
    request: 'requests/req1.ttl',
    world: 'world/world1.ttl',
    policyTriples: policy.length,
    requestTriples: request.length,
    worldTriples: world.length,
    resultTriples: Array.isArray(report) ? report.length : 'N/A',
    result: resultQuads
  };

  writeFileSync('./results/ph1_report.json', JSON.stringify(output, null, 2));
  console.log('Evaluation complete. Report written to results/ph1_report.json');
}

main().catch(err => {
  console.error('Evaluation failed:', err.message);
  process.exit(1);
});
