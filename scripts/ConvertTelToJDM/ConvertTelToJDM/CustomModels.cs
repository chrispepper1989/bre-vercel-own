 namespace ConvertToJDM.Models.Custom
 {
 public class Root
    {
        public List<DecisionTable> DecisionTable { get; set; }
    }
    public class DecisionTable
    {
        public string name { get; set; }
        public List<Rule> rules { get; set; }
        public string description { get; set; }
    }

    public class Rule
    {
        public string id { get; set; }
        public int position { get; set; }
        public List<Condition> conditions { get; set; }
        public List<Action> actions { get; set; }
    }

    public class Condition
    {
        public string title { get; set; }
        public string property { get; set; }
        public string operation { get; set; }
        public string value { get; set; }
    }

    public class Action
    {
        public string title { get; set; }
        public string Property { get; set; }
        public string value { get; set; }
    }


    // Define the types for the proprietary BRE format
    public class ConditionColumn
    {
        public string Title { get; set; }
        public string Operation { get; set; }
        public string Value { get; set; }
        public string Source { get; set; }
    }

    public class ActionColumn
    {
        public string Title { get; set; }
        public string Value { get; set; }
    }

  
    // Define the types for the JDM format
    public class JDMCondition
    {
        public string Property { get; set; }
        public string Operation { get; set; }
        public string? Value { get; set; }
        
     
    }

    public class JDMAction
    {
        public string Property { get; set; }
        public string? Value { get; set; }
    }

    public class JDMRule
    {
        public Guid _id { get; set; }
        public List<JDMCondition> Conditions { get; set; }
        public List<JDMAction> Actions { get; set; }
        
    }

    public class JDMContent
    {
        public List<JDMRule> Rules { get; set; }
    }

    public class JDMNode
    {
        public string Type { get; set; }
        public JDMContent Content { get; set; }
    }
    }