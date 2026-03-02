using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Sebagai Scoped
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add services to the container.
var app = builder.Build();

app.MapControllers();

// In non static way to call 
// var IntializerDb = new DbInitializer();
// IntializerDb.InitDb(app);

// Static way
DbInitializer.InitDb(app);


string HelloThere = "Hello There";
app.MapGet("/", () => HelloThere);

app.Run();
