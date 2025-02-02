using TNO.API.Models;

namespace TNO.API.Areas.Editor.Models.Content;

/// <summary>
/// FileReferenceModel class, provides a model that represents an file reference.
/// </summary>
public class FileReferenceModel : AuditColumnsModel
{
    #region Properties
    /// <summary>
    /// get/set - Primary key to file reference.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// get/set - Foreign key to content.
    /// </summary>
    public long ContentId { get; set; }

    /// <summary>
    /// get/set - The file mime type.
    /// </summary>
    public string ContentType { get; set; } = "";

    /// <summary>
    /// get/set - The friendly name or the name the user gave for the file.
    /// </summary>
    public string FileName { get; set; } = "";

    /// <summary>
    /// get/set - The path to the file.
    /// </summary>
    public string Path { get; set; } = "";

    /// <summary>
    /// get/set - The size of the file in bytes.
    /// </summary>
    public long Size { get; set; }

    /// <summary>
    /// get/set - The number of seconds this file runs.
    /// </summary>
    public long RunningTime { get; set; }

    /// <summary>
    /// get/set - Whether the file has been uploaded and is available.
    /// </summary>
    public bool IsUploaded { get; set; }
    #endregion

    #region Constructors
    /// <summary>
    /// Creates a new instance of an FileReferenceModel.
    /// </summary>
    public FileReferenceModel() { }

    /// <summary>
    /// Creates a new instance of an FileReferenceModel, initializes with specified parameter.
    /// </summary>
    /// <param name="entity"></param>
    public FileReferenceModel(Entities.FileReference entity) : base(entity)
    {
        this.Id = entity.Id;
        this.ContentId = entity.ContentId;
        this.ContentType = entity.ContentType;
        this.FileName = entity.FileName;
        this.Path = entity.Path;
        this.Size = entity.Size;
        this.RunningTime = entity.RunningTime;
        this.IsUploaded = entity.IsUploaded;
    }
    #endregion

    #region Methods
    /// <summary>
    /// Creates a new instance of a FileReference object.
    /// </summary>
    /// <param name="contentId"></param>
    /// <returns></returns>
    public Entities.FileReference ToEntity(long contentId)
    {
        var entity = (Entities.FileReference)this;
        entity.ContentId = contentId;
        return entity;
    }

    /// <summary>
    /// Explicit cast to entity.
    /// </summary>
    /// <param name="model"></param>
    public static explicit operator Entities.FileReference(FileReferenceModel model)
    {
        return new Entities.FileReference(model.ContentId, model.ContentType, model.FileName, model.Path)
        {
            Id = model.Id,
            Size = model.Size,
            RunningTime = model.RunningTime,
            IsUploaded = model.IsUploaded,
            Version = model.Version ?? 0,
        };
    }
    #endregion
}
