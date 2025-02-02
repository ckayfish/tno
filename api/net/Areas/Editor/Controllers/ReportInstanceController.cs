using System.Net;
using System.Net.Mime;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Annotations;
using TNO.API.Helpers;
using TNO.API.Models;
using TNO.Core.Exceptions;
using TNO.Core.Extensions;
using TNO.DAL.Services;
using TNO.Keycloak;
using TNO.TemplateEngine.Models.Reports;

namespace TNO.API.Areas.Editor.Controllers;

/// <summary>
/// ReportInstanceController class, provides Report endpoints for the api.
/// </summary>
[ClientRoleAuthorize(ClientRole.Editor)]
[ApiController]
[Area("editor")]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[area]/report/instances")]
[Route("api/[area]/report/instances")]
[Route("v{version:apiVersion}/[area]/report/instances")]
[Route("[area]/report/instances")]
[ProducesResponseType(typeof(ErrorResponseModel), (int)HttpStatusCode.Unauthorized)]
[ProducesResponseType(typeof(ErrorResponseModel), (int)HttpStatusCode.Forbidden)]
public class ReportInstanceController : ControllerBase
{
    #region Variables
    private readonly IReportInstanceService _reportInstanceService;
    private readonly IUserService _userService;
    private readonly IReportHelper _reportHelper;
    private readonly JsonSerializerOptions _serializerOptions;
    #endregion

    #region Constructors
    /// <summary>
    /// Creates a new instance of a ReportInstanceController object, initializes with specified parameters.
    /// </summary>
    /// <param name="reportInstanceService"></param>
    /// <param name="userService"></param>
    /// <param name="reportHelper"></param>
    /// <param name="serializerOptions"></param>
    public ReportInstanceController(
        IReportInstanceService reportInstanceService,
        IUserService userService,
        IReportHelper reportHelper,
        IOptions<JsonSerializerOptions> serializerOptions)
    {
        _reportInstanceService = reportInstanceService;
        _userService = userService;
        _reportHelper = reportHelper;
        _serializerOptions = serializerOptions.Value;
    }
    #endregion

    #region Endpoints
    /// <summary>
    /// Execute the report instance template and generate the results for previewing.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpPost("{id}/preview")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(ReportResultModel), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ErrorResponseModel), (int)HttpStatusCode.BadRequest)]
    [SwaggerOperation(Tags = new[] { "Report" })]
    public async Task<IActionResult> Preview(int id)
    {
        var username = User.GetUsername() ?? throw new NotAuthorizedException("Username is missing");
        var user = _userService.FindByUsername(username) ?? throw new NotAuthorizedException("User does not exist");
        var instance = _reportInstanceService.FindById(id) ?? throw new NoContentException("Report instance does not exist");
        var report = instance.Report ?? throw new NoContentException("Report instance is missing report information");
        if (!user.Roles.Split(',').Contains(ClientRole.Administrator.GetName()) && // User is not admin
            instance.OwnerId != user.Id && // User does not own the report instance
            !report.SubscribersManyToMany.Any(s => s.IsSubscribed && s.UserId == user.Id) && // User is not subscribed to the report
            !report.IsPublic) throw new NotAuthorizedException("Not authorized to preview this report"); // Report is not public
        var model = new Services.Models.ReportInstance.ReportInstanceModel(instance, _serializerOptions);
        var result = await _reportHelper.GenerateReportAsync(model);
        return new JsonResult(result);
    }
    #endregion
}
