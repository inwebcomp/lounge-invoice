<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TextblockResource extends JsonResource
{
    public function toArray($request)
    {
        $text = preg_replace('/(^<p>)|(<\/p>$)/', '', $this->text);

        return [
            'title' => $this->title,
            'text' => $text == strip_tags($this->text) ? $text : $this->text,
        ];
    }
}
