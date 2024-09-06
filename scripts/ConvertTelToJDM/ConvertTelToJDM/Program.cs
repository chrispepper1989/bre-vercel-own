using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Encodings.Web;
using System.Xml;
using System.Text.Json;
using ConvertToJDM.Models.JDM;
using ConvertToJDM.Models.TelRock;

namespace ConvertToJDM
{

   

    class Program
    {
        // Operation mappings
        private static readonly Dictionary<string, string> OperationMapping = new Dictionary<string, string>
        {
            {"LESS_THAN_EQUALS", "<="},
            {"LESS_THAN", "<"},
            {"EQUALS", ""},
            {"GREATER_THAN", ">"},
            {"STARTS_WITH", "startsWith($,@VALUE@)"},
            {"ENDS_WITH", "endsWith($,@VALUE@)"},
            {"GREATER_THAN_EQUALS", ">="},
        };
        private static bool isFunction(string operationKey)
        {
            return OperationMapping[operationKey].Contains("@VALUE@");
        }

        private static string wrapInFunction(string operationKey, string value)
        {
            return OperationMapping[operationKey].Replace("@VALUE@", value);
        }

        // Convert ProprietaryRule to JDMRule
        static ConvertToJDM.Models.JDM.Root ConvertToJDMRoot(List<ConvertToJDM.Models.TelRock.DecisionTable>  tables)
        {
            var count = 0;
            
            const int XPos = 35;
            const int YPos = 10;
            
            const int nodeHeight = 105;
            var bottom = tables.Count * nodeHeight;
            const int nodeWidth = 300;
            var inputNode = new Node
            {
                name = "Input",
                id = Guid.NewGuid().ToString(),
                position = new Position()
                {
                    x = XPos,
                    y = YPos
                },
                type = "inputNode"

            };
            var outPutNode = new Node
            {
                name = "OutputResponse",
                id = Guid.NewGuid().ToString(),
                position = new Position()
                {
                    x = XPos + (nodeWidth * 2),
                    y = bottom,
                },
                type = "outputNode"

            };
            var tableNodes = tables.Select(table =>
            {
                var (inputs, inputColumnDictionary) = MapInputs(table.conditionColumns);
                var (outputs, outputColumnLookup) = MapOutput(table.resultColumns);
                var rules = MapRules(table.rules, inputColumnDictionary, outputColumnLookup);
                var node = new Node()
                {
                    id = Guid.NewGuid().ToString(),
                    
                    type = "decisionTableNode",
                    name = table.name,
                    position = new Position()
                    {
                        x = XPos + nodeWidth ,
                        y = YPos + ((count++) * nodeHeight),
                    },
                    content = new Content()
                    {
                        inputs = inputs,
                        outputs = outputs,
                        hitPolicy = "first",
                        rules = rules
                    }
                };
                return node;
            }).ToList();

            var nodes = tableNodes.Append(outPutNode).Prepend(inputNode).ToList();

            var edges = new List<Edge>();
            
            tableNodes.ForEach(node =>
            {
                edges.Add( new Edge()
                {
                    type = "edge",
                    id = Guid.NewGuid().ToString(),
                    sourceId = inputNode.id,
                    targetId = node.id,
                });
                
                edges.Add( new Edge()
                {
                    type = "edge",
                    id = Guid.NewGuid().ToString(),
                    sourceId = node.id,
                    targetId = outPutNode.id,
                    
                });
            });

            return new ConvertToJDM.Models.JDM.Root()
            {
                contentType = "application/vnd.gorules.decision",
                edges = edges,
                nodes = nodes,

            };


        }

        

        private static string WrapValueWithOperation(string operation, string value)
        {
            if (string.IsNullOrWhiteSpace(operation) || operation == "EQUALS")
            {
                return value;
            }

            

            if (OperationMapping.TryGetValue(operation, out var opValue))
            {
                return isFunction( operation) ? wrapInFunction(operation, value) : $"{opValue} {value}";
            }
            else
            {
                throw new InvalidOperationException("Unknown operation: " + operation);
            }
        }
        private static IEnumerable<Dictionary<string, string>> MapRules(List<Rule> tableRules,
            Dictionary<string, string> inputColumnDictionary,
            Dictionary<string, string> outputColumnLookup)
        {
            return tableRules.Select(telrockRule =>
            {
                var rules = ConvertToJDM.Models.JDM.RuleCreator.CreateRuleDictionary(telrockRule._id);
                //IF ALL these conditions are met
                telrockRule.conditions.ForEach(condition =>
                {
                    if(condition.value != null)
                        rules[inputColumnDictionary[condition.property]] = WrapValueWithOperation(condition.operation, condition.value);
                });
                // DO the following actions
                telrockRule.actions.ForEach(action =>
                {
                    rules[outputColumnLookup[action.property]] = $"'{action.value}'";
                });
            
                return rules;
            });
        }

        private static (IEnumerable<Output> cols, Dictionary<string, string> outputColumnLookup) MapOutput(List<ResultColumn> tableResultColumns)
        {
            var outputColumnLookup = new Dictionary<string, string>();
            var cols =  tableResultColumns.Select(col =>
            {
                outputColumnLookup[col.property] = col._id;
                return new Output
                {
                    field = col.property,
                    id = col._id,
                    name = col.title,
                    type = "expression"
                };
            });
            return (cols, outputColumnLookup);
        }

        private static (IEnumerable<Input>, Dictionary<string,string>) MapInputs(List<ConditionColumn> tableConditionColumns)
        {
            var inputColumnLookUp = new Dictionary<string, string>();
            var inputs = tableConditionColumns.Select(telRockInput =>
            {
                inputColumnLookUp[telRockInput.property] = telRockInput._id;
                return new Input()
                {
                    name = telRockInput.title,
                    field = telRockInput.property,
                    type = "unary",
                    id = telRockInput._id,
                };
            });
            return (inputs, inputColumnLookUp);
        }

        // Main program to read input, convert, and write output
        static void Main(string[] args)
        {
            // Check if input file path is provided
            if (args.Length < 1)
            {
                Console.WriteLine("Please provide an input file path.");
                return;
            }

            var inputFilePath = args[0];
            var outputFilePath = args.Length > 1 ? args[1] : "output.jdm.json";

            try
            {
                var jsonString = File.ReadAllText(inputFilePath);
                
                // Read the proprietary BRE file
                // Deserialize the JSON string into a DecisionTable object
                var options = new JsonSerializerOptions
                {
                    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                };
              
                var data = JsonSerializer.Deserialize<ConvertToJDM.Models.TelRock.Root>(jsonString, options);
             
                // Convert to JDM format
                var jdmFormat = ConvertToJDMRoot(data.DecisionTable);

                // Write the output file in JDM format
                var jdmJson = JsonSerializer.Serialize(jdmFormat,options);
                File.WriteAllText(outputFilePath, jdmJson);

                Console.WriteLine($"Conversion successful! Output written to {outputFilePath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }
}
