﻿using System.Web;
using RazorEngineCore;
using TNO.API.Models.Settings;
using TNO.Core.Extensions;

namespace TNO.TemplateEngine.Models.Reports;

/// <summary>
/// ReportEngineContentModel class, provides a model to pass to the razor engine for reports.
/// </summary>
public class ReportEngineContentModel : RazorEngineTemplateBase
{
    #region Properties
    /// <summary>
    /// get/set - An array of content.
    /// </summary>
    public IEnumerable<ContentModel> Content { get; set; }

    /// <summary>
    /// get/set - A dictionary with each section.
    /// </summary>
    public Dictionary<string, ReportSectionModel> Sections { get; set; } = new();

    /// <summary>
    /// get/set - The report settings.
    /// </summary>
    public ReportSettingsModel Settings { get; set; } = new();

    /// <summary>
    /// get/set - The MMIA URL.
    /// </summary>
    public Uri? MmiaUrl { get; set; }

    /// <summary>
    /// get/set - The view content URL.
    /// </summary>
    public Uri? ViewContentUrl { get; set; }

    /// <summary>
    /// get/set - The request transcript URL.
    /// </summary>
    public Uri? RequestTranscriptUrl { get; set; }

    /// <summary>
    /// get/set - The add to report URL.
    /// </summary>
    public Uri? AddToReportUrl { get; set; }
    #endregion

    #region Constructors
    /// <summary>
    /// Creates a new instance of a ReportEngineContentModel.
    /// </summary>
    public ReportEngineContentModel()
    {
        this.Content = Array.Empty<ContentModel>();
    }

    /// <summary>
    /// Creates a new instance of a ReportEngineContentModel, initializes with specified parameters.
    /// </summary>
    /// <param name="content"></param>
    /// <param name="settings"></param>
    public ReportEngineContentModel(IEnumerable<ContentModel> content, ReportSettingsModel settings)
    {
        this.Content = content.ToArray();
        this.Settings = settings;
    }

    /// <summary>
    /// Creates a new instance of a ReportEngineContentModel, initializes with specified parameters.
    /// </summary>
    /// <param name="sections"></param>
    /// <param name="settings"></param>
    /// <param name="uploadPath"></param>
    public ReportEngineContentModel(Dictionary<string, ReportSectionModel> sections, ReportSettingsModel settings, string? uploadPath = null)
    {
        this.Sections = sections;
        this.Settings = settings;

        // Reference all section content in the root Content collection.
        this.Content = sections.SelectMany(s => s.Value.Content).DistinctBy(c => c.Id);

        // Convert any images to base64 and include them in the email.
        if (!string.IsNullOrWhiteSpace(uploadPath) && this.Content.Any())
            this.Content.Where(c => c.ContentType == Entities.ContentType.Image).ForEach(c =>
            {
                c.ImageContent = GetImageContent(uploadPath, c.FileReferences.FirstOrDefault()?.Path);
            });
    }
    #endregion

    #region Methods
    /// <summary>
    /// Fetch the image from the specified 'path' and convert it into a base64 string.
    /// </summary>
    /// <param name="uploadPath"></param>
    /// <param name="path"></param>
    /// <returns></returns>
    private static string? GetImageContent(string uploadPath, string? path)
    {
        path = string.IsNullOrWhiteSpace(path) ? "" : HttpUtility.UrlDecode(path).MakeRelativePath();
        var safePath = Path.Combine(uploadPath, path);
        if (!safePath.FileExists()) return null;

        using FileStream fileStream = new(safePath, FileMode.Open, FileAccess.Read);
        var imageBytes = new byte[fileStream.Length];
        fileStream.Read(imageBytes, 0, (int)fileStream.Length);
        return Convert.ToBase64String(imageBytes);
    }
    #endregion
}
