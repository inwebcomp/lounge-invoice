<?php

namespace App\Models;

use App\Translations\TextblockTranslation;
use Dimsav\Translatable\Translatable;
use InWeb\Base\Contracts\Cacheable;
use InWeb\Base\Entity;
use InWeb\Base\Traits\Positionable;
use InWeb\Base\Traits\WithStatus;
use InWeb\Base\Traits\WithUID;
use Spatie\EloquentSortable\Sortable;

class Textblock extends Entity implements Sortable
{
    use Translatable,
        WithUID,
        WithStatus,
        Positionable;

    public $translationModel = TextblockTranslation::class;
    public $translatedAttributes = ['title', 'text'];

    protected $fillable = [
        'uid',
    ];

    public static function text($name)
    {
        return strip_tags(static::html($name));
    }

    public static function html($name)
    {
        return optional(static::findByUID($name))->text;
    }
}