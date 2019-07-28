from django.db import models

class Item(models.Model):
    shop_id = models.CharField(max_length=50, blank=False, null=False)
    name = models.CharField(max_length=200, blank=False, null=False)
    cost = models.IntegerField(blank=False, null=False)

    class Meta:
        verbose_name = 'Item'
        verbose_name_plural = 'Items'
        constraints = [
            models.UniqueConstraint(
                fields=['shop_id', 'name'], name='uniqe shop item')
        ]

    def __str__(self):
        return self.name



class Order(models.Model):
    shop_id = models.CharField(max_length=20)
    item = models.ForeignKey(Item, related_name='orders', on_delete=models.CASCADE)
    order_type = models.CharField(max_length=20, default='Here')
    description = models.TextField(null=True, blank=True)
    pending = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str_(self):
        return self.item.name
