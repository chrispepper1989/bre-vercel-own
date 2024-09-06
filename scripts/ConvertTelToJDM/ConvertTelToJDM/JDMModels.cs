


namespace ConvertToJDM.Models.JDM
{
   // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Content
    {
        public string hitPolicy { get; set; }
        public IEnumerable<Input> inputs { get; set; }
        public IEnumerable<Output> outputs { get; set; }
        public IEnumerable< Dictionary<string, string> > rules { get; set; }
    }

    public class Edge
    {
        public string id { get; set; }
        public string sourceId { get; set; }
        public string type { get; set; }
        public string targetId { get; set; }
    }

    public class Input
    {
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string field { get; set; }
    }

    public class Node
    {
        public string name { get; set; }
        public string id { get; set; }
        public Position position { get; set; }
        public string type { get; set; }
        public Content content { get; set; }
    }

    public class Output
    {
        public string field { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
    }

    public class Position
    {
        public int x { get; set; }
        public int y { get; set; }
    }

    public class Root
    {
        public string contentType { get; set; }
        public List<Node> nodes { get; set; }
        public List<Edge> edges { get; set; }
    }

    public static class RuleCreator
    {
       

        public static Dictionary<string, string> CreateRuleDictionary(string id)
        {
            return new Dictionary<string, string>()
            {
                { "_id", id },
            };
        }
    }




}