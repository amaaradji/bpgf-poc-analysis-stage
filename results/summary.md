# Process Analysis PoC - Evaluation Summary

**Lifecycle stage:** Process analysis

## Concrete Signals from Evaluation

- **Policy validity:** Pass (14 policy triples parsed successfully by ODRL Evaluator)
- **Evaluation outcome:** Constraint `Unsatisfied` - the duty requiring a value-added classification report has not been fulfilled
- **Activated report:** `ConstraintReport` (ID: `urn:uuid:dcc83f2b-...`) with `satisfactionState` = `Unsatisfied`

## Mapping to Experiments Dimensions

The ODRL Evaluator successfully processed the Process analysis policy, demonstrating **validity** (the policy is well-formed and machine-processable). The evaluation covers **1 lifecycle stage** (Process analysis), confirming baseline **coverage**. The evaluator produced a meaningful compliance report with constraint satisfaction states, demonstrating **operational enforceability** - the policy is not merely syntactically valid but can drive automated governance decisions (e.g., flagging that the analysis duty remains unfulfilled).
