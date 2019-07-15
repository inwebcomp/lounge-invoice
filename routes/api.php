<?php

Route::get('services', 'DataController@services')->name('services');
Route::get('apartments', 'DataController@apartments')->name('apartments');
Route::get('textblocks', 'DataController@textblocks')->name('textblocks');