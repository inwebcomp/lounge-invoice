<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Invoice') }}</title>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&display=swap&subset=cyrillic-ext" rel="stylesheet">

    @yield('styles')
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">

    <script>
        window.App = {
            locale: '{{ app()->getLocale() }}'
        }
    </script>
</head>
<body>
    <div id="app">
        @yield('content')
    </div>

    @yield('scripts')

    <script>
        let translations = @php include_once(resource_path('lang/' . app()->getLocale() . '.json')) @endphp;
    </script>

    <script src="{{ mix('/js/app.js') }}"></script>
</body>
</html>
