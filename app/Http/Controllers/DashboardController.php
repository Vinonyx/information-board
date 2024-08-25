<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Kegiatan;
use App\Models\Keuangan;
use App\Http\Resources\JadwalResource;
use App\Http\Resources\KegiatanResource;
use App\Http\Resources\KeuanganResource;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $jadwal = Jadwal::latest()->first();
        $kegiatan = Kegiatan::latest()->take(10)->get();
        $keuangan = Keuangan::first()->take(10)->get();

        $sholat = [
            'Subuh' => Jadwal::where('sholat', 'subuh')->first(),
            'Dzuhur' => Jadwal::where('sholat', 'dzuhur')->first(),
            'Ashar' => Jadwal::where('sholat', 'ashar')->first(),
            'Maghrib' => Jadwal::where('sholat', 'maghrib')->first(),
            'Isya' => Jadwal::where('sholat', 'isya')->first(),
        ];

        return Inertia::render('Dashboard', [
            "jadwal" => $jadwal ? new JadwalResource($jadwal) : null,
            "kegiatan" => KegiatanResource::collection($kegiatan),
            "keuangan" => KeuanganResource::collection($keuangan),
            "sholat" => $sholat,
        ]);
    }
}
