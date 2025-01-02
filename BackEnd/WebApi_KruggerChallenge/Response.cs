namespace WebApi_KruggerChallenge
{
    public class Response <T>
    {

        public bool IsSuccess {  get; set; }
        
        public T Result { get; set; }

        public string Message { get; set; }

    }
}
