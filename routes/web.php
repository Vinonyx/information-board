<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\KeuanganController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\ImamController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'dashboard');
Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('jadwal', JadwalController::class);
    Route::resource('keuangan', KeuanganController::class);
    Route::resource('kegiatan', KegiatanController::class);
    Route::resource('imam', ImamController::class);
    Route::get('/nama', [ImamController::class, 'getNama']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
