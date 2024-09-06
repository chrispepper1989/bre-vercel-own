// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
namespace ConvertToJDM.Models.TelRock
{
    public class Action
    {
        public string title { get; set; }
        public string property { get; set; }
        public string source { get; set; }
        public string value { get; set; }
        public string _id { get; set; }
    }

    public class Audit
    {
        public string versionState { get; set; }
        public string whenOccurred { get; set; }
        public string actionedBy { get; set; }
    }

    public class Condition
    {
        public string title { get; set; }
        public string property { get; set; }
        public string operation { get; set; }
        public string source { get; set; }
        public string? value { get; set; }
        public string _id { get; set; }
    }

    public class ConditionColumn
    {
        public string id { get; set; }
        public string title { get; set; }
        public string source { get; set; }
        public string property { get; set; }
        public string _id { get; set; }
    }

    public class Context
    {
        public Source source { get; set; }
        public Version version { get; set; }
    }

    public class DecisionTable
    {
        public Context _context { get; set; }
        public List<ResultColumn> resultColumns { get; set; }
        public List<ConditionColumn> conditionColumns { get; set; }
        public string name { get; set; }
        public bool isSystemDT { get; set; }
        public string description { get; set; }
        public List<Rule> rules { get; set; }
    }

    public class ResultColumn
    {
        public string title { get; set; }
        public string description { get; set; }
        public Target target { get; set; }
        public string source { get; set; }
        public string property { get; set; }
        public string _id { get; set; }
    }

    public class Root
    {
        public List<DecisionTable> DecisionTable { get; set; }
    }

    public class Rule
    {
        public string _id { get; set; }
        public int position { get; set; }
        public List<Condition> conditions { get; set; }
        public List<Action> actions { get; set; }
    }

    public class Source
    {
        public string origin { get; set; }
    }

    public class Target
    {
        public string source { get; set; }
        public string field { get; set; }
        public string targetType { get; set; }
    }

    public class Version
    {
        public string state { get; set; }
        public List<Audit> audit { get; set; }
    }

}