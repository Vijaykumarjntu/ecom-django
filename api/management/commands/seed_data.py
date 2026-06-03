from django.core.management.base import BaseCommand
from api.models import MenuItem

class Command(BaseCommand):
    help = 'Seed initial menu data'

    def handle(self, *args, **kwargs):
        menu_items = [
            {"name": "Butter Chicken", "description": "Creamy tomato gravy with tender chicken", "price": 320.00, "category": "main_course"},
            {"name": "Paneer Tikka", "description": "Grilled cottage cheese with spices", "price": 280.00, "category": "starters"},
            {"name": "Masala Dosa", "description": "Crispy rice crepe with potato filling", "price": 180.00, "category": "main_course"},
            {"name": "Veg Biryani", "description": "Fragrant rice with vegetables and spices", "price": 250.00, "category": "main_course"},
            {"name": "Chicken Biryani", "description": "Fragrant rice with chicken and spices", "price": 280.00, "category": "main_course"},
            {"name": "Gulab Jamun", "description": "Sweet milk dumplings in sugar syrup", "price": 120.00, "category": "desserts"},
            {"name": "Mango Lassi", "description": "Refreshing yogurt drink with mango", "price": 90.00, "category": "beverages"},
            {"name": "Garlic Naan", "description": "Soft bread with garlic", "price": 60.00, "category": "sides"},
        ]

        added = 0
        for item in menu_items:
            # Check if item with same name already exists
            if not MenuItem.objects.filter(name=item['name']).exists():
                MenuItem.objects.create(
                    **item,
                    is_available=True,
                    image_url="https://via.placeholder.com/300x200"
                )
                added += 1
                self.stdout.write(self.style.SUCCESS(f'Added: {item["name"]}'))
            else:
                self.stdout.write(self.style.WARNING(f'Skipped (already exists): {item["name"]}'))

        if added == 0:
            self.stdout.write(self.style.WARNING('All menu items already exist.'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Successfully added {added} new menu items'))