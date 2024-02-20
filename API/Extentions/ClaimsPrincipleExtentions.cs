using System.Security.Claims;

namespace API;

public static class ClaimsPrincipleExtentions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}
