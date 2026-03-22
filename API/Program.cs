using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Sebagai Scoped
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Accept Policy
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();

// Add services to the container.
var app = builder.Build();

// HTTP Request
app.MapControllers();
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
});

// In non static way to call 
// var IntializerDb = new DbInitializer();
// IntializerDb.InitDb(app);

// Static way
DbInitializer.InitDb(app);


string HelloThere = "Hello There";
app.MapGet("/", () => HelloThere);

app.Run();
