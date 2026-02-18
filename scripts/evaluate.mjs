#!/usr/bin/env node
// Minimal ODRL Evaluator wrapper for PoC
import { ODRLEvaluator, ODRLEngineMultipleSteps, ODRLEngine } from 'odrl-evaluator';
import { readFileSync, writeFileSync } from 'fs';
import { Parser, Store } from 'n3';

async function parseFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  const parser = new Parser();
  const quads = parser.parse(content);
  const store = new Store(quads);
  return store.getQuads(null, null, null, null);
}

async function main() {
  // Use ODRLEngine (default) for simpler scenarios, ODRLEngineMultipleSteps for constraints
  const useMultiStep = process.argv.includes('--multistep');
  const engine = useMultiStep ? new ODRLEngineMultipleSteps() : new ODRLEngine();
  const evaluator = new ODRLEvaluator(engine);

  // Allow specifying files via command line args
  const policyFile = process.argv[2] || './policies/ph1_analysis_policy.ttl';
  const requestFile = process.argv[3] || './requests/req1.ttl';
  const worldFile = process.argv[4] || './world/world1.ttl';

  const policy = await parseFile(policyFile);
  const request = await parseFile(requestFile);
  const world = await parseFile(worldFile);

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
    policy: policyFile,
    request: requestFile,
    world: worldFile,
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
