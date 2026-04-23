using System;
using System.Text.Json;
using API.RequestHelper;
using Microsoft.Net.Http.Headers;

namespace API.Extensions;

// Kelas statis untuk menambahkan extension method ke HttpResponse
public static class HttpExtensions
{
  // Extension method untuk HttpResponse, dipanggil via response.AddPagingHeader(metaData)
  public static void AddPagingHeader(this HttpResponse response, PaginationMetaData metaData)
  {
    // Atur format JSON menjadi camelCase
    // Misal: TotalCount -> totalCount, TotalPages -> totalPages
    var options = new JsonSerializerOptions
    {
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    // Serialisasi metaData ke JSON lalu masukkan ke Header bernama "Pagination"
    // Hasilnya: Header["Pagination"] = {"totalCount":100,"totalPages":10,...}
    response.Headers.Append("Pagination", JsonSerializer.Serialize(metaData, options));

    // Izinkan Frontend untuk membaca Header "Pagination" dari browser (CORS)
    // Tanpa ini, browser akan blokir akses ke header tersebut
    response.Headers.Append(HeaderNames.AccessControlAllowHeaders, "Pagination");
  }
}
