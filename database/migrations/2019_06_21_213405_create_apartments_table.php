<?php

use App\Models\Apartment;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->increments('id');
            Apartment::statusColumn($table);
            Apartment::positionColumn($table);
            $table->timestamps();
        });

        Schema::create('apartment_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('apartment_id')->unsigned();
            $table->string('locale')->index();

            $table->string('title');
            $table->string('value');

            $table->unique(['apartment_id','locale']);
            $table->foreign('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apartment_translations');
        Schema::dropIfExists('apartments');
    }
}
