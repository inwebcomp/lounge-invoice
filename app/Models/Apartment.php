<?php

namespace App\Models;

use Dimsav\Translatable\Translatable;
use InWeb\Base\Entity;
use InWeb\Base\Traits\Positionable;
use InWeb\Base\Traits\WithStatus;
use Spatie\EloquentSortable\Sortable;

/**
 * @package App
 * @property string title
 * @property string value
 */
class Apartment extends Entity implements Sortable
{
    use Translatable,
        WithStatus,
        Positionable;

    public $translationModel = 'App\Translations\ApartmentTranslation';
    public $translatedAttributes = ['title', 'value'];
}
