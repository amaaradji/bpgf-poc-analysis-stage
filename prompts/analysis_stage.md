# Process Analysis Stage - Prompt Template

## Input
A Process History (PH) entry containing: goal, roles, activities, and dependencies.

## Task
Generate an ODRL policy for the "Process analysis" lifecycle stage that:
1. Targets the collection of BP activities as an asset
2. Grants permission to classify each activity
3. Requires applying value-added analysis (duty) using one of:
   - customer-value-adding (directly benefits the customer)
   - business-value-adding (required for operations but not customer-visible)
   - non-value-adding (waste to be eliminated)

## Output Format
A single ODRL Offer policy in JSON-LD with:
- `@type`: "Offer"
- `permission`: classify activities
- `duty`: apply value-added technique with the three classification options

## Example Usage
Given PH entry in `data/ph1.txt`, produce `policies/ph1_analysis_policy.jsonld`.
