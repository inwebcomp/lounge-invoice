<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ApartmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'value' => $this->value,
        ];
    }
}
