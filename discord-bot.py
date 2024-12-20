import discord
from discord.ext import commands
import os

api_token = os.environ.get('TOKEN')

intents = discord.Intents.default()
bot = commands.Bot(command_prefix='!', intents=intents, help_command=commands.DefaultHelpCommand(dm_help=True))

@bot.event
async def on_ready():
    print(f'Bot is running')
    try:
        synced = await bot.tree.sync()
        print(f"Synced {len(synced)} command(s)")
    except Exception as e:
        print(e)

@bot.tree.command(name="view", description="View your coins")
async def view(interaction: discord.Interaction):
    url = "https://dailysat.org/misc-login?t=Check Points"
    
    # Create a view with a URL button
    view = discord.ui.View()
    view.add_item(discord.ui.Button(label="Click here to check points", url=url, style=discord.ButtonStyle.link))
    
    await interaction.response.send_message(f"Hey {interaction.user.mention}, you have x tokens!", ephemeral=True)

# Option 1: Using Button (Recommended)
@bot.tree.command(name="check", description="Check your coins")
async def check(interaction: discord.Interaction):
    url = "https://dailysat.org/misc-login?t=250"
    
    # Create a view with a URL button
    view = discord.ui.View()
    view.add_item(discord.ui.Button(label="Click here to check tokens", url=url, style=discord.ButtonStyle.link))
    
    await interaction.response.send_message("Click the button below:", view=view, ephemeral=True)

bot.run(api_token)