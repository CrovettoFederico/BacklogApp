using DBModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BacklogAppModelContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("BacklogAppModelContext") ?? throw new InvalidOperationException("Connection string 'BacklogAppModelContext' not found."));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope()) {    
    var context = scope.ServiceProvider.GetRequiredService<BacklogAppModelContext>();
    context.Database.Migrate();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
