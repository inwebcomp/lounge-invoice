<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApartmentResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\TextblockResource;
use App\Models\Apartment;
use App\Models\Service;
use App\Models\Textblock;

class DataController extends Controller
{
    public function services()
    {
        return ServiceResource::collection(
            Service::published()->ordered()->get()
        );
    }

    public function apartments()
    {
        return ApartmentResource::collection(
            Apartment::published()->ordered()->get()
        );
    }

    public function textblocks()
    {
        $textblocks = [];

        Textblock::published()->ordered()->get()->each(function (Textblock $textblock) use (&$textblocks) {
            $textblocks[$textblock->uid] = (new TextblockResource($textblock))->jsonSerialize();
        });

        return $textblocks;
    }
}
