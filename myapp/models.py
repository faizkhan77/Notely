from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Note(models.Model):
    # The on_delete=models.CASCADE means that when a user is deleted, all associated notes will also be deleted.
    user = user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
