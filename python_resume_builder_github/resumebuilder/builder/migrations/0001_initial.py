# Generated by Django 4.1 on 2022-08-08 12:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Resume',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, null=True)),
                ('surname', models.CharField(max_length=255, null=True)),
                ('phoneNumber', models.CharField(max_length=255, null=True)),
                ('email', models.CharField(max_length=255, null=True)),
                ('title', models.CharField(max_length=255, null=True)),
                ('location', models.CharField(max_length=255, null=True)),
                ('introduce', models.CharField(max_length=2000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255, null=True)),
                ('resume', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='builder.resume')),
            ],
        ),
        migrations.CreateModel(
            name='Hobby',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255, null=True)),
                ('resume', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='builder.resume')),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startDate', models.CharField(max_length=255, null=True)),
                ('endDate', models.CharField(max_length=255, null=True)),
                ('company', models.CharField(max_length=255, null=True)),
                ('title', models.CharField(max_length=255, null=True)),
                ('description', models.CharField(max_length=2000, null=True)),
                ('resume', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='builder.resume')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255, null=True)),
                ('resume', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='builder.resume')),
            ],
        ),
    ]
