using Core.Utilities.Results;
using Microsoft.AspNetCore.Http;
namespace Core.Utilities.FileUploads
{
    public interface IFileUpload
    {
        IResult Upload(IFormFile file);
        IResult Update(IFormFile file);
        IResult Delete(string path);
    }
}