from django.db import models

# Create your models here.
# from django.db import models

class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=[
        ('starters', 'Starters'),
        ('main_course', 'Main Course'),
        ('desserts', 'Desserts'),
        ('beverages', 'Beverages'),
        ('sides', 'Sides'),
    ])
    is_available = models.BooleanField(default=True)
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - ₹{self.price}"

    class Meta:
        ordering = ['category', 'name']


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('preparing', 'Preparing'),
        ('ready', 'Ready'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    customer_name = models.CharField(max_length=150)
    customer_phone = models.CharField(max_length=15)
    table_number = models.IntegerField(null=True, blank=True)
    items = models.JSONField()           # We'll store list of menu items with quantity
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    special_instructions = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name} ({self.status})"

    class Meta:
        ordering = ['-created_at']