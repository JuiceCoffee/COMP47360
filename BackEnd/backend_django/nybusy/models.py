""" Database models"""

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_field):
        """Create, save and return a new user."""
        user = self.model(email=email, **extra_field)
        user.set_password(password)
        user.save(using=self._db)

        return user


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin,):
    """User in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class POI(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    Address = models.CharField(max_length=255)
    opening_hours = models.FloatField()
    category = models.CharField(max_length=255)


class UserBucketlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    poi = models.ForeignKey(POI, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
