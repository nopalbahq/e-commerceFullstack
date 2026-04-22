using System;
using API.Entities;

namespace API.Extensions;

public static class ProductExtensions
{
  public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
  {
    query = orderBy switch
    {
      //Highest to low
      "price" => query.OrderBy(x => x.Price),
      "priceDesc" => query.OrderByDescending(x => x.Price),
      _ => query.OrderBy(x => x.Name)
    };

    return query;
  }

  public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
  {
    // if nothing pass
    if (string.IsNullOrEmpty(searchTerm)) return query;

    // Make a valueable to Lower result
    var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

    return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearchTerm));
  }

  public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
  {
    var brandList = new List<string>();
    var typeList = new List<string>();

    // if brands was filled do
    if (!string.IsNullOrEmpty(brands))
    {
      // show brandlist array with lowercase and "," ex : [react, vue, next]
      brandList.AddRange([.. brands.ToLower().Split(",")]);
    }

    if (!string.IsNullOrEmpty(types))
    {
      // show typList array with lowercase and "," ex : [react, vue, next]
      typeList.AddRange([.. types.ToLower().Split(",")]);
    }

    query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
    query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));

    return query;
  }
}
