using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTypeToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuantityStock",
                table: "products");

            migrationBuilder.RenameColumn(
                name: "isReady",
                table: "products",
                newName: "QuantityInStock");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "products",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "products");

            migrationBuilder.RenameColumn(
                name: "QuantityInStock",
                table: "products",
                newName: "isReady");

            migrationBuilder.AddColumn<int>(
                name: "QuantityStock",
                table: "products",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
