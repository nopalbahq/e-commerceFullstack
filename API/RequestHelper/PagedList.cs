using System;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelper;

// Inherit List<T> to get all List features + add pagination metadata
public class PagedList<T> : List<T>
{
  public PagedList(List<T> items, int count, int pageNumber, int pageSize)
  {
    // Simpan info pagination untuk dikirim ke client
    MetaData = new PaginationMetaData
    {
      TotalCount = count,
      PageSize = pageSize,
      CurrentPage = pageNumber,
      // Bulatkan ke atas, misal 10/3 = 3.33 -> 4 halaman
      TotalPages = (int)Math.Ceiling(count / (double)pageSize)
    };

    // Isi List ini dengan data yang sudah diambil
    AddRange(items);
  }

  // Simpan info pagination, bisa diakses via pagedList.MetaData
  public PaginationMetaData MetaData { get; set; }

  // Ubah IQueryable jadi PagedList
  public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
  {
    // Hitung total semua data di DB
    var count = await query.CountAsync();

    // Ambil data sesuai halaman yang diminta
    // Misal halaman 2, size 10 -> lewati 10 data pertama, ambil 10 berikutnya
    var items = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

    // Bungkus data + info pagination lalu kembalikan
    return new PagedList<T>(items, count, pageNumber, pageSize);
  }
}
