const fs = require('fs');
const path = require ('path');

// Types for the proprietary BRE format and JDM format
type ConditionColumn = {
  title: string;
  operation: string;
  value: string | number;
  source: string;
};

type ActionColumn = {
  title: string;
  value: string;
};

type ProprietaryRule = { 
 
  conditionColumns: ConditionColumn[];
  actions: ActionColumn[];
};

type JDMCondition = {
  property: string;
  operation: string;
  value: string | number;
};

type JDMAction = {
  property: string;
  value: string;
};

type JDMRule = {
  conditions: JDMCondition[];
  actions: JDMAction[];
};

type JDMFormat = {
  rules: JDMRule[];
};

// Map operation from proprietary to JDM format
const operationMapping: { [key: string]: string } = {
  "LESS_THAN_EQUALS": "lessThanOrEqual",
  "LESS_THAN": "lessThan",
  "EQUALS": "equals",
  "GREATER_THAN": "greaterThan"
};

// Function to convert proprietary rules to JDM format
function convertToJDM(proprietaryRules: ProprietaryRule[]): JDMFormat {

console.log("mapping....")
console.log(proprietaryRules)
console.log("....")
  const jdmRules: JDMRule[] = proprietaryRules.map(rule => {
  
	console.log("Mapping rule conditions: " + (rule as any).position)
    const conditions: JDMCondition[] = rule.conditionColumns.map(condition => ({
      property: condition.title.replace(" / ", "."),
      operation: operationMapping[condition.operation] || condition.operation,
      value: condition.value
    }));
	console.log("Mapping rule actions: " + (rule as any).position)	
    const actions: JDMAction[] = rule.actions.map(action => ({
      property: action.title,
      value: action.value
    }));


    return { conditions, actions };
  });
	console.log("mapped")
  return { rules: jdmRules };
}

// Main function to handle file reading and writing
function main() {
  // Get file paths from arguments
  const inputFilePath = process.argv[2];
  const outputFilePath = process.argv[3] || 'output.jdm.json';

  if (!inputFilePath) {
    console.error('Please provide an input file path.');
    process.exit(1);
  }

  // Read the input file
  fs.readFile(inputFilePath, 'utf8', (err:any, data:any) => {
    if (err) {
      console.error('Error reading the input file:', err);
      process.exit(1);
    }

    // Parse the input file as JSON
    const dts: any = JSON.parse(data);
	const proprietaryRules: ProprietaryRule[] = dts.DecisionTable[0].rules
	console.log(proprietaryRules)
	
    // Convert the proprietary format to JDM format
    const jdmResult = convertToJDM(proprietaryRules);

    // Write the JDM result to the output file
    fs.writeFile(outputFilePath, JSON.stringify(jdmResult, null, 2), (err:any) => {
      if (err) {
        console.error('Error writing the output file:', err);
        process.exit(1);
      }

      console.log(`Conversion successful! Output written to ${outputFilePath}`);
    });
  });
}

// Execute the main function
main();
