namespace ElderberryLotttery.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using ElderberryLottery.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<ElderberryDbContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = false;
        }

        protected override void Seed(ElderberryDbContext context)
        {
            this.SeedGameNumbers(context);
        }

        private void SeedGameNumbers(ElderberryDbContext context)
        {
            context.GameCodes.Add(new GameCode
            {
                Value = "1232134598",
                IsWinning = false
            });

            context.GameCodes.Add(new GameCode
            {
                Value = "9999999999",
                IsWinning = true
            });

            context.GameCodes.Add(new GameCode
            {
                Value = "1234512345",
                IsWinning = false
            });

            context.GameCodes.Add(new GameCode
            {
                Value = "1231231231",
                IsWinning = true
            });

            context.GameCodes.Add(new GameCode
            {
                Value = "1111111111",
                IsWinning = false
            });

            context.GameCodes.Add(new GameCode
            {
                Value = "9182736451",
                IsWinning = false
            });

            context.GameCodes.Add(new GameCode
            {
                Value = "0000001111",
                IsWinning = false
            });
        }
    }
}
