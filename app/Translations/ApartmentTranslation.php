<?php

namespace App\Translations;

use Illuminate\Database\Eloquent\Model;

class ApartmentTranslation extends Model
{
    public $timestamps = false;

    protected $fillable = ['title', 'value'];
}
