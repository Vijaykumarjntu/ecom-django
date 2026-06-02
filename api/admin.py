from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import MenuItem, Order

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_available', 'created_at','description']
    list_filter = ['category', 'is_available','price']
    search_fields = ['name', 'description']
    ordering = ['category', 'name']
    
    # Make price editable directly in list view
    list_editable = ['price', 'is_available']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_name', 'table_number', 'total_amount', 
                   'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['customer_name', 'customer_phone']
    readonly_fields = ['created_at', 'updated_at']
    
    # Group fields nicely in detail view
    fieldsets = (
        ('Customer Info', {
            'fields': ('customer_name', 'customer_phone', 'table_number')
        }),
        ('Order Details', {
            'fields': ('items', 'total_amount', 'status', 'special_instructions')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )