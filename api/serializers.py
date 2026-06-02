from rest_framework import serializers
from .models import MenuItem, Order

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'total_amount']
    
    # Optional: Make items more readable
    def validate_items(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Items must be a list")
        return value