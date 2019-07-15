<?php

namespace App\Admin\Resources;

use App\Admin\Actions\Hide;
use App\Admin\Actions\Publish;
use Illuminate\Http\Request;
use InWeb\Admin\App\Fields\Boolean;
use InWeb\Admin\App\Fields\Text;
use InWeb\Admin\App\Http\Requests\AdminRequest;
use InWeb\Admin\App\Resources\Resource;

class Apartment extends Resource
{
    public static $model = \App\Models\Apartment::class;

    protected static $position = 2;

    public static $with = ['translations'];

    public static $globallySearchable = true;

    public static $search = [
        'title'
    ];

    public function title()
    {
        return $this->title;
    }

    public static function label()
    {
        return __('Апартаменты');
    }

    public static function singularLabel()
    {
        return __('Апартамент');
    }

    public static function uriKey()
    {
        return 'apartment';
    }

    /**
     * Get the fields displayed by the resource.
     *
     * @param AdminRequest $request
     * @return array
     */
    public function fields(AdminRequest $request)
    {
        return [
            Text::make(__('Название'), 'title')->link($this->editPath())->rules('required'),
            Text::make(__('Запись в инвойсе'), 'value')->rules('required'),
            Boolean::make(__('Опубликован'), 'status'),
        ];
    }

    public function actions(Request $request)
    {
        return [
            new Publish(),
            new Hide(),
        ];
    }
}
