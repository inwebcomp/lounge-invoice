<?php

if (\App::runningUnitTests()) {
    $locale = \App::getLocale();
} else {
    $locale = request()->segment(1);
}

if (strlen($locale) !== 2) {
    $locale = '';
} else {
    request()->merge([
        'locale' => $locale
    ]);
}

Route::group(['prefix' => $locale], function () {
    Route::get('/', 'PageController@index');
});

\Auth::routes(['register' => true]);

Route::get('/home', 'HomeController@index')->name('home');
