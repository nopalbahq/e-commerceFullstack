using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace API.Controllers;

public class BuggyController : BaseApiController
{

  // 404
  [HttpGet("not-found")]
  public IActionResult GetNotFound()
  {
    return NotFound();
  }

  // 400
  [HttpGet("bad-request")]
  public IActionResult GetBadRequest()
  {
    return BadRequest("this is not a good request");
  }

  // 401 Unauthorized
  [HttpGet("unauthorized-error")]
  public IActionResult GetUnauthorised()
  {
    return Unauthorized();
  }

  // Validation-error
  [HttpGet("validation-error")]
  public IActionResult GetValidationError()
  {
    ModelState.AddModelError("Problem1", "This is the first ERROR");
    ModelState.AddModelError("Problem2", "This is the second ERROR");
    return ValidationProblem();
  }

  // 500 Server off
  [HttpGet("server-error")]
  public IActionConstraint GerServerError()
  {
    throw new Exception("This is a Server Error");
  }
}
