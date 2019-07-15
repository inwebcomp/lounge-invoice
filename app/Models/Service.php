<?php

namespace App\Models;

use Dimsav\Translatable\Translatable;
use InWeb\Base\Entity;
use InWeb\Base\Traits\Positionable;
use InWeb\Base\Traits\WithStatus;
use Spatie\EloquentSortable\Sortable;

/**
 * Class Service
 *
 * @package App
 * @property string title
 */
class Service extends Entity implements Sortable
{
    use Translatable,
        WithStatus,
        Positionable;

    public $translationModel = 'App\Translations\ServiceTranslation';
    public $translatedAttributes = ['title'];
}
